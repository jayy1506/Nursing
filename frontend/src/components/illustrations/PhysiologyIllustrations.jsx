import React from "react";

/**
 * Physiological Plates & System Dynamics Schematics (SVG)
 * Standardized for B.Sc. Nursing Clinical Physiology & CBME benchmarks.
 */

// 1. Action Potential & Excitable Membrane Depolarization
export const ActionPotentialDiagram = () => (
  <div className="w-full bg-[#123B50] rounded-2xl p-4 sm:p-5 text-white shadow-md overflow-hidden border border-[#159A91]/30">
    <div className="flex items-center justify-between border-b border-white/10 pb-2.5 mb-3">
      <span className="text-xs font-bold text-[#159A91] uppercase tracking-wider flex items-center gap-1.5">
        <span className="w-2 h-2 rounded-full bg-[#159A91] animate-pulse" />
        Neurophysiology • Nerve Action Potential &amp; Ion Conductance Curve
      </span>
      <span className="text-[10px] text-white/60 font-mono">Resting: -70 mV &bull; Peak: +30 mV</span>
    </div>

    <svg viewBox="0 0 650 180" className="w-full h-auto max-h-52">
      {/* Grid Lines */}
      <line x1="60" y1="30" x2="600" y2="30" stroke="#1b4962" strokeWidth="1" strokeDasharray="3 3" />
      <text x="50" y="34" fill="#F2B66D" fontSize="8" textAnchor="end">+30 mV</text>

      <line x1="60" y1="80" x2="600" y2="80" stroke="#1b4962" strokeWidth="1" strokeDasharray="3 3" />
      <text x="50" y="84" fill="#ffffff" fontSize="8" textAnchor="end">0 mV</text>

      <line x1="60" y1="120" x2="600" y2="120" stroke="#F2B66D" strokeWidth="1" strokeDasharray="4 2" />
      <text x="50" y="124" fill="#F2B66D" fontSize="8" textAnchor="end">-55 mV</text>

      <line x1="60" y1="145" x2="600" y2="145" stroke="#159A91" strokeWidth="1.5" />
      <text x="50" y="149" fill="#159A91" fontSize="8" textAnchor="end">-70 mV</text>

      {/* Action Potential Waveform */}
      <path
        d="M 70 145 L 140 145 Q 160 145 175 120 L 220 30 Q 235 25 245 45 L 290 155 Q 315 165 340 145 L 600 145"
        stroke="#159A91"
        strokeWidth="3.5"
        fill="none"
      />

      {/* Annotations */}
      <g transform="translate(100, 160)">
        <text x="0" y="0" fill="#ffffff" fontSize="8" fontWeight="bold">1. RMP (-70 mV)</text>
      </g>

      <g transform="translate(160, 60)">
        <text x="0" y="0" fill="#F2B66D" fontSize="8" fontWeight="bold">2. Rapid Na⁺ Influx</text>
        <text x="0" y="10" fill="#E9F5F3" fontSize="7">(Depolarization)</text>
      </g>

      <g transform="translate(250, 40)">
        <text x="0" y="0" fill="#159A91" fontSize="8" fontWeight="bold">3. K⁺ Efflux</text>
        <text x="0" y="10" fill="#E9F5F3" fontSize="7">(Repolarization)</text>
      </g>

      <g transform="translate(305, 175)">
        <text x="0" y="0" fill="#F2B66D" fontSize="8" fontWeight="bold">4. Hyperpolarization (-85 mV)</text>
      </g>
    </svg>
  </div>
);

