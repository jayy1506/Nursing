import React, { useState, useEffect } from "react";
import { useParams, Link, useSearchParams } from "react-router-dom";
import { PHYSIOLOGY_CHAPTERS } from "../../constants/physiologyChaptersData";
import { PHYSIOLOGY_UNITS } from "../../constants/physiologyData";
import {
  ArrowRight,
  BookOpen,
  Sparkles,
  ChevronRight,
  ChevronLeft,
  ChevronDown,
  XCircle,
  X,
  ZoomIn,
  CheckCircle2,
  Award,
  Layers,
  FileText,
  HelpCircle,
  Activity,
  Stethoscope,
  Tag,
  ClipboardList,
  Box
} from "lucide-react";
import { useCurriculumProgress } from "../../services/curriculumProgress";
import SubtopicQuiz15Marks from "../../components/curriculum/SubtopicQuiz15Marks";
import SubtopicNavFooter from "../../components/curriculum/SubtopicNavFooter";
import SubtopicMedicalPlate from "../../components/curriculum/SubtopicMedicalPlate";

// High-yield anatomical & physiological terms to auto-highlight in dark color
const IMPORTANT_TERMS_REGEX = /\b(Anatomy|Human Physiology|Physiology|Gross Anatomy|Microscopic Anatomy|Cytology|Histology|Regional Anatomy|Systemic Anatomy|Anatomical Position|Anterior|Posterior|Ventral|Dorsal|Superior|Inferior|Cranial|Caudal|Medial|Lateral|Proximal|Distal|Superficial|Deep|Sagittal Plane|Coronal Plane|Transverse Plane|Frontal Plane|Axial Plane|Midsagittal|Parasagittal|Prone|Supine|Abduction|Adduction|Homeostasis|Mitochondria|Nucleus|Endoplasmic Reticulum|Golgi apparatus|Lysosome|Cytoplasm|Cell membrane|Plasma membrane|Epithelial|Connective tissue|Hypertension|Action potential|Refractory period|Depolarization|Repolarization|Synapse|Neurotransmitter|Cardiac output|Stroke volume|Tidal volume|Glomerular filtration|Osmosis|Diffusion|Negative feedback|Positive feedback)\b/gi;

// Formatter to render text with dark colors, high-contrast, and highlighted important keywords
const renderFormattedText = (text) => {
  if (typeof text !== "string") return text;
  const parts = text.split(/(\*\*.*?\*\*)/g);
  return parts.map((part, index) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      return (
        <strong
          key={index}
          className="font-black text-[#123B50] bg-[#E9F5F3] px-1.5 py-0.5 rounded border border-[#159A91]/40 tracking-tight"
        >
          {part.slice(2, -2)}
        </strong>
      );
    }

    const subParts = part.split(IMPORTANT_TERMS_REGEX);
    return subParts.map((sub, sIdx) => {
      IMPORTANT_TERMS_REGEX.lastIndex = 0;
      if (IMPORTANT_TERMS_REGEX.test(sub)) {
        return (
          <strong
            key={`${index}-${sIdx}`}
            className="font-black text-[#123B50] bg-[#E9F5F3]/70 px-1 py-0.5 rounded tracking-tight underline decoration-[#159A91]/50 decoration-1 underline-offset-2"
          >
            {sub}
          </strong>
        );
      }

      if (sub.includes("e.g.") || sub.includes("E.g.")) {
        const egParts = sub.split(/(e\.g\.[^,.;]+)/gi);
        return egParts.map((egSub, eIdx) => {
          if (/^e\.g\./i.test(egSub)) {
            return (
              <span
                key={`${index}-${sIdx}-${eIdx}`}
                className="font-extrabold text-[#123B50] bg-[#F2B66D]/25 px-1.5 py-0.5 rounded text-xs border border-[#F2B66D]/40 mx-0.5"
              >
                {egSub}
              </span>
            );
          }
          return egSub;
        });
      }

      return sub;
    });
  });
};

