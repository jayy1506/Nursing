import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { getStudentGatingStatus, getAllRecordedAttempts } from '../services/assessmentEngine';
import { ProgressRing, ProgressBar } from '../components/ui/ProgressBar';
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { Button } from '../components/ui/Button';
import {
  Sparkles,
  BookOpen,
  ArrowRight,
  ClipboardList,
  Lock,
  Unlock,
  GraduationCap,
  AlertTriangle,
  PlayCircle,
  Clock,
  Timer,
  Bone,
  Activity,
  Dna,
  Utensils
} from 'lucide-react';

export const Home = () => {
  const navigate = useNavigate();
  const { currentUser } = useAuth();

  const [anatStatus, setAnatStatus] = useState({ completedCount: 0, completionPercent: 0, isFinalUnlocked: false });
  const [physStatus, setPhysStatus] = useState({ completedCount: 0, completionPercent: 0, isFinalUnlocked: false });
  const [biocStatus, setBiocStatus] = useState({ completedCount: 0, completionPercent: 0, isFinalUnlocked: false });
  const [nutrStatus, setNutrStatus] = useState({ completedCount: 0, completionPercent: 0, isFinalUnlocked: false });
  const [recentAttempts, setRecentAttempts] = useState([]);
  const [weakTopics, setWeakTopics] = useState([]);

  useEffect(() => {
    // 1. Gating metrics
    const anat = getStudentGatingStatus('anatomy');
    const phys = getStudentGatingStatus('physiology');
    const bioc = getStudentGatingStatus('biochemistry');
    const nutr = getStudentGatingStatus('nutrition');

    setAnatStatus(anat);
    setPhysStatus(phys);
    setBiocStatus(bioc);
    setNutrStatus(nutr);

    // 2. Recent attempts & weak-topics extraction
    const attempts = getAllRecordedAttempts();
    setRecentAttempts(attempts.slice(0, 4));

    // Extract weak topics (questions missed in recent quizzes)
    const missedMap = {};
    attempts.forEach(att => {
      if (att.reviewData && Array.isArray(att.reviewData)) {
        att.reviewData.forEach(q => {
          if (!q.isCorrect && q.subtopic) {
            missedMap[q.subtopic] = (missedMap[q.subtopic] || 0) + 1;
          }
        });
      }
    });

    const sortedWeak = Object.entries(missedMap)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 4)
      .map(([subtopic, count], idx) => ({
        subtopic,
        count,
        priority: idx === 0 ? 'high' : idx === 1 ? 'medium' : 'low'
      }));
    
    // Fallback clinical high-yield pearls if no quizzes attempted yet
    if (sortedWeak.length === 0) {
      setWeakTopics([
        { subtopic: 'Diabetic Ketoacidosis & Lipolysis', priority: 'high', count: 'High Yield' },
        { subtopic: 'Cardiac Hemodynamics & Valves', priority: 'medium', count: 'Priority' },
        { subtopic: 'Cranial Nerves Clinical Tests', priority: 'medium', count: 'Medium' },
        { subtopic: 'PEM: Kwashiorkor vs Marasmus', priority: 'low', count: 'Foundational' }
      ]);
    } else {
      setWeakTopics(sortedWeak);
    }
  }, []);

  const getNickname = () => {
    if (!currentUser) return 'Student';
    if (currentUser.displayName) return currentUser.displayName.split(' ')[0];
    if (currentUser.name) return currentUser.name.split(' ')[0];
    if (currentUser.email) return currentUser.email.split('@')[0];
    return 'Student';
  };

  const nickname = getNickname();

  // Overall completion across all 41 INC syllabus units
  const totalCompletedUnits =
    anatStatus.completedCount +
    physStatus.completedCount +
    biocStatus.completedCount +
    nutrStatus.completedCount;
  const overallPercentage = Math.round((totalCompletedUnits / 41) * 100);

  // Determine last active lesson / continue card
  const lastLesson = localStorage.getItem('medpulse_last_lesson') || '/biochemistry/lesson/classification-of-carb';
  const lastLessonTitle = localStorage.getItem('medpulse_last_lesson_title') || 'Carbohydrate Metabolism & Clinical Correlates';
  const lastLessonChapter = localStorage.getItem('medpulse_last_lesson_chapter') || 'Chapter 3: Intermediary Metabolism';

  const tracks = [
    {
      id: 'anatomy',
      title: 'Applied Human Anatomy',
      code: 'ANAT 105',
      icon: <Bone className="w-5 h-5 text-green-700 dark:text-green-400" />,
      units: 12,
      completed: anatStatus.completedCount,
      percent: anatStatus.completionPercent,
      isUnlocked: true,
      href: '/anatomy-syllabus',
      desc: 'Osteology, neuroanatomy, cardiovascular viscera, and clinical surface landmarks.'
    },
    {
      id: 'physiology',
      title: 'Applied Human Physiology',
      code: 'PHYS 110',
      icon: <Activity className="w-5 h-5 text-green-700 dark:text-green-400" />,
      units: 12,
      completed: physStatus.completedCount,
      percent: physStatus.completionPercent,
      isUnlocked: true,
      href: '/physiology-syllabus',
      desc: 'Cardiac cycle hemodynamics, respiratory ventilation, neural reflexes, and renal clearance.'
    },
    {
      id: 'biochemistry',
      title: 'Applied Biochemistry',
      code: 'BIOC 115',
      icon: <Dna className="w-5 h-5 text-green-700 dark:text-green-400" />,
      units: 7,
      completed: biocStatus.completedCount,
      percent: biocStatus.completionPercent,
      isUnlocked: true,
      href: '/bio-chem-syllabus',
      desc: 'Glycolysis, Krebs cycle, lipid metabolism, clinical biomarkers, and acidosis.'
    },
    {
      id: 'nutrition',
      title: 'Nutrition & Dietetics',
      code: 'NUTR 120',
      icon: <Utensils className="w-5 h-5 text-green-700 dark:text-green-400" />,
      units: 10,
      completed: nutrStatus.completedCount,
      percent: nutrStatus.completionPercent,
      isUnlocked: true,
      href: '/nutrition-syllabus',
      desc: 'Therapeutic diets, nutrient deficiencies, enteral feeding, and medical nutrition therapy.'
    }
  ];

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto space-y-8">
      {/* 1. Header Banner: Hero card - white card, 1px light border, subtle green-50 tint */}
      <section className="relative overflow-hidden bg-white dark:bg-black border border-neutral-200 dark:border-neutral-800 rounded-3xl p-6 sm:p-8 shadow-xs">
        <div className="pointer-events-none absolute inset-0 bg-green-50/40 dark:bg-green-950/10" />

        <div className="relative z-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
          <div className="max-w-xl space-y-2.5">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white dark:bg-neutral-900 text-black dark:text-white text-[11px] font-bold border border-neutral-300 dark:border-neutral-700">
              <Sparkles className="w-3.5 h-3.5 text-green-700 dark:text-green-400" />
              <span>INC CBME Standardized Curriculum &bull; Semester I</span>
            </div>

            <h1 className="text-2xl sm:text-4xl font-black text-black dark:text-white tracking-tight">
              Welcome back, <span className="text-green-700 dark:text-green-400">{nickname}</span>
            </h1>

            <p className="text-neutral-600 dark:text-neutral-300 text-xs sm:text-sm leading-relaxed">
              Master human anatomy, physiological mechanisms, clinical biochemistry, and therapeutic nutrition with bedside case rationales and your chapter-scoped AI tutor.
            </p>

            <div className="pt-2 flex flex-wrap items-center gap-2 sm:gap-3">
              <Button
                variant="primary"
                size="sm"
                onClick={() => navigate('/syllabus')}
                leftIcon={<BookOpen className="w-4 h-4" />}
              >
                Curriculum Hub
              </Button>
              {/* Question Bank secondary button: clearly enabled outline button (black border, green on hover) */}
              <button
                type="button"
                onClick={() => navigate('/question-bank')}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold border-2 border-black dark:border-neutral-300 bg-white dark:bg-black text-black dark:text-white hover:border-green-500 hover:text-green-700 dark:hover:text-green-400 transition-all cursor-pointer shadow-xs focus:outline-none focus-visible:ring-2 focus-visible:ring-green-500"
              >
                <ClipboardList className="w-4 h-4" />
                <span>Question Bank</span>
              </button>
            </div>
          </div>

          {/* Academic Standing & Progress Ring with 0% encouragement message */}
          <div className="flex items-center gap-5 bg-white dark:bg-neutral-900 p-5 rounded-2xl border border-neutral-200 dark:border-neutral-800 shrink-0 w-full sm:w-auto justify-between sm:justify-start shadow-xs">
            <ProgressRing
              value={overallPercentage}
              max={100}
              size={84}
              strokeWidth={7}
              color="#22C55E"
              trackColor="#E5E5E5"
            >
              <div className="text-center">
                <span className="text-base font-black text-black dark:text-white">{overallPercentage}%</span>
                <span className="block text-[8px] uppercase tracking-wider text-green-700 dark:text-green-400 font-extrabold">Overall</span>
              </div>
            </ProgressRing>

            <div className="space-y-1.5 max-w-[200px]">
              <div className="flex items-center gap-1.5">
                <GraduationCap className="w-4 h-4 text-green-700 dark:text-green-400" />
                <h4 className="text-xs font-bold text-black dark:text-white">Competency Progress</h4>
              </div>
              <p className="text-xs text-neutral-800 dark:text-neutral-200 font-bold">
                {totalCompletedUnits} of 41 Units Passed
              </p>
              {overallPercentage === 0 ? (
                <p className="text-[11px] text-green-700 dark:text-green-400 font-semibold leading-tight">
                  Pass your first unit to start your progress
                </p>
              ) : (
                <Badge variant="medium" size="sm">
                  Pass Criterion &ge; 75%
                </Badge>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* 2. Top Action Row: "Resume Learning" (Black card with green accent) & "Focus Revision Areas" */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Resume Learning Card - Black card with green accent, progress bar, chapter name, elapsed time, estimated remaining time */}
        <div className="lg:col-span-2 bg-black text-white border border-neutral-800 rounded-2xl p-5 sm:p-6 flex flex-col justify-between gap-4 shadow-md">
          <div className="space-y-2">
            <div className="flex items-center justify-between flex-wrap gap-2">
              <div className="flex items-center gap-2">
                <Badge variant="high" size="sm">Resume Learning</Badge>
                <span className="text-[11px] text-neutral-400 flex items-center gap-1">
                  <Clock className="w-3 h-3 text-green-400" /> Active 2 hours ago
                </span>
              </div>
              <span className="text-[11px] text-neutral-400 flex items-center gap-1">
                <Timer className="w-3 h-3 text-green-400" /> ~15 min remaining
              </span>
            </div>

            <div>
              <p className="text-[11px] uppercase tracking-wider text-green-400 font-mono font-bold">
                {lastLessonChapter}
              </p>
              <h3 className="text-base font-bold text-white mt-0.5">
                {lastLessonTitle}
              </h3>
            </div>

            <p className="text-xs text-neutral-300">
              Continue clinical correlates, interactive review flashcards, and verified INC bedside rationales.
            </p>

            <div className="space-y-1 pt-1">
              <div className="flex justify-between text-[11px] font-bold text-neutral-400">
                <span>Lesson Progress</span>
                <span className="text-green-400">65%</span>
              </div>
              <ProgressBar value={65} max={100} size="sm" color="green" />
            </div>
          </div>

          <div className="pt-2 flex justify-end">
            <Button
              variant="primary"
              size="md"
              onClick={() => navigate(lastLesson)}
              leftIcon={<PlayCircle className="w-4 h-4 text-black" />}
              className="w-full sm:w-auto"
            >
              Continue Lesson
            </Button>
          </div>
        </div>

        {/* Focus Revision Areas - Clean list with High/Med/Low chips and action link */}
        <Card>
          <CardHeader className="py-3.5 px-4 border-b border-neutral-200 dark:border-neutral-800">
            <div className="flex items-center justify-between">
              <CardTitle className="text-xs flex items-center gap-1.5 font-bold text-black dark:text-white">
                <AlertTriangle className="w-3.5 h-3.5 text-black dark:text-white" />
                Focus Revision Areas
              </CardTitle>
              <Link
                to="/question-bank"
                className="text-[11px] font-bold text-green-700 dark:text-green-400 hover:underline flex items-center gap-0.5"
              >
                Practice All <ArrowRight className="w-3 h-3" />
              </Link>
            </div>
          </CardHeader>
          <CardContent className="p-4 space-y-2.5">
            {weakTopics.map((item, idx) => (
              <div
                key={idx}
                className="flex items-center justify-between p-2 rounded-xl bg-neutral-50 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 gap-2 text-xs"
              >
                <div className="truncate flex-1">
                  <p className="font-semibold text-black dark:text-white truncate">
                    {item.subtopic}
                  </p>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <Badge variant={item.priority || 'medium'} size="sm">
                    {item.count}
                  </Badge>
                  <Link
                    to="/question-bank"
                    className="text-[11px] font-bold text-green-700 dark:text-green-400 hover:underline"
                    title="Practice this topic"
                  >
                    Drill
                  </Link>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* 3. Four Core Subject Tracks Grid - High contrast heading (contrast >= 4.5:1) */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl sm:text-2xl font-black text-black dark:text-white tracking-tight">
              Curriculum Tracks & Gated Milestones
            </h2>
            <p className="text-xs text-neutral-600 dark:text-neutral-400">
              Complete each chapter assessment with &ge; 75% to unlock subject-wide Grand Finals.
            </p>
          </div>
          <Link
            to="/syllabus"
            className="text-xs font-bold text-green-700 dark:text-green-400 hover:underline flex items-center gap-1"
          >
            <span>View All</span>
            <ArrowRight className="w-3 h-3" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
          {tracks.map((track) => (
            <div
              key={track.id}
              onClick={() => navigate(track.href)}
              className="group cursor-pointer rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-black p-5 sm:p-6 flex flex-col justify-between space-y-4 hover:border-green-500 dark:hover:border-green-500 hover:-translate-y-0.5 transition-all shadow-xs"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-neutral-100 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 flex items-center justify-center group-hover:border-green-500 transition-colors">
                      {track.icon}
                    </div>
                    <div>
                      <span className="text-[10px] font-mono font-extrabold uppercase tracking-wider text-neutral-500">
                        {track.code}
                      </span>
                      <h3 className="text-base font-bold text-black dark:text-white">
                        {track.title}
                      </h3>
                    </div>
                  </div>

                  <Badge variant={track.percent >= 100 ? 'success' : 'medium'} size="sm">
                    {track.completed}/{track.units} Units
                  </Badge>
                </div>

                <p className="text-xs text-neutral-600 dark:text-neutral-400 line-clamp-2">
                  {track.desc}
                </p>

                {/* Progress bar */}
                <div className="space-y-1">
                  <div className="flex justify-between text-[11px] font-bold text-neutral-600 dark:text-neutral-400">
                    <span>Course Progress</span>
                    <span className="font-mono text-black dark:text-white">{track.percent}%</span>
                  </div>
                  <ProgressBar value={track.percent} max={100} color="green" />
                </div>
              </div>

              <div className="pt-3 border-t border-neutral-100 dark:border-neutral-800 flex items-center justify-between text-xs">
                <span className="text-neutral-600 dark:text-neutral-400 font-semibold flex items-center gap-1.5">
                  {track.percent >= 100 ? (
                    <>
                      <Unlock className="w-3.5 h-3.5 text-green-700 dark:text-green-400" />
                      Grand Final Unlocked
                    </>
                  ) : (
                    <>
                      <Lock className="w-3.5 h-3.5 text-neutral-400" />
                      Grand Final Locked
                    </>
                  )}
                </span>
                <span className="text-green-700 dark:text-green-400 font-bold flex items-center gap-1 group-hover:translate-x-0.5 transition-transform">
                  Open Syllabus <ArrowRight className="w-3 h-3" />
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 4. Recent Scores & Quick Practice Action */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl sm:text-2xl font-black text-black dark:text-white tracking-tight">
              Recent Assessment Attempts
            </h2>
            <p className="text-xs text-neutral-600 dark:text-neutral-400">
              Review your official scores and bedside clinical question rationales.
            </p>
          </div>
          <Link
            to="/student/results"
            className="text-xs font-bold text-green-700 dark:text-green-400 hover:underline flex items-center gap-1"
          >
            <span>Full History</span>
            <ArrowRight className="w-3 h-3" />
          </Link>
        </div>

        {recentAttempts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {recentAttempts.map((attempt, idx) => (
              <Card key={idx} hover onClick={() => navigate('/student/results')} className="cursor-pointer">
                <CardContent className="p-4 space-y-2">
                  <div className="flex items-center justify-between">
                    <Badge variant={attempt.passed ? 'success' : 'danger'} size="sm">
                      {attempt.passed ? 'Passed' : 'Review'}
                    </Badge>
                    <span className="text-xs font-black text-black dark:text-white font-mono">
                      {attempt.percentage}%
                    </span>
                  </div>
                  <h4 className="text-xs font-bold text-black dark:text-white line-clamp-1">
                    {attempt.topicTitle || 'Comprehensive Quiz'}
                  </h4>
                  <div className="flex items-center justify-between text-[10px] text-neutral-500 pt-1">
                    <span>{attempt.score}/{attempt.totalQuestions} Correct</span>
                    <span>{attempt.timeSpentFormatted || '5 min'}</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <Card className="p-6 text-center">
            <ClipboardList className="w-8 h-8 text-neutral-400 mx-auto mb-2" />
            <h4 className="text-xs font-bold text-black dark:text-white">No Assessment Records Yet</h4>
            <p className="text-[11px] text-neutral-500 mt-1 max-w-sm mx-auto">
              Test your clinical understanding by taking an official chapter assessment.
            </p>
            <Button
              variant="outline"
              size="sm"
              onClick={() => navigate('/student/quiz/comprehensive')}
              className="mt-3"
            >
              Start Diagnostic Quiz
            </Button>
          </Card>
        )}
      </section>
    </div>
  );
};

export default Home;
