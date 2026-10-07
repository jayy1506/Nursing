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
  Zap
} from "lucide-react";

export const BioChemistrySyllabus = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedUnitId, setSelectedUnitId] = useState("all");
  // Per-unit active tab state: 'simulator' | 'lessons' | 'objectives' | 'formulas' | 'ranges' | 'hook'
  const [unitActiveTabs, setUnitActiveTabs] = useState({});

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
    <div className="min-h-screen bg-slate-50 text-slate-800 antialiased selection:bg-emerald-500 selection:text-white pb-24">
      <Navbar />

      {/* Top Breadcrumb & Switcher Bar */}
      <div className="bg-slate-900 border-b border-slate-800 text-slate-300 py-2.5 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2">
            <Link
              to="/"
              className="text-slate-400 hover:text-emerald-400 font-medium inline-flex items-center gap-1 transition-colors"
            >
              <ArrowRight className="w-3.5 h-3.5 rotate-180" />
              <span>Home</span>
            </Link>
            <span className="text-slate-600">/</span>
            <span className="text-emerald-400 font-semibold">Biochemistry Curriculum</span>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-slate-500 text-[11px] hidden sm:inline">Curriculum:</span>
            <span className="px-2.5 py-1 rounded-md bg-emerald-500/20 text-emerald-300 font-bold text-[11px] border border-emerald-500/30">
              🧬 Biochemistry (7 Units)
            </span>
            <Link
              to="/nutrition-syllabus"
              className="px-2.5 py-1 rounded-md bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white font-medium text-[11px] transition-colors"
            >
              🥗 Nutrition & Dietetics
            </Link>
          </div>
        </div>
      </div>

      {/* Clean, Non-Cluttered Hero Section */}
      <section className="bg-white border-b border-slate-200/80 px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div className="max-w-3xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-bold border border-emerald-200 mb-3">
                <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
                <span>INC Standardized Syllabus • Interactive Learning</span>
              </div>
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-900 tracking-tight">
                Biochemistry & Clinical Homeostasis
              </h1>
              <p className="text-slate-600 text-sm mt-2 leading-relaxed max-w-2xl">
                Explore metabolic pathways with interactive non-AI physiological simulators, real-time diagnostic calculators, vector molecular models, and clinical case challenges.
              </p>

              {/* Minimal KPI Metric Strip & Live Completion */}
              <div className="mt-5 flex flex-wrap items-center gap-2 sm:gap-3 text-xs font-semibold text-slate-600">
                <div className="flex items-center gap-1.5 bg-slate-100 px-3 py-1.5 rounded-lg border border-slate-200">
                  <Layers className="w-3.5 h-3.5 text-emerald-600" />
                  <span>7 Units</span>
                </div>
                <div className="flex items-center gap-1.5 bg-slate-100 px-3 py-1.5 rounded-lg border border-slate-200">
                  <BookOpen className="w-3.5 h-3.5 text-sky-600" />
                  <span>{totalLessonsCount} Lessons</span>
                </div>
                <div className="flex items-center gap-1.5 bg-slate-100 px-3 py-1.5 rounded-lg border border-slate-200">
                  <Sliders className="w-3.5 h-3.5 text-purple-600" />
                  <span>Interactive Simulators</span>
                </div>

                {/* Live Progress Bar Widget */}
                <div className="flex items-center gap-2 bg-emerald-50 text-emerald-800 px-3 py-1.5 rounded-lg border border-emerald-200">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  <span>
                    Mastery: {totalCompletedCount}/{totalLessonsCount} ({curriculumProgressPct}%)
                  </span>
                  <div className="w-16 h-2 bg-emerald-200 rounded-full overflow-hidden ml-1">
                    <div
                      className="h-full bg-emerald-600 transition-all duration-300"
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
                className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs shadow-sm transition-all hover:-translate-y-0.5"
              >
                <BookOpen className="w-3.5 h-3.5 text-emerald-400" />
                <span>Question Bank (Short & Long)</span>
              </Link>
              <Link
                to="/student/quiz/comprehensive-final"
                className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-bold text-xs shadow-sm shadow-emerald-600/20 transition-all hover:-translate-y-0.5"
              >
                <Award className="w-3.5 h-3.5 text-emerald-100" />
                <span>Grand Final Assessment (40 Qs)</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Main Interactive Workspace */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 sm:pt-8">
        {/* Clean Filter & Unit Segmented Selector */}
        <div className="bg-white rounded-2xl border border-slate-200 p-3 sm:p-4 shadow-xs mb-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-3">
            {/* Search Input */}
            <div className="relative w-full md:w-80">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search topics, enzymes, ranges..."
                className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2 pl-9 pr-3 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:border-emerald-500 focus:bg-white transition-all font-medium"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-slate-600 font-bold"
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
                    ? "bg-emerald-600 text-white shadow-xs"
                    : "bg-slate-100 text-slate-600 hover:bg-slate-200 hover:text-slate-800"
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
                      ? "bg-slate-900 text-white shadow-xs"
                      : "bg-slate-100 text-slate-600 hover:bg-slate-200 hover:text-slate-800"
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
          <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center max-w-md mx-auto my-8">
            <Search className="w-10 h-10 text-slate-300 mx-auto mb-3" />
            <h3 className="text-sm font-bold text-slate-800">No matching topics found</h3>
            <p className="text-xs text-slate-500 mt-1">
              Try searching with another keyword or reset the filter.
            </p>
            <button
              onClick={() => { setSearchQuery(""); setSelectedUnitId("all"); }}
              className="mt-4 px-4 py-2 rounded-xl bg-slate-900 text-white text-xs font-bold hover:bg-slate-800"
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

              return (
                <div
                  key={mod.id}
                  id={mod.id}
                  className="bg-white rounded-2xl border border-slate-200 shadow-xs hover:border-slate-300 transition-all overflow-hidden"
                >
                  {/* Unit Top Header */}
                  <div className="p-5 sm:p-6 border-b border-slate-100 bg-gradient-to-r from-white to-slate-50/50">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                      <div className="flex items-start sm:items-center gap-3.5">
                        <div className="w-11 h-11 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-700 flex items-center justify-center text-xl shadow-2xs shrink-0">
                          {mod.icon}
                        </div>
                        <div>
                          <div className="flex items-center gap-2 mb-0.5">
                            <span className={`px-2 py-0.5 rounded-md text-[10px] font-extrabold uppercase tracking-wide border ${mod.badgeColor}`}>
                              Unit {mod.unitNumber}
                            </span>
                            <span className="text-[11px] font-semibold text-slate-500">
                              {mod.category}
                            </span>
                            {/* Per-Unit Progress Badge */}
                            <span className="text-[10px] font-bold text-slate-400 bg-slate-100 px-2 py-0.5 rounded-md">
                              {unitCompletedCount}/{mod.topics.length} done ({unitPct}%)
                            </span>
                          </div>
                          <h2 className="text-base sm:text-lg font-bold text-slate-900">
                            {mod.title}
                          </h2>
                          <p className="text-xs text-slate-500 mt-0.5 line-clamp-1">
                            {mod.summary}
                          </p>
                        </div>
                      </div>

                      {/* Quick Quiz Shortcut Button */}
                      <Link
                        to={`/student/quiz/${mod.quizSlug}`}
                        className="self-start sm:self-center inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-200/80 font-bold text-xs transition-colors shrink-0"
                      >
                        <ClipboardList className="w-3.5 h-3.5 text-emerald-600" />
                        <span>Take Unit Quiz (15 Qs)</span>
                        <ArrowRight className="w-3 h-3 text-emerald-500" />
                      </Link>
                    </div>

                    {/* Segmented Sub-Tabs */}
                    <div className="mt-5 flex items-center gap-1.5 overflow-x-auto border-t border-slate-100 pt-3 scrollbar-none text-xs">
                      <button
                        onClick={() => setUnitTab(mod.id, "lessons")}
                        className={`px-3 py-1.5 rounded-lg font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                          currentTab === "lessons"
                            ? "bg-slate-900 text-white shadow-2xs"
                            : "text-slate-600 hover:bg-slate-100"
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
                            ? "bg-sky-600 text-white shadow-2xs"
                            : "text-sky-700 bg-sky-50 hover:bg-sky-100 border border-sky-200/70"
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
                            ? "bg-emerald-600 text-white shadow-2xs"
                            : "text-emerald-700 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200/70"
                        }`}
                      >
                        <Zap className="w-3.5 h-3.5 text-amber-400" />
                        <span>{getSimulatorLabel(mod.unitNumber)}</span>
                      </button>

                      <button
                        onClick={() => setUnitTab(mod.id, "objectives")}
                        className={`px-3 py-1.5 rounded-lg font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                          currentTab === "objectives"
                            ? "bg-slate-900 text-white shadow-2xs"
                            : "text-slate-600 hover:bg-slate-100"
                        }`}
                      >
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                        <span>Objectives ({mod.objectives.length})</span>
                      </button>

                      {mod.formulas && mod.formulas.length > 0 && (
                        <button
                          onClick={() => setUnitTab(mod.id, "formulas")}
                          className={`px-3 py-1.5 rounded-lg font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                            currentTab === "formulas"
                              ? "bg-slate-900 text-white shadow-2xs"
                              : "text-slate-600 hover:bg-slate-100"
                          }`}
                        >
                          <Flame className="w-3.5 h-3.5 text-amber-500" />
                          <span>Equations ({mod.formulas.length})</span>
                        </button>
                      )}

                      {mod.clinicalRanges && mod.clinicalRanges.length > 0 && (
                        <button
                          onClick={() => setUnitTab(mod.id, "ranges")}
                          className={`px-3 py-1.5 rounded-lg font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                            currentTab === "ranges"
                              ? "bg-slate-900 text-white shadow-2xs"
                              : "text-slate-600 hover:bg-slate-100"
                          }`}
                        >
                          <Stethoscope className="w-3.5 h-3.5 text-sky-500" />
                          <span>Clinical Ranges</span>
                        </button>
                      )}

                      {mod.memoryHook && (
                        <button
                          onClick={() => setUnitTab(mod.id, "hook")}
                          className={`px-3 py-1.5 rounded-lg font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                            currentTab === "hook"
                              ? "bg-slate-900 text-white shadow-2xs"
                              : "text-slate-600 hover:bg-slate-100"
                          }`}
                        >
                          <Lightbulb className="w-3.5 h-3.5 text-amber-500" />
                          <span>Exam Hook</span>
                        </button>
                      )}
                    </div>
                  </div>

                  {/* Tabbed Content Body */}
                  <div className="p-5 sm:p-6 bg-slate-50/40">
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
                        <div className="flex items-center justify-between text-xs text-slate-500 mb-3 px-1">
                          <span>Click any lesson to read notes. Use the checkbox to track completion.</span>
                          <span className="font-semibold text-emerald-700">
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
                                    ? "border-emerald-300 bg-emerald-50/20"
                                    : "border-slate-200/90 hover:border-emerald-400"
                                }`}
                              >
                                <Link
                                  to={t.route}
                                  className="flex items-center gap-2.5 truncate mr-2 flex-1 cursor-pointer"
                                >
                                  <span className={`w-6 h-6 rounded-lg text-[11px] font-bold flex items-center justify-center shrink-0 transition-colors ${
                                    isDone
                                      ? "bg-emerald-600 text-white"
                                      : "bg-slate-100 group-hover:bg-emerald-100 text-slate-600 group-hover:text-emerald-800"
                                  }`}>
                                    {isDone ? "✓" : idx + 1}
                                  </span>
                                  <span className={`text-xs font-semibold truncate ${
                                    isDone ? "text-emerald-950" : "text-slate-800 group-hover:text-emerald-800"
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
                                      ? "bg-emerald-600 border-emerald-600 text-white"
                                      : "border-slate-300 hover:border-emerald-500 bg-slate-50 hover:bg-emerald-50 text-transparent hover:text-emerald-600"
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
                              className="flex items-start gap-2.5 bg-white p-3 rounded-xl border border-slate-200/80 shadow-2xs"
                            >
                              <span className="w-5 h-5 rounded-md bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold text-[10px] shrink-0 mt-0.5">
                                {i + 1}
                              </span>
                              <span className="text-slate-700 leading-relaxed font-medium">
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
                            className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs"
                          >
                            <p className="text-xs font-bold text-slate-900 mb-1.5 flex items-center gap-1.5">
                              <Flame className="w-3.5 h-3.5 text-amber-500" />
                              <span>{form.name}</span>
                            </p>
                            <code className="block bg-slate-50 p-2.5 rounded-lg border border-slate-200/70 font-mono text-[11px] text-emerald-800 font-semibold leading-relaxed break-words">
                              {form.formula}
                            </code>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* TAB: Diagnostic Ranges Table */}
                    {currentTab === "ranges" && (
                      <div className="overflow-x-auto bg-white rounded-xl border border-slate-200 shadow-2xs">
                        <table className="w-full text-left text-xs">
                          <thead className="bg-slate-50 text-[10px] font-extrabold uppercase tracking-wider text-slate-500 border-b border-slate-200">
                            <tr>
                              <th className="px-4 py-3">Diagnostic Parameter</th>
                              <th className="px-4 py-3 text-emerald-700">Normal Range</th>
                              <th className="px-4 py-3 text-amber-700">Borderline / Pre-state</th>
                              <th className="px-4 py-3 text-rose-700">Clinical Alert Threshold</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
                            {mod.clinicalRanges?.map((cr, i) => (
                              <tr key={i} className="hover:bg-slate-50/50">
                                <td className="px-4 py-2.5 font-bold text-slate-900">{cr.parameter}</td>
                                <td className="px-4 py-2.5 text-emerald-700 font-semibold">{cr.normal}</td>
                                <td className="px-4 py-2.5 text-amber-700">{cr.prediabetes}</td>
                                <td className="px-4 py-2.5 text-rose-700 font-bold">{cr.diabetes}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    )}

                    {/* TAB: Exam Memory Hook */}
                    {currentTab === "hook" && (
                      <div className="bg-amber-50/80 border border-amber-200 p-4 rounded-xl flex items-start gap-3">
                        <span className="text-xl shrink-0">💡</span>
                        <div>
                          <p className="text-xs font-bold text-amber-900 uppercase tracking-wide">
                            High-Yield Clinical Memory Aid
                          </p>
                          <p className="text-xs text-amber-800 font-medium mt-1 leading-relaxed">
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
        <div className="mt-10 bg-slate-900 text-white rounded-2xl p-6 sm:p-8 border border-slate-800 flex flex-col md:flex-row items-center justify-between gap-6 shadow-sm">
          <div>
            <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 text-[11px] font-bold mb-2">
              <Award className="w-3.5 h-3.5" />
              <span>Full Curriculum Mastery Benchmark</span>
            </div>
            <h3 className="text-lg sm:text-xl font-bold">
              Ready for the 40-Question Comprehensive Final Exam?
            </h3>
            <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-2xl leading-relaxed">
              Synthesizes all 7 units: Carbohydrates, Lipids, Proteins, Clinical Enzymology, Acid-Base Balance, Heme Catabolism, and Immunochemistry with personalized weak-area study plans.
            </p>
          </div>

          <Link
            to="/student/quiz/comprehensive-final"
            className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs shadow-sm transition-all hover:scale-102 shrink-0"
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
