# Project Mastery Assessment: Architecture, Flow & Defense Quiz

Welcome to your project self-test! This quiz is specifically designed to test your deep understanding of how your Nursing LMS codebase works, how data flows between files, why key architectural decisions were made, and how to confidently present and defend this project to your College Dean and Faculty.

---

## 📝 SECTION 1: System Architecture & Data Persistence

### Question 1
**Why does the system use a Dual-Layer Persistence pattern (`localStorage` + MongoDB Atlas) instead of sending all quiz attempts solely to MongoDB?**
- [ ] A) Because MongoDB Atlas cannot store arrays of objects.
- [ ] B) To ensure zero data loss and instant UI navigation even if the student is on poor college Wi-Fi, while syncing to MongoDB in the background.
- [ ] C) Because `localStorage` is required by the Indian Nursing Council regulations.
- [ ] D) Because Express APIs cannot run inside Vite development mode.

---

### Question 2
**What was the root cause of the "Blank Screen / Crash" bug on the Question Bank page, and how was it resolved?**
- [ ] A) Vite could not bundle Tailwind CSS classes.
- [ ] B) The MongoDB connection string timed out.
- [ ] C) In `officialQuestionBank.js`, arrays (`ANATOMY_OFFICIAL_MCQS`, etc.) were declared with `const` after they were already spread into `DESCRIPTIVE_QUESTIONS` and `OFFICIAL_MCQS`, causing an ES6 Temporal Dead Zone (TDZ) `ReferenceError`.
- [ ] D) The student’s authentication token expired.

---

### Question 3
**Where does the application store the list of units a student has successfully passed?**
- [ ] A) In `sessionStorage` under `current_session_token`.
- [ ] B) In `localStorage` under the key `nursing_lms_completed_units`.
- [ ] C) In a cookie named `inc_completion_cookie`.
- [ ] D) Inside a static text file in `frontend/public`.

---

## 📝 SECTION 2: Assessment Engine & Gating Logic

### Question 4
**What is the minimum percentage required to pass any chapter assessment quiz, and why was this specific percentage chosen?**
- [ ] A) 50%, because it is the standard college passing mark for general bachelor degrees.
- [ ] B) 60%, to match first-class university distinctions.
- [ ] C) 75%, because the Indian Nursing Council (INC) CBME guidelines require verified high-competency mastery before students handle clinical bedside patient care.
- [ ] D) 90%, to ensure only top students pass.

---

### Question 5
**How many questions are in a standard Chapter Assessment vs. a Grand Final Comprehensive Exam?**
- [ ] A) Chapter: 5 questions; Grand Final: 20 questions.
- [ ] B) Chapter: 15 questions; Grand Final: 40 questions.
- [ ] C) Chapter: 10 questions; Grand Final: 50 questions.
- [ ] D) Chapter: 25 questions; Grand Final: 100 questions.

---

### Question 6
**A student tries to open `/quiz/biochem-grand-final`, but has only passed 5 of the 7 Biochemistry chapter assessments. What happens?**
- [ ] A) The page throws a 404 error.
- [ ] B) The exam starts, but the final score is reduced by 20%.
- [ ] C) The system renders the "100% Course Completion Required" locked barrier card, displays their progress (`5 / 7 Units Mastered`), and provides a button to return to the Biochemistry Syllabus.
- [ ] D) The student is automatically logged out of the platform.

---

## 📝 SECTION 3: Curriculum Structure & Subject Normalization

### Question 7
**How many units comprise each of the 4 core foundational curriculum tracks on the platform?**
- [ ] A) Anatomy: 10, Physiology: 10, Biochemistry: 10, Nutrition: 10 (Total 40)
- [ ] B) Anatomy: 12, Physiology: 12, Biochemistry: 7, Nutrition: 10 (Total 41)
- [ ] C) Anatomy: 8, Physiology: 8, Biochemistry: 6, Nutrition: 6 (Total 28)
- [ ] D) Anatomy: 15, Physiology: 15, Biochemistry: 5, Nutrition: 5 (Total 40)

---

### Question 8
**How are Biochemistry Units 3 through 7 rendered when a student clicks a lesson in the syllabus?**
- [ ] A) They redirect to an external PDF download link.
- [ ] B) They redirect to placeholder Module 1 carbohydrate pages.
- [ ] C) They load dynamically via `BiochemistryLessonView.jsx` (`/biochemistry/lesson/:lessonSlug`), pulling clinical textbook data from `biochemistryLessonsData.js` with pathways, pearls, and reference ranges.
- [ ] D) They open a modal window containing raw unformatted JSON.

---

### Question 9
**What is the function of the `normalizeBiochemUnit` function inside `assessmentEngine.js`?**
- [ ] A) It converts all question texts to uppercase letters.
- [ ] B) It maps alternative unit slugs (e.g., `unit-6-heme`, `unit-6-heme-renal`, `6`) to the exact key in `MODULE_ASSESSMENTS` so questions load properly without fallback errors.
- [ ] C) It deletes questions that have not been approved by the teacher.
- [ ] D) It calculates the total word count of the chapter.

---

## 📝 SECTION 4: Code Execution Flow & Function Hierarchy

### Question 10
**Trace the execution order when a student submits their quiz in `QuizView.jsx`:**
- [ ] A) `handleSubmitQuiz()` -> computes score & percentage -> calls `recordAssessmentAttempt()` -> writes to `localStorage` & POSTs to MongoDB -> navigates to `StudentResults.jsx`.
- [ ] B) `handleSubmitQuiz()` -> deletes user token -> reloads `main.jsx` -> sends email to Dean.
- [ ] C) `handleSubmitQuiz()` -> queries MongoDB -> writes to `localStorage` -> closes browser window.
- [ ] D) `handleSubmitQuiz()` -> navigates to `/login` -> resets score to zero.

