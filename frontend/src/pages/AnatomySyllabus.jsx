import React, { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { ANATOMY_UNITS } from "../constants/anatomyData";
import { useCurriculumProgress } from "../services/curriculumProgress";
import {
  BookOpen,
  ClipboardList,
  Sparkles,
  ChevronRight,
  Search,
  CheckCircle2,
  Stethoscope,
  ArrowRight,
  Layers,
  Award,
  Image as ImageIcon,
  HelpCircle,
  FileText,
  Lock,
  Unlock,
  ShieldCheck,
  Activity
} from "lucide-react";

export const AnatomySyllabus = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [unitActiveTabs, setUnitActiveTabs] = useState({});

  // Real-time automatic curriculum progress & gating
  const { gating, isCompleted, toggleCompletion } = useCurriculumProgress('anatomy');

  const categories = useMemo(() => {
    const cats = new Set(ANATOMY_UNITS.map((u) => u.category));
    return ["all", ...Array.from(cats)];
  }, []);

  const setUnitTab = (unitId, tab) => {
    setUnitActiveTabs((prev) => ({ ...prev, [unitId]: tab }));
  };

  const getUnitTab = (unitId) => unitActiveTabs[unitId] || "sections";

  const filteredUnits = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    return ANATOMY_UNITS.filter((unit) => {
      const matchesCat = selectedCategory === "all" || unit.category === selectedCategory;
      if (!matchesCat) return false;
      if (!query) return true;

      return (
        unit.title.toLowerCase().includes(query) ||
        unit.category.toLowerCase().includes(query) ||
        unit.summary.toLowerCase().includes(query) ||
        unit.topics.some((t) => t.label.toLowerCase().includes(query)) ||
        unit.objectives.some((o) => o.toLowerCase().includes(query))
      );
    });
  }, [searchQuery, selectedCategory]);

  const totalImages = useMemo(() => ANATOMY_UNITS.reduce((sum, u) => sum + (u.totalImages || 0), 0), []);
  const totalMcqs = useMemo(() => ANATOMY_UNITS.reduce((sum, u) => sum + (u.totalMcqs || 0), 0), []);
  const totalSubjective = useMemo(() => ANATOMY_UNITS.reduce((sum, u) => sum + (u.totalSubjective || 0), 0), []);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 antialiased selection:bg-teal-500 selection:text-white pb-24 transition-colors">
      {/* Top Breadcrumb & Curriculum Switcher Bar in Calm Clinical Nursing Scrub Palette */}
      <div className="bg-white dark:bg-slate-900 border-b border-slate-200/80 dark:border-slate-800 text-slate-700 dark:text-slate-300 py-2.5 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2">
            <Link
              to="/syllabus"
              className="text-slate-500 dark:text-slate-400 hover:text-teal-600 dark:hover:text-teal-400 font-medium inline-flex items-center gap-1 transition-colors"
            >
              <ArrowRight className="w-3.5 h-3.5 rotate-180" />
              <span>Syllabus Hub</span>
            </Link>
            <span className="text-slate-300 dark:text-slate-700">/</span>
            <span className="text-teal-700 dark:text-teal-400 font-bold">Applied Anatomy (ANAT 105)</span>
          </div>

          <div className="flex items-center gap-1.5 flex-wrap">
            <span className="text-slate-400 text-[11px] hidden sm:inline font-semibold">Tracks:</span>
            <span className="px-2.5 py-1 rounded-lg bg-teal-50 dark:bg-teal-950/60 text-teal-800 dark:text-teal-200 font-extrabold text-[11px] border border-teal-200 dark:border-teal-800">
              🦴 Anatomy (12 Units)
            </span>
            <Link
              to="/physiology-syllabus"
              className="px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-750 text-slate-700 dark:text-slate-300 font-medium text-[11px] transition-colors"
            >
              ⚡ Physiology
            </Link>
            <Link
              to="/bio-chem-syllabus"
              className="px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-750 text-slate-700 dark:text-slate-300 font-medium text-[11px] transition-colors"
            >
              🧬 Biochemistry
            </Link>
            <Link
              to="/nutrition-syllabus"
              className="px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-750 text-slate-700 dark:text-slate-300 font-medium text-[11px] transition-colors"
            >
              🥗 Nutrition
            </Link>
          </div>
        </div>
      </div>

      {/* Hero Header */}
      <section className="bg-white dark:bg-slate-900 border-b border-slate-200/80 dark:border-slate-800 px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div className="max-w-3xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-50 dark:bg-teal-950/60 text-teal-800 dark:text-teal-300 text-xs font-bold border border-teal-200 dark:border-teal-800 mb-3">
                <Sparkles className="w-3.5 h-3.5 text-teal-600 dark:text-teal-400" />
                <span>INC Standardized Syllabus &bull; Course Code: ANAT 105 &bull; Semester I</span>
              </div>
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-900 dark:text-slate-100 tracking-tight">
                Applied Human Anatomy
              </h1>
              <p className="text-slate-600 dark:text-slate-400 text-xs sm:text-sm mt-2 leading-relaxed">
                Explore macroscopic and microscopic human morphology across 12 INC CBME units. Master osteology,
                visceral organ relations, muscular attachments, sensory innervation, and clinical landmarks.
              </p>

              {/* Badges Overview */}
              <div className="flex flex-wrap items-center gap-2 mt-4 text-xs">
                <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-teal-50 dark:bg-teal-950/40 border border-teal-200 dark:border-teal-800 text-teal-900 dark:text-teal-200 font-bold">
                  <Activity className="w-4 h-4 text-teal-600 dark:text-teal-400" />
                  <span>12 Core Functional Units</span>
                </div>
                <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-sky-50 dark:bg-sky-950/40 border border-sky-200 dark:border-sky-800 text-sky-900 dark:text-sky-200 font-bold">
                  <ImageIcon className="w-4 h-4 text-sky-600 dark:text-sky-400" />
                  <span>{totalImages} Labeled HD Anatomical Plates</span>
                </div>
                <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800 text-amber-900 dark:text-amber-200 font-bold">
                  <HelpCircle className="w-4 h-4 text-amber-600 dark:text-amber-400" />
                  <span>{totalMcqs} CBME MCQs</span>
                </div>
                <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-purple-50 dark:bg-purple-950/40 border border-purple-200 dark:border-purple-800 text-purple-900 dark:text-purple-200 font-bold">
                  <FileText className="w-4 h-4 text-purple-600 dark:text-purple-400" />
                  <span>{totalSubjective} University Exam Questions</span>
                </div>
              </div>
            </div>

            {/* Quick Action Box */}
            <div className="flex flex-col sm:flex-row lg:flex-col gap-2.5 shrink-0">
              <Link
                to="/anatomy/lesson/anatomy-unit-1"
                className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-extrabold text-xs shadow-md shadow-teal-600/20 transition-all cursor-pointer"
              >
                <span>Start Chapter 1: Introduction to Anatomy</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                to="/question-bank"
                className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-750 text-slate-800 dark:text-slate-200 font-bold text-xs border border-slate-300 dark:border-slate-700 transition-all cursor-pointer"
              >
                <ClipboardList className="w-4 h-4 text-slate-600 dark:text-slate-400" />
                <span>Practice Anatomy Question Bank</span>
              </Link>
            </div>
          </div>

          {/* Search & Category Filter */}
          <div className="mt-8 pt-6 border-t border-slate-100 dark:border-slate-800 flex flex-col md:flex-row gap-4 items-stretch md:items-center justify-between">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                placeholder="Search bones, cranial nerves, thoracic organs, muscle attachments..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-slate-100 focus:bg-white dark:focus:bg-slate-900 focus:outline-none focus:ring-2 focus:ring-teal-500 transition-all"
              />
            </div>

            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs">
              <span className="text-slate-400 text-[11px] font-semibold mr-1 shrink-0">System:</span>
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                    selectedCategory === cat
                      ? "bg-teal-600 text-white shadow-xs font-bold"
                      : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-750"
                  }`}
                >
                  {cat === "all" ? "All Systems (12)" : cat}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Main Units List */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
        {/* Grand Final Mixed Assessment Gating Card with Live Auto-Updating Completion */}
        <div
          className={`p-6 sm:p-7 rounded-3xl border mb-8 transition-all ${
            gating.isFinalUnlocked
              ? "bg-gradient-to-r from-emerald-500/10 via-teal-50 to-white dark:from-emerald-950/30 dark:to-slate-900 border-emerald-300 dark:border-emerald-800 shadow-sm"
              : "bg-gradient-to-r from-slate-900 via-teal-950 to-slate-900 text-white border-teal-500/30 shadow-xl"
          }`}
        >
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="space-y-2">
              <div className="flex items-center gap-2 flex-wrap">
                <span
                  className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider ${
                    gating.isFinalUnlocked
                      ? "bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 border border-emerald-300"
                      : "bg-teal-900/80 text-teal-300 border border-teal-500/40"
                  }`}
                >
                  {gating.isFinalUnlocked ? (
                    <Unlock className="w-3.5 h-3.5" />
                  ) : (
                    <Lock className="w-3.5 h-3.5 text-amber-400" />
                  )}
                  <span>
                    {gating.isFinalUnlocked
                      ? "Grand Final Unlocked (100% Completed)"
                      : "Cumulative Final Exam Gated"}
                  </span>
                </span>
                <span
                  className={`text-xs font-bold ${
                    gating.isFinalUnlocked ? "text-slate-600 dark:text-slate-400" : "text-teal-200"
                  }`}
                >
                  {gating.completedCount} of 12 Modules Mastered ({gating.completionPercent}%)
                </span>
              </div>

              <h3
                className={`text-xl sm:text-2xl font-black tracking-tight ${
                  gating.isFinalUnlocked ? "text-slate-900 dark:text-slate-100" : "text-white"
                }`}
              >
                Applied Anatomy Comprehensive Grand Final Examination
              </h3>

              <p
                className={`text-xs sm:text-sm max-w-2xl leading-relaxed ${
                  gating.isFinalUnlocked ? "text-slate-600 dark:text-slate-400" : "text-slate-300"
                }`}
              >
                {gating.isFinalUnlocked
                  ? "Congratulations! You have mastered all 12 units. Take the 48-question cumulative mixed examination covering the entire INC Semester I syllabus."
                  : `Gated under INC competency standards. Complete each of the 12 individual unit assessment quizzes or mark chapters studied with ≥ 75% score to unlock this final examination. Remaining: ${gating.remainingCount} modules.`}
              </p>

              {/* Live Animated Progress Meter */}
              <div className="w-full max-w-md bg-white/20 dark:bg-slate-800 rounded-full h-2.5 overflow-hidden pt-0.5">
                <div
                  className={`h-2.5 rounded-full transition-all duration-500 ${
                    gating.isFinalUnlocked
                      ? "bg-emerald-500"
                      : "bg-gradient-to-r from-amber-400 via-teal-400 to-emerald-400"
                  }`}
                  style={{ width: `${gating.completionPercent}%` }}
                />
              </div>
            </div>

            <div className="shrink-0">
              {gating.isFinalUnlocked ? (
                <Link
                  to="/quiz/anatomy-grand-final"
                  className="px-6 py-3.5 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-black text-xs sm:text-sm shadow-md transition-all inline-flex items-center gap-2"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>Start Grand Final Exam →</span>
                </Link>
              ) : (
                <Link
                  to="/quiz/anatomy-grand-final"
                  className="px-5 py-3 rounded-2xl bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 font-bold text-xs inline-flex items-center gap-2 transition-colors cursor-pointer"
                >
                  <Lock className="w-4 h-4 text-amber-400" />
                  <span>View Final Status (Locked)</span>
                </Link>
              )}
            </div>
          </div>
        </div>

        {/* Units Cards with Automatic Real-Time Completion Badges & Action Toggle */}
        <div className="space-y-6">
          {filteredUnits.map((unit) => {
            const activeTab = getUnitTab(unit.id);
            const completed = isCompleted(unit.id);

            return (
              <div
                key={unit.id}
                className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-md transition-shadow overflow-hidden"
              >
                {/* Unit Header */}
                <div className="p-6 border-b border-slate-100 dark:border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-teal-500 to-sky-600 text-white flex items-center justify-center text-2xl shadow-sm shrink-0">
                      {unit.icon}
                    </div>
                    <div>
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="px-2.5 py-0.5 rounded-full bg-teal-50 dark:bg-teal-950/60 text-teal-800 dark:text-teal-300 font-extrabold text-[11px] border border-teal-200 dark:border-teal-800">
                          Unit {unit.unitNumber} &bull; Semester I
                        </span>
                        <span className="text-xs font-semibold text-slate-400">
                          {unit.category}
                        </span>

                        {/* Automatic Real-Time Completion Status Indicator */}
                        {completed ? (
                          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-800">
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                            <span>Completed &bull; Mastered</span>
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 border border-slate-200 dark:border-slate-700">
                            <span>Not Completed</span>
                          </span>
                        )}
                      </div>

                      <h2 className="text-xl font-extrabold text-slate-900 dark:text-slate-100 mt-1">
                        {unit.title}
                      </h2>
                      <p className="text-xs text-slate-600 dark:text-slate-400 mt-1 max-w-3xl leading-relaxed">
                        {unit.summary}
                      </p>
                    </div>
                  </div>

                  {/* Actions: Toggle Studied / Take Quiz / Study Chapter */}
                  <div className="flex flex-wrap items-center gap-2 self-start sm:self-center shrink-0">
                    {/* One-click automatic completion toggle */}
                    <button
                      type="button"
                      onClick={() => toggleCompletion(unit.id)}
                      className={`inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                        completed
                          ? "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700"
                          : "bg-teal-50 hover:bg-teal-100 dark:bg-teal-950/60 dark:hover:bg-teal-900/60 text-teal-800 dark:text-teal-200 border border-teal-200 dark:border-teal-800 shadow-xs"
                      }`}
                      title="Click to toggle chapter completion and update Grand Final standing"
                    >
                      <CheckCircle2
                        className={`w-3.5 h-3.5 ${
                          completed ? "text-emerald-600 dark:text-emerald-400" : "text-slate-400"
                        }`}
                      />
                      <span>{completed ? "Mark Incomplete" : "Mark as Studied"}</span>
                    </button>

                    <Link
                      to={`/quiz/${unit.id}`}
                      className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-emerald-50 hover:bg-emerald-100 dark:bg-emerald-950/50 dark:hover:bg-emerald-900/50 text-emerald-800 dark:text-emerald-200 font-extrabold text-xs border border-emerald-200 dark:border-emerald-800 shadow-xs transition-all cursor-pointer"
                      title="Take Chapter Assessment Quiz (auto-completes on pass ≥ 75%)"
                    >
                      <ClipboardList className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                      <span>Take Quiz</span>
                    </Link>

                    <Link
                      to={`/anatomy/lesson/${unit.id}`}
                      className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-extrabold text-xs shadow-xs shadow-teal-600/20 transition-all cursor-pointer"
                    >
                      <span>Study Chapter</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>

                {/* Tab Navigation inside Card */}
                <div className="px-6 bg-slate-50 dark:bg-slate-800/60 border-b border-slate-100 dark:border-slate-800 flex items-center gap-2 overflow-x-auto text-xs font-bold text-slate-600 dark:text-slate-400">
                  <button
                    onClick={() => setUnitTab(unit.id, "sections")}
                    className={`py-3 px-3 border-b-2 transition-all cursor-pointer flex items-center gap-1.5 ${
                      activeTab === "sections"
                        ? "border-teal-600 text-teal-700 dark:text-teal-400 font-extrabold"
                        : "border-transparent hover:text-slate-900 dark:hover:text-slate-200"
                    }`}
                  >
                    <Layers className="w-3.5 h-3.5" />
                    <span>Key Sections ({unit.topics.length})</span>
                  </button>

                  <button
                    onClick={() => setUnitTab(unit.id, "objectives")}
                    className={`py-3 px-3 border-b-2 transition-all cursor-pointer flex items-center gap-1.5 ${
                      activeTab === "objectives"
                        ? "border-teal-600 text-teal-700 dark:text-teal-400 font-extrabold"
                        : "border-transparent hover:text-slate-900 dark:hover:text-slate-200"
                    }`}
                  >
                    <Award className="w-3.5 h-3.5" />
                    <span>INC CBME Outcomes ({unit.objectives.length})</span>
                  </button>

                  <button
                    onClick={() => setUnitTab(unit.id, "questions")}
                    className={`py-3 px-3 border-b-2 transition-all cursor-pointer flex items-center gap-1.5 ${
                      activeTab === "questions"
                        ? "border-teal-600 text-teal-700 dark:text-teal-400 font-extrabold"
                        : "border-transparent hover:text-slate-900 dark:hover:text-slate-200"
                    }`}
                  >
                    <HelpCircle className="w-3.5 h-3.5" />
                    <span>Exam Q&A ({unit.totalMcqs} MCQs + {unit.totalSubjective} Subj)</span>
                  </button>
                </div>

                {/* Tab Content */}
                <div className="p-6">
                  {activeTab === "sections" && (
                    <div>
                      <h4 className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-3">
                        Anatomical Plates & Core Visceral Modules
                      </h4>
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                        {unit.topics.map((t, idx) => (
                          <Link
                            key={idx}
                            to={t.route}
                            className="p-3.5 rounded-xl border border-slate-200/80 dark:border-slate-800 hover:border-teal-400 dark:hover:border-teal-600 bg-slate-50/50 dark:bg-slate-800/40 hover:bg-teal-50/30 dark:hover:bg-teal-950/20 transition-all group flex items-center justify-between"
                          >
                            <span className="text-xs font-bold text-slate-800 dark:text-slate-200 group-hover:text-teal-800 dark:group-hover:text-teal-300">
                              {t.label}
                            </span>
                            <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-teal-600 group-hover:translate-x-0.5 transition-all shrink-0 ml-2" />
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}

                  {activeTab === "objectives" && (
                    <div className="space-y-2.5">
                      <h4 className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-2">
                        INC Competencies & Anatomical Dissection Objectives
                      </h4>
                      {unit.objectives.map((obj, idx) => (
                        <div
                          key={idx}
                          className="flex items-start gap-2.5 text-xs text-slate-700 dark:text-slate-300 bg-slate-50 dark:bg-slate-800/40 p-3 rounded-xl border border-slate-100 dark:border-slate-800"
                        >
                          <CheckCircle2 className="w-4 h-4 text-teal-600 dark:text-teal-400 shrink-0 mt-0.5" />
                          <span className="leading-relaxed">{obj}</span>
                        </div>
                      ))}
                    </div>
                  )}

                  {activeTab === "questions" && (
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <h4 className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider">
                          Official University Question Bank
                        </h4>
                        <Link
                          to="/question-bank"
                          className="text-xs font-bold text-teal-700 dark:text-teal-400 hover:underline flex items-center gap-1"
                        >
                          <span>Open Complete Question Bank</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </Link>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div className="p-4 rounded-xl border border-teal-200/80 dark:border-teal-800/80 bg-teal-50/40 dark:bg-teal-950/20 flex items-center justify-between">
                          <div>
                            <div className="text-xl font-black text-teal-900 dark:text-teal-200">{unit.totalMcqs}</div>
                            <div className="text-xs font-semibold text-teal-700 dark:text-teal-300">
                              CBME Multiple Choice Questions
                            </div>
                          </div>
                          <Link
                            to={`/quiz/${unit.id}`}
                            className="px-3.5 py-2 rounded-lg bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs"
                          >
                            Take Quiz
                          </Link>
                        </div>

                        <div className="p-4 rounded-xl border border-purple-200/80 dark:border-purple-800/80 bg-purple-50/40 dark:bg-purple-950/20 flex items-center justify-between">
                          <div>
                            <div className="text-xl font-black text-purple-900 dark:text-purple-200">
                              {unit.totalSubjective}
                            </div>
                            <div className="text-xs font-semibold text-purple-700 dark:text-purple-300">
                              University Exam Questions
                            </div>
                          </div>
                          <Link
                            to="/question-bank"
                            className="px-3.5 py-2 rounded-lg bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs"
                          >
                            View Bank
                          </Link>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </main>
    </div>
  );
};

export default AnatomySyllabus;
