import React from "react";

/**
 * UNIT 1: Carbohydrate Metabolism & Glycolysis Pathway
 */
export const CarbohydrateDiagram = () => (
  <div className="w-full bg-slate-900 rounded-xl p-4 text-white shadow-xs overflow-hidden">
    <div className="flex items-center justify-between border-b border-slate-800 pb-2 mb-3">
      <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-wider flex items-center gap-1.5">
        <span className="w-2 h-2 rounded-full bg-emerald-400" />
        Scientific Schematic • Glycolytic Energetics Pathway
      </span>
      <span className="text-[10px] text-slate-400 font-mono">Net Yield: 2 ATP (Anaerobic) / 8 ATP (Aerobic)</span>
    </div>

    <svg viewBox="0 0 650 170" className="w-full h-auto max-h-48">
      {/* Background Flow Line */}
      <line x1="60" y1="85" x2="590" y2="85" stroke="#334155" strokeWidth="3" strokeDasharray="6 4" />

      {/* Step 1: Glucose */}
      <g transform="translate(60, 85)">
        <circle cx="0" cy="0" r="32" fill="#065f46" stroke="#10b981" strokeWidth="2.5" />
        <text x="0" y="-5" fill="#ffffff" fontSize="10" fontWeight="bold" textAnchor="middle">Glucose</text>
        <text x="0" y="8" fill="#6ee7b7" fontSize="8" textAnchor="middle">(6-Carbon)</text>
      </g>

      {/* Arrow 1 with Hexokinase */}
      <path d="M 95 85 L 145 85" stroke="#10b981" strokeWidth="3" markerEnd="url(#arrow)" />
      <text x="120" y="70" fill="#94a3b8" fontSize="8" textAnchor="middle">Hexokinase</text>
      <text x="120" y="105" fill="#f87171" fontSize="7" textAnchor="middle">-1 ATP</text>

      {/* Step 2: F-1,6-BP */}
      <g transform="translate(180, 85)">
        <rect x="-35" y="-25" width="70" height="50" rx="8" fill="#1e293b" stroke="#38bdf8" strokeWidth="2" />
        <text x="0" y="-5" fill="#ffffff" fontSize="9" fontWeight="bold" textAnchor="middle">Fructose-</text>
        <text x="0" y="8" fill="#38bdf8" fontSize="8" fontWeight="bold" textAnchor="middle">1,6-BisP</text>
        <text x="0" y="18" fill="#94a3b8" fontSize="7" textAnchor="middle">(PFK-1)</text>
      </g>

      {/* Arrow 2 with Aldolase Cleavage */}
      <path d="M 218 85 L 268 85" stroke="#38bdf8" strokeWidth="3" />
      <text x="243" y="70" fill="#94a3b8" fontSize="8" textAnchor="middle">Aldolase</text>
      <text x="243" y="105" fill="#38bdf8" fontSize="7" textAnchor="middle">Cleavage</text>

      {/* Step 3: Triose Phosphates */}
      <g transform="translate(305, 85)">
        <rect x="-32" y="-25" width="64" height="50" rx="8" fill="#1e293b" stroke="#a855f7" strokeWidth="2" />
        <text x="0" y="-3" fill="#ffffff" fontSize="9" fontWeight="bold" textAnchor="middle">2× G3P</text>
        <text x="0" y="10" fill="#d8b4fe" fontSize="8" textAnchor="middle">(3-Carbon)</text>
      </g>

      {/* Arrow 3 with Payoff Stage */}
      <path d="M 340 85 L 400 85" stroke="#a855f7" strokeWidth="3" />
      <text x="370" y="70" fill="#34d399" fontSize="8" fontWeight="bold" textAnchor="middle">+2 NADH</text>
      <text x="370" y="105" fill="#fbbf24" fontSize="8" fontWeight="bold" textAnchor="middle">+4 ATP</text>

      {/* Step 4: Pyruvate */}
      <g transform="translate(440, 85)">
        <circle cx="0" cy="0" r="32" fill="#0369a1" stroke="#38bdf8" strokeWidth="2.5" />
        <text x="0" y="-5" fill="#ffffff" fontSize="10" fontWeight="bold" textAnchor="middle">2× Pyruvate</text>
        <text x="0" y="8" fill="#7dd3fc" fontSize="8" textAnchor="middle">(3-Carbon)</text>
      </g>

      {/* Branching: Anaerobic vs Aerobic */}
      {/* Down to Lactate */}
      <path d="M 475 95 L 530 135" stroke="#f43f5e" strokeWidth="2.5" strokeDasharray="4 2" />
      <g transform="translate(565, 140)">
        <rect x="-30" y="-18" width="60" height="36" rx="6" fill="#881337" stroke="#f43f5e" strokeWidth="1.5" />
        <text x="0" y="-2" fill="#ffffff" fontSize="8" fontWeight="bold" textAnchor="middle">Lactate</text>
        <text x="0" y="9" fill="#fca5a5" fontSize="7" textAnchor="middle">(Anaerobic)</text>
      </g>

      {/* Up to Acetyl-CoA / Mitochondria */}
      <path d="M 475 75 L 530 35" stroke="#f59e0b" strokeWidth="2.5" />
      <g transform="translate(565, 30)">
        <rect x="-30" y="-18" width="60" height="36" rx="6" fill="#78350f" stroke="#f59e0b" strokeWidth="1.5" />
        <text x="0" y="-2" fill="#ffffff" fontSize="8" fontWeight="bold" textAnchor="middle">TCA Cycle</text>
        <text x="0" y="9" fill="#fde68a" fontSize="7" textAnchor="middle">(30-32 ATP)</text>
      </g>
    </svg>
  </div>
);

