import React from "react";

/**
 * UNIT 1: Five Food Groups System & Nutrients Balance
 */
export const FoodGroupsDiagram = () => (
  <div className="w-full bg-slate-900 rounded-xl p-4 text-white shadow-xs overflow-hidden">
    <div className="flex items-center justify-between border-b border-slate-800 pb-2 mb-3">
      <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-wider flex items-center gap-1.5">
        <span className="w-2 h-2 rounded-full bg-emerald-400" />
        Clinical Nutrition Schematic • Five Food Groups System
      </span>
      <span className="text-[10px] text-slate-400 font-mono">ICMR-NIN Dietary Guidelines for Nursing</span>
    </div>

    <svg viewBox="0 0 650 160" className="w-full h-auto max-h-48">
      {/* 5 Proportional Segment Blocks */}
      {/* Group 1: Cereals & Grains */}
      <g transform="translate(15, 30)">
        <rect x="0" y="0" width="115" height="100" rx="10" fill="#78350f" stroke="#f59e0b" strokeWidth="2" />
        <text x="57" y="30" fill="#fde68a" fontSize="18" textAnchor="middle">🌾</text>
        <text x="57" y="55" fill="#ffffff" fontSize="9" fontWeight="bold" textAnchor="middle">1. Cereals & Millets</text>
        <text x="57" y="70" fill="#fde68a" fontSize="8" textAnchor="middle">Energy • B-Complex</text>
        <text x="57" y="85" fill="#cbd5e1" fontSize="7" textAnchor="middle">Rice, Wheat, Ragi</text>
      </g>

      {/* Group 2: Pulses & Legumes */}
      <g transform="translate(140, 30)">
        <rect x="0" y="0" width="115" height="100" rx="10" fill="#065f46" stroke="#10b981" strokeWidth="2" />
        <text x="57" y="30" fill="#a7f3d0" fontSize="18" textAnchor="middle">🫘</text>
        <text x="57" y="55" fill="#ffffff" fontSize="9" fontWeight="bold" textAnchor="middle">2. Pulses & Legumes</text>
        <text x="57" y="70" fill="#6ee7b7" fontSize="8" textAnchor="middle">Plant Proteins • Iron</text>
        <text x="57" y="85" fill="#cbd5e1" fontSize="7" textAnchor="middle">Lentils, Soya, Beans</text>
      </g>

      {/* Group 3: Milk & Animal Foods */}
      <g transform="translate(265, 30)">
        <rect x="0" y="0" width="115" height="100" rx="10" fill="#1e1b4b" stroke="#6366f1" strokeWidth="2" />
        <text x="57" y="30" fill="#c7d2fe" fontSize="18" textAnchor="middle">🥛</text>
        <text x="57" y="55" fill="#ffffff" fontSize="9" fontWeight="bold" textAnchor="middle">3. Milk & Meat</text>
        <text x="57" y="70" fill="#a5b4fc" fontSize="8" textAnchor="middle">Calcium • Vit B12</text>
        <text x="57" y="85" fill="#cbd5e1" fontSize="7" textAnchor="middle">Curd, Paneer, Eggs</text>
      </g>

      {/* Group 4: Fruits & Vegetables */}
      <g transform="translate(390, 30)">
        <rect x="0" y="0" width="115" height="100" rx="10" fill="#064e3b" stroke="#34d399" strokeWidth="2" />
        <text x="57" y="30" fill="#86efac" fontSize="18" textAnchor="middle">🥦</text>
        <text x="57" y="55" fill="#ffffff" fontSize="9" fontWeight="bold" textAnchor="middle">4. Fruits & Veggies</text>
        <text x="57" y="70" fill="#86efac" fontSize="8" textAnchor="middle">Vitamins • Fibres</text>
        <text x="57" y="85" fill="#cbd5e1" fontSize="7" textAnchor="middle">Green Leafy, Citrus</text>
      </g>

      {/* Group 5: Fats & Sugars */}
      <g transform="translate(515, 30)">
        <rect x="0" y="0" width="115" height="100" rx="10" fill="#881337" stroke="#f43f5e" strokeWidth="2" />
        <text x="57" y="30" fill="#fecdd3" fontSize="18" textAnchor="middle">🥑</text>
        <text x="57" y="55" fill="#ffffff" fontSize="9" fontWeight="bold" textAnchor="middle">5. Fats & Sugars</text>
        <text x="57" y="70" fill="#fda4af" fontSize="8" textAnchor="middle">Use in Moderation</text>
        <text x="57" y="85" fill="#cbd5e1" fontSize="7" textAnchor="middle">Mustard, Ghee, Sugar</text>
      </g>
    </svg>
  </div>
);

/**
 * UNIT 2: Dietary Fibre & Glycemic Stabilization
 */
