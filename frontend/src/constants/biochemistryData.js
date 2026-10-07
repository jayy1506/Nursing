// Standardized 7-Unit Nursing Biochemistry Curriculum Data
// Standardized for B.Sc. Nursing & Clinical Enzymology

export const SYLLABUS_MODULES = [
  {
    id: "unit-1-carbs",
    unitNumber: 1,
    title: "Carbohydrate Metabolism & Glucose Homeostasis",
    category: "Carbohydrates",
    icon: "🧬",
    color: "from-emerald-500 to-teal-600",
    badgeColor: "bg-emerald-50 text-emerald-700 border-emerald-200",
    summary: "Monosaccharides, 10 enzymatic reactions of Glycolysis, TCA Cycle energetics, and Diabetes Mellitus management.",
    objectives: [
      "Explain carbohydrate definition, functional groups, and classification (Monosaccharides, Disaccharides, Polysaccharides, Oligosaccharides)",
      "Describe the 10 enzymatic steps of Glycolysis, rate-limiting PFK-1 regulation, and complete Energetics (Net 2 ATP anaerobic vs 8 ATP aerobic)",
      "Outline the 10 reactions of the Citric Acid (Krebs / TCA) Cycle yielding 12 ATP per Acetyl-CoA",
      "Explain the digestion (salivary & pancreatic amylase, brush border enzymes) and absorption (SGLT1 secondary active transport, GLUT5 facilitated diffusion, GLUT2 exit)",
      "Describe Gluconeogenesis, Glycogenolysis, and Glucose Homeostasis mechanisms",
      "Analyze hormonal regulation (Insulin vs Glucagon) and clinical investigations (FBS <100 mg/dL, PPBS <140 mg/dL)",
      "Detail the pathophysiology, symptoms, acute complications (DKA vs HHS), and insulin management of Diabetes Mellitus (Types 1 & 2)"
    ],
    formulas: [
      {
        name: "Anaerobic Glycolysis Energetics",
        formula: "1 Glucose + 2 ADP + 2 Pi → 2 Lactate + 2 ATP (Net Yield = 2 ATP)"
      },
      {
        name: "Aerobic Glycolysis Energetics",
        formula: "1 Glucose + 2 NAD⁺ + 2 ADP + 2 Pi → 2 Pyruvate + 2 NADH (6 ATP) + 4 ATP - 2 ATP = Net 8 ATP"
      },
      {
        name: "Citric Acid Cycle Yield per Acetyl-CoA",
        formula: "1 Acetyl-CoA → 3 NADH (9 ATP) + 1 FADH₂ (2 ATP) + 1 GTP (1 ATP) = Total 12 ATP"
      },
      {
        name: "Complete Glucose Oxidation (Aerobic)",
        formula: "C₆H₁₂O₆ + 6 O₂ → 6 CO₂ + 6 H₂O + 30–32 ATP"
      }
    ],
    clinicalRanges: [
      { parameter: "Fasting Blood Sugar (FBS)", normal: "70 – 99 mg/dL", prediabetes: "100 – 125 mg/dL", diabetes: "≥ 126 mg/dL" },
      { parameter: "Postprandial (2-hr PPBS)", normal: "< 140 mg/dL", prediabetes: "140 – 199 mg/dL", diabetes: "≥ 200 mg/dL" },
      { parameter: "Glycated Hemoglobin (HbA1c)", normal: "< 5.7%", prediabetes: "5.7 – 6.4%", diabetes: "≥ 6.5%" }
    ],
    memoryHook: "My Sweet Love = Maltose (Glu+Glu), Sucrose (Glu+Fru), Lactose (Gal+Glu). SGLT1 = Sodium-dependent co-transport.",
    topics: [
      { label: "Classification of Carbohydrates", route: "/classification-of-carb" },
      { label: "Digestion of Carbohydrates", route: "/digestion-of-carb" },
      { label: "Absorption of Carbohydrates", route: "/absorption-of-carb" },
      { label: "Metabolic Pathways (Glycolysis & TCA Cycle)", route: "/MetabolicPathwaysOfCarb" },
      { label: "Disorders of Carbohydrate Metabolism", route: "/DisordersOfCarb" },
      { label: "Regulation of Blood Glucose", route: "/RegulationOfBloodGlucose" },
      { label: "Diabetes Mellitus Type 1 (DKA)", route: "/DiabetesMellitusType1" },
      { label: "Diabetes Mellitus Type 2 (HHS & Management)", route: "/DiabetesMellitusType2" }
    ],
    quizSlug: "unit-1-carbs"
  },
  {
    id: "unit-2-lipids",
    unitNumber: 2,
    title: "Lipid Chemistry, Fatty Acids & β-Oxidation",
    category: "Lipids",
    icon: "🥑",
    color: "from-sky-500 to-indigo-600",
    badgeColor: "bg-sky-50 text-sky-700 border-sky-200",
    summary: "Fatty acid classification (MUFA/PUFA/EFA), Lipoprotein transport, and 106 ATP yield from Palmitate β-Oxidation.",
    objectives: [
      "Define lipids and classify into Simple (fats/oils/waxes), Compound (phospholipids/glycolipids/lipoproteins), and Derived lipids",
      "Describe physical properties of fatty acids (saturation, chain length, melting point) and dietary sources",
      "Classify fatty acids (Even/Odd, Short/Medium/Long chain, Saturated, MUFA, PUFA, Trans-fatty acids)",
      "Explain the clinical importance of MUFA (Oleic acid in Mediterranean diet) and PUFA (Omega-3 EPA/DHA vs Omega-6 Linoleic)",
      "Explain Essential Fatty Acids (Linoleic & α-Linolenic) and why humans cannot insert double bonds beyond carbon 9",
      "Describe lipid digestion (lingual/gastric/pancreatic lipase), mixed micelle formation, and absorption by enterocytes",
      "Explain lipid transport via Lipoproteins (Chylomicrons, VLDL, LDL, HDL) and albumin",
      "Detail the 4 mitochondrial reactions of β-Oxidation of fatty acids and Palmitoyl-CoA energetics",
      "Describe Cholesterol biosynthesis (HMG-CoA Reductase), Steroid hormones, Vitamin D (Calcitriol), and Bile acids",
      "Explain Ketone body synthesis (Acetoacetate, β-Hydroxybutyrate, Acetone) and clinical significance in starvation/DKA"
    ],
    formulas: [
      {
        name: "Palmitate (16C) β-Oxidation Yield",
        formula: "Palmitoyl-CoA + 7 FAD + 7 NAD⁺ + 7 CoASH + 7 H₂O → 8 Acetyl-CoA + 7 FADH₂ + 7 NADH"
      },
      {
        name: "Net ATP from Palmitic Acid",
        formula: "(8 × 10 ATP) + (7 × 1.5 FADH₂) + (7 × 2.5 NADH) - 2 ATP (Activation) = Net 106 ATP"
      },
      {
        name: "Energy Density of Lipids",
        formula: "1 Gram of Lipid Oxidation = 9.1 to 9.3 kcal (vs 4.1 kcal/g for Carbohydrates)"
      }
    ],
    clinicalRanges: [
      { parameter: "Total Serum Cholesterol", normal: "< 200 mg/dL", prediabetes: "200 – 239 mg/dL", diabetes: "≥ 240 mg/dL (High)" },
      { parameter: "LDL ('Bad') Cholesterol", normal: "< 100 mg/dL", prediabetes: "100 – 159 mg/dL", diabetes: "≥ 160 mg/dL (High)" },
      { parameter: "HDL ('Good') Cholesterol", normal: "> 50 mg/dL (Females), > 40 mg/dL (Males)", prediabetes: "Borderline", diabetes: "< 40 mg/dL (Low Risk)" }
    ],
    memoryHook: "Oleic = One double bond (MUFA). Linolenic = 3 double bonds (Omega-3). DKA = Diuresis, Kussmaul, Abdominal pain.",
    topics: [
      { label: "Classification of Fatty Acids", route: "/FattyAcidsClassification" },
      { label: "Monounsaturated Fatty Acids (MUFA)", route: "/MUFA" },
      { label: "Polyunsaturated Fatty Acids (PUFA)", route: "/PUFA" },
      { label: "Essential Fatty Acids & Eicosanoids", route: "/EssentialFattyAcids" }
    ],
    quizSlug: "unit-2-lipids"
  },
  {
    id: "unit-3-proteins",
    unitNumber: 3,
    title: "Proteins, Amino Acids & Urea Cycle",
    category: "Proteins",
    icon: "🥩",
    color: "from-amber-500 to-orange-600",
    badgeColor: "bg-amber-50 text-amber-700 border-amber-200",
    summary: "Protein hierarchy, Zwitterion chemistry, 5 enzymatic steps of the hepatic Urea Cycle, and ammonia toxicity.",
    objectives: [
      "Define proteins and classify by function (Structural, Catalytic, Transport, Defense), composition (Simple/Conjugated/Derived), and nutrition (Complete vs Incomplete)",
      "Describe the four levels of protein structure (Primary, Secondary α/β, Tertiary 3D, Quaternary subunits)",
      "Explain protein Denaturation (loss of 3D conformation without peptide bond cleavage) and its biological importance",
      "Classify standard amino acids based on side-chain structure, polarity, nutrition (Essential vs Non-essential), and metabolic fate (Glucogenic vs Ketogenic)",
      "Explain physical and chemical properties of amino acids (Zwitterion formation, Isoelectric pH / pI, optical activity)",
      "Detail protein digestion by gastric secretions (HCl, Pepsin), pancreatic proteases (Trypsin, Chymotrypsin, Elastase), and intestinal aminopeptidases",
      "Describe amino acid absorption mechanisms across intestinal enterocytes and transport to the liver",
      "Explain the 5 enzymatic steps of the Urea Cycle in the liver (CPS-I committed step, Citrulline, Argininosuccinate, Arginine, Urea)",
      "Define the normal blood urea level (20–40 mg/dL) and clinical significance of hyperammonemia in liver cirrhosis"
    ],
    formulas: [
      {
        name: "Overall Urea Synthesis Equation",
        formula: "NH₃ + CO₂ + Aspartate + 3 ATP + 2 H₂O → Urea + Fumarate + 2 ADP + AMP + 2 Pi + PPi"
      },
      {
        name: "Kjeldahl Protein-Nitrogen Factor",
        formula: "Total Protein (g/100g) = Total Nitrogen Content (g) × 6.25 (since average nitrogen is 16%)"
      }
    ],
    clinicalRanges: [
      { parameter: "Serum Blood Urea", normal: "20 – 40 mg/dL", prediabetes: "40 – 60 mg/dL", diabetes: "> 60 mg/dL (Azotemia)" },
      { parameter: "Blood Urea Nitrogen (BUN)", normal: "7 – 20 mg/dL", prediabetes: "20 – 30 mg/dL", diabetes: "> 30 mg/dL" },
      { parameter: "Total Serum Protein", normal: "6.0 – 8.3 g/dL", prediabetes: "Serum Albumin: 3.5 – 5.0 g/dL", diabetes: "Serum Globulin: 2.0 – 3.5 g/dL" }
    ],
    memoryHook: "Ordinarily Careless Crappers Are Also Frivolous = Ornithine, Carbamoyl P, Citrulline, Aspartate, Argininosuccinate, Fumarate, Arginine, Urea.",
    topics: [
      { label: "Protein Structure & Denaturation", route: "/classification-of-carb" },
      { label: "Amino Acid Chemistry & Zwitterions", route: "/digestion-of-carb" },
      { label: "Protein Digestion & Absorption", route: "/absorption-of-carb" },
      { label: "Urea Cycle & Ammonia Detoxification", route: "/MetabolicPathwaysOfCarb" }
    ],
    quizSlug: "unit-3-proteins"
  },
  {
    id: "unit-4-enzymes",
    unitNumber: 4,
    title: "Clinical Enzymology & Myocardial Infarction",
    category: "Enzymology",
    icon: "⏱️",
    color: "from-purple-500 to-indigo-600",
    badgeColor: "bg-purple-50 text-purple-700 border-purple-200",
    summary: "Michaelis-Menten kinetics, competitive vs non-competitive inhibition, and MI cardiac biomarkers (CK-MB, Troponin, LDH).",
    objectives: [
      "Define enzymes, catalysts, active sites, and co-factors/co-enzymes",
      "Explain the two theories of enzyme action: Lock & Key model of Emil Fischer vs Induced Fit model of Daniel Koshland",
      "Describe factors affecting enzyme activity: Substrate concentration (Km & Vmax), Enzyme concentration, pH, Temperature, and Activators",
      "Classify enzyme inhibitors: Reversible (Competitive, Non-competitive, Uncompetitive) vs Irreversible (Group-specific, Suicide inhibitors)",
      "Explain enzyme specificity types: Absolute, Relative, Reaction, and Optical stereospecificity",
      "Define Isoenzymes and detail clinical applications of Lactate Dehydrogenase (LDH-1 to LDH-5) and Creatine Kinase (CK-BB, CK-MB, CK-MM)",
      "Explain Myocardial Infarction (MI) diagnosis: Cardiac enzyme kinetics (CK-MB rises 4–6h, peaks 12–24h; Troponins remain 10–14d; LDH-1/LDH-2 flip)",
      "Identify clinical features, risk factors, and underlying etiology of acute coronary syndrome and myocardial necrosis"
    ],
    formulas: [
      {
        name: "Michaelis-Menten Rate Equation",
        formula: "v₀ = (Vmax × [S]) / (Km + [S])"
      },
      {
        name: "Lineweaver-Burk Double Reciprocal Plot",
        formula: "1/v₀ = (Km / Vmax) × (1/[S]) + (1 / Vmax)"
      }
    ],
    clinicalRanges: [
      { parameter: "Cardiac Troponin I (cTnI)", normal: "< 0.04 ng/mL", prediabetes: "0.04 – 0.10 ng/mL", diabetes: "> 0.10 ng/mL (Myocardial Injury)" },
      { parameter: "Serum CK-MB", normal: "< 5% of total CK (< 25 U/L)", prediabetes: "Borderline", diabetes: "Elevated 4–6h post-MI" },
      { parameter: "Total Serum LDH", normal: "140 – 280 U/L", prediabetes: "LDH-1 < LDH-2 (Normal)", diabetes: "LDH-1 > LDH-2 (Flipped in MI)" }
    ],
    memoryHook: "CK-MB = Myocardial Band (Heart). Competitive = Km increases, Vmax constant. Non-competitive = Vmax drops, Km constant.",
    topics: [
      { label: "Enzyme Kinetics & Theories", route: "/MetabolicPathwaysOfCarb" },
      { label: "Enzyme Inhibitors & Specificity", route: "/DisordersOfCarb" },
      { label: "Isoenzymes & MI Cardiac Biomarkers", route: "/RegulationOfBloodGlucose" }
    ],
    quizSlug: "unit-4-enzymes"
  },
  {
    id: "unit-5-acid-base",
    unitNumber: 5,
    title: "Acid-Base Balance & Blood Buffer Systems",
    category: "Acid-Base",
    icon: "⚖️",
    color: "from-rose-500 to-pink-600",
    badgeColor: "bg-rose-50 text-rose-700 border-rose-200",
    summary: "Bicarbonate-carbonic buffer (20:1 ratio), Henderson-Hasselbalch equation, ABG interpretation, and Anion Gap.",
    objectives: [
      "Define Acid-Base balance, normal arterial blood pH (7.35 – 7.45), and the three lines of defense maintaining homeostasis",
      "Explain the primary extracellular buffer: Bicarbonate-Carbonic Acid buffer system (H₂CO₃ / HCO₃⁻) and Henderson-Hasselbalch 20:1 ratio",
      "Describe Phosphate, Plasma Protein, and Erythrocyte Hemoglobin buffer systems",
      "Detail the Respiratory Mechanism of pH regulation (CO₂ exhalation via hyperventilation vs retention via hypoventilation in minutes)",
      "Explain the Renal Mechanism of pH regulation (tubular H⁺ secretion, HCO₃⁻ reabsorption, carbonic anhydrase, and ammonium NH₄⁺ synthesis in hours/days)",
      "Calculate and interpret the Serum Anion Gap = [Na⁺] - ([Cl⁻] + [HCO₃⁻]) to differentiate High Anion Gap Metabolic Acidosis (DKA, Lactic acidosis) from normal gap acidosis",
      "Interpret Arterial Blood Gas (ABG) panels for Respiratory Acidosis, Respiratory Alkalosis, Metabolic Acidosis, and Metabolic Alkalosis"
    ],
    formulas: [
      {
        name: "Henderson-Hasselbalch Equation for Blood pH",
        formula: "pH = pKa + log ([HCO₃⁻] / [H₂CO₃]) = 6.1 + log (20 / 1) = 6.1 + 1.30 = 7.40"
      },
      {
        name: "Serum Anion Gap Equation",
        formula: "Anion Gap = [Na⁺] - ([Cl⁻] + [HCO₃⁻])  (Normal: 8 – 12 mEq/L)"
      }
    ],
    clinicalRanges: [
      { parameter: "Arterial Blood pH", normal: "7.35 – 7.45", prediabetes: "< 7.35 (Acidemia)", diabetes: "> 7.45 (Alkalemia)" },
      { parameter: "Partial Pressure CO₂ (PaCO₂)", normal: "35 – 45 mmHg", prediabetes: "< 35 mmHg (Hypocapnia)", diabetes: "> 45 mmHg (Hypercapnia)" },
      { parameter: "Serum Bicarbonate (HCO₃⁻)", normal: "22 – 26 mEq/L", prediabetes: "< 22 mEq/L (Metabolic Acidosis)", diabetes: "> 26 mEq/L (Metabolic Alkalosis)" }
    ],
    memoryHook: "ROME = Respiratory Opposite (pH ↑ PaCO₂ ↓), Metabolic Equal (pH ↑ HCO₃⁻ ↑). 20:1 ratio keeps pH at 7.40.",
    topics: [
      { label: "Blood Buffers & Henderson-Hasselbalch", route: "/RegulationOfBloodGlucose" },
      { label: "Respiratory & Renal Compensation", route: "/DisordersOfCarb" },
      { label: "ABG Interpretation & Anion Gap", route: "/DiabetesMellitusType1" }
    ],
    quizSlug: "unit-5-acid-base"
  },
  {
    id: "unit-6-heme-renal",
    unitNumber: 6,
    title: "Heme Catabolism, Jaundice & Renal Function Tests",
    category: "Heme & RFT",
    icon: "🩸",
    color: "from-teal-500 to-emerald-600",
    badgeColor: "bg-teal-50 text-teal-700 border-teal-200",
    summary: "Heme degradation to Bilirubin, Pre/Hepatic/Post Jaundice differential diagnosis, and Creatinine Clearance / GFR.",
    objectives: [
      "Describe Heme structure (Fe²⁺ + Protoporphyrin IX) and its multi-step biosynthesis (ALAS rate-limiting in mitochondria, ferrochelatase)",
      "Explain biological functions of Heme in Hemoglobin, Myoglobin, Cytochromes, Catalase, and Cytochrome P450",
      "Detail Heme Catabolism: Heme Oxygenase → Biliverdin → Biliverdin Reductase → Unconjugated Bilirubin (albumin bound) → Hepatic UGT1A1 conjugation → Bilirubin Diglucuronide",
      "Explain the fate of conjugated bilirubin in the gut: bacterial conversion to Stercobilinogen/Stercobilin (fecal color) and Urobilinogen/Urobilin",
      "Classify Jaundice (Pre-hepatic/Hemolytic, Hepatic, Post-hepatic/Obstructive) and differential diagnostic lab features",
      "Explain congenital hyperbilirubinemias: Gilbert’s syndrome vs Crigler-Najjar syndrome",
      "Define Organ Function Tests and classify Renal Function Tests: Glomerular clearance (Creatinine, BUN, Inulin, eGFR), Tubular tests, and Urinalysis"
    ],
    formulas: [
      {
        name: "Heme Cleavage Reaction",
        formula: "Heme + O₂ + NADPH + H⁺ → Biliverdin + Fe³⁺ + CO + NADP⁺ (Enzyme: Heme Oxygenase)"
      },
      {
        name: "Creatinine Clearance (GFR Formula)",
        formula: "CrCl (mL/min) = (Urine Creatinine [mg/dL] × Urine Volume [mL/24h]) / (Serum Creatinine [mg/dL] × 1440 min)"
      }
    ],
    clinicalRanges: [
      { parameter: "Total Serum Bilirubin", normal: "0.2 – 1.2 mg/dL", prediabetes: "Direct: 0.1 – 0.3 mg/dL", diabetes: "> 2.5 mg/dL (Overt Jaundice)" },
      { parameter: "Serum Creatinine", normal: "0.6 – 1.2 mg/dL", prediabetes: "1.3 – 1.9 mg/dL", diabetes: "≥ 2.0 mg/dL (Renal Impairment)" },
      { parameter: "Estimated GFR (eGFR)", normal: "90 – 120 mL/min/1.73m²", prediabetes: "60 – 89 mL/min", diabetes: "< 60 mL/min (Chronic Kidney Disease)" }
    ],
    memoryHook: "Pre-hepatic = Indirect Bilirubin ↑. Post-hepatic = Direct Bilirubin ↑, Clay stool, Tea urine. Inulin = Gold standard GFR.",
    topics: [
      { label: "Heme Biosynthesis & Structure", route: "/classification-of-carb" },
      { label: "Heme Degradation & Jaundice Types", route: "/DisordersOfCarb" },
      { label: "Renal Function & Clearance Tests", route: "/RegulationOfBloodGlucose" }
    ],
    quizSlug: "unit-6-heme-renal"
  },
  {
    id: "unit-7-immunochem",
    unitNumber: 7,
    title: "Immunochemistry & ELISA Diagnostic Assays",
    category: "Immunology",
    icon: "🛡️",
    color: "from-cyan-500 to-blue-600",
    badgeColor: "bg-cyan-50 text-cyan-700 border-cyan-200",
    summary: "5 Immunoglobulin classes (IgG/A/M/E/D), antigen-antibody reactions, and ELISA formats (Direct, Indirect, Sandwich).",
    objectives: [
      "Define Immunoglobulins (Antibodies) as specialized B-cell glycoproteins and classify into 5 isotypes (IgG, IgA, IgM, IgD, IgE)",
      "Describe the Y-shaped antibody architecture: 2 Identical Heavy (H) chains, 2 Identical Light (L) chains, Disulfide bonds, Fab sites, and Fc effector regions",
      "Detail characteristics and functions of IgG (~80% of serum Ig, only isotype crossing placenta, opsonization, complement activation)",
      "Detail Secretory IgA (sIgA dimeric in mucosal secretions, tears, saliva, colostrum) for mucosal immunity",
      "Detail IgM (19S pentamer with J-chain, 'millionaire molecule', earliest antibody produced in primary immune response, agglutination)",
      "Explain IgE (mediates Type I anaphylactic hypersensitivity and anti-helminth defense) and IgD (B-cell receptor)",
      "Explain ELISA (Enzyme-Linked Immunosorbent Assay): Definition, principles, instrumentation, and clinical applications",
      "Differentiate the 4 ELISA formats: Direct ELISA, Indirect ELISA (antigen coated), Sandwich ELISA (antibody coated), and Competitive ELISA"
    ],
    formulas: [
      {
        name: "ELISA Competitive Absorbance Principle",
        formula: "Optical Density (Absorbance Signal) ∝ 1 / [Patient Target Antigen Concentration]"
      },
      {
        name: "Antibody Structure Subunit Formula",
        formula: "Monomer = H₂L₂ (Two identical Heavy chains + Two identical Light chains [κ or λ])"
      }
    ],
    clinicalRanges: [
      { parameter: "Serum IgG Level", normal: "700 – 1600 mg/dL (~80% total Ig)", prediabetes: "Half-life: 21–23 days", diabetes: "Crosses Placenta: YES" },
      { parameter: "Serum IgA Level", normal: "70 – 400 mg/dL (~15% total Ig)", prediabetes: "Mucosal Fluid: sIgA Dimer", diabetes: "Present in Breast Milk: YES" },
      { parameter: "Serum IgM Level", normal: "40 – 230 mg/dL (~5–8% total Ig)", prediabetes: "19S Pentamer (900 kDa)", diabetes: "First Responder: YES" }
    ],
    memoryHook: "GAMED = IgG (Greatest/Placenta), IgA (Airway/Gut/Breastmilk), IgM (Mega pentamer/First), IgE (Emergency allergy), IgD (Differentiation receptor).",
    topics: [
      { label: "Immunoglobulin Classes & Structure", route: "/classification-of-carb" },
      { label: "Antibody Functions & Hypersensitivity", route: "/DisordersOfCarb" },
      { label: "ELISA Formats (Direct, Indirect, Sandwich)", route: "/RegulationOfBloodGlucose" }
    ],
    quizSlug: "unit-7-immunochem"
  }
];
