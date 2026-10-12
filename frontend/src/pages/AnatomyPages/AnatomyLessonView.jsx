import React, { useState, useEffect } from "react";
import { useParams, Link, useSearchParams, useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar";
import { ANATOMY_CHAPTERS } from "../../constants/anatomyChaptersData";
import { ANATOMY_UNITS } from "../../constants/anatomyData";
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
  Layers,
  Eye,
  Info,
  Maximize2,
  X
} from "lucide-react";

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

  // MCQ state
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [showAnswers, setShowAnswers] = useState({});

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

  // Previous & Next unit navigation
  const currentIndex = ANATOMY_UNITS.findIndex((u) => u.id === chapter.id);
  const prevChapter = currentIndex > 0 ? ANATOMY_UNITS[currentIndex - 1] : null;
  const nextChapter = currentIndex < ANATOMY_UNITS.length - 1 ? ANATOMY_UNITS[currentIndex + 1] : null;

  return (
    <div className="min-h-screen bg-slate-50/70 text-slate-900 antialiased selection:bg-teal-500 selection:text-white pb-24 font-sans">
      <Navbar />

      {/* Top Breadcrumb Navigation */}
      <div className="bg-slate-900 border-b border-slate-800 text-slate-300 py-3 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2">
            <Link
              to="/anatomy-syllabus"
              className="text-slate-400 hover:text-teal-400 font-medium inline-flex items-center gap-1.5 transition-colors"
            >
              <ArrowRight className="w-3.5 h-3.5 rotate-180" />
              <span>Anatomy Syllabus</span>
            </Link>
            <span className="text-slate-600">/</span>
            <span className="text-teal-400 font-semibold truncate max-w-[280px] sm:max-w-md">
              Unit {chapter.unitNumber}: {chapter.title}
            </span>
          </div>

          <div className="flex items-center gap-2 text-xs font-semibold">
            {prevChapter && (
              <Link
                to={`/anatomy/lesson/${prevChapter.id}`}
                className="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors"
              >
                ← Prev Unit {prevChapter.unitNumber}
              </Link>
            )}
            {nextChapter && (
              <Link
                to={`/anatomy/lesson/${nextChapter.id}`}
                className="px-3 py-1 rounded-lg bg-teal-600 hover:bg-teal-500 text-white font-bold transition-colors shadow-sm"
              >
                Next Unit {nextChapter.unitNumber} →
              </Link>
            )}
          </div>
        </div>
      </div>

      {/* Header Banner */}
      <section className="bg-white border-b border-slate-200 px-4 sm:px-6 lg:px-8 py-6 sm:py-8 shadow-xs">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-50 text-teal-800 text-xs font-bold border border-teal-200/80 mb-2.5">
                <Sparkles className="w-3.5 h-3.5 text-teal-600" />
                <span>Unit {chapter.unitNumber} • {chapter.category}</span>
              </div>
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-900 tracking-tight">
                {chapter.title}
              </h1>
              <p className="text-slate-600 text-xs sm:text-sm mt-2 max-w-3xl leading-relaxed">
                {chapter.summary}
              </p>
            </div>

            {/* Mode Switcher Tabs */}
            <div className="flex items-center gap-1.5 p-1.5 bg-slate-100 rounded-2xl self-start lg:self-center border border-slate-200/80 shadow-xs">
              <button
                onClick={() => handleTabChange("reading")}
                className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-2 ${
                  activeTab === "reading"
                    ? "bg-white text-teal-800 shadow-sm border border-slate-200/60"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                <BookOpen className="w-3.5 h-3.5" />
                <span>Textbook ({chapter.sections?.length || 0})</span>
              </button>

              <button
                onClick={() => handleTabChange("quiz")}
                className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-2 ${
                  activeTab === "quiz"
                    ? "bg-white text-teal-800 shadow-sm border border-slate-200/60"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                <HelpCircle className="w-3.5 h-3.5" />
                <span>MCQs ({chapter.mcqs?.length || 0})</span>
              </button>

              <button
                onClick={() => handleTabChange("subjective")}
                className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-2 ${
                  activeTab === "subjective"
                    ? "bg-white text-teal-800 shadow-sm border border-slate-200/60"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                <FileText className="w-3.5 h-3.5" />
                <span>Exam Q&A ({chapter.subjectiveQuestions?.length || 0})</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Layout */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-6">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar Navigation */}
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
                  <span>Plates / Figures:</span>
                  <span className="font-bold text-teal-700">{chapter.totalImages || 0}</span>
                </div>
                <div className="flex items-center justify-between text-slate-600 font-medium">
                  <span>MCQ Practice Bank:</span>
                  <span className="font-bold text-teal-700">{chapter.mcqs?.length || 0}</span>
                </div>
                <div className="flex items-center justify-between text-slate-600 font-medium">
                  <span>Subjective University Qs:</span>
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

                    {/* Detailed Points with Bold Highlights Card */}
                    {section.points && section.points.length > 0 && (
                      <div className="bg-slate-50/80 rounded-2xl p-5 sm:p-6 border border-slate-200/80 space-y-3.5 shadow-xs">
                        <div className="flex items-center gap-2 text-teal-800 font-extrabold text-xs uppercase tracking-wider">
                          <Sparkles className="w-4 h-4 text-teal-600" />
                          <span>Key Anatomical Concepts & Definitions</span>
                        </div>
                        <div className="space-y-3">
                          {section.points.map((pt, ptIdx) => (
                            <div key={ptIdx} className="flex items-start gap-3 pl-1">
                              <div className="w-2 h-2 rounded-full bg-teal-500 mt-2 shrink-0 ring-4 ring-teal-100" />
                              <div className="text-xs sm:text-sm text-slate-700 leading-relaxed flex-1">
                                {renderFormattedText(pt)}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Clinical Nursing Pearl Callout */}
                    {section.clinicalPearl && (
                      <div className="bg-gradient-to-r from-emerald-50/80 via-teal-50/40 to-white border-l-4 border-teal-500 rounded-r-2xl p-5 shadow-xs">
                        <div className="flex items-center gap-2 font-black text-teal-950 text-xs sm:text-sm mb-1.5">
                          <Stethoscope className="w-4 h-4 text-teal-600" />
                          <span>Clinical Nursing Pearl & Bedside Correlation</span>
                        </div>
                        <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-medium">
                          {renderFormattedText(section.clinicalPearl)}
                        </p>
                      </div>
                    )}

                    {/* Render Section Images (Plates) with Aligned Card Grid */}
                    {section.images && section.images.length > 0 && (
                      <div className="space-y-3 pt-2">
                        <div className="flex items-center gap-2 text-slate-400 text-xs font-bold uppercase tracking-wider">
                          <Layers className="w-3.5 h-3.5 text-teal-600" />
                          <span>Associated Anatomical Plates ({section.images.length})</span>
                        </div>

                        <div
                          className={`grid gap-4 ${
                            section.images.length === 1
                              ? "grid-cols-1"
                              : section.images.length === 2
                              ? "grid-cols-1 md:grid-cols-2"
                              : "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
                          }`}
                        >
                          {section.images.map((img, imgIdx) => (
                            <div
                              key={imgIdx}
                              className="bg-white rounded-2xl border border-slate-200/90 overflow-hidden shadow-xs hover:shadow-md hover:border-teal-300 transition-all group flex flex-col"
                            >
                              {/* Image Preview Container */}
                              <div
                                className="relative bg-slate-50/50 p-3 flex items-center justify-center min-h-[220px] max-h-[360px] cursor-zoom-in overflow-hidden"
                                onClick={() => setZoomImage(img)}
                              >
                                <img
                                  src={img.src}
                                  alt={img.alt || img.caption}
                                  className="max-h-[320px] w-auto object-contain rounded-lg group-hover:scale-[1.02] transition-transform duration-300"
                                  onError={(e) => {
                                    e.target.style.display = "none";
                                    e.target.parentNode.innerHTML += `<div class="p-6 text-center text-xs text-slate-400 font-semibold">Diagram: ${img.caption}</div>`;
                                  }}
                                />
                                <div className="absolute inset-0 bg-slate-900/0 group-hover:bg-slate-900/10 transition-colors flex items-center justify-center">
                                  <span className="opacity-0 group-hover:opacity-100 transition-opacity bg-slate-900/75 text-white text-[11px] font-bold px-3 py-1.5 rounded-full flex items-center gap-1.5 shadow-md backdrop-blur-xs">
                                    <ZoomIn className="w-3.5 h-3.5" />
                                    <span>Click to Enlarge</span>
                                  </span>
                                </div>
                              </div>

                              {/* Caption Footer */}
                              <div className="p-3 bg-white border-t border-slate-100 flex items-center justify-between gap-2 mt-auto">
                                <span className="text-xs font-bold text-slate-800 line-clamp-2 leading-snug">
                                  {img.caption}
                                </span>
                                <button
                                  type="button"
                                  onClick={() => setZoomImage(img)}
                                  className="p-1.5 rounded-lg text-slate-400 hover:text-teal-600 hover:bg-teal-50 transition-colors shrink-0 cursor-pointer"
                                  title="View full-resolution plate"
                                >
                                  <Maximize2 className="w-3.5 h-3.5" />
                                </button>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Render Tables if present */}
                    {section.tables && section.tables.length > 0 && (
                      <div className="space-y-4 pt-2">
                        {section.tables.map((table, tIdx) => (
                          <div key={tIdx} className="overflow-x-auto rounded-2xl border border-slate-200">
                            <table className="min-w-full divide-y divide-slate-200 text-xs text-left">
                              <tbody className="divide-y divide-slate-100 bg-white">
                                {table.map((row, rIdx) => (
                                  <tr
                                    key={rIdx}
                                    className={rIdx === 0 ? "bg-teal-50/80 font-bold text-teal-900" : "hover:bg-slate-50"}
                                  >
                                    {row.map((cell, cIdx) => (
                                      <td key={cIdx} className="p-3 leading-snug">
                                        {cell}
                                      </td>
                                    ))}
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>
                        ))}
                      </div>
                    )}
                  </section>
                ))}

                {/* Bottom Navigation */}
                <div className="bg-white rounded-3xl border border-slate-200/90 p-6 flex flex-wrap items-center justify-between gap-4 shadow-xs">
                  {prevChapter ? (
                    <Link
                      to={`/anatomy/lesson/${prevChapter.id}`}
                      className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs transition-colors"
                    >
                      <ArrowRight className="w-4 h-4 rotate-180" />
                      <span>Unit {prevChapter.unitNumber}: {prevChapter.title}</span>
                    </Link>
                  ) : <div />}

                  {nextChapter ? (
                    <Link
                      to={`/anatomy/lesson/${nextChapter.id}`}
                      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-extrabold text-xs shadow-md shadow-teal-500/20 transition-all"
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
                    Select your answer to test your comprehension of {chapter.title}.
                  </p>
                </div>

                <div className="space-y-4 pt-2">
                  {chapter.mcqs?.map((mcq, idx) => {
                    const isAnswerVisible = showAnswers[mcq.id];
                    return (
                      <div
                        key={mcq.id}
                        className="p-5 rounded-2xl border border-slate-200 bg-slate-50/50 space-y-3"
                      >
                        <div className="flex items-start justify-between gap-3">
                          <span className="font-black text-teal-700 text-xs shrink-0 mt-0.5">
                            Q{idx + 1}.
                          </span>
                          <p className="text-xs sm:text-sm font-bold text-slate-800 flex-1 leading-snug">
                            {mcq.question}
                          </p>
                          <span className="text-[10px] px-2 py-0.5 rounded bg-slate-200 text-slate-600 font-semibold shrink-0">
                            {mcq.subtopic || "Anatomy"}
                          </span>
                        </div>

                        <div className="pt-2 flex items-center justify-between border-t border-slate-200/60">
                          <button
                            onClick={() => toggleShowAnswer(mcq.id)}
                            className="text-xs font-bold text-teal-700 hover:text-teal-800 underline cursor-pointer"
                          >
                            {isAnswerVisible ? "Hide Answer" : "Show Correct Answer"}
                          </button>

                          {isAnswerVisible && (
                            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-emerald-100 text-emerald-900 font-bold text-xs border border-emerald-300">
                              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-700" />
                              <span>Answer: {mcq.correctAnswer}</span>
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* University Exam Subjective Q&A Tab */}
            {activeTab === "subjective" && (
              <div className="bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-8 shadow-sm space-y-6">
                <div>
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-50 text-purple-800 text-xs font-bold border border-purple-200 mb-2">
                    <Sparkles className="w-3.5 h-3.5 text-purple-600" />
                    <span>Official University Exam Question Bank • Unit {chapter.unitNumber}</span>
                  </div>
                  <h2 className="text-xl sm:text-2xl font-black text-slate-900">
                    Subjective Questions (2, 5 & 10 Marks)
                  </h2>
                  <p className="text-slate-600 text-xs mt-1">
                    Standard university format questions with assigned weightage for Semester I examination preparation.
                  </p>
                </div>

                <div className="space-y-3 pt-2">
                  {chapter.subjectiveQuestions?.map((sq, idx) => (
                    <div
                      key={sq.id || idx}
                      className="p-4 rounded-2xl border border-slate-200 hover:border-purple-300 bg-slate-50/40 flex items-start justify-between gap-4 transition-all"
                    >
                      <div className="flex items-start gap-3 flex-1">
                        <span className="font-black text-purple-700 text-xs shrink-0 mt-0.5">
                          {idx + 1}.
                        </span>
                        <div>
                          <p className="text-xs sm:text-sm font-bold text-slate-800 leading-snug">
                            {sq.question}
                          </p>
                          <span className="text-[10px] text-slate-500 font-semibold mt-1 inline-block">
                            Type: {sq.type}
                          </span>
                        </div>
                      </div>

                      <span className={`px-2.5 py-1 rounded-full text-[11px] font-black shrink-0 border ${
                        sq.marks === 10
                          ? "bg-rose-50 text-rose-800 border-rose-200"
                          : sq.marks === 5
                          ? "bg-amber-50 text-amber-800 border-amber-200"
                          : "bg-teal-50 text-teal-800 border-teal-200"
                      }`}>
                        {sq.marks} Marks
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </main>
        </div>
      </div>

      {/* Image Zoom Modal */}
      {zoomImage && (
        <div
          className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in duration-200"
          onClick={() => setZoomImage(null)}
        >
          <div
            className="bg-white rounded-3xl max-w-5xl w-full max-h-[92vh] overflow-hidden shadow-2xl p-5 sm:p-6 flex flex-col border border-slate-200"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-3.5 border-b border-slate-100">
              <span className="text-xs sm:text-sm font-extrabold text-slate-900 leading-snug">
                {zoomImage.caption}
              </span>
              <button
                onClick={() => setZoomImage(null)}
                className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 flex items-center justify-center transition-colors cursor-pointer"
                title="Close"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="flex-1 overflow-auto p-4 flex items-center justify-center bg-slate-50 rounded-2xl my-3">
              <img
                src={zoomImage.src}
                alt={zoomImage.caption}
                className="max-h-[72vh] w-auto object-contain rounded-xl shadow-sm"
              />
            </div>
            <div className="pt-2 flex items-center justify-between">
              <span className="text-[11px] text-slate-500 font-medium">
                High-Definition Anatomical Reference Plate
              </span>
              <button
                onClick={() => setZoomImage(null)}
                className="px-5 py-2 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs transition-colors cursor-pointer"
              >
                Close View
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AnatomyLessonView;