// 2. Nephron Glomerular Filtration & Countercurrent Mechanism
export const NephronPhysiologyDiagram = () => (
  <div className="w-full bg-[#123B50] rounded-2xl p-4 sm:p-5 text-white shadow-md overflow-hidden border border-[#159A91]/30">
    <div className="flex items-center justify-between border-b border-white/10 pb-2.5 mb-3">
      <span className="text-xs font-bold text-[#159A91] uppercase tracking-wider flex items-center gap-1.5">
        <span className="w-2 h-2 rounded-full bg-[#159A91] animate-pulse" />
        Renal Physiology • Glomerular Filtration &amp; Tubular Countercurrent Dynamics
      </span>
      <span className="text-[10px] text-white/60 font-mono">Normal GFR = 125 mL/min (180 L/day)</span>
    </div>

    <svg viewBox="0 0 650 180" className="w-full h-auto max-h-52">
      {/* Glomerulus */}
      <g transform="translate(40, 30)">
        <circle cx="45" cy="45" r="35" fill="#1b4962" stroke="#159A91" strokeWidth="2" />
        <text x="45" y="38" fill="#F2B66D" fontSize="9" fontWeight="bold" textAnchor="middle">Bowman's</text>
        <text x="45" y="50" fill="#ffffff" fontSize="8" textAnchor="middle">Capsule</text>
        <text x="45" y="62" fill="#159A91" fontSize="7" fontWeight="bold" textAnchor="middle">GFR: 125 mL/min</text>
      </g>

      {/* PCT */}
      <g transform="translate(130, 25)">
        <rect x="0" y="0" width="105" height="55" rx="10" fill="#1b4962" stroke="#159A91" strokeWidth="1.5" />
        <text x="52" y="20" fill="#ffffff" fontSize="9" fontWeight="bold" textAnchor="middle">Proximal Tubule (PCT)</text>
        <text x="52" y="34" fill="#F2B66D" fontSize="8" textAnchor="middle">Reabsorbs 65% Na⁺, H₂O</text>
        <text x="52" y="46" fill="#E9F5F3" fontSize="7" textAnchor="middle">100% Glucose &amp; Amino Acids</text>
      </g>

      {/* Loop of Henle Descending */}
      <g transform="translate(255, 30)">
        <rect x="0" y="0" width="95" height="110" rx="8" fill="#1b4962" stroke="#159A91" strokeWidth="1.5" />
        <text x="47" y="25" fill="#F2B66D" fontSize="8" fontWeight="bold" textAnchor="middle">Loop of Henle</text>
        <text x="47" y="42" fill="#ffffff" fontSize="8" textAnchor="middle">Descending:</text>
        <text x="47" y="54" fill="#159A91" fontSize="8" fontWeight="bold" textAnchor="middle">Permeable to H₂O</text>
        <text x="47" y="75" fill="#ffffff" fontSize="8" textAnchor="middle">Ascending:</text>
        <text x="47" y="87" fill="#F2B66D" fontSize="8" fontWeight="bold" textAnchor="middle">Na⁺/K⁺/2Cl⁻ Pump</text>
        <text x="47" y="99" fill="#E9F5F3" fontSize="7" textAnchor="middle">Impermeable to H₂O</text>
      </g>

      {/* DCT */}
      <g transform="translate(370, 25)">
        <rect x="0" y="0" width="115" height="55" rx="10" fill="#1b4962" stroke="#159A91" strokeWidth="1.5" />
        <text x="57" y="20" fill="#ffffff" fontSize="9" fontWeight="bold" textAnchor="middle">Distal Tubule (DCT)</text>
        <text x="57" y="34" fill="#F2B66D" fontSize="8" textAnchor="middle">Aldosterone Regulates</text>
        <text x="57" y="46" fill="#E9F5F3" fontSize="7" textAnchor="middle">Na⁺ Uptake &bull; K⁺/H⁺ Secretion</text>
      </g>

      {/* Collecting Duct */}
      <g transform="translate(505, 25)">
        <rect x="0" y="0" width="105" height="115" rx="10" fill="#1b4962" stroke="#F2B66D" strokeWidth="2" />
        <text x="52" y="25" fill="#F2B66D" fontSize="9" fontWeight="bold" textAnchor="middle">Collecting Duct</text>
        <text x="52" y="42" fill="#ffffff" fontSize="8" textAnchor="middle">ADH / Vasopressin</text>
        <text x="52" y="55" fill="#159A91" fontSize="8" fontWeight="bold" textAnchor="middle">Aquaporin-2 Channels</text>
        <text x="52" y="75" fill="#E9F5F3" fontSize="8" textAnchor="middle">Urine Concentration:</text>
        <text x="52" y="90" fill="#F2B66D" fontSize="9" fontWeight="bold" textAnchor="middle">1200 mOsm/kg</text>
        <text x="52" y="105" fill="#ffffff" fontSize="7" textAnchor="middle">Final Excretion: 1.5 L/day</text>
      </g>
    </svg>
  </div>
);

