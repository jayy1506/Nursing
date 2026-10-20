import React, { useState, useEffect } from "react";
import { useParams, Link, useSearchParams } from "react-router-dom";
import Navbar from "../../components/Navbar";
import { PHYSIOLOGY_CHAPTERS } from "../../constants/physiologyChaptersData";
import { PHYSIOLOGY_UNITS } from "../../constants/physiologyData";
import {
  ArrowRight,
  BookOpen,
  Sparkles,
  ChevronRight,
  ZoomIn,
  CheckCircle2,
  Award,
  Layers,
  FileText,
  HelpCircle,
  Activity,
  Stethoscope,
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
        <strong key={index} className="font-extrabold text-neutral-900 tracking-tight">
          {part.slice(2, -2)}
        </strong>
      );
    }
    return part;
  });
};

export const PhysiologyLessonView = () => {
  const { chapterId } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();

  const chapter = PHYSIOLOGY_CHAPTERS[chapterId] || PHYSIOLOGY_CHAPTERS["phys-unit-1"];
  const activeTabParam = searchParams.get("tab") || "reading";
  const [activeTab, setActiveTab] = useState(activeTabParam);
  const [zoomImage, setZoomImage] = useState(null);

  // Real-time automatic curriculum progress
  const { isCompleted, toggleCompletion, gating } = useCurriculumProgress('physiology');
  const completed = isCompleted(chapter.id);

  // MCQ state
  const [showAnswers, setShowAnswers] = useState({});

  useEffect(() => {
    const tab = searchParams.get("tab");
    if (tab) setActiveTab(tab);

    const sectionParam = searchParams.get("section");
    if (sectionParam) {
      setTimeout(() => {
        const el = document.getElementById(sectionParam);
        if (el) {
          el.scrollIntoView({ behavior: "smooth" });
        }
      }, 150);
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [chapterId, searchParams]);

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    setSearchParams({ tab });
  };

  const toggleShowAnswer = (qId) => {
    setShowAnswers((prev) => ({ ...prev, [qId]: !prev[qId] }));
  };

  const currentIndex = PHYSIOLOGY_UNITS.findIndex((u) => u.id === chapter.id);
  const prevChapter = currentIndex > 0 ? PHYSIOLOGY_UNITS[currentIndex - 1] : null;
  const nextChapter = currentIndex < PHYSIOLOGY_UNITS.length - 1 ? PHYSIOLOGY_UNITS[currentIndex + 1] : null;

  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-neutral-950 text-neutral-900 dark:text-neutral-100 antialiased selection:bg-green-500 selection:text-white pb-24 transition-colors">
      <Navbar />

      {/* Top Breadcrumb Navigation in Calm Clinical Nursing Scrub Palette */}
      <div className="bg-white dark:bg-neutral-900 border-b border-neutral-200/80 dark:border-neutral-800 text-neutral-700 dark:text-neutral-300 py-2.5 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2 flex-wrap">
            <Link
              to="/physiology-syllabus"
              className="text-neutral-500 dark:text-neutral-400 hover:text-green-500 dark:hover:text-green-400 font-medium inline-flex items-center gap-1 transition-colors"
            >
              <ArrowRight className="w-3.5 h-3.5 rotate-180" />
              <span>Physiology Syllabus</span>
            </Link>
            <span className="text-neutral-300 dark:text-neutral-700">/</span>
            <span className="text-green-700 dark:text-green-400 font-bold">
              Unit {chapter.unitNumber}: {chapter.title}
            </span>

            {/* Live completion indicator badge */}
            {completed ? (
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-green-50 dark:bg-green-900/60 text-green-700 dark:text-green-400 border border-green-400 dark:border-green-700 ml-2">
                <CheckCircle2 className="w-3 h-3 text-green-500 dark:text-green-400" />
                <span>Completed • Mastered</span>
              </span>
            ) : (
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-neutral-100 dark:bg-neutral-800 text-neutral-500 dark:text-neutral-400 border border-neutral-200 dark:border-neutral-700 ml-2">
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
                  ? "bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-300 hover:bg-neutral-200 border border-neutral-200"
                  : "bg-green-50 dark:bg-green-900 text-green-700 dark:text-green-100 hover:bg-green-100 border border-green-100 dark:border-green-700"
              }`}
            >
              <CheckCircle2 className={`w-3 h-3 ${completed ? "text-green-500" : "text-neutral-400"}`} />
              <span>{completed ? "Mark Incomplete" : "Mark Completed"}</span>
            </button>

            {prevChapter && (
              <Link
                to={`/physiology/lesson/${prevChapter.id}`}
                className="px-2.5 py-1 rounded-lg bg-neutral-100 hover:bg-neutral-200 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 transition-colors"
              >
                ← Prev Unit {prevChapter.unitNumber}
              </Link>
            )}
            {nextChapter && (
              <Link
                to={`/physiology/lesson/${nextChapter.id}`}
                className="px-2.5 py-1 rounded-lg bg-green-500 hover:bg-green-500 text-white font-bold transition-colors"
              >
                Next Unit {nextChapter.unitNumber} →
              </Link>
            )}
          </div>
        </div>
      </div>

      {/* Header Banner */}
      <section className="bg-white border-b border-neutral-200 px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-neutral-100 text-green-700 text-xs font-bold border border-neutral-300 mb-2">
                <Sparkles className="w-3.5 h-3.5 text-green-700" />
                <span>Unit {chapter.unitNumber} • {chapter.category}</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-black text-neutral-900 tracking-tight">
                {chapter.title}
              </h1>
              <p className="text-neutral-600 text-xs sm:text-sm mt-1 max-w-3xl leading-relaxed">
                {chapter.summary}
              </p>
            </div>

            {/* Mode Switcher Tabs */}
            <div className="flex items-center gap-1.5 p-1 bg-neutral-100 rounded-xl self-start lg:self-center border border-neutral-200">
              <button
                onClick={() => handleTabChange("reading")}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                  activeTab === "reading"
                    ? "bg-white text-green-700 shadow-sm"
                    : "text-neutral-600 hover:text-neutral-900"
                }`}
              >
                <BookOpen className="w-3.5 h-3.5" />
                <span>Textbook ({chapter.sections?.length || 0})</span>
              </button>

              <button
                onClick={() => handleTabChange("quiz")}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                  activeTab === "quiz"
                    ? "bg-white text-green-700 shadow-sm"
                    : "text-neutral-600 hover:text-neutral-900"
                }`}
              >
                <HelpCircle className="w-3.5 h-3.5" />
                <span>MCQs ({chapter.mcqs?.length || 0})</span>
              </button>

              <button
                onClick={() => handleTabChange("subjective")}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                  activeTab === "subjective"
                    ? "bg-white text-green-700 shadow-sm"
                    : "text-neutral-600 hover:text-neutral-900"
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
          {/* Sidebar */}
          <aside className="lg:col-span-1 hidden lg:block">
            <div className="sticky top-20 bg-white rounded-2xl border border-neutral-200 p-4 shadow-sm space-y-4">
              <div>
                <span className="text-[11px] font-extrabold text-neutral-400 uppercase tracking-wider block mb-2">
                  Sections & Diagrams
                </span>
                <nav className="space-y-1 max-h-[60vh] overflow-y-auto pr-1 text-xs">
                  {chapter.sections?.map((sec, idx) => (
                    <a
                      key={sec.id}
                      href={`#${sec.id}`}
                      className="block px-3 py-2 rounded-lg text-neutral-700 hover:bg-neutral-100 hover:text-green-700 font-semibold transition-colors truncate"
                    >
                      {idx + 1}. {sec.title}
                    </a>
                  ))}
                </nav>
              </div>

              <div className="pt-3 border-t border-neutral-100 text-[11px] space-y-1.5">
                <div className="flex items-center justify-between text-neutral-500 font-medium">
                  <span>Diagrams:</span>
                  <span className="font-bold text-green-700">{chapter.totalImages || 0}</span>
                </div>
                <div className="flex items-center justify-between text-neutral-500 font-medium">
                  <span>MCQ Count:</span>
                  <span className="font-bold text-green-700">{chapter.mcqs?.length || 0}</span>
                </div>
                <div className="flex items-center justify-between text-neutral-500 font-medium">
                  <span>Subjective Qs:</span>
                  <span className="font-bold text-green-700">{chapter.subjectiveQuestions?.length || 0}</span>
                </div>
              </div>
            </div>
          </aside>

          {/* Main Reading View */}
          <main className="lg:col-span-3">
            {activeTab === "reading" && (
              <div className="space-y-8">
                {/* Specific Learning Objectives Card */}
                {chapter.objectives && chapter.objectives.length > 0 && (
                  <div className="bg-neutral-100/60 rounded-2xl border border-neutral-300/80 p-5">
                    <h3 className="text-xs font-black text-neutral-800 uppercase tracking-wider flex items-center gap-2 mb-3">
                      <Award className="w-4 h-4 text-green-700" />
                      <span>INC CBME Learning Objectives</span>
                    </h3>
                    <ul className="space-y-2 text-xs text-neutral-700">
                      {chapter.objectives.map((obj, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <CheckCircle2 className="w-3.5 h-3.5 text-green-700 shrink-0 mt-0.5" />
                          <span className="leading-relaxed font-medium">{renderFormattedText(obj)}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Sections */}
                {chapter.sections?.map((section, sIdx) => (
                  <section
                    key={section.id}
                    id={section.id}
                    className="bg-white rounded-2xl border border-neutral-200 p-6 sm:p-8 shadow-sm space-y-6 scroll-mt-24"
                  >
                    <div className="border-b border-neutral-100 pb-3">
                      <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full bg-neutral-100 text-green-700 text-[10px] font-extrabold uppercase tracking-wider mb-1">
                        Section {sIdx + 1} of {chapter.sections.length}
                      </div>
                      <h2 className="text-xl sm:text-2xl font-black text-neutral-900 tracking-tight mt-1">
                        {section.title}
                      </h2>
                    </div>

                    {/* Section Explanatory Paragraphs */}
                    {section.content && section.content.length > 0 && (
                      <div className="space-y-3.5 text-xs sm:text-sm text-neutral-700 leading-relaxed font-normal">
                        {section.content.map((para, pIdx) => (
                          <p key={pIdx} className="leading-relaxed">
                            {renderFormattedText(para)}
                          </p>
                        ))}
                      </div>
                    )}

                    {/* Detailed Points with Clean Structured Layout Card */}
                    {section.points && section.points.length > 0 && (
                      <div className="bg-gradient-to-br from-neutral-50 bg-neutral-100/20 to-white rounded-2xl p-5 sm:p-6 border border-neutral-200/90 space-y-4 shadow-xs">
                        <div className="flex items-center justify-between border-b border-neutral-200/60 pb-3">
                          <div className="flex items-center gap-2 text-neutral-800 font-black text-xs uppercase tracking-wider">
                            <Sparkles className="w-4 h-4 text-green-700" />
                            <span>Key Physiological Concepts, Homeostatic Regulation & Mechanisms</span>
                          </div>
                          <span className="text-[11px] font-extrabold text-green-700 bg-neutral-100/80 px-2.5 py-0.5 rounded-full">
                            {section.points.length} Core Principles
                          </span>
                        </div>

                        <div className="grid grid-cols-1 gap-3 pt-1">
                          {section.points.map((pt, ptIdx) => {
                            const match = pt.match(/^\*\*(.*?)\*\*:?\s*(.*)$/);
                            const title = match ? match[1] : null;
                            const description = match ? match[2] : pt;

                            return (
                              <div
                                key={ptIdx}
                                className="bg-white rounded-xl p-3.5 border border-neutral-200/80 shadow-xs hover:border-neutral-300 transition-all"
                              >
                                {title ? (
                                  <div>
                                    <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md bg-neutral-100 border border-neutral-300 text-neutral-800 text-xs font-black mb-1.5">
                                      <Tag className="w-3 h-3 text-green-700" />
                                      <span>{title}</span>
                                    </div>
                                    <p className="text-xs sm:text-sm text-neutral-700 leading-relaxed pl-1">
                                      {renderFormattedText(description)}
                                    </p>
                                  </div>
                                ) : (
                                  <div className="flex items-start gap-2.5">
                                    <div className="w-2 h-2 rounded-full bg-green-500 mt-2 shrink-0 ring-4 ring-neutral-400" />
                                    <p className="text-xs sm:text-sm text-neutral-700 leading-relaxed flex-1">
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
                      <div className="bg-gradient-to-r bg-neutral-100/90 bg-neutral-100/40 to-white border-l-4 border-green-500 rounded-r-2xl p-5 shadow-xs">
                        <div className="flex items-center gap-2 font-black text-neutral-800 text-xs sm:text-sm mb-1.5">
                          <Stethoscope className="w-4 h-4 text-green-700" />
                          <span>Clinical Nursing Pearl & Physiological Correlation</span>
                        </div>
                        <p className="text-xs sm:text-sm text-neutral-700 leading-relaxed font-medium">
                          {renderFormattedText(section.clinicalPearl)}
                        </p>
                      </div>
                    )}

                    {/* Images */}
                    {section.images && section.images.length > 0 && (
                      <div className="space-y-4 pt-2">
                        {section.images.map((img, imgIdx) => (
                          <div
                            key={imgIdx}
                            className="bg-neutral-50 rounded-xl border border-neutral-200 overflow-hidden shadow-sm group hover:border-neutral-300 transition-all"
                          >
                            <div className="relative bg-white p-3 flex items-center justify-center min-h-[220px]">
                              <img
                                src={img.src}
                                alt={img.alt || img.caption}
                                className="max-h-[460px] w-auto object-contain rounded-md cursor-zoom-in group-hover:scale-[1.01] transition-transform"
                                onClick={() => setZoomImage(img)}
                                onError={(e) => {
                                  e.target.style.display = 'none';
                                  e.target.parentNode.innerHTML += `<div class="p-6 text-center text-xs text-neutral-400 font-semibold">Diagram: ${img.caption}</div>`;
                                }}
                              />
                              <button
                                onClick={() => setZoomImage(img)}
                                className="absolute bottom-4 right-4 p-2 rounded-lg bg-neutral-900/70 hover:bg-green-500 text-white backdrop-blur-sm transition-all cursor-pointer shadow-md"
                                title="Click to enlarge diagram"
                              >
                                <ZoomIn className="w-4 h-4" />
                              </button>
                            </div>
                            <div className="p-3 bg-neutral-50 border-t border-neutral-100 text-xs font-bold text-neutral-700 flex items-center justify-between">
                              <span className="leading-snug">{img.caption}</span>
                              <span className="text-[10px] text-green-700 font-semibold shrink-0 ml-3">
                                Physiological Mechanism
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Tables */}
                    {section.tables && section.tables.length > 0 && (
                      <div className="space-y-4 pt-2">
                        {section.tables.map((table, tIdx) => (
                          <div key={tIdx} className="overflow-x-auto rounded-xl border border-neutral-200">
                            <table className="min-w-full divide-y divide-neutral-200 text-xs text-left">
                              <tbody className="divide-y divide-neutral-100 bg-white">
                                {table.map((row, rIdx) => (
                                  <tr
                                    key={rIdx}
                                    className={rIdx === 0 ? "bg-neutral-100/80 font-bold text-neutral-800" : "hover:bg-neutral-50"}
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
                <div className="bg-white rounded-2xl border border-neutral-200 p-6 flex items-center justify-between">
                  {prevChapter ? (
                    <Link
                      to={`/physiology/lesson/${prevChapter.id}`}
                      className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-neutral-100 hover:bg-neutral-200 text-neutral-800 font-bold text-xs transition-colors"
                    >
                      <ArrowRight className="w-4 h-4 rotate-180" />
                      <span>Unit {prevChapter.unitNumber}: {prevChapter.title}</span>
                    </Link>
                  ) : <div />}

                  {nextChapter ? (
                    <Link
                      to={`/physiology/lesson/${nextChapter.id}`}
                      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-green-500 hover:bg-green-500 text-white font-extrabold text-xs shadow-md shadow-md transition-all"
                    >
                      <span>Next: Unit {nextChapter.unitNumber} ({nextChapter.title})</span>
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  ) : <div />}
                </div>
              </div>
            )}

            {/* MCQs Practice */}
            {activeTab === "quiz" && (
              <div className="bg-white rounded-2xl border border-neutral-200 p-6 sm:p-8 shadow-sm space-y-6">
                <div>
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-neutral-100 text-green-700 text-xs font-bold border border-neutral-300 mb-2">
                    <Sparkles className="w-3.5 h-3.5 text-green-700" />
                    <span>Official CBME Objective Questions • Unit {chapter.unitNumber}</span>
                  </div>
                  <h2 className="text-xl sm:text-2xl font-black text-neutral-900">
                    Unit {chapter.unitNumber} Multiple Choice Questions ({chapter.mcqs?.length || 0})
                  </h2>
                  <p className="text-neutral-600 text-xs mt-1">
                    Select your answer to test your comprehension of physiological concepts.
                  </p>
                </div>

                <div className="space-y-4 pt-2">
                  {chapter.mcqs?.map((mcq, idx) => {
                    const isAnswerVisible = showAnswers[mcq.id];
                    return (
                      <div
                        key={mcq.id}
                        className="p-5 rounded-xl border border-neutral-200 bg-neutral-50/50 space-y-3"
                      >
                        <div className="flex items-start justify-between gap-3">
                          <span className="font-extrabold text-green-700 text-xs shrink-0">
                            Q{idx + 1}.
                          </span>
                          <p className="text-xs sm:text-sm font-bold text-neutral-800 flex-1 leading-snug">
                            {mcq.question}
                          </p>
                          <span className="text-[10px] px-2 py-0.5 rounded bg-neutral-200 text-neutral-600 font-semibold shrink-0">
                            {mcq.subtopic || "Physiology"}
                          </span>
                        </div>

                        <div className="pt-2 flex items-center justify-between border-t border-neutral-200/60">
                          <button
                            onClick={() => toggleShowAnswer(mcq.id)}
                            className="text-xs font-bold text-green-700 hover:text-green-700 underline cursor-pointer"
                          >
                            {isAnswerVisible ? "Hide Answer" : "Show Correct Answer"}
                          </button>

                          {isAnswerVisible && (
                            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-green-100 text-green-900 font-bold text-xs border border-green-400">
                              <CheckCircle2 className="w-3.5 h-3.5 text-green-700" />
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

            {/* University Subjective Questions */}
            {activeTab === "subjective" && (
              <div className="bg-white rounded-2xl border border-neutral-200 p-6 sm:p-8 shadow-sm space-y-6">
                <div>
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-neutral-100 text-green-700 text-xs font-bold border border-neutral-300 mb-2">
                    <Sparkles className="w-3.5 h-3.5 text-green-700" />
                    <span>Official University Exam Question Bank • Unit {chapter.unitNumber}</span>
                  </div>
                  <h2 className="text-xl sm:text-2xl font-black text-neutral-900">
                    Subjective Questions (2, 5 & 10 Marks)
                  </h2>
                  <p className="text-neutral-600 text-xs mt-1">
                    Standard university format questions for Semester I examination preparation.
                  </p>
                </div>

                <div className="space-y-3 pt-2">
                  {chapter.subjectiveQuestions?.map((sq, idx) => (
                    <div
                      key={sq.id || idx}
                      className="p-4 rounded-xl border border-neutral-200 hover:border-neutral-300 bg-neutral-50/40 flex items-start justify-between gap-4 transition-all"
                    >
                      <div className="flex items-start gap-3 flex-1">
                        <span className="font-extrabold text-green-700 text-xs shrink-0 mt-0.5">
                          {idx + 1}.
                        </span>
                        <div>
                          <p className="text-xs sm:text-sm font-bold text-neutral-800 leading-snug">
                            {sq.question}
                          </p>
                          <span className="text-[10px] text-neutral-500 font-semibold mt-1 inline-block">
                            Type: {sq.type}
                          </span>
                        </div>
                      </div>

                      <span className={`px-2.5 py-1 rounded-full text-[11px] font-black shrink-0 border ${
                        sq.marks === 10
                          ? "bg-neutral-100 text-black dark:text-white border-neutral-400"
                          : sq.marks === 5
                          ? "bg-neutral-100 text-neutral-800 border-neutral-300"
                          : "bg-neutral-100 text-green-700 border-neutral-300"
                      }`}>
                        {sq.marks} Marks
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Bottom Chapter Test & Cumulative Grand Final Roadmap Callout */}
            <div className="mt-12 p-6 sm:p-8 rounded-3xl border bg-gradient-to-r from-green-50 via-white to-green-50/30 border-green-100 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xs">
              <div className="space-y-2">
                <div className="flex items-center gap-2 flex-wrap">
                  {completed ? (
                    <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-black bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-400 border border-green-400">
                      <CheckCircle2 className="w-3.5 h-3.5 text-green-500 dark:text-green-400" />
                      Unit {chapter.unitNumber} Assessment Passed & Mastered
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-black bg-neutral-100 dark:bg-neutral-900 text-neutral-800 dark:text-neutral-300 border border-neutral-300">
                      Chapter Test Required
                    </span>
                  )}
                  <span className="text-xs font-bold text-neutral-500 dark:text-neutral-400">
                    Curriculum Standing: {gating.completedCount} of 12 Units Mastered ({gating.completionPercent}%)
                  </span>
                </div>

                <h3 className="text-lg sm:text-xl font-black text-neutral-900 dark:text-neutral-100">
                  {completed
                    ? `Unit ${chapter.unitNumber} Mastery Complete! Next Step:`
                    : `Next Step: Take Unit ${chapter.unitNumber} Assessment Test`}
                </h3>

                <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 max-w-2xl leading-relaxed">
                  {completed
                    ? (gating.isFinalUnlocked
                        ? "🎉 Congratulations! You have mastered all 12 units. The Comprehensive Physiology Grand Final Examination (48 questions across all chapters) is unlocked and ready!"
                        : `Unit ${chapter.unitNumber} is certified. You have completed ${gating.completedCount} of 12 chapters. Complete the remaining ${gating.remainingCount} chapters to unlock the Grand Final Exam.`)
                    : `Under INC standards, take the 15-question test for Unit ${chapter.unitNumber}. Passing with ≥ 75% marks validates competency and counts toward unlocking the cumulative Grand Final Examination.`
                  }
                </p>
              </div>

              <div className="flex items-center gap-3 shrink-0 flex-wrap">
                {/* Primary Chapter Test CTA */}
                <Link
                  to={`/quiz/${chapter.id}`}
                  className="px-5 py-3 rounded-2xl bg-green-500 hover:bg-green-700 text-white font-black text-xs sm:text-sm shadow-md shadow-green-500/25 transition-all flex items-center gap-2 cursor-pointer hover:scale-102"
                >
                  <ClipboardList className="w-4 h-4" />
                  <span>{completed ? "Retake Chapter Test" : `Take Unit ${chapter.unitNumber} Test (15 MCQs) →`}</span>
                </Link>

                {/* If all 12 units mastered, show Grand Final CTA */}
                {gating.isFinalUnlocked ? (
                  <Link
                    to="/quiz/physiology-grand-final"
                    className="px-5 py-3 rounded-2xl bg-green-500 hover:bg-green-700 text-white font-black text-xs sm:text-sm shadow-md transition-all flex items-center gap-2 cursor-pointer hover:scale-102"
                  >
                    <Sparkles className="w-4 h-4" />
                    <span>Take Grand Final Exam (All 12 Chapters) →</span>
                  </Link>
                ) : (
                  nextChapter && (
                    <Link
                      to={`/physiology/lesson/${nextChapter.id}`}
                      className="px-4 py-2.5 rounded-xl bg-neutral-900 hover:bg-neutral-800 text-white font-bold text-xs shadow-md transition-all flex items-center gap-1.5"
                    >
                      <span>Next Unit ({nextChapter.unitNumber}) →</span>
                    </Link>
                  )
                )}
              </div>
            </div>
          </main>
        </div>
      </div>

      {/* Image Zoom Modal */}
      {zoomImage && (
        <div
          className="fixed inset-0 z-50 bg-neutral-900/85 backdrop-blur-md flex items-center justify-center p-4"
          onClick={() => setZoomImage(null)}
        >
          <div
            className="bg-white rounded-2xl max-w-5xl max-h-[92vh] overflow-hidden shadow-2xl p-4 flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-3 border-b border-neutral-100">
              <span className="text-xs font-bold text-neutral-800">{zoomImage.caption}</span>
              <button
                onClick={() => setZoomImage(null)}
                className="text-xs font-bold text-neutral-400 hover:text-neutral-600 px-2 py-1 rounded-md"
              >
                ✕ Close
              </button>
            </div>
            <div className="flex-1 overflow-auto p-4 flex items-center justify-center bg-neutral-950/5 rounded-lg my-2">
              <img
                src={zoomImage.src}
                alt={zoomImage.caption}
                className="max-h-[75vh] w-auto object-contain rounded-md shadow-md"
              />
            </div>
            <div className="pt-2 text-right">
              <button
                onClick={() => setZoomImage(null)}
                className="px-4 py-1.5 rounded-lg bg-green-500 text-white font-bold text-xs"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PhysiologyLessonView;