export const DietaryFiberDiagram = () => (
  <div className="w-full bg-slate-900 rounded-xl p-4 text-white shadow-xs overflow-hidden">
    <div className="flex items-center justify-between border-b border-slate-800 pb-2 mb-3">
      <span className="text-[10px] font-bold text-amber-400 uppercase tracking-wider flex items-center gap-1.5">
        <span className="w-2 h-2 rounded-full bg-amber-400" />
        Clinical Nutrition Schematic • Soluble vs Insoluble Dietary Fibre Mechanisms
      </span>
      <span className="text-[10px] text-slate-400 font-mono">Target Daily Intake: 30–40 g/day</span>
    </div>

    <svg viewBox="0 0 650 160" className="w-full h-auto max-h-48">
      {/* Left Box: Soluble Fibre (Pectins / Gums / Beta-Glucans) */}
      <g transform="translate(20, 20)">
        <rect x="0" y="0" width="290" height="120" rx="10" fill="#1e293b" stroke="#38bdf8" strokeWidth="2" />
        <text x="145" y="24" fill="#38bdf8" fontSize="11" fontWeight="bold" textAnchor="middle">SOLUBLE FIBRE (Viscous Gel Formation)</text>
        <text x="145" y="44" fill="#ffffff" fontSize="9" textAnchor="middle">Oats, Pectins in Apples, Psyllium Husk, Barley</text>

        <rect x="15" y="55" width="260" height="24" rx="6" fill="#0369a1" />
        <text x="145" y="70" fill="#ffffff" fontSize="8" fontWeight="bold" textAnchor="middle">Binds Bile Acids → Lowers LDL Cholesterol</text>

        <rect x="15" y="85" width="260" height="24" rx="6" fill="#0284c7" />
        <text x="145" y="100" fill="#ffffff" fontSize="8" fontWeight="bold" textAnchor="middle">Delays Gastric Emptying → Blunts Postprandial Glucose</text>
      </g>

      {/* Right Box: Insoluble Fibre (Cellulose / Lignin) */}
      <g transform="translate(340, 20)">
        <rect x="0" y="0" width="290" height="120" rx="10" fill="#1e293b" stroke="#f59e0b" strokeWidth="2" />
        <text x="145" y="24" fill="#f59e0b" fontSize="11" fontWeight="bold" textAnchor="middle">INSOLUBLE FIBRE (Bulk & Motility)</text>
        <text x="145" y="44" fill="#ffffff" fontSize="9" textAnchor="middle">Wheat Bran, Whole Grains, Raw Vegetable Stalks</text>

        <rect x="15" y="55" width="260" height="24" rx="6" fill="#b45309" />
        <text x="145" y="70" fill="#ffffff" fontSize="8" fontWeight="bold" textAnchor="middle">Absorbs Water → Increases Fecal Stool Bulk</text>

        <rect x="15" y="85" width="260" height="24" rx="6" fill="#d97706" />
        <text x="145" y="100" fill="#ffffff" fontSize="8" fontWeight="bold" textAnchor="middle">Accelerates Colonic Transit → Prevents Constipation & CRC</text>
      </g>
    </svg>
  </div>
);

/**
 * UNIT 3: Fatty Acids & Triglycerides Architecture
 */
export const FattyAcidsDietDiagram = () => (
  <div className="w-full bg-slate-900 rounded-xl p-4 text-white shadow-xs overflow-hidden">
    <div className="flex items-center justify-between border-b border-slate-800 pb-2 mb-3">
      <span className="text-[10px] font-bold text-sky-400 uppercase tracking-wider flex items-center gap-1.5">
        <span className="w-2 h-2 rounded-full bg-sky-400" />
        Clinical Nutrition Schematic • Triglyceride & Essential Fatty Acid (EFA) Profiles
      </span>
      <span className="text-[10px] text-slate-400 font-mono">Omega-6 : Omega-3 Optimal Ratio 5:1</span>
    </div>

    <svg viewBox="0 0 650 160" className="w-full h-auto max-h-48">
      {/* Glycerol Backbone */}
      <rect x="30" y="25" width="45" height="110" rx="6" fill="#6366f1" />
      <text x="52" y="80" fill="#ffffff" fontSize="9" fontWeight="bold" textAnchor="middle" transform="rotate(-90 52 80)">Glycerol</text>

      {/* Fatty Acid 1: Saturated */}
      <line x1="75" y1="45" x2="110" y2="45" stroke="#6366f1" strokeWidth="2.5" />
      <rect x="110" y="32" width="500" height="26" rx="6" fill="#1e293b" stroke="#f43f5e" strokeWidth="1.5" />
      <text x="125" y="49" fill="#fca5a5" fontSize="8" fontWeight="bold">Saturated (SFA - Palmitic 16:0)</text>
      <text x="450" y="49" fill="#94a3b8" fontSize="7">No double bonds • Increases Atherogenic LDL</text>

      {/* Fatty Acid 2: MUFA (Oleic) */}
      <line x1="75" y1="80" x2="110" y2="80" stroke="#6366f1" strokeWidth="2.5" />
      <rect x="110" y="67" width="500" height="26" rx="6" fill="#1e293b" stroke="#38bdf8" strokeWidth="1.5" />
      <text x="125" y="84" fill="#7dd3fc" fontSize="8" fontWeight="bold">MUFA (Oleic Acid 18:1 cis-9)</text>
      <text x="450" y="84" fill="#94a3b8" fontSize="7">Single cis kink • Olive/Mustard oil • Cardioprotective</text>

      {/* Fatty Acid 3: PUFA (Omega-3 DHA/EPA) */}
      <line x1="75" y1="115" x2="110" y2="115" stroke="#6366f1" strokeWidth="2.5" />
      <rect x="110" y="102" width="500" height="26" rx="6" fill="#1e293b" stroke="#10b981" strokeWidth="1.5" />
      <text x="125" y="119" fill="#6ee7b7" fontSize="8" fontWeight="bold">PUFA (Omega-3 EPA / DHA)</text>
      <text x="450" y="119" fill="#94a3b8" fontSize="7">Multiple double bonds • Anti-inflammatory • Fish/Walnut</text>
    </svg>
  </div>
);

