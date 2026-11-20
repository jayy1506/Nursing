import React, { useState } from 'react';
import { X, CheckCircle, AlertTriangle, Target, HelpCircle, Trophy } from 'lucide-react';

export const QuizModal = ({ specimen, onClose, onPinpointTarget }) => {
  const [quizMode, setQuizMode] = useState('mcq'); // 'mcq' | 'pinpoint'
  const [qIndex, setQIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  const [quizFinished, setQuizFinished] = useState(false);

  const questions = specimen.quizBank || [];
  const currentQ = questions[qIndex] || questions[0];

  const handleSelectOption = (opt) => {
    if (submitted) return;
    setSelectedOption(opt);
  };

  const handleSubmit = () => {
    if (!selectedOption || submitted) return;
    setSubmitted(true);
    const isCorrect = selectedOption === currentQ.correctAnswer;
    if (isCorrect) {
      setScore((s) => s + 1);
    }
  };

  const handleNext = () => {
    if (qIndex < questions.length - 1) {
      setQIndex(qIndex + 1);
      setSelectedOption(null);
      setSubmitted(false);
    } else {
      setQuizFinished(true);
    }
  };

  const handlePinpointSelect = (partId) => {
    if (submitted) return;
    setSelectedOption(partId);
    setSubmitted(true);
    if (partId === currentQ.targetPartId) {
      setScore((s) => s + 1);
    }
    if (onPinpointTarget) {
      onPinpointTarget(partId);
    }
  };

  const isCurrentPinpoint = currentQ?.type === 'pinpoint';
  const isCorrect = isCurrentPinpoint
    ? selectedOption === currentQ?.targetPartId
    : selectedOption === currentQ?.correctAnswer;

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in">
      <div
        className="bg-white max-w-xl w-full rounded-3xl border border-neutral-200 p-6 shadow-2xl space-y-5 animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header */}
        <div className="flex items-center justify-between border-b border-neutral-100 pb-3">
          <div>
            <span className="text-[10px] font-black uppercase tracking-wider text-[#159A91]">
              Interactive Assessment
            </span>
            <h3 className="font-serif text-xl font-bold text-[#123B50]">
              {specimen.name} Clinical Mastery
            </h3>
          </div>

          <div className="flex items-center gap-2">
            {/* Mode switch */}
            <div className="flex bg-neutral-100 p-1 rounded-xl text-[10px] font-bold">
              <button
                type="button"
                onClick={() => setQuizMode('mcq')}
                className={`px-2.5 py-1 rounded-lg transition-all ${
                  quizMode === 'mcq' ? 'bg-white text-[#123B50] shadow-xs' : 'text-neutral-500'
                }`}
              >
                MCQ
              </button>
              <button
                type="button"
                onClick={() => setQuizMode('pinpoint')}
                className={`px-2.5 py-1 rounded-lg transition-all ${
                  quizMode === 'pinpoint' ? 'bg-white text-[#123B50] shadow-xs' : 'text-neutral-500'
                }`}
              >
                3D Pinpoint
              </button>
            </div>

            <button
              onClick={onClose}
              className="p-1.5 rounded-full hover:bg-neutral-100 text-neutral-400 hover:text-[#123B50] cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Finished State */}
        {quizFinished ? (
          <div className="py-8 text-center space-y-4">
            <div className="w-16 h-16 rounded-3xl bg-[#E9F5F3] text-[#159A91] flex items-center justify-center mx-auto shadow-md">
              <Trophy className="w-8 h-8" />
            </div>
            <h4 className="font-serif text-2xl font-bold text-[#123B50]">
              Assessment Complete!
            </h4>
            <p className="text-xs text-[#263746] max-w-sm mx-auto">
              You scored <span className="font-bold text-[#159A91]">{score}</span> out of{' '}
              <span className="font-bold text-[#123B50]">{questions.length}</span> questions correctly on {specimen.name}.
            </p>
            <div className="flex justify-center gap-3 pt-2">
              <button
                onClick={() => {
                  setQIndex(0);
                  setSelectedOption(null);
                  setSubmitted(false);
                  setScore(0);
                  setQuizFinished(false);
                }}
                className="px-5 py-2.5 rounded-xl border border-neutral-200 bg-white hover:bg-neutral-50 text-xs font-bold text-[#123B50] cursor-pointer"
              >
                Retake Quiz
              </button>
              <button
                onClick={onClose}
                className="px-5 py-2.5 rounded-xl bg-[#159A91] hover:bg-[#12837B] text-white text-xs font-bold cursor-pointer"
              >
                Close & Return to Stage
              </button>
            </div>
          </div>
        ) : (
          /* Active Question State */
          <div className="space-y-4">
            {/* Progress counter */}
            <div className="flex items-center justify-between text-xs text-[#263746] font-bold">
              <span>
                Question {qIndex + 1} of {questions.length}
              </span>
              <span>Score: {score}</span>
            </div>

            {/* Prompt */}
            <div className="bg-neutral-50 p-4 rounded-2xl border border-neutral-200 space-y-1">
              <div className="flex items-center gap-1.5 text-[10px] font-black uppercase text-[#159A91]">
                {isCurrentPinpoint ? <Target className="w-3.5 h-3.5" /> : <HelpCircle className="w-3.5 h-3.5" />}
                <span>{isCurrentPinpoint ? 'Identify 3D Structure' : 'Objective Multiple Choice'}</span>
              </div>
              <p className="text-sm font-semibold text-[#123B50] leading-relaxed">
                {currentQ?.prompt}
              </p>
            </div>

            {/* MCQ Options */}
            {!isCurrentPinpoint && currentQ?.options && (
              <div className="space-y-2">
                {currentQ.options.map((opt, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => handleSelectOption(opt)}
                    className={`w-full p-3 rounded-2xl border text-left text-xs font-bold transition-all cursor-pointer ${
                      selectedOption === opt
                        ? 'bg-[#E9F5F3] border-[#159A91] text-[#123B50] shadow-xs'
                        : 'bg-white hover:bg-neutral-50 border-neutral-200 text-[#263746]'
                    }`}
                  >
                    {opt}
                  </button>
                ))}
              </div>
            )}

            {/* 3D Pinpoint Part Selector */}
            {isCurrentPinpoint && (
              <div className="space-y-2">
                <span className="text-xs font-bold text-[#123B50] block">
                  Click the matching anatomical structure below:
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {specimen.parts?.map((p) => (
                    <button
                      key={p.id}
                      type="button"
                      onClick={() => handlePinpointSelect(p.id)}
                      className={`p-2.5 rounded-xl border text-xs font-bold text-left transition-all cursor-pointer ${
                        selectedOption === p.id
                          ? 'bg-[#E9F5F3] border-[#159A91] text-[#123B50]'
                          : 'bg-white hover:bg-neutral-50 border-neutral-200 text-[#263746]'
                      }`}
                    >
                      • {p.name}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Rationale feedback card */}
            {submitted && (
              <div
                className={`p-4 rounded-2xl text-xs space-y-1 animate-in fade-in ${
                  isCorrect
                    ? 'bg-emerald-50 text-emerald-950 border border-emerald-200'
                    : 'bg-rose-50 text-rose-950 border border-rose-200'
                }`}
              >
                <div className="flex items-center gap-1.5 font-bold">
                  {isCorrect ? (
                    <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
                  ) : (
                    <AlertTriangle className="w-4 h-4 text-rose-600 shrink-0" />
                  )}
                  <span>{isCorrect ? 'Correct! High-Yield Concept Verified.' : 'Incorrect.'}</span>
                </div>
                <p className="leading-relaxed">{currentQ?.rationale}</p>
              </div>
            )}

            {/* Action buttons */}
            <div className="flex items-center justify-end gap-3 pt-2">
              {!submitted && !isCurrentPinpoint && (
                <button
                  type="button"
                  disabled={!selectedOption}
                  onClick={handleSubmit}
                  className="px-5 py-2.5 rounded-xl bg-[#159A91] hover:bg-[#12837B] text-white text-xs font-bold disabled:opacity-40 cursor-pointer shadow-xs"
                >
                  Confirm Answer
                </button>
              )}

              {submitted && (
                <button
                  type="button"
                  onClick={handleNext}
                  className="px-5 py-2.5 rounded-xl bg-[#123B50] hover:bg-black text-white text-xs font-bold cursor-pointer shadow-xs"
                >
                  {qIndex < questions.length - 1 ? 'Next Question →' : 'View Results'}
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
