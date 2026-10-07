import React, { useState } from "react";
import {
  Activity,
  HeartPulse,
  Scale,
  ShieldCheck,
  Sparkles,
  AlertTriangle,
  CheckCircle,
  HelpCircle,
  ArrowRight,
  Info
} from "lucide-react";

/**
 * 1. Interactive Blood Glucose & Insulin Homeostasis Simulator (Unit 1)
 * Crisp SVG Gauge + Live Physiological & Nursing Response
 */
export const GlucoseHomeostasisSimulator = () => {
  const [glucose, setGlucose] = useState(95);

  const getStatus = (val) => {
    if (val < 70) {
      return {
        label: "Hypoglycemia (Critical Low)",
        color: "text-rose-600 bg-rose-50 border-rose-200",
        hormone: "Glucagon & Epinephrine release ↑",
        metabolism: "Glycogenolysis in liver stimulated, gluconeogenesis activated.",
        symptoms: "Diaphoresis, tremors, tachycardia, confusion, blurred vision.",
        nursingAction: "Rule of 15: Give 15g fast-acting carbs (juice/glucose tabs), recheck in 15 mins. If unconscious, IV D50 or IM Glucagon.",
        gaugeColor: "#ef4444"
      };
    } else if (val <= 99) {
      return {
        label: "Normal Euglycemia (Fasting)",
        color: "text-emerald-700 bg-emerald-50 border-emerald-200",
        hormone: "Basal Insulin secretion (β-cells of Pancreas)",
        metabolism: "Balanced cellular glucose uptake via GLUT4, normal glycolysis.",
        symptoms: "Eustasis, normal cellular respiration and cognitive alertness.",
        nursingAction: "Maintain balanced dietary intake and hydration. Routine screening.",
        gaugeColor: "#10b981"
      };
    } else if (val <= 125) {
      return {
        label: "Impaired Fasting Glucose (Prediabetes)",
        color: "text-amber-700 bg-amber-50 border-amber-200",
        hormone: "Compensatory Hyperinsulinemia due to peripheral resistance",
        metabolism: "Reduced GLUT4 translocation into muscle and adipose tissues.",
        symptoms: "Usually asymptomatic, subtle fatigue, borderline HbA1c 5.7–6.4%.",
        nursingAction: "Lifestyle counseling: Mediterranean diet, regular aerobic exercise, annual HbA1c surveillance.",
        gaugeColor: "#f59e0b"
      };
    } else if (val <= 249) {
      return {
        label: "Diabetes Mellitus (Hyperglycemia)",
        color: "text-orange-700 bg-orange-50 border-orange-200",
        hormone: "Absolute or Relative Insulin Deficiency",
        metabolism: "Excess hepatic gluconeogenesis; glucose spills into urine exceeding renal threshold (180 mg/dL).",
        symptoms: "Classic 3 Ps: Polyuria, Polydipsia, Polyphagia, fatigue, weight loss.",
        nursingAction: "Initiate insulin therapy or oral hypoglycemics (Metformin), check urine ketones, foot inspection.",
        gaugeColor: "#ea580c"
      };
    } else {
      return {
        label: "Severe Hyperglycemia / DKA Risk Alert",
        color: "text-red-700 bg-red-100 border-red-300",
        hormone: "Severe Insulin Collapse with Counter-Regulatory Surge",
        metabolism: "Massive lipolysis → Free fatty acids → Liver converts to Ketones (Acetoacetate & β-hydroxybutyrate).",
        symptoms: "Kussmaul breathing (deep/rapid), fruity acetone breath, dehydration, vomiting, altered sensorium.",
        nursingAction: "EMERGENCY: IV Normal Saline bolus, continuous IV regular insulin infusion, strict Potassium (K⁺) monitoring.",
        gaugeColor: "#dc2626"
      };
    }
  };

  const status = getStatus(glucose);

  // Calculate needle rotation angle between -90deg (at 50mg/dL) to +90deg (at 350mg/dL)
  const minG = 50;
  const maxG = 350;
  const clampedG = Math.max(minG, Math.min(maxG, glucose));
  const angle = -90 + ((clampedG - minG) / (maxG - minG)) * 180;

  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-3 mb-4">
        <div>
          <span className="text-[10px] font-extrabold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200">
            Interactive Physiology Simulator
          </span>
          <h4 className="text-sm font-bold text-slate-900 mt-1 flex items-center gap-1.5">
            <Activity className="w-4 h-4 text-emerald-600" />
            <span>Blood Glucose & Cellular Homeostasis Meter</span>
          </h4>
        </div>
        <div className="text-xs text-slate-500 font-medium">
          Drag the slider to observe metabolic & clinical shifts
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
        {/* SVG Dynamic Gauge */}
        <div className="lg:col-span-5 flex flex-col items-center">
          <svg viewBox="0 0 200 120" className="w-52 h-32 overflow-visible">
            {/* Gauge Background Arcs */}
            <defs>
              <linearGradient id="gaugeGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#ef4444" />
                <stop offset="20%" stopColor="#10b981" />
                <stop offset="45%" stopColor="#f59e0b" />
                <stop offset="70%" stopColor="#ea580c" />
                <stop offset="100%" stopColor="#dc2626" />
              </linearGradient>
            </defs>

            {/* Background semi-circle track */}
            <path
              d="M 20 100 A 80 80 0 0 1 180 100"
              fill="none"
              stroke="#e2e8f0"
              strokeWidth="16"
              strokeLinecap="round"
            />
            {/* Colored spectrum track */}
            <path
              d="M 20 100 A 80 80 0 0 1 180 100"
              fill="none"
              stroke="url(#gaugeGrad)"
              strokeWidth="12"
              strokeLinecap="round"
            />

            {/* Gauge Needle with transition */}
            <g transform={`rotate(${angle} 100 100)`} className="transition-transform duration-200 ease-out">
              <line x1="100" y1="100" x2="100" y2="30" stroke="#0f172a" strokeWidth="3" strokeLinecap="round" />
              <polygon points="97,35 103,35 100,22" fill="#0f172a" />
              <circle cx="100" cy="100" r="7" fill="#0f172a" />
              <circle cx="100" cy="100" r="3" fill="#ffffff" />
            </g>

            {/* Labels */}
            <text x="22" y="115" fontSize="8" fill="#64748b" textAnchor="middle" fontWeight="bold">60 (Low)</text>
            <text x="75" y="55" fontSize="8" fill="#10b981" textAnchor="middle" fontWeight="bold">70-99 Normal</text>
            <text x="178" y="115" fontSize="8" fill="#dc2626" textAnchor="middle" fontWeight="bold">300+ (High)</text>
          </svg>

          {/* Current Value Display & Interactive Slider */}
          <div className="w-full max-w-xs text-center mt-1">
            <div className="text-2xl font-black text-slate-900 tracking-tight">
              {glucose} <span className="text-xs font-bold text-slate-500">mg/dL</span>
            </div>
            <input
              type="range"
              min="50"
              max="350"
              step="5"
              value={glucose}
              onChange={(e) => setGlucose(Number(e.target.value))}
              className="w-full accent-emerald-600 mt-2 cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-slate-400 font-semibold px-1 mt-1">
              <span>Severe Low (50)</span>
              <span>Normal (100)</span>
              <span>Crisis (350)</span>
            </div>
          </div>
        </div>

        {/* Dynamic Physiological Response Card */}
        <div className="lg:col-span-7 space-y-3">
          <div className={`p-3 rounded-xl border font-bold text-xs flex items-center justify-between ${status.color}`}>
            <span>Status: {status.label}</span>
            <span className="text-[11px] underline cursor-pointer" onClick={() => setGlucose(95)}>Reset to Normal</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
            <div className="bg-slate-50 p-3 rounded-xl border border-slate-200/80">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wide block">Hormonal Profile</span>
              <p className="font-semibold text-slate-800 mt-0.5">{status.hormone}</p>
            </div>
            <div className="bg-slate-50 p-3 rounded-xl border border-slate-200/80">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wide block">Metabolic Pathway</span>
              <p className="font-semibold text-slate-800 mt-0.5">{status.metabolism}</p>
            </div>
          </div>

          <div className="bg-slate-50 p-3 rounded-xl border border-slate-200/80 text-xs">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wide block">Clinical Signs & Symptoms</span>
            <p className="font-medium text-slate-700 mt-0.5">{status.symptoms}</p>
          </div>

          <div className="bg-emerald-50/80 border border-emerald-200 p-3 rounded-xl text-xs">
            <span className="text-[10px] font-extrabold text-emerald-800 uppercase tracking-wide flex items-center gap-1">
              <CheckCircle className="w-3.5 h-3.5 text-emerald-600" />
              <span>Priority Nursing Action Protocol</span>
            </span>
            <p className="text-emerald-900 font-medium mt-1 leading-relaxed">{status.nursingAction}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

/**
 * 2. Interactive Cardiac Enzyme Kinetics Timeline (Unit 4: Clinical Enzymology)
 * Crisp SVG Multi-Curve Kinetics Graph with Time Stepper
 */
export const CardiacBiomarkerTimeline = () => {
  const [selectedHour, setSelectedHour] = useState(12);

  const timepoints = [
    { label: "2 Hours", hours: 2, desc: "Early onset. Biomarkers still below detection limits. ECG is vital." },
    { label: "6 Hours", hours: 6, desc: "Troponin I and CK-MB begin distinct rise above threshold." },
    { label: "12 Hours", hours: 12, desc: "CK-MB & Troponin I rising rapidly. High sensitivity detection zone." },
    { label: "24 Hours", hours: 24, desc: "PEAK CK-MB & Troponin I elevation. Maximum myocardial damage benchmark." },
    { label: "48 Hours", hours: 48, desc: "CK-MB begins clearance. Troponins remain high. Total LDH rising." },
    { label: "72 Hours", hours: 72, desc: "CK-MB normalized. Troponin stays elevated. LDH-1 > LDH-2 flipped." },
    { label: "7 Days", hours: 168, desc: "Only Cardiac Troponins remain detectable (10-14 day window). Ideal for late presentation." }
  ];

  const currentInfo = timepoints.find((t) => t.hours === selectedHour) || timepoints[2];

  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-3 mb-4">
        <div>
          <span className="text-[10px] font-extrabold uppercase tracking-wider text-purple-700 bg-purple-50 px-2 py-0.5 rounded-md border border-purple-200">
            Interactive Diagnostic Timeline
          </span>
          <h4 className="text-sm font-bold text-slate-900 mt-1 flex items-center gap-1.5">
            <HeartPulse className="w-4 h-4 text-purple-600" />
            <span>Post-Myocardial Infarction Cardiac Enzyme Kinetics</span>
          </h4>
        </div>
        <div className="flex items-center gap-3 text-xs font-semibold">
          <span className="flex items-center gap-1 text-rose-600">
            <span className="w-2.5 h-2.5 rounded-full bg-rose-600 inline-block" /> Troponin I
          </span>
          <span className="flex items-center gap-1 text-emerald-600">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-600 inline-block" /> CK-MB
          </span>
          <span className="flex items-center gap-1 text-sky-600">
            <span className="w-2.5 h-2.5 rounded-full bg-sky-600 inline-block" /> Total LDH
          </span>
        </div>
      </div>

      {/* SVG Kinetic Curves Chart */}
      <div className="relative bg-slate-50 rounded-xl p-3 border border-slate-200/80">
        <svg viewBox="0 0 500 200" className="w-full h-44 overflow-visible">
          {/* Grid lines */}
          <line x1="50" y1="20" x2="480" y2="20" stroke="#e2e8f0" strokeDasharray="3 3" />
          <line x1="50" y1="70" x2="480" y2="70" stroke="#e2e8f0" strokeDasharray="3 3" />
          <line x1="50" y1="120" x2="480" y2="120" stroke="#e2e8f0" strokeDasharray="3 3" />
          <line x1="50" y1="170" x2="480" y2="170" stroke="#cbd5e1" strokeWidth="1.5" />

          {/* Y Axis labels */}
          <text x="45" y="24" fontSize="9" fill="#94a3b8" textAnchor="end">Peak</text>
          <text x="45" y="95" fontSize="9" fill="#94a3b8" textAnchor="end">Moderate</text>
          <text x="45" y="173" fontSize="9" fill="#94a3b8" textAnchor="end">Normal</text>

          {/* Troponin curve (Red): Rises 4h, Peaks 24h, Remains elevated 10-14 days */}
          <path
            d="M 60 170 Q 140 25 180 25 T 320 120 T 480 168"
            fill="none"
            stroke="#e11d48"
            strokeWidth="3.5"
            strokeLinecap="round"
          />

          {/* CK-MB curve (Green): Rises 4-6h, Peaks 18-24h, Clears 48-72h */}
          <path
            d="M 60 170 Q 130 40 170 40 Q 230 170 270 170 L 480 170"
            fill="none"
            stroke="#059669"
            strokeWidth="3"
            strokeLinecap="round"
          />

          {/* LDH curve (Sky Blue): Rises 24h, Peaks 72h, Flips LDH1/2 */}
          <path
            d="M 60 170 L 140 170 Q 220 50 260 50 Q 360 140 440 170"
            fill="none"
            stroke="#0284c7"
            strokeWidth="2.5"
            strokeDasharray="4 2"
            strokeLinecap="round"
          />

          {/* Time Marker Vertical Guideline */}
          {selectedHour === 2 && <line x1="75" y1="20" x2="75" y2="170" stroke="#0f172a" strokeWidth="2" strokeDasharray="4 2" />}
          {selectedHour === 6 && <line x1="110" y1="20" x2="110" y2="170" stroke="#0f172a" strokeWidth="2" strokeDasharray="4 2" />}
          {selectedHour === 12 && <line x1="145" y1="20" x2="145" y2="170" stroke="#0f172a" strokeWidth="2" strokeDasharray="4 2" />}
          {selectedHour === 24 && <line x1="175" y1="20" x2="175" y2="170" stroke="#0f172a" strokeWidth="2" strokeDasharray="4 2" />}
          {selectedHour === 48 && <line x1="225" y1="20" x2="225" y2="170" stroke="#0f172a" strokeWidth="2" strokeDasharray="4 2" />}
          {selectedHour === 72 && <line x1="260" y1="20" x2="260" y2="170" stroke="#0f172a" strokeWidth="2" strokeDasharray="4 2" />}
          {selectedHour === 168 && <line x1="380" y1="20" x2="380" y2="170" stroke="#0f172a" strokeWidth="2" strokeDasharray="4 2" />}

          {/* X Axis Time Labels */}
          <text x="60" y="185" fontSize="9" fill="#64748b" textAnchor="middle">0h</text>
          <text x="110" y="185" fontSize="9" fill="#64748b" textAnchor="middle">6h</text>
          <text x="175" y="185" fontSize="9" fill="#64748b" textAnchor="middle">24h</text>
          <text x="225" y="185" fontSize="9" fill="#64748b" textAnchor="middle">48h</text>
          <text x="260" y="185" fontSize="9" fill="#64748b" textAnchor="middle">3 Days</text>
          <text x="380" y="185" fontSize="9" fill="#64748b" textAnchor="middle">7 Days</text>
          <text x="470" y="185" fontSize="9" fill="#64748b" textAnchor="middle">14 Days</text>
        </svg>
      </div>

      {/* Interactive Time Selector Buttons */}
      <div className="flex items-center gap-1.5 overflow-x-auto mt-4 pb-1 scrollbar-none">
        {timepoints.map((t) => (
          <button
            key={t.hours}
            onClick={() => setSelectedHour(t.hours)}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
              selectedHour === t.hours
                ? "bg-purple-700 text-white shadow-xs scale-102"
                : "bg-slate-100 text-slate-600 hover:bg-slate-200"
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* Selected Timepoint Clinical Interpretation */}
      <div className="mt-3 p-3.5 rounded-xl bg-purple-50/70 border border-purple-200/80 text-xs flex items-start gap-2.5">
        <Info className="w-4 h-4 text-purple-700 shrink-0 mt-0.5" />
        <div>
          <span className="font-extrabold text-purple-900 block">
            Clinical Window: {currentInfo.label} Post-Infarction
          </span>
          <p className="text-purple-950 font-medium mt-0.5 leading-relaxed">
            {currentInfo.desc}
          </p>
        </div>
      </div>
    </div>
  );
};

/**
 * 3. Interactive Arterial Blood Gas (ABG) Diagnostic Analyzer (Unit 5)
 */
export const ABGDiagnosticCalculator = () => {
  const [ph, setPh] = useState(7.30);
  const [paco2, setPaco2] = useState(50);
  const [hco3, setHco3] = useState(24);

  const analyzeABG = () => {
    const isAcidemia = ph < 7.35;
    const isAlkalemia = ph > 7.45;
    const isNormalPh = !isAcidemia && !isAlkalemia;

    const highCo2 = paco2 > 45;
    const lowCo2 = paco2 < 35;
    const highHco3 = hco3 > 26;
    const lowHco3 = hco3 < 22;

    if (isNormalPh) {
      if (highCo2 && highHco3) return { condition: "Fully Compensated Respiratory Acidosis or Metabolic Alkalosis", tag: "Compensated", color: "text-emerald-700 bg-emerald-50 border-emerald-200" };
      return { condition: "Normal Blood Gas Homeostasis (pH 7.35–7.45)", tag: "Normal", color: "text-emerald-700 bg-emerald-50 border-emerald-200" };
    }

    if (isAcidemia) {
      if (highCo2 && !lowHco3) {
        return {
          condition: "Respiratory Acidosis (Hypoventilation / COPD / Sedation)",
          tag: "Respiratory",
          color: "text-rose-700 bg-rose-50 border-rose-200",
          action: "Support ventilation, check airway patency, titrate O₂, consider bronchodilators or Naloxone if opioid-induced."
        };
      }
      if (lowHco3 && !highCo2) {
        return {
          condition: "Metabolic Acidosis (DKA / Lactic Acidosis / Renal Failure)",
          tag: "Metabolic",
          color: "text-rose-700 bg-rose-50 border-rose-200",
          action: "Calculate Serum Anion Gap, administer IV regular insulin + fluids if DKA, evaluate renal function."
        };
      }
      return {
        condition: "Combined / Mixed Acidosis (Critical)",
        tag: "Critical Mixed",
        color: "text-red-700 bg-red-100 border-red-300",
        action: "Intensive care resuscitation. Urgent dual respiratory and metabolic correction required."
      };
    }

    if (isAlkalemia) {
      if (lowCo2 && !highHco3) {
        return {
          condition: "Respiratory Alkalosis (Hyperventilation / Panic / Pulmonary Embolism)",
          tag: "Respiratory",
          color: "text-sky-700 bg-sky-50 border-sky-200",
          action: "Reassure patient, calm breathing rhythm, treat underlying fever, pain, or pulmonary hypoxemia."
        };
      }
      if (highHco3 && !lowCo2) {
        return {
          condition: "Metabolic Alkalosis (Severe Vomiting / Nasogastric Suction / Diuretics)",
          tag: "Metabolic",
          color: "text-sky-700 bg-sky-50 border-sky-200",
          action: "Check serum potassium (hypokalemia risk), administer IV isotonic saline, stop diuretic loss."
        };
      }
      return {
        condition: "Mixed Alkalosis",
        tag: "Mixed",
        color: "text-sky-700 bg-sky-50 border-sky-200",
        action: "Address both respiratory and metabolic triggers promptly."
      };
    }

    return { condition: "Complex State", tag: "Borderline", color: "text-slate-700 bg-slate-50 border-slate-200" };
  };

  const result = analyzeABG();

  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-3 mb-4">
        <div>
          <span className="text-[10px] font-extrabold uppercase tracking-wider text-rose-700 bg-rose-50 px-2 py-0.5 rounded-md border border-rose-200">
            Interactive Diagnostic Analyzer
          </span>
          <h4 className="text-sm font-bold text-slate-900 mt-1 flex items-center gap-1.5">
            <Scale className="w-4 h-4 text-rose-600" />
            <span>Arterial Blood Gas (ABG) & ROME Rule Calculator</span>
          </h4>
        </div>
        <div className="text-xs text-slate-500 font-semibold">
          ROME: Respiratory Opposite • Metabolic Equal
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* pH Control */}
        <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200">
          <div className="flex justify-between items-center text-xs mb-1">
            <span className="font-bold text-slate-700">Arterial pH</span>
            <span className="font-black text-slate-900 text-sm">{ph.toFixed(2)}</span>
          </div>
          <input
            type="range"
            min="7.10"
            max="7.60"
            step="0.01"
            value={ph}
            onChange={(e) => setPh(Number(e.target.value))}
            className="w-full accent-rose-600 cursor-pointer"
          />
          <div className="flex justify-between text-[10px] text-slate-400 mt-1 font-semibold">
            <span>Acidemia (&lt;7.35)</span>
            <span>Normal (7.40)</span>
            <span>Alkalemia (&gt;7.45)</span>
          </div>
        </div>

        {/* PaCO2 Control */}
        <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200">
          <div className="flex justify-between items-center text-xs mb-1">
            <span className="font-bold text-slate-700">PaCO₂ (Respiratory)</span>
            <span className="font-black text-slate-900 text-sm">{paco2} mmHg</span>
          </div>
          <input
            type="range"
            min="20"
            max="65"
            step="1"
            value={paco2}
            onChange={(e) => setPaco2(Number(e.target.value))}
            className="w-full accent-rose-600 cursor-pointer"
          />
          <div className="flex justify-between text-[10px] text-slate-400 mt-1 font-semibold">
            <span>Hypocapnia (&lt;35)</span>
            <span>Normal (35-45)</span>
            <span>Hypercapnia (&gt;45)</span>
          </div>
        </div>

        {/* HCO3- Control */}
        <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200">
          <div className="flex justify-between items-center text-xs mb-1">
            <span className="font-bold text-slate-700">HCO₃⁻ (Renal / Metabolic)</span>
            <span className="font-black text-slate-900 text-sm">{hco3} mEq/L</span>
          </div>
          <input
            type="range"
            min="12"
            max="38"
            step="1"
            value={hco3}
            onChange={(e) => setHco3(Number(e.target.value))}
            className="w-full accent-rose-600 cursor-pointer"
          />
          <div className="flex justify-between text-[10px] text-slate-400 mt-1 font-semibold">
            <span>Low (&lt;22)</span>
            <span>Normal (22-26)</span>
            <span>High (&gt;26)</span>
          </div>
        </div>
      </div>

      {/* Result Card */}
      <div className={`mt-4 p-4 rounded-xl border text-xs ${result.color}`}>
        <div className="flex items-center justify-between font-bold text-sm">
          <span>Interpretation: {result.condition}</span>
          <span className="px-2 py-0.5 rounded-md bg-white/70 text-slate-900 text-[10px] uppercase">
            {result.tag}
          </span>
        </div>
        {result.action && (
          <p className="mt-2 text-slate-800 font-medium leading-relaxed">
            <strong>Clinical Nursing Intervention:</strong> {result.action}
          </p>
        )}
      </div>
    </div>
  );
};

