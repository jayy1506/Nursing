import React, { useState } from "react";
import { Link, useParams, Navigate, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import Navbar from "../../components/Navbar";
import { NUTRITION_SUBMODULES } from "../../constants/nutritionSubmodulesData";
import { SubtopicMedicalPlate } from "../../components/curriculum/SubtopicMedicalPlate";
import { SubtopicQuiz15Marks } from "../../components/curriculum/SubtopicQuiz15Marks";
import { SubtopicNavFooter } from "../../components/curriculum/SubtopicNavFooter";
import {
  ArrowRight,
  BookOpen,
  ClipboardList,
  Sparkles,
  Stethoscope,
  CheckCircle2,
  AlertTriangle,
  HeartPulse,
  Scale,
  Apple,
  Info,
  ChevronRight,
  Utensils
} from "lucide-react";

const NutritionLessonView = () => {
  const { submoduleSlug } = useParams();
  const navigate = useNavigate();
  const [theme, setTheme] = useState("light");
  const isDark = theme === "dark";

  const toggleTheme = () =>
    setTheme((prev) => (prev === "light" ? "dark" : "light"));

  const lesson = NUTRITION_SUBMODULES[submoduleSlug];

  if (!lesson) {
    return <Navigate to="/nutrition-syllabus" replace />;
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
      transition: { delay: 0.1 * i, duration: 0.35, ease: "easeOut" }
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
              to="/nutrition-syllabus"
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
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-neutral-800/10 text-neutral-800 border border-neutral-300/80 text-xs font-extrabold mb-2">
              <Sparkles className="w-3.5 h-3.5 text-neutral-800" />
              <span>Applied Nutrition & Dietetics • {lesson.category}</span>
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

          <button
            onClick={toggleTheme}
            className={`self-start md:self-auto flex items-center gap-2 rounded-full border px-3.5 py-1.5 text-xs font-semibold transition cursor-pointer shadow-2xs ${
              isDark
                ? "border-neutral-700 bg-neutral-900 text-neutral-100 border-neutral-300"
                : "border-neutral-200 bg-white text-neutral-800 hover:border-neutral-300"
            }`}
          >
            <span>{isDark ? "🌙 Dark" : "☀️ Light"}</span>
          </button>
        </div>

        {/* Hero Concept Card with Visual Indicator */}
        <div className="p-6 rounded-3xl bg-gradient-to-r from-neutral-900 via-green-900 to-neutral-900 text-white shadow-xl mb-6 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="max-w-2xl">
            <div className="text-xs font-extrabold uppercase tracking-wider text-neutral-300 mb-1 flex items-center gap-1.5">
              <BookOpen className="w-4 h-4" />
              <span>Core Physiological Concept</span>
            </div>
            <p className="text-sm sm:text-base leading-relaxed text-neutral-200 font-medium">
              {lesson.overview}
            </p>
          </div>

          <div className="w-20 h-20 rounded-3xl bg-white/10 border border-white/20 flex items-center justify-center text-4xl shadow-inner shrink-0">
            {lesson.icon}
          </div>
        </div>

        {/* Section Medical Plate / Visual Schematic */}
        <SubtopicMedicalPlate
          subtopicId={submoduleSlug}
          subtopicTitle={lesson.title}
          subject="nutrition"
        />

        {/* Dynamic Concept Grids */}
        <div className="grid gap-6 lg:grid-cols-[3fr,2fr]">
          {/* Main Teaching Left Column */}
          <div className="space-y-6">
            {/* Definitions Section if present */}
            {lesson.keyDefinitions && (
              <motion.div
                custom={0}
                variants={cardVariants}
                initial="hidden"
                animate="visible"
                className="p-6 rounded-3xl bg-white border border-neutral-200 shadow-sm"
              >
                <h2 className="text-base font-extrabold text-neutral-900 mb-4 flex items-center gap-2">
                  <Info className="w-4 h-4 text-neutral-800" />
                  <span>Key Definitions & Standards</span>
                </h2>
                <div className="space-y-3">
                  {lesson.keyDefinitions.map((def, idx) => (
                    <div key={idx} className="p-3.5 rounded-2xl bg-neutral-50 border border-neutral-100">
                      <p className="text-xs font-extrabold text-neutral-800 uppercase tracking-wide">
                        {def.term}
                      </p>
                      <p className="text-xs text-neutral-700 mt-0.5 leading-relaxed font-medium">
                        {def.text}
                      </p>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Relationship Points if present */}
            {lesson.relationshipPoints && (
              <motion.div
                custom={1}
                variants={cardVariants}
                initial="hidden"
                animate="visible"
                className="p-6 rounded-3xl bg-white border border-neutral-200 shadow-sm"
              >
                <h2 className="text-base font-extrabold text-neutral-900 mb-4 flex items-center gap-2">
                  <HeartPulse className="w-4 h-4 text-green-500" />
                  <span>Relationship of Nutrition with Health</span>
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {lesson.relationshipPoints.map((pt, idx) => (
                    <div key={idx} className="p-3.5 rounded-2xl bg-green-50/60 border border-green-100">
                      <div className="flex items-center gap-2 mb-1">
                        <span>{pt.icon}</span>
                        <h3 className="text-xs font-extrabold text-green-900">{pt.title}</h3>
                      </div>
                      <p className="text-xs text-neutral-600 leading-relaxed font-medium">
                        {pt.desc}
                      </p>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Food Groups Table if present */}
            {lesson.foodGroups && (
              <motion.div
                custom={1}
                variants={cardVariants}
                initial="hidden"
                animate="visible"
                className="p-6 rounded-3xl bg-white border border-neutral-200 shadow-sm"
              >
                <h2 className="text-base font-extrabold text-neutral-900 mb-4 flex items-center gap-2">
                  <Utensils className="w-4 h-4 text-neutral-800" />
                  <span>ICMR Five Food Group System</span>
                </h2>
                <div className="space-y-3">
                  {lesson.foodGroups.map((grp, idx) => (
                    <div key={idx} className="p-4 rounded-2xl bg-neutral-100/50 border border-neutral-300/60">
                      <div className="flex items-center justify-between mb-1">
                        <h3 className="text-xs font-extrabold text-neutral-800">{grp.group}</h3>
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-neutral-100 text-neutral-800">ICMR Standard</span>
                      </div>
                      <p className="text-xs text-neutral-700 mb-1"><strong>Representative Foods:</strong> {grp.foods}</p>
                      <p className="text-xs text-green-700 font-semibold"><strong>Nutrient Contribution:</strong> {grp.nutrients}</p>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Fiber Comparison if present */}
            {lesson.fiberTable && (
              <motion.div
                custom={1}
                variants={cardVariants}
                initial="hidden"
                animate="visible"
                className="p-6 rounded-3xl bg-white border border-neutral-200 shadow-sm"
              >
                <h2 className="text-base font-extrabold text-neutral-900 mb-4 flex items-center gap-2">
                  <Scale className="w-4 h-4 text-neutral-800" />
                  <span>Soluble vs Insoluble Dietary Fibre</span>
                </h2>
                <div className="space-y-4">
                  {lesson.fiberTable.map((fib, idx) => (
                    <div key={idx} className="p-4 rounded-2xl bg-neutral-50 border border-neutral-200">
                      <h3 className="text-xs font-extrabold text-neutral-900 border-b pb-2 mb-2">{fib.type}</h3>
                      <p className="text-xs text-neutral-700 mb-1"><strong>Mechanism:</strong> {fib.mechanism}</p>
                      <p className="text-xs text-neutral-700 mb-1"><strong>Food Sources:</strong> {fib.sources}</p>
                      <p className="text-xs text-green-700 font-semibold mt-2 bg-green-50 p-2.5 rounded-xl border border-green-100">
                        <strong>Clinical Application:</strong> {fib.clinicalRole}
                      </p>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Kwashiorkor vs Marasmus Differential Table */}
            {lesson.diffTable && (
              <motion.div
                custom={1}
                variants={cardVariants}
                initial="hidden"
                animate="visible"
                className="p-6 rounded-3xl bg-white border border-neutral-200 shadow-sm overflow-hidden"
              >
                <h2 className="text-base font-extrabold text-neutral-900 mb-4 flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4 text-black dark:text-white" />
                  <span>Clinical Differential Table: Kwashiorkor vs Marasmus</span>
                </h2>
                <div className="overflow-x-auto rounded-2xl border border-neutral-200">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-neutral-50 text-[11px] font-extrabold uppercase tracking-wider text-neutral-600 border-b">
                      <tr>
                        <th className="px-4 py-3">Clinical Sign</th>
                        <th className="px-4 py-3 text-black dark:text-white">Kwashiorkor (Protein Def.)</th>
                        <th className="px-4 py-3 text-neutral-800">Marasmus (Calorie Def.)</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-neutral-100 font-medium text-neutral-700">
                      {lesson.diffTable.map((row, idx) => (
                        <tr key={idx} className="hover:bg-neutral-50/50">
                          <td className="px-4 py-2.5 font-bold text-neutral-900">{row.param}</td>
                          <td className="px-4 py-2.5 text-black dark:text-white font-semibold">{row.kwash}</td>
                          <td className="px-4 py-2.5 text-neutral-800 font-semibold">{row.maras}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </motion.div>
            )}

            {/* Nursing Tiers if present */}
            {lesson.nursingTiers && (
              <motion.div
                custom={2}
                variants={cardVariants}
                initial="hidden"
                animate="visible"
                className="p-6 rounded-3xl bg-white border border-neutral-200 shadow-sm"
              >
                <h2 className="text-base font-extrabold text-neutral-900 mb-4 flex items-center gap-2">
                  <Stethoscope className="w-4 h-4 text-green-700" />
                  <span>3-Tier Nursing Management Protocol in PEM</span>
                </h2>
                <div className="space-y-3">
                  {lesson.nursingTiers.map((tier, idx) => (
                    <div key={idx} className="p-4 rounded-2xl bg-neutral-100/60 border border-neutral-300/70">
                      <p className="text-xs font-extrabold text-neutral-800 mb-1">{tier.tier}</p>
                      <p className="text-xs text-neutral-700 leading-relaxed font-medium">{tier.actions}</p>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
          </div>

          {/* Right Sidebar: Clinical Case, Memory Hook & Exam Pearls */}
          <div className="space-y-6">
            {/* Clinical Case Study */}
            {lesson.clinicalCase && (
              <div className="p-5 rounded-3xl bg-gradient-to-br bg-neutral-100 bg-neutral-100/60 border border-neutral-300 shadow-sm">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-neutral-800/20 text-neutral-800 text-[11px] font-extrabold mb-3">
                  <Stethoscope className="w-3.5 h-3.5 text-neutral-800" />
                  <span>Clinical Case Scenario</span>
                </div>
                <h3 className="text-sm font-extrabold text-neutral-900 mb-2">{lesson.clinicalCase.title}</h3>
                <p className="text-xs text-neutral-700 leading-relaxed mb-3">
                  {lesson.clinicalCase.scenario}
                </p>
                <div className="p-3 rounded-2xl bg-white border border-neutral-300/80 text-xs text-neutral-800 font-medium">
                  <strong>Priority Nursing Action:</strong> {lesson.clinicalCase.nurseAction}
                </div>
              </div>
            )}

            {/* High-Yield Memory Hook */}
            {lesson.memoryHook && (
              <div className="p-5 rounded-3xl bg-green-50/80 border border-green-100 shadow-sm">
                <div className="flex items-start gap-3">
                  <span className="text-2xl shrink-0">🧠</span>
                  <div>
                    <h3 className="text-xs font-extrabold text-green-900 uppercase tracking-wider">
                      High-Yield Exam Memory Hook
                    </h3>
                    <p className="text-xs text-green-700 font-bold mt-1 leading-relaxed">
                      {lesson.memoryHook}
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* High-Yield Alert Box */}
            <div className="p-5 rounded-3xl bg-neutral-900 text-white shadow-md">
              <h3 className="text-xs font-extrabold uppercase tracking-wider text-green-400 mb-2 flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-green-400" />
                <span>INC Clinical Benchmark</span>
              </h3>
              <p className="text-xs text-neutral-300 mb-3 leading-relaxed">
                Test your knowledge of {lesson.title} with the dedicated 15-mark clinical evaluation below (3 case questions × 5 marks).
              </p>
              <div className="text-xs font-bold text-neutral-200">
                Target Score: ≥ 12/15 Marks (80%)
              </div>
            </div>
          </div>
        </div>

        {/* 15 Marks Subtopic Quiz Component */}
        <div className="mt-10">
          <SubtopicQuiz15Marks
            subtopicId={submoduleSlug}
            subtopicTitle={lesson.title}
            unitTitle={lesson.unitTitle}
          />
        </div>

        {/* Sequential Subtopic Navigation Footer */}
        {(() => {
          const unitKeys = Object.keys(NUTRITION_SUBMODULES).filter(
            (key) => NUTRITION_SUBMODULES[key].unitNumber === lesson.unitNumber
          );
          const currentUnitSubtopics = unitKeys.map((key, idx) => ({
            title: NUTRITION_SUBMODULES[key].title,
            index: idx,
            id: key,
            path: `/nutrition/lesson/${key}`
          }));
          const currentSubtopicIndex = unitKeys.indexOf(submoduleSlug);

          const prevTarget = lesson.prevSlug
            ? {
                title: NUTRITION_SUBMODULES[lesson.prevSlug]?.title || "Previous Subtopic",
                path: `/nutrition/lesson/${lesson.prevSlug}`
              }
            : null;

          const nextTarget = lesson.nextSlug
            ? {
                title: NUTRITION_SUBMODULES[lesson.nextSlug]?.title || "Next Subtopic",
                path: `/nutrition/lesson/${lesson.nextSlug}`
              }
            : null;

          return (
            <SubtopicNavFooter
              currentIndex={currentSubtopicIndex >= 0 ? currentSubtopicIndex : (lesson.lessonNumber || 1) - 1}
              totalCount={currentUnitSubtopics.length > 0 ? currentUnitSubtopics.length : (lesson.totalLessonsInUnit || 3)}
              prevSubtopic={prevTarget}
              nextSubtopic={nextTarget}
              subtopics={currentUnitSubtopics}
              onSelectSubtopic={(sub) => navigate(sub.path)}
              syllabusPath="/nutrition-syllabus"
            />
          );
        })()}
      </motion.div>
    </div>
  );
};

export default NutritionLessonView;
