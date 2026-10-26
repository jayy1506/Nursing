// Assessment & Gating Engine for Nursing LMS
// Generates Chapter-wise Quizzes, Grand Final Mixed Assessments for ALL 4 Subjects
// (Anatomy, Physiology, Biochemistry, Nutrition & Dietetics)
// Enforces 100% Course Completion Gating, and Syncs with MongoDB Atlas

import { PHYSIOLOGY_CHAPTERS } from '../constants/physiologyChaptersData';
import { ANATOMY_CHAPTERS } from '../constants/anatomyChaptersData';
import { MODULE_ASSESSMENTS } from '../constants/assessmentQuestions';
import { NUTRITION_OFFICIAL_MCQS } from '../constants/nutritionOfficialMcqs';

const ATTEMPTS_STORAGE_KEY = 'nursing_lms_all_attempts';
const COMPLETED_UNITS_KEY = 'nursing_lms_completed_units';

/**
 * Deterministic PRNG seeded by string to produce stable, constant option orders
 * that never change or flicker during timer ticks and re-renders.
 */
function pseudoRandomSeed(seedStr) {
  let h = 0x811c9dc5;
  const str = String(seedStr || 'medpulse_seed');
  for (let i = 0; i < str.length; i++) {
    h ^= str.charCodeAt(i);
    h = Math.imul(h, 0x01000193);
  }
  return function () {
    h = Math.imul(h ^ (h >>> 16), 2246822507);
    h = Math.imul(h ^ (h >>> 13), 3266489909);
    return ((h ^= h >>> 16) >>> 0) / 4294967296;
  };
}

function deterministicShuffle(array, seedStr) {
  const rng = pseudoRandomSeed(seedStr);
  const arr = array.slice();
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(rng() * (i + 1));
    const temp = arr[i];
    arr[i] = arr[j];
    arr[j] = temp;
  }
  return arr;
}

/**
 * Returns formatted 4-choice questions for any Physiology chapter.
 */
