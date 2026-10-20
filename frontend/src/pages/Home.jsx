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
  CheckCircle2,
  Lock,
  Unlock,
  GraduationCap,
  BarChart3,
  Layers,
  RotateCcw,
  AlertTriangle,
  PlayCircle,
  Clock
} from 'lucide-react';

export const Home = () => {
  const navigate = useNavigate();
  const { currentUser, role } = useAuth();

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
      .slice(0, 5)
      .map(([subtopic, count]) => ({ subtopic, count }));
    
    // Fallback clinical high-yield pearls if no quizzes attempted yet
    if (sortedWeak.length === 0) {
      setWeakTopics([
        { subtopic: 'Diabetic Ketoacidosis & Lipolysis', count: 'High Yield' },
        { subtopic: 'Cardiac Hemodynamics & Valve Action', count: 'High Yield' },
        { subtopic: 'Cranial Nerves Clinical Tests', count: 'High Yield' },
        { subtopic: 'PEM: Kwashiorkor vs Marasmus', count: 'High Yield' }
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

  const tracks = [
    {
      id: 'anatomy',
      title: 'Applied Human Anatomy',
      code: 'ANAT 105',
      emoji: '🦴',
      units: 12,
      completed: anatStatus.completedCount,
      percent: anatStatus.completionPercent,
      isUnlocked: true,
      href: '/anatomy-syllabus',
      color: '#0d9488',
      desc: 'Osteology, neuroanatomy, cardiovascular viscera, and clinical surface landmarks.'
    },
    {
      id: 'physiology',
      title: 'Applied Human Physiology',
      code: 'PHYS 110',
      emoji: '⚡',
      units: 12,
      completed: physStatus.completedCount,
      percent: physStatus.completionPercent,
      isUnlocked: true,
      href: '/physiology-syllabus',
      color: '#0284c7',
      desc: 'Cardiac cycle hemodynamics, respiratory ventilation, neural reflexes, and renal clearance.'
    },
    {
      id: 'biochemistry',
      title: 'Applied Biochemistry',
      code: 'BIOC 115',
      emoji: '🧬',
      units: 7,
      completed: biocStatus.completedCount,
      percent: biocStatus.completionPercent,
      isUnlocked: true,
      href: '/bio-chem-syllabus',
      color: '#10b981',
      desc: 'Glycolysis, Krebs cycle, lipid metabolism, clinical biomarkers, and acidosis.'
    },
    {
      id: 'nutrition',
      title: 'Nutrition & Dietetics',
      code: 'NUTR 120',
      emoji: '🥗',
      units: 10,
      completed: nutrStatus.completedCount,
      percent: nutrStatus.completionPercent,
      isUnlocked: true,
      href: '/nutrition-syllabus',
      color: '#f59e0b',
      desc: 'Therapeutic diets, nutrient deficiencies, enteral feeding, and medical nutrition therapy.'
    }
  ];

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto space-y-8">
      {/* 1. Header Banner: Greeting & Academic Progress Overview */}
      <section className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-teal-950 to-slate-900 text-white rounded-3xl p-6 sm:p-8 shadow-xl">
        <div className="pointer-events-none absolute -top-24 -left-20 h-80 w-80 rounded-full bg-teal-500/20 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-24 right-0 h-80 w-80 rounded-full bg-sky-500/20 blur-3xl" />

        <div className="relative z-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
          <div className="max-w-xl space-y-2">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-teal-500/20 text-teal-300 text-[11px] font-bold border border-teal-500/30">
              <Sparkles className="w-3.5 h-3.5" />
              <span>INC CBME Standardized Curriculum &bull; Semester I</span>
            </div>

            <h1 className="text-2xl sm:text-4xl font-black tracking-tight">
              Welcome back, <span className="bg-gradient-to-r from-teal-300 via-emerald-300 to-sky-300 bg-clip-text text-transparent">{nickname}</span>
            </h1>

            <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
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
              <Button
                variant="outline"
                size="sm"
                onClick={() => navigate('/question-bank')}
                leftIcon={<ClipboardList className="w-4 h-4" />}
                className="text-white border-white/20 hover:bg-white/10 dark:text-white"
              >
                Question Bank
              </Button>
            </div>
          </div>

          {/* Academic Standing & Overall Circular Progress Ring */}
          <div className="flex items-center gap-5 bg-white/10 dark:bg-slate-900/60 backdrop-blur-md p-5 rounded-2xl border border-white/15 shrink-0 w-full sm:w-auto justify-between sm:justify-start">
            <ProgressRing
              value={overallPercentage}
              max={100}
              size={84}
              strokeWidth={7}
              color="#2dd4bf"
              trackColor="rgba(255,255,255,0.15)"
            >
              <div className="text-center">
                <span className="text-base font-black text-white">{overallPercentage}%</span>
                <span className="block text-[8px] uppercase tracking-wider text-teal-200 font-bold">Overall</span>
              </div>
            </ProgressRing>

            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <GraduationCap className="w-4 h-4 text-teal-300" />
                <h4 className="text-xs font-bold text-white">Competency Progress</h4>
              </div>
              <p className="text-xs text-slate-300 font-semibold">
                {totalCompletedUnits} of 41 Units Passed
              </p>
              <span className="inline-block text-[10px] font-extrabold px-2 py-0.5 rounded-md bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 uppercase">
                Pass Criterion &ge; 75%
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Top Action Row: "Continue Where You Left Off" & "Weak Topics" */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Continue Where You Left Off Card */}
        <Card className="lg:col-span-2 border-teal-200/60 dark:border-teal-900/40 bg-gradient-to-r from-teal-50/50 via-white to-sky-50/30 dark:from-slate-900 dark:to-slate-800/80">
          <CardContent className="p-5 sm:p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <Badge variant="primary" size="sm" dot>Resume Learning</Badge>
                <span className="text-[11px] text-slate-500 dark:text-slate-400 flex items-center gap-1">
                  <Clock className="w-3 h-3" /> Recent Activity
                </span>
              </div>
              <h3 className="text-base font-bold text-slate-900 dark:text-slate-100">
                {lastLessonTitle}
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-400">
                Pick up where you left off with clinical diagrams, key takeaways, and practice quiz.
              </p>
            </div>

            <Button
              variant="primary"
              size="md"
              onClick={() => navigate(lastLesson)}
              leftIcon={<PlayCircle className="w-4 h-4" />}
              className="shrink-0 w-full sm:w-auto"
            >
              Continue Lesson
            </Button>
          </CardContent>
        </Card>

        {/* Diagnostic Weak-Topics Chips Card */}
        <Card>
          <CardHeader className="py-3 px-4">
            <div className="flex items-center justify-between">
              <CardTitle className="text-xs flex items-center gap-1.5">
                <AlertTriangle className="w-3.5 h-3.5 text-amber-500" />
                Focus Revision Areas
              </CardTitle>
              <span className="text-[10px] text-slate-400 font-bold uppercase">Analytics</span>
            </div>
          </CardHeader>
          <CardContent className="p-4 pt-2">
            <div className="flex flex-wrap gap-1.5">
              {weakTopics.map((item, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => navigate('/question-bank')}
                  className="inline-flex items-center gap-1 text-[11px] px-2.5 py-1 rounded-lg bg-amber-50 dark:bg-amber-950/30 text-amber-800 dark:text-amber-300 border border-amber-200 dark:border-amber-800/60 hover:bg-amber-100 dark:hover:bg-amber-900/40 transition-colors cursor-pointer text-left"
                >
                  <span className="font-semibold">{item.subtopic}</span>
                  <span className="text-[9px] text-amber-600 dark:text-amber-400 font-extrabold">&bull; {item.count}</span>
                </button>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* 3. Four Core Subject Tracks Grid */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-bold text-slate-900 dark:text-slate-100 tracking-tight">
              Curriculum Tracks & Gated Milestones
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Complete each chapter assessment with &ge; 75% to unlock subject-wide Grand Finals.
            </p>
          </div>
          <Link
            to="/syllabus"
            className="text-xs font-bold text-teal-600 dark:text-teal-400 hover:underline flex items-center gap-1"
          >
            <span>View All</span>
            <ArrowRight className="w-3 h-3" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
          {tracks.map((track) => (
            <Card
              key={track.id}
              hover
              onClick={() => navigate(track.href)}
              className="cursor-pointer flex flex-col justify-between"
            >
              <CardContent className="p-5 sm:p-6 space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="text-3xl">{track.emoji}</span>
                    <div>
                      <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400">
                        {track.code}
                      </span>
                      <h3 className="text-base font-bold text-slate-900 dark:text-slate-100">
                        {track.title}
                      </h3>
                    </div>
                  </div>

                  <Badge variant={track.percent >= 100 ? 'success' : 'primary'} size="sm">
                    {track.completed}/{track.units} Units
                  </Badge>
                </div>

                <p className="text-xs text-slate-600 dark:text-slate-400 line-clamp-2">
                  {track.desc}
                </p>

                {/* Progress bar */}
                <div className="space-y-1">
                  <div className="flex justify-between text-[11px] font-bold text-slate-500">
                    <span>Course Progress</span>
                    <span>{track.percent}%</span>
                  </div>
                  <ProgressBar value={track.percent} max={100} color={track.id === 'nutrition' ? 'amber' : 'teal'} />
                </div>
              </CardContent>

              <div className="px-5 py-3 bg-slate-50/60 dark:bg-slate-800/40 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs">
                <span className="text-slate-500 dark:text-slate-400 font-semibold flex items-center gap-1">
                  {track.percent >= 100 ? (
                    <>
                      <Unlock className="w-3.5 h-3.5 text-emerald-500" />
                      Grand Final Unlocked
                    </>
                  ) : (
                    <>
                      <Lock className="w-3.5 h-3.5 text-slate-400" />
                      Grand Final Locked
                    </>
                  )}
                </span>
                <span className="text-teal-600 dark:text-teal-400 font-bold flex items-center gap-1">
                  Open Syllabus <ArrowRight className="w-3 h-3" />
                </span>
              </div>
            </Card>
          ))}
        </div>
      </section>

      {/* 4. Recent Scores & Quick Practice Action */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-bold text-slate-900 dark:text-slate-100 tracking-tight">
              Recent Assessment Attempts
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Review your official scores and bedside clinical question rationales.
            </p>
          </div>
          <Link
            to="/student/results"
            className="text-xs font-bold text-teal-600 dark:text-teal-400 hover:underline flex items-center gap-1"
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
                    <span className="text-xs font-black text-slate-900 dark:text-slate-100">
                      {attempt.percentage}%
                    </span>
                  </div>
                  <h4 className="text-xs font-bold text-slate-800 dark:text-slate-200 line-clamp-1">
                    {attempt.topicTitle || 'Comprehensive Quiz'}
                  </h4>
                  <div className="flex items-center justify-between text-[10px] text-slate-500 pt-1">
                    <span>{attempt.score}/{attempt.totalQuestions} Correct</span>
                    <span>{attempt.timeSpentFormatted || '5 min'}</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <Card className="p-6 text-center">
            <ClipboardList className="w-8 h-8 text-slate-400 mx-auto mb-2" />
            <h4 className="text-xs font-bold text-slate-800 dark:text-slate-200">No Assessment Records Yet</h4>
            <p className="text-[11px] text-slate-500 mt-1 max-w-sm mx-auto">
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