/**
 * UNIT 2: Lipid Chemistry & Fluid Mosaic Bilayer
 */
export const LipidDiagram = () => (
  <div className="w-full bg-slate-900 rounded-xl p-4 text-white shadow-xs overflow-hidden">
    <div className="flex items-center justify-between border-b border-slate-800 pb-2 mb-3">
      <span className="text-[10px] font-bold text-sky-400 uppercase tracking-wider flex items-center gap-1.5">
        <span className="w-2 h-2 rounded-full bg-sky-400" />
        Scientific Schematic • Phospholipid Bilayer & Fatty Acid Architecture
      </span>
      <span className="text-[10px] text-slate-400 font-mono">Palmitate (16C) → Net 106 ATP</span>
    </div>

    <svg viewBox="0 0 650 160" className="w-full h-auto max-h-48">
      {/* Extracellular water zone */}
      <rect x="20" y="10" width="610" height="20" fill="#0284c7" opacity="0.1" rx="4" />
      <text x="35" y="24" fill="#38bdf8" fontSize="8" fontWeight="bold">Extracellular Fluid (Hydrophilic Polar Zone)</text>

      {/* Top Phospholipid Heads (Hydrophilic) */}
      {[50, 90, 130, 170, 210, 250, 290, 330, 370, 410, 450, 490, 530, 570].map((cx, i) => (
        <g key={`top-${i}`}>
          <circle cx={cx} cy="45" r="9" fill="#38bdf8" stroke="#bae6fd" strokeWidth="1.5" />
          {/* Hydrophobic fatty acid tails */}
          <line x1={cx - 3} y1="54" x2={cx - 3} y2="78" stroke="#facc15" strokeWidth="2" strokeLinecap="round" />
          {/* Saturated vs Unsaturated kink */}
          {i % 2 === 0 ? (
            <line x1={cx + 3} y1="54" x2={cx + 3} y2="78" stroke="#facc15" strokeWidth="2" strokeLinecap="round" />
          ) : (
            <path d={`M ${cx + 3} 54 L ${cx + 3} 66 L ${cx + 9} 78`} fill="none" stroke="#f97316" strokeWidth="2" strokeLinecap="round" />
          )}
        </g>
      ))}

      {/* Cholesterol Molecules embedded in hydrophobic core */}
      <g transform="translate(190, 72)">
        <polygon points="0,0 12,-4 20,4 12,8 0,6" fill="#f59e0b" stroke="#d97706" strokeWidth="1" />
        <text x="10" y="15" fill="#fde68a" fontSize="7" textAnchor="middle">Cholesterol</text>
      </g>
      <g transform="translate(430, 72)">
        <polygon points="0,0 12,-4 20,4 12,8 0,6" fill="#f59e0b" stroke="#d97706" strokeWidth="1" />
        <text x="10" y="15" fill="#fde68a" fontSize="7" textAnchor="middle">Cholesterol</text>
      </g>

      {/* Bottom Phospholipid Heads */}
      {[50, 90, 130, 170, 210, 250, 290, 330, 370, 410, 450, 490, 530, 570].map((cx, i) => (
        <g key={`bot-${i}`}>
          <line x1={cx - 3} y1="108" x2={cx - 3} y2="84" stroke="#facc15" strokeWidth="2" strokeLinecap="round" />
          <line x1={cx + 3} y1="108" x2={cx + 3} y2="84" stroke="#facc15" strokeWidth="2" strokeLinecap="round" />
          <circle cx={cx} cy="117" r="9" fill="#38bdf8" stroke="#bae6fd" strokeWidth="1.5" />
        </g>
      ))}

      {/* Cytoplasm water zone */}
      <rect x="20" y="132" width="610" height="20" fill="#0284c7" opacity="0.1" rx="4" />
      <text x="35" y="146" fill="#38bdf8" fontSize="8" fontWeight="bold">Intracellular Cytoplasm (Hydrophilic Polar Zone)</text>

      {/* Legend Annotation */}
      <text x="590" y="70" fill="#facc15" fontSize="8" textAnchor="end">Saturated (Rigid)</text>
      <text x="590" y="88" fill="#f97316" fontSize="8" textAnchor="end">Cis-Double Bond Kink (MUFA/PUFA Fluidity)</text>
    </svg>
  </div>
);