/**
 * 4. Interactive Y-Shaped Immunoglobulin Architecture (Unit 7: Immunochemistry)
 * Crisp Vector SVG with Clickable Structural Regions
 */
export const InteractiveAntibodyDiagram = () => {
  const [selectedPart, setSelectedPart] = useState("fab");

  const parts = {
    fab: {
      name: "Fab Fragment (Fragment Antigen-Binding)",
      desc: "Contains the hypervariable complementarity-determining regions (CDRs). Formed by 1 Light chain and N-terminal half of Heavy chain. Binds specifically to unique foreign antigen epitopes.",
      clinicalRole: "Crucial for direct antibody neutralization of bacterial exotoxins and viral entry blocks. Forms the basis of ELISA antibody-capture assays."
    },
    fc: {
      name: "Fc Region (Fragment Crystallizable)",
      desc: "Formed by C-terminal halves of the two Heavy chains linked by interchain disulfide bonds. Constant region determining the antibody isotype (IgG, IgA, IgM, IgE, IgD).",
      clinicalRole: "Binds to Fc receptors on macrophages/neutrophils (opsonization) and initiates the Classical Complement Pathway (C1q activation). Crosses placenta via neonatal Fc receptor (FcRn) in IgG."
    },
    heavy: {
      name: "Heavy Chains (γ, α, μ, ε, δ)",
      desc: "Two identical heavy polypeptide chains (~50 kDa each). Contain 1 variable (VH) and 3 to 4 constant domains (CH1, CH2, CH3, CH4).",
      clinicalRole: "Heavy chain isotype determines physical distribution (e.g., dimeric sIgA in breast milk vs 19S pentameric IgM in vascular space)."
    },
    light: {
      name: "Light Chains (κ or λ)",
      desc: "Two identical light polypeptide chains (~25 kDa each). Each immunoglobulin monomer has EITHER two Kappa (κ) OR two Lambda (λ) chains (never mixed).",
      clinicalRole: "Normal κ:λ ratio in human serum is ~2:1. An abnormal κ:λ ratio indicates monoclonal gammopathy or Multiple Myeloma (Bence Jones proteins)."
    },
    hinge: {
      name: "Flexible Hinge Region",
      desc: "Proline- and cysteine-rich flexible peptide sequence holding the two heavy chains together with disulfide (-S-S-) bridges.",
      clinicalRole: "Enables variable angles of the two Fab arms to bind dual antigens spaced at different distances on bacterial cell walls."
    }
  };

  const active = parts[selectedPart];

  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-3 mb-4">
        <div>
          <span className="text-[10px] font-extrabold uppercase tracking-wider text-cyan-700 bg-cyan-50 px-2 py-0.5 rounded-md border border-cyan-200">
            Interactive Structural Diagram
          </span>
          <h4 className="text-sm font-bold text-slate-900 mt-1 flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-cyan-600" />
            <span>Immunoglobulin G (IgG) Y-Shaped Molecular Architecture</span>
          </h4>
        </div>
        <span className="text-xs text-slate-500 font-medium">Click regions on the diagram to inspect</span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
        {/* Crisp Vector SVG Illustration */}
        <div className="lg:col-span-5 flex justify-center">
          <svg viewBox="0 0 300 280" className="w-64 h-60">
            {/* Left Fab Arm */}
            <g
              onClick={() => setSelectedPart("fab")}
              className="cursor-pointer group"
            >
              {/* Variable Region */}
              <rect x="40" y="30" width="30" height="40" rx="6" fill={selectedPart === "fab" ? "#06b6d4" : "#e0f2fe"} stroke="#0284c7" strokeWidth="2" />
              <rect x="75" y="30" width="30" height="40" rx="6" fill={selectedPart === "fab" ? "#0284c7" : "#bae6fd"} stroke="#0284c7" strokeWidth="2" />
              <text x="55" y="55" fontSize="9" fill="#0369a1" fontWeight="bold" textAnchor="middle">VL</text>
              <text x="90" y="55" fontSize="9" fill="#0369a1" fontWeight="bold" textAnchor="middle">VH</text>
            </g>

            {/* Right Fab Arm */}
            <g
              onClick={() => setSelectedPart("fab")}
              className="cursor-pointer group"
            >
              <rect x="195" y="30" width="30" height="40" rx="6" fill={selectedPart === "fab" ? "#0284c7" : "#bae6fd"} stroke="#0284c7" strokeWidth="2" />
              <rect x="230" y="30" width="30" height="40" rx="6" fill={selectedPart === "fab" ? "#06b6d4" : "#e0f2fe"} stroke="#0284c7" strokeWidth="2" />
              <text x="210" y="55" fontSize="9" fill="#0369a1" fontWeight="bold" textAnchor="middle">VH</text>
              <text x="245" y="55" fontSize="9" fill="#0369a1" fontWeight="bold" textAnchor="middle">VL</text>
            </g>

            {/* Antigen bindings stars */}
            <circle cx="55" cy="20" r="5" fill="#f59e0b" />
            <circle cx="245" cy="20" r="5" fill="#f59e0b" />
            <text x="150" y="20" fontSize="8" fill="#d97706" textAnchor="middle" fontWeight="bold">Ag Binding Sites</text>

            {/* Fab Constant Segments */}
            <rect x="50" y="75" width="25" height="45" rx="5" fill="#e2e8f0" stroke="#64748b" strokeWidth="1.5" />
            <rect x="80" y="75" width="25" height="45" rx="5" fill="#cbd5e1" stroke="#64748b" strokeWidth="1.5" />
            <rect x="195" y="75" width="25" height="45" rx="5" fill="#cbd5e1" stroke="#64748b" strokeWidth="1.5" />
            <rect x="225" y="75" width="25" height="45" rx="5" fill="#e2e8f0" stroke="#64748b" strokeWidth="1.5" />

            {/* Hinge Region */}
            <g onClick={() => setSelectedPart("hinge")} className="cursor-pointer">
              <path d="M 95 120 C 110 140, 130 145, 135 155" fill="none" stroke={selectedPart === "hinge" ? "#f59e0b" : "#475569"} strokeWidth="4" />
              <path d="M 205 120 C 190 140, 170 145, 165 155" fill="none" stroke={selectedPart === "hinge" ? "#f59e0b" : "#475569"} strokeWidth="4" />
              <line x1="135" y1="145" x2="165" y2="145" stroke="#ef4444" strokeWidth="2.5" />
              <text x="150" y="140" fontSize="7" fill="#dc2626" textAnchor="middle" fontWeight="bold">-S-S-</text>
            </g>

            {/* Fc Stem (CH2 & CH3 domains) */}
            <g onClick={() => setSelectedPart("fc")} className="cursor-pointer">
              <rect x="125" y="155" width="24" height="48" rx="6" fill={selectedPart === "fc" ? "#818cf8" : "#f1f5f9"} stroke="#4f46e5" strokeWidth="2" />
              <rect x="151" y="155" width="24" height="48" rx="6" fill={selectedPart === "fc" ? "#818cf8" : "#f1f5f9"} stroke="#4f46e5" strokeWidth="2" />
              <rect x="125" y="208" width="24" height="48" rx="6" fill={selectedPart === "fc" ? "#6366f1" : "#e2e8f0"} stroke="#4f46e5" strokeWidth="2" />
              <rect x="151" y="208" width="24" height="48" rx="6" fill={selectedPart === "fc" ? "#6366f1" : "#e2e8f0"} stroke="#4f46e5" strokeWidth="2" />
              <text x="150" y="185" fontSize="8" fill="#4338ca" fontWeight="bold" textAnchor="middle">CH2</text>
              <text x="150" y="238" fontSize="8" fill="#4338ca" fontWeight="bold" textAnchor="middle">CH3 (Fc)</text>
            </g>
          </svg>
        </div>

        {/* Region Details Inspector */}
        <div className="lg:col-span-7 space-y-3">
          <div className="flex flex-wrap gap-1.5 pb-1">
            {Object.keys(parts).map((key) => (
              <button
                key={key}
                onClick={() => setSelectedPart(key)}
                className={`px-3 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  selectedPart === key
                    ? "bg-cyan-700 text-white shadow-xs"
                    : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                }`}
              >
                {key.toUpperCase()}
              </button>
            ))}
          </div>

          <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 text-xs">
            <h5 className="font-extrabold text-slate-900 text-sm mb-1">{active.name}</h5>
            <p className="text-slate-700 leading-relaxed font-medium">{active.desc}</p>
          </div>

          <div className="bg-cyan-50/80 border border-cyan-200 p-3.5 rounded-xl text-xs">
            <span className="text-[10px] font-extrabold text-cyan-800 uppercase tracking-wide flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5 text-cyan-600" />
              <span>Clinical & Laboratory Significance</span>
            </span>
            <p className="text-cyan-950 font-medium mt-1 leading-relaxed">{active.clinicalRole}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

/**
 * 5. Interactive Clinical Diagnostic Case Challenge
 */
export const ClinicalCaseChallenge = ({ unitNumber }) => {
  const [revealed, setRevealed] = useState(false);

  const cases = {
    2: {
      title: "Unit 2 Clinical Case: Dyslipidemia & Premature CAD",
      vignette: "A 42-year-old male presents for a routine executive health checkup. Physical exam reveals yellowish deposits on his Achilles tendons (tendon xanthomas) and yellowish papules around his eyelids (xanthelasma). Fasting lipid panel reveals Total Cholesterol 340 mg/dL, LDL-C 240 mg/dL, HDL 42 mg/dL, and Triglycerides 160 mg/dL.",
      question: "What is the primary metabolic defect, which lipoprotein receptor is deficient, and what is the nursing priority?",
      answer: "Familial Hypercholesterolemia (Type IIa)",
      rationales: [
        "Defect: Mutations in the LDL receptor gene prevent hepatic endocytosis and clearance of LDL particles from circulation.",
        "Clinical Consequence: Accelerated atherogenesis leading to premature coronary artery disease (CAD).",
        "Nursing Priority: Counsel on strict Low-Saturated-Fat, High-Soluble-Fiber diet; monitor compliance with Statin therapy (HMG-CoA Reductase inhibitors); educate on chest pain warning signs."
      ]
    },
    3: {
      title: "Unit 3 Clinical Case: Hyperammonemia in Hepatic Cirrhosis",
      vignette: "A 54-year-old female with alcohol-induced end-stage liver cirrhosis is admitted with progressive confusion, drowsiness, and bilateral flapping tremors (asterixis) of the outstretched hands. Serum Blood Urea Nitrogen is low (6 mg/dL), but plasma arterial ammonia is markedly elevated (135 µmol/L; normal 15–45 µmol/L).",
      question: "Which hepatic cycle is failing to detoxify ammonia, and why does hyperammonemia cause cerebral dysfunction?",
      answer: "Hepatic Urea Cycle (Krebs-Henseleit Cycle) Failure",
      rationales: [
        "Defect: Hepatocyte necrosis impairs the 5 enzymatic steps of the Urea Cycle, preventing conversion of toxic free NH₃ into water-soluble Urea for renal excretion.",
        "Cerebral Toxicity: Excess ammonia crosses the blood-brain barrier, driving excessive glutamine synthesis inside astrocytes → astrocyte swelling, cerebral edema, and decreased alpha-ketoglutarate in TCA cycle.",
        "Nursing Priority: Administer Lactulose (traps NH₄⁺ in stool via osmotic acidification) and Rifaximin; restrict excessive dietary animal protein; monitor Glasgow Coma Scale (GCS)."
      ]
    },
    6: {
      title: "Unit 6 Clinical Case: Obstructive (Post-Hepatic) Jaundice",
      vignette: "A 62-year-old female presents with deep jaundice (icterus) of the sclera, clay-colored (pale) stools, dark 'tea-colored' urine, and intense generalized pruritus. Laboratory investigation shows Total Bilirubin 9.8 mg/dL with Direct (Conjugated) Bilirubin 8.2 mg/dL. Serum Alkaline Phosphatase (ALP) is 450 U/L.",
      question: "What is the biochemical cause of clay-colored stools and dark tea-colored urine in biliary obstruction?",
      answer: "Choledocholithiasis / Extrahepatic Biliary Duct Obstruction",
      rationales: [
        "Clay-colored Stools: Bilirubin diglucuronide cannot reach the intestinal lumen; absence of stercobilinogen synthesis by gut bacteria deprives feces of normal brown pigment.",
        "Dark Tea-colored Urine: Water-soluble conjugated bilirubin regurgitates back into hepatic sinusoids and blood, being filtered by the glomeruli into urine.",
        "Pruritus: Retention of bile salts in skin tissues causes intense itching.",
        "Nursing Priority: Monitor stool/urine colors, check Prothrombin Time (PT/INR) due to impaired Vitamin K absorption (fat-soluble), and maintain skin hygiene without skin tears."
      ]
    }
  };

  const currentCase = cases[unitNumber] || cases[2];

  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-3 mb-4">
        <div>
          <span className="text-[10px] font-extrabold uppercase tracking-wider text-amber-700 bg-amber-50 px-2 py-0.5 rounded-md border border-amber-200">
            Interactive NCLEX Clinical Challenge
          </span>
          <h4 className="text-sm font-bold text-slate-900 mt-1 flex items-center gap-1.5">
            <AlertTriangle className="w-4 h-4 text-amber-600" />
            <span>{currentCase.title}</span>
          </h4>
        </div>
        <span className="text-xs text-slate-500 font-medium">Test clinical reasoning before revealing diagnosis</span>
      </div>

      <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 text-xs">
        <p className="font-bold text-slate-500 uppercase tracking-wider text-[10px] mb-1">Patient Presentation</p>
        <p className="text-slate-800 leading-relaxed font-medium">{currentCase.vignette}</p>
        
        <div className="mt-3 pt-3 border-t border-slate-200">
          <p className="font-extrabold text-slate-900 flex items-center gap-1.5">
            <HelpCircle className="w-4 h-4 text-amber-600" />
            <span>Diagnostic Question: {currentCase.question}</span>
          </p>
        </div>
      </div>

      <div className="mt-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <button
          onClick={() => setRevealed(!revealed)}
          className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs transition-all shadow-xs cursor-pointer flex items-center justify-center gap-2"
        >
          <span>{revealed ? "Hide Diagnostic Findings" : "Reveal Diagnosis & Clinical Nursing Action"}</span>
          <ArrowRight className={`w-3.5 h-3.5 transition-transform ${revealed ? "rotate-90" : ""}`} />
        </button>
        <span className="text-[11px] text-slate-400 font-medium">Click to self-test clinical rationale</span>
      </div>

      {revealed && (
        <div className="mt-4 p-4 rounded-xl bg-emerald-50/80 border border-emerald-200 text-xs space-y-2.5 animate-in fade-in duration-200">
          <div className="flex items-center gap-2">
            <CheckCircle className="w-4 h-4 text-emerald-600" />
            <span className="text-emerald-900 font-black text-sm">
              Confirmed Diagnosis: {currentCase.answer}
            </span>
          </div>
          <ul className="space-y-1.5 pl-6 list-disc text-emerald-950 font-medium leading-relaxed">
            {currentCase.rationales.map((r, i) => (
              <li key={i}>{r}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

