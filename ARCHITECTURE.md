# Architecture Overview

## Component Hierarchy

```
App
├── Layout
│   ├── Navbar
│   ├── Page Content
│   └── Footer
├── AuthPages
│   └── Login Page
│       └── useAuthStore
├── EmployerPages
│   ├── Dashboard
│   │   ├── Exam Cards (mapped from useExamData)
│   │   └── Links to Detail Pages
│   └── ExamDetail [id]
│       ├── Step Tabs Header
│       ├── BasicInfoView
│       │   └── useExamData hook
│       └── QuestionsManagement
│           ├── useExamData hook
│           └── QuestionModal (when opened)
│               └── Local state for new/edit question
└── CandidatePages (to be built)
    ├── Dashboard
    │   └── useExamData hook
    └── ExamTaking [id]
        ├── Timer
        ├── Question Display
        └── Answer Tracking
```

---

## Data Flow Architecture

### 1. Reading Data

```
Component → useExamData Hook → dummyData.json
                              ↓
                        Returns: {exam, loading, error}
                              ↓
                        Component renders with data
```

**Files Involved**:
- Component: `QuestionsManagement.tsx`
- Hook: `useExamData.ts`
- Data: `dummyData.ts`

### 2. Writing Data (Local State)

```
QuestionModal Component
    ↓
User fills form
    ↓
handleSave triggered
    ↓
Question object created
    ↓
onSave callback passed to parent
    ↓
Parent (QuestionsManagement) updates local state
    ↓
Questions array updates
    ↓
Component re-renders
```

### 3. Authentication Flow

```
Login Page
    ↓
User enters email/password
    ↓
useAuthStore.login() called
    ↓
Credentials validated against MOCK_USERS
    ↓
If valid: user set in store, redirected to dashboard
    ↓
Navbar checks isAuthenticated state
    ↓
Shows logout button if authenticated
```

### 4. Exam Navigation Flow

```
Dashboard Page
    ↓
Map exams from useExamData()
    ↓
Each exam card is Link to [id] page
    ↓
ExamDetail Page loads with examId from params
    ↓
useExamData fetches that specific exam
    ↓
BasicInfoView and QuestionsManagement display content
```

---

## State Management Architecture

### Global State (Zustand Stores)

```
useAuthStore
├── user: { id, email, name, role }
├── isAuthenticated: boolean
├── login(email, password)
├── logout()
└── Uses localStorage for persistence

useExamStore (prepared but not active)
├── currentExam: Exam | null
├── setCurrentExam()
├── addQuestion()
├── updateQuestion()
├── deleteQuestion()
└── For future use in complex scenarios
```

### Local Component State

```
ExamDetail Page [id]
├── currentStep: 'basic' | 'questions'
└── Used for tab navigation

QuestionsManagement
├── questions: Question[]
├── isModalOpen: boolean
├── editingQuestion: Question | null
└── Syncs with exam data on mount

QuestionModal
├── questionType: 'MCQ' | 'Checkbox' | 'Text'
├── questionText: string
├── points: number
├── options: Option[]
└── Isolated modal state
```

---

## Data Structure Hierarchy

```
ExamData (from dummyData.ts)
│
├── exam_001 {
│   id: string
│   title: string
│   totalCandidates: number
│   totalSlots: number
│   totalQuestionSet: number
│   durationPerSlotMinutes: number
│   questionType: string
│   questions: [
│       {
│           id: string
│           number: number
│           type: 'MCQ' | 'Checkbox' | 'Text'
│           points: number
│           text: string
│           options: [
│               {
│                   id: string
│                   label: string (A, B, C, D)
│                   text: string
│                   isCorrect: boolean
│               }
│           ]
│           answerPlaceholder?: string (for Text type)
│       }
│   ]
│}
│
└── exam_002, exam_003 ...
```

---

## Component Responsibilities

### Page Components

**Dashboard Page**
- Responsibility: Render list of exams
- Data Source: useExamData (via dummyData)
- User Actions: Click exam card
- State: None (stateless)

**ExamDetail Page [id]**
- Responsibility: Route between detail pages
- Data Source: URL params for exam ID
- User Actions: Click tabs
- State: currentStep for tab navigation

### View Components

**BasicInfoView**
- Responsibility: Display exam metadata read-only
- Data Source: useExamData hook
- User Actions: Edit button (future)
- State: None (props-driven)

**QuestionsManagement**
- Responsibility: Manage questions CRUD
- Data Source: useExamData hook
- User Actions: Add, Edit, Delete questions
- State: questions array, modal open/close

### Form Components

**QuestionModal**
- Responsibility: Create/Edit single question
- Data Source: Props (question data if editing)
- User Actions: Form submission
- State: Form fields, question type selection

---

## Hook Architecture

### useExamData Hook

```
useExamData(examId)
│
├── useEffect: Fetch on mount
├── useState: exam, loading, error
└── Returns: { exam, loading, error }

Usage Pattern:
const { exam, loading, error } = useExamData(examId)
if (loading) return <Loading />
if (error) return <Error />
return <Content exam={exam} />
```

### useAuthStore Hook

