// High-Yield Assessment Question Bank for Nursing Biochemistry
// 15 Questions per Module (Units 1 - 7) + 40 Questions for the Grand Final Assessment

export const MODULE_ASSESSMENTS = {
  // UNIT 1: Carbohydrates & Glucose Homeostasis (15 Questions)
  'unit-1-carbs': {
    title: 'Unit 1: Carbohydrates & Metabolism Assessment',
    description: '15 High-Yield Questions on Classification, Glycolysis, TCA Cycle, Glucose Homeostasis, and Diabetes Mellitus.',
    questions: [
      {
        id: 1,
        text: 'Which of the following is classified as a non-reducing disaccharide because both of its anomeric carbons participate in the glycosidic bond?',
        options: ['Maltose', 'Lactose', 'Sucrose', 'Cellobiose'],
        correctAnswer: 2,
        rationale: 'Sucrose (Glucose α-1,β-2 Fructose) has both anomeric carbons involved in the glycosidic linkage, preventing mutarotation and reduction of Benedict’s reagent.',
        reviewTopic: 'Classification of Carbohydrates (/classification-of-carb)'
      },
      {
        id: 2,
        text: 'What is the net yield of ATP produced per molecule of glucose oxidized during anaerobic glycolysis?',
        options: ['2 ATP', '4 ATP', '8 ATP', '32 ATP'],
        correctAnswer: 0,
        rationale: 'Anaerobic glycolysis consumes 2 ATP (Hexokinase, PFK-1) and generates 4 ATP by substrate-level phosphorylation (Phosphoglycerate kinase, Pyruvate kinase), yielding a NET of 2 ATP (and 2 Lactate).',
        reviewTopic: 'Metabolic Pathways of Carbohydrates (/MetabolicPathwaysOfCarb)'
      },
      {
        id: 3,
        text: 'Which enzyme serves as the primary rate-limiting and committed step of the glycolytic pathway?',
        options: ['Hexokinase', 'Phosphofructokinase-1 (PFK-1)', 'Pyruvate Kinase', 'Aldolase'],
        correctAnswer: 1,
        rationale: 'Phosphofructokinase-1 (PFK-1) catalyzes the irreversible phosphorylation of Fructose-6-phosphate to Fructose-1,6-bisphosphate, serving as the main regulatory pacemaker of glycolysis.',
        reviewTopic: 'Metabolic Pathways of Carbohydrates (/MetabolicPathwaysOfCarb)'
      },
      {
        id: 4,
        text: 'Which transport protein is responsible for the secondary active co-transport of glucose and galactose across the apical membrane of intestinal enterocytes?',
        options: ['GLUT2', 'GLUT4', 'SGLT1', 'GLUT5'],
        correctAnswer: 2,
        rationale: 'SGLT1 uses the electrochemical gradient created by the basolateral Na+/K+ ATPase pump to co-transport 2 Na+ ions along with 1 Glucose or Galactose molecule into enterocytes.',
        reviewTopic: 'Absorption of Carbohydrates (/absorption-of-carb)'
      },
      {
        id: 5,
        text: 'By what mechanism is dietary fructose absorbed across the luminal brush border membrane?',
        options: ['Secondary active transport via SGLT1', 'Facilitated diffusion via GLUT5', 'Simple passive diffusion through tight junctions', 'Pinocytosis via caveolae'],
        correctAnswer: 1,
        rationale: 'Fructose is absorbed across the apical enterocyte membrane via facilitated diffusion mediated by the insulin-independent transporter GLUT5.',
        reviewTopic: 'Absorption of Carbohydrates (/absorption-of-carb)'
      },
      {
        id: 6,
        text: 'How many molecules of ATP are generated from the complete oxidation of one molecule of Acetyl-CoA in the Citric Acid (Krebs) Cycle?',
        options: ['2 ATP', '8 ATP', '12 ATP', '24 ATP'],
        correctAnswer: 2,
        rationale: 'One turn of the TCA cycle yields 3 NADH (9 ATP via ETC), 1 FADH2 (2 ATP via ETC), and 1 GTP/ATP by substrate-level phosphorylation = Total 12 ATP per Acetyl-CoA.',
        reviewTopic: 'Metabolic Pathways of Carbohydrates (/MetabolicPathwaysOfCarb)'
      },
      {
        id: 7,
        text: 'Which enzyme in the Citric Acid Cycle catalyzes substrate-level phosphorylation to generate GTP/ATP?',
        options: ['Citrate synthase', 'Isocitrate dehydrogenase', 'Succinate thiokinase (Succinyl-CoA synthetase)', 'Fumarase'],
        correctAnswer: 2,
        rationale: 'Succinate thiokinase converts Succinyl-CoA to Succinate, coupling the thioester bond cleavage with GDP phosphorylation to GTP (which transfers phosphate to ADP to make ATP).',
        reviewTopic: 'Metabolic Pathways of Carbohydrates (/MetabolicPathwaysOfCarb)'
      },
      {
        id: 8,
        text: 'Which of the following non-carbohydrate substrates cannot serve as a net precursor for hepatic gluconeogenesis in humans?',
        options: ['Lactate', 'Glycerol', 'Alanine', 'Acetyl-CoA (from even-chain fatty acids)'],
        correctAnswer: 3,
        rationale: 'The pyruvate dehydrogenase reaction is irreversible in mammals; Acetyl-CoA loses its two carbons as CO2 in the TCA cycle before oxaloacetate is regenerated, yielding no net glucose.',
        reviewTopic: 'Metabolic Pathways of Carbohydrates (/MetabolicPathwaysOfCarb)'
      },
      {
        id: 9,
        text: 'What is the key regulatory and rate-limiting enzyme of glycogenolysis in the liver?',
        options: ['Glycogen synthase', 'Glycogen phosphorylase', 'UDP-glucose pyrophosphorylase', 'Phosphoglucomutase'],
        correctAnswer: 1,
        rationale: 'Glycogen phosphorylase cleaves α-1,4 glycosidic bonds by phosphorolysis to produce Glucose-1-phosphate, activated by Glucagon and Epinephrine via cAMP/PKA.',
        reviewTopic: 'Metabolic Pathways of Carbohydrates (/MetabolicPathwaysOfCarb)'
      },
      {
        id: 10,
        text: 'According to clinical laboratory standards, what fasting plasma glucose (FPG) threshold confirms a diagnosis of Diabetes Mellitus on two separate tests?',
        options: ['≥ 100 mg/dL', '≥ 110 mg/dL', '≥ 126 mg/dL (7.0 mmol/L)', '≥ 200 mg/dL'],
        correctAnswer: 2,
        rationale: 'Fasting Plasma Glucose ≥ 126 mg/dL (7.0 mmol/L) after an 8-hour fast on two separate occasions diagnostic criteria for Diabetes Mellitus.',
        reviewTopic: 'Regulation of Blood Glucose (/RegulationOfBloodGlucose)'
      },
      {
        id: 11,
        text: 'Why is sodium fluoride (NaF) added to blood collection tubes for blood glucose analysis?',
        options: ['It activates insulin receptors in vitro', 'It inhibits the enzyme enolase to prevent in vitro glycolysis by RBCs', 'It degrades plasma proteins', 'It binds glucose to stabilize optical absorption'],
        correctAnswer: 1,
        rationale: 'Fluoride ions inhibit the glycolytic enzyme enolase, preventing red blood cells from consuming 5-7% of serum glucose per hour at room temperature.',
        reviewTopic: 'Regulation of Blood Glucose (/RegulationOfBloodGlucose)'
      },
      {
        id: 12,
        text: 'Which clinical feature is characteristic of Diabetic Ketoacidosis (DKA) in Type 1 Diabetes Mellitus?',
        options: ['Severe metabolic alkalosis with shallow respirations', 'Hyperglycemia, positive serum ketones, and Kussmaul deep rapid breathing', 'Extreme hypernatremia without acidosis', 'Blood glucose > 1000 mg/dL without ketonuria'],
        correctAnswer: 1,
        rationale: 'DKA presents with hyperglycemia (>250 mg/dL), ketonemia/ketonuria (acetoacetate and β-hydroxybutyrate), metabolic acidosis (pH < 7.30), and compensatory Kussmaul hyperventilation to blow off CO2.',
        reviewTopic: 'Diabetes Mellitus Type 1 (/DiabetesMellitusType1)'
      },
      {
        id: 13,
        text: 'What is the immediate first-line nursing intervention for an alert patient experiencing hypoglycemia with a capillary blood glucose of 54 mg/dL?',
        options: ['Administer 10 units of regular IV insulin', 'Administer 15 grams of fast-acting simple carbohydrates (Rule of 15) and recheck in 15 min', 'Place the patient in Trendelenburg position', 'Administer 500 mL of 0.9% normal saline IV bolus'],
        correctAnswer: 1,
        rationale: 'The "Rule of 15" dictates administering 15g of fast-acting oral carbohydrates (4 oz juice/soda), waiting 15 minutes, and retesting glucose until it exceeds 70 mg/dL.',
        reviewTopic: 'Regulation of Blood Glucose (/RegulationOfBloodGlucose)'
      },
      {
        id: 14,
        text: 'Which GLUT transporter isoform is translocated to plasma membranes in skeletal muscle and adipose tissue in response to insulin signaling?',
        options: ['GLUT1', 'GLUT2', 'GLUT3', 'GLUT4'],
        correctAnswer: 3,
        rationale: 'GLUT4 is the insulin-sensitive glucose transporter stored in intracellular vesicles that translocates to the cell membrane upon insulin binding to its receptor.',
        reviewTopic: 'Regulation of Blood Glucose (/RegulationOfBloodGlucose)'
      },
      {
        id: 15,
        text: 'In chronic diabetes, non-enzymatic glycation of hemoglobin produces HbA1c. What time period of glycemic control does an HbA1c test reflect?',
        options: ['Past 24 hours', 'Past 1 to 2 weeks', 'Past 8 to 12 weeks (2-3 months)', 'Past 1 year'],
        correctAnswer: 2,
        rationale: 'HbA1c reflects the average blood glucose concentration over the lifespan of erythrocytes, approximately 8 to 12 weeks (2-3 months).',
        reviewTopic: 'Diabetes Mellitus Type 2 (/DiabetesMellitusType2)'
      }
    ]
  },

  // UNIT 2: Lipids & Fatty Acid Metabolism (15 Questions)
  'unit-2-lipids': {
    title: 'Unit 2: Lipids & Fatty Acid Metabolism Assessment',
    description: '15 High-Yield Questions on Fatty Acids, MUFA/PUFA, β-Oxidation, Cholesterol, Lipoproteins, and Ketone Bodies.',
    questions: [
      {
        id: 1,
        text: 'Which of the following is an example of a Monounsaturated Fatty Acid (MUFA) predominant in olive oil and the Mediterranean diet?',
        options: ['Palmitic acid', 'Oleic acid (18:1; 9)', 'Linoleic acid (18:2; 9,12)', 'Stearic acid'],
        correctAnswer: 1,
        rationale: 'Oleic acid is an 18-carbon monounsaturated fatty acid with a single cis double bond at carbon 9, shown to lower LDL without reducing protective HDL.',
        reviewTopic: 'MUFA (/MUFA)'
      },
      {
        id: 2,
        text: 'Why are Linoleic acid (ω-6) and α-Linolenic acid (ω-3) considered Essential Fatty Acids (EFAs) in humans?',
        options: ['Human cells lack Δ12 and Δ15 desaturase enzymes', 'They are insoluble in bile salts', 'They cannot be transported by serum albumin', 'They are exclusively synthesized in plant chloroplasts'],
        correctAnswer: 0,
        rationale: 'Mammalian enzymes cannot insert double bonds beyond carbon 9 from the carboxyl end (Δ9); hence, ω-6 (Δ12) and ω-3 (Δ15) fatty acids must be provided in the diet.',
        reviewTopic: 'Essential Fatty Acids (/EssentialFattyAcids)'
      },
      {
        id: 3,
        text: 'What is the subcellular site where the four core reactions of β-oxidation of fatty acids take place?',
        options: ['Cytosol', 'Mitochondrial matrix', 'Smooth endoplasmic reticulum', 'Lysosomal lumen'],
        correctAnswer: 1,
        rationale: 'Activated fatty acyl-CoA is transported across the inner mitochondrial membrane via the carnitine shuttle into the mitochondrial matrix, where β-oxidation enzymes reside.',
        reviewTopic: 'Lipids (/FattyAcidsClassification)'
      },
      {
        id: 4,
        text: 'Which transport shuttle system facilitates the entry of long-chain fatty acyl-CoA into the mitochondrial matrix for β-oxidation?',
        options: ['Malate-aspartate shuttle', 'Glycerol-3-phosphate shuttle', 'Carnitine palmitoyltransferase (CPT-1 / CPT-2) shuttle', 'Citrate-pyruvate shuttle'],
        correctAnswer: 2,
        rationale: 'CPT-1 (Carnitine Palmitoyltransferase-1) on the outer mitochondrial membrane converts acyl-CoA to acylcarnitine, which is shuttled into the matrix and reconstituted by CPT-2.',
        reviewTopic: 'Lipids (/FattyAcidsClassification)'
      },
      {
        id: 5,
        text: 'In the complete β-oxidation of Palmitic acid (16 carbons), how many molecules of Acetyl-CoA and rounds of cleavage are produced?',
        options: ['6 Acetyl-CoA, 6 cycles', '8 Acetyl-CoA, 7 cycles', '8 Acetyl-CoA, 8 cycles', '16 Acetyl-CoA, 15 cycles'],
        correctAnswer: 1,
        rationale: 'Palmitoyl-CoA (16C) undergoes 7 cycles of β-oxidation to yield 8 Acetyl-CoA, 7 FADH2, and 7 NADH.',
        reviewTopic: 'Lipids (/FattyAcidsClassification)'
      },
      {
        id: 6,
        text: 'What is the rate-limiting and committed enzyme in the biosynthesis of cholesterol in the liver and target of Statin medications?',
        options: ['HMG-CoA synthase', 'HMG-CoA reductase', 'Squalene synthase', '7α-hydroxylase'],
        correctAnswer: 1,
        rationale: 'HMG-CoA Reductase catalyzes the reduction of HMG-CoA to mevalonate; it is inhibited competitively by statin drugs (e.g., Atorvastatin) to lower blood cholesterol.',
        reviewTopic: 'Lipids (/FattyAcidsClassification)'
      },
      {
        id: 7,
        text: 'Which lipoprotein particle is synthesized in intestinal mucosal cells to transport dietary triglycerides into the lymphatic system and bloodstream?',
        options: ['VLDL', 'Chylomicrons', 'LDL', 'HDL'],
        correctAnswer: 1,
        rationale: 'Chylomicrons are formed in intestinal enterocytes, carrying exogenous (dietary) triglycerides and fat-soluble vitamins through the thoracic duct into circulation.',
        reviewTopic: 'Lipids (/FattyAcidsClassification)'
      },
      {
        id: 8,
        text: 'Why is High-Density Lipoprotein (HDL) clinically referred to as "good cholesterol"?',
        options: ['It delivers cholesterol to coronary arterial walls', 'It carries out Reverse Cholesterol Transport by removing excess cholesterol from peripheral tissues to the liver', 'It stimulates VLDL production', 'It prevents bile acid synthesis'],
        correctAnswer: 1,
        rationale: 'HDL mediates Reverse Cholesterol Transport, picking up free cholesterol from peripheral tissues via ABCA1/LCAT and returning it to the liver for excretion as bile salts.',
        reviewTopic: 'Lipids (/FattyAcidsClassification)'
      },
      {
        id: 9,
        text: 'Which of the following compounds is the active hormonal form of Vitamin D synthesized by successive hydroxylations in the liver and kidney?',
        options: ['7-Dehydrocholesterol', 'Cholecalciferol (Vitamin D3)', '25-Hydroxycholecalciferol (Calcidiol)', '1,25-Dihydroxycholecalciferol (Calcitriol)'],
        correctAnswer: 3,
        rationale: 'Calcitriol (1,25-(OH)2-D3) is the biologically active hormone that stimulates intestinal calcium absorption, renal calcium reabsorption, and bone remodeling.',
        reviewTopic: 'Lipids (/FattyAcidsClassification)'
      },
      {
        id: 10,
        text: 'Which three substances constitute the clinical group known as "Ketone Bodies"?',
        options: ['Pyruvate, Lactate, Citrate', 'Acetoacetate, β-Hydroxybutyrate, Acetone', 'Alanine, Glutamine, Urea', 'Glycerol, Palmitate, Stearate'],
        correctAnswer: 1,
        rationale: 'Ketone bodies comprise Acetoacetate, β-Hydroxybutyrate, and Acetone (a non-metabolizable volatile product exhaled in breath giving a fruity odor).',
        reviewTopic: 'Lipids (/FattyAcidsClassification)'
      },
      {
        id: 11,
        text: 'Under conditions of prolonged starvation or untreated diabetes, which organ is the primary site of ketogenesis?',
        options: ['Brain', 'Skeletal muscle', 'Liver (mitochondria of hepatocytes)', 'Kidney cortex'],
        correctAnswer: 2,
        rationale: 'Ketogenesis occurs exclusively in liver mitochondria when Acetyl-CoA accumulation from massive β-oxidation exceeds the capacity of the TCA cycle (due to oxaloacetate depletion).',
        reviewTopic: 'Lipids (/FattyAcidsClassification)'
      },
      {
        id: 12,
        text: 'What clinical condition is characterized by the presence of unabsorbed fat in the feces, producing bulky, foul-smelling, clay-colored stools?',
        options: ['Hematuria', 'Steatorrhea', 'Proteinuria', 'Ketonuria'],
        correctAnswer: 1,
        rationale: 'Steatorrhea results from impaired lipid digestion or absorption caused by pancreatic lipase deficiency (e.g., chronic pancreatitis) or biliary obstruction.',
        reviewTopic: 'Lipids (/FattyAcidsClassification)'
      },
      {
        id: 13,
        text: 'What is the primary physiological function of lung surfactant (Dipalmitoylphosphatidylcholine / Lecithin)?',
        options: ['Enhance oxygen binding to hemoglobin', 'Reduce alveolar surface tension to prevent lung collapse during expiration', 'Inhibit macrophage phagocytosis', 'Stimulate mucociliary clearance'],
        correctAnswer: 1,
        rationale: 'Dipalmitoyl lecithin acts as a pulmonary surfactant, reducing surface tension at the air-liquid alveolar interface to prevent atelectasis in newborns and adults.',
        reviewTopic: 'Lipids (/FattyAcidsClassification)'
      },
      {
        id: 14,
        text: 'What structural feature distinguishes trans-fatty acids (TFAs) produced during industrial partial hydrogenation of vegetable oils?',
        options: ['Hydrogen atoms are on the same side of the double bond, creating a sharp kink', 'Hydrogen atoms are on opposite sides of the double bond, creating a straight rigid hydrocarbon chain', 'They contain an odd number of carbon atoms', 'They contain no double bonds'],
        correctAnswer: 1,
        rationale: 'Trans double bonds place hydrogen atoms on opposite sides, preventing kinks and allowing rigid packing similar to saturated fats, which increases LDL and lowers HDL.',
        reviewTopic: 'PUFA (/PUFA)'
      },
      {
        id: 15,
        text: 'Which eicosanoid derivative synthesized from arachidonic acid is responsible for platelet aggregation and vasoconstriction?',
        options: ['Prostacyclin (PGI2)', 'Thromboxane A2 (TXA2)', 'Leukotriene B4 (LTB4)', 'Lipoxin A4'],
        correctAnswer: 1,
        rationale: 'Thromboxane A2 (TXA2), synthesized by platelets via COX-1, promotes platelet aggregation and vasoconstriction, opposed by endothelial Prostacyclin (PGI2).',
        reviewTopic: 'Essential Fatty Acids (/EssentialFattyAcids)'
      }
    ]
  },

  // UNIT 3: Proteins, Amino Acids & Urea Cycle (15 Questions)
  'unit-3-proteins': {
    title: 'Unit 3: Proteins, Amino Acids & Urea Cycle Assessment',
    description: '15 Questions on Protein Structure, Amino Acid Properties, Protease Digestion, and Ammonia Detoxification.',
    questions: [
      {
        id: 1,
        text: 'What is the average nitrogen content by weight in human tissue proteins?',
        options: ['5%', '10%', '16%', '25%'],
        correctAnswer: 2,
        rationale: 'Proteins contain an average of 16% nitrogen by weight, which forms the basis for the Kjeldahl method factor (Protein = Nitrogen × 6.25).',
        reviewTopic: 'Syllabus (/bio-chem-syllabus)'
      },
      {
        id: 2,
        text: 'Which amino acid is the simplest standard amino acid and lacks an asymmetric α-carbon, making it optically inactive?',
        options: ['Alanine', 'Glycine', 'Valine', 'Proline'],
        correctAnswer: 1,
        rationale: 'Glycine has a single hydrogen atom as its R-group side chain (two identical H atoms on the α-carbon), making it the only optically inactive standard amino acid.',
        reviewTopic: 'Syllabus (/bio-chem-syllabus)'
      },
      {
        id: 3,
        text: 'What term describes an amino acid molecule at its isoelectric pH (pI) carrying equal positive and negative charges with a net electrical charge of zero?',
        options: ['Cation', 'Anion', 'Zwitterion (Dipolar ion)', 'Micelle'],
        correctAnswer: 2,
        rationale: 'At its isoelectric point (pI), an amino acid exists as a zwitterion (-COO- and -NH3+), possessing zero net charge, minimum solubility, and no mobility in an electric field.',
        reviewTopic: 'Syllabus (/bio-chem-syllabus)'
      },
      {
        id: 4,
        text: 'Which level of protein structural organization is characterized by α-helices and β-pleated sheets stabilized by hydrogen bonds between peptide backbone -NH and -C=O groups?',
        options: ['Primary structure', 'Secondary structure', 'Tertiary structure', 'Quaternary structure'],
        correctAnswer: 1,
        rationale: 'Secondary structure refers to local spatial arrangements of the polypeptide backbone, predominantly α-helices and β-sheets stabilized by backbone hydrogen bonding.',
        reviewTopic: 'Syllabus (/bio-chem-syllabus)'
      },
      {
        id: 5,
        text: 'What happens during the denaturation of a native globular protein by physical agents such as heat or chemical agents like 8M urea?',
        options: ['Primary covalent peptide bonds are hydrolyzed', 'Secondary, tertiary, and quaternary conformations are disrupted while peptide bonds remain intact', 'Amino acids are deaminated to ammonia', 'Disulfide bonds convert into peptide bonds'],
        correctAnswer: 1,
        rationale: 'Denaturation unfolds the higher-order 3D structure (secondary, tertiary, quaternary) by breaking non-covalent bonds (H-bonds, ionic, hydrophobic), leaving covalent peptide bonds intact.',
        reviewTopic: 'Syllabus (/bio-chem-syllabus)'
      },
      {
        id: 6,
        text: 'Which of the following is a purely ketogenic amino acid that generates only Acetoacetate or Acetyl-CoA during catabolism?',
        options: ['Alanine', 'Leucine', 'Glycine', 'Aspartate'],
        correctAnswer: 1,
        rationale: 'Leucine (and Lysine) are exclusively ketogenic amino acids that cannot be converted to glucose via gluconeogenesis.',
        reviewTopic: 'Syllabus (/bio-chem-syllabus)'
      },
      {
        id: 7,
        text: 'Which zymogen is secreted by gastric chief cells and auto-activated by gastric hydrochloric acid (HCl) at pH 1.5–2.0?',
        options: ['Trypsinogen', 'Pepsinogen', 'Chymotrypsinogen', 'Procarboxypeptidase'],
        correctAnswer: 1,
        rationale: 'Chief cells secrete inactive pepsinogen, which is cleaved by gastric HCl into active pepsin; pepsin then catalyzes autoactivation of remaining pepsinogen.',
        reviewTopic: 'Syllabus (/bio-chem-syllabus)'
      },
      {
        id: 8,
        text: 'Which intestinal brush border enzyme activates pancreatic trypsinogen into active trypsin in the duodenum?',
        options: ['Enteropeptidase (Enterokinase)', 'Maltase', 'Aminopeptidase', 'Lactase'],
        correctAnswer: 0,
        rationale: 'Enteropeptidase (enterokinase) cleaves a hexapeptide from the N-terminus of trypsinogen to produce active trypsin, which then activates all other pancreatic zymogens.',
        reviewTopic: 'Syllabus (/bio-chem-syllabus)'
      },
      {
        id: 9,
        text: 'What is the primary organ site responsible for the synthesis of urea to detoxify toxic ammonia in the human body?',
        options: ['Kidneys', 'Liver', 'Brain', 'Skeletal muscle'],
        correctAnswer: 1,
        rationale: 'The complete Urea Cycle operates exclusively in hepatocytes (liver), with the first two reactions in mitochondria and remaining three in the cytosol.',
        reviewTopic: 'Syllabus (/bio-chem-syllabus)'
      },
      {
        id: 10,
        text: 'Which enzyme catalyzes the committed, rate-limiting first step of the Urea Cycle in the mitochondrial matrix?',
        options: ['Ornithine transcarbamoylase', 'Carbamoyl Phosphate Synthetase-I (CPS-I)', 'Argininosuccinate synthetase', 'Arginase'],
        correctAnswer: 1,
        rationale: 'Carbamoyl Phosphate Synthetase-I (CPS-I) catalyzes the condensation of ammonia, bicarbonate, and 2 ATP to form carbamoyl phosphate; it requires N-acetylglutamate (NAG) as an obligate activator.',
        reviewTopic: 'Syllabus (/bio-chem-syllabus)'
      },
      {
        id: 11,
        text: 'What is the normal reference range of serum blood urea in a healthy adult?',
        options: ['5 to 10 mg/dL', '20 to 40 mg/dL', '80 to 120 mg/dL', '150 to 200 mg/dL'],
        correctAnswer: 1,
        rationale: 'The normal blood urea concentration in a healthy adult ranges between 20 and 40 mg/dL (corresponding to Blood Urea Nitrogen / BUN of 7 to 20 mg/dL).',
        reviewTopic: 'Syllabus (/bio-chem-syllabus)'
      },
      {
        id: 12,
        text: 'Which amino acid provides the second nitrogen atom required to construct the urea molecule during the argininosuccinate synthetase reaction?',
        options: ['Glutamate', 'Aspartate', 'Alanine', 'Glycine'],
        correctAnswer: 1,
        rationale: 'The first nitrogen in urea comes from free ammonia (NH3) via carbamoyl phosphate, and the second nitrogen is donated by Aspartate.',
        reviewTopic: 'Syllabus (/bio-chem-syllabus)'
      },
      {
        id: 13,
        text: 'In the final reaction of the urea cycle, which cytosolic enzyme hydrolyzes arginine to produce urea and regenerate ornithine?',
        options: ['Arginase', 'Argininosuccinate lyase', 'Urease', 'Glutaminase'],
        correctAnswer: 0,
        rationale: 'Arginase cleaves the guanidino group of arginine, releasing urea into the blood for renal excretion and regenerating ornithine to enter the next cycle.',
        reviewTopic: 'Syllabus (/bio-chem-syllabus)'
      },
      {
        id: 14,
        text: 'What metabolic condition develops when severe hepatic failure impairs the urea cycle, leading to dangerous accumulation of ammonia in arterial blood and crossing of the blood-brain barrier?',
        options: ['Diabetic Ketoacidosis', 'Hepatic Encephalopathy / Hyperammonemia', 'Gouty arthritis', 'Lactic acidosis'],
        correctAnswer: 1,
        rationale: 'Hyperammonemia causes ammonia to cross the blood-brain barrier, depleting α-ketoglutarate and glutamate to form glutamine in astrocytes, resulting in brain edema and hepatic encephalopathy.',
        reviewTopic: 'Syllabus (/bio-chem-syllabus)'
      },
      {
        id: 15,
        text: 'Which dietary protein source is considered a "Complete / Class I" protein because it contains all essential amino acids in proportions required for optimal growth?',
        options: ['Zein from corn', 'Gelatin', 'Egg albumin / Casein of milk', 'Wheat gluten'],
        correctAnswer: 2,
        rationale: 'Egg albumin and milk casein are complete proteins containing all essential amino acids with high biological value and net protein utilization.',
        reviewTopic: 'Syllabus (/bio-chem-syllabus)'
      }
    ]
  },

  // UNIT 4: Clinical Enzymology & Myocardial Infarction (15 Questions)
  'unit-4-enzymes': {
    title: 'Unit 4: Clinical Enzymology & Myocardial Infarction',
    description: '15 High-Yield Questions on Isoenzymes, Inhibitor Mechanisms, Enzyme Kinetics, and Cardiac Biomarkers in MI.',
    questions: [
      {
        id: 1,
        text: 'What is the biochemical definition of an "Isoenzyme" (isozyme)?',
        options: ['Enzymes that break down proteins into amino acids', 'Physically distinct forms of an enzyme that catalyze the same chemical reaction but differ in amino acid sequence and properties', 'Inactive zymogens requiring cofactor binding', 'Enzymes found exclusively inside bacteria'],
        correctAnswer: 1,
        rationale: 'Isoenzymes are multiple molecular forms of an enzyme catalyzing identical chemical reactions, exhibiting different electrophoretic mobility, kinetic parameters (Km), and tissue distribution.',
        reviewTopic: 'Syllabus (/bio-chem-syllabus)'
      },
      {
        id: 2,
        text: 'Which Creatine Kinase (CK) isoenzyme is predominantly localized in myocardium and serves as a classical diagnostic marker for acute myocardial infarction?',
        options: ['CK-1 (BB)', 'CK-2 (MB)', 'CK-3 (MM)', 'CK-Mt'],
        correctAnswer: 1,
        rationale: 'CK-2 (MB) constitutes ~20–30% of cardiac tissue CK (compared to <1% in skeletal muscle); elevated serum CK-MB indicates acute myocardial injury.',
        reviewTopic: 'Syllabus (/bio-chem-syllabus)'
      },
      {
        id: 3,
        text: 'Following the onset of acute chest pain in Myocardial Infarction, when do serum CK-MB levels typically begin to rise and when do they peak?',
        options: ['Rise in 1 hour, peak in 4 hours', 'Rise in 4–6 hours, peak in 12–24 hours, return to normal in 48–72 hours', 'Rise in 24 hours, peak in 5 days', 'Rise after 1 week, peak in 2 weeks'],
        correctAnswer: 1,
        rationale: 'CK-MB begins rising 4–6 hours post-infarction, peaks at 12–24 hours, and returns to baseline within 48–72 hours, making it especially valuable for detecting re-infarction.',
        reviewTopic: 'Syllabus (/bio-chem-syllabus)'
      },
      {
        id: 4,
        text: 'In the diagnosis of Myocardial Infarction, what is meant by the "LDH Flipped Pattern"?',
        options: ['LDH-5 exceeds LDH-1 in acute liver failure', 'Serum LDH-1 activity exceeds LDH-2 (LDH-1 > LDH-2 ratio > 1)', 'Total LDH decreases below baseline', 'LDH becomes inactive at body temperature'],
        correctAnswer: 1,
        rationale: 'Normally, serum LDH-2 is higher than LDH-1. In acute myocardial infarction, heart-rich LDH-1 (H4) is released in large amounts, causing LDH-1 to exceed LDH-2 (flipped pattern).',
        reviewTopic: 'Syllabus (/bio-chem-syllabus)'
      },
      {
        id: 5,
        text: 'Which model of enzyme action proposed by Daniel Koshland states that substrate binding induces a dynamic conformational change in the enzyme active site?',
        options: ['Lock and Key model of Emil Fischer', 'Induced Fit model', 'Fluid Mosaic model', 'Chemiosmotic model'],
        correctAnswer: 1,
        rationale: 'Koshland’s Induced Fit model (1958) proposes that the active site is flexible and reshapes dynamically upon substrate encounter to optimize catalytic transition state binding.',
        reviewTopic: 'Syllabus (/bio-chem-syllabus)'
      },
      {
        id: 6,
        text: 'How does a Competitive Enzyme Inhibitor affect the kinetic parameters Vmax and Km of an enzymatic reaction?',
        options: ['Vmax decreases, Km remains unchanged', 'Vmax remains unchanged, apparent Km increases', 'Both Vmax and Km decrease', 'Both Vmax and Km increase'],
        correctAnswer: 1,
        rationale: 'Competitive inhibitors bind reversibly to the active site. High substrate concentrations outcompete the inhibitor, so Vmax is maintained, but a higher substrate concentration is needed (Km increases).',
        reviewTopic: 'Syllabus (/bio-chem-syllabus)'
      },
      {
        id: 7,
        text: 'Which type of inhibitor binds to an allosteric site (separate from the active site) on both free enzyme and ES complex, reducing Vmax without changing Km?',
        options: ['Competitive inhibitor', 'Non-competitive inhibitor', 'Uncompetitive inhibitor', 'Substrate analogue'],
        correctAnswer: 1,
        rationale: 'Non-competitive inhibitors bind elsewhere on the enzyme, impairing catalytic turnover (Vmax decreases) without altering substrate affinity at the active site (Km unchanged).',
        reviewTopic: 'Syllabus (/bio-chem-syllabus)'
      },
      {
        id: 8,
        text: 'What class of irreversible inhibitors acts as "Suicide Inhibitors" (mechanism-based inactivators) by requiring the enzyme to catalyze initial steps before generating a reactive inactivating species?',
        options: ['Statin analogues', 'Suicide inhibitors (e.g., Allopurinol inhibiting Xanthine oxidase)', 'Competitive chelators', 'Buffer anions'],
        correctAnswer: 1,
        rationale: 'Suicide inhibitors are processed as pseudo-substrates by the enzyme active site until a highly reactive intermediate is generated that forms an irreversible covalent adduct.',
        reviewTopic: 'Syllabus (/bio-chem-syllabus)'
      },
      {
        id: 9,
        text: 'What is the primary underlying cause in over 90% of Acute Myocardial Infarction cases?',
        options: ['Severe aortic stenosis', 'Coronary artery atherosclerotic plaque rupture with acute occlusive thrombus formation', 'Primary pulmonary hypertension', 'Hyperthyroidism'],
        correctAnswer: 1,
        rationale: 'The hallmark of AMI is rupture or erosion of an unstable atherosclerotic plaque in a coronary artery, triggering platelet aggregation, coagulation cascade, and luminal thrombosis.',
        reviewTopic: 'Syllabus (/bio-chem-syllabus)'
      },
      {
        id: 10,
        text: 'Which cardiac biomarker begins rising within 2–4 hours of myocardial necrosis and remains elevated in serum for up to 10–14 days, providing the highest sensitivity and specificity for MI?',
        options: ['Cardiac Troponin I / T (cTnI / cTnT)', 'Serum Amylase', 'Alkaline Phosphatase', 'Acid Phosphatase'],
        correctAnswer: 0,
        rationale: 'Cardiac troponins (cTnI and cTnT) are gold standard regulatory proteins of the myocardial contractile apparatus, remaining elevated for 10–14 days.',
        reviewTopic: 'Syllabus (/bio-chem-syllabus)'
      },
      {
        id: 11,
        text: 'Which serum transaminase enzyme begins rising 6–12 hours after myocardial infarction, peaking at 24–48 hours before returning to baseline in 4–6 days?',
        options: ['Alanine aminotransferase (ALT)', 'Aspartate aminotransferase (AST / SGOT)', 'Gamma-glutamyl transferase (GGT)', 'Cholinesterase'],
        correctAnswer: 1,
        rationale: 'AST (SGOT) is found in cardiac muscle and was historically used as an early enzyme marker for AMI following chest pain onset.',
        reviewTopic: 'Syllabus (/bio-chem-syllabus)'
      },
      {
        id: 12,
        text: 'What term describes enzyme specificity where an enzyme acts on only one specific substrate to catalyze a single reaction (e.g., Urease on Urea, Lactase on Lactose)?',
        options: ['Absolute substrate specificity', 'Relative substrate specificity', 'Optical stereospecificity', 'Broad specificity'],
        correctAnswer: 0,
        rationale: 'Absolute specificity means the enzyme recognizes and acts on only one single substrate and no structurally related analogues.',
        reviewTopic: 'Syllabus (/bio-chem-syllabus)'
      },
      {
        id: 13,
        text: 'What effect does increasing temperature beyond the physiological optimum (e.g., > 55°C) have on enzyme-catalyzed reaction velocity?',
        options: ['Reaction rate accelerates indefinitely', 'Enzyme protein undergoes thermal denaturation and loses catalytic activity', 'Km decreases to zero', 'Allosteric activation occurs'],
        correctAnswer: 1,
        rationale: 'High thermal energy breaks weak hydrogen and hydrophobic bonds holding the enzyme in its 3D active conformation, causing irreversible thermal denaturation.',
        reviewTopic: 'Syllabus (/bio-chem-syllabus)'
      },
      {
        id: 14,
        text: 'Which co-enzyme derived from Vitamin B3 (Niacin) acts as a universal electron carrier in dehydrogenase enzyme reactions (such as LDH and Malate DH)?',
        options: ['FAD (Riboflavin)', 'NAD+ / NADH (Niacin)', 'Thiamine Pyrophosphate (B1)', 'Pyridoxal Phosphate (B6)'],
        correctAnswer: 1,
        rationale: 'Nicotinamide Adenine Dinucleotide (NAD+) is the central pyridine nucleotide co-enzyme accepting hydride ions in biological dehydrogenation reactions.',
        reviewTopic: 'Syllabus (/bio-chem-syllabus)'
      },
      {
        id: 15,
        text: 'A patient arrives at the Emergency Department with crushing substernal chest pain radiating to the left arm, diaphoresis, and shortness of breath. Which immediate diagnostic tests are priority?',
        options: ['Barium swallow and upper GI endoscopy', '12-lead ECG and STAT serum Cardiac Troponin / CK-MB', 'Serum uric acid and stool culture', 'Serum amylase and lipid profile'],
        correctAnswer: 1,
        rationale: 'The immediate emergency standard of care for suspected acute coronary syndrome is a 12-lead ECG within 10 minutes and STAT serum cardiac biomarkers (Troponin, CK-MB).',
        reviewTopic: 'Syllabus (/bio-chem-syllabus)'
      }
    ]
  },

  // UNIT 5: Acid-Base Maintenance (15 Questions)
  'unit-5-acid-base': {
    title: 'Unit 5: Acid-Base Balance & Blood Buffers Assessment',
    description: '15 Questions on Blood Buffers, Henderson-Hasselbalch Equation, Respiratory and Renal pH Regulation.',
    questions: [
      {
        id: 1,
        text: 'What is the normal physiological reference range for arterial blood pH in a healthy individual?',
        options: ['7.00 – 7.15', '7.35 – 7.45', '7.50 – 7.65', '6.80 – 7.20'],
        correctAnswer: 1,
        rationale: 'Normal arterial blood pH is tightly regulated within the narrow range of 7.35 to 7.45 (mean 7.40); values < 7.35 indicate acidosis, and > 7.45 indicate alkalosis.',
        reviewTopic: 'Syllabus (/bio-chem-syllabus)'
      },
      {
        id: 2,
        text: 'Which buffer system is the primary and most important buffer of extracellular fluid (blood plasma)?',
        options: ['Phosphate buffer system', 'Bicarbonate-Carbonic Acid buffer system', 'Hemoglobin buffer system', 'Ammonium buffer system'],
        correctAnswer: 1,
        rationale: 'The Bicarbonate-Carbonic Acid buffer system (HCO3- / H2CO3) accounts for over 65% of buffering in extracellular fluids, functioning in harmony with lungs and kidneys.',
        reviewTopic: 'Syllabus (/bio-chem-syllabus)'
      },
      {
        id: 3,
        text: 'Under normal physiological conditions at pH 7.4, what is the ratio of bicarbonate ion [HCO3-] to dissolved carbonic acid [H2CO3] in arterial blood?',
        options: ['1 : 1', '10 : 1', '20 : 1', '50 : 1'],
        correctAnswer: 2,
        rationale: 'According to the Henderson-Hasselbalch equation (pH = 6.1 + log [20/1] = 6.1 + 1.3 = 7.4), the normal base-to-acid ratio is 20:1.',
        reviewTopic: 'Syllabus (/bio-chem-syllabus)'
      },
      {
        id: 4,
        text: 'What represents the body’s first, immediate line of defense against sudden fluctuations in hydrogen ion concentration?',
        options: ['Chemical buffer systems of blood and ICF (seconds)', 'Respiratory compensation (minutes)', 'Renal tubular excretion (hours to days)', 'Hepatic glycogenolysis'],
        correctAnswer: 0,
        rationale: 'Chemical buffer systems (Bicarbonate, Phosphate, Proteins, Hemoglobin) react instantly in seconds to bind or release H+ ions.',
        reviewTopic: 'Syllabus (/bio-chem-syllabus)'
      },
      {
        id: 5,
        text: 'How does the respiratory system respond rapidly to metabolic acidosis (e.g., in Diabetic Ketoacidosis)?',
        options: ['Hypoventilation to retain CO2 and decrease blood pH', 'Hyperventilation (Kussmaul breathing) to blow off CO2 and raise blood pH toward normal', 'Decreasing tidal volume', 'Inhibiting medullary chemoreceptors'],
        correctAnswer: 1,
        rationale: 'Elevated H+ stimulates central and peripheral chemoreceptors to increase rate and depth of respiration, eliminating volatile carbonic acid as CO2.',
        reviewTopic: 'Syllabus (/bio-chem-syllabus)'
      },
      {
        id: 6,
        text: 'Which organ system provides the ultimate, long-term regulation of acid-base balance by excreting non-volatile fixed acids and regenerating bicarbonate?',
        options: ['Skin', 'Lungs', 'Kidneys (Renal system)', 'Gastrointestinal tract'],
        correctAnswer: 2,
        rationale: 'While slower (taking 12–72 hours), the kidneys provide complete compensation by secreting H+ into urine, reabsorbing filtered HCO3-, and excreting titratable acids/NH4+.',
        reviewTopic: 'Syllabus (/bio-chem-syllabus)'
      },
      {
        id: 7,
        text: 'In the proximal renal tubule, which enzyme catalyzes the reversible hydration of CO2 to form carbonic acid (H2CO3) for bicarbonate reabsorption?',
        options: ['Carbonic anhydrase', 'Lactate dehydrogenase', 'Pyruvate carboxylase', 'Glutaminase'],
        correctAnswer: 0,
        rationale: 'Carbonic anhydrase (CA-IV on brush border and CA-II in cytoplasm) generates H+ and HCO3- from CO2 and H2O to facilitate tubular bicarbonate reabsorption.',
        reviewTopic: 'Syllabus (/bio-chem-syllabus)'
      },
      {
        id: 8,
        text: 'Which buffer system is predominant inside red blood cells and buffers CO2 transported from peripheral tissues to the lungs?',
        options: ['Bile salt buffer', 'Hemoglobin buffer system', 'Lactate buffer', 'Acetate buffer'],
        correctAnswer: 1,
        rationale: 'Hemoglobin acts as a powerful buffer due to its high histidine residue content (imidazole rings) and differences in pKa between oxygenated and deoxygenated hemoglobin.',
        reviewTopic: 'Syllabus (/bio-chem-syllabus)'
      },
      {
        id: 9,
        text: 'What primary acid-base disturbance is caused by severe chronic obstructive pulmonary disease (COPD) or respiratory depression resulting in CO2 retention?',
        options: ['Respiratory Alkalosis', 'Respiratory Acidosis', 'Metabolic Alkalosis', 'Metabolic Acidosis'],
        correctAnswer: 1,
        rationale: 'Hypoventilation causes CO2 retention (elevated PaCO2 > 45 mmHg), which drives carbonic acid formation and lowers arterial pH, resulting in Respiratory Acidosis.',
        reviewTopic: 'Syllabus (/bio-chem-syllabus)'
      },
      {
        id: 10,
        text: 'What primary acid-base disorder develops following severe prolonged vomiting or high-volume nasogastric suctioning due to massive loss of gastric HCl?',
        options: ['Respiratory Acidosis', 'Metabolic Acidosis with high anion gap', 'Metabolic Alkalosis', 'Respiratory Alkalosis'],
        correctAnswer: 2,
        rationale: 'Loss of gastric hydrochloric acid (HCl) creates a surplus of plasma bicarbonate (hypochloremic metabolic alkalosis).',
        reviewTopic: 'Syllabus (/bio-chem-syllabus)'
      },
      {
        id: 11,
        text: 'In renal acid excretion, which mechanism allows additional excretion of hydrogen ions when urinary phosphate buffers are saturated?',
        options: ['Excretion of Ammonium ions (NH4+) synthesized from Glutamine', 'Excretion of glucose', 'Reabsorption of potassium', 'Direct excretion of unbuffered H+ down to pH 1.0'],
        correctAnswer: 0,
        rationale: 'Renal glutaminase converts glutamine to glutamate and NH3; ammonia diffuses into the tubular lumen to trap H+ as ammonium (NH4+), which is excreted in urine.',
        reviewTopic: 'Syllabus (/bio-chem-syllabus)'
      },
      {
        id: 12,
        text: 'What is the formula used to calculate the Serum Anion Gap to differentiate causes of metabolic acidosis?',
        options: ['Anion Gap = [Na+] - ([Cl-] + [HCO3-])', 'Anion Gap = [K+] + [Na+]', 'Anion Gap = [HCO3-] / [Cl-]', 'Anion Gap = [Ca2+] + [Mg2+]'],
        correctAnswer: 0,
        rationale: 'Serum Anion Gap = [Na+] - ([Cl-] + [HCO3-]). Normal range is 8–12 mEq/L. Elevated anion gap indicates unmeasured organic acids (DKA, Lactic acidosis, renal failure).',
        reviewTopic: 'Syllabus (/bio-chem-syllabus)'
      },
      {
        id: 13,
        text: 'Where is the Phosphate Buffer System (H2PO4- / HPO4^2-) most physiologically effective and active?',
        options: ['Blood plasma', 'Intracellular fluid and renal tubular fluid', 'Gastric juice', 'Cerebrospinal fluid'],
        correctAnswer: 1,
        rationale: 'With a pKa of 6.8, the phosphate buffer system is maximally active in intracellular fluids and within renal tubular filtrate where phosphate concentrations are high.',
        reviewTopic: 'Syllabus (/bio-chem-syllabus)'
      },
      {
        id: 14,
        text: 'An anxious patient hyperventilates during a panic attack. An ABG reveals: pH 7.52, PaCO2 26 mmHg, HCO3- 23 mEq/L. What is the interpretation?',
        options: ['Uncompensated Respiratory Alkalosis', 'Compensated Metabolic Acidosis', 'Respiratory Acidosis', 'Normal ABG'],
        correctAnswer: 0,
        rationale: 'Elevated pH (>7.45) with decreased PaCO2 (<35 mmHg) and normal bicarbonate indicates acute uncompensated Respiratory Alkalosis secondary to hyperventilation.',
        reviewTopic: 'Syllabus (/bio-chem-syllabus)'
      },
      {
        id: 15,
        text: 'Why does severe diarrhea lead to normal anion gap (hyperchloremic) Metabolic Acidosis?',
        options: ['Direct loss of bicarbonate-rich intestinal secretions in stool', 'Accumulation of acetoacetate', 'Hypoventilation in lungs', 'Increased renal tubular phosphate absorption'],
        correctAnswer: 0,
        rationale: 'Lower GI fluids are rich in bicarbonate (HCO3-); severe diarrhea wastes HCO3-, with compensatory renal chloride retention maintaining electrical neutrality.',
        reviewTopic: 'Syllabus (/bio-chem-syllabus)'
      }
    ]
  },

  // UNIT 6: Heme Catabolism & Organ Function Tests (15 Questions)
  'unit-6-heme-renal': {
    title: 'Unit 6: Heme Catabolism & Organ Function Tests',
    description: '15 Questions on Heme Synthesis/Degradation, Jaundice Types, and Renal Clearance/Tubular Tests.',
    questions: [
      {
        id: 1,
        text: 'What are the two initial starting substrates and the rate-limiting enzyme of Heme biosynthesis in mitochondria?',
        options: ['Glycine + Succinyl-CoA catalyzed by δ-Aminolevulinic Acid Synthase (ALAS)', 'Alanine + Acetyl-CoA catalyzed by Pyruvate dehydrogenase', 'Glutamate + Oxaloacetate catalyzed by AST', 'Arginine + Glycine catalyzed by Transamidinase'],
        correctAnswer: 0,
        rationale: 'ALAS (δ-Aminolevulinic Acid Synthase) condenses Glycine and Succinyl-CoA in the mitochondrial matrix; it is the committed, rate-limiting step subject to feedback inhibition by Heme.',
        reviewTopic: 'Syllabus (/bio-chem-syllabus)'
      },
      {
        id: 2,
        text: 'Which enzyme in reticuloendothelial macrophages of the spleen and liver catalyzes the opening of the porphyrin ring to produce green Biliverdin?',
        options: ['Biliverdin reductase', 'Heme Oxygenase', 'UDP-glucuronosyltransferase', 'Ferrochelatase'],
        correctAnswer: 1,
        rationale: 'Heme Oxygenase cleaves the α-methenyl bridge of heme with molecular O2 and NADPH, releasing Biliverdin, Carbon Monoxide (CO), and Fe3+.',
        reviewTopic: 'Syllabus (/bio-chem-syllabus)'
      },
      {
        id: 3,
        text: 'How is toxic, lipid-soluble Unconjugated (Indirect) Bilirubin transported through the bloodstream from the spleen to the liver?',
        options: ['Freely dissolved in plasma', 'Tightly bound non-covalently to Serum Albumin', 'Inside chylomicrons', 'Bound to Hemoglobin'],
        correctAnswer: 1,
        rationale: 'Unconjugated bilirubin is water-insoluble and travels in plasma tightly bound to albumin; in severe hyperbilirubinemia, unbound bilirubin crosses the blood-brain barrier causing kernicterus.',
        reviewTopic: 'Syllabus (/bio-chem-syllabus)'
      },
      {
        id: 4,
        text: 'Which hepatic microsomal enzyme conjugates bilirubin with glucuronic acid to form water-soluble Bilirubin Diglucuronide for biliary excretion?',
        options: ['UDP-Glucuronosyltransferase (UGT1A1)', 'Cytochrome P450', 'Glutathione S-transferase', 'Bile acid-CoA synthetase'],
        correctAnswer: 0,
        rationale: 'UDP-glucuronosyltransferase (UGT1A1) transfers two glucuronic acid molecules from UDP-glucuronic acid to bilirubin, making it water-soluble (conjugated/direct bilirubin).',
        reviewTopic: 'Syllabus (/bio-chem-syllabus)'
      },
      {
        id: 5,
        text: 'What condition is characterized by yellowish discoloration of the skin and sclera when total serum bilirubin exceeds 2.0–2.5 mg/dL?',
        options: ['Cyanosis', 'Jaundice (Icterus)', 'Erythema', 'Melanosis'],
        correctAnswer: 1,
        rationale: 'Jaundice (icterus) occurs when tissue deposition of yellow bilirubin pigments occurs due to serum levels exceeding 2.0 to 2.5 mg/dL (normal range: 0.2–1.2 mg/dL).',
        reviewTopic: 'Syllabus (/bio-chem-syllabus)'
      },
      {
        id: 6,
        text: 'A patient with sickle cell anemia undergoes massive intravascular hemolysis. What type of jaundice and lab findings are expected?',
        options: ['Post-hepatic jaundice with elevated direct bilirubin and dark clay stool', 'Pre-hepatic (Hemolytic) jaundice with predominantly elevated Unconjugated (Indirect) Bilirubin', 'Hepatic jaundice with low urobilinogen', 'Obstructive jaundice with absent fecal stercobilin'],
        correctAnswer: 1,
        rationale: 'Pre-hepatic hemolytic jaundice produces unconjugated hyperbilirubinemia because bilirubin generation exceeds the liver’s conjugating capacity; urinary urobilinogen is elevated.',
        reviewTopic: 'Syllabus (/bio-chem-syllabus)'
      },
      {
        id: 7,
        text: 'A patient with gallstone obstruction of the common bile duct presents with severe pruritus, dark tea-colored urine, and pale clay-colored stools. What is the diagnosis?',
        options: ['Pre-hepatic jaundice', 'Post-hepatic (Obstructive / Cholestatic) Jaundice with elevated Conjugated (Direct) Bilirubin', 'Physiological jaundice of newborn', 'Gilbert syndrome'],
        correctAnswer: 1,
        rationale: 'Biliary tract obstruction blocks conjugated bilirubin from entering the intestine, preventing stercobilin formation (pale clay stools) and causing conjugated bilirubinuria (dark amber urine).',
        reviewTopic: 'Syllabus (/bio-chem-syllabus)'
      },
      {
        id: 8,
        text: 'What inherited disorder involves a benign, mild reduction in UDP-glucuronosyltransferase activity triggered by fasting, illness, or stress?',
        options: ['Crigler-Najjar syndrome Type I', 'Gilbert’s Syndrome', 'Dubin-Johnson syndrome', 'Rotor syndrome'],
        correctAnswer: 1,
        rationale: 'Gilbert’s syndrome is a common, benign genetic variant with reduced UGT1A1 expression (~30% of normal), causing mild fluctuating unconjugated hyperbilirubinemia.',
        reviewTopic: 'Syllabus (/bio-chem-syllabus)'
      },
      {
        id: 9,
        text: 'What is the normal reference range for Serum Creatinine in a healthy adult with normal renal function?',
        options: ['0.1 to 0.3 mg/dL', '0.6 to 1.2 mg/dL', '2.5 to 5.0 mg/dL', '10 to 20 mg/dL'],
        correctAnswer: 1,
        rationale: 'Serum creatinine is normally maintained at 0.6 to 1.2 mg/dL (slightly higher in males due to greater muscle mass), serving as an endogenous marker of GFR.',
        reviewTopic: 'Syllabus (/bio-chem-syllabus)'
      },
      {
        id: 10,
        text: 'What is the normal reference range for Blood Urea Nitrogen (BUN) in human serum?',
        options: ['1 to 4 mg/dL', '7 to 20 mg/dL', '45 to 80 mg/dL', '100 to 150 mg/dL'],
        correctAnswer: 1,
        rationale: 'Normal Blood Urea Nitrogen (BUN) is 7 to 20 mg/dL. Elevated BUN (azotemia) indicates renal impairment, dehydration, or gastrointestinal bleeding.',
        reviewTopic: 'Syllabus (/bio-chem-syllabus)'
      },
      {
        id: 11,
        text: 'Which clearance substance is considered the gold standard for measuring Glomerular Filtration Rate (GFR) because it is freely filtered at the glomerulus and neither reabsorbed nor secreted by tubules?',
        options: ['Inulin', 'Glucose', 'Urea', 'Albumin'],
        correctAnswer: 0,
        rationale: 'Inulin (a plant fructose polymer) is the ideal physiological standard for GFR measurement because it undergoes 100% filtration with zero tubular reabsorption or secretion.',
        reviewTopic: 'Syllabus (/bio-chem-syllabus)'
      },
      {
        id: 12,
        text: 'Why is 24-hour Creatinine Clearance widely utilized in clinical practice to estimate GFR?',
        options: ['Creatinine is synthesized by the pancreas', 'Creatinine is an endogenous waste product produced at a constant rate from muscle creatine metabolism', 'Creatinine increases after eating sugar', 'Creatinine is completely reabsorbed in the loop of Henle'],
        correctAnswer: 1,
        rationale: 'Creatinine is produced continuously at a steady rate proportional to muscle mass, allowing clinical GFR estimation without requiring continuous exogenous intravenous infusions.',
        reviewTopic: 'Syllabus (/bio-chem-syllabus)'
      },
      {
        id: 13,
        text: 'What test evaluates tubular concentrating ability by withholding water intake for 12–16 hours and measuring urine specific gravity and osmolality?',
        options: ['Water Deprivation / Fluid Concentration Test', 'Creatinine clearance test', 'Inulin clearance test', 'Urea clearance test'],
        correctAnswer: 0,
        rationale: 'The fluid deprivation test measures the renal collecting ducts’ ability to concentrate urine in response to endogenous ADH (normal concentrated urine osmolality > 800 mOsm/kg).',
        reviewTopic: 'Syllabus (/bio-chem-syllabus)'
      },
      {
        id: 14,
        text: 'What does the presence of significant Microalbuminuria (30–300 mg/day) in a patient with Diabetes Mellitus indicate?',
        options: ['Acute tubular necrosis', 'Early diabetic nephropathy and glomerular endothelial damage', 'Urinary tract infection', 'Dietary excess of carbohydrates'],
        correctAnswer: 1,
        rationale: 'Microalbuminuria is the earliest clinical herald of diabetic glomerular disease (diabetic nephropathy), signaling the need for ACE inhibitors/ARBs for renal protection.',
        reviewTopic: 'Syllabus (/bio-chem-syllabus)'
      },
      {
        id: 15,
        text: 'What normal physiological compound gives human feces its characteristic brown color following intestinal bacterial conversion of conjugated bilirubin?',
        options: ['Biliverdin', 'Stercobilin', 'Urobilin', 'Porphobilinogen'],
        correctAnswer: 1,
        rationale: 'Conjugated bilirubin in the terminal ileum and colon is deconjugated and reduced by colonic bacteria into stercobilinogen, which oxidizes into brown Stercobilin.',
        reviewTopic: 'Syllabus (/bio-chem-syllabus)'
      }
    ]
  },

  // UNIT 7: Immunochemistry & ELISA (15 Questions)
  'unit-7-immunochem': {
    title: 'Unit 7: Immunochemistry & ELISA Assessment',
    description: '15 High-Yield Questions on Antibody Classes (IgG, IgA, IgM, IgD, IgE), Structure, and ELISA Techniques.',
    questions: [
      {
        id: 1,
        text: 'What are the structural polypeptide components that constitute a monomeric Immunoglobulin (Antibody) molecule?',
        options: ['1 Heavy chain and 1 Light chain linked by ester bonds', '2 Identical Heavy (H) chains and 2 Identical Light (L) chains linked by Disulfide (S-S) bonds', '4 Heavy chains forming a cyclic ring', '3 Light chains linked by peptide bonds'],
        correctAnswer: 1,
        rationale: 'A basic immunoglobulin unit is a Y-shaped glycoprotein composed of two identical Heavy (H) chains and two identical Light (L) chains linked by covalent interchain disulfide bonds.',
        reviewTopic: 'Syllabus (/bio-chem-syllabus)'
      },
      {
        id: 2,
        text: 'Which region of the immunoglobulin molecule contains the hypervariable loops (Complementarity Determining Regions / CDRs) that bind specifically to antigens?',
        options: ['Fc (crystallizable) fragment', 'Variable (V) domain (Fab arms at the N-terminus)', 'Constant heavy-3 domain (CH3)', 'Hinge region'],
        correctAnswer: 1,
        rationale: 'The Variable domains of both Heavy (VH) and Light (VL) chains at the amino-terminus form the antigen-binding cleft (Fab fragment).',
        reviewTopic: 'Syllabus (/bio-chem-syllabus)'
      },
      {
        id: 3,
        text: 'Which is the most abundant immunoglobulin in human serum (~75–80%) and the ONLY antibody class capable of crossing the placenta to provide passive immunity to the fetus?',
        options: ['IgA', 'IgE', 'IgG', 'IgM'],
        correctAnswer: 2,
        rationale: 'Immunoglobulin G (IgG) is the predominant serum antibody with a long half-life (~21 days) and unique ability to cross the placenta via neonatal Fc receptors (FcRn).',
        reviewTopic: 'Syllabus (/bio-chem-syllabus)'
      },
      {
        id: 4,
        text: 'Which immunoglobulin is the first antibody produced during the primary immune response and exists in serum as a large pentameric structure joined by a J-chain?',
        options: ['IgG', 'IgA', 'IgM', 'IgD'],
        correctAnswer: 2,
        rationale: 'IgM is a 900–1000 kDa pentamer ("millionaire molecule") with 10 antigen-binding sites, making it exceptionally effective at agglutination and complement activation during acute infection.',
        reviewTopic: 'Syllabus (/bio-chem-syllabus)'
      },
      {
        id: 5,
        text: 'Which antibody class is the principal immunoglobulin present in mucosal secretions, saliva, tears, sweat, and breast milk (colostrum) to protect mucosal surfaces?',
        options: ['IgG', 'Secretory IgA (sIgA)', 'IgD', 'IgE'],
        correctAnswer: 1,
        rationale: 'Secretory IgA (dimeric with J-chain and secretory component) prevents bacterial and viral adhesion across mucosal linings and protects the infant gastrointestinal tract.',
        reviewTopic: 'Syllabus (/bio-chem-syllabus)'
      },
      {
        id: 6,
        text: 'Which immunoglobulin binds with high affinity to Fcε receptors on mast cells and basophils, mediating Type I hypersensitivity (allergic/anaphylactic) reactions and defense against helminths?',
        options: ['IgA', 'IgD', 'IgE', 'IgM'],
        correctAnswer: 2,
        rationale: 'IgE cross-linking by allergens triggers immediate mast cell degranulation with release of histamine, leukotrienes, and heparin, driving anaphylaxis and antiparasitic responses.',
        reviewTopic: 'Syllabus (/bio-chem-syllabus)'
      },
      {
        id: 7,
        text: 'What two forms of Light (L) chains are found in immunoglobulins?',
        options: ['Alpha (α) and Beta (β)', 'Kappa (κ) and Lambda (λ)', 'Gamma (γ) and Delta (δ)', 'Mu (μ) and Epsilon (ε)'],
        correctAnswer: 1,
        rationale: 'An antibody molecule has either two Kappa (κ) or two Lambda (λ) light chains; both types are never found together in the same individual immunoglobulin molecule.',
        reviewTopic: 'Syllabus (/bio-chem-syllabus)'
      },
      {
        id: 8,
        text: 'What does the abbreviation ELISA stand for in clinical diagnostic biochemistry?',
        options: ['Enzyme-Linked Immunosorbent Assay', 'Electrochemical Lipid Ion Separation Assay', 'Endocrine Light Immunological Spectrometry Assay', 'Enzymatic Lysosomal Inhibitor Solubility Analysis'],
        correctAnswer: 0,
        rationale: 'ELISA stands for Enzyme-Linked Immunosorbent Assay, a plate-based immunological technique using enzyme-labeled antibodies or antigens.',
        reviewTopic: 'Syllabus (/bio-chem-syllabus)'
      },
      {
        id: 9,
        text: 'In an Indirect ELISA, what is initially coated onto the microtiter well plate?',
        options: ['The patient’s serum antibodies', 'Target specific Antigen', 'Enzyme substrate solution', 'Avidin-biotin complex'],
        correctAnswer: 1,
        rationale: 'In Indirect ELISA, specific antigen is immobilized on the well bottom to capture target primary antibodies from the patient sample, detected by an enzyme-linked secondary antibody.',
        reviewTopic: 'Syllabus (/bio-chem-syllabus)'
      },
      {
        id: 10,
        text: 'Which ELISA format utilizes an immobilized capture antibody on the well bottom, binds target antigen, and sandwiches it with a second enzyme-labeled detection antibody?',
        options: ['Direct ELISA', 'Competitive ELISA', 'Sandwich ELISA', 'Western blot'],
        correctAnswer: 2,
        rationale: 'Sandwich ELISA measures antigens between two specific antibodies (capture antibody and detection antibody), providing high specificity and sensitivity.',
        reviewTopic: 'Syllabus (/bio-chem-syllabus)'
      },
      {
        id: 11,
        text: 'In a Competitive ELISA, how is the measured optical density (absorbance signal) related to the concentration of target antigen in the patient sample?',
        options: ['Absorbance is directly proportional to antigen concentration', 'Absorbance is inversely proportional to target antigen concentration', 'Absorbance remains completely constant', 'Absorbance drops to zero instantly'],
        correctAnswer: 1,
        rationale: 'In competitive formats, sample antigen competes with coated antigen for antibody binding; higher patient antigen concentration results in lower enzyme binding and lower absorbance.',
        reviewTopic: 'Syllabus (/bio-chem-syllabus)'
      },
      {
        id: 12,
        text: 'Which laboratory instrument is used to read and quantify the optical density (color intensity) of microplate wells in an ELISA test?',
        options: ['Centrifuge', 'Microplate Reader / Spectrophotometer', 'Autoclave', 'pH meter'],
        correctAnswer: 1,
        rationale: 'A Microplate Reader (photometer/spectrophotometer) measures absorbance at specific wavelengths (e.g., 450 nm for TMB substrate) to quantify antigen/antibody concentrations.',
        reviewTopic: 'Syllabus (/bio-chem-syllabus)'
      },
      {
        id: 13,
        text: 'Which common viral screening test routinely utilizes ELISA as the initial frontline screening assay?',
        options: ['HIV antibody screening (anti-HIV-1/2)', 'Hepatitis B surface antigen (HBsAg)', 'SARS-CoV-2 antibodies', 'All of the above'],
        correctAnswer: 3,
        rationale: 'ELISA is widely employed for screening HIV, Hepatitis B/C, viral pathogens, autoimmune markers, and hormones due to its high throughput and sensitivity.',
        reviewTopic: 'Syllabus (/bio-chem-syllabus)'
      },
      {
        id: 14,
        text: 'What major advantage does ELISA offer over historical Radioimmunoassay (RIA) techniques?',
        options: ['ELISA does not use hazardous radioactive isotopes and has long shelf-life reagents', 'ELISA requires no wash steps', 'ELISA cannot be automated', 'ELISA works only at boiling temperatures'],
        correctAnswer: 0,
        rationale: 'ELISA replaces radioactive isotopes (125-I) with stable enzymatic reporters (Horseradish Peroxidase / Alkaline Phosphatase), eliminating radiation hazards and disposal costs.',
        reviewTopic: 'Syllabus (/bio-chem-syllabus)'
      },
      {
        id: 15,
        text: 'Why are automated washing steps essential between reagent incubations during an ELISA procedure?',
        options: ['To heat the microplate wells', 'To remove unbound antibodies and non-specific proteins to prevent false-positive high background noise', 'To destroy the antigen coating', 'To dissolve the plastic well'],
        correctAnswer: 1,
        rationale: 'Thorough washing removes unbound excess antibodies and non-specific reactants, ensuring that only specific antigen-antibody-enzyme complexes generate signal.',
        reviewTopic: 'Syllabus (/bio-chem-syllabus)'
      }
    ]
  },

  // GRAND FINAL ASSESSMENT: 40 Comprehensive Questions covering Units 1 to 7
  'comprehensive-final': {
    title: 'Biochemistry Grand Comprehensive Final Assessment',
    description: '40 Rigorous NCLEX-Aligned Questions synthesizing Carbohydrates, Lipids, Proteins, Enzymology, Acid-Base, Heme/Renal, and Immunochemistry.',
    questions: [
      // 1-6 Carbohydrates
      {
        id: 1,
        text: 'A 45-year-old male with untreated diabetes undergoes blood testing. His fasting plasma glucose is 168 mg/dL and HbA1c is 9.2%. Which transporter translocation is impaired due to insulin resistance?',
        options: ['GLUT1 in erythrocytes', 'GLUT2 in liver hepatocytes', 'GLUT4 in skeletal muscle and adipocytes', 'SGLT1 in intestinal enterocytes'],
        correctAnswer: 2,
        rationale: 'Insulin resistance impairs GLUT4 vesicle translocation to skeletal muscle and adipose cell membranes, preventing normal glucose uptake.',
        reviewTopic: 'Regulation of Blood Glucose (/RegulationOfBloodGlucose)'
      },
      {
        id: 2,
        text: 'What is the net gain of ATP when one molecule of glucose is completely oxidized to CO2 and H2O under aerobic conditions via glycolysis, PDH, TCA cycle, and oxidative phosphorylation?',
        options: ['2 ATP', '8 ATP', '30 to 32 ATP', '100 ATP'],
        correctAnswer: 2,
        rationale: 'Complete aerobic glucose oxidation yields 2 ATP (net glycolysis) + 2 NADH (3 or 5 ATP) + 2 NADH (PDH = 5 ATP) + 2 turns of TCA (20 ATP) ≈ 30–32 ATP total.',
        reviewTopic: 'Metabolic Pathways of Carbohydrates (/MetabolicPathwaysOfCarb)'
      },
      {
        id: 3,
        text: 'During vigorous anaerobic sprint exercise, what enzyme converts pyruvate into lactate to regenerate NAD+ for continuation of glycolysis in skeletal muscle?',
        options: ['Pyruvate kinase', 'Lactate Dehydrogenase (LDH)', 'Phosphofructokinase-1', 'Citrate synthase'],
        correctAnswer: 1,
        rationale: 'Lactate dehydrogenase (LDH) reduces pyruvate to lactate, oxidizing NADH back to NAD+, which is required by glyceraldehyde-3-phosphate dehydrogenase to sustain anaerobic glycolysis.',
        reviewTopic: 'Metabolic Pathways of Carbohydrates (/MetabolicPathwaysOfCarb)'
      },
      {
        id: 4,
        text: 'Which disaccharide composed of Galactose and Glucose is cleaved by intestinal brush-border lactase, deficiency of which leads to osmotic diarrhea and bloating?',
        options: ['Sucrose', 'Maltose', 'Lactose', 'Trehalose'],
        correctAnswer: 2,
        rationale: 'Lactose (milk sugar) is hydrolyzed by lactase into Galactose and Glucose. Lactase deficiency leaves unabsorbed lactose in the colon, where bacteria ferment it to gas and acids.',
        reviewTopic: 'Digestion of Carbohydrates (/digestion-of-carb)'
      },
      {
        id: 5,
        text: 'Which hormone secreted by pancreatic alpha cells stimulates hepatic glycogenolysis and gluconeogenesis when blood glucose falls below 70 mg/dL?',
        options: ['Insulin', 'Glucagon', 'Somatostatin', 'Amylin'],
        correctAnswer: 1,
        rationale: 'Glucagon binds hepatic GPCRs, activating adenylate cyclase to produce cAMP and PKA, which phosphorylates and activates glycogen phosphorylase to raise blood sugar.',
        reviewTopic: 'Regulation of Blood Glucose (/RegulationOfBloodGlucose)'
      },
      {
        id: 6,
        text: 'A patient in Diabetic Ketoacidosis presents with blood glucose 420 mg/dL, arterial pH 7.18, and positive serum ketones. What is the priority immediate nursing and medical management?',
        options: ['Oral metformin and carbohydrate snack', 'Aggressive IV isotonic normal saline hydration followed by regular insulin infusion and potassium monitoring', 'Subcutaneous long-acting glargine insulin without fluids', 'Immediate sodium bicarbonate bolus without insulin'],
        correctAnswer: 1,
        rationale: 'The life-saving triad for DKA management is fluid resuscitation with 0.9% Normal Saline to restore circulating volume, IV regular insulin infusion, and vigilant Potassium monitoring.',
        reviewTopic: 'Diabetes Mellitus Type 1 (/DiabetesMellitusType1)'
      },

      // 7-12 Lipids
      {
        id: 7,
        text: 'Why are trans-fatty acids generated during industrial partial hydrogenation of vegetable oils particularly harmful to cardiovascular health?',
        options: ['They increase LDL-cholesterol while simultaneously lowering protective HDL-cholesterol', 'They prevent fat absorption in the gut', 'They decrease blood pressure to dangerous levels', 'They accelerate urea cycle clearance'],
        correctAnswer: 0,
        rationale: 'Trans-fatty acids possess a rigid linear configuration that elevates atherogenic LDL-C and lowers cardioprotective HDL-C, significantly increasing coronary artery disease risk.',
        reviewTopic: 'MUFA (/MUFA)'
      },
      {
        id: 8,
        text: 'Which dietary polyunsaturated fatty acids found in cold-water marine fish (EPA and DHA) exhibit potent anti-inflammatory and triglyceride-lowering properties?',
        options: ['Omega-3 (ω-3) fatty acids', 'Omega-6 (ω-6) fatty acids', 'Saturated fatty acids', 'Short-chain volatile fatty acids'],
        correctAnswer: 0,
        rationale: 'Eicosapentaenoic acid (EPA) and Docosahexaenoic acid (DHA) are long-chain Omega-3 fatty acids that generate anti-inflammatory resolvins and protect endothelial function.',
        reviewTopic: 'Essential Fatty Acids (/EssentialFattyAcids)'
      },
      {
        id: 9,
        text: 'What enzyme on the capillary endothelium of adipose and muscle tissue hydrolyzes triglycerides carried in chylomicrons and VLDL into free fatty acids and glycerol?',
        options: ['Pancreatic lipase', 'Lipoprotein Lipase (LPL)', 'Hormone-sensitive lipase', 'Gastric lipase'],
        correctAnswer: 1,
        rationale: 'Lipoprotein Lipase (LPL), activated by ApoC-II on chylomicrons and VLDL, hydrolyzes core triglycerides for tissue fatty acid uptake.',
        reviewTopic: 'Lipids (/FattyAcidsClassification)'
      },
      {
        id: 10,
        text: 'What is the primary rate-limiting enzyme in hepatic cholesterol biosynthesis that is competitively inhibited by statins like Atorvastatin?',
        options: ['HMG-CoA synthase', 'HMG-CoA reductase', '7α-hydroxylase', 'Squalene epoxidase'],
        correctAnswer: 1,
        rationale: 'HMG-CoA Reductase converts HMG-CoA to mevalonate; statin medications are structural analogues that competitively inhibit this rate-limiting step.',
        reviewTopic: 'Lipids (/FattyAcidsClassification)'
      },
      {
        id: 11,
        text: 'During prolonged starvation, what alternative fuel is synthesized in liver mitochondria from excess Acetyl-CoA to provide up to 70% of energy to the brain?',
        options: ['Fatty acyl-CoA', 'Ketone bodies (Acetoacetate and β-Hydroxybutyrate)', 'Lactate', 'Urea'],
        correctAnswer: 1,
        rationale: 'The brain cannot oxidize long-chain fatty acids because they do not cross the blood-brain barrier; it adapts during starvation to oxidize water-soluble ketone bodies.',
        reviewTopic: 'Lipids (/FattyAcidsClassification)'
      },
      {
        id: 12,
        text: 'What active hormone synthesized by skin UV exposure and renal 1α-hydroxylase stimulates intestinal calcium absorption and prevents Rickets in children?',
        options: ['Parathyroid hormone', 'Calcitriol (1,25-Dihydroxyvitamin D3)', 'Calcitonin', 'Thyroxine'],
        correctAnswer: 1,
        rationale: 'Calcitriol (1,25-(OH)2-D3) is the active vitamin D hormone promoting enterocyte calcium-binding protein synthesis (calbindin) and intestinal Ca2+ absorption.',
        reviewTopic: 'Lipids (/FattyAcidsClassification)'
      },

      // 13-18 Proteins & Urea Cycle
      {
        id: 13,
        text: 'What covalent bond links the α-carboxyl group of one amino acid to the α-amino group of the next amino acid in a polypeptide primary structure?',
        options: ['Glycosidic bond', 'Peptide (amide) bond', 'Phosphodiester bond', 'Hydrogen bond'],
        correctAnswer: 1,
        rationale: 'Peptide bonds are planar, rigid covalent amide linkages formed by a condensation reaction between adjacent amino acids.',
        reviewTopic: 'Syllabus (/bio-chem-syllabus)'
      },
      {
        id: 14,
        text: 'Which amino acid contains an indole ring, serves as a precursor for Serotonin and Melatonin, and is an essential amino acid deficient in corn zein?',
        options: ['Tyrosine', 'Tryptophan', 'Phenylalanine', 'Histidine'],
        correctAnswer: 1,
        rationale: 'Tryptophan is an aromatic essential amino acid with an indole side chain that serves as the biochemical precursor for neurotransmitter Serotonin and Melatonin.',
        reviewTopic: 'Syllabus (/bio-chem-syllabus)'
      },
      {
        id: 15,
        text: 'Which pancreatic protease is activated by enterokinase and in turn cleaves and activates chymotrypsinogen, proelastase, and procarboxypeptidases?',
        options: ['Pepsin', 'Trypsin', 'Carboxypeptidase B', 'Lipase'],
        correctAnswer: 1,
        rationale: 'Active Trypsin acts as the master activator for all other pancreatic digestive zymogens in the small intestinal lumen.',
        reviewTopic: 'Syllabus (/bio-chem-syllabus)'
      },
      {
        id: 16,
        text: 'In the Urea Cycle, what is the fate of Fumarate produced by the argininosuccinate lyase reaction?',
        options: ['Excreted directly in urine', 'Enters the Citric Acid (Krebs) Cycle, connecting the two metabolic cycles (Krebs Bicycle)', 'Converts to cholesterol', 'Forms ketone bodies'],
        correctAnswer: 1,
        rationale: 'Fumarate produced in the cytosol is hydrated to Malate and transported into mitochondria to feed the TCA cycle (the Krebs Bi-Cycle concept).',
        reviewTopic: 'Syllabus (/bio-chem-syllabus)'
      },
      {
        id: 17,
        text: 'What is the clinical significance of an elevated blood ammonia level (> 100 μmol/L) in a patient with advanced cirrhosis of the liver?',
        options: ['High risk of Hepatic Encephalopathy, cerebral edema, and coma', 'Enhanced protein synthesis', 'Kidney stone formation', 'Severe hypoglycemia'],
        correctAnswer: 0,
        rationale: 'Cirrhosis impairs the hepatic urea cycle, causing toxic ammonia accumulation that crosses the blood-brain barrier, swelling astrocytes and inducing hepatic encephalopathy.',
        reviewTopic: 'Syllabus (/bio-chem-syllabus)'
      },
      {
        id: 18,
        text: 'What is the normal blood urea level in a healthy adult?',
        options: ['5 to 10 mg/dL', '20 to 40 mg/dL', '70 to 100 mg/dL', '120 to 150 mg/dL'],
        correctAnswer: 1,
        rationale: 'Normal serum blood urea ranges between 20 and 40 mg/dL in healthy individuals with adequate hydration and normal hepatic/renal function.',
        reviewTopic: 'Syllabus (/bio-chem-syllabus)'
      },

      // 19-24 Clinical Enzymology & MI
      {
        id: 19,
        text: 'A 58-year-old male presents with acute substernal chest pressure. Which cardiac biomarker is considered the gold standard for diagnosing acute myocardial infarction due to high sensitivity and prolonged elevation?',
        options: ['Cardiac Troponin I / T', 'Serum Lipase', 'Alanine Aminotransferase', 'Alkaline Phosphatase'],
        correctAnswer: 0,
        rationale: 'Cardiac Troponins (cTnI and cTnT) are highly specific for myocardial necrosis, rising 2–4 hours post-infarction and remaining elevated for 10–14 days.',
        reviewTopic: 'Syllabus (/bio-chem-syllabus)'
      },
      {
        id: 20,
        text: 'Which cardiac enzyme is most useful for detecting re-infarction occurring 4 days after an initial myocardial infarction because its serum levels normalize within 48–72 hours?',
        options: ['Cardiac Troponin T', 'CK-MB (Creatine Kinase-MB)', 'LDH-1', 'AST'],
        correctAnswer: 1,
        rationale: 'Because CK-MB returns to baseline within 48–72 hours, a secondary rise after 3–4 days confirms a new recurrent infarction, whereas Troponins remain elevated for up to 2 weeks.',
        reviewTopic: 'Syllabus (/bio-chem-syllabus)'
      },
      {
        id: 21,
        text: 'How do competitive enzyme inhibitors (like statins or allopurinol) change the Lineweaver-Burk double reciprocal plot?',
        options: ['Y-intercept increases, X-intercept is unchanged', 'Y-intercept (1/Vmax) is unchanged, X-intercept (-1/Km) shifts closer to zero', 'Both intercepts shift downward', 'Line becomes horizontal'],
        correctAnswer: 1,
        rationale: 'In competitive inhibition, Vmax is unchanged (identical y-intercept 1/Vmax), but Km increases (x-intercept -1/Km moves closer to origin).',
        reviewTopic: 'Syllabus (/bio-chem-syllabus)'
      },
      {
        id: 22,
        text: 'Which isoenzyme of Lactate Dehydrogenase is predominant in cardiac muscle tissue and red blood cells?',
        options: ['LDH-1 (H4)', 'LDH-3 (H2M2)', 'LDH-5 (M4)', 'LDH-2 exclusively'],
        correctAnswer: 0,
        rationale: 'LDH-1 consists of 4 heart (H) subunits (H4) and is abundant in myocardium and erythrocytes; its elevation causes the classic "LDH flip" in AMI and hemolytic anemia.',
        reviewTopic: 'Syllabus (/bio-chem-syllabus)'
      },
      {
        id: 23,
        text: 'Which enzyme theory states that the active site possesses a rigid, pre-formed complimentary template into which the substrate fits exactly like a key in a lock?',
        options: ['Lock and Key model of Emil Fischer', 'Induced fit model of Koshland', 'Michaelis-Menten equilibrium', 'Allosteric cooperativity'],
        correctAnswer: 0,
        rationale: 'Emil Fischer (1890) proposed the rigid Lock and Key model to explain enzyme substrate specificity.',
        reviewTopic: 'Syllabus (/bio-chem-syllabus)'
      },
      {
        id: 24,
        text: 'What type of irreversible enzyme inhibitor permanently inactivates serine proteases like trypsin and acetylcholinesterase by covalently modifying active site serine residues?',
        options: ['Di-isopropylphosphofluoride (DIPF)', 'Sulfonamide', 'Ethanol', 'Allopurinol'],
        correctAnswer: 0,
        rationale: 'DIPF (and organophosphate nerve agents) is a group-specific irreversible inhibitor that covalently phosphorylates reactive serine hydroxyl groups in active sites.',
        reviewTopic: 'Syllabus (/bio-chem-syllabus)'
      },

      // 25-29 Acid-Base Balance
      {
        id: 25,
        text: 'An ABG shows: pH 7.28, PaCO2 58 mmHg, HCO3- 26 mEq/L. What is the acid-base diagnosis?',
        options: ['Metabolic Acidosis', 'Uncompensated Respiratory Acidosis (e.g., severe COPD / acute hypoventilation)', 'Respiratory Alkalosis', 'Metabolic Alkalosis'],
        correctAnswer: 1,
        rationale: 'Acidic pH (<7.35) combined with elevated PaCO2 (>45 mmHg) and normal bicarbonate reflects acute uncompensated respiratory acidosis.',
        reviewTopic: 'Syllabus (/bio-chem-syllabus)'
      },
      {
        id: 26,
        text: 'What is the primary chemical buffer system in extracellular fluid (plasma) maintaining blood pH around 7.40?',
        options: ['Carbonic acid - Bicarbonate buffer (H2CO3 / HCO3-)', 'Phosphate buffer', 'Hemoglobin buffer', 'Ammonium buffer'],
        correctAnswer: 0,
        rationale: 'The Carbonic acid - Bicarbonate buffer operates as the chief ECF buffer because its components are open to rapid physiological regulation by the lungs (CO2) and kidneys (HCO3-).',
        reviewTopic: 'Syllabus (/bio-chem-syllabus)'
      },
      {
        id: 27,
        text: 'In the Henderson-Hasselbalch equation (pH = 6.1 + log [HCO3-] / (0.03 × PaCO2)), what ratio between [HCO3-] and [H2CO3] maintains normal blood pH of 7.40?',
        options: ['1 : 1', '10 : 1', '20 : 1', '40 : 1'],
        correctAnswer: 2,
        rationale: 'A base-to-acid ratio of 20:1 yields log(20) = 1.3; adding pKa 6.1 + 1.3 = 7.40.',
        reviewTopic: 'Syllabus (/bio-chem-syllabus)'
      },
      {
        id: 28,
        text: 'How do the kidneys respond during chronic respiratory acidosis to restore blood pH toward normal?',
        options: ['Increase renal secretion of H+ and reabsorb and synthesize new HCO3- (taking 24–72 hours)', 'Excrete bicarbonate into urine', 'Inhibit carbonic anhydrase', 'Decrease ammonium excretion'],
        correctAnswer: 0,
        rationale: 'Renal compensation for respiratory acidosis involves upregulating H+ excretion and generating new HCO3-, elevating serum bicarbonate above 30 mEq/L.',
        reviewTopic: 'Syllabus (/bio-chem-syllabus)'
      },
      {
        id: 29,
        text: 'A patient with severe septic shock has serum lactate of 6.2 mmol/L, pH 7.22, HCO3- 14 mEq/L, and Anion Gap of 22 mEq/L. What is the interpretation?',
        options: ['High Anion Gap Metabolic Acidosis (Lactic Acidosis)', 'Normal Anion Gap Acidosis', 'Respiratory Alkalosis', 'Metabolic Alkalosis'],
        correctAnswer: 0,
        rationale: 'Tissue hypoperfusion in shock causes anaerobic glycolysis and lactic acid accumulation, producing high anion gap metabolic acidosis.',
        reviewTopic: 'Syllabus (/bio-chem-syllabus)'
      },

      // 30-34 Heme & Renal Function
      {
        id: 30,
        text: 'What enzyme catalyzes the insertion of ferrous iron (Fe2+) into Protoporphyrin IX to complete heme synthesis in mitochondria?',
        options: ['ALA synthase', 'Ferrochelatase (Heme synthase)', 'Heme oxygenase', 'Biliverdin reductase'],
        correctAnswer: 1,
        rationale: 'Ferrochelatase catalyzes the final step of heme synthesis by inserting Fe2+ into the protoporphyrin ring; it is inhibited by lead in lead poisoning.',
        reviewTopic: 'Syllabus (/bio-chem-syllabus)'
      },
      {
        id: 31,
        text: 'What is the characteristic laboratory profile in Post-Hepatic (Obstructive) Jaundice caused by gallstones in the common bile duct?',
        options: ['Predominantly elevated Conjugated (Direct) Bilirubin, pale clay stools, dark urine, and elevated Alkaline Phosphatase', 'Elevated unconjugated bilirubin with normal stools', 'Decreased urine bilirubin', 'Low serum bile salts'],
        correctAnswer: 0,
        rationale: 'Biliary obstruction backs up conjugated bilirubin into blood (elevated direct bilirubin), with absence of bile pigments in stool (clay colored) and elevated ALP.',
        reviewTopic: 'Syllabus (/bio-chem-syllabus)'
      },
      {
        id: 32,
        text: 'Why is serum creatinine a more specific marker of intrinsic renal function than Blood Urea Nitrogen (BUN)?',
        options: ['Creatinine production is constant from muscle metabolism and unaffected by dietary protein or hydration status', 'Creatinine is reabsorbed in large amounts by renal tubules', 'Creatinine is synthesized in the kidney', 'Creatinine rises only in liver disease'],
        correctAnswer: 0,
        rationale: 'Serum creatinine reflects muscle mass and GFR with minimal tubular reabsorption, whereas BUN is heavily influenced by hydration status, catabolism, and dietary protein.',
        reviewTopic: 'Syllabus (/bio-chem-syllabus)'
      },
      {
        id: 33,
        text: 'What is the normal Glomerular Filtration Rate (eGFR) in a healthy young adult?',
        options: ['10 to 20 mL/min/1.73m²', '40 to 60 mL/min/1.73m²', '90 to 120 mL/min/1.73m²', '300 to 500 mL/min/1.73m²'],
        correctAnswer: 2,
        rationale: 'Normal GFR is 90 to 120 mL/min/1.73m²; values < 60 mL/min for > 3 months define chronic kidney disease.',
        reviewTopic: 'Syllabus (/bio-chem-syllabus)'
      },
      {
        id: 34,
        text: 'What congenital disorder caused by complete absence of bilirubin UDP-glucuronosyltransferase results in severe unconjugated hyperbilirubinemia and fatal kernicterus without liver transplant?',
        options: ['Gilbert’s syndrome', 'Crigler-Najjar Syndrome Type I', 'Dubin-Johnson syndrome', 'Rotor syndrome'],
        correctAnswer: 1,
        rationale: 'Crigler-Najjar Type I is an autosomal recessive complete lack of UGT1A1 with serum unconjugated bilirubin > 20 mg/dL, requiring phototherapy and liver transplantation.',
        reviewTopic: 'Syllabus (/bio-chem-syllabus)'
      },

      // 35-40 Immunochemistry & ELISA
      {
        id: 35,
        text: 'Which antibody class provides the primary defense against bacterial and viral invasion at mucosal surfaces (GI tract, respiratory tract) and is secreted in breast milk?',
        options: ['IgG', 'Secretory IgA', 'IgE', 'IgD'],
        correctAnswer: 1,
        rationale: 'Secretory IgA coats mucosal membranes to neutralize microbes and toxins, preventing adherence to host mucosal epithelial cells.',
        reviewTopic: 'Syllabus (/bio-chem-syllabus)'
      },
      {
        id: 36,
        text: 'What is the only class of immunoglobulins that can cross the placental barrier from mother to fetus to provide passive humoral immunity to the neonate?',
        options: ['IgM', 'IgG', 'IgA', 'IgE'],
        correctAnswer: 1,
        rationale: 'IgG is transported across the placenta by FcRn receptors, protecting newborns against infectious pathogens during their first months of life.',
        reviewTopic: 'Syllabus (/bio-chem-syllabus)'
      },
      {
        id: 37,
        text: 'Which immunoglobulin class is a 19S pentamer with 10 antigen binding sites that appears earliest in the primary immune response to an acute infection?',
        options: ['IgA', 'IgD', 'IgM', 'IgG'],
        correctAnswer: 2,
        rationale: 'IgM is the first antibody synthesized by B cells in response to initial antigen exposure, serving as a diagnostic hallmark of recent acute infection.',
        reviewTopic: 'Syllabus (/bio-chem-syllabus)'
      },
      {
        id: 38,
        text: 'In Sandwich ELISA, what is the correct sequential order of reagents added to the microplate well?',
        options: ['Enzyme substrate → Capture antibody → Patient antigen → Detection antibody', 'Capture Antibody on plate → Patient Antigen → Enzyme-linked Secondary Antibody → Substrate', 'Patient Antigen → Capture Antibody → Stop solution → Acid', 'Secondary antibody → Substrate → Antigen → Washing'],
        correctAnswer: 1,
        rationale: 'Sandwich ELISA involves: 1) Capture antibody coated on plate, 2) Target antigen added, 3) Wash, 4) Enzyme-conjugated detection antibody added, 5) Wash, 6) Chromogenic substrate.',
        reviewTopic: 'Syllabus (/bio-chem-syllabus)'
      },
      {
        id: 39,
        text: 'What type of allergic reaction is mediated when allergen cross-links antigen-specific IgE bound to mast cells, triggering degranulation and massive histamine release?',
        options: ['Type I Immediate Hypersensitivity / Anaphylaxis', 'Type II Antibody-dependent cytotoxicity', 'Type III Immune complex disease', 'Type IV Delayed-type cell-mediated hypersensitivity'],
        correctAnswer: 0,
        rationale: 'Type I hypersensitivity involves IgE-mediated mast cell degranulation causing bronchoconstriction, vasodilation, urticaria, and anaphylactic shock.',
        reviewTopic: 'Syllabus (/bio-chem-syllabus)'
      },
      {
        id: 40,
        text: 'Which laboratory technique combines enzyme-conjugated antibodies and microplate spectrophotometry to quantify nanogram concentrations of hormones, viral antigens, and antibodies?',
        options: ['ELISA (Enzyme-Linked Immunosorbent Assay)', 'Paper chromatography', 'Serum electrophoresis', 'Flame photometry'],
        correctAnswer: 0,
        rationale: 'ELISA is the gold standard clinical immunoassay for sensitive, high-throughput quantification of antigens and antibodies in blood and body fluids.',
        reviewTopic: 'Syllabus (/bio-chem-syllabus)'
      }
    ]
  }
};
