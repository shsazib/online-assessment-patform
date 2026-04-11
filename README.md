# 📝 Online Assessment

A full-featured online examination platform built with **Next.js 14**, supporting both employer and candidate roles. Employers can create and manage exams with rich-text questions, while candidates can browse and attempt exams in real time.

---

## 🛠️ Tech Stack

| Category | Technology |
|---|---|
| Framework | [Next.js 14](https://nextjs.org/) (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS |
| State Management | [Zustand](https://zustand-demo.pmnd.rs/) |
| Rich Text Editor | [TipTap](https://tiptap.dev/) |
| Persistence | LocalStorage (via Zustand) |

---

## 🚀 Getting Started

### Prerequisites

- Node.js `18+`
- npm / yarn / pnpm

### Installation

```bash
# Clone the repository
git clone https://github.com/shsazib/online-assessment-patform.git

# Navigate into the project
cd your-repo-name

# Install dependencies
npm install
```

### Run the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build for production

```bash
npm run build
npm start
```

---

## 👤 Mock Login

This project uses a mock login system. No backend or real authentication is required.

| Role | Credentials |
|---|---|
| Employer | Configured in `useAuthStore` |
| Candidate | Configured in `useAuthStore` |

---

## 📄 License

All rights reserved. This project and its source code may **not** be used, copied, modified, or distributed without explicit written permission from the author.
