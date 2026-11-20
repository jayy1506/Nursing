import React, { useState, useEffect } from "react";
import {
  HelpCircle,
  CheckCircle2,
  XCircle,
  Award,
  Sparkles,
  RotateCcw,
  ChevronRight,
  ChevronLeft,
  ArrowRight,
  ArrowLeft,
  ShieldCheck,
  Stethoscope,
  BookOpen
} from "lucide-react";

/**
 * SubtopicQuiz15Marks
 * Self-contained 15-Mark Interactive Clinical Assessment for any curriculum subtopic.
 * 
 * Rules:
 * - Total Marks = 15 Marks
 * - 3 High-Yield Scenario Questions (5 Marks each = 15 Marks)
 * - Passing Benchmark = 12 / 15 Marks (80%)
 * - Shows instant feedback, earned marks, clinical rationale, and retake option
 * - Persists result in localStorage
 */

export const SubtopicQuiz15Marks = ({
  subtopicId,
  subtopicTitle = "Subtopic",
  unitTitle = "",
  questions: propQuestions,
  onQuizComplete
}) => {
  // If propQuestions provided, format to 3 questions of 5 marks each (15 marks total)
  // Else dynamically generate high-yield clinical questions for this specific subtopic
  const defaultQuestions = [
    {
      id: `${subtopicId}-q1`,
      marks: 5,
      scenario: `Regarding the foundational principles of "${subtopicTitle}", which statement represents the accredited anatomical or physiological standard?`,
      options: [
        {
          label: "A",
          text: `It provides precise structural boundaries and coordinates that maintain homeostatic integrity across clinical bedside settings.`,
          isCorrect: true,
          rationale: `Correct (5 Marks). This standard definition directly governs nursing assessment, documentation vectors, and clinical pathophysiology.`
        },
        {
          label: "B",
          text: "It operates completely independently of cellular metabolism and tissue perfusion.",
          isCorrect: false,
          rationale: "Incorrect. All anatomical structures and physiological functions are intimately coupled to metabolic homeostasis and capillary perfusion."
        },
        {
          label: "C",
          text: "Directional references change dynamically when a patient changes bed position from supine to prone.",
          isCorrect: false,
          rationale: "Incorrect. Universal anatomical reference points are fixed relative to standard anatomical position, regardless of actual patient posture."
        },
        {
          label: "D",
          text: "It only applies to geriatric clinical cohorts and is absent in neonatal physiology.",
          isCorrect: false,
          rationale: "Incorrect. Foundational anatomical and physiological principles apply across all developmental lifecycle stages."
        }
      ]
    },
    {
      id: `${subtopicId}-q2`,
      marks: 5,
      scenario: `In a clinical bedside nursing scenario involving "${subtopicTitle}", which assessment finding or intervention is considered high-priority?`,
      options: [
        {
          label: "A",
          text: "Withholding all vital signs until 24 hours post-admission.",
          isCorrect: false,
          rationale: "Incorrect. Timely baseline assessment is vital for early detection of clinical decompensation."
        },
        {
          label: "B",
          text: `Correlating patient symptoms with regional anatomical landmarks and monitoring for alterations in homeostatic stability.`,
          isCorrect: true,
          rationale: `Correct (5 Marks). Clinical nursing practice requires correlating patient symptoms directly with anatomical landmarks to detect alterations early.`
        },
        {
          label: "C",
          text: "Administering high-dose intravenous fluids without baseline cardiopulmonary auscultation.",
          isCorrect: false,
          rationale: "Incorrect. Auscultation is mandatory prior to significant fluid resuscitation to prevent pulmonary edema."
        },
        {
          label: "D",
          text: "Disregarding anatomical landmarks when selecting intramuscular injection sites.",
          isCorrect: false,
          rationale: "Incorrect. Landmark verification (e.g. ventrogluteal, deltoid) is mandatory to prevent permanent nerve palsy."
        }
      ]
    },
    {
      id: `${subtopicId}-q3`,
      marks: 5,
      scenario: `Which NCLEX-style rationale best explains the consequence of a severe pathological impairment in "${subtopicTitle}"?`,
      options: [
        {
          label: "A",
          text: "The patient will show instantaneous complete recovery without clinical intervention.",
          isCorrect: false,
          rationale: "Incorrect. Pathological disruption impairs regulatory mechanisms and requires active nursing/medical management."
        },
        {
          label: "B",
          text: "Organ functions are uncoupled and unaffected by systemic cellular injury.",
          isCorrect: false,
          rationale: "Incorrect. Disruption triggers cascading cellular hypoxia, metabolic strain, and organ dysfunction."
        },
        {
          label: "C",
          text: `Failure of localized protective or regulatory mechanisms triggers compensatory physiological responses and requires vigilant monitoring.`,
          isCorrect: true,
          rationale: `Correct (5 Marks). Severe alterations stimulate autonomic and endocrine compensations that must be actively tracked by nurses.`
        },
        {
          label: "D",
          text: "Serum biomarker assays will remain completely unchanged regardless of injury severity.",
          isCorrect: false,
          rationale: "Incorrect. Tissue injury causes release of specific intracellular enzymes and markers into the circulation."
        }
      ]
    }
  ];

  const activeQuestions = (propQuestions && propQuestions.length >= 3)
    ? propQuestions.slice(0, 3).map((q, idx) => ({
        ...q,
        id: q.id || `${subtopicId}-q${idx + 1}`,
        marks: 5
      }))
    : defaultQuestions;

  const storageKey = `subtopic_quiz_score_${subtopicId}`;

  // Answers state
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  const [isQuizOpen, setIsQuizOpen] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  // Load saved score
  useEffect(() => {
    try {
      const saved = localStorage.getItem(storageKey);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.submitted) {
          setSelectedAnswers(parsed.answers || {});
          setScore(parsed.score || 0);
          setSubmitted(true);
          setIsQuizOpen(true);
        }
      } else {
        // Reset state when subtopic changes
        setSelectedAnswers({});
        setSubmitted(false);
        setScore(0);
        setIsQuizOpen(false);
        setCurrentQuestionIndex(0);
      }
    } catch {
      // Ignore
    }
  }, [subtopicId, storageKey]);

  const handleSelectOption = (qId, optionLabel) => {
    if (submitted) return;
    setSelectedAnswers((prev) => ({
      ...prev,
      [qId]: optionLabel
    }));
  };

  const allAnswered = activeQuestions.every((q) => selectedAnswers[q.id]);

  const handleSubmit = (e) => {
    if (e) e.preventDefault();
    if (!allAnswered) return;

    let totalMarksEarned = 0;
    activeQuestions.forEach((q) => {
      const userChoice = selectedAnswers[q.id];
      const correctOption = q.options.find((opt) => opt.isCorrect);
      if (userChoice === correctOption?.label) {
        totalMarksEarned += q.marks;
      }
    });

    setScore(totalMarksEarned);
    setSubmitted(true);

    try {
      localStorage.setItem(
        storageKey,
        JSON.stringify({
          submitted: true,
          score: totalMarksEarned,
          answers: selectedAnswers,
          timestamp: new Date().toISOString()
        })
      );
    } catch (err) {
      console.warn("Storage error:", err);
    }

    if (onQuizComplete) {
      onQuizComplete(totalMarksEarned, 15);
    }
  };

  const handleRetake = () => {
    setSelectedAnswers({});
    setSubmitted(false);
    setScore(0);
    setCurrentQuestionIndex(0);
    try {
      localStorage.removeItem(storageKey);
    } catch {
      // Ignore
    }
  };

  const isPassed = score >= 12;
  const currentQuestion = activeQuestions[currentQuestionIndex] || activeQuestions[0];
  const userChoice = selectedAnswers[currentQuestion.id];
  const correctOption = currentQuestion.options.find((opt) => opt.isCorrect);

  // If quiz is not opened yet, render the "Enter Test" button after the subsection content
  if (!isQuizOpen) {
    return (
      <div className="bg-gradient-to-r from-[#123B50] via-[#159A91] to-[#123B50] rounded-3xl p-6 sm:p-8 text-white shadow-md my-8 flex flex-col sm:flex-row items-center justify-between gap-6 transition-all hover:shadow-lg">
        <div className="space-y-1.5 text-center sm:text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/15 text-white text-xs font-bold backdrop-blur-xs">
            <Award className="w-3.5 h-3.5 text-[#F2B66D]" />
            <span>End of Subsection • 15 Marks Knowledge Check</span>
          </div>
          <h4 className="text-xl sm:text-2xl font-black tracking-tight text-white">
            Finished reading {subtopicTitle}?
          </h4>
          <p className="text-xs sm:text-sm text-white/80 max-w-xl">
            Take the quick 15-mark NCLEX clinical assessment. 3 scenario questions (5 marks each). Benchmark: 12/15 marks.
          </p>
        </div>

        <button
          type="button"
          onClick={() => {
            setIsQuizOpen(true);
            setCurrentQuestionIndex(0);
          }}
          className="px-8 py-4 rounded-2xl bg-[#F2B66D] hover:bg-white text-[#123B50] font-black text-sm transition-all shadow-md hover:shadow-xl cursor-pointer shrink-0 flex items-center gap-2 active:scale-95 group"
        >
          <span>Enter Test (15 Marks)</span>
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </button>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-3xl border border-neutral-200/90 shadow-md p-6 sm:p-8 space-y-6 my-8 animate-in fade-in duration-300">
      {/* Quiz Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-neutral-200 pb-5">
        <div className="space-y-1">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="px-3 py-1 rounded-full bg-[#E9F5F3] text-[#123B50] border border-[#159A91]/30 text-xs font-black uppercase tracking-wider flex items-center gap-1.5">
              <Award className="w-3.5 h-3.5 text-[#159A91]" />
              Subtopic Assessment • 15 Marks
            </span>
            {submitted && (
              <span
                className={`px-3 py-1 rounded-full text-xs font-black border ${
                  isPassed
                    ? "bg-[#F2B66D]/25 text-[#123B50] border-[#F2B66D]/50 shadow-2xs"
                    : "bg-neutral-100 text-[#263746] border-neutral-300"
                }`}
              >
                {isPassed ? "Mastery Achieved (> 75.0%) ✓" : "Review Recommended"}
              </span>
            )}
          </div>
          <h3 className="text-lg sm:text-xl font-black text-[#123B50] tracking-tight">
            Clinical Knowledge Check: {subtopicTitle}
          </h3>
          <p className="text-xs text-neutral-500">
            One question per view • Navigate using Previous and Next buttons • 5 Marks each
          </p>
        </div>

        <div className="flex items-center gap-3 self-start sm:self-center">
          {submitted ? (
            <div className="flex items-center gap-3 bg-[#E9F5F3] px-4 py-2.5 rounded-2xl border border-[#159A91]/30">
              <div className="text-right">
                <div className="text-[10px] uppercase font-bold text-neutral-500">Score</div>
                <div className="text-lg font-black text-[#123B50]">
                  {score} <span className="text-xs text-neutral-500">/ 15</span>
                </div>
              </div>
              <div
                className={`w-9 h-9 rounded-xl flex items-center justify-center font-black text-xs text-white shadow-xs ${
                  isPassed ? "bg-[#159A91]" : "bg-[#F2B66D]"
                }`}
              >
                {Math.round((score / 15) * 100)}%
              </div>
            </div>
          ) : (
            <button
              type="button"
              onClick={() => setIsQuizOpen(false)}
              className="text-xs font-semibold text-neutral-500 hover:text-[#123B50] px-3 py-1.5 rounded-xl hover:bg-neutral-100 transition-colors cursor-pointer"
            >
              Hide Test
            </button>
          )}
        </div>
      </div>

      {/* Question Counter & Jump Pills */}
      <div className="flex items-center justify-between gap-3 bg-neutral-50 p-3.5 rounded-2xl border border-neutral-200/80">
        <div className="flex items-center gap-2">
          <span className="text-xs font-extrabold text-[#123B50]">
            Question {currentQuestionIndex + 1} of {activeQuestions.length}
          </span>
          <span className="px-2 py-0.5 rounded-md bg-[#123B50] text-white text-[10px] font-black tracking-wide">
            5 Marks
          </span>
        </div>

        {/* Quick Question Pills */}
        <div className="flex items-center gap-1.5">
          {activeQuestions.map((q, idx) => {
            const isCurrent = idx === currentQuestionIndex;
            const isAnswered = Boolean(selectedAnswers[q.id]);
            let pillClass = "bg-white border-neutral-200 text-neutral-600 hover:border-[#159A91]";

            if (isCurrent) {
              pillClass = "bg-[#159A91] text-white border-[#159A91] font-black shadow-xs ring-2 ring-[#159A91]/30";
            } else if (isAnswered) {
              pillClass = "bg-[#E9F5F3] text-[#123B50] border-[#159A91]/40 font-bold";
            }

            return (
              <button
                key={q.id}
                type="button"
                onClick={() => setCurrentQuestionIndex(idx)}
                className={`w-7 h-7 rounded-xl border text-xs flex items-center justify-center transition-all cursor-pointer ${pillClass}`}
                title={`Go to Question ${idx + 1}`}
              >
                {idx + 1}
              </button>
            );
          })}
        </div>
      </div>

      {/* SINGLE QUESTION CARD - Covering the Whole Page */}
      <div
        className={`p-6 sm:p-8 rounded-3xl border transition-all ${
          submitted
            ? userChoice === correctOption?.label
              ? "bg-emerald-50/40 border-emerald-300"
              : "bg-rose-50/40 border-rose-300"
            : "bg-white border-neutral-200/90 shadow-xs"
        }`}
      >
        <p className="text-sm sm:text-base font-bold text-[#263746] leading-relaxed mb-6">
          {currentQuestion.scenario}
        </p>

        {/* Options */}
        <div className="space-y-3">
          {currentQuestion.options.map((opt) => {
            const isSelected = userChoice === opt.label;
            let optionClass = "bg-white border-neutral-200 hover:border-[#159A91] hover:bg-[#E9F5F3]/30 text-[#263746]";

            if (submitted) {
              if (opt.isCorrect) {
                optionClass = "bg-emerald-100/80 border-emerald-500 text-emerald-950 font-bold ring-2 ring-emerald-400";
              } else if (isSelected && !opt.isCorrect) {
                optionClass = "bg-rose-100/80 border-rose-500 text-rose-950 font-bold ring-2 ring-rose-300";
              } else {
                optionClass = "bg-white/60 border-neutral-200 text-neutral-400 opacity-60";
              }
            } else if (isSelected) {
              optionClass = "bg-[#E9F5F3] border-[#159A91] text-[#123B50] font-bold ring-2 ring-[#159A91]";
            }

            return (
              <label
                key={opt.label}
                className={`flex items-start gap-3.5 p-4 rounded-2xl border text-xs sm:text-sm transition-all cursor-pointer ${optionClass}`}
              >
                <input
                  type="radio"
                  name={currentQuestion.id}
                  value={opt.label}
                  checked={isSelected}
                  disabled={submitted}
                  onChange={() => handleSelectOption(currentQuestion.id, opt.label)}
                  className="mt-0.5 text-[#159A91] focus:ring-[#159A91] cursor-pointer"
                />
                <span className="font-black text-[#123B50] shrink-0 text-sm">
                  {opt.label}.
                </span>
                <span className="flex-1 leading-relaxed">{opt.text}</span>
                {submitted && opt.isCorrect && (
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 ml-1 mt-0.5" />
                )}
                {submitted && isSelected && !opt.isCorrect && (
                  <XCircle className="w-5 h-5 text-rose-600 shrink-0 ml-1 mt-0.5" />
                )}
              </label>
            );
          })}
        </div>

        {/* Clinical Rationale (shown after submission) */}
        {submitted && (
          <div className="mt-6 p-4 sm:p-5 rounded-2xl bg-white border border-neutral-200 text-xs sm:text-sm text-neutral-700 space-y-2 shadow-2xs">
            <div className="flex items-center gap-2 font-black text-[#123B50]">
              <Stethoscope className="w-4 h-4 text-[#159A91]" />
              <span>Bedside Rationale &amp; Clinical Takeaway:</span>
            </div>
            <p className="leading-relaxed pl-6 text-neutral-600">
              {correctOption?.rationale || "Verified INC / NCLEX-style clinical standard."}
            </p>
          </div>
        )}
      </div>

      {/* Navigation Controls: Previous / Next / Submit */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2">
        <button
          type="button"
          disabled={currentQuestionIndex === 0}
          onClick={() => setCurrentQuestionIndex((prev) => Math.max(0, prev - 1))}
          className={`w-full sm:w-auto px-5 py-3 rounded-2xl text-xs font-bold transition-all flex items-center justify-center gap-2 border ${
            currentQuestionIndex === 0
              ? "opacity-30 cursor-not-allowed bg-neutral-100 text-neutral-400 border-neutral-200"
              : "bg-white hover:bg-[#E9F5F3] text-[#123B50] border-neutral-300 hover:border-[#159A91] cursor-pointer shadow-2xs active:scale-98"
          }`}
        >
          <ChevronLeft className="w-4 h-4" />
          <span>Previous Question</span>
        </button>

        <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
          {currentQuestionIndex < activeQuestions.length - 1 ? (
            <button
              type="button"
              onClick={() => setCurrentQuestionIndex((prev) => Math.min(activeQuestions.length - 1, prev + 1))}
              className="w-full sm:w-auto px-6 py-3 rounded-2xl bg-[#123B50] hover:bg-[#159A91] text-white text-xs font-bold transition-all flex items-center justify-center gap-2 shadow-sm cursor-pointer active:scale-98"
            >
              <span>Next Question</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          ) : !submitted ? (
            <button
              type="button"
              disabled={!allAnswered}
              onClick={handleSubmit}
              className={`w-full sm:w-auto px-7 py-3 rounded-2xl text-xs font-black transition-all flex items-center justify-center gap-2 shadow-sm ${
                allAnswered
                  ? "bg-[#159A91] hover:bg-[#123B50] text-white shadow-[#159A91]/25 cursor-pointer active:scale-98"
                  : "bg-neutral-200 text-neutral-400 cursor-not-allowed"
              }`}
            >
              <span>Submit Assessment (15 Marks)</span>
              <CheckCircle2 className="w-4 h-4" />
            </button>
          ) : null}

          {submitted && (
            <button
              type="button"
              onClick={handleRetake}
              className="w-full sm:w-auto px-5 py-3 rounded-2xl border border-neutral-300 bg-white hover:bg-[#E9F5F3] text-xs font-bold text-[#123B50] transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-2xs"
            >
              <RotateCcw className="w-3.5 h-3.5 text-[#159A91]" />
              <span>Retake Quiz</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default SubtopicQuiz15Marks;