/**
 * UNIT 4: Calcium & Iodine Homeostasis Loop
 */
export const VitaminsMineralsDiagram = () => (
  <div className="w-full bg-slate-900 rounded-xl p-4 text-white shadow-xs overflow-hidden">
    <div className="flex items-center justify-between border-b border-slate-800 pb-2 mb-3">
      <span className="text-[10px] font-bold text-purple-400 uppercase tracking-wider flex items-center gap-1.5">
        <span className="w-2 h-2 rounded-full bg-purple-400" />
        Clinical Nutrition Schematic • Calcium Homeostasis & Endocrine Feedback Loop
      </span>
      <span className="text-[10px] text-slate-400 font-mono">Serum Calcium Target: 8.5 – 10.5 mg/dL</span>
    </div>

    <svg viewBox="0 0 650 160" className="w-full h-auto max-h-48">
      {/* Low Blood Calcium Trigger */}
      <g transform="translate(60, 80)">
        <circle cx="0" cy="0" r="35" fill="#881337" stroke="#f43f5e" strokeWidth="2" />
        <text x="0" y="-8" fill="#ffffff" fontSize="8" fontWeight="bold" textAnchor="middle">Low Blood Ca²⁺</text>
        <text x="0" y="5" fill="#fca5a5" fontSize="8" textAnchor="middle">&lt; 8.5 mg/dL</text>
        <text x="0" y="17" fill="#ffe4e6" fontSize="7" textAnchor="middle">(Hypocalcemia)</text>
      </g>

      <path d="M 98 80 L 140 80" stroke="#f43f5e" strokeWidth="2.5" />

      {/* Parathyroid Gland release PTH */}
      <g transform="translate(200, 80)">
        <rect x="-45" y="-28" width="90" height="56" rx="8" fill="#1e293b" stroke="#c084fc" strokeWidth="2" />
        <text x="0" y="-8" fill="#ffffff" fontSize="9" fontWeight="bold" textAnchor="middle">Parathyroid Gland</text>
        <text x="0" y="6" fill="#c084fc" fontSize="9" fontWeight="bold" textAnchor="middle">PTH Secretion ↑</text>
        <text x="0" y="18" fill="#94a3b8" fontSize="7" textAnchor="middle">(Parathormone)</text>
      </g>

      {/* 3 Organ Effector Targets */}
      {/* Target 1: Bone Resorption */}
      <path d="M 245 70 L 320 35" stroke="#c084fc" strokeWidth="2" />
      <g transform="translate(390, 35)">
        <rect x="-65" y="-16" width="130" height="32" rx="6" fill="#065f46" stroke="#10b981" strokeWidth="1.5" />
        <text x="0" y="-2" fill="#ffffff" fontSize="8" fontWeight="bold" textAnchor="middle">BONE: Osteoclasts</text>
        <text x="0" y="9" fill="#a7f3d0" fontSize="7" textAnchor="middle">Mobilizes Ca²⁺ into blood</text>
      </g>

      {/* Target 2: Kidney Reabsorption & Vit D Activation */}
      <path d="M 245 80 L 320 80" stroke="#c084fc" strokeWidth="2" />
      <g transform="translate(390, 80)">
        <rect x="-65" y="-16" width="130" height="32" rx="6" fill="#0369a1" stroke="#38bdf8" strokeWidth="1.5" />
        <text x="0" y="-2" fill="#ffffff" fontSize="8" fontWeight="bold" textAnchor="middle">KIDNEY: Tubular Uptake</text>
        <text x="0" y="9" fill="#7dd3fc" fontSize="7" textAnchor="middle">Activates 1,25-(OH)₂D₃</text>
      </g>

      {/* Target 3: Gut Absorption */}
      <path d="M 245 90 L 320 125" stroke="#c084fc" strokeWidth="2" />
      <g transform="translate(390, 125)">
        <rect x="-65" y="-16" width="130" height="32" rx="6" fill="#78350f" stroke="#f59e0b" strokeWidth="1.5" />
        <text x="0" y="-2" fill="#ffffff" fontSize="8" fontWeight="bold" textAnchor="middle">INTESTINE: Calbindin</text>
        <text x="0" y="9" fill="#fde68a" fontSize="7" textAnchor="middle">Dietary Ca²⁺ Absorption ↑</text>
      </g>

      {/* Converge to Normalization */}
      <path d="M 460 80 L 515 80" stroke="#10b981" strokeWidth="3" />
      <g transform="translate(565, 80)">
        <circle cx="0" cy="0" r="32" fill="#065f46" stroke="#10b981" strokeWidth="2.5" />
        <text x="0" y="-5" fill="#ffffff" fontSize="8" fontWeight="bold" textAnchor="middle">Restored</text>
        <text x="0" y="7" fill="#6ee7b7" fontSize="8" fontWeight="bold" textAnchor="middle">Euglycemia</text>
        <text x="0" y="17" fill="#a7f3d0" fontSize="7" textAnchor="middle">9–10.5 mg/dL</text>
      </g>
    </svg>
  </div>
);

