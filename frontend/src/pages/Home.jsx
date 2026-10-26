import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { getStudentGatingStatus, getAllRecordedAttempts } from '../services/assessmentEngine';
import { ProgressRing, ProgressBar } from '../components/ui/ProgressBar';
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { Button } from '../components/ui/Button';
import { Skeleton, SkeletonCard } from '../components/ui/Skeleton';
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
  ChevronRight,
  Flame,
  Target,
  Bone,
  Activity,
  Dna,
  Utensils
} from 'lucide-react';

export const Home = () => {
  const navigate = useNavigate();
  const { currentUser } = useAuth();

  const [loading, setLoading] = useState(true);
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
            missedMap[q.subtopic] = {
              count: (missedMap[q.subtopic]?.count || 0) + 1,
              accuracy: Math.round(((q.totalAnswered - 1) / (q.totalAnswered || 1)) * 100) || 50
            };
          }
        });
      }
    });

    const sortedWeak = Object.entries(missedMap)
      .sort((a, b) => b[1].count - a[1].count)
      .slice(0, 4)
      .map(([subtopic, data]) => ({
        subtopic,
        count: data.count,
        accuracy: data.accuracy
      }));
    
    setWeakTopics(sortedWeak);
    setLoading(false);
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

  // Today's attempts & latest score
  const todayAttempts = recentAttempts.filter(att => {
    if (!att.completedAt) return false;
    return new Date(att.completedAt).toDateString() === new Date().toDateString();
  });
  const latestAttempt = recentAttempts[0] || null;

  // Determine last active lesson / continue card
  const lastLesson = localStorage.getItem('medpulse_last_lesson') || '/biochemistry/lesson/classification-of-carb';
  const lastLessonTitle = localStorage.getItem('medpulse_last_lesson_title') || 'Carbohydrate Metabolism & Clinical Correlates';
  const lastLessonChapter = localStorage.getItem('medpulse_last_lesson_chapter') || 'Chapter 3: Intermediary Metabolism';

  const tracks = [
    {
      id: 'anatomy',
      title: 'Applied Human Anatomy',
      code: 'ANAT 105',
      icon: <Bone className="w-5 h-5 text-green-700" />,
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
      icon: <Activity className="w-5 h-5 text-green-700" />,
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
      icon: <Dna className="w-5 h-5 text-green-700" />,
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
      icon: <Utensils className="w-5 h-5 text-green-700" />,
      units: 10,
      completed: nutrStatus.completedCount,
      percent: nutrStatus.completionPercent,
      isUnlocked: true,
      href: '/nutrition-syllabus',
      desc: 'Therapeutic diets, nutrient deficiencies, enteral feeding, and medical nutrition therapy.'
    }
  ];

  if (loading) {
    return (
      <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto space-y-8 bg-white text-black">
        <Skeleton className="h-64 w-full rounded-3xl" />
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Skeleton className="h-44 lg:col-span-2 rounded-2xl" />
          <Skeleton className="h-44 rounded-2xl" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <SkeletonCard />
          <SkeletonCard />
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto space-y-8 bg-white text-black">
      {/* 1. Header Banner: Hero Card on Pure White Surface with Black Text */}
      <section className="relative overflow-hidden bg-white border border-neutral-200 rounded-3xl p-6 sm:p-8 shadow-xs">
        <div className="pointer-events-none absolute inset-0 bg-green-50/60" />

        <div className="relative z-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
          <div className="max-w-xl space-y-3">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white text-black text-[11px] font-bold border border-neutral-300 shadow-xs">
              <Sparkles className="w-3.5 h-3.5 text-green-700" />
              <span>INC CBME Standardized Curriculum &bull; Semester I</span>
            </div>

            <h1 className="text-2xl sm:text-4xl font-black text-black tracking-tight">
              Welcome back, <span className="text-green-700">{nickname}</span>
            </h1>

            <p className="text-neutral-700 text-xs sm:text-sm leading-relaxed">
              Master human anatomy, physiological mechanisms, clinical biochemistry, and therapeutic nutrition with bedside case rationales and your chapter-scoped AI tutor.
            </p>

            {/* Streak & 7-day activity micro-heatmap */}
            <div className="flex flex-wrap items-center gap-4 text-xs text-neutral-700 pt-1">
              <div className="flex items-center gap-1.5">
                <span className="flex items-center gap-1 font-bold text-black">
                  <Flame className={`w-4 h-4 ${todayAttempts.length > 0 ? 'text-amber-500 fill-amber-500' : 'text-neutral-400'}`} />
                  <span>{todayAttempts.length > 0 ? '1 Day Streak' : '0 Day Streak'}</span>
                </span>
                <span>&bull;</span>
                <span className="flex items-center gap-1 font-semibold text-neutral-600">
                  <Target className={`w-3.5 h-3.5 ${todayAttempts.length > 0 ? 'text-green-700' : 'text-neutral-400'}`} />
                  <span>Goal: {todayAttempts.length > 0 ? '1/1 Done' : '0/1'}</span>
                </span>
              </div>

              {/* 7-Day Activity tracker dots */}
              <div className="flex items-center gap-1">
                {['M', 'T', 'W', 'T', 'F', 'S', 'S'].map((day, idx) => {
                  const currentDayIdx = (new Date().getDay() + 6) % 7;
                  const isToday = idx === currentDayIdx;
                  const isDone = isToday && todayAttempts.length > 0;
                  return (
                    <span
                      key={idx}
                      title={`${day} - ${isDone ? 'Assessment Completed' : isToday ? 'Today' : 'No attempt'}`}
                      className={`w-5 h-5 rounded-md flex items-center justify-center text-[9px] font-black transition-all ${
                        isDone
                          ? 'bg-green-600 text-white shadow-xs'
                          : isToday
                          ? 'border border-green-600 text-green-700 bg-green-50'
                          : 'bg-neutral-100 text-neutral-400'
                      }`}
                    >
                      {day}
                    </span>
                  );
                })}
              </div>
            </div>

            <div className="pt-2 flex flex-wrap items-center gap-2 sm:gap-3">
              <Button
                variant="primary"
                size="sm"
                onClick={() => navigate('/syllabus')}
                leftIcon={<BookOpen className="w-4 h-4 text-white" />}
                className="bg-green-600 hover:bg-green-700 text-white font-extrabold shadow-xs"
              >
                Curriculum Hub
              </Button>

              {/* Take Diagnostic Quiz button: Outlined style with crisp readable black text */}
              <button
                type="button"
                onClick={() => navigate('/student/quiz/comprehensive')}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold border-2 border-neutral-800 bg-white text-black hover:bg-green-600 hover:text-white hover:border-green-600 transition-all cursor-pointer shadow-xs focus:outline-none focus-visible:ring-2 focus-visible:ring-green-600"
              >
                <ClipboardList className="w-4 h-4" />
                <span>Take Diagnostic Quiz</span>
              </button>
            </div>
          </div>

          {/* Academic Standing & 4-Subject Cluster */}
          <div className="bg-white p-5 rounded-2xl border border-neutral-200 shrink-0 w-full sm:w-auto shadow-xs space-y-3">
            <div className="flex items-center gap-5 justify-between sm:justify-start">
              <ProgressRing
                value={overallPercentage}
                max={100}
                size={80}
                strokeWidth={7}
                color="#15803D"
                trackColor="#E5E5E5"
              >
                <div className="text-center">
                  <span className="text-base font-black text-black">{overallPercentage}%</span>
                  <span className="block text-[8px] uppercase tracking-wider text-green-700 font-extrabold">Overall</span>
                </div>
              </ProgressRing>

              <div className="space-y-1.5 max-w-52.5">
                <div className="flex items-center gap-1.5">
                  <GraduationCap className="w-4 h-4 text-green-700" />
                  <h4 className="text-xs font-bold text-black">Competency Progress</h4>
                </div>
                <p className="text-xs text-neutral-800 font-bold">
                  {totalCompletedUnits} of 41 Units Passed
                </p>
                {totalCompletedUnits > 0 ? (
                  <div className="space-y-1">
                    <Badge variant="medium" size="sm">
                      Pass Criterion &ge; 75%
                    </Badge>
                    {latestAttempt && (
                      <p className="text-[11px] text-neutral-600 font-semibold leading-tight">
                        Latest: <span className="font-extrabold text-black">{latestAttempt.percentage}%</span>
                      </p>
                    )}
                  </div>
                ) : latestAttempt ? (
                  <div className="space-y-1">
                    <p className="text-[11px] text-amber-700 font-bold leading-tight">
                      Latest Score: {latestAttempt.percentage}%
                    </p>
                    <p className="text-[10px] text-neutral-600 font-medium">
                      Minimum 75% required to pass unit
                    </p>
                    <button
                      type="button"
                      onClick={() => navigate(`/student/quiz/${latestAttempt.topicId || 'anatomy-unit-1'}`)}
                      className="inline-flex items-center gap-1 text-[11px] font-bold text-green-700 hover:text-green-800 underline cursor-pointer pt-0.5"
                    >
                      <span>Retake Quiz to Pass</span>
                      <ArrowRight className="w-3 h-3" />
                    </button>
                  </div>
                ) : (
                  <div className="space-y-1">
                    <p className="text-[11px] text-green-700 font-semibold leading-tight">
                      Pass your first unit to start your progress
                    </p>
                    <button
                      type="button"
                      onClick={() => navigate('/anatomy-syllabus')}
                      className="inline-flex items-center gap-1 text-[11px] font-bold text-green-700 hover:text-green-800 underline cursor-pointer"
                    >
                      <span>Start with Anatomy Unit 1</span>
                      <ArrowRight className="w-3 h-3" />
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* 4-Subject Mini Competency Cluster */}
            <div className="grid grid-cols-4 gap-1.5 pt-2 border-t border-neutral-100">
              {[
                { label: 'Anatomy', short: 'Anat', count: `${anatStatus.completedCount}/12`, icon: Bone },
                { label: 'Physiology', short: 'Phys', count: `${physStatus.completedCount}/12`, icon: Activity },
                { label: 'Biochemistry', short: 'Bioc', count: `${biocStatus.completedCount}/7`, icon: Dna },
                { label: 'Nutrition', short: 'Nutr', count: `${nutrStatus.completedCount}/10`, icon: Utensils }
              ].map((sub, i) => (
                <div
                  key={i}
                  title={`${sub.label}: ${sub.count} units passed`}
                  className="flex flex-col items-center p-1.5 rounded-xl bg-neutral-50 border border-neutral-200/80 text-center"
                >
                  <sub.icon className="w-3.5 h-3.5 text-green-700 mb-0.5" />
                  <span className="text-[9px] font-bold text-neutral-500 uppercase">{sub.short}</span>
                  <span className="text-[10px] font-mono font-black text-black">{sub.count}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Smart Performance Alert Banner (appears if latest attempt is < 75%) */}
      {latestAttempt && !latestAttempt.passed && (
        <div className="bg-linear-to-r from-amber-50 to-orange-50 border border-amber-200 rounded-2xl p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 shadow-xs">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center shrink-0 border border-amber-300">
              <AlertTriangle className="w-5 h-5 text-amber-700" />
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <h4 className="text-xs font-black text-amber-950">
                  Review &amp; Retake Recommended: {latestAttempt.topicTitle || 'Assessment Exam'}
                </h4>
                <span className="px-2 py-0.5 rounded-full bg-amber-200 text-amber-900 font-mono font-extrabold text-[10px]">
                  Score: {latestAttempt.percentage}%
                </span>
              </div>
              <p className="text-[11px] text-amber-800 mt-0.5">
                Competency criterion is 75% for curriculum certification. Review high-yield rationale gaps and retake when ready.
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2 self-end sm:self-auto shrink-0">
            <button
              type="button"
              onClick={() => navigate('/question-bank')}
              className="px-3 py-1.5 rounded-xl border border-amber-300 text-amber-900 bg-white hover:bg-amber-100 text-xs font-bold transition-all cursor-pointer"
            >
              Question Bank
            </button>
            <button
              type="button"
              onClick={() => navigate(`/student/quiz/${latestAttempt.topicId || 'comprehensive'}`)}
              className="px-3.5 py-1.5 rounded-xl bg-amber-700 hover:bg-amber-800 text-white text-xs font-bold transition-all cursor-pointer shadow-xs"
            >
              Retake Quiz
            </button>
          </div>
        </div>
      )}

      {/* 2. Top Action Row: "Resume Learning" (White card, Black text, Green button with White text) & "Focus Revision Areas" */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Resume Learning Card - Pure White surface */}
        <div className="lg:col-span-2 bg-white text-black border border-neutral-200 rounded-2xl p-5 sm:p-6 flex flex-col justify-between gap-4 shadow-xs card-hover-lift">
          <div className="space-y-3">
            <div className="flex items-center justify-between flex-wrap gap-2">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-xl bg-green-50 border border-green-200 flex items-center justify-center">
                  <Dna className="w-4 h-4 text-green-700" />
                </div>
                <div>
                  <span className="text-[10px] uppercase tracking-wider text-green-700 font-extrabold block">
                    Applied Biochemistry
                  </span>
                  <p className="text-xs text-neutral-600 font-medium">{lastLessonChapter}</p>
                </div>
              </div>
              <div className="flex items-center gap-2 text-[11px] text-neutral-600 font-medium">
                <span className="flex items-center gap-1">
                  <Clock className="w-3 h-3 text-neutral-500" /> Active recently
                </span>
                <span>&bull;</span>
                <span className="flex items-center gap-1">
                  <Timer className="w-3 h-3 text-green-700" /> ~12 min left
                </span>
              </div>
            </div>

            <div>
              <h3 className="text-base font-bold text-black">
                {lastLessonTitle}
              </h3>
              <p className="text-xs text-neutral-700 mt-1">
                Monosaccharides, glycolysis steps, regulatory enzymes, and clinical diabetes rationales.
              </p>
            </div>

            {/* Structured Progress Bar */}
            <div className="space-y-1.5 pt-1">
              <div className="flex justify-between text-[11px] font-bold text-neutral-700">
                <span>Lesson 3 of 6</span>
                <span className="font-mono text-green-700">50% Complete</span>
              </div>
              <ProgressBar value={50} max={100} size="sm" color="green" />
            </div>
          </div>

          <div className="pt-2 flex justify-end">
            <Button
              variant="primary"
              size="md"
              onClick={() => navigate(lastLesson)}
              leftIcon={<PlayCircle className="w-4 h-4 text-white" />}
              className="w-full sm:w-auto bg-green-600 hover:bg-green-700 text-white font-extrabold"
            >
              Continue Lesson
            </Button>
          </div>
        </div>

        {/* Focus Revision Areas: White card with black text and "High Yield" header badge */}
        <Card className="card-hover-lift flex flex-col justify-between bg-white border border-neutral-200 text-black">
          <CardHeader className="py-3.5 px-4 border-b border-neutral-200">
            <div className="flex items-center justify-between">
              <CardTitle className="text-xs flex items-center gap-1.5 font-bold text-black">
                <AlertTriangle className="w-3.5 h-3.5 text-neutral-800" />
                <span>Focus Revision Areas</span>
              </CardTitle>
              <Badge variant="high" size="sm">High Yield</Badge>
            </div>
          </CardHeader>
          <CardContent className="p-4 flex-1 flex flex-col justify-center">
            {recentAttempts.length === 0 ? (
              /* Empty state if user has 0% progress / no attempts */
              <div className="text-center py-4 space-y-2">
                <p className="text-xs font-semibold text-neutral-700">
                  Complete a quiz to see your weak areas.
                </p>
                <Button
                  variant="primary"
                  size="sm"
                  onClick={() => navigate('/student/quiz/comprehensive')}
                  className="text-xs mt-1 bg-green-600 hover:bg-green-700 text-white font-bold"
                >
                  Start Diagnostic Quiz
                </Button>
              </div>
            ) : weakTopics.length > 0 ? (
              <div className="space-y-2">
                {weakTopics.map((item, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => navigate('/question-bank')}
                    className="w-full flex items-center justify-between p-2 rounded-xl bg-neutral-50 border border-neutral-200 hover:border-green-600 transition-colors text-xs text-left cursor-pointer group"
                  >
                    <div className="flex items-center gap-2 truncate">
                      <span className="w-2 h-2 rounded-full bg-green-600 shrink-0" />
                      <span className="font-semibold text-black truncate">
                        {item.subtopic}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 shrink-0">
                      <span className="text-[11px] font-mono text-neutral-600 font-bold">
                        {item.accuracy}% Accuracy
                      </span>
                      <ChevronRight className="w-3.5 h-3.5 text-neutral-500 group-hover:translate-x-0.5 transition-transform" />
                    </div>
                  </button>
                ))}
              </div>
            ) : (
              <div className="text-center py-4 text-xs text-neutral-600">
                <p className="font-semibold text-black">All areas proficient</p>
                <p className="text-[11px] mt-0.5">No critical review gaps detected.</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* 3. Four Core Subject Tracks Grid - Pure White Cards, Black Text */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl sm:text-2xl font-black text-black tracking-tight">
              Curriculum Tracks & Gated Milestones
            </h2>
            <p className="text-xs text-neutral-700 mt-0.5 font-medium">
              Complete each chapter assessment with &ge; 75% to unlock subject-wide Grand Finals.
            </p>
          </div>
          <Link
            to="/syllabus"
            className="text-xs font-bold text-green-700 hover:underline flex items-center gap-1"
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
              className="group cursor-pointer rounded-2xl border border-neutral-200 bg-white p-5 sm:p-6 flex flex-col justify-between space-y-4 hover:border-green-600 card-hover-lift shadow-xs"
            >
              <div className="space-y-3">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-green-50 border border-green-200 flex items-center justify-center group-hover:border-green-600 transition-colors">
                      {track.icon}
                    </div>
                    <div>
                      <span className="text-[10px] font-mono font-extrabold uppercase tracking-wider text-neutral-500">
                        {track.code}
                      </span>
                      <h3 className="text-base font-bold text-black">
                        {track.title}
                      </h3>
                    </div>
                  </div>

                  <div className="flex flex-col items-end">
                    <Badge variant={track.percent >= 100 ? 'success' : 'medium'} size="sm">
                      {track.completed}/{track.units} Units
                    </Badge>
                    {/* Thin progress bar under unit badge */}
                    <div className="w-20 mt-1.5">
                      <ProgressBar value={track.percent} max={100} size="xs" color="green" />
                    </div>
                  </div>
                </div>

                <p className="text-xs text-neutral-700 line-clamp-2 leading-relaxed font-medium">
                  {track.desc}
                </p>

                {/* Progress bar info */}
                <div className="space-y-1">
                  <div className="flex justify-between text-[11px] font-bold text-neutral-700">
                    <span>Course Progress</span>
                    <span className="font-mono text-black font-extrabold">{track.percent}%</span>
                  </div>
                  <ProgressBar value={track.percent} max={100} color="green" />
                </div>
              </div>

              <div className="pt-3 border-t border-neutral-100 flex items-center justify-between text-xs">
                <span className="text-neutral-700 font-semibold flex items-center gap-1.5">
                  {track.percent >= 100 ? (
                    <>
                      <Unlock className="w-3.5 h-3.5 text-green-700" />
                      Grand Final Unlocked
                    </>
                  ) : (
                    <>
                      <Lock className="w-3.5 h-3.5 text-neutral-500" />
                      Grand Final Locked
                    </>
                  )}
                </span>
                <span className="text-green-700 font-bold flex items-center gap-1 group-hover:translate-x-0.5 transition-transform">
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
            <h2 className="text-xl sm:text-2xl font-black text-black tracking-tight">
              Recent Assessment Attempts
            </h2>
            <p className="text-xs text-neutral-700 mt-0.5 font-medium">
              Review your official scores and bedside clinical question rationales.
            </p>
          </div>
          <Link
            to="/student/results"
            className="text-xs font-bold text-green-700 hover:underline flex items-center gap-1"
          >
            <span>Full History</span>
            <ArrowRight className="w-3 h-3" />
          </Link>
        </div>

        {recentAttempts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {recentAttempts.map((attempt, idx) => (
              <Card key={idx} hover onClick={() => navigate('/student/results')} className="cursor-pointer card-hover-lift bg-white border border-neutral-200 text-black">
                <CardContent className="p-4 space-y-2">
                  <div className="flex items-center justify-between">
                    <Badge variant={attempt.passed ? 'success' : 'danger'} size="sm">
                      {attempt.passed ? 'Passed' : 'Review'}
                    </Badge>
                    <span className="text-xs font-black text-black font-mono">
                      {attempt.percentage}%
                    </span>
                  </div>
                  <h4 className="text-xs font-bold text-black line-clamp-1">
                    {attempt.topicTitle || 'Comprehensive Quiz'}
                  </h4>
                  <div className="flex items-center justify-between text-[10px] text-neutral-600 pt-1 font-semibold">
                    <span>{attempt.score}/{attempt.totalQuestions} Correct</span>
                    <span>{attempt.timeSpentFormatted || '5 min'}</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <Card className="p-6 text-center card-hover-lift bg-white border border-neutral-200 text-black">
            <ClipboardList className="w-8 h-8 text-neutral-500 mx-auto mb-2" />
            <h4 className="text-xs font-bold text-black">No Assessment Records Yet</h4>
            <p className="text-[11px] text-neutral-600 mt-1 max-w-sm mx-auto font-medium">
              Test your clinical understanding by taking an official chapter assessment.
            </p>
            <Button
              variant="primary"
              size="sm"
              onClick={() => navigate('/student/quiz/comprehensive')}
              className="mt-3 bg-green-600 hover:bg-green-700 text-white font-bold"
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
