import React, { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import { ANATOMY_UNITS } from "../constants/anatomyData";
import { getStudentGatingStatus } from "../services/assessmentEngine";
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
  Eye,
  Award,
  Image as ImageIcon,
  HelpCircle,
  FileText,
  Lock,
  Unlock,
  ShieldAlert,
  TrendingUp
} from "lucide-react";

export const AnatomySyllabus = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [unitActiveTabs, setUnitActiveTabs] = useState({});
  const [previewImage, setPreviewImage] = useState(null);

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
    <div className="min-h-screen bg-slate-50 text-slate-800 antialiased selection:bg-teal-500 selection:text-white pb-24">
      <Navbar />

      {/* Top Breadcrumb & Switcher Bar */}
      <div className="bg-slate-900 border-b border-slate-800 text-slate-300 py-2.5 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2">
            <Link
              to="/syllabus"
              className="text-slate-400 hover:text-teal-400 font-medium inline-flex items-center gap-1 transition-colors"
            >
              <ArrowRight className="w-3.5 h-3.5 rotate-180" />
              <span>Syllabus Hub</span>
            </Link>
            <span className="text-slate-600">/</span>
            <span className="text-teal-400 font-semibold">Applied Anatomy (ANAT 105)</span>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-slate-500 text-[11px] hidden sm:inline">Curriculum Tracks:</span>
            <span className="px-2.5 py-1 rounded-md bg-teal-500/20 text-teal-300 font-bold text-[11px] border border-teal-500/30">
              🦴 Applied Anatomy (12 Units)
            </span>
            <Link
              to="/physiology-syllabus"
              className="px-2.5 py-1 rounded-md bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white font-medium text-[11px] transition-colors"
            >
              ⚡ Applied Physiology
            </Link>
            <Link
              to="/bio-chem-syllabus"
              className="px-2.5 py-1 rounded-md bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white font-medium text-[11px] transition-colors"
            >
              🧬 Biochemistry
            </Link>
            <Link
              to="/nutrition-syllabus"
              className="px-2.5 py-1 rounded-md bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white font-medium text-[11px] transition-colors"
            >
              🥗 Nutrition
            </Link>
          </div>
        </div>
      </div>

      {/* Hero Header */}
      <section className="bg-white border-b border-slate-200/80 px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div className="max-w-3xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-50 text-teal-800 text-xs font-bold border border-teal-200 mb-3">
                <Sparkles className="w-3.5 h-3.5 text-teal-600" />
                <span>INC Standardized Syllabus • Course Code: ANAT 105 • Semester I</span>
              </div>
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-900 tracking-tight">
                Applied Human Anatomy
              </h1>
              <p className="text-slate-600 text-sm mt-2 leading-relaxed max-w-2xl">
                Master gross and microscopic human architecture, directional terminology, anatomical planes, organ relationships, and clinical alterations with high-definition diagrams, histopathology plates, and university question banks.
              </p>

              {/* KPI Strip */}
              <div className="mt-5 flex flex-wrap items-center gap-3 text-xs">
                <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-teal-50 border border-teal-200 text-teal-900 font-bold">
                  <BookOpen className="w-4 h-4 text-teal-600" />
                  <span>12 Core Textbook Chapters</span>
                </div>
                <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-900 font-bold">
                  <ImageIcon className="w-4 h-4 text-emerald-600" />
                  <span>{totalImages} High-Definition Anatomical Plates</span>
                </div>
                <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-amber-50 border border-amber-200 text-amber-900 font-bold">
                  <HelpCircle className="w-4 h-4 text-amber-600" />
                  <span>{totalMcqs} CBME MCQs</span>
                </div>
                <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-purple-50 border border-purple-200 text-purple-900 font-bold">
                  <FileText className="w-4 h-4 text-purple-600" />
                  <span>{totalSubjective} University Exam Questions</span>
                </div>
              </div>
            </div>

            {/* Quick Action Box */}
            <div className="flex flex-col sm:flex-row lg:flex-col gap-2.5 shrink-0">
              <Link
                to="/anatomy/lesson/anatomy-unit-1"
                className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-extrabold text-xs shadow-md shadow-teal-500/25 transition-all cursor-pointer"
              >
                <span>Start Chapter 1: Introduction</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                to="/question-bank"
                className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs border border-slate-300 transition-all cursor-pointer"
              >
                <ClipboardList className="w-4 h-4 text-slate-600" />
                <span>Practice Anatomy Question Bank</span>
              </Link>
            </div>
          </div>

          {/* Search & Category Filter Toolbar */}
          <div className="mt-8 pt-6 border-t border-slate-100 flex flex-col md:flex-row gap-4 items-stretch md:items-center justify-between">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                placeholder="Search anatomy topics, bones, muscles, viscera, or nerves..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 text-xs rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-all"
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
                      ? "bg-teal-600 text-white shadow-sm"
                      : "bg-slate-100 text-slate-600 hover:bg-slate-200"
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
        {/* Grand Final Mixed Assessment Gating Card */}
        {(() => {
          const gating = getStudentGatingStatus('anatomy');
          return (
            <div className={`p-6 sm:p-7 rounded-3xl border mb-8 transition-all ${
              gating.isFinalUnlocked
                ? 'bg-gradient-to-r from-teal-500/10 via-emerald-50 to-white border-teal-300 shadow-sm'
                : 'bg-gradient-to-r from-slate-900 via-slate-800 to-teal-950 text-white border-slate-700 shadow-lg'
            }`}>
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider ${
                      gating.isFinalUnlocked
                        ? 'bg-teal-100 text-teal-800 border border-teal-300'
                        : 'bg-slate-700/80 text-amber-300 border border-slate-600'
                    }`}>
                      {gating.isFinalUnlocked ? <Unlock className="w-3.5 h-3.5" /> : <Lock className="w-3.5 h-3.5 text-amber-400" />}
                      <span>{gating.isFinalUnlocked ? 'Grand Final Unlocked (100% Completed)' : 'Cumulative Final Exam Gated'}</span>
                    </span>
                    <span className={`text-xs font-bold ${gating.isFinalUnlocked ? 'text-slate-500' : 'text-slate-300'}`}>
                      {gating.completedCount} of 12 Modules Mastered ({gating.completionPercent}%)
                    </span>
                  </div>

                  <h3 className={`text-xl sm:text-2xl font-black tracking-tight ${gating.isFinalUnlocked ? 'text-slate-900' : 'text-white'}`}>
                    Applied Anatomy Comprehensive Grand Final Examination
                  </h3>

                  <p className={`text-xs sm:text-sm max-w-2xl leading-relaxed ${gating.isFinalUnlocked ? 'text-slate-600' : 'text-slate-300'}`}>
                    {gating.isFinalUnlocked
                      ? 'Congratulations! You have passed all 12 units. Take the 48-question cumulative mixed examination covering the entire INC Semester I syllabus.'
                      : `Gated under INC competency standards. Pass each of the 12 individual unit assessment quizzes with ≥ 75% score to unlock this final examination. Remaining: ${gating.remainingCount} modules.`}
                  </p>

                  <div className="w-full max-w-md bg-white/20 rounded-full h-2.5 overflow-hidden pt-0.5">
                    <div
                      className={`h-2.5 rounded-full transition-all duration-500 ${
                        gating.isFinalUnlocked ? 'bg-teal-500' : 'bg-gradient-to-r from-amber-400 to-teal-400'
                      }`}
                      style={{ width: `${gating.completionPercent}%` }}
                    />
                  </div>
                </div>

                <div className="shrink-0">
                  {gating.isFinalUnlocked ? (
                    <Link
                      to="/quiz/anatomy-grand-final"
                      className="px-6 py-3.5 rounded-2xl bg-teal-600 hover:bg-teal-700 text-white font-black text-xs sm:text-sm shadow-md transition-all inline-flex items-center gap-2"
                    >
                      <Sparkles className="w-4 h-4" />
                      <span>Start Grand Final Exam →</span>
                    </Link>
                  ) : (
                    <Link
                      to="/quiz/anatomy-grand-final"
                      className="px-5 py-3 rounded-2xl bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-600 font-bold text-xs inline-flex items-center gap-2 transition-colors cursor-pointer"
                    >
                      <Lock className="w-4 h-4 text-amber-400" />
                      <span>View Final Status (Locked)</span>
                    </Link>
                  )}
                </div>
              </div>
            </div>
          );
        })()}

        <div className="space-y-6">
          {filteredUnits.map((unit) => {
            const activeTab = getUnitTab(unit.id);
            return (
              <div
                key={unit.id}
                className="bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow overflow-hidden"
              >
                {/* Unit Header */}
                <div className="p-6 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-teal-500 to-emerald-600 text-white flex items-center justify-center text-2xl shadow-sm shrink-0">
                      {unit.icon}
                    </div>
                    <div>
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="px-2.5 py-0.5 rounded-full bg-teal-50 text-teal-800 font-extrabold text-[11px] border border-teal-200">
                          Unit {unit.unitNumber} • Semester I
                        </span>
                        <span className="text-xs font-semibold text-slate-400">
                          {unit.category}
                        </span>
                      </div>
                      <h2 className="text-xl font-extrabold text-slate-900 mt-1">
                        {unit.title}
                      </h2>
                      <p className="text-xs text-slate-600 mt-1 max-w-3xl leading-relaxed">
                        {unit.summary}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 self-start sm:self-center shrink-0">
                    <Link
                      to={`/quiz/${unit.id}`}
                      className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-800 font-extrabold text-xs border border-emerald-200 shadow-xs transition-all cursor-pointer"
                      title="Take Chapter Assessment Quiz"
                    >
                      <ClipboardList className="w-3.5 h-3.5 text-emerald-600" />
                      <span>Take Quiz</span>
                    </Link>
                    <Link
                      to={`/anatomy/lesson/${unit.id}`}
                      className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-extrabold text-xs shadow-sm shadow-teal-500/20 transition-all cursor-pointer"
                    >
                      <span>Study Chapter</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>

                {/* Tab Navigation inside Card */}
                <div className="px-6 bg-slate-50 border-b border-slate-100 flex items-center gap-2 overflow-x-auto text-xs font-bold text-slate-600">
                  <button
                    onClick={() => setUnitTab(unit.id, "sections")}
                    className={`py-3 px-3 border-b-2 transition-all cursor-pointer flex items-center gap-1.5 ${
                      activeTab === "sections"
                        ? "border-teal-600 text-teal-700 font-extrabold"
                        : "border-transparent hover:text-slate-900"
                    }`}
                  >
                    <Layers className="w-3.5 h-3.5" />
                    <span>Key Sections ({unit.topics.length})</span>
                  </button>

                  <button
                    onClick={() => setUnitTab(unit.id, "objectives")}
                    className={`py-3 px-3 border-b-2 transition-all cursor-pointer flex items-center gap-1.5 ${
                      activeTab === "objectives"
                        ? "border-teal-600 text-teal-700 font-extrabold"
                        : "border-transparent hover:text-slate-900"
                    }`}
                  >
                    <Award className="w-3.5 h-3.5" />
                    <span>INC CBME Outcomes ({unit.objectives.length})</span>
                  </button>

                  <button
                    onClick={() => setUnitTab(unit.id, "questions")}
                    className={`py-3 px-3 border-b-2 transition-all cursor-pointer flex items-center gap-1.5 ${
                      activeTab === "questions"
                        ? "border-teal-600 text-teal-700 font-extrabold"
                        : "border-transparent hover:text-slate-900"
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
                      <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">
                        Chapter Sub-topics & Structural Modules
                      </h4>
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                        {unit.topics.map((t, idx) => (
                          <Link
                            key={idx}
                            to={t.route}
                            className="p-3.5 rounded-xl border border-slate-200/80 hover:border-teal-400 bg-slate-50/50 hover:bg-teal-50/30 transition-all group flex items-center justify-between"
                          >
                            <span className="text-xs font-bold text-slate-800 group-hover:text-teal-800">
                              {t.label}
                            </span>
                            <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-teal-600 group-hover:translate-x-0.5 transition-all shrink-0 ml-2" />
                          </Link>
                        ))}
                      </div>

                      <div className="mt-4 pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                        <span className="flex items-center gap-1.5">
                          <ImageIcon className="w-4 h-4 text-teal-600" />
                          <span>Includes <strong>{unit.totalImages}</strong> labeled anatomical diagrams & micrographs</span>
                        </span>
                        <Link
                          to={`/anatomy/lesson/${unit.id}`}
                          className="font-bold text-teal-700 hover:text-teal-800 flex items-center gap-1"
                        >
                          <span>Open full chapter reader</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </Link>
                      </div>
                    </div>
                  )}

                  {activeTab === "objectives" && (
                    <div className="space-y-2.5">
                      <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
                        Official INC Competencies & Specific Learning Objectives
                      </h4>
                      {unit.objectives.map((obj, i) => (
                        <div key={i} className="flex items-start gap-2.5 text-xs text-slate-700">
                          <CheckCircle2 className="w-4 h-4 text-teal-600 shrink-0 mt-0.5" />
                          <span className="leading-relaxed">{obj}</span>
                        </div>
                      ))}
                    </div>
                  )}

                  {activeTab === "questions" && (
                    <div>
                      <div className="flex items-center justify-between mb-3">
                        <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                          Official University Examination Questions Bank
                        </h4>
                        <Link
                          to={`/anatomy/lesson/${unit.id}?tab=quiz`}
                          className="text-xs font-extrabold text-teal-600 hover:text-teal-700 underline"
                        >
                          Launch Unit Quiz ({unit.totalMcqs} Questions) →
                        </Link>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                        <div className="p-4 rounded-xl bg-teal-50/50 border border-teal-200">
                          <span className="font-extrabold text-teal-900 block mb-1">
                            CBME Multiple Choice Questions (MCQs)
                          </span>
                          <p className="text-slate-600 text-[11px] mb-3">
                            {unit.totalMcqs} verified clinical & recall MCQs aligned with INC Semester I guidelines.
                          </p>
                          <Link
                            to={`/anatomy/lesson/${unit.id}?tab=quiz`}
                            className="inline-flex items-center gap-1.5 font-bold text-teal-700 hover:text-teal-800"
                          >
                            <span>Practice MCQs</span>
                            <ArrowRight className="w-3 h-3" />
                          </Link>
                        </div>

                        <div className="p-4 rounded-xl bg-purple-50/50 border border-purple-200">
                          <span className="font-extrabold text-purple-900 block mb-1">
                            University Exam Subjective Questions
                          </span>
                          <p className="text-slate-600 text-[11px] mb-3">
                            {unit.totalSubjective} questions with mark weightage (2 Marks Very Short, 5 Marks Short Notes, 10 Marks Long Essay).
                          </p>
                          <Link
                            to={`/anatomy/lesson/${unit.id}?tab=subjective`}
                            className="inline-flex items-center gap-1.5 font-bold text-purple-700 hover:text-purple-800"
                          >
                            <span>View University Questions</span>
                            <ArrowRight className="w-3 h-3" />
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

      {/* Image Zoom Modal */}
      {previewImage && (
        <div
          className="fixed inset-0 z-50 bg-slate-900/80 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setPreviewImage(null)}
        >
          <div
            className="bg-white rounded-2xl max-w-4xl max-h-[90vh] overflow-hidden shadow-2xl p-4 flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <span className="text-xs font-bold text-slate-700">{previewImage.caption}</span>
              <button
                onClick={() => setPreviewImage(null)}
                className="text-xs font-bold text-slate-400 hover:text-slate-600 px-2 py-1 rounded-md"
              >
                ✕ Close
              </button>
            </div>
            <div className="flex-1 overflow-auto p-2 flex items-center justify-center">
              <img
                src={previewImage.src}
                alt={previewImage.caption}
                className="max-h-[75vh] w-auto object-contain rounded-lg shadow-sm"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AnatomySyllabus;
