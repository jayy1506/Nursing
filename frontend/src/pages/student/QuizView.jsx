import React, { useState, useEffect } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import Navbar from '../../components/Navbar';
import {
  getAssessmentByTopic,
  recordAssessmentAttempt,
  getStudentGatingStatus,
  formatDuration
} from '../../services/assessmentEngine';
import {
  ClipboardList,
  CheckCircle2,
  AlertCircle,
  ArrowRight,
  ArrowLeft,
  Sparkles,
  Clock,
  Award,
  HelpCircle,
  BookOpen,
  Lock,
  ShieldAlert,
  ChevronRight
} from 'lucide-react';

export const QuizView = () => {
  const navigate = useNavigate();
  const { topicId } = useParams();

  // Load assessment data dynamically
  const assessmentData = getAssessmentByTopic(topicId);
  const questions = assessmentData?.questions || [];
  const subject = assessmentData?.subject || (
    topicId?.includes('phys') ? 'physiology' :
    (topicId?.includes('nut') ? 'nutrition' :
    (topicId?.includes('carb') || topicId?.includes('lipid') || topicId?.includes('protein') || topicId?.includes('enzyme') || topicId?.includes('biochem') ? 'biochemistry' : 'anatomy'))
  );

  // Gating status
  const gating = getStudentGatingStatus(subject);
  const isGrandFinal = assessmentData?.isGrandFinal || topicId?.includes('grand-final');
  const isLocked = isGrandFinal && !gating.isFinalUnlocked;

  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [elapsedSeconds, setElapsedSeconds] = useState(0);
  const [timeLeft, setTimeLeft] = useState((questions.length || 15) * 90); // 90s per question
  const [submitting, setSubmitting] = useState(false);

  // Stopwatch timer (time spent) & countdown
  useEffect(() => {
    if (isLocked || questions.length === 0) return;

    const timer = setInterval(() => {
      setElapsedSeconds(prev => prev + 1);
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          handleSubmitQuiz();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isLocked, questions.length]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  const currentQ = questions[currentIndex];
  const answeredCount = Object.keys(selectedAnswers).length;
  const progressPercent = questions.length > 0 ? Math.round((answeredCount / questions.length) * 100) : 0;

  const handleSelectOption = (optIndex) => {
    setSelectedAnswers({
      ...selectedAnswers,
      [currentIndex]: optIndex
    });
  };

  const handleSubmitQuiz = async () => {
    if (submitting) return;
    setSubmitting(true);

    let correctCount = 0;
    const reviewData = questions.map((q, idx) => {
      const isCorrect = selectedAnswers[idx] === q.correctAnswer;
      if (isCorrect) correctCount += 1;
      return {
        ...q,
        studentAnswer: selectedAnswers[idx],
        isCorrect
      };
    });

    const totalQuestions = questions.length || 1;
    const percentage = Math.round((correctCount / totalQuestions) * 100);
    const passed = percentage >= 75;

    // Get current user details from localStorage
    const savedUser = JSON.parse(localStorage.getItem('nursing_user') || localStorage.getItem('user') || '{}');
    const studentName = savedUser.displayName || savedUser.name || 'Nursing Student';
    const studentEmail = savedUser.email || 'student@nursing-lms.edu';
    const studentId = savedUser.uid || savedUser.firebaseUid || savedUser.id || 'student-local';

    // Record attempt locally and sync to MongoDB Atlas
    await recordAssessmentAttempt({
      studentId,
      studentName,
      studentEmail,
      topicId: topicId || 'assessment-quiz',
      topicTitle: assessmentData.title,
      subject,
      score: correctCount,
      totalQuestions,
      percentage,
      passed,
      timeSpentSeconds: elapsedSeconds,
      reviewData
    });

    // Navigate to results
    navigate('/student/results', {
      state: {
        score: percentage,
        rawScore: correctCount,
        totalQuestions,
        correctCount,
        incorrectCount: totalQuestions - correctCount,
        percentage,
        passed,
        moduleName: assessmentData.title,
        assessmentKey: topicId,
        subject,
        timeSpentSeconds: elapsedSeconds,
        timeSpentFormatted: formatDuration(elapsedSeconds),
        reviewData,
        completedAt: new Date().toISOString()
      }
    });
  };

  // If locked, render lock barrier
  if (isLocked) {
    return (
      <div className="min-h-screen bg-neutral-50 text-neutral-900 pb-16 font-sans">
        <Navbar />
        <div className="max-w-2xl mx-auto px-4 py-16 text-center">
          <div className="w-20 h-20 bg-neutral-100 text-black dark:text-white rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-inner ring-8 ring-neutral-400">
            <Lock className="w-10 h-10" />
          </div>

          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-neutral-100 border border-neutral-400 text-black dark:text-white text-xs font-black uppercase tracking-wider mb-3">
            <ShieldAlert className="w-3.5 h-3.5" />
            <span>Grand Final Assessment Locked</span>
          </span>

          <h1 className="text-2xl sm:text-3xl font-black text-neutral-900 tracking-tight mb-3">
            100% Course Completion Required
          </h1>

          <p className="text-neutral-600 text-xs sm:text-sm max-w-lg mx-auto leading-relaxed mb-6">
            Under official Indian Nursing Council (INC) CBME standards, the Comprehensive Grand Final is locked until you have completed and passed all {gating.totalUnits} units with minimum 75% score.
          </p>

          <div className="bg-white rounded-2xl border border-neutral-200 p-6 shadow-sm mb-8 text-left space-y-4">
            <div className="flex items-center justify-between text-xs font-bold">
              <span className="text-neutral-500">Your Current Progress</span>
              <span className="text-black dark:text-white font-extrabold">{gating.completedCount} / {gating.totalUnits} Units Mastered ({gating.completionPercent}%)</span>
            </div>
            <div className="w-full bg-neutral-100 rounded-full h-3 overflow-hidden">
              <div
                className="bg-gradient-to-r from-black dark:from-white to-neutral-800 h-3 rounded-full transition-all duration-500"
                style={{ width: `${gating.completionPercent}%` }}
              />
            </div>
            <p className="text-[11px] text-neutral-500">
              Complete remaining <strong>{gating.remainingCount} modules</strong> to unlock the final examination.
            </p>
          </div>

          {(() => {
            const syllabusRoutes = {
              physiology: { path: '/physiology-syllabus', name: 'Physiology' },
              anatomy: { path: '/anatomy-syllabus', name: 'Anatomy' },
              biochemistry: { path: '/bio-chem-syllabus', name: 'Biochemistry' },
              nutrition: { path: '/nutrition-syllabus', name: 'Nutrition' }
            };
            const target = syllabusRoutes[subject] || { path: '/syllabus', name: 'Syllabus' };

            return (
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                <Link
                  to={target.path}
                  className="w-full sm:w-auto px-6 py-3 rounded-xl bg-green-500 hover:bg-green-500 text-white font-bold text-xs shadow-md transition-all inline-flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>Return to {target.name} Syllabus</span>
                  <ChevronRight className="w-4 h-4" />
                </Link>
                <Link
                  to="/syllabus"
                  className="w-full sm:w-auto px-6 py-3 rounded-xl bg-neutral-100 hover:bg-neutral-200 text-neutral-700 font-bold text-xs transition-all inline-flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>All Syllabi Hub</span>
                </Link>
              </div>
            );
          })()}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b bg-neutral-100/50 via-white to-neutral-50 text-neutral-900 pb-16 font-sans">
      <Navbar />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8">
        {/* Assessment Header Card */}
        <div className="bg-white border border-neutral-200/90 rounded-3xl p-6 shadow-sm mb-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-neutral-100 text-green-700 text-xs font-extrabold border border-neutral-300 mb-2">
              <ClipboardList className="w-3.5 h-3.5 text-green-700" />
              <span>{questions.length}-Question Assessment Exam</span>
            </div>
            <h1 className="text-xl sm:text-2xl font-black text-neutral-900 tracking-tight">
              {assessmentData.title}
            </h1>
            <p className="text-xs sm:text-sm text-neutral-600 mt-1">
              {assessmentData.description}
            </p>
          </div>

          <div className="flex items-center gap-3 self-start md:self-auto shrink-0">
            {/* Live Stopwatch / Time Spent */}
            <div className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-neutral-50 border border-neutral-200 text-neutral-700 font-mono font-bold text-xs" title="Elapsed Time Spent">
              <Clock className="w-3.5 h-3.5 text-green-700" />
              <span>{formatDuration(elapsedSeconds)}</span>
            </div>

            <div className="px-3.5 py-2 rounded-xl bg-neutral-100 border border-neutral-300 text-neutral-800 font-bold text-xs">
              <span>{answeredCount} / {questions.length} Answered</span>
            </div>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-neutral-200/80 rounded-full h-2.5 mb-6 overflow-hidden">
          <div
            className="bg-gradient-to-r from-green-500 to-green-500 h-2.5 rounded-full transition-all duration-300"
            style={{ width: `${progressPercent}%` }}
          />
        </div>

        {/* Question Selector Quick Grid */}
        <div className="flex flex-wrap gap-1.5 mb-6 p-3 bg-white border border-neutral-200/90 rounded-2xl shadow-xs">
          {questions.map((_, i) => {
            const isAnswered = selectedAnswers[i] !== undefined;
            const isCurrent = i === currentIndex;
            return (
              <button
                key={i}
                onClick={() => setCurrentIndex(i)}
                className={`w-7 h-7 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  isCurrent
                    ? 'bg-green-500 text-white shadow-sm ring-2 ring-neutral-400'
                    : isAnswered
                    ? 'bg-neutral-100 text-green-700 border border-neutral-300'
                    : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200'
                }`}
              >
                {i + 1}
              </button>
            );
          })}
        </div>

        {/* Active Question Box */}
        {currentQ && (
          <div className="bg-white rounded-3xl border border-neutral-200/90 p-6 sm:p-8 shadow-sm space-y-6">
            <div className="flex items-center justify-between border-b border-neutral-100 pb-3">
              <span className="text-xs font-black text-green-700 bg-neutral-100 px-3 py-1 rounded-full border border-neutral-300">
                Question {currentIndex + 1} of {questions.length}
              </span>
              <span className="text-[11px] font-bold text-neutral-500">
                Standard: 75% to pass
              </span>
            </div>

            <h2 className="text-base sm:text-lg font-bold text-neutral-900 leading-relaxed">
              {currentQ.text}
            </h2>

            {/* Options List */}
            <div className="space-y-3">
              {currentQ.options.map((opt, optIdx) => {
                const isSelected = selectedAnswers[currentIndex] === optIdx;
                const letter = String.fromCharCode(65 + optIdx); // A, B, C, D
                return (
                  <button
                    key={optIdx}
                    onClick={() => handleSelectOption(optIdx)}
                    className={`w-full text-left p-4 rounded-2xl border text-xs sm:text-sm font-medium transition-all flex items-start gap-3 cursor-pointer ${
                      isSelected
                        ? 'bg-neutral-100/90 border-green-500 text-neutral-800 font-bold shadow-sm'
                        : 'bg-neutral-50/70 hover:bg-neutral-100/80 border-neutral-200 text-neutral-700'
                    }`}
                  >
                    <span
                      className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-black shrink-0 ${
                        isSelected
                          ? 'bg-green-500 text-white shadow-sm'
                          : 'bg-neutral-200 text-neutral-600'
                      }`}
                    >
                      {letter}
                    </span>
                    <span className="flex-1 mt-0.5 leading-snug">{opt}</span>
                  </button>
                );
              })}
            </div>

            {/* Navigation Footer */}
            <div className="flex items-center justify-between pt-6 border-t border-neutral-100">
              <button
                disabled={currentIndex === 0}
                onClick={() => setCurrentIndex((prev) => prev - 1)}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold text-neutral-600 hover:bg-neutral-100 disabled:opacity-30 cursor-pointer"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Previous</span>
              </button>

              {currentIndex < questions.length - 1 ? (
                <button
                  onClick={() => setCurrentIndex((prev) => prev + 1)}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-bold bg-green-500 hover:bg-green-500 text-white shadow-md shadow-md transition-all cursor-pointer"
                >
                  <span>Next Question</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              ) : (
                <button
                  onClick={handleSubmitQuiz}
                  disabled={submitting}
                  className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full text-xs font-bold bg-green-500 hover:bg-green-700 text-white shadow-lg shadow-green-500/30 hover:scale-105 transition-all cursor-pointer"
                >
                  <span>{submitting ? 'Submitting...' : 'Submit & View Results'}</span>
                  <CheckCircle2 className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default QuizView;
