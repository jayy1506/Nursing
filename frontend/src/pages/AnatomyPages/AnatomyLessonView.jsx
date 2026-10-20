import React, { useState, useEffect } from "react";
import { useParams, Link, useSearchParams, useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar";
import { ANATOMY_CHAPTERS } from "../../constants/anatomyChaptersData";
import { ANATOMY_UNITS } from "../../constants/anatomyData";
import { getDiagramExplanation } from "../../constants/diagramExplorations";
import {
  ArrowRight,
  BookOpen,
  Sparkles,
  ZoomIn,
  CheckCircle2,
  Award,
  FileText,
  HelpCircle,
  Stethoscope,
  ChevronRight,
  ChevronDown,
  ChevronUp,
  Layers,
  Eye,
  Info,
  Maximize2,
  X,
  Compass,
  Check,
  Tag,
  ClipboardList
} from "lucide-react";
import { useCurriculumProgress } from "../../services/curriculumProgress";

// Formatter to render **bold text** cleanly
const renderFormattedText = (text) => {
  if (typeof text !== "string") return text;
  const parts = text.split(/(\*\*.*?\*\*)/g);
  return parts.map((part, index) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      return (
        <strong key={index} className="font-extrabold text-slate-900 tracking-tight">
          {part.slice(2, -2)}
        </strong>
      );
    }
    return part;
  });
};