/**
 * UNIT 5: Balanced Diet Plate Proportions
 */
export const BalancedDietPlateDiagram = () => (
  <div className="w-full bg-slate-900 rounded-xl p-4 text-white shadow-xs overflow-hidden">
    <div className="flex items-center justify-between border-b border-slate-800 pb-2 mb-3">
      <span className="text-[10px] font-bold text-amber-400 uppercase tracking-wider flex items-center gap-1.5">
        <span className="w-2 h-2 rounded-full bg-amber-400" />
        Clinical Nutrition Schematic • ICMR-NIN "MyPlate for the Day" Proportions
      </span>
      <span className="text-[10px] text-slate-400 font-mono">2,000 kcal Model Plate Ratio</span>
    </div>

    <svg viewBox="0 0 650 160" className="w-full h-auto max-h-48">
      {/* Plate Circle representation */}
      <g transform="translate(140, 80)">
        <circle cx="0" cy="0" r="62" fill="#1e293b" stroke="#cbd5e1" strokeWidth="3" />
        
        {/* Top-Right: Vegetables (35%) */}
        <path d="M 0 0 L 0 -62 A 62 62 0 0 1 62 0 Z" fill="#059669" />
        <text x="25" y="-25" fill="#ffffff" fontSize="8" fontWeight="bold" textAnchor="middle">Veg (35%)</text>

        {/* Top-Left: Cereals & Grains (25%) */}
        <path d="M 0 0 L -62 0 A 62 62 0 0 1 0 -62 Z" fill="#d97706" />
        <text x="-25" y="-25" fill="#ffffff" fontSize="8" fontWeight="bold" textAnchor="middle">Grains (25%)</text>

        {/* Bottom-Left: Pulses & Proteins (20%) */}
        <path d="M 0 0 L 0 62 A 62 62 0 0 1 -62 0 Z" fill="#dc2626" />
        <text x="-25" y="25" fill="#ffffff" fontSize="8" fontWeight="bold" textAnchor="middle">Proteins (20%)</text>

        {/* Bottom-Right: Fruits & Dairy (20%) */}
        <path d="M 0 0 L 62 0 A 62 62 0 0 1 0 62 Z" fill="#0284c7" />
        <text x="25" y="25" fill="#ffffff" fontSize="8" fontWeight="bold" textAnchor="middle">Fruits (20%)</text>

        {/* Dairy Cup on the side */}
        <circle cx="75" cy="-45" r="16" fill="#4f46e5" stroke="#ffffff" strokeWidth="1.5" />
        <text x="75" y="-42" fill="#ffffff" fontSize="7" fontWeight="bold" textAnchor="middle">Milk</text>
      </g>

      {/* Nutritional Breakdown Table on Right */}
      <g transform="translate(260, 20)">
        <rect x="0" y="0" width="370" height="120" rx="8" fill="#1e293b" stroke="#475569" strokeWidth="1" />
        <text x="15" y="22" fill="#facc15" fontSize="10" fontWeight="bold">Standard Daily Dietary Distribution Benchmark</text>

        <text x="15" y="44" fill="#a7f3d0" fontSize="8" fontWeight="bold">🥦 350g Vegetables & 100g Fresh Fruits:</text>
        <text x="240" y="44" fill="#cbd5e1" fontSize="8">Micronutrients & Prebiotic Fibres</text>

        <text x="15" y="66" fill="#fde68a" fontSize="8" fontWeight="bold">🌾 240g Cereals / Nutri-cereals:</text>
        <text x="240" y="66" fill="#cbd5e1" fontSize="8">Complex Carbohydrates & Energy</text>

        <text x="15" y="88" fill="#fca5a5" fontSize="8" fontWeight="bold">🥩 85g Pulses / Eggs / Lean Flesh:</text>
        <text x="240" y="88" fill="#cbd5e1" fontSize="8">0.83 g/kg/day Essential Amino Acids</text>

        <text x="15" y="110" fill="#bae6fd" fontSize="8" fontWeight="bold">🥛 300 mL Milk or Curd & 25g Healthy Fats:</text>
        <text x="240" y="110" fill="#cbd5e1" fontSize="8">Calcium, Vit D, and Essential Fats</text>
      </g>
    </svg>
  </div>
);