// 3. Cardiac Cycle Hemodynamics & Wiggers Synchrony
export const CardiacCycleDiagram = () => (
  <div className="w-full bg-[#123B50] rounded-2xl p-4 sm:p-5 text-white shadow-md overflow-hidden border border-[#159A91]/30">
    <div className="flex items-center justify-between border-b border-white/10 pb-2.5 mb-3">
      <span className="text-xs font-bold text-[#159A91] uppercase tracking-wider flex items-center gap-1.5">
        <span className="w-2 h-2 rounded-full bg-[#159A91] animate-pulse" />
        Cardiovascular Hemodynamics • Cardiac Cycle Phases (Duration = 0.8 s at 75 bpm)
      </span>
      <span className="text-[10px] text-white/60 font-mono">Systole (0.3 s) &bull; Diastole (0.5 s)</span>
    </div>

    <svg viewBox="0 0 650 170" className="w-full h-auto max-h-48">
      {/* 4 Phases */}
      <g transform="translate(30, 25)">
        <rect x="0" y="0" width="130" height="115" rx="10" fill="#1b4962" stroke="#159A91" strokeWidth="1.5" />
        <text x="65" y="22" fill="#F2B66D" fontSize="9" fontWeight="bold" textAnchor="middle">Phase 1: Ventricular</text>
        <text x="65" y="34" fill="#F2B66D" fontSize="9" fontWeight="bold" textAnchor="middle">Filling (Diastole)</text>
        <text x="65" y="55" fill="#ffffff" fontSize="8" textAnchor="middle">AV Valves: Open</text>
        <text x="65" y="70" fill="#ffffff" fontSize="8" textAnchor="middle">SL Valves: Closed</text>
        <text x="65" y="90" fill="#E9F5F3" fontSize="8" textAnchor="middle">Atrial Kick adds 20-30%</text>
        <text x="65" y="105" fill="#159A91" fontSize="8" fontWeight="bold" textAnchor="middle">EDV = ~130 mL</text>
      </g>

      <g transform="translate(180, 25)">
        <rect x="0" y="0" width="130" height="115" rx="10" fill="#1b4962" stroke="#159A91" strokeWidth="1.5" />
        <text x="65" y="22" fill="#F2B66D" fontSize="9" fontWeight="bold" textAnchor="middle">Phase 2: Isovolumetric</text>
        <text x="65" y="34" fill="#F2B66D" fontSize="9" fontWeight="bold" textAnchor="middle">Contraction</text>
        <text x="65" y="55" fill="#ffffff" fontSize="8" textAnchor="middle">All 4 Valves: CLOSED</text>
        <text x="65" y="70" fill="#F2B66D" fontSize="8" fontWeight="bold" textAnchor="middle">S1 Heart Sound ("Lub")</text>
        <text x="65" y="90" fill="#ffffff" fontSize="8" textAnchor="middle">Pressure Surges steeply</text>
        <text x="65" y="105" fill="#159A91" fontSize="8" fontWeight="bold" textAnchor="middle">Volume Unchanged</text>
      </g>

      <g transform="translate(330, 25)">
        <rect x="0" y="0" width="130" height="115" rx="10" fill="#1b4962" stroke="#159A91" strokeWidth="1.5" />
        <text x="65" y="22" fill="#F2B66D" fontSize="9" fontWeight="bold" textAnchor="middle">Phase 3: Rapid</text>
        <text x="65" y="34" fill="#F2B66D" fontSize="9" fontWeight="bold" textAnchor="middle">Ventricular Ejection</text>
        <text x="65" y="55" fill="#ffffff" fontSize="8" textAnchor="middle">SL Valves: POP OPEN</text>
        <text x="65" y="70" fill="#ffffff" fontSize="8" textAnchor="middle">Aortic Press: 120 mmHg</text>
        <text x="65" y="90" fill="#E9F5F3" fontSize="8" textAnchor="middle">Stroke Volume (SV):</text>
        <text x="65" y="105" fill="#159A91" fontSize="8" fontWeight="bold" textAnchor="middle">SV = ~70 mL</text>
      </g>

      <g transform="translate(480, 25)">
        <rect x="0" y="0" width="130" height="115" rx="10" fill="#1b4962" stroke="#159A91" strokeWidth="1.5" />
        <text x="65" y="22" fill="#F2B66D" fontSize="9" fontWeight="bold" textAnchor="middle">Phase 4: Isovolumetric</text>
        <text x="65" y="34" fill="#F2B66D" fontSize="9" fontWeight="bold" textAnchor="middle">Relaxation</text>
        <text x="65" y="55" fill="#ffffff" fontSize="8" textAnchor="middle">All 4 Valves: CLOSED</text>
        <text x="65" y="70" fill="#F2B66D" fontSize="8" fontWeight="bold" textAnchor="middle">S2 Heart Sound ("Dub")</text>
        <text x="65" y="90" fill="#ffffff" fontSize="8" textAnchor="middle">Pressure drops rapidly</text>
        <text x="65" y="105" fill="#159A91" fontSize="8" fontWeight="bold" textAnchor="middle">ESV = ~60 mL</text>
      </g>
    </svg>
  </div>
);

// 4. General Physiology Illustration Selector
export const renderPhysiologyIllustration = (subtopicId, title = "") => {
  const t = (title || "").toLowerCase();
  const id = (subtopicId || "").toLowerCase();

  if (t.includes("cardiac") || t.includes("heart") || t.includes("blood pressure") || t.includes("cycle") || id.includes("phys-2") || id.includes("cardio")) {
    return <CardiacCycleDiagram />;
  }
  if (t.includes("action potential") || t.includes("nerve") || t.includes("muscle") || t.includes("excitation") || id.includes("phys-4") || id.includes("neuro")) {
    return <ActionPotentialDiagram />;
  }
  if (t.includes("renal") || t.includes("kidney") || t.includes("nephron") || t.includes("gfr") || t.includes("countercurrent") || id.includes("phys-7")) {
    return <NephronPhysiologyDiagram />;
  }

  // Default to Action Potential / Membrane reference
  return <ActionPotentialDiagram />;
};
