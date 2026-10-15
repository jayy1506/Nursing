# MedPulse Frontend Application

Modern clinical education user interface built with React 19, Vite, Tailwind CSS, Framer Motion, and Lucide Icons.

## 📁 Directory Structure

```
frontend/
├── public/                  # Static assets & favicon
│   └── favicon.svg          # MedPulse clinical brand badge
├── src/
│   ├── api/                 # API client with token interceptor
│   │   └── client.js
│   ├── components/          # Reusable UI & interactive widgets
│   │   ├── auth/            # Protected routes & password modal
│   │   ├── biochem/         # Interactive metabolic pathways
│   │   ├── illustrations/   # SVG medical diagrams & animations
│   │   ├── AIWidget.jsx     # Floating clinical AI tutor assistant
│   │   └── Navbar.jsx       # Global responsive navigation bar
│   ├── config/              # Firebase client SDK initialization
│   ├── constants/           # University question banks & curriculum
│   ├── context/             # Global AuthContext provider
│   ├── pages/               # Application view controllers
│   │   ├── admin/           # Admin dashboards, user management, audit
│   │   ├── auth/            # Login & registration views
│   │   ├── BioChemistryPages/ # Deep-dive biochemistry lessons
│   │   ├── faculty/         # Faculty grading, question manager
│   │   ├── NutritionPages/  # Nutrition submodules & clinical case views
│   │   ├── student/         # Quiz views & assessment scoring
│   │   ├── BioChemistrySyllabus.jsx
│   │   ├── Home.jsx
│   │   ├── NutritionSyllabus.jsx
│   │   ├── QuestionBankView.jsx
│   │   └── SyllabusHub.jsx
│   ├── App.jsx              # Main routing hub with lazy-loaded views
│   ├── index.css            # Tailwind CSS design system styles
│   └── main.jsx             # React DOM entrypoint
├── .env.example             # Frontend environment variables template
├── .gitignore               # Ignored dependencies & build artifacts
├── index.html               # HTML5 root with SEO metadata & Google Fonts
├── package.json             # Frontend package configuration
├── vercel.json              # SPA rewrite rules for Vercel
└── vite.config.js           # Vite configuration with production manual chunking
```

## 🚀 Running Locally

1. Install dependencies:
   ```bash
   npm install
   ```
2. Configure `.env`:
   ```bash
   cp .env.example .env
   ```
3. Start development server:
   ```bash
   npm run dev
   ```
   Open `http://localhost:5173` in your browser.

4. Production build:
   ```bash
   npm run build
   ```
   Outputs optimized, code-split bundle to `dist/`.
