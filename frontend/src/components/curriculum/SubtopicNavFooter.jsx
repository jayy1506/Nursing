import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowLeft,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  BookOpen,
  CheckCircle2,
  Layers,
  Sparkles,
  Award
} from "lucide-react";

/**
 * SubtopicNavFooter
 * Clean, prominent Previous and Next subtopic navigation footer placed right below the 15 Marks Quiz.
 */
export const SubtopicNavFooter = ({
  currentIndex = 0,
  totalCount = 1,
  prevSubtopic = null, // { title, onClick, to }
  nextSubtopic = null, // { title, onClick, to }
  subtopicsList = [], // Array of { id, title, completed }
  onSelectSubtopic = null,
  syllabusPath = "/syllabus",
  syllabusLabel = "Return to Syllabus",
  chapterComprehensivePath = null
}) => {
  const [showSubtopicDrawer, setShowSubtopicDrawer] = useState(false);

  const handleScrollTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="mt-10 pt-6 border-t-2 border-neutral-200/80 space-y-4">
      {/* Progress Track Indicator */}
      <div className="flex items-center justify-between text-xs font-bold text-neutral-500 px-1">
        <span className="flex items-center gap-1.5 text-[#123B50]">
          <BookOpen className="w-3.5 h-3.5 text-[#159A91]" />
          <span>Curriculum Step: Subtopic {currentIndex + 1} of {totalCount}</span>
        </span>
        <span className="text-[#159A91] font-mono">
          {Math.round(((currentIndex + 1) / Math.max(1, totalCount)) * 100)}% Complete
        </span>
      </div>

      {/* Progress Bar */}
      <div className="w-full h-2 rounded-full bg-neutral-200 overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-[#123B50] to-[#159A91] transition-all duration-300 rounded-full"
          style={{ width: `${((currentIndex + 1) / Math.max(1, totalCount)) * 100}%` }}
        />
      </div>

      {/* Main Previous & Next Navigation Buttons Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
        {/* PREVIOUS SUBTOPIC */}
        {prevSubtopic ? (
          prevSubtopic.to ? (
            <Link
              to={prevSubtopic.to}
              onClick={handleScrollTop}
              className="p-4 rounded-2xl border-2 border-neutral-200 hover:border-[#159A91] bg-white hover:bg-[#E9F5F3]/50 transition-all shadow-sm flex items-center gap-3 text-left group cursor-pointer"
            >
              <div className="w-10 h-10 rounded-xl bg-neutral-100 group-hover:bg-[#159A91] group-hover:text-white text-neutral-600 flex items-center justify-center shrink-0 transition-colors">
                <ChevronLeft className="w-5 h-5" />
              </div>
              <div className="min-w-0 flex-1">
                <div className="text-[10px] font-black uppercase tracking-wider text-neutral-400 group-hover:text-[#159A91] transition-colors">
                  &larr; Previous Subtopic
                </div>
                <div className="text-xs sm:text-sm font-black text-[#123B50] truncate">
                  {prevSubtopic.title}
                </div>
              </div>
            </Link>
          ) : (
            <button
              type="button"
              onClick={() => {
                if (prevSubtopic.onClick) prevSubtopic.onClick();
                handleScrollTop();
              }}
              className="p-4 rounded-2xl border-2 border-neutral-200 hover:border-[#159A91] bg-white hover:bg-[#E9F5F3]/50 transition-all shadow-sm flex items-center gap-3 text-left group cursor-pointer"
            >
              <div className="w-10 h-10 rounded-xl bg-neutral-100 group-hover:bg-[#159A91] group-hover:text-white text-neutral-600 flex items-center justify-center shrink-0 transition-colors">
                <ChevronLeft className="w-5 h-5" />
              </div>
              <div className="min-w-0 flex-1">
                <div className="text-[10px] font-black uppercase tracking-wider text-neutral-400 group-hover:text-[#159A91] transition-colors">
                  &larr; Previous Subtopic
                </div>
                <div className="text-xs sm:text-sm font-black text-[#123B50] truncate">
                  {prevSubtopic.title}
                </div>
              </div>
            </button>
          )
        ) : (
          <Link
            to={syllabusPath}
            onClick={handleScrollTop}
            className="p-4 rounded-2xl border-2 border-neutral-200 hover:border-[#159A91] bg-white hover:bg-neutral-50 transition-all shadow-sm flex items-center gap-3 text-left group cursor-pointer"
          >
            <div className="w-10 h-10 rounded-xl bg-neutral-100 text-neutral-600 flex items-center justify-center shrink-0">
              <ChevronLeft className="w-5 h-5" />
            </div>
            <div className="min-w-0 flex-1">
              <div className="text-[10px] font-black uppercase tracking-wider text-neutral-400">
                Unit Start
              </div>
              <div className="text-xs sm:text-sm font-black text-[#123B50] truncate">
                {syllabusLabel}
              </div>
            </div>
          </Link>
        )}

        {/* NEXT SUBTOPIC */}
        {nextSubtopic ? (
          nextSubtopic.to ? (
            <Link
              to={nextSubtopic.to}
              onClick={handleScrollTop}
              className="p-4 rounded-2xl border-2 border-[#159A91]/50 hover:border-[#159A91] bg-[#E9F5F3]/60 hover:bg-[#E9F5F3] transition-all shadow-sm flex items-center justify-between gap-3 text-right group cursor-pointer"
            >
              <div className="min-w-0 flex-1">
                <div className="text-[10px] font-black uppercase tracking-wider text-[#159A91]">
                  Next Subtopic &rarr;
                </div>
                <div className="text-xs sm:text-sm font-black text-[#123B50] truncate">
                  {nextSubtopic.title}
                </div>
              </div>
              <div className="w-10 h-10 rounded-xl bg-[#159A91] text-white flex items-center justify-center shrink-0 shadow-sm group-hover:scale-105 transition-transform">
                <ChevronRight className="w-5 h-5" />
              </div>
            </Link>
          ) : (
            <button
              type="button"
              onClick={() => {
                if (nextSubtopic.onClick) nextSubtopic.onClick();
                handleScrollTop();
              }}
              className="p-4 rounded-2xl border-2 border-[#159A91]/50 hover:border-[#159A91] bg-[#E9F5F3]/60 hover:bg-[#E9F5F3] transition-all shadow-sm flex items-center justify-between gap-3 text-right group cursor-pointer"
            >
              <div className="min-w-0 flex-1">
                <div className="text-[10px] font-black uppercase tracking-wider text-[#159A91]">
                  Next Subtopic &rarr;
                </div>
                <div className="text-xs sm:text-sm font-black text-[#123B50] truncate">
                  {nextSubtopic.title}
                </div>
              </div>
              <div className="w-10 h-10 rounded-xl bg-[#159A91] text-white flex items-center justify-center shrink-0 shadow-sm group-hover:scale-105 transition-transform">
                <ChevronRight className="w-5 h-5" />
              </div>
            </button>
          )
        ) : chapterComprehensivePath ? (
          <Link
            to={chapterComprehensivePath}
            onClick={handleScrollTop}
            className="p-4 rounded-2xl border-2 border-[#159A91] bg-gradient-to-r from-[#123B50] to-[#159A91] text-white transition-all shadow-md flex items-center justify-between gap-3 text-right group cursor-pointer"
          >
            <div className="min-w-0 flex-1">
              <div className="text-[10px] font-black uppercase tracking-wider text-[#F2B66D]">
                Chapter Complete! &rarr;
              </div>
              <div className="text-xs sm:text-sm font-black text-white truncate">
                Take Chapter Assessment
              </div>
            </div>
            <div className="w-10 h-10 rounded-xl bg-white/20 text-white flex items-center justify-center shrink-0 shadow-sm group-hover:scale-105 transition-transform">
              <Sparkles className="w-5 h-5 text-[#F2B66D]" />
            </div>
          </Link>
        ) : (
          <Link
            to={syllabusPath}
            onClick={handleScrollTop}
            className="p-4 rounded-2xl border-2 border-[#159A91] bg-[#159A91] text-white transition-all shadow-md flex items-center justify-between gap-3 text-right group cursor-pointer"
          >
            <div className="min-w-0 flex-1">
              <div className="text-[10px] font-black uppercase tracking-wider text-[#F2B66D]">
                All Subtopics Mastered! &rarr;
              </div>
              <div className="text-xs sm:text-sm font-black text-white truncate">
                Return to Syllabus Hub
              </div>
            </div>
            <div className="w-10 h-10 rounded-xl bg-white/20 text-white flex items-center justify-center shrink-0">
              <CheckCircle2 className="w-5 h-5 text-white" />
            </div>
          </Link>
        )}
      </div>

      {/* Subtopics Overview Quick Picker Drawer Toggle */}
      {subtopicsList && subtopicsList.length > 1 && (
        <div className="pt-2 text-center">
          <button
            type="button"
            onClick={() => setShowSubtopicDrawer(!showSubtopicDrawer)}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl border border-neutral-200 bg-white hover:bg-[#E9F5F3] text-xs font-bold text-[#123B50] transition-colors shadow-2xs cursor-pointer"
          >
            <Layers className="w-3.5 h-3.5 text-[#159A91]" />
            <span>
              {showSubtopicDrawer ? "Hide Subtopic Directory" : `Browse All ${totalCount} Subtopics`}
            </span>
          </button>

          {showSubtopicDrawer && (
            <div className="mt-4 p-4 bg-white rounded-2xl border border-neutral-200 shadow-lg text-left max-h-72 overflow-y-auto space-y-1.5 animate-in fade-in duration-150">
              <div className="text-[10px] font-black uppercase tracking-wider text-neutral-400 px-2 pb-1">
                Jump Directly to Any Subtopic:
              </div>
              {subtopicsList.map((st, idx) => {
                const isCurrent = idx === currentIndex;
                return (
                  <button
                    key={st.id || idx}
                    type="button"
                    onClick={() => {
                      if (onSelectSubtopic) onSelectSubtopic(idx);
                      setShowSubtopicDrawer(false);
                      handleScrollTop();
                    }}
                    className={`w-full flex items-center justify-between p-2.5 rounded-xl text-xs font-semibold transition-all text-left cursor-pointer ${
                      isCurrent
                        ? "bg-[#E9F5F3] border border-[#159A91] text-[#123B50] font-black"
                        : "hover:bg-neutral-100 text-neutral-700"
                    }`}
                  >
                    <span className="flex items-center gap-2 truncate">
                      <span className="w-5 h-5 rounded-full bg-neutral-200 text-[#123B50] flex items-center justify-center text-[10px] font-black shrink-0">
                        {idx + 1}
                      </span>
                      <span className="truncate">{st.title}</span>
                    </span>
                    {isCurrent && (
                      <span className="text-[10px] font-extrabold text-[#159A91] uppercase px-2 py-0.5 rounded-full bg-white border border-[#159A91]/40 shrink-0">
                        Current
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default SubtopicNavFooter;
