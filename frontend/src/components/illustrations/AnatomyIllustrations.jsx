import React from "react";

/**
 * Anatomical Plates & Scientific Medical Diagrams (SVG)
 * Provides crisp, high-contrast, labeled anatomical illustrations for all units.
 */

// 1. Standard Anatomical Position & Body Planes
export const BodyPlanesDiagram = () => (
  <div className="w-full bg-[#123B50] rounded-2xl p-4 sm:p-5 text-white shadow-md overflow-hidden border border-[#159A91]/30">
    <div className="flex items-center justify-between border-b border-white/10 pb-2.5 mb-3">
      <span className="text-xs font-bold text-[#159A91] uppercase tracking-wider flex items-center gap-1.5">
        <span className="w-2 h-2 rounded-full bg-[#159A91] animate-pulse" />
        Anatomical Reference • Principal Body Planes & Directional Axes
      </span>
      <span className="text-[10px] text-white/60 font-mono">INC CBME v2026 Reference</span>
    </div>

    <svg viewBox="0 0 650 220" className="w-full h-auto max-h-56">
      <defs>
        <marker id="arrow-teal" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
          <path d="M0,0 L0,6 L6,3 z" fill="#159A91" />
        </marker>
        <marker id="arrow-amber" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
          <path d="M0,0 L0,6 L6,3 z" fill="#F2B66D" />
        </marker>
      </defs>

      {/* Sagittal Plane Box */}
      <g transform="translate(40, 20)">
        <rect x="0" y="0" width="165" height="175" rx="12" fill="#1b4962" stroke="#159A91" strokeWidth="1.5" />
        <rect x="0" y="0" width="165" height="32" rx="12" fill="#159A91" />
        <text x="82" y="20" fill="#ffffff" fontSize="11" fontWeight="bold" textAnchor="middle">Sagittal Plane</text>
        <text x="82" y="55" fill="#F2B66D" fontSize="10" fontWeight="bold" textAnchor="middle">Vertical Division</text>
        <text x="82" y="75" fill="#ffffff" fontSize="9" textAnchor="middle">Divides body into</text>
        <text x="82" y="90" fill="#ffffff" fontSize="9" fontWeight="bold" textAnchor="middle">Right &amp; Left Portions</text>
        <line x1="20" y1="110" x2="145" y2="110" stroke="#ffffff" strokeWidth="1" strokeDasharray="3 3" />
        <text x="82" y="130" fill="#E9F5F3" fontSize="8" textAnchor="middle">Midsagittal: Exact Equal Halves</text>
        <text x="82" y="145" fill="#E9F5F3" fontSize="8" textAnchor="middle">Parasagittal: Unequal Halves</text>
        <text x="82" y="162" fill="#F2B66D" fontSize="8" fontWeight="bold" textAnchor="middle">Axis: Medial ↔ Lateral</text>
      </g>

      {/* Frontal (Coronal) Plane Box */}
      <g transform="translate(242, 20)">
        <rect x="0" y="0" width="165" height="175" rx="12" fill="#1b4962" stroke="#159A91" strokeWidth="1.5" />
        <rect x="0" y="0" width="165" height="32" rx="12" fill="#123B50" stroke="#159A91" strokeWidth="1" />
        <text x="82" y="20" fill="#ffffff" fontSize="11" fontWeight="bold" textAnchor="middle">Frontal / Coronal</text>
        <text x="82" y="55" fill="#F2B66D" fontSize="10" fontWeight="bold" textAnchor="middle">Longitudinal Division</text>
        <text x="82" y="75" fill="#ffffff" fontSize="9" textAnchor="middle">Divides body into</text>
        <text x="82" y="90" fill="#ffffff" fontSize="9" fontWeight="bold" textAnchor="middle">Anterior &amp; Posterior</text>
        <line x1="20" y1="110" x2="145" y2="110" stroke="#ffffff" strokeWidth="1" strokeDasharray="3 3" />
        <text x="82" y="130" fill="#E9F5F3" fontSize="8" textAnchor="middle">Ventral (Front) Surface</text>
        <text x="82" y="145" fill="#E9F5F3" fontSize="8" textAnchor="middle">Dorsal (Back) Surface</text>
        <text x="82" y="162" fill="#F2B66D" fontSize="8" fontWeight="bold" textAnchor="middle">Axis: Ventral ↔ Dorsal</text>
      </g>

      {/* Transverse (Horizontal) Plane Box */}
      <g transform="translate(445, 20)">
        <rect x="0" y="0" width="165" height="175" rx="12" fill="#1b4962" stroke="#159A91" strokeWidth="1.5" />
        <rect x="0" y="0" width="165" height="32" rx="12" fill="#159A91" />
        <text x="82" y="20" fill="#ffffff" fontSize="11" fontWeight="bold" textAnchor="middle">Transverse / Axial</text>
        <text x="82" y="55" fill="#F2B66D" fontSize="10" fontWeight="bold" textAnchor="middle">Cross-Sectional Division</text>
        <text x="82" y="75" fill="#ffffff" fontSize="9" textAnchor="middle">Divides body into</text>
        <text x="82" y="90" fill="#ffffff" fontSize="9" fontWeight="bold" textAnchor="middle">Superior &amp; Inferior</text>
        <line x1="20" y1="110" x2="145" y2="110" stroke="#ffffff" strokeWidth="1" strokeDasharray="3 3" />
        <text x="82" y="130" fill="#E9F5F3" fontSize="8" textAnchor="middle">Cranial (Upper / Head)</text>
        <text x="82" y="145" fill="#E9F5F3" fontSize="8" textAnchor="middle">Caudal (Lower / Tail)</text>
        <text x="82" y="162" fill="#F2B66D" fontSize="8" fontWeight="bold" textAnchor="middle">Standard CT / MRI Axial Scan</text>
      </g>
    </svg>
  </div>
);

