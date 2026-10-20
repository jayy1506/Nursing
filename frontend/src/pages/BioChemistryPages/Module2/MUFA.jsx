import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import Navbar from "../../../components/Navbar";
import { ArrowRight, ClipboardList } from "lucide-react";

const MUFA = () => {
  const [theme, setTheme] = useState("light");
  const isDark = theme === "dark";

  const toggleTheme = () =>
    setTheme((prev) => (prev === "light" ? "dark" : "light"));

  const pageVariants = {
    hidden: { opacity: 0, y: 24 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" },
    },
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
        isDark ? "bg-neutral-950 text-neutral-50" : "bg-neutral-50 text-neutral-900"
      }`}
    >
      {/* Navbar at top */}
      <Navbar />

      {/* Top Back Navigation Bar */}
      <div className={`border-b py-2.5 px-4 sm:px-6 lg:px-8 ${isDark ? 'bg-neutral-900 border-neutral-800' : 'bg-white border-neutral-200'}`}>
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <Link
            to="/bio-chem-syllabus"
            className="inline-flex items-center gap-2 text-xs font-bold text-green-700 hover:text-green-700 transition-colors cursor-pointer group"
          >
            <ArrowRight className="w-4 h-4 rotate-180 group-hover:-translate-x-1 transition-transform" />
            <span>Back to Full Syllabus</span>
          </Link>
          <div className="flex items-center gap-2 text-[11px] font-semibold text-neutral-400">
            <span>Unit 2: Lipids & Fatty Acids</span>
            <span>/</span>
            <span className="text-green-700">Lesson 2 of 4</span>
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
            <p className="text-xs font-semibold uppercase tracking-wide text-green-500">
              Biochemistry • Lipid metabolism
            </p>
            <h1 className="mt-1 text-2xl font-bold sm:text-3xl lg:text-4xl">
              Mono‑unsaturated Fatty Acids (MUFA)
            </h1>
            <p
              className={`mt-2 text-sm sm:text-base ${
                isDark ? "text-neutral-300" : "text-neutral-600"
              }`}
            >
              Definition, common examples and food sources, and brief clinical
              significance for health and disease.
            </p>
          </div>

          {/* Theme toggle */}
          <button
            onClick={toggleTheme}
            className={`flex items-center gap-2 rounded-full border px-3 py-1 text-xs font-semibold transition ${
              isDark
                ? "border-neutral-600 bg-neutral-900 text-neutral-100 hover:border-green-400"
                : "border-neutral-200 bg-white text-neutral-800 hover:border-neutral-300"
            }`}
          >
            <span
              className={`inline-flex h-4 w-4 items-center justify-center rounded-full text-[10px] ${
                isDark ? "bg-neutral-800" : "bg-neutral-100"
              }`}
            >
              {isDark ? "🌙" : "☀️"}
            </span>
            {isDark ? "Dark mode" : "Light mode"}
          </button>
        </div>

        {/* Hero: definition + quick concept card */}
        <section
          className={`grid gap-6 rounded-3xl border p-5 shadow-sm md:grid-cols-[3fr,2fr] ${
            isDark
              ? "border-neutral-700 bg-neutral-900/70"
              : "border-neutral-200 bg-white"
          }`}
        >
          <div className="flex flex-col justify-center">
            <h2 className="text-lg font-semibold sm:text-xl">Definition</h2>
            <p
              className={`mt-2 text-sm sm:text-base ${
                isDark ? "text-neutral-300" : "text-neutral-700"
              }`}
            >
              Mono‑unsaturated fatty acids (MUFA) are fatty acids that contain a
              single carbon–carbon double bond in their hydrocarbon chain, with
              all other carbon–carbon bonds being single bonds.
            </p>

            <div className="mt-4 grid gap-3 text-xs sm:grid-cols-3 sm:text-sm">
              <div
                className={`rounded-2xl p-3 ${
                  isDark ? "bg-neutral-800/80" : "bg-green-50"
                }`}
              >
                <p className="text-[11px] font-semibold uppercase tracking-wide text-green-500">
                  Key structural point
                </p>
                <p>Exactly one double bond in the chain.</p>
              </div>
              <div
                className={`rounded-2xl p-3 ${
                  isDark ? "bg-neutral-800/80" : "bg-neutral-100"
                }`}
              >
                <p className="text-[11px] font-semibold uppercase tracking-wide text-green-700">
                  Main example
                </p>
                <p>Oleic acid (18:1, ω‑9) is the most abundant MUFA in diet.</p>
              </div>
              <div
                className={`rounded-2xl p-3 ${
                  isDark ? "bg-neutral-800/80" : "bg-neutral-100"
                }`}
              >
                <p className="text-[11px] font-semibold uppercase tracking-wide text-neutral-800">
                  Physical property
                </p>
                <p>Generally liquid at room temperature, solid when chilled.</p>
              </div>
            </div>
          </div>

          <div
            className={`rounded-2xl border text-xs sm:text-sm ${
              isDark
                ? "border-neutral-700 bg-neutral-900/80 text-neutral-200"
                : "border-neutral-200 bg-neutral-50 text-neutral-700"
            }`}
          >
            <div className="border-b px-4 py-2 text-[11px] font-semibold uppercase tracking-wide text-green-500 border-neutral-700/60">
              Concept snapshot
            </div>
            <div className="p-4 space-y-2">
              <p>Structural: one C=C double bond.</p>
              <p>Chemical: usually in cis form, improves fluidity of lipids.</p>
              <p>Dietary: abundant in olive oil, canola oil, nuts, avocado.</p>
            </div>
          </div>
        </section>

        {/* Content layout: main concepts + side recap */}
        <div className="mt-8 grid gap-6 lg:grid-cols-[3fr,2fr]">
          {/* Left: teaching blocks */}
          <div className="space-y-6">
            {/* 1. Structure and examples */}
            <motion.section
              custom={0}
              variants={cardVariants}
              initial="hidden"
              animate="visible"
              className={`rounded-3xl p-5 shadow-sm ${
                isDark
                  ? "border border-neutral-700 bg-neutral-900/80"
                  : "border border-neutral-200 bg-white"
              }`}
            >
              <div className="flex items-center justify-between gap-2">
                <h2 className="text-lg font-semibold">
                  1. Structure and key examples
                </h2>
                <span className="rounded-full bg-green-500/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-wide text-green-500">
                  basic science
                </span>
              </div>

              <p
                className={`mt-3 text-sm ${
                  isDark ? "text-neutral-300" : "text-neutral-700"
                }`}
              >
                The single double bond in MUFA introduces a “kink” in the
                hydrocarbon chain if it is in the cis configuration, affecting
                how these fatty acids pack in membranes and fats.
              </p>

              <div className="mt-4 grid gap-3 text-sm sm:grid-cols-2">
                <div
                  className={`rounded-2xl p-3 ${
                    isDark ? "bg-neutral-800/80" : "bg-green-50"
                  }`}
                >
                  <p className="text-xs font-semibold uppercase tracking-wide text-green-500">
                    Common MUFA in humans
                  </p>
                  <ul className="mt-1 space-y-1 list-disc pl-4">
                    <li>Oleic acid (18:1, ω‑9) – major MUFA in diet and tissues.</li>
                    <li>Palmitoleic acid (16:1, ω‑7).</li>
                    <li>Vaccenic acid (18:1, ω‑7) in some animal fats.</li>
                  </ul>
                </div>

                <div
                  className={`rounded-2xl p-3 ${
                    isDark ? "bg-neutral-800/80" : "bg-neutral-100"
                  }`}
                >
                  <p className="text-xs font-semibold uppercase tracking-wide text-green-700">
                    Main dietary sources
                  </p>
                  <ul className="mt-1 space-y-1 list-disc pl-4">
                    <li>Olive oil, canola oil, peanut oil.</li>
                    <li>Nuts (almonds, cashews, pistachios, hazelnuts).</li>
                    <li>Avocado and some seeds; also present in animal fats.</li>
                  </ul>
                </div>
              </div>
            </motion.section>

            {/* 2. Clinical and nutritional significance – cardiovascular and metabolic */}
            <motion.section
              custom={1}
              variants={cardVariants}
              initial="hidden"
              animate="visible"
              className={`rounded-3xl p-5 shadow-sm ${
                isDark
                  ? "border border-neutral-700 bg-neutral-900/80"
                  : "border border-neutral-200 bg-white"
              }`}
            >
              <div className="flex items-center justify-between gap-2">
                <h2 className="text-lg font-semibold">
                  2. Clinical significance – cardiovascular and metabolic health
                </h2>
                <span className="rounded-full bg-green-500/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-wide text-green-700">
                  health effects
                </span>
              </div>

              <p
                className={`mt-3 text-sm ${
                  isDark ? "text-neutral-300" : "text-neutral-700"
                }`}
              >
                MUFA‑rich dietary patterns, such as Mediterranean‑type diets,
                are generally associated with favourable cardiometabolic
                profiles when they replace saturated and trans fats.
              </p>

              <div className="mt-4 grid gap-3 text-sm sm:grid-cols-2">
                <div
                  className={`rounded-2xl p-3 ${
                    isDark ? "bg-neutral-800/80" : "bg-green-50"
                  }`}
                >
                  <p className="text-xs font-semibold uppercase tracking-wide text-green-500">
                    Potential benefits (evidence‑based trends)
                  </p>
                  <ul className="mt-1 space-y-1 list-disc pl-4">
                    <li>
                      Can help improve blood lipid profile (for example, lowering
                      LDL‑cholesterol when substituted for saturated fat).
                    </li>
                    <li>
                      May support better insulin sensitivity and glycaemic
                      control in type 2 diabetes as part of an overall healthy
                      diet.
                    </li>
                    <li>
                      May modestly lower blood pressure and markers of
                      inflammation in some studies.
                    </li>
                  </ul>
                </div>

                <div
                  className={`rounded-2xl p-3 ${
                    isDark ? "bg-neutral-800/80" : "bg-neutral-100"
                  }`}
                >
                  <p className="text-xs font-semibold uppercase tracking-wide text-neutral-800">
                    Important considerations
                  </p>
                  <ul className="mt-1 space-y-1 list-disc pl-4">
                    <li>
                      Benefits are clearest when MUFA replace saturated or trans
                      fats, not when simply added on top of excess calories.
                    </li>
                    <li>
                      MUFA provide the same calories per gram as other fats, so
                      portion control remains important in weight management.
                    </li>
                    <li>
                      Overall dietary pattern (fruits, vegetables, whole grains)
                      matters more than any single nutrient alone.
                    </li>
                  </ul>
                </div>
              </div>
            </motion.section>

            {/* 3. Simple clinical correlations */}
            <motion.section
              custom={2}
              variants={cardVariants}
              initial="hidden"
              animate="visible"
              className={`rounded-3xl p-5 shadow-sm ${
                isDark
                  ? "border border-neutral-700 bg-neutral-900/80"
                  : "border border-neutral-200 bg-white"
              }`}
            >
              <h2 className="text-lg font-semibold">
                3. Simple clinical correlations (exam‑style points)
              </h2>
              <p
                className={`mt-3 text-sm ${
                  isDark ? "text-neutral-300" : "text-neutral-700"
                }`}
              >
                From an exam perspective, focus on contrasting MUFA with
                saturated and trans fats and on knowing key examples and food
                sources.
              </p>

              <ul className="mt-3 space-y-1 text-sm list-disc pl-4">
                <li>
                  Olive oil is a classic MUFA‑rich oil; its major fatty acid is
                  oleic acid.
                </li>
                <li>
                  Replacing part of dietary saturated fat with MUFA is generally
                  considered a heart‑healthy change.
                </li>
                <li>
                  MUFA do not remove the need to limit total fat and energy
                  intake in obesity or metabolic syndrome.
                </li>
              </ul>
            </motion.section>
          </div>

          {/* Right: recap / exam focus sidebar */}
          <motion.aside
            custom={3}
            variants={cardVariants}
            initial="hidden"
            animate="visible"
            className={`h-fit rounded-3xl p-5 shadow-sm ${
              isDark
                ? "border border-neutral-700 bg-neutral-900/80"
                : "border border-neutral-200 bg-white"
            }`}
          >
            <h2 className="text-lg font-semibold">Exam‑oriented summary</h2>
            <ul
              className={`mt-3 space-y-2 text-sm ${
                isDark ? "text-neutral-200" : "text-neutral-700"
              }`}
            >
              <li>
                1. Definition: fatty acids with <span className="font-semibold">
                  one
                </span>{" "}
                C=C double bond (usually cis).
              </li>
              <li>
                2. Main example: oleic acid (18:1, ω‑9); main sources: olive/
                canola oil, nuts, avocado.
              </li>
              <li>
                3. Clinical significance: when substituted for saturated/trans
                fat, MUFA‑rich diets improve lipid profile and may reduce
                cardiovascular and metabolic risk.
              </li>
              <li>
                4. Still energy‑dense; benefits depend on overall dietary
                pattern and total calorie balance.
              </li>
            </ul>

            <div className="mt-4 rounded-2xl bg-green-500/10 p-3 text-xs text-green-400">
              <p className="font-semibold text-green-100">
                Quick memory hook
              </p>
              <p className="mt-1">
                “MUFA = one bend, mostly a friend” – one double bond that often
                supports heart‑healthy diets.
              </p>
            </div>

            <p className="mt-4 text-[11px] text-neutral-400">
              Link this topic with saturated fats, PUFA, and dietary lipid
              recommendations in later sections.
            </p>
          </motion.aside>
        </div>

        {/* Bottom Lesson Navigation */}
        <div className="mt-12 pt-6 border-t border-neutral-200 dark:border-neutral-800 flex flex-col sm:flex-row items-center justify-between gap-4 pb-20">
          <Link
            to="/fatty-acids-classification"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 text-xs font-bold text-neutral-700 dark:text-neutral-200 hover:text-green-700 transition-all shadow-sm group"
          >
            <ArrowRight className="w-4 h-4 rotate-180 group-hover:-translate-x-1 transition-transform text-green-700" />
            <span>Previous: Fatty Acids Classification</span>
          </Link>

          <Link
            to="/pufa"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-2xl bg-gradient-to-r from-green-500 to-green-500 hover:from-green-500 hover:to-green-500 text-xs font-bold text-white transition-all shadow-md shadow-md group"
          >
            <span>Next: Polyunsaturated Fatty Acids (PUFA)</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </motion.div>
    </div>
  );
};

export default MUFA;
