# MedPulse — Foundational Medical Sciences & Clinical Nursing LMS Portal

MedPulse is an interactive clinical education and learning management platform designed for nursing and healthcare students to master foundational medical sciences: Anatomy, Physiology, Clinical Biochemistry, and Applied Nutrition.

---

## 🏗️ Project Architecture

This repository is organized as a fullstack monorepo with decoupled frontend and backend services:

```
nursing/
├── backend/                   # Node.js + Express + MongoDB REST API & RAG Engine
│   ├── src/
│   │   ├── config/            # Database and Firebase configurations
│   │   ├── controllers/       # Route controllers (Auth, Courses, RAG, Assessments)
│   │   ├── middleware/        # Authentication and RBAC guards
│   │   ├── models/            # Mongoose data models
│   │   ├── routes/            # Express REST route definitions
│   │   ├── seed/              # Database initialization & seeding scripts
│   │   ├── services/          # Embeddings, RAG, and gating services
│   │   └── server.js          # Express app entrypoint
│   ├── .env.example           # Backend environment variable template
│   ├── .gitignore             # Backend gitignore
│   └── package.json           # Backend dependencies and scripts
│
├── frontend/                  # React 19 + Vite + Tailwind CSS Clinical Web Application
│   ├── public/                # Static assets (Favicon, clinical badges)
│   ├── src/
│   │   ├── api/               # API client & fetch wrappers
│   │   ├── components/        # Reusable UI components & interactive tools
│   │   ├── config/            # Firebase web SDK configuration
│   │   ├── constants/         # Official curriculum banks, MCQs, and module data
│   │   ├── context/           # React context providers (AuthContext)
│   │   ├── pages/             # Route views (Student, Faculty, Admin, Lessons)
│   │   ├── App.jsx            # Top-level routing & layout shell
│   │   ├── index.css          # Tailwind CSS design system tokens
│   │   └── main.jsx           # React DOM root entrypoint
│   ├── .env.example           # Frontend environment variable template
│   ├── .gitignore             # Frontend gitignore
│   ├── package.json           # Frontend dependencies and scripts
│   ├── vercel.json            # Vercel SPA routing configuration
│   └── vite.config.js         # Vite build and manual chunking configuration
│
├── .env.example               # Root monorepo environment template
├── .gitignore                 # Root gitignore (Dependencies, secrets, builds)
├── package.json               # Root monorepo workspace orchestration
└── README.md                  # System documentation
```

---

## 🌟 Key Features

- **Structured Curriculum**: Core tracks for Human Biochemistry (Carbohydrates, Lipids, etc.) and Diet & Clinical Nutrition.
- **Interactive Visualizers**: Bedside clinical correlations, digestive mechanics, and metabolic pathways.
- **University Question Bank**: INC & university-standard questions, clinical vignettes, and rationales.
- **AI Clinical Tutor**: Chapter-scoped RAG assistant powered by Google Gemini and vector embeddings.
- **Role-Based Access Control**: Tailored dashboards and permissions for Students, Faculty, and Administrators.

---

## 🚀 Quick Start

### 1. Prerequisites
- Node.js >= 18.x
- MongoDB (Local or Atlas)
- Firebase project credentials (optional for mock/development)

### 2. Environment Setup
Copy the environment template files and configure your credentials:

```bash
# In the root directory
cp .env.example .env

# In backend/
cp backend/.env.example backend/.env

# In frontend/
cp frontend/.env.example frontend/.env
```

### 3. Install Dependencies
You can install all dependencies from the root:

```bash
npm run install:all
```

Or install individually:
```bash
# Backend
cd backend && npm install

# Frontend
cd frontend && npm install
```

### 4. Running the Development Servers

Run frontend and backend simultaneously or independently:

```bash
# Start frontend dev server (http://localhost:5173)
npm run dev:frontend

# Start backend dev server (http://127.0.0.1:5000)
npm run dev:backend

# Seed initial curriculum and admin accounts
npm run seed
```

---

## 🛡️ Production & Deployment

- **Frontend**: Built with code-splitting via `npm run build`. Ready for deployment on Vercel, Netlify, or any static host using `frontend/dist`.
- **Backend**: Node.js/Express server ready for deployment on Render, Railway, AWS ECS, or Docker using `npm start`.