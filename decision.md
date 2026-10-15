# Architecture Decision Records (ADR) & Complete Project Change Log

## Project: Medical & Nursing Learning Management System (LMS)
**Standard**: Indian Nursing Council (INC) Competency-Based Medical Education (CBME)  
**Curriculum**: Applied Anatomy, Applied Physiology, Applied Biochemistry, Applied Nutrition & Dietetics  
**Repository**: `nursing`  

---

## 1. Executive Summary & Project Evolution

This project began as a focused digital study companion for Biochemistry Modules 1 & 2 (Carbohydrates and Lipids). Over successive architectural iterations, it evolved into an **enterprise-grade, institutional medical learning platform** encompassing the complete First-Year B.Sc. Nursing curriculum across 4 core foundational sciences:

1. **Applied Anatomy** (12 Units, 3D anatomical landmarks, histology, organ topography)
2. **Applied Physiology** (12 Units, homeostatic loops, cellular mechanisms, systemic physiology)
3. **Applied Biochemistry** (7 Units, clinical enzymology, metabolic pathways, ABGs, cardiac biomarkers)
4. **Applied Nutrition & Dietetics** (10 Units, therapeutic diets, lifecycle meal planning, deficiency staging, FSSAI)

Below is the chronological decision log documenting every major architectural, functional, security, and UI/UX decision, including the specific problem identified and the rationale behind the solution.

---

## 2. Chronological Decision Log & Rationale

```
[Phase 1: Foundations] ──► [Phase 2: Data & Sync] ──► [Phase 3: 4-Track Expansion] ──► [Phase 4: Gating & Audit]
```

### DECISION 01: Dual-Layer Database Architecture (MongoDB Atlas + Local Storage Cache)
- **Date**: Early Architecture Phase
- **Context**: Medical students often study on spotty college Wi-Fi or mobile data during clinical rotations. Relying solely on real-time server queries resulted in frozen quizzes and lost progress if network dropped mid-assessment.
- **Decision**: 
  - Implemented a **Dual-Layer Persistence Pattern**:
    1. **Primary Immediate Layer**: `localStorage` (`nursing_lms_all_attempts`, `nursing_lms_completed_units`, `nursing_biochem_completed_lessons`).
    2. **Secondary Cloud Layer**: MongoDB Atlas cluster (`nursing_db`) accessed via Express REST APIs (`/api/assessments/submit`, `/api/assessments/attempts`).
- **Reason / Rationale**:
  - **Zero Data Loss**: When a student submits a 15-question quiz, the attempt is immediately recorded locally in milliseconds.
  - **Asynchronous Sync**: The app attempts to post the attempt payload to MongoDB Atlas in the background without blocking the student's navigation to the results screen.
  - **Offline Resilience**: Students can continue learning and taking unit assessments even if the college server is temporarily offline.

---

### DECISION 02: INC 75% Competency Benchmark for Chapter Assessment Gating
- **Date**: Assessment System Design Phase
- **Context**: Standard web quizzes allow arbitrary passing scores (50% or 60%), which violates nursing regulatory guidelines where clinical safety requires verified core mastery before patient care.
- **Decision**:
  - Established a strict, platform-wide passing threshold of **75%** (`percentage >= 75`).
  - Chapter assessment quizzes consist of **15 questions**, meaning a student must score at least **12/15 correct answers** to pass and earn unit completion credit.
- **Reason / Rationale**:
  - Aligns with the **Indian Nursing Council (INC)** CBME competency passing standard.
  - Prevents students from skimming material and promotes genuine clinical mastery before advancing to subsequent modules.

---

### DECISION 03: 100% Course Completion Prerequisite for Grand Final Mock Exams
- **Date**: Assessment System Design Phase
- **Context**: Students were jumping straight to the 40-question comprehensive mock examinations without having studied or cleared individual chapter assessments.
- **Decision**:
  - Locked all Grand Final Examinations (`/quiz/physiology-grand-final`, `/quiz/anatomy-grand-final`, `/quiz/biochem-grand-final`, `/quiz/nutrition-grand-final`) behind a **100% course completion gate**.
  - Students must complete and pass **every single unit** of that subject (12/12 Anatomy, 12/12 Physiology, 7/7 Biochemistry, 10/10 Nutrition) before the Grand Final unlocks.
- **Reason / Rationale**:
  - Mirrors official university end-semester examination eligibility: internal continuous assessments must be cleared before the semester final.
  - Protects mock exam integrity by ensuring the cumulative 40-question exam is taken only after full curriculum mastery.

---

