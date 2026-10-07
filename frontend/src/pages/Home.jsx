import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

const Home = () => {
  const [showSubjects, setShowSubjects] = useState(false);
  const [theme, setTheme] = useState("light"); // "light" | "dark"
  const navigate = useNavigate();

  const handleStartLearning = () => {
    setShowSubjects(true);
  };

  const handleCloseModal = () => {
    setShowSubjects(false);
  };

  const handleGoToBiochemistry = () => {
    setShowSubjects(false);
    navigate("/bio-chem-syllabus");
  };

  const handleGoToDiet = () => {
    setShowSubjects(false);
    navigate("/nutrition-syllabus");
  };

  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  const isDark = theme === "dark";

  return (
    <div
      className={`min-h-screen transition-colors duration-300 ${
        isDark
          ? "bg-slate-950 text-slate-50"
          : "bg-gradient-to-b from-sky-50 via-white to-emerald-50 text-slate-900"
      }`}
    >
      {/* Sticky Navbar */}
      <Navbar />
      {/* Soft background accents */}
      <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
        <div
          className={`absolute -top-32 -left-16 h-64 w-64 rounded-full blur-3xl ${
            isDark ? "bg-emerald-500/25" : "bg-sky-200/70"
          }`}
        />
        <div
          className={`absolute -bottom-40 right-0 h-72 w-72 rounded-full blur-3xl ${
            isDark ? "bg-sky-500/25" : "bg-emerald-200/80"
          }`}
        />
      </div>

      {/* Page wrapper */}
      <div className="mx-auto flex min-h-screen max-w-6xl flex-col px-4 pb-16 pt-6 sm:px-6 lg:px-8 lg:pt-8">
        {/* Top bar with theme toggle */}
        <div className="flex items-center justify-between">
          <span className="text-sm font-semibold tracking-wide opacity-80">
            Nutrition Learning Hub
          </span>
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

        {/* Hero section */}
        <header className="flex flex-1 flex-col items-start justify-center gap-10 py-10 lg:flex-row lg:items-center">
          {/* Left: text */}
          <div className="max-w-xl">
            <p
              className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-wide ${
                isDark
                  ? "bg-emerald-500/20 text-emerald-200"
                  : "bg-emerald-100 text-emerald-700"
              }`}
            >
              Learn the science of nutrition
            </p>
            <h1
              className={`mt-4 text-3xl font-bold leading-tight sm:text-4xl lg:text-5xl ${
                isDark ? "text-slate-50" : "text-slate-900"
              }`}
            >
              Biochemistry, diet, and nutrients
              <span className="block bg-gradient-to-r from-emerald-500 to-sky-500 bg-clip-text text-transparent">
                explained in a simple way.
              </span>
            </h1>
            <p
              className={`mt-4 text-sm sm:text-base ${
                isDark ? "text-slate-300" : "text-slate-700"
              }`}
            >
              Build a clear understanding of how food is broken down, how
              nutrients travel in the body, and how your daily plate can support
              energy, focus, and long‑term health.
            </p>

            <div className="mt-6 flex flex-wrap items-center gap-4">
              <button
                onClick={handleStartLearning}
                className={`rounded-full px-6 py-2 text-sm font-semibold text-white shadow-lg transition focus:outline-none focus:ring-2 focus:ring-offset-2 ${
                  isDark
                    ? "bg-emerald-500 shadow-emerald-500/40 hover:bg-emerald-400 focus:ring-emerald-400 focus:ring-offset-slate-950"
                    : "bg-emerald-500 shadow-emerald-300/60 hover:bg-emerald-600 focus:ring-emerald-400 focus:ring-offset-emerald-50"
                }`}
              >
                Start learning now
              </button>
              <button
                className={`rounded-full border px-6 py-2 text-sm font-semibold transition focus:outline-none focus:ring-2 focus:ring-offset-2 ${
                  isDark
                    ? "border-slate-600 text-slate-100 hover:bg-slate-800 focus:ring-slate-500 focus:ring-offset-slate-950"
                    : "border-sky-300 text-sky-700 hover:bg-sky-50 focus:ring-sky-300 focus:ring-offset-emerald-50"
                }`}
              >
                View topics overview
              </button>
            </div>

            <div
              className={`mt-6 flex flex-wrap gap-4 text-xs sm:text-sm ${
                isDark ? "text-slate-300" : "text-slate-600"
              }`}
            >
              <div className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-emerald-500" />
                Step‑by‑step micro‑level explanations
              </div>
              <div className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-sky-500" />
                Practical examples from daily meals
              </div>
              <div className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-amber-400" />
                Visuals and quick self‑checks
              </div>
            </div>
          </div>

          {/* Right: illustrative card */}
          <div className="mt-10 w-full max-w-md lg:mt-0 lg:w-1/2">
            <div
              className={`relative overflow-hidden rounded-3xl p-6 shadow-2xl ring-1 ${
                isDark
                  ? "bg-slate-900/80 ring-slate-800"
                  : "bg-white ring-slate-100"
              }`}
            >
              <div
                className={`pointer-events-none absolute -top-24 -right-8 h-40 w-40 rounded-full blur-2xl ${
                  isDark ? "bg-sky-500/25" : "bg-sky-200/80"
                }`}
              />
              <div
                className={`pointer-events-none absolute -bottom-24 -left-10 h-40 w-40 rounded-full blur-2xl ${
                  isDark ? "bg-emerald-500/25" : "bg-emerald-200/80"
                }`}
              />

              <h2
                className={`text-lg font-semibold ${
                  isDark ? "text-slate-50" : "text-slate-900"
                }`}
              >
                See what happens to a meal
              </h2>
              <p
                className={`mt-2 text-xs sm:text-sm ${
                  isDark ? "text-slate-300" : "text-slate-600"
                }`}
              >
                Follow one plate of food from your fork to your cells. Watch how
                enzymes break nutrients down and how your body uses them for
                movement, growth, and repair.
              </p>

              <div className="mt-4 grid grid-cols-2 gap-3 text-xs sm:text-sm">
                <div
                  className={`rounded-2xl p-3 ring-1 ${
                    isDark ? "bg-sky-950/40 ring-sky-800" : "bg-sky-50 ring-sky-100"
                  }`}
                >
                  <p
                    className={`text-[11px] font-semibold uppercase tracking-wide ${
                      isDark ? "text-sky-300" : "text-sky-700"
                    }`}
                  >
                    Biochemistry lens
                  </p>
                  <p
                    className={`mt-1 ${
                      isDark ? "text-slate-100" : "text-slate-800"
                    }`}
                  >
                    Enzymes, pathways, and energy flow shown as easy‑to‑read
                    diagrams.
                  </p>
                </div>
                <div
                  className={`rounded-2xl p-3 ring-1 ${
                    isDark
                      ? "bg-emerald-950/40 ring-emerald-800"
                      : "bg-emerald-50 ring-emerald-100"
                  }`}
                >
                  <p
                    className={`text-[11px] font-semibold uppercase tracking-wide ${
                      isDark ? "text-emerald-300" : "text-emerald-700"
                    }`}
                  >
                    Diet lens
                  </p>
                  <p
                    className={`mt-1 ${
                      isDark ? "text-slate-100" : "text-slate-800"
                    }`}
                  >
                    Learn how different plates affect blood sugar, fullness, and
                    recovery.
                  </p>
                </div>
              </div>

              <div
                className={`mt-5 flex justify-between text-xs ${
                  isDark ? "text-slate-300" : "text-slate-700"
                }`}
              >
                <div className="flex flex-col items-center">
                  <div
                    className={`flex h-10 w-10 items-center justify-center rounded-full ${
                      isDark ? "bg-sky-900 text-sky-300" : "bg-sky-100 text-sky-700"
                    }`}
                  >
                    10+
                  </div>
                  <span className="mt-1 text-[11px]">Animated flows</span>
                </div>
                <div className="flex flex-col items-center">
                  <div
                    className={`flex h-10 w-10 items-center justify-center rounded-full ${
                      isDark
                        ? "bg-emerald-900 text-emerald-300"
                        : "bg-emerald-100 text-emerald-700"
                    }`}
                  >
                    20+
                  </div>
                  <span className="mt-1 text-[11px]">Food examples</span>
                </div>
                <div className="flex flex-col items-center">
                  <div
                    className={`flex h-10 w-10 items-center justify-center rounded-full ${
                      isDark
                        ? "bg-amber-900 text-amber-300"
                        : "bg-amber-100 text-amber-700"
                    }`}
                  >
                    Quiz
                  </div>
                  <span className="mt-1 text-[11px]">Quick checks</span>
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Modal: Subject selection (popup) */}
        {showSubjects && (
          <div className="fixed inset-0 z-40 flex items-center justify-center bg-black/50 px-4">
            <div
              className={`max-w-3xl rounded-3xl p-6 shadow-2xl ring-1 ${
                isDark
                  ? "bg-slate-900 text-slate-50 ring-slate-700"
                  : "bg-white text-slate-900 ring-slate-200"
              }`}
            >
              <div className="flex items-center justify-between gap-4 border-b border-slate-200/70 pb-3">
                <div>
                  <h2 className="text-lg font-semibold">
                    Choose what you want to learn first
                  </h2>
                  <p
                    className={`mt-1 text-xs ${
                      isDark ? "text-slate-300" : "text-slate-600"
                    }`}
                  >
                    Select a subject to continue. You can come back and switch
                    anytime.
                  </p>
                </div>
                <button
                  onClick={handleCloseModal}
                  className={`h-8 w-8 rounded-full text-lg leading-none transition ${
                    isDark
                      ? "bg-slate-800 text-slate-200 hover:bg-slate-700"
                      : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                  }`}
                >
                  ×
                </button>
              </div>

              <div className="mt-5 grid gap-5 md:grid-cols-2">
                {/* Biochemistry box */}
                <section
                  onClick={handleGoToBiochemistry}
                  className={`flex cursor-pointer flex-col rounded-2xl p-4 shadow-md transition hover:-translate-y-1 hover:shadow-xl ${
                    isDark
                      ? "bg-slate-900/80 ring-1 ring-emerald-600/60"
                      : "bg-emerald-50 ring-1 ring-emerald-200"
                  }`}
                >
                  <div className="mb-2 inline-flex items-center gap-2 rounded-full bg-emerald-500/10 px-3 py-1">
                    <span className="h-2 w-2 rounded-full bg-emerald-500" />
                    <span className="text-[11px] font-semibold uppercase tracking-wide text-emerald-600">
                      Biochemistry
                    </span>
                  </div>
                  <h3 className="text-base font-semibold">
                    Biochemistry of the Human Body
                  </h3>
                  <p
                    className={`mt-2 text-xs ${
                      isDark ? "text-slate-200" : "text-slate-700"
                    }`}
                  >
                    Follow how food turns into energy and building blocks inside
                    your cells.
                  </p>
                  <ul
                    className={`mt-3 space-y-1.5 text-xs ${
                      isDark ? "text-slate-100" : "text-slate-800"
                    }`}
                  >
                    <li>• Pathways like glycolysis and fat breakdown.</li>
                    <li>• Enzymes, ATP, and metabolic control.</li>
                    <li>• Simple stories using everyday foods.</li>
                  </ul>
                  <div className="mt-4 text-xs font-semibold text-emerald-700">
                    Start Biochemistry ↗
                  </div>
                </section>

                {/* Diet & Nutrients box */}
                <section
                  onClick={handleGoToDiet}
                  className={`flex cursor-pointer flex-col rounded-2xl p-4 shadow-md transition hover:-translate-y-1 hover:shadow-xl ${
                    isDark
                      ? "bg-slate-900/80 ring-1 ring-sky-600/60"
                      : "bg-sky-50 ring-1 ring-sky-200"
                  }`}
                >
                  <div className="mb-2 inline-flex items-center gap-2 rounded-full bg-sky-500/10 px-3 py-1">
                    <span className="h-2 w-2 rounded-full bg-sky-500" />
                    <span className="text-[11px] font-semibold uppercase tracking-wide text-sky-700">
                      Diet & nutrients
                    </span>
                  </div>
                  <h3 className="text-base font-semibold">
                    Diet, Nutrients, and Everyday Choices
                  </h3>
                  <p
                    className={`mt-2 text-xs ${
                      isDark ? "text-slate-200" : "text-slate-700"
                    }`}
                  >
                    Learn how to build balanced plates and cover key vitamins
                    and minerals.
                  </p>
                  <ul
                    className={`mt-3 space-y-1.5 text-xs ${
                      isDark ? "text-slate-100" : "text-slate-800"
                    }`}
                  >
                    <li>• Plate templates for different goals.</li>
                    <li>• Food sources of essential nutrients.</li>
                    <li>• Practical daily meal examples.</li>
                  </ul>
                  <div className="mt-4 text-xs font-semibold text-sky-700">
                    Start Diet & Nutrients ↗
                  </div>
                </section>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
