import { create } from 'zustand';

export interface Option {
  id: string;
  label: string;
  text: string;
  isCorrect: boolean;
}

export interface Question {
  id: string;
  number: number;
  type: 'MCQ' | 'Checkbox' | 'Text';
  points: number;
  negativeMarking?: number;
  text: string;
  options: Option[];
  answerPlaceholder?: string;
}

export interface Exam {
  id: string;
  title: string;
  totalCandidates: number;
  totalSlots: number;
  totalQuestionSet: number;
  durationPerSlotMinutes: number;
  questionType: string;
  questions: Question[];
  createdAt?: string;
  isCustom?: boolean;
}

interface CandidateAnswer {
  questionId: string;
  answer: string | string[];
  isSkipped: boolean;
}

interface CandidateSession {
  examId: string;
  startTime: number;
  answers: CandidateAnswer[];
  currentQuestionIndex: number;
  isCompleted: boolean;
}

interface ExamState {
  currentExam: Exam | null;
  allExams: Exam[];
  candidateSession: CandidateSession | null;
  setCurrentExam: (exam: Exam) => void;
  updateExam: (exam: Partial<Exam>) => void;
  addQuestion: (question: Question) => void;
  updateQuestion: (question: Question) => void;
  deleteQuestion: (id: string) => void;
  getExamById: (id: string) => Exam | null;
  saveExamToStorage: (exam: Exam) => void;
  loadExamsFromStorage: () => Exam[];
  getAllExams: () => Exam[];
  deleteExam: (id: string) => void;
  startCandidateSession: (examId: string, exam: Exam) => void;
  saveCandidateAnswer: (questionId: string, answer: string | string[], isSkipped: boolean) => void;
  moveToNextQuestion: () => void;
  moveToPreviousQuestion: () => void;
  submitExam: () => CandidateSession | null;
  getCandidateSession: () => CandidateSession | null;
}

const STORAGE_KEY = 'exams_data';

const generateId = () => `exam_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

export const useExamStore = create<ExamState>((set, get) => ({
  currentExam: null,
  allExams: [],
  candidateSession: null,

  setCurrentExam: (exam: Exam) => {
    set({ currentExam: exam });
  },

  updateExam: (exam: Partial<Exam>) => {
    set((state) => {
      const updatedExam = state.currentExam
        ? { ...state.currentExam, ...exam }
        : null;
      
      if (updatedExam) {
        get().saveExamToStorage(updatedExam);
      }
      
      return { currentExam: updatedExam };
    });
  },

  addQuestion: (question: Question) => {
    set((state) => {
      const updatedExam = state.currentExam
        ? {
            ...state.currentExam,
            questions: [...state.currentExam.questions, question],
          }
        : null;
      
      if (updatedExam) {
        get().saveExamToStorage(updatedExam);
      }
      
      return { currentExam: updatedExam };
    });
  },

  updateQuestion: (question: Question) => {
    set((state) => {
      const updatedExam = state.currentExam
        ? {
            ...state.currentExam,
            questions: state.currentExam.questions.map((q) =>
              q.id === question.id ? question : q
            ),
          }
        : null;
      
      if (updatedExam) {
        get().saveExamToStorage(updatedExam);
      }
      
      return { currentExam: updatedExam };
    });
  },

  deleteQuestion: (id: string) => {
    set((state) => {
      const updatedExam = state.currentExam
        ? {
            ...state.currentExam,
            questions: state.currentExam.questions.filter((q) => q.id !== id),
          }
        : null;
      
      if (updatedExam) {
        get().saveExamToStorage(updatedExam);
      }
      
      return { currentExam: updatedExam };
    });
  },

  getExamById: (id: string) => {
    const state = get();
    if (state.currentExam?.id === id) return state.currentExam;
    return state.allExams.find((exam) => exam.id === id) || null;
  },

  saveExamToStorage: (exam: Exam) => {
    if (typeof window === 'undefined') return;
    
    try {
      const exams = get().loadExamsFromStorage();
      const existingIndex = exams.findIndex((e) => e.id === exam.id);
      
      const examToSave = {
        ...exam,
        createdAt: exam.createdAt || new Date().toISOString(),
        isCustom: true,
      };
      
      if (existingIndex >= 0) {
        exams[existingIndex] = examToSave;
      } else {
        exams.push(examToSave);
      }
      
      localStorage.setItem(STORAGE_KEY, JSON.stringify(exams));
      set({ allExams: exams });
    } catch (error) {
      console.error('Failed to save exam to localStorage:', error);
    }
  },

  loadExamsFromStorage: () => {
    if (typeof window === 'undefined') return [];
    
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch (error) {
      console.error('Failed to load exams from localStorage:', error);
      return [];
    }
  },

  getAllExams: () => {
    return get().allExams;
  },

  deleteExam: (id: string) => {
    try {
      const exams = get().loadExamsFromStorage();
      const filtered = exams.filter((e) => e.id !== id);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
      set({ allExams: filtered });
    } catch (error) {
      console.error('Failed to delete exam from localStorage:', error);
    }
  },

  startCandidateSession: (examId: string, exam: Exam) => {
    const session: CandidateSession = {
      examId,
      startTime: Date.now(),
      answers: exam.questions.map((q) => ({
        questionId: q.id,
        answer: q.type === 'Checkbox' ? [] : '',
        isSkipped: true,
      })),
      currentQuestionIndex: 0,
      isCompleted: false,
    };
    set({ candidateSession: session });
  },

  saveCandidateAnswer: (questionId: string, answer: string | string[], isSkipped: boolean) => {
    set((state) => {
      if (!state.candidateSession) return state;
      
      return {
        candidateSession: {
          ...state.candidateSession,
          answers: state.candidateSession.answers.map((a) =>
            a.questionId === questionId ? { ...a, answer, isSkipped } : a
          ),
        },
      };
    });
  },

  moveToNextQuestion: () => {
    set((state) => {
      if (!state.candidateSession || !state.currentExam) return state;
      
      const nextIndex = state.candidateSession.currentQuestionIndex + 1;
      if (nextIndex >= state.currentExam.questions.length) {
        return state;
      }
      
      return {
        candidateSession: {
          ...state.candidateSession,
          currentQuestionIndex: nextIndex,
        },
      };
    });
  },

  moveToPreviousQuestion: () => {
    set((state) => {
      if (!state.candidateSession) return state;
      
      const prevIndex = state.candidateSession.currentQuestionIndex - 1;
      if (prevIndex < 0) {
        return state;
      }
      
      return {
        candidateSession: {
          ...state.candidateSession,
          currentQuestionIndex: prevIndex,
        },
      };
    });
  },

  submitExam: () => {
    const state = get();
    if (!state.candidateSession) return null;
    
    const completedSession: CandidateSession = {
      ...state.candidateSession,
      isCompleted: true,
    };
    
    // Save to localStorage
    if (typeof window !== 'undefined') {
      try {
        const sessions = JSON.parse(localStorage.getItem('candidate_sessions') || '[]');
        sessions.push(completedSession);
        localStorage.setItem('candidate_sessions', JSON.stringify(sessions));
      } catch (error) {
        console.error('Failed to save candidate session:', error);
      }
    }
    
    set({ candidateSession: completedSession });
    return completedSession;
  },

  getCandidateSession: () => {
    return get().candidateSession;
  },
}));
