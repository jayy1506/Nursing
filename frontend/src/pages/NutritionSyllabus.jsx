import React, { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { NUTRITION_UNITS } from "../constants/nutritionData";
import {
  BookOpen,
  ClipboardList,
  Sparkles,
  ChevronRight,
  Search,
  CheckCircle2,
  Stethoscope,
  ArrowRight,
  Award,
  Layers,
  FileText,
  Apple,
  Scale,
  Lock,
  Unlock
} from "lucide-react";
import { useCurriculumProgress } from "../services/curriculumProgress";

export const NutritionSyllabus = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedUnitId, setSelectedUnitId] = useState("all");
  // Per-unit active tab state: 'lessons' | 'objectives' | 'concepts' | 'clinical'
  const [unitActiveTabs, setUnitActiveTabs] = useState({});

  // Real-time automatic curriculum progress & gating
  const { gating, isCompleted, toggleCompletion } = useCurriculumProgress('nutrition');

  const setUnitTab = (unitId, tab) => {
    setUnitActiveTabs((prev) => ({ ...prev, [unitId]: tab }));
  };

  const getUnitTab = (unitId) => unitActiveTabs[unitId] || "lessons";

  const filteredUnits = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    return NUTRITION_UNITS.filter((unit) => {
      const matchesUnit = selectedUnitId === "all" || unit.id === selectedUnitId;
      if (!matchesUnit) return false;
      if (!query) return true;

      return (
        unit.title.toLowerCase().includes(query) ||
        unit.category.toLowerCase().includes(query) ||
        unit.summary.toLowerCase().includes(query) ||
        unit.topics.some((t) => t.label.toLowerCase().includes(query)) ||
        unit.objectives.some((o) => o.toLowerCase().includes(query))
      );
    });
  }, [searchQuery, selectedUnitId]);

  return (
    <div className="min-h-screen bg-slate-50 text-[#263746] antialiased selection:bg-[#159A91] selection:text-white pb-24">
      {/* Top Breadcrumb & Switcher Bar */}
      <div className="bg-white border-b border-slate-200 text-slate-600 py-2.5 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2">
            <Link
              to="/dashboard"
              className="text-slate-500 hover:text-[#159A91] font-medium inline-flex items-center gap-1 transition-colors"
            >
              <ArrowRight className="w-3.5 h-3.5 rotate-180" />
              <span>Dashboard</span>
            </Link>
            <span className="text-slate-300">/</span>
            <span className="text-[#123B50] font-bold">Nutrition & Clinical Dietetics (10 Units)</span>
          </div>

          <div className="flex items-center gap-1.5 flex-wrap">
            <span className="text-slate-400 text-[11px] hidden sm:inline font-semibold">Tracks:</span>
            <Link
              to="/anatomy-syllabus"
              className="px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-[#E9F5F3] text-slate-700 hover:text-[#123B50] font-medium text-[11px] transition-colors"
            >
              🦴 Anatomy
            </Link>
            <Link
              to="/physiology-syllabus"
              className="px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-[#E9F5F3] text-slate-700 hover:text-[#123B50] font-medium text-[11px] transition-colors"
            >
              ⚡ Physiology
            </Link>
            <Link
              to="/bio-chem-syllabus"
              className="px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-[#E9F5F3] text-slate-700 hover:text-[#123B50] font-medium text-[11px] transition-colors"
            >
              🧬 Biochemistry
            </Link>
            <span className="px-2.5 py-1 rounded-lg bg-[#E9F5F3] text-[#123B50] font-extrabold text-[11px] border border-[#159A91]/30">
              🥗 Nutrition (10 Units)
            </span>
          </div>
        </div>
      </div>

      {/* Main Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
        {/* Course Syllabus Hero Card (Image 6 design) */}
        <div className="bg-[#123B50] text-white rounded-2xl p-6 sm:p-8 relative shadow-xl overflow-hidden mb-8 border border-[#1e4e66]">
          <div className="absolute top-0 right-0 w-96 h-96 bg-[#159A91]/10 rounded-full blur-3xl pointer-events-none" />

          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 relative z-10">
            <div className="max-w-3xl">
              {/* Badges strip */}
              <div className="flex flex-wrap items-center gap-2.5 mb-3">
                <Link
                  to="/dashboard"
                  className="inline-flex items-center gap-1.5 px-3 py-1 bg-white/10 hover:bg-white/20 text-white rounded-md text-xs font-semibold backdrop-blur-sm transition-colors border border-white/10"
                >
                  ← Dashboard
                </Link>
                <span className="inline-flex items-center gap-1 px-3 py-1 rounded-md bg-[#159A91]/20 border border-[#159A91]/40 text-[#159A91] text-xs font-bold tracking-wide uppercase">
                  ACCREDITED ACADEMIC NOTES · NUTR 120
                </span>
                <span className="inline-flex items-center gap-1 px-3 py-1 rounded-md bg-[#F2B66D]/20 border border-[#F2B66D]/40 text-[#F2B66D] text-xs font-bold">
                  ✨ Concept → Example → Application
                </span>
              </div>

              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight leading-tight">
                Nutrition & Clinical Dietetics: Complete Study Notes
              </h1>
              <p className="text-slate-300 text-sm mt-2 leading-relaxed max-w-2xl font-normal">
                Evidence-based dietary science, therapeutic meal planning for metabolic disorders, micronutrient RDA standards, deficiency management, and community nutrition surveillance.
              </p>

              {/* Action Buttons */}
              <div className="mt-5 flex flex-wrap items-center gap-3">
                <Link
                  to="/nutrition/lesson/intro-nutrition-health"
                  className="bg-[#159A91] hover:bg-[#12837b] text-white font-bold px-5 py-2.5 rounded-lg flex items-center gap-2 text-sm shadow-md transition-all active:scale-95"
                >
                  <BookOpen className="w-4 h-4" />
                  <span>Start Syllabus (1. Introduction to Nutrition) →</span>
                </Link>
                <button
                  type="button"
                  onClick={() => window.dispatchEvent(new CustomEvent('open-nova-tutor'))}
                  className="bg-white/10 hover:bg-white/20 text-white font-medium px-4 py-2.5 rounded-lg text-sm border border-white/20 flex items-center gap-2 backdrop-blur-sm transition-all cursor-pointer"
                >
                  <Sparkles className="w-4 h-4 text-[#F2B66D]" />
                  <span>Ask Nova Tutor</span>
                </button>
              </div>
            </div>

            {/* Right Circular Gauge Card (Image 6) */}
            <div className="bg-[#0f2d3d]/90 backdrop-blur-md border border-white/10 rounded-xl p-5 flex items-center gap-5 min-w-[280px] shadow-lg shrink-0">
              <div className="relative w-20 h-20 flex-shrink-0 flex items-center justify-center">
                <svg className="w-20 h-20 -rotate-90" viewBox="0 0 36 36">
                  <path
                    className="text-white/15"
                    strokeWidth="3.5"
                    stroke="currentColor"
                    fill="none"
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  />
                  <path
                    className="text-[#159A91] transition-all duration-700 ease-out"
                    strokeDasharray={`${gating.completionPercent}, 100`}
                    strokeWidth="3.5"
                    strokeLinecap="round"
                    stroke="currentColor"
                    fill="none"
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center font-bold text-white text-base">
                  {gating.completionPercent}%
                </div>
              </div>

              <div className="flex flex-col">
                <span className="text-[11px] font-bold text-white/50 tracking-wider uppercase">Course Completion</span>
                <span className="text-white font-bold text-sm mt-0.5">
                  {gating.completedCount} of 10 Units Cleared
                </span>
                <span className="text-xs text-white/70 mt-0.5">
                  Mastery Target: 100%
                </span>
                <span className="text-[11px] text-[#F2B66D] font-semibold mt-1 flex items-center gap-1">
                  ↗ &gt;75.0% Pass Rule Active
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Action / Quick Tab Strip below Hero (Image 6) */}
        <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="px-3.5 py-1.5 rounded-lg text-xs font-bold bg-[#123B50] text-white shadow-xs flex items-center gap-1.5">
              <BookOpen className="w-3.5 h-3.5 text-[#159A91]" />
              <span>10 Curriculum Units (Nutrition & Dietetics)</span>
            </span>
            <Link
              to="/question-bank"
              className="px-3.5 py-1.5 rounded-lg text-xs font-semibold bg-white text-[#263746] hover:bg-[#E9F5F3] border border-slate-200 transition-colors flex items-center gap-1.5 shadow-2xs"
            >
              <FileText className="w-3.5 h-3.5 text-[#159A91]" />
              <span>Nutrition Question Bank</span>
            </Link>
          </div>

          <Link
            to="/quiz/nutrition-grand-final"
            className="px-4 py-1.5 rounded-lg text-xs font-bold bg-[#123B50] hover:bg-[#159A91] text-white shadow-xs transition-colors flex items-center gap-1.5 border border-[#1e4e66]"
          >
            <Award className="w-3.5 h-3.5 text-[#F2B66D]" />
            <span>Final Capstone Assessment (40 MCQs)</span>
          </Link>
        </div>
        {/* Grand Final Mixed Assessment Gating Card with Live Auto-Updating Completion */}
        <div
          className={`p-6 sm:p-7 rounded-3xl border mb-6 transition-all ${
            gating.isFinalUnlocked
              ? "bg-gradient-to-r from-green-50 via-white to-green-50 border-2 border-green-400 text-neutral-900 shadow-sm"
              : "bg-white border border-neutral-200 text-neutral-900 shadow-xs"
          }`}
        >
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="space-y-2">
              <div className="flex items-center gap-2 flex-wrap">
                <span
                  className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider ${
                    gating.isFinalUnlocked
                      ? "bg-green-100 text-green-700 border border-green-400"
                      : "bg-neutral-100 text-neutral-800 border border-neutral-300"
                  }`}
                >
                  {gating.isFinalUnlocked ? (
                    <Unlock className="w-3.5 h-3.5" />
                  ) : (
                    <Lock className="w-3.5 h-3.5 text-neutral-800" />
                  )}
                  <span>
                    {gating.isFinalUnlocked
                      ? "Grand Final Unlocked (100% Completed)"
                      : "Cumulative Final Exam Gated"}
                  </span>
                </span>
                <span
                  className={`text-xs font-bold ${
                    gating.isFinalUnlocked ? "text-green-700" : "text-neutral-500"
                  }`}
                >
                  {gating.completedCount} of 10 Modules Mastered ({gating.completionPercent}%)
                </span>
              </div>

              <h3 className="text-xl sm:text-2xl font-black tracking-tight text-neutral-900">
                Comprehensive Nutrition & Dietetics Grand Final Examination
              </h3>

              <p className="text-xs sm:text-sm max-w-2xl leading-relaxed text-neutral-600">
                {gating.isFinalUnlocked
                  ? "Congratulations! You have mastered all 10 Nutrition units. Take the 40-question comprehensive grand final exam."
                  : `Gated under INC competency standards. Complete each of the 10 individual unit assessments or mark chapters studied to unlock this final examination. Remaining: ${gating.remainingCount} modules.`}
              </p>

              {/* Live Animated Progress Meter */}
              <div className="w-full max-w-md bg-neutral-100 rounded-full h-2.5 overflow-hidden pt-0.5">
                <div
                  className={`h-2.5 rounded-full transition-all duration-500 ${
                    gating.isFinalUnlocked
                      ? "bg-gradient-to-r from-green-500 to-neutral-800"
                      : "bg-gradient-to-r from-green-400 from-neutral-900 to-neutral-800"
                  }`}
                  style={{ width: `${Math.max(5, gating.completionPercent)}%` }}
                />
              </div>
            </div>

            <div className="shrink-0 flex flex-col sm:flex-row gap-3">
              <Link
                to={gating.isFinalUnlocked ? "/quiz/nutrition-grand-final" : "#"}
                onClick={(e) => {
                  if (!gating.isFinalUnlocked) {
                    e.preventDefault();
                    alert(`Grand Final Locked! Please complete all 10 units first. You have passed ${gating.completedCount} of 10 units.`);
                  }
                }}
                className={`inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-2xl font-black text-xs transition-all shadow-md ${
                  gating.isFinalUnlocked
                    ? "bg-[#159A91] hover:bg-[#123B50] text-white shadow-[#159A91]/30 cursor-pointer hover:scale-105"
                    : "bg-neutral-100 text-neutral-500 border border-neutral-200 cursor-not-allowed opacity-90"
                }`}
              >
                {gating.isFinalUnlocked ? <Unlock className="w-4 h-4" /> : <Lock className="w-4 h-4 text-neutral-800" />}
                <span>{gating.isFinalUnlocked ? "Take Grand Final Exam (40 Qs)" : `Locked (${gating.completedCount}/10 Units)`}</span>
              </Link>
            </div>
          </div>
        </div>

        {/* Clean Filter & Unit Segmented Selector */}
        <div className="bg-white rounded-2xl border border-neutral-200 p-3 sm:p-4 shadow-xs mb-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-3">
            {/* Search Input */}
            <div className="relative w-full md:w-80">
              <Search className="w-4 h-4 text-neutral-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search vitamins, diets, cooking, RDA..."
                className="w-full bg-neutral-50 border border-neutral-200 rounded-xl py-2 pl-9 pr-3 text-xs text-neutral-800 placeholder-neutral-400 focus:outline-none focus:border-neutral-500 focus:bg-white transition-all font-medium"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-xs text-neutral-400 hover:text-neutral-600 font-bold"
                >
                  ×
                </button>
              )}
            </div>

            {/* Unit Pills Bar */}
            <div className="flex items-center gap-1.5 overflow-x-auto w-full md:w-auto pb-1 md:pb-0 scrollbar-none">
              <button
                onClick={() => setSelectedUnitId("all")}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
                  selectedUnitId === "all"
                    ? "bg-[#159A91] text-white shadow-xs"
                    : "bg-neutral-100 text-neutral-600 hover:bg-neutral-200 hover:text-neutral-800"
                }`}
              >
                All 10 Units
              </button>

              {NUTRITION_UNITS.map((unit) => (
                <button
                  key={unit.id}
                  onClick={() => setSelectedUnitId(unit.id)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap cursor-pointer flex items-center gap-1.5 ${
                    selectedUnitId === unit.id
                      ? "bg-[#123B50] text-white shadow-xs"
                      : "bg-neutral-100 text-neutral-600 hover:bg-neutral-200 hover:text-neutral-900"
                  }`}
                >
                  <span>{unit.icon}</span>
                  <span>Unit {unit.unitNumber}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Units Render Container */}
        {filteredUnits.length === 0 ? (
          <div className="bg-white rounded-2xl border border-neutral-200 p-12 text-center max-w-md mx-auto my-8">
            <Search className="w-10 h-10 text-neutral-300 mx-auto mb-3" />
            <h3 className="text-sm font-bold text-neutral-800">No matching nutrition units found</h3>
            <p className="text-xs text-neutral-500 mt-1">
              Try searching with another keyword or reset the filter.
            </p>
            <button
              onClick={() => { setSearchQuery(""); setSelectedUnitId("all"); }}
              className="mt-4 px-4 py-2 rounded-xl bg-[#159A91] text-white text-xs font-bold hover:bg-[#123B50] cursor-pointer"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="space-y-6">
            {filteredUnits.map((unit) => {
              const currentTab = getUnitTab(unit.id);
              const hasConcepts = !!(
                unit.content.definitions || 
                unit.content.relationshipWithHealth || 
                unit.content.nursingPracticeAreas ||
                unit.content.dietaryFiberComparison
              );

              const unitKey = unit.quizSlug || unit.id;
              const unitDone = isCompleted(unitKey);

              return (
                <div
                  key={unit.id}
                  id={unit.id}
                  className="bg-white rounded-2xl border border-neutral-200 shadow-xs hover:border-green-400 transition-all overflow-hidden"
                >
                  {/* Unit Top Header */}
                  <div className="p-5 sm:p-6 border-b border-neutral-100 bg-gradient-to-r from-white to-neutral-50/50">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                      <div className="flex items-start sm:items-center gap-3.5">
                        <div className="w-11 h-11 rounded-xl bg-green-50 border border-green-100 text-green-700 flex items-center justify-center text-xl shadow-2xs shrink-0">
                          {unit.icon}
                        </div>
                        <div>
                          <div className="flex items-center gap-2 mb-0.5 flex-wrap">
                            <span className={`px-2 py-0.5 rounded-md text-[10px] font-extrabold uppercase tracking-wide border ${unit.badgeColor}`}>
                              Unit {unit.unitNumber}
                            </span>
                            <span className="text-[11px] font-semibold text-neutral-500">
                              {unit.category}
                            </span>

                            {/* Automatic Real-Time Completion Status Indicator */}
                            {unitDone ? (
                              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-green-50 text-green-700 border border-green-400">
                                <CheckCircle2 className="w-3 h-3 text-green-600" />
                                <span>Completed • Mastered</span>
                              </span>
                            ) : (
                              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-semibold bg-neutral-100 text-neutral-500 border border-neutral-200">
                                <span>Not Completed</span>
                              </span>
                            )}
                          </div>
                          <h2 className="text-base sm:text-lg font-bold text-neutral-900">
                            {unit.title}
                          </h2>
                          <p className="text-xs text-neutral-500 mt-0.5 line-clamp-1">
                            {unit.summary}
                          </p>
                        </div>
                      </div>

                      {/* Actions: Toggle Studied / Take Quiz */}
                      <div className="flex flex-wrap items-center gap-2 self-start sm:self-center shrink-0">
                        {/* 1-click automatic completion toggle */}
                        <button
                          type="button"
                          onClick={() => toggleCompletion(unitKey)}
                          className={`inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                            unitDone
                              ? "bg-neutral-100 text-neutral-600 hover:bg-neutral-200 border border-neutral-200"
                              : "bg-[#E9F5F3] hover:bg-[#159A91] hover:text-white text-[#123B50] border border-[#159A91]/30 shadow-xs group"
                          }`}
                          title="Click to toggle chapter completion and update Grand Final standing"
                        >
                          <CheckCircle2
                            className={`w-3.5 h-3.5 ${
                              unitDone ? "text-[#159A91]" : "text-neutral-400 group-hover:text-white"
                            }`}
                          />
                          <span>{unitDone ? "Mark Incomplete" : "Mark as Studied"}</span>
                        </button>

                        {/* Quick Quiz Shortcut Button */}
                        <Link
                          to={`/quiz/${unitKey}`}
                          className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#159A91] hover:bg-[#123B50] text-white font-bold text-xs transition-colors shrink-0 shadow-2xs"
                        >
                          <ClipboardList className="w-3.5 h-3.5 text-white" />
                          <span>Take Unit Quiz</span>
                          <ArrowRight className="w-3 h-3 text-white" />
                        </Link>
                      </div>
                    </div>

                    {/* Segmented Sub-Tabs */}
                    <div className="mt-5 flex items-center gap-1.5 overflow-x-auto border-t border-neutral-100 pt-3 scrollbar-none text-xs">
                      <button
                        onClick={() => setUnitTab(unit.id, "lessons")}
                        className={`px-3 py-1.5 rounded-lg font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                          currentTab === "lessons"
                            ? "bg-[#123B50] text-white shadow-2xs"
                            : "text-neutral-600 hover:bg-neutral-100"
                        }`}
                      >
                        <BookOpen className="w-3.5 h-3.5" />
                        <span>Lessons ({unit.topics.length})</span>
                      </button>

                      <button
                        onClick={() => setUnitTab(unit.id, "objectives")}
                        className={`px-3 py-1.5 rounded-lg font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                          currentTab === "objectives"
                            ? "bg-[#123B50] text-white shadow-2xs"
                            : "text-neutral-600 hover:bg-neutral-100"
                        }`}
                      >
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#159A91]" />
                        <span>Competencies ({unit.objectives.length})</span>
                      </button>

                      {hasConcepts && (
                        <button
                          onClick={() => setUnitTab(unit.id, "concepts")}
                          className={`px-3 py-1.5 rounded-lg font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                            currentTab === "concepts"
                              ? "bg-[#123B50] text-white shadow-2xs"
                              : "text-neutral-600 hover:bg-neutral-100"
                          }`}
                        >
                          <FileText className="w-3.5 h-3.5 text-[#159A91]" />
                          <span>Core Notes</span>
                        </button>
                      )}

                      <button
                        onClick={() => setUnitTab(unit.id, "clinical")}
                        className={`px-3 py-1.5 rounded-lg font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                          currentTab === "clinical"
                            ? "bg-[#123B50] text-white shadow-2xs"
                            : "text-neutral-600 hover:bg-neutral-100"
                        }`}
                      >
                        <Stethoscope className="w-3.5 h-3.5 text-[#159A91]" />
                        <span>Nursing Practice</span>
                      </button>
                    </div>
                  </div>

                  {/* Tabbed Content Body */}
                  <div className="p-5 sm:p-6 bg-neutral-50/40">
                    {/* TAB 1: Structured Lessons Grid */}
                    {currentTab === "lessons" && (
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                        {unit.topics.map((t, idx) => (
                          <Link
                            key={idx}
                            to={t.route}
                            className="p-3.5 rounded-xl bg-white border border-neutral-200/90 border-neutral-300 text-neutral-800 hover:text-neutral-800 transition-all flex items-center justify-between group shadow-2xs hover:shadow-sm"
                          >
                            <div className="flex items-center gap-2.5 truncate mr-2">
                              <span className="w-6 h-6 rounded-lg bg-neutral-100 group-hover:bg-neutral-100 text-neutral-800 text-[11px] font-bold flex items-center justify-center shrink-0 transition-colors">
                                {idx + 1}
                              </span>
                              <span className="text-xs font-semibold truncate">
                                {t.label}
                              </span>
                            </div>
                            <ChevronRight className="w-4 h-4 text-neutral-300 group-hover:text-neutral-800 group-hover:translate-x-0.5 transition-all shrink-0" />
                          </Link>
                        ))}
                      </div>
                    )}

                    {/* TAB 2: Competencies / Objectives */}
                    {currentTab === "objectives" && (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs">
                        {unit.objectives.map((obj, i) => (
                          <div
                            key={i}
                            className="flex items-start gap-2.5 bg-white p-3 rounded-xl border border-neutral-200/80 shadow-2xs"
                          >
                            <span className="w-5 h-5 rounded-md bg-neutral-100 text-neutral-800 flex items-center justify-center font-bold text-[10px] shrink-0 mt-0.5">
                              {i + 1}
                            </span>
                            <span className="text-neutral-700 leading-relaxed font-medium">
                              {obj}
                            </span>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* TAB 3: Core Notes */}
                    {currentTab === "concepts" && (
                      <div className="space-y-3">
                        {unit.content.definitions && (
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                            {unit.content.definitions.map((def, i) => (
                              <div key={i} className="bg-white p-3.5 rounded-xl border border-neutral-200">
                                <span className="text-xs font-bold text-neutral-800 uppercase tracking-wide">
                                  {def.term}
                                </span>
                                <p className="text-xs text-neutral-600 mt-1 leading-relaxed">
                                  {def.definition}
                                </p>
                              </div>
                            ))}
                          </div>
                        )}

                        {unit.content.relationshipWithHealth && (
                          <div className="bg-white p-4 rounded-xl border border-neutral-200">
                            <h4 className="text-xs font-bold uppercase tracking-wider text-neutral-700 mb-2.5">
                              Relationship of Nutrition with Optimal Health
                            </h4>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                              {unit.content.relationshipWithHealth.map((item, i) => (
                                <div key={i} className="p-2.5 rounded-lg bg-neutral-50 border border-neutral-200/60">
                                  <p className="font-bold text-neutral-800">{item.title}</p>
                                  <p className="text-neutral-600 text-[11px] mt-0.5">{item.desc}</p>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}

                        {unit.content.dietaryFiberComparison && (
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                            {unit.content.dietaryFiberComparison.map((fib, i) => (
                              <div key={i} className="bg-white p-3.5 rounded-xl border border-neutral-200">
                                <h5 className="text-xs font-bold text-neutral-900 border-b pb-1.5 mb-1.5 flex items-center justify-between">
                                  <span className="text-neutral-800">{fib.type}</span>
                                  <span className="text-[10px] px-2 py-0.5 rounded-md bg-neutral-100 text-neutral-800 font-semibold">Roughage</span>
                                </h5>
                                <p className="text-xs text-neutral-600 mb-1"><strong>Action:</strong> {fib.action}</p>
                                <p className="text-xs text-neutral-600 mb-1"><strong>Sources:</strong> {fib.foodSources}</p>
                                <p className="text-xs text-green-700 font-semibold bg-green-50 p-2 rounded-lg border border-green-100">
                                  <strong>Benefit:</strong> {fib.clinicalBenefits}
                                </p>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    )}

                    {/* TAB 4: Nursing Clinical Relevance */}
                    {currentTab === "clinical" && (
                      <div className="bg-white p-4 rounded-xl border border-neutral-200">
                        <h4 className="text-xs font-bold uppercase tracking-wider text-neutral-700 mb-2.5 flex items-center gap-1.5">
                          <Stethoscope className="w-4 h-4 text-green-700" />
                          <span>Clinical Application in Hospital & Community Nursing</span>
                        </h4>
                        {unit.content.nursingPracticeAreas ? (
                          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 text-xs">
                            {unit.content.nursingPracticeAreas.map((area, i) => (
                              <div key={i} className="p-2.5 rounded-lg bg-neutral-50 border border-neutral-200/70 font-medium text-neutral-800 flex items-center gap-2">
                                <span className="w-1.5 h-1.5 rounded-full bg-neutral-800 shrink-0" />
                                <span>{area}</span>
                              </div>
                            ))}
                          </div>
                        ) : (
                          <p className="text-xs text-neutral-600 leading-relaxed">
                            Practical application includes assessing nutritional deficiency risks, monitoring patient oral intakes, administering enteral feeds, and educating patients on discharge diet prescriptions.
                          </p>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default NutritionSyllabus;