---

### Question 11
**In `QuestionBankView.jsx`, under what condition is the locked guidance barrier displayed?**
- [ ] A) When the student has never logged in before.
- [ ] B) When `totalCompleted === 0` (student has not passed any unit assessment in any subject) AND the user role is `student` AND preview override is false.
- [ ] C) When the question bank database exceeds 500 questions.
- [ ] D) When the student views the page from a mobile device.

---

### Question 12
**Which service function aggregates student attempts into overall course completion percentages for the Admin and Faculty Result Audit pages?**
- [ ] A) `getAssessmentByTopic()`
- [ ] B) `formatDuration()`
- [ ] C) `getStudentRosterHistory()`
- [ ] D) `buildGrandFinalAssessment()`

---

## 📝 SECTION 5: Institutional Strategy & Dean's Defense

### Question 13
**If the Dean asks: *"Why shouldn't we just use paper exam sheets or Google Forms for chapter quizzes?"*, what is your strongest technical defense?**
- [ ] A) Google Forms costs more money than React.
- [ ] B) Google Forms allows answer sharing, provides no prerequisite gating, cannot enforce the 100% course completion rule for finals, and does not automatically calculate NAAC/INC accreditation audit metrics.
- [ ] C) Paper exam sheets cannot be printed on campus printers.
- [ ] D) Google Forms is incompatible with Indian Nursing Council standards.

---

### Question 14
**How can you monetize this project without charging students directly?**
- [ ] A) Run popup advertisements on the quiz screens.
- [ ] B) Charge the college an **Annual Institutional Campus Software License** and an **Accreditation Audit Package** paid out of college library/IT funds.
- [ ] C) Require students to pay cash before unlocking the Grand Final.
- [ ] D) Sell student data to third-party marketing companies.

---

# 🔑 Answer Key & In-Depth Explanations

### Answer 1: **B**
> **Explanation**: Medical students in hospitals and campus labs experience frequent network fluctuations. The Dual-Layer pattern guarantees that an attempt is saved immediately in browser memory (`localStorage`), ensuring zero test loss and instantaneous feedback, while concurrently dispatching a background POST to MongoDB Atlas.

### Answer 2: **C**
> **Explanation**: In ES6, variables declared with `const` cannot be accessed before their declaration due to the Temporal Dead Zone. By spreading arrays that were declared hundreds of lines below, the browser threw a fatal `ReferenceError`, resulting in a blank page. Hoisting the declarations to the top of the module resolved the crash completely.

### Answer 3: **B**
> **Explanation**: `nursing_lms_completed_units` stores an array of passed unit strings. When a student scores $\ge 75\%$, `recordAssessmentAttempt` appends the `topicId` to this array.

### Answer 4: **C**
> **Explanation**: The Indian Nursing Council CBME curriculum establishes strict competency standards because clinical mistakes directly impact human life. A 75% benchmark ensures that students achieve genuine mastery before proceeding.

### Answer 5: **B**
> **Explanation**: Chapter quizzes contain 15 high-yield focused questions; Grand Finals contain 40 mixed questions sampling across all units of the subject.

### Answer 6: **C**
> **Explanation**: The Grand Final is gated behind 100% completion. `QuizView.jsx` detects `isGrandFinal && !gating.isFinalUnlocked`, intercepts execution, and renders the locked barrier card showing `5 / 7 Units Mastered` and a direct link back to the syllabus.

### Answer 7: **B**
> **Explanation**: The curriculum is standardized as: Anatomy (12 Units), Physiology (12 Units), Biochemistry (7 Units), and Nutrition & Dietetics (10 Units), totaling **41 curriculum units**.

### Answer 8: **C**
> **Explanation**: Biochemistry Units 3–7 now have a dedicated lesson engine (`BiochemistryLessonView.jsx`) that fetches rich medical textbook content from `biochemistryLessonsData.js`, complete with dark mode, biochemical pathways, clinical pearls, and reference ranges.

### Answer 9: **B**
> **Explanation**: Slugs may vary depending on whether they originate from URL params, syllabus links, or legacy constants. `normalizeBiochemUnit` guarantees that `unit-6-heme-renal` and `unit-7-immunochem` always resolve to their exact keys in `MODULE_ASSESSMENTS`.

### Answer 10: **A**
> **Explanation**: `handleSubmitQuiz` grades selected options locally, packages the review payload, calls `recordAssessmentAttempt()` to update `localStorage` and trigger the MongoDB API sync, and then routes to `StudentResults.jsx`.

### Answer 11: **B**
> **Explanation**: `QuestionBankView.jsx` checks `totalCompleted > 0 || role === 'faculty' || role === 'admin' || previewOverride`. A student who has not passed at least one module sees the gating barrier.

### Answer 12: **C**
> **Explanation**: `getStudentRosterHistory()` in `assessmentEngine.js` groups attempts by student, tallies their passed unit set against the 41 total units, breaks down progress across all 4 subjects, and computes overall average scores.

### Answer 13: **B**
> **Explanation**: Google Forms lack algorithmic prerequisite gating, allow cheating, do not maintain continuous user learning histories, and cannot generate automated institutional compliance reports for NAAC/INC audits.

### Answer 14: **B**
> **Explanation**: Charging students directly violates the Dean's student welfare mandate. The institutional B2B model positions the platform as institutional infrastructure funded via college IT/software budgets, accreditation grants, or annual maintenance retainers.
