/**
 * Comprehensive Anatomical Diagram Explanations & Clinical Annotations
 * Provides textbook-grade, NCLEX-aligned anatomical and physiological breakdowns
 * for all textbook figures, anatomical plates, and radiological cross-sections.
 * Each entry provides structured:
 *   - para / overview (In-depth theoretical foundation & structural morphology)
 *   - points / landmarks (Bulleted architectural landmarks, features, & labels)
 *   - theory / clinicalRelevance (Clinical bedside rules, pathophysiology & NCLEX takeaways)
 */

export const DIAGRAM_EXPLANATIONS = {
  // Figure 1.1
  "ch1_image1.png": {
    figure: "Figure 1.1",
    title: "The Human Body in Standard Anatomical Position",
    para: "This foundational illustration establishes the universal spatial reference point for all medical, surgical, and nursing documentation. In standard anatomical position, the subject stands erect facing forward with the head level, eyes directed straight ahead, feet resting flat and parallel on the floor, and upper limbs hanging comfortably at the sides with palms fully supinated (facing forward) and thumbs pointing away from the midline. All directional descriptions in clinical charts are referenced relative to this stance, regardless of whether the patient is supine, prone, or in Fowler's position.",
    overview: "This foundational illustration establishes the universal spatial reference point for all medical, surgical, and nursing documentation. In standard anatomical position, the subject stands erect facing forward with the head level, eyes directed straight ahead, feet resting flat and parallel on the floor, and upper limbs hanging comfortably at the sides with palms fully supinated (facing forward) and thumbs pointing away from the midline. All directional descriptions in clinical charts are referenced relative to this stance, regardless of whether the patient is supine, prone, or in Fowler's position.",
    points: [
      "**Cephalic & Cervical Regions:** Head vault (cranial/facial) and anterior neck housing the larynx, thyroid gland, and carotid pulse landmark.",
      "**Thoracic Region:** Sternal, axillary, and pectoral regions directly overlying heart, lungs, and mediastinal viscera.",
      "**Abdominal & Pelvic Regions:** Umbilical and inguinal landmarks used for quadrant mapping and peritoneal assessment.",
      "**Upper Extremities:** Brachial, antecubital fossa (primary IV access & venipuncture site), forearm, carpal wrist, and supinated palms with lateral pollex (thumb).",
      "**Lower Extremities:** Femoral thigh, patellar knee, anterior crural leg, pedal dorsum, and parallel feet flat on floor.",
      "**Posterior Landmarks:** Occipital skull base, scapular margins for lung auscultation, vertebral column, and sacral pressure-point zone."
    ],
    theory: "Clinical Bedside Rule: A patient's anatomical coordinates never alter with bed positioning. A burn on the palm is always charted on the 'anterior surface of the hand', even when the patient is placed prone. Thumbs are always laterally oriented.",
    clinicalRelevance: "Clinical Bedside Rule: A patient's anatomical coordinates never alter with bed positioning. A burn on the palm is always charted on the 'anterior surface of the hand', even when the patient is placed prone. Thumbs are always laterally oriented.",
    nclexPearls: [
      "Ventrogluteal site is the preferred adult IM injection site because it is free of major neurovascular bundles.",
      "Antecubital fossa houses the median cubital vein, the first-line vessel for routine phlebotomy.",
      "Pressure injury staging requires precise anatomical positioning (sacrum, ischium, greater trochanter, and calcaneus)."
    ]
  },

  // Figure 1.2
  "ch1_image2.png": {
    figure: "Figure 1.2",
    title: "Directional Terms Applied to the Human Body",
    para: "Directional terminology provides precise, standardized vectors to define the relative spatial position of one body structure in comparison to another. Using standardized paired opposites prevents diagnostic ambiguity and errors during surgical site marking, radiology interpretation, and nursing wound documentation.",
    overview: "Directional terminology provides precise, standardized vectors to define the relative spatial position of one body structure in comparison to another. Using standardized paired opposites prevents diagnostic ambiguity and errors during surgical site marking, radiology interpretation, and nursing wound documentation.",
    points: [
      "**Superior (Cranial) vs. Inferior (Caudal):** Toward the head vs. toward the lower aspects of the body (e.g., heart is superior to stomach).",
      "**Anterior (Ventral) vs. Posterior (Dorsal):** Toward the front surface vs. toward the rear surface (e.g., sternum is anterior to heart).",
      "**Medial vs. Lateral vs. Intermediate:** Toward the vertical midline vs. away toward the outer flanks vs. between two structures.",
      "**Proximal vs. Distal:** Nearer to the trunk or point of limb attachment vs. farther away along an extremity (e.g., wrist is distal to elbow).",
      "**Superficial (External) vs. Deep (Internal):** Toward the skin surface vs. inward toward the bodily core.",
      "**Ipsilateral vs. Contralateral:** On the same side of the body vs. on opposite sides (e.g., stroke produces contralateral motor hemiplegia)."
    ],
    theory: "Clinical Application: Proximal and distal are strictly reserved for extremities (arms and legs), never for the axial trunk. When documenting wounds, record distance from the nearest palpable bony landmark (e.g., 'wound located 4 cm distal to the medial epicondyle').",
    clinicalRelevance: "Essential for charting surgical incisions, drain locations, and neuro deficits. In cerebrovascular accidents, hemiplegia is contralateral to the affected cerebral hemisphere.",
    nclexPearls: [
      "Proximal and distal are only applied to extremities, not to the vertebral column.",
      "Describe incisions relative to fixed bony prominences rather than transient skin creases."
    ]
  },

  // Figure 1.3
  "ch1_image3.png": {
    figure: "Figure 1.3",
    title: "Planes of the Human Body (Sagittal, Frontal, Transverse)",
    para: "This plate illustrates the three fundamental geometric planes cutting through the human body: Sagittal, Frontal (Coronal), and Transverse (Axial / Horizontal). Understanding these imaginary two-dimensional surfaces is mandatory for orienting modern cross-sectional diagnostic imaging modalities like Computed Tomography (CT), Magnetic Resonance Imaging (MRI), and bedside ultrasonography.",
    overview: "This plate illustrates the three fundamental geometric planes cutting through the human body: Sagittal, Frontal (Coronal), and Transverse (Axial / Horizontal). Understanding these imaginary two-dimensional surfaces is mandatory for orienting modern cross-sectional diagnostic imaging modalities like Computed Tomography (CT), Magnetic Resonance Imaging (MRI), and bedside ultrasonography.",
    points: [
      "**Midsagittal (Median) Plane:** Vertical cut exactly along the midline, dividing the body into equal, symmetrical right and left halves.",
      "**Parasagittal Plane:** Vertical cut parallel to the midline dividing the body into unequal right and left segments.",
      "**Frontal (Coronal) Plane:** Vertical cut at right angles to sagittal plane, dividing the body into anterior (front) and posterior (back) portions.",
      "**Transverse (Axial / Cross-Sectional) Plane:** Horizontal plane dividing the body into superior (upper) and inferior (lower) segments.",
      "**Oblique Plane:** Angular diagnostic cut passing at any non-90-degree angle."
    ],
    theory: "Radiological Orientation Rule: Standard axial CT and MRI views are displayed as if the nurse is standing at the patient's feet looking up toward their head. The patient's right anatomical side is on the viewer's left side.",
    clinicalRelevance: "Critical for interpreting head CTs during acute ischemic stroke evaluations and abdominal CT scans during acute abdomen evaluations.",
    nclexPearls: [
      "Axial/transverse scans always project patient right on image left.",
      "Coronal planes are utilized for thoracic chest radiography and spine alignment imaging."
    ]
  },

  // Figure 1.4
  "ch1_image4.png": {
    figure: "Figure 1.4",
    title: "Levels of Structural Organization in the Human Body",
    para: "The human organism is structured in an ascending hierarchy of structural complexity spanning six distinct tiers: Chemical, Cellular, Tissue, Organ, System, and Organismal. Each higher level incorporates the properties of the tiers beneath it while manifesting emergent biological functions necessary for multicellular survival and homeostasis.",
    overview: "The human organism is structured in an ascending hierarchy of structural complexity spanning six distinct tiers: Chemical, Cellular, Tissue, Organ, System, and Organismal. Each higher level incorporates the properties of the tiers beneath it while manifesting emergent biological functions necessary for multicellular survival and homeostasis.",
    points: [
      "**1. Chemical Level:** Atoms (C, H, O, N, P, Ca, K) combine into vital bio-macromolecules (DNA, RNA, proteins, carbohydrates, lipids).",
      "**2. Cellular Level:** The fundamental living structural and functional unit (erythrocytes, myocytes, neurons, osteocytes).",
      "**3. Tissue Level:** Collectives of specialized cells and extracellular matrix performing synchronized tasks (Epithelial, Connective, Muscular, Nervous).",
      "**4. Organ Level:** Structures composed of two or more distinct tissue types collaborating for specific physiological functions (e.g., stomach, heart, kidneys).",
      "**5. System Level:** Associations of related organs executing complex life processes (e.g., Cardiovascular, Respiratory, Digestive systems).",
      "**6. Organismal Level:** The highest integration tier representing the total living human individual in dynamic homeostatic equilibrium."
    ],
    theory: "Pathological Cascades in Nursing: Clinical diseases rarely stay localized to one level. For instance, an autoimmune gene defect at the chemical level destroys pancreatic beta-cells at the cellular level, disrupting endocrine tissue, crippling insulin regulation at the organ system level, and causing multi-organ diabetic ketoacidosis at the organismal level.",
    clinicalRelevance: "Enables nurses to connect microscopic laboratory values (e.g., arterial blood gases, serum electrolytes) to patient-level systemic symptoms and nursing interventions.",
    nclexPearls: [
      "Carbon, Hydrogen, Oxygen, and Nitrogen constitute over 96% of human body mass.",
      "Tissues are defined as groups of similar cells with a common embryonic origin working together."
    ]
  },

  // Figure 1.5
  "ch1_image5.png": {
    figure: "Figure 1.5",
    title: "Generalized Ultrastructure of a Human Cell",
    para: "This diagram presents the comprehensive internal anatomy of a prototypical eukaryotic human cell. A generalized cell is partitioned into three major structural divisions: the plasma membrane forming the outer boundary, the cytoplasm encompassing the aqueous cytosol and embedded metabolic organelles, and the centrally situated nucleus containing genetic chromatin blueprints.",
    overview: "This diagram presents the comprehensive internal anatomy of a prototypical eukaryotic human cell. A generalized cell is partitioned into three major structural divisions: the plasma membrane forming the outer boundary, the cytoplasm encompassing the aqueous cytosol and embedded metabolic organelles, and the centrally situated nucleus containing genetic chromatin blueprints.",
    points: [
      "**Plasma Membrane:** Semi-permeable phospholipid bilayer regulating transport between intracellular and extracellular fluid.",
      "**Cytosol:** Gel-like intracellular fluid (ICF) rich in potassium, dissolved proteins, glucose, and metabolic enzymes.",
      "**Metabolic Organelles:** Mitochondria (ATP production), Endoplasmic Reticulum (protein & lipid synthesis), Golgi Complex (sorting & packaging), Lysosomes (acidic degradation).",
      "**Cytoskeleton:** Microfilaments, intermediate filaments, and microtubules maintaining cell architecture and driving intracellular transit.",
      "**Nucleus:** Double-membrane control center housing chromosomes and the nucleolus."
    ],
    theory: "Cellular Homeostasis in Critical Care: Cellular swelling or dehydration directly reflects intravenous fluid tonicity. Disruption of cellular membrane transport pumps (like the Na+/K+ ATPase pump) during ischemic hypoxia causes sodium and water influx, leading to irreversible cellular lysis.",
    clinicalRelevance: "Pharmacological actions of diuretics, cardiac glycosides (Digoxin), and IV fluids rely directly on understanding cellular ultrastructure and ionic gradients.",
    nclexPearls: [
      "Cytoplasm consists of cytosol PLUS organelles, whereas cytosol is strictly the fluid portion.",
      "Potassium is the chief intracellular cation; sodium is the chief extracellular cation."
    ]
  },

  // Figure 1.6
  "ch1_image6.png": {
    figure: "Figure 1.6",
    title: "Phospholipid Bilayer Molecular Arrangement",
    para: "This illustration demonstrates the amphipathic molecular construction of the cellular phospholipid bilayer. Phospholipid molecules naturally arrange into a double-layered sheet in aqueous environments because each molecule possesses a polar hydrophilic phosphate head that seeks water and two non-polar hydrophobic fatty acid hydrocarbon tails that repel water.",
    overview: "This illustration demonstrates the amphipathic molecular construction of the cellular phospholipid bilayer. Phospholipid molecules naturally arrange into a double-layered sheet in aqueous environments because each molecule possesses a polar hydrophilic phosphate head that seeks water and two non-polar hydrophobic fatty acid hydrocarbon tails that repel water.",
    points: [
      "**Hydrophilic Polar Heads:** Phosphate-glycerol complexes facing outwards toward extracellular fluid (ECF) and inward toward intracellular cytosol (ICF).",
      "**Hydrophobic Nonpolar Tails:** Paired saturated and unsaturated fatty acid hydrocarbon chains facing inwardly toward each other, forming a water-repelling central hydrophobic core.",
      "**Selective Permeability:** Readily permeable to small nonpolar lipid-soluble substances (O2, CO2, steroid hormones, fat-soluble vitamins); impermeable to charged ions (Na+, K+, Ca2+) and large polar molecules (glucose) without transporter channels.",
      "**Cholesterol Molecules:** Interspersed between fatty acid tails to stabilize membrane fluidity across fluctuations in temperature."
    ],
    theory: "Clinical Pharmacokinetics: Lipid-soluble medications (such as general anesthetics, fentanyl, and steroid drugs) easily diffuse straight through the phospholipid bilayer and blood-brain barrier, while water-soluble drugs (such as aminoglycoside antibiotics) require specialized transport channels or polar delivery mechanisms.",
    clinicalRelevance: "Explains transdermal drug delivery patches (e.g., nitroglycerin, nicotine) and blood-brain barrier permeability in neuro-pharmacology.",
    nclexPearls: [
      "Lipid-soluble substances cross the phospholipid bilayer via simple diffusion without energy expenditure.",
      "Ions and water require protein channels (aquaporins and ion gates) to cross the hydrophobic core."
    ]
  },

  // Figure 1.7
  "ch1_image7.png": {
    figure: "Figure 1.7",
    title: "Plasma Membrane Fluid Mosaic Model Architecture",
    para: "The Fluid Mosaic Model describes the biological membrane as a dynamic, flexible two-dimensional fluid lipid bilayer embedded with a diverse mosaic of functional proteins, glycoproteins, glycolipids, and cholesterol. The proteins float like icebergs in a lipid sea, fulfilling diverse vital regulatory, enzymatic, and receptor functions.",
    overview: "The Fluid Mosaic Model describes the biological membrane as a dynamic, flexible two-dimensional fluid lipid bilayer embedded with a diverse mosaic of functional proteins, glycoproteins, glycolipids, and cholesterol. The proteins float like icebergs in a lipid sea, fulfilling diverse vital regulatory, enzymatic, and receptor functions.",
    points: [
      "**Integral (Transmembrane) Proteins:** Span the entire bilayer; function as selective ion channels, carrier transporters, and ligand-binding receptors.",
      "**Peripheral Proteins:** Attached loosely to inner or outer surfaces; act as cytoskeletal anchors and enzymatic signal transduction relays.",
      "**Glycocalyx (Sugar Coat):** Carbohydrate chains projecting from glycoproteins and glycolipids that serve as a molecular 'fingerprint' for immune self-recognition (MHC complexes) and cellular adhesion.",
      "**Cholesterol Dampeners:** Regulate fluidity, preventing membranes from freezing in cold or becoming excessively permeable in heat."
    ],
    theory: "Immune Recognition in Transplantation: The glycocalyx enables the immune system to distinguish between self and non-self cells. In organ transplant rejection, recipient cytotoxic T-cells recognize foreign donor glycocalyx glycoproteins, triggering graft rejection that necessitates immunosuppressive therapy (e.g., Tacrolimus, Cyclosporine).",
    clinicalRelevance: "Receptor sites on the fluid mosaic membrane are the targets for most clinical medications (e.g., beta-blockers, ACE inhibitors, insulin).",
    nclexPearls: [
      "Ligand binding to transmembrane receptors triggers secondary messenger cascades (like cAMP).",
      "Glycocalyx alterations are seen in malignant cancer cell metastasis."
    ]
  },

  // Figure 1.8
  "ch1_image8.png": {
    figure: "Figure 1.8",
    title: "Cytoskeleton Components (Microfilaments, Intermediate Filaments, Microtubules)",
    para: "This plate details the three structural filamentous classes comprising the intracellular cytoskeleton: Microfilaments (actin), Intermediate Filaments (keratin, desmin, neurofilaments), and Microtubules (tubulin). Together, they establish a dynamic structural scaffold that maintains cell shape, anchors organelles, generates mechanical strength, and coordinates cellular motility and cell division.",
    overview: "This plate details the three structural filamentous classes comprising the intracellular cytoskeleton: Microfilaments (actin), Intermediate Filaments (keratin, desmin, neurofilaments), and Microtubules (tubulin). Together, they establish a dynamic structural scaffold that maintains cell shape, anchors organelles, generates mechanical strength, and coordinates cellular motility and cell division.",
    points: [
      "**Microfilaments (7 nm diameter):** Composed of actin; concentrated at cell periphery (cortex); generate mechanical support, microvilli core structure, and cleavage furrow contraction during cytokinesis.",
      "**Intermediate Filaments (8-10 nm diameter):** Extremely strong rope-like protein fibers (keratin in skin, desmin in muscle); absorb high tensile stresses, anchor the nucleus, and form desmosomal cell junctions.",
      "**Microtubules (25 nm diameter):** Hollow cylindrical tubes assembled from alpha and beta tubulin; form tracks for organelle transport, build cilia and flagella, and assemble the mitotic spindle.",
      "**Centrosome & Centrioles:** Microtubule-organizing center near nucleus containing orthogonal centrioles with 9 triplets of microtubules."
    ],
    theory: "Oncological Pharmacology: Chemotherapeutic alkaloids like Vincristine and Paclitaxel target microtubule dynamics. Vincristine binds tubulin to prevent mitotic spindle assembly, arresting cancer cells in metaphase, whereas Paclitaxel prevents microtubule disassembly, inducing apoptotic tumor cell death.",
    clinicalRelevance: "Explains peripheral neuropathy side effects in oncology patients treated with taxanes or vinca alkaloids.",
    nclexPearls: [
      "Microfilaments = Actin (motility & cytokinesis); Microtubules = Tubulin (spindle & organelle transit).",
      "Centrosome serves as the primary microtubule organizing center for cell division."
    ]
  },

  // Figure 1.9
  "ch1_image9.png": {
    figure: "Figure 1.9",
    title: "Endoplasmic Reticulum (Rough ER studded with Ribosomes & Smooth ER)",
    para: "The endoplasmic reticulum (ER) is an expansive labyrinth of membrane-enclosed tubules and flattened sacs (cisternae) extending continuously from the nuclear envelope. It is morphologically and functionally bifurcated into Rough Endoplasmic Reticulum (RER), studded with outer ribosomes for protein synthesis, and Smooth Endoplasmic Reticulum (SER), devoid of ribosomes and dedicated to lipid metabolism and detoxification.",
    overview: "The endoplasmic reticulum (ER) is an expansive labyrinth of membrane-enclosed tubules and flattened sacs (cisternae) extending continuously from the nuclear envelope. It is morphologically and functionally bifurcated into Rough Endoplasmic Reticulum (RER), studded with outer ribosomes for protein synthesis, and Smooth Endoplasmic Reticulum (SER), devoid of ribosomes and dedicated to lipid metabolism and detoxification.",
    points: [
      "**Rough ER (RER):** Outer surface studded with ribosomes; synthesizes secretory proteins (e.g., insulin, antibodies), lysosomal enzymes, and membrane phospholipids.",
      "**Ribosomes:** Sites of translation converting messenger RNA (mRNA) into polypeptide amino acid chains.",
      "**Smooth ER (SER):** Synthesizes fatty acids, phospholipids, and steroid hormones (estrogen, testosterone, cortisol); lacks ribosomes.",
      "**Hepatic Detoxification:** Hepatocyte SER contains cytochrome P450 enzymes that detoxify lipid-soluble drugs, alcohol, and metabolic waste products.",
      "**Sarcoplasmic Reticulum:** Specialized muscle SER that sequesters and releases ionic calcium (Ca2+) to trigger muscular contraction."
    ],
    theory: "Hepatic Drug Tolerance & Interactions: Chronic intake of drugs like barbiturates or alcohol triggers dramatic proliferation of hepatocyte Smooth ER. This accelerates metabolic clearance of both the offending agent and other co-administered medications, requiring higher therapeutic doses and predisposing to toxic drug-drug interactions.",
    clinicalRelevance: "High rough ER presence is characteristic of active secretory cells such as pancreatic acinar cells and antibody-producing plasma B-lymphocytes.",
    nclexPearls: [
      "Granular (Rough) ER synthesizes proteins for export; Smooth ER synthesizes lipids and detoxifies toxins.",
      "Muscle contraction strictly depends on calcium sequestration by sarcoplasmic reticulum."
    ]
  },

  // Figure 1.10
  "ch1_image10.png": {
    figure: "Figure 1.10",
    title: "Golgi Apparatus Architecture with Cis and Trans Cisternae",
    para: "This diagram shows the Golgi apparatus, the central post-translational processing, sorting, and packaging factory of the cell. Constructed from 3 to 20 curved, flattened membranous sacs termed cisternae, the Golgi receives newly synthesized proteins from the Rough ER at its convex cis (entry) face, chemically modifies them through medial cisternae, and dispatches them via its concave trans (exit) face.",
    overview: "This diagram shows the Golgi apparatus, the central post-translational processing, sorting, and packaging factory of the cell. Constructed from 3 to 20 curved, flattened membranous sacs termed cisternae, the Golgi receives newly synthesized proteins from the Rough ER at its convex cis (entry) face, chemically modifies them through medial cisternae, and dispatches them via its concave trans (exit) face.",
    points: [
      "**Cis (Convex / Entry) Face:** Faces the Rough ER; receives transport vesicles containing raw newly synthesized polypeptides.",
      "**Medial Cisternae:** Intermediate enzymatic sacs that modify proteins via glycosylation (adding sugar chains) and phosphorylation.",
      "**Trans (Concave / Exit) Face:** Final dispatch terminal that packages sorted proteins into specific transport vesicles.",
      "**Three Output Destinations:** (1) Secretory vesicles for exocytosis into ECF (e.g., hormones), (2) Membrane vesicles for lipid bilayer insertion, and (3) Primary lysosomes containing digestive acid hydrolases."
    ],
    theory: "Lysosomal Storage Diseases: If Golgi enzymes fail to correctly tag lysosomal hydrolytic enzymes with mannose-6-phosphate markers, the enzymes are misdirected and secreted out of the cell instead of delivered to lysosomes. This defect leads to devastating metabolic storage diseases (e.g., I-cell disease, Tay-Sachs).",
    clinicalRelevance: "Essential for producing secretory hormones like insulin and parathyroid hormone, which must undergo Golgi cleavage to achieve active physiological forms.",
    nclexPearls: [
      "Cis face receives vesicles from RER; Trans face dispatches secretory and lysosomal vesicles.",
      "Golgi apparatus is most prominent in glandular and secretory cells."
    ]
  },

  // Figure 1.11
  "ch1_image11.png": {
    figure: "Figure 1.11",
    title: "Peroxisome Structure & Enzymatic Catalytic Function",
    para: "Peroxisomes (microbodies) are small, spherical metabolic organelles containing potent oxidative enzymes such as oxidases and catalase. Unlike lysosomes which bud from the Golgi, peroxisomes self-replicate by fission. They specialize in beta-oxidation of very long-chain fatty acids, synthesis of specialized myelin phospholipids (plasmalogens), and neutralizing hazardous hydrogen peroxide into harmless water and oxygen.",
    overview: "Peroxisomes (microbodies) are small, spherical metabolic organelles containing potent oxidative enzymes such as oxidases and catalase. Unlike lysosomes which bud from the Golgi, peroxisomes self-replicate by fission. They specialize in beta-oxidation of very long-chain fatty acids, synthesis of specialized myelin phospholipids (plasmalogens), and neutralizing hazardous hydrogen peroxide into harmless water and oxygen.",
    points: [
      "**Oxidase Enzymes:** Strip hydrogen atoms from organic substrates, combining them with molecular oxygen to produce toxic hydrogen peroxide (H2O2).",
      "**Catalase Enzyme:** Immediately decomposes hazardous H2O2 into water (H2O) and oxygen (O2): 2 H2O2 -> 2 H2O + O2.",
      "**Fatty Acid Beta-Oxidation:** Breaks down very long-chain fatty acids (VLCFAs > 22 carbons) into shorter chains for mitochondrial ATP generation.",
      "**Hepatic & Renal Abundance:** Highest concentration found in liver and kidney cells to detoxify ingested noxious substances including ethanol."
    ],
    theory: "Peroxisomal Disorders in Nursing: Genetic defects in peroxisomal biogenesis (e.g., Zellweger Syndrome, X-linked Adrenoleukodystrophy) prevent VLCFA breakdown. Toxic fatty acids accumulate in the brain and adrenal cortex, causing rapid demyelination, severe neurological degeneration, and adrenal insufficiency in pediatric patients.",
    clinicalRelevance: "Hydrogen peroxide is utilized in wound debridement because bubbling effervescence occurs when tissue catalase rapidly degrades H2O2 to release oxygen.",
    nclexPearls: [
      "Catalase degrades toxic hydrogen peroxide into safe water and oxygen.",
      "Peroxisomes are vital for hepatic alcohol detoxification and myelin sheath maintenance."
    ]
  },

  // Figure 1.12
  "ch1_image12.png": {
    figure: "Figure 1.12",
    title: "Mitochondrion Structure (Double Membrane, Cristae, and Matrix)",
    para: "Known universally as the 'cellular powerhouses', mitochondria generate over 95% of the cell's adenosine triphosphate (ATP) through aerobic cellular respiration and oxidative phosphorylation. They possess an evolutionary endosymbiotic double-membrane architecture with outer membrane, intermembrane space, folded inner cristae, an innermost matrix containing circular maternal mitochondrial DNA (mtDNA), and self-replicating 70S ribosomes.",
    overview: "Known universally as the 'cellular powerhouses', mitochondria generate over 95% of the cell's adenosine triphosphate (ATP) through aerobic cellular respiration and oxidative phosphorylation. They possess an evolutionary endosymbiotic double-membrane architecture with outer membrane, intermembrane space, folded inner cristae, an innermost matrix containing circular maternal mitochondrial DNA (mtDNA), and self-replicating 70S ribosomes.",
    points: [
      "**Outer Mitochondrial Membrane:** Smooth lipid boundary containing large porin channels permeable to small ions and metabolites.",
      "**Inner Mitochondrial Membrane:** Extensively folded into shelf-like **cristae** to vastly expand surface area for Electron Transport Chain (ETC) complexes and ATP synthase turbines.",
      "**Mitochondrial Matrix:** Fluid central compartment containing Krebs (Citric Acid) Cycle enzymes, maternal circular mtDNA, and self-replicating ribosomes.",
      "**Aerobic ATP Yield:** Generates 30 to 32 molecules of ATP per glucose molecule in the presence of oxygen, compared to only 2 ATP in anaerobic glycolysis.",
      "**Role in Apoptosis:** Releases Cytochrome C into cytosol to trigger the programmed cell death cascade."
    ],
    theory: "Shock, Lactic Acidosis, & Cyanide Toxicity: When cellular hypoxia occurs in shock (septic, hypovolemic, cardiogenic), the lack of oxygen stalls mitochondrial oxidative phosphorylation. Cells revert to anaerobic glycolysis, producing massive lactic acid buildup and fatal metabolic acidosis. Cyanide poisons Cytochrome C oxidase in cristae, causing instant cellular asphyxiation.",
    clinicalRelevance: "Organs with the highest metabolic ATP demands (brain, myocardium, skeletal muscle, renal proximal tubules) contain the highest mitochondrial density.",
    nclexPearls: [
      "Mitochondria are the powerhouses of the cell that synthesize ATP via aerobic respiration.",
      "Mitochondrial DNA is inherited exclusively through the maternal lineage.",
      "Cyanide and carbon monoxide toxicity primarily paralyze mitochondrial electron transport."
    ]
  },

  // Figure 1.13
  "ch1_image13.png": {
    figure: "Figure 1.13",
    title: "The Cell Nucleus with Nuclear Envelope, Pores, and Nucleolus",
    para: "The nucleus is the master executive control center of the eukaryotic cell, safeguarding hereditary genomic instructions encoded within DNA. It is enclosed by a double-membraned nuclear envelope perforated by specialized nuclear pore complexes and contains the dense nucleolus, the site of ribosomal RNA (rRNA) transcription and ribosomal subunit assembly.",
    overview: "The nucleus is the master executive control center of the eukaryotic cell, safeguarding hereditary genomic instructions encoded within DNA. It is enclosed by a double-membraned nuclear envelope perforated by specialized nuclear pore complexes and contains the dense nucleolus, the site of ribosomal RNA (rRNA) transcription and ribosomal subunit assembly.",
    points: [
      "**Nuclear Envelope:** Double phospholipid bilayer separating nucleoplasm from cytoplasm; outer membrane is continuous with the Rough ER.",
      "**Nuclear Pore Complexes:** Massive octagonal protein rings controlling bidirectional transport of RNA, nucleotides, histones, and transcription factors.",
      "**Nucleolus:** Dense non-membrane bound nuclear structure where rRNA is transcribed and assembled with proteins into ribosomal subunits.",
      "**Chromatin:** The relaxed, functional form of DNA complexed with histone proteins present in non-dividing cells.",
      "**Anucleate vs. Multinucleate Cells:** Mature erythrocytes lack nuclei to maximize hemoglobin carrying capacity, whereas skeletal muscle fibers are multinucleate."
    ],
    theory: "Hematological & Oncological Diagnostics: Nuclear-to-cytoplasmic (N:C) ratio is a crucial diagnostic indicator in pathology. Normal cells maintain a low N:C ratio, whereas malignant cancer cells display enlarged, hyperchromatic, pleomorphic nuclei with prominent nucleoli indicative of uncontrolled transcription and proliferation.",
    clinicalRelevance: "Erythrocyte enucleation explains why red blood cells have a limited 120-day lifespan and cannot undergo cellular repair or division.",
    nclexPearls: [
      "The nucleolus is responsible for synthesizing ribosomal RNA (rRNA) and ribosomal subunits.",
      "Mature red blood cells are anucleate and survive approximately 120 days."
    ]
  },

  // Figure 1.14
  "ch1_image14.png": {
    figure: "Figure 1.14",
    title: "DNA Double Helix & Histone Octamers Chromatin Packaging",
    para: "Human somatic cells contain approximately 2 meters of linear DNA packaged into a microscopic 6-micrometer nucleus. This monumental compaction is achieved through hierarchical tiers of chromatin winding, beginning with the DNA double helix wrapping twice around an octamer of basic histone proteins to form bead-like nucleosomes, which further condense into 46 visible chromosomes during cell division.",
    overview: "Human somatic cells contain approximately 2 meters of linear DNA packaged into a microscopic 6-micrometer nucleus. This monumental compaction is achieved through hierarchical tiers of chromatin winding, beginning with the DNA double helix wrapping twice around an octamer of basic histone proteins to form bead-like nucleosomes, which further condense into 46 visible chromosomes during cell division.",
    points: [
      "**DNA Double Helix:** Complementary antiparallel sugar-phosphate backbones connected by hydrogen-bonded nitrogenous base pairs (Adenine-Thymine, Guanine-Cytosine).",
      "**Histone Octamer Core:** Positively charged basic proteins (two each of H2A, H2B, H3, H4) that electrostatically bind negatively charged DNA phosphate groups.",
      "**Nucleosome ('Beads on a String'):** 147 base pairs of DNA wound 1.65 times around a histone octamer, locked by linker histone H1.",
      "**Chromatin Fibers (30 nm & Loops):** Compacted solenoid coils anchored to nuclear matrix scaffolding.",
      "**Euchromatin vs. Heterochromatin:** Euchromatin is uncoiled and transcriptionally active; heterochromatin is tightly packed and transcriptionally silent."
    ],
    theory: "Epigenetics in Clinical Practice: Chemical modifications to histone tails (acetylation, methylation) determine whether genes are accessible for transcription. Histone deacetylase (HDAC) inhibitors (e.g., Vorinostat) are utilized in clinical oncology to reactivate dormant tumor-suppressor genes in cutaneous T-cell lymphoma.",
    clinicalRelevance: "Ionizing radiation and alkylating antineoplastic drugs induce double-strand DNA breaks that disrupt histone architecture and trigger apoptotic tumor death.",
    nclexPearls: [
      "DNA wraps around histone protein octamers to form foundational nucleosomes.",
      "Adenine pairs strictly with Thymine (2 hydrogen bonds); Guanine pairs with Cytosine (3 hydrogen bonds)."
    ]
  },

  // Figure 1.15
  "ch1_image15.png": {
    figure: "Figure 1.15",
    title: "Somatic Cell Cycle Progression (G0, G1, S, G2, and M Phase)",
    para: "The cell cycle is an orderly, tightly regulated sequence of events by which a somatic cell duplicates its contents and divides into two genetically identical daughter cells. The cycle is divided into Interphase—comprising G1 (Gap 1 growth), S (Synthesis DNA replication), and G2 (Gap 2 mitotic preparation)—and the Mitotic (M) Phase. Cells not actively preparing to divide exit into the quiescent G0 phase.",
    overview: "The cell cycle is an orderly, tightly regulated sequence of events by which a somatic cell duplicates its contents and divides into two genetically identical daughter cells. The cycle is divided into Interphase—comprising G1 (Gap 1 growth), S (Synthesis DNA replication), and G2 (Gap 2 mitotic preparation)—and the Mitotic (M) Phase. Cells not actively preparing to divide exit into the quiescent G0 phase.",
    points: [
      "**G0 Phase (Quiescent / Resting):** Non-dividing metabolic state; permanent in neurons and cardiac myocytes, reversible in hepatocytes.",
      "**G1 Phase (Growth & Preparation):** Intensive protein synthesis, organelle duplication, and metabolic enlargement in preparation for DNA replication.",
      "**S Phase (Synthesis):** DNA replication occurs; exactly 46 chromosomes (single chromatids) duplicate into 46 chromosomes with 92 sister chromatids.",
      "**G2 Phase (Mitotic Preparation):** Enzymes and centrosomes finish duplication; tubulin synthesized for mitotic spindle.",
      "**M Phase (Mitosis & Cytokinesis):** Nuclear segregation followed by physical cleavage of the cytoplasm.",
      "**Cell Cycle Checkpoints:** G1/S, G2/M, and Spindle assembly checkpoints governed by Cyclin-Dependent Kinases (CDKs) and p53 tumor suppressor."
    ],
    theory: "Cell-Cycle Specific Chemotherapy: Understanding cell cycle phases governs antineoplastic chemotherapy regimens. Methotrexate and 5-Fluorouracil are S-phase specific inhibitors blocking DNA synthesis; Paclitaxel and Vincristine are M-phase specific disrupting mitotic spindles; and alkylating agents are non-phase specific.",
    clinicalRelevance: "Tissues with rapid turnover (bone marrow, intestinal mucosa, hair follicles) are most susceptible to cycle-specific chemotherapy toxicities (neutropenia, mucositis, alopecia).",
    nclexPearls: [
      "G1 phase is characterized by preparation for DNA synthesis; S phase is where DNA replication actually occurs.",
      "Mature cardiac myocytes and CNS neurons are locked in G0 and have virtually zero regenerative potential."
    ]
  },

  // Figure 1.16
  "ch1_image16.png": {
    figure: "Figure 1.16",
    title: "S-Phase Semi-Conservative DNA Replication Mechanism",
    para: "During the S phase of interphase, the cell replicates its genetic code via semi-conservative replication. Each original parent strand acts as a template for a new complementary daughter strand, ensuring that each newly formed double helix consists of one conserved parent strand and one newly synthesized daughter strand.",
    overview: "During the S phase of interphase, the cell replicates its genetic code via semi-conservative replication. Each original parent strand acts as a template for a new complementary daughter strand, ensuring that each newly formed double helix consists of one conserved parent strand and one newly synthesized daughter strand.",
    points: [
      "**DNA Helicase:** Unwinds and unzips the parental double helix at origins of replication, creating replication forks.",
      "**Single-Strand Binding Proteins (SSBs):** Prevent separated parental strands from prematurely re-annealing.",
      "**RNA Primase:** Synthesizes short complementary RNA primers required for DNA polymerase to initiate synthesis.",
      "**DNA Polymerase III:** Synthesizes new DNA strands strictly in the 5' to 3' direction with high-fidelity proofreading.",
      "**Leading vs. Lagging Strand:** Leading strand synthesizes continuously toward replication fork; lagging strand synthesizes discontinuously away as Okazaki fragments.",
      "**DNA Ligase:** Catalyzes phosphodiester bonds to join Okazaki fragments into an unbroken continuous strand."
    ],
    theory: "Antimicrobial & Antiviral Targets: Fluoroquinolone antibiotics (e.g., Ciprofloxacin, Levofloxacin) inhibit bacterial DNA gyrase (topoisomerase II), preventing bacterial replication. Antiviral nucleoside analogs (e.g., Acyclovir for HSV, Zidovudine for HIV) act as chain terminators that halt viral DNA polymerase.",
    clinicalRelevance: "Proofreading errors in DNA polymerase cause point mutations and microsatellite instability that drive hereditary cancer syndromes (e.g., Lynch Syndrome).",
    nclexPearls: [
      "DNA replication is semi-conservative: each daughter double helix retains one original parent strand.",
      "Okazaki fragments form specifically on the lagging strand due to strict 5' to 3' synthesis."
    ]
  },

  // Figure 1.17
  "ch1_image17.png": {
    figure: "Figure 1.17",
    title: "Mitotic Stages (Prophase, Metaphase, Anaphase, Telophase) and Cytokinesis",
    para: "Mitosis is the somatic nuclear division process that partitions duplicate chromosomes equally into two identical daughter nuclei. It progresses through four sequential stages: Prophase, Metaphase, Anaphase, and Telophase (PMAT), concluding with Cytokinesis, the physical division of cytoplasm via an actin-myosin contractile ring.",
    overview: "Mitosis is the somatic nuclear division process that partitions duplicate chromosomes equally into two identical daughter nuclei. It progresses through four sequential stages: Prophase, Metaphase, Anaphase, and Telophase (PMAT), concluding with Cytokinesis, the physical division of cytoplasm via an actin-myosin contractile ring.",
    points: [
      "**Prophase:** Chromatin condenses into visible chromosomes (sister chromatids joined at centromeres); nucleolus dissolves; mitotic spindle forms between migrating centrosomes.",
      "**Metaphase:** Microtubule spindle fibers attach to chromosome kinetochores, aligning all 46 chromosomes along the equatorial metaphase plate.",
      "**Anaphase:** Centromeres split simultaneously; sister chromatids are pulled apart as individual daughter chromosomes toward opposite centrosomal poles.",
      "**Telophase:** Chromosomes uncoil back into diffuse chromatin; nuclear envelopes and nucleoli reassemble around both daughter sets.",
      "**Cytokinesis:** An actin-myosin contractile ring pinches the cell membrane inward, carving a cleavage furrow that separates the two identical diploid daughter cells."
    ],
    theory: "Chemotherapy & Mitotic Arrest: The spindle checkpoint in Metaphase ensures all chromatids are properly attached before anaphase begins. Vinca alkaloids (Vincristine) freeze cells in metaphase by disrupting spindle fibers. Because cancer cells cannot pass the spindle checkpoint, they trigger apoptosis.",
    clinicalRelevance: "Mitotic index (percentage of dividing cells under histology) determines tumor grade and aggressive potential in breast and colon cancers.",
    nclexPearls: [
      "Anaphase is the specific stage where centromeres split and sister chromatids separate.",
      "Cytokinesis utilizes an actin-myosin contractile ring to create the cleavage furrow."
    ]
  },

  // Figure 1.18
  "ch1_image18.png": {
    figure: "Figure 1.18",
    title: "Reproductive Cell Division (Meiosis I and Meiosis II Overview)",
    para: "Meiosis is the specialized two-step reproductive cell division occurring solely in the gonads (testes and ovaries) that reduces chromosome number by half to produce haploid gametes (spermatozoa and ova, n = 23). It encompasses Meiosis I (reduction division where homologous chromosomes separate) and Meiosis II (equational division where sister chromatids separate).",
    overview: "Meiosis is the specialized two-step reproductive cell division occurring solely in the gonads (testes and ovaries) that reduces chromosome number by half to produce haploid gametes (spermatozoa and ova, n = 23). It encompasses Meiosis I (reduction division where homologous chromosomes separate) and Meiosis II (equational division where sister chromatids separate).",
    points: [
      "**Meiosis I (Reduction Division):** Diploid primary germ cell (2n = 46) halves its chromosome count, yielding two haploid daughter cells (n = 23, duplicated chromatids).",
      "**Synapsis & Crossing Over (Prophase I):** Homologous maternal and paternal chromosomes pair up into tetrads and physically swap genetic segments at chiasmata, generating vital genetic diversity.",
      "**Independent Assortment (Metaphase I):** Maternal and paternal chromosome pairs align randomly at the spindle equator.",
      "**Meiosis II (Equational Division):** Resembles mitosis in haploid cells; centromeres split to separate sister chromatids into four genetically unique haploid gametes (n = 23).",
      "**Gametogenesis Differences:** Spermatogenesis produces four motile spermatozoa continuously; Oogenesis produces one viable ovum and three non-functional polar bodies."
    ],
    theory: "Chromosomal Aneuploidies & Maternal Age: Failure of homologous pairs (Meiosis I) or sister chromatids (Meiosis II) to separate is called **non-disjunction**. Non-disjunction results in aneuploidy, most commonly Trisomy 21 (Down Syndrome), Trisomy 18 (Edwards), and Monosomy X (Turner Syndrome). The incidence increases dramatically in mothers over age 35 because female oocytes remain arrested in Prophase I from fetal life until ovulation.",
    clinicalRelevance: "Essential for prenatal genetic counseling, maternal serum alpha-fetoprotein screening, and amniocentesis interpretation.",
    nclexPearls: [
      "Meiosis produces four genetically diverse haploid gametes (23 chromosomes each).",
      "Crossing over in Prophase I is the primary mechanism generating genetic variation.",
      "Meiotic non-disjunction is the primary underlying cause of Down Syndrome (Trisomy 21)."
    ]
  },

  // Figure 1.26
  "ch1_image26.png": {
    figure: "Figure 1.19",
    title: "Comparative Stages of Mitosis versus Meiosis",
    para: "This comparative diagram highlights the essential differences between somatic mitosis and germ-line meiosis. While mitosis preserves the diploid chromosome number (2n -> 2n) across single cycles to enable tissue growth and wound repair, meiosis halves the chromosome number across two divisions (2n -> n) with genetic crossing over to produce unique haploid gametes for sexual reproduction.",
    overview: "This comparative diagram highlights the essential differences between somatic mitosis and germ-line meiosis. While mitosis preserves the diploid chromosome number (2n -> 2n) across single cycles to enable tissue growth and wound repair, meiosis halves the chromosome number across two divisions (2n -> n) with genetic crossing over to produce unique haploid gametes for sexual reproduction.",
    points: [
      "**Location:** Mitosis occurs in all somatic body cells; Meiosis is restricted exclusively to gonadal germ cells (testes and ovaries).",
      "**Number of Divisions:** Mitosis consists of one division; Meiosis consists of two successive divisions (Meiosis I and Meiosis II).",
      "**Genetic Recombination:** Absent in mitosis (produces identical clones); Crossing over and synapsis occur in Meiosis I (produces recombinant diversity).",
      "**Daughter Cell Yield:** Mitosis yields 2 identical diploid (2n = 46) cells; Meiosis yields 4 genetically unique haploid (n = 23) gametes.",
      "**Centromere Behavior:** Mitosis splits centromeres in Anaphase; Meiosis keeps centromeres intact during Anaphase I, splitting them only in Anaphase II."
    ],
    theory: "Somatic Mutation vs. Germline Mutation: Mitotic mutations in somatic tissues (e.g., UV radiation causing melanoma) affect only the individual and cannot be passed to offspring. Conversely, meiotic mutations occurring in germ cells during gametogenesis are inherited by all cells of the subsequent generation (e.g., Cystic Fibrosis, Sickle Cell Disease).",
    clinicalRelevance: "Foundational for genetic nursing, hereditary oncology risk stratification, and patient education on hereditary disorders.",
    nclexPearls: [
      "Mitosis yields 2 genetically identical diploid daughter cells for growth and repair.",
      "Meiosis yields 4 genetically unique haploid gametes for reproduction.",
      "Centromeres do not split during Anaphase I of meiosis."
    ]
  },

  // Figure 1.27
  "ch1_image27.png": {
    figure: "Figure 1.20",
    title: "The Four Primary Tissue Types of the Human Body",
    para: "All organs and structures of the adult human body are composed of four fundamental primary tissue types: Epithelial, Connective, Muscular, and Nervous tissue. Each tissue category displays distinctive histological architecture, cellular density, extracellular matrix composition, and physiological specializations.",
    overview: "All organs and structures of the adult human body are composed of four fundamental primary tissue types: Epithelial, Connective, Muscular, and Nervous tissue. Each tissue category displays distinctive histological architecture, cellular density, extracellular matrix composition, and physiological specializations.",
    points: [
      "**Epithelial Tissue:** Avascular sheets of densely packed cells lining surfaces, cavities, and forming glands; specialized for protection, absorption, secretion, and filtration.",
      "**Connective Tissue:** Sparsely distributed cells embedded within an abundant extracellular matrix (fibers and ground substance); supports, binds, and protects organs (bone, cartilage, adipose, blood).",
      "**Muscular Tissue:** Highly cellular, vascular, excitable tissue specialized for active contraction and force generation (Skeletal, Cardiac, Smooth).",
      "**Nervous Tissue:** Electrically excitable neurons that generate action potentials and supportive neuroglia that nourish, insulate, and defend neurons."
    ],
    theory: "Histopathology & Tissue Biopsy: When diagnosing tumors, pathologists classify neoplasms according to their tissue of origin. Epithelial malignancies are termed **carcinomas** (the most common adult cancers, e.g., breast, lung, prostate), connective/muscle malignancies are termed **sarcomas**, nervous tissue tumors are **gliomas**, and blood-forming tissue malignancies are **leukemias** and **lymphomas**.",
    clinicalRelevance: "Wound healing rates directly correlate with tissue type: epithelial tissues heal rapidly via regeneration, while cardiac muscle and nervous tissue heal with non-contractile collagen scar tissue (fibrosis).",
    nclexPearls: [
      "The 4 primary adult tissues are Epithelial, Connective, Muscular, and Nervous.",
      "Epithelial tissue is avascular and relies on underlying connective tissue capillaries for oxygen and nutrients.",
      "Carcinomas originate from epithelial tissue; sarcomas originate from connective or muscular tissue."
    ]
  },

  // Figure 1.28
  "ch1_image28.png": {
    figure: "Figure 1.21",
    title: "Embryonic Germ Layer Origins of Tissues (Ectoderm, Mesoderm, Endoderm)",
    para: "During gastrulation in the third week of embryonic development, the embryonic disc differentiates into three primary germ layers: Ectoderm, Mesoderm, and Endoderm. These foundational embryonic layers give rise to every organ and tissue in the human body through organogenesis.",
    overview: "During gastrulation in the third week of embryonic development, the embryonic disc differentiates into three primary germ layers: Ectoderm, Mesoderm, and Endoderm. These foundational embryonic layers give rise to every organ and tissue in the human body through organogenesis.",
    points: [
      "**Ectoderm (Outer Layer):** Gives rise to the nervous system (brain, spinal cord, nerves), epidermis of skin and its appendages (hair, nails), cornea and lens of eye, and adrenal medulla.",
      "**Mesoderm (Middle Layer):** Gives rise to all muscle tissues (skeletal, cardiac, smooth), all connective tissues (bone, cartilage, blood, adipose), dermis of skin, cardiovascular endothelium, kidneys, gonads, and adrenal cortex.",
      "**Endoderm (Inner Layer):** Gives rise to epithelial linings of the gastrointestinal and respiratory tracts, urinary bladder, urethra, and parenchymal organs (liver, pancreas, thyroid, parathyroids, thymus)."
    ],
    theory: "Teratogens & Vulnerable Periods: Teratogenic insults (alcohol, radiation, rubella, isotretinoin, thalidomide) occurring during the embryonic period (weeks 3 to 8) cause catastrophic multi-system structural defects because major germ layer differentiation and organogenesis occur during this critical window.",
    clinicalRelevance: "Explains congenital anomalies: a single developmental defect in ectodermal migration simultaneously impacts neural development and skin pigmentation (neuroectodermal syndromes like Neurofibromatosis).",
    nclexPearls: [
      "Nervous system and epidermis derive specifically from embryonic ectoderm.",
      "Bones, muscles, blood, and cardiovascular systems derive from mesoderm.",
      "GI and respiratory mucosal linings derive from endoderm."
    ]
  },

  // Figure 1.29
  "ch1_image29.png": {
    figure: "Figure 1.22",
    title: "Classification and Cellular Morphology of Epithelial Tissues",
    para: "Epithelial tissues are systematically classified based on two histological criteria: the number of cell layers (Simple, Stratified, Pseudostratified) and the geometric shape of cells at the apical surface (Squamous, Cuboidal, Columnar, Transitional). This architectural diversity aligns directly with organ function.",
    overview: "Epithelial tissues are systematically classified based on two histological criteria: the number of cell layers (Simple, Stratified, Pseudostratified) and the geometric shape of cells at the apical surface (Squamous, Cuboidal, Columnar, Transitional). This architectural diversity aligns directly with organ function.",
    points: [
      "**Simple Squamous:** Single layer of flat scale-like cells; ideal for rapid diffusion and filtration (lung alveoli, renal glomeruli, vascular endothelium).",
      "**Simple Cuboidal:** Single layer of cube-shaped cells with central round nuclei; specialized for secretion and absorption (kidney tubules, thyroid follicles).",
      "**Simple Columnar:** Single layer of tall rectangular cells with oval basal nuclei; lines stomach to rectum; often displays apical microvilli or cilia and mucus goblet cells.",
      "**Pseudostratified Ciliated Columnar:** Appears multi-layered because nuclei rest at varied levels, but all cells contact basement membrane; lines upper respiratory tract to sweep mucus.",
      "**Stratified Squamous:** Multiple cell layers; apical cells are squamous; protects high-abrasion surfaces (keratinized in skin epidermis, non-keratinized in oral cavity and esophagus).",
      "**Transitional (Urothelium):** Stratified epithelium lining urinary bladder that distends and recoils as volume fluctuates."
    ],
    theory: "Metaplasia in Chronic Irritation: Under chronic noxious irritation, one mature adult epithelial type transforms into another. In chronic cigarette smokers, pseudostratified ciliated columnar respiratory epithelium transforms into stratified squamous epithelium. While more resistant to smoke abrasion, it loses cilia and goblet mucus defense, predisposing to chronic bronchitis and bronchogenic carcinoma.",
    clinicalRelevance: "Pap smears screen for cervical dysplasia by evaluating stratified squamous epithelial cell morphology under microscopy.",
    nclexPearls: [
      "Alveoli and capillaries are lined with simple squamous epithelium for rapid gas diffusion.",
      "Respiratory tract is lined with pseudostratified ciliated columnar epithelium.",
      "Urinary bladder is lined with transitional epithelium (urothelium) that accommodates stretching."
    ]
  },

  // Figure 1.30
  "ch1_image30.png": {
    figure: "Figure 1.23",
    title: "Specialized Unicellular Mucous Gland: Goblet Cell Histology",
    para: "This diagram shows a goblet cell, a specialized unicellular exocrine gland intercalated among the columnar epithelial cells lining the respiratory and gastrointestinal tracts. Shaped like a wine goblet, it features an expanded apical domain packed with mucinogen secretory granules and a compressed basal stem containing the nucleus and endoplasmic reticulum.",
    overview: "This diagram shows a goblet cell, a specialized unicellular exocrine gland intercalated among the columnar epithelial cells lining the respiratory and gastrointestinal tracts. Shaped like a wine goblet, it features an expanded apical domain packed with mucinogen secretory granules and a compressed basal stem containing the nucleus and endoplasmic reticulum.",
    points: [
      "**Mucinogen Granules:** Apical membrane-bound secretory vesicles packed with mucin glycoproteins produced by RER and Golgi.",
      "**Mucus Secretion:** Secreted via exocytosis; upon contacting water, mucin hydrates into viscous slippery **mucus**.",
      "**Basal Stalk:** Contains the nucleus, mitochondria, and rough endoplasmic reticulum compressed into a slender stem.",
      "**Mucociliary Escalator:** In the respiratory tract, goblet cell mucus traps inhaled microbes and dust, which are swept upward toward the pharynx by adjacent cilia.",
      "**Gastrointestinal Protection:** In the stomach and intestines, goblet mucus shields the delicate epithelial lining from harsh hydrochloric acid, digestive enzymes, and mechanical shear stress."
    ],
    theory: "Cystic Fibrosis Pathophysiology: In cystic fibrosis, mutations in the CFTR chloride channel cause goblet cell secretions to become dehydrated, thick, and hyperviscous. The inspissated mucus plugs bronchioles and pancreatic ducts, leading to recurrent pneumonia, bronchiectasis, and malabsorption syndromes requiring aggressive chest physiotherapy and pancreatic enzyme replacement.",
    clinicalRelevance: "Excessive goblet cell hyperplasia and mucus hypersecretion are cardinal histological hallmarks of chronic asthma and COPD.",
    nclexPearls: [
      "Goblet cells are unicellular exocrine glands specialized for mucus production.",
      "In the respiratory tract, goblet cells collaborate with cilia to form the protective mucociliary escalator."
    ]
  },

  // Figure 1.31
  "ch1_image31.png": {
    figure: "Figure 1.24",
    title: "Structural Summary of Simple and Stratified Epithelial Types",
    para: "This comprehensive histology summary plate compares the morphological architectures and primary physiological locations of all major simple (single layer) and stratified (multi-layered) epithelial tissues across the human body.",
    overview: "This comprehensive histology summary plate compares the morphological architectures and primary physiological locations of all major simple (single layer) and stratified (multi-layered) epithelial tissues across the human body.",
    points: [
      "**Simple Epithelia (Single Layer):** Focused primarily on absorption, diffusion, and secretion without high abrasive stress (endothelium, nephron tubules, intestinal lining).",
      "**Stratified Epithelia (Multiple Layers):** Focused primarily on mechanical protection against wear, pathogens, chemical insult, and desiccation.",
      "**Basement Membrane:** Non-cellular protein-collagen lamina that tethers all epithelia to underlying vascular connective tissue, acting as a selective molecular filter.",
      "**Intercellular Junctions:** Tight junctions (zonula occludens) preventing paracellular leakage, desmosomes anchoring cells against mechanical pull, and gap junctions enabling ionic communication."
    ],
    theory: "Basement Membrane Invasion in Oncology: The intact basement membrane defines **carcinoma in situ** (Stage 0). Once malignant epithelial tumor cells secrete matrix metalloproteinases that dissolve the basement membrane, they gain access to underlying lymphatic and vascular networks, marking invasive metastatic cancer.",
    clinicalRelevance: "Loss of epithelial tight junctions in the gastrointestinal tract underlies the pathogenesis of inflammatory bowel disease (Crohn's disease and ulcerative colitis).",
    nclexPearls: [
      "Simple epithelium is specialized for absorption and diffusion; stratified epithelium is specialized for protection.",
      "Carcinoma in situ has not breached the underlying basement membrane."
    ]
  },

  // Figure 1.32
  "ch1_image32.png": {
    figure: "Figure 1.25",
    title: "Microscopic Comparison of Skeletal, Cardiac, and Smooth Muscle Tissues",
    para: "This plate details the comparative histological, structural, and physiological characteristics of the three types of muscular tissue: Skeletal, Cardiac, and Smooth muscle. Muscle tissue is specialized for excitability, contractility, extensibility, and elasticity to generate mechanical force and motility.",
    overview: "This plate details the comparative histological, structural, and physiological characteristics of the three types of muscular tissue: Skeletal, Cardiac, and Smooth muscle. Muscle tissue is specialized for excitability, contractility, extensibility, and elasticity to generate mechanical force and motility.",
    points: [
      "**Skeletal Muscle:** Long cylindrical, striated, unbranched fibers with multiple peripheral nuclei; voluntary control via somatic motor neurons; attached to bones for locomotion.",
      "**Cardiac Muscle:** Branching, striated fibers with single central nuclei; involuntary control via autonomic nerves and intrinsic pacemakers (SA node); features **intercalated discs** containing desmosomes and gap junctions for electrical syncytium.",
      "**Smooth Muscle:** Spindle-shaped (fusiform), non-striated fibers with single central nuclei; involuntary control via autonomic nerves; located in walls of hollow viscera (blood vessels, stomach, intestines, urinary bladder, bronchioles).",
      "**Striation Mechanism:** Skeletal and cardiac muscle possess regular, repeating sarcomeric arrays of actin and myosin; smooth muscle lacks sarcomeres."
    ],
    theory: "Cardiac Ischemia & Intercalated Discs: Intercalated disc gap junctions permit rapid ionic electrical coupling between cardiomyocytes. During myocardial infarction, ischemia causes intracellular acidosis and calcium overload, closing gap junctions to isolate dead tissue. This predisposes to fatal ventricular arrhythmias (V-fib) requiring immediate electrical defibrillation.",
    clinicalRelevance: "Smooth muscle contraction in airways is the target of beta-2 agonists (Albuterol) in acute asthma; vascular smooth muscle is the target of calcium channel blockers (Amlodipine) in hypertension.",
    nclexPearls: [
      "Cardiac muscle is unique for branching striated fibers joined by intercalated discs with gap junctions.",
      "Smooth muscle is non-striated, involuntary, and found in hollow organ and vascular walls.",
      "Skeletal muscle is multinucleated, striated, and under voluntary somatic control."
    ]
  },

  // Figure 1.33
  "ch1_image33.png": {
    figure: "Figure 1.26",
    title: "Exocrine Gland Classification (Merocrine, Apocrine, Holocrine)",
    para: "Exocrine glands are classified by their physiological mechanisms of releasing secretions into ducts. The three primary functional modes are Merocrine (eccrine) secretion via exocytosis, Apocrine secretion via pinching of the apical cell cytoplasm, and Holocrine secretion via total cellular rupture and death.",
    overview: "Exocrine glands are classified by their physiological mechanisms of releasing secretions into ducts. The three primary functional modes are Merocrine (eccrine) secretion via exocytosis, Apocrine secretion via pinching of the apical cell cytoplasm, and Holocrine secretion via total cellular rupture and death.",
    points: [
      "**Merocrine (Eccrine) Glands:** Secretory vesicles release contents by exocytosis with zero cellular damage (e.g., salivary glands, pancreatic acini, standard eccrine thermoregulatory sweat glands).",
      "**Apocrine Glands:** Secretions accumulate at apical cell pole; the apical cytoplasm pinches off with secretion while the cell repairs itself (e.g., mammary glands during lactation, axillary/genital scent glands).",
      "**Holocrine Glands:** Secretions accumulate inside the cell until the entire mature cell ruptures, dies, and is discharged as secretion, replaced by basal mitosis (e.g., sebaceous oil glands of the skin).",
      "**Endocrine Contrast:** Endocrine glands are ductless and discharge hormones straight into capillaries and interstitial fluid."
    ],
    theory: "Dermatological Pathology (Acne Vulgaris): Holocrine sebaceous glands secrete sebum through total cell rupture. During puberty, androgen surges stimulate excessive holocrine sebum production. Desquamated keratinocytes plug follicular orifices (comedones), creating an anaerobic lipid-rich niche for *Cutibacterium acnes* proliferation, causing inflammatory acne pustules.",
    clinicalRelevance: "Merocrine eccrine sweat glands are fundamental to thermoregulation; anticholinergic medications (Atropine) inhibit eccrine sweating, predisposing patients to hyperthermia.",
    nclexPearls: [
      "Merocrine glands secrete via simple exocytosis without loss of cell cytoplasm.",
      "Holocrine glands (sebaceous) discharge by destroying the entire cell.",
      "Apocrine glands pinch off their apical cytoplasm (mammary glands)."
    ]
  },

  // Figure 1.34
  "ch1_image34.png": {
    figure: "Figure 1.27",
    title: "Dorsal and Ventral Body Cavities (Cranial, Vertebral, Thoracic, Abdominopelvic)",
    para: "Body cavities are enclosed anatomical spaces that house, protect, cushion, and support internal organs while permitting expansion and contraction. The body is divided into two primary compartments: the posterior Dorsal Cavity (cranial and spinal spaces lined by meninges) and the anterior Ventral Cavity (thoracic and abdominopelvic spaces lined by serous membranes), separated by the muscular diaphragm.",
    overview: "Body cavities are enclosed anatomical spaces that house, protect, cushion, and support internal organs while permitting expansion and contraction. The body is divided into two primary compartments: the posterior Dorsal Cavity (cranial and spinal spaces lined by meninges) and the anterior Ventral Cavity (thoracic and abdominopelvic spaces lined by serous membranes), separated by the muscular diaphragm.",
    points: [
      "**Cranial Cavity:** Formed by cranial skull bones; protects brain and is continuous with the vertebral canal; lined by three meningeal layers.",
      "**Vertebral (Spinal) Canal:** Formed by stacked vertebral foramina; houses the spinal cord and spinal nerve roots.",
      "**Thoracic Cavity:** Superior ventral cavity subdivided into two lateral **Pleural Cavities** (lungs), central **Mediastinum** (great vessels, trachea, esophagus, thymus), and the **Pericardial Cavity** (heart).",
      "**Diaphragm:** Large dome-shaped skeletal muscle that physically separates the thoracic cavity from the abdominopelvic cavity.",
      "**Abdominopelvic Cavity:** Subdivided into superior **Abdominal Cavity** (stomach, liver, gallbladder, spleen, pancreas, small and large intestines) and inferior **Pelvic Cavity** (urinary bladder, internal reproductive organs, rectum)."
    ],
    theory: "Compartment Pressures in Critical Care: Because cavity walls are rigid or bounded by muscle, fluid or blood accumulation produces life-threatening pressure spikes. In the cranial cavity, cerebral edema causes elevated Intracranial Pressure (ICP) leading to uncal herniation (Cushing's triad). In the thoracic cavity, blood accumulation causes cardiac tamponade or tension pneumothorax. In the abdomen, elevated Intra-Abdominal Pressure (> 20 mmHg) causes Abdominal Compartment Syndrome requiring decompressive laparotomy.",
    clinicalRelevance: "Guides emergency procedures: needle thoracostomy for tension pneumothorax, lumbar puncture at L3-L4 into the vertebral subarachnoid space, and paracentesis in ascites.",
    nclexPearls: [
      "The diaphragm separates the thoracic cavity from the abdominopelvic cavity.",
      "The dorsal cavity contains the cranial cavity and the vertebral canal, lined by meninges.",
      "Cushing's triad (hypertension, bradycardia, irregular respirations) signals fatal intracranial hypertension."
    ]
  },

  // Figure 1.35
  "ch1_image35.png": {
    figure: "Figure 1.28",
    title: "The Nine Abdominal Regions and Four Abdominal Quadrants",
    para: "To enable rapid physical assessment, clinical charting, and localization of visceral pathology, clinicians divide the abdominopelvic area into either Nine Anatomical Regions (using two vertical midclavicular lines, a horizontal subcostal line, and a horizontal transtubercular line) or Four Clinical Quadrants (using vertical and horizontal axes intersecting at the umbilicus).",
    overview: "To enable rapid physical assessment, clinical charting, and localization of visceral pathology, clinicians divide the abdominopelvic area into either Nine Anatomical Regions (using two vertical midclavicular lines, a horizontal subcostal line, and a horizontal transtubercular line) or Four Clinical Quadrants (using vertical and horizontal axes intersecting at the umbilicus).",
    points: [
      "**Right Upper Quadrant (RUQ):** Liver, gallbladder, duodenum, head of pancreas, right adrenal gland, upper pole of right kidney, hepatic flexure of colon.",
      "**Left Upper Quadrant (LUQ):** Stomach, spleen, left lobe of liver, body/tail of pancreas, left adrenal gland, upper pole of left kidney, splenic flexure of colon.",
      "**Right Lower Quadrant (RLQ):** Cecum, vermiform appendix, ascending colon, lower pole of right kidney, right ovary and fallopian tube in females, right spermatic cord.",
      "**Left Lower Quadrant (LLQ):** Sigmoid colon, descending colon, lower pole of left kidney, left ovary and fallopian tube in females, left spermatic cord.",
      "**Nine Anatomical Regions:** Epigastric, Umbilical, Hypogastric (Pubic), Right & Left Hypochondriac, Right & Left Lumbar (Flank), Right & Left Iliac (Inguinal)."
    ],
    theory: "Abdominal Triage & Emergency Assessment: Accurate quadrant localization directs emergency nursing interventions. Acute RLQ pain with rebound tenderness at McBurney's point indicates acute appendicitis. RUQ colicky pain with positive Murphy's sign indicates acute cholecystitis. LLQ pain with fever in elderly patients indicates acute diverticulitis. Epigastric pain radiating to the back indicates acute pancreatitis.",
    clinicalRelevance: "Standardized quadrants are essential for systematic 4-quadrant auscultation of bowel sounds (normoactive: 5-30/min) and percussion.",
    nclexPearls: [
      "Appendicitis pain localizes specifically to the Right Lower Quadrant (RLQ) at McBurney's point.",
      "Gallbladder (cholecystitis) and liver pathologies localize to the Right Upper Quadrant (RUQ).",
      "Sigmoid colon diverticulitis localizes to the Left Lower Quadrant (LLQ)."
    ]
  },

  // Figure 1.36
  "ch1_image36.png": {
    figure: "Figure 1.29",
    title: "Double-Layered Serous Membrane Structure (Parietal and Visceral Layers)",
    para: "Serous membranes (serosa) are thin, double-layered slippery membranes lining the walls and viscera of the closed ventral body cavities. Envisioned like a fist pushed into an under-inflated balloon, the membrane folds back onto itself to create an outer Parietal Layer lining cavity walls and an inner Visceral Layer adhering to organ surfaces, separated by a thin serous cavity containing lubricating serous fluid.",
    overview: "Serous membranes (serosa) are thin, double-layered slippery membranes lining the walls and viscera of the closed ventral body cavities. Envisioned like a fist pushed into an under-inflated balloon, the membrane folds back onto itself to create an outer Parietal Layer lining cavity walls and an inner Visceral Layer adhering to organ surfaces, separated by a thin serous cavity containing lubricating serous fluid.",
    points: [
      "**Parietal Layer:** Outer serous layer that lines internal body cavity walls; innervated by somatic nerves (sharp, highly localized pain sensation).",
      "**Visceral Layer:** Inner serous layer adhering directly to organ surfaces; innervated by autonomic nerves (dull, poorly localized ache).",
      "**Serous Cavity:** Potential space between parietal and visceral sheets containing 15-50 mL of clear, lubricating serous fluid secreted by mesothelial cells.",
      "**Three Body Serosae:** **Pleura** (surrounding lungs), **Pericardium** (surrounding heart), and **Peritoneum** (surrounding abdominal viscera).",
      "**Frictional Prevention:** Enables heart to beat, lungs to inflate, and intestines to peristalsis without frictional heating or tissue erosion."
    ],
    theory: "Pleuritis, Pericarditis, & Effusions: When serous membranes become inflamed (pleuritis, pericarditis), mesothelial cells swell and lose lubricating capacity, producing an audible scratchy **friction rub** on auscultation. In severe pathology, excessive fluid accumulates in the serous cavity (pleural effusion, pericardial effusion, peritoneal ascites), compressing underlying organs and necessitating therapeutic thoracentesis, pericardiocentesis, or paracentesis.",
    clinicalRelevance: "Differentiating parietal pain (sharp, pinpoint) from visceral pain (diffuse, nauseating) is crucial during acute peritonitis assessments.",
    nclexPearls: [
      "Parietal layer lines cavity walls; Visceral layer adheres directly to organ surfaces.",
      "Inflamed serous membranes produce an audible friction rub on bedside stethoscope auscultation.",
      "The potential space between visceral and parietal layers contains lubricating serous fluid."
    ]
  },

  // Figure 1.37
  "ch1_image37.png": {
    figure: "Figure 1.30 (a)",
    title: "Overview of the 11 Organ Systems of the Human Body (Part 1)",
    para: "This systemic plate illustrates the first six integrated organ systems of the human body: Integumentary, Skeletal, Muscular, Nervous, Endocrine, and Cardiovascular systems. Each system operates interdependently to execute specialized physiological processes while maintaining organismal homeostasis.",
    overview: "This systemic plate illustrates the first six integrated organ systems of the human body: Integumentary, Skeletal, Muscular, Nervous, Endocrine, and Cardiovascular systems. Each system operates interdependently to execute specialized physiological processes while maintaining organismal homeostasis.",
    points: [
      "**1. Integumentary System:** Skin, hair, nails, cutaneous glands; protects against environmental insult, synthesizes vitamin D, regulates temperature.",
      "**2. Skeletal System:** 206 bones, joints, cartilages; provides structural scaffolding, protects delicate viscera, stores minerals (Ca2+), houses hematopoietic bone marrow.",
      "**3. Muscular System:** 600+ skeletal muscles; powers voluntary locomotion, maintains posture, generates metabolic heat.",
      "**4. Nervous System:** Brain, spinal cord, nerves, sensory receptors; rapid regulatory system generating electrical impulses to coordinate response to stimuli.",
      "**5. Endocrine System:** Pituitary, thyroid, adrenals, pancreas, gonads; slow regulatory system releasing chemical hormones into bloodstream.",
      "**6. Cardiovascular System:** Heart, blood vessels, blood; pumps and transports oxygen, nutrients, carbon dioxide, wastes, and hormones throughout tissues."
    ],
    theory: "Multisystem Integration in Shock: In circulatory shock, hypotension triggers sympathetic nervous system firing (tachycardia, vasoconstriction), endocrine activation of the renin-angiotensin-aldosterone axis to retain water, and skin vasoconstriction producing cold, clammy integumentary signs. Failure of multiple systems leads to Multiple Organ Dysfunction Syndrome (MODS).",
    clinicalRelevance: "Foundational for full head-to-toe physical nursing assessments and prioritization in emergency triage.",
    nclexPearls: [
      "Nervous system provides rapid electro-chemical signaling; Endocrine system provides sustained chemical hormonal control.",
      "Bone marrow in the skeletal system is the sole site of hematopoiesis in adults."
    ]
  },

  // Figure 1.38
  "ch1_image38.png": {
    figure: "Figure 1.30 (b)",
    title: "Overview of the 11 Organ Systems of the Human Body (Part 2)",
    para: "This systemic plate illustrates the remaining five organ systems completing the human organism: Lymphatic/Immune, Respiratory, Digestive, Urinary, and Reproductive systems. Together, they manage fluid balance, immune defense, gas exchange, nutrient absorption, waste excretion, and species continuation.",
    overview: "This systemic plate illustrates the remaining five organ systems completing the human organism: Lymphatic/Immune, Respiratory, Digestive, Urinary, and Reproductive systems. Together, they manage fluid balance, immune defense, gas exchange, nutrient absorption, waste excretion, and species continuation.",
    points: [
      "**7. Lymphatic & Immune System:** Lymph nodes, vessels, spleen, thymus, tonsils; returns leaked interstitial fluid to blood, absorbs dietary lipids, mounts adaptive immune responses.",
      "**8. Respiratory System:** Nasal cavity, pharynx, larynx, trachea, bronchi, lungs; supplies oxygen to blood, eliminates carbon dioxide, regulates acid-base pH.",
      "**9. Digestive System:** Oral cavity, esophagus, stomach, intestines, liver, pancreas; mechanical and chemical food breakdown, nutrient absorption, solid waste elimination.",
      "**10. Urinary System:** Kidneys, ureters, urinary bladder, urethra; eliminates nitrogenous metabolic wastes (urea), regulates blood volume, pressure, electrolytes, and acid-base balance.",
      "**11. Reproductive System:** Gonads (testes/ovaries), reproductive tracts, external genitalia; produces haploid gametes (sperm/oocytes) and sex hormones to propagate species."
    ],
    theory: "Fluid and Acid-Base Homeostasis: The Respiratory and Urinary systems act as dynamic partners to regulate arterial blood pH (7.35 - 7.45). The respiratory system responds in minutes by blowing off CO2 (acid), while the kidneys respond over hours to days by reclaiming or excreting bicarbonate (HCO3-) and hydrogen ions (H+).",
    clinicalRelevance: "Essential for interpreting Arterial Blood Gases (ABGs) and calculating intake/output fluid balance in acute renal or respiratory failure.",
    nclexPearls: [
      "Lungs control carbon dioxide (acid) excretion within minutes; kidneys control bicarbonate retention over days.",
      "Lymphatic system returns excess interstitial fluid to the subclavian veins to prevent edema."
    ]
  }
};

