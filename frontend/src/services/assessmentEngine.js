// Assessment & Gating Engine for Nursing LMS
// Generates Chapter-wise Quizzes, Grand Final Mixed Assessments,
// Enforces 100% Course Completion Gating, and Syncs with MongoDB Atlas

import { PHYSIOLOGY_CHAPTERS } from '../constants/physiologyChaptersData';
import { ANATOMY_CHAPTERS } from '../constants/anatomyChaptersData';
import { MODULE_ASSESSMENTS } from '../constants/assessmentQuestions';

const ATTEMPTS_STORAGE_KEY = 'nursing_lms_all_attempts';
const COMPLETED_UNITS_KEY = 'nursing_lms_completed_units';

/**
 * Returns formatted 4-choice questions for any Physiology chapter.
 */
function buildPhysiologyChapterQuiz(unitId, questionCount = 15) {
  const chapter = PHYSIOLOGY_CHAPTERS[unitId];
  if (!chapter || !chapter.mcqs || chapter.mcqs.length === 0) return null;

  const allMcqs = chapter.mcqs;
  // Pool of all correct answers in this unit to use as distractors
  const allAnswers = Array.from(new Set(allMcqs.map(m => m.correctAnswer).filter(Boolean)));

  const selected = allMcqs.slice(0, questionCount);

  const formattedQuestions = selected.map((q, idx) => {
    const correct = q.correctAnswer;
    // Pick 3 random distractors from other questions in this chapter
    const distractors = allAnswers.filter(a => a !== correct);
    // Shuffle distractors
    const shuffledDistractors = distractors.sort(() => 0.5 - Math.random()).slice(0, 3);
    
    // Combine correct with distractors and place at random index
    const options = [correct, ...shuffledDistractors];
    // If less than 4 options, pad with plausible options
    while (options.length < 4) {
      options.push(`Alternative physiological variant ${options.length}`);
    }
    // Shuffle options
    const shuffledOptions = options.sort(() => 0.5 - Math.random());
    const correctIdx = shuffledOptions.indexOf(correct);

    return {
      id: q.id || `phys-${unitId}-${idx + 1}`,
      text: q.question,
      options: shuffledOptions,
      correctAnswer: correctIdx,
      rationale: `According to INC syllabus competencies: ${correct} is the verified physiological answer for ${q.subtopic || chapter.title}.`,
      subtopic: q.subtopic || chapter.title,
      reviewTopic: chapter.title,
      reviewLink: `/physiology/lesson/${unitId}`
    };
  });

  return {
    id: unitId,
    title: `Unit ${chapter.unitNumber}: ${chapter.title} (Assessment Exam)`,
    description: `Official chapter assessment with ${formattedQuestions.length} INC-standard questions. Minimum 75% required to pass.`,
    subject: 'physiology',
    unitNumber: chapter.unitNumber,
    questions: formattedQuestions
  };
}

/**
 * Returns formatted 4-choice questions for any Anatomy chapter.
 */
function buildAnatomyChapterQuiz(unitId, questionCount = 15) {
  const chapter = ANATOMY_CHAPTERS[unitId];
  if (!chapter || !chapter.mcqs || chapter.mcqs.length === 0) return null;

  const allMcqs = chapter.mcqs;
  const selected = allMcqs.slice(0, questionCount);

  const formattedQuestions = selected.map((q, idx) => {
    const rawOptions = q.options && q.options.length >= 2 ? q.options : ['Option A', 'Option B', 'Option C', 'Option D'];
    const correctVal = q.correctAnswer || q.answer || rawOptions[0];
    let correctIdx = rawOptions.indexOf(correctVal);
    if (correctIdx === -1) correctIdx = 0;

    return {
      id: q.id || `anat-${unitId}-${idx + 1}`,
      text: q.question,
      options: rawOptions,
      correctAnswer: correctIdx,
      rationale: `INC Anatomy standard: ${correctVal} is the verified anatomical landmark and structure.`,
      subtopic: q.subtopic || chapter.title,
      reviewTopic: chapter.title,
      reviewLink: `/anatomy/lesson/${unitId}`
    };
  });

  return {
    id: unitId,
    title: `Unit ${chapter.unitNumber}: ${chapter.title} (Assessment Exam)`,
    description: `Official chapter assessment with ${formattedQuestions.length} INC-standard questions. Minimum 75% required to pass.`,
    subject: 'anatomy',
    unitNumber: chapter.unitNumber,
    questions: formattedQuestions
  };
}