```
useAuthStore()
│
├── user: User object or null
├── isAuthenticated: boolean
├── login(email, password): boolean
└── logout(): void

Usage Pattern:
const { user, isAuthenticated, logout } = useAuthStore()
if (!isAuthenticated) redirect('/login')
```

### useExamStore Hook (Prepared)

```
useExamStore()
│
├── currentExam: Exam | null
├── setCurrentExam(exam)
├── addQuestion(question)
├── updateQuestion(question)
├── deleteQuestion(id)
└── getExamById(id): Exam | null

Usage Pattern (when needed):
const { currentExam, addQuestion } = useExamStore()
addQuestion(newQuestion)
```

---

## Type Definitions

### User Type
```typescript
interface User {
  id: string
  email: string
  name: string
  role: 'employer' | 'candidate' | null
}
```

### Exam Type
```typescript
interface Exam {
  id: string
  title: string
  totalCandidates: number
  totalSlots: number
  totalQuestionSet: number
  durationPerSlotMinutes: number
  questionType: string
  questions: Question[]
}
```

### Question Type
```typescript
interface Question {
  id: string
  number: number
  type: 'MCQ' | 'Checkbox' | 'Text'
  points: number
  text: string
  options: Option[]
  answerPlaceholder?: string
}
```

### Option Type
```typescript
interface Option {
  id: string
  label: string
  text: string
  isCorrect: boolean
}
```

---

## Request/Response Patterns

### Current (Dummy Data)
```
useExamData Hook
  ↓
Check dummyData.exams for matching ID
  ↓
Simulate API delay (100ms)
  ↓
Return { exam, loading: false, error: null }
```

### Future (Real API)
```
useExamData Hook
  ↓
fetch(`/api/exams/${examId}`)
  ↓
Parse JSON response
  ↓
Return { exam, loading: false, error: null }
```

---

## File Organization

```
src/
├── app/
│   ├── layout.tsx           # Root layout with Navbar/Footer
│   ├── page.tsx             # Home (unused currently)
│   ├── (auth)/
│   │   └── login/
│   │       └── page.tsx     # Login page
│   ├── employer/
│   │   ├── dashboard/
│   │   │   └── page.tsx     # Exam list
│   │   └── create-test/
│   │       ├── page.tsx     # Create new exam (unused)
│   │       └── [id]/
│   │           └── page.tsx # Exam detail + questions
│   └── candidate/           # To be built
│       ├── dashboard/
│       │   └── page.tsx
│       └── exam/
│           └── [id]/
│               └── page.tsx
│
├── components/
│   ├── Navbar.tsx           # Top navigation
│   ├── Footer.tsx           # Footer
│   ├── BasicInfoView.tsx    # Display exam info
│   ├── BasicInfoForm.tsx    # Create exam form (unused)
│   ├── QuestionsManagement.tsx
│   └── QuestionModal.tsx
│
├── hooks/
│   ├── useExamData.ts       # Fetch exam data
│   └── use-mobile.tsx       # Utility hook
│
├── store/
│   ├── useAuthStore.ts      # Auth state (Zustand)
│   └── useExamStore.ts      # Exam state (prepared)
│
├── data/
│   └── dummyData.ts         # All mock data
│
├── styles/
│   └── globals.css          # Global styles
│
└── lib/
    └── utils.ts             # Utility functions
```

---

## Rendering Flow

### Page Render Sequence

1. **ExamDetail Page** loads
2. **useParams()** extracts examId from URL
3. **useExamData(examId)** is called
4. **Loading state** shows while fetching
5. **Data arrives**, exam state updates
6. **Component re-renders** with data
7. **BasicInfoView** and **QuestionsManagement** render
8. **Event listeners** attach to buttons

### Question Modal Flow

1. User clicks "+ Add Question" or Edit button
2. **isModalOpen** state set to true
3. **QuestionModal** component mounts
4. **Modal overlay** appears
5. User fills form
6. User clicks "Save & Add Another"
7. **handleSave** creates Question object
8. **onSave callback** passes data to parent
9. Parent updates **questions** state
10. Modal closes (**isModalOpen** = false)
11. QuestionsManagement re-renders with new question

---

## Error Handling Architecture

### Current
- useExamData returns error state
- Components check error and display message
- Auth errors redirect to login

### Future (with API)
- Add error boundary component
- Implement toast notifications
- Retry logic for failed requests
- Validation error messages

---

## Performance Optimization

### Current Implementation
- useEffect dependencies properly set
- No unnecessary re-renders
- Local state for modal (isolated)
- Hook memoization via Zustand

### Future Optimization
- Add React.memo for list items
- Implement useCallback for event handlers
- Add route-based code splitting
- Optimize image loading with Next.js Image
- Add query caching with React Query

---

## Scaling Considerations

### For 1000s of Questions
- Implement pagination in QuestionsManagement
- Add search/filter functionality
- Virtual scrolling for large lists

### For 1000s of Candidates
- Implement response pagination
- Add filtering and search
- Consider read-only mode for locked exams

### For Real-Time Features
- WebSocket integration
- Real-time candidate tracking
- Live question updates

---

**Architecture Last Updated**: April 10, 2026
**Status**: Employer panel complete, scalable foundation ready
