import React, { useState, useEffect } from "react";
import { Link, useParams, Navigate, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import Navbar from "../../components/Navbar";
import { BIOCHEMISTRY_SUBMODULES } from "../../constants/biochemistryLessonsData";
import { SubtopicMedicalPlate } from "../../components/curriculum/SubtopicMedicalPlate";
import { SubtopicQuiz15Marks } from "../../components/curriculum/SubtopicQuiz15Marks";
import { SubtopicNavFooter } from "../../components/curriculum/SubtopicNavFooter";
import {
  ArrowRight,
  ArrowLeft,
  BookOpen,
  ClipboardList,
  Sparkles,
  Stethoscope,
  CheckCircle2,
  AlertTriangle,
  Scale,
  Dna,
  Info,
  ChevronRight,
  ShieldCheck,
  Flame,
  Award
} from "lucide-react";

export const BiochemistryLessonView = () => {
  const { lessonSlug } = useParams();
  const navigate = useNavigate();
  const [theme, setTheme] = useState("light");
  const isDark = theme === "dark";

  const toggleTheme = () =>
    setTheme((prev) => (prev === "light" ? "dark" : "light"));

  const lesson = BIOCHEMISTRY_SUBMODULES[lessonSlug];

  // Persisted completion state
  const [completed, setCompleted] = useState(() => {
    try {
      const saved = localStorage.getItem("nursing_biochem_completed_lessons");
      const parsed = saved ? JSON.parse(saved) : {};
      return !!parsed[`/biochemistry/lesson/${lessonSlug}`];
    } catch {
      return false;
    }
  });

  const toggleCompleted = () => {
    const route = `/biochemistry/lesson/${lessonSlug}`;
    setCompleted((prev) => {
      const nextVal = !prev;
      try {
        const saved = localStorage.getItem("nursing_biochem_completed_lessons");
        const parsed = saved ? JSON.parse(saved) : {};
        parsed[route] = nextVal;
        localStorage.setItem("nursing_biochem_completed_lessons", JSON.stringify(parsed));
      } catch (err) {
        console.error("Storage error:", err);
      }
      return nextVal;
    });
  };

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    try {
      const saved = localStorage.getItem("nursing_biochem_completed_lessons");
      const parsed = saved ? JSON.parse(saved) : {};
      setCompleted(!!parsed[`/biochemistry/lesson/${lessonSlug}`]);
    } catch {
      setCompleted(false);
    }
  }, [lessonSlug]);

  if (!lesson) {
    return <Navigate to="/bio-chem-syllabus" replace />;
  }

  const pageVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 16 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: { delay: 0.08 * i, duration: 0.35, ease: "easeOut" }
    })
  };

  return (
    <div
      className={`min-h-screen transition-colors duration-300 font-sans ${
        isDark ? "bg-neutral-950 text-neutral-50" : "bg-neutral-50 text-neutral-900"
      }`}
    >
      {/* Focused Textbook Top Bar (Replaces Navbar in Syllabus) */}
      <header className="sticky top-0 z-40 bg-[#123B50] text-white py-3 px-4 sm:px-6 lg:px-8 shadow-md">
        <div className="w-full flex items-center justify-between text-xs">
          <div className="flex items-center gap-3">
            <Link
              to="/bio-chem-syllabus"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold transition-all border border-white/10 cursor-pointer"
            >
              <ArrowRight className="w-3.5 h-3.5 rotate-180" />
              <span>Back to Syllabus</span>
            </Link>
            <span className="hidden sm:inline-block w-px h-4 bg-white/20" />
            <span className="hidden sm:inline-block font-bold text-white/90 truncate max-w-sm">
              {lesson.unitTitle} • Lesson {lesson.lessonNumber} of {lesson.totalLessonsInUnit}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <span className="px-2.5 py-1 rounded-lg bg-white/10 text-white font-bold text-[11px]">
              {lesson.category}
            </span>
            <button
              onClick={toggleTheme}
              className="p-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer text-xs"
              title="Toggle theme"
            >
              {isDark ? "🌙" : "☀️"}
            </button>
          </div>
        </div>
      </header>

      {/* Main Content Container - Full Page Width */}
      <motion.div
        className="w-full px-4 pb-20 pt-6 sm:px-6 lg:px-8"
        variants={pageVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Title Header */}
        <div className="mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-green-500/10 text-green-700 border border-green-100/80 text-xs font-extrabold mb-2">
              <Sparkles className="w-3.5 h-3.5 text-green-500" />
              <span>Applied Biochemistry • {lesson.category}</span>
            </div>

            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-neutral-900 tracking-tight">
              {lesson.title}
            </h1>
            <p
              className={`mt-2 text-sm sm:text-base max-w-3xl ${
                isDark ? "text-neutral-300" : "text-neutral-600"
              }`}
            >
              {lesson.summary}
            </p>
          </div>

          <div className="flex items-center gap-2.5 self-start md:self-auto">
            {/* Interactive Completion Button */}
            <button
              onClick={toggleCompleted}
              className={`px-3.5 py-1.5 rounded-full text-xs font-extrabold transition cursor-pointer flex items-center gap-1.5 border shadow-2xs ${
                completed
                  ? "bg-green-500 text-white border-green-500"
                  : "bg-white text-neutral-700 border-neutral-300 hover:border-green-500"
              }`}
            >
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>{completed ? "Completed ✓" : "Mark Complete"}</span>
            </button>

            <button
              onClick={toggleTheme}
              className={`flex items-center gap-2 rounded-full border px-3.5 py-1.5 text-xs font-semibold transition cursor-pointer shadow-2xs ${
                isDark
                  ? "border-neutral-700 bg-neutral-900 text-neutral-100 hover:border-green-400"
                  : "border-neutral-200 bg-white text-neutral-800 hover:border-green-400"
              }`}
            >
              <span>{isDark ? "🌙 Dark" : "☀️ Light"}</span>
            </button>
          </div>
        </div>

        {/* Hero Concept Card with Visual Indicator - White & Emerald Green */}
        <div className="p-6 rounded-3xl bg-white border border-green-100 text-neutral-900 shadow-xs mb-6 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="max-w-2xl">
            <div className="text-xs font-extrabold uppercase tracking-wider text-green-700 mb-1 flex items-center gap-1.5">
              <BookOpen className="w-4 h-4 text-green-500" />
              <span>Core Biochemical Principle</span>
            </div>
            <p className="text-sm sm:text-base leading-relaxed text-neutral-700 font-medium">
              {lesson.overview}
            </p>
          </div>

          <div className="w-20 h-20 rounded-3xl bg-green-50 border border-green-100 flex items-center justify-center text-4xl shadow-xs shrink-0">
            {lesson.icon}
          </div>
        </div>

        {/* Section Medical Plate / Scientific Illustration */}
        <SubtopicMedicalPlate
          subtopicId={lessonSlug}
          subtopicTitle={lesson.title}
          subject="biochemistry"
        />

        {/* Dynamic Concept Grids */}
        <div className="grid gap-6 lg:grid-cols-[3fr,2fr]">
          {/* Main Teaching Left Column */}
          <div className="space-y-6">
            {/* Key Definitions Section */}
            {lesson.keyDefinitions && (
              <motion.div
                custom={0}
                variants={cardVariants}
                initial="hidden"
                animate="visible"
                className={`p-6 rounded-3xl border shadow-xs ${isDark ? 'bg-neutral-900 border-neutral-800' : 'bg-white border-neutral-200'}`}
              >
                <h2 className="text-base font-extrabold mb-4 flex items-center gap-2 text-neutral-900">
                  <Info className="w-4 h-4 text-green-500" />
                  <span>Key Definitions & Biochemical Standards</span>
                </h2>
                <div className="space-y-3">
                  {lesson.keyDefinitions.map((def, idx) => (
                    <div key={idx} className={`p-4 rounded-2xl border ${isDark ? 'bg-neutral-800/60 border-neutral-700' : 'bg-neutral-50 border-neutral-100'}`}>
                      <p className="text-xs font-extrabold text-green-700 uppercase tracking-wide">
                        {def.term}
                      </p>
                      <p className={`mt-1 text-xs sm:text-sm leading-relaxed ${isDark ? 'text-neutral-300' : 'text-neutral-600'}`}>
                        {def.text}
                      </p>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Biochemical Pathways & Mechanisms */}
            {lesson.pathways && (
              <motion.div
                custom={1}
                variants={cardVariants}
                initial="hidden"
                animate="visible"
                className={`p-6 rounded-3xl border shadow-xs ${isDark ? 'bg-neutral-900 border-neutral-800' : 'bg-white border-neutral-200'}`}
              >
                <h2 className="text-base font-extrabold mb-4 flex items-center gap-2 text-neutral-900">
                  <Dna className="w-4 h-4 text-green-500" />
                  <span>Enzymatic Pathways & Mechanisms</span>
                </h2>
                <div className="space-y-4">
                  {lesson.pathways.map((pw, idx) => (
                    <div key={idx} className={`p-4 rounded-2xl border ${isDark ? 'bg-neutral-800/40 border-neutral-700' : 'bg-green-50/30 border-green-100'}`}>
                      <h3 className="text-xs font-extrabold text-neutral-900 mb-2.5">
                        {pw.title}
                      </h3>
                      <div className="space-y-2">
                        {pw.steps.map((step, sIdx) => (
                          <div key={sIdx} className="flex items-start gap-2.5 text-xs sm:text-sm text-neutral-700 leading-relaxed">
                            <span className="w-5 h-5 rounded-md bg-green-100 text-green-700 font-bold text-[11px] flex items-center justify-center shrink-0 mt-0.5">
                              {sIdx + 1}
                            </span>
                            <span>{step}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
          </div>

          {/* Right Column: Clinical Pearls & Reference Ranges */}
          <div className="space-y-6">
            {/* Clinical Pearls & Nursing Practice */}
            {lesson.clinicalPearls && (
              <motion.div
                custom={2}
                variants={cardVariants}
                initial="hidden"
                animate="visible"
                className="p-6 rounded-3xl bg-gradient-to-br from-green-50/70 via-white to-green-50/30 border border-green-100/80 shadow-xs"
              >
                <h2 className="text-base font-extrabold text-neutral-900 mb-4 flex items-center gap-2">
                  <Stethoscope className="w-4 h-4 text-green-700" />
                  <span>Nursing Practice Pearls</span>
                </h2>
                <div className="space-y-3">
                  {lesson.clinicalPearls.map((pearl, idx) => (
                    <div key={idx} className="flex items-start gap-3 p-3.5 rounded-2xl bg-white border border-green-100 shadow-2xs">
                      <div className="w-6 h-6 rounded-lg bg-green-100 text-green-700 font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                        💡
                      </div>
                      <p className="text-xs text-neutral-700 leading-relaxed">
                        {pearl}
                      </p>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Normal Laboratory Reference Ranges */}
            {lesson.referenceRanges && (
              <motion.div
                custom={3}
                variants={cardVariants}
                initial="hidden"
                animate="visible"
                className={`p-6 rounded-3xl border shadow-xs ${isDark ? 'bg-neutral-900 border-neutral-800' : 'bg-white border-neutral-200'}`}
              >
                <h2 className="text-base font-extrabold mb-4 flex items-center gap-2 text-neutral-900">
                  <Scale className="w-4 h-4 text-green-700" />
                  <span>Clinical Reference Ranges</span>
                </h2>
                <div className="space-y-2.5">
                  {lesson.referenceRanges.map((rng, idx) => (
                    <div key={idx} className={`p-3 rounded-2xl border flex items-center justify-between text-xs ${isDark ? 'bg-neutral-800/50 border-neutral-700' : 'bg-neutral-50 border-neutral-100'}`}>
                      <span className="font-bold text-neutral-800">{rng.parameter}</span>
                      <span className="font-extrabold text-green-700 bg-green-50 px-2.5 py-1 rounded-lg border border-green-100">
                        {rng.normal}
                      </span>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* High Yield Note */}
            <div className="p-6 rounded-3xl bg-neutral-900 text-white shadow-lg">
              <div className="flex items-center gap-2 text-green-400 text-xs font-bold uppercase tracking-wider mb-2">
                <ClipboardList className="w-4 h-4" />
                <span>Clinical High-Yield Alert</span>
              </div>
              <h3 className="text-base font-bold text-white">
                CBME Nursing Mastery
              </h3>
              <p className="text-xs text-neutral-300 mt-1 mb-3 leading-relaxed">
                Complete the 15-mark clinical subtopic quiz below before moving to the next biochemical concept.
              </p>
              <div className="inline-flex items-center gap-1.5 text-xs text-green-400 font-bold">
                <CheckCircle2 className="w-4 h-4" />
                <span>Benchmark: 12/15 Marks (80%)</span>
              </div>
            </div>
          </div>
        </div>

        {/* 15 Marks Subtopic Quiz Component */}
        <div className="mt-10">
          <SubtopicQuiz15Marks
            subtopicId={lessonSlug}
            subtopicTitle={lesson.title}
            unitTitle={lesson.unitTitle}
          />
        </div>

        {/* Sequential Subtopic Navigation Footer */}
        {(() => {
          const unitKeys = Object.keys(BIOCHEMISTRY_SUBMODULES).filter(
            (key) => BIOCHEMISTRY_SUBMODULES[key].unitNumber === lesson.unitNumber
          );
          const currentUnitSubtopics = unitKeys.map((key, idx) => ({
            title: BIOCHEMISTRY_SUBMODULES[key].title,
            index: idx,
            id: key,
            path: `/biochemistry/lesson/${key}`
          }));
          const currentSubtopicIndex = unitKeys.indexOf(lessonSlug);

          const prevTarget = lesson.prevSlug
            ? lesson.prevSlug.startsWith("/")
              ? { title: "Previous Module", path: lesson.prevSlug }
              : { title: BIOCHEMISTRY_SUBMODULES[lesson.prevSlug]?.title || "Previous Subtopic", path: `/biochemistry/lesson/${lesson.prevSlug}` }
            : null;

          const nextTarget = lesson.nextSlug
            ? lesson.nextSlug.startsWith("/")
              ? { title: "Next Module", path: lesson.nextSlug }
              : { title: BIOCHEMISTRY_SUBMODULES[lesson.nextSlug]?.title || "Next Subtopic", path: `/biochemistry/lesson/${lesson.nextSlug}` }
            : null;

          return (
            <SubtopicNavFooter
              currentIndex={currentSubtopicIndex >= 0 ? currentSubtopicIndex : (lesson.lessonNumber || 1) - 1}
              totalCount={currentUnitSubtopics.length > 0 ? currentUnitSubtopics.length : (lesson.totalLessonsInUnit || 4)}
              prevSubtopic={prevTarget}
              nextSubtopic={nextTarget}
              subtopics={currentUnitSubtopics}
              onSelectSubtopic={(sub) => navigate(sub.path)}
              syllabusPath="/bio-chem-syllabus"
            />
          );
        })()}
      </motion.div>
    </div>
  );
};

export default BiochemistryLessonView;