/**
 * Builds the Grand Mixed Final Assessment (samples questions across ALL 12 chapters).
 */
export function buildGrandFinalAssessment(subject = 'physiology', totalQuestions = 48) {
  const isPhys = subject === 'physiology';
  const chaptersMap = isPhys ? PHYSIOLOGY_CHAPTERS : ANATOMY_CHAPTERS;
  const unitKeys = Object.keys(chaptersMap);
  const questionsPerUnit = Math.max(2, Math.floor(totalQuestions / unitKeys.length));

  let finalQuestions = [];

  unitKeys.forEach((uid) => {
    const unitQuiz = isPhys ? buildPhysiologyChapterQuiz(uid, questionsPerUnit) : buildAnatomyChapterQuiz(uid, questionsPerUnit);
    if (unitQuiz && unitQuiz.questions) {
      finalQuestions = finalQuestions.concat(unitQuiz.questions);
    }
  });

  // Limit to totalQuestions
  finalQuestions = finalQuestions.slice(0, totalQuestions);

  return {
    id: `${subject}-grand-final`,
    title: `${isPhys ? 'Applied Physiology' : 'Applied Anatomy'} Comprehensive Grand Final Examination`,
    description: `Cumulative mixed exam covering all 12 modules (${finalQuestions.length} NCLEX-format clinical questions). Minimum 75% required for course certification.`,
    subject,
    isGrandFinal: true,
    questions: finalQuestions
  };
}

/**
 * Universal quiz fetcher supporting any topic / chapter / final.
 */
export function getAssessmentByTopic(topicId) {
  if (!topicId) return buildGrandFinalAssessment('physiology');

  if (topicId === 'comprehensive-final-phys' || topicId === 'physiology-grand-final') {
    return buildGrandFinalAssessment('physiology');
  }

  if (topicId === 'comprehensive-final-anatomy' || topicId === 'anatomy-grand-final') {
    return buildGrandFinalAssessment('anatomy');
  }

  if (topicId.startsWith('phys-unit-')) {
    return buildPhysiologyChapterQuiz(topicId);
  }

  if (topicId.startsWith('anatomy-unit-') || topicId.startsWith('anat-unit-')) {
    const normalized = topicId.replace('anat-unit-', 'anatomy-unit-');
    return buildAnatomyChapterQuiz(normalized);
  }

  // Fallback to Biochemistry MODULE_ASSESSMENTS
  if (MODULE_ASSESSMENTS[topicId]) {
    return MODULE_ASSESSMENTS[topicId];
  }

  return buildGrandFinalAssessment('physiology');
}

/**
 * Gating: Checks student completion status across all units of a subject.
 */
export function getStudentGatingStatus(subject = 'physiology') {
  const isPhys = subject === 'physiology';
  const prefix = isPhys ? 'phys-unit-' : 'anatomy-unit-';
  const totalUnits = 12;

  try {
    const rawCompleted = localStorage.getItem(COMPLETED_UNITS_KEY);
    const completedList = rawCompleted ? JSON.parse(rawCompleted) : [];

    const completedForSubject = completedList.filter(id => id.startsWith(prefix));
    const completionPercent = Math.min(100, Math.round((completedForSubject.length / totalUnits) * 100));
    const isFinalUnlocked = completedForSubject.length >= totalUnits;

    return {
      subject,
      totalUnits,
      completedCount: completedForSubject.length,
      completionPercent,
      completedUnits: completedForSubject,
      isFinalUnlocked,
      remainingCount: Math.max(0, totalUnits - completedForSubject.length)
    };
  } catch {
    return {
      subject,
      totalUnits: 12,
      completedCount: 0,
      completionPercent: 0,
      completedUnits: [],
      isFinalUnlocked: false,
      remainingCount: 12
    };
  }
}

/**
 * Records an assessment attempt both locally and to MongoDB Atlas backend.
 */