// 2. Cell Membrane & Organelles Architecture
export const CellMembraneDiagram = () => (
  <div className="w-full bg-[#123B50] rounded-2xl p-4 sm:p-5 text-white shadow-md overflow-hidden border border-[#159A91]/30">
    <div className="flex items-center justify-between border-b border-white/10 pb-2.5 mb-3">
      <span className="text-xs font-bold text-[#159A91] uppercase tracking-wider flex items-center gap-1.5">
        <span className="w-2 h-2 rounded-full bg-[#159A91] animate-pulse" />
        Histological Plate • Fluid Mosaic Plasma Membrane Architecture
      </span>
      <span className="text-[10px] text-white/60 font-mono">Bilayer Thickness: 7.5 – 10 nm</span>
    </div>

    <svg viewBox="0 0 650 180" className="w-full h-auto max-h-52">
      {/* Extracellular Fluid Label */}
      <rect x="15" y="10" width="170" height="22" rx="6" fill="#159A91" opacity="0.8" />
      <text x="100" y="25" fill="#ffffff" fontSize="9" fontWeight="bold" textAnchor="middle">EXTRACELLULAR FLUID (ECF)</text>

      {/* Outer Leaflet Polar Heads */}
      {[...Array(18)].map((_, i) => (
        <g key={`top-${i}`} transform={`translate(${35 + i * 33}, 55)`}>
          <circle cx="0" cy="0" r="10" fill="#F2B66D" stroke="#ffffff" strokeWidth="1" />
          <path d="M-3,10 Q-6,22 -2,32 M3,10 Q6,22 2,32" stroke="#E9F5F3" strokeWidth="1.8" fill="none" />
        </g>
      ))}

      {/* Integral Transmembrane Protein Channel */}
      <g transform="translate(230, 40)">
        <rect x="0" y="0" width="55" height="95" rx="14" fill="#159A91" stroke="#ffffff" strokeWidth="1.5" />
        <rect x="22" y="0" width="11" height="95" fill="#123B50" />
        <text x="27" y="-6" fill="#F2B66D" fontSize="8" fontWeight="bold" textAnchor="middle">Ion Channel</text>
      </g>

      {/* Glycoprotein Antenna */}
      <g transform="translate(245, 10)">
        <path d="M12,30 L12,8 Q12,-5 25,-10" stroke="#F2B66D" strokeWidth="2" fill="none" />
        <circle cx="25" cy="-10" r="4" fill="#F2B66D" />
        <text x="50" y="-8" fill="#F2B66D" fontSize="7" fontWeight="bold">Glycocalyx</text>
      </g>

      {/* Inner Leaflet Polar Heads */}
      {[...Array(18)].map((_, i) => (
        <g key={`bot-${i}`} transform={`translate(${35 + i * 33}, 120)`}>
          <circle cx="0" cy="0" r="10" fill="#F2B66D" stroke="#ffffff" strokeWidth="1" />
          <path d="M-3,-10 Q-6,-22 -2,-32 M3,-10 Q6,-22 2,-32" stroke="#E9F5F3" strokeWidth="1.8" fill="none" />
        </g>
      ))}

      {/* Peripheral Protein */}
      <g transform="translate(420, 125)">
        <ellipse cx="25" cy="12" rx="28" ry="14" fill="#F2B66D" stroke="#ffffff" strokeWidth="1" />
        <text x="25" y="15" fill="#123B50" fontSize="8" fontWeight="bold" textAnchor="middle">Peripheral Protein</text>
      </g>

      {/* Intracellular Cytoplasm Label */}
      <rect x="15" y="150" width="170" height="22" rx="6" fill="#159A91" opacity="0.8" />
      <text x="100" y="165" fill="#ffffff" fontSize="9" fontWeight="bold" textAnchor="middle">CYTOPLASM / CYTOSOL (ICF)</text>
    </svg>
  </div>
);