### DECISION 04: Elimination of Nav-Bar Overcrowding & Creation of Unified Syllabus Hub
- **Date**: UI/UX Consolidation Phase
- **Context**: The top navigation bar originally featured individual horizontal buttons for *Anatomy*, *Physiology*, *Biochem*, and *Nutrition*, in addition to *Home*, *Question Bank*, and user controls. On standard laptop screens and mobile viewports, the navbar wrapped into multiple ugly rows, broke layouts, and caused visual fatigue.
- **Decision**:
  - Removed separate subject track buttons from the top bar.
  - Introduced a single, unified **Syllabus** button linking directly to the **Syllabus Hub** (`/syllabus`).
  - Added a responsive hover/click dropdown flyout containing all 4 subjects for instant navigation.
  - Cleaned the mobile drawer into an organized curriculum section.
- **Reason / Rationale**:
  - Restores clean, professional, executive UI aesthetics suitable for a Dean or accreditation inspection.
  - Centralizes curriculum exploration into a dedicated hub where students can filter units and monitor syllabus progress in one place.

---

### DECISION 05: Modernization of Home Dashboard (Removal of Prototype Artifacts)
- **Date**: UI/UX Polish Phase
- **Context**: The student homepage still contained outdated prototype elements, including an obsolete "See what happens to a meal" card, redundant text, and intrusive modal popups.
- **Decision**:
  - Deleted legacy demo cards and popups.
  - Built an executive **Academic Standing** competency widget that tracks live progress across all 4 subjects in real time:
    - 🦴 Applied Anatomy: `X / 12 Units Passed`
    - ⚡ Applied Physiology: `X / 12 Units Passed`
    - 🧬 Applied Biochemistry: `X / 7 Units Passed`
    - 🥗 Applied Nutrition: `X / 10 Units Passed`
  - Added direct, clickable cards for all 4 curriculum tracks with color-coded badges and NCLEX examination modules.
- **Reason / Rationale**:
  - The dashboard now functions as an executive mission control for students, displaying their exact academic standing the moment they log in.

---

### DECISION 06: Question Bank Temporal Dead Zone (TDZ) Fix & Access Gating
- **Date**: Bug Fix & Gating Phase
- **Context**:
  1. Clicking "Question Bank" triggered a blank screen / crash in production.
  2. The Question Bank was open to anyone, allowing students to look up answers before studying the modules.
- **Root Cause & Technical Decision**:
  - **Root Cause**: In `officialQuestionBank.js`, `ANATOMY_DESCRIPTIVE_QUESTIONS`, `PHYSIOLOGY_DESCRIPTIVE_QUESTIONS`, and `ANATOMY_OFFICIAL_MCQS` were declared with `const` at lines 987–1083, but were spread into `DESCRIPTIVE_QUESTIONS` and `OFFICIAL_MCQS` at lines 75 and 951. In JavaScript (ES6), accessing `const` before initialization throws a `ReferenceError` (Temporal Dead Zone).
  - **Code Fix**: Hoisted and declared all chapter extractor loops and base arrays to the top of `officialQuestionBank.js` before they are spread.
  - **Gating Feature**: Added an intelligent gating barrier to `QuestionBankView.jsx`. If a student has not completed any modules, they are presented with an informative barrier explaining the competency requirement, complete with **Back** and **Home** buttons, live subject progress bars, and a faculty evaluation bypass.
- **Reason / Rationale**:
  - Resolves the runtime crash completely while reinforcing curriculum compliance.
  - Eliminates dead ends: students always have clear **Back** and **Home** navigation options.

---

### DECISION 07: Biochemistry & Nutrition Full Curriculum Parity
- **Date**: Curriculum Parity Phase
- **Context**: Anatomy and Physiology featured rich chapter views, dedicated quiz generation, and gating banners, while Biochemistry units 3–7 lacked dedicated lesson pages and Nutrition lacked integrated Grand Final sampling.
- **Decision**:
  1. **Assessment Engine**:
     - Added `buildNutritionChapterQuiz` sampling from 280+ official university MCQs across all 10 units.
     - Added `buildBiochemistryGrandFinalAssessment` (40 NCLEX-style questions across all 7 units).
     - Added `buildNutritionGrandFinalAssessment` (40 clinical questions across all 10 units).
     - Fixed `normalizeBiochemUnit` so Unit 6 (`unit-6-heme-renal`) and Unit 7 (`unit-7-immunochem`) map to their exact assessment question keys.
  2. **Biochemistry Lesson Engine**:
     - Created `biochemistryLessonsData.js` covering all 16 subtopics across Units 3–7 (Protein hierarchy, Zwitterions, Digestion, Urea Cycle, Enzyme kinetics, Inhibitors, Cardiac MI biomarkers, Blood buffers, Henderson-Hasselbalch, ABGs, Heme synthesis, Jaundice types, RFTs/GFR, Immunoglobulins GAMED, Hypersensitivity I–IV, ELISA formats).
     - Created `BiochemistryLessonView.jsx` with Dark/Light mode, definitions, pathway steps, clinical pearls, reference ranges, and interactive completion tracking.
     - Registered `/biochemistry/lesson/:lessonSlug` in `App.jsx` and updated `biochemistryData.js` topic routes.
  3. **Syllabus Gating Banners**:
     - Added Grand Final Gating Banners to both `BioChemistrySyllabus.jsx` (7 units) and `NutritionSyllabus.jsx` (10 units).
  4. **Student Results Parity**:
     - Updated `StudentResults.jsx` to dynamically adapt header titles, total unit counts, and Grand Final links for all 4 subjects.