/**
 * Returns complete explanation object for any image in the curriculum
 */
export const getDiagramExplanation = (img, section, chapter) => {
  if (!img) return null;

  // 1. Direct match by filename
  const filename = img.src ? img.src.split("/").pop() : "";
  if (filename && DIAGRAM_EXPLANATIONS[filename]) {
    return DIAGRAM_EXPLANATIONS[filename];
  }

  // 2. Intelligent clinical synthesis engine for all other plates
  const caption = img.caption || img.alt || "Anatomical Plate";
  const secTitle = section?.title || "Clinical Anatomy";
  const chapTitle = chapter?.title || "Anatomy & Physiology";

  return {
    figure: caption.includes("Figure") ? caption.split(":")[0] : "Anatomical Plate",
    title: caption.replace(/^Figure\s*[\d.]+:\s*/i, ""),
    para: `This detailed medical illustration depicts the anatomical morphology, spatial organization, and structural landmarks of **${caption}** within **${secTitle}** (${chapTitle}). It provides an evidence-based visual reference designed to reinforce theoretical learning with clinical bedside practice.`,
    overview: `This detailed medical illustration depicts the anatomical morphology, spatial organization, and structural landmarks of **${caption}** within **${secTitle}** (${chapTitle}). It provides an evidence-based visual reference designed to reinforce theoretical learning with clinical bedside practice.`,
    points: [
      `Displays precise spatial architecture and structural boundaries relevant to **${secTitle}**.`,
      `Highlights anatomical landmarks required for nursing physical assessments, palpation, and surgical margin verification.`,
      `Correlates microscopic or gross morphology directly with organ system physiology and pathology.`
    ],
    highlights: [
      `Displays precise spatial architecture and structural boundaries relevant to **${secTitle}**.`,
      `Highlights anatomical landmarks required for nursing physical assessments, palpation, and surgical margin verification.`,
      `Correlates microscopic or gross morphology directly with organ system physiology and pathology.`
    ],
    theory: `In clinical nursing practice, visual identification of **${caption}** is essential for recognizing anatomical abnormalities, conducting head-to-toe assessments, charting findings accurately, and communicating with interdisciplinary surgical and medical teams.`,
    clinicalRelevance: `In clinical nursing practice, visual identification of **${caption}** is essential for recognizing anatomical abnormalities, conducting head-to-toe assessments, charting findings accurately, and communicating with interdisciplinary surgical and medical teams.`,
    nclexPearls: [
      `Always correlate labeled structures with their blood supply, nerve innervation, and lymphatic drainage.`,
      `Questions frequently test anatomical relationships to adjacent organs and potential complications of clinical procedures.`
    ]
  };
};