/**
 * UNIT 3: Proteins & Hepatic Urea Cycle
 */
export const ProteinDiagram = () => (
  <div className="w-full bg-slate-900 rounded-xl p-4 text-white shadow-xs overflow-hidden">
    <div className="flex items-center justify-between border-b border-slate-800 pb-2 mb-3">
      <span className="text-[10px] font-bold text-amber-400 uppercase tracking-wider flex items-center gap-1.5">
        <span className="w-2 h-2 rounded-full bg-amber-400" />
        Scientific Schematic • Hepatic Urea Cycle (Krebs-Henseleit Wheel)
      </span>
      <span className="text-[10px] text-slate-400 font-mono">Normal Blood Urea: 20–40 mg/dL</span>
    </div>

    <svg viewBox="0 0 650 170" className="w-full h-auto max-h-48">
      {/* Mitochondrial / Cytosolic divider */}
      <line x1="220" y1="10" x2="220" y2="160" stroke="#475569" strokeWidth="1.5" strokeDasharray="4 4" />
      <text x="110" y="22" fill="#f59e0b" fontSize="9" fontWeight="bold" textAnchor="middle">Mitochondrial Matrix</text>
      <text x="430" y="22" fill="#38bdf8" fontSize="9" fontWeight="bold" textAnchor="middle">Cytoplasm of Hepatocyte</text>

      {/* NH3 + CO2 + 2 ATP */}
      <g transform="translate(40, 75)">
        <rect x="-30" y="-20" width="60" height="40" rx="6" fill="#78350f" stroke="#f59e0b" strokeWidth="1.5" />
        <text x="0" y="-3" fill="#ffffff" fontSize="8" fontWeight="bold" textAnchor="middle">NH₃ + CO₂</text>
        <text x="0" y="9" fill="#fde68a" fontSize="7" textAnchor="middle">+ 2 ATP (CPS-1)</text>
      </g>

      {/* Arrow into Carbamoyl Phosphate */}
      <path d="M 75 75 L 115 75" stroke="#f59e0b" strokeWidth="2.5" />

      {/* Carbamoyl Phosphate */}
      <g transform="translate(155, 75)">
        <rect x="-35" y="-22" width="70" height="44" rx="6" fill="#1e293b" stroke="#f59e0b" strokeWidth="2" />
        <text x="0" y="-4" fill="#ffffff" fontSize="8" fontWeight="bold" textAnchor="middle">Carbamoyl</text>
        <text x="0" y="8" fill="#fde68a" fontSize="8" textAnchor="middle">Phosphate</text>
      </g>

      {/* Cross membrane into Citrulline */}
      <path d="M 193 75 L 260 75" stroke="#38bdf8" strokeWidth="2.5" />
      <text x="227" y="65" fill="#94a3b8" fontSize="7" textAnchor="middle">OTC</text>

      {/* Cytosolic Wheel: Citrulline -> Argininosuccinate -> Arginine -> Ornithine */}
      <g transform="translate(300, 75)">
        <rect x="-30" y="-18" width="60" height="36" rx="6" fill="#1e293b" stroke="#38bdf8" strokeWidth="1.5" />
        <text x="0" y="3" fill="#ffffff" fontSize="8" fontWeight="bold" textAnchor="middle">Citrulline</text>
      </g>

      <path d="M 333 75 L 380 75" stroke="#38bdf8" strokeWidth="2" />
      <text x="356" y="65" fill="#f43f5e" fontSize="7" textAnchor="middle">+ Aspartate</text>

      <g transform="translate(425, 75)">
        <rect x="-40" y="-18" width="80" height="36" rx="6" fill="#1e293b" stroke="#38bdf8" strokeWidth="1.5" />
        <text x="0" y="3" fill="#ffffff" fontSize="8" fontWeight="bold" textAnchor="middle">Argininosuccinate</text>
      </g>

      <path d="M 468 75 L 515 75" stroke="#38bdf8" strokeWidth="2" />
      <text x="492" y="65" fill="#a855f7" fontSize="7" textAnchor="middle">- Fumarate</text>

      <g transform="translate(560, 75)">
        <rect x="-35" y="-22" width="70" height="44" rx="6" fill="#065f46" stroke="#10b981" strokeWidth="2" />
        <text x="0" y="-4" fill="#ffffff" fontSize="9" fontWeight="bold" textAnchor="middle">Arginine</text>
        <text x="0" y="8" fill="#6ee7b7" fontSize="8" textAnchor="middle">(Arginase)</text>
      </g>

      {/* Cleavage to Urea */}
      <path d="M 560 100 L 560 135" stroke="#10b981" strokeWidth="2.5" />
      <g transform="translate(560, 145)">
        <rect x="-42" y="-12" width="84" height="24" rx="6" fill="#10b981" />
        <text x="0" y="4" fill="#022c22" fontSize="9" fontWeight="black" textAnchor="middle">UREA EXCRETED</text>
      </g>
    </svg>
  </div>
);

