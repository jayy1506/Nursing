import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import Navbar from "../../../components/Navbar";
import { ArrowRight, ClipboardList } from "lucide-react";

const DigestionOfCarb = () => {
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
            <span className="text-emerald-600">Lesson 2 of 8</span>
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
              Digestion of Carbohydrates
            </h1>
            <p
              className={`mt-2 text-sm sm:text-base ${
                isDark ? "text-slate-300" : "text-slate-600"
              }`}
            >
              Step‑by‑step view of how complex carbohydrates from food become
              absorbable simple sugars in the body.
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
              src="https://med.libretexts.org/@api/deki/files/20164/Carbohydrate-digestion-2.jpg?revision=1&size=bestfit&width=815&height=611"
              alt="Diagram of carbohydrate digestion along the digestive tract"
              className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
            />
          </div>
          <div className="flex flex-col justify-center">
            <h2 className="text-lg font-semibold sm:text-xl">
              Big picture: from starch to glucose
            </h2>
            <p
              className={`mt-2 text-sm sm:text-base ${
                isDark ? "text-slate-300" : "text-slate-700"
              }`}
            >
              Carbohydrate digestion converts starches and sugars in food into
              monosaccharides such as glucose, which can be absorbed and used
              for energy or stored as glycogen.
            </p>

            <div className="mt-4 grid gap-3 text-xs sm:grid-cols-3 sm:text-sm">
              <div
                className={`rounded-2xl p-3 ${
                  isDark ? "bg-slate-800/80" : "bg-emerald-50"
                }`}
              >
                <p className="text-[11px] font-semibold uppercase tracking-wide text-emerald-500">
                  Starts early
                </p>
                <p>Begins in the mouth with chewing and salivary amylase.</p>
              </div>
              <div
                className={`rounded-2xl p-3 ${
                  isDark ? "bg-slate-800/80" : "bg-sky-50"
                }`}
              >
                <p className="text-[11px] font-semibold uppercase tracking-wide text-sky-500">
                  Main site
                </p>
                <p>Most chemical digestion happens in the small intestine.</p>
              </div>
              <div
                className={`rounded-2xl p-3 ${
                  isDark ? "bg-slate-800/80" : "bg-amber-50"
                }`}
              >
                <p className="text-[11px] font-semibold uppercase tracking-wide text-amber-500">
                  End result
                </p>
                <p>Glucose, galactose, and fructose ready for absorption.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Content layout: main concepts + side recap */}
        <div className="mt-8 grid gap-6 lg:grid-cols-[3fr,2fr]">
          {/* Left: teaching blocks */}
          <div className="space-y-6">
            {/* 1. Mouth and stomach */}
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
                  1. Digestion in the mouth and stomach
                </h2>
                <span className="rounded-full bg-emerald-500/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-wide text-emerald-500">
                  starting phase
                </span>
              </div>

              <p
                className={`mt-3 text-sm ${
                  isDark ? "text-slate-300" : "text-slate-700"
                }`}
              >
                The breakdown of carbohydrates begins as soon as food enters the
                mouth and continues until the food mass reaches the acidic
                environment of the stomach.
              </p>

              <div className="mt-4 space-y-3 text-sm">
                <div
                  className={`rounded-2xl p-3 ${
                    isDark ? "bg-slate-800/80" : "bg-emerald-50"
                  }`}
                >
                  <p className="text-xs font-semibold uppercase tracking-wide text-emerald-500">
                    Mouth
                  </p>
                  <ul className="mt-1 space-y-1 list-disc pl-4">
                    <li>
                      Chewing breaks food into smaller pieces and mixes it with
                      saliva.
                    </li>
                    <li>
                      Salivary amylase starts splitting starch into shorter
                      chains such as maltose and small dextrins.
                    </li>
                    <li>
                      This early digestion is brief but helps prepare starch for
                      further breakdown.
                    </li>
                  </ul>
                </div>

                <div
                  className={`rounded-2xl p-3 ${
                    isDark ? "bg-slate-800/80" : "bg-sky-50"
                  }`}
                >
                  <p className="text-xs font-semibold uppercase tracking-wide text-sky-500">
                    Stomach
                  </p>
                  <ul className="mt-1 space-y-1 list-disc pl-4">
                    <li>
                      The acidic gastric juice inactivates salivary amylase.
                    </li>
                    <li>
                      There is little to no further chemical digestion of
                      carbohydrates here.
                    </li>
                    <li>
                      Food is churned into chyme and then released into the
                      small intestine.
                    </li>
                  </ul>
                </div>
              </div>
            </motion.section>

            {/* 2. Small intestine enzymes */}
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
                2. Digestion in the small intestine
              </h2>

              <p
                className={`mt-3 text-sm ${
                  isDark ? "text-slate-300" : "text-slate-700"
                }`}
              >
                Most starch and disaccharide digestion occurs in the small
                intestine with help from pancreatic and intestinal enzymes.
              </p>

              <div className="mt-4 space-y-4 text-sm">
                <div
                  className={`rounded-2xl p-3 ${
                    isDark ? "bg-slate-800/80" : "bg-emerald-50"
                  }`}
                >
                  <p className="text-xs font-semibold uppercase tracking-wide text-emerald-500">
                    Pancreatic amylase
                  </p>
                  <ul className="mt-1 space-y-1 list-disc pl-4">
                    <li>
                      Secreted by the pancreas into the duodenum with pancreatic
                      juice.
                    </li>
                    <li>
                      Continues the work of salivary amylase by breaking starch
                      into maltose and small oligosaccharides.
                    </li>
                  </ul>
                </div>

                <div
                  className={`rounded-2xl p-3 ${
                    isDark ? "bg-slate-800/80" : "bg-sky-50"
                  }`}
                >
                  <p className="text-xs font-semibold uppercase tracking-wide text-sky-500">
                    Brush border enzymes
                  </p>
                  <ul className="mt-1 space-y-1 list-disc pl-4">
                    <li>
                      Located on the microvilli of small‑intestinal epithelial
                      cells.
                    </li>
                    <li>
                      <span className="font-semibold">Maltase</span> splits
                      maltose into two glucose molecules.
                    </li>
                    <li>
                      <span className="font-semibold">Sucrase</span> splits
                      sucrose into glucose and fructose.
                    </li>
                    <li>
                      <span className="font-semibold">Lactase</span> splits
                      lactose into glucose and galactose.
                    </li>
                  </ul>
                </div>
              </div>
            </motion.section>

            {/* 3. Absorption short block (since full absorption is separate topic in your syllabus) */}
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
                3. End products of digestion
              </h2>
              <p
                className={`mt-3 text-sm ${
                  isDark ? "text-slate-300" : "text-slate-700"
                }`}
              >
                After enzymatic digestion, only monosaccharides remain in the
                intestinal lumen and these are ready to be absorbed.
              </p>
              <ul className="mt-3 space-y-1 text-sm list-disc pl-4">
                <li>Glucose from starch, maltose, sucrose, and lactose.</li>
                <li>Galactose mainly from lactose.</li>
                <li>Fructose from sucrose and free fructose in fruits.</li>
              </ul>
              <p
                className={`mt-3 text-sm ${
                  isDark ? "text-slate-300" : "text-slate-700"
                }`}
              >
                These monosaccharides are transported across the intestinal
                wall into blood and then delivered to the liver and other
                tissues.
              </p>
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
                1. Mouth: chewing plus salivary amylase begin starch digestion.
              </li>
              <li>
                2. Stomach: mainly mechanical mixing; salivary amylase is
                inactivated by acid.
              </li>
              <li>
                3. Small intestine: pancreatic amylase and brush border enzymes
                finish digestion to monosaccharides.
              </li>
              <li>
                4. Final products: glucose, galactose, and fructose, ready for
                absorption and metabolism.
              </li>
            </ul>

            <div className="mt-4 rounded-2xl bg-emerald-500/10 p-3 text-xs text-emerald-300">
              <p className="font-semibold text-emerald-200">
                Quick memory hook
              </p>
              <p className="mt-1">
                “Mouth starts, stomach pauses, small intestine finishes.”
              </p>
            </div>

            <p className="mt-4 text-[11px] text-slate-400">
              Use this page together with separate topics on absorption of
              carbohydrates and regulation of blood glucose for a full picture.
            </p>
          </motion.aside>
        </div>

        {/* Bottom Lesson Navigation */}
        <div className="mt-12 pt-6 border-t border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 pb-20">
          <Link
            to="/classification-of-carb"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs font-bold text-slate-700 dark:text-slate-200 hover:text-emerald-600 transition-all shadow-sm group"
          >
            <ArrowRight className="w-4 h-4 rotate-180 group-hover:-translate-x-1 transition-transform text-emerald-500" />
            <span>Previous: Classification of Carbohydrates</span>
          </Link>

          <Link
            to="/absorption-of-carb"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-xs font-bold text-white transition-all shadow-md shadow-emerald-500/20 group"
          >
            <span>Next: Absorption of Carbohydrates</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </motion.div>
    </div>
  );
};

export default DigestionOfCarb;