/**
 * UNIT 6: Protein Energy Malnutrition (PEM) Differential
 */
export const DeficiencyDisordersDiagram = () => (
  <div className="w-full bg-slate-900 rounded-xl p-4 text-white shadow-xs overflow-hidden">
    <div className="flex items-center justify-between border-b border-slate-800 pb-2 mb-3">
      <span className="text-[10px] font-bold text-rose-400 uppercase tracking-wider flex items-center gap-1.5">
        <span className="w-2 h-2 rounded-full bg-rose-400" />
        Clinical Nutrition Schematic • Kwashiorkor vs Marasmus Differential
      </span>
      <span className="text-[10px] text-slate-400 font-mono">Pediatric PEM WHO Classification</span>
    </div>

    <svg viewBox="0 0 650 160" className="w-full h-auto max-h-48">
      {/* Column 1: Kwashiorkor (Protein Deficiency with Calorie adequacy) */}
      <g transform="translate(30, 20)">
        <rect x="0" y="0" width="280" height="120" rx="10" fill="#1e293b" stroke="#f43f5e" strokeWidth="2" />
        <text x="140" y="24" fill="#f43f5e" fontSize="11" fontWeight="bold" textAnchor="middle">KWASHIORKOR (Protein Deficiency)</text>
        
        <text x="15" y="46" fill="#ffffff" fontSize="8">• Pitting Edema of lower extremities (Hypoalbuminemia)</text>
        <text x="15" y="64" fill="#ffffff" fontSize="8">• Moon Face appearance with retained subcutaneous fat</text>
        <text x="15" y="82" fill="#ffffff" fontSize="8">• Flag Sign Hair (Depigmented alternate bands)</text>
        <text x="15" y="100" fill="#ffffff" fontSize="8">• Hepatomegaly (Fatty liver due to low apolipoproteins)</text>
        <text x="15" y="118" fill="#fca5a5" fontSize="7" fontWeight="bold">Age: 1 to 5 years (After weaning to starch diet)</text>
      </g>

      {/* Column 2: Marasmus (Total Calorie & Protein Starvation) */}
      <g transform="translate(340, 20)">
        <rect x="0" y="0" width="280" height="120" rx="10" fill="#1e293b" stroke="#38bdf8" strokeWidth="2" />
        <text x="140" y="24" fill="#38bdf8" fontSize="11" fontWeight="bold" textAnchor="middle">MARASMUS (Total Energy Starvation)</text>

        <text x="15" y="46" fill="#ffffff" fontSize="8">• Severe Muscle Wasting & Emaciation ("Skin & Bones")</text>
        <text x="15" y="64" fill="#ffffff" fontSize="8">• Old Man / Monkey Face facies with sunken eyes</text>
        <text x="15" y="82" fill="#ffffff" fontSize="8">• NO Edema • Normal liver without fat accumulation</text>
        <text x="15" y="100" fill="#ffffff" fontSize="8">• Voracious appetite if not complicated by sepsis</text>
        <text x="15" y="118" fill="#7dd3fc" fontSize="7" fontWeight="bold">Age: &lt; 1 year (Early cessation of breastfeeding)</text>
      </g>
    </svg>
  </div>
);

/**
 * UNIT 7: Hospital Therapeutic Diet Hierarchy
 */