/**
 * UNIT 4: Clinical Enzymology & Induced Fit Catalysis
 */
export const EnzymeDiagram = () => (
  <div className="w-full bg-slate-900 rounded-xl p-4 text-white shadow-xs overflow-hidden">
    <div className="flex items-center justify-between border-b border-slate-800 pb-2 mb-3">
      <span className="text-[10px] font-bold text-purple-400 uppercase tracking-wider flex items-center gap-1.5">
        <span className="w-2 h-2 rounded-full bg-purple-400" />
        Scientific Schematic • Enzyme Induced-Fit Model & Activation Energy (Ea)
      </span>
      <span className="text-[10px] text-slate-400 font-mono">Michaelis-Menten Kinetics: v0 = (Vmax × [S]) / (Km + [S])</span>
    </div>

    <svg viewBox="0 0 650 160" className="w-full h-auto max-h-48">
      {/* Left Panel: Active Site Complementarity */}
      <g transform="translate(100, 80)">
        {/* Enzyme body */}
        <path d="M -50 -40 C -10 -40, -10 -10, 10 -10 C 30 -10, 30 -40, 60 -40 C 80 0, 80 50, 50 50 C -20 50, -50 40, -50 -40 Z" fill="#6b21a8" stroke="#a855f7" strokeWidth="2" />
        <text x="5" y="30" fill="#e9d5ff" fontSize="9" fontWeight="bold" textAnchor="middle">Enzyme Active Site</text>

        {/* Substrate fitting in */}
        <path d="M 0 -35 L 20 -35 L 20 -15 L 0 -15 Z" fill="#38bdf8" stroke="#0284c7" strokeWidth="1.5" />
        <text x="10" y="-40" fill="#7dd3fc" fontSize="8" fontWeight="bold" textAnchor="middle">Substrate</text>
      </g>

      <text x="210" y="85" fill="#94a3b8" fontSize="12" fontWeight="bold">→</text>

      {/* Center: Enzyme-Substrate Complex */}
      <g transform="translate(300, 80)">
        <rect x="-45" y="-35" width="90" height="70" rx="12" fill="#581c87" stroke="#c084fc" strokeWidth="2" />
        <text x="0" y="-12" fill="#ffffff" fontSize="9" fontWeight="bold" textAnchor="middle">Enzyme-Substrate</text>
        <text x="0" y="2" fill="#c084fc" fontSize="9" fontWeight="bold" textAnchor="middle">[ES] Complex</text>
        <text x="0" y="18" fill="#e2e8f0" fontSize="7" textAnchor="middle">Conformational Shift</text>
      </g>

      <text x="380" y="85" fill="#94a3b8" fontSize="12" fontWeight="bold">→</text>

      {/* Right: Activation Energy Curve */}
      <g transform="translate(460, 20)">
        {/* Axes */}
        <line x1="0" y1="120" x2="160" y2="120" stroke="#64748b" strokeWidth="1.5" />
        <line x1="0" y1="120" x2="0" y2="10" stroke="#64748b" strokeWidth="1.5" />
        <text x="-5" y="15" fill="#94a3b8" fontSize="7" textAnchor="end">Free Energy (G)</text>
        <text x="155" y="132" fill="#94a3b8" fontSize="7" textAnchor="end">Reaction Progress</text>

        {/* Uncatalyzed curve (Red - High Ea) */}
        <path d="M 10 90 Q 75 -15 150 110" fill="none" stroke="#ef4444" strokeWidth="2" strokeDasharray="3 3" />
        <text x="80" y="10" fill="#f87171" fontSize="7" textAnchor="middle">Uncatalyzed (High Ea)</text>

        {/* Catalyzed curve (Green - Low Ea) */}
        <path d="M 10 90 Q 75 40 150 110" fill="none" stroke="#10b981" strokeWidth="2.5" />
        <text x="80" y="65" fill="#34d399" fontSize="8" fontWeight="bold" textAnchor="middle">With Enzyme (Low Ea)</text>
      </g>
    </svg>
  </div>
);