// 3. Heart Internal Chambers & Cardiac Valves
export const HeartAnatomyDiagram = () => (
  <div className="w-full bg-[#123B50] rounded-2xl p-4 sm:p-5 text-white shadow-md overflow-hidden border border-[#159A91]/30">
    <div className="flex items-center justify-between border-b border-white/10 pb-2.5 mb-3">
      <span className="text-xs font-bold text-[#159A91] uppercase tracking-wider flex items-center gap-1.5">
        <span className="w-2 h-2 rounded-full bg-[#159A91] animate-pulse" />
        Cardiovascular Anatomy • 4 Internal Chambers &amp; Atrioventricular Valves
      </span>
      <span className="text-[10px] text-white/60 font-mono">Dual Circulation System</span>
    </div>

    <svg viewBox="0 0 650 200" className="w-full h-auto max-h-56">
      {/* Right Atrium */}
      <g transform="translate(60, 30)">
        <rect x="0" y="0" width="125" height="65" rx="10" fill="#1b4962" stroke="#159A91" strokeWidth="2" />
        <text x="62" y="24" fill="#F2B66D" fontSize="10" fontWeight="bold" textAnchor="middle">Right Atrium (RA)</text>
        <text x="62" y="40" fill="#ffffff" fontSize="8" textAnchor="middle">Receives Deoxygenated Blood</text>
        <text x="62" y="52" fill="#E9F5F3" fontSize="8" textAnchor="middle">via SVC, IVC &amp; Coronary Sinus</text>
      </g>

      {/* Tricuspid Valve */}
      <g transform="translate(195, 45)">
        <path d="M 0 15 L 30 15" stroke="#F2B66D" strokeWidth="3" markerEnd="url(#arrow-amber)" />
        <text x="15" y="8" fill="#F2B66D" fontSize="8" fontWeight="bold" textAnchor="middle">Tricuspid</text>
      </g>

      {/* Right Ventricle */}
      <g transform="translate(235, 30)">
        <rect x="0" y="0" width="125" height="65" rx="10" fill="#1b4962" stroke="#159A91" strokeWidth="2" />
        <text x="62" y="24" fill="#F2B66D" fontSize="10" fontWeight="bold" textAnchor="middle">Right Ventricle (RV)</text>
        <text x="62" y="40" fill="#ffffff" fontSize="8" textAnchor="middle">Pumps to Pulmonary Trunk</text>
        <text x="62" y="52" fill="#E9F5F3" fontSize="8" textAnchor="middle">Low-Pressure Lung Circuit</text>
      </g>

      {/* Pulmonary Trunk */}
      <g transform="translate(370, 45)">
        <path d="M 0 15 L 30 15" stroke="#159A91" strokeWidth="3" markerEnd="url(#arrow-teal)" />
        <text x="15" y="8" fill="#159A91" fontSize="8" fontWeight="bold" textAnchor="middle">Pulmonic</text>
      </g>

      {/* Lungs Oxygenation */}
      <g transform="translate(410, 30)">
        <rect x="0" y="0" width="115" height="65" rx="10" fill="#159A91" stroke="#ffffff" strokeWidth="1.5" />
        <text x="57" y="24" fill="#ffffff" fontSize="10" fontWeight="bold" textAnchor="middle">Pulmonary Bed</text>
        <text x="57" y="40" fill="#ffffff" fontSize="8" textAnchor="middle">Gas Exchange: O₂ Intake</text>
        <text x="57" y="52" fill="#F2B66D" fontSize="8" fontWeight="bold" textAnchor="middle">CO₂ Offloading</text>
      </g>

      {/* Return to Left Atrium */}
      <g transform="translate(410, 115)">
        <rect x="0" y="0" width="115" height="65" rx="10" fill="#1b4962" stroke="#159A91" strokeWidth="2" />
        <text x="57" y="24" fill="#F2B66D" fontSize="10" fontWeight="bold" textAnchor="middle">Left Atrium (LA)</text>
        <text x="57" y="40" fill="#ffffff" fontSize="8" textAnchor="middle">4 Pulmonary Veins</text>
        <text x="57" y="52" fill="#E9F5F3" fontSize="8" textAnchor="middle">Oxygenated Blood</text>
      </g>

      {/* Bicuspid / Mitral Valve */}
      <g transform="translate(370, 130)">
        <path d="M 30 15 L 0 15" stroke="#F2B66D" strokeWidth="3" markerEnd="url(#arrow-amber)" />
        <text x="15" y="8" fill="#F2B66D" fontSize="8" fontWeight="bold" textAnchor="middle">Mitral (Bicuspid)</text>
      </g>

      {/* Left Ventricle */}
      <g transform="translate(235, 115)">
        <rect x="0" y="0" width="125" height="65" rx="10" fill="#1b4962" stroke="#F2B66D" strokeWidth="2.5" />
        <text x="62" y="24" fill="#F2B66D" fontSize="10" fontWeight="bold" textAnchor="middle">Left Ventricle (LV)</text>
        <text x="62" y="40" fill="#ffffff" fontSize="8" textAnchor="middle">Thick Myocardium (3× RV)</text>
        <text x="62" y="52" fill="#E9F5F3" fontSize="8" textAnchor="middle">Systemic Pumping (&ge;120 mmHg)</text>
      </g>

      {/* Aorta Exit */}
      <g transform="translate(60, 115)">
        <rect x="0" y="0" width="125" height="65" rx="10" fill="#159A91" stroke="#ffffff" strokeWidth="1.5" />
        <text x="62" y="24" fill="#ffffff" fontSize="10" fontWeight="bold" textAnchor="middle">Systemic Aorta</text>
        <text x="62" y="40" fill="#ffffff" fontSize="8" textAnchor="middle">Aortic Semilunar Valve</text>
        <text x="62" y="52" fill="#F2B66D" fontSize="8" fontWeight="bold" textAnchor="middle">Body Perfusion</text>
      </g>
    </svg>
  </div>
);