export const TherapeuticDietsDiagram = () => (
  <div className="w-full bg-slate-900 rounded-xl p-4 text-white shadow-xs overflow-hidden">
    <div className="flex items-center justify-between border-b border-slate-800 pb-2 mb-3">
      <span className="text-[10px] font-bold text-teal-400 uppercase tracking-wider flex items-center gap-1.5">
        <span className="w-2 h-2 rounded-full bg-teal-400" />
        Clinical Nutrition Schematic • Hospital Diet Texture & Consistency Progression
      </span>
      <span className="text-[10px] text-slate-400 font-mono">Post-Operative & Critical Care Progression</span>
    </div>

    <svg viewBox="0 0 650 160" className="w-full h-auto max-h-48">
      {/* 4 Progression Steps */}
      {/* Step 1: Clear Liquid */}
      <g transform="translate(20, 35)">
        <rect x="0" y="0" width="135" height="90" rx="8" fill="#1e293b" stroke="#38bdf8" strokeWidth="2" />
        <text x="67" y="24" fill="#38bdf8" fontSize="9" fontWeight="bold" textAnchor="middle">1. Clear Fluid Diet</text>
        <text x="67" y="44" fill="#ffffff" fontSize="8" textAnchor="middle">Water, Clear Broth,</text>
        <text x="67" y="58" fill="#ffffff" fontSize="8" textAnchor="middle">ORS, Tender Coconut</text>
        <text x="67" y="78" fill="#94a3b8" fontSize="7" textAnchor="middle">Post-op Day 1 • Hydration</text>
      </g>

      <path d="M 160 80 L 175 80" stroke="#38bdf8" strokeWidth="2" />

      {/* Step 2: Full Fluid */}
      <g transform="translate(180, 35)">
        <rect x="0" y="0" width="135" height="90" rx="8" fill="#1e293b" stroke="#10b981" strokeWidth="2" />
        <text x="67" y="24" fill="#10b981" fontSize="9" fontWeight="bold" textAnchor="middle">2. Full Fluid Diet</text>
        <text x="67" y="44" fill="#ffffff" fontSize="8" textAnchor="middle">Milk, Strained Soups,</text>
        <text x="67" y="58" fill="#ffffff" fontSize="8" textAnchor="middle">Custard, Kanji</text>
        <text x="67" y="78" fill="#94a3b8" fontSize="7" textAnchor="middle">Dysphagia / GI Recovery</text>
      </g>

      <path d="M 320 80 L 335 80" stroke="#10b981" strokeWidth="2" />

      {/* Step 3: Soft Diet */}
      <g transform="translate(340, 35)">
        <rect x="0" y="0" width="135" height="90" rx="8" fill="#1e293b" stroke="#f59e0b" strokeWidth="2" />
        <text x="67" y="24" fill="#f59e0b" fontSize="9" fontWeight="bold" textAnchor="middle">3. Soft / Mashed Diet</text>
        <text x="67" y="44" fill="#ffffff" fontSize="8" textAnchor="middle">Khichdi, Steamed Idli,</text>
        <text x="67" y="58" fill="#ffffff" fontSize="8" textAnchor="middle">Mashed Potato/Dal</text>
        <text x="67" y="78" fill="#94a3b8" fontSize="7" textAnchor="middle">Low Fibre • Easy Digestion</text>
      </g>

      <path d="M 480 80 L 495 80" stroke="#f59e0b" strokeWidth="2" />

      {/* Step 4: Modified Regular */}
      <g transform="translate(500, 35)">
        <rect x="0" y="0" width="130" height="90" rx="8" fill="#1e293b" stroke="#a855f7" strokeWidth="2" />
        <text x="65" y="24" fill="#a855f7" fontSize="9" fontWeight="bold" textAnchor="middle">4. Disease Specific</text>
        <text x="65" y="44" fill="#ffffff" fontSize="8" textAnchor="middle">Diabetic (Low GI)</text>
        <text x="65" y="58" fill="#ffffff" fontSize="8" textAnchor="middle">Renal (Low K/Na/P)</text>
        <text x="65" y="78" fill="#94a3b8" fontSize="7" textAnchor="middle">Cardiac (DASH / Low Na)</text>
      </g>
    </svg>
  </div>
);

/**
 * UNIT 8: Culinary Science & Nutrient Retention
 */
