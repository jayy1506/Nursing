import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import { ANATOMY_UNITS } from "../constants/anatomyData";
import { PHYSIOLOGY_UNITS } from "../constants/physiologyData";
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
  ClipboardList,
  Eye,
  Layers,
  HelpCircle
} from "lucide-react";

const SyllabusHub = () => {
  const navigate = useNavigate();
  const [activeSubject, setActiveSubject] = useState("all"); // 'all' | 'anatomy' | 'physiology' | 'biochem' | 'nutrition'

  const biochemUnits = [
    { number: 1, title: "Carbohydrates & Metabolism", lessons: 8, icon: "🧬", color: "from-emerald-500 to-teal-600", desc: "Monosaccharides, Glycolysis, Digestion, Absorption, Diabetes Mellitus Type 1 & 2." },
    { number: 2, title: "Lipids & Fatty Acids", lessons: 4, icon: "🥑", color: "from-sky-500 to-blue-600", desc: "Fatty Acid Classification, Saturated vs Unsaturated, MUFA, PUFA, Essential Fatty Acids." },
    { number: 3, title: "Proteins & Amino Acids", lessons: 4, icon: "🥩", color: "from-amber-500 to-orange-600", desc: "Structure, Zwitterions, Essential Amino Acids, Urea Cycle, Hyperammonemia." },
    { number: 4, title: "Clinical Enzymology & MI", lessons: 3, icon: "⚡", color: "from-purple-500 to-indigo-600", desc: "Enzyme Kinetics, Inhibitors, Isoenzymes, Cardiac Biomarkers (Troponins, CK-MB, LDH)." },
    { number: 5, title: "Acid-Base Balance & Blood Buffers", lessons: 3, icon: "⚖️", color: "from-rose-500 to-pink-600", desc: "Bicarbonate Buffer, Henderson-Hasselbalch, Respiratory/Renal mechanisms, Anion Gap." },
    { number: 6, title: "Heme Catabolism & Renal Function", lessons: 3, icon: "🩸", color: "from-teal-500 to-emerald-600", desc: "Heme degradation, Bilirubin metabolism, Pre/Hepatic/Post Jaundice, Creatinine Clearance & GFR." },
    { number: 7, title: "Immunochemistry & ELISA", lessons: 3, icon: "🛡️", color: "from-cyan-500 to-blue-600", desc: "5 Immunoglobulin classes (IgG/A/M/E/D), Antigen-Antibody reactions, Direct/Indirect/Sandwich ELISA." }
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
      <div className="bg-gradient-to-r from-slate-900 via-teal-950 to-slate-900 text-white py-12 px-4 sm:px-6 lg:px-8 shadow-xl">
        <div className="max-w-7xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-500/20 text-teal-300 text-xs font-extrabold border border-teal-500/30 mb-3">
            <Sparkles className="w-3.5 h-3.5 text-teal-400" />
            <span>Official University & INC Nursing Curriculum • Semester I & II</span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
            Academic Curriculum & Syllabus Portal
          </h1>
          <p className="text-slate-300 text-sm sm:text-base mt-2 max-w-3xl leading-relaxed">
            Choose your core medical science track below to explore structured textbook chapters with anatomical plates, physiological mechanism flowcharts, clinical practice guidelines, and university exam question banks.
          </p>

          {/* Quick Track Switcher Tabs */}
          <div className="mt-8 flex items-center gap-2.5 flex-wrap">
            <button
              onClick={() => setActiveSubject("all")}
              className={`px-4 py-2 rounded-full text-xs font-extrabold transition-all cursor-pointer ${
                activeSubject === "all"
                  ? "bg-teal-500 text-white shadow-md shadow-teal-500/30"
                  : "bg-white/10 text-slate-200 hover:bg-white/20"
              }`}
            >
              All Curriculum Tracks (4)
            </button>

            <button
              onClick={() => setActiveSubject("anatomy")}
              className={`px-4 py-2 rounded-full text-xs font-extrabold transition-all cursor-pointer flex items-center gap-1.5 ${
                activeSubject === "anatomy"
                  ? "bg-teal-500 text-white shadow-md shadow-teal-500/30"
                  : "bg-white/10 text-slate-200 hover:bg-white/20"
              }`}
            >
              <span className="text-sm">🦴</span>
              <span>Applied Anatomy (12 Units)</span>
            </button>

            <button
              onClick={() => setActiveSubject("physiology")}
              className={`px-4 py-2 rounded-full text-xs font-extrabold transition-all cursor-pointer flex items-center gap-1.5 ${
                activeSubject === "physiology"
                  ? "bg-sky-500 text-white shadow-md shadow-sky-500/30"
                  : "bg-white/10 text-slate-200 hover:bg-white/20"
              }`}
            >
              <Activity className="w-3.5 h-3.5 text-sky-300" />
              <span>Applied Physiology (12 Units)</span>
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
              <span>Biochemistry (7 Units)</span>
            </button>

            <button
              onClick={() => setActiveSubject("nutrition")}
              className={`px-4 py-2 rounded-full text-xs font-extrabold transition-all cursor-pointer flex items-center gap-1.5 ${
                activeSubject === "nutrition"
                  ? "bg-amber-500 text-white shadow-md shadow-amber-500/30"
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
        {/* FOUR PRIMARY TRACK SELECTION CARDS */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* TRACK 1: APPLIED ANATOMY */}
          {(activeSubject === "all" || activeSubject === "anatomy") && (
            <div
              onClick={() => navigate("/anatomy-syllabus")}
              className="bg-white rounded-3xl border-2 border-teal-500/30 hover:border-teal-500 shadow-md hover:shadow-xl transition-all overflow-hidden flex flex-col justify-between group cursor-pointer"
            >
              <div className="p-6 sm:p-8">
                <div className="flex items-center justify-between gap-4 mb-4">
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-teal-500 to-emerald-600 text-white flex items-center justify-center text-3xl shadow-lg shadow-teal-500/25 group-hover:scale-110 transition-transform">
                    🦴
                  </div>
                  <span className="px-3 py-1 rounded-full bg-teal-100 text-teal-800 font-extrabold text-xs uppercase tracking-wider border border-teal-200">
                    12 Core Chapters • 199+ Plates • 440+ MCQs
                  </span>
                </div>

                <h2 className="text-2xl font-extrabold text-slate-900 group-hover:text-teal-700 transition-colors">
                  Applied Human Anatomy (ANAT 105)
                </h2>
                <p className="text-slate-600 text-xs sm:text-sm mt-2 leading-relaxed">
                  Comprehensive anatomical architecture, osteology, joints, myology, visceral systems, neuroanatomy of CNS/PNS, sensory organs, and lymphatic drainage with high-definition plates and university question bank.
                </p>

                <div className="mt-5 space-y-2 text-xs text-slate-700 font-medium">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-teal-600 shrink-0" />
                    <span>Skeletal & Muscular System (Axial/Appendicular Bones, Joints & Muscle Attachments)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-teal-600 shrink-0" />
                    <span>Cardiovascular, Respiratory, Digestive & Renal Visceral Anatomy</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-teal-600 shrink-0" />
                    <span>Neuroanatomy (Cerebrum, Brainstem, Cranial Nerves) & Sensory Organs</span>
                  </div>
                </div>
              </div>

              <div className="p-6 bg-slate-50 border-t border-slate-100 flex items-center justify-between">
                <span className="text-xs font-bold text-slate-500">
                  Includes 199+ Labeled Anatomical Diagrams
                </span>
                <div
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-2xl bg-teal-600 hover:bg-teal-700 text-white font-extrabold text-xs shadow-md shadow-teal-500/25 group-hover:translate-x-1 transition-all"
                >
                  <span>Enter Anatomy Syllabus</span>
                  <ArrowRight className="w-4 h-4" />
                </div>
              </div>
            </div>
          )}

          {/* TRACK 2: APPLIED PHYSIOLOGY */}
          {(activeSubject === "all" || activeSubject === "physiology") && (
            <div
              onClick={() => navigate("/physiology-syllabus")}
              className="bg-white rounded-3xl border-2 border-sky-500/30 hover:border-sky-500 shadow-md hover:shadow-xl transition-all overflow-hidden flex flex-col justify-between group cursor-pointer"
            >
              <div className="p-6 sm:p-8">
                <div className="flex items-center justify-between gap-4 mb-4">
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-sky-500 to-indigo-600 text-white flex items-center justify-center text-3xl shadow-lg shadow-sky-500/25 group-hover:scale-110 transition-transform">
                    ⚡
                  </div>
                  <span className="px-3 py-1 rounded-full bg-sky-100 text-sky-800 font-extrabold text-xs uppercase tracking-wider border border-sky-200">
                    12 Core Chapters • 74+ Diagrams • 1000+ MCQs
                  </span>
                </div>

                <h2 className="text-2xl font-extrabold text-slate-900 group-hover:text-sky-700 transition-colors">
                  Applied Human Physiology (PHYS 110)
                </h2>
                <p className="text-slate-600 text-xs sm:text-sm mt-2 leading-relaxed">
                  Cell transport mechanisms, cardiac cycle and hemodynamics, respiratory ventilation, neuromuscular excitation, renal clearance, endocrine negative feedback loops, and neurophysiology.
                </p>

                <div className="mt-5 space-y-2 text-xs text-slate-700 font-medium">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-sky-600 shrink-0" />
                    <span>Hemostasis, Blood Groups, Cardiac Cycle & Arterial Blood Pressure</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-sky-600 shrink-0" />
                    <span>Pulmonary Gas Exchange, Surfactant, Renal GFR & Countercurrent Mechanism</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-sky-600 shrink-0" />
                    <span>Sliding Filament Theory, Action Potentials & Hormonal Regulation</span>
                  </div>
                </div>
              </div>

              <div className="p-6 bg-slate-50 border-t border-slate-100 flex items-center justify-between">
                <span className="text-xs font-bold text-slate-500">
                  Includes 1,024 Verified CBME MCQs
                </span>
                <div
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-2xl bg-sky-600 hover:bg-sky-700 text-white font-extrabold text-xs shadow-md shadow-sky-500/25 group-hover:translate-x-1 transition-all"
                >
                  <span>Enter Physiology Syllabus</span>
                  <ArrowRight className="w-4 h-4" />
                </div>
              </div>
            </div>
          )}

          {/* TRACK 3: APPLIED BIOCHEMISTRY */}
          {(activeSubject === "all" || activeSubject === "biochem") && (
            <div
              onClick={() => navigate("/bio-chem-syllabus")}
              className="bg-white rounded-3xl border-2 border-emerald-500/30 hover:border-emerald-500 shadow-md hover:shadow-xl transition-all overflow-hidden flex flex-col justify-between group cursor-pointer"
            >
              <div className="p-6 sm:p-8">
                <div className="flex items-center justify-between gap-4 mb-4">
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-emerald-500 to-teal-600 text-white flex items-center justify-center text-3xl shadow-lg shadow-emerald-500/25 group-hover:scale-110 transition-transform">
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
                  Includes Interactive Diagnostic Simulators
                </span>
                <div
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs shadow-md shadow-emerald-500/25 group-hover:translate-x-1 transition-all"
                >
                  <span>Enter Biochemistry Syllabus</span>
                  <ArrowRight className="w-4 h-4" />
                </div>
              </div>
            </div>
          )}

          {/* TRACK 4: APPLIED NUTRITION & DIETETICS */}
          {(activeSubject === "all" || activeSubject === "nutrition") && (
            <div
              onClick={() => navigate("/nutrition-syllabus")}
              className="bg-white rounded-3xl border-2 border-amber-500/30 hover:border-amber-500 shadow-md hover:shadow-xl transition-all overflow-hidden flex flex-col justify-between group cursor-pointer"
            >
              <div className="p-6 sm:p-8">
                <div className="flex items-center justify-between gap-4 mb-4">
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-amber-500 to-emerald-600 text-white flex items-center justify-center text-3xl shadow-lg shadow-amber-500/25 group-hover:scale-110 transition-transform">
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
                <div
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-2xl bg-amber-600 hover:bg-amber-700 text-white font-extrabold text-xs shadow-md shadow-amber-500/25 group-hover:translate-x-1 transition-all"
                >
                  <span>Enter Nutrition Syllabus</span>
                  <ArrowRight className="w-4 h-4" />
                </div>
              </div>
            </div>
          )}
        </div>

        {/* DETAILED UNIT BREAKDOWN SECTIONS */}
        <div className="space-y-12">
          {/* Anatomy Units Section */}
          {(activeSubject === "all" || activeSubject === "anatomy") && (
            <div>
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-xl font-extrabold text-slate-900 flex items-center gap-2">
                    <span>🦴 Applied Anatomy Curriculum Units (1 to 12)</span>
                  </h3>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Click any chapter to open full textbook readings with labeled diagrams and MCQs.
                  </p>
                </div>

                <Link
                  to="/anatomy-syllabus"
                  className="text-xs font-bold text-teal-700 hover:text-teal-800 flex items-center gap-1 underline"
                >
                  <span>Open Full Anatomy Syllabus</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </Link>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                {ANATOMY_UNITS.map((u) => (
                  <Link
                    key={u.id}
                    to={`/anatomy/lesson/${u.id}`}
                    className="p-4 rounded-2xl bg-white border border-slate-200/80 hover:border-teal-400 hover:shadow-md transition-all group flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="w-8 h-8 rounded-xl bg-teal-50 text-teal-700 flex items-center justify-center font-extrabold text-xs">
                          U{u.unitNumber}
                        </span>
                        <span className="text-lg">{u.icon}</span>
                      </div>
                      <h4 className="text-xs font-extrabold text-slate-800 group-hover:text-teal-700 transition-colors line-clamp-1">
                        {u.title}
                      </h4>
                      <p className="text-[11px] text-slate-500 mt-1 line-clamp-2">
                        {u.summary}
                      </p>
                    </div>

                    <div className="mt-3 pt-2.5 border-t border-slate-100 flex items-center justify-between text-[10px] font-bold text-slate-400 group-hover:text-teal-600">
                      <span>{u.totalImages} Plates • {u.totalMcqs} MCQs</span>
                      <ChevronRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* Physiology Units Section */}
          {(activeSubject === "all" || activeSubject === "physiology") && (
            <div>
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-xl font-extrabold text-slate-900 flex items-center gap-2">
                    <span>⚡ Applied Physiology Curriculum Units (1 to 12)</span>
                  </h3>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Click any chapter to study physiological mechanisms, regulation, and feedback loops.
                  </p>
                </div>

                <Link
                  to="/physiology-syllabus"
                  className="text-xs font-bold text-sky-700 hover:text-sky-800 flex items-center gap-1 underline"
                >
                  <span>Open Full Physiology Syllabus</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </Link>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                {PHYSIOLOGY_UNITS.map((u) => (
                  <Link
                    key={u.id}
                    to={`/physiology/lesson/${u.id}`}
                    className="p-4 rounded-2xl bg-white border border-slate-200/80 hover:border-sky-400 hover:shadow-md transition-all group flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="w-8 h-8 rounded-xl bg-sky-50 text-sky-700 flex items-center justify-center font-extrabold text-xs">
                          U{u.unitNumber}
                        </span>
                        <span className="text-lg">{u.icon}</span>
                      </div>
                      <h4 className="text-xs font-extrabold text-slate-800 group-hover:text-sky-700 transition-colors line-clamp-1">
                        {u.title}
                      </h4>
                      <p className="text-[11px] text-slate-500 mt-1 line-clamp-2">
                        {u.summary}
                      </p>
                    </div>

                    <div className="mt-3 pt-2.5 border-t border-slate-100 flex items-center justify-between text-[10px] font-bold text-slate-400 group-hover:text-sky-600">
                      <span>{u.totalImages} Diagrams • {u.totalMcqs} MCQs</span>
                      <ChevronRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}

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
