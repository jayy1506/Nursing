// Comprehensive Biochemistry Submodules & Lesson Data (Units 3 - 7)
// INC CBME Standardized for B.Sc. Nursing & Clinical Enzymology

export const BIOCHEMISTRY_SUBMODULES = {
  // =========================================================================
  // --- UNIT 3: PROTEINS, AMINO ACIDS & UREA CYCLE ---
  // =========================================================================
  "protein-structure-denaturation": {
    slug: "protein-structure-denaturation",
    unitNumber: 3,
    unitTitle: "Unit 3: Proteins & Amino Acids",
    lessonNumber: 1,
    totalLessonsInUnit: 4,
    title: "Protein Structural Hierarchy & Denaturation",
    category: "Proteins",
    icon: "🥩",
    summary: "Primary, secondary (α-helix, β-sheet), tertiary, and quaternary levels of protein organization, peptide bonds, and chemical denaturation mechanisms.",
    prevSlug: "/EssentialFattyAcids",
    nextSlug: "amino-acid-chemistry-zwitterions",
    overview: "Proteins are complex nitrogenous organic macromolecules constructed of L-α-amino acids joined by covalent peptide bonds. Protein function relies on precise 3D architectural folding.",
    keyDefinitions: [
      {
        term: "Primary Structure",
        text: "The linear sequence of amino acids linked by covalent peptide (-CO-NH-) bonds, determined directly by mRNA genetic code."
      },
      {
        term: "Secondary Structure",
        text: "Localized folding of the polypeptide backbone into regular geometric conformations, mainly α-helices and β-pleated sheets, stabilized by hydrogen bonds."
      },
      {
        term: "Tertiary Structure",
        text: "The overall three-dimensional folding of a single polypeptide chain into a compact globular or fibrous shape stabilized by disulfide bridges, ionic salt bridges, hydrophobic interactions, and hydrogen bonds."
      },
      {
        term: "Quaternary Structure",
        text: "The spatial arrangement of two or more distinct polypeptide subunits forming an oligomeric protein complex (e.g., adult Hemoglobin HbA with α₂β₂ tetramer)."
      },
      {
        term: "Protein Denaturation",
        text: "The disruption of secondary, tertiary, and quaternary structures caused by heat, extreme pH, heavy metal salts, or organic solvents, resulting in loss of biological function without breaking covalent peptide bonds."
      }
    ],
    pathways: [
      {
        title: "Factors Causing Protein Denaturation",
        steps: [
          "Physical Agents: Heat (boiling albumin coagulates into insoluble white curd), UV radiation, high pressure, violent shaking.",
          "Chemical Agents: Strong acids/bases (disrupt salt bridges), heavy metal ions (Pb²⁺, Hg²⁺, Ag⁺ precipitate metal proteinates), urea (8M) and guanidine HCl (disrupt hydrogen bonding)."
        ]
      }
    ],
    clinicalPearls: [
      "In nursing practice, cooking eggs or meat coagulates dietary proteins, making them readily accessible to gastric pepsin and pancreatic proteases.",
      "Autoclaving surgical instruments at 121°C for 15 minutes achieves complete sterilization by irreversibly denaturing microbial enzymes and structural proteins.",
      "Ethanol (70% spirit swab) denatures bacterial cell wall and cytoplasmic proteins, acting as an effective antiseptic prior to venipuncture."
    ],
    referenceRanges: [
      { parameter: "Total Serum Protein", normal: "6.0 – 8.3 g/dL" },
      { parameter: "Serum Albumin", normal: "3.5 – 5.0 g/dL" },
      { parameter: "Serum Globulin", normal: "2.0 – 3.5 g/dL" },
      { parameter: "Albumin/Globulin (A/G) Ratio", normal: "1.2 : 1 to 2.0 : 1" }
    ]
  },

  "amino-acid-chemistry-zwitterions": {
    slug: "amino-acid-chemistry-zwitterions",
    unitNumber: 3,
    unitTitle: "Unit 3: Proteins & Amino Acids",
    lessonNumber: 2,
    totalLessonsInUnit: 4,
    title: "Amino Acid Chemistry, Classification & Zwitterion Behavior",
    category: "Proteins",
    icon: "🧪",
    summary: "Optical stereochemistry, standard 20 L-amino acids, nutritional classification (essential vs non-essential), and amphoteric zwitterion properties at pI.",
    prevSlug: "protein-structure-denaturation",
    nextSlug: "protein-digestion-absorption",
    overview: "Amino acids are the monomeric building blocks of proteins, containing both a basic amino group (-NH₂) and an acidic carboxyl group (-COOH) bonded to the central α-carbon.",
    keyDefinitions: [
      {
        term: "Zwitterion (Dipolar Ion)",
        text: "An electrically neutral molecule bearing both a positive charge (-NH₃⁺) and a negative charge (-COO⁻) simultaneously at physiological pH, with net charge = 0."
      },
      {
        term: "Isoelectric Point (pI)",
        text: "The exact pH at which an amino acid or protein exists entirely as a zwitterion with zero net charge and no migration in an electrophoretic field."
      },
      {
        term: "Essential Amino Acids",
        text: "Ten amino acids that human tissues cannot synthesize de novo in quantities sufficient to meet metabolic demands: Phenylalanine, Valine, Threonine, Tryptophan, Isoleucine, Methionine, Histidine, Arginine, Leucine, Lysine (PVT TIM HALL)."
      }
    ],
    pathways: [
      {
        title: "Nutritional Classification of Amino Acids",
        steps: [
          "Essential (Indispensable): Valine, Leucine, Isoleucine, Lysine, Methionine, Phenylalanine, Threonine, Tryptophan, Histidine, Arginine.",
          "Non-Essential (Dispensable): Alanine, Asparagine, Aspartate, Glutamate, Glutamine, Glycine, Proline, Serine, Tyrosine, Cysteine.",
          "Ketogenic Amino Acids: Leucine and Lysine (exclusively yield acetoacetate and acetyl-CoA).",
          "Both Glucogenic & Ketogenic: Phenylalanine, Tyrosine, Tryptophan, Isoleucine."
        ]
      }
    ],
    clinicalPearls: [
      "Phenylketonuria (PKU) is an autosomal recessive deficiency of Phenylalanine Hydroxylase (PAH), leading to accumulation of toxic phenylpyruvate and mental retardation if not restricted with a low-Phe diet.",
      "Maple Syrup Urine Disease (MSUD) results from defective branched-chain α-ketoacid dehydrogenase, leading to ketoacidosis and urine smelling of burnt maple sugar."
    ],
    referenceRanges: [
      { parameter: "Plasma Total Amino Acids", normal: "35 – 65 mg/dL" },
      { parameter: "Blood Phenylalanine (Newborn)", normal: "< 2.0 mg/dL (< 120 µmol/L)" }
    ]
  },

  "protein-digestion-absorption": {
    slug: "protein-digestion-absorption",
    unitNumber: 3,
    unitTitle: "Unit 3: Proteins & Amino Acids",
    lessonNumber: 3,
    totalLessonsInUnit: 4,
    title: "Protein Digestion & Intestinal Amino Acid Absorption",
    category: "Proteins",
    icon: "🍽️",
    summary: "Gastric acid activation of pepsinogen, pancreatic endo/exopeptidases, brush border aminopeptidases, and Na⁺-dependent amino acid transporters.",
    prevSlug: "amino-acid-chemistry-zwitterions",
    nextSlug: "urea-cycle-ammonia-detox",
    overview: "Dietary protein digestion begins in the acidic environment of the stomach and concludes in the small intestine through sequential enzymatic hydrolysis into free amino acids, dipeptides, and tripeptides.",
    keyDefinitions: [
      {
        term: "Pepsin",
        text: "Gastric endopeptidase secreted by chief cells as inactive pepsinogen, activated by stomach HCl (pH 1.5–2.5) to cleave peptide bonds adjacent to aromatic amino acids."
      },
      {
        term: "Trypsin",
        text: "Pancreatic endopeptidase secreted as trypsinogen and activated by intestinal enterokinase (enteropeptidase); serves as the master activator for chymotrypsin, elastase, and carboxypeptidases."
      },
      {
        term: "B₀ Transport System",
        text: "Sodium-dependent neutral amino acid cotransporter across the apical enterocyte brush border membrane."
      }
    ],
    pathways: [
      {
        title: "Sequential Enzymatic Cleavage",
        steps: [
          "Gastric Phase: Stomach HCl denatures tertiary protein coils; Pepsin cleaves intact proteins into proteoses and peptones.",
          "Pancreatic Phase: Trypsin (cleaves Lys/Arg), Chymotrypsin (cleaves Phe/Trp/Tyr), and Elastase hydrolyze polypeptides into short oligopeptides.",
          "Brush Border Phase: Carboxypeptidases A & B (exopeptidases) cleave C-terminal residues; Aminopeptidases cleave N-terminal residues.",
          "Absorption Phase: Free amino acids enter via Na⁺-dependent secondary active transport; Di- and tripeptides enter via PepT1 H⁺-cotransporters."
        ]
      }
    ],
    clinicalPearls: [
      "In Acute Pancreatitis, premature intra-acinar auto-activation of trypsinogen causes catastrophic pancreatic autodigestion, severe epigastric pain radiating to the back, and elevated serum amylase/lipase.",
      "Hartnup disease is a defective intestinal and renal tubular absorption of neutral amino acids (especially Tryptophan), leading to pellagra-like dermatosis, ataxia, and psychiatric disturbances."
    ],
    referenceRanges: [
      { parameter: "Serum Amylase", normal: "30 – 110 U/L" },
      { parameter: "Serum Lipase", normal: "10 – 140 U/L" }
    ]
  },

  "urea-cycle-ammonia-detox": {
    slug: "urea-cycle-ammonia-detox",
    unitNumber: 3,
    unitTitle: "Unit 3: Proteins & Amino Acids",
    lessonNumber: 4,
    totalLessonsInUnit: 4,
    title: "Hepatic Urea Cycle (Krebs-Henseleit) & Ammonia Toxicity",
    category: "Proteins",
    icon: "🫘",
    summary: "The 5 enzymatic steps converting neurotoxic free ammonia (NH₃) to harmless urea in liver mitochondria and cytosol, energetics, and hepatic encephalopathy.",
    prevSlug: "protein-digestion-absorption",
    nextSlug: "enzyme-kinetics-theories",
    overview: "Ammonia released from amino acid deamination is highly toxic to the central nervous system. The liver detoxifies ammonia into water-soluble urea via the 5-step Urea Cycle.",
    keyDefinitions: [
      {
        term: "Carbamoyl Phosphate Synthetase I (CPS-I)",
        text: "The committed, rate-limiting mitochondrial enzyme of the urea cycle requiring N-acetylglutamate (NAG) as an essential allosteric activator and consuming 2 ATP."
      },
      {
        term: "Urea Molecule",
        text: "Diamide of carbonic acid (NH₂-CO-NH₂); one nitrogen comes from free ammonia, one nitrogen comes from Aspartate, and carbon comes from bicarbonate (CO₂)."
      },
      {
        term: "Hyperammonemia",
        text: "Elevated blood ammonia (>50 µmol/L) causing brain edema, asterixis (flapping tremor), lethargy, coma, and irreversible cerebral cortex damage."
      }
    ],
    pathways: [
      {
        title: "The 5 Enzymatic Steps of the Urea Cycle",
        steps: [
          "Step 1 (Mitochondria): NH₄⁺ + HCO₃⁻ + 2 ATP → Carbamoyl Phosphate (CPS-I enzyme, NAG activator).",
          "Step 2 (Mitochondria): Carbamoyl Phosphate + Ornithine → Citrulline (Ornithine Transcarbamylase / OTC enzyme). Citrulline is shuttled to cytosol.",
          "Step 3 (Cytosol): Citrulline + Aspartate + ATP → Argininosuccinate (Argininosuccinate Synthetase enzyme).",
          "Step 4 (Cytosol): Argininosuccinate → Arginine + Fumarate (Argininosuccinate Lyase enzyme). Fumarate links cycle to Krebs TCA cycle.",
          "Step 5 (Cytosol): Arginine + H₂O → Urea + Ornithine (Arginase enzyme). Ornithine is re-transported to mitochondria to continue cycle."
        ]
      }
    ],
    clinicalPearls: [
      "In liver cirrhosis with portal hypertension, blood bypasses hepatocytes (portosystemic shunts), causing severe hyperammonemia and Hepatic Encephalopathy. Nurses administer Lactulose to acidify colonic lumen and trap NH₃ as unabsorbable NH₄⁺.",
      "Ornithine Transcarbamylase (OTC) deficiency is the most common X-linked inborn error of the urea cycle, marked by severe orotic aciduria and neonatal hyperammonemic coma."
    ],
    referenceRanges: [
      { parameter: "Blood Urea Nitrogen (BUN)", normal: "7 – 20 mg/dL" },
      { parameter: "Serum Urea", normal: "15 – 45 mg/dL" },
      { parameter: "Serum Ammonia (Venous)", normal: "15 – 45 µmol/L (11 – 35 µg/dL)" }
    ]
  },

  // =========================================================================
  // --- UNIT 4: CLINICAL ENZYMOLOGY & MI BIOMARKERS ---
  // =========================================================================
  "enzyme-kinetics-theories": {
    slug: "enzyme-kinetics-theories",
    unitNumber: 4,
    unitTitle: "Unit 4: Clinical Enzymology",
    lessonNumber: 1,
    totalLessonsInUnit: 3,
    title: "Enzyme Catalytic Action, Kinetics & Models",
    category: "Enzymology",
    icon: "⏱️",
    summary: "Lock & Key vs Induced Fit theories, activation energy, Michaelis-Menten kinetics, Km, Vmax, and factors influencing catalytic rate.",
    prevSlug: "urea-cycle-ammonia-detox",
    nextSlug: "enzyme-inhibitors-specificity",
    overview: "Enzymes are specialized biological catalysts (mostly proteins) that accelerate chemical reaction rates by several million-fold without being consumed, by lowering Gibbs free energy of activation.",
    keyDefinitions: [
      {
        term: "Active Site",
        text: "The three-dimensional crevice on an enzyme formed by specific amino acid residues where the substrate binds and catalytic transformation occurs."
      },
      {
        term: "Induced Fit Model (Koshland)",
        text: "Proposes that enzyme active site is flexible and dynamically changes its conformation upon substrate contact to establish optimal transition-state alignment."
      },
      {
        term: "Michaelis Constant (Km)",
        text: "The substrate concentration at which reaction velocity reaches exactly half of maximum velocity (Vmax/2); reflects enzyme-substrate affinity (lower Km = higher affinity)."
      }
    ],
    pathways: [
      {
        title: "Factors Affecting Reaction Velocity",
        steps: [
          "Substrate Concentration [S]: At low [S], velocity is first-order; at high [S], enzyme active sites become saturated and velocity plateaus at zero-order (Vmax).",
          "Temperature: Reaction rate roughly doubles every 10°C up to optimum (37°C); beyond 55°C, irreversible thermal denaturation occurs.",
          "pH: Most human enzymes function optimally between pH 7.2–7.4 (exceptions: Gastric Pepsin pH 1.5–2.0, Pancreatic Lipase pH 8.0)."
        ]
      }
    ],
    clinicalPearls: [
      "Glucokinase in hepatocytes has a high Km (low affinity) for glucose, operating only after meals when portal blood glucose is high.",
      "Hexokinase in peripheral brain cells has a low Km (high affinity) for glucose, operating at full catalytic velocity even during fasting hypoglycemia."
    ],
    referenceRanges: [
      { parameter: "Physiological Body Temperature", normal: "36.5 – 37.5 °C" },
      { parameter: "Arterial Blood pH", normal: "7.35 – 7.45" }
    ]
  },

  "enzyme-inhibitors-specificity": {
    slug: "enzyme-inhibitors-specificity",
    unitNumber: 4,
    unitTitle: "Unit 4: Clinical Enzymology",
    lessonNumber: 2,
    totalLessonsInUnit: 3,
    title: "Enzyme Inhibition & Pharmacological Applications",
    category: "Enzymology",
    icon: "🛑",
    summary: "Competitive, non-competitive, uncompetitive, and suicide inhibitors with Lineweaver-Burk analysis and life-saving drug targets.",
    prevSlug: "enzyme-kinetics-theories",
    nextSlug: "isoenzymes-cardiac-biomarkers",
    overview: "Enzyme inhibitors are chemical agents that decrease enzymatic reaction velocity. Many pharmaceutical drugs (statins, ACE inhibitors, antibiotics) act through specific enzyme inhibition.",
    keyDefinitions: [
      {
        term: "Competitive Inhibition",
        text: "Inhibitor structurally resembles natural substrate and competes for binding at active site. Vmax remains unchanged; apparent Km increases. Reversible by excess substrate."
      },
      {
        term: "Non-Competitive Inhibition",
        text: "Inhibitor binds to an allosteric regulatory site distinct from active site on both free enzyme and ES complex. Vmax decreases; Km remains unchanged."
      },
      {
        term: "Suicide (Mechanism-Based) Inhibitor",
        text: "An unreactive pseudo-substrate that is converted by the enzyme's own catalytic mechanism into a reactive chemical intermediate that permanently inactivates the enzyme."
      }
    ],
    pathways: [
      {
        title: "Clinical Drug Inhibitor Examples",
        steps: [
          "Statins (Atorvastatin): Competitive inhibitors of HMG-CoA Reductase, lowering cholesterol biosynthesis in hyperlipidemia.",
          "Allopurinol: Suicide inhibitor of Xanthine Oxidase, blocking uric acid crystal formation in chronic Gout.",
          "Aspirin: Irreversible inhibitor of Cyclooxygenase (COX-1/2) via serine acetylation, preventing thromboxane A2 platelet synthesis.",
          "ACE Inhibitors (Enalapril): Competitive inhibitors of Angiotensin Converting Enzyme, lowering blood pressure."
        ]
      }
    ],
    clinicalPearls: [
      "Organophosphate pesticide poisoning irreversibly phosphorylates and inactivates Acetylcholinesterase, producing toxic cholinergic storm (SLUDGE syndrome: Salivation, Lacrimation, Urination, Defecation, GI cramping, Emesis). Antidote: Atropine + Pralidoxime (2-PAM).",
      "Methotrexate competitively inhibits Dihydrofolate Reductase (DHFR), starving cancer cells of thymidylate required for DNA replication."
    ],
    referenceRanges: [
      { parameter: "Serum Uric Acid (Male)", normal: "3.5 – 7.2 mg/dL" },
      { parameter: "Serum Uric Acid (Female)", normal: "2.6 – 6.0 mg/dL" }
    ]
  },

  "isoenzymes-cardiac-biomarkers": {
    slug: "isoenzymes-cardiac-biomarkers",
    unitNumber: 4,
    unitTitle: "Unit 4: Clinical Enzymology",
    lessonNumber: 3,
    totalLessonsInUnit: 3,
    title: "Isoenzymes & Myocardial Infarction Cardiac Biomarkers",
    category: "Enzymology",
    icon: "❤️",
    summary: "CK-MB, Troponin I/T kinetics, LDH flipped pattern, AST, and acute coronary syndrome diagnosis.",
    prevSlug: "enzyme-inhibitors-specificity",
    nextSlug: "blood-buffers-henderson-hasselbalch",
    overview: "Isoenzymes are physically distinct molecular forms of an enzyme possessing different primary structures and electrophoretic mobilities but catalyzing the same chemical reaction in different tissues.",
    keyDefinitions: [
      {
        term: "Creatine Kinase (CK) Isoenzymes",
        text: "Dimeric enzyme with M (muscle) and B (brain) subunits: CK-BB (CK-1, brain/colon), CK-MB (CK-2, myocardium), CK-MM (CK-3, skeletal muscle)."
      },
      {
        term: "Cardiac Troponin I & T (cTnI / cTnT)",
        text: "Regulatory proteins of the cardiac sarcomere contractile apparatus; gold standard biomarkers with highest cardiac sensitivity and specificity."
      },
      {
        term: "LDH Flipped Pattern",
        text: "Normally in serum LDH-2 exceeds LDH-1. In acute myocardial infarction, release of cardiac LDH-1 (H₄) causes serum LDH-1 to exceed LDH-2 (ratio > 1)."
      }
    ],
    pathways: [
      {
        title: "Timeline of Cardiac Biomarkers in Acute MI",
        steps: [
          "Myoglobin: Rises 1–3 hours, peaks 6–9 hours, returns to baseline in 24 hours (earliest, but non-specific).",
          "CK-MB: Rises 4–6 hours, peaks 12–24 hours, normalizes within 48–72 hours (ideal for detecting re-infarction).",
          "Troponin I / T: Rises 3–4 hours, peaks 12–24 hours, remains elevated for 10–14 days (gold standard for acute MI)."
        ]
      }
    ],
    clinicalPearls: [
      "In acute chest pain triage, nurses must obtain a 12-lead ECG within 10 minutes and draw baseline serial Troponin samples (0, 3, and 6 hours).",
      "If a post-MI patient reports recurrent chest pain on Day 4, CK-MB is the marker of choice because Troponins remain elevated from the initial episode."
    ],
    referenceRanges: [
      { parameter: "Cardiac Troponin I (cTnI)", normal: "< 0.04 ng/mL" },
      { parameter: "Cardiac Troponin T (cTnT)", normal: "< 0.01 ng/mL" },
      { parameter: "Total Serum CK (Male)", normal: "38 – 174 U/L" },
      { parameter: "Serum CK-MB", normal: "< 5% of total CK (< 25 U/L)" },
      { parameter: "Total Serum LDH", normal: "140 – 280 U/L" }
    ]
  },

  // =========================================================================
  // --- UNIT 5: ACID-BASE BALANCE & BLOOD BUFFERS ---
  // =========================================================================
  "blood-buffers-henderson-hasselbalch": {
    slug: "blood-buffers-henderson-hasselbalch",
    unitNumber: 5,
    unitTitle: "Unit 5: Acid-Base Balance",
    lessonNumber: 1,
    totalLessonsInUnit: 3,
    title: "Blood Buffer Systems & Henderson-Hasselbalch Equation",
    category: "Acid-Base",
    icon: "⚖️",
    summary: "Bicarbonate-carbonic acid (20:1 ratio), phosphate buffer, protein and hemoglobin buffers, and mathematical calculation of arterial blood pH 7.40.",
    prevSlug: "isoenzymes-cardiac-biomarkers",
    nextSlug: "respiratory-renal-compensation",
    overview: "Metabolic reactions produce large quantities of volatile (CO₂) and non-volatile fixed acids daily. Arterial pH is strictly defended between 7.35 and 7.45 by chemical buffers.",
    keyDefinitions: [
      {
        term: "Buffer Solution",
        text: "A mixture of a weak acid and its conjugate base (or weak base and its conjugate acid) that resists significant changes in pH upon addition of small amounts of acid or alkali."
      },
      {
        term: "Bicarbonate Buffer System",
        text: "The primary extracellular buffer system consisting of sodium bicarbonate (NaHCO₃) and dissolved carbonic acid (H₂CO₃), with pKa of 6.1."
      },
      {
        term: "Henderson-Hasselbalch Equation",
        text: "pH = pKa + log ([Base] / [Acid]) = 6.1 + log ([HCO₃⁻] / [0.03 × PaCO₂]) = 6.1 + log (20/1) = 6.1 + 1.30 = 7.40."
      }
    ],
    pathways: [
      {
        title: "Three Lines of Defense Against pH Fluctuations",
        steps: [
          "1st Line (Seconds): Chemical buffers in blood (Bicarbonate, Phosphate, Plasma Albumin, Erythrocyte Hemoglobin).",
          "2nd Line (Minutes to Hours): Respiratory compensation (Hyperventilation blows off volatile CO₂; Hypoventilation retains CO₂).",
          "3rd Line (Hours to Days): Renal compensation (Excretion of H⁺, reabsorption of filtered HCO₃⁻, generation of new HCO₃⁻ via ammonium synthesis)."
        ]
      }
    ],
    clinicalPearls: [
      "The 20:1 ratio of bicarbonate to carbonic acid is the sacred physiological number maintaining arterial blood pH precisely at 7.40.",
      "Hemoglobin is an exceptionally potent buffer in erythrocytes because of its 38 histidine residues with imidazole rings buffering H⁺ ions released during oxygen delivery."
    ],
    referenceRanges: [
      { parameter: "Arterial Blood pH", normal: "7.35 – 7.45" },
      { parameter: "Venous Blood pH", normal: "7.31 – 7.41" },
      { parameter: "Serum Bicarbonate [HCO₃⁻]", normal: "22 – 26 mEq/L (mean 24)" },
      { parameter: "Arterial PaCO₂", normal: "35 – 45 mmHg (mean 40)" }
    ]
  },

  "respiratory-renal-compensation": {
    slug: "respiratory-renal-compensation",
    unitNumber: 5,
    unitTitle: "Unit 5: Acid-Base Balance",
    lessonNumber: 2,
    totalLessonsInUnit: 3,
    title: "Respiratory & Renal Homeostatic pH Compensation",
    category: "Acid-Base",
    icon: "🫁",
    summary: "Medullary chemoreceptors, carbonic anhydrase, tubular H⁺ secretion, titratable acid excretion, and renal ammonium (NH₄⁺) generation.",
    prevSlug: "blood-buffers-henderson-hasselbalch",
    nextSlug: "abg-interpretation-anion-gap",
    overview: "While chemical buffers act instantaneously, the respiratory and renal systems provide dynamic physiological regulation to eliminate volatile and fixed metabolic acid loads.",
    keyDefinitions: [
      {
        term: "Respiratory Compensation",
        text: "Changes in alveolar ventilation triggered by medullary and carotid chemoreceptors in response to altered arterial H⁺ concentration to modify PaCO₂ within 3–15 minutes."
      },
      {
        term: "Titratable Acidity",
        text: "The amount of alkali (0.1 N NaOH) required to titrate urine pH back to blood pH (7.40), predominantly representing filtered phosphate buffered as NaH₂PO₄."
      },
      {
        term: "Renal Glutaminase Reaction",
        text: "Deamination of glutamine in proximal tubular cells yielding ammonia (NH₃), which diffuses into tubular lumen and traps secreted H⁺ as ammonium (NH₄⁺)."
      }
    ],
    pathways: [
      {
        title: "Renal Mechanisms of Acid Elimination",
        steps: [
          "Bicarbonate Reabsorption: Carbonic anhydrase (CA-IV and CA-II) facilitates 99.9% reabsorption of filtered HCO₃⁻ primarily in the proximal tubule.",
          "Hydrogen Ion Secretion: Active H⁺-ATPase and Na⁺/H⁺ antiporter (NHE3) secrete H⁺ into the tubular filtrate.",
          "Phosphate Buffering: Filtered dibasic phosphate (HPO₄²⁻) binds secreted H⁺ forming monobasic phosphate (H₂PO₄⁻) excreted in urine.",
          "Ammonium Excretion: Glutamine breakdown produces NH₃ + H⁺ → NH₄⁺, allowing excretion of up to 500 mEq of H⁺ per day in severe acidosis."
        ]
      }
    ],
    clinicalPearls: [
      "In Diabetic Ketoacidosis, the patient exhibits deep, rapid Kussmaul respirations—the maximal physiological respiratory compensation to blow off CO₂ and combat metabolic acid load.",
      "Acetazolamide (Diamox) inhibits renal Carbonic Anhydrase, promoting bicarbonate excretion and metabolic acidosis, used to treat acute mountain sickness and metabolic alkalosis."
    ],
    referenceRanges: [
      { parameter: "Urine pH", normal: "4.5 – 8.0 (mean ~6.0 acidic)" },
      { parameter: "Daily Fixed Acid Production", normal: "50 – 100 mEq/day" }
    ]
  },

  "abg-interpretation-anion-gap": {
    slug: "abg-interpretation-anion-gap",
    unitNumber: 5,
    unitTitle: "Unit 5: Acid-Base Balance",
    lessonNumber: 3,
    totalLessonsInUnit: 3,
    title: "Arterial Blood Gas (ABG) Interpretation & Anion Gap",
    category: "Acid-Base",
    icon: "📋",
    summary: "Systematic 4-step ABG analysis, ROME mnemonic, high vs normal anion gap metabolic acidosis (MUDPILES vs HARDUP).",
    prevSlug: "respiratory-renal-compensation",
    nextSlug: "heme-biosynthesis-structure",
    overview: "Arterial Blood Gas (ABG) analysis is a critical diagnostic evaluation in emergency and intensive care units to determine oxygenation, ventilation, and acid-base disturbances.",
    keyDefinitions: [
      {
        term: "Serum Anion Gap",
        text: "The difference between unmeasured serum anions and unmeasured cations: Anion Gap = [Na⁺] - ([Cl⁻] + [HCO₃⁻]). Normal reference: 8 – 12 mEq/L."
      },
      {
        term: "High Anion Gap Metabolic Acidosis (HAGMA)",
        text: "Metabolic acidosis caused by accumulation of unmeasured fixed organic anions (Lactate, Ketones, Uremic toxins, Salicylates, Methanol, Ethylene glycol)."
      },
      {
        term: "ROME Mnemonic",
        text: "Respiratory Opposite (pH ↑ PaCO₂ ↓ = Alkalosis; pH ↓ PaCO₂ ↑ = Acidosis) and Metabolic Equal (pH ↑ HCO₃⁻ ↑ = Alkalosis; pH ↓ HCO₃⁻ ↓ = Acidosis)."
      }
    ],
    pathways: [
      {
        title: "Four Primary Acid-Base Disorders",
        steps: [
          "Respiratory Acidosis: pH < 7.35, PaCO₂ > 45 mmHg (Causes: COPD, respiratory depression, opioid overdose).",
          "Respiratory Alkalosis: pH > 7.45, PaCO₂ < 35 mmHg (Causes: Hyperventilation, panic attack, pulmonary embolism, early sepsis).",
          "Metabolic Acidosis: pH < 7.35, HCO₃⁻ < 22 mEq/L (Causes: DKA, lactic acidosis, renal failure, severe diarrhea).",
          "Metabolic Alkalosis: pH > 7.45, HCO₃⁻ > 26 mEq/L (Causes: Severe vomiting, nasogastric suction, loop diuretic overuse)."
        ]
      }
    ],
    clinicalPearls: [
      "MUDPILES mnemonic for High Anion Gap Metabolic Acidosis: Methanol, Uremia, DKA, Paraldehyde, Isoniazid/Iron, Lactic acidosis, Ethylene glycol, Salicylates.",
      "Normal Anion Gap (Hyperchloremic) Metabolic Acidosis is typically caused by severe diarrhea (loss of bicarbonate in stool) or renal tubular acidosis."
    ],
    referenceRanges: [
      { parameter: "Arterial pH", normal: "7.35 – 7.45" },
      { parameter: "PaCO₂", normal: "35 – 45 mmHg" },
      { parameter: "HCO₃⁻", normal: "22 – 26 mEq/L" },
      { parameter: "PaO₂", normal: "80 – 100 mmHg" },
      { parameter: "Serum Anion Gap", normal: "8 – 12 mEq/L" }
    ]
  },

  // =========================================================================
  // --- UNIT 6: HEME CATABOLISM & RENAL FUNCTION TESTS ---
  // =========================================================================
  "heme-biosynthesis-structure": {
    slug: "heme-biosynthesis-structure",
    unitNumber: 6,
    unitTitle: "Unit 6: Heme & Renal Function",
    lessonNumber: 1,
    totalLessonsInUnit: 3,
    title: "Heme Biosynthesis, Porphyrins & Lead Poisoning",
    category: "Heme & RFT",
    icon: "🩸",
    summary: "Mitochondrial ALAS rate-limiting step, ferrochelatase, structure of Fe²⁺ protoporphyrin IX, and porphyrias.",
    prevSlug: "abg-interpretation-anion-gap",
    nextSlug: "heme-degradation-jaundice-types",
    overview: "Heme is an iron-containing porphyrin prosthetic group essential for hemoglobin, myoglobin, cytochromes, catalase, and nitric oxide synthase.",
    keyDefinitions: [
      {
        term: "δ-Aminolevulinic Acid Synthase (ALAS)",
        text: "The committed, rate-limiting mitochondrial enzyme condensing Glycine and Succinyl-CoA, requiring Pyridoxal Phosphate (Vitamin B6) and feedback-inhibited by hemin."
      },
      {
        term: "Protoporphyrin IX",
        text: "Tetrapyrrole macrocycle linked by methenyl bridges that coordinates one central ferrous (Fe²⁺) atom."
      },
      {
        term: "Ferrochelatase (Heme Synthase)",
        text: "Mitochondrial enzyme catalyzing the insertion of Fe²⁺ into Protoporphyrin IX to form mature Heme."
      }
    ],
    pathways: [
      {
        title: "Heme Biosynthetic Sequence",
        steps: [
          "Mitochondria: Glycine + Succinyl-CoA → δ-Aminolevulinic Acid (ALA) catalyzed by ALAS-1 (liver) / ALAS-2 (erythroid).",
          "Cytoplasm: 2 ALA condense → Porphobilinogen (PBG); 4 PBG condense → Hydroxymethylbilane → Uroporphyrinogen III → Coproporphyrinogen III.",
          "Mitochondria: Coproporphyrinogen III → Protoporphyrinogen IX → Protoporphyrin IX + Fe²⁺ → Heme (Ferrochelatase)."
        ]
      }
    ],
    clinicalPearls: [
      "Lead poisoning inhibits both ALA Dehydratase and Ferrochelatase, causing microcytic anemia, basophilic stippling of RBCs, abdominal colic, and peripheral wrist drop.",
      "Acute Intermittent Porphyria (AIP) is a deficiency of Porphobilinogen Deaminase leading to neuro-visceral attacks (abdominal pain, psychosis, red-wine urine) triggered by drugs like barbiturates."
    ],
    referenceRanges: [
      { parameter: "Whole Blood Lead (Adult)", normal: "< 5.0 µg/dL" },
      { parameter: "Hemoglobin (Male)", normal: "13.8 – 17.2 g/dL" },
      { parameter: "Hemoglobin (Female)", normal: "12.1 – 15.1 g/dL" }
    ]
  },

  "heme-degradation-jaundice-types": {
    slug: "heme-degradation-jaundice-types",
    unitNumber: 6,
    unitTitle: "Unit 6: Heme & Renal Function",
    lessonNumber: 2,
    totalLessonsInUnit: 3,
    title: "Heme Degradation, Bilirubin Pathway & Jaundice Types",
    category: "Heme & RFT",
    icon: "🟡",
    summary: "Reticuloendothelial breakdown of senescent RBCs, UGT1A1 hepatic conjugation, and clinical differentiation of Pre-hepatic, Hepatic, and Post-hepatic Jaundice.",
    prevSlug: "heme-biosynthesis-structure",
    nextSlug: "renal-function-clearance-tests",
    overview: "Approximately 80% of daily bilirubin comes from the breakdown of senescent red blood cells in the spleen and liver. Jaundice (icterus) develops when serum bilirubin exceeds 2.0–2.5 mg/dL.",
    keyDefinitions: [
      {
        term: "Unconjugated (Indirect) Bilirubin",
        text: "Lipid-soluble, water-insoluble yellow pigment formed from biliverdin; transported in bloodstream tightly bound to serum albumin; cannot pass glomerular filter into urine."
      },
      {
        term: "Conjugated (Direct) Bilirubin",
        text: "Water-soluble Bilirubin Diglucuronide produced in hepatocytes by UDP-Glucuronosyltransferase (UGT1A1); excreted into bile and appears in urine during obstructive jaundice."
      },
      {
        term: "Stercobilin & Urobilin",
        text: "Intestinal bacterial breakdown products of conjugated bilirubin: Stercobilin imparts normal brown color to feces; Urobilin imparts normal amber yellow color to urine."
      }
    ],
    pathways: [
      {
        title: "Differential Lab Diagnosis of Jaundice",
        steps: [
          "Pre-Hepatic (Hemolytic): Elevated Unconjugated Bilirubin, elevated urinary urobilinogen, normal/dark stools, NO bilirubin in urine (acholuric jaundice).",
          "Hepatic (Hepatocellular): Elevated both Direct and Indirect Bilirubin, elevated AST/ALT (viral hepatitis, cirrhosis), urine contains both bilirubin and urobilinogen.",
          "Post-Hepatic (Obstructive/Cholestatic): Elevated Conjugated (Direct) Bilirubin, elevated Alkaline Phosphatase (ALP) & GGT, pale clay-colored stools, dark tea-colored urine with absent urobilinogen."
        ]
      }
    ],
    clinicalPearls: [
      "In neonatal physiological jaundice (immature UGT1A1 enzyme), blue-green phototherapy (420–470 nm) photo-isomerizes toxic unconjugated bilirubin into water-soluble Lumirubin excreted without hepatic conjugation.",
      "Clay-colored stools and dark amber urine with pruritus strongly signal common bile duct gallstone obstruction or pancreatic head malignancy."
    ],
    referenceRanges: [
      { parameter: "Total Serum Bilirubin", normal: "0.2 – 1.2 mg/dL" },
      { parameter: "Direct (Conjugated) Bilirubin", normal: "0.1 – 0.3 mg/dL" },
      { parameter: "Indirect (Unconjugated) Bilirubin", normal: "0.2 – 0.8 mg/dL" },
      { parameter: "Overt Clinical Jaundice Threshold", normal: "> 2.0 – 2.5 mg/dL" }
    ]
  },

  "renal-function-clearance-tests": {
    slug: "renal-function-clearance-tests",
    unitNumber: 6,
    unitTitle: "Unit 6: Heme & Renal Function",
    lessonNumber: 3,
    totalLessonsInUnit: 3,
    title: "Renal Function Tests, Clearance & GFR Evaluation",
    category: "Heme & RFT",
    icon: "🔬",
    summary: "Serum creatinine, BUN, 24-hr Creatinine Clearance (CrCl), Inulin gold standard, eGFR staging of Chronic Kidney Disease, and urinalysis.",
    prevSlug: "heme-degradation-jaundice-types",
    nextSlug: "immunoglobulin-classes-structure",
    overview: "Renal Function Tests (RFTs) assess glomerular filtration, tubular reabsorption/secretion, and excretory capacity of the kidneys to evaluate acute kidney injury and chronic kidney disease.",
    keyDefinitions: [
      {
        term: "Glomerular Filtration Rate (GFR)",
        text: "The total volume of fluid filtered from glomerular capillaries into Bowman's capsule per unit time (normal: 90 – 120 mL/min/1.73 m²)."
      },
      {
        term: "Creatinine Clearance (CrCl)",
        text: "CrCl = (Urine Creatinine [mg/dL] × Urine Volume [mL/24h]) / (Serum Creatinine [mg/dL] × 1440 min); clinical surrogate for GFR."
      },
      {
        term: "Inulin Clearance",
        text: "The physiological gold standard for GFR because inulin is freely filtered at glomeruli and neither reabsorbed, secreted, synthesized, nor metabolized by renal tubules."
      }
    ],
    pathways: [
      {
        title: "CKD Staging by eGFR",
        steps: [
          "Stage 1: eGFR ≥ 90 mL/min (Kidney damage with normal GFR, microalbuminuria).",
          "Stage 2: eGFR 60 – 89 mL/min (Mild reduction in GFR).",
          "Stage 3: eGFR 30 – 59 mL/min (Moderate reduction; Stage 3a: 45–59, Stage 3b: 30–44).",
          "Stage 4: eGFR 15 – 29 mL/min (Severe reduction in GFR; prepare for renal replacement).",
          "Stage 5: eGFR < 15 mL/min (End-Stage Renal Disease / Kidney Failure requiring dialysis or transplant)."
        ]
      }
    ],
    clinicalPearls: [
      "Serum Creatinine does not begin to rise above normal until roughly 50% of renal nephron mass is destroyed, making early microalbuminuria screening vital in diabetes.",
      "In acute dehydration (prerenal azotemia), BUN/Creatinine ratio rises sharply above 20:1 because sluggish tubular flow increases urea reabsorption while creatinine is excreted."
    ],
    referenceRanges: [
      { parameter: "Serum Creatinine (Male)", normal: "0.7 – 1.3 mg/dL" },
      { parameter: "Serum Creatinine (Female)", normal: "0.6 – 1.1 mg/dL" },
      { parameter: "Blood Urea Nitrogen (BUN)", normal: "7 – 20 mg/dL" },
      { parameter: "Creatinine Clearance (Male)", normal: "95 – 140 mL/min" },
      { parameter: "Creatinine Clearance (Female)", normal: "85 – 125 mL/min" }
    ]
  },

  // =========================================================================
  // --- UNIT 7: IMMUNOCHEMISTRY & ELISA DIAGNOSTIC ASSAYS ---
  // =========================================================================
  "immunoglobulin-classes-structure": {
    slug: "immunoglobulin-classes-structure",
    unitNumber: 7,
    unitTitle: "Unit 7: Immunochemistry",
    lessonNumber: 1,
    totalLessonsInUnit: 3,
    title: "Immunoglobulin Architecture & Isotype Classes",
    category: "Immunology",
    icon: "🛡️",
    summary: "Basic Y-shaped H₂L₂ antibody architecture, Fab vs Fc fragments, hypervariable CDR loops, and characteristics of IgG, IgA, IgM, IgD, and IgE.",
    prevSlug: "renal-function-clearance-tests",
    nextSlug: "antibody-functions-hypersensitivity",
    overview: "Immunoglobulins (antibodies) are specialized glycoproteins synthesized by differentiated B lymphocytes (plasma cells) that specifically recognize and bind foreign antigen epitopes.",
    keyDefinitions: [
      {
        term: "Antibody Subunit Architecture",
        text: "Composed of two identical Heavy (H) chains (γ, α, μ, δ, or ε) and two identical Light (L) chains (κ or λ) linked by interchain covalent disulfide (-S-S-) bonds."
      },
      {
        term: "Fab Fragment (Antigen Binding)",
        text: "The amino-terminal portion formed by VH + CH1 and VL + CL containing hypervariable Complementarity Determining Regions (CDRs) that bind antigen specifically."
      },
      {
        term: "Fc Fragment (Crystallizable)",
        text: "The carboxy-terminal constant heavy chain domain that mediates biological effector functions (complement fixation, Fc receptor binding on macrophages, placental transfer)."
      }
    ],
    pathways: [
      {
        title: "The 5 Immunoglobulin Classes (GAMED)",
        steps: [
          "IgG (~80%): Monomer, longest half-life (~21 days), ONLY antibody class crossing the human placenta to provide passive fetal protection.",
          "IgA (~15%): Dimeric with J-chain and Secretory Component; predominant in mucosal secretions (saliva, tears, colostrum, respiratory/GI mucus).",
          "IgM (~5–10%): 19S Pentamer (900 kDa) with 10 antigen-binding sites joined by a J-chain; earliest antibody produced during primary humoral response.",
          "IgE (<0.01%): Binds FcεRI on mast cells and basophils; mediates Type I anaphylaxis, allergies, and defense against helminthic parasites.",
          "IgD (<1%): Monomer co-expressed with IgM on naive B-cell surfaces as an antigen receptor."
        ]
      }
    ],
    clinicalPearls: [
      "Newborns receive maternal IgG across the placenta via FcRn receptors, protecting them for the first 6 months of life. Breastfeeding provides Secretory IgA protecting gut mucosa.",
      "Detection of specific IgM indicates acute current infection (e.g., IgM anti-HAV or IgM Dengue), whereas specific IgG indicates past infection or convalescent immunity."
    ],
    referenceRanges: [
      { parameter: "Serum IgG", normal: "700 – 1600 mg/dL" },
      { parameter: "Serum IgA", normal: "70 – 400 mg/dL" },
      { parameter: "Serum IgM", normal: "40 – 230 mg/dL" },
      { parameter: "Serum IgE", normal: "< 100 IU/mL" }
    ]
  },

  "antibody-functions-hypersensitivity": {
    slug: "antibody-functions-hypersensitivity",
    unitNumber: 7,
    unitTitle: "Unit 7: Immunochemistry",
    lessonNumber: 2,
    totalLessonsInUnit: 3,
    title: "Antibody Effector Functions & Hypersensitivity Reactions",
    category: "Immunology",
    icon: "⚡",
    summary: "Opsonization, classical complement cascade activation (C1q), antibody-dependent cellular cytotoxicity (ADCC), and Gell-Coombs hypersensitivity types I to IV.",
    prevSlug: "immunoglobulin-classes-structure",
    nextSlug: "elisa-formats-diagnostic-assays",
    overview: "Antibodies perform defense through neutralization of toxins/viruses, opsonization for phagocytosis, agglutination, and triggering the classical complement system.",
    keyDefinitions: [
      {
        term: "Opsonization",
        text: "Coating of bacterial surfaces by IgG antibodies and C3b complement fragments, enabling high-affinity binding to Fcγ receptors on neutrophils and macrophages."
      },
      {
        term: "Classical Complement Activation",
        text: "IgM (1 molecule) or IgG (2 adjacent molecules) bind antigen, exposing Fc binding sites for C1q, initiating the proteolytic cascade yielding C3 convertase and Membrane Attack Complex (MAC, C5b-9)."
      },
      {
        term: "Type I Hypersensitivity (Anaphylaxis)",
        text: "Immediate IgE-mediated degranulation of mast cells releasing histamine, leukotrienes, and prostaglandins, causing bronchospasm and cardiovascular collapse."
      }
    ],
    pathways: [
      {
        title: "Gell and Coombs Hypersensitivity Classification",
        steps: [
          "Type I (Immediate): IgE-mediated (Anaphylaxis, asthma, urticaria, penicillin allergy).",
          "Type II (Cytotoxic): IgG/IgM against cell-surface antigens (ABO mismatch transfusion reaction, Rh hemolytic disease of newborn, Myasthenia Gravis).",
          "Type III (Immune Complex): Antigen-antibody complexes deposited in vessel walls (Systemic Lupus Erythematosus / SLE, post-streptococcal glomerulonephritis).",
          "Type IV (Delayed / Cell-Mediated): CD4⁺ Th1 / CD8⁺ T-cell mediated (Tuberculin Mantoux test, contact dermatitis to poison ivy)."
        ]
      }
    ],
    clinicalPearls: [
      "In acute anaphylactic shock from intravenous penicillin or radiographic contrast, emergency first-line management is immediate intramuscular Epinephrine (1:1000, 0.3–0.5 mg) in the anterolateral thigh.",
      "The Tuberculin (Mantoux) skin test is read at 48–72 hours by measuring induration, a clinical example of Type IV delayed-type hypersensitivity."
    ],
    referenceRanges: [
      { parameter: "Total Serum Complement (CH50)", normal: "60 – 144 U/mL" },
      { parameter: "Serum C3 Level", normal: "90 – 180 mg/dL" },
      { parameter: "Serum C4 Level", normal: "10 – 40 mg/dL" }
    ]
  },

  "elisa-formats-diagnostic-assays": {
    slug: "elisa-formats-diagnostic-assays",
    unitNumber: 7,
    unitTitle: "Unit 7: Immunochemistry",
    lessonNumber: 3,
    totalLessonsInUnit: 3,
    title: "ELISA Diagnostic Assays & Automated Immunoassays",
    category: "Immunology",
    icon: "🔬",
    summary: "Enzyme-Linked Immunosorbent Assay principles, Direct, Indirect, Sandwich, and Competitive ELISA formats, microplate spectrophotometry, and clinical screening.",
    prevSlug: "antibody-functions-hypersensitivity",
    nextSlug: "/bio-chem-syllabus",
    overview: "ELISA is a gold-standard plate-based analytical biochemistry technique that detects and quantifies specific peptides, proteins, antibodies, and hormones using enzymatic colorimetric reporters.",
    keyDefinitions: [
      {
        term: "ELISA",
        text: "Enzyme-Linked Immunosorbent Assay: An assay where an antibody or antigen is conjugated to an enzyme (e.g., Horseradish Peroxidase / HRP or Alkaline Phosphatase) that converts a colorless substrate (TMB) into a colored product."
      },
      {
        term: "Indirect ELISA",
        text: "Antigen is coated on well bottom to detect patient antibodies; captured antibodies are detected by an enzyme-labeled secondary anti-human antibody (used in HIV antibody screening)."
      },
      {
        term: "Sandwich ELISA",
        text: "Monoclonal capture antibody is coated on well to bind patient antigen, sandwiched by a second enzyme-labeled detection antibody; highly specific and sensitive (used for TSH, hCG pregnancy tests, Troponin)."
      },
      {
        term: "Competitive ELISA",
        text: "Sample antigen competes with labeled antigen for limited antibody binding sites; optical density signal is inversely proportional to patient antigen concentration."
      }
    ],
    pathways: [
      {
        title: "Standard Sandwich ELISA Procedure",
        steps: [
          "1. Coating: Microplate well is coated with high-affinity capture antibody; unbound sites blocked with BSA.",
          "2. Sample Incubation: Patient serum is added; target antigen binds specifically to capture antibody.",
          "3. Washing: Automated aspiration/washing removes unbound proteins and serum contaminants.",
          "4. Detection Antibody: Enzyme-conjugated (HRP) secondary antibody is added, forming a sandwich.",
          "5. Substrate Addition: TMB substrate is added; HRP oxidizes TMB producing an intense blue chromogen.",
          "6. Stop Solution: 1N Sulfuric Acid (H₂SO₄) is added turning solution yellow; absorbance is measured at 450 nm."
        ]
      }
    ],
    clinicalPearls: [
      "ELISA is the universal primary screening test for HIV-1/2, Hepatitis B (HBsAg), and Hepatitis C. Reactive samples must always be confirmed with Western Blot or nucleic acid PCR.",
      "Urine pregnancy test strips utilize rapid lateral flow sandwich immunoassay principles to detect human Chorionic Gonadotropin (β-hCG)."
    ],
    referenceRanges: [
      { parameter: "HIV ELISA Cutoff Index", normal: "< 0.90 (Non-reactive)" },
      { parameter: "Serum β-hCG (Non-pregnant)", normal: "< 5.0 mIU/mL" },
      { parameter: "Serum TSH", normal: "0.4 – 4.5 µIU/mL" }
    ]
  }
};
