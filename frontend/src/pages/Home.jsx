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
  Utensils,
  HelpCircle
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

  // Overall completion across all 38 INC syllabus units (10 Anat + 11 Phys + 7 Bioc + 10 Nutr)
  const totalCompletedUnits =
    anatStatus.completedCount +
    physStatus.completedCount +
    biocStatus.completedCount +
    nutrStatus.completedCount;
  const overallPercentage = Math.round((totalCompletedUnits / 38) * 100);

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

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning, Scholar';
    if (hour < 17) return 'Good afternoon, Scholar';
    return 'Good evening, Scholar';
  };

  const tracks = [
    {
      id: 'anatomy',
      title: 'Applied Human Anatomy',
      code: 'ANAT 105',
      icon: <Bone className="w-5 h-5 text-[#159A91]" />,
      units: 10,
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
      icon: <Activity className="w-5 h-5 text-[#159A91]" />,
      units: 11,
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
      icon: <Dna className="w-5 h-5 text-[#159A91]" />,
      units: 7,
      completed: biocStatus.completedCount,
      percent: biocStatus.completionPercent,
      isUnlocked: true,
      href: '/bio-chem-syllabus',
      desc: 'Glycolysis, Krebs cycle, lipid metabolism, clinical biomarkers, and acidosis.'
    },
    {
      id: 'nutrition',
      title: 'Clinical Nutrition & Dietetics',
      code: 'NUTR 120',
      icon: <Utensils className="w-5 h-5 text-[#159A91]" />,
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
      <div className="p-4 sm:p-6 lg:p-8 max-w-[1600px] w-full mx-auto space-y-8 bg-white text-black">
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

  const savedUser = JSON.parse(localStorage.getItem('nursing_user') || '{}');
  const savedUsername = localStorage.getItem('medpulse_saved_username');
  const userDisplayName = savedUsername || savedUser.displayName || savedUser.name || currentUser?.displayName || currentUser?.name || nickname || 'Scholar';

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-[1600px] w-full mx-auto space-y-8 bg-[#E9F5F3]/30 text-[#263746] font-sans pb-16">
      {/* 1. Header Banner: Hero Card (Exact Match to User Reference Image 3) */}
      <section className="relative overflow-hidden bg-white border border-[#123B50]/15 rounded-3xl p-6 sm:p-8 shadow-xs">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
          {/* Left Column */}
          <div className="max-w-xl space-y-2.5">
            <span className="text-xs font-bold text-[#159A91] tracking-wide block">
              {getGreeting()}
            </span>

            <h1 className="text-2xl sm:text-4xl font-black text-[#123B50] tracking-tight">
              Welcome back, {userDisplayName}
            </h1>

            <p className="text-xs font-bold text-neutral-500">
              B.Sc Nursing &bull; Semester I &bull; Indian Nursing Council (INC) Accredited
            </p>

            <p className="text-xs sm:text-sm text-[#263746]/80 leading-relaxed pt-1">
              Select an enrolled course from the curriculum directory below to inspect syllabus topics,
              run laboratory simulators, or take module evaluations.
            </p>

            <div className="pt-2 flex flex-wrap items-center gap-2.5">
              <a
                href="#curriculum-directory"
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-extrabold bg-[#123B50] hover:bg-[#159A91] text-white shadow-xs transition-colors cursor-pointer"
              >
                <BookOpen className="w-4 h-4 text-white" />
                <span>Curriculum Directory ↓</span>
              </a>

              <button
                type="button"
                onClick={() => {
                  window.dispatchEvent(new CustomEvent('open-nova-tutor'));
                  const aiBtn = document.querySelector('[aria-label="Ask Nova AI Clinical Tutor"]');
                  if (aiBtn) aiBtn.click();
                }}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold bg-white hover:bg-[#E9F5F3] border border-[#123B50]/20 text-[#123B50] transition-colors cursor-pointer shadow-2xs"
              >
                <Sparkles className="w-4 h-4 text-[#159A91]" />
                <span>Ask Nova Tutor</span>
              </button>

              <button
                type="button"
                onClick={() => navigate('/syllabus')}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold bg-white hover:bg-[#E9F5F3] border border-[#123B50]/20 text-[#123B50] transition-colors cursor-pointer shadow-2xs"
              >
                <HelpCircle className="w-4 h-4 text-[#159A91]" />
                <span>Docs &amp; FAQs</span>
              </button>
            </div>
          </div>

          {/* Right Column: Academic Standing Box (Exact Match to User Reference Image 3) */}
          <div className="bg-white p-5 rounded-2xl border border-neutral-200/90 shrink-0 w-full lg:w-72 shadow-2xs space-y-3">
            <div className="flex items-center justify-between pb-2 border-b border-neutral-100">
              <span className="text-xs font-bold text-neutral-500">Academic Standing</span>
              <span className="inline-flex items-center gap-1 text-[10px] font-black uppercase px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 animate-pulse" />
                <span>Active Term</span>
              </span>
            </div>

            <div className="space-y-2 text-xs">
              <div className="flex items-center justify-between">
                <span className="text-neutral-500 font-medium">Degree Program</span>
                <span className="font-extrabold text-[#123B50]">B.Sc Nursing</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-neutral-500 font-medium">Enrolled Subjects</span>
                <span className="font-extrabold text-[#123B50]">4 Courses (INC)</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-neutral-500 font-medium">Evaluation Rule</span>
                <span className="font-extrabold text-[#159A91]">&gt; 75.0% Mastery</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-neutral-500 font-medium">Accreditation</span>
                <span className="font-extrabold text-[#123B50]">INC CBME Tier-1</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Smart Performance Alert Banner (appears if latest attempt is < 75%) */}
{
  latestAttempt && !latestAttempt.passed && (
    <div className="bg-gradient-to-r from-[#E9F5F3] to-white border border-[#159A91]/30 rounded-2xl p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 shadow-xs">
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
  )
}

      {/* 3. Academic Courses & Subjects Section (Exact Match to User Reference Image 3) */}
      <section id="curriculum-directory" className="space-y-4 pt-4">
  <div>
    <span className="text-[10px] font-black uppercase tracking-wider text-[#159A91] bg-[#E9F5F3] px-2.5 py-1 rounded-full border border-[#159A91]/25">
      CURRICULUM DIRECTORY &bull; Enrolled Subjects
    </span>
    <div className="flex items-center gap-2 mt-2">
      <BookOpen className="w-5 h-5 text-[#159A91]" />
      <h2 className="text-xl sm:text-2xl font-black text-[#123B50] tracking-tight">
        Academic Courses &amp; Subjects
      </h2>
    </div>
    <p className="text-xs text-[#263746]/70 mt-1 font-medium">
      Open any enrolled subject to view its complete syllabus, track outcome attainment, and launch continuous evaluation workstations.
    </p>
  </div>

  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
    {tracks.map((track) => (
      <div
        key={track.id}
        onClick={() => navigate(track.href)}
        className="group cursor-pointer rounded-3xl border border-[#123B50]/15 bg-white p-5 sm:p-6 flex flex-col justify-between space-y-4 hover:border-[#159A91] hover:shadow-md transition-all shadow-2xs"
      >
        <div className="space-y-3">
          <div className="flex items-center justify-between gap-3">
            <span className="text-[11px] font-mono font-extrabold px-2.5 py-1 rounded-lg bg-neutral-100 text-[#123B50] border border-neutral-200">
              {track.code}
            </span>
            <span className="text-[10px] font-extrabold uppercase px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-600" />
              <span>Active Course</span>
            </span>
          </div>

          <div>
            <h3 className="text-base sm:text-lg font-black text-[#123B50] group-hover:text-[#159A91] transition-colors">
              {track.title}
            </h3>
            <p className="text-[11px] font-bold text-neutral-400 mt-0.5">
              B.Sc Nursing &bull; {track.units} Units &bull; Indian Nursing Council
            </p>
            <p className="text-xs text-[#263746]/75 mt-2 line-clamp-2 leading-relaxed">
              {track.desc}
            </p>
          </div>

          <div className="space-y-1.5 pt-2 border-t border-neutral-100">
            <div className="flex justify-between text-[11px] font-bold">
              <span className="text-neutral-500">{track.completed} of {track.units} Units Mastered</span>
              <span className="text-[#159A91] font-mono">{track.percent}%</span>
            </div>
            <div className="w-full bg-[#E9F5F3] rounded-full h-2 overflow-hidden border border-[#159A91]/20">
              <div
                className="bg-gradient-to-r from-[#159A91] to-[#F2B66D] h-2 rounded-full transition-all duration-300"
                style={{ width: `${track.percent}%` }}
              />
            </div>
          </div>
        </div>

        <div className="pt-3 border-t border-neutral-100 flex items-center justify-between text-xs">
          <span className="text-neutral-500 font-semibold flex items-center gap-1.5">
            {track.percent >= 100 ? (
              <>
                <Unlock className="w-3.5 h-3.5 text-emerald-600" />
                <span className="text-emerald-700 font-bold">Grand Final Unlocked</span>
              </>
            ) : (
              <>
                <Lock className="w-3.5 h-3.5 text-neutral-400" />
                <span>Grand Final Locked (&ge; 75% required)</span>
              </>
            )}
          </span>
          <span className="text-[#159A91] font-bold flex items-center gap-1 group-hover:translate-x-0.5 transition-transform">
            <span>Open Syllabus</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </span>
        </div>
      </div>
    ))}
  </div>
</section>

{/* 4. Recent Scores & Quick Practice Action */ }
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
      className="text-xs font-bold text-[#159A91] hover:text-[#123B50] hover:underline flex items-center gap-1 transition-colors"
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
        className="mt-3 bg-[#159A91] hover:bg-[#123B50] text-white font-bold px-6 py-2 rounded-xl shadow-md shadow-[#159A91]/20 transition-all cursor-pointer"
      >
        Start Diagnostic Quiz
      </Button>
    </Card>
  )}
</section>
    </div >
  );
};

export default Home;