/**
 * UNIT 5: Acid-Base Balance & Bicarbonate Homeostasis
 */
export const AcidBaseDiagram = () => (
  <div className="w-full bg-slate-900 rounded-xl p-4 text-white shadow-xs overflow-hidden">
    <div className="flex items-center justify-between border-b border-slate-800 pb-2 mb-3">
      <span className="text-[10px] font-bold text-rose-400 uppercase tracking-wider flex items-center gap-1.5">
        <span className="w-2 h-2 rounded-full bg-rose-400" />
        Scientific Schematic • Henderson-Hasselbalch 20:1 Bicarbonate Buffer Balance
      </span>
      <span className="text-[10px] text-slate-400 font-mono">Arterial pH = 6.1 + log(20/1) = 7.40</span>
    </div>

    <svg viewBox="0 0 650 160" className="w-full h-auto max-h-48">
      {/* Central Balance Scale Fulcrum */}
      <polygon points="325,120 310,145 340,145" fill="#64748b" />
      <circle cx="325" cy="120" r="4" fill="#f8fafc" />

      {/* Balance Beam (Slight tilt indicating normal balance) */}
      <line x1="100" y1="120" x2="550" y2="120" stroke="#cbd5e1" strokeWidth="4" strokeLinecap="round" />

      {/* Left Pan: Base (HCO3-) = 20 Parts */}
      <line x1="160" y1="120" x2="160" y2="80" stroke="#38bdf8" strokeWidth="2" />
      <g transform="translate(160, 60)">
        <rect x="-60" y="-35" width="120" height="70" rx="8" fill="#0369a1" stroke="#38bdf8" strokeWidth="2" />
        <text x="0" y="-12" fill="#ffffff" fontSize="12" fontWeight="black" textAnchor="middle">20 Parts Base</text>
        <text x="0" y="6" fill="#bae6fd" fontSize="10" fontWeight="bold" textAnchor="middle">HCO₃⁻ (Bicarbonate)</text>
        <text x="0" y="22" fill="#e0f2fe" fontSize="8" textAnchor="middle">Regulated by KIDNEYS (Hours/Days)</text>
      </g>

      {/* Center pH Indicator */}
      <g transform="translate(325, 45)">
        <circle cx="0" cy="0" r="28" fill="#065f46" stroke="#10b981" strokeWidth="3" />
        <text x="0" y="-4" fill="#ffffff" fontSize="11" fontWeight="black" textAnchor="middle">pH 7.40</text>
        <text x="0" y="10" fill="#6ee7b7" fontSize="7" fontWeight="bold" textAnchor="middle">Normal</text>
      </g>

      {/* Right Pan: Acid (H2CO3) = 1 Part */}
      <line x1="490" y1="120" x2="490" y2="80" stroke="#f43f5e" strokeWidth="2" />
      <g transform="translate(490, 60)">
        <rect x="-60" y="-35" width="120" height="70" rx="8" fill="#881337" stroke="#f43f5e" strokeWidth="2" />
        <text x="0" y="-12" fill="#ffffff" fontSize="12" fontWeight="black" textAnchor="middle">1 Part Acid</text>
        <text x="0" y="6" fill="#fecdd3" fontSize="10" fontWeight="bold" textAnchor="middle">H₂CO₃ / PaCO₂</text>
        <text x="0" y="22" fill="#ffe4e6" fontSize="8" textAnchor="middle">Regulated by LUNGS (Minutes)</text>
      </g>

      {/* Ratio Caption */}
      <text x="325" y="100" fill="#facc15" fontSize="10" fontWeight="extrabold" textAnchor="middle">20 : 1 Homeostatic Ratio</text>
    </svg>
  </div>
);

