import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import Navbar from "../../../components/Navbar";
import { ArrowRight, ClipboardList } from "lucide-react";

const EssentialFattyAcids = () => {
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
            className="inline-flex items-center gap-2 text-xs font-bold text-sky-600 hover:text-sky-700 transition-colors cursor-pointer group"
          >
            <ArrowRight className="w-4 h-4 rotate-180 group-hover:-translate-x-1 transition-transform" />
            <span>Back to Full Syllabus</span>
          </Link>
          <div className="flex items-center gap-2 text-[11px] font-semibold text-slate-400">
            <span>Unit 2: Lipids & Fatty Acids</span>
            <span>/</span>
            <span className="text-sky-600">Lesson 4 of 4 (Final Lesson)</span>
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
              Biochemistry • Lipid metabolism
            </p>
            <h1 className="mt-1 text-2xl font-bold sm:text-3xl lg:text-4xl">
              Essential Fatty Acids (EFA)
            </h1>
            <p
              className={`mt-2 text-sm sm:text-base ${
                isDark ? "text-slate-300" : "text-slate-600"
              }`}
            >
              Definition, main examples, physiological roles, and clinical
              importance of essential fatty acids.
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

        {/* Hero: definition + quick map */}
        <section
          className={`grid gap-6 rounded-3xl border p-5 shadow-sm md:grid-cols-[3fr,2fr] ${
            isDark
              ? "border-slate-700 bg-slate-900/70"
              : "border-slate-200 bg-white"
          }`}
        >
          <div className="flex flex-col justify-center">
            <h2 className="text-lg font-semibold sm:text-xl">Definition</h2>
            <p
              className={`mt-2 text-sm sm:text-base ${
                isDark ? "text-slate-300" : "text-slate-700"
              }`}
            >
              Essential fatty acids are polyunsaturated fatty acids that humans
              cannot synthesise in adequate amounts because the enzymes needed
              to introduce double bonds beyond carbon 9–10 are absent; they must
              therefore be obtained from the diet.
            </p>

            <div className="mt-4 grid gap-3 text-xs sm:grid-cols-3 sm:text-sm">
              <div
                className={`rounded-2xl p-3 ${
                  isDark ? "bg-slate-800/80" : "bg-emerald-50"
                }`}
              >
                <p className="text-[11px] font-semibold uppercase tracking-wide text-emerald-500">
                  Human EFA
                </p>
                <p>Linoleic acid (LA, 18:2 n‑6) and α‑linolenic acid (ALA, 18:3 n‑3).</p>
              </div>
              <div
                className={`rounded-2xl p-3 ${
                  isDark ? "bg-slate-800/80" : "bg-sky-50"
                }`}
              >
                <p className="text-[11px] font-semibold uppercase tracking-wide text-sky-500">
                  Derived long‑chain PUFA
                </p>
                <p>Arachidonic acid (AA), EPA, DHA formed from LA and ALA.</p>
              </div>
              <div
                className={`rounded-2xl p-3 ${
                  isDark ? "bg-slate-800/80" : "bg-amber-50"
                }`}
              >
                <p className="text-[11px] font-semibold uppercase tracking-wide text-amber-500">
                  Key roles
                </p>
                <p>Membrane structure, eicosanoids, brain and visual function.</p>
              </div>
            </div>
          </div>

          <div
            className={`rounded-2xl border text-xs sm:text-sm ${
              isDark
                ? "border-slate-700 bg-slate-900/80 text-slate-200"
                : "border-slate-200 bg-slate-50 text-slate-700"
            }`}
          >
            <div className="border-b px-4 py-2 text-[11px] font-semibold uppercase tracking-wide text-emerald-500 border-slate-700/60">
              Concept snapshot
            </div>
            <div className="p-4 space-y-2">
              <p>• Cannot be made de novo in humans.</p>
              <p>• Must come from diet (plant oils, nuts, fish etc.).</p>
              <p>• Precursors of important signalling molecules (eicosanoids).</p>
            </div>
          </div>
        </section>

        {/* Content layout: main concepts + side recap */}
        <div className="mt-8 grid gap-6 lg:grid-cols-[3fr,2fr]">
          {/* Left: teaching blocks */}
          <div className="space-y-6">
            {/* 1. Main examples and sources */}
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
                  1. Main essential fatty acids and dietary sources
                </h2>
                <span className="rounded-full bg-emerald-500/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-wide text-emerald-500">
                  examples
                </span>
              </div>

              <p
                className={`mt-3 text-sm ${
                  isDark ? "text-slate-300" : "text-slate-700"
                }`}
              >
                Only two fatty acids are strictly essential in humans; others
                become “conditionally essential” when synthesis from these
                precursors is insufficient.
              </p>

              <div className="mt-4 grid gap-3 text-sm sm:grid-cols-2">
                <div
                  className={`rounded-2xl p-3 ${
                    isDark ? "bg-slate-800/80" : "bg-amber-50"
                  }`}
                >
                  <p className="text-xs font-semibold uppercase tracking-wide text-amber-500">
                    Linoleic acid (LA, 18:2 n‑6)
                  </p>
                  <ul className="mt-1 space-y-1 list-disc pl-4">
                    <li>Omega‑6 essential fatty acid.</li>
                    <li>
                      Major dietary sources: many vegetable oils (sunflower,
                      safflower, corn, soybean), nuts and seeds.
                    </li>
                    <li>
                      Precursor of longer‑chain omega‑6 PUFA such as arachidonic
                      acid.
                    </li>
                  </ul>
                </div>

                <div
                  className={`rounded-2xl p-3 ${
                    isDark ? "bg-slate-800/80" : "bg-sky-50"
                  }`}
                >
                  <p className="text-xs font-semibold uppercase tracking-wide text-sky-500">
                    α‑Linolenic acid (ALA, 18:3 n‑3)
                  </p>
                  <ul className="mt-1 space-y-1 list-disc pl-4">
                    <li>Omega‑3 essential fatty acid.</li>
                    <li>
                      Major dietary sources: flaxseed and chia seed, walnuts,
                      canola and soybean oils, some green leafy vegetables.
                    </li>
                    <li>
                      Precursor for EPA and DHA, though conversion is limited in
                      humans.
                    </li>
                  </ul>
                </div>
              </div>

              <div className="mt-4 rounded-2xl bg-emerald-500/5 p-3 text-xs">
                <p className="font-semibold text-emerald-500">
                  Conditionally essential (concept)
                </p>
                <p className="mt-1">
                  Arachidonic acid (AA), EPA, and DHA can become conditionally
                  essential in situations where endogenous synthesis from LA or
                  ALA is inadequate (for example, prematurity, certain diseases).
                </p>
              </div>
            </motion.section>

            {/* 2. Physiological roles */}
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
              <div className="flex items-center justify-between gap-2">
                <h2 className="text-lg font-semibold">
                  2. Physiological roles and functions
                </h2>
                <span className="rounded-full bg-sky-500/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-wide text-sky-500">
                  what they do
                </span>
              </div>

              <p
                className={`mt-3 text-sm ${
                  isDark ? "text-slate-300" : "text-slate-700"
                }`}
              >
                Essential fatty acids are incorporated into cell membranes and
                serve as precursors of signalling molecules with wide‑ranging
                effects.
              </p>

              <div className="mt-4 grid gap-3 text-sm sm:grid-cols-2">
                <div
                  className={`rounded-2xl p-3 ${
                    isDark ? "bg-slate-800/80" : "bg-emerald-50"
                  }`}
                >
                  <p className="text-xs font-semibold uppercase tracking-wide text-emerald-500">
                    Structural and functional roles
                  </p>
                  <ul className="mt-1 space-y-1 list-disc pl-4">
                    <li>
                      Maintain membrane fluidity and permeability, especially in
                      brain and retina phospholipids.
                    </li>
                    <li>
                      Influence activity of membrane proteins, receptors, and
                      transporters.
                    </li>
                    <li>
                      Important for normal growth, neural development, and
                      visual function.
                    </li>
                  </ul>
                </div>

                <div
                  className={`rounded-2xl p-3 ${
                    isDark ? "bg-slate-800/80" : "bg-amber-50"
                  }`}
                >
                  <p className="text-xs font-semibold uppercase tracking-wide text-amber-500">
                    Precursors of eicosanoids and other mediators
                  </p>
                  <ul className="mt-1 space-y-1 list-disc pl-4">
                    <li>
                      Arachidonic acid (from LA) and EPA (from ALA) give rise to
                      prostaglandins, leukotrienes, and related mediators.
                    </li>
                    <li>
                      These mediators modulate inflammation, platelet function,
                      vascular tone, and many other processes.
                    </li>
                    <li>
                      Balance of omega‑6‑ and omega‑3‑derived mediators
                      influences pro‑ and anti‑inflammatory responses.
                    </li>
                  </ul>
                </div>
              </div>
            </motion.section>

            {/* 3. Clinical importance and deficiency */}
            <motion.section
              custom={2}
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
                3. Clinical importance and deficiency (exam‑style points)
              </h2>
              <p
                className={`mt-3 text-sm ${
                  isDark ? "text-slate-300" : "text-slate-700"
                }`}
              >
                Adequate intake of essential fatty acids supports skin integrity,
                growth, cardiovascular health, and brain function, whereas
                deficiency produces characteristic signs.
              </p>

              <div className="mt-4 grid gap-3 text-sm sm:grid-cols-2">
                <div
                  className={`rounded-2xl p-3 ${
                    isDark ? "bg-slate-800/80" : "bg-rose-50"
                  }`}
                >
                  <p className="text-xs font-semibold uppercase tracking-wide text-rose-500">
                    Deficiency features (especially in infants / severe
                    malnutrition)
                  </p>
                  <ul className="mt-1 space-y-1 list-disc pl-4">
                    <li>Dry, scaly dermatitis and impaired skin barrier.</li>
                    <li>Poor wound healing and increased susceptibility to infection.</li>
                    <li>Poor growth and developmental issues in children.</li>
                    <li>
                      In severe cases, thrombocytopenia and other laboratory
                      abnormalities may appear.
                    </li>
                  </ul>
                </div>

                <div
                  className={`rounded-2xl p-3 ${
                    isDark ? "bg-slate-800/80" : "bg-emerald-50"
                  }`}
                >
                  <p className="text-xs font-semibold uppercase tracking-wide text-emerald-500">
                    Broader clinical relevance
                  </p>
                  <ul className="mt-1 space-y-1 list-disc pl-4">
                    <li>
                      Adequate omega‑3 intake is linked with reduced
                      cardiovascular risk and may support cognitive and mental
                      health.
                    </li>
                    <li>
                      Parenteral and enteral nutrition formulas must include
                      essential fatty acids to prevent deficiency in
                      long‑term‑fed patients.
                    </li>
                    <li>
                      Diets extremely low in fat or lacking plant oils/fish can
                      precipitate deficiency over time.
                    </li>
                  </ul>
                </div>
              </div>
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
                1. Definition: dietary PUFA that humans cannot synthesise (LA and
                ALA).
              </li>
              <li>
                2. Examples: LA → omega‑6 series (including arachidonic acid);
                ALA → omega‑3 series (EPA, DHA).
              </li>
              <li>
                3. Functions: membrane structure, growth and development,
                precursors of eicosanoids and other lipid mediators.
              </li>
              <li>
                4. Clinical importance: deficiency causes scaly dermatitis, poor
                growth, and impaired healing; adequate intake contributes to
                cardiovascular and neural health.
              </li>
            </ul>

            <div className="mt-4 rounded-2xl bg-emerald-500/10 p-3 text-xs text-emerald-300">
              <p className="font-semibold text-emerald-200">
                Quick memory hook
              </p>
              <p className="mt-1">
                “LA and ALA are essential for LIFE” – L for linoleic (n‑6), A
                for α‑linolenic (n‑3), both vital for membranes and mediators.
              </p>
            </div>

            <p className="mt-4 text-[11px] text-slate-400">
              Link this topic with PUFA, eicosanoids, and nutritional
              recommendations for omega‑3 and omega‑6 intake.
            </p>
          </motion.aside>
        </div>

        {/* Bottom Lesson Navigation */}
        <div className="mt-12 pt-6 border-t border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 pb-20">
          <Link
            to="/pufa"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs font-bold text-slate-700 dark:text-slate-200 hover:text-sky-600 transition-all shadow-sm group"
          >
            <ArrowRight className="w-4 h-4 rotate-180 group-hover:-translate-x-1 transition-transform text-sky-500" />
            <span>Previous: Polyunsaturated Fatty Acids (PUFA)</span>
          </Link>

          <div className="flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto">
            <Link
              to="/student/quiz/unit-2-lipids"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-2xl bg-gradient-to-r from-sky-500 to-indigo-600 hover:from-sky-600 hover:to-indigo-700 text-xs font-extrabold text-white transition-all shadow-md shadow-sky-500/25 group cursor-pointer"
            >
              <ClipboardList className="w-4 h-4" />
              <span>Complete Unit 2: Take Assessment (15 Qs)</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default EssentialFattyAcids;