// Smart Content Renderer: Formats terms into structured cards and avoids duplicate point repetition
const renderSectionContent = (content = [], points = []) => {
  const renderedItems = [];
  const contentLowerSet = new Set();

  content.forEach((item, idx) => {
    const trimmed = (item || "").trim();
    if (!trimmed) return;
    contentLowerSet.add(trimmed.toLowerCase());

    const isHeading =
      (trimmed.length <= 35 && !trimmed.endsWith(".") && !trimmed.includes(":")) ||
      trimmed.toLowerCase() === "definition" ||
      trimmed.toLowerCase().startsWith("physiological principles");

    if (isHeading) {
      renderedItems.push(
        <div
          key={`head-${idx}`}
          className="pt-3 pb-1.5 border-b-2 border-[#159A91]/30 flex items-center gap-2 mt-3 first:mt-0"
        >
          <div className="w-2.5 h-2.5 rounded-full bg-[#159A91]" />
          <h3 className="text-sm sm:text-base font-black text-[#123B50] uppercase tracking-wide">
            {trimmed}
          </h3>
        </div>
      );
      return;
    }

    if (/^Figure\s*\d+\.\d+:/i.test(trimmed) && trimmed.length < 80) {
      renderedItems.push(
        <div
          key={`figref-${idx}`}
          className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-neutral-100 border border-neutral-300 text-xs font-bold text-[#123B50] my-1"
        >
          <Layers className="w-3.5 h-3.5 text-[#159A91]" />
          <span>{trimmed}</span>
        </div>
      );
      return;
    }

    const colonMatch = trimmed.match(/^([A-Z][A-Za-z0-9\s()/-]{2,35}?)\s*:\s+(.+)$/);
    const isMatch = trimmed.match(/^(Homeostasis|Negative feedback|Positive feedback|Action potential|Cardiac cycle|Glomerular filtration|Osmosis|Diffusion|Cellular respiration)\s+(is the|deals with|is a|is)\s+(.+)$/i);

    if (colonMatch || isMatch) {
      const termName = colonMatch ? colonMatch[1] : isMatch[1];
      const termDefWithExample = colonMatch ? colonMatch[2] : `${isMatch[2]} ${isMatch[3]}`;

      const egSplit = termDefWithExample.split(/,\s*e\.g\.|\s+e\.g\./i);
      const mainDef = egSplit[0];
      const exampleText = egSplit.length > 1 ? egSplit.slice(1).join(", e.g. ") : null;

      renderedItems.push(
        <div
          key={`def-${idx}`}
          className="bg-white rounded-2xl border-2 border-neutral-200/90 hover:border-[#159A91] p-4 sm:p-5 shadow-2xs hover:shadow-xs transition-all space-y-2.5 my-2"
        >
          <div className="flex flex-wrap items-center justify-between gap-2">
            <span className="px-3 py-1 rounded-xl bg-[#E9F5F3] text-[#123B50] border border-[#159A91]/40 text-xs sm:text-sm font-black flex items-center gap-1.5 shadow-2xs">
              <Tag className="w-3.5 h-3.5 text-[#159A91]" />
              <span>{termName}</span>
            </span>
            <span className="text-[10px] font-extrabold uppercase tracking-wider text-[#159A91] bg-[#E9F5F3] px-2 py-0.5 rounded-md border border-[#159A91]/30">
              Core Physiological Mechanism
            </span>
          </div>

          <p className="text-sm sm:text-[15px] font-bold text-[#263746] leading-relaxed">
            {renderFormattedText(mainDef)}
          </p>

          {exampleText && (
            <div className="p-3 rounded-xl bg-[#F2B66D]/15 border border-[#F2B66D]/40 text-xs text-[#123B50] font-bold flex items-start gap-2">
              <span className="px-2 py-0.5 rounded bg-[#F2B66D] text-[#123B50] font-black text-[10px] shrink-0 uppercase tracking-wide">
                Clinical Example
              </span>
              <span className="leading-relaxed">{renderFormattedText(exampleText)}</span>
            </div>
          )}
        </div>
      );
      return;
    }

    renderedItems.push(
      <p
        key={`p-${idx}`}
        className="text-sm sm:text-base font-semibold text-[#263746] leading-relaxed"
      >
        {renderFormattedText(trimmed)}
      </p>
    );
  });

  const distinctPoints = (points || []).filter((pt) => {
    const trimmed = (pt || "").trim().toLowerCase();
    if (!trimmed || trimmed === "definition") return false;
    return !contentLowerSet.has(trimmed);
  });

  return (
    <div className="space-y-4">
      <div className="space-y-3">{renderedItems}</div>

      {distinctPoints.length > 0 && (
        <div className="bg-gradient-to-br from-[#E9F5F3]/50 via-white to-[#E9F5F3]/20 rounded-2xl p-5 sm:p-6 border-2 border-[#159A91]/30 space-y-4 shadow-xs mt-6">
          <div className="flex items-center justify-between border-b border-[#159A91]/30 pb-3">
            <div className="flex items-center gap-2 text-[#123B50] font-black text-xs uppercase tracking-wider">
              <Sparkles className="w-4 h-4 text-[#159A91]" />
              <span>Key Physiological Concepts, Homeostatic Regulation &amp; Mechanisms</span>
            </div>
            <span className="text-[11px] font-extrabold text-[#123B50] bg-[#E9F5F3] border border-[#159A91]/30 px-2.5 py-0.5 rounded-full">
              {distinctPoints.length} Core Principles
            </span>
          </div>

          <div className="grid grid-cols-1 gap-3 pt-1">
            {distinctPoints.map((pt, ptIdx) => {
              const match = pt.match(/^\*\*(.*?)\*\*:?\s*(.*)$/);
              const title = match ? match[1] : null;
              const description = match ? match[2] : pt;

              return (
                <div
                  key={ptIdx}
                  className="bg-white rounded-xl p-4 border border-neutral-200/90 shadow-2xs hover:border-[#159A91] transition-all space-y-1.5"
                >
                  {title ? (
                    <div>
                      <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md bg-[#E9F5F3] border border-[#159A91]/30 text-[#123B50] text-xs font-black mb-1">
                        <Tag className="w-3 h-3 text-[#159A91]" />
                        <span>{title}</span>
                      </div>
                      <p className="text-sm font-bold text-[#263746] leading-relaxed">
                        {renderFormattedText(description)}
                      </p>
                    </div>
                  ) : (
                    <div className="flex items-start gap-3">
                      <div className="w-2.5 h-2.5 rounded-full bg-[#159A91] mt-1.5 shrink-0 ring-4 ring-[#E9F5F3]" />
                      <p className="text-sm font-bold text-[#263746] leading-relaxed flex-1">
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
    </div>
  );
};

export const PhysiologyLessonView = () => {
  const { chapterId } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();

  const chapter = PHYSIOLOGY_CHAPTERS[chapterId] || PHYSIOLOGY_CHAPTERS["phys-unit-1"];
  const activeTabParam = searchParams.get("tab") || "reading";
  const [activeTab, setActiveTab] = useState(activeTabParam);
  const [viewMode, setViewMode] = useState("single");
  const [zoomImage, setZoomImage] = useState(null);
  const [showSubtopicDrawer, setShowSubtopicDrawer] = useState(false);
  const [currentUnitMcqIndex, setCurrentUnitMcqIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({});

  // Active subtopic index
  const [activeSectionIndex, setActiveSectionIndex] = useState(() => {
    const secParam = searchParams.get("section");
    if (secParam && chapter.sections) {
      const foundIdx = chapter.sections.findIndex((s) => s.id === secParam);
      if (foundIdx >= 0) return foundIdx;
    }
    return 0;
  });

  // Real-time automatic curriculum progress
  const { isCompleted, toggleCompletion, gating } = useCurriculumProgress('physiology');
  const completed = isCompleted(chapter.id);

  // MCQ state
  const [showAnswers, setShowAnswers] = useState({});

  useEffect(() => {
    const tab = searchParams.get("tab");
    if (tab) setActiveTab(tab);

    const secParam = searchParams.get("section");
    if (secParam && chapter.sections) {
      const foundIdx = chapter.sections.findIndex((s) => s.id === secParam);
      if (foundIdx >= 0) setActiveSectionIndex(foundIdx);
    }
  }, [chapterId, searchParams, chapter.sections]);

  const handleSelectSection = (idx) => {
    if (!chapter.sections || !chapter.sections[idx]) return;
    setActiveSectionIndex(idx);
    setSearchParams({
      tab: activeTab,
      section: chapter.sections[idx].id
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

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
    <div className="min-h-screen bg-neutral-50 dark:bg-neutral-950 text-neutral-900 dark:text-neutral-100 antialiased selection:bg-[#159A91] selection:text-white pb-24 font-sans transition-colors">
      {/* Focused Textbook Top Bar (Replaces Navbar in Syllabus) */}
      <header className="sticky top-0 z-40 bg-[#123B50] text-white py-3 px-4 sm:px-6 lg:px-8 shadow-md">
        <div className="w-full flex items-center justify-between text-xs">
          <div className="flex items-center gap-3">
            <Link
              to="/physiology-syllabus"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold transition-all border border-white/10 cursor-pointer"
            >
              <ArrowRight className="w-3.5 h-3.5 rotate-180" />
              <span>Back to Syllabus</span>
            </Link>
            <span className="hidden sm:inline-block w-px h-4 bg-white/20" />
            <span className="hidden sm:inline-block font-bold text-white/90 truncate max-w-sm">
              Unit {chapter.unitNumber}: {chapter.title}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <Link
              to="/explorer"
              className="px-3 py-1.5 rounded-xl bg-white/10 hover:bg-[#159A91] text-white font-bold transition-all text-xs inline-flex items-center gap-1.5 border border-white/20 shadow-xs cursor-pointer group"
              title="Enter 3D Anatomy Playground"
            >
              <Box className="w-3.5 h-3.5 text-[#159A91] group-hover:text-white transition-colors" />
              <span className="hidden sm:inline">3D Playground</span>
            </Link>

            <button
              type="button"
              onClick={() => toggleCompletion(chapter.id)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer inline-flex items-center gap-1.5 ${
                completed
                  ? "bg-[#159A91] text-white shadow-xs"
                  : "bg-white/10 hover:bg-white/20 text-white border border-white/10"
              }`}
            >
              <CheckCircle2 className={`w-3.5 h-3.5 ${completed ? "text-[#F2B66D]" : "text-white/60"}`} />
              <span>{completed ? "Completed ✓" : "Mark Done"}</span>
            </button>

            {prevChapter && (
              <Link
                to={`/physiology/lesson/${prevChapter.id}`}
                className="hidden md:inline-flex px-2.5 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold transition-colors"
              >
                ← Prev
              </Link>
            )}
            {nextChapter && (
              <Link
                to={`/physiology/lesson/${nextChapter.id}`}
                className="hidden md:inline-flex px-2.5 py-1.5 rounded-xl bg-[#159A91] hover:bg-[#159A91]/80 text-white font-bold transition-colors"
              >
                Next →
              </Link>
            )}
          </div>
        </div>
      </header>

      {/* Hero Unit Header Banner - Full Page Width */}
      <section className="bg-white border-b border-neutral-200 px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        <div className="w-full">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#E9F5F3] text-[#123B50] text-xs font-extrabold border border-[#159A91]/20 mb-2">
                <Sparkles className="w-3.5 h-3.5 text-[#159A91]" />
                <span>Unit {chapter.unitNumber} • {chapter.category}</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-black text-[#123B50] tracking-tight">
                {chapter.title}
              </h1>
              <p className="text-neutral-600 text-xs sm:text-sm mt-1 max-w-4xl leading-relaxed">
                {chapter.summary}
              </p>
            </div>

            {/* Mode Switcher Tabs */}
            <div className="flex items-center gap-1.5 p-1 bg-neutral-100 rounded-2xl self-start lg:self-center border border-neutral-200">
              <button
                onClick={() => handleTabChange("reading")}
                className={`px-3.5 py-2 rounded-xl text-xs font-extrabold transition-all cursor-pointer flex items-center gap-1.5 ${
                  activeTab === "reading"
                    ? "bg-[#123B50] text-white shadow-xs"
                    : "text-neutral-600 hover:text-neutral-900"
                }`}
              >
                <BookOpen className="w-3.5 h-3.5" />
                <span>Textbook ({chapter.sections?.length || 0})</span>
              </button>

              <button
                onClick={() => handleTabChange("quiz")}
                className={`px-3.5 py-2 rounded-xl text-xs font-extrabold transition-all cursor-pointer flex items-center gap-1.5 ${
                  activeTab === "quiz"
                    ? "bg-[#123B50] text-white shadow-xs"
                    : "text-neutral-600 hover:text-neutral-900"
                }`}
              >
                <HelpCircle className="w-3.5 h-3.5" />
                <span>MCQs ({chapter.mcqs?.length || 0})</span>
              </button>

              <button
                onClick={() => handleTabChange("subjective")}
                className={`px-3.5 py-2 rounded-xl text-xs font-extrabold transition-all cursor-pointer flex items-center gap-1.5 ${
                  activeTab === "subjective"
                    ? "bg-[#123B50] text-white shadow-xs"
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

      {/* Main Content Area - Full Page Width with Clean Typography */}
      <div className="w-full px-4 sm:px-6 lg:px-8 pt-6">
        <main className="w-full">
          {activeTab === "reading" && (
            <div className="space-y-8">
              {/* Specific Learning Objectives Card */}
              {chapter.objectives && chapter.objectives.length > 0 && (
                <div className="bg-gradient-to-br from-[#E9F5F3]/70 via-white to-[#E9F5F3]/40 rounded-2xl border border-[#159A91]/20 p-5 sm:p-6 shadow-xs">
                  <h3 className="text-xs font-black text-[#123B50] uppercase tracking-wider flex items-center gap-2 mb-3">
                    <Award className="w-4 h-4 text-[#159A91]" />
                    <span>INC CBME Specific Learning Objectives</span>
                  </h3>
                  <ul className="space-y-2.5 text-xs sm:text-sm text-neutral-700">
                    {chapter.objectives.map((obj, i) => (
                      <li key={i} className="flex items-start gap-2.5">
                        <CheckCircle2 className="w-4 h-4 text-[#159A91] shrink-0 mt-0.5" />
                        <span className="leading-relaxed font-medium">{renderFormattedText(obj)}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Subtopic Top Navigation Bar with Drawer Selector */}
              <div className="bg-white rounded-2xl border border-neutral-200/90 p-4 shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="px-3 py-1 rounded-full bg-[#159A91] text-white text-xs font-black uppercase tracking-wider shadow-2xs">
                    Subtopic {activeSectionIndex + 1} of {chapter.sections?.length || 1}
                  </span>
                  <span className="text-xs font-black text-[#123B50] line-clamp-1 max-w-md">
                    {chapter.sections?.[activeSectionIndex]?.title}
                  </span>
                </div>

                <div className="flex items-center gap-2 self-end sm:self-auto text-xs">
                  <button
                    type="button"
                    onClick={() => setShowSubtopicDrawer(true)}
                    className="px-3 py-1.5 rounded-xl border border-[#159A91]/40 bg-[#E9F5F3] hover:bg-[#159A91] hover:text-white text-[#123B50] font-black transition-all shadow-2xs cursor-pointer flex items-center gap-1.5"
                  >
                    <span>Browse All Subtopics ({chapter.sections?.length || 0})</span>
                    <ChevronDown className="w-3.5 h-3.5" />
                  </button>

                  <button
                    type="button"
                    onClick={() => setViewMode(viewMode === "single" ? "all" : "single")}
                    className="px-3 py-1.5 rounded-xl border border-neutral-200 bg-white hover:bg-[#E9F5F3] text-neutral-700 hover:text-[#123B50] font-bold transition-all shadow-2xs cursor-pointer"
                  >
                    {viewMode === "single" ? "View All Subtopics" : "Single Subtopic Focus"}
                  </button>
                </div>
              </div>

                {/* Subtopic Renderer */}
                {(() => {
                  const displaySections = viewMode === "single"
                    ? [chapter.sections?.[activeSectionIndex] || chapter.sections?.[0]].filter(Boolean)
                    : chapter.sections || [];

                  return displaySections.map((section, sIdx) => {
                    const actualIdx = viewMode === "single" ? activeSectionIndex : sIdx;
                    const prevSection = actualIdx > 0 ? chapter.sections?.[actualIdx - 1] : null;
                    const nextSection = actualIdx < (chapter.sections?.length || 1) - 1 ? chapter.sections?.[actualIdx + 1] : null;

                    return (
                      <section
                        key={section.id || actualIdx}
                        id={section.id}
                        className="bg-white rounded-2xl border border-neutral-200 p-6 sm:p-8 shadow-sm space-y-6 scroll-mt-24"
                      >
                        <div className="border-b border-neutral-100 pb-3">
                          <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full bg-[#E9F5F3] text-[#123B50] border border-[#159A91]/30 text-[10px] font-extrabold uppercase tracking-wider mb-1">
                            Subtopic {actualIdx + 1} of {chapter.sections?.length || 1}
                          </div>
                          <h2 className="text-xl sm:text-2xl font-black text-[#123B50] tracking-tight mt-1">
                            {section.title}
                          </h2>
                        </div>

                        {/* Section Content & Key Principles - Formatted with Dark Color & Highlighted Terms */}
                        {renderSectionContent(section.content, section.points)}

                        {/* Clinical Nursing Pearl Callout */}
                        {section.clinicalPearl && (
                          <div className="bg-gradient-to-r from-[#E9F5F3] via-white to-[#E9F5F3]/30 border-l-4 border-[#159A91] rounded-r-2xl p-5 shadow-xs">
                            <div className="flex items-center gap-2 font-black text-[#123B50] text-xs sm:text-sm mb-1.5">
                              <Stethoscope className="w-4 h-4 text-[#159A91]" />
                              <span>Clinical Nursing Pearl &amp; Physiological Correlation</span>
                            </div>
                            <p className="text-xs sm:text-sm text-[#263746] leading-relaxed font-bold">
                              {renderFormattedText(section.clinicalPearl)}
                            </p>
                          </div>
                        )}

                        {/* Dedicated Proper Medical Image / SVG Diagram for this Subtopic */}
                        <SubtopicMedicalPlate
                          subtopicId={section.id}
                          subtopicTitle={section.title}
                          subject="physiology"
                          images={section.images}
                        />

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

                        {/* Small 15 Marks Subtopic Quiz */}
                        <SubtopicQuiz15Marks
                          subtopicId={section.id}
                          subtopicTitle={section.title}
                          unitTitle={chapter.title}
                        />

                        {/* Below: Next and Previous Subtopic Navigation */}
                        <SubtopicNavFooter
                          currentIndex={actualIdx}
                          totalCount={chapter.sections?.length || 1}
                          prevSubtopic={
                            prevSection
                              ? {
                                  title: prevSection.title,
                                  onClick: () => handleSelectSection(actualIdx - 1)
                                }
                              : prevChapter
                              ? {
                                  title: `Unit ${prevChapter.unitNumber}: ${prevChapter.title}`,
                                  to: `/physiology/lesson/${prevChapter.id}`
                                }
                              : null
                          }
                          nextSubtopic={
                            nextSection
                              ? {
                                  title: nextSection.title,
                                  onClick: () => handleSelectSection(actualIdx + 1)
                                }
                              : nextChapter
                              ? {
                                  title: `Unit ${nextChapter.unitNumber}: ${nextChapter.title}`,
                                  to: `/physiology/lesson/${nextChapter.id}`
                                }
                              : null
                          }
                          subtopicsList={chapter.sections?.map((s) => ({ id: s.id, title: s.title }))}
                          onSelectSubtopic={handleSelectSection}
                          syllabusPath="/physiology-syllabus"
                          syllabusLabel="Return to Physiology Syllabus"
                          chapterComprehensivePath={`/quiz/${chapter.id}`}
                        />
                      </section>
                    );
                  });
                })()}

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

            {/* MCQs Practice Tab - Single Question Page Format */}
            {activeTab === "quiz" && (() => {
              const totalMcqs = chapter.mcqs?.length || 0;
              const mcq = chapter.mcqs?.[currentUnitMcqIndex] || chapter.mcqs?.[0];
              if (!mcq || totalMcqs === 0) {
                return (
                  <div className="bg-white rounded-3xl border border-neutral-200/90 p-8 text-center space-y-3">
                    <p className="text-sm font-bold text-neutral-600">No MCQs currently available for this unit.</p>
                  </div>
                );
              }

              const isAnswerVisible = showAnswers[mcq.id];
              const correctAnswer = mcq.answer || mcq.correctAnswer;
              const optionsList = mcq.options && mcq.options.length > 0 ? mcq.options : [
                correctAnswer,
                "Negative feedback loop",
                "Positive feedback amplification",
                "Extracellular buffering"
              ].filter((v, i, a) => a.indexOf(v) === i);
              const userSelected = selectedAnswers[mcq.id];

              return (
                <div className="bg-white rounded-3xl border border-neutral-200/90 p-6 sm:p-10 shadow-sm space-y-8 animate-in fade-in duration-200">
                  {/* Header & Question Navigation Tracker */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-neutral-200 pb-5">
                    <div className="space-y-1">
                      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#E9F5F3] text-[#123B50] text-xs font-black uppercase tracking-wider">
                        <Sparkles className="w-3.5 h-3.5 text-[#159A91]" />
                        <span>Unit {chapter.unitNumber} Objective Question Bank</span>
                      </div>
                      <h2 className="text-xl sm:text-2xl font-black text-neutral-900 tracking-tight">
                        Question {currentUnitMcqIndex + 1} of {totalMcqs}
                      </h2>
                    </div>

                    {/* Quick Question Jump Pills */}
                    <div className="flex items-center gap-1.5 flex-wrap max-w-md">
                      {chapter.mcqs.map((qItem, qIdx) => {
                        const isCurrent = qIdx === currentUnitMcqIndex;
                        const isAnswered = Boolean(selectedAnswers[qItem.id]);
                        return (
                          <button
                            key={qItem.id || qIdx}
                            type="button"
                            onClick={() => setCurrentUnitMcqIndex(qIdx)}
                            className={`w-8 h-8 rounded-xl text-xs font-black transition-all flex items-center justify-center cursor-pointer ${
                              isCurrent
                                ? "bg-[#123B50] text-white shadow-sm ring-2 ring-[#159A91]"
                                : isAnswered
                                ? "bg-[#159A91] text-white"
                                : "bg-neutral-100 hover:bg-neutral-200 text-neutral-600"
                            }`}
                            title={`Jump to Question ${qIdx + 1}`}
                          >
                            {qIdx + 1}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Single Question Scenario Card */}
                  <div className="space-y-6">
                    <div className="bg-neutral-50/70 rounded-2xl border border-neutral-200/80 p-5 sm:p-6 space-y-3">
                      <div className="flex items-center justify-between gap-2">
                        <span className="text-[11px] font-black uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-white border border-neutral-200 text-[#123B50]">
                          {mcq.subtopic || "Physiology Assessment"}
                        </span>
                        {userSelected && (
                          <span className="text-[11px] font-bold text-[#159A91] flex items-center gap-1">
                            <CheckCircle2 className="w-3.5 h-3.5" />
                            Option Selected
                          </span>
                        )}
                      </div>
                      <h3 className="text-base sm:text-lg font-extrabold text-[#123B50] leading-relaxed">
                        {mcq.question}
                      </h3>
                    </div>

                    {/* Full-Width Options */}
                    <div className="grid grid-cols-1 gap-3">
                      {optionsList.map((opt, oIdx) => {
                        const label = String.fromCharCode(65 + oIdx);
                        const isSelected = userSelected === opt;
                        const isCorrect = isAnswerVisible && opt.toLowerCase().trim() === correctAnswer?.toLowerCase().trim();
                        const isWrongSelected = isAnswerVisible && isSelected && opt.toLowerCase().trim() !== correctAnswer?.toLowerCase().trim();

                        return (
                          <button
                            key={oIdx}
                            type="button"
                            onClick={() => setSelectedAnswers((prev) => ({ ...prev, [mcq.id]: opt }))}
                            className={`w-full text-left p-4 sm:p-5 rounded-2xl border-2 transition-all flex items-center justify-between gap-4 cursor-pointer ${
                              isCorrect
                                ? "bg-green-50 border-green-500 text-green-900 font-bold"
                                : isWrongSelected
                                ? "bg-red-50 border-red-400 text-red-900 font-bold"
                                : isSelected
                                ? "bg-[#E9F5F3] border-[#159A91] text-[#123B50] font-black shadow-2xs"
                                : "bg-white border-neutral-200/90 hover:border-[#159A91]/50 hover:bg-neutral-50/60 text-neutral-800"
                            }`}
                          >
                            <div className="flex items-center gap-3.5 flex-1">
                              <span
                                className={`w-8 h-8 rounded-xl flex items-center justify-center font-black text-xs shrink-0 transition-colors ${
                                  isCorrect
                                    ? "bg-green-600 text-white"
                                    : isWrongSelected
                                    ? "bg-red-500 text-white"
                                    : isSelected
                                    ? "bg-[#159A91] text-white"
                                    : "bg-neutral-100 text-neutral-700"
                                }`}
                              >
                                {label}
                              </span>
                              <span className="text-xs sm:text-sm font-semibold leading-relaxed">
                                {opt}
                              </span>
                            </div>
                            {isCorrect && <CheckCircle2 className="w-5 h-5 text-green-600 shrink-0" />}
                            {isWrongSelected && <XCircle className="w-5 h-5 text-red-500 shrink-0" />}
                          </button>
                        );
                      })}
                    </div>

                    {/* Answer Reveal */}
                    <div className="pt-2 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-t border-neutral-200">
                      <button
                        type="button"
                        onClick={() => toggleShowAnswer(mcq.id)}
                        className="px-4 py-2 rounded-xl border border-neutral-200 bg-white hover:bg-neutral-50 text-xs font-bold text-[#123B50] transition-colors cursor-pointer"
                      >
                        {isAnswerVisible ? "Hide Answer & Rationale" : "Show Correct Answer & Rationale"}
                      </button>

                      {isAnswerVisible && (
                        <div className="text-xs font-black text-[#159A91] flex items-center gap-1.5 bg-[#E9F5F3] px-3 py-1.5 rounded-xl border border-[#159A91]/30">
                          <CheckCircle2 className="w-4 h-4 text-[#159A91]" />
                          <span>Correct Answer: {correctAnswer}</span>
                        </div>
                      )}
                    </div>

                    {/* Single Question Navigation Footer */}
                    <div className="pt-6 border-t border-neutral-200 flex items-center justify-between gap-4">
                      <button
                        type="button"
                        disabled={currentUnitMcqIndex === 0}
                        onClick={() => setCurrentUnitMcqIndex((prev) => Math.max(0, prev - 1))}
                        className={`px-5 py-3 rounded-2xl text-xs sm:text-sm font-bold flex items-center gap-2 transition-all cursor-pointer ${
                          currentUnitMcqIndex === 0
                            ? "bg-neutral-100 text-neutral-400 cursor-not-allowed"
                            : "bg-white border border-neutral-200 hover:bg-neutral-100 text-[#123B50] shadow-2xs"
                        }`}
                      >
                        <ChevronLeft className="w-4 h-4" />
                        <span>Previous Question</span>
                      </button>

                      <div className="text-xs font-bold text-neutral-500">
                        {currentUnitMcqIndex + 1} / {totalMcqs}
                      </div>

                      {currentUnitMcqIndex < totalMcqs - 1 ? (
                        <button
                          type="button"
                          onClick={() => setCurrentUnitMcqIndex((prev) => Math.min(totalMcqs - 1, prev + 1))}
                          className="px-6 py-3 rounded-2xl bg-[#159A91] hover:bg-[#123B50] text-white text-xs sm:text-sm font-black flex items-center gap-2 transition-all shadow-sm cursor-pointer"
                        >
                          <span>Next Question</span>
                          <ChevronRight className="w-4 h-4" />
                        </button>
                      ) : (
                        <button
                          type="button"
                          onClick={() => {
                            const answeredCount = chapter.mcqs.filter((qItem) => selectedAnswers[qItem.id]).length;
                            alert(`Unit assessment complete! You answered ${answeredCount} of ${totalMcqs} questions.`);
                          }}
                          className="px-6 py-3 rounded-2xl bg-[#123B50] hover:bg-[#159A91] text-white text-xs sm:text-sm font-black flex items-center gap-2 transition-all shadow-sm cursor-pointer"
                        >
                          <CheckCircle2 className="w-4 h-4 text-[#F2B66D]" />
                          <span>Review Completed Bank</span>
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              );
            })()}

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

      {/* Slide-Over Drawer for Subtopics */}
      {showSubtopicDrawer && (
        <div
          className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex justify-end animate-in fade-in duration-200"
          onClick={() => setShowSubtopicDrawer(false)}
        >
          <div
            className="w-full max-w-md bg-white h-full shadow-2xl flex flex-col p-6 animate-in slide-in-from-right duration-300"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-neutral-200 pb-4 mb-4">
              <div>
                <span className="text-[11px] font-black text-[#159A91] uppercase tracking-wider block">
                  Unit {chapter.unitNumber}
                </span>
                <h3 className="text-base font-black text-[#123B50]">
                  Unit Subtopics & Sections ({chapter.sections?.length || 0})
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setShowSubtopicDrawer(false)}
                className="w-8 h-8 rounded-full bg-neutral-100 hover:bg-neutral-200 text-neutral-600 flex items-center justify-center transition-colors cursor-pointer"
              >
                <XCircle className="w-5 h-5 text-neutral-500" />
              </button>
            </div>

            <nav className="flex-1 overflow-y-auto space-y-1.5 pr-1 text-xs">
              {chapter.sections?.map((sec, idx) => {
                const isSelected = idx === activeSectionIndex;
                return (
                  <button
                    key={sec.id}
                    type="button"
                    onClick={() => {
                      handleSelectSection(idx);
                      setShowSubtopicDrawer(false);
                    }}
                    className={`w-full text-left px-3.5 py-3 rounded-2xl font-bold transition-all flex items-center justify-between gap-3 cursor-pointer ${
                      isSelected
                        ? "bg-[#E9F5F3] text-[#123B50] font-black border-2 border-[#159A91]"
                        : "text-neutral-700 hover:bg-[#E9F5F3]/50 hover:text-[#123B50] border border-neutral-100"
                    }`}
                  >
                    <div className="flex items-center gap-2.5 truncate">
                      <span
                        className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-black shrink-0 ${
                          isSelected ? "bg-[#159A91] text-white" : "bg-neutral-100 text-neutral-600"
                        }`}
                      >
                        {idx + 1}
                      </span>
                      <span className="truncate flex-1 text-xs">{sec.title}</span>
                    </div>
                    {isSelected && <CheckCircle2 className="w-4 h-4 text-[#159A91] shrink-0" />}
                  </button>
                );
              })}
            </nav>

            <div className="pt-4 border-t border-neutral-200 mt-4 space-y-2 text-xs">
              <button
                type="button"
                onClick={() => {
                  handleTabChange("quiz");
                  setShowSubtopicDrawer(false);
                }}
                className="w-full py-3 px-4 rounded-xl bg-[#E9F5F3] hover:bg-[#159A91] hover:text-white text-[#123B50] font-black transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <HelpCircle className="w-4 h-4 text-[#159A91]" />
                <span>Practice Unit MCQs ({chapter.mcqs?.length || 0})</span>
              </button>
            </div>
          </div>
        </div>
      )}

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