/**
 * UNIT 6: Heme Catabolism & Jaundice Differential Pathway
 */
export const HemeDiagram = () => (
  <div className="w-full bg-slate-900 rounded-xl p-4 text-white shadow-xs overflow-hidden">
    <div className="flex items-center justify-between border-b border-slate-800 pb-2 mb-3">
      <span className="text-[10px] font-bold text-teal-400 uppercase tracking-wider flex items-center gap-1.5">
        <span className="w-2 h-2 rounded-full bg-teal-400" />
        Scientific Schematic • Heme Degradation, Bilirubin Conjugation & Excretion
      </span>
      <span className="text-[10px] text-slate-400 font-mono">Total Bilirubin Normal: 0.2–1.2 mg/dL</span>
    </div>

    <svg viewBox="0 0 650 160" className="w-full h-auto max-h-48">
      {/* Step 1: Senescent RBCs in Spleen (Heme Oxygenase) */}
      <g transform="translate(65, 80)">
        <circle cx="0" cy="0" r="30" fill="#991b1b" stroke="#f87171" strokeWidth="2" />
        <text x="0" y="-6" fill="#ffffff" fontSize="8" fontWeight="bold" textAnchor="middle">RBC Breakdown</text>
        <text x="0" y="6" fill="#fca5a5" fontSize="7" textAnchor="middle">Heme Oxygenase</text>
        <text x="0" y="16" fill="#fef2f2" fontSize="7" textAnchor="middle">Biliverdin</text>
      </g>

      <path d="M 98 80 L 140 80" stroke="#f87171" strokeWidth="2.5" />

      {/* Step 2: Unconjugated Bilirubin + Albumin in Blood */}
      <g transform="translate(195, 80)">
        <rect x="-45" y="-28" width="90" height="56" rx="8" fill="#1e293b" stroke="#f59e0b" strokeWidth="2" />
        <text x="0" y="-8" fill="#ffffff" fontSize="8" fontWeight="bold" textAnchor="middle">Unconjugated</text>
        <text x="0" y="4" fill="#fbbf24" fontSize="8" fontWeight="bold" textAnchor="middle">Bilirubin (Indirect)</text>
        <text x="0" y="18" fill="#94a3b8" fontSize="7" textAnchor="middle">Lipid soluble • Bound Albumin</text>
      </g>

      <path d="M 243 80 L 290 80" stroke="#f59e0b" strokeWidth="2.5" />

      {/* Step 3: Liver Hepatocyte (UGT1A1 enzyme) */}
      <g transform="translate(350, 80)">
        <rect x="-50" y="-32" width="100" height="64" rx="10" fill="#065f46" stroke="#10b981" strokeWidth="2.5" />
        <text x="0" y="-12" fill="#ffffff" fontSize="9" fontWeight="bold" textAnchor="middle">HEPATOCYTE</text>
        <text x="0" y="1" fill="#6ee7b7" fontSize="8" textAnchor="middle">UGT1A1 Conjugation</text>
        <text x="0" y="14" fill="#a7f3d0" fontSize="8" fontWeight="bold" textAnchor="middle">Bilirubin Diglucuronide</text>
      </g>

      <path d="M 403 80 L 450 80" stroke="#10b981" strokeWidth="2.5" />

      {/* Step 4: Intestine Gut conversion */}
      <g transform="translate(500, 80)">
        <rect x="-42" y="-28" width="84" height="56" rx="8" fill="#1e293b" stroke="#38bdf8" strokeWidth="2" />
        <text x="0" y="-8" fill="#ffffff" fontSize="8" fontWeight="bold" textAnchor="middle">Gut Flora Action</text>
        <text x="0" y="4" fill="#7dd3fc" fontSize="8" textAnchor="middle">Urobilinogen</text>
        <text x="0" y="18" fill="#94a3b8" fontSize="7" textAnchor="middle">Stercobilinogen</text>
      </g>

      {/* Final Excretions */}
      <path d="M 545 70 L 585 45" stroke="#f59e0b" strokeWidth="2" />
      <text x="590" y="42" fill="#fbbf24" fontSize="8" fontWeight="bold">Urine (Urobilin)</text>

      <path d="M 545 90 L 585 115" stroke="#a16207" strokeWidth="2" />
      <text x="590" y="122" fill="#ca8a04" fontSize="8" fontWeight="bold">Feces (Stercobilin)</text>
    </svg>
  </div>
);

