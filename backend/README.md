# MedPulse Backend Service

RESTful API and AI RAG service powering the MedPulse clinical education platform.

## 📁 Directory Structure

```
backend/
├── src/
│   ├── config/              # MongoDB connection & Firebase Admin setup
│   ├── controllers/         # Request handling logic
│   │   ├── assessmentController.js  # Quiz & test evaluations
│   │   ├── authController.js        # Hybrid JWT & Firebase authentication
│   │   ├── courseController.js      # Curriculum & topic management
│   │   ├── progressController.js    # Student milestone & gating tracker
│   │   ├── ragController.js         # AI vector similarity queries & responses
│   │   └── userController.js        # User management & role administration
│   ├── middleware/          # Security & authorization
│   │   ├── auth.js                  # Bearer token verification
│   │   └── roleGuard.js             # RBAC guards (Student, Faculty, Admin)
│   ├── models/              # Mongoose database models
│   ├── routes/              # Express endpoint routers
│   ├── seed/                # Initial database seed data
│   ├── services/            # Business & AI processing
│   │   ├── embeddingService.js      # Google Gemini vector embeddings
│   │   ├── gatingService.js         # Assessment prerequisite gating
│   │   └── ragService.js            # Scoped semantic search retrieval
│   └── server.js            # Express application bootstrap
├── .env.example             # Configuration template
├── .gitignore               # Ignored files
└── package.json             # Backend dependencies & scripts
```

## 🚀 Running Locally

1. Install dependencies:
   ```bash
   npm install
   ```
2. Configure `.env`:
   ```bash
   cp .env.example .env
   # Add your MONGODB_URI, JWT_SECRET, and GEMINI_API_KEY
   ```
3. Seed default admin & curriculum:
   ```bash
   npm run seed
   ```
4. Start development server:
   ```bash
   npm run dev
   ```
   API will be running on `http://127.0.0.1:5000` (Healthcheck: `GET /api/health`).
