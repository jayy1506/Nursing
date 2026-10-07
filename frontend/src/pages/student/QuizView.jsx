import React, { useState, useEffect } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import Navbar from '../../components/Navbar';
import { MODULE_ASSESSMENTS } from '../../constants/assessmentQuestions';
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
  BookOpen
} from 'lucide-react';

export const QuizView = () => {
  const navigate = useNavigate();
  const { topicId } = useParams();

  // Determine which quiz data to load
  const assessmentKey = topicId && MODULE_ASSESSMENTS[topicId] ? topicId : 'comprehensive-final';
  const assessmentData = MODULE_ASSESSMENTS[assessmentKey] || MODULE_ASSESSMENTS['comprehensive-final'];
  const questions = assessmentData.questions;

  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [timeLeft, setTimeLeft] = useState(questions.length * 90); // 90 seconds per question

  // Timer countdown
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          handleSubmitQuiz();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [currentIndex]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  const currentQ = questions[currentIndex];
  const answeredCount = Object.keys(selectedAnswers).length;
  const progressPercent = Math.round((answeredCount / questions.length) * 100);

  const handleSelectOption = (optIndex) => {
    setSelectedAnswers({
      ...selectedAnswers,
      [currentIndex]: optIndex
    });
  };

  const handleSubmitQuiz = () => {
    let score = 0;
    const reviewData = questions.map((q, idx) => {
      const isCorrect = selectedAnswers[idx] === q.correctAnswer;
      if (isCorrect) score += 1;
      return {
        ...q,
        studentAnswer: selectedAnswers[idx],
        isCorrect
      };
    });

    const percentage = Math.round((score / questions.length) * 100);

    navigate('/student/results', {
      state: {
        score,
        totalQuestions: questions.length,
        percentage,
        topicName: assessmentData.title,
        assessmentKey,
        reviewData,
        completedAt: new Date().toISOString()
      }
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-50 via-white to-emerald-50 text-slate-900 pb-16">
      <Navbar />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8">
        {/* Assessment Header Card */}
        <div className="bg-white/90 border border-slate-200 backdrop-blur-md rounded-3xl p-6 shadow-sm mb-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold mb-2">
              <ClipboardList className="w-3.5 h-3.5 text-emerald-600" />
              <span>{questions.length}-Question Clinical Assessment</span>
            </div>
            <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
              {assessmentData.title}
            </h1>
            <p className="text-xs sm:text-sm text-slate-600 mt-1">
              {assessmentData.description}
            </p>
          </div>

          <div className="flex items-center gap-3 self-start md:self-auto">
            <div className="flex items-center gap-1.5 px-3.5 py-2 rounded-2xl bg-amber-50 border border-amber-200 text-amber-900 font-mono font-bold text-xs">
              <Clock className="w-4 h-4 text-amber-600" />
              <span>{formatTime(timeLeft)}</span>
            </div>
            <div className="px-3.5 py-2 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-900 font-bold text-xs">
              <span>{answeredCount}/{questions.length} Answered</span>
            </div>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-slate-200 rounded-full h-2 mb-6 overflow-hidden">
          <div
            className="bg-gradient-to-r from-emerald-500 to-teal-500 h-2 rounded-full transition-all duration-300"
            style={{ width: `${progressPercent}%` }}
          />
        </div>

        {/* Question Selector Quick Grid */}
        <div className="flex flex-wrap gap-1.5 mb-6 p-3 bg-white/70 border border-slate-200/80 rounded-2xl">
          {questions.map((_, i) => {
            const isAnswered = selectedAnswers[i] !== undefined;
            const isCurrent = i === currentIndex;
            return (
              <button
                key={i}
                onClick={() => setCurrentIndex(i)}
                className={`w-7 h-7 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  isCurrent
                    ? 'bg-emerald-600 text-white shadow-sm ring-2 ring-emerald-300'
                    : isAnswered
                    ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {i + 1}
              </button>
            );
          })}
        </div>

        {/* Active Question Box */}
        {currentQ && (
          <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
                Question {currentIndex + 1} of {questions.length}
              </span>
              <span className="text-[11px] font-semibold text-slate-400">
                Passing standard: 70%
              </span>
            </div>

            <h2 className="text-base sm:text-lg font-bold text-slate-900 leading-relaxed mb-6">
              {currentQ.text}
            </h2>

            {/* Options List */}
            <div className="space-y-3 mb-8">
              {currentQ.options.map((opt, optIdx) => {
                const isSelected = selectedAnswers[currentIndex] === optIdx;
                const letter = String.fromCharCode(65 + optIdx); // A, B, C, D
                return (
                  <button
                    key={optIdx}
                    onClick={() => handleSelectOption(optIdx)}
                    className={`w-full text-left p-4 rounded-2xl border text-xs sm:text-sm font-medium transition-all flex items-start gap-3 cursor-pointer ${
                      isSelected
                        ? 'bg-emerald-50/90 border-emerald-500 text-emerald-950 font-bold shadow-sm'
                        : 'bg-slate-50/70 hover:bg-slate-100/80 border-slate-200 text-slate-700'
                    }`}
                  >
                    <span
                      className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-extrabold shrink-0 ${
                        isSelected
                          ? 'bg-emerald-500 text-white shadow-sm'
                          : 'bg-slate-200 text-slate-600'
                      }`}
                    >
                      {letter}
                    </span>
                    <span className="flex-1 mt-0.5">{opt}</span>
                  </button>
                );
              })}
            </div>

            {/* Navigation Footer */}
            <div className="flex items-center justify-between pt-6 border-t border-slate-100">
              <button
                disabled={currentIndex === 0}
                onClick={() => setCurrentIndex((prev) => prev - 1)}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-100 disabled:opacity-30 cursor-pointer"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Previous</span>
              </button>

              {currentIndex < questions.length - 1 ? (
                <button
                  onClick={() => setCurrentIndex((prev) => prev + 1)}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-bold bg-emerald-500 hover:bg-emerald-600 text-white shadow-md shadow-emerald-400/20 transition-all cursor-pointer"
                >
                  <span>Next Question</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              ) : (
                <button
                  onClick={handleSubmitQuiz}
                  className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full text-xs font-bold bg-emerald-600 hover:bg-emerald-700 text-white shadow-lg shadow-emerald-500/30 hover:scale-105 transition-all cursor-pointer"
                >
                  <span>Submit & View Results</span>
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