- **Reason / Rationale**:
  - Ensures a seamless, uniform learning and assessment experience regardless of which subject the student is studying.

---

### DECISION 08: Institutional Revenue & Monetization Strategy (Dean's Presentation)
- **Date**: Monetization & Commercialization Strategy Phase
- **Context**: The user needed a viable strategy to earn money from the college project without charging students directly, since the Dean sponsored the project specifically for student welfare.
- **Decision**:
  - Formulated a 3-pillar **B2B / B2Institution** business model:
    1. **Annual College Campus Software License**: Flat institutional license fee (₹1.5 Lakh – ₹3.5 Lakh/year) paid from college software/library budgets.
    2. **NAAC / INC Accreditation Audit Module**: Positioning the faculty assessment audit portal as an automated compliance reporting tool for inspection committees.
    3. **Cloud Infrastructure & Maintenance Retainer**: Monthly SLA retainer (₹10,000 – ₹15,000/month) for MongoDB Atlas database backups, security patches, and faculty onboarding.
- **Reason / Rationale**:
  - Students access everything 100% free of charge (honoring the Dean's mandate).
  - The developer gets paid recurring, predictable revenue from college institutional funds.

---

## 3. Summary of Major Files Modified & Created

| File | Type | Key Responsibility / Changes |
| :--- | :--- | :--- |
| `frontend/src/services/assessmentEngine.js` | Service | Assessment generation, 75% grading, gating checks, dual-layer attempt recording, roster aggregation. |
| `frontend/src/constants/officialQuestionBank.js` | Constants | Fixed TDZ bug; unified 1,500+ questions across all 4 subjects. |
| `frontend/src/constants/biochemistryLessonsData.js` | Constants *(New)* | Complete clinical textbook data for Biochem Units 3–7. |
| `frontend/src/pages/BioChemistryPages/BiochemistryLessonView.jsx` | Component *(New)* | Interactive lesson reader with Dark/Light mode, pathways, and clinical pearls. |
| `frontend/src/pages/BioChemistrySyllabus.jsx` | Page | Added 7-Unit Grand Final Gating Banner, updated lesson links and completion tracking. |
| `frontend/src/pages/NutritionSyllabus.jsx` | Page | Added 10-Unit Grand Final Gating Banner, quiz links to all 10 units. |
| `frontend/src/pages/QuestionBankView.jsx` | Page | Gating screen with 4 subject progress meters, Back/Home buttons, TDZ crash resolved. |
| `frontend/src/pages/student/QuizView.jsx` | Page | Dynamic subject derivation, stopwatch timer, locked screen with syllabus redirects. |
| `frontend/src/pages/student/StudentResults.jsx` | Page | Dynamic curriculum mastery for all 4 subjects, Grand Final unlock alerts. |
| `frontend/src/pages/Home.jsx` | Page | Replaced legacy demo cards with 4-track Academic Standing tracker and NCLEX links. |
| `frontend/src/components/Navbar.jsx` | Component | Consolidated overcrowded track links into single unified Syllabus dropdown. |
| `frontend/src/pages/SyllabusHub.jsx` | Page | Aligned 4 curriculum track cards and updated Biochemistry to 7 standardized units. |
| `frontend/src/App.jsx` | Routing | Added routes `/biochemistry/lesson/:lessonSlug` and normalized `/quiz/:topicId`. |
| `decision.md` | Documentation *(New)* | Complete chronological decision log and architectural rationale. |
| `flow.md` | Documentation *(New)* | End-to-end execution flow, function call hierarchy, and state transitions. |
| `quiz.md` | Documentation *(New)* | Interactive self-test quiz to master the project architecture and defense. |