/**
 * UNIT 7: Immunochemistry & ELISA Diagnostic Formats
 */
export const ImmunologyDiagram = () => (
  <div className="w-full bg-slate-900 rounded-xl p-4 text-white shadow-xs overflow-hidden">
    <div className="flex items-center justify-between border-b border-slate-800 pb-2 mb-3">
      <span className="text-[10px] font-bold text-cyan-400 uppercase tracking-wider flex items-center gap-1.5">
        <span className="w-2 h-2 rounded-full bg-cyan-400" />
        Scientific Schematic • Sandwich ELISA Diagnostic Immunoassay Principles
      </span>
      <span className="text-[10px] text-slate-400 font-mono">Color Intensity ∝ Target Antigen Conc.</span>
    </div>

    <svg viewBox="0 0 650 160" className="w-full h-auto max-h-48">
      {/* 4 Sequential Microplate Wells */}
      {/* Step 1: Capture Antibody Coated */}
      <g transform="translate(60, 40)">
        {/* Well Bottom */}
        <rect x="0" y="70" width="100" height="8" rx="2" fill="#475569" />
        {/* Y-shaped capture antibody */}
        <path d="M 40 70 L 40 50 L 30 35 M 40 50 L 50 35" stroke="#38bdf8" strokeWidth="3" strokeLinecap="round" />
        <path d="M 70 70 L 70 50 L 60 35 M 70 50 L 80 35" stroke="#38bdf8" strokeWidth="3" strokeLinecap="round" />
        <text x="50" y="95" fill="#ffffff" fontSize="8" fontWeight="bold" textAnchor="middle">1. Capture Ab</text>
        <text x="50" y="106" fill="#94a3b8" fontSize="7" textAnchor="middle">Coated on well</text>
      </g>

      {/* Arrow 1 */}
      <text x="180" y="85" fill="#64748b" fontSize="12" fontWeight="bold">→</text>

      {/* Step 2: Patient Sample Antigen Added */}
      <g transform="translate(200, 40)">
        <rect x="0" y="70" width="100" height="8" rx="2" fill="#475569" />
        <path d="M 40 70 L 40 50 L 30 35 M 40 50 L 50 35" stroke="#38bdf8" strokeWidth="3" strokeLinecap="round" />
        {/* Bound Antigens (Stars) */}
        <circle cx="30" cy="30" r="5" fill="#f59e0b" />
        <circle cx="50" cy="30" r="5" fill="#f59e0b" />
        <text x="50" y="95" fill="#ffffff" fontSize="8" fontWeight="bold" textAnchor="middle">2. Patient Antigen</text>
        <text x="50" y="106" fill="#fbbf24" fontSize="7" textAnchor="middle">Specific binding</text>
      </g>

      {/* Arrow 2 */}
      <text x="320" y="85" fill="#64748b" fontSize="12" fontWeight="bold">→</text>

      {/* Step 3: Detection Antibody with Enzyme Conjugate */}
      <g transform="translate(340, 40)">
        <rect x="0" y="70" width="100" height="8" rx="2" fill="#475569" />
        {/* Sandwich layers */}
        <path d="M 50 70 L 50 50 L 40 35 M 50 50 L 60 35" stroke="#38bdf8" strokeWidth="3" strokeLinecap="round" />
        <circle cx="40" cy="30" r="5" fill="#f59e0b" />
        {/* Inverted detection antibody */}
        <path d="M 40 10 L 40 25 M 40 10 L 33 0 M 40 10 L 47 0" stroke="#a855f7" strokeWidth="2.5" strokeLinecap="round" />
        {/* Enzyme HRP circle */}
        <circle cx="40" cy="-6" r="6" fill="#10b981" />
        <text x="40" y="-3" fill="#ffffff" fontSize="6" fontWeight="bold" textAnchor="middle">E</text>

        <text x="50" y="95" fill="#ffffff" fontSize="8" fontWeight="bold" textAnchor="middle">3. Enzyme-Ab</text>
        <text x="50" y="106" fill="#d8b4fe" fontSize="7" textAnchor="middle">Sandwich formed</text>
      </g>

      {/* Arrow 3 */}
      <text x="460" y="85" fill="#64748b" fontSize="12" fontWeight="bold">→</text>

      {/* Step 4: Substrate Added -> Chromogenic Color Reaction */}
      <g transform="translate(480, 40)">
        <rect x="0" y="70" width="120" height="8" rx="2" fill="#475569" />
        {/* Glowing chromogenic solution */}
        <rect x="10" y="20" width="100" height="48" rx="6" fill="#0284c7" opacity="0.6" />
        <text x="60" y="45" fill="#ffffff" fontSize="9" fontWeight="black" textAnchor="middle">COLOR CHANGE</text>
        <text x="60" y="58" fill="#bae6fd" fontSize="7" textAnchor="middle">Optical Density 450nm</text>

        <text x="60" y="95" fill="#ffffff" fontSize="8" fontWeight="bold" textAnchor="middle">4. Spectrophotometer</text>
        <text x="60" y="106" fill="#38bdf8" fontSize="7" textAnchor="middle">Absorbance measured</text>
      </g>
    </svg>
  </div>
);
