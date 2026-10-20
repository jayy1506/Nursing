import React, { useState, useMemo, useEffect } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
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

  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-neutral-950 text-neutral-800 dark:text-neutral-100 antialiased selection:bg-green-500 selection:text-white pb-24 transition-colors">
      <Navbar />

      {/* Top Breadcrumb & Switcher Bar in Calm Clinical Nursing Scrub Palette */}
      <div className="bg-white dark:bg-neutral-900 border-b border-neutral-200/80 dark:border-neutral-800 text-neutral-700 dark:text-neutral-300 py-2.5 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2">
            <Link
              to="/syllabus"
              className="text-neutral-500 dark:text-neutral-400 hover:text-green-500 dark:hover:text-green-400 font-medium inline-flex items-center gap-1 transition-colors"
            >
              <ArrowRight className="w-3.5 h-3.5 rotate-180" />
              <span>Syllabus Hub</span>
            </Link>
            <span className="text-neutral-300 dark:text-neutral-700">/</span>
            <span className="text-green-700 dark:text-green-400 font-bold">Biochemistry Curriculum (7 Units)</span>
          </div>

          <div className="flex items-center gap-1.5 flex-wrap">
            <span className="text-neutral-400 text-[11px] hidden sm:inline font-semibold">Tracks:</span>
            <Link
              to="/anatomy-syllabus"
              className="px-2.5 py-1 rounded-lg bg-neutral-100 hover:bg-neutral-200 dark:bg-neutral-800 dark:hover:bg-neutral-750 text-neutral-700 dark:text-neutral-300 font-medium text-[11px] transition-colors"
            >
              🦴 Anatomy
            </Link>
            <Link
              to="/physiology-syllabus"
              className="px-2.5 py-1 rounded-lg bg-neutral-100 hover:bg-neutral-200 dark:bg-neutral-800 dark:hover:bg-neutral-750 text-neutral-700 dark:text-neutral-300 font-medium text-[11px] transition-colors"
            >
              ⚡ Physiology
            </Link>
            <span className="px-2.5 py-1 rounded-lg bg-green-50 dark:bg-green-900/60 text-green-700 dark:text-green-100 font-extrabold text-[11px] border border-green-100 dark:border-green-700">
              🧬 Biochemistry (7 Units)
            </span>
            <Link
              to="/nutrition-syllabus"
              className="px-2.5 py-1 rounded-lg bg-neutral-100 hover:bg-neutral-200 dark:bg-neutral-800 dark:hover:bg-neutral-750 text-neutral-700 dark:text-neutral-300 font-medium text-[11px] transition-colors"
            >
              🥗 Nutrition
            </Link>
          </div>
        </div>
      </div>

      {/* Clean, Non-Cluttered Hero Section */}
      <section className="bg-white border-b border-neutral-200/80 px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div className="max-w-3xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-green-50 text-green-700 text-xs font-bold border border-green-100 mb-3">
                <Sparkles className="w-3.5 h-3.5 text-green-500" />
                <span>INC Standardized Syllabus • Interactive Learning</span>
              </div>
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-neutral-900 tracking-tight">
                Biochemistry & Clinical Homeostasis
              </h1>
              <p className="text-neutral-600 text-sm mt-2 leading-relaxed max-w-2xl">
                Explore metabolic pathways with interactive non-AI physiological simulators, real-time diagnostic calculators, vector molecular models, and clinical case challenges.
              </p>

              {/* Minimal KPI Metric Strip & Live Completion */}
              <div className="mt-5 flex flex-wrap items-center gap-2 sm:gap-3 text-xs font-semibold text-neutral-600">
                <div className="flex items-center gap-1.5 bg-neutral-100 px-3 py-1.5 rounded-lg border border-neutral-200">
                  <Layers className="w-3.5 h-3.5 text-green-500" />
                  <span>7 Units</span>
                </div>
                <div className="flex items-center gap-1.5 bg-neutral-100 px-3 py-1.5 rounded-lg border border-neutral-200">
                  <BookOpen className="w-3.5 h-3.5 text-green-700" />
                  <span>{totalLessonsCount} Lessons</span>
                </div>
                <div className="flex items-center gap-1.5 bg-neutral-100 px-3 py-1.5 rounded-lg border border-neutral-200">
                  <Sliders className="w-3.5 h-3.5 text-green-700" />
                  <span>Interactive Simulators</span>
                </div>

                {/* Live Progress Bar Widget */}
                <div className="flex items-center gap-2 bg-green-50 text-green-700 px-3 py-1.5 rounded-lg border border-green-100">
                  <CheckCircle2 className="w-3.5 h-3.5 text-green-500" />
                  <span>
                    Mastery: {totalCompletedCount}/{totalLessonsCount} ({curriculumProgressPct}%)
                  </span>
                  <div className="w-16 h-2 bg-green-100 rounded-full overflow-hidden ml-1">
                    <div
                      className="h-full bg-green-500 transition-all duration-300"
                      style={{ width: `${curriculumProgressPct}%` }}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Action Chips */}
            <div className="flex flex-row lg:flex-col gap-2.5 shrink-0 self-start lg:self-center">
              <Link
                to="/question-bank"
                className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-neutral-900 hover:bg-neutral-800 text-white font-bold text-xs shadow-sm transition-all hover:-translate-y-0.5"
              >
                <BookOpen className="w-3.5 h-3.5 text-green-400" />
                <span>Question Bank (Short & Long)</span>
              </Link>
              <Link
                to="/student/quiz/comprehensive-final"
                className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-green-500 to-green-500 hover:from-green-700 hover:to-green-500 text-white font-bold text-xs shadow-sm shadow-green-500/20 transition-all hover:-translate-y-0.5"
              >
                <Award className="w-3.5 h-3.5 text-green-100" />
                <span>Grand Final Assessment (40 Qs)</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Main Interactive Workspace */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 sm:pt-8">
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
                    ? "bg-green-500 hover:bg-green-700 text-white shadow-green-500/30 cursor-pointer hover:scale-105"
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
                    ? "bg-green-500 text-white shadow-xs"
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
                      ? "bg-neutral-900 text-white shadow-xs"
                      : "bg-neutral-100 text-neutral-600 hover:bg-neutral-200 hover:text-neutral-800"
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
              className="mt-4 px-4 py-2 rounded-xl bg-neutral-900 text-white text-xs font-bold hover:bg-neutral-800"
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
                  className="bg-white dark:bg-neutral-900 rounded-2xl border border-neutral-200 dark:border-neutral-800 shadow-xs hover:border-green-400 dark:hover:border-green-700 transition-all overflow-hidden"
                >
                      {/* Unit Top Header */}
                      <div className="p-5 sm:p-6 border-b border-neutral-100 dark:border-neutral-800 bg-gradient-to-r from-white to-neutral-50/50 dark:from-neutral-900 dark:to-neutral-850">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                          <div className="flex items-start sm:items-center gap-3.5">
                            <div className="w-11 h-11 rounded-xl bg-green-50 dark:bg-green-900/60 border border-green-100 dark:border-green-700 text-green-700 dark:text-green-400 flex items-center justify-center text-xl shadow-2xs shrink-0">
                              {mod.icon}
                            </div>
                            <div>
                              <div className="flex items-center gap-2 mb-0.5 flex-wrap">
                                <span className={`px-2 py-0.5 rounded-md text-[10px] font-extrabold uppercase tracking-wide border ${mod.badgeColor}`}>
                                  Unit {mod.unitNumber}
                                </span>
                                <span className="text-[11px] font-semibold text-neutral-500 dark:text-neutral-400">
                                  {mod.category}
                                </span>
                                
                                {/* Automatic Real-Time Completion Status Indicator */}
                                {unitDone ? (
                                  <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-green-50 dark:bg-green-900/60 text-green-700 dark:text-green-400 border border-green-400 dark:border-green-700">
                                    <CheckCircle2 className="w-3 h-3 text-green-500 dark:text-green-400" />
                                    <span>Completed • Mastered</span>
                                  </span>
                                ) : (
                                  <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-semibold bg-neutral-100 dark:bg-neutral-800 text-neutral-500 dark:text-neutral-400 border border-neutral-200 dark:border-neutral-700">
                                    <span>Not Completed</span>
                                  </span>
                                )}

                                {/* Per-Unit Progress Badge */}
                                <span className="text-[10px] font-bold text-neutral-400 bg-neutral-100 dark:bg-neutral-800 px-2 py-0.5 rounded-md">
                                  {unitCompletedCount}/{mod.topics.length} done ({unitPct}%)
                                </span>
                              </div>
                              <h2 className="text-base sm:text-lg font-bold text-neutral-900 dark:text-neutral-100">
                                {mod.title}
                              </h2>
                              <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-0.5 line-clamp-1">
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
                                  ? "bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-300 hover:bg-neutral-200 dark:hover:bg-neutral-700 border border-neutral-200 dark:border-neutral-700"
                                  : "bg-green-50 hover:bg-green-100 dark:bg-green-900/60 dark:hover:bg-green-900/60 text-green-700 dark:text-green-100 border border-green-100 dark:border-green-700 shadow-xs"
                              }`}
                              title="Click to toggle chapter completion and update Grand Final standing"
                            >
                              <CheckCircle2
                                className={`w-3.5 h-3.5 ${
                                  unitDone ? "text-green-500 dark:text-green-400" : "text-neutral-400"
                                }`}
                              />
                              <span>{unitDone ? "Mark Incomplete" : "Mark as Studied"}</span>
                            </button>

                            {/* Quick Quiz Shortcut Button */}
                            <Link
                              to={`/quiz/${mod.id}`}
                              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-green-50 hover:bg-green-100 dark:bg-green-900/50 dark:hover:bg-green-900/50 text-green-700 dark:text-green-100 border border-green-100/80 dark:border-green-700 font-bold text-xs transition-colors shrink-0"
                            >
                              <ClipboardList className="w-3.5 h-3.5 text-green-500 dark:text-green-400" />
                              <span>Take Unit Quiz</span>
                              <ArrowRight className="w-3 h-3 text-green-500" />
                            </Link>
                          </div>
                        </div>

                    {/* Segmented Sub-Tabs */}
                    <div className="mt-5 flex items-center gap-1.5 overflow-x-auto border-t border-neutral-100 pt-3 scrollbar-none text-xs">
                      <button
                        onClick={() => setUnitTab(mod.id, "lessons")}
                        className={`px-3 py-1.5 rounded-lg font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                          currentTab === "lessons"
                            ? "bg-neutral-900 text-white shadow-2xs"
                            : "text-neutral-600 hover:bg-neutral-100"
                        }`}
                      >
                        <BookOpen className="w-3.5 h-3.5" />
                        <span>Lessons ({mod.topics.length})</span>
                      </button>

                      {/* Scientific Non-AI Medical Diagram Tab */}
                      <button
                        onClick={() => setUnitTab(mod.id, "diagram")}
                        className={`px-3 py-1.5 rounded-lg font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                          currentTab === "diagram"
                            ? "bg-green-500 text-white shadow-2xs"
                            : "text-green-700 bg-neutral-100 hover:bg-neutral-100 border border-neutral-300/70"
                        }`}
                      >
                        <span>🎨</span>
                        <span>Scientific Vector Diagram</span>
                      </button>

                      {/* Interactive Visual Tool Tab */}
                      <button
                        onClick={() => setUnitTab(mod.id, "simulator")}
                        className={`px-3 py-1.5 rounded-lg font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                          currentTab === "simulator"
                            ? "bg-green-500 text-white shadow-2xs"
                            : "text-green-700 bg-green-50 hover:bg-green-100 border border-green-100/70"
                        }`}
                      >
                        <Zap className="w-3.5 h-3.5 text-neutral-300" />
                        <span>{getSimulatorLabel(mod.unitNumber)}</span>
                      </button>

                      <button
                        onClick={() => setUnitTab(mod.id, "objectives")}
                        className={`px-3 py-1.5 rounded-lg font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                          currentTab === "objectives"
                            ? "bg-neutral-900 text-white shadow-2xs"
                            : "text-neutral-600 hover:bg-neutral-100"
                        }`}
                      >
                        <CheckCircle2 className="w-3.5 h-3.5 text-green-500" />
                        <span>Objectives ({mod.objectives.length})</span>
                      </button>

                      {mod.formulas && mod.formulas.length > 0 && (
                        <button
                          onClick={() => setUnitTab(mod.id, "formulas")}
                          className={`px-3 py-1.5 rounded-lg font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                            currentTab === "formulas"
                              ? "bg-neutral-900 text-white shadow-2xs"
                              : "text-neutral-600 hover:bg-neutral-100"
                          }`}
                        >
                          <Flame className="w-3.5 h-3.5 text-neutral-800" />
                          <span>Equations ({mod.formulas.length})</span>
                        </button>
                      )}

                      {mod.clinicalRanges && mod.clinicalRanges.length > 0 && (
                        <button
                          onClick={() => setUnitTab(mod.id, "ranges")}
                          className={`px-3 py-1.5 rounded-lg font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                            currentTab === "ranges"
                              ? "bg-neutral-900 text-white shadow-2xs"
                              : "text-neutral-600 hover:bg-neutral-100"
                          }`}
                        >
                          <Stethoscope className="w-3.5 h-3.5 text-green-700" />
                          <span>Clinical Ranges</span>
                        </button>
                      )}

                      {mod.memoryHook && (
                        <button
                          onClick={() => setUnitTab(mod.id, "hook")}
                          className={`px-3 py-1.5 rounded-lg font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                            currentTab === "hook"
                              ? "bg-neutral-900 text-white shadow-2xs"
                              : "text-neutral-600 hover:bg-neutral-100"
                          }`}
                        >
                          <Lightbulb className="w-3.5 h-3.5 text-neutral-800" />
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
                                className={`p-3.5 rounded-xl bg-white border transition-all flex items-center justify-between group shadow-2xs hover:shadow-sm ${
                                  isDone
                                    ? "border-green-400 bg-green-50/20"
                                    : "border-neutral-200/90 hover:border-green-400"
                                }`}
                              >
                                <Link
                                  to={t.route}
                                  className="flex items-center gap-2.5 truncate mr-2 flex-1 cursor-pointer"
                                >
                                  <span className={`w-6 h-6 rounded-lg text-[11px] font-bold flex items-center justify-center shrink-0 transition-colors ${
                                    isDone
                                      ? "bg-green-500 text-white"
                                      : "bg-neutral-100 group-hover:bg-green-100 text-neutral-600 group-hover:text-green-700"
                                  }`}>
                                    {isDone ? "✓" : idx + 1}
                                  </span>
                                  <span className={`text-xs font-semibold truncate ${
                                    isDone ? "text-green-900" : "text-neutral-800 group-hover:text-green-700"
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
                                      ? "bg-green-500 border-green-500 text-white"
                                      : "border-neutral-300 hover:border-green-500 bg-neutral-50 hover:bg-green-50 text-transparent hover:text-green-500"
                                  }`}
                                >
                                  <Check className="w-3.5 h-3.5" />
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
        <div className="mt-10 bg-neutral-900 text-white rounded-2xl p-6 sm:p-8 border border-neutral-800 flex flex-col md:flex-row items-center justify-between gap-6 shadow-sm">
          <div>
            <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full bg-green-500/20 text-green-400 text-[11px] font-bold mb-2">
              <Award className="w-3.5 h-3.5" />
              <span>Full Curriculum Mastery Benchmark</span>
            </div>
            <h3 className="text-lg sm:text-xl font-bold">
              Ready for the 40-Question Comprehensive Final Exam?
            </h3>
            <p className="text-xs sm:text-sm text-neutral-400 mt-1 max-w-2xl leading-relaxed">
              Synthesizes all 7 units: Carbohydrates, Lipids, Proteins, Clinical Enzymology, Acid-Base Balance, Heme Catabolism, and Immunochemistry with personalized weak-area study plans.
            </p>
          </div>

          <Link
            to="/student/quiz/comprehensive-final"
            className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-green-500 hover:bg-green-400 text-neutral-950 font-bold text-xs shadow-sm transition-all hover:scale-102 shrink-0"
          >
            <span>Start Grand Final Assessment</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </main>
    </div>
  );
};

export default BioChemistrySyllabus;
