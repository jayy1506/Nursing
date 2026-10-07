import React, { useState } from "react";
import { Link, useParams, Navigate } from "react-router-dom";
import { motion } from "framer-motion";
import Navbar from "../../components/Navbar";
import { NUTRITION_SUBMODULES } from "../../constants/nutritionSubmodulesData";
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
      className={`min-h-screen transition-colors duration-300 ${
        isDark ? "bg-slate-950 text-slate-50" : "bg-slate-50 text-slate-900"
      }`}
    >
      <Navbar />

      {/* Top Breadcrumb Bar */}
      <div
        className={`border-b py-2.5 px-4 sm:px-6 lg:px-8 ${
          isDark ? "bg-slate-900 border-slate-800" : "bg-white border-slate-200"
        }`}
      >
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <Link
            to="/nutrition-syllabus"
            className="inline-flex items-center gap-2 text-xs font-bold text-amber-700 hover:text-amber-800 transition-colors cursor-pointer group"
          >
            <ArrowRight className="w-4 h-4 rotate-180 group-hover:-translate-x-1 transition-transform text-amber-600" />
            <span>Back to Nutrition Syllabus</span>
          </Link>

          <div className="flex items-center gap-2 text-[11px] font-semibold text-slate-400">
            <span>{lesson.unitTitle}</span>
            <span>/</span>
            <span className="text-amber-700 font-bold">
              Lesson {lesson.lessonNumber} of {lesson.totalLessonsInUnit}
            </span>
          </div>
        </div>
      </div>

      {/* Main Content Container */}
      <motion.div
        className="mx-auto max-w-6xl px-4 pb-20 pt-6 sm:px-6 lg:px-8"
        variants={pageVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Title Header */}
        <div className="mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 text-amber-800 border border-amber-200/80 text-xs font-extrabold mb-2">
              <Sparkles className="w-3.5 h-3.5 text-amber-600" />
              <span>Applied Nutrition & Dietetics • {lesson.category}</span>
            </div>

            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight">
              {lesson.title}
            </h1>
            <p
              className={`mt-2 text-sm sm:text-base max-w-3xl ${
                isDark ? "text-slate-300" : "text-slate-600"
              }`}
            >
              {lesson.summary}
            </p>
          </div>

          <button
            onClick={toggleTheme}
            className={`self-start md:self-auto flex items-center gap-2 rounded-full border px-3.5 py-1.5 text-xs font-semibold transition cursor-pointer shadow-2xs ${
              isDark
                ? "border-slate-700 bg-slate-900 text-slate-100 hover:border-amber-400"
                : "border-slate-200 bg-white text-slate-800 hover:border-amber-300"
            }`}
          >
            <span>{isDark ? "🌙 Dark" : "☀️ Light"}</span>
          </button>
        </div>

        {/* Hero Concept Card with Visual Indicator */}
        <div className="p-6 rounded-3xl bg-gradient-to-r from-amber-900 via-emerald-950 to-slate-900 text-white shadow-xl mb-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="max-w-2xl">
            <div className="text-xs font-extrabold uppercase tracking-wider text-amber-400 mb-1 flex items-center gap-1.5">
              <BookOpen className="w-4 h-4" />
              <span>Core Physiological Concept</span>
            </div>
            <p className="text-sm sm:text-base leading-relaxed text-slate-200 font-medium">
              {lesson.overview}
            </p>
          </div>

          <div className="w-20 h-20 rounded-3xl bg-white/10 border border-white/20 flex items-center justify-center text-4xl shadow-inner shrink-0">
            {lesson.icon}
          </div>
        </div>

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
                className="p-6 rounded-3xl bg-white border border-slate-200 shadow-sm"
              >
                <h2 className="text-base font-extrabold text-slate-900 mb-4 flex items-center gap-2">
                  <Info className="w-4 h-4 text-amber-600" />
                  <span>Key Definitions & Standards</span>
                </h2>
                <div className="space-y-3">
                  {lesson.keyDefinitions.map((def, idx) => (
                    <div key={idx} className="p-3.5 rounded-2xl bg-slate-50 border border-slate-100">
                      <p className="text-xs font-extrabold text-amber-800 uppercase tracking-wide">
                        {def.term}
                      </p>
                      <p className="text-xs text-slate-700 mt-0.5 leading-relaxed font-medium">
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
                className="p-6 rounded-3xl bg-white border border-slate-200 shadow-sm"
              >
                <h2 className="text-base font-extrabold text-slate-900 mb-4 flex items-center gap-2">
                  <HeartPulse className="w-4 h-4 text-emerald-600" />
                  <span>Relationship of Nutrition with Health</span>
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {lesson.relationshipPoints.map((pt, idx) => (
                    <div key={idx} className="p-3.5 rounded-2xl bg-emerald-50/60 border border-emerald-100">
                      <div className="flex items-center gap-2 mb-1">
                        <span>{pt.icon}</span>
                        <h3 className="text-xs font-extrabold text-emerald-900">{pt.title}</h3>
                      </div>
                      <p className="text-xs text-slate-600 leading-relaxed font-medium">
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
                className="p-6 rounded-3xl bg-white border border-slate-200 shadow-sm"
              >
                <h2 className="text-base font-extrabold text-slate-900 mb-4 flex items-center gap-2">
                  <Utensils className="w-4 h-4 text-amber-600" />
                  <span>ICMR Five Food Group System</span>
                </h2>
                <div className="space-y-3">
                  {lesson.foodGroups.map((grp, idx) => (
                    <div key={idx} className="p-4 rounded-2xl bg-amber-50/50 border border-amber-200/60">
                      <div className="flex items-center justify-between mb-1">
                        <h3 className="text-xs font-extrabold text-amber-900">{grp.group}</h3>
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-200 text-amber-900">ICMR Standard</span>
                      </div>
                      <p className="text-xs text-slate-700 mb-1"><strong>Representative Foods:</strong> {grp.foods}</p>
                      <p className="text-xs text-emerald-800 font-semibold"><strong>Nutrient Contribution:</strong> {grp.nutrients}</p>
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
                className="p-6 rounded-3xl bg-white border border-slate-200 shadow-sm"
              >
                <h2 className="text-base font-extrabold text-slate-900 mb-4 flex items-center gap-2">
                  <Scale className="w-4 h-4 text-amber-600" />
                  <span>Soluble vs Insoluble Dietary Fibre</span>
                </h2>
                <div className="space-y-4">
                  {lesson.fiberTable.map((fib, idx) => (
                    <div key={idx} className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
                      <h3 className="text-xs font-extrabold text-slate-900 border-b pb-2 mb-2">{fib.type}</h3>
                      <p className="text-xs text-slate-700 mb-1"><strong>Mechanism:</strong> {fib.mechanism}</p>
                      <p className="text-xs text-slate-700 mb-1"><strong>Food Sources:</strong> {fib.sources}</p>
                      <p className="text-xs text-emerald-800 font-semibold mt-2 bg-emerald-50 p-2.5 rounded-xl border border-emerald-200">
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
                className="p-6 rounded-3xl bg-white border border-slate-200 shadow-sm overflow-hidden"
              >
                <h2 className="text-base font-extrabold text-slate-900 mb-4 flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4 text-rose-600" />
                  <span>Clinical Differential Table: Kwashiorkor vs Marasmus</span>
                </h2>
                <div className="overflow-x-auto rounded-2xl border border-slate-200">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-slate-50 text-[11px] font-extrabold uppercase tracking-wider text-slate-600 border-b">
                      <tr>
                        <th className="px-4 py-3">Clinical Sign</th>
                        <th className="px-4 py-3 text-rose-700">Kwashiorkor (Protein Def.)</th>
                        <th className="px-4 py-3 text-amber-700">Marasmus (Calorie Def.)</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
                      {lesson.diffTable.map((row, idx) => (
                        <tr key={idx} className="hover:bg-slate-50/50">
                          <td className="px-4 py-2.5 font-bold text-slate-900">{row.param}</td>
                          <td className="px-4 py-2.5 text-rose-700 font-semibold">{row.kwash}</td>
                          <td className="px-4 py-2.5 text-amber-700 font-semibold">{row.maras}</td>
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
                className="p-6 rounded-3xl bg-white border border-slate-200 shadow-sm"
              >
                <h2 className="text-base font-extrabold text-slate-900 mb-4 flex items-center gap-2">
                  <Stethoscope className="w-4 h-4 text-sky-600" />
                  <span>3-Tier Nursing Management Protocol in PEM</span>
                </h2>
                <div className="space-y-3">
                  {lesson.nursingTiers.map((tier, idx) => (
                    <div key={idx} className="p-4 rounded-2xl bg-sky-50/60 border border-sky-200/70">
                      <p className="text-xs font-extrabold text-sky-900 mb-1">{tier.tier}</p>
                      <p className="text-xs text-slate-700 leading-relaxed font-medium">{tier.actions}</p>
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
              <div className="p-5 rounded-3xl bg-gradient-to-br from-amber-50 to-orange-50/60 border border-amber-200 shadow-sm">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/20 text-amber-900 text-[11px] font-extrabold mb-3">
                  <Stethoscope className="w-3.5 h-3.5 text-amber-700" />
                  <span>Clinical Case Scenario</span>
                </div>
                <h3 className="text-sm font-extrabold text-slate-900 mb-2">{lesson.clinicalCase.title}</h3>
                <p className="text-xs text-slate-700 leading-relaxed mb-3">
                  {lesson.clinicalCase.scenario}
                </p>
                <div className="p-3 rounded-2xl bg-white border border-amber-200/80 text-xs text-amber-950 font-medium">
                  <strong>Priority Nursing Action:</strong> {lesson.clinicalCase.nurseAction}
                </div>
              </div>
            )}

            {/* High-Yield Memory Hook */}
            {lesson.memoryHook && (
              <div className="p-5 rounded-3xl bg-emerald-50/80 border border-emerald-200 shadow-sm">
                <div className="flex items-start gap-3">
                  <span className="text-2xl shrink-0">🧠</span>
                  <div>
                    <h3 className="text-xs font-extrabold text-emerald-900 uppercase tracking-wider">
                      High-Yield Exam Memory Hook
                    </h3>
                    <p className="text-xs text-emerald-800 font-bold mt-1 leading-relaxed">
                      {lesson.memoryHook}
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Quick Practice Prompt */}
            <div className="p-5 rounded-3xl bg-slate-900 text-white shadow-md">
              <h3 className="text-xs font-extrabold uppercase tracking-wider text-amber-400 mb-2">
                University Question Bank Link
              </h3>
              <p className="text-xs text-slate-300 mb-4 leading-relaxed">
                Test your knowledge of {lesson.title} with official 2-mark viva questions, 5-mark short answers, and MCQs.
              </p>
              <Link
                to="/question-bank"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 font-extrabold text-xs transition-all shadow-sm"
              >
                <span>Open Question Bank</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>

        {/* BOTTOM LESSON NAVIGATION */}
        <div className="mt-12 pt-6 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4 pb-28">
          {lesson.prevSlug ? (
            <Link
              to={`/nutrition/lesson/${lesson.prevSlug}`}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-2xl bg-white border border-slate-200 text-xs font-bold text-slate-700 hover:text-amber-700 transition-all shadow-sm group"
            >
              <ArrowRight className="w-4 h-4 rotate-180 group-hover:-translate-x-1 transition-transform text-amber-600" />
              <span>Previous Lesson</span>
            </Link>
          ) : (
            <Link
              to="/nutrition-syllabus"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-2xl bg-white border border-slate-200 text-xs font-bold text-slate-700 hover:text-amber-700 transition-all shadow-sm group"
            >
              <ArrowRight className="w-4 h-4 rotate-180 group-hover:-translate-x-1 transition-transform text-amber-600" />
              <span>Back to Syllabus</span>
            </Link>
          )}

          {lesson.nextSlug ? (
            <Link
              to={`/nutrition/lesson/${lesson.nextSlug}`}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-2xl bg-gradient-to-r from-amber-500 to-emerald-600 hover:from-amber-600 hover:to-emerald-700 text-xs font-extrabold text-white transition-all shadow-md shadow-amber-500/20 group cursor-pointer"
            >
              <span>Next Lesson</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          ) : lesson.isUnitFinal ? (
            <Link
              to={`/student/quiz/${lesson.quizSlug}`}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-xs font-extrabold text-white transition-all shadow-md shadow-emerald-500/25 group cursor-pointer"
            >
              <ClipboardList className="w-4 h-4" />
              <span>Complete Unit: Take Assessment (15 Qs)</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          ) : (
            <Link
              to="/nutrition-syllabus"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-2xl bg-white border border-slate-200 text-xs font-bold text-slate-700 hover:text-amber-700 transition-all shadow-sm"
            >
              <span>Return to Syllabus</span>
            </Link>
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default NutritionLessonView;