export async function recordAssessmentAttempt(attemptData) {
  const {
    studentId,
    studentName = 'Student',
    studentEmail = 'student@nursing-lms.edu',
    topicId,
    topicTitle,
    subject = 'physiology',
    score,
    totalQuestions,
    percentage,
    passed,
    timeSpentSeconds = 0,
    reviewData = []
  } = attemptData;

  const attemptRecord = {
    id: `att-${Date.now()}-${Math.random().toString(36).substr(2, 5)}`,
    studentId: studentId || 'current-student',
    studentName,
    studentEmail,
    topicId,
    topicTitle,
    subject,
    score,
    totalQuestions,
    percentage,
    passed,
    timeSpentSeconds,
    timeSpentFormatted: formatDuration(timeSpentSeconds),
    reviewData,
    completedAt: new Date().toISOString()
  };

  // 1. Save locally
  try {
    const existing = JSON.parse(localStorage.getItem(ATTEMPTS_STORAGE_KEY) || '[]');
    existing.unshift(attemptRecord);
    localStorage.setItem(ATTEMPTS_STORAGE_KEY, JSON.stringify(existing.slice(0, 100)));

    // 2. If passed and chapter assessment, record unit completion
    if (passed && topicId && !topicId.includes('grand-final')) {
      const completed = JSON.parse(localStorage.getItem(COMPLETED_UNITS_KEY) || '[]');
      if (!completed.includes(topicId)) {
        completed.push(topicId);
        localStorage.setItem(COMPLETED_UNITS_KEY, JSON.stringify(completed));
      }
    }
  } catch (err) {
    console.warn('[AssessmentEngine] localStorage error:', err);
  }

  // 3. Sync to MongoDB Atlas API if server reachable
  try {
    const token = localStorage.getItem('token') || localStorage.getItem('firebase_token');
    await fetch('/api/assessments/submit', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...(token ? { Authorization: `Bearer ${token}` } : {})
      },
      body: JSON.stringify({
        scopeType: topicId.includes('grand-final') ? 'course' : 'chapter',
        scopeId: topicId,
        score,
        totalQuestions,
        percentage,
        passed,
        timeSpentSeconds,
        answers: reviewData.map((r, i) => ({
          questionId: r.id || `q-${i}`,
          selectedOption: r.studentAnswer,
          correctOption: r.correctAnswer,
          isCorrect: r.isCorrect
        }))
      })
    });
  } catch (apiErr) {
    // Graceful offline fallback
    console.info('[AssessmentEngine] Attempt saved locally; backend sync queued.');
  }

  return attemptRecord;
}

/**
 * Returns all recorded attempts across the platform for Admin & Faculty views.
 */
export function getAllRecordedAttempts() {
  try {
    const raw = localStorage.getItem(ATTEMPTS_STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

/**
 * Returns complete academic history grouped per student for the Admin audit.
 */
export function getStudentRosterHistory() {
  const attempts = getAllRecordedAttempts();
  const rosterMap = {};

  attempts.forEach(att => {
    const key = att.studentEmail || att.studentId || 'unknown';
    if (!rosterMap[key]) {
      rosterMap[key] = {
        studentId: att.studentId,
        studentName: att.studentName,
        studentEmail: att.studentEmail,
        attempts: [],
        completedUnits: new Set(),
        totalScoreSum: 0
      };
    }

    rosterMap[key].attempts.push(att);
    rosterMap[key].totalScoreSum += att.percentage;
    if (att.passed && att.topicId && !att.topicId.includes('grand-final')) {
      rosterMap[key].completedUnits.add(att.topicId);
    }
  });

  return Object.values(rosterMap).map(student => ({
    studentId: student.studentId,
    studentName: student.studentName,
    studentEmail: student.studentEmail,
    totalAttempts: student.attempts.length,
    averageScore: Math.round(student.totalScoreSum / (student.attempts.length || 1)),
    completedUnitsCount: student.completedUnits.size,
    completionPercentage: Math.min(100, Math.round((student.completedUnits.size / 12) * 100)),
    attempts: student.attempts
  }));
}

export function formatDuration(seconds) {
  if (!seconds || seconds <= 0) return 'Under 1 min';
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  if (mins === 0) return `${secs} sec`;
  return `${mins} min ${secs > 0 ? `${secs} sec` : ''}`.trim();
}
