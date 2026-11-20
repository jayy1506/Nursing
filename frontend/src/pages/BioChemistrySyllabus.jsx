import React, { useState, useMemo, useEffect } from "react";
import { Link } from "react-router-dom";
import { SYLLABUS_MODULES } from "../constants/biochemistryData";
import {
  GlucoseHomeostasisSimulator,
  CardiacBiomarkerTimeline,
  ABGDiagnosticCalculator,
  InteractiveAntibodyDiagram,
  ClinicalCaseChallenge
} from "../components/biochem/InteractiveBiochemTools";
import {
  CarbohydrateDiagram,
  LipidDiagram,
  ProteinDiagram,
  EnzymeDiagram,
  AcidBaseDiagram,
  HemeDiagram,
  ImmunologyDiagram
} from "../components/illustrations/BiochemIllustrations";
import {
  BookOpen,
  ClipboardList,
  Sparkles,
  ChevronRight,
  Flame,
  Search,
  CheckCircle2,
  Stethoscope,
  ArrowRight,
  Award,
  Layers,
  Lightbulb,
  Sliders,
  Check,
  Zap,
  Lock,
  Unlock
} from "lucide-react";
import { useCurriculumProgress } from "../services/curriculumProgress";

// Standardized 7-Unit Nursing Biochemistry Curriculum
export const BioChemistrySyllabus = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedUnitId, setSelectedUnitId] = useState("all");
  // Per-unit active tab state: 'simulator' | 'lessons' | 'objectives' | 'formulas' | 'ranges' | 'hook'
  const [unitActiveTabs, setUnitActiveTabs] = useState({});

  // Real-time automatic curriculum progress & gating
  const { gating, isCompleted, toggleCompletion } = useCurriculumProgress('biochemistry');

  // Local storage persisted lesson completion tracker
  const [completedLessons, setCompletedLessons] = useState(() => {
    try {
      const saved = localStorage.getItem("nursing_biochem_completed_lessons");
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  const toggleLessonComplete = (lessonRoute) => {
    setCompletedLessons((prev) => {
      const updated = { ...prev, [lessonRoute]: !prev[lessonRoute] };
      try {
        localStorage.setItem("nursing_biochem_completed_lessons", JSON.stringify(updated));
      } catch (err) {
        console.error("Storage error:", err);
      }
      return updated;
    });
  };

  const setUnitTab = (unitId, tab) => {
    setUnitActiveTabs((prev) => ({ ...prev, [unitId]: tab }));
  };

  const getUnitTab = (unitId) => unitActiveTabs[unitId] || "lessons";

  // Filtered modules based on search and selected unit
  const filteredModules = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    return SYLLABUS_MODULES.filter((mod) => {
      const matchesUnit = selectedUnitId === "all" || mod.id === selectedUnitId;
      if (!matchesUnit) return false;
      if (!query) return true;

      return (
        mod.title.toLowerCase().includes(query) ||
        mod.category.toLowerCase().includes(query) ||
        mod.summary.toLowerCase().includes(query) ||
        mod.topics.some((t) => t.label.toLowerCase().includes(query)) ||
        mod.objectives.some((o) => o.toLowerCase().includes(query))
      );
    });
  }, [searchQuery, selectedUnitId]);

  // Overall curriculum progress stats
  const totalLessonsCount = useMemo(() => {
    return SYLLABUS_MODULES.reduce((acc, m) => acc + m.topics.length, 0);
  }, []);

  const totalCompletedCount = useMemo(() => {
    return Object.values(completedLessons).filter(Boolean).length;
  }, [completedLessons]);

  const curriculumProgressPct = Math.round((totalCompletedCount / Math.max(1, totalLessonsCount)) * 100);

  const modulesPassedCount = useMemo(() => {
    return SYLLABUS_MODULES.filter(m => isCompleted(m.id)).length;
  }, [isCompleted]);

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
            <span className="text-[#123B50] font-bold">Biochemistry Curriculum (7 Units)</span>
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
            <span className="px-2.5 py-1 rounded-lg bg-[#E9F5F3] text-[#123B50] font-extrabold text-[11px] border border-[#159A91]/30">
              🧬 Biochemistry (7 Units)
            </span>
            <Link
              to="/nutrition-syllabus"
              className="px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-[#E9F5F3] text-slate-700 hover:text-[#123B50] font-medium text-[11px] transition-colors"
            >
              🥗 Nutrition
            </Link>
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
                  ACCREDITED ACADEMIC NOTES · BIOC 115
                </span>
                <span className="inline-flex items-center gap-1 px-3 py-1 rounded-md bg-[#F2B66D]/20 border border-[#F2B66D]/40 text-[#F2B66D] text-xs font-bold">
                  ✨ Concept → Example → Application
                </span>
              </div>

              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight leading-tight">
                Medical Biochemistry: Complete Study Notes
              </h1>
              <p className="text-slate-300 text-sm mt-2 leading-relaxed max-w-2xl font-normal">
                Comprehensive accredited learning modules for B.Sc Nursing Semester I & II. Every topic includes detailed biochemical mechanisms, clinical pearls, nursing care plans (ADPIE), and verified assessment questions.
              </p>

              {/* Action Buttons */}
              <div className="mt-5 flex flex-wrap items-center gap-3">
                <Link
                  to="/classification-of-carb"
                  className="bg-[#159A91] hover:bg-[#12837b] text-white font-bold px-5 py-2.5 rounded-lg flex items-center gap-2 text-sm shadow-md transition-all active:scale-95"
                >
                  <BookOpen className="w-4 h-4" />
                  <span>Start Syllabus (1. Classification of Carbohydrates) →</span>
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
                    strokeDasharray={`${curriculumProgressPct}, 100`}
                    strokeWidth="3.5"
                    strokeLinecap="round"
                    stroke="currentColor"
                    fill="none"
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center font-bold text-white text-base">
                  {curriculumProgressPct}%
                </div>
              </div>

              <div className="flex flex-col">
                <span className="text-[11px] font-bold text-white/50 tracking-wider uppercase">Course Completion</span>
                <span className="text-white font-bold text-sm mt-0.5">
                  {totalCompletedCount} of {totalLessonsCount} Topics
                </span>
                <span className="text-xs text-white/70 mt-0.5">
                  {modulesPassedCount} of {SYLLABUS_MODULES.length} Modules Cleared
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
              <span>{SYLLABUS_MODULES.length} Curriculum Modules ({totalLessonsCount} Topics)</span>
            </span>
            <Link
              to="/question-bank"
              className="px-3.5 py-1.5 rounded-lg text-xs font-semibold bg-white text-[#263746] hover:bg-[#E9F5F3] border border-slate-200 transition-colors flex items-center gap-1.5 shadow-2xs"
            >
              <FileText className="w-3.5 h-3.5 text-[#159A91]" />
              <span>Question Bank & Formulas</span>
            </Link>
          </div>

          <Link
            to="/student/quiz/comprehensive-final"
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
                  {gating.completedCount} of 7 Modules Mastered ({gating.completionPercent}%)
                </span>
              </div>

              <h3 className="text-xl sm:text-2xl font-black tracking-tight text-neutral-900">
                Comprehensive Biochemistry Grand Final Examination
              </h3>

              <p className="text-xs sm:text-sm max-w-2xl leading-relaxed text-neutral-600">
                {gating.isFinalUnlocked
                  ? "Congratulations! You have mastered all 7 Biochemistry units. Take the 40-question comprehensive grand final exam."
                  : `Gated under INC competency standards. Complete each of the 7 individual unit assessments or mark chapters studied to unlock this final examination. Remaining: ${gating.remainingCount} modules.`}
              </p>

              {/* Live Animated Progress Meter */}
              <div className="w-full max-w-md bg-neutral-100 rounded-full h-2.5 overflow-hidden pt-0.5">
                <div
                  className={`h-2.5 rounded-full transition-all duration-500 ${
                    gating.isFinalUnlocked
                      ? "bg-gradient-to-r from-green-500 to-green-400"
                      : "bg-gradient-to-r from-green-400 to-green-500"
                  }`}
                  style={{ width: `${Math.max(5, gating.completionPercent)}%` }}
                />
              </div>
            </div>

            <div className="shrink-0 flex flex-col sm:flex-row gap-3">
              <Link
                to={gating.isFinalUnlocked ? "/quiz/biochem-grand-final" : "#"}
                onClick={(e) => {
                  if (!gating.isFinalUnlocked) {
                    e.preventDefault();
                    alert(`Grand Final Locked! Please complete all 7 units first. You have passed ${gating.completedCount} of 7 units.`);
                  }
                }}
                className={`inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-2xl font-black text-xs transition-all shadow-md ${
                  gating.isFinalUnlocked
                    ? "bg-[#159A91] hover:bg-[#123B50] text-white shadow-[#159A91]/30 cursor-pointer hover:scale-105"
                    : "bg-neutral-100 text-neutral-500 border border-neutral-200 cursor-not-allowed opacity-90"
                }`}
              >
                {gating.isFinalUnlocked ? <Unlock className="w-4 h-4" /> : <Lock className="w-4 h-4 text-neutral-800" />}
                <span>{gating.isFinalUnlocked ? "Take Grand Final Exam (40 Qs)" : `Locked (${gating.completedCount}/7 Units)`}</span>
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
                placeholder="Search topics, enzymes, ranges..."
                className="w-full bg-neutral-50 border border-neutral-200 rounded-xl py-2 pl-9 pr-3 text-xs text-neutral-800 placeholder-neutral-400 focus:outline-none focus:border-green-500 focus:bg-white transition-all font-medium"
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
                All 7 Units
              </button>

              {SYLLABUS_MODULES.map((mod) => (
                <button
                  key={mod.id}
                  onClick={() => setSelectedUnitId(mod.id)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap cursor-pointer flex items-center gap-1.5 ${
                    selectedUnitId === mod.id
                      ? "bg-[#123B50] text-white shadow-xs"
                      : "bg-neutral-100 text-neutral-600 hover:bg-neutral-200 hover:text-neutral-900"
                  }`}
                >
                  <span>{mod.icon}</span>
                  <span>Unit {mod.unitNumber}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Modules Render Container */}
        {filteredModules.length === 0 ? (
          <div className="bg-white rounded-2xl border border-neutral-200 p-12 text-center max-w-md mx-auto my-8">
            <Search className="w-10 h-10 text-neutral-300 mx-auto mb-3" />
            <h3 className="text-sm font-bold text-neutral-800">No matching topics found</h3>
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
            {filteredModules.map((mod) => {
              const currentTab = getUnitTab(mod.id);
              const unitCompletedCount = mod.topics.filter((t) => completedLessons[t.route]).length;
              const unitPct = Math.round((unitCompletedCount / mod.topics.length) * 100);

              // Determine simulator label for this unit
              const getSimulatorLabel = (unitNum) => {
                if (unitNum === 1) return "⚡ Glucose Homeostasis Simulator";
                if (unitNum === 4) return "❤️ Cardiac Enzyme Kinetics";
                if (unitNum === 5) return "⚖️ ABG Blood Gas Analyzer";
                if (unitNum === 7) return "🛡️ Antibody (IgG) Molecular Inspector";
                return "🎯 Clinical Case Challenge";
              };

              const unitDone = isCompleted(mod.id);

              return (
                <div
                  key={mod.id}
                  id={mod.id}
                  className="bg-white rounded-2xl border border-slate-200 shadow-xs hover:border-[#159A91]/50 transition-all overflow-hidden mb-6"
                >
                  {/* Unit Top Header */}
                  <div className="p-5 sm:p-6 border-b border-slate-100 bg-gradient-to-r from-white to-slate-50/50">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                      <div className="flex items-start sm:items-center gap-3.5">
                        <div className="w-11 h-11 rounded-xl bg-[#E9F5F3] border border-[#159A91]/20 text-[#123B50] flex items-center justify-center text-lg shadow-2xs shrink-0 font-extrabold">
                          {String(mod.unitNumber).padStart(2, '0')}
                        </div>
                        <div>
                          <div className="flex items-center gap-2 mb-0.5 flex-wrap">
                            <span className="px-2 py-0.5 rounded-md text-[10px] font-extrabold uppercase tracking-wide bg-[#E9F5F3] text-[#123B50] border border-[#159A91]/30">
                              Unit {mod.unitNumber}
                            </span>
                            <span className="text-[11px] font-semibold text-slate-500">
                              {mod.category}
                            </span>
                            
                            {/* Automatic Real-Time Completion Status Indicator */}
                            {unitDone ? (
                              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-[#E9F5F3] text-[#159A91] border border-[#159A91]/40">
                                <CheckCircle2 className="w-3 h-3 text-[#159A91]" />
                                <span>Mastered</span>
                              </span>
                            ) : (
                              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-semibold bg-slate-100 text-slate-500 border border-slate-200">
                                <span>Not Completed</span>
                              </span>
                            )}

                            {/* Per-Unit Progress Badge */}
                            <span className="text-[10px] font-bold text-slate-500 bg-slate-100 px-2 py-0.5 rounded-md">
                              {unitCompletedCount}/{mod.topics.length} done ({unitPct}%)
                            </span>
                          </div>
                          <h2 className="text-base sm:text-lg font-bold text-[#123B50]">
                            {mod.title}
                          </h2>
                          <p className="text-xs text-slate-500 mt-0.5 line-clamp-1 font-normal">
                            {mod.summary}
                          </p>
                        </div>
                      </div>

                      {/* Actions: Toggle Studied / Take Quiz */}
                      <div className="flex flex-wrap items-center gap-2 self-start sm:self-center shrink-0">
                        {/* 1-click automatic completion toggle */}
                        <button
                          type="button"
                          onClick={() => toggleCompletion(mod.id)}
                          className={`inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                            unitDone
                              ? "bg-slate-100 text-slate-600 hover:bg-slate-200 border border-slate-200"
                              : "bg-[#E9F5F3] hover:bg-[#E9F5F3] text-[#123B50] border border-[#159A91]/30 shadow-xs"
                          }`}
                          title="Click to toggle chapter completion and update Grand Final standing"
                        >
                          <CheckCircle2
                            className={`w-3.5 h-3.5 ${
                              unitDone ? "text-[#159A91]" : "text-slate-400"
                            }`}
                          />
                          <span>{unitDone ? "Mark Incomplete" : "Mark as Studied"}</span>
                        </button>

                        {/* Quick Quiz Shortcut Button */}
                        <Link
                          to={`/quiz/${mod.id}`}
                          className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#159A91] hover:bg-[#12837b] text-white font-bold text-xs transition-colors shrink-0 shadow-2xs"
                        >
                          <ClipboardList className="w-3.5 h-3.5 text-white" />
                          <span>Take Unit Quiz</span>
                          <ArrowRight className="w-3 h-3 text-white" />
                        </Link>
                      </div>
                    </div>

                    {/* Segmented Sub-Tabs */}
                    <div className="mt-5 flex items-center gap-1.5 overflow-x-auto border-t border-slate-100 pt-3 scrollbar-none text-xs">
                      <button
                        onClick={() => setUnitTab(mod.id, "lessons")}
                        className={`px-3 py-1.5 rounded-lg font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                          currentTab === "lessons"
                            ? "bg-[#123B50] text-white shadow-2xs"
                            : "text-[#263746] hover:bg-[#E9F5F3]"
                        }`}
                      >
                        <BookOpen className="w-3.5 h-3.5" />
                        <span>Lessons ({mod.topics.length})</span>
                      </button>

                      {/* Scientific Vector Diagram Tab */}
                      <button
                        onClick={() => setUnitTab(mod.id, "diagram")}
                        className={`px-3 py-1.5 rounded-lg font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                          currentTab === "diagram"
                            ? "bg-[#123B50] text-white shadow-2xs"
                            : "text-[#263746] hover:bg-[#E9F5F3]"
                        }`}
                      >
                        <span>🎨</span>
                        <span>Vector Diagram</span>
                      </button>

                      {/* Interactive Visual Tool Tab */}
                      <button
                        onClick={() => setUnitTab(mod.id, "simulator")}
                        className={`px-3 py-1.5 rounded-lg font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                          currentTab === "simulator"
                            ? "bg-[#123B50] text-white shadow-2xs"
                            : "text-[#159A91] bg-[#E9F5F3] hover:bg-[#E9F5F3] border border-[#159A91]/30"
                        }`}
                      >
                        <Zap className="w-3.5 h-3.5 text-[#159A91]" />
                        <span>{getSimulatorLabel(mod.unitNumber)}</span>
                      </button>

                      <button
                        onClick={() => setUnitTab(mod.id, "objectives")}
                        className={`px-3 py-1.5 rounded-lg font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                          currentTab === "objectives"
                            ? "bg-[#123B50] text-white shadow-2xs"
                            : "text-[#263746] hover:bg-[#E9F5F3]"
                        }`}
                      >
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#159A91]" />
                        <span>Objectives ({mod.objectives.length})</span>
                      </button>

                      {mod.formulas && mod.formulas.length > 0 && (
                        <button
                          onClick={() => setUnitTab(mod.id, "formulas")}
                          className={`px-3 py-1.5 rounded-lg font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                            currentTab === "formulas"
                              ? "bg-[#123B50] text-white shadow-2xs"
                              : "text-[#263746] hover:bg-[#E9F5F3]"
                          }`}
                        >
                          <Flame className="w-3.5 h-3.5 text-[#F2B66D]" />
                          <span>Equations ({mod.formulas.length})</span>
                        </button>
                      )}

                      {mod.clinicalRanges && mod.clinicalRanges.length > 0 && (
                        <button
                          onClick={() => setUnitTab(mod.id, "ranges")}
                          className={`px-3 py-1.5 rounded-lg font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                            currentTab === "ranges"
                              ? "bg-[#123B50] text-white shadow-2xs"
                              : "text-[#263746] hover:bg-[#E9F5F3]"
                          }`}
                        >
                          <Stethoscope className="w-3.5 h-3.5 text-[#159A91]" />
                          <span>Clinical Ranges</span>
                        </button>
                      )}

                      {mod.memoryHook && (
                        <button
                          onClick={() => setUnitTab(mod.id, "hook")}
                          className={`px-3 py-1.5 rounded-lg font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                            currentTab === "hook"
                              ? "bg-[#123B50] text-white shadow-2xs"
                              : "text-[#263746] hover:bg-[#E9F5F3]"
                          }`}
                        >
                          <Lightbulb className="w-3.5 h-3.5 text-[#F2B66D]" />
                          <span>Exam Hook</span>
                        </button>
                      )}
                    </div>
                  </div>

                  {/* Tabbed Content Body */}
                  <div className="p-5 sm:p-6 bg-neutral-50/40">
                    {/* TAB: Scientific Non-AI Medical Vector Diagrams */}
                    {currentTab === "diagram" && (
                      <div className="animate-in fade-in duration-200">
                        {mod.unitNumber === 1 && <CarbohydrateDiagram />}
                        {mod.unitNumber === 2 && <LipidDiagram />}
                        {mod.unitNumber === 3 && <ProteinDiagram />}
                        {mod.unitNumber === 4 && <EnzymeDiagram />}
                        {mod.unitNumber === 5 && <AcidBaseDiagram />}
                        {mod.unitNumber === 6 && <HemeDiagram />}
                        {mod.unitNumber === 7 && <ImmunologyDiagram />}
                      </div>
                    )}

                    {/* TAB: Interactive Simulator */}
                    {currentTab === "simulator" && (
                      <div className="animate-in fade-in duration-200">
                        {mod.unitNumber === 1 && <GlucoseHomeostasisSimulator />}
                        {mod.unitNumber === 4 && <CardiacBiomarkerTimeline />}
                        {mod.unitNumber === 5 && <ABGDiagnosticCalculator />}
                        {mod.unitNumber === 7 && <InteractiveAntibodyDiagram />}
                        {[2, 3, 6].includes(mod.unitNumber) && (
                          <ClinicalCaseChallenge unitNumber={mod.unitNumber} />
                        )}
                      </div>
                    )}

                    {/* TAB: Structured Lessons Grid with Interactive Completion */}
                    {currentTab === "lessons" && (
                      <div>
                        <div className="flex items-center justify-between text-xs text-neutral-500 mb-3 px-1">
                          <span>Click any lesson to read notes. Use the checkbox to track completion.</span>
                          <span className="font-semibold text-green-700">
                            {unitCompletedCount} of {mod.topics.length} completed
                          </span>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                          {mod.topics.map((t, idx) => {
                            const isDone = !!completedLessons[t.route];

                            return (
                              <div
                                key={idx}
                                className={`p-3 rounded-xl bg-white border transition-all flex items-center justify-between group shadow-2xs hover:shadow-xs ${
                                  isDone
                                    ? "border-[#159A91]/50 bg-[#E9F5F3]/30"
                                    : "border-slate-200 hover:border-[#159A91] hover:bg-[#E9F5F3]/20"
                                }`}
                              >
                                <Link
                                  to={t.route}
                                  className="flex items-center gap-2.5 truncate mr-2 flex-1 cursor-pointer min-w-0"
                                >
                                  <span className={`w-6 h-6 rounded-lg text-[11px] font-bold flex items-center justify-center shrink-0 transition-colors ${
                                    isDone
                                      ? "bg-[#159A91] text-white"
                                      : "bg-slate-100 group-hover:bg-[#E9F5F3] text-slate-700 group-hover:text-[#123B50]"
                                  }`}>
                                    {isDone ? "✓" : idx + 1}
                                  </span>
                                  <span className={`text-xs font-semibold truncate ${
                                    isDone ? "text-[#123B50]" : "text-slate-800 group-hover:text-[#123B50]"
                                  }`}>
                                    {t.label}
                                  </span>
                                </Link>

                                {/* Interactive Completion Checkbox */}
                                <button
                                  type="button"
                                  onClick={(e) => {
                                    e.preventDefault();
                                    e.stopPropagation();
                                    toggleLessonComplete(t.route);
                                  }}
                                  title={isDone ? "Mark as Incomplete" : "Mark as Completed"}
                                  className={`w-6 h-6 rounded-lg border flex items-center justify-center shrink-0 transition-all cursor-pointer ${
                                    isDone
                                      ? "bg-[#159A91] border-[#159A91] text-white"
                                      : "border-slate-300 hover:border-[#159A91] bg-slate-50 hover:bg-[#E9F5F3] text-transparent hover:text-[#159A91]"
                                  }`}
                                >
                                  <Check className="w-3.5 h-3.5 stroke-[3]" />
                                </button>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    )}

                    {/* TAB: Learning Objectives */}
                    {currentTab === "objectives" && (
                      <div className="space-y-2">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs">
                          {mod.objectives.map((obj, i) => (
                            <div
                              key={i}
                              className="flex items-start gap-2.5 bg-white p-3 rounded-xl border border-neutral-200/80 shadow-2xs"
                            >
                              <span className="w-5 h-5 rounded-md bg-green-100 text-green-700 flex items-center justify-center font-bold text-[10px] shrink-0 mt-0.5">
                                {i + 1}
                              </span>
                              <span className="text-neutral-700 leading-relaxed font-medium">
                                {obj}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* TAB: Bioenergetic Formulas */}
                    {currentTab === "formulas" && (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {mod.formulas?.map((form, i) => (
                          <div
                            key={i}
                            className="bg-white p-4 rounded-xl border border-neutral-200 shadow-2xs"
                          >
                            <p className="text-xs font-bold text-neutral-900 mb-1.5 flex items-center gap-1.5">
                              <Flame className="w-3.5 h-3.5 text-neutral-800" />
                              <span>{form.name}</span>
                            </p>
                            <code className="block bg-neutral-50 p-2.5 rounded-lg border border-neutral-200/70 font-mono text-[11px] text-green-700 font-semibold leading-relaxed break-words">
                              {form.formula}
                            </code>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* TAB: Diagnostic Ranges Table */}
                    {currentTab === "ranges" && (
                      <div className="overflow-x-auto bg-white rounded-xl border border-neutral-200 shadow-2xs">
                        <table className="w-full text-left text-xs">
                          <thead className="bg-neutral-50 text-[10px] font-extrabold uppercase tracking-wider text-neutral-500 border-b border-neutral-200">
                            <tr>
                              <th className="px-4 py-3">Diagnostic Parameter</th>
                              <th className="px-4 py-3 text-green-700">Normal Range</th>
                              <th className="px-4 py-3 text-neutral-800">Borderline / Pre-state</th>
                              <th className="px-4 py-3 text-black dark:text-white">Clinical Alert Threshold</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-neutral-100 font-medium text-neutral-700">
                            {mod.clinicalRanges?.map((cr, i) => (
                              <tr key={i} className="hover:bg-neutral-50/50">
                                <td className="px-4 py-2.5 font-bold text-neutral-900">{cr.parameter}</td>
                                <td className="px-4 py-2.5 text-green-700 font-semibold">{cr.normal}</td>
                                <td className="px-4 py-2.5 text-neutral-800">{cr.prediabetes}</td>
                                <td className="px-4 py-2.5 text-black dark:text-white font-bold">{cr.diabetes}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    )}

                    {/* TAB: Exam Memory Hook */}
                    {currentTab === "hook" && (
                      <div className="bg-neutral-100/80 border border-neutral-300 p-4 rounded-xl flex items-start gap-3">
                        <span className="text-xl shrink-0">💡</span>
                        <div>
                          <p className="text-xs font-bold text-neutral-800 uppercase tracking-wide">
                            High-Yield Clinical Memory Aid
                          </p>
                          <p className="text-xs text-neutral-800 font-medium mt-1 leading-relaxed">
                            {mod.memoryHook}
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Bottom Banner: Clean Comprehensive Exam Callout */}
        <div className="mt-10 bg-white text-neutral-900 rounded-2xl p-6 sm:p-8 border border-neutral-200 shadow-sm flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full bg-green-50 text-green-700 text-[11px] font-bold border border-green-200 mb-2">
              <Award className="w-3.5 h-3.5" />
              <span>Full Curriculum Mastery Benchmark</span>
            </div>
            <h3 className="text-lg sm:text-xl font-bold text-neutral-900">
              Ready for the 40-Question Comprehensive Final Exam?
            </h3>
            <p className="text-xs sm:text-sm text-neutral-600 mt-1 max-w-2xl leading-relaxed">
              Synthesizes all 7 units: Carbohydrates, Lipids, Proteins, Clinical Enzymology, Acid-Base Balance, Heme Catabolism, and Immunochemistry with personalized weak-area study plans.
            </p>
          </div>

          <Link
            to="/student/quiz/comprehensive-final"
            className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-[#159A91] hover:bg-[#12837b] text-white font-extrabold text-xs shadow-sm transition-all hover:scale-102 shrink-0"
          >
            <span>Start Grand Final Assessment</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default BioChemistrySyllabus;