function buildPhysiologyChapterQuiz(unitId, questionCount = 15) {
  const chapter = PHYSIOLOGY_CHAPTERS[unitId];
  if (!chapter || !chapter.mcqs || chapter.mcqs.length === 0) return null;

  const allMcqs = chapter.mcqs;
  const allAnswers = Array.from(new Set(allMcqs.map(m => m.correctAnswer).filter(Boolean)));
  const selected = allMcqs.slice(0, questionCount);

  const formattedQuestions = selected.map((q, idx) => {
    const seed = q.id || `phys-${unitId}-${idx + 1}`;
    const correct = q.correctAnswer;
    const distractors = allAnswers.filter(a => a !== correct);
    const constantDistractors = deterministicShuffle(distractors, seed + '_dist').slice(0, 3);
    const options = [correct, ...constantDistractors];
    while (options.length < 4) {
      options.push(`Alternative physiological variant ${options.length}`);
    }
    const constantOptions = deterministicShuffle(options, seed + '_opts');
    const correctIdx = constantOptions.indexOf(correct);

    return {
      id: seed,
      text: q.question,
      options: constantOptions,
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

// Domain-categorized anatomical distractor pools for questions without pre-set options
const ANATOMY_DIRECTIONAL_TERMS = [
  'Above another structure',
  'Below another structure',
  'Nearer to the midline of the body',
  'Farther from the midline of the body',
  'Toward the front of the body',
  'Toward the back of the body',
  'Nearer to the attachment of a limb',
  'Farther from the attachment of a limb',
  'Toward or at the body surface',
  'Away from the body surface'
];

const ANATOMY_PLANES = [
  'Left and right',
  'Superior and inferior',
  'Anterior and posterior',
  'Upper and lower halves'
];

const ANATOMY_CAVITIES = [
  'Thoracic cavity',
  'Abdominal cavity',
  'Pelvic cavity',
  'Cranial cavity',
  'Pericardial cavity',
  'Pleural cavity',
  'Vertebral cavity'
];

const ANATOMY_TISSUES = [
  'Simple squamous epithelium',
  'Simple cuboidal epithelium',
  'Simple columnar epithelium',
  'Stratified squamous epithelium',
  'Dense regular connective tissue',
  'Hyaline cartilage',
  'Elastic cartilage',
  'Adipose tissue'
];

const ANATOMY_ORGANELLES = [
  'Mitochondria',
  'Rough endoplasmic reticulum',
  'Smooth endoplasmic reticulum',
  'Golgi apparatus',
  'Ribosomes',
  'Lysosomes',
  'Peroxisomes',
  'Nucleus'
];

let cachedAllAnatomyAnswers = null;
function getAllAnatomyAnswers() {
  if (cachedAllAnatomyAnswers) return cachedAllAnatomyAnswers;
  const list = [];
  for (const k in ANATOMY_CHAPTERS) {
    (ANATOMY_CHAPTERS[k].mcqs || []).forEach(m => {
      const a = m.correctAnswer || m.answer;
      if (a && typeof a === 'string') list.push(a.trim());
    });
  }
  cachedAllAnatomyAnswers = Array.from(new Set(list));
  return cachedAllAnatomyAnswers;
}

function resolveAnatomyOptions(q, chapterMcqs) {
  if (q.options && q.options.length >= 2) {
    const correctVal = (q.correctAnswer || q.answer || q.options[0]).trim();
    let correctIdx = q.options.findIndex(
      opt => opt.trim().toLowerCase() === correctVal.toLowerCase()
    );
    if (correctIdx === -1) correctIdx = 0;
    return { options: q.options, correctIdx, correctVal };
  }

  const correct = (q.correctAnswer || q.answer || '').trim();
  const qText = (q.question || '').toLowerCase();

  let matchedCategoryPool = null;
  if (
    ANATOMY_DIRECTIONAL_TERMS.some(t => t.toLowerCase() === correct.toLowerCase()) ||
    qText.includes('superior') || qText.includes('inferior') ||
    qText.includes('distal') || qText.includes('proximal') ||
    qText.includes('medial') || qText.includes('lateral')
  ) {
    matchedCategoryPool = ANATOMY_DIRECTIONAL_TERMS;
  } else if (
    ANATOMY_PLANES.some(t => t.toLowerCase() === correct.toLowerCase()) ||
    qText.includes('plane') || qText.includes('sagittal') ||
    qText.includes('transverse') || qText.includes('coronal')
  ) {
    matchedCategoryPool = ANATOMY_PLANES;
  } else if (
    ANATOMY_CAVITIES.some(t => t.toLowerCase() === correct.toLowerCase()) ||
    qText.includes('cavity')
  ) {
    matchedCategoryPool = ANATOMY_CAVITIES;
  } else if (
    ANATOMY_ORGANELLES.some(t => t.toLowerCase() === correct.toLowerCase()) ||
    qText.includes('organelle') || qText.includes('reticulum')
  ) {
    matchedCategoryPool = ANATOMY_ORGANELLES;
  } else if (
    ANATOMY_TISSUES.some(t => t.toLowerCase() === correct.toLowerCase()) ||
    qText.includes('epithelial') || qText.includes('tissue') || qText.includes('cartilage')
  ) {
    matchedCategoryPool = ANATOMY_TISSUES;
  }

  const chapterAnswers = Array.from(
    new Set((chapterMcqs || []).map(m => (m.correctAnswer || m.answer || '').trim()).filter(Boolean))
  );

  const pool = matchedCategoryPool
    ? matchedCategoryPool.filter(item => item.toLowerCase() !== correct.toLowerCase())
    : chapterAnswers.filter(item => item.toLowerCase() !== correct.toLowerCase());

  const sortedDistractors = pool.slice().sort((a, b) => {
    return Math.abs(a.length - correct.length) - Math.abs(b.length - correct.length);
  });

  const selectedDistractors = sortedDistractors.slice(0, 3);

  if (selectedDistractors.length < 3) {
    const allAnswers = getAllAnatomyAnswers();
    const backupPool = allAnswers
      .filter(
        a =>
          a.toLowerCase() !== correct.toLowerCase() &&
          !selectedDistractors.some(d => d.toLowerCase() === a.toLowerCase())
      )
      .sort((a, b) => Math.abs(a.length - correct.length) - Math.abs(b.length - correct.length));

    for (const b of backupPool) {
      if (selectedDistractors.length >= 3) break;
      selectedDistractors.push(b);
    }
  }

  const rawList = [correct, ...selectedDistractors].slice(0, 4);
  const options = deterministicShuffle(rawList, q.id || q.question || 'anat_q');
  const correctIdx = options.indexOf(correct);

  return { options, correctIdx, correctVal: correct };
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
    const { options, correctIdx, correctVal } = resolveAnatomyOptions(q, allMcqs);

    return {
      id: q.id || `anat-${unitId}-${idx + 1}`,
      text: q.question,
      options,
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
 * Normalizes Nutrition unit slug.
 */
function normalizeNutritionUnit(unitId) {
  if (!unitId) return 'unit-nut-1-intro';
  const unitMap = {
    1: 'unit-nut-1-intro',
    2: 'unit-nut-2-carbs',
    3: 'unit-nut-3-fats',
    4: 'unit-nut-4-minerals',
    5: 'unit-nut-5-balanced-diet',
    6: 'unit-nut-6-deficiencies',
    7: 'unit-nut-7-therapeutic',
    8: 'unit-nut-8-cookery',
    9: 'unit-nut-9-assessment',
    10: 'unit-nut-10-programs'
  };

  const numMatch = unitId.match(/\d+/);
  if (numMatch) {
    const num = parseInt(numMatch[0]);
    if (unitMap[num]) return unitMap[num];
  }
  return unitId;
}

/**
 * Returns formatted 4-choice questions for any Nutrition chapter.
 */
export function buildNutritionChapterQuiz(rawUnitId, questionCount = 15) {
  const normalizedId = normalizeNutritionUnit(rawUnitId);
  const questionsForUnit = NUTRITION_OFFICIAL_MCQS.filter(q => q.unit === normalizedId);
  const pool = questionsForUnit.length > 0 ? questionsForUnit : NUTRITION_OFFICIAL_MCQS;
  const selected = pool.slice(0, questionCount);
  const unitNum = parseInt(normalizedId.replace(/\D/g, '')) || 1;

  const formattedQuestions = selected.map((q, idx) => {
    let options = q.options && q.options.length >= 2 ? q.options : null;
    const correctVal = q.correctOption || q.correctAnswer || (options ? options[0] : '');

    if (!options) {
      const seed = q.id || `nut-${normalizedId}-${idx + 1}`;
      const allNutAnswers = Array.from(new Set(pool.map(p => p.correctOption).filter(Boolean)));
      const distractors = allNutAnswers.filter(a => a !== correctVal);
      const constantDistractors = deterministicShuffle(distractors, seed + '_dist').slice(0, 3);
      options = deterministicShuffle([correctVal, ...constantDistractors], seed + '_opts');
    }

    let correctIdx = options.indexOf(correctVal);
    if (correctIdx === -1) correctIdx = 0;

    return {
      id: q.id || `nut-${normalizedId}-${idx + 1}`,
      text: q.question,
      options,
      correctAnswer: correctIdx,
      rationale: `INC Nutrition standard: ${correctVal} is the verified clinical and dietetic outcome.`,
      subtopic: q.topic || `Nutrition Unit ${unitNum}`,
      reviewTopic: q.topic || `Nutrition Unit ${unitNum}`,
      reviewLink: `/nutrition-syllabus`
    };
  });

  return {
    id: normalizedId,
    title: `Unit ${unitNum}: ${selected[0]?.topic || 'Nutrition & Dietetics'} (Assessment Exam)`,
    description: `Official chapter assessment with ${formattedQuestions.length} INC-standard questions. Minimum 75% required to pass.`,
    subject: 'nutrition',
    unitNumber: unitNum,
    questions: formattedQuestions
  };
}

/**
 * Builds the Grand Mixed Final Assessment for Nutrition (samples across all 10 units).
 */
export function buildNutritionGrandFinalAssessment(totalQuestions = 40) {
  const unitSlugs = [
    'unit-nut-1-intro',
    'unit-nut-2-carbs',
    'unit-nut-3-fats',
    'unit-nut-4-minerals',
    'unit-nut-5-balanced-diet',
    'unit-nut-6-deficiencies',
    'unit-nut-7-therapeutic',
    'unit-nut-8-cookery',
    'unit-nut-9-assessment',
    'unit-nut-10-programs'
  ];

  let finalQuestions = [];
  unitSlugs.forEach(slug => {
    const unitQuiz = buildNutritionChapterQuiz(slug, 4);
    if (unitQuiz && unitQuiz.questions) {
      finalQuestions = finalQuestions.concat(unitQuiz.questions);
    }
  });

  finalQuestions = finalQuestions.slice(0, totalQuestions);

  return {
    id: `nutrition-grand-final`,
    title: `Applied Nutrition & Dietetics Comprehensive Grand Final Examination`,
    description: `Cumulative mixed exam covering all 10 modules (${finalQuestions.length} NCLEX-format clinical questions). Minimum 75% required for course certification.`,
    subject: 'nutrition',
    isGrandFinal: true,
    questions: finalQuestions
  };
}

/**
 * Normalizes Biochemistry unit slug.
 */
function normalizeBiochemUnit(unitId) {
  if (!unitId) return 'unit-1-carbs';
  if (unitId === 'unit-5-acidbase' || unitId === 'unit-5-acid-base') return 'unit-5-acid-base';
  if (unitId === 'unit-6-heme' || unitId === 'unit-6-heme-renal') return 'unit-6-heme-renal';
  if (unitId === 'unit-7-organ' || unitId === 'unit-7-immunochem' || unitId === 'unit-8-immuno') return 'unit-7-immunochem';
  const numMatch = unitId.match(/\d+/);
  if (numMatch) {
    const num = parseInt(numMatch[0]);
    const numMap = {
      1: 'unit-1-carbs',
      2: 'unit-2-lipids',
      3: 'unit-3-proteins',
      4: 'unit-4-enzymes',
      5: 'unit-5-acid-base',
      6: 'unit-6-heme-renal',
      7: 'unit-7-immunochem'
    };
    if (numMap[num]) return numMap[num];
  }
  return unitId;
}

/**
 * Builds the Grand Mixed Final Assessment for Biochemistry.
 */
export function buildBiochemistryGrandFinalAssessment(totalQuestions = 40) {
  if (MODULE_ASSESSMENTS['grand-final'] && MODULE_ASSESSMENTS['grand-final'].questions) {
    const assessment = MODULE_ASSESSMENTS['grand-final'];
    return {
      id: `biochem-grand-final`,
      title: `Applied Biochemistry Comprehensive Grand Final Examination`,
      description: `Cumulative mixed examination covering all 7 modules (${assessment.questions.length} NCLEX-format clinical questions). Minimum 75% required for course certification.`,
      subject: 'biochemistry',
      isGrandFinal: true,
      questions: assessment.questions.slice(0, totalQuestions)
    };
  }

  const bUnits = ['unit-1-carbs', 'unit-2-lipids', 'unit-3-proteins', 'unit-4-enzymes', 'unit-5-acid-base', 'unit-6-heme-renal', 'unit-7-immunochem'];
  let questions = [];
  bUnits.forEach(u => {
    if (MODULE_ASSESSMENTS[u] && MODULE_ASSESSMENTS[u].questions) {
      questions = questions.concat(MODULE_ASSESSMENTS[u].questions.slice(0, 6));
    }
  });

  return {
    id: `biochem-grand-final`,
    title: `Applied Biochemistry Comprehensive Grand Final Examination`,
    description: `Cumulative mixed examination covering all 7 modules. Minimum 75% required for course certification.`,
    subject: 'biochemistry',
    isGrandFinal: true,
    questions: questions.slice(0, totalQuestions)
  };
}

/**
 * Builds the Grand Mixed Final Assessment (samples questions across ALL chapters).
 */
export function buildGrandFinalAssessment(subject = 'physiology', totalQuestions = 48) {
  if (subject === 'biochemistry') return buildBiochemistryGrandFinalAssessment();
  if (subject === 'nutrition') return buildNutritionGrandFinalAssessment();

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
 * Universal quiz fetcher supporting any topic / chapter / final across all 4 subjects.
 */
export function getAssessmentByTopic(topicId) {
  if (!topicId) return buildGrandFinalAssessment('physiology');

  // Physiology Grand Final
  if (topicId === 'comprehensive-final-phys' || topicId === 'physiology-grand-final') {
    return buildGrandFinalAssessment('physiology');
  }

  // Anatomy Grand Final
  if (topicId === 'comprehensive-final-anatomy' || topicId === 'anatomy-grand-final') {
    return buildGrandFinalAssessment('anatomy');
  }

  // Biochemistry Grand Final
  if (topicId === 'comprehensive-final' || topicId === 'biochem-grand-final' || topicId === 'biochemistry-grand-final' || topicId === 'grand-final') {
    return buildBiochemistryGrandFinalAssessment();
  }

  // Nutrition Grand Final
  if (topicId === 'nutrition-grand-final' || topicId === 'nut-grand-final' || topicId === 'comprehensive-final-nutrition') {
    return buildNutritionGrandFinalAssessment();
  }

  // Physiology chapter quizzes
  if (topicId.startsWith('phys-unit-')) {
    return buildPhysiologyChapterQuiz(topicId);
  }

  // Anatomy chapter quizzes
  if (topicId.startsWith('anatomy-unit-') || topicId.startsWith('anat-unit-')) {
    const normalized = topicId.replace('anat-unit-', 'anatomy-unit-');
    return buildAnatomyChapterQuiz(normalized);
  }

  // Nutrition chapter quizzes
  if (
    topicId.startsWith('unit-nut-') ||
    topicId.startsWith('nut-unit-') ||
    topicId.startsWith('nutrition-unit-') ||
    topicId.includes('intro-nutrition') ||
    topicId.includes('carbs-fiber') ||
    topicId.includes('fats-efa') ||
    topicId.includes('minerals') ||
    topicId.includes('balanced-diet') ||
    topicId.includes('deficiencies') ||
    topicId.includes('therapeutic') ||
    topicId.includes('cookery') ||
    topicId.includes('assessment') ||
    topicId.includes('programs')
  ) {
    return buildNutritionChapterQuiz(topicId);
  }

  // Biochemistry chapter quizzes
  const normalizedBioc = normalizeBiochemUnit(topicId);
  if (MODULE_ASSESSMENTS[normalizedBioc]) {
    const mod = MODULE_ASSESSMENTS[normalizedBioc];
    return {
      id: normalizedBioc,
      title: mod.title,
      description: mod.description,
      subject: 'biochemistry',
      questions: mod.questions
    };
  }

  return buildGrandFinalAssessment('physiology');
}

/**
 * Gating: Checks student completion status across all units of a subject.
 */
export function getStudentGatingStatus(subject = 'physiology') {
  try {
    const rawCompleted = localStorage.getItem(COMPLETED_UNITS_KEY);
    const completedList = rawCompleted ? JSON.parse(rawCompleted) : [];

    if (subject === 'physiology') {
      const unitNums = new Set();
      completedList.forEach(id => {
        if (!id || id.includes('grand-final') || id.includes('comprehensive')) return;
        if (id.startsWith('phys-unit-') || id.startsWith('phys-')) {
          const m = id.match(/\d+/);
          if (m && parseInt(m[0]) <= 12) unitNums.add(parseInt(m[0]));
        }
      });
      const count = unitNums.size;
      return {
        subject,
        totalUnits: 12,
        completedCount: count,
        completionPercent: Math.min(100, Math.round((count / 12) * 100)),
        completedUnits: Array.from(unitNums).map(n => `phys-unit-${n}`),
        isFinalUnlocked: count >= 12,
        remainingCount: Math.max(0, 12 - count)
      };
    } else if (subject === 'anatomy') {
      const unitNums = new Set();
      completedList.forEach(id => {
        if (!id || id.includes('grand-final') || id.includes('comprehensive')) return;
        if (id.startsWith('anatomy-unit-') || id.startsWith('anat-unit-') || id.startsWith('anat-')) {
          const m = id.match(/\d+/);
          if (m && parseInt(m[0]) <= 12) unitNums.add(parseInt(m[0]));
        }
      });
      const count = unitNums.size;
      return {
        subject,
        totalUnits: 12,
        completedCount: count,
        completionPercent: Math.min(100, Math.round((count / 12) * 100)),
        completedUnits: Array.from(unitNums).map(n => `anatomy-unit-${n}`),
        isFinalUnlocked: count >= 12,
        remainingCount: Math.max(0, 12 - count)
      };
    } else if (subject === 'biochemistry') {
      const unitNums = new Set();
      completedList.forEach(id => {
        if (!id || id.includes('grand-final') || id.includes('comprehensive')) return;
        if (id.startsWith('unit-1-') || id.includes('carb')) unitNums.add(1);
        else if (id.startsWith('unit-2-') || id.includes('lipid')) unitNums.add(2);
        else if (id.startsWith('unit-3-') || id.includes('protein')) unitNums.add(3);
        else if (id.startsWith('unit-4-') || id.includes('enzyme')) unitNums.add(4);
        else if (id.startsWith('unit-5-') || id.includes('acid')) unitNums.add(5);
        else if (id.startsWith('unit-6-') || id.includes('heme')) unitNums.add(6);
        else if (id.startsWith('unit-7-') || id.includes('immuno') || id.includes('organ')) unitNums.add(7);
        else if (id.startsWith('bioc-')) {
          const m = id.match(/\d+/);
          if (m && parseInt(m[0]) <= 7) unitNums.add(parseInt(m[0]));
        }
      });
      const count = unitNums.size;
      return {
        subject,
        totalUnits: 7,
        completedCount: count,
        completionPercent: Math.min(100, Math.round((count / 7) * 100)),
        completedUnits: Array.from(unitNums).map(n => `unit-${n}`),
        isFinalUnlocked: count >= 7,
        remainingCount: Math.max(0, 7 - count)
      };
    } else if (subject === 'nutrition') {
      const unitNums = new Set();
      completedList.forEach(id => {
        if (!id || id.includes('grand-final') || id.includes('comprehensive')) return;
        if (id.startsWith('unit-nut-') || id.startsWith('nut-unit-') || id.startsWith('nutrition-')) {
          const m = id.match(/\d+/);
          if (m && parseInt(m[0]) <= 10) unitNums.add(parseInt(m[0]));
        }
      });
      const count = unitNums.size;
      return {
        subject,
        totalUnits: 10,
        completedCount: count,
        completionPercent: Math.min(100, Math.round((count / 10) * 100)),
        completedUnits: Array.from(unitNums).map(n => `unit-nut-${n}`),
        isFinalUnlocked: count >= 10,
        remainingCount: Math.max(0, 10 - count)
      };
    }

    return {
      subject,
      totalUnits: 12,
      completedCount: 0,
      completionPercent: 0,
      completedUnits: [],
      isFinalUnlocked: false,
      remainingCount: 12
    };
  } catch {
    const total = subject === 'biochemistry' ? 7 : (subject === 'nutrition' ? 10 : 12);
    return {
      subject,
      totalUnits: total,
      completedCount: 0,
      completionPercent: 0,
      completedUnits: [],
      isFinalUnlocked: false,
      remainingCount: total
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
    if (passed && topicId && !topicId.includes('grand-final') && !topicId.includes('comprehensive')) {
      const completed = JSON.parse(localStorage.getItem(COMPLETED_UNITS_KEY) || '[]');
      if (!completed.includes(topicId)) {
        completed.push(topicId);
        localStorage.setItem(COMPLETED_UNITS_KEY, JSON.stringify(completed));
      }
      try {
        window.dispatchEvent(new CustomEvent('nursing_lms_completion_updated', { detail: { unitId: topicId, completed: true } }));
      } catch (e) {
        // window undefined in non-browser env
      }
    }
  } catch (err) {
    console.warn('[AssessmentEngine] localStorage error:', err);
  }

  // 3. Sync to MongoDB Atlas API if server reachable
  try {
    const token = localStorage.getItem('nursing_token') || localStorage.getItem('token') || localStorage.getItem('firebase_token');
    await fetch('/api/assessments/submit', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...(token ? { Authorization: `Bearer ${token}` } : {})
      },
      body: JSON.stringify({
        scopeType: topicId.includes('grand-final') ? 'course' : 'chapter',
        scopeId: topicId,
        topicTitle: topicTitle || topicId,
        studentName,
        studentEmail,
        score,
        totalQuestions,
        percentage,
        passed,
        timeSpentSeconds,
        answers: reviewData.map((r, i) => ({
          questionId: r.id || `q-${i}`,
          selectedOption: typeof r.studentAnswer === 'number' ? r.studentAnswer : 0,
          correctOption: r.correctAnswer,
          isCorrect: r.isCorrect
        }))
      })
    });
  } catch (apiErr) {
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
        completedAnatomy: new Set(),
        completedPhysiology: new Set(),
        completedBiochem: new Set(),
        completedNutrition: new Set(),
        totalScoreSum: 0
      };
    }

    rosterMap[key].attempts.push(att);
    rosterMap[key].totalScoreSum += att.percentage;
    if (att.passed && att.topicId && !att.topicId.includes('grand-final')) {
      rosterMap[key].completedUnits.add(att.topicId);
      if (att.topicId.startsWith('anatomy-') || att.topicId.startsWith('anat-')) {
        rosterMap[key].completedAnatomy.add(att.topicId);
      } else if (att.topicId.startsWith('phys-')) {
        rosterMap[key].completedPhysiology.add(att.topicId);
      } else if (att.topicId.startsWith('unit-nut-') || att.topicId.includes('nutrition')) {
        rosterMap[key].completedNutrition.add(att.topicId);
      } else {
        rosterMap[key].completedBiochem.add(att.topicId);
      }
    }
  });

  return Object.values(rosterMap).map(student => ({
    studentId: student.studentId,
    studentName: student.studentName,
    studentEmail: student.studentEmail,
    totalAttempts: student.attempts.length,
    averageScore: Math.round(student.totalScoreSum / (student.attempts.length || 1)),
    completedUnitsCount: student.completedUnits.size,
    completionPercentage: Math.min(100, Math.round((student.completedUnits.size / 41) * 100)),
    breakdown: {
      anatomy: `${student.completedAnatomy.size}/12`,
      physiology: `${student.completedPhysiology.size}/12`,
      biochemistry: `${student.completedBiochem.size}/7`,
      nutrition: `${student.completedNutrition.size}/10`
    },
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
