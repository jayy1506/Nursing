import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import Navbar from "../../../components/Navbar";
import { ArrowRight, BookOpen, ClipboardList } from "lucide-react";

const ClassificationOfCarb = () => {
  const [theme, setTheme] = useState("light");
  const isDark = theme === "dark";

  const toggleTheme = () =>
    setTheme((prev) => (prev === "light" ? "dark" : "light"));

  const pageVariants = {
    hidden: { opacity: 0, y: 24 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 16 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: { delay: 0.1 * i, duration: 0.35, ease: "easeOut" },
    }),
  };

  return (
    <div
      className={`min-h-screen transition-colors duration-300 ${
        isDark ? "bg-slate-950 text-slate-50" : "bg-slate-50 text-slate-900"
      }`}
    >
      {/* Navbar at top */}
      <Navbar />

      {/* Top Back Navigation Bar */}
      <div className={`border-b py-2.5 px-4 sm:px-6 lg:px-8 ${isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'}`}>
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <Link
            to="/bio-chem-syllabus"
            className="inline-flex items-center gap-2 text-xs font-bold text-emerald-600 hover:text-emerald-700 transition-colors cursor-pointer group"
          >
            <ArrowRight className="w-4 h-4 rotate-180 group-hover:-translate-x-1 transition-transform" />
            <span>Back to Full Syllabus</span>
          </Link>
          <div className="flex items-center gap-2 text-[11px] font-semibold text-slate-400">
            <span>Unit 1: Carbohydrates</span>
            <span>/</span>
            <span className="text-emerald-600">Lesson 1 of 8</span>
          </div>
        </div>
      </div>

      <motion.div
        className="mx-auto max-w-6xl px-4 pb-16 pt-4 sm:px-6 lg:px-8 lg:pt-6"
        variants={pageVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Top bar / title */}
        <div className="mb-6 flex items-center justify-between gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-emerald-500">
              Biochemistry • Carbohydrates
            </p>
            <h1 className="mt-1 text-2xl font-bold sm:text-3xl lg:text-4xl">
              Classification of Carbohydrates
            </h1>
            <p
              className={`mt-2 text-sm sm:text-base ${
                isDark ? "text-slate-300" : "text-slate-600"
              }`}
            >
              Structured, exam‑oriented view of how carbohydrates are divided
              into biologically important groups.
            </p>
          </div>

          {/* Theme toggle */}
          <button
            onClick={toggleTheme}
            className={`flex items-center gap-2 rounded-full border px-3 py-1 text-xs font-semibold transition ${
              isDark
                ? "border-slate-600 bg-slate-900 text-slate-100 hover:border-emerald-400"
                : "border-slate-200 bg-white text-slate-800 hover:border-sky-300"
            }`}
          >
            <span
              className={`inline-flex h-4 w-4 items-center justify-center rounded-full text-[10px] ${
                isDark ? "bg-slate-800" : "bg-yellow-300"
              }`}
            >
              {isDark ? "🌙" : "☀️"}
            </span>
            {isDark ? "Dark mode" : "Light mode"}
          </button>
        </div>

        {/* Hero: image + key idea */}
        <section
          className={`grid gap-6 rounded-3xl border p-5 shadow-sm md:grid-cols-[2fr,3fr] ${
            isDark
              ? "border-slate-700 bg-slate-900/70"
              : "border-slate-200 bg-white"
          }`}
        >
          <div className="overflow-hidden rounded-2xl">
            <img
              src="https://www.healthshots.com/healthshots/en/uploads/2023/09/03104959/carbs-1.jpg"
              alt="Healthy carbohydrate-rich foods"
              className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
            />
          </div>
          <div className="flex flex-col justify-center">
            <h2 className="text-lg font-semibold sm:text-xl">
              Why classify carbohydrates?
            </h2>
            <p
              className={`mt-2 text-sm sm:text-base ${
                isDark ? "text-slate-300" : "text-slate-700"
              }`}
            >
              Carbohydrates are organic compounds made of carbon, hydrogen, and
              oxygen that act as major energy sources and structural
              components. Understanding their classification helps connect diet,
              digestion, metabolism, and clinical conditions.
            </p>

            <div className="mt-4 grid gap-3 text-xs sm:grid-cols-3 sm:text-sm">
              <div
                className={`rounded-2xl p-3 ${
                  isDark ? "bg-slate-800/80" : "bg-emerald-50"
                }`}
              >
                <p className="text-[11px] font-semibold uppercase tracking-wide text-emerald-500">
                  Structure
                </p>
                <p>Number of sugar units and presence of key functional groups.</p>
              </div>
              <div
                className={`rounded-2xl p-3 ${
                  isDark ? "bg-slate-800/80" : "bg-sky-50"
                }`}
              >
                <p className="text-[11px] font-semibold uppercase tracking-wide text-sky-500">
                  Function
                </p>
                <p>Energy storage, structural roles, and cell recognition.</p>
              </div>
              <div
                className={`rounded-2xl p-3 ${
                  isDark ? "bg-slate-800/80" : "bg-amber-50"
                }`}
              >
                <p className="text-[11px] font-semibold uppercase tracking-wide text-amber-500">
                  Clinical
                </p>
                <p>Basis for lab tests and diet‑related counselling.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Content layout: main concepts + side recap */}
        <div className="mt-8 grid gap-6 lg:grid-cols-[3fr,2fr]">
          {/* Left: teaching blocks */}
          <div className="space-y-6">
            {/* 1. By number of units */}
            <motion.section
              custom={0}
              variants={cardVariants}
              initial="hidden"
              animate="visible"
              className={`rounded-3xl p-5 shadow-sm ${
                isDark
                  ? "border border-slate-700 bg-slate-900/80"
                  : "border border-slate-200 bg-white"
              }`}
            >
              <div className="flex items-center justify-between gap-2">
                <h2 className="text-lg font-semibold">
                  1. Classification by number of sugar units
                </h2>
                <span className="rounded-full bg-emerald-500/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-wide text-emerald-500">
                  main system
                </span>
              </div>

              <p
                className={`mt-3 text-sm ${
                  isDark ? "text-slate-300" : "text-slate-700"
                }`}
              >
                This system groups carbohydrates according to how many basic
                sugar units (monosaccharides) they contain.
              </p>

              <div className="mt-4 space-y-3 text-sm">
                <div
                  className={`rounded-2xl p-3 ${
                    isDark ? "bg-slate-800/80" : "bg-emerald-50"
                  }`}
                >
                  <p className="text-xs font-semibold uppercase tracking-wide text-emerald-500">
                    Monosaccharides
                  </p>
                  <p className="mt-1">
                    Simplest carbohydrates with a single sugar unit. Examples:
                    glucose, fructose, galactose.
                  </p>
                  <p className="mt-1 text-xs text-emerald-600">
                    Think of them as the “alphabet letters” of carbohydrate
                    chemistry.
                  </p>
                </div>

                <div
                  className={`rounded-2xl p-3 ${
                    isDark ? "bg-slate-800/80" : "bg-sky-50"
                  }`}
                >
                  <p className="text-xs font-semibold uppercase tracking-wide text-sky-500">
                    Disaccharides
                  </p>
                  <p className="mt-1">
                    Formed by joining two monosaccharides with a glycosidic
                    bond. Examples: sucrose, lactose, maltose.
                  </p>
                  <p className="mt-1 text-xs text-sky-600">
                    Common dietary sugars formed by condensation reactions.
                  </p>
                </div>

                <div
                  className={`rounded-2xl p-3 ${
                    isDark ? "bg-slate-800/80" : "bg-violet-50"
                  }`}
                >
                  <p className="text-xs font-semibold uppercase tracking-wide text-violet-500">
                    Oligosaccharides
                  </p>
                  <p className="mt-1">
                    Short chains of roughly 3–10 monosaccharide units, often
                    attached to proteins and lipids on cell surfaces.
                  </p>
                  <p className="mt-1 text-xs text-violet-600">
                    Important for cell recognition and immune interactions.
                  </p>
                </div>

                <div
                  className={`rounded-2xl p-3 ${
                    isDark ? "bg-slate-800/80" : "bg-amber-50"
                  }`}
                >
                  <p className="text-xs font-semibold uppercase tracking-wide text-amber-500">
                    Polysaccharides
                  </p>
                  <p className="mt-1">
                    Long chains of many monosaccharide units. Examples:
                    glycogen and starch (storage), cellulose (structural).
                  </p>
                  <p className="mt-1 text-xs text-amber-600">
                    “Many‑unit polymers” used for storage or structure.
                  </p>
                </div>
              </div>
            </motion.section>

            {/* 2. Functional group & reducing property */}
            <motion.section
              custom={1}
              variants={cardVariants}
              initial="hidden"
              animate="visible"
              className={`rounded-3xl p-5 shadow-sm ${
                isDark
                  ? "border border-slate-700 bg-slate-900/80"
                  : "border border-slate-200 bg-white"
              }`}
            >
              <h2 className="text-lg font-semibold">
                2. Functional group and reducing behaviour
              </h2>

              <p
                className={`mt-3 text-sm ${
                  isDark ? "text-slate-300" : "text-slate-700"
                }`}
              >
                Carbohydrates can also be grouped by the type of carbonyl group
                they contain and whether they act as reducing agents.
              </p>

              <div className="mt-4 space-y-4 text-sm">
                <div
                  className={`rounded-2xl p-3 ${
                    isDark ? "bg-slate-800/80" : "bg-rose-50"
                  }`}
                >
                  <p className="text-xs font-semibold uppercase tracking-wide text-rose-500">
                    By functional group
                  </p>
                  <ul className="mt-1 space-y-1">
                    <li>
                      <span className="font-semibold">Aldoses:</span> contain an
                      aldehyde group at the end of the carbon chain.
                      Glucose and galactose are examples.
                    </li>
                    <li>
                      <span className="font-semibold">Ketoses:</span> contain a
                      keto group within the carbon chain. Fructose is the
                      classic example.
                    </li>
                  </ul>
                </div>

                <div
                  className={`rounded-2xl p-3 ${
                    isDark ? "bg-slate-800/80" : "bg-teal-50"
                  }`}
                >
                  <p className="text-xs font-semibold uppercase tracking-wide text-teal-500">
                    By reducing property
                  </p>
                  <ul className="mt-1 space-y-1">
                    <li>
                      <span className="font-semibold">Reducing sugars:</span>{" "}
                      have a free or potentially free aldehyde or keto group and
                      can reduce reagents such as Benedict’s solution. Examples:
                      glucose, lactose, maltose.
                    </li>
                    <li>
                      <span className="font-semibold">Non‑reducing sugars:</span>{" "}
                      do not have a free reducing group in solution, so they do
                      not give a positive Benedict’s test. Sucrose is the main
                      example.
                    </li>
                  </ul>
                </div>
              </div>
            </motion.section>
          </div>

          {/* Right: recap / exam focus sidebar */}
          <motion.aside
            custom={2}
            variants={cardVariants}
            initial="hidden"
            animate="visible"
            className={`h-fit rounded-3xl p-5 shadow-sm ${
              isDark
                ? "border border-slate-700 bg-slate-900/80"
                : "border border-slate-200 bg-white"
            }`}
          >
            <h2 className="text-lg font-semibold">Exam‑oriented summary</h2>
            <ul
              className={`mt-3 space-y-2 text-sm ${
                isDark ? "text-slate-200" : "text-slate-700"
              }`}
            >
              <li>
                1. First classify by{" "}
                <span className="font-semibold">number of units</span>:
                monosaccharides, disaccharides, oligosaccharides,
                polysaccharides.
              </li>
              <li>
                2. Then classify by{" "}
                <span className="font-semibold">functional group</span>:
                aldoses versus ketoses.
              </li>
              <li>
                3. Finally, note which common sugars are{" "}
                <span className="font-semibold">reducing or non‑reducing</span>{" "}
                and which laboratory tests detect this.
              </li>
            </ul>

            <div className="mt-4 rounded-2xl bg-emerald-500/10 p-3 text-xs text-emerald-300">
              <p className="font-semibold text-emerald-200">
                Quick memory hook
              </p>
              <p className="mt-1">
                “One, two, few, many → then check the head (functional group)
                and behaviour (reducing or not).”
              </p>
            </div>

            <p className="mt-4 text-[11px] text-slate-400">
              For a short external reading with diagrams, you can refer to
              standard biology resources on carbohydrates.
            </p>
          </motion.aside>
        </div>

        {/* Bottom Lesson Navigation */}
        <div className="mt-12 pt-6 border-t border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 pb-20">
          <Link
            to="/bio-chem-syllabus"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs font-bold text-slate-700 dark:text-slate-200 hover:text-emerald-600 transition-all shadow-sm group"
          >
            <ArrowRight className="w-4 h-4 rotate-180 group-hover:-translate-x-1 transition-transform text-emerald-500" />
            <span>Back to Syllabus</span>
          </Link>

          <Link
            to="/digestion-of-carb"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-xs font-bold text-white transition-all shadow-md shadow-emerald-500/20 group"
          >
            <span>Next: Digestion of Carbohydrates</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </motion.div>
    </div>
  );
};

export default ClassificationOfCarb;
