import React, { useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import {
  Sparkles,
  BookOpen,
  ArrowRight,
  Stethoscope,
  Utensils,
  Award,
  ChevronRight,
  ShieldAlert,
  Dna,
  Scale,
  Apple,
  FileText,
  Activity,
  CheckCircle2,
  BrainCircuit,
  ClipboardList
} from "lucide-react";

const SyllabusHub = () => {
  const [activeSubject, setActiveSubject] = useState("all"); // 'all' | 'biochem' | 'nutrition'

  const biochemUnits = [
    { number: 1, title: "Carbohydrates & Metabolism", lessons: 8, icon: "🧬", color: "from-emerald-500 to-teal-600", desc: "Monosaccharides, Glycolysis, Digestion, Absorption, Diabetes Mellitus Type 1 & 2." },
    { number: 2, title: "Lipids & Fatty Acids", lessons: 4, icon: "🥑", color: "from-sky-500 to-blue-600", desc: "Fatty Acid Classification, Saturated vs Unsaturated, MUFA, PUFA, Essential Fatty Acids." },
    { number: 3, title: "Proteins & Amino Acids", lessons: 4, icon: "🥩", color: "from-amber-500 to-orange-600", desc: "Structure, Zwitterions, Essential Amino Acids, Urea Cycle, Hyperammonemia." },
    { number: 4, title: "Clinical Enzymology & MI", lessons: 3, icon: "⚡", color: "from-purple-500 to-indigo-600", desc: "Enzyme Kinetics, Inhibitors, Isoenzymes, Cardiac Biomarkers (Troponins, CK-MB, LDH)." },
    { number: 5, title: "Acid-Base Balance & Blood Buffers", lessons: 3, icon: "⚖️", color: "from-rose-500 to-pink-600", desc: "Bicarbonate Buffer, Henderson-Hasselbalch, Respiratory/Renal mechanisms, Anion Gap." },
    { number: 6, title: "Heme Catabolism & Jaundice", lessons: 3, icon: "🩸", color: "from-red-500 to-rose-600", desc: "Heme degradation, Bilirubin metabolism, Differential diagnosis of Pre/Hepatic/Post Jaundice." },
    { number: 7, title: "Organ Function Tests", lessons: 3, icon: "🔬", color: "from-cyan-500 to-teal-600", desc: "Renal Clearance (CrCl, GFR), Liver Function Tests (LFTs), Thyroid Profiles (T3/T4/TSH)." },
    { number: 8, title: "Immunochemistry & Immunoassays", lessons: 3, icon: "🛡️", color: "from-violet-500 to-purple-600", desc: "Immunoglobulins (IgG/IgM/IgA/IgE/IgD), Antigen-Antibody reactions, ELISA principles." }
  ];

  const nutritionUnits = [
    { number: 1, title: "Introduction to Nutrition & Health", icon: "🥗", desc: "WHO Health definition, Dietetics in nursing, 5 Food Groups, Nutrients classification." },
    { number: 2, title: "Carbohydrate & Dietary Fibres", icon: "🌾", desc: "Energy metabolism, BMR & BMI formulas, Soluble vs Insoluble fibers in disease prevention." },
    { number: 3, title: "Fats & Essential Fatty Acids", icon: "🥑", desc: "EFA classification (Omega-3/6), Dietary fat sources, Clinical benefits in heart health." },
    { number: 4, title: "Minerals & Vitamins (Ca, I, ADEK, B-Complex)", icon: "🥛", desc: "Calcium homeostasis, Iodine & Goitre, RDA tables across human lifecycle." },
    { number: 5, title: "Balanced Diet & Lifecycle Meal Planning", icon: "🍱", desc: "Principles of meal planning, Food exchange lists, Diets from infant to elderly." },
    { number: 6, title: "Nutritional Deficiency Disorders & PEM", icon: "⚠️", desc: "Kwashiorkor vs Marasmus, Childhood Obesity, Scurvy, Rickets, Pellagra, Anemia." },
    { number: 7, title: "Therapeutic Diets & Clinical Nutrition", icon: "🩺", desc: "Modified diets in Diabetes, Hypertension, Renal failure, Jaundice, Tube feeding protocols." },
    { number: 8, title: "Cookery Rules & Nutrient Preservation", icon: "🍳", desc: "11 Cooking methods, Heat transfer, Food storage, Prevention of food adulteration." },
    { number: 9, title: "Nutritional Assessment & Surveys", icon: "📏", desc: "ABCD Nutritional Assessment, WHO growth charts, Food frequency questionnaires." },
    { number: 10, title: "National Nutrition Programs & Food Safety", icon: "🏛️", desc: "Fluorosis, Kesari Dal (Neurolathyrism), Mid-Day Meal, FSSAI regulations & hygiene." }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 via-white to-emerald-50/40 text-slate-900 pb-20">
      <Navbar />

      {/* Hero Header */}
      <div className="bg-gradient-to-r from-slate-900 via-emerald-950 to-teal-950 text-white py-12 px-4 sm:px-6 lg:px-8 shadow-xl">
        <div className="max-w-7xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-extrabold border border-emerald-500/30 mb-3">
            <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
            <span>Official University & INC Nursing Curriculum</span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
            Academic Curriculum & Syllabus Portal
          </h1>
          <p className="text-slate-300 text-sm sm:text-base mt-2 max-w-3xl leading-relaxed">
            Choose your core subject track below to explore structured lesson modules, clinical practice guidelines, diagnostic parameters, and end-of-unit mastery assessments.
          </p>

          {/* Quick Track Switcher Tabs */}
          <div className="mt-8 flex items-center gap-2.5 flex-wrap">
            <button
              onClick={() => setActiveSubject("all")}
              className={`px-4 py-2 rounded-full text-xs font-extrabold transition-all cursor-pointer ${
                activeSubject === "all"
                  ? "bg-emerald-500 text-white shadow-md shadow-emerald-500/30"
                  : "bg-white/10 text-slate-200 hover:bg-white/20"
              }`}
            >
              All Curriculum Tracks (2)
            </button>

            <button
              onClick={() => setActiveSubject("biochem")}
              className={`px-4 py-2 rounded-full text-xs font-extrabold transition-all cursor-pointer flex items-center gap-1.5 ${
                activeSubject === "biochem"
                  ? "bg-emerald-500 text-white shadow-md shadow-emerald-500/30"
                  : "bg-white/10 text-slate-200 hover:bg-white/20"
              }`}
            >
              <Dna className="w-3.5 h-3.5 text-emerald-300" />
              <span>Biochemistry (8 Units)</span>
            </button>

            <button
              onClick={() => setActiveSubject("nutrition")}
              className={`px-4 py-2 rounded-full text-xs font-extrabold transition-all cursor-pointer flex items-center gap-1.5 ${
                activeSubject === "nutrition"
                  ? "bg-emerald-500 text-white shadow-md shadow-emerald-500/30"
                  : "bg-white/10 text-slate-200 hover:bg-white/20"
              }`}
            >
              <Utensils className="w-3.5 h-3.5 text-amber-300" />
              <span>Nutrition & Dietetics (10 Units)</span>
            </button>

            <Link
              to="/question-bank"
              className="px-4 py-2 rounded-full text-xs font-extrabold bg-white/10 hover:bg-white/20 text-slate-200 transition-all flex items-center gap-1.5 ml-auto"
            >
              <ClipboardList className="w-3.5 h-3.5 text-sky-300" />
              <span>Question Bank & MCQs →</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-10 space-y-12">
        {/* TWO PRIMARY TRACK SELECTION CARDS */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* TRACK 1: APPLIED BIOCHEMISTRY */}
          {(activeSubject === "all" || activeSubject === "biochem") && (
            <div className="bg-white rounded-3xl border-2 border-emerald-500/30 hover:border-emerald-500 shadow-md hover:shadow-xl transition-all overflow-hidden flex flex-col justify-between group">
              <div className="p-6 sm:p-8">
                <div className="flex items-center justify-between gap-4 mb-4">
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-emerald-500 to-teal-600 text-white flex items-center justify-center text-3xl shadow-lg shadow-emerald-500/25 group-hover:scale-105 transition-transform">
                    🧬
                  </div>
                  <span className="px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 font-extrabold text-xs uppercase tracking-wider border border-emerald-200">
                    8 Core Units • 20+ Lessons
                  </span>
                </div>

                <h2 className="text-2xl font-extrabold text-slate-900 group-hover:text-emerald-700 transition-colors">
                  Applied Biochemistry
                </h2>
                <p className="text-slate-600 text-xs sm:text-sm mt-2 leading-relaxed">
                  Comprehensive molecular foundations, carbohydrate/lipid/protein metabolism, clinical enzymology with MI cardiac biomarkers, acid-base balance, and organ function tests.
                </p>

                {/* Highlights */}
                <div className="mt-5 space-y-2 text-xs text-slate-700 font-medium">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Carbohydrates, Glycolysis & Diabetes Mellitus Type 1/2</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Cardiac Troponins, CK-MB, LDH & Isoenzymes</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Henderson-Hasselbalch, ABG Panels & Renal Clearance</span>
                  </div>
                </div>
              </div>

              <div className="p-6 bg-slate-50 border-t border-slate-100 flex items-center justify-between">
                <span className="text-xs font-bold text-slate-500">
                  Includes Step-by-Step Lessons & Quizzes
                </span>
                <Link
                  to="/bio-chem-syllabus"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs shadow-md shadow-emerald-500/25 group-hover:translate-x-0.5 transition-all cursor-pointer"
                >
                  <span>Enter Biochemistry Syllabus</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          )}

          {/* TRACK 2: APPLIED NUTRITION & DIETETICS */}
          {(activeSubject === "all" || activeSubject === "nutrition") && (
            <div className="bg-white rounded-3xl border-2 border-amber-500/30 hover:border-amber-500 shadow-md hover:shadow-xl transition-all overflow-hidden flex flex-col justify-between group">
              <div className="p-6 sm:p-8">
                <div className="flex items-center justify-between gap-4 mb-4">
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-amber-500 to-emerald-600 text-white flex items-center justify-center text-3xl shadow-lg shadow-amber-500/25 group-hover:scale-105 transition-transform">
                    🥗
                  </div>
                  <span className="px-3 py-1 rounded-full bg-amber-100 text-amber-800 font-extrabold text-xs uppercase tracking-wider border border-amber-200">
                    10 Core Units • 99+ Q&As • 280+ MCQs
                  </span>
                </div>

                <h2 className="text-2xl font-extrabold text-slate-900 group-hover:text-amber-700 transition-colors">
                  Applied Nutrition & Dietetics
                </h2>
                <p className="text-slate-600 text-xs sm:text-sm mt-2 leading-relaxed">
                  Evidence-based nutrition science, lifecycle meal planning, therapeutic diets for clinical disorders (DM, HTN, Renal, Jaundice), PEM, cookery rules, and food hygiene standards.
                </p>

                {/* Highlights */}
                <div className="mt-5 space-y-2 text-xs text-slate-700 font-medium">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-amber-600 shrink-0" />
                    <span>Balanced Diets for Infancy, Pregnancy, Lactation & Geriatrics</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-amber-600 shrink-0" />
                    <span>Therapeutic Diets, Enteral/Parenteral & Tube Feeding</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-amber-600 shrink-0" />
                    <span>Kwashiorkor vs Marasmus, Fluorosis & Lathyrism</span>
                  </div>
                </div>
              </div>

              <div className="p-6 bg-slate-50 border-t border-slate-100 flex items-center justify-between">
                <span className="text-xs font-bold text-slate-500">
                  Includes 99 Official University Q&As
                </span>
                <Link
                  to="/nutrition-syllabus"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-2xl bg-amber-600 hover:bg-amber-700 text-white font-extrabold text-xs shadow-md shadow-amber-500/25 group-hover:translate-x-0.5 transition-all cursor-pointer"
                >
                  <span>Enter Nutrition Syllabus</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          )}
        </div>

        {/* DETAILED UNIT BREAKDOWN ACCORDION / PREVIEW */}
        <div className="space-y-8">
          {/* Biochemistry Units Section */}
          {(activeSubject === "all" || activeSubject === "biochem") && (
            <div>
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-xl font-extrabold text-slate-900 flex items-center gap-2">
                    <span>🧬 Applied Biochemistry Curriculum Units (1 to 8)</span>
                  </h3>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Click any unit to open its full syllabus and interactive lessons.
                  </p>
                </div>

                <Link
                  to="/bio-chem-syllabus"
                  className="text-xs font-bold text-emerald-700 hover:text-emerald-800 flex items-center gap-1 underline"
                >
                  <span>Open Full Biochem Syllabus</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </Link>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                {biochemUnits.map((u) => (
                  <Link
                    key={u.number}
                    to="/bio-chem-syllabus"
                    className="p-4 rounded-2xl bg-white border border-slate-200/80 hover:border-emerald-400 hover:shadow-md transition-all group flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="w-8 h-8 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center font-extrabold text-xs">
                          U{u.number}
                        </span>
                        <span className="text-lg">{u.icon}</span>
                      </div>
                      <h4 className="text-xs font-extrabold text-slate-800 group-hover:text-emerald-700 transition-colors">
                        {u.title}
                      </h4>
                      <p className="text-[11px] text-slate-500 mt-1 line-clamp-2">
                        {u.desc}
                      </p>
                    </div>

                    <div className="mt-3 pt-2.5 border-t border-slate-100 flex items-center justify-between text-[10px] font-bold text-slate-400 group-hover:text-emerald-600">
                      <span>{u.lessons} Lessons</span>
                      <ChevronRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* Nutrition Units Section */}
          {(activeSubject === "all" || activeSubject === "nutrition") && (
            <div>
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-xl font-extrabold text-slate-900 flex items-center gap-2">
                    <span>🥗 Applied Nutrition & Dietetics Curriculum Units (1 to 10)</span>
                  </h3>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Click any unit to view dietary guidelines, clinical diet tables, and Q&A points.
                  </p>
                </div>

                <Link
                  to="/nutrition-syllabus"
                  className="text-xs font-bold text-amber-700 hover:text-amber-800 flex items-center gap-1 underline"
                >
                  <span>Open Full Nutrition Syllabus</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </Link>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
                {nutritionUnits.map((u) => (
                  <Link
                    key={u.number}
                    to="/nutrition-syllabus"
                    className="p-4 rounded-2xl bg-white border border-slate-200/80 hover:border-amber-400 hover:shadow-md transition-all group flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="w-8 h-8 rounded-xl bg-amber-50 text-amber-800 flex items-center justify-center font-extrabold text-xs">
                          U{u.number}
                        </span>
                        <span className="text-lg">{u.icon}</span>
                      </div>
                      <h4 className="text-xs font-extrabold text-slate-800 group-hover:text-amber-700 transition-colors line-clamp-2">
                        {u.title}
                      </h4>
                      <p className="text-[11px] text-slate-500 mt-1 line-clamp-2">
                        {u.desc}
                      </p>
                    </div>

                    <div className="mt-3 pt-2.5 border-t border-slate-100 flex items-center justify-between text-[10px] font-bold text-slate-400 group-hover:text-amber-600">
                      <span>Clinical Notes</span>
                      <ChevronRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SyllabusHub;
