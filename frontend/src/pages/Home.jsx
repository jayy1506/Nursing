import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import { useAuth } from "../context/AuthContext";
import { getStudentGatingStatus } from "../services/assessmentEngine";
import {
  Sparkles,
  BookOpen,
  ArrowRight,
  Activity,
  Award,
  ShieldCheck,
  ClipboardList,
  Timer,
  CheckCircle2,
  ChevronRight,
  GraduationCap,
  BarChart3,
  Stethoscope,
  Lock,
  Unlock,
  Dna,
  Utensils,
  Layers,
  HelpCircle
} from "lucide-react";

const Home = () => {
  const navigate = useNavigate();
  const { currentUser, role } = useAuth();

  const [anatStatus, setAnatStatus] = useState({ completedCount: 0, completionPercent: 0, isFinalUnlocked: false });
  const [physStatus, setPhysStatus] = useState({ completedCount: 0, completionPercent: 0, isFinalUnlocked: false });
  const [biocStatus, setBiocStatus] = useState({ completedCount: 0, completionPercent: 0, isFinalUnlocked: false });
  const [nutrStatus, setNutrStatus] = useState({ completedCount: 0, completionPercent: 0, isFinalUnlocked: false });

  useEffect(() => {
    setAnatStatus(getStudentGatingStatus("anatomy"));
    setPhysStatus(getStudentGatingStatus("physiology"));
    setBiocStatus(getStudentGatingStatus("biochemistry"));
    setNutrStatus(getStudentGatingStatus("nutrition"));
  }, []);

  const getNickname = () => {
    if (!currentUser) return "Future Nurse";
    if (currentUser.displayName) return currentUser.displayName.split(" ")[0];
    if (currentUser.name) return currentUser.name.split(" ")[0];
    if (currentUser.email) return currentUser.email.split("@")[0];
    return "Student";
  };

  const nickname = getNickname();

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 via-white to-emerald-50/30 text-slate-900 pb-24">
      {/* Sticky Top Navbar */}
      <Navbar />

      {/* Hero & Student Welcome Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-teal-950 to-slate-900 text-white pt-10 pb-16 px-4 sm:px-6 lg:px-8 shadow-2xl">
        {/* Ambient Gradient Glows */}
        <div className="pointer-events-none absolute -top-24 -left-20 h-96 w-96 rounded-full bg-emerald-500/20 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-24 right-0 h-96 w-96 rounded-full bg-sky-500/20 blur-3xl" />

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-10">
            {/* Left Column: Heading & Value Prop */}
            <div className="max-w-2xl">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-extrabold border border-emerald-500/30 mb-4 backdrop-blur-md">
                <Sparkles className="w-4 h-4 text-emerald-400" />
                <span>INC CBME Standardized Curriculum • B.Sc Nursing Semester I</span>
              </div>

              <h1 className="text-3xl sm:text-5xl font-black tracking-tight leading-tight">
                Welcome back,{" "}
                <span className="bg-gradient-to-r from-emerald-400 via-teal-300 to-sky-400 bg-clip-text text-transparent">
                  {nickname}
                </span>{" "}
                👋
              </h1>

              <p className="mt-4 text-slate-300 text-sm sm:text-base leading-relaxed">
                Your premier clinical mastery platform for human anatomy, physiology mechanisms, metabolic biochemistry, and clinical dietetics. Study structured textbooks, examine high-yield plates, and complete university-accredited competency assessments.
              </p>

              {/* Action Buttons */}
              <div className="mt-8 flex flex-wrap items-center gap-3">
                <button
                  onClick={() => navigate("/syllabus")}
                  className="px-6 py-3 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white font-extrabold text-sm shadow-lg shadow-emerald-500/25 transition-all transform hover:-translate-y-0.5 flex items-center gap-2 cursor-pointer"
                >
                  <BookOpen className="w-4 h-4" />
                  <span>Enter Syllabus Hub</span>
                  <ArrowRight className="w-4 h-4 ml-1" />
                </button>

                <button
                  onClick={() => navigate("/question-bank")}
                  className="px-5 py-3 rounded-2xl bg-white/10 hover:bg-white/20 text-white font-extrabold text-sm border border-white/15 transition-all flex items-center gap-2 cursor-pointer"
                >
                  <ClipboardList className="w-4 h-4 text-sky-400" />
                  <span>Question Bank (1,500+ MCQs)</span>
                </button>

                {role === "student" && (
                  <button
                    onClick={() => navigate("/student/results")}
                    className="px-5 py-3 rounded-2xl bg-slate-800/80 hover:bg-slate-800 text-slate-200 hover:text-white font-bold text-sm border border-slate-700 transition-all flex items-center gap-2 cursor-pointer"
                  >
                    <BarChart3 className="w-4 h-4 text-amber-400" />
                    <span>My Quiz History</span>
                  </button>
                )}
              </div>
            </div>

            {/* Right Column: Live Academic Progress & Competency Gating Card */}
            <div className="w-full lg:max-w-md bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-6 sm:p-7 shadow-2xl text-white">
              <div className="flex items-center justify-between pb-4 border-b border-white/10">
                <div className="flex items-center gap-2.5">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-400 to-sky-400 flex items-center justify-center text-slate-900 font-extrabold shadow-md">
                    <GraduationCap className="w-5 h-5 text-slate-900" />
                  </div>
                  <div>
                    <h3 className="font-extrabold text-sm text-white">Academic Standing</h3>
                    <p className="text-[11px] text-slate-300">Semester I Competency Tracker</p>
                  </div>
                </div>
                <span className="px-2.5 py-1 rounded-full text-[10px] font-extrabold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                  INC ≥ 75%
                </span>
              </div>

              {/* Progress Meters for All 4 Curriculum Tracks */}
              <div className="mt-4 space-y-3">
                {/* Anatomy Meter */}
                <div>
                  <div className="flex justify-between text-xs font-bold mb-1">
                    <span className="flex items-center gap-1.5 text-slate-200">
                      <span>🦴</span>
                      <span>Anatomy</span>
                    </span>
                    <span className="text-teal-400">{anatStatus.completedCount} / 12 Units ({anatStatus.completionPercent}%)</span>
                  </div>
                  <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden p-0.5 border border-white/10">
                    <div
                      className="h-full bg-teal-400 rounded-full transition-all duration-500"
                      style={{ width: `${Math.max(5, anatStatus.completionPercent)}%` }}
                    />
                  </div>
                </div>

                {/* Physiology Meter */}
                <div>
                  <div className="flex justify-between text-xs font-bold mb-1">
                    <span className="flex items-center gap-1.5 text-slate-200">
                      <span>⚡</span>
                      <span>Physiology</span>
                    </span>
                    <span className="text-sky-400">{physStatus.completedCount} / 12 Units ({physStatus.completionPercent}%)</span>
                  </div>
                  <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden p-0.5 border border-white/10">
                    <div
                      className="h-full bg-sky-400 rounded-full transition-all duration-500"
                      style={{ width: `${Math.max(5, physStatus.completionPercent)}%` }}
                    />
                  </div>
                </div>

                {/* Biochemistry Meter */}
                <div>
                  <div className="flex justify-between text-xs font-bold mb-1">
                    <span className="flex items-center gap-1.5 text-slate-200">
                      <span>🧬</span>
                      <span>Biochemistry</span>
                    </span>
                    <span className="text-emerald-400">{biocStatus.completedCount} / 7 Units ({biocStatus.completionPercent}%)</span>
                  </div>
                  <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden p-0.5 border border-white/10">
                    <div
                      className="h-full bg-emerald-400 rounded-full transition-all duration-500"
                      style={{ width: `${Math.max(5, biocStatus.completionPercent)}%` }}
                    />
                  </div>
                </div>

                {/* Nutrition Meter */}
                <div>
                  <div className="flex justify-between text-xs font-bold mb-1">
                    <span className="flex items-center gap-1.5 text-slate-200">
                      <span>🥗</span>
                      <span>Nutrition</span>
                    </span>
                    <span className="text-amber-400">{nutrStatus.completedCount} / 10 Units ({nutrStatus.completionPercent}%)</span>
                  </div>
                  <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden p-0.5 border border-white/10">
                    <div
                      className="h-full bg-amber-400 rounded-full transition-all duration-500"
                      style={{ width: `${Math.max(5, nutrStatus.completionPercent)}%` }}
                    />
                  </div>
                </div>
              </div>

              {/* Grand Final Lock Card */}
              <div className="mt-5 p-3.5 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 ${physStatus.isFinalUnlocked || biocStatus.isFinalUnlocked || nutrStatus.isFinalUnlocked ? 'bg-emerald-500/20 text-emerald-400' : 'bg-amber-500/20 text-amber-400'}`}>
                    {physStatus.isFinalUnlocked || biocStatus.isFinalUnlocked || nutrStatus.isFinalUnlocked ? <Unlock className="w-4 h-4" /> : <Lock className="w-4 h-4" />}
                  </div>
                  <div>
                    <div className="text-xs font-extrabold text-white">Grand Final Mock Exams</div>
                    <div className="text-[10px] text-slate-300">
                      Requires 100% completion in any subject track
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => navigate("/syllabus")}
                  className="px-3 py-1.5 rounded-xl text-xs font-bold transition-all bg-white/10 hover:bg-white/15 text-slate-200 cursor-pointer shrink-0"
                >
                  View Tracks
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Dashboard */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-6 relative z-20 space-y-12">
        {/* Core Subject Tracks Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pt-4">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-extrabold text-teal-700 bg-teal-100/80 px-3 py-1 rounded-full mb-2">
              <Layers className="w-3.5 h-3.5" />
              <span>Core Medical Curriculum</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Four Academic Curriculum Tracks
            </h2>
            <p className="text-slate-600 text-xs sm:text-sm mt-1">
              Select any core subject track below to access textbook chapters, visual diagrams, and chapter assessments.
            </p>
          </div>

          <Link
            to="/syllabus"
            className="inline-flex items-center gap-2 text-xs font-bold text-teal-700 hover:text-teal-800 bg-teal-50 hover:bg-teal-100 px-4 py-2 rounded-xl transition-colors shrink-0"
          >
            <span>View All Syllabi Hub</span>
            <ChevronRight className="w-4 h-4" />
          </Link>
        </div>

        {/* 4 CORE SUBJECT TRACK CARDS */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* TRACK 1: APPLIED ANATOMY */}
          <div
            onClick={() => navigate("/anatomy-syllabus")}
            className="bg-white rounded-3xl border-2 border-slate-200/90 hover:border-teal-500 shadow-sm hover:shadow-xl transition-all p-6 sm:p-7 flex flex-col justify-between group cursor-pointer"
          >
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="w-13 h-13 rounded-2xl bg-gradient-to-tr from-teal-500 to-emerald-600 text-white flex items-center justify-center text-2xl shadow-lg shadow-teal-500/20 group-hover:scale-105 transition-transform">
                  🦴
                </div>
                <span className="px-3 py-1 rounded-full bg-teal-50 text-teal-800 font-extrabold text-xs border border-teal-200/70">
                  12 Units • 199+ HD Plates
                </span>
              </div>

              <h3 className="text-xl font-extrabold text-slate-900 group-hover:text-teal-700 transition-colors">
                Applied Human Anatomy (ANAT 105)
              </h3>
              <p className="text-slate-600 text-xs sm:text-sm mt-2 leading-relaxed">
                Osteology, axial/appendicular joints, myology, thoracic viscera, digestive organs, neuroanatomy of CNS/PNS, and sensory organs.
              </p>

              <div className="mt-4 space-y-1.5 text-xs text-slate-700">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-teal-600 shrink-0" />
                  <span>199+ Labeled Anatomical Diagrams with clinical correlations</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-teal-600 shrink-0" />
                  <span>440+ MCQs & Chapter Assessments with 75% pass mark</span>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between">
              <span className="text-xs font-bold text-slate-500">
                Semester I Foundation
              </span>
              <div className="inline-flex items-center gap-1.5 text-xs font-extrabold text-teal-700 group-hover:translate-x-1 transition-transform">
                <span>Enter Anatomy</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </div>
            </div>
          </div>

          {/* TRACK 2: APPLIED PHYSIOLOGY */}
          <div
            onClick={() => navigate("/physiology-syllabus")}
            className="bg-white rounded-3xl border-2 border-slate-200/90 hover:border-sky-500 shadow-sm hover:shadow-xl transition-all p-6 sm:p-7 flex flex-col justify-between group cursor-pointer"
          >
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="w-13 h-13 rounded-2xl bg-gradient-to-tr from-sky-500 to-indigo-600 text-white flex items-center justify-center text-2xl shadow-lg shadow-sky-500/20 group-hover:scale-105 transition-transform">
                  ⚡
                </div>
                <span className="px-3 py-1 rounded-full bg-sky-50 text-sky-800 font-extrabold text-xs border border-sky-200/70">
                  12 Units • 74+ Mechanism Diagrams
                </span>
              </div>

              <h3 className="text-xl font-extrabold text-slate-900 group-hover:text-sky-700 transition-colors">
                Applied Human Physiology (PHYS 110)
              </h3>
              <p className="text-slate-600 text-xs sm:text-sm mt-2 leading-relaxed">
                Cellular transport, cardiac cycle hemodynamics, respiratory ventilation, neuromuscular excitation, renal clearance, and feedback loops.
              </p>

              <div className="mt-4 space-y-1.5 text-xs text-slate-700">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-sky-600 shrink-0" />
                  <span>74+ Physiological Mechanism Flowcharts & Feedback Loops</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-sky-600 shrink-0" />
                  <span>1,024 Verified CBME Questions & Grand Final Gating</span>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between">
              <span className="text-xs font-bold text-slate-500">
                Semester I Foundation
              </span>
              <div className="inline-flex items-center gap-1.5 text-xs font-extrabold text-sky-700 group-hover:translate-x-1 transition-transform">
                <span>Enter Physiology</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </div>
            </div>
          </div>

          {/* TRACK 3: APPLIED BIOCHEMISTRY */}
          <div
            onClick={() => navigate("/bio-chem-syllabus")}
            className="bg-white rounded-3xl border-2 border-slate-200/90 hover:border-emerald-500 shadow-sm hover:shadow-xl transition-all p-6 sm:p-7 flex flex-col justify-between group cursor-pointer"
          >
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="w-13 h-13 rounded-2xl bg-gradient-to-tr from-emerald-500 to-teal-600 text-white flex items-center justify-center text-2xl shadow-lg shadow-emerald-500/20 group-hover:scale-105 transition-transform">
                  🧬
                </div>
                <span className="px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 font-extrabold text-xs border border-emerald-200/70">
                  8 Units • Clinical Biomarkers
                </span>
              </div>

              <h3 className="text-xl font-extrabold text-slate-900 group-hover:text-emerald-700 transition-colors">
                Applied Biochemistry (BIOC 135)
              </h3>
              <p className="text-slate-600 text-xs sm:text-sm mt-2 leading-relaxed">
                Carbohydrate/lipid/protein metabolism, clinical enzymology with MI cardiac biomarkers (Troponins, CK-MB), and acid-base blood buffer regulation.
              </p>

              <div className="mt-4 space-y-1.5 text-xs text-slate-700">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Cardiac Biomarkers & Differential Diagnosis of Jaundice</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>ABG Analysis, Henderson-Hasselbalch & Renal Clearance</span>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between">
              <span className="text-xs font-bold text-slate-500">
                Molecular Nursing Science
              </span>
              <div className="inline-flex items-center gap-1.5 text-xs font-extrabold text-emerald-700 group-hover:translate-x-1 transition-transform">
                <span>Enter Biochemistry</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </div>
            </div>
          </div>

          {/* TRACK 4: APPLIED NUTRITION & DIETETICS */}
          <div
            onClick={() => navigate("/nutrition-syllabus")}
            className="bg-white rounded-3xl border-2 border-slate-200/90 hover:border-amber-500 shadow-sm hover:shadow-xl transition-all p-6 sm:p-7 flex flex-col justify-between group cursor-pointer"
          >
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="w-13 h-13 rounded-2xl bg-gradient-to-tr from-amber-500 to-orange-600 text-white flex items-center justify-center text-2xl shadow-lg shadow-amber-500/20 group-hover:scale-105 transition-transform">
                  🥗
                </div>
                <span className="px-3 py-1 rounded-full bg-amber-50 text-amber-800 font-extrabold text-xs border border-amber-200/70">
                  10 Units • Therapeutic Diets
                </span>
              </div>

              <h3 className="text-xl font-extrabold text-slate-900 group-hover:text-amber-700 transition-colors">
                Applied Nutrition & Dietetics (NUTR 140)
              </h3>
              <p className="text-slate-600 text-xs sm:text-sm mt-2 leading-relaxed">
                Evidence-based dietetics, lifecycle meal planning, therapeutic diets for Diabetes, Hypertension, Renal failure, PEM, and cookery preservation rules.
              </p>

              <div className="mt-4 space-y-1.5 text-xs text-slate-700">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-amber-600 shrink-0" />
                  <span>Therapeutic Diets, Enteral/Parenteral & Tube Feeding</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-amber-600 shrink-0" />
                  <span>99 Official University Q&As & Dietary RDA Reference Tables</span>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between">
              <span className="text-xs font-bold text-slate-500">
                Dietetic Clinical Care
              </span>
              <div className="inline-flex items-center gap-1.5 text-xs font-extrabold text-amber-700 group-hover:translate-x-1 transition-transform">
                <span>Enter Nutrition</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </div>
            </div>
          </div>
        </div>

        {/* HIGH-YIELD CLINICAL LEARNING & EXAM MODULES */}
        <div className="bg-gradient-to-br from-slate-900 to-teal-950 text-white rounded-3xl p-8 sm:p-10 shadow-xl">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-500/20 text-teal-300 text-xs font-extrabold border border-teal-500/30 mb-3">
              <Award className="w-3.5 h-3.5" />
              <span>University Examination Excellence</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              Clinical Assessment & NCLEX-RN Preparation
            </h2>
            <p className="text-slate-300 text-xs sm:text-sm mt-2 leading-relaxed">
              Every unit includes solved practice questions, timed examination simulators, and detailed performance rationales to prepare nursing students for university term finals and licensure exams.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-8">
            {/* Feature 1 */}
            <div
              onClick={() => navigate("/question-bank")}
              className="bg-white/5 hover:bg-white/10 border border-white/10 rounded-2xl p-5 transition-all cursor-pointer group"
            >
              <div className="w-10 h-10 rounded-xl bg-teal-500/20 text-teal-300 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                <BookOpen className="w-5 h-5" />
              </div>
              <h4 className="font-extrabold text-sm text-white">University Question Bank</h4>
              <p className="text-slate-400 text-xs mt-1">1,500+ curated MCQs & descriptive short/long essay answers.</p>
              <div className="mt-4 text-xs font-bold text-teal-400 flex items-center gap-1">
                <span>Browse Questions</span>
                <ArrowRight className="w-3 h-3" />
              </div>
            </div>

            {/* Feature 2 */}
            <div
              onClick={() => navigate("/quiz/phys-unit-1")}
              className="bg-white/5 hover:bg-white/10 border border-white/10 rounded-2xl p-5 transition-all cursor-pointer group"
            >
              <div className="w-10 h-10 rounded-xl bg-sky-500/20 text-sky-300 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                <Timer className="w-5 h-5" />
              </div>
              <h4 className="font-extrabold text-sm text-white">Timed Chapter Quizzes</h4>
              <p className="text-slate-400 text-xs mt-1">Live stopwatch timers and instant rationales for every option.</p>
              <div className="mt-4 text-xs font-bold text-sky-400 flex items-center gap-1">
                <span>Start Unit Quiz</span>
                <ArrowRight className="w-3 h-3" />
              </div>
            </div>

            {/* Feature 3 */}
            <div
              onClick={() => navigate("/quiz/physiology-grand-final")}
              className="bg-white/5 hover:bg-white/10 border border-white/10 rounded-2xl p-5 transition-all cursor-pointer group"
            >
              <div className="w-10 h-10 rounded-xl bg-purple-500/20 text-purple-300 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                <Award className="w-5 h-5" />
              </div>
              <h4 className="font-extrabold text-sm text-white">Grand Final Mock Exam</h4>
              <p className="text-slate-400 text-xs mt-1">48 mixed questions locked until all 12 units are passed at ≥75%.</p>
              <div className="mt-4 text-xs font-bold text-purple-400 flex items-center gap-1">
                <span>Exam Portal</span>
                <ArrowRight className="w-3 h-3" />
              </div>
            </div>

            {/* Feature 4 */}
            <div
              onClick={() => navigate("/student/results")}
              className="bg-white/5 hover:bg-white/10 border border-white/10 rounded-2xl p-5 transition-all cursor-pointer group"
            >
              <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-300 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                <BarChart3 className="w-5 h-5" />
              </div>
              <h4 className="font-extrabold text-sm text-white">Student Audit & History</h4>
              <p className="text-slate-400 text-xs mt-1">Review your accuracy %, time spent, and historical attempts.</p>
              <div className="mt-4 text-xs font-bold text-amber-400 flex items-center gap-1">
                <span>View Analytics</span>
                <ArrowRight className="w-3 h-3" />
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Home;
