import React, { useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
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
  Sparkles,
  ClipboardList,
  Eye,
  EyeOff,
  Filter,
  FileText,
  Award
} from "lucide-react";

const QuestionBankView = () => {
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
    DESCRIPTIVE_QUESTIONS.forEach((q) => (all[q.id] = true));
    VERY_SHORT_QUESTIONS.forEach((q) => (all[q.id] = true));
    OFFICIAL_MCQS.forEach((q) => (all[q.id] = true));
    setRevealedAnswers(all);
  };

  const hideAll = () => {
    setRevealedAnswers({});
  };

  const isUnitMatch = (itemUnit) => {
    if (selectedUnit === "all") return true;
    if (selectedUnit === "curriculum-biochem") {
      return !itemUnit.startsWith("unit-nut-");
    }
    if (selectedUnit === "curriculum-nutrition") {
      return itemUnit.startsWith("unit-nut-");
    }
    return itemUnit === selectedUnit;
  };

  // Filtered lists
  const filteredShort = DESCRIPTIVE_QUESTIONS.filter((q) => {
    const matchesUnit = isUnitMatch(q.unit);
    const matchesSearch =
      q.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      q.topic.toLowerCase().includes(searchQuery.toLowerCase()) ||
      q.answerKeyPoints.some((pt) => pt.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesUnit && matchesSearch;
  });

  const filteredVeryShort = VERY_SHORT_QUESTIONS.filter((q) => {
    const matchesUnit = isUnitMatch(q.unit);
    const matchesSearch =
      q.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      q.answer.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesUnit && matchesSearch;
  });

  const filteredMCQ = OFFICIAL_MCQS.filter((q) => {
    const matchesUnit = isUnitMatch(q.unit);
    const matchesSearch =
      q.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      q.options.some((opt) => opt.toLowerCase().includes(searchQuery.toLowerCase())) ||
      q.correctOption.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesUnit && matchesSearch;
  });

  const totalQuestionsCount =
    (selectedType === "all" || selectedType === "short" ? filteredShort.length : 0) +
    (selectedType === "all" || selectedType === "veryshort" ? filteredVeryShort.length : 0) +
    (selectedType === "all" || selectedType === "mcq" ? filteredMCQ.length : 0);

  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-50 via-white to-emerald-50 text-slate-900 pb-20">
      <Navbar />

      {/* Top Breadcrumb Bar */}
      <div className="bg-slate-900/95 border-b border-slate-800 py-2.5 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Link
            to="/bio-chem-syllabus"
            className="inline-flex items-center gap-2 text-xs font-bold text-slate-300 hover:text-emerald-400 transition-colors cursor-pointer group"
          >
            <ArrowRight className="w-4 h-4 rotate-180 group-hover:-translate-x-1 transition-transform text-emerald-400" />
            <span>Back to Full Syllabus</span>
          </Link>
          <div className="flex items-center gap-2 text-[11px] font-semibold text-slate-400">
            <span>Nursing & Clinical Hub</span>
            <span>/</span>
            <span className="text-emerald-400">Official Question Bank</span>
          </div>
        </div>
      </div>

      {/* Header Banner */}
      <div className="bg-gradient-to-r from-emerald-900 via-teal-900 to-slate-900 text-white py-10 px-4 sm:px-6 lg:px-8 shadow-xl">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-extrabold border border-emerald-500/30 mb-2">
              <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
              <span>Official University & NCLEX Question Repository</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              Biochemistry Comprehensive Question Bank
            </h1>
            <p className="text-slate-300 text-xs sm:text-sm mt-1 max-w-2xl leading-relaxed">
              Curated repository of Short Answer Questions (5 Marks), Very Short / Viva Voce Questions (2 Marks), and Multiple Choice Practice Questions with model key points.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={revealAll}
              className="px-3.5 py-2 rounded-2xl bg-white/10 hover:bg-white/20 border border-white/20 text-xs font-bold text-white transition-all cursor-pointer flex items-center gap-1.5"
            >
              <Eye className="w-3.5 h-3.5 text-emerald-400" />
              <span>Reveal All Answers</span>
            </button>
            <button
              onClick={hideAll}
              className="px-3.5 py-2 rounded-2xl bg-white/10 hover:bg-white/20 border border-white/20 text-xs font-bold text-white transition-all cursor-pointer flex items-center gap-1.5"
            >
              <EyeOff className="w-3.5 h-3.5 text-rose-400" />
              <span>Hide All Answers</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Filter & Search Controls */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-6">
        <div className="bg-white/95 border border-slate-200 rounded-3xl p-5 shadow-sm space-y-4">
          <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
            {/* Search */}
            <div className="relative w-full lg:w-96">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search questions, keywords, clinical terms..."
                className="w-full bg-slate-50 border border-slate-200 rounded-2xl py-2.5 pl-10 pr-4 text-xs text-slate-900 focus:outline-none focus:border-emerald-500 font-medium"
              />
            </div>

            {/* Type Filter Buttons */}
            <div className="flex items-center gap-1.5 overflow-x-auto w-full lg:w-auto pb-1 scrollbar-none">
              <button
                onClick={() => setSelectedType("all")}
                className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
                  selectedType === "all"
                    ? "bg-slate-900 text-white shadow-sm"
                    : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                }`}
              >
                All Types
              </button>
              <button
                onClick={() => setSelectedType("short")}
                className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                  selectedType === "short"
                    ? "bg-emerald-600 text-white shadow-sm"
                    : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                }`}
              >
                <FileText className="w-3 h-3" />
                <span>Short Questions (5M)</span>
              </button>
              <button
                onClick={() => setSelectedType("veryshort")}
                className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                  selectedType === "veryshort"
                    ? "bg-sky-600 text-white shadow-sm"
                    : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                }`}
              >
                <HelpCircle className="w-3 h-3" />
                <span>Very Short / Viva (2M)</span>
              </button>
              <button
                onClick={() => setSelectedType("mcq")}
                className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                  selectedType === "mcq"
                    ? "bg-amber-500 text-slate-950 shadow-sm"
                    : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                }`}
              >
                <CheckCircle2 className="w-3 h-3" />
                <span>Practice MCQs</span>
              </button>
            </div>
          </div>

          {/* Curriculum Filter Selector */}
          <div className="flex items-center gap-2 pt-2 border-t border-slate-100 flex-wrap">
            <span className="text-xs font-bold text-slate-500 mr-1 flex items-center gap-1 shrink-0">
              <Filter className="w-3 h-3 text-emerald-600" /> Curriculum:
            </span>
            <button
              onClick={() => {
                setSelectedUnit("all");
              }}
              className={`px-3 py-1 rounded-full text-[11px] font-bold transition-all whitespace-nowrap cursor-pointer ${
                selectedUnit === "all"
                  ? "bg-slate-950 text-white shadow-xs"
                  : "bg-slate-100 text-slate-600 hover:bg-slate-200"
              }`}
            >
              All Subjects
            </button>
            <button
              onClick={() => setSelectedUnit("curriculum-biochem")}
              className={`px-3 py-1 rounded-full text-[11px] font-bold transition-all whitespace-nowrap cursor-pointer flex items-center gap-1 ${
                selectedUnit === "curriculum-biochem"
                  ? "bg-emerald-600 text-white shadow-xs"
                  : "bg-emerald-50 text-emerald-700 hover:bg-emerald-100"
              }`}
            >
              <span>🧬</span>
              <span>Biochemistry (8 Units)</span>
            </button>
            <button
              onClick={() => setSelectedUnit("curriculum-nutrition")}
              className={`px-3 py-1 rounded-full text-[11px] font-bold transition-all whitespace-nowrap cursor-pointer flex items-center gap-1 ${
                selectedUnit === "curriculum-nutrition"
                  ? "bg-amber-500 text-slate-950 shadow-xs"
                  : "bg-amber-50 text-amber-800 hover:bg-amber-100"
              }`}
            >
              <span>🥗</span>
              <span>Nutrition & Dietetics (10 Units)</span>
            </button>
          </div>

          {/* Unit Filter Pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto pt-2 border-t border-slate-100 scrollbar-none">
            <span className="text-xs font-bold text-slate-400 mr-1 flex items-center gap-1 shrink-0">
              Unit:
            </span>
            {QUESTION_BANK_UNITS.map((u) => (
              <button
                key={u.id}
                onClick={() => setSelectedUnit(u.id)}
                className={`px-3 py-1 rounded-full text-[11px] font-bold transition-all whitespace-nowrap cursor-pointer flex items-center gap-1 ${
                  selectedUnit === u.id
                    ? "bg-slate-900 text-white"
                    : u.curriculum === "nutrition"
                    ? "bg-amber-50/70 text-amber-900 hover:bg-amber-100 border border-amber-200/50"
                    : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                }`}
              >
                <span>{u.icon}</span>
                <span>{u.name}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Total Questions Found Bar */}
        <div className="flex items-center justify-between mt-4 px-2 text-xs font-bold text-slate-500">
          <span>Showing {totalQuestionsCount} Questions</span>
          <Link
            to="/bio-chem-syllabus"
            className="text-emerald-600 hover:text-emerald-700 underline flex items-center gap-1"
          >
            <span>View Curriculum Modules</span>
            <ArrowRight className="w-3 h-3" />
          </Link>
        </div>

        {/* Questions Listing */}
        <div className="mt-6 space-y-6">
          {/* 1. Short Questions Section */}
          {(selectedType === "all" || selectedType === "short") && filteredShort.length > 0 && (
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold text-xs">
                  5M
                </div>
                <h3 className="text-base font-extrabold text-slate-900">
                  Short Answer Questions (5 Marks Each) — {filteredShort.length} Questions
                </h3>
              </div>

              <div className="grid grid-cols-1 gap-3.5">
                {filteredShort.map((q) => {
                  const isRevealed = !!revealedAnswers[q.id];
                  return (
                    <div
                      key={q.id}
                      className="bg-white border border-slate-200 rounded-2xl p-4 sm:p-5 shadow-2xs hover:border-emerald-300 transition-all"
                    >
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex items-start gap-3">
                          <span className="w-6 h-6 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 flex items-center justify-center text-[10px] font-extrabold shrink-0 mt-0.5">
                            Q{q.srNo}
                          </span>
                          <div>
                            <div className="flex items-center gap-2 mb-1">
                              <span className="px-2 py-0.5 rounded-md bg-slate-100 text-slate-600 text-[10px] font-bold">
                                {q.topic}
                              </span>
                              <span className="px-2 py-0.5 rounded-md bg-emerald-100 text-emerald-800 text-[10px] font-extrabold">
                                Short Answer (5M)
                              </span>
                            </div>
                            <h4 className="text-sm font-bold text-slate-900 leading-snug">
                              {q.question}
                            </h4>
                          </div>
                        </div>

                        <button
                          onClick={() => toggleAnswer(q.id)}
                          className="shrink-0 p-2 rounded-xl bg-slate-100 hover:bg-emerald-50 text-slate-600 hover:text-emerald-700 text-xs font-bold transition-all flex items-center gap-1 cursor-pointer"
                        >
                          <span>{isRevealed ? "Hide" : "Model Answer"}</span>
                          <ChevronDown
                            className={`w-3.5 h-3.5 transition-transform duration-200 ${
                              isRevealed ? "rotate-180" : ""
                            }`}
                          />
                        </button>
                      </div>

                      {isRevealed && (
                        <div className="mt-4 pt-3.5 border-t border-slate-100 bg-slate-50/70 p-4 rounded-xl space-y-2 animate-in fade-in duration-200">
                          <p className="text-[11px] font-extrabold uppercase tracking-wide text-emerald-700 flex items-center gap-1.5">
                            <CheckCircle2 className="w-3.5 h-3.5" />
                            <span>Key Exam Points & Model Response:</span>
                          </p>
                          <ul className="space-y-1.5 text-xs text-slate-700 font-medium pl-2">
                            {q.answerKeyPoints.map((pt, idx) => (
                              <li key={idx} className="flex items-start gap-2">
                                <span className="text-emerald-500 font-bold">•</span>
                                <span className="leading-relaxed">{pt}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* 2. Very Short Questions Section */}
          {(selectedType === "all" || selectedType === "veryshort") && filteredVeryShort.length > 0 && (
            <div className="space-y-4 pt-4">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-xl bg-sky-100 text-sky-700 flex items-center justify-center font-bold text-xs">
                  2M
                </div>
                <h3 className="text-base font-extrabold text-slate-900">
                  Very Short Answer / Viva Voce Questions (2 Marks Each) — {filteredVeryShort.length} Questions
                </h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
                {filteredVeryShort.map((q) => {
                  const isRevealed = !!revealedAnswers[q.id];
                  return (
                    <div
                      key={q.id}
                      className="bg-white border border-slate-200 rounded-2xl p-4 shadow-2xs hover:border-sky-300 transition-all flex flex-col justify-between"
                    >
                      <div>
                        <div className="flex items-center justify-between gap-2 mb-2">
                          <span className="w-6 h-6 rounded-full bg-sky-50 text-sky-700 border border-sky-200 flex items-center justify-center text-[10px] font-extrabold shrink-0">
                            Q{q.srNo}
                          </span>
                          <button
                            onClick={() => toggleAnswer(q.id)}
                            className="text-[11px] font-bold text-sky-600 hover:text-sky-700 cursor-pointer"
                          >
                            {isRevealed ? "Hide Answer" : "Show Answer"}
                          </button>
                        </div>
                        <h4 className="text-xs font-bold text-slate-900 leading-snug">
                          {q.question}
                        </h4>
                      </div>

                      {isRevealed && (
                        <div className="mt-3 pt-2.5 border-t border-slate-100 bg-sky-50/50 p-3 rounded-xl animate-in fade-in duration-200">
                          <p className="text-[11px] text-sky-900 font-semibold leading-relaxed">
                            <span className="font-bold text-sky-700">Answer: </span>
                            {q.answer}
                          </p>
                        </div>
                      )}
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
                <div className="w-7 h-7 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center font-bold text-xs">
                  MCQ
                </div>
                <h3 className="text-base font-extrabold text-slate-900">
                  Multiple Choice Practice Questions — {filteredMCQ.length} Questions
                </h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
                {filteredMCQ.map((q) => {
                  const isRevealed = !!revealedAnswers[q.id];
                  return (
                    <div
                      key={q.id}
                      className="bg-white border border-slate-200 rounded-2xl p-4 shadow-2xs hover:border-amber-300 transition-all flex flex-col justify-between"
                    >
                      <div>
                        <div className="flex items-center justify-between gap-2 mb-2">
                          <span className="w-6 h-6 rounded-full bg-amber-50 text-amber-800 border border-amber-200 flex items-center justify-center text-[10px] font-extrabold shrink-0">
                            Q{q.srNo}
                          </span>
                          <span className="text-[10px] font-bold text-slate-400">{q.topic}</span>
                        </div>
                        <h4 className="text-xs font-bold text-slate-900 leading-snug mb-3">
                          {q.question}
                        </h4>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 text-xs">
                          {q.options.map((opt, i) => {
                            const isCorrect = opt.trim().toLowerCase() === q.correctOption.trim().toLowerCase();
                            return (
                              <div
                                key={i}
                                className={`p-2 rounded-xl border text-[11px] font-medium transition-all ${
                                  isRevealed && isCorrect
                                    ? "bg-emerald-50 border-emerald-300 text-emerald-800 font-bold"
                                    : "bg-slate-50 border-slate-200 text-slate-700"
                                }`}
                              >
                                <span className="font-bold mr-1.5">{String.fromCharCode(65 + i)}.</span>
                                <span>{opt}</span>
                              </div>
                            );
                          })}
                        </div>
                      </div>

                      <div className="mt-3 pt-2.5 border-t border-slate-100 flex items-center justify-between">
                        <button
                          onClick={() => toggleAnswer(q.id)}
                          className="text-[11px] font-bold text-amber-700 hover:text-amber-800 cursor-pointer"
                        >
                          {isRevealed ? "Hide Correct Answer" : "Reveal Answer"}
                        </button>

                        {isRevealed && (
                          <span className="text-[11px] font-extrabold text-emerald-700">
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
