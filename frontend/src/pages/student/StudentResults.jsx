import React from 'react';
import { useLocation, Link, useNavigate } from 'react-router-dom';
import Navbar from '../../components/Navbar';
import {
  Award,
  CheckCircle2,
  XCircle,
  BookOpen,
  ArrowRight,
  RotateCcw,
  Sparkles,
  AlertTriangle,
  Lightbulb,
  Compass,
  ArrowUpRight
} from 'lucide-react';

export const StudentResults = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // Mock / Received state from QuizView
  const {
    score = 50,
    totalQuestions = 4,
    correctCount = 2,
    moduleName = 'Biochemistry & Clinical Metabolism Assessment',
    reviewData = [
      {
        id: 1,
        topic: 'Digestion & Absorption of Carbohydrates',
        text: 'Which transport mechanism is utilized by SGLT-1 to move glucose and galactose across the apical membrane of enterocytes?',
        options: [
          'Primary active transport using direct ATP hydrolysis',
          'Secondary active transport driven by the Na+/K+ electrochemical gradient',
          'Facilitated diffusion through a voltage-gated channel',
          'Simple passive diffusion through lipid bilayer'
        ],
        correctAnswer: 1,
        studentAnswer: 0,
        isCorrect: false,
        rationale: 'SGLT-1 uses the sodium gradient established by the basolateral Na+/K+ ATPase pump to co-transport glucose and galactose into the intestinal cell against their concentration gradient.',
        reviewTopic: 'Absorption of Carbohydrates',
        reviewLink: '/absorption-of-carb'
      },
      {
        id: 2,
        topic: 'Blood Glucose Regulation',
        text: 'A patient is diagnosed with fasting plasma glucose of 145 mg/dL on two occasions. Which hormone deficiency or cellular resistance is the primary driver of this hyperglycemia?',
        options: [
          'Excess glucagon secretion from pancreatic alpha cells',
          'Insulin deficiency or peripheral insulin resistance in skeletal muscle and adipose tissue',
          'Suppression of hepatic gluconeogenesis',
          'Increased renal glucose excretion threshold'
        ],
        correctAnswer: 1,
        studentAnswer: 1,
        isCorrect: true,
        rationale: 'Elevated fasting blood glucose occurs primarily due to insufficient insulin action or cellular resistance, which impairs peripheral glucose uptake and allows uninhibited hepatic glucose output.',
        reviewTopic: 'Regulation of Blood Glucose',
        reviewLink: '/RegulationOfBloodGlucose'
      },
      {
        id: 3,
        topic: 'Carbohydrate Metabolism & Glycolysis',
        text: 'Under aerobic conditions, what is the end product of glycolysis that enters the mitochondria for conversion into Acetyl-CoA?',
        options: ['Lactate', 'Pyruvate', 'Oxaloacetate', 'Citrate'],
        correctAnswer: 1,
        studentAnswer: 0,
        isCorrect: false,
        rationale: 'In aerobic glycolysis, glucose is oxidized to two molecules of pyruvate, which are then transported into mitochondria and converted to Acetyl-CoA by pyruvate dehydrogenase.',
        reviewTopic: 'Metabolic Pathways of Carbohydrates',
        reviewLink: '/MetabolicPathwaysOfCarb'
      },
      {
        id: 4,
        topic: 'Essential Fatty Acids',
        text: 'Why are Linoleic acid (omega-6) and Alpha-linolenic acid (omega-3) termed essential fatty acids in human physiology?',
        options: [
          'They cannot be oxidized for ATP generation',
          'Humans lack the delta-12 and delta-15 desaturase enzymes required to introduce double bonds beyond carbon 9',
          'They are exclusively synthesized by gut microflora',
          'They are only required during fetal development'
        ],
        correctAnswer: 1,
        studentAnswer: 1,
        isCorrect: true,
        rationale: 'Human desaturases cannot insert double bonds beyond carbon 9 from the carboxyl end; hence omega-6 and omega-3 fatty acids must be obtained through dietary sources.',
        reviewTopic: 'Essential Fatty Acids',
        reviewLink: '/EssentialFattyAcids'
      }
    ]
  } = location.state || {};

  const isPassing = score >= 70;
  const incorrectQuestions = reviewData.filter((q) => !q.isCorrect);

  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-50 via-white to-emerald-50 text-slate-900">
      <Navbar />

      <div className="max-w-4xl mx-auto px-4 py-8 sm:py-12">
        {/* Score Summary Card */}
        <div className="bg-white/95 border border-slate-200/80 rounded-3xl p-6 sm:p-8 shadow-xl backdrop-blur-xl mb-8 text-center relative overflow-hidden">
          {/* Background highlight */}
          <div
            className={`absolute -top-24 -right-24 w-60 h-60 rounded-full blur-3xl ${
              isPassing ? 'bg-emerald-200/60' : 'bg-amber-200/60'
            }`}
          />

          <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
            {moduleName}
          </span>

          <div className="mt-4 flex flex-col items-center">
            <div
              className={`w-24 h-24 rounded-full flex items-center justify-center text-3xl font-extrabold shadow-lg mb-3 ${
                isPassing
                  ? 'bg-emerald-500 text-white shadow-emerald-400/30'
                  : 'bg-amber-500 text-white shadow-amber-400/30'
              }`}
            >
              {score}%
            </div>

            <span
              className={`inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-extrabold uppercase tracking-wide mb-3 ${
                isPassing
                  ? 'bg-emerald-100 text-emerald-800'
                  : 'bg-amber-100 text-amber-800'
              }`}
            >
              {isPassing ? (
                <>
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>Mastery Achieved (Passed)</span>
                </>
              ) : (
                <>
                  <AlertTriangle className="w-4 h-4 text-amber-600" />
                  <span>Low Score — Remediation Guide Generated</span>
                </>
              )}
            </span>

            <p className="text-xs text-slate-500 font-medium">
              You scored <span className="font-bold text-slate-800">{correctCount}</span> out of{' '}
              <span className="font-bold text-slate-800">{totalQuestions}</span> questions correctly.
            </p>

            <div className="mt-6 flex flex-wrap gap-3 justify-center">
              <Link
                to="/student/quiz/retake"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-bold bg-slate-900 hover:bg-slate-800 text-white shadow-md transition-all cursor-pointer"
              >
                <RotateCcw className="w-4 h-4" />
                <span>Retake Assessment</span>
              </Link>
              <Link
                to="/bio-chem-syllabus"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-bold bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 shadow-sm transition-all cursor-pointer"
              >
                <BookOpen className="w-4 h-4 text-emerald-600" />
                <span>Return to Syllabus</span>
              </Link>
            </div>
          </div>
        </div>

        {/* Dynamic Low-Score Remediation & Study Guide */}
        {!isPassing && (
          <div className="bg-gradient-to-r from-amber-500/10 via-orange-500/10 to-emerald-500/10 border-2 border-amber-400/40 rounded-3xl p-6 sm:p-8 shadow-xl mb-8 backdrop-blur-xl animate-in fade-in duration-300">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-2xl bg-amber-500 text-white flex items-center justify-center shadow-md shadow-amber-400/30">
                <Compass className="w-6 h-6" />
              </div>
              <div>
                <h2 className="text-lg font-extrabold text-slate-900 tracking-tight">
                  Personalized Remediation & Clinical Study Guide
                </h2>
                <p className="text-xs text-slate-600">
                  Follow this targeted action plan to strengthen your weak areas before re-attempting the test.
                </p>
              </div>
            </div>

            <div className="space-y-4 mt-5">
              <div className="bg-white/90 border border-amber-200 rounded-2xl p-5 shadow-sm">
                <h3 className="text-xs font-extrabold text-amber-900 uppercase tracking-wider mb-2 flex items-center gap-2">
                  <Lightbulb className="w-4 h-4 text-amber-600" />
                  <span>1. Key Concepts That Need Review ({incorrectQuestions.length})</span>
                </h3>
                <div className="space-y-2 mt-3">
                  {incorrectQuestions.map((q, idx) => (
                    <div
                      key={idx}
                      className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 p-3 bg-amber-50/50 rounded-xl border border-amber-100"
                    >
                      <div>
                        <p className="text-xs font-bold text-slate-900">{q.topic}</p>
                        <p className="text-[11px] text-slate-600 mt-0.5">{q.rationale}</p>
                      </div>
                      {q.reviewLink && (
                        <Link
                          to={q.reviewLink}
                          className="inline-flex items-center gap-1 text-xs font-bold text-emerald-600 hover:text-emerald-700 shrink-0 bg-white px-3 py-1.5 rounded-lg border border-emerald-200 shadow-xs"
                        >
                          <span>Review Module</span>
                          <ArrowUpRight className="w-3.5 h-3.5" />
                        </Link>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white/90 border border-slate-200 rounded-2xl p-5 shadow-sm">
                <h3 className="text-xs font-extrabold text-slate-900 uppercase tracking-wider mb-2 flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-emerald-600" />
                  <span>2. Recommended Action Steps for Exam Success</span>
                </h3>
                <ul className="text-xs text-slate-700 space-y-2 list-disc list-inside font-medium leading-relaxed">
                  <li>
                    <strong>Focus on Transporter Mechanics:</strong> Review how secondary active transport functions in SGLT-1 versus facilitated diffusion in GLUT-2/GLUT-4.
                  </li>
                  <li>
                    <strong>Aerobic vs Anaerobic Fates:</strong> Make a flashcard distinguishing Pyruvate (aerobic) vs Lactate (anaerobic).
                  </li>
                  <li>
                    <strong>Ask AI Tutor:</strong> Click the floating AI icon in the bottom right corner anytime to ask for simplified clinical analogies!
                  </li>
                </ul>
              </div>
            </div>
          </div>
        )}

        {/* Detailed Question Review */}
        <div>
          <h2 className="text-base font-extrabold text-slate-900 mb-4 flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-emerald-600" />
            <span>Question-by-Question Clinical Breakdown</span>
          </h2>

          <div className="space-y-5">
            {reviewData.map((q, idx) => (
              <div
                key={idx}
                className={`bg-white/95 border rounded-2xl p-6 shadow-sm transition-all ${
                  q.isCorrect ? 'border-emerald-200' : 'border-rose-200 bg-rose-50/20'
                }`}
              >
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span className="text-xs font-bold text-slate-400">Question {idx + 1}</span>
                  <span
                    className={`inline-flex items-center gap-1 px-3 py-0.5 rounded-full text-[10px] font-extrabold ${
                      q.isCorrect
                        ? 'bg-emerald-100 text-emerald-800'
                        : 'bg-rose-100 text-rose-800'
                    }`}
                  >
                    {q.isCorrect ? <CheckCircle2 className="w-3.5 h-3.5" /> : <XCircle className="w-3.5 h-3.5" />}
                    {q.isCorrect ? 'Correct (+1)' : 'Incorrect (0)'}
                  </span>
                </div>

                <p className="text-sm font-bold text-slate-900 mb-4">{q.text}</p>

                {/* Choices Comparison */}
                <div className="space-y-2 mb-4">
                  {q.options.map((opt, optIdx) => {
                    const isStudentChoice = q.studentAnswer === optIdx;
                    const isCorrectAnswer = q.correctAnswer === optIdx;

                    let badgeStyle = 'bg-slate-50 border-slate-200 text-slate-600';
                    if (isCorrectAnswer) {
                      badgeStyle = 'bg-emerald-50 border-emerald-300 text-emerald-900 font-bold';
                    } else if (isStudentChoice && !q.isCorrect) {
                      badgeStyle = 'bg-rose-50 border-rose-300 text-rose-900 font-bold';
                    }

                    return (
                      <div
                        key={optIdx}
                        className={`p-3 rounded-xl border text-xs flex items-center justify-between ${badgeStyle}`}
                      >
                        <div className="flex items-center gap-2.5">
                          <span className="w-5 h-5 rounded-full bg-white text-slate-700 font-bold flex items-center justify-center text-[10px] border border-slate-200">
                            {String.fromCharCode(65 + optIdx)}
                          </span>
                          <span>{opt}</span>
                        </div>
                        <div>
                          {isCorrectAnswer && (
                            <span className="text-[10px] font-extrabold text-emerald-700 uppercase">
                              ✓ Correct Answer
                            </span>
                          )}
                          {isStudentChoice && !isCorrectAnswer && (
                            <span className="text-[10px] font-extrabold text-rose-700 uppercase">
                              ✗ Your Answer
                            </span>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Rationale */}
                <div className="bg-sky-50/80 border border-sky-200/80 rounded-xl p-3.5 text-xs text-sky-950 font-medium">
                  <span className="font-bold text-sky-900">Clinical Reasoning: </span>
                  <span>{q.rationale}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentResults;
