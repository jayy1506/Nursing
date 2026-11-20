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
    <div className="min-h-screen bg-neutral-50 text-neutral-900 antialiased selection:bg-green-500 selection:text-white pb-24">
      {/* Top Breadcrumb & Curriculum Switcher Bar */}
      <div className="bg-white border-b border-neutral-200 text-neutral-700 py-2.5 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2">
            <Link
              to="/syllabus"
              className="text-neutral-500 hover:text-green-600 font-medium inline-flex items-center gap-1 transition-colors"
            >
              <ArrowRight className="w-3.5 h-3.5 rotate-180" />
              <span>Syllabus Hub</span>
            </Link>
            <span className="text-neutral-300">/</span>
            <span className="text-green-700 font-bold">Applied Anatomy (ANAT 105)</span>
          </div>

          <div className="flex items-center gap-1.5 flex-wrap">
            <span className="text-neutral-400 text-[11px] hidden sm:inline font-semibold">Tracks:</span>
            <span className="px-2.5 py-1 rounded-lg bg-green-50 text-green-700 font-extrabold text-[11px] border border-green-200">
              🦴 Anatomy (10 Units)
            </span>
            <Link
              to="/physiology-syllabus"
              className="px-2.5 py-1 rounded-lg bg-neutral-100 hover:bg-neutral-200 text-neutral-700 font-medium text-[11px] transition-colors"
            >
              ⚡ Physiology
            </Link>
            <Link
              to="/bio-chem-syllabus"
              className="px-2.5 py-1 rounded-lg bg-neutral-100 hover:bg-neutral-200 text-neutral-700 font-medium text-[11px] transition-colors"
            >
              🧬 Biochemistry
            </Link>
            <Link
              to="/nutrition-syllabus"
              className="px-2.5 py-1 rounded-lg bg-neutral-100 hover:bg-neutral-200 text-neutral-700 font-medium text-[11px] transition-colors"
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
                  ACCREDITED ACADEMIC NOTES · ANAT 105
                </span>
                <span className="inline-flex items-center gap-1 px-3 py-1 rounded-md bg-[#F2B66D]/20 border border-[#F2B66D]/40 text-[#F2B66D] text-xs font-bold">
                  ✨ Concept → Example → Application
                </span>
              </div>

              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight leading-tight">
                Applied Human Anatomy: Complete Study Notes
              </h1>
              <p className="text-slate-300 text-sm mt-2 leading-relaxed max-w-2xl font-normal">
                Explore macroscopic and microscopic human morphology across 10 INC CBME units. Master osteology, visceral organ relations, muscular attachments, sensory innervation, and clinical landmarks.
              </p>

              {/* Action Buttons */}
              <div className="mt-5 flex flex-wrap items-center gap-3">
                <Link
                  to="/anatomy/lesson/anatomy-unit-1"
                  className="bg-[#159A91] hover:bg-[#12837b] text-white font-bold px-5 py-2.5 rounded-lg flex items-center gap-2 text-sm shadow-md transition-all active:scale-95"
                >
                  <BookOpen className="w-4 h-4" />
                  <span>Start Chapter 1: Introduction to Anatomy →</span>
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
                  {totalImages} Labeled HD Plates
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
              <span>10 Curriculum Units (Applied Anatomy)</span>
            </span>
            <Link
              to="/question-bank"
              className="px-3.5 py-1.5 rounded-lg text-xs font-semibold bg-white text-[#263746] hover:bg-[#E9F5F3] border border-slate-200 transition-colors flex items-center gap-1.5 shadow-2xs"
            >
              <FileText className="w-3.5 h-3.5 text-[#159A91]" />
              <span>Anatomy Question Bank</span>
            </Link>
          </div>

          <Link
            to="/student/quiz/anatomy-grand-final"
            className="px-4 py-1.5 rounded-lg text-xs font-bold bg-[#123B50] hover:bg-[#159A91] text-white shadow-xs transition-colors flex items-center gap-1.5 border border-[#1e4e66]"
          >
            <Award className="w-3.5 h-3.5 text-[#F2B66D]" />
            <span>Final Capstone Assessment (40 MCQs)</span>
          </Link>
        </div>

          {/* Search & Category Filter */}
          <div className="mt-8 pt-6 border-t border-neutral-100 flex flex-col md:flex-row gap-4 items-stretch md:items-center justify-between">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
              <input
                type="text"
                placeholder="Search bones, cranial nerves, thoracic organs, muscle attachments..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 text-xs rounded-xl border border-neutral-300 bg-white text-neutral-900 placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-600 shadow-2xs transition-all"
              />
            </div>

            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs">
              <span className="text-neutral-400 text-[11px] font-semibold mr-1 shrink-0">System:</span>
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                    selectedCategory === cat
                      ? "bg-green-600 text-white shadow-xs font-bold"
                      : "bg-white hover:bg-neutral-100 text-neutral-700 border border-neutral-200 shadow-2xs"
                  }`}
                >
                  {cat === "all" ? "All Systems (12)" : cat}
                </button>
              ))}
            </div>
          </div>
        </div>

      {/* Main Units List */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
        {/* Grand Final Mixed Assessment Gating Card with Live Auto-Updating Completion */}
        <div
          className={`p-6 sm:p-7 rounded-3xl border mb-8 transition-all ${
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
                Applied Anatomy Comprehensive Grand Final Examination
              </h3>

              <p className="text-xs sm:text-sm max-w-2xl leading-relaxed text-neutral-600">
                {gating.isFinalUnlocked
                  ? "Congratulations! You have mastered all 10 units. Take the 40-question cumulative mixed examination covering the entire INC Semester I syllabus."
                  : `Gated under INC competency standards. Complete each of the 10 individual unit assessment quizzes or mark chapters studied with ≥ 75% score to unlock this final examination. Remaining: ${gating.remainingCount} modules.`}
              </p>

              {/* Live Animated Progress Meter */}
              <div className="w-full max-w-md bg-neutral-100 rounded-full h-2.5 overflow-hidden pt-0.5">
                <div
                  className={`h-2.5 rounded-full transition-all duration-500 ${
                    gating.isFinalUnlocked
                      ? "bg-green-500"
                      : "bg-gradient-to-r from-neutral-900 to-neutral-800 to-green-500"
                  }`}
                  style={{ width: `${gating.completionPercent}%` }}
                />
              </div>
            </div>

            <div className="shrink-0">
              {gating.isFinalUnlocked ? (
                <Link
                  to="/quiz/anatomy-grand-final"
                  className="px-6 py-3.5 rounded-2xl bg-[#159A91] hover:bg-[#123B50] text-white font-black text-xs sm:text-sm shadow-md transition-all inline-flex items-center gap-2"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>Start Grand Final Exam →</span>
                </Link>
              ) : (
                <Link
                  to="/quiz/anatomy-grand-final"
                  className="px-5 py-3 rounded-2xl bg-neutral-100 hover:bg-neutral-200 text-neutral-700 border border-neutral-200 font-bold text-xs inline-flex items-center gap-2 transition-colors cursor-pointer"
                >
                  <Lock className="w-4 h-4 text-neutral-800" />
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
                className="bg-white rounded-2xl border border-neutral-200 shadow-sm hover:shadow-md transition-shadow overflow-hidden"
              >
                {/* Unit Header */}
                <div className="p-6 border-b border-neutral-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-green-600 to-green-500 text-white flex items-center justify-center text-2xl shadow-sm shrink-0">
                      {unit.icon}
                    </div>
                    <div>
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="px-2.5 py-0.5 rounded-full bg-green-50 text-green-700 font-extrabold text-[11px] border border-green-200">
                          Unit {unit.unitNumber} &bull; Semester I
                        </span>
                        <span className="text-xs font-semibold text-neutral-500">
                          {unit.category}
                        </span>

                        {/* Automatic Real-Time Completion Status Indicator */}
                        {completed ? (
                          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-green-50 text-green-700 border border-green-300">
                            <CheckCircle2 className="w-3.5 h-3.5 text-green-600" />
                            <span>Completed &bull; Mastered</span>
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-neutral-100 text-neutral-600 border border-neutral-200">
                            <span>Not Completed</span>
                          </span>
                        )}
                      </div>

                      <h2 className="text-xl font-extrabold text-neutral-900 mt-1">
                        {unit.title}
                      </h2>
                      <p className="text-xs text-neutral-600 mt-1 max-w-3xl leading-relaxed">
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
                          ? "bg-neutral-100 text-neutral-700 hover:bg-neutral-200 border border-neutral-300"
                          : "bg-[#E9F5F3] hover:bg-[#159A91] hover:text-white text-[#123B50] border border-[#159A91]/30 shadow-2xs group"
                      }`}
                      title="Click to toggle chapter completion and update Grand Final standing"
                    >
                      <CheckCircle2
                        className={`w-3.5 h-3.5 ${
                          completed ? "text-[#159A91]" : "text-neutral-400 group-hover:text-white"
                        }`}
                      />
                      <span>{completed ? "Mark Incomplete" : "Mark as Studied"}</span>
                    </button>

                    <Link
                      to={`/quiz/${unit.id}`}
                      className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#E9F5F3] hover:bg-[#159A91] hover:text-white text-[#123B50] font-extrabold text-xs border border-[#159A91]/30 shadow-2xs transition-all cursor-pointer group"
                      title="Take Chapter Assessment Quiz (auto-completes on pass ≥ 75%)"
                    >
                      <ClipboardList className="w-3.5 h-3.5 text-[#159A91] group-hover:text-white" />
                      <span>Take Quiz</span>
                    </Link>

                    <Link
                      to={`/anatomy/lesson/${unit.id}`}
                      className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#159A91] hover:bg-[#123B50] text-white font-extrabold text-xs shadow-sm hover:shadow transition-all active:scale-[0.98] cursor-pointer"
                    >
                      <span>Study Chapter</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>

                {/* Tab Navigation inside Card */}
                <div className="px-6 bg-neutral-50/80 border-b border-neutral-200 flex items-center gap-2 overflow-x-auto text-xs font-bold text-neutral-600">
                  <button
                    onClick={() => setUnitTab(unit.id, "sections")}
                    className={`py-3 px-3 border-b-2 transition-all cursor-pointer flex items-center gap-1.5 ${
                      activeTab === "sections"
                        ? "border-green-600 text-green-700 font-extrabold"
                        : "border-transparent hover:text-neutral-900"
                    }`}
                  >
                    <Layers className="w-3.5 h-3.5" />
                    <span>Key Sections ({unit.topics.length})</span>
                  </button>

                  <button
                    onClick={() => setUnitTab(unit.id, "objectives")}
                    className={`py-3 px-3 border-b-2 transition-all cursor-pointer flex items-center gap-1.5 ${
                      activeTab === "objectives"
                        ? "border-green-600 text-green-700 font-extrabold"
                        : "border-transparent hover:text-neutral-900"
                    }`}
                  >
                    <Award className="w-3.5 h-3.5" />
                    <span>INC CBME Outcomes ({unit.objectives.length})</span>
                  </button>

                  <button
                    onClick={() => setUnitTab(unit.id, "questions")}
                    className={`py-3 px-3 border-b-2 transition-all cursor-pointer flex items-center gap-1.5 ${
                      activeTab === "questions"
                        ? "border-green-600 text-green-700 font-extrabold"
                        : "border-transparent hover:text-neutral-900"
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
                      <h4 className="text-xs font-bold text-neutral-400 uppercase tracking-wider mb-3">
                        Anatomical Plates & Core Visceral Modules
                      </h4>
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                        {unit.topics.map((t, idx) => (
                          <Link
                            key={idx}
                            to={t.route}
                            className="p-3.5 rounded-xl border border-neutral-200 hover:border-green-400 bg-white hover:bg-green-50/30 shadow-2xs transition-all group flex items-center justify-between"
                          >
                            <span className="text-xs font-bold text-neutral-800 group-hover:text-green-700">
                              {t.label}
                            </span>
                            <ChevronRight className="w-4 h-4 text-neutral-400 group-hover:text-green-600 group-hover:translate-x-0.5 transition-all shrink-0 ml-2" />
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}

                  {activeTab === "objectives" && (
                    <div className="space-y-2.5">
                      <h4 className="text-xs font-bold text-neutral-400 uppercase tracking-wider mb-2">
                        INC Competencies & Anatomical Dissection Objectives
                      </h4>
                      {unit.objectives.map((obj, idx) => (
                        <div
                          key={idx}
                          className="flex items-start gap-2.5 text-xs text-neutral-700 bg-neutral-50 p-3 rounded-xl border border-neutral-200"
                        >
                          <CheckCircle2 className="w-4 h-4 text-green-600 shrink-0 mt-0.5" />
                          <span className="leading-relaxed">{obj}</span>
                        </div>
                      ))}
                    </div>
                  )}

                  {activeTab === "questions" && (
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <h4 className="text-xs font-bold text-neutral-400 uppercase tracking-wider">
                          Official University Question Bank
                        </h4>
                        <Link
                          to="/question-bank"
                          className="text-xs font-bold text-green-700 hover:underline flex items-center gap-1"
                        >
                          <span>Open Complete Question Bank</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </Link>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div className="p-4 rounded-xl border border-green-200 bg-green-50/50 flex items-center justify-between">
                          <div>
                            <div className="text-xl font-black text-green-900">{unit.totalMcqs}</div>
                            <div className="text-xs font-semibold text-green-700">
                              CBME Multiple Choice Questions
                            </div>
                          </div>
                          <Link
                            to={`/quiz/${unit.id}`}
                            className="px-3.5 py-2 rounded-lg bg-[#159A91] hover:bg-[#123B50] text-white font-bold text-xs shadow-2xs transition-colors"
                          >
                            Take Quiz
                          </Link>
                        </div>

                        <div className="p-4 rounded-xl border border-neutral-200 bg-neutral-50 flex items-center justify-between">
                          <div>
                            <div className="text-xl font-black text-neutral-800">
                              {unit.totalSubjective}
                            </div>
                            <div className="text-xs font-semibold text-green-700">
                              University Exam Questions
                            </div>
                          </div>
                          <Link
                            to="/question-bank"
                            className="px-3.5 py-2 rounded-lg bg-white hover:bg-neutral-100 text-neutral-800 border border-neutral-300 font-bold text-xs shadow-2xs"
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
