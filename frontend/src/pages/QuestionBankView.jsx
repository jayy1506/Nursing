import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import { useAuth } from "../context/AuthContext";
import { getStudentGatingStatus } from "../services/assessmentEngine";
import {
  QUESTION_BANK_UNITS,
  DESCRIPTIVE_QUESTIONS,
  VERY_SHORT_QUESTIONS,
  OFFICIAL_MCQS
} from "../constants/officialQuestionBank";
import {
  Search,
  BookOpen,
  HelpCircle,
  CheckCircle2,
  ChevronDown,
  ArrowRight,
  ArrowLeft,
  Home as HomeIcon,
  Sparkles,
  ClipboardList,
  Eye,
  EyeOff,
  Filter,
  FileText,
  Award,
  Lock,
  Unlock,
  AlertCircle
} from "lucide-react";

const QuestionBankView = () => {
  const navigate = useNavigate();
  const { currentUser, role } = useAuth();

  // Module completion status
  const [anatStatus] = useState(() => getStudentGatingStatus("anatomy"));
  const [physStatus] = useState(() => getStudentGatingStatus("physiology"));
  const [biochemStatus] = useState(() => getStudentGatingStatus("biochemistry"));
  const [nutStatus] = useState(() => getStudentGatingStatus("nutrition"));
  const [previewOverride, setPreviewOverride] = useState(false);

  const totalCompleted = 
    (anatStatus?.completedCount || 0) + 
    (physStatus?.completedCount || 0) + 
    (biochemStatus?.completedCount || 0) + 
    (nutStatus?.completedCount || 0);
  const isModulesCompleted = totalCompleted > 0 || role === "faculty" || role === "admin" || previewOverride;

  const [selectedUnit, setSelectedUnit] = useState("all");
  const [selectedType, setSelectedType] = useState("all"); // 'all' | 'short' | 'veryshort' | 'mcq'
  const [searchQuery, setSearchQuery] = useState("");
  const [revealedAnswers, setRevealedAnswers] = useState({});

  const toggleAnswer = (id) => {
    setRevealedAnswers((prev) => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const revealAll = () => {
    const all = {};
    (DESCRIPTIVE_QUESTIONS || []).forEach((q) => { if (q?.id) all[q.id] = true; });
    (VERY_SHORT_QUESTIONS || []).forEach((q) => { if (q?.id) all[q.id] = true; });
    (OFFICIAL_MCQS || []).forEach((q) => { if (q?.id) all[q.id] = true; });
    setRevealedAnswers(all);
  };

  const hideAll = () => {
    setRevealedAnswers({});
  };

  const isUnitMatch = (itemUnit) => {
    if (!itemUnit) return false;
    if (selectedUnit === "all") return true;
    if (selectedUnit === "curriculum-anatomy") {
      return itemUnit.startsWith("anatomy-");
    }
    if (selectedUnit === "curriculum-physiology") {
      return itemUnit.startsWith("phys-");
    }
    if (selectedUnit === "curriculum-biochem") {
      return !itemUnit.startsWith("unit-nut-") && !itemUnit.startsWith("anatomy-") && !itemUnit.startsWith("phys-");
    }
    if (selectedUnit === "curriculum-nutrition") {
      return itemUnit.startsWith("unit-nut-");
    }
    return itemUnit === selectedUnit;
  };

  // Safe filtered lists with optional chaining to prevent any runtime exceptions
  const filteredShort = (DESCRIPTIVE_QUESTIONS || []).filter((q) => {
    if (!q) return false;
    const matchesUnit = isUnitMatch(q.unit);
    const qText = q.question || "";
    const qTopic = q.topic || "";
    const query = (searchQuery || "").toLowerCase();
    const matchesSearch =
      qText.toLowerCase().includes(query) ||
      qTopic.toLowerCase().includes(query) ||
      (q.answerKeyPoints && q.answerKeyPoints.some((pt) => pt && pt.toLowerCase().includes(query)));
    return matchesUnit && matchesSearch;
  });

  const filteredVeryShort = (VERY_SHORT_QUESTIONS || []).filter((q) => {
    if (!q) return false;
    const matchesUnit = isUnitMatch(q.unit);
    const qText = q.question || "";
    const qAns = q.answer || "";
    const query = (searchQuery || "").toLowerCase();
    const matchesSearch =
      qText.toLowerCase().includes(query) ||
      qAns.toLowerCase().includes(query);
    return matchesUnit && matchesSearch;
  });

  const filteredMCQ = (OFFICIAL_MCQS || []).filter((q) => {
    if (!q) return false;
    const matchesUnit = isUnitMatch(q.unit);
    const qText = q.question || "";
    const qCorrect = q.correctOption || "";
    const query = (searchQuery || "").toLowerCase();
    const matchesSearch =
      qText.toLowerCase().includes(query) ||
      (q.options && q.options.some((opt) => opt && opt.toLowerCase().includes(query))) ||
      qCorrect.toLowerCase().includes(query);
    return matchesUnit && matchesSearch;
  });

  const totalQuestionsCount =
    (selectedType === "all" || selectedType === "short" ? filteredShort.length : 0) +
    (selectedType === "all" || selectedType === "veryshort" ? filteredVeryShort.length : 0) +
    (selectedType === "all" || selectedType === "mcq" ? filteredMCQ.length : 0);

  // GATING BARRIER: If student has not completed required modules, show clear guidance message
  if (!isModulesCompleted) {
    return (
      <div className="min-h-screen bg-neutral-50 text-neutral-900 flex flex-col">
        <Navbar />

        {/* Top Navigation Bar with Back & Home */}
        <div className="bg-white border-b border-neutral-200 py-3 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            <div className="flex items-center gap-2">
              <button
                onClick={() => navigate(-1)}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-neutral-100 hover:bg-neutral-200 border border-neutral-200 text-xs font-bold text-neutral-700 transition-all cursor-pointer"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Back</span>
              </button>
              <button
                onClick={() => navigate('/')}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-neutral-100 hover:bg-neutral-200 border border-neutral-200 text-xs font-bold text-neutral-700 transition-all cursor-pointer"
              >
                <HomeIcon className="w-3.5 h-3.5 text-green-500" />
                <span>Home</span>
              </button>
              <Link
                to="/syllabus"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-neutral-100 hover:bg-neutral-200 border border-neutral-200 text-xs font-bold text-neutral-700 transition-all cursor-pointer ml-1"
              >
                <BookOpen className="w-3.5 h-3.5 text-green-500" />
                <span>Syllabus Hub</span>
              </Link>
            </div>

            <div className="text-[11px] font-semibold text-neutral-500">
              Curriculum Competency Gating
            </div>
          </div>
        </div>

        {/* Informative Locked Message Card */}
        <div className="flex-1 flex items-center justify-center p-4 sm:p-6 my-auto">
          <div className="max-w-xl w-full bg-white border border-neutral-200/80 rounded-3xl p-6 sm:p-8 text-center shadow-lg relative overflow-hidden">
            <div className="pointer-events-none absolute -top-24 -left-20 h-56 w-56 rounded-full bg-neutral-800/10 blur-3xl" />
            <div className="pointer-events-none absolute -bottom-24 -right-20 h-56 w-56 rounded-full bg-green-500/10 blur-3xl" />

            <div className="relative z-10">
              <div className="w-16 h-16 rounded-2xl bg-neutral-100 border border-neutral-300 text-neutral-800 mx-auto flex items-center justify-center mb-5 shadow-xs">
                <Lock className="w-8 h-8" />
              </div>

              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-neutral-100 text-neutral-800 text-xs font-extrabold border border-neutral-300 mb-3">
                <AlertCircle className="w-3.5 h-3.5 text-neutral-800" />
                <span>Module Completion Required</span>
              </div>

              <h2 className="text-2xl sm:text-3xl font-extrabold text-neutral-900 tracking-tight">
                Complete Curriculum Modules First
              </h2>

              <p className="mt-3 text-neutral-600 text-xs sm:text-sm leading-relaxed max-w-md mx-auto">
                Access to the Official University Question Bank (1,500+ MCQs & 5-mark subjective answers) is gated. You must complete and pass your chapter assessment quizzes (≥ 75%) before accessing this repository.
              </p>

              {/* Progress Tracker */}
              <div className="mt-6 p-4 rounded-2xl bg-neutral-50 border border-neutral-200 text-left space-y-3">
                <div>
                  <div className="flex justify-between text-xs font-bold mb-1">
                    <span className="text-neutral-700">🦴 Applied Anatomy Progress</span>
                    <span className="text-green-700">{anatStatus?.completedCount || 0} / 12 Units Passed</span>
                  </div>
                  <div className="w-full h-2 bg-neutral-200 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-green-500 rounded-full"
                      style={{ width: `${Math.max(5, anatStatus?.completionPercent || 0)}%` }}
                    />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-xs font-bold mb-1">
                    <span className="text-neutral-700">⚡ Applied Physiology Progress</span>
                    <span className="text-green-700">{physStatus?.completedCount || 0} / 12 Units Passed</span>
                  </div>
                  <div className="w-full h-2 bg-neutral-200 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-green-500 rounded-full"
                      style={{ width: `${Math.max(5, physStatus?.completionPercent || 0)}%` }}
                    />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-xs font-bold mb-1">
                    <span className="text-neutral-700">🧬 Applied Biochemistry Progress</span>
                    <span className="text-green-700">{biochemStatus?.completedCount || 0} / 7 Units Passed</span>
                  </div>
                  <div className="w-full h-2 bg-neutral-200 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-green-500 rounded-full"
                      style={{ width: `${Math.max(5, biochemStatus?.completionPercent || 0)}%` }}
                    />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-xs font-bold mb-1">
                    <span className="text-neutral-700">🥗 Applied Nutrition & Dietetics Progress</span>
                    <span className="text-green-700">{nutStatus?.completedCount || 0} / 10 Units Passed</span>
                  </div>
                  <div className="w-full h-2 bg-neutral-200 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-green-500 rounded-full"
                      style={{ width: `${Math.max(5, nutStatus?.completionPercent || 0)}%` }}
                    />
                  </div>
                </div>
              </div>

              {/* Action Buttons: Home, Back, Syllabus, Quiz */}
              <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
                <button
                  onClick={() => navigate('/')}
                  className="px-4 py-2.5 rounded-xl bg-neutral-100 hover:bg-neutral-200 border border-neutral-200 text-neutral-700 font-extrabold text-xs transition-all flex items-center gap-2 cursor-pointer"
                >
                  <HomeIcon className="w-3.5 h-3.5 text-green-500" />
                  <span>Home</span>
                </button>

                <button
                  onClick={() => navigate(-1)}
                  className="px-4 py-2.5 rounded-xl bg-neutral-100 hover:bg-neutral-200 border border-neutral-200 text-neutral-700 font-extrabold text-xs transition-all flex items-center gap-2 cursor-pointer"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>Back</span>
                </button>

                <button
                  onClick={() => navigate('/syllabus')}
                  className="px-5 py-2.5 rounded-xl bg-green-500 hover:bg-green-700 text-white font-extrabold text-xs shadow-xs transition-all flex items-center gap-2 cursor-pointer"
                >
                  <BookOpen className="w-3.5 h-3.5" />
                  <span>Go to Syllabus Modules</span>
                </button>

                <button
                  onClick={() => navigate('/quiz/phys-unit-1')}
                  className="px-4 py-2.5 rounded-xl bg-green-50 hover:bg-green-100 border border-green-100 text-green-700 font-extrabold text-xs transition-all flex items-center gap-2 cursor-pointer"
                >
                  <span>Take Unit 1 Quiz</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Instant Evaluation / Preview Bypass */}
              <div className="mt-6 pt-4 border-t border-neutral-200 text-center">
                <button
                  onClick={() => setPreviewOverride(true)}
                  className="text-[11px] text-neutral-500 hover:text-green-700 underline transition-colors cursor-pointer"
                >
                  Examiner / Demo Evaluation: Unlock Question Bank Preview
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // UNLOCKED VIEW: Display Question Bank Repository
  return (
    <div className="min-h-screen bg-neutral-50 text-neutral-900 pb-20">
      <Navbar />

      {/* Top Breadcrumb & Action Bar with Back & Home */}
      <div className="bg-white border-b border-neutral-200/80 py-2.5 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <button
              onClick={() => navigate(-1)}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-neutral-100 hover:bg-neutral-200 border border-neutral-200 text-xs font-bold text-neutral-700 transition-all cursor-pointer"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back</span>
            </button>
            <button
              onClick={() => navigate('/')}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-neutral-100 hover:bg-neutral-200 border border-neutral-200 text-xs font-bold text-neutral-700 transition-all cursor-pointer"
            >
              <HomeIcon className="w-3.5 h-3.5 text-green-500" />
              <span>Home</span>
            </button>
            <Link
              to="/syllabus"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-neutral-100 hover:bg-neutral-200 border border-neutral-200 text-xs font-bold text-neutral-700 transition-all cursor-pointer ml-1"
            >
              <BookOpen className="w-3.5 h-3.5 text-green-500" />
              <span>Syllabus Hub</span>
            </Link>
          </div>

          <div className="flex items-center gap-2 text-[11px] font-semibold text-neutral-500">
            <span>Nursing & Clinical Hub</span>
            <span>/</span>
            <span className="text-green-700 font-bold">Official Question Bank</span>
          </div>
        </div>
      </div>

      {/* Header Banner - Clean White & Emerald Green */}
      <section className="bg-white border-b border-neutral-200/80 text-neutral-900 py-10 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-green-50 text-green-700 text-xs font-extrabold border border-green-100 mb-2">
              <Sparkles className="w-3.5 h-3.5 text-green-500" />
              <span>Official University & NCLEX Question Repository</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-neutral-900 tracking-tight">
              Nursing Comprehensive Question Bank
            </h1>
            <p className="text-neutral-600 text-xs sm:text-sm mt-1 max-w-2xl leading-relaxed">
              Curated repository of Short Answer Questions (5 Marks), Very Short / Viva Voce Questions (2 Marks), and Multiple Choice Practice Questions with model key points.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={revealAll}
              className="px-3.5 py-2 rounded-2xl bg-neutral-100 hover:bg-neutral-200 border border-neutral-200 text-xs font-bold text-neutral-700 transition-all cursor-pointer flex items-center gap-1.5"
            >
              <Eye className="w-3.5 h-3.5 text-green-500" />
              <span>Reveal All Answers</span>
            </button>
            <button
              onClick={hideAll}
              className="px-3.5 py-2 rounded-2xl bg-neutral-100 hover:bg-neutral-200 border border-neutral-200 text-xs font-bold text-neutral-700 transition-all cursor-pointer flex items-center gap-1.5"
            >
              <EyeOff className="w-3.5 h-3.5 text-black dark:text-white" />
              <span>Hide All Answers</span>
            </button>
          </div>
        </div>
      </section>

      {/* Main Filter & Search Controls */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-6">
        <div className="bg-white/95 border border-neutral-200 rounded-3xl p-5 shadow-sm space-y-4">
          <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
            {/* Search */}
            <div className="relative w-full lg:w-96">
              <Search className="w-4 h-4 text-neutral-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search questions, keywords, clinical terms..."
                className="w-full bg-neutral-50 border border-neutral-200 rounded-2xl py-2.5 pl-10 pr-4 text-xs text-neutral-900 focus:outline-none focus:border-green-500 font-medium"
              />
            </div>

            {/* Type Filter Buttons */}
            <div className="flex items-center gap-1.5 overflow-x-auto w-full lg:w-auto pb-1 scrollbar-none">
              <button
                onClick={() => setSelectedType("all")}
                className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
                  selectedType === "all"
                    ? "bg-neutral-900 text-white shadow-sm"
                    : "bg-neutral-100 text-neutral-600 hover:bg-neutral-200"
                }`}
              >
                All Types
              </button>
              <button
                onClick={() => setSelectedType("short")}
                className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                  selectedType === "short"
                    ? "bg-green-500 text-white shadow-sm"
                    : "bg-neutral-100 text-neutral-600 hover:bg-neutral-200"
                }`}
              >
                <FileText className="w-3 h-3" />
                <span>Short Questions (5M)</span>
              </button>
              <button
                onClick={() => setSelectedType("veryshort")}
                className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                  selectedType === "veryshort"
                    ? "bg-green-500 text-white shadow-sm"
                    : "bg-neutral-100 text-neutral-600 hover:bg-neutral-200"
                }`}
              >
                <HelpCircle className="w-3 h-3" />
                <span>Very Short / Viva (2M)</span>
              </button>
              <button
                onClick={() => setSelectedType("mcq")}
                className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                  selectedType === "mcq"
                    ? "bg-neutral-800 text-neutral-950 shadow-sm"
                    : "bg-neutral-100 text-neutral-600 hover:bg-neutral-200"
                }`}
              >
                <CheckCircle2 className="w-3 h-3" />
                <span>Practice MCQs</span>
              </button>
            </div>
          </div>

          {/* Unit Selector Pills */}
          <div className="pt-2 border-t border-neutral-100 flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none text-xs">
            <span className="font-bold text-neutral-400 text-[11px] uppercase tracking-wider shrink-0 flex items-center gap-1">
              <Filter className="w-3 h-3" />
              Track:
            </span>
            <button
              onClick={() => setSelectedUnit("all")}
              className={`px-3 py-1 rounded-full text-xs font-bold transition-all shrink-0 cursor-pointer ${
                selectedUnit === "all"
                  ? "bg-green-500 text-white"
                  : "bg-neutral-100 text-neutral-600 hover:bg-neutral-200"
              }`}
            >
              All Subjects
            </button>
            <button
              onClick={() => setSelectedUnit("curriculum-anatomy")}
              className={`px-3 py-1 rounded-full text-xs font-bold transition-all shrink-0 cursor-pointer ${
                selectedUnit === "curriculum-anatomy"
                  ? "bg-green-500 text-white"
                  : "bg-green-50 text-green-700 hover:bg-green-100"
              }`}
            >
              🦴 Applied Anatomy (12 Units)
            </button>
            <button
              onClick={() => setSelectedUnit("curriculum-physiology")}
              className={`px-3 py-1 rounded-full text-xs font-bold transition-all shrink-0 cursor-pointer ${
                selectedUnit === "curriculum-physiology"
                  ? "bg-green-500 text-white"
                  : "bg-neutral-100 text-green-700 hover:bg-neutral-100"
              }`}
            >
              ⚡ Applied Physiology (12 Units)
            </button>
            <button
              onClick={() => setSelectedUnit("curriculum-biochem")}
              className={`px-3 py-1 rounded-full text-xs font-bold transition-all shrink-0 cursor-pointer ${
                selectedUnit === "curriculum-biochem"
                  ? "bg-green-500 text-white"
                  : "bg-green-50 text-green-700 hover:bg-green-100"
              }`}
            >
              🧬 Biochemistry (7 Units)
            </button>
            <button
              onClick={() => setSelectedUnit("curriculum-nutrition")}
              className={`px-3 py-1 rounded-full text-xs font-bold transition-all shrink-0 cursor-pointer ${
                selectedUnit === "curriculum-nutrition"
                  ? "bg-neutral-800 text-white"
                  : "bg-neutral-100 text-neutral-800 hover:bg-neutral-100"
              }`}
            >
              🥗 Nutrition (10 Units)
            </button>
          </div>
        </div>

        {/* Results Counter Bar */}
        <div className="flex items-center justify-between mt-6 mb-4 px-1">
          <p className="text-xs font-bold text-neutral-500">
            Displaying <span className="text-neutral-900 font-extrabold">{totalQuestionsCount}</span> verified curriculum questions
          </p>
        </div>

        {/* Question Sections Container */}
        <div className="space-y-8">
          {/* 1. Short Questions (5 Marks) Section */}
          {(selectedType === "all" || selectedType === "short") && filteredShort.length > 0 && (
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-xl bg-green-100 text-green-700 flex items-center justify-center font-bold text-xs">
                  5M
                </div>
                <h3 className="text-base font-extrabold text-neutral-900">
                  Short Answer Questions (5 Marks) — {filteredShort.length} Questions
                </h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {filteredShort.map((q) => {
                  const isRevealed = !!revealedAnswers[q.id];
                  return (
                    <div
                      key={q.id}
                      className="bg-white border border-neutral-200 rounded-3xl p-5 shadow-2xs hover:border-green-400 transition-all flex flex-col justify-between"
                    >
                      <div>
                        <div className="flex items-center justify-between gap-2 mb-2">
                          <span className="px-2.5 py-0.5 rounded-full bg-neutral-100 text-neutral-700 text-[10px] font-extrabold">
                            Q{q.srNo} • {q.topic}
                          </span>
                          <span className="text-[10px] font-extrabold uppercase tracking-wider text-green-500 bg-green-50 px-2 py-0.5 rounded-full">
                            5 Marks
                          </span>
                        </div>
                        <h4 className="text-sm font-bold text-neutral-900 leading-snug">
                          {q.question}
                        </h4>
                      </div>

                      <div className="mt-4 pt-3 border-t border-neutral-100">
                        <button
                          onClick={() => toggleAnswer(q.id)}
                          className="inline-flex items-center gap-1.5 text-xs font-bold text-green-700 hover:text-green-700 cursor-pointer"
                        >
                          {isRevealed ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                          <span>{isRevealed ? "Hide Model Answer" : "View Model Key Points"}</span>
                        </button>

                        {isRevealed && (
                          <div className="mt-3 p-3.5 bg-neutral-50 border border-neutral-100 rounded-2xl text-xs space-y-1.5 animate-in fade-in duration-150">
                            <p className="font-extrabold text-neutral-700 text-[11px] uppercase tracking-wider mb-1">
                              Model Key Points & Examination Breakdown:
                            </p>
                            {q.answerKeyPoints?.map((pt, i) => (
                              <div key={i} className="flex items-start gap-2 text-neutral-600 text-xs">
                                <span className="text-green-500 font-bold shrink-0">•</span>
                                <span>{pt}</span>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* 2. Very Short Questions (2 Marks) Section */}
          {(selectedType === "all" || selectedType === "veryshort") && filteredVeryShort.length > 0 && (
            <div className="space-y-4 pt-4">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-xl bg-neutral-100 text-green-700 flex items-center justify-center font-bold text-xs">
                  2M
                </div>
                <h3 className="text-base font-extrabold text-neutral-900">
                  Very Short / Viva Voce Questions (2 Marks) — {filteredVeryShort.length} Questions
                </h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {filteredVeryShort.map((q) => {
                  const isRevealed = !!revealedAnswers[q.id];
                  return (
                    <div
                      key={q.id}
                      className="bg-white border border-neutral-200 rounded-3xl p-5 shadow-2xs hover:border-neutral-300 transition-all flex flex-col justify-between"
                    >
                      <div>
                        <div className="flex items-center justify-between gap-2 mb-2">
                          <span className="px-2.5 py-0.5 rounded-full bg-neutral-100 text-neutral-700 text-[10px] font-extrabold">
                            Q{q.srNo}
                          </span>
                          <span className="text-[10px] font-extrabold uppercase tracking-wider text-green-700 bg-neutral-100 px-2 py-0.5 rounded-full">
                            2 Marks
                          </span>
                        </div>
                        <h4 className="text-sm font-bold text-neutral-900 leading-snug">
                          {q.question}
                        </h4>
                      </div>

                      <div className="mt-4 pt-3 border-t border-neutral-100">
                        <button
                          onClick={() => toggleAnswer(q.id)}
                          className="inline-flex items-center gap-1.5 text-xs font-bold text-green-700 hover:text-green-700 cursor-pointer"
                        >
                          {isRevealed ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                          <span>{isRevealed ? "Hide Answer" : "Reveal Answer"}</span>
                        </button>

                        {isRevealed && (
                          <div className="mt-3 p-3.5 bg-neutral-100/50 border border-neutral-300 rounded-2xl text-xs animate-in fade-in duration-150">
                            <span className="font-extrabold text-neutral-800">Model Answer: </span>
                            <span className="text-neutral-700">{q.answer}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* 3. Multiple Choice Practice Section */}
          {(selectedType === "all" || selectedType === "mcq") && filteredMCQ.length > 0 && (
            <div className="space-y-4 pt-4">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-xl bg-neutral-100 text-neutral-800 flex items-center justify-center font-bold text-xs">
                  MCQ
                </div>
                <h3 className="text-base font-extrabold text-neutral-900">
                  Multiple Choice Practice Questions — {filteredMCQ.length} Questions
                </h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
                {filteredMCQ.map((q) => {
                  const isRevealed = !!revealedAnswers[q.id];
                  return (
                    <div
                      key={q.id}
                      className="bg-white border border-neutral-200 rounded-2xl p-4 shadow-2xs hover:border-neutral-300 transition-all flex flex-col justify-between"
                    >
                      <div>
                        <div className="flex items-center justify-between gap-2 mb-2">
                          <span className="w-6 h-6 rounded-full bg-neutral-100 text-neutral-800 border border-neutral-300 flex items-center justify-center text-[10px] font-extrabold shrink-0">
                            Q{q.srNo}
                          </span>
                          <span className="text-[10px] font-bold text-neutral-400">{q.topic}</span>
                        </div>
                        <h4 className="text-xs font-bold text-neutral-900 leading-snug mb-3">
                          {q.question}
                        </h4>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 text-xs">
                          {q.options?.map((opt, i) => {
                            const isCorrect = q.correctOption && opt && opt.trim().toLowerCase() === q.correctOption.trim().toLowerCase();
                            return (
                              <div
                                key={i}
                                className={`p-2 rounded-xl border text-[11px] font-medium transition-all ${
                                  isRevealed && isCorrect
                                    ? "bg-green-50 border-green-400 text-green-700 font-bold"
                                    : "bg-neutral-50 border-neutral-200 text-neutral-700"
                                }`}
                              >
                                <span className="font-bold mr-1.5">{String.fromCharCode(65 + i)}.</span>
                                <span>{opt}</span>
                              </div>
                            );
                          })}
                        </div>
                      </div>

                      <div className="mt-3 pt-2.5 border-t border-neutral-100 flex items-center justify-between">
                        <button
                          onClick={() => toggleAnswer(q.id)}
                          className="text-[11px] font-bold text-neutral-800 hover:text-neutral-800 cursor-pointer"
                        >
                          {isRevealed ? "Hide Correct Answer" : "Reveal Answer"}
                        </button>

                        {isRevealed && (
                          <span className="text-[11px] font-extrabold text-green-700">
                            Correct: {q.correctOption}
                          </span>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default QuestionBankView;
