import React, { useState } from 'react';
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
  TrendingUp,
  Printer,
  Filter
} from 'lucide-react';

export const StudentResults = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [filterMode, setFilterMode] = useState('all'); // 'all' | 'incorrect' | 'correct'

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

  // Compute subtopic accuracy metrics
  const subtopicStats = {};
  reviewData.forEach(q => {
    const sub = q.subtopic || 'General Competencies';
    if (!subtopicStats[sub]) subtopicStats[sub] = { total: 0, correct: 0 };
    subtopicStats[sub].total += 1;
    if (q.isCorrect) subtopicStats[sub].correct += 1;
  });
  const subtopicList = Object.entries(subtopicStats).map(([name, data]) => ({
    name,
    total: data.total,
    correct: data.correct,
    percentage: Math.round((data.correct / data.total) * 100)
  }));

  const filteredReviewData = reviewData.filter(q => {
    if (filterMode === 'incorrect') return !q.isCorrect;
    if (filterMode === 'correct') return q.isCorrect;
    return true;
  });

  return (
    <div className="min-h-screen bg-linear-to-b from-neutral-50 via-white bg-neutral-100/30 text-neutral-900 pb-20 font-sans">
      <div className="print:hidden">
        <Navbar />
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8">
        {/* Top Header Card */}
        <div className={`rounded-3xl border p-6 sm:p-8 shadow-sm mb-6 ${
          passed
            ? 'bg-linear-to-br from-green-500/10 via-green-50/50 to-white border-green-100'
            : 'bg-linear-to-br from-neutral-800/10 bg-neutral-100 to-white border-neutral-300'
        }`}>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-2.5">
                <div className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider shadow-xs ${
                  passed ? 'bg-green-100 text-green-700' : 'bg-neutral-100 text-neutral-800'
                }`}>
                  {passed ? <ShieldCheck className="w-3.5 h-3.5 text-green-500" /> : <AlertTriangle className="w-3.5 h-3.5 text-neutral-800" />}
                  <span>{passed ? 'Assessment Passed (Competency Mastered)' : 'Needs Improvement (Score Below 75%)'}</span>
                </div>
                <button
                  type="button"
                  onClick={() => window.print()}
                  className="print:hidden px-3 py-1 rounded-full border border-neutral-300 hover:bg-white text-[11px] font-bold text-neutral-700 inline-flex items-center gap-1.5 shadow-xs transition-colors cursor-pointer"
                  title="Print official INC results summary or save as PDF"
                >
                  <Printer className="w-3 h-3 text-neutral-600" />
                  <span>Print Report</span>
                </button>
              </div>

              <h1 className="text-xl sm:text-3xl font-black text-neutral-900 tracking-tight">
                {moduleName}
              </h1>
              <p className="text-xs sm:text-sm text-neutral-600 mt-1">
                {passed
                  ? 'Excellent work! Your marks have been recorded in the college database.'
                  : 'Review the high-yield clinical explanations below and retake the test to master this unit.'}
              </p>
            </div>

            {/* Overall Score Badge */}
            <div className="text-center sm:text-right shrink-0">
              <span className="text-[11px] font-bold text-neutral-400 uppercase tracking-wider block">Final Score</span>
              <div className={`text-4xl sm:text-5xl font-black ${passed ? 'text-green-500' : 'text-neutral-800'}`}>
                {percentage}%
              </div>
              <span className="text-xs font-bold text-neutral-500">{correctCount} of {totalQuestions} correct</span>
            </div>
          </div>

          {/* Quick Metrics Cards */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-6 pt-6 border-t border-neutral-200/60">
            <div className="bg-white/80 rounded-2xl p-3 border border-neutral-200/80 shadow-xs">
              <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider block">Time Spent</span>
              <p className="text-sm font-black text-neutral-800 flex items-center gap-1.5 mt-0.5">
                <Clock className="w-3.5 h-3.5 text-green-700" />
                <span>{timeSpentFormatted}</span>
              </p>
            </div>

            <div className="bg-white/80 rounded-2xl p-3 border border-neutral-200/80 shadow-xs">
              <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider block">Correct Answers</span>
              <p className="text-sm font-black text-green-500 flex items-center gap-1.5 mt-0.5">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>{correctCount} Correct</span>
              </p>
            </div>

            <div className="bg-white/80 rounded-2xl p-3 border border-neutral-200/80 shadow-xs">
              <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider block">Incorrect Answers</span>
              <p className="text-sm font-black text-neutral-900 flex items-center gap-1.5 mt-0.5">
                <XCircle className="w-3.5 h-3.5" />
                <span>{incorrectCount} Incorrect</span>
              </p>
            </div>

            <div className="bg-white/80 rounded-2xl p-3 border border-neutral-200/80 shadow-xs">
              <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider block">INC Status</span>
              <p className="text-sm font-black text-neutral-800 flex items-center gap-1.5 mt-0.5">
                <Award className="w-3.5 h-3.5 text-green-700" />
                <span>{passed ? 'Certified' : 'Retake Required'}</span>
              </p>
            </div>
          </div>
        </div>

        {/* Subtopic Performance Breakdown */}
        {subtopicList.length > 0 && (
          <div className="bg-white rounded-3xl border border-neutral-200 p-6 shadow-sm mb-6 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-green-700" />
                <h3 className="text-xs font-black text-neutral-900 uppercase tracking-wider">
                  Competency Mastery by Subtopic
                </h3>
              </div>
              <span className="text-[11px] text-neutral-500 font-bold">
                Pass Benchmark: 75%
              </span>
            </div>

            <div className="space-y-3 pt-1">
              {subtopicList.map((st, i) => {
                const isProficient = st.percentage >= 75;
                const isModerate = st.percentage >= 50 && st.percentage < 75;
                return (
                  <div key={i} className="space-y-1">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-bold text-neutral-800">{st.name}</span>
                      <span className="font-mono font-extrabold text-[11px] text-neutral-700">
                        {st.correct}/{st.total} ({st.percentage}%)
                      </span>
                    </div>
                    <div className="w-full bg-neutral-100 rounded-full h-2 overflow-hidden">
                      <div
                        className={`h-2 rounded-full transition-all duration-300 ${
                          isProficient
                            ? 'bg-green-600'
                            : isModerate
                            ? 'bg-amber-500'
                            : 'bg-rose-500'
                        }`}
                        style={{ width: `${st.percentage}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

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
            <div className="bg-white rounded-3xl border border-neutral-200 p-6 shadow-sm mb-8 space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-green-700" />
                  <h3 className="text-sm font-black text-neutral-900 uppercase tracking-wider">
                    {subjectDisplayName} Curriculum Mastery
                  </h3>
                </div>
                <span className="text-xs font-black text-green-700 bg-neutral-100 px-2.5 py-1 rounded-full border border-neutral-300">
                  {gating.completedCount} / {gating.totalUnits} Units Completed ({gating.completionPercent}%)
                </span>
              </div>

              <div className="w-full bg-neutral-100 rounded-full h-3 overflow-hidden">
                <div
                  className="bg-linear-to-r from-green-500 to-green-500 h-3 rounded-full transition-all duration-500"
                  style={{ width: `${gating.completionPercent}%` }}
                />
              </div>

              {/* Grand Final Lock Status Callout */}
              <div className={`p-4 rounded-2xl border flex items-center justify-between gap-4 ${
                gating.isFinalUnlocked
                  ? 'bg-green-50/80 border-green-400 text-green-900'
                  : 'bg-neutral-50 border-neutral-200 text-neutral-700'
              }`}>
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
                    gating.isFinalUnlocked ? 'bg-green-500 text-white' : 'bg-neutral-200 text-neutral-500'
                  }`}>
                    {gating.isFinalUnlocked ? <Unlock className="w-5 h-5" /> : <Lock className="w-5 h-5" />}
                  </div>
                  <div>
                    <h4 className="text-xs sm:text-sm font-extrabold text-neutral-900">
                      {gating.isFinalUnlocked
                        ? '🎉 100% Course Completed! Grand Final Examination Unlocked'
                        : 'Grand Final Comprehensive Assessment Locked'}
                    </h4>
                    <p className="text-[11px] text-neutral-500">
                      {gating.isFinalUnlocked
                        ? `You have completed all ${gating.totalUnits} modules. You are eligible to take the cumulative mixed exam.`
                        : `Must achieve 100% completion across all ${gating.totalUnits} modules. Remaining: ${gating.remainingCount} modules.`}
                    </p>
                  </div>
                </div>

                {gating.isFinalUnlocked ? (
                  <Link
                    to={`/quiz/${grandFinalSlug}`}
                    className="px-4 py-2 rounded-xl bg-green-500 hover:bg-green-700 text-white font-bold text-xs shrink-0 shadow-sm transition-all"
                  >
                    Take Grand Final →
                  </Link>
                ) : (
                  <span className="text-[11px] font-bold text-neutral-400 bg-neutral-200/80 px-3 py-1.5 rounded-lg shrink-0">
                    Locked (100% Needed)
                  </span>
                )}
              </div>
            </div>
          );
        })()}

        {/* Question by Question Review Header & Filter Controls */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
          <div className="flex items-center gap-2">
            <BookOpen className="w-4 h-4 text-neutral-600" />
            <h3 className="text-sm font-black text-neutral-900 uppercase tracking-wider">
              Detailed Question Review ({reviewData.length})
            </h3>
          </div>

          {/* Filter Pills */}
          <div className="flex items-center gap-1.5 p-1 bg-neutral-100 rounded-xl border border-neutral-200 self-start sm:self-auto print:hidden">
            <button
              type="button"
              onClick={() => setFilterMode('all')}
              className={`px-3 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                filterMode === 'all'
                  ? 'bg-white text-neutral-900 shadow-xs'
                  : 'text-neutral-500 hover:text-neutral-900'
              }`}
            >
              All ({reviewData.length})
            </button>
            <button
              type="button"
              onClick={() => setFilterMode('incorrect')}
              className={`px-3 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                filterMode === 'incorrect'
                  ? 'bg-white text-rose-700 shadow-xs'
                  : 'text-neutral-500 hover:text-rose-600'
              }`}
            >
              Missed ({incorrectCount})
            </button>
            <button
              type="button"
              onClick={() => setFilterMode('correct')}
              className={`px-3 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                filterMode === 'correct'
                  ? 'bg-white text-green-700 shadow-xs'
                  : 'text-neutral-500 hover:text-green-600'
              }`}
            >
              Correct ({correctCount})
            </button>
          </div>
        </div>

        {/* Questions Breakdown List */}
        <div className="space-y-4">
          {filteredReviewData.length === 0 ? (
            <div className="bg-white rounded-2xl border border-neutral-200 p-8 text-center text-neutral-500 space-y-2">
              <CheckCircle2 className="w-8 h-8 text-green-500 mx-auto" />
              <p className="text-sm font-bold text-neutral-800">No questions match this filter.</p>
              <button
                type="button"
                onClick={() => setFilterMode('all')}
                className="text-xs text-green-700 font-bold hover:underline cursor-pointer"
              >
                Reset to show all questions
              </button>
            </div>
          ) : (
            filteredReviewData.map((q, idx) => {
              const isCorrect = q.isCorrect;
              const studentChoice = q.options ? q.options[q.studentAnswer] : 'Not answered';
              const correctChoice = q.options ? q.options[q.correctAnswer] : 'N/A';
              const originalIndex = reviewData.findIndex(item => item.id === q.id || item.text === q.text);
              const questionNumber = originalIndex >= 0 ? originalIndex + 1 : idx + 1;

              return (
                <div
                  key={q.id || idx}
                  className={`bg-white rounded-2xl border p-5 sm:p-6 shadow-xs space-y-3.5 transition-all ${
                    isCorrect ? 'border-green-100' : 'border-neutral-400'
                  }`}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-2">
                      <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-black shrink-0 ${
                        isCorrect ? 'bg-green-100 text-green-700' : 'bg-neutral-100 text-neutral-900'
                      }`}>
                        {questionNumber}
                      </span>
                      <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider">
                        {q.subtopic || 'INC Core Competency'}
                      </span>
                    </div>

                    <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-extrabold ${
                      isCorrect ? 'bg-green-50 text-green-700 border border-green-100' : 'bg-neutral-100 text-neutral-900 border border-neutral-400'
                    }`}>
                      {isCorrect ? <CheckCircle2 className="w-3 h-3" /> : <XCircle className="w-3 h-3" />}
                      <span>{isCorrect ? 'Correct' : 'Incorrect'}</span>
                    </span>
                  </div>

                  <h4 className="text-sm font-bold text-neutral-900 leading-relaxed">
                    {q.text}
                  </h4>

                  {/* Options Comparison */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                    <div className={`p-3 rounded-xl border ${
                      isCorrect ? 'bg-green-50/60 border-green-100 text-green-900 font-semibold' : 'bg-neutral-100/60 border-neutral-400 text-neutral-800'
                    }`}>
                      <span className="text-[10px] font-bold text-neutral-400 block mb-0.5">Your Selected Answer:</span>
                      <p className="font-bold">{studentChoice || 'None selected'}</p>
                    </div>

                    {!isCorrect && (
                      <div className="p-3 rounded-xl border bg-green-50/60 border-green-100 text-green-900">
                        <span className="text-[10px] font-bold text-green-700 block mb-0.5">Correct Answer:</span>
                        <p className="font-bold">{correctChoice}</p>
                      </div>
                    )}
                  </div>

                  {/* Clinical Rationale */}
                  {q.rationale && (
                    <div className="bg-neutral-50 border border-neutral-200/80 rounded-xl p-3 text-xs text-neutral-700 leading-relaxed">
                      <span className="font-extrabold text-neutral-900">Clinical Explanation: </span>
                      {q.rationale}
                    </div>
                  )}
                </div>
              );
            })
          )}
        </div>

        {/* Footer Navigation Actions */}
        <div className="flex flex-wrap items-center justify-between gap-4 mt-8 pt-6 border-t border-neutral-200 print:hidden">
          <div className="flex items-center gap-2 flex-wrap">
            <button
              onClick={() => navigate(`/quiz/${assessmentKey}`)}
              className="px-5 py-2.5 rounded-xl border border-neutral-300 text-neutral-700 hover:bg-neutral-100 font-bold text-xs inline-flex items-center gap-2 cursor-pointer transition-colors"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Retake Entire Chapter Quiz</span>
            </button>
            <button
              type="button"
              onClick={() => window.print()}
              className="px-4 py-2.5 rounded-xl border border-neutral-300 hover:bg-neutral-100 text-xs font-bold text-neutral-700 inline-flex items-center gap-2 cursor-pointer transition-colors"
            >
              <Printer className="w-4 h-4 text-neutral-500" />
              <span>Print Results</span>
            </button>
          </div>

          <div className="flex items-center gap-3 flex-wrap">
            {gating.isFinalUnlocked ? (
              <Link
                to={`/quiz/${subject === 'physiology' ? 'physiology-grand-final' : (subject === 'anatomy' ? 'anatomy-grand-final' : (subject === 'biochemistry' ? 'biochem-grand-final' : 'nutrition-grand-final'))}`}
                className="px-6 py-3 rounded-2xl bg-green-500 hover:bg-green-700 text-white font-black text-xs sm:text-sm shadow-md inline-flex items-center gap-2 transition-all"
              >
                <Sparkles className="w-4 h-4" />
                <span>Take Grand Final Examination (All Chapters) →</span>
              </Link>
            ) : (
              <Link
                to={subject === 'physiology' ? '/physiology-syllabus' : (subject === 'anatomy' ? '/anatomy-syllabus' : (subject === 'biochemistry' ? '/bio-chem-syllabus' : '/nutrition-syllabus'))}
                className="px-6 py-2.5 rounded-xl bg-green-500 hover:bg-green-700 text-white font-bold text-xs shadow-md inline-flex items-center gap-2 transition-all cursor-pointer"
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