export const CulinaryScienceDiagram = () => (
  <div className="w-full bg-slate-900 rounded-xl p-4 text-white shadow-xs overflow-hidden">
    <div className="flex items-center justify-between border-b border-slate-800 pb-2 mb-3">
      <span className="text-[10px] font-bold text-amber-400 uppercase tracking-wider flex items-center gap-1.5">
        <span className="w-2 h-2 rounded-full bg-amber-400" />
        Clinical Nutrition Schematic • Heat Transfer Methods & Vitamin Retention
      </span>
      <span className="text-[10px] text-slate-400 font-mono">Steaming & Pressure Cooking Maximize Vit C & B-Complex</span>
    </div>

    <svg viewBox="0 0 650 160" className="w-full h-auto max-h-48">
      {/* 3 Categories: Moist Heat, Dry Heat, Combination */}
      <g transform="translate(20, 25)">
        <rect x="0" y="0" width="190" height="110" rx="8" fill="#1e293b" stroke="#38bdf8" strokeWidth="1.5" />
        <text x="95" y="22" fill="#38bdf8" fontSize="10" fontWeight="bold" textAnchor="middle">MOIST HEAT METHODS</text>
        <text x="15" y="44" fill="#ffffff" fontSize="8">• Boiling (100°C) • Simmering (85°C)</text>
        <text x="15" y="62" fill="#ffffff" fontSize="8">• Steaming (Preserves 85% Vitamin C)</text>
        <text x="15" y="80" fill="#ffffff" fontSize="8">• Pressure Cooking (Fast, Retains Vit B)</text>
        <text x="15" y="100" fill="#7dd3fc" fontSize="7">Best for legumes and vegetable broths</text>
      </g>

      <g transform="translate(230, 25)">
        <rect x="0" y="0" width="190" height="110" rx="8" fill="#1e293b" stroke="#f59e0b" strokeWidth="1.5" />
        <text x="95" y="22" fill="#f59e0b" fontSize="10" fontWeight="bold" textAnchor="middle">DRY HEAT METHODS</text>
        <text x="15" y="44" fill="#ffffff" fontSize="8">• Roasting & Baking (120–250°C)</text>
        <text x="15" y="62" fill="#ffffff" fontSize="8">• Grilling & Broiling directly under heat</text>
        <text x="15" y="80" fill="#ffffff" fontSize="8">• Toasting & Dry Pan Searing</text>
        <text x="15" y="100" fill="#fde68a" fontSize="7">Maillard reaction enhances flavor</text>
      </g>

      <g transform="translate(440, 25)">
        <rect x="0" y="0" width="190" height="110" rx="8" fill="#1e293b" stroke="#f43f5e" strokeWidth="1.5" />
        <text x="95" y="22" fill="#f43f5e" fontSize="10" fontWeight="bold" textAnchor="middle">FAT MEDIUM COOKING</text>
        <text x="15" y="44" fill="#ffffff" fontSize="8">• Sautéing (Shallow minimal oil)</text>
        <text x="15" y="62" fill="#ffffff" fontSize="8">• Deep Frying (High calorie density)</text>
        <text x="15" y="80" fill="#ffffff" fontSize="8">• Avoid re-heating oil (Trans fats ↑)</text>
        <text x="15" y="100" fill="#fca5a5" fontSize="7">Limit in cardiac and hepatic patients</text>
      </g>
    </svg>
  </div>
);

/**
 * UNIT 9: ABCD Nutritional Assessment Framework
 */
export const ABCDAssessmentDiagram = () => (
  <div className="w-full bg-slate-900 rounded-xl p-4 text-white shadow-xs overflow-hidden">
    <div className="flex items-center justify-between border-b border-slate-800 pb-2 mb-3">
      <span className="text-[10px] font-bold text-sky-400 uppercase tracking-wider flex items-center gap-1.5">
        <span className="w-2 h-2 rounded-full bg-sky-400" />
        Clinical Nutrition Schematic • ABCD Nutritional Assessment Framework
      </span>
      <span className="text-[10px] text-slate-400 font-mono">Standardized Nursing Bedside Protocol</span>
    </div>

    <svg viewBox="0 0 650 160" className="w-full h-auto max-h-48">
      {/* 4 Quadrants: A, B, C, D */}
      <g transform="translate(15, 25)">
        <rect x="0" y="0" width="140" height="110" rx="8" fill="#065f46" stroke="#10b981" strokeWidth="2" />
        <circle cx="25" cy="25" r="14" fill="#10b981" />
        <text x="25" y="30" fill="#022c22" fontSize="12" fontWeight="black" textAnchor="middle">A</text>
        <text x="45" y="28" fill="#ffffff" fontSize="9" fontWeight="bold">Anthropometric</text>
        <text x="12" y="55" fill="#a7f3d0" fontSize="8">• Height, Weight, BMI</text>
        <text x="12" y="72" fill="#a7f3d0" fontSize="8">• MUAC (Mid-Upper Arm)</text>
        <text x="12" y="89" fill="#a7f3d0" fontSize="8">• Waist-to-Hip Ratio</text>
        <text x="12" y="104" fill="#ffffff" fontSize="7">Skinfold Callipers</text>
      </g>

      <g transform="translate(170, 25)">
        <rect x="0" y="0" width="140" height="110" rx="8" fill="#1e1b4b" stroke="#6366f1" strokeWidth="2" />
        <circle cx="25" cy="25" r="14" fill="#6366f1" />
        <text x="25" y="30" fill="#ffffff" fontSize="12" fontWeight="black" textAnchor="middle">B</text>
        <text x="45" y="28" fill="#ffffff" fontSize="9" fontWeight="bold">Biochemical</text>
        <text x="12" y="55" fill="#c7d2fe" fontSize="8">• Serum Albumin (&lt;3.5)</text>
        <text x="12" y="72" fill="#c7d2fe" fontSize="8">• Hemoglobin (Anemia)</text>
        <text x="12" y="89" fill="#c7d2fe" fontSize="8">• Total Lymphocytes</text>
        <text x="12" y="104" fill="#ffffff" fontSize="7">Lipid Panel & LFTs</text>
      </g>

      <g transform="translate(325, 25)">
        <rect x="0" y="0" width="140" height="110" rx="8" fill="#78350f" stroke="#f59e0b" strokeWidth="2" />
        <circle cx="25" cy="25" r="14" fill="#f59e0b" />
        <text x="25" y="30" fill="#022c22" fontSize="12" fontWeight="black" textAnchor="middle">C</text>
        <text x="45" y="28" fill="#ffffff" fontSize="9" fontWeight="bold">Clinical Signs</text>
        <text x="12" y="55" fill="#fde68a" fontSize="8">• Pallor in Conjunctiva</text>
        <text x="12" y="72" fill="#fde68a" fontSize="8">• Glossitis & Stomatitis</text>
        <text x="12" y="89" fill="#fde68a" fontSize="8">• Bitot's Spots (Vit A)</text>
        <text x="12" y="104" fill="#ffffff" fontSize="7">Edema & Koilonychia</text>
      </g>

      <g transform="translate(480, 25)">
        <rect x="0" y="0" width="150" height="110" rx="8" fill="#881337" stroke="#f43f5e" strokeWidth="2" />
        <circle cx="25" cy="25" r="14" fill="#f43f5e" />
        <text x="25" y="30" fill="#ffffff" fontSize="12" fontWeight="black" textAnchor="middle">D</text>
        <text x="45" y="28" fill="#ffffff" fontSize="9" fontWeight="bold">Dietary Recall</text>
        <text x="12" y="55" fill="#fca5a5" fontSize="8">• 24-Hour Diet Recall</text>
        <text x="12" y="72" fill="#fca5a5" fontSize="8">• Food Frequency (FFQ)</text>
        <text x="12" y="89" fill="#fca5a5" fontSize="8">• Diet History Interview</text>
        <text x="12" y="104" fill="#ffffff" fontSize="7">Nutrient Adequacy</text>
      </g>
    </svg>
  </div>
);

