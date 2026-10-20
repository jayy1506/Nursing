import React from 'react';
import { useLocation, Link, useNavigate } from 'react-router-dom';
import Navbar from '../../components/Navbar';
import { getStudentGatingStatus } from '../../services/assessmentEngine';
import {
  Award,
  CheckCircle2,
  XCircle,
  BookOpen,
  ArrowRight,
  RotateCcw,
  Sparkles,
  AlertTriangle,
  Clock,
  Layers,
  Lock,
  Unlock,
  ChevronRight,
  ShieldCheck,
  TrendingUp
} from 'lucide-react';

export const StudentResults = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const {
    score = 0,
    rawScore = 0,
    totalQuestions = 15,
    correctCount = 0,
    incorrectCount = 0,
    percentage = 0,
    passed = false,
    moduleName = 'Clinical Assessment',
    assessmentKey = 'phys-unit-1',
    subject = 'physiology',
    timeSpentFormatted = '5 min 20 sec',
    reviewData = []
  } = location.state || {};

  const gating = getStudentGatingStatus(subject);
  const isGrandFinal = assessmentKey?.includes('grand-final');

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 via-white to-sky-50/30 text-slate-900 pb-20 font-sans">
      <Navbar />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8">
        {/* Top Header Card */}
        <div className={`rounded-3xl border p-6 sm:p-8 shadow-sm mb-6 ${
          passed
            ? 'bg-gradient-to-br from-emerald-500/10 via-emerald-50/50 to-white border-emerald-200'
            : 'bg-gradient-to-br from-amber-500/10 via-rose-50 to-white border-amber-200'
        }`}>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider mb-2.5 shadow-xs ${
                passed ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-900'
              }">
                {passed ? <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" /> : <AlertTriangle className="w-3.5 h-3.5 text-amber-600" />}
                <span>{passed ? 'Assessment Passed (Competency Mastered)' : 'Needs Improvement (Score Below 75%)'}</span>
              </div>
              <h1 className="text-xl sm:text-3xl font-black text-slate-900 tracking-tight">
                {moduleName}
              </h1>
              <p className="text-xs sm:text-sm text-slate-600 mt-1">
                {passed
                  ? 'Excellent work! Your marks have been recorded in the college database.'
                  : 'Review the high-yield clinical explanations below and retake the test to master this unit.'}
              </p>
            </div>

            {/* Overall Score Badge */}
            <div className="text-center sm:text-right shrink-0">
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">Final Score</span>
              <div className={`text-4xl sm:text-5xl font-black ${passed ? 'text-emerald-600' : 'text-amber-600'}`}>
                {percentage}%
              </div>
              <span className="text-xs font-bold text-slate-500">{correctCount} of {totalQuestions} correct</span>
            </div>
          </div>

          {/* Quick Metrics Cards */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-6 pt-6 border-t border-slate-200/60">
            <div className="bg-white/80 rounded-2xl p-3 border border-slate-200/80 shadow-xs">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Time Spent</span>
              <p className="text-sm font-black text-slate-800 flex items-center gap-1.5 mt-0.5">
                <Clock className="w-3.5 h-3.5 text-sky-600" />
                <span>{timeSpentFormatted}</span>
              </p>
            </div>

            <div className="bg-white/80 rounded-2xl p-3 border border-slate-200/80 shadow-xs">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Correct Answers</span>
              <p className="text-sm font-black text-emerald-600 flex items-center gap-1.5 mt-0.5">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>{correctCount} Correct</span>
              </p>
            </div>

            <div className="bg-white/80 rounded-2xl p-3 border border-slate-200/80 shadow-xs">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Incorrect Answers</span>
              <p className="text-sm font-black text-rose-600 flex items-center gap-1.5 mt-0.5">
                <XCircle className="w-3.5 h-3.5" />
                <span>{incorrectCount} Incorrect</span>
              </p>
            </div>

            <div className="bg-white/80 rounded-2xl p-3 border border-slate-200/80 shadow-xs">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">INC Status</span>
              <p className="text-sm font-black text-slate-800 flex items-center gap-1.5 mt-0.5">
                <Award className="w-3.5 h-3.5 text-indigo-600" />
                <span>{passed ? 'Certified' : 'Retake'}</span>
              </p>
            </div>
          </div>
        </div>

        {/* Course Completion & Grand Final Unlocking Card */}
        {(() => {
          const subjectNameMap = {
            physiology: 'Applied Physiology',
            anatomy: 'Applied Anatomy',
            biochemistry: 'Applied Biochemistry',
            nutrition: 'Applied Nutrition & Dietetics'
          };
          const subjectDisplayName = subjectNameMap[subject] || 'Curriculum';

          const grandFinalSlugMap = {
            physiology: 'physiology-grand-final',
            anatomy: 'anatomy-grand-final',
            biochemistry: 'biochem-grand-final',
            nutrition: 'nutrition-grand-final'
          };
          const grandFinalSlug = grandFinalSlugMap[subject] || `${subject}-grand-final`;

          return (
            <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm mb-8 space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-sky-600" />
                  <h3 className="text-sm font-black text-slate-900 uppercase tracking-wider">
                    {subjectDisplayName} Curriculum Mastery
                  </h3>
                </div>
                <span className="text-xs font-black text-sky-700 bg-sky-50 px-2.5 py-1 rounded-full border border-sky-200">
                  {gating.completedCount} / {gating.totalUnits} Units Completed ({gating.completionPercent}%)
                </span>
              </div>

              <div className="w-full bg-slate-100 rounded-full h-3 overflow-hidden">
                <div
                  className="bg-gradient-to-r from-sky-500 to-indigo-600 h-3 rounded-full transition-all duration-500"
                  style={{ width: `${gating.completionPercent}%` }}
                />
              </div>

              {/* Grand Final Lock Status Callout */}
              <div className={`p-4 rounded-2xl border flex items-center justify-between gap-4 ${
                gating.isFinalUnlocked
                  ? 'bg-emerald-50/80 border-emerald-300 text-emerald-950'
                  : 'bg-slate-50 border-slate-200 text-slate-700'
              }`}>
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
                    gating.isFinalUnlocked ? 'bg-emerald-500 text-white' : 'bg-slate-200 text-slate-500'
                  }`}>
                    {gating.isFinalUnlocked ? <Unlock className="w-5 h-5" /> : <Lock className="w-5 h-5" />}
                  </div>
                  <div>
                    <h4 className="text-xs sm:text-sm font-extrabold text-slate-900">
                      {gating.isFinalUnlocked
                        ? '🎉 100% Course Completed! Grand Final Examination Unlocked'
                        : 'Grand Final Comprehensive Assessment Locked'}
                    </h4>
                    <p className="text-[11px] text-slate-500">
                      {gating.isFinalUnlocked
                        ? `You have completed all ${gating.totalUnits} modules. You are eligible to take the cumulative mixed exam.`
                        : `Must achieve 100% completion across all ${gating.totalUnits} modules. Remaining: ${gating.remainingCount} modules.`}
                    </p>
                  </div>
                </div>

                {gating.isFinalUnlocked ? (
                  <Link
                    to={`/quiz/${grandFinalSlug}`}
                    className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shrink-0 shadow-sm transition-all"
                  >
                    Take Grand Final →
                  </Link>
                ) : (
                  <span className="text-[11px] font-bold text-slate-400 bg-slate-200/80 px-3 py-1.5 rounded-lg shrink-0">
                    Locked (100% Needed)
                  </span>
                )}
              </div>
            </div>
          );
        })()}

        {/* Question by Question Review Header */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <BookOpen className="w-4 h-4 text-slate-600" />
            <h3 className="text-sm font-black text-slate-900 uppercase tracking-wider">
              Detailed Clinical Question Review ({reviewData.length})
            </h3>
          </div>
          <span className="text-xs text-slate-500 font-semibold">
            Color-coded with Verified INC Answers
          </span>
        </div>

        {/* Questions Breakdown List */}
        <div className="space-y-4">
          {reviewData.map((q, idx) => {
            const isCorrect = q.isCorrect;
            const studentChoice = q.options ? q.options[q.studentAnswer] : 'Not answered';
            const correctChoice = q.options ? q.options[q.correctAnswer] : 'N/A';

            return (
              <div
                key={idx}
                className={`bg-white rounded-2xl border p-5 sm:p-6 shadow-xs space-y-3.5 transition-all ${
                  isCorrect ? 'border-emerald-200' : 'border-rose-200'
                }`}
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-2">
                    <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-black shrink-0 ${
                      isCorrect ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'
                    }`}>
                      {idx + 1}
                    </span>
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                      {q.subtopic || 'INC Core Competency'}
                    </span>
                  </div>

                  <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-extrabold ${
                    isCorrect ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' : 'bg-rose-50 text-rose-700 border border-rose-200'
                  }`}>
                    {isCorrect ? <CheckCircle2 className="w-3 h-3" /> : <XCircle className="w-3 h-3" />}
                    <span>{isCorrect ? 'Correct' : 'Incorrect'}</span>
                  </span>
                </div>

                <h4 className="text-sm font-bold text-slate-900 leading-relaxed">
                  {q.text}
                </h4>

                {/* Options Comparison */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                  <div className={`p-3 rounded-xl border ${
                    isCorrect ? 'bg-emerald-50/60 border-emerald-200 text-emerald-950 font-semibold' : 'bg-rose-50/60 border-rose-200 text-rose-950'
                  }`}>
                    <span className="text-[10px] font-bold text-slate-400 block mb-0.5">Your Selected Answer:</span>
                    <p className="font-bold">{studentChoice || 'None selected'}</p>
                  </div>

                  {!isCorrect && (
                    <div className="p-3 rounded-xl border bg-emerald-50/60 border-emerald-200 text-emerald-950">
                      <span className="text-[10px] font-bold text-emerald-700 block mb-0.5">Correct Answer:</span>
                      <p className="font-bold">{correctChoice}</p>
                    </div>
                  )}
                </div>

                {/* Clinical Rationale */}
                {q.rationale && (
                  <div className="bg-slate-50 border border-slate-200/80 rounded-xl p-3 text-xs text-slate-700 leading-relaxed">
                    <span className="font-extrabold text-slate-900">Clinical Explanation: </span>
                    {q.rationale}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Footer Navigation Actions */}
        <div className="flex flex-wrap items-center justify-between gap-4 mt-8 pt-6 border-t border-slate-200">
          <button
            onClick={() => navigate(`/quiz/${assessmentKey}`)}
            className="px-5 py-2.5 rounded-xl border border-slate-300 text-slate-700 hover:bg-slate-100 font-bold text-xs inline-flex items-center gap-2 cursor-pointer transition-colors"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Retake This Chapter Quiz</span>
          </button>

          <div className="flex items-center gap-3 flex-wrap">
            {gating.isFinalUnlocked ? (
              <Link
                to={`/quiz/${subject === 'physiology' ? 'physiology-grand-final' : (subject === 'anatomy' ? 'anatomy-grand-final' : (subject === 'biochemistry' ? 'biochem-grand-final' : 'nutrition-grand-final'))}`}
                className="px-6 py-3 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-black text-xs sm:text-sm shadow-md inline-flex items-center gap-2 transition-all"
              >
                <Sparkles className="w-4 h-4" />
                <span>Take Grand Final Examination (All Chapters) →</span>
              </Link>
            ) : (
              <Link
                to={subject === 'physiology' ? '/physiology-syllabus' : (subject === 'anatomy' ? '/anatomy-syllabus' : (subject === 'biochemistry' ? '/bio-chem-syllabus' : '/nutrition-syllabus'))}
                className="px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-md inline-flex items-center gap-2 transition-all cursor-pointer"
              >
                <span>Continue Syllabus ({gating.completedCount}/{gating.totalUnits} Done)</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentResults;