export const AnatomyLessonView = () => {
  const { chapterId } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  const chapter = ANATOMY_CHAPTERS[chapterId] || ANATOMY_CHAPTERS["anatomy-unit-1"];
  const activeTabParam = searchParams.get("tab") || "reading";
  const [activeTab, setActiveTab] = useState(activeTabParam);
  const [zoomImage, setZoomImage] = useState(null);
  const [expandedDiagrams, setExpandedDiagrams] = useState({});
  const [expandedSubjective, setExpandedSubjective] = useState({});

  // MCQ state
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [showAnswers, setShowAnswers] = useState({});

  // Real-time automatic curriculum progress
  const { isCompleted, toggleCompletion } = useCurriculumProgress('anatomy');
  const completed = isCompleted(chapter.id);

  const toggleSubjective = (id) => {
    setExpandedSubjective((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  useEffect(() => {
    const tab = searchParams.get("tab");
    if (tab) setActiveTab(tab);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [chapterId, searchParams]);

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    setSearchParams({ tab });
  };

  const toggleShowAnswer = (qId) => {
    setShowAnswers((prev) => ({ ...prev, [qId]: !prev[qId] }));
  };

  const toggleDiagramExplanation = (id) => {
    setExpandedDiagrams((prev) => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  // Previous & Next unit navigation
  const currentIndex = ANATOMY_UNITS.findIndex((u) => u.id === chapter.id);
  const prevChapter = currentIndex > 0 ? ANATOMY_UNITS[currentIndex - 1] : null;
  const nextChapter = currentIndex < ANATOMY_UNITS.length - 1 ? ANATOMY_UNITS[currentIndex + 1] : null;

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 antialiased selection:bg-teal-500 selection:text-white pb-24 font-sans transition-colors">
      <Navbar />

      {/* Top Breadcrumb Navigation in Calm Clinical Nursing Scrub Palette */}
      <div className="bg-white dark:bg-slate-900 border-b border-slate-200/80 dark:border-slate-800 text-slate-700 dark:text-slate-300 py-2.5 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2 flex-wrap">
            <Link
              to="/anatomy-syllabus"
              className="text-slate-500 dark:text-slate-400 hover:text-teal-600 dark:hover:text-teal-400 font-medium inline-flex items-center gap-1.5 transition-colors"
            >
              <ArrowRight className="w-3.5 h-3.5 rotate-180" />
              <span>Anatomy Syllabus</span>
            </Link>
            <span className="text-slate-300 dark:text-slate-700">/</span>
            <span className="text-teal-700 dark:text-teal-400 font-bold truncate max-w-[280px] sm:max-w-md">
              Unit {chapter.unitNumber}: {chapter.title}
            </span>

            {/* Live completion indicator badge */}
            {completed ? (
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-800 ml-2">
                <CheckCircle2 className="w-3 h-3 text-emerald-600 dark:text-emerald-400" />
                <span>Completed • Mastered</span>
              </span>
            ) : (
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 border border-slate-200 dark:border-slate-700 ml-2">
                <span>In Progress</span>
              </span>
            )}
          </div>

          <div className="flex items-center gap-2 text-xs font-semibold">
            {/* Quick 1-click toggle */}
            <button
              type="button"
              onClick={() => toggleCompletion(chapter.id)}
              className={`px-2.5 py-1 rounded-lg text-[11px] font-bold transition-all cursor-pointer inline-flex items-center gap-1 ${
                completed
                  ? "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 border border-slate-200"
                  : "bg-teal-50 dark:bg-teal-950 text-teal-800 dark:text-teal-200 hover:bg-teal-100 border border-teal-200 dark:border-teal-800"
              }`}
            >
              <CheckCircle2 className={`w-3 h-3 ${completed ? "text-emerald-600" : "text-slate-400"}`} />
              <span>{completed ? "Mark Incomplete" : "Mark Completed"}</span>
            </button>

            {prevChapter && (
              <Link
                to={`/anatomy/lesson/${prevChapter.id}`}
                className="px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300 transition-colors"
              >
                ← Prev Unit
              </Link>
            )}
            {nextChapter && (
              <Link
                to={`/anatomy/lesson/${nextChapter.id}`}
                className="px-2.5 py-1 rounded-lg bg-teal-600 hover:bg-teal-500 text-white transition-colors"
              >
                Next Unit →
              </Link>
            )}
          </div>
        </div>
      </div>

      {/* Hero Header */}
      <div className="bg-gradient-to-r from-slate-900 via-teal-950 to-slate-900 text-white py-10 px-4 sm:px-6 lg:px-8 border-b border-slate-800 shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-teal-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="flex flex-wrap items-center gap-2.5 mb-3">
            <span className="px-3 py-1 rounded-full text-xs font-extrabold bg-teal-500/20 text-teal-300 border border-teal-500/30 flex items-center gap-1.5">
              <span>{chapter.icon || "🧬"}</span>
              <span>Unit {chapter.unitNumber} INC CBME Syllabus</span>
            </span>
            <span className="px-3 py-1 rounded-full text-xs font-semibold bg-slate-800/80 text-slate-300 border border-slate-700/60">
              {chapter.category}
            </span>
            <span className="px-3 py-1 rounded-full text-xs font-semibold bg-emerald-950/80 text-emerald-300 border border-emerald-500/30">
              {chapter.teachingHours}
            </span>
          </div>

          <h1 className="text-2xl sm:text-4xl font-black tracking-tight text-white max-w-4xl leading-tight">
            {chapter.title}
          </h1>

          <p className="mt-3 text-slate-300 text-xs sm:text-sm max-w-3xl leading-relaxed">
            {chapter.summary}
          </p>

          {/* Quick Metrics Bar */}
          <div className="mt-6 flex flex-wrap items-center gap-4 text-xs font-semibold text-slate-300">
            <div className="flex items-center gap-1.5 bg-slate-800/80 px-3 py-1.5 rounded-xl border border-slate-700/60">
              <BookOpen className="w-4 h-4 text-teal-400" />
              <span>{chapter.sections?.length || 0} Core Topics</span>
            </div>
            <div className="flex items-center gap-1.5 bg-slate-800/80 px-3 py-1.5 rounded-xl border border-slate-700/60">
              <Layers className="w-4 h-4 text-teal-400" />
              <span>{chapter.totalImages || 0} Illustrated Plates</span>
            </div>
            <div className="flex items-center gap-1.5 bg-slate-800/80 px-3 py-1.5 rounded-xl border border-slate-700/60">
              <HelpCircle className="w-4 h-4 text-teal-400" />
              <span>{chapter.mcqs?.length || 0} Objective MCQs</span>
            </div>
            <div className="flex items-center gap-1.5 bg-slate-800/80 px-3 py-1.5 rounded-xl border border-slate-700/60">
              <FileText className="w-4 h-4 text-teal-400" />
              <span>{chapter.subjectiveQuestions?.length || 0} University Exam Questions</span>
            </div>
          </div>
        </div>
      </div>

      {/* Sticky Tab Navigation */}
      <div className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex space-x-1 sm:space-x-4">
            <button
              onClick={() => handleTabChange("reading")}
              className={`py-3.5 px-4 font-extrabold text-xs sm:text-sm border-b-2 flex items-center gap-2 transition-all cursor-pointer ${
                activeTab === "reading"
                  ? "border-teal-600 text-teal-700 bg-teal-50/50"
                  : "border-transparent text-slate-600 hover:text-slate-900 hover:bg-slate-50"
              }`}
            >
              <BookOpen className="w-4 h-4" />
              <span>Comprehensive Reading & Diagrams</span>
            </button>

            <button
              onClick={() => handleTabChange("quiz")}
              className={`py-3.5 px-4 font-extrabold text-xs sm:text-sm border-b-2 flex items-center gap-2 transition-all cursor-pointer ${
                activeTab === "quiz"
                  ? "border-teal-600 text-teal-700 bg-teal-50/50"
                  : "border-transparent text-slate-600 hover:text-slate-900 hover:bg-slate-50"
              }`}
            >
              <HelpCircle className="w-4 h-4" />
              <span>Practice MCQs ({chapter.mcqs?.length || 0})</span>
            </button>

            <button
              onClick={() => handleTabChange("university-questions")}
              className={`py-3.5 px-4 font-extrabold text-xs sm:text-sm border-b-2 flex items-center gap-2 transition-all cursor-pointer ${
                activeTab === "university-questions"
                  ? "border-teal-600 text-teal-700 bg-teal-50/50"
                  : "border-transparent text-slate-600 hover:text-slate-900 hover:bg-slate-50"
              }`}
            >
              <FileText className="w-4 h-4" />
              <span>Subjective Questions</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Left Table of Contents Sidebar */}
          <aside className="lg:col-span-1 hidden lg:block">
            <div className="sticky top-20 bg-white rounded-2xl border border-slate-200/90 p-5 shadow-sm space-y-5">
              <div>
                <span className="text-[11px] font-extrabold text-slate-400 uppercase tracking-wider block mb-2.5">
                  Unit Sections & Topics
                </span>
                <nav className="space-y-1 max-h-[60vh] overflow-y-auto pr-1 text-xs">
                  {chapter.sections?.map((sec, idx) => (
                    <a
                      key={sec.id}
                      href={`#${sec.id}`}
                      className="block px-3 py-2.5 rounded-xl text-slate-700 hover:bg-teal-50 hover:text-teal-900 font-semibold transition-all border border-transparent hover:border-teal-200/60"
                    >
                      <div className="flex items-center gap-2">
                        <span className="w-5 h-5 rounded-full bg-slate-100 text-slate-700 flex items-center justify-center text-[10px] font-black shrink-0">
                          {idx + 1}
                        </span>
                        <span className="truncate flex-1">{sec.title}</span>
                      </div>
                    </a>
                  ))}
                </nav>
              </div>

              <div className="pt-3 border-t border-slate-100 text-[11px] space-y-2">
                <div className="flex items-center justify-between text-slate-600 font-medium">
                  <span>Sections Count:</span>
                  <span className="font-bold text-teal-700">{chapter.sections?.length || 0}</span>
                </div>
                <div className="flex items-center justify-between text-slate-600 font-medium">
                  <span>Plates & Figures:</span>
                  <span className="font-bold text-teal-700">{chapter.totalImages || 0}</span>
                </div>
                <div className="flex items-center justify-between text-slate-600 font-medium">
                  <span>MCQ Practice Bank:</span>
                  <span className="font-bold text-teal-700">{chapter.mcqs?.length || 0}</span>
                </div>
                <div className="flex items-center justify-between text-slate-600 font-medium">
                  <span>University Questions:</span>
                  <span className="font-bold text-teal-700">{chapter.subjectiveQuestions?.length || 0}</span>
                </div>
              </div>

              <div className="pt-2">
                <button
                  onClick={() => handleTabChange("quiz")}
                  className="w-full py-2.5 px-3 rounded-xl bg-teal-50 hover:bg-teal-100 text-teal-800 text-xs font-bold border border-teal-200/80 transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <HelpCircle className="w-3.5 h-3.5 text-teal-600" />
                  <span>Practice Unit MCQs</span>
                </button>
              </div>
            </div>
          </aside>

          {/* Main Reading View */}
          <main className="lg:col-span-3">
            {activeTab === "reading" && (
              <div className="space-y-8">
                {/* Specific Learning Objectives Card */}
                {chapter.objectives && chapter.objectives.length > 0 && (
                  <div className="bg-gradient-to-br from-teal-50/70 via-emerald-50/40 to-white rounded-2xl border border-teal-200/90 p-5 sm:p-6 shadow-xs">
                    <h3 className="text-xs font-black text-teal-900 uppercase tracking-wider flex items-center gap-2 mb-3">
                      <Award className="w-4 h-4 text-teal-600" />
                      <span>INC CBME Specific Learning Objectives</span>
                    </h3>
                    <ul className="space-y-2.5 text-xs sm:text-sm text-slate-700">
                      {chapter.objectives.map((obj, i) => (
                        <li key={i} className="flex items-start gap-2.5">
                          <CheckCircle2 className="w-4 h-4 text-teal-600 shrink-0 mt-0.5" />
                          <span className="leading-relaxed font-medium">{renderFormattedText(obj)}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Sections Renderer */}
                {chapter.sections?.map((section, sIdx) => (
                  <section
                    key={section.id}
                    id={section.id}
                    className="bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-8 shadow-sm space-y-6 scroll-mt-24 transition-all"
                  >
                    {/* Section Title Header */}
                    <div className="border-b border-slate-100 pb-4">
                      <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full bg-teal-50 text-teal-700 text-[10px] font-extrabold uppercase tracking-wider mb-1">
                        Section {sIdx + 1} of {chapter.sections.length}
                      </div>
                      <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight mt-1">
                        {section.title}
                      </h2>
                    </div>

                    {/* Section Explanatory Paragraphs */}
                    {section.content && section.content.length > 0 && (
                      <div className="space-y-3.5 text-xs sm:text-sm text-slate-700 leading-relaxed">
                        {section.content.map((para, pIdx) => (
                          <p key={pIdx} className="leading-relaxed">
                            {renderFormattedText(para)}
                          </p>
                        ))}
                      </div>
                    )}

                    {/* Detailed Points with Clean Structured Layout Card */}
                    {section.points && section.points.length > 0 && (
                      <div className="bg-gradient-to-br from-slate-50 via-teal-50/20 to-white rounded-2xl p-5 sm:p-6 border border-slate-200/90 space-y-4 shadow-xs">
                        <div className="flex items-center justify-between border-b border-slate-200/60 pb-3">
                          <div className="flex items-center gap-2 text-teal-900 font-black text-xs uppercase tracking-wider">
                            <Sparkles className="w-4 h-4 text-teal-600" />
                            <span>Key Anatomical Concepts, Landmarks & Terminology</span>
                          </div>
                          <span className="text-[11px] font-extrabold text-teal-700 bg-teal-100/80 px-2.5 py-0.5 rounded-full">
                            {section.points.length} Core Principles
                          </span>
                        </div>

                        <div className="grid grid-cols-1 gap-3 pt-1">
                          {section.points.map((pt, ptIdx) => {
                            // Extract title if formatted with **Title:**
                            const match = pt.match(/^\*\*(.*?)\*\*:?\s*(.*)$/);
                            const title = match ? match[1] : null;
                            const description = match ? match[2] : pt;

                            return (
                              <div
                                key={ptIdx}
                                className="bg-white rounded-xl p-3.5 border border-slate-200/80 shadow-xs hover:border-teal-300 transition-all"
                              >
                                {title ? (
                                  <div>
                                    <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md bg-teal-50 border border-teal-200 text-teal-900 text-xs font-black mb-1.5">
                                      <Tag className="w-3 h-3 text-teal-600" />
                                      <span>{title}</span>
                                    </div>
                                    <p className="text-xs sm:text-sm text-slate-700 leading-relaxed pl-1">
                                      {renderFormattedText(description)}
                                    </p>
                                  </div>
                                ) : (
                                  <div className="flex items-start gap-2.5">
                                    <div className="w-2 h-2 rounded-full bg-teal-500 mt-2 shrink-0 ring-4 ring-teal-100" />
                                    <p className="text-xs sm:text-sm text-slate-700 leading-relaxed flex-1">
                                      {renderFormattedText(pt)}
                                    </p>
                                  </div>
                                )}
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    )}

                    {/* Clinical Nursing Pearl Callout */}
                    {section.clinicalPearl && (
                      <div className="bg-gradient-to-r from-emerald-50/90 via-teal-50/40 to-white border-l-4 border-teal-500 rounded-r-2xl p-5 shadow-xs">
                        <div className="flex items-center gap-2 font-black text-teal-950 text-xs sm:text-sm mb-1.5">
                          <Stethoscope className="w-4 h-4 text-teal-600" />
                          <span>Clinical Nursing Pearl & Bedside Correlation</span>
                        </div>
                        <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-medium">
                          {renderFormattedText(section.clinicalPearl)}
                        </p>
                      </div>
                    )}

                    {/* Render Section Images with FULL Anatomical & Clinical Explanations */}
                    {section.images && section.images.length > 0 && (
                      <div className="space-y-4 pt-4 border-t border-slate-100">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2 text-slate-600 text-xs font-extrabold uppercase tracking-wider">
                            <Layers className="w-4 h-4 text-teal-600" />
                            <span>Anatomical Diagrams & Clinical Plates ({section.images.length})</span>
                          </div>
                          <span className="text-[11px] text-teal-700 font-bold bg-teal-50 px-2.5 py-0.5 rounded-full border border-teal-200/60">
                            Includes Detailed Landmark Explanations
                          </span>
                        </div>

                        <div className="space-y-6">
                          {section.images.map((img, imgIdx) => {
                            const exp = getDiagramExplanation(img, section, chapter);
                            const imgKey = `${section.id}_img_${imgIdx}`;
                            const isExpanded = expandedDiagrams[imgKey] !== false; // Default expanded for maximum learning

                            return (
                              <div
                                key={imgIdx}
                                className="bg-white rounded-3xl border border-slate-200/90 overflow-hidden shadow-sm hover:border-teal-300 transition-all flex flex-col"
                              >
                                {/* Top Plate Header */}
                                <div className="px-5 py-3.5 bg-slate-50 border-b border-slate-200/80 flex items-center justify-between">
                                  <div className="flex items-center gap-2">
                                    <span className="px-2.5 py-1 rounded-lg bg-teal-600 text-white font-black text-xs">
                                      {exp?.figure || `Figure ${imgIdx + 1}`}
                                    </span>
                                    <h4 className="text-xs sm:text-sm font-black text-slate-900 truncate max-w-md">
                                      {exp?.title || img.caption}
                                    </h4>
                                  </div>

                                  <div className="flex items-center gap-2">
                                    <button
                                      type="button"
                                      onClick={() => setZoomImage({ ...img, explanation: exp })}
                                      className="px-3 py-1.5 rounded-xl bg-white hover:bg-slate-100 text-slate-700 text-xs font-bold border border-slate-200 transition-colors flex items-center gap-1.5 shadow-xs cursor-pointer"
                                      title="Open Full Resolution View"
                                    >
                                      <Maximize2 className="w-3.5 h-3.5 text-teal-600" />
                                      <span className="hidden sm:inline">Enlarge Plate</span>
                                    </button>

                                    <button
                                      type="button"
                                      onClick={() => toggleDiagramExplanation(imgKey)}
                                      className="p-1.5 rounded-xl bg-white hover:bg-slate-100 text-slate-600 border border-slate-200 transition-colors cursor-pointer"
                                      title={isExpanded ? "Collapse Notes" : "Expand Notes"}
                                    >
                                      {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                                    </button>
                                  </div>
                                </div>

                                {/* Image Canvas */}
                                <div
                                  className="relative bg-slate-50/40 p-4 sm:p-6 flex items-center justify-center min-h-[260px] max-h-[460px] cursor-zoom-in overflow-hidden border-b border-slate-100 group"
                                  onClick={() => setZoomImage({ ...img, explanation: exp })}
                                >
                                  <img
                                    src={img.src}
                                    alt={img.alt || img.caption}
                                    className="max-h-[420px] w-auto object-contain rounded-xl group-hover:scale-[1.01] transition-transform duration-300 drop-shadow-sm"
                                    onError={(e) => {
                                      e.target.style.display = "none";
                                      e.target.parentNode.innerHTML += `<div class="p-8 text-center text-xs text-slate-500 font-semibold bg-slate-100 rounded-2xl">Diagram Canvas: ${img.caption}</div>`;
                                    }}
                                  />
                                  <div className="absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity bg-slate-900/85 text-white text-[11px] font-bold px-3 py-1.5 rounded-full flex items-center gap-1.5 shadow-lg backdrop-blur-xs">
                                    <ZoomIn className="w-3.5 h-3.5" />
                                    <span>Click to Enlarge with Landmark Guide</span>
                                  </div>
                                </div>

                                {/* Comprehensive Diagram Explanation Section */}
                                {isExpanded && exp && (
                                  <div className="p-5 sm:p-6 bg-white space-y-5 text-xs sm:text-sm animate-in fade-in duration-200">
                                    {/* 1. Paragraph Theory & Overview */}
                                    <div>
                                      <span className="text-[11px] font-extrabold text-teal-700 uppercase tracking-wider block mb-1">
                                        Anatomical Architecture & Theoretical Overview
                                      </span>
                                      <p className="text-slate-700 leading-relaxed font-medium">
                                        {renderFormattedText(exp.para || exp.overview)}
                                      </p>
                                    </div>

                                    {/* 2. Distinct Views Breakdown (Anterior vs Posterior Views) */}
                                    {exp.views && exp.views.length > 0 && (
                                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-1">
                                        {exp.views.map((v, vIdx) => (
                                          <div
                                            key={vIdx}
                                            className="bg-slate-50 rounded-2xl p-4 border border-slate-200/90 space-y-3"
                                          >
                                            <div className="flex items-center gap-2 border-b border-slate-200 pb-2">
                                              <Compass className="w-4 h-4 text-teal-600" />
                                              <span className="font-black text-xs text-slate-900">
                                                {v.name}
                                              </span>
                                            </div>
                                            <p className="text-xs text-slate-600 font-medium leading-relaxed">
                                              {v.description}
                                            </p>

                                            <div className="space-y-2 pt-1">
                                              {v.landmarks.map((lm, lmIdx) => (
                                                <div key={lmIdx} className="bg-white p-2.5 rounded-xl border border-slate-200/80 text-xs">
                                                  <span className="font-extrabold text-teal-900 block mb-0.5">
                                                    • {lm.name}
                                                  </span>
                                                  <span className="text-slate-600 leading-relaxed font-medium block">
                                                    {lm.details}
                                                  </span>
                                                </div>
                                              ))}
                                            </div>
                                          </div>
                                        ))}
                                      </div>
                                    )}

                                    {/* 3. Directional Pairs (if present) */}
                                    {exp.directionalPairs && (
                                      <div className="space-y-2.5 pt-1">
                                        <span className="text-[11px] font-extrabold text-teal-700 uppercase tracking-wider block">
                                          Directional Vectors Illustrated
                                        </span>
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                          {exp.directionalPairs.map((pair, pIdx) => (
                                            <div key={pIdx} className="bg-slate-50 p-3.5 rounded-xl border border-slate-200/80 text-xs space-y-1">
                                              <span className="font-black text-teal-900 block">
                                                {pair.pair}
                                              </span>
                                              <p className="text-slate-700 font-medium leading-relaxed">
                                                {pair.definition}
                                              </p>
                                              <span className="text-[11px] text-teal-800 font-bold block pt-1">
                                                Clinical Example: {pair.example}
                                              </span>
                                            </div>
                                          ))}
                                        </div>
                                      </div>
                                    )}

                                    {/* 4. Anatomical Planes (if present) */}
                                    {exp.planes && (
                                      <div className="space-y-2.5 pt-1">
                                        <span className="text-[11px] font-extrabold text-teal-700 uppercase tracking-wider block">
                                          Geometric Planes Illustrated
                                        </span>
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                          {exp.planes.map((pl, plIdx) => (
                                            <div key={plIdx} className="bg-slate-50 p-3.5 rounded-xl border border-slate-200/80 text-xs space-y-1">
                                              <span className="font-black text-teal-900 block">{pl.name}</span>
                                              <span className="text-slate-500 text-[11px] block">{pl.orientation}</span>
                                              <p className="text-slate-700 font-medium leading-relaxed">{pl.effect}</p>
                                            </div>
                                          ))}
                                        </div>
                                      </div>
                                    )}

                                    {/* 5. Key Points & Labeled Landmarks */}
                                    {(exp.points || exp.highlights) && (
                                      <div className="bg-gradient-to-br from-teal-50/60 via-slate-50 to-white rounded-2xl p-4 sm:p-5 border border-teal-200/80 space-y-2.5">
                                        <div className="flex items-center gap-2 text-teal-900 font-black text-xs uppercase tracking-wider">
                                          <Sparkles className="w-3.5 h-3.5 text-teal-600" />
                                          <span>Anatomical Landmarks & Structural Key Points</span>
                                        </div>
                                        <ul className="space-y-2 text-xs text-slate-700">
                                          {(exp.points || exp.highlights).map((pt, ptIdx) => (
                                            <li key={ptIdx} className="flex items-start gap-2.5">
                                              <div className="w-2 h-2 rounded-full bg-teal-500 mt-1.5 shrink-0 ring-4 ring-teal-100" />
                                              <span className="font-medium leading-relaxed">{renderFormattedText(pt)}</span>
                                            </li>
                                          ))}
                                        </ul>
                                      </div>
                                    )}

                                    {/* 6. Clinical Bedside Relevance & NCLEX Correlation */}
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2">
                                      <div className="bg-emerald-50/70 rounded-2xl p-4 border border-emerald-200/80">
                                        <div className="flex items-center gap-1.5 text-emerald-950 font-black text-xs mb-1">
                                          <Stethoscope className="w-3.5 h-3.5 text-emerald-600" />
                                          <span>Clinical Bedside Relevance & Theory</span>
                                        </div>
                                        <p className="text-xs text-slate-700 font-medium leading-relaxed">
                                          {renderFormattedText(exp.theory || exp.clinicalRelevance)}
                                        </p>
                                      </div>

                                      <div className="bg-amber-50/70 rounded-2xl p-4 border border-amber-200/80">
                                        <div className="flex items-center gap-1.5 text-amber-950 font-black text-xs mb-1">
                                          <Award className="w-3.5 h-3.5 text-amber-600" />
                                          <span>NCLEX High-Yield Pearls</span>
                                        </div>
                                        <ul className="space-y-1 text-xs text-slate-700 font-medium">
                                          {exp.nclexPearls?.map((np, nIdx) => (
                                            <li key={nIdx}>• {np}</li>
                                          ))}
                                        </ul>
                                      </div>
                                    </div>
                                  </div>
                                )}
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    )}
                  </section>
                ))}

                {/* Bottom Navigation between units */}
                <div className="flex items-center justify-between pt-6 border-t border-slate-200">
                  {prevChapter ? (
                    <Link
                      to={`/anatomy/lesson/${prevChapter.id}`}
                      className="px-5 py-3 rounded-2xl bg-white border border-slate-200 hover:border-teal-400 text-slate-700 hover:text-teal-700 text-xs font-bold transition-all flex items-center gap-2 shadow-xs"
                    >
                      <ArrowRight className="w-4 h-4 rotate-180" />
                      <span>Previous: Unit {prevChapter.unitNumber}</span>
                    </Link>
                  ) : <div />}

                  {nextChapter ? (
                    <Link
                      to={`/anatomy/lesson/${nextChapter.id}`}
                      className="px-6 py-3 rounded-2xl bg-teal-600 hover:bg-teal-700 text-white text-xs font-bold transition-all flex items-center gap-2 shadow-md shadow-teal-600/20"
                    >
                      <span>Next: Unit {nextChapter.unitNumber} ({nextChapter.title})</span>
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  ) : <div />}
                </div>
              </div>
            )}

            {/* MCQs Practice Tab */}
            {activeTab === "quiz" && (
              <div className="bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-8 shadow-sm space-y-6">
                <div>
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-50 text-teal-800 text-xs font-bold border border-teal-200 mb-2">
                    <Sparkles className="w-3.5 h-3.5 text-teal-600" />
                    <span>Official CBME Objective Questions • Unit {chapter.unitNumber}</span>
                  </div>
                  <h2 className="text-xl sm:text-2xl font-black text-slate-900">
                    Unit {chapter.unitNumber} Multiple Choice Questions ({chapter.mcqs?.length || 0})
                  </h2>
                  <p className="text-slate-600 text-xs mt-1">
                    Select your answer to test your comprehension of anatomical structures and directional principles.
                  </p>
                </div>

                <div className="space-y-4 pt-2">
                  {chapter.mcqs?.map((mcq, idx) => {
                    const isAnswerVisible = showAnswers[mcq.id];
                    const correctAnswer = mcq.answer || mcq.correctAnswer;
                    const optionsList = mcq.options && mcq.options.length > 0 ? mcq.options : [
                      correctAnswer,
                      "Lysosomes",
                      "Endoplasmic Reticulum",
                      "Golgi Complex"
                    ].filter((v, i, a) => a.indexOf(v) === i);

                    return (
                      <div
                        key={mcq.id}
                        className="p-5 rounded-2xl border border-slate-200 bg-slate-50/50 space-y-3"
                      >
                        <div className="flex items-start justify-between gap-3">
                          <span className="font-extrabold text-teal-700 text-xs shrink-0">
                            Q{idx + 1}.
                          </span>
                          <p className="text-xs sm:text-sm font-bold text-slate-800 flex-1 leading-snug">
                            {mcq.question}
                          </p>
                          <span className="text-[10px] px-2 py-0.5 rounded bg-slate-200 text-slate-600 font-semibold shrink-0">
                            {mcq.subtopic || "Anatomy"}
                          </span>
                        </div>

                        {/* Options */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
                          {optionsList.map((opt, oIdx) => {
                            const isSelected = selectedAnswers[mcq.id] === opt;
                            const isCorrect = isAnswerVisible && opt.toLowerCase().trim() === correctAnswer?.toLowerCase().trim();
                            const isWrongSelected = isAnswerVisible && isSelected && opt.toLowerCase().trim() !== correctAnswer?.toLowerCase().trim();

                            return (
                              <button
                                key={oIdx}
                                type="button"
                                onClick={() => setSelectedAnswers((prev) => ({ ...prev, [mcq.id]: opt }))}
                                className={`text-left p-3 rounded-xl border text-xs font-semibold transition-all cursor-pointer ${
                                  isCorrect
                                    ? "bg-emerald-50 border-emerald-400 text-emerald-900 font-bold"
                                    : isWrongSelected
                                    ? "bg-rose-50 border-rose-300 text-rose-900"
                                    : isSelected
                                    ? "bg-teal-50 border-teal-400 text-teal-900"
                                    : "bg-white border-slate-200 hover:bg-slate-50 text-slate-700"
                                }`}
                              >
                                <span className="font-bold mr-1.5">{String.fromCharCode(65 + oIdx)}.</span>
                                <span>{opt}</span>
                              </button>
                            );
                          })}
                        </div>

                        {/* Answer Toggle */}
                        <div className="pt-2 flex items-center justify-between border-t border-slate-200/60">
                          <button
                            onClick={() => toggleShowAnswer(mcq.id)}
                            className="text-xs font-bold text-teal-700 hover:text-teal-800 underline cursor-pointer"
                          >
                            {isAnswerVisible ? "Hide Answer" : "Show Correct Answer"}
                          </button>

                          {isAnswerVisible && (
                            <div className="text-xs font-extrabold text-emerald-700 flex items-center gap-1.5">
                              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                              <span>Correct: {correctAnswer}</span>
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* University Subjective Questions Tab */}
            {activeTab === "university-questions" && (
              <div className="bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-8 shadow-sm space-y-8">
                <div>
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-50 text-teal-800 text-xs font-bold border border-teal-200 mb-2">
                    <FileText className="w-3.5 h-3.5 text-teal-600" />
                    <span>Official INC University Question Bank & Model Answers</span>
                  </div>
                  <h2 className="text-xl sm:text-2xl font-black text-slate-900">
                    Unit {chapter.unitNumber} Subjective Exam Questions & Blueprints
                  </h2>
                  <p className="text-slate-600 text-xs mt-1">
                    Standard Short Answer Questions (SAQs), Long Answer Questions (LAQs), and Very Short Definitions frequently tested in BSc Nursing university examinations.
                  </p>
                </div>

                {/* Section 1: Short Answer Questions (SAQs) */}
                {chapter.shortAnswerQuestions && chapter.shortAnswerQuestions.length > 0 && (
                  <div className="space-y-4">
                    <div className="flex items-center justify-between border-b border-slate-200 pb-2">
                      <div className="flex items-center gap-2">
                        <span className="px-2.5 py-0.5 rounded-md bg-teal-600 text-white text-xs font-black">
                          Section A
                        </span>
                        <h3 className="text-sm sm:text-base font-black text-slate-900">
                          Short Answer Questions ({chapter.shortAnswerQuestions.length} Questions • 5 Marks Each)
                        </h3>
                      </div>
                      <span className="text-[11px] text-teal-700 font-bold bg-teal-50 px-2 py-0.5 rounded border border-teal-200">
                        High-Yield Exam Focus
                      </span>
                    </div>

                    <div className="space-y-3">
                      {chapter.shortAnswerQuestions.map((saq, idx) => {
                        const isOpen = expandedSubjective[saq.id];
                        return (
                          <div
                            key={saq.id}
                            className="p-4 sm:p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-3"
                          >
                            <div className="flex items-start justify-between gap-3">
                              <span className="w-6 h-6 rounded-full bg-teal-100 text-teal-800 text-xs font-black flex items-center justify-center shrink-0">
                                {idx + 1}
                              </span>
                              <p className="text-xs sm:text-sm font-extrabold text-slate-800 flex-1 leading-snug">
                                {saq.question}
                              </p>
                              <button
                                type="button"
                                onClick={() => toggleSubjective(saq.id)}
                                className="px-3 py-1 rounded-xl bg-white hover:bg-teal-50 text-teal-700 hover:text-teal-800 text-xs font-bold border border-slate-200 transition-colors shrink-0 cursor-pointer"
                              >
                                {isOpen ? "Hide Model Answer" : "View Model Answer"}
                              </button>
                            </div>

                            {isOpen && saq.modelAnswer && (
                              <div className="p-4 rounded-xl bg-white border border-teal-200 text-xs sm:text-sm text-slate-700 leading-relaxed space-y-1 animate-in fade-in duration-200">
                                <span className="text-[11px] font-black text-teal-800 uppercase tracking-wider block mb-1">
                                  Model Examination Answer & Marking Scheme:
                                </span>
                                <div className="whitespace-pre-line font-medium text-slate-700">
                                  {saq.modelAnswer}
                                </div>
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* Section 2: Long Answer Questions (LAQs) */}
                {chapter.longAnswerQuestions && chapter.longAnswerQuestions.length > 0 && (
                  <div className="space-y-4 pt-4 border-t border-slate-200">
                    <div className="flex items-center justify-between border-b border-slate-200 pb-2">
                      <div className="flex items-center gap-2">
                        <span className="px-2.5 py-0.5 rounded-md bg-indigo-600 text-white text-xs font-black">
                          Section B
                        </span>
                        <h3 className="text-sm sm:text-base font-black text-slate-900">
                          Long Answer Questions ({chapter.longAnswerQuestions.length} Questions • 10–15 Marks Each)
                        </h3>
                      </div>
                      <span className="text-[11px] text-indigo-700 font-bold bg-indigo-50 px-2 py-0.5 rounded border border-indigo-200">
                        Comprehensive Essay Blueprints
                      </span>
                    </div>

                    <div className="space-y-3">
                      {chapter.longAnswerQuestions.map((laq, idx) => {
                        const isOpen = expandedSubjective[laq.id];
                        return (
                          <div
                            key={laq.id}
                            className="p-4 sm:p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-3"
                          >
                            <div className="flex items-start justify-between gap-3">
                              <span className="w-6 h-6 rounded-full bg-indigo-100 text-indigo-800 text-xs font-black flex items-center justify-center shrink-0">
                                {idx + 1}
                              </span>
                              <p className="text-xs sm:text-sm font-extrabold text-slate-800 flex-1 leading-snug">
                                {laq.question}
                              </p>
                              <button
                                type="button"
                                onClick={() => toggleSubjective(laq.id)}
                                className="px-3 py-1 rounded-xl bg-white hover:bg-indigo-50 text-indigo-700 hover:text-indigo-800 text-xs font-bold border border-slate-200 transition-colors shrink-0 cursor-pointer"
                              >
                                {isOpen ? "Hide Essay Outline" : "View Essay Outline"}
                              </button>
                            </div>

                            {isOpen && laq.modelAnswer && (
                              <div className="p-4 rounded-xl bg-white border border-indigo-200 text-xs sm:text-sm text-slate-700 leading-relaxed space-y-1 animate-in fade-in duration-200">
                                <span className="text-[11px] font-black text-indigo-800 uppercase tracking-wider block mb-1">
                                  Comprehensive Essay Structure & Required Diagrams:
                                </span>
                                <div className="whitespace-pre-line font-medium text-slate-700">
                                  {laq.modelAnswer}
                                </div>
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* Section 3: Very Short Answer Questions (VSAQs) */}
                {chapter.subjectiveQuestions && chapter.subjectiveQuestions.length > 0 && (
                  <div className="space-y-4 pt-4 border-t border-slate-200">
                    <div className="flex items-center justify-between border-b border-slate-200 pb-2">
                      <div className="flex items-center gap-2">
                        <span className="px-2.5 py-0.5 rounded-md bg-slate-700 text-white text-xs font-black">
                          Section C
                        </span>
                        <h3 className="text-sm sm:text-base font-black text-slate-900">
                          Very Short Answer Questions ({chapter.subjectiveQuestions.length} Questions • 2 Marks Each)
                        </h3>
                      </div>
                      <span className="text-[11px] text-slate-600 font-bold bg-slate-100 px-2 py-0.5 rounded border border-slate-200">
                        Rapid Definitions
                      </span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {chapter.subjectiveQuestions.map((q, idx) => {
                        const questionText = typeof q === "string" ? q : q.question;
                        return (
                          <div
                            key={idx}
                            className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/90 flex items-start gap-2.5"
                          >
                            <span className="w-5 h-5 rounded-full bg-teal-100 text-teal-800 text-[11px] font-black flex items-center justify-center shrink-0 mt-0.5">
                              {idx + 1}
                            </span>
                            <p className="text-xs font-bold text-slate-800 leading-relaxed flex-1">
                              {questionText}
                            </p>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Bottom Chapter Completion & Advancement Banner */}
            <div className="mt-12 p-6 sm:p-8 rounded-3xl border bg-gradient-to-r from-teal-50 via-emerald-50 to-white dark:from-slate-900 dark:via-teal-950/40 dark:to-slate-900 border-teal-200 dark:border-teal-800 flex flex-col md:flex-row items-center justify-between gap-6 shadow-sm">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  {completed ? (
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-black bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 border border-emerald-300">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                      Unit {chapter.unitNumber} Completed & Mastered!
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-amber-100 dark:bg-amber-950 text-amber-800 dark:text-amber-300 border border-amber-300">
                      Reading in Progress
                    </span>
                  )}
                </div>
                <h3 className="text-lg font-black text-slate-900 dark:text-slate-100">
                  {completed ? "You've finished this unit!" : "Finished studying this unit?"}
                </h3>
                <p className="text-xs text-slate-600 dark:text-slate-400 max-w-xl">
                  {completed
                    ? "Your completion has been automatically updated in your curriculum profile and counts toward unlocking the Grand Final examination."
                    : "Marking this unit completed will update your curriculum progress in real-time and advance your Grand Final unlocking standing."}
                </p>
              </div>

              <div className="flex items-center gap-3 shrink-0 flex-wrap">
                <button
                  type="button"
                  onClick={() => toggleCompletion(chapter.id)}
                  className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    completed
                      ? "bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 border border-slate-300 dark:border-slate-700"
                      : "bg-teal-600 hover:bg-teal-700 text-white shadow-md shadow-teal-600/20"
                  }`}
                >
                  {completed ? "Mark Incomplete" : "Mark as Completed ✓"}
                </button>

                <Link
                  to={`/quiz/${chapter.id}`}
                  className="px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-md transition-all flex items-center gap-1.5"
                >
                  <ClipboardList className="w-3.5 h-3.5" />
                  <span>Take Unit Quiz</span>
                </Link>

                {nextChapter && (
                  <Link
                    to={`/anatomy/lesson/${nextChapter.id}`}
                    onClick={() => {
                      if (!completed) toggleCompletion(chapter.id);
                    }}
                    className="px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs shadow-md transition-all flex items-center gap-1.5"
                  >
                    <span>Next Unit →</span>
                  </Link>
                )}
              </div>
            </div>
          </main>
        </div>
      </div>

      {/* Split-Screen Image Zoom & Comprehensive Landmark Guide Modal */}
      {zoomImage && (
        <div
          className="fixed inset-0 z-50 bg-slate-950/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200"
          onClick={() => setZoomImage(null)}
        >
          <div
            className="bg-white rounded-3xl max-w-6xl w-full max-h-[94vh] overflow-hidden shadow-2xl flex flex-col border border-slate-200"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 bg-slate-50">
              <div className="flex items-center gap-2.5">
                <span className="px-2.5 py-1 rounded-lg bg-teal-600 text-white font-black text-xs">
                  {zoomImage.explanation?.figure || "Anatomical Plate"}
                </span>
                <span className="text-sm sm:text-base font-black text-slate-900 leading-snug">
                  {zoomImage.explanation?.title || zoomImage.caption}
                </span>
              </div>
              <button
                onClick={() => setZoomImage(null)}
                className="w-8 h-8 rounded-full bg-slate-200 hover:bg-slate-300 text-slate-700 flex items-center justify-center transition-colors cursor-pointer"
                title="Close"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Modal Body: High-Res Canvas + Side Landmark Guide */}
            <div className="flex-1 overflow-y-auto grid grid-cols-1 lg:grid-cols-12 divide-y lg:divide-y-0 lg:divide-x divide-slate-200">
              {/* Left Column: Image Canvas */}
              <div className="lg:col-span-7 bg-slate-950/95 p-6 flex flex-col items-center justify-center min-h-[380px] lg:min-h-[520px]">
                <img
                  src={zoomImage.src}
                  alt={zoomImage.caption}
                  className="max-h-[68vh] w-auto object-contain rounded-xl shadow-2xl drop-shadow-md"
                />
                <span className="text-[11px] text-slate-400 mt-3 font-medium">
                  Standard High-Resolution Anatomical Plate
                </span>
              </div>

              {/* Right Column: Full Diagram Explanations & Landmarks */}
              <div className="lg:col-span-5 p-6 space-y-5 overflow-y-auto max-h-[75vh] bg-white text-xs sm:text-sm">
                <div>
                  <span className="text-[10px] font-black uppercase tracking-wider text-teal-700 block mb-1">
                    Anatomical Plate & Theory Overview
                  </span>
                  <p className="text-slate-700 leading-relaxed font-medium">
                    {renderFormattedText(zoomImage.explanation?.para || zoomImage.explanation?.overview || zoomImage.caption)}
                  </p>
                </div>

                {/* Views & Landmarks */}
                {zoomImage.explanation?.views && (
                  <div className="space-y-3 pt-2">
                    <span className="text-[10px] font-black uppercase tracking-wider text-teal-700 block">
                      Region Landmarks Labeled
                    </span>
                    {zoomImage.explanation.views.map((v, idx) => (
                      <div key={idx} className="bg-slate-50 p-3.5 rounded-2xl border border-slate-200 space-y-2">
                        <span className="font-extrabold text-xs text-slate-900 block">{v.name}</span>
                        <div className="space-y-1.5">
                          {v.landmarks.map((lm, lIdx) => (
                            <div key={lIdx} className="bg-white p-2 rounded-xl border border-slate-200/80 text-xs">
                              <strong className="text-teal-900 block">• {lm.name}</strong>
                              <span className="text-slate-600 block">{lm.details}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* Directional Vectors */}
                {zoomImage.explanation?.directionalPairs && (
                  <div className="space-y-2 pt-2">
                    <span className="text-[10px] font-black uppercase tracking-wider text-teal-700 block">
                      Directional Pairs Breakdown
                    </span>
                    {zoomImage.explanation.directionalPairs.map((pair, idx) => (
                      <div key={idx} className="bg-slate-50 p-3 rounded-xl border border-slate-200 text-xs space-y-0.5">
                        <strong className="text-teal-950 block">{pair.pair}</strong>
                        <p className="text-slate-600 font-medium">{pair.definition}</p>
                        <span className="text-teal-700 font-bold text-[11px] block">{pair.example}</span>
                      </div>
                    ))}
                  </div>
                )}

                {/* Points / Landmark Bullets */}
                {(zoomImage.explanation?.points || zoomImage.explanation?.highlights) && (
                  <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-2 pt-2">
                    <span className="text-[10px] font-black uppercase tracking-wider text-teal-700 block">
                      Anatomical Landmarks & Structural Points
                    </span>
                    <ul className="space-y-1.5 text-xs text-slate-700">
                      {(zoomImage.explanation.points || zoomImage.explanation.highlights).map((pt, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <span className="text-teal-600 font-bold">•</span>
                          <span className="font-medium leading-relaxed">{renderFormattedText(pt)}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Bedside Nursing & NCLEX Pearls */}
                {(zoomImage.explanation?.theory || zoomImage.explanation?.clinicalRelevance) && (
                  <div className="bg-emerald-50 p-4 rounded-2xl border border-emerald-200 text-xs space-y-1">
                    <strong className="text-emerald-950 block">🏥 Bedside Nursing Rule & Clinical Theory:</strong>
                    <p className="text-slate-700 font-medium leading-relaxed">
                      {renderFormattedText(zoomImage.explanation.theory || zoomImage.explanation.clinicalRelevance)}
                    </p>
                  </div>
                )}

                {zoomImage.explanation?.nclexPearls && (
                  <div className="bg-amber-50 p-4 rounded-2xl border border-amber-200 text-xs space-y-1">
                    <strong className="text-amber-950 block">💡 NCLEX Exam Takeaways:</strong>
                    <ul className="space-y-1 text-slate-700 font-medium">
                      {zoomImage.explanation.nclexPearls.map((pearl, idx) => (
                        <li key={idx}>• {pearl}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>

            {/* Modal Footer */}
            <div className="px-6 py-3 border-t border-slate-200 bg-slate-50 flex items-center justify-between">
              <span className="text-[11px] text-slate-500 font-medium">
                Click background or close button to return to reading view
              </span>
              <button
                onClick={() => setZoomImage(null)}
                className="px-5 py-2 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs transition-colors cursor-pointer"
              >
                Close Plate
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AnatomyLessonView;