// 4. Respiratory Alveoli & Gas Exchange
export const RespiratoryAlveoliDiagram = () => (
  <div className="w-full bg-[#123B50] rounded-2xl p-4 sm:p-5 text-white shadow-md overflow-hidden border border-[#159A91]/30">
    <div className="flex items-center justify-between border-b border-white/10 pb-2.5 mb-3">
      <span className="text-xs font-bold text-[#159A91] uppercase tracking-wider flex items-center gap-1.5">
        <span className="w-2 h-2 rounded-full bg-[#159A91] animate-pulse" />
        Pulmonary Architecture • Alveolar-Capillary Respiratory Membrane (0.5 µm)
      </span>
      <span className="text-[10px] text-white/60 font-mono">Fick Diffusion Barrier</span>
    </div>

    <svg viewBox="0 0 650 180" className="w-full h-auto max-h-52">
      {/* Alveolus Air Sac */}
      <g transform="translate(50, 20)">
        <circle cx="80" cy="70" r="65" fill="#1b4962" stroke="#159A91" strokeWidth="2.5" />
        <text x="80" y="55" fill="#ffffff" fontSize="11" fontWeight="bold" textAnchor="middle">Alveolar Lumen</text>
        <text x="80" y="72" fill="#159A91" fontSize="10" fontWeight="bold" textAnchor="middle">pO₂ = 104 mmHg</text>
        <text x="80" y="88" fill="#F2B66D" fontSize="9" textAnchor="middle">pCO₂ = 40 mmHg</text>
        <text x="80" y="105" fill="#E9F5F3" fontSize="8" textAnchor="middle">Type II Pneumocyte Surfactant</text>
      </g>

      {/* Diffusion Arrows */}
      <g transform="translate(210, 50)">
        <path d="M 0 15 L 75 15" stroke="#159A91" strokeWidth="4" markerEnd="url(#arrow-teal)" />
        <text x="37" y="5" fill="#159A91" fontSize="9" fontWeight="bold" textAnchor="middle">O₂ Influx (64 mmHg ΔP)</text>

        <path d="M 75 45 L 0 45" stroke="#F2B66D" strokeWidth="4" markerEnd="url(#arrow-amber)" />
        <text x="37" y="65" fill="#F2B66D" fontSize="9" fontWeight="bold" textAnchor="middle">CO₂ Efflux (5 mmHg ΔP)</text>
      </g>

      {/* Pulmonary Capillary Bed */}
      <g transform="translate(330, 20)">
        <rect x="0" y="0" width="270" height="140" rx="14" fill="#1b4962" stroke="#F2B66D" strokeWidth="2" />
        <text x="135" y="25" fill="#F2B66D" fontSize="11" fontWeight="bold" textAnchor="middle">Pulmonary Capillary Bloodstream</text>

        <g transform="translate(30, 45)">
          <circle cx="20" cy="20" r="15" fill="#991b1b" stroke="#ffffff" strokeWidth="1" />
          <text x="20" y="24" fill="#ffffff" fontSize="8" fontWeight="bold" textAnchor="middle">RBC</text>
          <text x="20" y="48" fill="#E9F5F3" fontSize="7" textAnchor="middle">Entering: pO₂ 40</text>
        </g>

        <path d="M 80 65 L 140 65" stroke="#ffffff" strokeWidth="2" strokeDasharray="4 2" />

        <g transform="translate(170, 45)">
          <circle cx="20" cy="20" r="15" fill="#dc2626" stroke="#ffffff" strokeWidth="1.5" />
          <text x="20" y="24" fill="#ffffff" fontSize="8" fontWeight="bold" textAnchor="middle">Hb-O₂</text>
          <text x="20" y="48" fill="#F2B66D" fontSize="7" fontWeight="bold" textAnchor="middle">Leaving: pO₂ 100</text>
        </g>

        <text x="135" y="125" fill="#159A91" fontSize="8" fontWeight="bold" textAnchor="middle">
          Endothelial Wall &bull; Basement Membrane &bull; Alveolar Epithelium
        </text>
      </g>
    </svg>
  </div>
);

// 5. General Anatomical Illustration Selector
export const renderAnatomyIllustration = (subtopicId, title = "") => {
  const t = (title || "").toLowerCase();
  const id = (subtopicId || "").toLowerCase();

  if (t.includes("plane") || t.includes("direction") || t.includes("term") || id.includes("anat-1-1") || id.includes("anat-1-2") || id.includes("anat-1-3")) {
    return <BodyPlanesDiagram />;
  }
  if (t.includes("cell") || t.includes("membrane") || t.includes("organelle") || t.includes("tissue") || id.includes("anat-1-6") || id.includes("anat-1-7")) {
    return <CellMembraneDiagram />;
  }
  if (t.includes("heart") || t.includes("cardiac") || t.includes("valve") || t.includes("ventricle") || t.includes("atrium") || id.includes("anat-5") || id.includes("cardio")) {
    return <HeartAnatomyDiagram />;
  }
  if (t.includes("respirat") || t.includes("lung") || t.includes("alveol") || t.includes("gas exchange") || id.includes("anat-6")) {
    return <RespiratoryAlveoliDiagram />;
  }

  // Fallback to Body Planes reference
  return <BodyPlanesDiagram />;
};