/**
 * UNIT 10: Food Safety & Temperature Danger Zone
 */
export const FoodSafetyProgramDiagram = () => (
  <div className="w-full bg-slate-900 rounded-xl p-4 text-white shadow-xs overflow-hidden">
    <div className="flex items-center justify-between border-b border-slate-800 pb-2 mb-3">
      <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-wider flex items-center gap-1.5">
        <span className="w-2 h-2 rounded-full bg-emerald-400" />
        Clinical Nutrition Schematic • Food Temperature Danger Zone (FSSAI / WHO)
      </span>
      <span className="text-[10px] text-slate-400 font-mono">Bacterial Proliferation Prevention</span>
    </div>

    <svg viewBox="0 0 650 160" className="w-full h-auto max-h-48">
      {/* Temperature Bar */}
      <rect x="30" y="30" width="590" height="35" rx="6" fill="#1e293b" />
      
      {/* Cold Storage Zone (< 5°C) */}
      <rect x="30" y="30" width="130" height="35" rx="6" fill="#0284c7" />
      <text x="95" y="52" fill="#ffffff" fontSize="9" fontWeight="bold" textAnchor="middle">COLD &lt; 5°C</text>

      {/* DANGER ZONE (5°C to 60°C) */}
      <rect x="160" y="30" width="290" height="35" fill="#dc2626" />
      <text x="305" y="52" fill="#ffffff" fontSize="10" fontWeight="black" textAnchor="middle">⚠️ DANGER ZONE: 5°C to 60°C (Rapid Bacterial Growth)</text>

      {/* Hot Holding Zone (> 60°C) */}
      <rect x="450" y="30" width="170" height="35" rx="6" fill="#059669" />
      <text x="535" y="52" fill="#ffffff" fontSize="9" fontWeight="bold" textAnchor="middle">HOT &gt; 60°C (Safe Holding)</text>

      {/* Details below */}
      <g transform="translate(30, 80)">
        <rect x="0" y="0" width="130" height="50" rx="6" fill="#0c4a6e" />
        <text x="65" y="20" fill="#7dd3fc" fontSize="8" fontWeight="bold" textAnchor="middle">Refrigeration</text>
        <text x="65" y="35" fill="#e0f2fe" fontSize="7" textAnchor="middle">Slows microbial growth</text>
      </g>

      <g transform="translate(160, 80)">
        <rect x="0" y="0" width="290" height="50" rx="6" fill="#450a0a" border="border" />
        <text x="145" y="20" fill="#fca5a5" fontSize="8" fontWeight="bold" textAnchor="middle">Never leave prepared food in this zone for &gt; 2 Hours!</text>
        <text x="145" y="35" fill="#fecdd3" fontSize="7" textAnchor="middle">Salmonella, E. coli, Staph aureus double every 20 minutes</text>
      </g>

      <g transform="translate(450, 80)">
        <rect x="0" y="0" width="170" height="50" rx="6" fill="#064e3b" />
        <text x="85" y="20" fill="#a7f3d0" fontSize="8" fontWeight="bold" textAnchor="middle">Cooking & Reheating &gt; 74°C</text>
        <text x="85" y="35" fill="#d1fae5" fontSize="7" textAnchor="middle">Thermal destruction of pathogens</text>
      </g>
    </svg>
  </div>
);
