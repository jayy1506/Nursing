// Complete Applied Physiology Textbook Content with Functional Diagrams, Tables & Questions

export const PHYSIOLOGY_CHAPTERS = {
  "phys-unit-1": {
    "id": "phys-unit-1",
    "unitNumber": 1,
    "title": "General Physiology & Cell Function",
    "category": "Cellular Physiology & Transport",
    "icon": "🧬",
    "color": "from-emerald-500 to-teal-600",
    "teachingHours": "60 Hours INC Curriculum (Theory 18h + Practical 42h)",
    "summary": "Detailed functional mechanisms, regulation, homeostatic balance, clinical alterations and official INC competencies of General Physiology & Cell Function.",
    "objectives": [
      "Describe the physiology of cell, tissues, membranes, glands and alteration in diseases of cell.",
      "Define Cell and explain the functions of Cell Membrane.",
      "Discuss the functions of Cytoplasm, Organelles andNucleus.",
      "Discuss about formation and repair of Tissue.",
      "Explain thefunctions of different types of Tissues.",
      "Describe functions of Membranes and Glands",
      "List down alteration in diseases of Cell.",
      "All living organisms are made of cells and cell products. Cells are the smallest living subunits of a multicellular organism such as a human being. Human cells vary in size, shape, and function."
    ],
    "totalImages": 3,
    "sections": [
      {
        "id": "sec-phys-1-1",
        "title": "Cell Membrane Physiology, Composition & Transport Dynamics",
        "content": [
          "All living human organisms are formed of cells and cellular products. The cell is the fundamental living structural, physiological, and genetic unit of multicellular life. The cell is encapsulated by the **cell membrane (plasma membrane / plasmalemma)**, a dynamic, selectively permeable lipid-protein sheath separating the intracellular fluid (ICF) from the extracellular fluid (ECF).",
          "Biochemically, the plasma membrane consists of three primary macromolecular constituents: **Proteins (55%)**, **Lipids (40%)** (phospholipids and cholesterol), and **Carbohydrates (5%)** arranged as a protective, recognizing glycocalyx.",
          "The cell membrane fulfills six indispensable homeostatic functions: (1) **Protective function** (shielding cytoplasmic organelles), (2) **Selective permeability** (acting as a semipermeable filter allowing nutrient influx and metabolite efflux), (3) **Absorptive function** (endocytosis and pinocytosis), (4) **Excretory function** (exocytosis of cellular wastes), (5) **Gas exchange** (O2 influx and CO2 efflux down partial pressure gradients), and (6) **Maintenance of cellular shape and volume**."
        ],
        "points": [
          "**Selective Permeability:** Lipophilic nonpolar molecules (O2, CO2, steroid hormones) diffuse freely through the lipid bilayer; hydrophilic ions and polar solutes require specialized transmembrane protein channels or carrier pumps.",
          "**Membrane Proteins:** Integral proteins act as ion channels, selective transporters, and cell-surface receptors; peripheral proteins serve as enzymatic regulators and cytoskeletal anchors.",
          "**ICF vs. ECF Composition:** Intracellular fluid is rich in potassium (K+), magnesium (Mg2+), phosphates, and proteins; Extracellular fluid is rich in sodium (Na+), chloride (Cl-), and bicarbonate (HCO3-).",
          "**Active vs. Passive Transport:** Passive transport (simple diffusion, facilitated diffusion, osmosis) requires no metabolic energy, moving down electrochemical gradients; Primary active transport (Na+/K+-ATPase pump) hydrolyzes ATP directly to transport ions against steep gradients.",
          "**Sodium-Potassium Pump (Na+/K+-ATPase):** Extrudes 3 Na+ ions out of the cell while importing 2 K+ ions for every ATP hydrolyzed; maintains cell volume and establishes the negative resting membrane potential."
        ],
        "clinicalPearl": "**Cell Membrane Disruption in Ischemia & Osmotic Swelling:** Oxygen deprivation (hypoxia/ischemia) terminates oxidative ATP synthesis, halting the Na+/K+-ATPase pump. Intracellular sodium and chloride accumulate, drawing water into the cell by osmosis and producing acute **hydropic cellular swelling**. If ATP is not restored rapidly, irreversible plasma membrane rupture causes necrotic cell death.",
        "images": [
          {
            "src": "/images/physiology/1_image1.png",
            "caption": "Figure 1.1: Structure of the cell membrane and lipid bilayer.",
            "alt": "Structure of the cell membrane"
          }
        ],
        "tables": []
      },
      {
        "id": "sec-phys-1-2",
        "title": "Cytoplasm & Metabolic Functions of Cellular Organelles",
        "content": [
          "The cytoplasm is a gel-like aqueous matrix containing 80% water, dissolved electrolytes, glucose, amino acids, and lipids known as the **cytosol**, in which discrete metabolic machines called **organelles** execute specialized biochemical work.",
          "The nucleus is the master genetic control center, transcribing messenger RNA (mRNA) and directing cellular protein synthesis, ribosomal assembly, and mitotic division.",
          "The endoplasmic reticulum and Golgi complex form an integrated biosynthetic pipeline: the **Rough Endoplasmic Reticulum (RER)** synthesizes secretory proteins and degrades worn-out organelles, while the **Smooth Endoplasmic Reticulum (SER)** synthesizes phospholipids, steroids, metabolizes carbohydrates, detoxifies toxic compounds, and sequesters calcium.",
          "The **Golgi apparatus** receives newly synthesized polypeptides, modifying, glycosylating, sorting, and packaging them into secretory granules or lysosomes. **Mitochondria** perform cellular respiration, generating 95% of cellular ATP via oxidative phosphorylation and initiating intrinsic apoptosis.",
          "**Lysosomes** are acidic hydrolytic vesicles (containing acid hydrolases) that digest endocytosed pathogens and worn-out organelles (autophagy)."
        ],
        "points": [
          "**Rough Endoplasmic Reticulum:** Studded with ribosomes; synthesizes membrane, lysosomal, and export proteins; quality checks protein folding.",
          "**Smooth Endoplasmic Reticulum:** Synthesizes lipids and steroid hormones; in hepatocytes, detoxifies alcohol and drugs via cytochrome P450; in myocytes, acts as sarcoplasmic reticulum storing Ca2+.",
          "**Golgi Complex:** Cisternae with cis (entry) and trans (exit) faces; sorts and directs vesicles to lysosomes, plasma membrane, or secretory exocytosis.",
          "**Mitochondria (\"Powerhouses of the Cell\"):** Double-membrane organelles containing mtDNA; execute the Krebs citric acid cycle and electron transport chain, generating ATP.",
          "**Peroxisomes:** Contain oxidases that neutralize harmful hydrogen peroxide (H2O2) and catalase that degrades it into water and oxygen; oxidize long-chain fatty acids.",
          "**Centrosome & Centrioles:** Organize the mitotic spindle apparatus to pull sister chromatids during cell division."
        ],
        "clinicalPearl": "**Lysosomal Storage Diseases & Mitochondrial Cytopathies:** Inherited deficiency of a single lysosomal enzyme results in progressive accumulation of undigested macromolecules (e.g., gangliosides in Tay-Sachs disease, glucocerebrosides in Gaucher disease), causing severe organomegaly and neurodegeneration. Mitochondrial DNA mutations impair high-energy organs (brain, myocardium, skeletal muscle), causing lactic acidosis and exercise intolerance.",
        "images": [],
        "tables": [
          [
            [
              "Organelles",
              "Functions"
            ],
            [
              "Rough endoplasmic reticulum",
              "Synthesis of proteins; Degradation of worn-out organelles"
            ],
            [
              "Smooth endoplasmic reticulum",
              "Synthesis of lipids and steroids; Role in cellular metabolism; Storage and metabolism of calcium; Detoxification of toxic substances"
            ],
            [
              "Golgi apparatus",
              "Processing, packaging, labeling and delivery of proteins and lipids"
            ],
            [
              "Lysosomes",
              "Degradation of macromolecules; Degradation of worn-out organelles; Removal of excess secretory products; Release of perforin, granzymes, melanin, and serotonin"
            ],
            [
              "Peroxisomes",
              "Breakdown of excess fatty acids; Detoxification of hydrogen peroxide and metabolic products; Role in bile acid and myelin formation"
            ],
            [
              "Centrosome",
              "Movement of chromosomes during cell division"
            ],
            [
              "Mitochondria",
              "Production of energy; Synthesis of ATP (Adenosine triphosphate); Initiation of apoptosis"
            ],
            [
              "Ribosomes",
              "Synthesis of proteins"
            ],
            [
              "Cytoskeleton",
              "Determination of shape of the cell; Stability of cell architecture; Cellular movements"
            ],
            [
              "Nucleus",
              "Control of all cell activities; Synthesis of RNA; Genetic instructions for protein synthesis; Control of cell division; Storage of hereditary DNA"
            ]
          ]
        ]
      },
      {
        "id": "sec-phys-1-3",
        "title": "Tissue Formation, Repair, Membranes & Glandular Secretion",
        "content": [
          "A **tissue** is an organized cooperative group of morphologically similar cells specialized for common physiological tasks. The four primary tissue types are **Epithelial** (covering, protection, absorption, secretion), **Connective** (binding, support, immune transport), **Muscular** (force generation and contraction), and **Nervous** (electrical impulse propagation and coordination).",
          "**Tissue repair** is the biological replacement of worn-out, injured, or necrotic cells. Parenchymal regeneration restores identical tissue architecture, while stromal replacement deposits fibrous collagen scar tissue (fibrosis).",
          "**Membranes** are pliable flat sheets of tissue covering or lining body compartments: **Mucous membranes** (line cavities opening to exterior, trapping microbes), **Serous membranes** (line closed ventral cavities, secreting lubricating serous fluid), **Cutaneous membrane** (skin), and **Synovial membranes** (line movable joint cavities).",
          "**Glands** are specialized secretory structures: **Exocrine glands** discharge secretions into ducts (salivary, sweat, sebaceous), functioning via **merocrine** (exocytosis without cellular loss), **apocrine** (apical cytoplasm pinching off, e.g., mammary glands), or **holocrine** (entire cell disintegration, e.g., sebaceous glands) modes."
        ],
        "points": [
          "**Epithelial Tissue Functions:** Physical barrier against mechanical trauma; selective chemical absorption in intestine; filtration in renal glomeruli; secretion of mucus and enzymes.",
          "**Connective Tissue Functions:** Connects bones and muscles (tendons, ligaments); provides structural framework (bone, cartilage); transports nutrients and oxygen (blood).",
          "**Muscular Tissue Properties:** Excitability, contractility, extensibility, and elasticity; comprises skeletal (voluntary, striated), cardiac (involuntary, branching), and smooth (involuntary, visceral).",
          "**Nervous Tissue Physiology:** Comprises excitable neurons (dendrites, soma, axon) transmitting electrical action potentials and neuroglia supporting and insulating axons.",
          "**Modes of Glandular Secretion:** Merocrine / Eccrine (vesicle exocytosis; salivary and eccrine sweat glands); Apocrine (apical cytoplasm pinching; mammary glands); Holocrine (cell rupture discharging sebum; sebaceous glands)."
        ],
        "clinicalPearl": "**Wound Healing Phases & Scars in Nursing:** Tissue repair occurs in three overlapping phases: (1) Inflammatory phase (hemostasis and leukocyte influx), (2) Proliferative phase (granulation tissue, angiogenesis, and collagen deposition by fibroblasts), and (3) Maturation/Remodeling phase (collagen cross-linking). Epithelial tissues regenerate completely, whereas cardiac myocytes and central neurons cannot divide, healing permanently by non-contractile collagen fibrosis.",
        "images": [
          {
            "src": "/images/physiology/1_image2.png",
            "caption": "Figure 1.2: Modes of glandular secretion (Merocrine, Apocrine, Holocrine).",
            "alt": "Modes of glandular secretion"
          },
          {
            "src": "/images/physiology/1_image3.png",
            "caption": "Figure 1.3: Sebaceous gland structure.",
            "alt": "Sebaceous gland structure"
          }
        ],
        "tables": []
      },
      {
        "id": "sec-phys-1-4",
        "title": "Cellular Adaptations & Alterations in Disease",
        "content": [
          "Cells constantly adjust their structure and physiological activity in response to changing physiological demands and pathological stresses, exhibiting **cellular adaptations**.",
          "When environmental stresses exceed adaptive limits or persist unabated, **cellular injury** ensues. Reversible injury manifests as cellular swelling and fatty change; irreversible injury culminates in cell death via **necrosis** (uncontrolled pathological cell lysis with inflammation) or **apoptosis** (programmed, energy-dependent cell suicide without inflammation).",
          "Pathological cellular adaptations include: **Hypertrophy** (increase in cell size without cell division), **Atrophy** (shrinkage in cell size and functional capacity), **Hyperplasia** (increase in cell number through active mitosis), **Metaplasia** (reversible phenotypic transformation of one adult cell type into another), and **Dysplasia** (disordered, atypical cellular proliferation predisposing to malignancy)."
        ],
        "points": [
          "**Hypertrophy:** Common in non-dividing tissues; physiological (skeletal muscle in weightlifters, gravid uterus) or pathological (left ventricular concentric hypertrophy in systemic hypertension).",
          "**Atrophy:** Results from disuse, denervation, ischemia, malnutrition, or endocrine withdrawal (e.g., skeletal muscle wasting in bedridden patients, senile brain atrophy).",
          "**Hyperplasia:** Occurs in mitotically active tissues; physiological (breast ductal proliferation during lactation, partial hepatectomy liver regeneration) or pathological (benign prostatic hyperplasia / BPH, endometrial hyperplasia).",
          "**Metaplasia:** Adaptive substitution; chronic cigarette smoke causes bronchial ciliated pseudostratified columnar epithelium to transform into durable stratified squamous epithelium, losing ciliary clearance.",
          "**Apoptosis vs. Necrosis:** Apoptosis is programmed, ATP-dependent, characterized by chromatin condensation and apoptotic bodies phagocytosed cleanly; Necrosis is pathological, ATP-depleted, characterized by cellular swelling, membrane rupture, and intense surrounding inflammation."
        ],
        "clinicalPearl": "**Cervical Dysplasia & Metaplasia Surveillance:** In patients with gastroesophageal reflux disease (GERD), chronic gastric acid exposure induces columnar metaplasia of the lower esophageal squamous epithelium (**Barrett's esophagus**), markedly increasing the risk of esophageal adenocarcinoma. Pap smear screening samples the cervical transformation zone to detect early dysplastic changes caused by HPV before invasive cervical carcinoma develops.",
        "images": [],
        "tables": []
      }
    ],
    "mcqs": [
      {
        "id": "phys-mcq-1-1",
        "question": "The transfer of information from the motor nerve ending to the muscle fiber occurs through the neuromuscular junction",
        "correctAnswer": "Neuromuscular transmission",
        "subtopic": "24.8-VIII.Musculoskeletal system"
      },
      {
        "id": "phys-mcq-1-2",
        "question": "The neurons which carry impulses from the central nervous system to the peripheral efferent are called",
        "correctAnswer": "Motor neurons",
        "subtopic": "24.11-XI.Nervous system"
      },
      {
        "id": "phys-mcq-1-3",
        "question": "The nerve cell body, otherwise called the",
        "correctAnswer": "Soma",
        "subtopic": "24.11-XI.Nervous system"
      },
      {
        "id": "phys-mcq-1-4",
        "question": "The system that controls all the activities of the body is the",
        "correctAnswer": "Nervous system",
        "subtopic": "24.11-XI.Nervous system"
      },
      {
        "id": "phys-mcq-1-5",
        "question": "The tract concerned with optic and auditory reflexes is the",
        "correctAnswer": "Tectospinal tract",
        "subtopic": "24.11-XI.Nervous system"
      },
      {
        "id": "phys-mcq-1-6",
        "question": "Which of the following plays an important role in the healing processes?",
        "correctAnswer": "Vitamin C",
        "subtopic": "24.5-V. Blood"
      },
      {
        "id": "phys-mcq-1-7",
        "question": "The destruction of formed elements is called",
        "correctAnswer": "Hemolysis",
        "subtopic": "24.5-V. Blood"
      },
      {
        "id": "phys-mcq-1-8",
        "question": "The inherited disorder characterized by abnormal hemoglobin is",
        "correctAnswer": "Sickle cell anemia",
        "subtopic": "24.5-V. Blood"
      },
      {
        "id": "phys-mcq-1-9",
        "question": "The abnormal increase in blood volume is called",
        "correctAnswer": "Polycythemia",
        "subtopic": "24.5-V. Blood"
      },
      {
        "id": "phys-mcq-1-10",
        "question": "The disease of the arteries associated with hardening, thickening, and loss of elasticity in the vessel wall is called",
        "correctAnswer": "Arteriosclerosis",
        "subtopic": "24.5-V. Blood"
      },
      {
        "id": "phys-mcq-1-11",
        "question": "Closure of atrioventricular valves at the beginning of the isometric contraction phase produces",
        "correctAnswer": "Lub sound.",
        "subtopic": "24.4-IV. Circulatory and Lymphatic system"
      },
      {
        "id": "phys-mcq-1-12",
        "question": "Closure of semilunar valves during the protodiastole phase produces",
        "correctAnswer": "Second heart sound",
        "subtopic": "24.5-V. Blood"
      },
      {
        "id": "phys-mcq-1-13",
        "question": "The total surface area of the alveoli in contact with capillaries is",
        "correctAnswer": "70 square meters",
        "subtopic": "24.2-II.The Respiratory system"
      },
      {
        "id": "phys-mcq-1-14",
        "question": "What produces carbon dioxide?",
        "correctAnswer": "Respiration",
        "subtopic": "24.2-II.The Respiratory system"
      },
      {
        "id": "phys-mcq-1-15",
        "question": "In which of the following conditions is the respiration rate fast?",
        "correctAnswer": "Exercising",
        "subtopic": "24.2-II.The Respiratory system"
      },
      {
        "id": "phys-mcq-1-16",
        "question": "A patient came to the medicine OPD with complaints of a collection of pus in the lungs, which is called",
        "correctAnswer": "Lung abscess",
        "subtopic": "24.2-II.The Respiratory system"
      },
      {
        "id": "phys-mcq-1-17",
        "question": "The term for the exchange of gases between the environment and the lungs is called",
        "correctAnswer": "Respiration",
        "subtopic": "24.2-II.The Respiratory system"
      },
      {
        "id": "phys-mcq-1-18",
        "question": "The transfer of gases from alveoli to the blood by diffusion across the respiratory membrane is",
        "correctAnswer": "External respiration",
        "subtopic": "24.2-II.The Respiratory system"
      },
      {
        "id": "phys-mcq-1-19",
        "question": "The cause for the descent of the diaphragm is",
        "correctAnswer": "Inhalation",
        "subtopic": "24.2-II.The Respiratory system"
      },
      {
        "id": "phys-mcq-1-20",
        "question": "The term for the air breathed out from the lungs is called",
        "correctAnswer": "Expiration",
        "subtopic": "24.2-II.The Respiratory system"
      },
      {
        "id": "phys-mcq-1-21",
        "question": "Bronchi is the end part of the microscopic tubes called",
        "correctAnswer": "Bronchioles",
        "subtopic": "24.2-II.The Respiratory system"
      },
      {
        "id": "phys-mcq-1-22",
        "question": "The fundamental unit of lung tissue is",
        "correctAnswer": "Alveolus",
        "subtopic": "24.2-II.The Respiratory system"
      },
      {
        "id": "phys-mcq-1-23",
        "question": "Rapid and shallow breathing is called",
        "correctAnswer": "Tachypnea",
        "subtopic": "24.2-II.The Respiratory system"
      },
      {
        "id": "phys-mcq-1-24",
        "question": "Difficulty in breathing is called",
        "correctAnswer": "Dyspnea",
        "subtopic": "24.2-II.The Respiratory system"
      },
      {
        "id": "phys-mcq-1-25",
        "question": "Inflammation of the nasal mucosa is called",
        "correctAnswer": "Rhinitis",
        "subtopic": "24.2-II.The Respiratory system"
      },
      {
        "id": "phys-mcq-1-26",
        "question": "Inflammation occurring in one of the paranasal sinuses is called",
        "correctAnswer": "Sinusitis",
        "subtopic": "24.2-II.The Respiratory system"
      },
      {
        "id": "phys-mcq-1-27",
        "question": "Inflammation in the tonsils is called",
        "correctAnswer": "Tonsilitis",
        "subtopic": "24.2-II.The Respiratory system"
      },
      {
        "id": "phys-mcq-1-28",
        "question": "Inflammation in one or more lobes of a lung is called",
        "correctAnswer": "Pneumonia",
        "subtopic": "24.2-II.The Respiratory system"
      },
      {
        "id": "phys-mcq-1-29",
        "question": "The meaning of Asphyxia is",
        "correctAnswer": "State of suffocation",
        "subtopic": "24.2-II.The Respiratory system"
      },
      {
        "id": "phys-mcq-1-30",
        "question": "Clinical manifestation of cyanosis occurs when the reduced hemoglobin is about",
        "correctAnswer": "5 gm%",
        "subtopic": "24.2-II.The Respiratory system"
      },
      {
        "id": "phys-mcq-1-31",
        "question": "The salivary secretions contain",
        "correctAnswer": "Digestive enzymes",
        "subtopic": "24.3-III. The digestive system"
      },
      {
        "id": "phys-mcq-1-32",
        "question": "The majority of fatty acids enter the outer membrane of the mitochondria",
        "correctAnswer": "Transferase facilitated entry of carnitine bound fatty acids",
        "subtopic": "24.3-III. The digestive system"
      },
      {
        "id": "phys-mcq-1-33",
        "question": "Dietary sources of energy contain the most energy per gram (kcal/g)",
        "correctAnswer": "Fats",
        "subtopic": "24.3-III. The digestive system"
      },
      {
        "id": "phys-mcq-1-34",
        "question": "Accessory digestive organs include",
        "correctAnswer": "Liver, gallbladder, and pancreas",
        "subtopic": "24.3-III. The digestive system"
      },
      {
        "id": "phys-mcq-1-35",
        "question": "What does \"chyme\" mean?",
        "correctAnswer": "The mixture of food and gastric juices in the stomach",
        "subtopic": "24.3-III. The digestive system"
      },
      {
        "id": "phys-mcq-1-36",
        "question": "Amount of gas formation in the large intestines per day is",
        "correctAnswer": "1-2 liters",
        "subtopic": "24.3-III. The digestive system"
      },
      {
        "id": "phys-mcq-1-37",
        "question": "Which salivary gland contributes the most to salivary secretion?",
        "correctAnswer": "Submandibular gland",
        "subtopic": "24.3-III. The digestive system"
      },
      {
        "id": "phys-mcq-1-38",
        "question": "The meaning of dysphagia is",
        "correctAnswer": "Difficulty in swallowing",
        "subtopic": "24.3-III. The digestive system"
      },
      {
        "id": "phys-mcq-1-39",
        "question": "What is bile?",
        "correctAnswer": "A digestive fluid produced by the liver",
        "subtopic": "24.3-III. The digestive system"
      },
      {
        "id": "phys-mcq-1-40",
        "question": "The term \"borborygmi\" refers to",
        "correctAnswer": "Abdominal rumbling or gurgling noises",
        "subtopic": "24.3-III. The digestive system"
      },
      {
        "id": "phys-mcq-1-41",
        "question": "The term \"deglutition\" refers to",
        "correctAnswer": "Swallowing the food",
        "subtopic": "24.3-III. The digestive system"
      },
      {
        "id": "phys-mcq-1-42",
        "question": "How is excess sugar in the body stored in muscle and liver?",
        "correctAnswer": "Glycogen",
        "subtopic": "24.3-III. The digestive system"
      },
      {
        "id": "phys-mcq-1-43",
        "question": "The gastric acid secretion during the intestinal phase of digestion",
        "correctAnswer": "Decreases",
        "subtopic": "24.3-III. The digestive system"
      },
      {
        "id": "phys-mcq-1-44",
        "question": "What percentage of the liver can be removed without producing ill effects on the body?",
        "correctAnswer": "0.5",
        "subtopic": "24.3-III. The digestive system"
      },
      {
        "id": "phys-mcq-1-45",
        "question": "After the processing of food in the stomach, where does it move into?",
        "correctAnswer": "Small Intestine",
        "subtopic": "24.3-III. The digestive system"
      },
      {
        "id": "phys-mcq-1-46",
        "question": "The mechanical breakdown of food is responsible for",
        "correctAnswer": "Mastication",
        "subtopic": "24.3-III. The digestive system"
      },
      {
        "id": "phys-mcq-1-47",
        "question": "The function most important for survival immediately after a meal is",
        "correctAnswer": "Absorption and retention of water and electrolytes",
        "subtopic": "24.3-III. The digestive system"
      },
      {
        "id": "phys-mcq-1-48",
        "question": "The term for the food that enters the intestine from the stomach is?",
        "correctAnswer": "Chyme",
        "subtopic": "24.3-III. The digestive system"
      },
      {
        "id": "phys-mcq-1-49",
        "question": "Active secretion of renal tubules is important in the metabolism of",
        "correctAnswer": "Potassium ions",
        "subtopic": "24.9-IX. Renal system"
      },
      {
        "id": "phys-mcq-1-50",
        "question": "How many nephrons does each kidney contain?",
        "correctAnswer": "2 million nephrons",
        "subtopic": "24.7-VII. The sensory organs"
      },
      {
        "id": "phys-mcq-1-51",
        "question": "The glomerular filtration rate (GFR) in ml/min is approximately",
        "correctAnswer": "180 ml/min",
        "subtopic": "24.7-VII. The sensory organs"
      },
      {
        "id": "phys-mcq-1-52",
        "question": "Which of the following is the functional unit of the kidney?",
        "correctAnswer": "Nephron",
        "subtopic": "24.7-VII. The sensory organs"
      },
      {
        "id": "phys-mcq-1-53",
        "question": "Normal plasma osmolarity is approximately",
        "correctAnswer": "300 mOsm/L",
        "subtopic": "24.7-VII. The sensory organs"
      },
      {
        "id": "phys-mcq-1-54",
        "question": "Tubular reabsorption is the process of",
        "correctAnswer": "Reabsorbing substances from the renal tubules back into the blood",
        "subtopic": "24.7-VII. The sensory organs"
      },
      {
        "id": "phys-mcq-1-55",
        "question": "Glomerular filtrate formed per day is approximately",
        "correctAnswer": "180 liters",
        "subtopic": "24.7-VII. The sensory organs"
      },
      {
        "id": "phys-mcq-1-56",
        "question": "The transport of solute from the peritubular capillaries into the tubular lumen is called",
        "correctAnswer": "Tubular secreation",
        "subtopic": "24.7-VII. The sensory organs"
      },
      {
        "id": "phys-mcq-1-57",
        "question": "The total amount of protein filtered per day is",
        "correctAnswer": "7.2 g/day",
        "subtopic": "24.7-VII. The sensory organs"
      },
      {
        "id": "phys-mcq-1-58",
        "question": "Concentration and dilution of urine primarily occur in the",
        "correctAnswer": "Loop of Henle",
        "subtopic": "24.7-VII. The sensory organs"
      },
      {
        "id": "phys-mcq-1-59",
        "question": "The primary function of the kidney is",
        "correctAnswer": "Filtration of blood",
        "subtopic": "24.7-VII. The sensory organs"
      },
      {
        "id": "phys-mcq-1-60",
        "question": "The kidney stimulates the production of erythrocytes by secreting",
        "correctAnswer": "Erythropoietin",
        "subtopic": "24.7-VII. The sensory organs"
      },
      {
        "id": "phys-mcq-1-61",
        "question": "Which of the following is a layer of the kidney?",
        "correctAnswer": "Renal cortex",
        "subtopic": "24.7-VII. The sensory organs"
      },
      {
        "id": "phys-mcq-1-62",
        "question": "The primary function of the juxtaglomerular apparatus (JGA) is",
        "correctAnswer": "Regulation of blood pressure and electrolyte balance",
        "subtopic": "24.7-VII. The sensory organs"
      },
      {
        "id": "phys-mcq-1-63",
        "question": "The mechanism of renal autoregulation involves",
        "correctAnswer": "Vasodilation and vasoconstriction of afferent and efferent arterioles",
        "subtopic": "24.7-VII. The sensory organs"
      },
      {
        "id": "phys-mcq-1-64",
        "question": "The regulation of renal blood flow is mainly regulated by",
        "correctAnswer": "Sympathetic nervous system activation",
        "subtopic": "24.7-VII. The sensory organs"
      },
      {
        "id": "phys-mcq-1-65",
        "question": "The main function of the kidneys is",
        "correctAnswer": "Filtration of blood",
        "subtopic": "24.7-VII. The sensory organs"
      },
      {
        "id": "phys-mcq-1-66",
        "question": "Which one of the following hormones is not secreted by the kidneys?",
        "correctAnswer": "Insulin",
        "subtopic": "24.7-VII. The sensory organs"
      },
      {
        "id": "phys-mcq-1-67",
        "question": "Visual acuity is tested with the test chart placed at",
        "correctAnswer": "20 feet",
        "subtopic": "24.7-VII. The sensory organs"
      },
      {
        "id": "phys-mcq-1-68",
        "question": "Aqueous humor is formed by",
        "correctAnswer": "Secretion from ciliary processes",
        "subtopic": "24.7-VII. The sensory organs"
      },
      {
        "id": "phys-mcq-1-69",
        "question": "The average normal intraocular pressure is approximately",
        "correctAnswer": "10 to 21 mmHg",
        "subtopic": "24.7-VII. The sensory organs"
      },
      {
        "id": "phys-mcq-1-70",
        "question": "The function of aqueous humor includes",
        "correctAnswer": "Maintain the intraocular pressure",
        "subtopic": "24.7-VII. The sensory organs"
      },
      {
        "id": "phys-mcq-1-71",
        "question": "Intraocular pressure is measured by",
        "correctAnswer": "Tonometer",
        "subtopic": "24.7-VII. The sensory organs"
      },
      {
        "id": "phys-mcq-1-72",
        "question": "What is contained in the retina?",
        "correctAnswer": "Rods and cones",
        "subtopic": "24.7-VII. The sensory organs"
      },
      {
        "id": "phys-mcq-1-73",
        "question": "Phototransduction is the process by which",
        "correctAnswer": "Light energy",
        "subtopic": "24.7-VII. The sensory organs"
      },
      {
        "id": "phys-mcq-1-74",
        "question": "Diplopia means",
        "correctAnswer": "Double visiov",
        "subtopic": "24.7-VII. The sensory organs"
      },
      {
        "id": "phys-mcq-1-75",
        "question": "Loss of taste sensation is called",
        "correctAnswer": "Ageusia",
        "subtopic": "24.7-VII. The sensory organs"
      },
      {
        "id": "phys-mcq-1-76",
        "question": "Regulation of body temperature is an important function performed by",
        "correctAnswer": "Hypothalamus",
        "subtopic": "24.7-VII. The sensory organs"
      },
      {
        "id": "phys-mcq-1-77",
        "question": "Langerhans cells play an important role in protecting the skin against",
        "correctAnswer": "Viral infection",
        "subtopic": "24.7-VII. The sensory organs"
      },
      {
        "id": "phys-mcq-1-78",
        "question": "Melanin absorbs",
        "correctAnswer": "Ultraviolet rays",
        "subtopic": "24.7-VII. The sensory organs"
      },
      {
        "id": "phys-mcq-1-79",
        "question": "Cells that detect smell, also known as olfactory cells or olfactory receptors, are found in the",
        "correctAnswer": "Olfactory epithelium",
        "subtopic": "24.7-VII. The sensory organs"
      },
      {
        "id": "phys-mcq-1-80",
        "question": "The composition of aqueous humor is water",
        "correctAnswer": "Water 98.7%",
        "subtopic": "24.7-VII. The sensory organs"
      },
      {
        "id": "phys-mcq-1-81",
        "question": "The maximum number of hormone-secreting cells of the anterior pituitary are",
        "correctAnswer": "Somatotrops",
        "subtopic": "24.6-VI. The endocrine system"
      },
      {
        "id": "phys-mcq-1-82",
        "question": "Somatomedin C, also known as insulin-like growth factor 1 (IGF-1), is secreted by",
        "correctAnswer": "Liver",
        "subtopic": "24.6-VI. The endocrine system"
      },
      {
        "id": "phys-mcq-1-83",
        "question": "The autoimmune disease where the body's own antibodies attack cells of the thyroid gland is called",
        "correctAnswer": "Grave's disease",
        "subtopic": "24.6-VI. The endocrine system"
      },
      {
        "id": "phys-mcq-1-84",
        "question": "The parathyroid glands are typically located",
        "correctAnswer": "Adjacent to the thyroid gland",
        "subtopic": "24.6-VI. The endocrine system"
      },
      {
        "id": "phys-mcq-1-85",
        "question": "Acromegaly is most frequently found in",
        "correctAnswer": "Adults",
        "subtopic": "24.6-VI. The endocrine system"
      }
    ],
    "subjectiveQuestions": [
      {
        "id": "phys-subj-1-1",
        "question": "Identify two functions of the lipid layer.",
        "type": "Very short",
        "marks": 2,
        "difficulty": 1
      },
      {
        "id": "phys-subj-1-2",
        "question": "Identify two functions of the cell membrane.",
        "type": "Very short",
        "marks": 2,
        "difficulty": 1
      },
      {
        "id": "phys-subj-1-3",
        "question": "Summarize the functions of RBCs (Red Blood Cells).",
        "type": "Very short",
        "marks": 2,
        "difficulty": 1
      },
      {
        "id": "phys-subj-1-4",
        "question": "Recognize the formation of blood cells.",
        "type": "Very short",
        "marks": 2,
        "difficulty": 1
      },
      {
        "id": "phys-subj-1-5",
        "question": "Determine the life cycle of red blood cells.",
        "type": "Very short",
        "marks": 2,
        "difficulty": 1
      },
      {
        "id": "phys-subj-1-6",
        "question": "Enumerate functions of RBCs (Red Blood Cells) (Two points).",
        "type": "Very short",
        "marks": 2,
        "difficulty": 1
      },
      {
        "id": "phys-subj-1-7",
        "question": "Write the life cycle of red blood cells.",
        "type": "Very short",
        "marks": 2,
        "difficulty": 1
      },
      {
        "id": "phys-subj-1-8",
        "question": "Identify two types of neuroglial cells.",
        "type": "Very short",
        "marks": 2,
        "difficulty": 1
      },
      {
        "id": "phys-subj-1-9",
        "question": "Explain the types of membranes.",
        "type": "Short",
        "marks": 5,
        "difficulty": 1
      },
      {
        "id": "phys-subj-1-10",
        "question": "Describe the composition and structure of the cell membrane.",
        "type": "Short",
        "marks": 5,
        "difficulty": 1
      },
      {
        "id": "phys-subj-1-11",
        "question": "Draw a well-labelled diagram of a cell and list its functions.",
        "type": "Short",
        "marks": 5,
        "difficulty": 1
      },
      {
        "id": "phys-subj-1-12",
        "question": "Explain the transport of carbon dioxide in the body.",
        "type": "Short",
        "marks": 5,
        "difficulty": 1
      },
      {
        "id": "phys-subj-1-13",
        "question": "Elaborate on pulmonary diffusion.",
        "type": "Short",
        "marks": 5,
        "difficulty": 1
      },
      {
        "id": "phys-subj-1-14",
        "question": "Describe how the cardiovascular system works to maintain homeostasis during exercise.",
        "type": "Short",
        "marks": 5,
        "difficulty": 1
      },
      {
        "id": "phys-subj-1-15",
        "question": "Illustrate the formation of white blood cells.",
        "type": "Short",
        "marks": 5,
        "difficulty": 1
      },
      {
        "id": "phys-subj-1-16",
        "question": "Explain the types and functions of neuroglia cells.",
        "type": "Short",
        "marks": 5,
        "difficulty": 1
      },
      {
        "id": "phys-subj-1-17",
        "question": "Enlist the types of membranes and explain all types of membranes in detail. (2+8)",
        "type": "Essay",
        "marks": 10,
        "difficulty": 1
      },
      {
        "id": "phys-subj-1-18",
        "question": "Explain the physiology of cells and tissues with a diagram of a cell and label it. (5+5)",
        "type": "Essay",
        "marks": 10,
        "difficulty": 1
      },
      {
        "id": "phys-subj-1-19",
        "question": "Describe cell and tissue formation and repair with a diagram and label it. (7+3)",
        "type": "Essay",
        "marks": 10,
        "difficulty": 1
      },
      {
        "id": "phys-subj-1-20",
        "question": "Explain the structure and functions of a cell with a diagram of a cell and label it. (7+3)",
        "type": "Essay",
        "marks": 10,
        "difficulty": 1
      },
      {
        "id": "phys-subj-1-21",
        "question": "Define cell. Identify the structure of a cell and explain the functions of cell organelles. (2+8)",
        "type": "Essay",
        "marks": 10,
        "difficulty": 1
      },
      {
        "id": "phys-subj-1-22",
        "question": "Describe the mechanism of transport of substances across the cell membrane.",
        "type": "Essay",
        "marks": 10,
        "difficulty": 1
      },
      {
        "id": "phys-subj-1-23",
        "question": "Describe how oxygen is transported from the lungs to tissues. (10)",
        "type": "Essay",
        "marks": 10,
        "difficulty": 1
      },
      {
        "id": "phys-subj-1-24",
        "question": "Explain the structure and formation of blood cells. (5+5)",
        "type": "Essay",
        "marks": 10,
        "difficulty": 1
      }
    ]
  },
  "phys-unit-2": {
    "id": "phys-unit-2",
    "unitNumber": 2,
    "title": "Blood & Body Fluids",
    "category": "Hematology & Hemostasis",
    "icon": "🩸",
    "color": "from-red-500 to-rose-600",
    "teachingHours": "60 Hours INC Curriculum (Theory 18h + Practical 42h)",
    "summary": "Detailed functional mechanisms, regulation, homeostatic balance, clinical alterations and official INC competencies of Blood & Body Fluids.",
    "objectives": [
      "Describe the physiology of blood and alteration in diseases of blood.",
      "Describe the formation and composition of the Blood.",
      "Classifications of Blood cells and describe Blood groups, and Blood coagulation.",
      "Discuss about Haemoglobin, synthesis and breakdown, variation of molecules, and estimation.",
      "Enumerate the alteration in diseases of blood.",
      "Human Bodies need blood to deliver nutrients and remove wastes from trillions of cells. Single cell organisms do not need blood. They obtain nutrients directly from and excrete wastes directly into their environment. The heart pumps blood throughout the body in a network of blood vessels. Together, these three components include blood, heart, and vessels makes up the cardiovascular system.",
      "Blood Formation",
      "In humans, the bones are not solid, but are made up of two distinct regions. The outer, weight bearing area is hard, compact, and calcium based. The inner region or marrow which is one of the largest organs of the body is located within the bones. It fills the shafts of the long bones, the trabeculae (spaces within cancellous tissue), and even extends into the bony canals that hold the blood vessels. The marrow may contain fat cells, fluid, fibrous tissue, blood vessels, and hematopoietic, or blood forming cells. Marrow looks yellow when it holds many fat cells; it appears red when it has more blood forming material. The marrow is the principal site for haematopoiesis (blood cells formation), which, after birth, occurs primarily within the bones of the legs, arms, ribs, sternum (breast bone), and vertebrae (back bones)."
    ],
    "totalImages": 7,
    "sections": [
      {
        "id": "sec-phys-2-1",
        "title": "Blood Composition, Physicochemical Properties & Hemopoiesis",
        "content": [
          "Blood is a specialized circulating fluid connective tissue comprising **formed cellular elements** (erythrocytes, leukocytes, thrombocytes) suspended within a liquid extracellular matrix called **blood plasma**.",
          "In an average adult (70 kg), total blood volume is 5.0 to 5.6 liters (approximately 8% of body weight, or 70-80 mL/kg body weight). Blood has a slightly alkaline pH of 7.35 to 7.45, a specific gravity of 1.052 to 1.061, a viscosity 4.5 to 5.0 times that of water, and an osmolality of 280 to 295 mOsm/kg H2O.",
          "Centrifugation of anti-coagulated blood separates it into three layers: packed red blood cells (**Hematocrit / Packed Cell Volume [PCV]**: 40-50% in males, 36-46% in females), an intermediate whitish **buffy coat** (< 1%, comprising leukocytes and platelets), and straw-colored supernatant **plasma (55%)**.",
          "**Hemopoiesis (Hematopoiesis):** The continuous physiological formation of blood cells. In the adult, hemopoiesis occurs exclusively in red bone marrow (pelvis, sternum, vertebrae, cranium, ribs, proximal epiphyses of femur/humerus). All formed elements originate from common **Pluripotent Hematopoietic Stem Cells (HSCs)**, which differentiate into **Myeloid Stem Cells** (erythrocytes, granulocytes, monocytes, megakaryocytes) and **Lymphoid Stem Cells** (T and B lymphocytes, NK cells) under the control of colony-stimulating factors (CSFs) and erythropoietin."
        ],
        "points": [
          "**Serum vs. Plasma:** Plasma is the fluid portion of unclotted blood containing fibrinogen and all clotting factors; Serum is the clear fluid remaining after blood has clotted (Serum = Plasma minus Fibrinogen and clotting factors II, V, VIII).",
          "**Erythropoiesis Regulation:** Hypoxia is the primary physiological stimulus for erythropoiesis; renal peritubular interstitial cells sense low tissue pO2 and secrete **Erythropoietin (EPO)**, which acts on bone marrow CFU-E precursors.",
          "**Maturation Factors:** Vitamin B12 and Folic Acid are essential for thymidine triphosphate synthesis and nuclear DNA replication; Iron (Fe2+) is indispensable for heme synthesis."
        ],
        "clinicalPearl": "**Chronic Kidney Disease Anemia & EPO Replacement:** In chronic kidney disease (CKD stage 4-5), progressive destruction of renal parenchyma eliminates renal erythropoietin production. Patients develop severe, refractory normocytic normochromic anemia (Hb frequently < 7-8 g/dL), requiring recombinant human erythropoietin (Epoetin alfa) or darbepoetin and IV iron supplementation to restore hematocrit.",
        "images": [
          {
            "src": "/images/physiology/2_image1.png",
            "caption": "Figure 2.1: Cellular composition of blood and formed elements.",
            "alt": "Composition of blood"
          }
        ],
        "tables": []
      },
      {
        "id": "sec-phys-2-2",
        "title": "Plasma Proteins, Colloid Osmotic Pressure & ESR",
        "content": [
          "Blood plasma consists of 91-92% water, 7-8% **plasma proteins** (normal concentration: 6.4 to 8.3 g/dL), and 1-2% other solutes (electrolytes, glucose, amino acids, urea, creatinine, bilirubin).",
          "The plasma proteins are divided into three major fractions:",
          "1. **Albumin (3.5 to 5.0 g/dL):** Synthesized exclusively by the liver (~12 g/day). Represents 55-65% of total protein. Because of its small molecular weight (69 kDa) and high abundance, albumin generates **75% to 80% of the Colloid Osmotic (Oncotic) Pressure of plasma (25-28 mmHg)**, opposing capillary hydrostatic pressure and holding fluid within the intravascular space. Albumin also acts as a versatile carrier for bilirubin, free fatty acids, calcium, and hydrophobic medications.",
          "2. **Globulins (2.0 to 3.5 g/dL):** Comprise Alpha-1 (alpha-1 antitrypsin), Alpha-2 (haptoglobin, ceruloplasmin), Beta (transferrin, hemopexin, beta-lipoproteins), and **Gamma Globulins (Immunoglobulins: IgG, IgM, IgA, IgE, IgD)** synthesized by plasma B-cells providing humoral adaptive immunity.",
          "3. **Fibrinogen (0.2 to 0.4 g/dL / 200-400 mg/dL):** High molecular weight (340 kDa) fibrous protein synthesized by the liver; crucial for the coagulation cascade, converted into an insoluble fibrin clot by thrombin.",
          "**The Albumin/Globulin (A/G) Ratio:** Normally 1.2:1 to 2.0:1. A reversed A/G ratio (< 1.0) is a hallmark of severe chronic hepatic disease (impaired albumin synthesis) or multiple myeloma (monoclonal gammopathy).",
          "**Erythrocyte Sedimentation Rate (ESR):** The rate at which anticoagulated red blood cells settle under gravity over one hour (Westergren method; normal: 0-15 mm/hr in males, 0-20 mm/hr in females). Erythrocytes normally repel each other due to negative surface sialic acid charges (zeta potential). In acute and chronic inflammation, elevated asymmetrical plasma proteins (especially **Fibrinogen** and globulins) neutralize the zeta potential, promoting erythrocyte stacking (**Rouleaux formation**), accelerating sedimentation."
        ],
        "points": [
          "**Starling Forces in Microcirculation:** Capillary hydrostatic pressure (favors filtration) vs. Plasma colloid osmotic pressure (favors reabsorption). Hypoalbuminemia shifts balance toward filtration, causing interstitial fluid accumulation and **edema**.",
          "**Plasma Buffering Capacity:** Histidine residues on plasma proteins buffer hydrogen ions (H+), contributing 15% of the total buffering power of blood.",
          "**Clinical ESR Elevations:** Marked ESR elevation (> 100 mm/hr) serves as a sensitive, non-specific biomarker of acute and chronic systemic inflammation, active autoimmune disease (rheumatoid arthritis, SLE), temporal arteritis, multiple myeloma, and occult malignancy."
        ],
        "clinicalPearl": "**Hypoalbuminemia, Edema & Nephrotic Syndrome:** Severe liver cirrhosis (failure of albumin synthesis) or nephrotic syndrome (massive urinary albumin loss > 3.5 g/day) collapses plasma oncotic pressure below 15 mmHg. Fluid shifts from intravascular compartments into interstitial spaces, producing generalized pitting edema, ascites, and pleural effusions.",
        "images": [
          {
            "src": "/images/physiology/2_image2.png",
            "caption": "Figure 2.2: Erythropoiesis and stages of RBC development.",
            "alt": "Erythropoiesis"
          }
        ],
        "tables": []
      },
      {
        "id": "sec-phys-2-3",
        "title": "Formed Elements, Hemoglobin Dynamics & Catabolism",
        "content": [
          "The formed cellular elements of blood execute distinct, life-sustaining physiological functions:",
          "**Erythrocytes (RBCs):** Normal count 4.5 to 6.0 million/μL in males, 4.0 to 5.0 million/μL in females. Packed with **Hemoglobin (Hb)** (14-18 g/dL in males, 12-16 g/dL in females), a tetrameric hemoprotein specialized for reversible oxygen delivery and carbon dioxide clearance.",
          "**Leukocytes (WBCs):** Normal count 4,000 to 11,000/μL. Categorized into **Granulocytes** (Neutrophils [phagocytosis of bacteria], Eosinophils [parasites and allergies], Basophils [histamine and heparin release]) and **Agranulocytes** (Lymphocytes [adaptive immunity] and Monocytes [tissue macrophages]).",
          "**Thrombocytes (Platelets):** Normal count 150,000 to 400,000/μL; anucleated cytoplasmic fragments derived from megakaryocytes, exhibiting three essential physiological properties: **Adhesion** (to subendothelial collagen via Von Willebrand factor), **Aggregation** (via ADP and thromboxane A2), and **Activation**.",
          "Aged erythrocytes (lifespan ~120 days) are engulfed by reticuloendothelial macrophages in the spleen and liver. Globin chains are recycled into amino acids; iron is salvaged by transferrin; and the protoporphyrin ring of heme is cleaved into biliverdin and converted into lipid-soluble **unconjugated (indirect) bilirubin**, which is transported by albumin to hepatocytes for glucuronide conjugation."
        ],
        "points": [
          "**Hemoglobin Oxygen Capacity:** Each gram of pure hemoglobin binds 1.34 mL of oxygen when fully saturated (100% saturation yields ~20 mL O2 per 100 mL blood).",
          "**Neutrophil Phagocytosis & Left Shift:** Neutrophils are the earliest immune responders, migrating via chemotaxis and destroying bacteria via oxidative respiratory burst (superoxide, hydrogen peroxide, hypochlorous acid). An increase in immature non-segmented band forms indicates acute severe bacterial infection.",
          "**Platelet Granule Release:** Dense granules release ADP and serotonin; alpha granules release platelet-derived growth factor (PDGF), fibrinogen, and clotting factor V.",
          "**Bilirubin Clearance & Jaundice:** Conjugated (direct) bilirubin is excreted into bile, converted in the colon into urobilinogen by bacterial flora; failure of biliary excretion or massive hemolysis accumulates bilirubin (> 2.0-2.5 mg/dL), staining sclera and skin yellow (**jaundice**)."
        ],
        "clinicalPearl": "**Carbon Monoxide Poisoning & Sickle Cell Hemoglobinopathy:** Carbon monoxide (CO) binds to hemoglobin with an affinity 210 to 240 times higher than oxygen, forming carboxyhemoglobin (HbCO) that shifts the oxygen dissociation curve to the left and blocks oxygen delivery, causing cherry-red skin, cellular asphyxiation, and death. In Sickle Cell Disease (HbS mutation in beta-globin chain), deoxygenation polymerizes hemoglobin, deforming RBCs into rigid sickles that occlude microcapillaries, producing excruciating vaso-occlusive pain crises and splenic infarctions.",
        "images": [
          {
            "src": "/images/physiology/2_image7.png",
            "caption": "Figure 2.7: Structure and catabolism of hemoglobin.",
            "alt": "Hemoglobin catabolism"
          }
        ],
        "tables": []
      },
      {
        "id": "sec-phys-2-4",
        "title": "Blood Groups, Rh Incompatibility & Transfusion Principles",
        "content": [
          "The human erythrocyte membrane displays a complex mosaic of genetically determined surface glycoproteins and glycolipids called **agglutinogens (antigens)**. Over 30 blood group systems are recognized, with the **ABO System** and the **Rh System** holding paramount clinical significance.",
          "The **ABO system** is governed by **Landsteiner's Law**: (1) If an agglutinogen is present on an individual's RBCs, the corresponding agglutinin (antibody) must be absent from the plasma, and (2) If an agglutinogen is absent from the RBCs, the corresponding agglutinin must be present in the plasma.",
          "Individuals with **Blood Group A** possess A antigens and anti-B antibodies; **Group B** possess B antigens and anti-A antibodies; **Group AB** possess both A and B antigens and NO antibodies (**Universal Recipient** for RBCs); and **Group O** possess neither antigen and both anti-A and anti-B antibodies (**Universal Donor** for RBCs).",
          "The **Rh system** is determined by the presence or absence of the highly immunogenic **D antigen**. Rh-positive individuals possess D antigen (85% of population); Rh-negative individuals lack D antigen and do NOT possess pre-existing anti-D antibodies, but produce them upon sensitization by Rh-positive blood."
        ],
        "points": [
          "**Landsteiner's Law:** Predicts natural IgM isohemagglutinins formed spontaneously during infancy in response to ubiquitous bacterial carbohydrates.",
          "**Major vs. Minor Cross-Matching:** Major cross-match mixes donor RBCs with recipient serum (critical test detecting preformed recipient antibodies that could destroy donor cells); Minor cross-match mixes donor plasma with recipient RBCs.",
          "**Rh Incompatibility (Erythroblastosis Fetalis):** When an Rh-negative mother carries an Rh-positive fetus, feto-maternal hemorrhage during delivery sensitizes the mother to produce anti-D IgG antibodies. In subsequent Rh-positive pregnancies, maternal anti-D IgG crosses the placenta, destroying fetal RBCs and causing profound hemolytic disease of the newborn, kernicterus, and hydrops fetalis.",
          "**Prophylactic Anti-D Immunoglobulin (RhoGAM):** Administering RhoGAM to Rh-negative mothers at 28 weeks gestation and within 72 hours post-delivery binds and neutralizes fetal Rh-positive RBCs before maternal immune recognition occurs, preventing sensitization."
        ],
        "clinicalPearl": "**Acute Hemolytic Transfusion Reaction Emergency:** Transfusing ABO-incompatible blood (e.g., Group A blood into a Group O patient) triggers immediate, massive intravascular hemolysis mediated by preformed IgM antibodies and complement fixation. Symptoms include fever, chills, severe flank pain, dyspnea, and acute hypotension, leading to DIC and acute tubular necrosis. The nurse must **IMMEDIATELY STOP THE INFUSION**, maintain IV access with normal saline, notify the physician and blood bank, and send blood/urine samples for hemolysis testing.",
        "images": [
          {
            "src": "/images/physiology/2_image3.png",
            "caption": "Figure 2.3: ABO and Rh blood grouping agglutination.",
            "alt": "ABO blood grouping"
          },
          {
            "src": "/images/physiology/2_image4.png",
            "caption": "Figure 2.4: Blood typing principles and cross-matching.",
            "alt": "Blood typing principles"
          }
        ],
        "tables": []
      },
      {
        "id": "sec-phys-2-5",
        "title": "Hemostasis, The Coagulation Cascade & Hematological Alterations",
        "content": [
          "**Hemostasis** is the physiological arrest of bleeding following vascular injury, executing a swift, localized, and tightly regulated three-phase sequence: (1) **Vascular Spasm** (immediate myogenic vasoconstriction reducing blood flow), (2) **Platelet Plug Formation** (primary hemostasis), and (3) **Blood Coagulation** (secondary hemostasis forming a stable fibrin clot).",
          "The **coagulation cascade** represents a complex biological amplification cascade of 13 plasma clotting factors synthesized predominantly in the liver (Factors II, VII, IX, and X require **Vitamin K** for post-translational gamma-carboxylation).",
          "Coagulation proceeds through two converging pathways: the **Intrinsic Pathway** (triggered by blood exposure to negatively charged subendothelial collagen, beginning with Factor XII) and the rapid **Extrinsic Pathway** (triggered by tissue injury releasing **Tissue Factor / Thromboplastin / Factor III**). Both pathways converge at the **Common Pathway**: activation of **Factor X (Stuart-Prower factor)**, which assembles into the prothrombinase complex with Factor V, converting **Prothrombin (Factor II)** into active **Thrombin**. Thrombin then cleaves soluble **Fibrinogen (Factor I)** into insoluble **Fibrin monomers**, which are cross-linked by Factor XIII into a tough fibrin mesh.",
          "Following tissue repair, the fibrinolytic enzyme **Plasmin** dissolves the clot (**fibrinolysis**), releasing fibrin degradation products (**D-dimer**)."
        ],
        "points": [
          "**Intrinsic vs. Extrinsic Pathway Monitoring:** The **Activated Partial Thromboplastin Time (aPTT)** monitors the intrinsic pathway and heparin therapy (normal: 25-35 seconds); The **Prothrombin Time (PT / INR)** monitors the extrinsic pathway and warfarin therapy (normal INR: 0.8-1.1, therapeutic: 2.0-3.0).",
          "**Natural Endogenous Anticoagulants:** Antithrombin III (inactivates thrombin and Factor Xa, accelerated 1,000-fold by heparin), Protein C and Protein S (inactivate Factors Va and VIIIa), and Prostacyclin (PGI2, inhibits platelet aggregation).",
          "**Hemophilia A & B:** X-linked recessive bleeding disorders caused by congenital deficiency of **Factor VIII (Hemophilia A)** or **Factor IX (Hemophilia B / Christmas disease)**; manifests with severe recurrent hemarthroses (joint bleeding) and deep intramuscular hematomas.",
          "**Vitamin K Antagonism:** Warfarin inhibits vitamin K epoxide reductase, depleting functional Factors II, VII, IX, and X; acute bleeding is reversed with Vitamin K and prothrombin complex concentrate (PCC).",
          "**Disseminated Intravascular Coagulation (DIC):** Systemic uncontrolled activation of coagulation (in sepsis, obstetric emergencies, severe trauma) causing widespread microvascular thrombosis, consuming all clotting factors and platelets, and resulting in catastrophic paradoxical hemorrhage."
        ],
        "clinicalPearl": "**Anticoagulation Reversal & D-Dimer Biomarker:** When caring for patients on unfractionated heparin, acute overdose and hemorrhage are rapidly neutralized with **Protamine Sulfate** (1 mg per 100 units of heparin). Elevated plasma D-dimer (> 500 ng/mL) confirms active fibrin generation and lysis, serving as a primary screening biomarker for deep vein thrombosis (DVT) and pulmonary embolism (PE).",
        "images": [
          {
            "src": "/images/physiology/2_image5.png",
            "caption": "Figure 2.5: The coagulation cascade (Intrinsic, Extrinsic, and Common pathways).",
            "alt": "Coagulation cascade"
          },
          {
            "src": "/images/physiology/2_image6.png",
            "caption": "Figure 2.6: Fibrin clot formation and fibrinolysis.",
            "alt": "Fibrin clot formation"
          }
        ],
        "tables": []
      }
    ],
    "mcqs": [
      {
        "id": "phys-mcq-2-86",
        "question": "The most common benign tumor of the pituitary gland is",
        "correctAnswer": "Pituitary adenoma",
        "subtopic": "24.6-VI. The endocrine system"
      },
      {
        "id": "phys-mcq-2-87",
        "question": "Banting and Best isolated insulin in",
        "correctAnswer": "1922",
        "subtopic": "24.6-VI. The endocrine system"
      },
      {
        "id": "phys-mcq-2-88",
        "question": "Diabetes is mainly due to",
        "correctAnswer": "Insulin deficiency",
        "subtopic": "24.6-VI. The endocrine system"
      },
      {
        "id": "phys-mcq-2-89",
        "question": "The condition described, characterized by strong painful spasms of skeletal muscles and bending inwards of the hands, forearms, and feet, is",
        "correctAnswer": "Tetany",
        "subtopic": "24.6-VI. The endocrine system"
      },
      {
        "id": "phys-mcq-2-90",
        "question": "What hormone does the parathyroid produce?",
        "correctAnswer": "Parathyroid hormone (PTH)",
        "subtopic": "24.6-VI. The endocrine system"
      },
      {
        "id": "phys-mcq-2-91",
        "question": "Adrenaline hormone increases",
        "correctAnswer": "Blood pressure",
        "subtopic": "24.6-VI. The endocrine system"
      },
      {
        "id": "phys-mcq-2-92",
        "question": "The acrosome of the sperm is formed from",
        "correctAnswer": "Golgi apparatus",
        "subtopic": "24.10-X. The reproductive system"
      },
      {
        "id": "phys-mcq-2-93",
        "question": "Essential hormones for spermatogenesis include",
        "correctAnswer": "Follicle-stimulating hormone (FSH) and luteinizing hormone (LH)",
        "subtopic": "24.10-X. The reproductive system"
      },
      {
        "id": "phys-mcq-2-94",
        "question": "The time of ovulation is usually",
        "correctAnswer": "Day 14 of the menstrual cycle",
        "subtopic": "24.10-X. The reproductive system"
      },
      {
        "id": "phys-mcq-2-95",
        "question": "Fertilization occurs in",
        "correctAnswer": "Fallopian tubes",
        "subtopic": "24.10-X. The reproductive system"
      },
      {
        "id": "phys-mcq-2-96",
        "question": "The placenta starts to provide nutritional support to the fetus after fertilization from the",
        "correctAnswer": "Uterus",
        "subtopic": "24.10-X. The reproductive system"
      },
      {
        "id": "phys-mcq-2-97",
        "question": "The time period of spermatogenesis from germinal cell to sperm takes approximately",
        "correctAnswer": "60 days",
        "subtopic": "24.10-X. The reproductive system"
      },
      {
        "id": "phys-mcq-2-98",
        "question": "Follicle-stimulating hormone (FSH) is essential for spermatogenesis because it stimulates",
        "correctAnswer": "Proliferation of Sertoli cells",
        "subtopic": "24.10-X. The reproductive system"
      },
      {
        "id": "phys-mcq-2-99",
        "question": "In humans, the meiotic phase with the longest duration is",
        "correctAnswer": "Prophase I",
        "subtopic": "24.10-X. The reproductive system"
      },
      {
        "id": "phys-mcq-2-100",
        "question": "The formation of polar bodies occurs during",
        "correctAnswer": "Oogenesis",
        "subtopic": "24.10-X. The reproductive system"
      },
      {
        "id": "phys-mcq-2-101",
        "question": "The lytic enzyme released by sperm is",
        "correctAnswer": "Acrosin",
        "subtopic": "24.10-X. The reproductive system"
      },
      {
        "id": "phys-mcq-2-102",
        "question": "The process that induces spermatogenesis is",
        "correctAnswer": "Follicle-stimulating hormone (FSH)",
        "subtopic": "24.10-X. The reproductive system"
      },
      {
        "id": "phys-mcq-2-103",
        "question": "One primary spermatocyte produces",
        "correctAnswer": "4 spermatozoa",
        "subtopic": "24.10-X. The reproductive system"
      },
      {
        "id": "phys-mcq-2-104",
        "question": "The process of spermatogenesis occurs in adult males for the purpose of",
        "correctAnswer": "Sperm production",
        "subtopic": "24.10-X. The reproductive system"
      },
      {
        "id": "phys-mcq-2-105",
        "question": "Between ejaculations, sperm is primarily stored in the",
        "correctAnswer": "Epididymis",
        "subtopic": "24.10-X. The reproductive system"
      },
      {
        "id": "phys-mcq-2-106",
        "question": "Completion of oogenesis results in the formation of",
        "correctAnswer": "Ovum (or egg cell)",
        "subtopic": "24.10-X. The reproductive system"
      },
      {
        "id": "phys-mcq-2-107",
        "question": "Days 15 to 28 of the menstrual cycle, encompassing both the ovarian and uterine cycles, are referred to as the",
        "correctAnswer": "Luteal phase",
        "subtopic": "24.10-X. The reproductive system"
      },
      {
        "id": "phys-mcq-2-108",
        "question": "The result of oogenesis is the formation of",
        "correctAnswer": "Ovum (or egg cell)",
        "subtopic": "24.10-X. The reproductive system"
      },
      {
        "id": "phys-mcq-2-109",
        "question": "Hormones are produced throughout a menstrual cycle, primarily by the",
        "correctAnswer": "Ovaries",
        "subtopic": "24.10-X. The reproductive system"
      },
      {
        "id": "phys-mcq-2-110",
        "question": "The main function of human chorionic gonadotropin (hCG) produced by the placenta is to",
        "correctAnswer": "Maintain the corpus luteum",
        "subtopic": "24.10-X. The reproductive system"
      },
      {
        "id": "phys-mcq-2-111",
        "question": "The fertilized ovum, or zygote, typically stays in the fallopian tube for approximately",
        "correctAnswer": "1-2 days",
        "subtopic": "24.10-X. The reproductive system"
      },
      {
        "id": "phys-mcq-2-112",
        "question": "If the vasa efferentia in the human reproductive system get blocked, the gametes (sperm cells) will not be transported from the",
        "correctAnswer": "Testes to epididymis",
        "subtopic": "24.10-X. The reproductive system"
      },
      {
        "id": "phys-mcq-2-113",
        "question": "Peak levels of human chorionic gonadotropin (hCG) in a normal pregnancy typically occur at around",
        "correctAnswer": "4-6 weeks gestation",
        "subtopic": "24.10-X. The reproductive system"
      },
      {
        "id": "phys-mcq-2-114",
        "question": "The menstrual cycle in which ovulation does NOT occur",
        "correctAnswer": "Anovulatory cycle",
        "subtopic": "24.10-X. The reproductive system"
      },
      {
        "id": "phys-mcq-2-115",
        "question": "The mammary glands enlarge at puberty primarily due to the influence of",
        "correctAnswer": "Estrogen",
        "subtopic": "24.10-X. The reproductive system"
      },
      {
        "id": "phys-mcq-2-116",
        "question": "The process of sperm production, known as spermatogenesis, takes place in the",
        "correctAnswer": "Seminiferous tubules of the testes",
        "subtopic": "24.10-X. The reproductive system"
      },
      {
        "id": "phys-mcq-2-117",
        "question": "The inner lining of the uterus is called the",
        "correctAnswer": "Endometrium",
        "subtopic": "24.10-X. The reproductive system"
      },
      {
        "id": "phys-mcq-2-118",
        "question": "The Juxtaglomerular cells are located in",
        "correctAnswer": "Afferent arteriole",
        "subtopic": "24.9-IX. Renal system"
      },
      {
        "id": "phys-mcq-2-119",
        "question": "Organs involved in the sensation of the body are known as",
        "correctAnswer": "Sensory organs",
        "subtopic": "24.7-VII. The sensory organs"
      },
      {
        "id": "phys-mcq-2-120",
        "question": "The most abundant blood cells in the body are",
        "correctAnswer": "Red blood cells",
        "subtopic": "24.5-V. Blood"
      },
      {
        "id": "phys-mcq-2-121",
        "question": "The typical lifespan of a red blood cell (RBC) is approximately",
        "correctAnswer": "120 days",
        "subtopic": "24.5-V. Blood"
      },
      {
        "id": "phys-mcq-2-122",
        "question": "The normal reticulocyte count of blood typically ranges between",
        "correctAnswer": "1-2%",
        "subtopic": "24.5-V. Blood"
      },
      {
        "id": "phys-mcq-2-123",
        "question": "One molecule of hemoglobin contains",
        "correctAnswer": "Four",
        "subtopic": "24.5-V. Blood"
      },
      {
        "id": "phys-mcq-2-124",
        "question": "The main function of the lymphatic system is",
        "correctAnswer": "Returns proteins back to plasma",
        "subtopic": "24.4-IV. Circulatory and Lymphatic system"
      },
      {
        "id": "phys-mcq-2-125",
        "question": "The following cell types are involved in the production of antibodies",
        "correctAnswer": "B cells",
        "subtopic": "24.4-IV. Circulatory and Lymphatic system"
      },
      {
        "id": "phys-mcq-2-126",
        "question": "Thromboxane is synthesized by which of the following?",
        "correctAnswer": "Platelets",
        "subtopic": "24.4-IV. Circulatory and Lymphatic system"
      },
      {
        "id": "phys-mcq-2-127",
        "question": "Von Willebrand factor is secreted by",
        "correctAnswer": "Endothelial cells",
        "subtopic": "24.4-IV. Circulatory and Lymphatic system"
      },
      {
        "id": "phys-mcq-2-128",
        "question": "The component known as red blood cells (RBCs) is",
        "correctAnswer": "Erythrocytes",
        "subtopic": "24.5-V. Blood"
      },
      {
        "id": "phys-mcq-2-129",
        "question": "The component of the lymphatic system responsible for the exchange between blood and body tissues is the",
        "correctAnswer": "Lymphatic capillaries",
        "subtopic": "24.4-IV. Circulatory and Lymphatic system"
      },
      {
        "id": "phys-mcq-2-130",
        "question": "AIDS (Acquired Immunodeficiency Syndrome) is characterized by",
        "correctAnswer": "Severe weakening of the immune system",
        "subtopic": "24.4-IV. Circulatory and Lymphatic system"
      },
      {
        "id": "phys-mcq-2-131",
        "question": "The type of antibodies that protect body fluids, such as saliva, tears, and mucous membranes, is",
        "correctAnswer": "IgA",
        "subtopic": "24.4-IV. Circulatory and Lymphatic system"
      },
      {
        "id": "phys-mcq-2-132",
        "question": "The lymph collected from the majority of the body drains into the vena cava via the",
        "correctAnswer": "Thoracic duct",
        "subtopic": "24.4-IV. Circulatory and Lymphatic system"
      },
      {
        "id": "phys-mcq-2-133",
        "question": "The transplacental route is",
        "correctAnswer": "Infection transfer from infected mother to her fetus",
        "subtopic": "24.4-IV. Circulatory and Lymphatic system"
      },
      {
        "id": "phys-mcq-2-134",
        "question": "Name an autoimmune disease",
        "correctAnswer": "Rhematoid arthrits",
        "subtopic": "24.4-IV. Circulatory and Lymphatic system"
      },
      {
        "id": "phys-mcq-2-135",
        "question": "The cytokines contain",
        "correctAnswer": "Proteins",
        "subtopic": "24.4-IV. Circulatory and Lymphatic system"
      },
      {
        "id": "phys-mcq-2-136",
        "question": "The humoral immunity is mediated by",
        "correctAnswer": "Antibodies",
        "subtopic": "24.4-IV. Circulatory and Lymphatic system"
      },
      {
        "id": "phys-mcq-2-137",
        "question": "The lifespan of platelets is approximately",
        "correctAnswer": "5 to 7 days",
        "subtopic": "24.5-V. Blood"
      },
      {
        "id": "phys-mcq-2-138",
        "question": "The conversion of fibrinogen to fibrin is done by",
        "correctAnswer": "Thrombin",
        "subtopic": "24.4-IV. Circulatory and Lymphatic system"
      },
      {
        "id": "phys-mcq-2-139",
        "question": "The function of a lymph node is",
        "correctAnswer": "Filtration of lymph",
        "subtopic": "24.4-IV. Circulatory and Lymphatic system"
      },
      {
        "id": "phys-mcq-2-140",
        "question": "The disease characterized by antibodies that cross-react with the valves of the heart is",
        "correctAnswer": "Rheumatic fever",
        "subtopic": "24.4-IV. Circulatory and Lymphatic system"
      },
      {
        "id": "phys-mcq-2-141",
        "question": "The type of immunity in which the inborn capacity of the body offers resistance to pathogens and their toxic products is called",
        "correctAnswer": "Innate immunity",
        "subtopic": "24.4-IV. Circulatory and Lymphatic system"
      },
      {
        "id": "phys-mcq-2-142",
        "question": "An infection of bone characterized by high fever, sweating, chills, pain, and rigid overlying muscles is called",
        "correctAnswer": "Osteomyelitis",
        "subtopic": "24.8-VIII.Musculoskeletal system"
      },
      {
        "id": "phys-mcq-2-143",
        "question": "Reduced bone mass is called",
        "correctAnswer": "Osteopenia",
        "subtopic": "24.8-VIII.Musculoskeletal system"
      },
      {
        "id": "phys-mcq-2-144",
        "question": "The muscle that is often referred to as the \"grinning muscle\" is",
        "correctAnswer": "Masseter",
        "subtopic": "24.8-VIII.Musculoskeletal system"
      },
      {
        "id": "phys-mcq-2-145",
        "question": "The muscle that presses the cheeks against the teeth is the",
        "correctAnswer": "Buccinators",
        "subtopic": "24.8-VIII.Musculoskeletal system"
      },
      {
        "id": "phys-mcq-2-146",
        "question": "The nerve that supplies the sternocleidomastoid and trapezius muscles is the",
        "correctAnswer": "Accessory nerve",
        "subtopic": "24.8-VIII.Musculoskeletal system"
      },
      {
        "id": "phys-mcq-2-147",
        "question": "The central canal of the spinal cord opens out into the",
        "correctAnswer": "Subarachnoid space",
        "subtopic": "24.11-XI.Nervous system"
      },
      {
        "id": "phys-mcq-2-148",
        "question": "Multipolar neurons contain",
        "correctAnswer": "One axon and multiple dendrites",
        "subtopic": "24.11-XI.Nervous system"
      },
      {
        "id": "phys-mcq-2-149",
        "question": "The nerve cells of the autonomic ganglia are mostly",
        "correctAnswer": "Multipolar",
        "subtopic": "24.11-XI.Nervous system"
      },
      {
        "id": "phys-mcq-2-150",
        "question": "Gray matter of the brain represents a collection of",
        "correctAnswer": "Cell bodies",
        "subtopic": "24.11-XI.Nervous system"
      },
      {
        "id": "phys-mcq-2-151",
        "question": "Optic nerves are associated with",
        "correctAnswer": "Vision",
        "subtopic": "24.11-XI.Nervous system"
      },
      {
        "id": "phys-mcq-2-152",
        "question": "The spinal cord ends opposite the",
        "correctAnswer": "Lumbar vertebrae",
        "subtopic": "24.11-XI.Nervous system"
      },
      {
        "id": "phys-mcq-2-153",
        "question": "The clinical significance of the posterior inferior cerebellar artery (PICA) is that it supplies",
        "correctAnswer": "Posterior portion of the cerebellum",
        "subtopic": "24.11-XI.Nervous system"
      },
      {
        "id": "phys-mcq-2-154",
        "question": "The posterior column of the spinal cord contains",
        "correctAnswer": "Axons of sensory neurons",
        "subtopic": "24.11-XI.Nervous system"
      },
      {
        "id": "phys-mcq-2-155",
        "question": "The \"fourth ventricle\" of the brain is",
        "correctAnswer": "A structure that contains cerebrospinal fluid (CSF)",
        "subtopic": "24.11-XI.Nervous system"
      },
      {
        "id": "phys-mcq-2-156",
        "question": "Total number of bones in our body is",
        "correctAnswer": "206 bones",
        "subtopic": "24.8-VIII.Musculoskeletal system"
      },
      {
        "id": "phys-mcq-2-157",
        "question": "The commonest cartilage to ossify is",
        "correctAnswer": "Hyaline cartilage",
        "subtopic": "24.8-VIII.Musculoskeletal system"
      },
      {
        "id": "phys-mcq-2-158",
        "question": "The jugular foramen is located between the petrous portion of the temporal bone and the",
        "correctAnswer": "Occipital bone",
        "subtopic": "24.8-VIII.Musculoskeletal system"
      },
      {
        "id": "phys-mcq-2-159",
        "question": "The junction between the sagittal and coronal sutures is called the",
        "correctAnswer": "Bregma",
        "subtopic": "24.8-VIII.Musculoskeletal system"
      },
      {
        "id": "phys-mcq-2-160",
        "question": "The largest and strongest bone of the face is the",
        "correctAnswer": "Mandible",
        "subtopic": "24.8-VIII.Musculoskeletal system"
      },
      {
        "id": "phys-mcq-2-161",
        "question": "Coronoid process is part of which of these bones",
        "correctAnswer": "Mandible",
        "subtopic": "24.8-VIII.Musculoskeletal system"
      },
      {
        "id": "phys-mcq-2-162",
        "question": "Fracture of the surgical neck of the humerus can result in",
        "correctAnswer": "Shoulder dislocation",
        "subtopic": "24.8-VIII.Musculoskeletal system"
      },
      {
        "id": "phys-mcq-2-163",
        "question": "A hinge joint is",
        "correctAnswer": "Elbow",
        "subtopic": "24.8-VIII.Musculoskeletal system"
      },
      {
        "id": "phys-mcq-2-164",
        "question": "In the sitting position, the weight of the body is supported by",
        "correctAnswer": "Ischial tuberosity",
        "subtopic": "24.8-VIII.Musculoskeletal system"
      },
      {
        "id": "phys-mcq-2-165",
        "question": "The course of the sciatic nerve is midway between the ischial tuberosity and the",
        "correctAnswer": "Greater trochanter",
        "subtopic": "24.8-VIII.Musculoskeletal system"
      },
      {
        "id": "phys-mcq-2-166",
        "question": "The tibia is expanded at the lower end and offers a bearing surface to which bone",
        "correctAnswer": "Talus",
        "subtopic": "24.8-VIII.Musculoskeletal system"
      },
      {
        "id": "phys-mcq-2-167",
        "question": "The most stable position of the ankle joint is",
        "correctAnswer": "A Dorsiflexion",
        "subtopic": "24.8-VIII.Musculoskeletal system"
      },
      {
        "id": "phys-mcq-2-168",
        "question": "Hip joint and shoulder joints are",
        "correctAnswer": "Ball and socket joint",
        "subtopic": "24.8-VIII.Musculoskeletal system"
      },
      {
        "id": "phys-mcq-2-169",
        "question": "The nerve that supplies the triceps muscle is the",
        "correctAnswer": "Radial nerve",
        "subtopic": "24.8-VIII.Musculoskeletal system"
      },
      {
        "id": "phys-mcq-2-170",
        "question": "The deep muscle at the back of the leg is the",
        "correctAnswer": "Popliteus",
        "subtopic": "24.8-VIII.Musculoskeletal system"
      }
    ],
    "subjectiveQuestions": [
      {
        "id": "phys-subj-2-1",
        "question": "State the meaning of blood pressure.",
        "type": "Very short",
        "marks": 2,
        "difficulty": 1
      },
      {
        "id": "phys-subj-2-2",
        "question": "Identify two factors that influence blood pressure (BP).",
        "type": "Very short",
        "marks": 2,
        "difficulty": 1
      },
      {
        "id": "phys-subj-2-3",
        "question": "Classify composition of blood.",
        "type": "Very short",
        "marks": 2,
        "difficulty": 1
      },
      {
        "id": "phys-subj-2-4",
        "question": "Summarize the functions of RBCs (Red Blood Cells).",
        "type": "Very short",
        "marks": 2,
        "difficulty": 1
      },
      {
        "id": "phys-subj-2-5",
        "question": "Recognize the formation of blood cells.",
        "type": "Very short",
        "marks": 2,
        "difficulty": 1
      },
      {
        "id": "phys-subj-2-6",
        "question": "Determine the life cycle of red blood cells.",
        "type": "Very short",
        "marks": 2,
        "difficulty": 1
      },
      {
        "id": "phys-subj-2-7",
        "question": "Define disseminated intravascular coagulation (DIC).",
        "type": "Very short",
        "marks": 2,
        "difficulty": 1
      },
      {
        "id": "phys-subj-2-8",
        "question": "Enlist the composition of blood.",
        "type": "Very short",
        "marks": 2,
        "difficulty": 1
      },
      {
        "id": "phys-subj-2-9",
        "question": "Enumerate functions of RBCs (Red Blood Cells) (Two points).",
        "type": "Very short",
        "marks": 2,
        "difficulty": 1
      },
      {
        "id": "phys-subj-2-10",
        "question": "Write the life cycle of red blood cells.",
        "type": "Very short",
        "marks": 2,
        "difficulty": 1
      },
      {
        "id": "phys-subj-2-11",
        "question": "Recognize the normal cerebral blood flow.",
        "type": "Very short",
        "marks": 2,
        "difficulty": 1
      },
      {
        "id": "phys-subj-2-12",
        "question": "Recognize the significance of the blood-brain barrier.",
        "type": "Very short",
        "marks": 2,
        "difficulty": 1
      },
      {
        "id": "phys-subj-2-13",
        "question": "Elaborate on types of connective tissue.",
        "type": "Short",
        "marks": 5,
        "difficulty": 1
      },
      {
        "id": "phys-subj-2-14",
        "question": "Elaborate on structure and functions of nervous tissue.",
        "type": "Short",
        "marks": 5,
        "difficulty": 1
      },
      {
        "id": "phys-subj-2-15",
        "question": "Elaborate on location and functions of epithelial tissues.",
        "type": "Short",
        "marks": 5,
        "difficulty": 1
      },
      {
        "id": "phys-subj-2-16",
        "question": "Elaborate on significance of metaplasia.",
        "type": "Short",
        "marks": 5,
        "difficulty": 1
      },
      {
        "id": "phys-subj-2-17",
        "question": "Elaborate on alveoli with a well-labelled diagram.",
        "type": "Short",
        "marks": 5,
        "difficulty": 1
      },
      {
        "id": "phys-subj-2-18",
        "question": "Elaborate on pulmonary diffusion.",
        "type": "Short",
        "marks": 5,
        "difficulty": 1
      },
      {
        "id": "phys-subj-2-19",
        "question": "Elaborate on the functions of the trachea, draw a diagram of the trachea, and label it.",
        "type": "Short",
        "marks": 5,
        "difficulty": 1
      },
      {
        "id": "phys-subj-2-20",
        "question": "Elaborate on properties and functions of pancreatic juice.",
        "type": "Short",
        "marks": 5,
        "difficulty": 1
      },
      {
        "id": "phys-subj-2-21",
        "question": "Elaborate on composition of pancreatic juice.",
        "type": "Short",
        "marks": 5,
        "difficulty": 1
      },
      {
        "id": "phys-subj-2-22",
        "question": "Explain the principles and techniques of blood pressure measurement.",
        "type": "Short",
        "marks": 5,
        "difficulty": 1
      },
      {
        "id": "phys-subj-2-23",
        "question": "Explain the impact of exercise on the cardiovascular system and the reduction of high blood pressure.",
        "type": "Short",
        "marks": 5,
        "difficulty": 1
      },
      {
        "id": "phys-subj-2-24",
        "question": "Illustrate normal count and formation of platelets.",
        "type": "Short",
        "marks": 5,
        "difficulty": 1
      },
      {
        "id": "phys-subj-2-25",
        "question": "Determine functions of platelets.",
        "type": "Short",
        "marks": 5,
        "difficulty": 1
      }
    ]
  },
  "phys-unit-3": {
    "id": "phys-unit-3",
    "unitNumber": 3,
    "title": "Lymphatic System & Immunity",
    "category": "Immunophysiology & Defense",
    "icon": "🛡️",
    "color": "from-teal-500 to-emerald-600",
    "teachingHours": "60 Hours INC Curriculum (Theory 18h + Practical 42h)",
    "summary": "Detailed functional mechanisms, regulation, homeostatic balance, clinical alterations and official INC competencies of Lymphatic System & Immunity.",
    "objectives": [
      "Describe the physiology of lymphatic system, immunological system and alteration in diseases of lymphatic system.",
      "List down the functions of Lymph.",
      "Explain the circulation of Lymph.",
      "List down the functions of lymphoid organs including Lymph Node, Spleen, Thymus Gland and Tonsils.",
      "Explain Immunity and its types.",
      "Enlist the alteration in diseases of lymphatic system.",
      "The lymphatic system (Figure: 3.1) is part of the circulatory and a vital part of the immune, comprising a network of lymphatic that carry a clear fluid called ‘lymph'. The immune system works to keep these harmful agents out of the body and attacks those that manage to enter. The lymphatic tissue of these organs filters and cleans the lymph of any debris, abnormal cells, or pathogens. The lymphatic system also transports fatty acids from the intestines to the circulatory system.",
      "The lymphatic system consist of"
    ],
    "totalImages": 8,
    "sections": [
      {
        "id": "sec-phys-3-1",
        "title": "Lymph Formation, Composition & Drainage Circulation",
        "content": [
          "The lymphatic system is a vital accessory circulatory and immunological network operating in close collaboration with the cardiovascular grid. It comprises **lymph** (clear, watery interstitial fluid), an extensive arborization of **lymphatic vessels**, and discrete **lymphoid tissues and organs** (lymph nodes, spleen, thymus, tonsils).",
          "**Lymph Formation:** Hydrostatic filtration pressure at the arterial end of capillaries exceeds oncotic reabsorption pressure at the venous end, leaving approximately 2 to 4 liters of filtered fluid in the interstitial spaces daily. This excess interstitial fluid, accompanied by leaked plasma proteins, enters microscopic, blind-ended **lymphatic capillaries** to become lymph.",
          "Lymphatic capillary walls are constructed of overlapping endothelial cells anchored to surrounding connective tissue by elastic filaments. Elevated interstitial pressure forces these flaps open like one-way minivalves, allowing fluid, macromolecules, bacteria, and cellular debris to enter; elevated intraluminal pressure snaps the flaps shut to prevent retrograde escape.",
          "Lymph is propelled through collecting vessels equipped with bicuspid valves by skeletal muscle contractions, respiratory thoracic pressure fluctuations, smooth muscle vasomotion, and arterial pulsations. It drains into two major terminal ducts: the **Right Lymphatic Duct** (draining right upper quadrant) and the **Thoracic Duct** (originating from the cisterna chyli at L2, draining the remaining 75% of the body into the left subclavian-internal jugular venous angle)."
        ],
        "points": [
          "**Starling Equilibrium & Edema:** Normal lymphatic drainage balances microvascular fluid filtration. Blockage or resection of lymphatic trunks causes interstitial fluid accumulation and disfiguring **lymphedema**.",
          "**Lacteals & Chyle:** Specialized lymphatic capillaries in small intestinal villi absorbing dietary long-chain triglycerides and fat-soluble vitamins (A, D, E, K), transporting milky lipid-rich lymph known as **chyle**.",
          "**Thoracic Duct Trauma:** Traumatic laceration or thoracic surgical injury to the thoracic duct discharges chyle into the pleural cavity, producing **chylothorax**.",
          "**Cisterna Chyli:** Sac-like dilation anterior to L1-L2 vertebrae receiving fatty lymph from intestinal trunks and lower limb lumbar trunks."
        ],
        "clinicalPearl": "**Post-Axillary Node Dissection Lymphedema & Elephantiasis:** Surgical resection of axillary lymph nodes during breast cancer mastectomy interrupts major lymphatic conduits, predisposing the ipsilateral arm to chronic, refractory **lymphedema**. Strict nursing guidelines mandate no blood pressure measurements, phlebotomy, or IV starts on the affected limb. Chronic infection by the filarial nematode *Wuchereria bancrofti* blocks lower limb lymphatics, producing severe, debilitating **elephantiasis**.",
        "images": [
          {
            "src": "/images/physiology/3_image1.png",
            "caption": "Figure 3.1: Overview of the Lymphatic System.",
            "alt": "Lymphatic System"
          }
        ],
        "tables": []
      },
      {
        "id": "sec-phys-3-2",
        "title": "Lymphoid Organs: Lymph Nodes, Spleen & Thymus",
        "content": [
          "Lymphoid organs are categorized into **Primary Lymphoid Organs** (sites of lymphocyte generation and education: **Red Bone Marrow** and **Thymus**) and **Secondary Lymphoid Organs** (sites where immunocompetent lymphocytes encounter antigens and mount immune defenses: **Lymph Nodes, Spleen, and Tonsils**).",
          "**Lymph Nodes:** Bean-shaped encapsulated filters (1-25 mm) clustered along lymphatic conduits (cervical, axillary, mesenteric, inguinal). Lymph enters via multiple convex afferent vessels, percolates slowly through subcapsular and medullary sinuses lined by phagocytic macrophages that destroy bacteria and debris, and exits through only 1 or 2 efferent vessels at the hilum. Follicles in the outer cortex contain B-cells and germinal centers; the paracortex houses T-cells; and the medulla contains antibody-secreting plasma cells.",
          "**The Spleen:** Largest secondary lymphoid organ, located in the left hypochondrium. Comprises **White Pulp** (lymphoid sheaths around central arterioles containing T and B lymphocytes mounting adaptive defenses against blood-borne pathogens) and **Red Pulp** (splenic cords of Billroth and sinusoids for mechanical filtration and destruction of aged/damaged erythrocytes, recycling iron to bone marrow and storing one-third of the body's platelets).",
          "**The Thymus:** Bilobed superior mediastinal organ essential for T-lymphocyte maturation and self-tolerance education (positive MHC selection and negative self-antigen deletion). Secretes **thymosin** and thymopoietin; reaches peak functional activity in childhood before undergoing progressive post-pubertal fatty involution.",
          "**Tonsils:** Form **Waldeyer's ring** (pharyngeal/adenoid, palatine, lingual, tubal) guarding mucosal portals of entry against inhaled and ingested microbes."
        ],
        "points": [
          "**Lymph Node Percolation Resistance:** Multiple afferent vessels entering versus few efferent vessels exiting slows lymph velocity, providing prolonged contact time for macrophage phagocytosis and dendritic antigen presentation.",
          "**Splenic Cords of Billroth:** Slit-like endothelial fenestrations in red pulp act as mechanical sieves; rigid, aged, or spherocytic RBCs cannot deform to squeeze through, becoming trapped and phagocytosed by resident macrophages.",
          "**Thymic Education & Central Tolerance:** 95% of developing thymocytes fail positive or negative selection and undergo apoptosis within the thymic cortex, preventing release of self-reactive T-cells that would cause fatal autoimmunity.",
          "**Waldeyer's Ring Defense:** Traps airborne and alimentary pathogens, initiating secretory IgA and IgG synthesis."
        ],
        "clinicalPearl": "**Post-Splenectomy Sepsis & Overwhelming Infection:** Following traumatic splenectomy, patients permanently lose splenic macrophage clearance of poorly opsonized encapsulated bacteria (*Streptococcus pneumoniae, Neisseria meningitidis, Haemophilus influenzae*), creating lifelong risk of rapidly fatal **Overwhelming Post-Splenectomy Infection (OPSI)**. Patients must receive prophylactic pneumococcal, meningococcal, and Hib vaccinations and carry emergency antibiotic supplies.",
        "images": [
          {
            "src": "/images/physiology/3_image2.png",
            "caption": "Figure 3.2: Cross-section of a lymph node.",
            "alt": "Cross section of lymph node"
          },
          {
            "src": "/images/physiology/3_image3.png",
            "caption": "Figure 3.3: Cross-section and vascular architecture of the spleen.",
            "alt": "Cross section of spleen"
          },
          {
            "src": "/images/physiology/3_image4.png",
            "caption": "Figure 3.4: Anatomy and histology of the thymus gland.",
            "alt": "Thymus gland"
          },
          {
            "src": "/images/physiology/3_image5.png",
            "caption": "Figure 3.5: Palatine and pharyngeal tonsils.",
            "alt": "Tonsils"
          }
        ],
        "tables": []
      },
      {
        "id": "sec-phys-3-3",
        "title": "Innate vs. Adaptive Immunity & Antigen-Antibody Dynamics",
        "content": [
          "The human immune system deploys two coordinated lines of physiological defense: **Innate (Non-Specific) Immunity** and **Adaptive (Specific) Immunity**.",
          "**Innate Immunity:** Present at birth, acting instantaneously without prior antigen exposure or immunologic memory. Operates through physical and chemical barriers (intact skin, gastric HCl, lysozyme in tears/saliva, ciliated mucous escalators), cellular sentinels (**neutrophils, macrophages, natural killer [NK] cells, dendritic cells**), and plasma protein cascades (the **complement system** [classical, alternative, and lectin pathways] driving opsonization, leukocyte chemotaxis, and assembly of the lytic **Membrane Attack Complex / MAC** [C5b-C9]).",
          "**Adaptive Immunity:** Characterized by exquisite antigen specificity, clonal selection, and long-lived immunologic memory. Comprises two cooperative branches:",
          "1. **Cell-Mediated Immunity:** Directed by **T-lymphocytes**; **CD8+ Cytotoxic T-cells (CTLs)** recognize foreign intracellular antigens presented on **MHC Class I** molecules (viral infections, tumors), releasing **perforin** (forming membrane pores) and **granzymes** (triggering apoptosis). **CD4+ Helper T-cells** recognize antigens on **MHC Class II** molecules, secreting interleukins (IL-2, IFN-gamma) to coordinate all immune arms.",
          "2. **Humoral (Antibody-Mediated) Immunity:** Directed by **B-lymphocytes**; upon antigenic activation and T-helper stimulation, B-cells proliferate into memory B-cells and **plasma cells** synthesizing 2,000 antibody molecules per second.",
          "**Antigen-Antibody Reactions:** Antibodies neutralize toxins, agglutinate cellular pathogens, precipitate soluble antigens, activate complement, and opsonize microbes for phagocytosis."
        ],
        "points": [
          "**Five Immunoglobulin Classes:** **IgG** (80%, crosses placenta, secondary response), **IgA** (secretory dimer in breast milk, tears, saliva), **IgM** (pentamer, earliest primary antibody, potent agglutinator), **IgE** (allergy, binds mast cells/basophils, antiparasitic), and **IgD** (B-cell receptor).",
          "**Primary vs. Secondary Immune Response:** Primary response exhibits a 7-14 day latent lag phase with predominant low-affinity IgM; Secondary (anamnestic) response driven by memory B-cells produces a rapid, massive, high-affinity IgG surge within 24-48 hours.",
          "**Active vs. Passive Immunity:** Active immunity (natural infection or vaccination) induces long-term endogenous memory; Passive immunity (maternal IgG/IgA or therapeutic antivenom/hyperimmune globulin) provides immediate but temporary protection without memory.",
          "**Natural Killer (NK) Cells:** Lymphocytes that destroy virus-infected and malignant cells lacking normal MHC Class I self-markers without requiring prior sensitization."
        ],
        "clinicalPearl": "**Severe Combined Immunodeficiency (SCID) & Passive Tetanus Prophylaxis:** In SCID ('bubble boy disease'), genetic absence of adenosine deaminase (ADA) or IL-2 receptor gamma chain halts both T and B-cell development, causing fatal opportunistic infections in infancy unless treated with bone marrow transplantation. Following a contaminated puncture wound in an unvaccinated patient, administering **Tetanus Toxoid** (active vaccine) alone is insufficient; **Tetanus Immune Globulin (TIG)** (passive preformed antibodies) must be administered simultaneously at an anatomically separate site to provide immediate toxin neutralization.",
        "images": [
          {
            "src": "/images/physiology/3_image6.png",
            "caption": "Figure 3.6: Lymph fluid circulation and Starling forces.",
            "alt": "Lymph circulation"
          },
          {
            "src": "/images/physiology/3_image7.png",
            "caption": "Figure 3.7: Antigen-antibody interaction and clonal selection.",
            "alt": "Antigen-antibody reaction"
          }
        ],
        "tables": []
      },
      {
        "id": "sec-phys-3-4",
        "title": "The Inflammatory Response & Immunological Alterations in Disease",
        "content": [
          "**Inflammation** is the fundamental physiological vascular and cellular protective response elicited by living vascularized tissue in response to mechanical trauma, chemical irritation, thermal burn, or microbial infection. Its primary objectives are to dilute, isolate, and neutralize the injurious agent, clear necrotic debris, and initiate wound healing.",
          "Acute inflammation is characterized by five classic cardinal signs: **Rubor** (redness), **Calor** (heat), **Tumor** (swelling), **Dolor** (pain), and **Functio Laesa** (loss of function).",
          "Physiologically, acute inflammation executes a coordinated two-phase sequence: (1) **Vascular Phase** (transient arteriolar vasoconstriction followed by sustained active vasodilation mediated by **histamine, nitric oxide, and bradykinin**, increasing local blood flow [rubor and calor], coupled with increased microvascular permeability permitting protein-rich exudate to leak into interstitium [tumor]), and (2) **Cellular Phase** (neutrophil margination, rolling via selectins, firm adhesion via integrins, **diapedesis / extravasation** through endothelial junctions, and directional **chemotaxis** toward bacterial peptides and complement C5a).",
          "Pathological alterations of the immune system include **Hypersensitivity Reactions** (Types I through IV, ranging from allergic anaphylaxis to contact dermatitis), **Autoimmune Diseases** (breakdown of self-tolerance, e.g., Systemic Lupus Erythematosus, Rheumatoid Arthritis, Type 1 Diabetes), and **Immunodeficiency Syndromes** (congenital or acquired, notably HIV/AIDS destroying CD4+ T-helper cells)."
        ],
        "points": [
          "**Chemical Inflammatory Mediators:** Histamine and Serotonin (immediate vasodilation and vascular permeability); Prostaglandins (induce vasodilation, pain sensitization, and hypothalamic fever); Leukotrienes (potent bronchoconstrictors and neutrophil chemotactic factors); Bradykinin (powerful pain stimulator).",
          "**Exudate vs. Transudate:** Inflammatory **exudate** is turbid, high in protein (> 3.0 g/dL), high in cellular debris, and has specific gravity > 1.020 (increased vascular permeability); Non-inflammatory **transudate** is clear, low in protein (< 3.0 g/dL), caused by elevated hydrostatic pressure or low oncotic pressure.",
          "**Type I Immediate Hypersensitivity (Anaphylaxis):** IgE antibodies bound to Fc receptors on tissue mast cells and basophils cross-link with allergen, triggering explosive degranulation of histamine, leukotrienes, and prostaglandins, causing systemic vasodilation, airway constriction, and shock.",
          "**HIV/AIDS Pathophysiology:** HIV gp120 binds CD4 receptors and CCR5 co-receptors on T-helper lymphocytes, replicating and destroying CD4+ cells; when CD4+ counts plunge below 200 cells/μL, life-threatening opportunistic infections (*Pneumocystis jirovecii*, toxoplasmosis, Kaposi sarcoma) define clinical AIDS."
        ],
        "clinicalPearl": "**Anaphylactic Shock Emergency Protocol:** Acute anaphylaxis from food, drug (penicillin), or insect sting allergy is an immediate airway emergency. Intramuscular injection of **Epinephrine (1:1,000, 0.3-0.5 mg IM into anterolateral vastus lateralis)** is the first-line lifesaving medication, rapidly reversing hypotension through alpha-1 vasoconstriction, relieving bronchospasm through beta-2 bronchodilation, and halting further mast cell mediator release. Antihistamines and corticosteroids are secondary adjuncts and must NEVER delay epinephrine administration.",
        "images": [
          {
            "src": "/images/physiology/3_image8.png",
            "caption": "Figure 3.8: Cellular inflammatory response and leukocyte extravasation.",
            "alt": "Inflammatory response"
          }
        ],
        "tables": []
      }
    ],
    "mcqs": [
      {
        "id": "phys-mcq-3-171",
        "question": "The muscle that is called a \"ribbon-like\" muscle is the",
        "correctAnswer": "Sartorius",
        "subtopic": "24.8-VIII.Musculoskeletal system"
      },
      {
        "id": "phys-mcq-3-172",
        "question": "The length of the spinal cord varies among individuals, but on average, it ranges from about",
        "correctAnswer": "40 to 45 centimeters",
        "subtopic": "24.11-XI.Nervous system"
      },
      {
        "id": "phys-mcq-3-173",
        "question": "The roots of the spinal nerves below the first lumbar vertebrae are called the",
        "correctAnswer": "Lumbar nerves",
        "subtopic": "24.11-XI.Nervous system"
      },
      {
        "id": "phys-mcq-3-174",
        "question": "The cerebellum and cerebral hemisphere are separated by",
        "correctAnswer": "Tentorium cerebelli",
        "subtopic": "24.11-XI.Nervous system"
      },
      {
        "id": "phys-mcq-3-175",
        "question": "Which of the following neuroglia primarily have a metabolic function?",
        "correctAnswer": "Protoplasmic astrocytes",
        "subtopic": "24.11-XI.Nervous system"
      },
      {
        "id": "phys-mcq-3-176",
        "question": "The spinal cord extends from the foramen magnum to",
        "correctAnswer": "1st Lumbar vertebrae",
        "subtopic": "24.11-XI.Nervous system"
      },
      {
        "id": "phys-mcq-3-177",
        "question": "What muscle does the trochlear nerve innervate?",
        "correctAnswer": "Superior oblique",
        "subtopic": "24.11-XI.Nervous system"
      },
      {
        "id": "phys-mcq-3-178",
        "question": "Which of the following terms does not apply to the bundle of nerve fibers?",
        "correctAnswer": "Nucleus",
        "subtopic": "24.11-XI.Nervous system"
      },
      {
        "id": "phys-mcq-3-179",
        "question": "Which of the following structures surrounds the fourth ventricle in the brain?",
        "correctAnswer": "Cerebellum",
        "subtopic": "24.11-XI.Nervous system"
      },
      {
        "id": "phys-mcq-3-180",
        "question": "How are the frontal and parietal lobes of the cerebrum separated?",
        "correctAnswer": "Central sulcus",
        "subtopic": "24.11-XI.Nervous system"
      },
      {
        "id": "phys-mcq-3-181",
        "question": "What structure stretches over the posterior cranial fossa and separates the occipital lobes of the cerebellum?",
        "correctAnswer": "Tentorium cerebelli",
        "subtopic": "24.11-XI.Nervous system"
      },
      {
        "id": "phys-mcq-3-182",
        "question": "Which of the following is the smallest of the cranial nerves?",
        "correctAnswer": "Trochlear nerve (CN IV)",
        "subtopic": "24.11-XI.Nervous system"
      },
      {
        "id": "phys-mcq-3-183",
        "question": "Bilateral facial nerve injury at the pons-medullary junction could result in",
        "correctAnswer": "Locked-in syndrome",
        "subtopic": "24.11-XI.Nervous system"
      },
      {
        "id": "phys-mcq-3-184",
        "question": "The nucleus tractus solitarius is present in",
        "correctAnswer": "Medulla oblongata",
        "subtopic": "24.11-XI.Nervous system"
      },
      {
        "id": "phys-mcq-3-185",
        "question": "At birth, the spinal cord extends up to",
        "correctAnswer": "The first lumbar vertebra (L1)",
        "subtopic": "24.11-XI.Nervous system"
      },
      {
        "id": "phys-mcq-3-186",
        "question": "What type of tissue primarily composes intervertebral discs?",
        "correctAnswer": "Cartilage",
        "subtopic": "24.11-XI.Nervous system"
      },
      {
        "id": "phys-mcq-3-187",
        "question": "What structures are contained within the umbilical cord?",
        "correctAnswer": "Arteries and veins",
        "subtopic": "24.11-XI.Nervous system"
      },
      {
        "id": "phys-mcq-3-188",
        "question": "What is a characteristic feature of the first cervical vertebra?",
        "correctAnswer": "Dens (odontoid process)",
        "subtopic": "24.11-XI.Nervous system"
      },
      {
        "id": "phys-mcq-3-189",
        "question": "Wrist drop is seen in the injury of which nerve?",
        "correctAnswer": "Radial nerve",
        "subtopic": "24.11-XI.Nervous system"
      },
      {
        "id": "phys-mcq-3-190",
        "question": "What is another term for the \"musicians nerve\"?",
        "correctAnswer": "Ulnar nerve",
        "subtopic": "24.11-XI.Nervous system"
      },
      {
        "id": "phys-mcq-3-191",
        "question": "What is another term for the \"labourers nerve\"?",
        "correctAnswer": "Radial nerve",
        "subtopic": "24.11-XI.Nervous system"
      },
      {
        "id": "phys-mcq-3-192",
        "question": "Which artery is present in the anatomical snuff box?",
        "correctAnswer": "Radial artery",
        "subtopic": "24.11-XI.Nervous system"
      },
      {
        "id": "phys-mcq-3-193",
        "question": "The anterior interosseous nerve is a branch of which nerve?",
        "correctAnswer": "Median nerve",
        "subtopic": "24.11-XI.Nervous system"
      },
      {
        "id": "phys-mcq-3-194",
        "question": "The brachial plexus is formed by the union of which spinal nerves?",
        "correctAnswer": "Cervical and thoracic nerves",
        "subtopic": "24.11-XI.Nervous system"
      },
      {
        "id": "phys-mcq-3-195",
        "question": "The main motor nerve of the front of the forearm is",
        "correctAnswer": "Median nerve",
        "subtopic": "24.11-XI.Nervous system"
      },
      {
        "id": "phys-mcq-3-196",
        "question": "The thickest nerve in the human body is",
        "correctAnswer": "Sciatic",
        "subtopic": "24.11-XI.Nervous system"
      },
      {
        "id": "phys-mcq-3-197",
        "question": "The Sinoatrial (SA) node is",
        "correctAnswer": "A pacemaker of the heart",
        "subtopic": "24.11-XI.Nervous system"
      },
      {
        "id": "phys-mcq-3-198",
        "question": "The digestive function in a cell is present in",
        "correctAnswer": "Lysosomes",
        "subtopic": "24.1-I. General Physiology–Basic concepts"
      },
      {
        "id": "phys-mcq-3-199",
        "question": "The powerhouse of a cell is",
        "correctAnswer": "Mitochondria",
        "subtopic": "24.1-I. General Physiology–Basic concepts"
      },
      {
        "id": "phys-mcq-3-200",
        "question": "The fundamental unit of life is the",
        "correctAnswer": "Cell",
        "subtopic": "24.1-I. General Physiology–Basic concepts"
      },
      {
        "id": "phys-mcq-3-201",
        "question": "The increase in the number of cells due to increased cell division is",
        "correctAnswer": "Hyperplasia",
        "subtopic": "24.1-I. General Physiology–Basic concepts"
      },
      {
        "id": "phys-mcq-3-202",
        "question": "The garbage system of the cell is",
        "correctAnswer": "Lysosomes",
        "subtopic": "24.1-I. General Physiology–Basic concepts"
      },
      {
        "id": "phys-mcq-3-203",
        "question": "Deoxyribonucleic acid carries the",
        "correctAnswer": "Genetic information.",
        "subtopic": "24.1-I. General Physiology–Basic concepts"
      },
      {
        "id": "phys-mcq-3-204",
        "question": "Breakdown of fatty acids by means of a process called",
        "correctAnswer": "Beta oxidation",
        "subtopic": "24.1-I. General Physiology–Basic concepts"
      },
      {
        "id": "phys-mcq-3-205",
        "question": "The structure that is formed by two or more primary types of tissues is called",
        "correctAnswer": "Organ.",
        "subtopic": "24.1-I. General Physiology–Basic concepts"
      },
      {
        "id": "phys-mcq-3-206",
        "question": "What is the cell membrane otherwise called?",
        "correctAnswer": "Plasma membrane",
        "subtopic": "24.1-I. General Physiology–Basic concepts"
      },
      {
        "id": "phys-mcq-3-207",
        "question": "A substance insoluble in water and repelled by water is called",
        "correctAnswer": "Lipids",
        "subtopic": "24.1-I. General Physiology–Basic concepts"
      },
      {
        "id": "phys-mcq-3-208",
        "question": "These are called protein factories",
        "correctAnswer": "Ribosomes",
        "subtopic": "24.1-I. General Physiology–Basic concepts"
      },
      {
        "id": "phys-mcq-3-209",
        "question": "What lines the cavities of the joints?",
        "correctAnswer": "Synovial membrane",
        "subtopic": "24.1-I. General Physiology–Basic concepts"
      },
      {
        "id": "phys-mcq-3-210",
        "question": "The capacity of the body to resist pathogenic agents is called",
        "correctAnswer": "Immunity",
        "subtopic": "24.1-I. General Physiology–Basic concepts"
      },
      {
        "id": "phys-mcq-3-211",
        "question": "The substances that induce specific immune reactions in the body are termed",
        "correctAnswer": "Antigens",
        "subtopic": "24.1-I. General Physiology–Basic concepts"
      },
      {
        "id": "phys-mcq-3-212",
        "question": "The procedure by which the body is prepared to fight against a specific disease is called",
        "correctAnswer": "Immunization",
        "subtopic": "24.1-I. General Physiology–Basic concepts"
      },
      {
        "id": "phys-mcq-3-213",
        "question": "The clumping together of platelets is called",
        "correctAnswer": "Agglutination",
        "subtopic": "24.1-I. General Physiology–Basic concepts"
      },
      {
        "id": "phys-mcq-3-214",
        "question": "The clear, straw-colored fluid that is left after blood has clotted is",
        "correctAnswer": "Serum",
        "subtopic": "24.1-I. General Physiology–Basic concepts"
      },
      {
        "id": "phys-mcq-3-215",
        "question": "A carrier protein that carries only one substance in a single direction is called",
        "correctAnswer": "Uniport.",
        "subtopic": "24.1-I. General Physiology–Basic concepts"
      },
      {
        "id": "phys-mcq-3-216",
        "question": "A carrier protein that transports two different substances in the same direction is called",
        "correctAnswer": "Symport",
        "subtopic": "24.1-I. General Physiology–Basic concepts"
      },
      {
        "id": "phys-mcq-3-217",
        "question": "How much water is contained in the young adult male?",
        "correctAnswer": "60-65%",
        "subtopic": "24.1-I. General Physiology–Basic concepts"
      },
      {
        "id": "phys-mcq-3-218",
        "question": "The part of the brain that plays a vital role in the maintenance of normal body temperature is",
        "correctAnswer": "Hypothalamus",
        "subtopic": "24.9-IX. Renal system"
      },
      {
        "id": "phys-mcq-3-219",
        "question": "The measure of a fluid's capability to create osmotic pressure is called",
        "correctAnswer": "Osmolarlity",
        "subtopic": "24.1-I. General Physiology–Basic concepts"
      },
      {
        "id": "phys-mcq-3-220",
        "question": "Excessive loss of water from the body is called",
        "correctAnswer": "Dehydration",
        "subtopic": "24.1-I. General Physiology–Basic concepts"
      },
      {
        "id": "phys-mcq-3-221",
        "question": "Great increase in the water content of the body is called",
        "correctAnswer": "Over hydration",
        "subtopic": "24.1-I. General Physiology–Basic concepts"
      },
      {
        "id": "phys-mcq-3-222",
        "question": "It is a connective tissue in fluid form",
        "correctAnswer": "Blood",
        "subtopic": "24.1-I. General Physiology–Basic concepts"
      },
      {
        "id": "phys-mcq-3-223",
        "question": "Bones form by a process called",
        "correctAnswer": "Ossification",
        "subtopic": "24.8-VIII.Musculoskeletal system"
      },
      {
        "id": "phys-mcq-3-224",
        "question": "The total number of vertebrae during early development is",
        "correctAnswer": "33",
        "subtopic": "24.8-VIII.Musculoskeletal system"
      },
      {
        "id": "phys-mcq-3-225",
        "question": "Another name for zygomatic bones is",
        "correctAnswer": "Cheekbones",
        "subtopic": "24.8-VIII.Musculoskeletal system"
      },
      {
        "id": "phys-mcq-3-226",
        "question": "Lateral bending of the vertebral column is called",
        "correctAnswer": "Scoliosis",
        "subtopic": "24.8-VIII.Musculoskeletal system"
      },
      {
        "id": "phys-mcq-3-227",
        "question": "The process by which bone forms is called",
        "correctAnswer": "Osteogenesis",
        "subtopic": "24.8-VIII.Musculoskeletal system"
      },
      {
        "id": "phys-mcq-3-228",
        "question": "It surrounds the external bone surface wherever it is not covered by articular cartilage",
        "correctAnswer": "Periosteum",
        "subtopic": "24.8-VIII.Musculoskeletal system"
      },
      {
        "id": "phys-mcq-3-229",
        "question": "A break in a bone is called",
        "correctAnswer": "Fracture",
        "subtopic": "24.8-VIII.Musculoskeletal system"
      },
      {
        "id": "phys-mcq-3-230",
        "question": "It is a partial fracture in which one side of the bone is broken and the other side bends",
        "correctAnswer": "Greenstick fracture",
        "subtopic": "24.8-VIII.Musculoskeletal system"
      },
      {
        "id": "phys-mcq-3-231",
        "question": "How many skull bones are present in the human body?",
        "correctAnswer": "22",
        "subtopic": "24.8-VIII.Musculoskeletal system"
      },
      {
        "id": "phys-mcq-3-232",
        "question": "How many facial bones are present in the human body?",
        "correctAnswer": "14",
        "subtopic": "24.8-VIII.Musculoskeletal system"
      },
      {
        "id": "phys-mcq-3-233",
        "question": "The soft spots between the cranial bones are called",
        "correctAnswer": "Fontanels",
        "subtopic": "24.8-VIII.Musculoskeletal system"
      },
      {
        "id": "phys-mcq-3-234",
        "question": "The longest, heaviest, and strongest bone in the body is",
        "correctAnswer": "Femur",
        "subtopic": "24.8-VIII.Musculoskeletal system"
      },
      {
        "id": "phys-mcq-3-235",
        "question": "A small triangular bone located anterior to the knee joint is",
        "correctAnswer": "Patella",
        "subtopic": "24.8-VIII.Musculoskeletal system"
      },
      {
        "id": "phys-mcq-3-236",
        "question": "The ball-like surface of one bone fitting into a cup-like depression of another bone is",
        "correctAnswer": "Ball-and-socket joints",
        "subtopic": "24.8-VIII.Musculoskeletal system"
      },
      {
        "id": "phys-mcq-3-237",
        "question": "The muscles that contain a large quantity of myoglobin are called",
        "correctAnswer": "Red muscle",
        "subtopic": "24.8-VIII.Musculoskeletal system"
      },
      {
        "id": "phys-mcq-3-238",
        "question": "How many muscles are there in the human body?",
        "correctAnswer": "600",
        "subtopic": "24.8-VIII.Musculoskeletal system"
      },
      {
        "id": "phys-mcq-3-239",
        "question": "The smallest part of the muscle is called",
        "correctAnswer": "Sarcomere",
        "subtopic": "24.8-VIII.Musculoskeletal system"
      },
      {
        "id": "phys-mcq-3-240",
        "question": "Complete paralysis of the muscle is called",
        "correctAnswer": "Palsy",
        "subtopic": "24.8-VIII.Musculoskeletal system"
      },
      {
        "id": "phys-mcq-3-241",
        "question": "The structural and functional unit of the nervous system is",
        "correctAnswer": "Neurone",
        "subtopic": "24.11-XI.Nervous system"
      },
      {
        "id": "phys-mcq-3-242",
        "question": "The neurons that have only one pole are",
        "correctAnswer": "Unipolar neurons",
        "subtopic": "24.11-XI.Nervous system"
      },
      {
        "id": "phys-mcq-3-243",
        "question": "The longer process of the nerve cell is",
        "correctAnswer": "Axon",
        "subtopic": "24.11-XI.Nervous system"
      },
      {
        "id": "phys-mcq-3-244",
        "question": "It is formed by concentric layers of proteins and alternating with lipids",
        "correctAnswer": "Myelin sheath",
        "subtopic": "24.11-XI.Nervous system"
      },
      {
        "id": "phys-mcq-3-245",
        "question": "The ability of a nerve fiber to transmit impulses from the area of stimulation to other areas is",
        "correctAnswer": "Conductivity",
        "subtopic": "24.11-XI.Nervous system"
      },
      {
        "id": "phys-mcq-3-246",
        "question": "The form of conduction of a nerve impulse in which the impulses jump from one node to another is",
        "correctAnswer": "Saltatory conduction",
        "subtopic": "24.11-XI.Nervous system"
      },
      {
        "id": "phys-mcq-3-247",
        "question": "The pumping action of the heart is primarily responsible due to",
        "correctAnswer": "Contraction of cardiac muscle fibers",
        "subtopic": "24.4-IV. Circulatory and Lymphatic system"
      },
      {
        "id": "phys-mcq-3-248",
        "question": "The structure in the heart that generates impulses for heartbeat is the",
        "correctAnswer": "Sinoatrial (SA) node",
        "subtopic": "24.4-IV. Circulatory and Lymphatic system"
      },
      {
        "id": "phys-mcq-3-249",
        "question": "The ability of a living tissue to respond to",
        "correctAnswer": "Irritability",
        "subtopic": "24.4-IV. Circulatory and Lymphatic system"
      },
      {
        "id": "phys-mcq-3-250",
        "question": "The ability of a tissue to produce its own impulses regularly is known as",
        "correctAnswer": "Excitability",
        "subtopic": "24.4-IV. Circulatory and Lymphatic system"
      },
      {
        "id": "phys-mcq-3-251",
        "question": "The contraction and relaxation of the atria are called",
        "correctAnswer": "Systole and diastole",
        "subtopic": "24.4-IV. Circulatory and Lymphatic system"
      },
      {
        "id": "phys-mcq-3-252",
        "question": "The type of muscular contraction where tension increases without any change in the length of muscle fibers is called",
        "correctAnswer": "Isometric contraction",
        "subtopic": "24.4-IV. Circulatory and Lymphatic system"
      },
      {
        "id": "phys-mcq-3-253",
        "question": "After the sudden rush of blood, ventricular filling becomes slow due to",
        "correctAnswer": "Atrial diastole",
        "subtopic": "24.4-IV. Circulatory and Lymphatic system"
      },
      {
        "id": "phys-mcq-3-254",
        "question": "A low-pitched sound that is produced during the rapid filling period of the cardiac cycle is called",
        "correctAnswer": "S3 heart sound",
        "subtopic": "24.4-IV. Circulatory and Lymphatic system"
      },
      {
        "id": "phys-mcq-3-255",
        "question": "The weakness of a valve in the heart, which can lead to its improper functioning, is known as",
        "correctAnswer": "Regurgitation",
        "subtopic": "24.4-IV. Circulatory and Lymphatic system"
      }
    ],
    "subjectiveQuestions": [
      {
        "id": "phys-subj-3-1",
        "question": "Write formation and composition of lymph.",
        "type": "Very short",
        "marks": 2,
        "difficulty": 1
      },
      {
        "id": "phys-subj-3-2",
        "question": "Enlist functions of the lymphatic system.",
        "type": "Short",
        "marks": 5,
        "difficulty": 1
      },
      {
        "id": "phys-subj-3-3",
        "question": "Illustrate morphological features and functions of lymphocytes.",
        "type": "Short",
        "marks": 5,
        "difficulty": 1
      },
      {
        "id": "phys-subj-3-4",
        "question": "Define the lymphatic system, explain components and functions of the lymphatic system. (5+5)",
        "type": "Essay",
        "marks": 10,
        "difficulty": 1
      }
    ]
  },
  "phys-unit-4": {
    "id": "phys-unit-4",
    "unitNumber": 4,
    "title": "Musculoskeletal Physiology",
    "category": "Neuromuscular Transmission & Bone",
    "icon": "💪",
    "color": "from-amber-500 to-orange-600",
    "teachingHours": "60 Hours INC Curriculum (Theory 18h + Practical 42h)",
    "summary": "Detailed functional mechanisms, regulation, homeostatic balance, clinical alterations and official INC competencies of Musculoskeletal Physiology.",
    "objectives": [
      "Describe the functions of the Muscular System.",
      "Describe the properties of the Muscular Tissue.",
      "Describe the Muscle Tone, physiology of Muscle Contraction.",
      "Explain the Neuromuscular Transmission.",
      "Enlist alteration in diseases of the Muscular System.",
      "The muscular system is a system consisting of skeletal, smooth and cardiac muscles. It permits movement of the body, maintains posture, and circulates blood throughout the body. The muscular system invertebrate is controlled through the nervous system, although some muscles such as the cardiac can be completely autonomous. Together with the skeletal system it forms the musculoskeletal system, which is responsible for movement of the human. There are three kinds of muscle (Figure 4.1):",
      "Skeletal Muscle: connects to bones by tendons and causes movement about joints. Each whole skeletal muscle contains many muscle cells or fibers. Skeletal muscle contracts as the result of events that are initiated by action potentials generated by transmission at the neuromuscular junction.",
      "Cardiac Muscle: is the muscle that forms the heart. In many ways it is similar to skeletal muscle. However, there are several important differences. Unlike skeletal muscle fibers, individual cardiac muscle cells are electrically coupled. Also, cardiac muscle cells in some parts of the heart generate spontaneous rhythmic action potentials (pacemaker activity)."
    ],
    "totalImages": 2,
    "sections": [
      {
        "id": "sec-phys-4-1",
        "title": "Properties of Muscular Tissue & The Sliding Filament Contractile Mechanism",
        "content": [
          "Muscle tissue is an excitable contractile biological tissue that converts chemical energy derived from ATP hydrolysis into directed mechanical force, movement, visceral transport, and body heat (thermogenesis). Muscle comprises 40% to 50% of total adult body mass.",
          "All muscle tissues exhibit four fundamental physiological properties: (1) **Electrical Excitability** (ability to generate action potentials across the sarcolemma in response to electrical or chemical stimuli), (2) **Contractility** (ability to generate tension and shorten forcibly upon excitation), (3) **Extensibility** (ability to stretch without damage), and (4) **Elasticity** (ability to recoil to original resting length following contraction or stretch).",
          "The human body contains three distinct muscle tissue varieties: **Skeletal Muscle** (striated, voluntary, multinucleated, rapid contraction), **Cardiac Muscle** (striated, involuntary, branching with intercalated discs and gap junctions, intrinsic autorhythmicity), and **Smooth Muscle** (non-striated, involuntary, spindle-shaped single-nucleus cells operating sustained tonic contractions in visceral walls).",
          "**The Sliding Filament Mechanism of Contraction:** Skeletal muscle contraction occurs at the level of the repeating **sarcomere** (bounded by Z-discs). Thin filaments (actin, tropomyosin, troponin) slide inward toward the center of the sarcomere (M-line) along thick filaments (myosin). During contraction, the sarcomere shortens, the **I-band narrows**, the **H-zone disappears**, while the **A-band length remains completely unchanged**."
        ],
        "points": [
          "**Troponin Complex Subunits:** Troponin-T (binds tropomyosin), Troponin-I (inhibitory, blocks actin active sites at rest), and Troponin-C (binds calcium ions Ca2+). When intracellular Ca2+ rises to 10^-5 M, Ca2+ binds Troponin-C, inducing a conformational shift that rolls tropomyosin away from actin active binding sites.",
          "**Four Steps of Cross-Bridge Cycling:** (1) **Cross-bridge formation:** Energized myosin head (with ADP + Pi) binds to exposed actin active site; (2) **Power stroke:** Pi and ADP are released; the myosin head pivots 45 degrees, pulling the thin filament toward the sarcomere center; (3) **Cross-bridge detachment:** A new ATP molecule binds the myosin head, triggering immediate release from actin; (4) **ATP hydrolysis / cocking:** Myosin ATPase hydrolyzes ATP into ADP + Pi, re-cocking the head into the high-energy configuration ready for the next cycle.",
          "**Rigor Mortis:** Following death, ATP synthesis ceases; without ATP, myosin heads cannot detach from actin filaments, causing permanent, rigid cross-bridge lock throughout all skeletal muscles within 3 to 12 hours.",
          "**All-or-None Law vs. Graded Muscle Contraction:** Individual muscle fibers contract maximally or not at all in response to threshold stimuli; whole muscle organs produce smooth graded forces through **motor unit recruitment** (spatial summation) and **wave summation/tetanus** (temporal frequency summation)."
        ],
        "clinicalPearl": "**Cardiac Troponin-I (cTnI) as the Gold Standard Myocardial Infarction Biomarker:** Cardiac troponin subunits possess unique amino acid sequences distinct from skeletal troponin. Following acute myocardial infarction (MI), irreversible sarcolemmal necrosis leaks cardiac troponin-I and troponin-T into the bloodstream within 2 to 4 hours, peaking at 24 hours and remaining elevated for 7 to 10 days, providing the definitive gold-standard diagnostic biomarker for myocardial necrosis.",
        "images": [
          {
            "src": "/images/physiology/4_image1.png",
            "caption": "Figure 4.1: Structural comparison of Skeletal, Cardiac, and Smooth muscle.",
            "alt": "Types of muscles"
          }
        ],
        "tables": []
      },
      {
        "id": "sec-phys-4-2",
        "title": "Neuromuscular Transmission & Excitation-Contraction Coupling",
        "content": [
          "Skeletal muscle fibers do not contract spontaneously; they require nervous excitation delivered by somatic alpha-motor neurons whose axons terminate at specialized synapsing junctions called **Neuromuscular Junctions (NMJs) / Motor Endplates**.",
          "**Sequence of Neuromuscular Transmission:**",
          "1. An electrical nerve action potential descends to the unmyelinated motor axon terminal, depolarizing the presynaptic membrane.",
          "2. Depolarization opens presynaptic **voltage-gated Calcium channels**, driving Ca2+ influx from ECF into the axon terminal cytoplasm.",
          "3. Intracellular Ca2+ triggers synaptotagmin and SNARE complexes, causing exocytosis of synaptic vesicles containing **Acetylcholine (ACh)** into the 20-50 nm synaptic cleft.",
          "4. ACh diffuses across the synaptic cleft and binds to ligand-gated **Nicotinic Acetylcholine Receptors (nAChRs)** situated on the highly folded postsynaptic **motor endplate**.",
          "5. Receptor binding opens non-specific cation channels, driving massive sodium (Na+) influx into the muscle fiber and generating a localized, graded depolarization called the **Endplate Potential (EPP)**.",
          "6. When the EPP reaches threshold, it opens adjacent voltage-gated Na+ channels on the sarcolemma, firing an all-or-none **muscle action potential** that propagates across the entire fiber surface and plunges deep into the cell interior via **Transverse (T) Tubules**.",
          "7. Action potential depolarization activates voltage-sensing dihydropyridine (DHP) receptors in T-tubules, physically opening **Ryanodine Receptors (RyR1)** in the adjacent terminal cisternae of the sarcoplasmic reticulum (forming muscle triads), flooding the sarcoplasm with Ca2+ to initiate cross-bridge cycling.",
          "8. Synaptic transmission is terminated in milliseconds by the enzyme **Acetylcholinesterase (AChE)** on the motor endplate, which hydrolyzes ACh into acetate and choline."
        ],
        "points": [
          "**Endplate Potential Safety Factor:** A normal motor endplate potential is approximately +50 to +70 mV, far exceeding the threshold required to fire a sarcolemmal action potential, ensuring that every nerve action potential successfully triggers muscle contraction under normal physiological conditions.",
          "**Sarcoplasmic Reticulum SERCA Pumps:** Active Ca2+-ATPase pumps on sarcoplasmic reticulum membranes constantly pump Ca2+ back from the sarcoplasm into the terminal cisternae against a 10,000-fold concentration gradient, sequestered by the calcium-binding protein **calsequestrin**, terminating contraction and permitting relaxation.",
          "**Pharmacological Blockade of NMJ:** Curare and rocuronium competitively block nAChRs causing flaccid paralysis (used in surgical anesthesia); Succinylcholine is a depolarizing neuromuscular blocker that persistently depolarizes endplates.",
          "**Botulinum Toxin:** Inhibits presynaptic SNARE proteins, blocking ACh exocytosis and causing severe flaccid paralysis; Tetanus toxin inhibits inhibitory interneurons (GABA/glycine) in spinal cord, causing uninhibited motor firing and spastic paralysis (**lockjaw / risus sardonicus**)."
        ],
        "clinicalPearl": "**Myasthenia Gravis Crisis & Tensilon Testing:** **Myasthenia Gravis** is an autoimmune disorder where pathogenic autoantibodies destroy and down-regulate postsynaptic nicotinic ACh receptors at the neuromuscular junction, reducing EPP amplitude below threshold and causing fluctuating, fatigable skeletal muscle weakness (ptosis, diplopia, dysarthria, and respiratory failure during myasthenic crisis). Administering acetylcholinesterase inhibitors (pyridostigmine) prevents ACh breakdown, prolonging its dwell time in the cleft and temporarily restoring muscular strength.",
        "images": [
          {
            "src": "/images/physiology/4_image2.png",
            "caption": "Figure 4.2: Neuromuscular junction and excitation-contraction coupling.",
            "alt": "Neuromuscular junction"
          }
        ],
        "tables": []
      },
      {
        "id": "sec-phys-4-3",
        "title": "Muscle Tone, Metabolic Energy Systems & Musculoskeletal Alterations",
        "content": [
          "Even when a skeletal muscle is completely relaxed, a continuous state of slight, involuntary partial contraction persists, known as **muscle tone (tonus)**. Muscle tone is sustained by involuntary, alternating asynchronous firing of small alpha-motor units directed by spinal cord reflex loops responsive to **muscle spindle** proprioceptive stretch signals, maintaining upright posture and joint stability without producing fatigue.",
          "Skeletal muscle contraction requires substantial, continuous supplies of ATP to power cross-bridge cycling and sarcoplasmic reticulum SERCA pumps. Muscle fibers regenerate ATP through three metabolic pathways depending on duration and intensity:",
          "1. **Phosphagen System (Creatine Phosphate):** Creatine kinase transfers a high-energy phosphate group from creatine phosphate to ADP, generating instant ATP for 8 to 10 seconds of maximal burst activity (100-meter sprint).",
          "2. **Anaerobic Glycolytic System (Lactic Acid Pathway):** Glycogen is broken down into glucose and converted via glycolysis into pyruvate and **lactic acid** in the absence of oxygen, yielding 2 ATP per glucose; sustains intense activity for 1 to 2 minutes.",
          "3. **Aerobic Cellular Respiration:** In the presence of oxygen, pyruvate, fatty acids, and amino acids enter mitochondrial Krebs cycle and oxidative phosphorylation, yielding 30 to 32 ATP per glucose; sustains prolonged endurance exercise for hours.",
          "Musculoskeletal disorders encompass: **Muscular Dystrophy** (genetic X-linked dystrophin mutations), **Disuse Atrophy**, **Muscle Fatigue** (metabolic accumulation of ADP, Pi, and H+, depleting glycogen), and **Spasticity vs. Flaccidity**."
        ],
        "points": [
          "**Hypotonia vs. Hypertonia:** **Hypotonia** (flaccidity, diminished muscle tone) results from lower motor neuron (LMN) lesions, cerebellar damage, or anterior horn cell destruction (poliomyelitis); **Hypertonia** (spasticity, rigidity) results from upper motor neuron (UMN) lesions (stroke, cerebral palsy) causing loss of cortical inhibitory control over spinal stretch reflexes.",
          "**Isotonic vs. Isometric Contraction:** In **isotonic contractions**, muscle tension remains constant while length changes (concentric shortening or eccentric lengthening, e.g., lifting a barbell); in **isometric contractions**, muscle length remains constant while internal tension rises sharply (e.g., holding a heavy load in a stationary position).",
          "**Slow-Twitch (Type I) vs. Fast-Twitch (Type II) Fibers:** Type I fibers are red, rich in myoglobin and mitochondria, highly resistant to fatigue, and specialized for aerobic endurance (postural soleus muscle); Type II fibers are white, rich in glycogen, rapid, and fatigue easily (extraocular and gastrocnemius muscles).",
          "**Oxygen Debt (EPOC):** Excess Post-Exercise Oxygen Consumption; the volume of oxygen required after strenuous exercise to replenish tissue ATP, phosphocreatine, convert lactic acid back to glucose in the liver (Cori cycle), and re-saturate myoglobin."
        ],
        "clinicalPearl": "**Contractures in Immobile Patients & Rhabdomyolysis Acute Kidney Injury:** In bedridden, comatose, or paralyzed patients, failure to perform scheduled passive range-of-motion (ROM) exercises causes muscle fibers and periarticular connective tissue to shorten and fibrose into permanent, irreversible **joint contractures**. Severe traumatic crush injuries or prolonged immobilization on hard floors produces **rhabdomyolysis**, releasing massive amounts of **myoglobin** into systemic circulation, precipitating acute renal tubular obstruction and pigment nephropathy requiring aggressive IV fluid hydration and urine alkalinization.",
        "images": [],
        "tables": []
      }
    ],
    "mcqs": [
      {
        "id": "phys-mcq-4-256",
        "question": "Hydrostatic pressure is highest in the capillaries of",
        "correctAnswer": "Arteries",
        "subtopic": "24.9-IX. Renal system"
      },
      {
        "id": "phys-mcq-4-257",
        "question": "Ultrafiltration occurs in",
        "correctAnswer": "Glomerulus",
        "subtopic": "24.9-IX. Renal system"
      },
      {
        "id": "phys-mcq-4-258",
        "question": "The renal tubule comprising a brush border formed by numerous microvilli is the",
        "correctAnswer": "Proximal convoluted tubule",
        "subtopic": "24.9-IX. Renal system"
      },
      {
        "id": "phys-mcq-4-259",
        "question": "Recognize that the Macula densa is located in",
        "correctAnswer": "Distal convoluted tubule (DCT)",
        "subtopic": "24.9-IX. Renal system"
      },
      {
        "id": "phys-mcq-4-260",
        "question": "Renin is derived from",
        "correctAnswer": "Juxtaglomerular cells",
        "subtopic": "24.9-IX. Renal system"
      },
      {
        "id": "phys-mcq-4-261",
        "question": "The macula densa cells are stimulated by",
        "correctAnswer": "High sodium concentration in the distal tubule",
        "subtopic": "24.9-IX. Renal system"
      },
      {
        "id": "phys-mcq-4-262",
        "question": "The bitter taste is felt on the",
        "correctAnswer": "Back of the tongue",
        "subtopic": "24.3-III. The digestive system"
      },
      {
        "id": "phys-mcq-4-263",
        "question": "The weight of a non-pregnant uterus typically ranges from",
        "correctAnswer": "50-100 grams",
        "subtopic": "24.10-X. The reproductive system"
      },
      {
        "id": "phys-mcq-4-264",
        "question": "The uncontrolled flow of saliva outside the mouth is called",
        "correctAnswer": "Drooling",
        "subtopic": "24.3-III. The digestive system"
      },
      {
        "id": "phys-mcq-4-265",
        "question": "Select the phase where the twitch in a muscle fiber has the greatest tension",
        "correctAnswer": "Contraction phase",
        "subtopic": "24.8-VIII.Musculoskeletal system"
      },
      {
        "id": "phys-mcq-4-266",
        "question": "Tearing of a muscle because of forceful impact, accompanied by bleeding and severe pain Identify the term",
        "correctAnswer": "Contusion",
        "subtopic": "24.8-VIII.Musculoskeletal system"
      },
      {
        "id": "phys-mcq-4-267",
        "question": "A tumor consisting of muscle tissue is called",
        "correctAnswer": "Myoma",
        "subtopic": "24.8-VIII.Musculoskeletal system"
      },
      {
        "id": "phys-mcq-4-268",
        "question": "Inflammation of muscle fibers is called",
        "correctAnswer": "Myositis",
        "subtopic": "24.8-VIII.Musculoskeletal system"
      },
      {
        "id": "phys-mcq-4-269",
        "question": "Which of the following bones fuse in adulthood to form the hipbone?",
        "correctAnswer": "Ilium, ischium, and pubis",
        "subtopic": "24.8-VIII.Musculoskeletal system"
      },
      {
        "id": "phys-mcq-4-270",
        "question": "Which of the following bones is NOT paired?",
        "correctAnswer": "Vomer",
        "subtopic": "24.8-VIII.Musculoskeletal system"
      },
      {
        "id": "phys-mcq-4-271",
        "question": "The name of the chest bone in the axial skeleton of the human body is",
        "correctAnswer": "Sternum",
        "subtopic": "24.8-VIII.Musculoskeletal system"
      },
      {
        "id": "phys-mcq-4-272",
        "question": "Excessive accumulation of fluid in the tissues is called",
        "correctAnswer": "Edema",
        "subtopic": "24.9-IX. Renal system"
      },
      {
        "id": "phys-mcq-4-273",
        "question": "The excessive fluid accumulation in the tissues is commonly referred to as",
        "correctAnswer": "Edema",
        "subtopic": "24.4-IV. Circulatory and Lymphatic system"
      },
      {
        "id": "phys-mcq-4-274",
        "question": "The heart sound that becomes soft when the intensity decreases is",
        "correctAnswer": "S3 heart sound",
        "subtopic": "24.4-IV. Circulatory and Lymphatic system"
      },
      {
        "id": "phys-mcq-4-275",
        "question": "The amount of blood ejected from the heart during each contraction is called",
        "correctAnswer": "Stroke volume",
        "subtopic": "24.4-IV. Circulatory and Lymphatic system"
      },
      {
        "id": "phys-mcq-4-276",
        "question": "The force or pressure that the blood exerts on the walls of the blood vessels is called",
        "correctAnswer": "Blood pressure",
        "subtopic": "24.4-IV. Circulatory and Lymphatic system"
      },
      {
        "id": "phys-mcq-4-277",
        "question": "Enlargement of the spleen is known as",
        "correctAnswer": "Splenomegaly",
        "subtopic": "24.4-IV. Circulatory and Lymphatic system"
      },
      {
        "id": "phys-mcq-4-278",
        "question": "Identify the mastoid process, which is a bony extension of",
        "correctAnswer": "Temporal bone",
        "subtopic": "24.8-VIII.Musculoskeletal system"
      },
      {
        "id": "phys-mcq-4-279",
        "question": "At approximately what age does the anterior fontanelle usually close in infants?",
        "correctAnswer": "The age of 18 month",
        "subtopic": "24.8-VIII.Musculoskeletal system"
      },
      {
        "id": "phys-mcq-4-280",
        "question": "Which of the following bones typically has no direct muscle attachment?",
        "correctAnswer": "Hyoid",
        "subtopic": "24.8-VIII.Musculoskeletal system"
      },
      {
        "id": "phys-mcq-4-281",
        "question": "Which of the following muscles is multipennate?",
        "correctAnswer": "Deltoid",
        "subtopic": "24.8-VIII.Musculoskeletal system"
      },
      {
        "id": "phys-mcq-4-282",
        "question": "Intercalated discs are a feature of which type of muscles?",
        "correctAnswer": "Cardiac muscle",
        "subtopic": "24.8-VIII.Musculoskeletal system"
      },
      {
        "id": "phys-mcq-4-283",
        "question": "The structure piercing the central tendon of the diaphragm is",
        "correctAnswer": "Inferior vena cava",
        "subtopic": "24.8-VIII.Musculoskeletal system"
      },
      {
        "id": "phys-mcq-4-284",
        "question": "The pelvic floor is mainly formed by which of the following structures?",
        "correctAnswer": "Muscles and connective tissue",
        "subtopic": "24.8-VIII.Musculoskeletal system"
      },
      {
        "id": "phys-mcq-4-285",
        "question": "Intramuscular injections are frequently given in which of the following areas?",
        "correctAnswer": "Muscles",
        "subtopic": "24.8-VIII.Musculoskeletal system"
      },
      {
        "id": "phys-mcq-4-286",
        "question": "Inflammation of the gastric mucosa is called",
        "correctAnswer": "Gastritis",
        "subtopic": "24.3-III. The digestive system"
      },
      {
        "id": "phys-mcq-4-287",
        "question": "Inflammation of pancreatic acini",
        "correctAnswer": "Pancreatitis",
        "subtopic": "24.3-III. The digestive system"
      },
      {
        "id": "phys-mcq-4-288",
        "question": "The formation of bulky, foul-smelling, frothy, and clay-colored stool with a large quantity of undigested fat stool is called",
        "correctAnswer": "Steatorrhea",
        "subtopic": "24.3-III. The digestive system"
      },
      {
        "id": "phys-mcq-4-289",
        "question": "One of the children was admitted to the pediatric ward with complaints of failure to absorb nutrients like carbohydrates, fats, proteins, and vitamins Identify the problem for the child",
        "correctAnswer": "Malabsorption",
        "subtopic": "24.3-III. The digestive system"
      },
      {
        "id": "phys-mcq-4-290",
        "question": "The condition where there is hyperfunction of the gonads is called",
        "correctAnswer": "Hypergonadism",
        "subtopic": "24.10-X. The reproductive system"
      },
      {
        "id": "phys-mcq-4-291",
        "question": "The condition characterized by a reduction in the functional activity of the gonads is called",
        "correctAnswer": "Hypoganadism",
        "subtopic": "24.10-X. The reproductive system"
      },
      {
        "id": "phys-mcq-4-292",
        "question": "The condition characterized by the lack of sperm in semen is called",
        "correctAnswer": "Azoospermia",
        "subtopic": "24.10-X. The reproductive system"
      },
      {
        "id": "phys-mcq-4-293",
        "question": "When the immune system overreacts to an antigen or forms antibodies to substances that are usually not recognized as foreign, it results in",
        "correctAnswer": "Allergic response",
        "subtopic": "24.4-IV. Circulatory and Lymphatic system"
      },
      {
        "id": "phys-mcq-4-294",
        "question": "The thymus gland secretes",
        "correctAnswer": "Thymosin",
        "subtopic": "24.4-IV. Circulatory and Lymphatic system"
      },
      {
        "id": "phys-mcq-4-295",
        "question": "Localized swelling caused by the accumulation of tissue fluid is called",
        "correctAnswer": "Edema",
        "subtopic": "24.4-IV. Circulatory and Lymphatic system"
      },
      {
        "id": "phys-mcq-4-296",
        "question": "Any substance that produces the manifestations of allergy is called",
        "correctAnswer": "Allergen",
        "subtopic": "24.4-IV. Circulatory and Lymphatic system"
      },
      {
        "id": "phys-mcq-4-297",
        "question": "What is the primary function of the axial skeleton?",
        "correctAnswer": "Protecting vital organs such as the brain and spinal cord",
        "subtopic": "24.8-VIII.Musculoskeletal system"
      },
      {
        "id": "phys-mcq-4-298",
        "question": "Identify the following function of the axial skeleton",
        "correctAnswer": "Supports trunk of body",
        "subtopic": "24.8-VIII.Musculoskeletal system"
      },
      {
        "id": "phys-mcq-4-299",
        "question": "Which of the following bones are part of the axial skeleton?",
        "correctAnswer": "Skull and vertebral column",
        "subtopic": "24.8-VIII.Musculoskeletal system"
      },
      {
        "id": "phys-mcq-4-300",
        "question": "Which of the following sutures joins the parietal bone to the occipital bone?",
        "correctAnswer": "Lambdoid suture",
        "subtopic": "24.8-VIII.Musculoskeletal system"
      },
      {
        "id": "phys-mcq-4-301",
        "question": "Identify the following cervical region of the vertebral column",
        "correctAnswer": "Seven vertebrae",
        "subtopic": "24.8-VIII.Musculoskeletal system"
      },
      {
        "id": "phys-mcq-4-302",
        "question": "Where is the temporalis muscle located?",
        "correctAnswer": "On the side of the head",
        "subtopic": "24.8-VIII.Musculoskeletal system"
      },
      {
        "id": "phys-mcq-4-303",
        "question": "The middle layer of the meninges is called the",
        "correctAnswer": "Arachnoid mater",
        "subtopic": "24.11-XI.Nervous system"
      },
      {
        "id": "phys-mcq-4-304",
        "question": "The portion of the brainstem that is sometimes referred to as the \"between brain\" because it borders the upper and lower parts of the brain is the",
        "correctAnswer": "Midbrain",
        "subtopic": "24.11-XI.Nervous system"
      },
      {
        "id": "phys-mcq-4-305",
        "question": "The ability of the tissue to shorten in length after receiving the stimulus is called",
        "correctAnswer": "Contractility",
        "subtopic": "24.4-IV. Circulatory and Lymphatic system"
      },
      {
        "id": "phys-mcq-4-306",
        "question": "The disease that causes increased intraocular pressure and affects the optic nerve is called",
        "correctAnswer": "Glaucoma",
        "subtopic": "24.7-VII. The sensory organs"
      },
      {
        "id": "phys-mcq-4-307",
        "question": "The ability of the eye to determine the precise shape and details of an object is known as",
        "correctAnswer": "Visual acuity",
        "subtopic": "24.7-VII. The sensory organs"
      },
      {
        "id": "phys-mcq-4-308",
        "question": "Proprioceptive senses are maximally transmitted to the",
        "correctAnswer": "Cerebellum",
        "subtopic": "24.7-VII. The sensory organs"
      },
      {
        "id": "phys-mcq-4-309",
        "question": "The highly elastic circular biconvex body, lying immediately behind the pupil, is called the",
        "correctAnswer": "Lens",
        "subtopic": "24.7-VII. The sensory organs"
      },
      {
        "id": "phys-mcq-4-310",
        "question": "The colorful part of the eye is the",
        "correctAnswer": "Iris",
        "subtopic": "24.7-VII. The sensory organs"
      },
      {
        "id": "phys-mcq-4-311",
        "question": "The condition of purulent discharge from the ear in a pediatric patient is typically called",
        "correctAnswer": "Otitis media",
        "subtopic": "24.7-VII. The sensory organs"
      },
      {
        "id": "phys-mcq-4-312",
        "question": "The cause of night blindness in a child could be due to",
        "correctAnswer": "Vitamin A deficiency",
        "subtopic": "24.7-VII. The sensory organs"
      },
      {
        "id": "phys-mcq-4-313",
        "question": "Choose the functional partners of bone is termed as",
        "correctAnswer": "Skeletal muscle",
        "subtopic": "24.8-VIII.Musculoskeletal system"
      },
      {
        "id": "phys-mcq-4-314",
        "question": "Pain in or associated with muscles is known as",
        "correctAnswer": "Myalgia",
        "subtopic": "24.8-VIII.Musculoskeletal system"
      },
      {
        "id": "phys-mcq-4-315",
        "question": "The muscle that forms the major portion of the cheek in the",
        "correctAnswer": "Buccinators",
        "subtopic": "24.8-VIII.Musculoskeletal system"
      },
      {
        "id": "phys-mcq-4-316",
        "question": "Deficiency of oxygen at the tissue level is",
        "correctAnswer": "Hypoxia",
        "subtopic": "24.11-XI.Nervous system"
      },
      {
        "id": "phys-mcq-4-317",
        "question": "The abnormal sideways curvature of the spine is referred to as",
        "correctAnswer": "Scoliosis",
        "subtopic": "24.11-XI.Nervous system"
      },
      {
        "id": "phys-mcq-4-318",
        "question": "How many bones are there in the upper limbs combined?",
        "correctAnswer": "92",
        "subtopic": "24.8-VIII.Musculoskeletal system"
      },
      {
        "id": "phys-mcq-4-319",
        "question": "How many bones fuse in adulthood to form the hip bone?",
        "correctAnswer": "3",
        "subtopic": "24.8-VIII.Musculoskeletal system"
      },
      {
        "id": "phys-mcq-4-320",
        "question": "Which component forms the superior part of the hip bone?",
        "correctAnswer": "Ilium",
        "subtopic": "24.8-VIII.Musculoskeletal system"
      },
      {
        "id": "phys-mcq-4-321",
        "question": "The total number of bones found in the foot and toes is",
        "correctAnswer": "28",
        "subtopic": "24.8-VIII.Musculoskeletal system"
      },
      {
        "id": "phys-mcq-4-322",
        "question": "Bone forms by a process called",
        "correctAnswer": "Ossification",
        "subtopic": "24.8-VIII.Musculoskeletal system"
      },
      {
        "id": "phys-mcq-4-323",
        "question": "Where is the inferior oblique muscle located?",
        "correctAnswer": "In the eye socket",
        "subtopic": "24.8-VIII.Musculoskeletal system"
      },
      {
        "id": "phys-mcq-4-324",
        "question": "The amount of work done by a muscle in a given unit of time is known as",
        "correctAnswer": "Power",
        "subtopic": "24.8-VIII.Musculoskeletal system"
      },
      {
        "id": "phys-mcq-4-325",
        "question": "Among the options provided, the cavity that contains a component of the central nervous system is",
        "correctAnswer": "Cranial cavity",
        "subtopic": "24.11-XI.Nervous system"
      },
      {
        "id": "phys-mcq-4-326",
        "question": "Which cranial nerve exits the skull base at the pars nervosa of the jugular foramen?",
        "correctAnswer": "Ninth cranial nerve palsy",
        "subtopic": "24.11-XI.Nervous system"
      },
      {
        "id": "phys-mcq-4-327",
        "question": "The nerve supplying the submandibular gland is",
        "correctAnswer": "Cranial nerve VII",
        "subtopic": "24.11-XI.Nervous system"
      },
      {
        "id": "phys-mcq-4-328",
        "question": "The fluid that passes through the lymphatic vessels is called",
        "correctAnswer": "Lymph",
        "subtopic": "24.4-IV. Circulatory and Lymphatic system"
      },
      {
        "id": "phys-mcq-4-329",
        "question": "T-lymphocytes and B-lymphocytes are the major cells of the",
        "correctAnswer": "Immune system",
        "subtopic": "24.4-IV. Circulatory and Lymphatic system"
      },
      {
        "id": "phys-mcq-4-330",
        "question": "The important functions of the lymph nodes include",
        "correctAnswer": "Production of lymphocytes",
        "subtopic": "24.4-IV. Circulatory and Lymphatic system"
      },
      {
        "id": "phys-mcq-4-331",
        "question": "The primary sex organ refers to",
        "correctAnswer": "Testes in males",
        "subtopic": "24.10-X. The reproductive system"
      },
      {
        "id": "phys-mcq-4-332",
        "question": "The site of sperm maturation is the",
        "correctAnswer": "Epididymis",
        "subtopic": "24.10-X. The reproductive system"
      },
      {
        "id": "phys-mcq-4-333",
        "question": "The organ that produces the male sex hormone is the",
        "correctAnswer": "Testes",
        "subtopic": "24.10-X. The reproductive system"
      },
      {
        "id": "phys-mcq-4-334",
        "question": "The following is an energy source for the sperm",
        "correctAnswer": "Fructose",
        "subtopic": "24.10-X. The reproductive system"
      },
      {
        "id": "phys-mcq-4-335",
        "question": "Out of the following, the hormone that does not secrete from the corpus luteum is",
        "correctAnswer": "Follicle-stimulating hormone (FSH)",
        "subtopic": "24.10-X. The reproductive system"
      },
      {
        "id": "phys-mcq-4-336",
        "question": "The four types of taste buds are salty, sweet, sour, and",
        "correctAnswer": "Bitter",
        "subtopic": "24.7-VII. The sensory organs"
      },
      {
        "id": "phys-mcq-4-337",
        "question": "The organ which is the most important articulator of speech is the",
        "correctAnswer": "Tongue",
        "subtopic": "24.7-VII. The sensory organs"
      },
      {
        "id": "phys-mcq-4-338",
        "question": "The outermost layer of the skin is the",
        "correctAnswer": "Epidermis",
        "subtopic": "24.7-VII. The sensory organs"
      },
      {
        "id": "phys-mcq-4-339",
        "question": "The condition of anosmia refers to",
        "correctAnswer": "Total loss of sense of smell",
        "subtopic": "24.7-VII. The sensory organs"
      },
      {
        "id": "phys-mcq-4-340",
        "question": "The condition of hyposmia refers to",
        "correctAnswer": "Reduced sense of smell",
        "subtopic": "24.7-VII. The sensory organs"
      }
    ],
    "subjectiveQuestions": [
      {
        "id": "phys-subj-4-1",
        "question": "Write the difference between cardiac and smooth muscle.",
        "type": "Very short",
        "marks": 2,
        "difficulty": 1
      },
      {
        "id": "phys-subj-4-2",
        "question": "Identify two functions of cardiac muscle.",
        "type": "Very short",
        "marks": 2,
        "difficulty": 1
      },
      {
        "id": "phys-subj-4-3",
        "question": "List two functions of smooth muscle.",
        "type": "Very short",
        "marks": 2,
        "difficulty": 1
      },
      {
        "id": "phys-subj-4-4",
        "question": "Define cardiac muscle.",
        "type": "Very short",
        "marks": 2,
        "difficulty": 1
      },
      {
        "id": "phys-subj-4-5",
        "question": "Define smooth muscle.",
        "type": "Very short",
        "marks": 2,
        "difficulty": 1
      },
      {
        "id": "phys-subj-4-6",
        "question": "Identify two properties of skeletal muscle.",
        "type": "Very short",
        "marks": 2,
        "difficulty": 1
      },
      {
        "id": "phys-subj-4-7",
        "question": "Identify two functions of skeletal muscle.",
        "type": "Very short",
        "marks": 2,
        "difficulty": 1
      },
      {
        "id": "phys-subj-4-8",
        "question": "Identify the mechanism of muscle contraction.",
        "type": "Very short",
        "marks": 2,
        "difficulty": 1
      },
      {
        "id": "phys-subj-4-9",
        "question": "Identify the mode of contraction of skeletal muscle.",
        "type": "Very short",
        "marks": 2,
        "difficulty": 1
      },
      {
        "id": "phys-subj-4-10",
        "question": "Enumerate two energy sources for muscular contraction. Provide an example.",
        "type": "Very short",
        "marks": 2,
        "difficulty": 1
      },
      {
        "id": "phys-subj-4-11",
        "question": "Identify the structure and properties of cardiac muscle.",
        "type": "Very short",
        "marks": 2,
        "difficulty": 1
      },
      {
        "id": "phys-subj-4-12",
        "question": "Identify the structure and properties of smooth muscle.",
        "type": "Very short",
        "marks": 2,
        "difficulty": 1
      },
      {
        "id": "phys-subj-4-13",
        "question": "Define red muscles.",
        "type": "Very short",
        "marks": 2,
        "difficulty": 1
      },
      {
        "id": "phys-subj-4-14",
        "question": "Define pale muscles.",
        "type": "Very short",
        "marks": 2,
        "difficulty": 1
      },
      {
        "id": "phys-subj-4-15",
        "question": "List two types of skeletal muscle.",
        "type": "Very short",
        "marks": 2,
        "difficulty": 1
      },
      {
        "id": "phys-subj-4-16",
        "question": "State the meaning of neuromuscular transmission.",
        "type": "Very short",
        "marks": 2,
        "difficulty": 1
      },
      {
        "id": "phys-subj-4-17",
        "question": "Explain the properties of cardiac muscle.",
        "type": "Short",
        "marks": 5,
        "difficulty": 1
      },
      {
        "id": "phys-subj-4-18",
        "question": "Explain factors affecting the force of cardiac contraction.",
        "type": "Short",
        "marks": 5,
        "difficulty": 1
      },
      {
        "id": "phys-subj-4-19",
        "question": "Classify types of muscle contraction.",
        "type": "Short",
        "marks": 5,
        "difficulty": 1
      },
      {
        "id": "phys-subj-4-20",
        "question": "Explain the structure of smooth muscle.",
        "type": "Short",
        "marks": 5,
        "difficulty": 1
      },
      {
        "id": "phys-subj-4-21",
        "question": "Explain the properties of smooth muscle.",
        "type": "Short",
        "marks": 5,
        "difficulty": 1
      }
    ]
  },
  "phys-unit-5": {
    "id": "phys-unit-5",
    "unitNumber": 5,
    "title": "Respiratory Physiology",
    "category": "Ventilation & Gas Exchange",
    "icon": "🫁",
    "color": "from-sky-500 to-blue-600",
    "teachingHours": "60 Hours INC Curriculum (Theory 18h + Practical 42h)",
    "summary": "Detailed functional mechanisms, regulation, homeostatic balance, clinical alterations and official INC competencies of Respiratory Physiology.",
    "objectives": [
      "Describe the physiology of the respiratory system, mechanism of respiration and alteration in diseases of the respiratory system.",
      "Identify the functional parts of the Respiratory System.",
      "Describe the functions of the Respiratory System.",
      "Describe mechanics of the Respiration.",
      "Describe about control of the Respiration.",
      "Enumerate the types of the Respiratory Muscles.",
      "Explain in detail about Ventilation.",
      "Explain in detail about Gas Exchange."
    ],
    "totalImages": 8,
    "sections": [
      {
        "id": "sec-phys-5-1",
        "title": "Mechanics of Pulmonary Ventilation & Respiratory Pressures",
        "content": [
          "**Pulmonary ventilation (breathing)** is the mechanical cyclic process by which atmospheric air is inhaled into alveolar gas exchange units and stale alveolar air is exhaled into the environment. Air flows between atmosphere and alveoli down physical **pressure gradients** governed by **Boyle's Law** (*Pressure of a gas is inversely proportional to its volume at constant temperature: P1V1 = P2V2*).",
          "**Inspiration (Active Process):** Contraction of the **Diaphragm** (innervated by phrenic nerves C3-C5, flattening downward by 1 to 10 cm, expanding vertical thoracic volume) and **External Intercostal Muscles** (elevating ribs and projecting sternum forward like a bucket-handle, increasing anteroposterior and transverse diameters). As thoracic volume expands, **Intra-alveolar (Intrapulmonic) Pressure** drops from 760 mmHg (atmospheric) to **758 mmHg (-2 mmHg)**, drawing 500 mL of ambient air into the lungs.",
          "**Expiration (Passive during Quiet Breathing):** Occurs through passive **elastic recoil** of lung parenchyma, chest wall, and abdominal viscera upon relaxation of the diaphragm and external intercostals. Thoracic volume contracts, raising intra-alveolar pressure to **762 mmHg (+2 mmHg)**, expelling 500 mL of air until alveolar pressure re-equilibrates with atmospheric pressure.",
          "**Forced (Active) Expiration:** Recruits accessory expiratory muscles: **Internal Intercostals** (depressing ribs) and **Abdominal Muscles** (rectus abdominis, obliques, transversus abdominis) which compress abdominal viscera and forcefully elevate the diaphragm.",
          "**Intrapleural Pressure:** The pressure within the pleural cavity between visceral and parietal pleura; normally **always subatmospheric (-4 mmHg at rest, dropping to -6 to -8 mmHg during inspiration)** due to the opposing mechanical elastic recoil vectors of the lungs (pulling inward) and the thoracic ribcage (springing outward)."
        ],
        "points": [
          "**Transpulmonary Pressure (P_alv - P_ip):** The pressure gradient across the lung wall (normally +4 mmHg at rest); acts as the expanding force keeping the delicate lungs inflated against their intrinsic elastic collapse tendency.",
          "**Pneumothorax Pathomechanics:** If a puncture wound breaches the chest wall (parietal pleura) or a ruptured pulmonary bleb breaches the visceral pleura, atmospheric air rushes into the pleural space down its pressure gradient, equalizing intrapleural pressure with atmospheric pressure (P_ip = 0 mmHg); transpulmonary pressure drops to zero, and the elastic lung immediately collapses (**atelectasis / pneumothorax**).",
          "**Accessory Inspiratory Muscles in Respiratory Distress:** Sternocleidomastoid (elevates sternum), Scalenes (elevates ribs 1 and 2), and Pectoralis minor; active recruitment is an alarming physical sign of severe airway obstruction or respiratory failure.",
          "**Airway Resistance (Poiseuille's Law):** Airflow is inversely proportional to airway radius to the fourth power (R ∝ 1/r^4); halving bronchiole radius increases resistance 16-fold, as seen in acute bronchial asthma."
        ],
        "clinicalPearl": "**Tension Pneumothorax & Needle Decompression:** In a **tension pneumothorax**, a one-way tissue flap allows air to enter the pleural space during inspiration but traps it during expiration. Massive positive intrapleural pressure collapses the ipsilateral lung, shifts the mediastinum and trachea toward the contralateral side, and compresses the superior and inferior vena cava, abruptly terminating venous return and causing fatal cardiovascular collapse. Emergency treatment requires immediate **needle thoracostomy decompression** inserting a large-bore needle into the 2nd intercostal space at the midclavicular line.",
        "images": [
          {
            "src": "/images/physiology/5_image1.png",
            "caption": "Figure 5.1: Pressure-volume relationship and lung compliance curve.",
            "alt": "Pressure volume curve"
          },
          {
            "src": "/images/physiology/5_image2.png",
            "caption": "Figure 5.2: Intrapleural and alveolar pressure changes during respiratory cycle.",
            "alt": "Respiratory pressures"
          }
        ],
        "tables": []
      },
      {
        "id": "sec-phys-5-2",
        "title": "Spirometric Lung Volumes, Capacities & Pulmonary Compliance",
        "content": [
          "Pulmonary ventilation dynamics and mechanical lung function are evaluated clinically using **spirometry**, which records the volume of air inhaled and exhaled over time.",
          "**Standard Lung Volumes:**",
          "1. **Tidal Volume (TV):** Volume of air inhaled or exhaled with each normal quiet breath (~500 mL in healthy adults).",
          "2. **Inspiratory Reserve Volume (IRV):** Maximal volume of air that can be forcibly inhaled beyond normal tidal inspiration (~3,000 mL).",
          "3. **Expiratory Reserve Volume (ERV):** Maximal volume of air that can be forcibly exhaled beyond normal tidal expiration (~1,100 to 1,200 mL).",
          "4. **Residual Volume (RV):** Volume of air remaining in the lungs even after maximal, forceful expiration (~1,200 mL); cannot be measured directly by spirometry; keeps alveoli patent between breaths.",
          "**Standard Lung Capacities (Combinations of two or more volumes):**",
          "1. **Inspiratory Capacity (IC = TV + IRV):** ~3,500 mL.",
          "2. **Functional Residual Capacity (FRC = ERV + RV):** Volume of air remaining in lungs at the end of normal quiet expiration (~2,300 mL); buffers blood gas swings between breaths.",
          "3. **Vital Capacity (VC = TV + IRV + ERV):** Maximal volume of air exhaled after maximal inspiration (~4,600 to 4,800 mL).",
          "4. **Total Lung Capacity (TLC = VC + RV):** Total volume of air in lungs after maximal inspiration (~5,800 to 6,000 mL).",
          "**Pulmonary Compliance:** Measures the ease with which lungs expand per unit change in transpulmonary pressure (ΔV / ΔP, normal: 200 mL/cm H2O). Determined by elastic fibers in lung parenchyma and **alveolar surface tension** governed by Laplace's Law (*P = 2T / r*)."
        ],
        "points": [
          "**Anatomical Dead Space:** Air conducting corridors (nose, pharynx, trachea, bronchi) that do not participate in gas exchange; volume equals approximately 1 mL per pound of ideal body weight (~150 mL).",
          "**Alveolar Ventilation:** The actual volume of fresh air reaching gas-exchanging alveoli per minute: *(Tidal Volume - Dead Space) × Respiratory Rate* = (500 - 150) × 12 = **4,200 mL/min**.",
          "**Pulmonary Surfactant Action:** Synthesized by Type II alveolar cells (dipalmitoylphosphatidylcholine); dramatically reduces surface tension in smaller alveoli, preventing alveolar collapse (atelectasis) during expiration and equalizing pressures across different-sized alveoli.",
          "**High vs. Low Lung Compliance:** High compliance (loss of elastic recoil, as in **emphysema**) makes inhalation easy but expiration difficult; Low compliance (stiff lungs, as in **pulmonary fibrosis, ARDS, pulmonary edema**) requires exhausting muscular work to expand lungs.",
          "**Forced Expiratory Volume in 1 Second (FEV1):** Fraction of vital capacity exhaled in the first second (normally > 75-80% of FVC); drops drastically (< 70%) in obstructive lung diseases (asthma, COPD)."
        ],
        "clinicalPearl": "**Infant Respiratory Distress Syndrome (IRDS) in Premature Neonates:** Surfactant synthesis by fetal Type II pneumocytes accelerates after 28 to 32 weeks gestation under the influence of cortisol. Premature infants born before 32 weeks lack adequate surfactant; extreme alveolar surface tension collapses alveoli on expiration, causing severe hypoxemia, tachypnea, grunting, intercostal retractions, and death from **IRDS**. Treatment requires immediate endotracheal instillation of exogenous surfactant and maternal prenatal corticosteroid injections (betamethasone) to accelerate fetal lung maturation.",
        "images": [
          {
            "src": "/images/physiology/5_image3.png",
            "caption": "Figure 5.3: Variations in lung compliance and airway resistance.",
            "alt": "Variations in lung compliance"
          }
        ],
        "tables": []
      },
      {
        "id": "sec-phys-5-3",
        "title": "Alveolar Gas Exchange, Diffusion & The Respiratory Membrane",
        "content": [
          "**External respiration** is the passive physical diffusion of oxygen from alveolar air into pulmonary capillary blood and simultaneous diffusion of carbon dioxide from blood into alveoli. Diffusion occurs across the ultrathin **respiratory membrane (blood-air barrier)**, measuring only 0.2 to 0.5 micrometers in thickness with a total surface area of approximately 70 square meters.",
          "Gas exchange is strictly governed by **Dalton's Law of Partial Pressures** (*Total pressure of a gas mixture equals the sum of partial pressures of individual gases: P_total = P_O2 + P_N2 + P_CO2 + P_H2O*) and **Fick's Law of Diffusion** (*Rate of gas diffusion is directly proportional to surface area, diffusion coefficient, and partial pressure gradient, and inversely proportional to membrane thickness*).",
          "**Partial Pressure Gradients:**",
          "• **Alveolar Air:** P_O2 = **104 mmHg**; P_CO2 = **40 mmHg**.",
          "• **Deoxygenated Pulmonary Capillary Blood:** P_O2 = **40 mmHg**; P_CO2 = **45 mmHg**.",
          "• **Oxygen Diffusion:** The 64 mmHg steep pressure gradient (104 vs 40 mmHg) drives rapid net O2 diffusion from alveoli into blood; equilibration is complete within 0.25 seconds (blood spends ~0.75 seconds traversing capillaries at rest, providing a large safety margin).",
          "• **Carbon Dioxide Diffusion:** Although the CO2 gradient is small (45 vs 40 mmHg = 5 mmHg), **CO2 is 20 to 24 times more soluble in water and lipid membranes than O2**, ensuring rapid, equal diffusion across the membrane.",
          "• **Systemic Arterial Blood Leaving Lungs:** P_O2 = **95 to 100 mmHg**; P_CO2 = **40 mmHg**."
        ],
        "points": [
          "**Four Histological Layers of Respiratory Membrane:** (1) Alveolar fluid and surfactant layer, (2) Alveolar Type I squamous epithelial cells, (3) Fused epithelial and endothelial basement membranes, and (4) Pulmonary capillary endothelial cells.",
          "**Ventilation-Perfusion (V/Q) Matching:** Normal resting ratio of alveolar ventilation (4 L/min) to pulmonary capillary perfusion (5 L/min) is approximately **0.8**. Mismatches cause hypoxemia: V/Q = 0 (shunt: perfused but not ventilated, e.g., mucus plug, atelectasis); V/Q = infinity (dead space: ventilated but not perfused, e.g., pulmonary embolism).",
          "**Hypoxic Pulmonary Vasoconstriction:** Unlike systemic arterioles which dilate in response to hypoxia, **pulmonary arterioles constrict in response to low alveolar P_O2**, shunting blood away from poorly ventilated alveoli toward well-ventilated regions to optimize gas exchange.",
          "**Diffusion Impairment in Pathology:** Pulmonary edema (fluid accumulation in alveolar wall) and interstitial pulmonary fibrosis increase membrane thickness, severely retarding oxygen diffusion and causing arterial hypoxemia."
        ],
        "clinicalPearl": "**Acute Respiratory Distress Syndrome (ARDS) & Pulmonary Embolism (PE):** In ARDS, widespread inflammatory injury to the alveolar-capillary membrane causes massive exudative leakage of protein-rich fluid into alveoli, inactivating surfactant and drastically thickening the diffusion barrier, producing refractory hypoxemia that fails to respond to supplemental oxygen. In acute **pulmonary embolism**, an embolus lodging in a pulmonary artery branches blocks blood flow to ventilated lung regions (V/Q mismatch, alveolar dead space), causing sudden severe dyspnea, pleuritic chest pain, tachypnea, and acute right ventricular strain.",
        "images": [
          {
            "src": "/images/physiology/5_image5.png",
            "caption": "Figure 5.5: Ultrastructure of the alveolar-capillary respiratory membrane.",
            "alt": "Respiratory membrane"
          },
          {
            "src": "/images/physiology/5_image6.png",
            "caption": "Figure 5.6: Diffusion of oxygen from alveolus to pulmonary capillary.",
            "alt": "Diffusion of oxygen"
          },
          {
            "src": "/images/physiology/5_image7.png",
            "caption": "Figure 5.7: Diffusion of carbon dioxide from pulmonary capillary to alveolus.",
            "alt": "Diffusion of carbon dioxide"
          },
          {
            "src": "/images/physiology/5_image8.png",
            "caption": "Figure 5.8: Partial pressures and content of O2 and CO2 across circulation.",
            "alt": "Partial pressures of O2 and CO2"
          }
        ],
        "tables": []
      },
      {
        "id": "sec-phys-5-4",
        "title": "Gas Transport in Blood: Oxyhemoglobin & Carbon Dioxide Mechanisms",
        "content": [
          "Because molecular oxygen exhibits very low solubility in aqueous blood plasma (only 0.3 mL O2 dissolves per 100 mL plasma at normal arterial PaO2 of 100 mmHg), the cardiovascular system relies on the respiratory pigment **Hemoglobin (Hb)** to transport 98.5% of total blood oxygen.",
          "**Oxygen Transport:** Approximately **98.5% is bound chemically to iron within hemoglobin as Oxyhemoglobin (HbO2)**; only **1.5% is physically dissolved in plasma** (it is this 1.5% dissolved fraction that exerts partial pressure PaO2, driving diffusion into tissues).",
          "**The Oxygen-Hemoglobin Dissociation Curve:** Displays a characteristic **S-shaped (sigmoid) curve** resulting from **cooperative binding** (binding of the first O2 molecule to a heme iron induces a conformational shift that progressively increases affinity for subsequent O2 molecules).",
          "In systemic capillaries where tissues consume oxygen, PO2 drops to 40 mmHg; hemoglobin saturation drops from 97% to 75%, releasing 25% of its oxygen load (~5 mL O2 per 100 mL blood). During vigorous muscular exercise, tissue PO2 drops to 15-20 mmHg, driving hemoglobin to offload over 75% of its oxygen cargo.",
          "**Carbon Dioxide Transport in Blood:** Occurs through three distinct mechanisms:",
          "1. **Physically Dissolved in Plasma (7%):** Dissolved CO2 exerting PaCO2.",
          "2. **Carbaminohemoglobin (23%):** Bound directly to amino terminal groups of globin polypeptide chains (**HbCO2**; does not compete with O2 for iron).",
          "3. **Bicarbonate Ions (HCO3-) in Plasma (70%):** Primary transport mechanism. Inside red blood cells, the enzyme **Carbonic Anhydrase (CA)** rapidly hydrates CO2: *CO2 + H2O <-> H2CO3 <-> H+ + HCO3-*. Bicarbonate diffuses out of the RBC into plasma via the AE1 anion exchanger, while chloride (Cl-) ions enter the cell to maintain electrical neutrality (**The Chloride Shift / Hamburger Phenomenon**)."
        ],
        "points": [
          "**Factors Shifting the Oxyhemoglobin Curve to the RIGHT (Bohr Effect - Enhancing O2 Offloading):**",
          "• Increased hydrogen ion concentration (decreased pH / acidosis)",
          "• Increased carbon dioxide (hypercapnia / PaCO2)",
          "• Increased body temperature (fever, exercising muscle)",
          "• Increased 2,3-Bisphosphoglycerate (2,3-BPG / DPG in chronic hypoxia/altitude)",
          "**Factors Shifting the Curve to the LEFT (Increasing O2 Affinity / Impairing Tissue Release):**",
          "• Decreased H+ (increased pH / alkalosis), decreased PaCO2, hypothermia, decreased 2,3-BPG, and **Fetal Hemoglobin (HbF)** (which has higher O2 affinity than adult HbA to extract oxygen across placenta).",
          "**Haldane Effect:** Deoxygenation of hemoglobin increases its capacity to bind and carry carbon dioxide and H+ ions; conversely, oxygenation of blood in lungs promotes CO2 offloading."
        ],
        "clinicalPearl": "**Pulse Oximetry Limitations & Carbon Monoxide Poisoning:** Standard pulse oximetry (SpO2) measures light absorbance at 660 nm and 940 nm to estimate oxyhemoglobin saturation. However, pulse oximeters cannot distinguish carboxyhemoglobin (HbCO) from oxyhemoglobin. In smoke inhalation victims with severe carbon monoxide poisoning, pulse oximetry displays a falsely reassuring normal SpO2 of 98-100%, while arterial blood gas co-oximetry reveals lethal carboxyhemoglobin levels (> 30-50%). Treatment requires immediate administration of 100% high-flow normobaric or hyperbaric oxygen.",
        "images": [],
        "tables": []
      },
      {
        "id": "sec-phys-5-5",
        "title": "Neural & Chemical Regulation of Respiration & Clinical Pathologies",
        "content": [
          "Pulmonary ventilation is automatically regulated by interconnected neural centers in the brainstem to maintain arterial blood gas parameters (PaO2 ~95-100 mmHg, PaCO2 ~35-45 mmHg, arterial pH ~7.35-7.45) across vast metabolic fluctuations.",
          "**Brainstem Respiratory Control Centers:**",
          "1. **Medullary Rhythmicity Center:** Located in medulla oblongata; comprises the **Dorsal Respiratory Group (DRG)** (generates baseline inspiratory rhythm, firing impulses down phrenic and intercostal nerves for 2 seconds followed by 3 seconds of passive recoil relaxation) and the **Ventral Respiratory Group (VRG)** (contains the **Pre-Bötzinger Complex** generating basic rhythm; fires accessory inspiratory and expiratory muscles during forced breathing).",
          "2. **Pontine Respiratory Group (PRG / Pneumotaxic Center):** Located in upper pons; transmits continuous inhibitory impulses to the medullary inspiratory center, limiting the duration of inspiration and regulating respiratory rate and depth, preventing overinflation.",
          "**Chemical Regulation of Respiration (Chemoreceptors):**",
          "• **Central Chemoreceptors:** Located on ventrolateral surface of medulla oblongata; exquisitely sensitive to changes in **hydrogen ion (H+) concentration in cerebrospinal fluid (CSF)**. Carbon dioxide freely crosses the blood-brain barrier into CSF, where carbonic anhydrase hydrates it into H+ and HCO3-. Rising PaCO2 (**hypercapnia**) and CSF acidosis powerfully stimulate central chemoreceptors, driving vigorous hyperventilation to blow off CO2.",
          "• **Peripheral Chemoreceptors:** Located in **Carotid Bodies** (innervated by glossopharyngeal nerve CN IX) and **Aortic Bodies** (vagus nerve CN X); primarily sense severe arterial hypoxemia (**PaO2 < 60 mmHg**), arterial acidosis (pH < 7.35), and hypercapnia."
        ],
        "points": [
          "**Hering-Breuer Inflation Reflex:** Pulmonary stretch receptors located in smooth muscle of bronchi and bronchioles fire via the vagus nerve when tidal volume exceeds 1,500 mL, inhibiting the medullary inspiratory center to prevent excessive mechanical lung over-distension.",
          "**CO2 as the Primary Respiratory Drive:** In healthy individuals, arterial **PaCO2 is the most powerful chemical stimulus governing breathing**; a rise of merely 2 to 5 mmHg in PaCO2 instantly doubles minute ventilation.",
          "**Hypoxic Drive in Chronic Hypercapnia (COPD):** In patients with end-stage severe COPD, chronic hypercapnia desensitizes central chemoreceptors (CSF HCO3- compensates to normalize pH). Breathing becomes dependent on **hypoxic drive** mediated by peripheral chemoreceptors responsive to low PaO2.",
          "**Respiratory Pathological Patterns:**",
          "• **Cheyne-Stokes Respiration:** Waxing and waning tidal volumes with alternating periods of apnea; seen in severe congestive heart failure and brainstem stroke.",
          "• **Kussmaul Breathing:** Rapid, deep, sighing hyperventilation in **Diabetic Ketoacidosis (DKA)** to blow off CO2 and compensate for metabolic acidosis.",
          "• **Biot's (Ataxic) Respiration:** Irregular, disorganized breathing with unpredictable apneas; indicates severe brainstem damage or elevated intracranial pressure."
        ],
        "clinicalPearl": "**High-Flow Oxygen Hazards in COPD Patients:** In patients with severe chronic hypercapnic COPD relying on peripheral hypoxic drive, administering uncontrolled high concentrations of supplemental oxygen (e.g., non-rebreather mask at 15 L/min) elevates PaO2 above 60-80 mmHg, abruptly shutting off peripheral carotid chemoreceptor firing. Ventilation plummets, causing acute respiratory depression, profound CO2 retention (PaCO2 > 80-100 mmHg), respiratory acidosis, CO2 narcosis, and coma. Oxygen must be titrated carefully via Venturi mask or low-flow nasal cannula to maintain target SpO2 between 88% and 92%.",
        "images": [
          {
            "src": "/images/physiology/5_image4.png",
            "caption": "Figure 5.4: Neural and chemical regulation of respiration.",
            "alt": "Regulation of respiration"
          }
        ],
        "tables": []
      }
    ],
    "mcqs": [
      {
        "id": "phys-mcq-5-341",
        "question": "The ophthalmoscope is used for",
        "correctAnswer": "Examining the interior structures of the eye",
        "subtopic": "24.7-VII. The sensory organs"
      },
      {
        "id": "phys-mcq-5-342",
        "question": "The loss of accommodation, typically associated with aging, is called",
        "correctAnswer": "Presbyopia",
        "subtopic": "24.7-VII. The sensory organs"
      },
      {
        "id": "phys-mcq-5-343",
        "question": "The type of glasses recommended to correct presbyopia is",
        "correctAnswer": "Bifocals",
        "subtopic": "24.7-VII. The sensory organs"
      },
      {
        "id": "phys-mcq-5-344",
        "question": "How many sensory modalities are housed in the ear?",
        "correctAnswer": "Two",
        "subtopic": "24.7-VII. The sensory organs"
      },
      {
        "id": "phys-mcq-5-345",
        "question": "Equalizing pressure between the middle ear and the atmosphere is the function of",
        "correctAnswer": "Eustachian tube",
        "subtopic": "24.7-VII. The sensory organs"
      },
      {
        "id": "phys-mcq-5-346",
        "question": "The sound intensity is measured in terms of",
        "correctAnswer": "Decibels",
        "subtopic": "24.7-VII. The sensory organs"
      },
      {
        "id": "phys-mcq-5-347",
        "question": "The organ of Corti is present in the",
        "correctAnswer": "Cochlear canal",
        "subtopic": "24.7-VII. The sensory organs"
      },
      {
        "id": "phys-mcq-5-348",
        "question": "Audiometry is used to measure",
        "correctAnswer": "Hearing sensitivity",
        "subtopic": "24.7-VII. The sensory organs"
      },
      {
        "id": "phys-mcq-5-349",
        "question": "The absence of the sense of taste is known as",
        "correctAnswer": "Ageusia",
        "subtopic": "24.7-VII. The sensory organs"
      },
      {
        "id": "phys-mcq-5-350",
        "question": "The substance with the highest taste threshold is",
        "correctAnswer": "Bitter",
        "subtopic": "24.7-VII. The sensory organs"
      },
      {
        "id": "phys-mcq-5-351",
        "question": "Which one of the following body parts perceives touch discrimination sense maximally?",
        "correctAnswer": "Scapular area",
        "subtopic": "24.7-VII. The sensory organs"
      },
      {
        "id": "phys-mcq-5-352",
        "question": "Color blindness is due to a defect in the",
        "correctAnswer": "Cones",
        "subtopic": "24.7-VII. The sensory organs"
      },
      {
        "id": "phys-mcq-5-353",
        "question": "The waste matter urea is primarily transported by",
        "correctAnswer": "Blood",
        "subtopic": "24.9-IX. Renal system"
      },
      {
        "id": "phys-mcq-5-354",
        "question": "The yellow color of urine is primarily due to the presence of",
        "correctAnswer": "Urochrome",
        "subtopic": "24.9-IX. Renal system"
      },
      {
        "id": "phys-mcq-5-355",
        "question": "Micturition is",
        "correctAnswer": "The process of urine elimination from the body through the urethra",
        "subtopic": "24.9-IX. Renal system"
      },
      {
        "id": "phys-mcq-5-356",
        "question": "Excretion is a continuous process, but urine is not passed out continuously because of",
        "correctAnswer": "Reabsorption of water and nutrients in the nephrons",
        "subtopic": "24.9-IX. Renal system"
      },
      {
        "id": "phys-mcq-5-357",
        "question": "The kidneys not only remove waste products from the blood but also play a very important role in maintaining",
        "correctAnswer": "Blood pH",
        "subtopic": "24.9-IX. Renal system"
      },
      {
        "id": "phys-mcq-5-358",
        "question": "Diarrhea takes out too much water and minerals which causes",
        "correctAnswer": "Dehydration",
        "subtopic": "24.3-III. The digestive system"
      },
      {
        "id": "phys-mcq-5-359",
        "question": "Identify the entrance of germs into the body due to contaminated food",
        "correctAnswer": "Gastrointestinal tract.",
        "subtopic": "24.3-III. The digestive system"
      },
      {
        "id": "phys-mcq-5-360",
        "question": "The cause of diarrhea",
        "correctAnswer": "Bacterial or viral infections.",
        "subtopic": "24.3-III. The digestive system"
      },
      {
        "id": "phys-mcq-5-361",
        "question": "The main site of respiration inside the lungs",
        "correctAnswer": "Alveoli",
        "subtopic": "24.2-II.The Respiratory system"
      },
      {
        "id": "phys-mcq-5-362",
        "question": "The function of the trachea",
        "correctAnswer": "Conducting air between the larynx and bronchi",
        "subtopic": "24.2-II.The Respiratory system"
      },
      {
        "id": "phys-mcq-5-363",
        "question": "The nodules of lymphoid tissue found in the wall of the intestinal tract",
        "correctAnswer": "Peyer's patches",
        "subtopic": "24.4-IV. Circulatory and Lymphatic system"
      },
      {
        "id": "phys-mcq-5-364",
        "question": "The movement of fluid through the lymphatic vessels is assisted by",
        "correctAnswer": "The movement of fluid through the lymphatic vessels is assisted by:",
        "subtopic": "24.4-IV. Circulatory and Lymphatic system"
      },
      {
        "id": "phys-mcq-5-365",
        "question": "Lymph nodes may be located in various tissues of the human body, including",
        "correctAnswer": "Axillary, inguinal, and cervical regions",
        "subtopic": "24.4-IV. Circulatory and Lymphatic system"
      },
      {
        "id": "phys-mcq-5-366",
        "question": "The exchange of gases between the air in the alveoli of the lungs and the blood",
        "correctAnswer": "External respiration",
        "subtopic": "24.2-II.The Respiratory system"
      },
      {
        "id": "phys-mcq-5-367",
        "question": "The exchange of gases between the blood and body cells",
        "correctAnswer": "Internal respiration",
        "subtopic": "24.2-II.The Respiratory system"
      },
      {
        "id": "phys-mcq-5-368",
        "question": "What controls respiration?",
        "correctAnswer": "Brainstem",
        "subtopic": "24.2-II.The Respiratory system"
      },
      {
        "id": "phys-mcq-5-369",
        "question": "Which of the following is a respiratory center?",
        "correctAnswer": "Medulla oblongata",
        "subtopic": "24.2-II.The Respiratory system"
      },
      {
        "id": "phys-mcq-5-370",
        "question": "The organ responsible for the removal of old red blood cells (RBCs), white blood cells (WBCs), and platelets is",
        "correctAnswer": "Spleen",
        "subtopic": "24.4-IV. Circulatory and Lymphatic system"
      },
      {
        "id": "phys-mcq-5-371",
        "question": "The receptors that respond to changes in blood pressure are called",
        "correctAnswer": "Baroreceptors",
        "subtopic": "24.4-IV. Circulatory and Lymphatic system"
      },
      {
        "id": "phys-mcq-5-372",
        "question": "The minimum pressure exerted in the arteries during diastole of the heart is called",
        "correctAnswer": "Diastolic blood pressure",
        "subtopic": "24.4-IV. Circulatory and Lymphatic system"
      },
      {
        "id": "phys-mcq-5-373",
        "question": "The average pressure existing in the arteries is known as",
        "correctAnswer": "Mean arterial blood pressure",
        "subtopic": "24.4-IV. Circulatory and Lymphatic system"
      },
      {
        "id": "phys-mcq-5-374",
        "question": "The apparatus used to measure blood pressure in human beings is called",
        "correctAnswer": "Sphygmomanometer",
        "subtopic": "24.4-IV. Circulatory and Lymphatic system"
      },
      {
        "id": "phys-mcq-5-375",
        "question": "The term for low blood pressure in an individual is",
        "correctAnswer": "Hypotension",
        "subtopic": "24.4-IV. Circulatory and Lymphatic system"
      },
      {
        "id": "phys-mcq-5-376",
        "question": "The neurotransmitter substance released by sympathetic nerve fibers that causes vasoconstriction is",
        "correctAnswer": "Norepinephrine",
        "subtopic": "24.4-IV. Circulatory and Lymphatic system"
      },
      {
        "id": "phys-mcq-5-377",
        "question": "The organ that plays an important role in the long-term regulation of arterial blood pressure is",
        "correctAnswer": "Kidneys",
        "subtopic": "24.4-IV. Circulatory and Lymphatic system"
      },
      {
        "id": "phys-mcq-5-378",
        "question": "Identify the deficient testicular function in males is called",
        "correctAnswer": "Hypogonadism",
        "subtopic": "24.10-X. The reproductive system"
      },
      {
        "id": "phys-mcq-5-379",
        "question": "The excessive secretion of male sex hormones is called",
        "correctAnswer": "Hypergonadism",
        "subtopic": "24.10-X. The reproductive system"
      },
      {
        "id": "phys-mcq-5-380",
        "question": "The term for the absence of menstrual bleeding is called",
        "correctAnswer": "Amenorrhoea",
        "subtopic": "24.10-X. The reproductive system"
      },
      {
        "id": "phys-mcq-5-381",
        "question": "The term for scanty menstruation is called",
        "correctAnswer": "Oligomenorrhea",
        "subtopic": "24.10-X. The reproductive system"
      },
      {
        "id": "phys-mcq-5-382",
        "question": "The term for the occurrence of uterine bleeding between periods is called",
        "correctAnswer": "Metrorrhagia",
        "subtopic": "24.10-X. The reproductive system"
      },
      {
        "id": "phys-mcq-5-383",
        "question": "The term for infrequent and reduced frequency of menstruation is called",
        "correctAnswer": "Oligomenorrhea",
        "subtopic": "24.10-X. The reproductive system"
      },
      {
        "id": "phys-mcq-5-384",
        "question": "The term for painful menstruation is called",
        "correctAnswer": "Dysmenorrhea",
        "subtopic": "24.10-X. The reproductive system"
      },
      {
        "id": "phys-mcq-5-385",
        "question": "The term for a high plasma level of prolactin during lactation is called",
        "correctAnswer": "Galactorrhea",
        "subtopic": "24.10-X. The reproductive system"
      },
      {
        "id": "phys-mcq-5-386",
        "question": "The adrenal gland is located at",
        "correctAnswer": "Above each kidney",
        "subtopic": "24.1-I. General Physiology–Basic concepts"
      },
      {
        "id": "phys-mcq-5-387",
        "question": "Which hormone is secreted by salivary glands?",
        "correctAnswer": "Salivary amylase or Ptyalin",
        "subtopic": "24.1-I. General Physiology–Basic concepts"
      },
      {
        "id": "phys-mcq-5-388",
        "question": "Which hormone is secreted by sweat glands?",
        "correctAnswer": "Sweat",
        "subtopic": "24.1-I. General Physiology–Basic concepts"
      },
      {
        "id": "phys-mcq-5-389",
        "question": "Which hormone is secreted by mammary glands?",
        "correctAnswer": "Prolactin",
        "subtopic": "24.1-I. General Physiology–Basic concepts"
      },
      {
        "id": "phys-mcq-5-390",
        "question": "Which hormone is secreted by endocrine glands?",
        "correctAnswer": "Insulin",
        "subtopic": "24.1-I. General Physiology–Basic concepts"
      },
      {
        "id": "phys-mcq-5-391",
        "question": "What is deficiency of oxygen called?",
        "correctAnswer": "Hypoxemia",
        "subtopic": "24.2-II.The Respiratory system"
      },
      {
        "id": "phys-mcq-5-392",
        "question": "Increase in rate as well as forceful respiration is called",
        "correctAnswer": "Hyperpnea",
        "subtopic": "24.2-II.The Respiratory system"
      },
      {
        "id": "phys-mcq-5-393",
        "question": "What is the term for an increase in arterial partial pressure of carbon dioxide (pCO2)?",
        "correctAnswer": "Hypercapnea",
        "subtopic": "24.2-II.The Respiratory system"
      },
      {
        "id": "phys-mcq-5-394",
        "question": "What is the term for a decrease in rate as well as forceful respiration?",
        "correctAnswer": "Bradypnea",
        "subtopic": "24.2-II.The Respiratory system"
      },
      {
        "id": "phys-mcq-5-395",
        "question": "End products of protein digestion are absorbed through the",
        "correctAnswer": "Small intestine",
        "subtopic": "24.3-III. The digestive system"
      },
      {
        "id": "phys-mcq-5-396",
        "question": "Emulsification of fat is facilitated by",
        "correctAnswer": "Bile salt",
        "subtopic": "24.3-III. The digestive system"
      },
      {
        "id": "phys-mcq-5-397",
        "question": "Calcium is absorbed in the",
        "correctAnswer": "Dueodenum and Jejunum",
        "subtopic": "24.3-III. The digestive system"
      },
      {
        "id": "phys-mcq-5-398",
        "question": "Absorption of iron mainly occurs in the",
        "correctAnswer": "Small intestine.",
        "subtopic": "24.3-III. The digestive system"
      },
      {
        "id": "phys-mcq-5-399",
        "question": "Which of the following does not belong to the urinary system?",
        "correctAnswer": "Liver",
        "subtopic": "24.9-IX. Renal system"
      },
      {
        "id": "phys-mcq-5-400",
        "question": "Bile is secreted by the",
        "correctAnswer": "liver",
        "subtopic": "24.3-III. The digestive system"
      },
      {
        "id": "phys-mcq-5-401",
        "question": "The blood clotting proteins manufactured by the liver are classified as",
        "correctAnswer": "Clotting factors.",
        "subtopic": "24.3-III. The digestive system"
      },
      {
        "id": "phys-mcq-5-402",
        "question": "The removal of amino groups from the amino acids is called",
        "correctAnswer": "De-amination",
        "subtopic": "24.3-III. The digestive system"
      },
      {
        "id": "phys-mcq-5-403",
        "question": "Urea is a less toxic form of",
        "correctAnswer": "Ammonia",
        "subtopic": "24.3-III. The digestive system"
      },
      {
        "id": "phys-mcq-5-404",
        "question": "The lipids found in food are made up of",
        "correctAnswer": "Fatty acids",
        "subtopic": "24.3-III. The digestive system"
      },
      {
        "id": "phys-mcq-5-405",
        "question": "How many blood vessels are attached to the lower surface of the liver?",
        "correctAnswer": "2",
        "subtopic": "24.3-III. The digestive system"
      },
      {
        "id": "phys-mcq-5-406",
        "question": "Paralysis is a type of disorder classified as",
        "correctAnswer": "Motor disorder",
        "subtopic": "24.11-XI.Nervous system"
      },
      {
        "id": "phys-mcq-5-407",
        "question": "The complete loss of function by one or more muscle groups is called",
        "correctAnswer": "Paralysis",
        "subtopic": "24.11-XI.Nervous system"
      },
      {
        "id": "phys-mcq-5-408",
        "question": "Disorders caused by disturbance in nerve impulse generation and transmission are called",
        "correctAnswer": "Neuromuscular disorders",
        "subtopic": "24.11-XI.Nervous system"
      },
      {
        "id": "phys-mcq-5-409",
        "question": "Difficulty speaking and understanding speech is termed",
        "correctAnswer": "Aphasia",
        "subtopic": "24.11-XI.Nervous system"
      },
      {
        "id": "phys-mcq-5-410",
        "question": "The most common form of transient facial paralysis is",
        "correctAnswer": "Bell's palsy",
        "subtopic": "24.11-XI.Nervous system"
      },
      {
        "id": "phys-mcq-5-411",
        "question": "Melatonin is a hormone produced by",
        "correctAnswer": "Pineal gland",
        "subtopic": "24.6-VI. The endocrine system"
      },
      {
        "id": "phys-mcq-5-412",
        "question": "If a tumor develops in the adrenal zona glomerulosa, it can cause hypersecretion of hormones produced in that region, such as aldosterone Therefore, in a patient with such a tumor, you might expect to find",
        "correctAnswer": "Hypernatremia (high sodium levels)",
        "subtopic": "24.6-VI. The endocrine system"
      },
      {
        "id": "phys-mcq-5-413",
        "question": "The function of norepinephrine is",
        "correctAnswer": "Increasing heart rate and blood pressure",
        "subtopic": "24.6-VI. The endocrine system"
      },
      {
        "id": "phys-mcq-5-414",
        "question": "Epinephrine and norepinephrine together are known as",
        "correctAnswer": "Catecholamine",
        "subtopic": "24.6-VI. The endocrine system"
      },
      {
        "id": "phys-mcq-5-415",
        "question": "What is the \"3F gland\"?",
        "correctAnswer": "Thyroid gland",
        "subtopic": "24.6-VI. The endocrine system"
      },
      {
        "id": "phys-mcq-5-416",
        "question": "The part of the adrenal gland that secretes hydrocortisone (cortisol), also known as hydrocortisone, is the",
        "correctAnswer": "Zona glomerulosa",
        "subtopic": "24.6-VI. The endocrine system"
      },
      {
        "id": "phys-mcq-5-417",
        "question": "Pinealocytes cells occur in",
        "correctAnswer": "Pineal gland",
        "subtopic": "24.6-VI. The endocrine system"
      },
      {
        "id": "phys-mcq-5-418",
        "question": "Which of the following statements about the adrenal gland is true?",
        "correctAnswer": "It consists of two distinct regions: the adrenal medulla and adrenal cortex.",
        "subtopic": "24.6-VI. The endocrine system"
      },
      {
        "id": "phys-mcq-5-419",
        "question": "Which hormone controls the activity of the zona glomerulosa of the adrenal gland?",
        "correctAnswer": "Aldosterone",
        "subtopic": "24.6-VI. The endocrine system"
      },
      {
        "id": "phys-mcq-5-420",
        "question": "\"Cushing's\" disease is related to",
        "correctAnswer": "Hypersecretion of cortisol",
        "subtopic": "24.6-VI. The endocrine system"
      },
      {
        "id": "phys-mcq-5-421",
        "question": "The immune competent process of T-lymphocytes occurs in the",
        "correctAnswer": "Thymus gland",
        "subtopic": "24.6-VI. The endocrine system"
      },
      {
        "id": "phys-mcq-5-422",
        "question": "Melanocyte-stimulating hormone (MSH) is secreted by",
        "correctAnswer": "Anterior pituitary gland",
        "subtopic": "24.6-VI. The endocrine system"
      },
      {
        "id": "phys-mcq-5-423",
        "question": "The normal pH range of blood is approximately",
        "correctAnswer": "7.35 - 7.45",
        "subtopic": "24.9-IX. Renal system"
      },
      {
        "id": "phys-mcq-5-424",
        "question": "What acts as a buffer within RBCs?",
        "correctAnswer": "Hemoglobin",
        "subtopic": "24.9-IX. Renal system"
      },
      {
        "id": "phys-mcq-5-425",
        "question": "The meaning of mastitis is",
        "correctAnswer": "Inflammation of the mammary glands",
        "subtopic": "24.10-X. The reproductive system"
      }
    ],
    "subjectiveQuestions": [
      {
        "id": "phys-subj-5-1",
        "question": "Define respiration.",
        "type": "Very short",
        "marks": 2,
        "difficulty": 1
      },
      {
        "id": "phys-subj-5-2",
        "question": "Write external and internal respiration.",
        "type": "Very short",
        "marks": 2,
        "difficulty": 1
      },
      {
        "id": "phys-subj-5-3",
        "question": "Write the process of external respiration.",
        "type": "Very short",
        "marks": 2,
        "difficulty": 1
      },
      {
        "id": "phys-subj-5-4",
        "question": "Explain the method of mouth-to-mouth artificial respiration.",
        "type": "Short",
        "marks": 5,
        "difficulty": 1
      },
      {
        "id": "phys-subj-5-5",
        "question": "Explain vital capacity and tidal volume.",
        "type": "Short",
        "marks": 5,
        "difficulty": 1
      },
      {
        "id": "phys-subj-5-6",
        "question": "Explain alveolar ventilation and dead space.",
        "type": "Short",
        "marks": 5,
        "difficulty": 1
      },
      {
        "id": "phys-subj-5-7",
        "question": "Define hypoxia and its causes.",
        "type": "Short",
        "marks": 5,
        "difficulty": 1
      },
      {
        "id": "phys-subj-5-8",
        "question": "Explain stagnant hypoxia.",
        "type": "Short",
        "marks": 5,
        "difficulty": 1
      },
      {
        "id": "phys-subj-5-9",
        "question": "Explain pulmonary ventilation.",
        "type": "Short",
        "marks": 5,
        "difficulty": 1
      },
      {
        "id": "phys-subj-5-10",
        "question": "Determine the functions of respiratory organs.",
        "type": "Short",
        "marks": 5,
        "difficulty": 1
      },
      {
        "id": "phys-subj-5-11",
        "question": "Describe types of hypoxia and their causes.",
        "type": "Short",
        "marks": 5,
        "difficulty": 1
      },
      {
        "id": "phys-subj-5-12",
        "question": "Explain respiratory changes during exercise.",
        "type": "Short",
        "marks": 5,
        "difficulty": 1
      },
      {
        "id": "phys-subj-5-13",
        "question": "Elaborate on the structure and functions of the respiratory system with a diagram. (5+5)",
        "type": "Essay",
        "marks": 10,
        "difficulty": 1
      },
      {
        "id": "phys-subj-5-14",
        "question": "Draw the diagram of lungs, label it, and describe the functions of lungs. (3+2+5)",
        "type": "Essay",
        "marks": 10,
        "difficulty": 1
      },
      {
        "id": "phys-subj-5-15",
        "question": "Elaborate on the structure and functions of the lower respiratory system with a labelled diagram. (4+6)",
        "type": "Essay",
        "marks": 10,
        "difficulty": 1
      },
      {
        "id": "phys-subj-5-16",
        "question": "Illustrate pulmonary ventilation and the mechanism of breathing with a diagram of the lung. (4+6)",
        "type": "Essay",
        "marks": 10,
        "difficulty": 1
      },
      {
        "id": "phys-subj-5-17",
        "question": "Recognize the normal respiration rate in adults and determine the factors that influence respiration. (2+8)",
        "type": "Essay",
        "marks": 10,
        "difficulty": 1
      },
      {
        "id": "phys-subj-5-18",
        "question": "Describe how oxygen is transported from the lungs to tissues. (10)",
        "type": "Essay",
        "marks": 10,
        "difficulty": 1
      },
      {
        "id": "phys-subj-5-19",
        "question": "Explain the structure and functions of the respiratory system. (5+5)",
        "type": "Essay",
        "marks": 10,
        "difficulty": 1
      },
      {
        "id": "phys-subj-5-20",
        "question": "Explain the functions of the lung and tracheobronchial tree with a diagram of the lung. (5+5)",
        "type": "Essay",
        "marks": 10,
        "difficulty": 1
      },
      {
        "id": "phys-subj-5-21",
        "question": "Illustrates lungs volume and lungs capacities. (5+5)",
        "type": "Essay",
        "marks": 10,
        "difficulty": 1
      }
    ]
  },
  "phys-unit-6": {
    "id": "phys-unit-6",
    "unitNumber": 6,
    "title": "Digestive System Physiology",
    "category": "GI Secretion, Digestion & Motility",
    "icon": "🍽️",
    "color": "from-emerald-500 to-teal-600",
    "teachingHours": "60 Hours INC Curriculum (Theory 18h + Practical 42h)",
    "summary": "Detailed functional mechanisms, regulation, homeostatic balance, clinical alterations and official INC competencies of Digestive System Physiology.",
    "objectives": [
      "Describe the physiology of the digestive system and alteration in diseases of the digestive system.",
      "Enumerate the functions of the Digestive System.",
      "Describe the functions of the Mouth.",
      "Describe the properties, composition andfunctions of the Salivary Glands.",
      "Discuss the physiology of tongue and functions of muscles of the Tongue.",
      "Discuss the functions of the Esophagus and Diaphragm.",
      "Discuss the functions of the Stomach.",
      "Describe the functions of Liver and properties, composition of Bile and functions of Bile."
    ],
    "totalImages": 9,
    "sections": [
      {
        "id": "sec-phys-6-1",
        "title": "Oral Digestion, Salivary Secretion & The Deglutition Reflex",
        "content": [
          "The digestive system performs ingestion, mechanical processing, chemical digestion, secretion, absorption, and elimination along a 9-meter gastrointestinal tract.",
          "In the oral cavity, food is mechanically masticated by teeth and mixed with **saliva**, a watery secretion produced at a rate of 1.0 to 1.5 liters per day by three pairs of major salivary glands: **Parotid** (serous saliva rich in alpha-amylase / ptyalin), **Submandibular** (mixed seromucous), and **Sublingual** (mucous-rich).",
          "Saliva consists of 99.5% water, 0.3% proteins (salivary amylase, lingual lipase, mucin, lysozyme, secretory IgA), and 0.2% inorganic electrolytes (potassium, bicarbonate, sodium, chloride). It lubricates food boluses, initiates starch digestion (hydrolyzing alpha-1,4 glycosidic bonds into maltose and dextrins at optimal pH 6.8), dissolves tastants for taste bud stimulation, and cleanses the oral cavity with antimicrobial enzymes.",
          "Salivary secretion is regulated entirely by **autonomic neural reflexes** (no hormonal control): **Parasympathetic stimulation** (via cranial nerves VII and IX) evokes copious watery saliva rich in enzymes; **Sympathetic stimulation** (via superior cervical ganglion) evokes small volumes of thick, viscous mucus.",
          "**Deglutition (Swallowing):** Divided into three phases: (1) **Oral (Buccal) Phase** (voluntary; tongue compresses bolus against hard palate and propels it into oropharynx), (2) **Pharyngeal Phase** (involuntary reflex coordinated by medullary swallowing center; soft palate elevates closing nasopharynx, epiglottis bends downward closing laryngeal inlet, vocal cords adduct, and upper esophageal sphincter relaxes), and (3) **Esophageal Phase** (primary peristaltic wave propels bolus down esophagus in 5-8 seconds)."
        ],
        "points": [
          "**Parasympathetic Pathways of Salivation:** Inferior salivatory nucleus -> Glossopharyngeal nerve (CN IX) -> Otic ganglion -> Parotid gland; Superior salivatory nucleus -> Facial nerve (CN VII) -> Chorda tympani -> Submandibular ganglion -> Submandibular and Sublingual glands.",
          "**Conditioned vs. Unconditioned Salivary Reflexes:** Unconditioned reflex is triggered by physical presence of food in mouth stimulating taste buds; Conditioned (Pavlovian) reflex is triggered by sight, smell, or thought of food stimulating cerebral cortical pathways.",
          "**Upper & Lower Esophageal Sphincters:** Upper esophageal sphincter (UES / cricopharyngeus) prevents aerophagia; Lower esophageal sphincter (LES / cardiac sphincter) remains tonically constricted at 15-25 mmHg via vagal myogenic tone, preventing retrograde gastric acid reflux."
        ],
        "clinicalPearl": "**Achalasia Cardia & GERD Bedside Management:** **Achalasia** is a primary esophageal motility disorder caused by autoimmune destruction of nitric oxide-producing inhibitory ganglion cells in the myenteric (Auerbach) plexus of the lower esophagus. The LES fails to relax during swallowing, and esophageal peristalsis is lost, producing progressive dysphagia for solids and liquids, regurgitation, and a classic 'bird's beak' appearance on barium swallow. In **Gastroesophageal Reflux Disease (GERD)**, transient inappropriate LES relaxation permits acidic gastric juice to erode esophageal mucosa, requiring proton pump inhibitors (PPIs) and elevating the head of the bed 30 degrees after meals.",
        "images": [
          {
            "src": "/images/physiology/6_image1.png",
            "caption": "Figure 6.1: Composition and enzymatic components of saliva.",
            "alt": "Composition of saliva"
          },
          {
            "src": "/images/physiology/6_image2.png",
            "caption": "Figure 6.2: Autonomic innervation to salivary glands.",
            "alt": "Autonomic nerve supply to salivary glands"
          }
        ],
        "tables": []
      },
      {
        "id": "sec-phys-6-2",
        "title": "Gastric Secretion, Enzymatic Digestion & Gastric Motility",
        "content": [
          "The stomach operates as a muscular mixing and storage reservoir that converts ingested solid food into an acidic, semi-fluid slurry called **chyme** while secreting 2 to 3 liters of **gastric juice** daily.",
          "Gastric juice is a potent acidic fluid (pH 1.0 to 2.0) containing: **Hydrochloric Acid (HCl)** (secreted by **Parietal Cells** via apical H+/K+-ATPase proton pumps, denaturing dietary proteins, killing ingested microbes, and activating pepsinogen), **Pepsinogens** (secreted by **Chief Cells**, cleaved by HCl into active endopeptidase **pepsin** which cleaves peptide bonds), **Intrinsic Factor** (indispensable glycoprotein required for ileal absorption of Vitamin B12), **Gastric Lipase** (cleaves short- and medium-chain triglycerides), and **Mucus & Bicarbonate** (secreted by surface mucous cells, creating a 1-mm physical and chemical alkaline barrier shielding the gastric wall from autodigestion).",
          "**Three Phases of Gastric Secretion:**",
          "1. **Cephalic Phase (30-35%):** Triggered by sight, smell, or thought of food; mediated by vagus nerve (CN X) releasing acetylcholine (ACh) onto parietal cells and G-cells.",
          "2. **Gastric Phase (60%):** Triggered by food bolus arrival stretching gastric mechanoreceptors and partially digested peptides stimulating **G-cells** in the pyloric antrum to release the hormone **Gastrin** into the bloodstream.",
          "3. **Intestinal Phase (10%):** Initiated by chyme entry into duodenum; initial transient stimulation followed by powerful inhibitory enterogastric reflexes (**Secretin, Cholecystokinin / CCK, and Gastric Inhibitory Peptide / GIP**) that suppress gastric acid secretion and slow gastric emptying."
        ],
        "points": [
          "**Parietal Cell Acid Secretion Mechanism:** Basolateral HCO3-/Cl- exchanger pumps bicarbonate into blood (causing the postprandial **alkaline tide**) while importing Cl-; apical **H+/K+-ATPase pump** actively extrudes H+ into gastric lumen against a million-fold gradient in exchange for K+; Cl- diffuses through apical conductance channels, forming luminal HCl.",
          "**Three Synergistic Stimulators of Acid Secretion:** (1) **Acetylcholine (ACh)** (vagal, M3 muscarinic receptors), (2) **Gastrin** (antral G-cells, CCK-B receptors), and (3) **Histamine** (paracrine release from enterochromaffin-like / ECL cells, binding **H2 receptors**). Blocking any one pathway (e.g., H2 blockers like famotidine, or PPIs like omeprazole) potently suppresses acid secretion.",
          "**Gastric Receptive Relaxation:** Swallowing triggers vagally-mediated reflex relaxation of the gastric fundus and body, allowing the stomach to accommodate 1.5 liters of food without significant intra-gastric pressure increase.",
          "**Peristalsis & Pyloric Sieving:** Basic electrical rhythm (BER) pacemaker cells in the greater curvature generate 3 slow peristaltic waves per minute; strong antral contractions crush chyme against a closed pyloric sphincter, permitting only 2 to 3 mL of liquid chyme into the duodenum per wave (**retropulsion**)."
        ],
        "clinicalPearl": "**Peptic Ulcers, H. pylori & Pernicious Anemia:** Disruption of the protective gastric mucosal barrier by *Helicobacter pylori* infection (which produces urease, generating toxic ammonia) or chronic NSAID use (inhibiting protective prostaglandin E2 synthesis) permits luminal acid and pepsin to erode submucosal vessels, causing bleeding **peptic ulcers**. Autoimmune destruction of gastric parietal cells in chronic atrophic gastritis eliminates **Intrinsic Factor** production, abolishing ileal Vitamin B12 absorption and precipitating **pernicious anemia** and peripheral neuropathy.",
        "images": [
          {
            "src": "/images/physiology/6_image3.png",
            "caption": "Figure 6.3: Mechanism of gastric acid secretion by parietal cells.",
            "alt": "Composition of gastric juice"
          }
        ],
        "tables": []
      },
      {
        "id": "sec-phys-6-3",
        "title": "Biliary Physiology, Hepatic Functions & Pancreatic Exocrine Secretion",
        "content": [
          "The liver, gallbladder, and exocrine pancreas deliver essential alkaline juices and enzymes into the second part of the duodenum at the ampulla of Vater to execute lipid, protein, and carbohydrate digestion.",
          "**Hepatic Bile Synthesis & Secretion:** Hepatocytes synthesize 500 to 1,000 mL of golden-yellow alkaline bile (pH 7.6-8.6) daily. Bile contains no digestive enzymes; it consists of water, electrolytes, **bile salts** (sodium glycocholate and taurocholate), **bile pigments** (bilirubin glucuronide), **cholesterol**, and **lecithin (phospholipids)**.",
          "The **gallbladder** stores and concentrates hepatic bile 5- to 10-fold by reabsorbing water and NaCl. Entry of fatty chyme into the duodenum stimulates duodenal I-cells to release **Cholecystokinin (CCK)**, which stimulates powerful gallbladder contraction while simultaneously relaxing the **Sphincter of Oddi**, discharging concentrated bile into the duodenum.",
          "**Physiological Roles of Bile Salts:** (1) **Emulsification** (breaking large fat globules into minute 1-μm droplets, increasing surface area for pancreatic lipase), (2) **Micelle Formation** (water-soluble spherical aggregates enclosing fatty acids and monoglycerides for enterocyte absorption), and (3) **Enterohepatic Circulation** (95% of bile salts are reabsorbed in the terminal ileum and returned to the liver via portal blood).",
          "**Exocrine Pancreatic Secretion:** Pancreatic acinar cells synthesize 1.0 to 1.5 liters of enzyme-rich pancreatic juice daily, while ductal epithelial cells secrete watery fluid packed with **Bicarbonate (HCO3-)** under stimulation by duodenal **Secretin**, neutralizing acidic gastric chyme to pH 7.0-8.0."
        ],
        "points": [
          "**Pancreatic Proteolytic Zymogens:** Secreted as inactive precursors to prevent pancreatic autodigestion: **Trypsinogen** (cleaved by brush-border **enteropeptidase / enterokinase** in duodenum into active **Trypsin**); Trypsin then autocatalytically activates chymotrypsinogen, procarboxypeptidase, and proelastase.",
          "**Pancreatic Amylase & Lipase:** Pancreatic amylase digests remaining starches into disaccharides; Pancreatic lipase (assisted by colipase) hydrolyzes dietary triglycerides into 2-monoglycerides and two free fatty acids.",
          "**Dual Hormonal Control of Pancreas:** **Secretin** (released in response to duodenal acid pH < 4.5) stimulates copious watery bicarbonate secretion; **Cholecystokinin (CCK)** (released in response to fatty acids and amino acids) stimulates enzyme-rich acinar secretion.",
          "**Bile Acid Composition:** Primary bile acids (cholic and chenodeoxycholic acids) synthesized from cholesterol; converted by intestinal bacteria into secondary bile acids (deoxycholic and lithocholic acids)."
        ],
        "clinicalPearl": "**Acute Pancreatitis & Obstructive Jaundice Pathophysiology:** If a migrating gallstone (choledocholithiasis) lodges distally in the ampulla of Vater, it obstructs both the common bile duct and pancreatic duct. Intra-pancreatic ductal pressure spikes, causing premature, inappropriate activation of **trypsinogen into trypsin inside pancreatic acini**, initiating massive **autodigestion of pancreatic parenchyma, fat necrosis, and severe hemorrhagic pancreatitis**. Retrograde bile retention causes **obstructive (cholestatic) jaundice**, manifested by hyperbilirubinemia, clay-colored (acholic) stools, and dark tea-colored urine.",
        "images": [
          {
            "src": "/images/physiology/6_image4.png",
            "caption": "Figure 6.4: Biliary tract anatomy and gallbladder bile concentration.",
            "alt": "Biliary systems"
          },
          {
            "src": "/images/physiology/6_image5.png",
            "caption": "Figure 6.5: Composition and enterohepatic circulation of bile salts.",
            "alt": "Composition of bile"
          },
          {
            "src": "/images/physiology/6_image6.png",
            "caption": "Figure 6.6: Exocrine pancreatic secretion and enzyme activation.",
            "alt": "Composition of pancreatic juice"
          }
        ],
        "tables": []
      },
      {
        "id": "sec-phys-6-4",
        "title": "Small Intestinal Motility, Secretion & Nutrient Absorption Pathways",
        "content": [
          "The small intestine (duodenum, jejunum, ileum) is the paramount physiological site where chemical digestion is finalized and over 90% of all dietary nutrients, electrolytes, and water are absorbed into mesenteric blood and lacteals.",
          "**Intestinal Secretion (Succus Entericus):** Crypts of Lieberkühn secrete 1 to 2 liters of clear, yellowish alkaline fluid (pH 7.5-8.0) daily, rich in water, electrolytes, and mucus from duodenal **Brunner's glands** to lubricate mucosal surfaces. Final enzymatic breakdown occurs directly at the enterocyte **brush border** (microvilli membrane-bound enzymes: **maltase, sucrase, lactase**, aminopeptidases, dipeptidases, nucleosidases, and enterokinase).",
          "**Nutrient Absorption Mechanics:**",
          "• **Carbohydrates:** Glucose and Galactose are absorbed across the apical membrane via **SGLT-1** (Sodium-Glucose Secondary Active Cotransporter, coupled to Na+ influx generated by basolateral Na+/K+-ATPase); Fructose is absorbed via **GLUT-5** facilitated diffusion. All monosaccharides exit basolaterally into capillaries via **GLUT-2**.",
          "• **Proteins:** Amino acids are cotransported with Na+; di- and tripeptides are imported via **PepT1** (H+-coupled cotransport), hydrolyzed inside enterocytes into free amino acids, and extruded into mesenteric capillaries.",
          "• **Lipids:** Free fatty acids and monoglycerides diffuse out of bile salt micelles across the apical enterocyte membrane. Inside the smooth ER, they are re-esterified into triglycerides, packaged with cholesterol and apolipoproteins into **Chylomicrons**, and discharged by exocytosis into **lacteals** to enter the thoracic duct."
        ],
        "points": [
          "**Small Intestinal Motility Patterns:** (1) **Segmentation:** Localized rhythmic circular muscle contractions that chop and mix chyme with digestive juices and press it against the absorptive brush border; (2) **Peristalsis:** Weak propulsive waves moving chyme 1 cm/min; and (3) **Migrating Motor Complex (MMC):** Sweeping waves of peristalsis every 90 minutes during fasting stimulated by the hormone **Motilin**, clearing residual indigestible debris (\"the intestinal housekeeper\").",
          "**Enteric Nervous System Regulation:** **Auerbach's (Myenteric) Plexus** (situated between longitudinal and circular muscle layers) coordinates intestinal motor propulsion; **Meissner's (Submucosal) Plexus** coordinates localized mucosal blood flow and glandular secretion.",
          "**Water Absorption Dynamics:** 8 to 9 liters of fluid enter the GI tract daily (2 L dietary, 7 L digestive juices); small intestine absorbs 7 to 8 liters, driven entirely by osmotic gradients established by active Na+ and nutrient cotransport."
        ],
        "clinicalPearl": "**Oral Rehydration Therapy (ORT) Physiological Basis & Celiac Disease:** In severe secretory diarrhea (e.g., cholera toxin continuously activating adenylyl cyclase and CFTR chloride channels), active water and electrolyte secretion causes rapid fatal dehydration. However, the **SGLT-1 Na+-glucose cotransporter remains fully functional**. Feeding an Oral Rehydration Solution (ORS) containing precise equimolar concentrations of glucose and sodium drives rapid SGLT-1 transport, drawing water back into the body by osmosis and saving millions of lives. In **Celiac Disease**, autoimmune reaction to gluten destroys intestinal villi, severely reducing absorptive surface area and causing severe malabsorption, steatorrhea, and weight loss.",
        "images": [
          {
            "src": "/images/physiology/6_image7.png",
            "caption": "Figure 6.7: Composition and brush border enzymes of succus entericus.",
            "alt": "Composition of succus entericus"
          },
          {
            "src": "/images/physiology/6_image9.png",
            "caption": "Figure 6.9: Segmenting and peristaltic motility patterns of the small intestine.",
            "alt": "Movements of small intestine"
          }
        ],
        "tables": []
      },
      {
        "id": "sec-phys-6-5",
        "title": "Colonic Function, Intestinal Microbiome & GI Alterations in Disease",
        "content": [
          "The large intestine (cecum, colon, rectum, anal canal) receives approximately 1,000 to 1,500 mL of fluid chyme daily through the ileocecal valve, absorbing 90% of remaining water and electrolytes, consolidating indigestible residue into 100 to 200 grams of semi-solid **feces**.",
          "The colonic mucosa secretes alkaline mucus (pH 8.0) rich in bicarbonate and potassium, which lubricates fecal transit and neutralizes bacterial organic acids. The colon exhibits unique motility patterns: slow **haustral churning**, non-propulsive haustral shuttling, and 1 to 3 times daily powerful **Mass Movements** (propelling colonic contents into the rectum, often triggered after meals by the **gastrocolic and duodenocolic reflexes**).",
          "**Colonic Microbiome:** The colon harbors over 100 trillion commensal bacteria (predominantly anaerobes like *Bacteroides, Bifidobacterium*, and *Lactobacillus*). Bacterial fermentation metabolizes residual indigestible carbohydrates (dietary fiber) into **Short-Chain Fatty Acids (SCFAs: butyrate, acetate, propionate)** that nourish colonocytes, synthesize essential **Vitamin K** (indispensable for hepatic clotting factor synthesis) and B-vitamins, and suppress colonization by enteric pathogens.",
          "**The Defecation Reflex:** Distension of the rectal wall by fecal mass (> 25% capacity) stimulates pelvic parasympathetic nerves, triggering contraction of rectal walls and involuntary relaxation of the **Internal Anal Sphincter**. Defecation is voluntarily deferred by conscious tonic contraction of the **External Anal Sphincter** (innervated by the somatic pudendal nerve)."
        ],
        "points": [
          "**Gastrocolic Reflex:** Ingestion of food and gastric distension triggers vagal and hormonal (gastrin) signals stimulating immediate mass movement in the transverse and descending colon, prompting postprandial urge to defecate.",
          "**Valsalva Maneuver in Defecation:** Voluntary forced expiration against a closed glottis elevates intra-abdominal pressure, assisting rectal evacuation; however, extreme Valsalva spikes venous pressure and can precipitate cardiac arrhythmias.",
          "**Diarrhea vs. Constipation:** Diarrhea (increased stool fluidity and frequency > 3/day) results from rapid motility reducing water absorption or active mucosal secretion (enterotoxins), leading to hypokalemia and metabolic acidosis; Constipation (infrequent, hard stools) results from prolonged transit permitting excessive water reabsorption.",
          "**Jaundice (Icterus) Classifications:** (1) **Pre-hepatic (Hemolytic):** Excess unconjugated bilirubin from massive hemolysis; (2) **Hepatic (Hepatocellular):** Impaired conjugation and excretion (viral hepatitis, cirrhosis); (3) **Post-hepatic (Obstructive):** Biliary duct obstruction (gallstones, pancreatic cancer) producing elevated conjugated bilirubin, dark urine, and pale acholic stools."
        ],
        "clinicalPearl": "**Antibiotic-Associated Colitis (*C. diff*) & Liver Cirrhosis Encephalopathy:** Broad-spectrum antibiotic therapy decimates normal colonic bacterial flora, permitting overgrowth of spore-forming *Clostridioides difficile*, which releases toxins A and B, producing severe **pseudomembranous colitis** with foul-smelling watery diarrhea, toxic megacolon, and sepsis. In advanced liver cirrhosis with portosystemic shunting, colonic bacteria convert dietary proteins into **ammonia (NH3)**; the failing liver cannot convert ammonia to urea, allowing neurotoxic ammonia to cross the blood-brain barrier, precipitating **hepatic encephalopathy** (asterixis / flapping tremor and coma), treated with **lactulose** to acidify the colon and trap ammonia as non-absorbable ammonium (NH4+).",
        "images": [
          {
            "src": "/images/physiology/6_image8.png",
            "caption": "Figure 6.8: Large intestinal fluid absorption and mucus secretion.",
            "alt": "Large intestinal juice"
          }
        ],
        "tables": []
      }
    ],
    "mcqs": [
      {
        "id": "phys-mcq-6-426",
        "question": "The full form of PID is",
        "correctAnswer": "Pelvic Inflammatory Disease",
        "subtopic": "24.10-X. The reproductive system"
      },
      {
        "id": "phys-mcq-6-427",
        "question": "The organ associated with cervical carcinoma is the",
        "correctAnswer": "Cervix",
        "subtopic": "24.10-X. The reproductive system"
      },
      {
        "id": "phys-mcq-6-428",
        "question": "The meaning of Gynecomastia is",
        "correctAnswer": "Enlargement of the breasts in males",
        "subtopic": "24.10-X. The reproductive system"
      },
      {
        "id": "phys-mcq-6-429",
        "question": "The meaning of acute salpingitis is",
        "correctAnswer": "Inflammation of the fallopian tubes",
        "subtopic": "24.10-X. The reproductive system"
      },
      {
        "id": "phys-mcq-6-430",
        "question": "Inability to retract the foreskin over the glans penis is known as",
        "correctAnswer": "Phimosis",
        "subtopic": "24.10-X. The reproductive system"
      },
      {
        "id": "phys-mcq-6-431",
        "question": "In the human body, a hemoglobin level of 8-12 g/dL is typically called",
        "correctAnswer": "Anemia",
        "subtopic": "24.5-V. Blood"
      },
      {
        "id": "phys-mcq-6-432",
        "question": "Discoloration of the skin, eyes, and other body tissues is called",
        "correctAnswer": "Jaundice",
        "subtopic": "24.5-V. Blood"
      },
      {
        "id": "phys-mcq-6-433",
        "question": "In the human body, an increase in the number of red blood cells (RBCs) count is called",
        "correctAnswer": "Polycythemia",
        "subtopic": "24.5-V. Blood"
      },
      {
        "id": "phys-mcq-6-434",
        "question": "The functional unit of life is called",
        "correctAnswer": "Cell",
        "subtopic": "24.1-I. General Physiology–Basic concepts"
      },
      {
        "id": "phys-mcq-6-435",
        "question": "The cell was discovered by",
        "correctAnswer": "Robert Hooke",
        "subtopic": "24.1-I. General Physiology–Basic concepts"
      },
      {
        "id": "phys-mcq-6-436",
        "question": "Which of these organelles contain DNA?",
        "correctAnswer": "Golgi apparatus",
        "subtopic": "24.1-I. General Physiology–Basic concepts"
      },
      {
        "id": "phys-mcq-6-437",
        "question": "Which of these organelles contain chromatin?",
        "correctAnswer": "Nucleus",
        "subtopic": "24.1-I. General Physiology–Basic concepts"
      },
      {
        "id": "phys-mcq-6-438",
        "question": "Which of the following transport mechanisms requires energy?",
        "correctAnswer": "Secondary active transport",
        "subtopic": "24.1-I. General Physiology–Basic concepts"
      },
      {
        "id": "phys-mcq-6-439",
        "question": "The functional unit of nervous tissue is",
        "correctAnswer": "Neurons",
        "subtopic": "24.1-I. General Physiology–Basic concepts"
      },
      {
        "id": "phys-mcq-6-440",
        "question": "At rest, a human being breathes per minute",
        "correctAnswer": "12-15 times per minute",
        "subtopic": "24.1-I. General Physiology–Basic concepts"
      },
      {
        "id": "phys-mcq-6-441",
        "question": "Ductless glands are described as",
        "correctAnswer": "Endocrine",
        "subtopic": "24.1-I. General Physiology–Basic concepts"
      },
      {
        "id": "phys-mcq-6-442",
        "question": "Cells not present in connective tissues are",
        "correctAnswer": "Neurons",
        "subtopic": "24.1-I. General Physiology–Basic concepts"
      },
      {
        "id": "phys-mcq-6-443",
        "question": "nan",
        "correctAnswer": "nan",
        "subtopic": "nan"
      },
      {
        "id": "phys-mcq-6-444",
        "question": "nan",
        "correctAnswer": "nan",
        "subtopic": "nan"
      },
      {
        "id": "phys-mcq-6-445",
        "question": "nan",
        "correctAnswer": "nan",
        "subtopic": "nan"
      },
      {
        "id": "phys-mcq-6-446",
        "question": "nan",
        "correctAnswer": "nan",
        "subtopic": "nan"
      },
      {
        "id": "phys-mcq-6-447",
        "question": "nan",
        "correctAnswer": "nan",
        "subtopic": "nan"
      },
      {
        "id": "phys-mcq-6-448",
        "question": "nan",
        "correctAnswer": "nan",
        "subtopic": "nan"
      },
      {
        "id": "phys-mcq-6-449",
        "question": "nan",
        "correctAnswer": "nan",
        "subtopic": "nan"
      },
      {
        "id": "phys-mcq-6-450",
        "question": "nan",
        "correctAnswer": "nan",
        "subtopic": "nan"
      },
      {
        "id": "phys-mcq-6-451",
        "question": "nan",
        "correctAnswer": "nan",
        "subtopic": "nan"
      },
      {
        "id": "phys-mcq-6-452",
        "question": "nan",
        "correctAnswer": "nan",
        "subtopic": "nan"
      },
      {
        "id": "phys-mcq-6-453",
        "question": "nan",
        "correctAnswer": "nan",
        "subtopic": "nan"
      },
      {
        "id": "phys-mcq-6-454",
        "question": "nan",
        "correctAnswer": "nan",
        "subtopic": "nan"
      },
      {
        "id": "phys-mcq-6-455",
        "question": "nan",
        "correctAnswer": "nan",
        "subtopic": "nan"
      },
      {
        "id": "phys-mcq-6-456",
        "question": "nan",
        "correctAnswer": "nan",
        "subtopic": "nan"
      },
      {
        "id": "phys-mcq-6-457",
        "question": "nan",
        "correctAnswer": "nan",
        "subtopic": "nan"
      },
      {
        "id": "phys-mcq-6-458",
        "question": "nan",
        "correctAnswer": "nan",
        "subtopic": "nan"
      },
      {
        "id": "phys-mcq-6-459",
        "question": "nan",
        "correctAnswer": "nan",
        "subtopic": "nan"
      },
      {
        "id": "phys-mcq-6-460",
        "question": "nan",
        "correctAnswer": "nan",
        "subtopic": "nan"
      },
      {
        "id": "phys-mcq-6-461",
        "question": "nan",
        "correctAnswer": "nan",
        "subtopic": "nan"
      },
      {
        "id": "phys-mcq-6-462",
        "question": "nan",
        "correctAnswer": "nan",
        "subtopic": "nan"
      },
      {
        "id": "phys-mcq-6-463",
        "question": "nan",
        "correctAnswer": "nan",
        "subtopic": "nan"
      },
      {
        "id": "phys-mcq-6-464",
        "question": "nan",
        "correctAnswer": "nan",
        "subtopic": "nan"
      },
      {
        "id": "phys-mcq-6-465",
        "question": "nan",
        "correctAnswer": "nan",
        "subtopic": "nan"
      },
      {
        "id": "phys-mcq-6-466",
        "question": "nan",
        "correctAnswer": "nan",
        "subtopic": "nan"
      },
      {
        "id": "phys-mcq-6-467",
        "question": "nan",
        "correctAnswer": "nan",
        "subtopic": "nan"
      },
      {
        "id": "phys-mcq-6-468",
        "question": "nan",
        "correctAnswer": "nan",
        "subtopic": "nan"
      },
      {
        "id": "phys-mcq-6-469",
        "question": "nan",
        "correctAnswer": "nan",
        "subtopic": "nan"
      },
      {
        "id": "phys-mcq-6-470",
        "question": "nan",
        "correctAnswer": "nan",
        "subtopic": "nan"
      },
      {
        "id": "phys-mcq-6-471",
        "question": "nan",
        "correctAnswer": "nan",
        "subtopic": "nan"
      },
      {
        "id": "phys-mcq-6-472",
        "question": "nan",
        "correctAnswer": "nan",
        "subtopic": "nan"
      },
      {
        "id": "phys-mcq-6-473",
        "question": "nan",
        "correctAnswer": "nan",
        "subtopic": "nan"
      },
      {
        "id": "phys-mcq-6-474",
        "question": "nan",
        "correctAnswer": "nan",
        "subtopic": "nan"
      },
      {
        "id": "phys-mcq-6-475",
        "question": "nan",
        "correctAnswer": "nan",
        "subtopic": "nan"
      },
      {
        "id": "phys-mcq-6-476",
        "question": "nan",
        "correctAnswer": "nan",
        "subtopic": "nan"
      },
      {
        "id": "phys-mcq-6-477",
        "question": "nan",
        "correctAnswer": "nan",
        "subtopic": "nan"
      },
      {
        "id": "phys-mcq-6-478",
        "question": "nan",
        "correctAnswer": "nan",
        "subtopic": "nan"
      },
      {
        "id": "phys-mcq-6-479",
        "question": "nan",
        "correctAnswer": "nan",
        "subtopic": "nan"
      },
      {
        "id": "phys-mcq-6-480",
        "question": "nan",
        "correctAnswer": "nan",
        "subtopic": "nan"
      },
      {
        "id": "phys-mcq-6-481",
        "question": "nan",
        "correctAnswer": "nan",
        "subtopic": "nan"
      },
      {
        "id": "phys-mcq-6-482",
        "question": "nan",
        "correctAnswer": "nan",
        "subtopic": "nan"
      },
      {
        "id": "phys-mcq-6-483",
        "question": "nan",
        "correctAnswer": "nan",
        "subtopic": "nan"
      },
      {
        "id": "phys-mcq-6-484",
        "question": "nan",
        "correctAnswer": "nan",
        "subtopic": "nan"
      },
      {
        "id": "phys-mcq-6-485",
        "question": "nan",
        "correctAnswer": "nan",
        "subtopic": "nan"
      },
      {
        "id": "phys-mcq-6-486",
        "question": "nan",
        "correctAnswer": "nan",
        "subtopic": "nan"
      },
      {
        "id": "phys-mcq-6-487",
        "question": "nan",
        "correctAnswer": "nan",
        "subtopic": "nan"
      },
      {
        "id": "phys-mcq-6-488",
        "question": "nan",
        "correctAnswer": "nan",
        "subtopic": "nan"
      },
      {
        "id": "phys-mcq-6-489",
        "question": "nan",
        "correctAnswer": "nan",
        "subtopic": "nan"
      },
      {
        "id": "phys-mcq-6-490",
        "question": "nan",
        "correctAnswer": "nan",
        "subtopic": "nan"
      },
      {
        "id": "phys-mcq-6-491",
        "question": "nan",
        "correctAnswer": "nan",
        "subtopic": "nan"
      },
      {
        "id": "phys-mcq-6-492",
        "question": "nan",
        "correctAnswer": "nan",
        "subtopic": "nan"
      },
      {
        "id": "phys-mcq-6-493",
        "question": "nan",
        "correctAnswer": "nan",
        "subtopic": "nan"
      },
      {
        "id": "phys-mcq-6-494",
        "question": "nan",
        "correctAnswer": "nan",
        "subtopic": "nan"
      },
      {
        "id": "phys-mcq-6-495",
        "question": "nan",
        "correctAnswer": "nan",
        "subtopic": "nan"
      },
      {
        "id": "phys-mcq-6-496",
        "question": "nan",
        "correctAnswer": "nan",
        "subtopic": "nan"
      },
      {
        "id": "phys-mcq-6-497",
        "question": "nan",
        "correctAnswer": "nan",
        "subtopic": "nan"
      },
      {
        "id": "phys-mcq-6-498",
        "question": "nan",
        "correctAnswer": "nan",
        "subtopic": "nan"
      },
      {
        "id": "phys-mcq-6-499",
        "question": "nan",
        "correctAnswer": "nan",
        "subtopic": "nan"
      },
      {
        "id": "phys-mcq-6-500",
        "question": "nan",
        "correctAnswer": "nan",
        "subtopic": "nan"
      },
      {
        "id": "phys-mcq-6-501",
        "question": "nan",
        "correctAnswer": "nan",
        "subtopic": "nan"
      },
      {
        "id": "phys-mcq-6-502",
        "question": "nan",
        "correctAnswer": "nan",
        "subtopic": "nan"
      },
      {
        "id": "phys-mcq-6-503",
        "question": "nan",
        "correctAnswer": "nan",
        "subtopic": "nan"
      },
      {
        "id": "phys-mcq-6-504",
        "question": "nan",
        "correctAnswer": "nan",
        "subtopic": "nan"
      },
      {
        "id": "phys-mcq-6-505",
        "question": "nan",
        "correctAnswer": "nan",
        "subtopic": "nan"
      },
      {
        "id": "phys-mcq-6-506",
        "question": "nan",
        "correctAnswer": "nan",
        "subtopic": "nan"
      },
      {
        "id": "phys-mcq-6-507",
        "question": "nan",
        "correctAnswer": "nan",
        "subtopic": "nan"
      },
      {
        "id": "phys-mcq-6-508",
        "question": "nan",
        "correctAnswer": "nan",
        "subtopic": "nan"
      },
      {
        "id": "phys-mcq-6-509",
        "question": "nan",
        "correctAnswer": "nan",
        "subtopic": "nan"
      },
      {
        "id": "phys-mcq-6-510",
        "question": "nan",
        "correctAnswer": "nan",
        "subtopic": "nan"
      }
    ],
    "subjectiveQuestions": [
      {
        "id": "phys-subj-6-1",
        "question": "Draw a diagram of the pancreas with labels.",
        "type": "Very short",
        "marks": 2,
        "difficulty": 1
      },
      {
        "id": "phys-subj-6-2",
        "question": "Enumerate four functions of bile and draw a diagram of the gallbladder.",
        "type": "Very short",
        "marks": 2,
        "difficulty": 1
      },
      {
        "id": "phys-subj-6-3",
        "question": "Write two phases of gastric juice.",
        "type": "Very short",
        "marks": 2,
        "difficulty": 1
      },
      {
        "id": "phys-subj-6-4",
        "question": "Enlist two functions of hydrochloric acid (HCl).",
        "type": "Very short",
        "marks": 2,
        "difficulty": 1
      },
      {
        "id": "phys-subj-6-5",
        "question": "Enumerate two functions of the pancreas.",
        "type": "Very short",
        "marks": 2,
        "difficulty": 1
      },
      {
        "id": "phys-subj-6-6",
        "question": "Write the process of digestion in the mouth.",
        "type": "Very short",
        "marks": 2,
        "difficulty": 1
      },
      {
        "id": "phys-subj-6-7",
        "question": "Identify the structure of the pancreas.",
        "type": "Very short",
        "marks": 2,
        "difficulty": 1
      },
      {
        "id": "phys-subj-6-8",
        "question": "Enumerate the composition of gastric juice.",
        "type": "Very short",
        "marks": 2,
        "difficulty": 1
      },
      {
        "id": "phys-subj-6-9",
        "question": "Define cirrhosis of the liver.",
        "type": "Very short",
        "marks": 2,
        "difficulty": 1
      },
      {
        "id": "phys-subj-6-10",
        "question": "Summarize the functions of HCl.",
        "type": "Very short",
        "marks": 2,
        "difficulty": 1
      },
      {
        "id": "phys-subj-6-11",
        "question": "Elaborate on properties and functions of pancreatic juice.",
        "type": "Short",
        "marks": 5,
        "difficulty": 1
      },
      {
        "id": "phys-subj-6-12",
        "question": "Elaborate on composition of pancreatic juice.",
        "type": "Short",
        "marks": 5,
        "difficulty": 1
      },
      {
        "id": "phys-subj-6-13",
        "question": "Illustrate formation and storage of bile.",
        "type": "Short",
        "marks": 5,
        "difficulty": 1
      },
      {
        "id": "phys-subj-6-14",
        "question": "Illustrate composition and functions of bile.",
        "type": "Short",
        "marks": 5,
        "difficulty": 1
      },
      {
        "id": "phys-subj-6-15",
        "question": "Explain gastrointestinal tract motility in the stomach.",
        "type": "Short",
        "marks": 5,
        "difficulty": 1
      },
      {
        "id": "phys-subj-6-16",
        "question": "Illustrate functions of bile.",
        "type": "Short",
        "marks": 5,
        "difficulty": 1
      },
      {
        "id": "phys-subj-6-17",
        "question": "Illustrate regulation and secretion of bile.",
        "type": "Short",
        "marks": 5,
        "difficulty": 1
      },
      {
        "id": "phys-subj-6-18",
        "question": "Enlist the organs of the digestive system and explain their functions.",
        "type": "Short",
        "marks": 5,
        "difficulty": 1
      },
      {
        "id": "phys-subj-6-19",
        "question": "Draw the diagram of the digestive system and explain the functions of saliva.",
        "type": "Short",
        "marks": 5,
        "difficulty": 1
      },
      {
        "id": "phys-subj-6-20",
        "question": "Explain the process of digestion.",
        "type": "Short",
        "marks": 5,
        "difficulty": 1
      },
      {
        "id": "phys-subj-6-21",
        "question": "Describe the mechanism and regulation of gastric secretion.",
        "type": "Short",
        "marks": 5,
        "difficulty": 1
      },
      {
        "id": "phys-subj-6-22",
        "question": "Explain digestion in the mouth and stomach.",
        "type": "Short",
        "marks": 5,
        "difficulty": 1
      },
      {
        "id": "phys-subj-6-23",
        "question": "Explain digestion in the small and large intestines with diagrams and labels.",
        "type": "Short",
        "marks": 5,
        "difficulty": 1
      },
      {
        "id": "phys-subj-6-24",
        "question": "Explain the functions of the liver with a diagram and label it.",
        "type": "Short",
        "marks": 5,
        "difficulty": 1
      },
      {
        "id": "phys-subj-6-25",
        "question": "Explain the functions of the pancreas.",
        "type": "Short",
        "marks": 5,
        "difficulty": 1
      }
    ]
  },
  "phys-unit-7": {
    "id": "phys-unit-7",
    "unitNumber": 7,
    "title": "Circulatory & Cardiac Physiology",
    "category": "Hemodynamics & Cardiac Cycle",
    "icon": "🫀",
    "color": "from-rose-500 to-red-600",
    "teachingHours": "60 Hours INC Curriculum (Theory 18h + Practical 42h)",
    "summary": "Detailed functional mechanisms, regulation, homeostatic balance, clinical alterations and official INC competencies of Circulatory & Cardiac Physiology.",
    "objectives": [
      "Describe functions of the heart, blood pressure, conductive system and alteration in diseases of the circulatory system.",
      "Explain the functions of the Heart.",
      "Discuss the conductive system of Heart.",
      "Explain the Cardiac Cycle.",
      "Describe Blood Pressure.",
      "Discuss alteration in diseases of the Circulatory System.",
      "Cardiovascular physiology is an example of both a mechanical and an electrical organ functioning. Its function is to pump and distribute the blood throughout the body. It is responsible for transporting oxygen, nutrients, hormones, and cellular waste products throughout the body.",
      "Functions of the Heart"
    ],
    "totalImages": 3,
    "sections": [
      {
        "id": "sec-phys-7-1",
        "title": "Cardiac Electrophysiology, Pacemaker Mechanics & Conduction Pathways",
        "content": [
          "The heart functions as a muscular dual pump that generates hemodynamic pressure gradients driving blood through pulmonary and systemic circulations. The rhythmic, synchronized mechanical beating of the myocardium is initiated and orchestrated by specialized autorhythmic cardiac cells forming the **Cardiac Conduction System**.",
          "Cardiac muscle fibers are connected end-to-end by **intercalated discs** featuring **desmosomes** (providing mechanical tensile anchoring) and **gap junctions** (low-resistance electrical conduits permitting rapid ionic flux). This architectural syncytium ensures that action potentials propagate instantaneously from cell to cell, allowing atria and ventricles to contract as unified functional syncytia.",
          "**The Conduction Pathway Sequence:**",
          "1. **Sinoatrial (SA) Node (\"Natural Pacemaker\"):** Located in the superior wall of the right atrium near the opening of the superior vena cava; spontaneously depolarizes at **60 to 100 action potentials per minute**.",
          "2. **Internodal Pathways:** Conduct depolarization rapidly across both atria, causing synchronized atrial contraction.",
          "3. **Atrioventricular (AV) Node:** Located in the posteroinferior interatrial septum; **delays the electrical impulse by 0.10 to 0.12 seconds (100 ms)**; this physiological delay is essential because it allows the atria to finish contracting and empty their blood into the ventricles before ventricular systole commences.",
          "4. **Atrioventricular Bundle (Bundle of His):** The sole electrical conducting pathway piercing the insulating fibrous cardiac skeleton to connect atria with ventricles.",
          "5. **Right & Left Bundle Branches:** Descend through the interventricular septum toward the cardiac apex.",
          "6. **Purkinje Fibers:** Vast subendocardial arborization of large fibers conducting action potentials at high velocity (2-4 m/s) upward through ventricular myocardium, driving apex-to-base ventricular ejection."
        ],
        "points": [
          "**SA Nodal Pacemaker Potential:** Nodal cells lack a stable resting membrane potential; slow, continuous sodium (Na+) influx through hyperpolarization-activated **HCN channels (\"Funny Current / I_f\")** slowly depolarizes the membrane from -60 mV to threshold (-40 mV); threshold opens **L-type Voltage-gated Calcium channels**, driving the upward action potential stroke (no fast Na+ channels involved).",
          "**Ventricular Myocyte Action Potential (5 Phases):**",
          "• **Phase 0 (Rapid Depolarization):** Opening of fast voltage-gated Na+ channels (membrane shoots to +20 mV).",
          "• **Phase 1 (Initial Repolarization):** Transient K+ efflux through transient outward K+ channels.",
          "• **Phase 2 (Plateau Phase):** Unique to cardiac muscle; balanced influx of Ca2+ through slow L-type Ca2+ channels and efflux of K+ through delayed rectifier channels; sustains depolarization for 200-300 ms.",
          "• **Phase 3 (Rapid Repolarization):** Closure of Ca2+ channels and massive K+ efflux, returning membrane to -90 mV.",
          "• **Phase 4 (Resting Membrane Potential):** Stable -90 mV maintained by inward rectifier K+ channels and Na+/K+-ATPase pump.",
          "**Long Absolute Refractory Period:** The prolonged plateau phase ensures a refractory period lasting ~250 ms, making cardiac muscle **completely incapable of undergoing sustained tetanic contractions**, ensuring the heart relaxes between beats to fill with blood.",
          "**Autonomic Chronotropic Regulation:** Parasympathetic stimulation (vagus nerve / ACh on M2 receptors) increases K+ permeability, hyperpolarizing nodal cells and slowing heart rate (**negative chronotropy**); Sympathetic stimulation (norepinephrine on beta-1 adrenergic receptors) increases funny and Ca2+ currents, accelerating heart rate (**positive chronotropy**)."
        ],
        "clinicalPearl": "**Third-Degree AV Block & Ventricular Fibrillation:** In complete (third-degree) heart block, the AV node fails to conduct any atrial impulses to the ventricles; atria beat at normal sinus rate (75 bpm) while ventricles rely on slow, unstable ventricular escape pacemakers (20-40 bpm), causing profound hypoperfusion and Stokes-Adams syncope requiring permanent electronic pacemaker implantation. **Ventricular Fibrillation (V-Fib)** is chaotic, disorganized ventricular electrical activity without mechanical pumping; cardiac output drops to zero, requiring immediate **CPR and electrical defibrillation** within minutes to prevent irreversible biological death.",
        "images": [
          {
            "src": "/images/physiology/7_image1.png",
            "caption": "Figure 7.1: Specialized cardiac electrical conduction system.",
            "alt": "Cardiac conduction system"
          }
        ],
        "tables": []
      },
      {
        "id": "sec-phys-7-2",
        "title": "The Electrocardiogram (ECG), Waveforms & Arrhythmic Alterations",
        "content": [
          "The **Electrocardiogram (ECG / EKG)** is a non-invasive graphic recording of electrical voltage fluctuations generated across the body surface by the synchronized depolarization and repolarization vectors of myocardial cells during each cardiac cycle.",
          "A standard diagnostic 12-lead ECG utilizes electrodes placed on the limbs and chest to record electrical activity from 12 distinct spatial perspectives (6 limb leads: I, II, III, aVR, aVL, aVF; and 6 precordial chest leads: V1 through V6).",
          "**Standard ECG Waveforms & Intervals:**",
          "1. **P-Wave:** Low, rounded deflection reflecting **Atrial Depolarization** spreading from SA node across both atria (normal duration: 0.08 to 0.10 seconds; height < 2.5 mm).",
          "2. **PR-Interval:** Measured from beginning of P-wave to beginning of QRS complex; reflects time required for electrical impulse to travel from SA node through atria, AV node, and bundle branches (normal duration: **0.12 to 0.20 seconds / 3 to 5 small squares**).",
          "3. **QRS Complex:** Sharp, prominent deflection reflecting **Ventricular Depolarization** (normal duration: **0.06 to 0.10 seconds / < 2.5 small squares**). Comprises initial negative Q-wave, tall positive R-wave, and negative S-wave. Atrial repolarization occurs simultaneously but is masked by the massive QRS voltage.",
          "4. **ST-Segment:** Flat, isoelectric horizontal plateau between end of S-wave (J-point) and beginning of T-wave; corresponds to Phase 2 plateau phase of ventricular action potential.",
          "5. **T-Wave:** Broad, asymmetrical deflection reflecting **Ventricular Repolarization** (Phase 3 K+ efflux).",
          "6. **QT-Interval:** Measured from start of QRS to end of T-wave; represents total ventricular electrical systole (normal duration: 0.36 to 0.44 seconds, corrected for heart rate as QTc)."
        ],
        "points": [
          "**ECG Paper Calibration:** Standard paper speed is **25 mm/second**; 1 small square (1 mm) = **0.04 seconds (40 ms)**; 1 large square (5 mm) = **0.20 seconds (200 ms)**. Vertical amplitude: 10 mm = **1.0 mV**.",
          "**PR-Interval Prolongation (First-Degree AV Block):** PR-interval > 0.20 seconds indicates delayed conduction through the AV node (caused by digoxin toxicity, beta-blocker overdose, or ischemia).",
          "**ST-Segment Elevation (STEMI):** ST-segment elevation > 1 mm in two anatomically contiguous leads indicates acute transmural myocardial infarction demanding immediate emergent coronary reperfusion.",
          "**T-Wave Abnormalities:** Tall, peaked \"tented\" T-waves indicate life-threatening **Hyperkalemia** (potassium > 6.0 mEq/L); flattened T-waves and prominent U-waves indicate **Hypokalemia**.",
          "**Atrial Fibrillation (A-Fib):** Absent distinct P-waves replaced by irregular baseline fibrillatory waves (f-waves) with an \"irregularly irregular\" ventricular rhythm; blood pools in atrial appendages, creating high risk of mural thrombus formation and embolic stroke."
        ],
        "clinicalPearl": "**STEMI Recognition & Anticoagulation in Atrial Fibrillation:** On 12-lead ECG, ST-segment elevation in leads II, III, aVF localizes inferior wall STEMI (RCA occlusion); elevation in V1-V4 localizes anterior wall STEMI (LAD occlusion). In atrial fibrillation, loss of coordinated atrial contraction causes blood stasis in the left atrial appendage. All patients with A-fib must be stratified using the CHA2DS2-VASc score and placed on long-term oral anticoagulation (DOACs / warfarin) to prevent ischemic embolic cerebrovascular accidents (stroke).",
        "images": [
          {
            "src": "/images/physiology/7_image2.png",
            "caption": "Figure 7.2: Normal 12-lead Electrocardiogram (ECG) waveforms and intervals.",
            "alt": "ECG waveforms"
          }
        ],
        "tables": []
      },
      {
        "id": "sec-phys-7-3",
        "title": "The Cardiac Cycle, Ventricular Volumes & Heart Sounds",
        "content": [
          "The **Cardiac Cycle** encompasses all mechanical, electrical, and hemodynamic events occurring from the beginning of one heartbeat to the beginning of the next. At a normal resting heart rate of 75 beats per minute, the total duration of each cardiac cycle is precisely **0.8 seconds**.",
          "The cardiac cycle is divided into **Ventricular Systole (0.3 seconds)** and **Ventricular Diastole (0.5 seconds)**, partitioned into five distinct mechanical phases:",
          "1. **Atrial Systole (0.1 s):** Atria contract, topping off ventricular filling by contributing the final 20-30% of blood (**\"atrial kick\"**); ventricles reach their maximal end-diastolic volume (**EDV ~120 to 130 mL**).",
          "2. **Isovolumetric Ventricular Contraction (0.05 s):** Ventricles begin contracting; intraventricular pressure exceeds atrial pressure, abruptly slamming the atrioventricular (mitral and tricuspid) valves shut (**First Heart Sound / S1 - \"Lub\"**). Because ventricular pressure is not yet high enough to open aortic and pulmonary semilunar valves, **all four heart valves are closed**; intraventricular pressure spikes steeply without any change in blood volume.",
          "3. **Ventricular Ejection (0.25 s):** Left ventricular pressure exceeds aortic diastolic pressure (80 mmHg); the aortic valve bursts open; 70 mL of blood is rapidly pumped into systemic circulation (**Stroke Volume / SV ~70 mL**). The residual blood remaining in the ventricle at the end of ejection is the **End-Systolic Volume (ESV ~50 mL)**.",
          "4. **Isovolumetric Ventricular Relaxation (0.08 s):** Ventricles relax; pressure drops below arterial pressure; backflowing blood catches semilunar valve cusps, snapping them shut (**Second Heart Sound / S2 - \"Dub\"**). All four valves are closed again; volume remains constant at 50 mL while ventricular pressure plummets.",
          "5. **Ventricular Filling (0.42 s):** Ventricular pressure drops below atrial pressure; AV valves open passively; rapid passive filling accounts for 70-80% of total ventricular filling before the next atrial systole."
        ],
        "points": [
          "**Ejection Fraction (EF = SV / EDV × 100):** The percentage of end-diastolic blood pumped out with each beat (normally **55% to 70%**); an EF < 40% indicates systolic heart failure.",
          "**First Heart Sound (S1):** Caused by vibrations associated with closure of the mitral and tricuspid valves; louder, longer, lower pitch; marks the onset of ventricular systole.",
          "**Second Heart Sound (S2):** Caused by vibrations associated with closure of the aortic and pulmonary valves; shorter, sharper, higher pitch; marks the onset of ventricular diastole. Physiological splitting of S2 occurs during inspiration.",
          "**Third Heart Sound (S3 - Ventricular Gallop):** Low-frequency sound in early diastole during rapid passive filling; physiological in children and athletes; pathological in adults over 40 indicating volume overload and congestive heart failure (**Kentucky gallop**).",
          "**Fourth Heart Sound (S4 - Atrial Gallop):** Low-frequency sound in late diastole caused by atria contracting against a stiff, non-compliant ventricle (hypertension, aortic stenosis; **Tennessee gallop**)."
        ],
        "clinicalPearl": "**Heart Murmurs & Valvular Regurgitation vs. Stenosis:** Murmurs are abnormal audible heart sounds generated by turbulent blood flow. A harsh crescendo-decrescendo **systolic ejection murmur** radiating to the carotids indicates **aortic stenosis**. A high-pitched, blowing **holosystolic murmur** at the apex radiating to the axilla indicates **mitral regurgitation**. Assessing cardiac sounds requires placing the stethoscope diaphragm firmly over the five auscultation landmarks and the bell lightly for low-pitched S3 and S4 gallops.",
        "images": [
          {
            "src": "/images/physiology/7_image3.png",
            "caption": "Figure 7.3: Wiggers diagram of the complete cardiac cycle.",
            "alt": "Cardiac cycle"
          }
        ],
        "tables": []
      },
      {
        "id": "sec-phys-7-4",
        "title": "Cardiac Output, Arterial Blood Pressure & Hemodynamic Regulation",
        "content": [
          "**Cardiac Output (CO)** is the volume of blood pumped by each ventricle into systemic or pulmonary circulation per minute: ***Cardiac Output = Heart Rate (HR) × Stroke Volume (SV)***. At resting values (HR = 75 bpm, SV = 70 mL), resting CO is approximately **5.0 to 5.5 liters/min** (equivalent to circulating the entire blood volume every 60 seconds).",
          "Stroke volume is governed by three physiological determinants: (1) **Preload** (the degree of myocardial stretch prior to contraction, indexed by end-diastolic volume; governed by **Frank-Starling's Law of the Heart**: *within physiological limits, the greater the diastolic stretch, the greater the force of contraction*), (2) **Contractility (Inotropy)** (intrinsic myocardial contractile force independent of preload, increased by intracellular Ca2+, sympathetic stimulation, and digitalis), and (3) **Afterload** (the arterial resistance against which the ventricle must pump, determined by systemic vascular resistance and aortic pressure).",
          "**Arterial Blood Pressure (BP):** The lateral force exerted by circulating blood against systemic arterial walls: ***Blood Pressure = Cardiac Output × Systemic Vascular Resistance (SVR)***. Normal adult blood pressure is **120/80 mmHg**; **Pulse Pressure (PP = SBP - DBP)** is ~40 mmHg; **Mean Arterial Pressure (MAP = DBP + 1/3 PP)** is ~93 mmHg (a MAP > 65 mmHg is vital to maintain organ perfusion).",
          "**Regulation of Blood Pressure:**",
          "• **Short-Term Neural Control (Baroreceptor Reflex):** High-pressure stretch mechanoreceptors in the **Carotid Sinus** (CN IX) and **Aortic Arch** (CN X) sense blood pressure fluctuations; a sudden drop in BP decreases baroreceptor firing to medullary vasomotor centers, triggering immediate sympathetic reflex output (tachycardia and arteriolar vasoconstriction) while inhibiting vagal tone.",
          "• **Intermediate & Long-Term Endocrine Control:** **Renin-Angiotensin-Aldosterone System (RAAS)** (activated by renal hypoperfusion; Angiotensin II induces potent vasoconstriction, while Aldosterone drives renal Na+ and water retention), **Antidiuretic Hormone (ADH)**, and **Atrial Natriuretic Peptide (ANP)** (secreted by stretched atria, driving renal natriuresis and vasodilation)."
        ],
        "points": [
          "**Frank-Starling Law in Clinical Care:** Increasing venous return (e.g., elevating legs in shock or administering IV fluids) increases EDV, stretches sarcomeres to optimal length (2.2 μm), and increases stroke volume.",
          "**Afterload Burden in Hypertension:** Chronic systemic hypertension or aortic stenosis elevates afterload, forcing the left ventricle to generate higher pressures, causing concentric left ventricular hypertrophy and eventual heart failure.",
          "**Baroreceptor Reflex in Orthostatic Changes:** Standing up pools 500-800 mL of blood in lower extremities; venous return and CO drop transiently; baroreceptor reflex instantly fires, increasing heart rate by 10-15 bpm and constricting arterioles within seconds to maintain cerebral perfusion.",
          "**Circulatory Shock Stages:** Inadequate tissue perfusion; Hypovolemic (hemorrhage/dehydration), Cardiogenic (MI), Septic (bacterial endotoxin vasodilation), and Anaphylactic (histamine leak); compensatory tachycardia and vasoconstriction give way to refractory decompensated cellular shock."
        ],
        "clinicalPearl": "**Orthostatic Hypotension Assessment & Mean Arterial Pressure (MAP) Critical Target:** Assessing for orthostatic hypotension requires measuring blood pressure and pulse supine, sitting, and standing after 2 minutes; a drop in systolic BP ≥ 20 mmHg or diastolic BP ≥ 10 mmHg accompanied by symptoms (dizziness, lightheadedness) confirms autonomic insufficiency or intravascular volume depletion. In intensive care nursing, titrating vasopressor infusions (norepinephrine) to maintain a **MAP ≥ 65 mmHg** is essential to prevent acute tubular necrosis, myocardial ischemia, and cerebral infarction.",
        "images": [],
        "tables": []
      }
    ],
    "mcqs": [
      {
        "id": "phys-mcq-7-511",
        "question": "nan",
        "correctAnswer": "nan",
        "subtopic": "nan"
      },
      {
        "id": "phys-mcq-7-512",
        "question": "nan",
        "correctAnswer": "nan",
        "subtopic": "nan"
      },
      {
        "id": "phys-mcq-7-513",
        "question": "nan",
        "correctAnswer": "nan",
        "subtopic": "nan"
      },
      {
        "id": "phys-mcq-7-514",
        "question": "nan",
        "correctAnswer": "nan",
        "subtopic": "nan"
      },
      {
        "id": "phys-mcq-7-515",
        "question": "nan",
        "correctAnswer": "nan",
        "subtopic": "nan"
      },
      {
        "id": "phys-mcq-7-516",
        "question": "nan",
        "correctAnswer": "nan",
        "subtopic": "nan"
      },
      {
        "id": "phys-mcq-7-517",
        "question": "nan",
        "correctAnswer": "nan",
        "subtopic": "nan"
      },
      {
        "id": "phys-mcq-7-518",
        "question": "nan",
        "correctAnswer": "nan",
        "subtopic": "nan"
      },
      {
        "id": "phys-mcq-7-519",
        "question": "nan",
        "correctAnswer": "nan",
        "subtopic": "nan"
      },
      {
        "id": "phys-mcq-7-520",
        "question": "nan",
        "correctAnswer": "nan",
        "subtopic": "nan"
      },
      {
        "id": "phys-mcq-7-521",
        "question": "nan",
        "correctAnswer": "nan",
        "subtopic": "nan"
      },
      {
        "id": "phys-mcq-7-522",
        "question": "nan",
        "correctAnswer": "nan",
        "subtopic": "nan"
      },
      {
        "id": "phys-mcq-7-523",
        "question": "nan",
        "correctAnswer": "nan",
        "subtopic": "nan"
      },
      {
        "id": "phys-mcq-7-524",
        "question": "nan",
        "correctAnswer": "nan",
        "subtopic": "nan"
      },
      {
        "id": "phys-mcq-7-525",
        "question": "nan",
        "correctAnswer": "nan",
        "subtopic": "nan"
      },
      {
        "id": "phys-mcq-7-526",
        "question": "nan",
        "correctAnswer": "nan",
        "subtopic": "nan"
      },
      {
        "id": "phys-mcq-7-527",
        "question": "nan",
        "correctAnswer": "nan",
        "subtopic": "nan"
      },
      {
        "id": "phys-mcq-7-528",
        "question": "nan",
        "correctAnswer": "nan",
        "subtopic": "nan"
      },
      {
        "id": "phys-mcq-7-529",
        "question": "nan",
        "correctAnswer": "nan",
        "subtopic": "nan"
      },
      {
        "id": "phys-mcq-7-530",
        "question": "nan",
        "correctAnswer": "nan",
        "subtopic": "nan"
      },
      {
        "id": "phys-mcq-7-531",
        "question": "nan",
        "correctAnswer": "nan",
        "subtopic": "nan"
      },
      {
        "id": "phys-mcq-7-532",
        "question": "nan",
        "correctAnswer": "nan",
        "subtopic": "nan"
      },
      {
        "id": "phys-mcq-7-533",
        "question": "nan",
        "correctAnswer": "nan",
        "subtopic": "nan"
      },
      {
        "id": "phys-mcq-7-534",
        "question": "nan",
        "correctAnswer": "nan",
        "subtopic": "nan"
      },
      {
        "id": "phys-mcq-7-535",
        "question": "nan",
        "correctAnswer": "nan",
        "subtopic": "nan"
      },
      {
        "id": "phys-mcq-7-536",
        "question": "nan",
        "correctAnswer": "nan",
        "subtopic": "nan"
      },
      {
        "id": "phys-mcq-7-537",
        "question": "nan",
        "correctAnswer": "nan",
        "subtopic": "nan"
      },
      {
        "id": "phys-mcq-7-538",
        "question": "nan",
        "correctAnswer": "nan",
        "subtopic": "nan"
      },
      {
        "id": "phys-mcq-7-539",
        "question": "nan",
        "correctAnswer": "nan",
        "subtopic": "nan"
      },
      {
        "id": "phys-mcq-7-540",
        "question": "nan",
        "correctAnswer": "nan",
        "subtopic": "nan"
      },
      {
        "id": "phys-mcq-7-541",
        "question": "nan",
        "correctAnswer": "nan",
        "subtopic": "nan"
      },
      {
        "id": "phys-mcq-7-542",
        "question": "nan",
        "correctAnswer": "nan",
        "subtopic": "nan"
      },
      {
        "id": "phys-mcq-7-543",
        "question": "nan",
        "correctAnswer": "nan",
        "subtopic": "nan"
      },
      {
        "id": "phys-mcq-7-544",
        "question": "nan",
        "correctAnswer": "nan",
        "subtopic": "nan"
      },
      {
        "id": "phys-mcq-7-545",
        "question": "nan",
        "correctAnswer": "nan",
        "subtopic": "nan"
      },
      {
        "id": "phys-mcq-7-546",
        "question": "nan",
        "correctAnswer": "nan",
        "subtopic": "nan"
      },
      {
        "id": "phys-mcq-7-547",
        "question": "nan",
        "correctAnswer": "nan",
        "subtopic": "nan"
      },
      {
        "id": "phys-mcq-7-548",
        "question": "nan",
        "correctAnswer": "nan",
        "subtopic": "nan"
      },
      {
        "id": "phys-mcq-7-549",
        "question": "nan",
        "correctAnswer": "nan",
        "subtopic": "nan"
      },
      {
        "id": "phys-mcq-7-550",
        "question": "nan",
        "correctAnswer": "nan",
        "subtopic": "nan"
      },
      {
        "id": "phys-mcq-7-551",
        "question": "nan",
        "correctAnswer": "nan",
        "subtopic": "nan"
      },
      {
        "id": "phys-mcq-7-552",
        "question": "nan",
        "correctAnswer": "nan",
        "subtopic": "nan"
      },
      {
        "id": "phys-mcq-7-553",
        "question": "nan",
        "correctAnswer": "nan",
        "subtopic": "nan"
      },
      {
        "id": "phys-mcq-7-554",
        "question": "nan",
        "correctAnswer": "nan",
        "subtopic": "nan"
      },
      {
        "id": "phys-mcq-7-555",
        "question": "nan",
        "correctAnswer": "nan",
        "subtopic": "nan"
      },
      {
        "id": "phys-mcq-7-556",
        "question": "nan",
        "correctAnswer": "nan",
        "subtopic": "nan"
      },
      {
        "id": "phys-mcq-7-557",
        "question": "nan",
        "correctAnswer": "nan",
        "subtopic": "nan"
      },
      {
        "id": "phys-mcq-7-558",
        "question": "nan",
        "correctAnswer": "nan",
        "subtopic": "nan"
      },
      {
        "id": "phys-mcq-7-559",
        "question": "nan",
        "correctAnswer": "nan",
        "subtopic": "nan"
      },
      {
        "id": "phys-mcq-7-560",
        "question": "nan",
        "correctAnswer": "nan",
        "subtopic": "nan"
      },
      {
        "id": "phys-mcq-7-561",
        "question": "nan",
        "correctAnswer": "nan",
        "subtopic": "nan"
      },
      {
        "id": "phys-mcq-7-562",
        "question": "nan",
        "correctAnswer": "nan",
        "subtopic": "nan"
      },
      {
        "id": "phys-mcq-7-563",
        "question": "nan",
        "correctAnswer": "nan",
        "subtopic": "nan"
      },
      {
        "id": "phys-mcq-7-564",
        "question": "nan",
        "correctAnswer": "nan",
        "subtopic": "nan"
      },
      {
        "id": "phys-mcq-7-565",
        "question": "nan",
        "correctAnswer": "nan",
        "subtopic": "nan"
      },
      {
        "id": "phys-mcq-7-566",
        "question": "nan",
        "correctAnswer": "nan",
        "subtopic": "nan"
      },
      {
        "id": "phys-mcq-7-567",
        "question": "nan",
        "correctAnswer": "nan",
        "subtopic": "nan"
      },
      {
        "id": "phys-mcq-7-568",
        "question": "nan",
        "correctAnswer": "nan",
        "subtopic": "nan"
      },
      {
        "id": "phys-mcq-7-569",
        "question": "nan",
        "correctAnswer": "nan",
        "subtopic": "nan"
      },
      {
        "id": "phys-mcq-7-570",
        "question": "nan",
        "correctAnswer": "nan",
        "subtopic": "nan"
      },
      {
        "id": "phys-mcq-7-571",
        "question": "nan",
        "correctAnswer": "nan",
        "subtopic": "nan"
      },
      {
        "id": "phys-mcq-7-572",
        "question": "nan",
        "correctAnswer": "nan",
        "subtopic": "nan"
      },
      {
        "id": "phys-mcq-7-573",
        "question": "nan",
        "correctAnswer": "nan",
        "subtopic": "nan"
      },
      {
        "id": "phys-mcq-7-574",
        "question": "nan",
        "correctAnswer": "nan",
        "subtopic": "nan"
      },
      {
        "id": "phys-mcq-7-575",
        "question": "nan",
        "correctAnswer": "nan",
        "subtopic": "nan"
      },
      {
        "id": "phys-mcq-7-576",
        "question": "nan",
        "correctAnswer": "nan",
        "subtopic": "nan"
      },
      {
        "id": "phys-mcq-7-577",
        "question": "nan",
        "correctAnswer": "nan",
        "subtopic": "nan"
      },
      {
        "id": "phys-mcq-7-578",
        "question": "nan",
        "correctAnswer": "nan",
        "subtopic": "nan"
      },
      {
        "id": "phys-mcq-7-579",
        "question": "nan",
        "correctAnswer": "nan",
        "subtopic": "nan"
      },
      {
        "id": "phys-mcq-7-580",
        "question": "nan",
        "correctAnswer": "nan",
        "subtopic": "nan"
      },
      {
        "id": "phys-mcq-7-581",
        "question": "nan",
        "correctAnswer": "nan",
        "subtopic": "nan"
      },
      {
        "id": "phys-mcq-7-582",
        "question": "nan",
        "correctAnswer": "nan",
        "subtopic": "nan"
      },
      {
        "id": "phys-mcq-7-583",
        "question": "nan",
        "correctAnswer": "nan",
        "subtopic": "nan"
      },
      {
        "id": "phys-mcq-7-584",
        "question": "nan",
        "correctAnswer": "nan",
        "subtopic": "nan"
      },
      {
        "id": "phys-mcq-7-585",
        "question": "nan",
        "correctAnswer": "nan",
        "subtopic": "nan"
      },
      {
        "id": "phys-mcq-7-586",
        "question": "nan",
        "correctAnswer": "nan",
        "subtopic": "nan"
      },
      {
        "id": "phys-mcq-7-587",
        "question": "nan",
        "correctAnswer": "nan",
        "subtopic": "nan"
      },
      {
        "id": "phys-mcq-7-588",
        "question": "nan",
        "correctAnswer": "nan",
        "subtopic": "nan"
      },
      {
        "id": "phys-mcq-7-589",
        "question": "nan",
        "correctAnswer": "nan",
        "subtopic": "nan"
      },
      {
        "id": "phys-mcq-7-590",
        "question": "nan",
        "correctAnswer": "nan",
        "subtopic": "nan"
      },
      {
        "id": "phys-mcq-7-591",
        "question": "nan",
        "correctAnswer": "nan",
        "subtopic": "nan"
      },
      {
        "id": "phys-mcq-7-592",
        "question": "nan",
        "correctAnswer": "nan",
        "subtopic": "nan"
      },
      {
        "id": "phys-mcq-7-593",
        "question": "nan",
        "correctAnswer": "nan",
        "subtopic": "nan"
      },
      {
        "id": "phys-mcq-7-594",
        "question": "nan",
        "correctAnswer": "nan",
        "subtopic": "nan"
      },
      {
        "id": "phys-mcq-7-595",
        "question": "nan",
        "correctAnswer": "nan",
        "subtopic": "nan"
      }
    ],
    "subjectiveQuestions": [
      {
        "id": "phys-subj-7-1",
        "question": "Write the regulation of heart rate.",
        "type": "Very short",
        "marks": 2,
        "difficulty": 1
      },
      {
        "id": "phys-subj-7-2",
        "question": "Write the normal values of heart rate in different age groups.",
        "type": "Very short",
        "marks": 2,
        "difficulty": 1
      },
      {
        "id": "phys-subj-7-3",
        "question": "Identify the physiological factors that affect heart rate.",
        "type": "Very short",
        "marks": 2,
        "difficulty": 1
      },
      {
        "id": "phys-subj-7-4",
        "question": "State the meaning of blood pressure.",
        "type": "Very short",
        "marks": 2,
        "difficulty": 1
      },
      {
        "id": "phys-subj-7-5",
        "question": "Identify two factors that influence blood pressure (BP).",
        "type": "Very short",
        "marks": 2,
        "difficulty": 1
      },
      {
        "id": "phys-subj-7-6",
        "question": "Determine the life cycle of red blood cells.",
        "type": "Very short",
        "marks": 2,
        "difficulty": 1
      },
      {
        "id": "phys-subj-7-7",
        "question": "Write the life cycle of red blood cells.",
        "type": "Very short",
        "marks": 2,
        "difficulty": 1
      },
      {
        "id": "phys-subj-7-8",
        "question": "Write the difference between cardiac and smooth muscle.",
        "type": "Very short",
        "marks": 2,
        "difficulty": 1
      },
      {
        "id": "phys-subj-7-9",
        "question": "Identify two functions of cardiac muscle.",
        "type": "Very short",
        "marks": 2,
        "difficulty": 1
      },
      {
        "id": "phys-subj-7-10",
        "question": "Define cardiac muscle.",
        "type": "Very short",
        "marks": 2,
        "difficulty": 1
      },
      {
        "id": "phys-subj-7-11",
        "question": "Identify the structure and properties of cardiac muscle.",
        "type": "Very short",
        "marks": 2,
        "difficulty": 1
      },
      {
        "id": "phys-subj-7-12",
        "question": "List two phases of the menstrual cycle.",
        "type": "Very short",
        "marks": 2,
        "difficulty": 1
      },
      {
        "id": "phys-subj-7-13",
        "question": "Explain the principles and techniques of blood pressure measurement.",
        "type": "Short",
        "marks": 5,
        "difficulty": 1
      },
      {
        "id": "phys-subj-7-14",
        "question": "Explain the properties of cardiac muscle.",
        "type": "Short",
        "marks": 5,
        "difficulty": 1
      },
      {
        "id": "phys-subj-7-15",
        "question": "Explain chambers and valves in the heart.",
        "type": "Short",
        "marks": 5,
        "difficulty": 1
      },
      {
        "id": "phys-subj-7-16",
        "question": "Explain factors affecting the force of cardiac contraction.",
        "type": "Short",
        "marks": 5,
        "difficulty": 1
      },
      {
        "id": "phys-subj-7-17",
        "question": "Explain pacemaker tissue of the heart.",
        "type": "Short",
        "marks": 5,
        "difficulty": 1
      },
      {
        "id": "phys-subj-7-18",
        "question": "Explain the impact of exercise on the cardiovascular system and the reduction of high blood pressure.",
        "type": "Short",
        "marks": 5,
        "difficulty": 1
      },
      {
        "id": "phys-subj-7-19",
        "question": "Explain the phases of the menstrual cycle.",
        "type": "Short",
        "marks": 5,
        "difficulty": 1
      },
      {
        "id": "phys-subj-7-20",
        "question": "Explain the regulation of the menstrual cycle.",
        "type": "Short",
        "marks": 5,
        "difficulty": 1
      },
      {
        "id": "phys-subj-7-21",
        "question": "Define the cardiac cycle, events associated with it, and phases of the cardiac cycle. (2+3+5)",
        "type": "Essay",
        "marks": 10,
        "difficulty": 1
      },
      {
        "id": "phys-subj-7-22",
        "question": "Describe the functions of the heart, diagram, and label it. (6+4)",
        "type": "Essay",
        "marks": 10,
        "difficulty": 1
      },
      {
        "id": "phys-subj-7-23",
        "question": "Explain physiological and pathological conditions affecting heart rate. (5+5)",
        "type": "Essay",
        "marks": 10,
        "difficulty": 1
      },
      {
        "id": "phys-subj-7-24",
        "question": "Define ECG, explain waves of a normal ECG. (2+8)",
        "type": "Essay",
        "marks": 10,
        "difficulty": 1
      },
      {
        "id": "phys-subj-7-25",
        "question": "Define arterial blood pressure and explain methods of measuring blood pressure. (5+5)",
        "type": "Essay",
        "marks": 10,
        "difficulty": 1
      }
    ]
  },
  "phys-unit-8": {
    "id": "phys-unit-8",
    "unitNumber": 8,
    "title": "Excretory & Renal Physiology",
    "category": "Urine Formation & Osmoregulation",
    "icon": "💧",
    "color": "from-cyan-500 to-blue-600",
    "teachingHours": "60 Hours INC Curriculum (Theory 18h + Practical 42h)",
    "summary": "Detailed functional mechanisms, regulation, homeostatic balance, clinical alterations and official INC competencies of Excretory & Renal Physiology.",
    "objectives": [
      "Describe physiology of excretory system and alteration in diseases of the excretory system.",
      "Explain the functions of the Kidneys, Ureters, Urinary Bladder and Urethra.",
      "Describe the composition of Urine.",
      "Discuss the mechanism of Urine Formation.",
      "Compare and contrast the process of Micturation.",
      "Explain functions of the Skin.",
      "Discuss the regulation of Body Temperature.",
      "Discuss Fluid and Electrolyte Balance."
    ],
    "totalImages": 5,
    "sections": [
      {
        "id": "sec-phys-8-1",
        "title": "Renal Functional Principles & Glomerular Filtration Dynamics",
        "content": [
          "The kidneys maintain chemical and fluid homeostasis by processing 180 liters of blood plasma daily, clearing nitrogenous wastes while conserving essential water, electrolytes, and glucose to form 1.5 liters of urine.",
          "The kidneys execute three sequential physiological processes: (1) **Glomerular Filtration** (bulk flow of fluid and solutes from glomerular capillaries into Bowman's space), (2) **Tubular Reabsorption** (reclaiming water and essential solutes from filtrate back into peritubular capillary blood), and (3) **Tubular Secretion** (active transport of metabolic wastes, toxins, and surplus ions from blood into tubular lumen).",
          "**Glomerular Filtration Rate (GFR):** The total volume of filtrate formed by both kidneys per minute (normally **120 to 125 mL/min**, or **180 liters/day**). Driven across the three-layered glomerular filtration membrane by Starling hydrostatic and oncotic forces:",
          "• **Net Filtration Pressure (NFP) Equation:** ***NFP = P_gc - (P_bs + π_gc)***",
          "1. **Glomerular Capillary Hydrostatic Pressure (P_gc):** ~**55 mmHg** (outward filtration force; maintained high because the efferent arteriole diameter is narrower than the afferent arteriole).",
          "2. **Bowman's Space Hydrostatic Pressure (P_bs):** ~**15 mmHg** (opposing inward force).",
          "3. **Glomerular Capillary Colloid Osmotic Pressure (π_gc):** ~**30 mmHg** (opposing inward force exerted by non-filtered plasma albumin).",
          "4. **Net Filtration Pressure:** 55 - (15 + 30) = **+10 mmHg**, driving continuous fluid filtration.",
          "**Renal Autoregulation of GFR:** Kidneys maintain constant GFR across mean arterial pressures of 80 to 180 mmHg through **Myogenic Autoregulation** (stretching afferent arteriole opens mechanosensitive Ca2+ channels, causing vasoconstriction) and **Tubuloglomerular Feedback** (macula densa cells in JGA sense high luminal NaCl, releasing adenosine to constrict afferent arteriole)."
        ],
        "points": [
          "**Glomerular Filtration Membrane Selectivity:** Permeability depends on molecular size (< 4 nm filters freely; > 8 nm is completely blocked) and electrical charge (negatively charged polyanionic glycoprotein coat repels negatively charged plasma albumin).",
          "**Creatinine Clearance as GFR Index:** Creatinine is an endogenous breakdown product of muscle phosphocreatine, filtered freely at the glomerulus without being reabsorbed and only minimally secreted; **Creatinine Clearance (CrCl)** closely approximates true GFR.",
          "**Extrinsic Regulation of GFR:** During severe hemorrhage or exercise, massive sympathetic stimulation and circulating catecholamines constrict afferent arterioles, diverting blood flow to vital organs while drastically reducing GFR and urine output to conserve intravascular volume."
        ],
        "clinicalPearl": "**Acute Kidney Injury (AKI) & Serum Creatinine Monitoring:** Serum creatinine (normal: 0.6-1.2 mg/dL) is inversely related to GFR; a doubling of serum creatinine reflects a 50% loss of functioning nephron filtration capacity. Oliguria (urine output < 400 mL/day or < 0.5 mL/kg/hr for > 6 hours) is an early hallmark of AKI, demanding immediate evaluation of pre-renal perfusion, nephrotoxic medications (NSAIDs, aminoglycosides, IV radiocontrast), and post-renal obstructive catheter blockage.",
        "images": [
          {
            "src": "/images/physiology/8_th_excretory_system_physiology_for_print_image1.png",
            "caption": "Figure 8.1: Nephron transport mechanisms and urine formation.",
            "alt": "Mechanisms of urine formation"
          },
          {
            "src": "/images/physiology/8_th_excretory_system_physiology_for_print_image2.png",
            "caption": "Figure 8.2: Glomerular filtration barrier and Starling forces.",
            "alt": "Glomerular filtration"
          }
        ],
        "tables": []
      },
      {
        "id": "sec-phys-8-2",
        "title": "Tubular Reabsorption, Secretion & Countercurrent Urine Concentration",
        "content": [
          "Of the 180 liters of filtrate generated daily, over **99% is reabsorbed** into peritubular capillaries, leaving 1.0 to 1.5 liters to be excreted as urine.",
          "**Tubular Processing by Nephron Segment:**",
          "1. **Proximal Convoluted Tubule (PCT):** Reabsorbs **65% of water, 65% of Na+, and 100% of filtered glucose and amino acids** via apical Na+-glucose (SGLT) and Na+-amino acid symporters coupled to basolateral Na+/K+-ATPase. Bicarbonate (HCO3-) is reabsorbed via apical Na+/H+ antiporters (NHE3) and carbonic anhydrase. Secretes organic acids, bases, drugs (penicillin), and creatinine.",
          "2. **Loop of Henle (Countercurrent Multiplier):** Generates a steep hypertonic osmotic gradient in the renal medullary interstitium (ascending from 300 mOsm/L at cortex to 1,200 mOsm/L at papilla). The **thin descending limb** is highly permeable to water via aquaporin-1 channels but impermeable to solutes, concentrating tubular fluid. The **thick ascending limb** is completely impermeable to water but actively extrudes Na+, K+, and Cl- into medullary interstitium via **NKCC2 cotransporters** (the pharmacological target of loop diuretics like furosemide).",
          "3. **Distal Convoluted Tubule (DCT):** Reabsorbs Na+ and Cl- via NCC cotransporters (inhibited by thiazide diuretics). Parathyroid hormone (PTH) stimulates apical calcium channels, driving Ca2+ reabsorption.",
          "4. **Collecting Duct System:** Contains **Principal Cells** (reabsorbing Na+ through ENaC channels and secreting K+ under regulation by **Aldosterone**; inserting aquaporin-2 water channels under regulation by **Antidiuretic Hormone / ADH / Vasopressin**) and **Intercalated Cells** (regulating acid-base balance; Type A secretes H+ and reabsorbs HCO3-; Type B secretes HCO3-)."
        ],
        "points": [
          "**Renal Threshold for Glucose (180 mg/dL):** SGLT transporters in the PCT possess a maximal transport capacity (Tm = 375 mg/min); when venous blood glucose exceeds 180 to 200 mg/dL, filtered glucose exceeds SGLT capacity, resulting in **glucosuria** and osmotic diuresis (polyuria in diabetes mellitus).",
          "**Vasa Recta (Countercurrent Exchanger):** Hairpin capillary loops looping deep into the medulla with juxtamedullary nephrons; permeable to water and solutes; blood flow is sluggish, maintaining the hypertonic medullary gradient without washing it out.",
          "**Urea Recycling:** Urea contributes ~500 mOsm/L to the 1,200 mOsm/L medullary gradient; ADH facilitates urea transporter (UT-A1) insertion in inner medullary collecting ducts, promoting urea diffusion into interstitium.",
          "**Normal Urine Characteristics:** Specific gravity 1.003 to 1.030; pH 4.5 to 8.0 (average 6.0); contains 95% water and 5% solutes (urea, creatinine, sodium, potassium, uric acid, ammonia, sulfate); normally devoid of glucose, protein, ketones, bilirubin, RBCs, and WBCs."
        ],
        "clinicalPearl": "**Diuretic Pharmacology & SIADH vs. Diabetes Insipidus:** Loop diuretics (furosemide) block the thick ascending limb NKCC2 cotransporter, abolishing medullary hypertonicity and preventing water reabsorption, causing massive diuresis accompanied by **hypokalemia**. In Central **Diabetes Insipidus** (lack of pituitary ADH), collecting ducts cannot reabsorb water, causing profuse dilute polyuria (up to 20 L/day, specific gravity < 1.005) and hypernatremia. In **SIADH**, excessive ADH causes water intoxication, severe dilutional hyponatremia (< 120 mEq/L), cerebral edema, and seizures.",
        "images": [],
        "tables": []
      },
      {
        "id": "sec-phys-8-3",
        "title": "The Micturition Reflex & Urinary Bladder Innervation",
        "content": [
          "Urine drips continuously from renal papillary ducts into minor and major calyces and is propelled down the retroperitoneal ureters by autonomous smooth muscle **peristaltic waves** (1 to 5 per minute) into the **urinary bladder**.",
          "The urinary bladder is an expandable muscular reservoir lined by transitional epithelium and multi-layered crisscrossing smooth muscle fibers forming the **Detrusor Muscle**. The bladder neck is encircled by the involuntary **Internal Urethral Sphincter** (IUS), while the deep perineal membrane contains the voluntary skeletal **External Urethral Sphincter** (EUS).",
          "**The Micturition (Urination) Reflex:**",
          "1. As the bladder fills with urine, resting intravesical pressure remains low due to stress relaxation. When volume reaches **200 to 400 mL**, bladder wall tension stretches **mechanosensitive stretch receptors**.",
          "2. Afferent sensory signals travel along pelvic nerves into sacral spinal cord segments **S2, S3, and S4**.",
          "3. The spinal reflex center fires parasympathetic efferent signals down **pelvic splanchnic nerves**, releasing acetylcholine onto M3 muscarinic receptors on the bladder wall, stimulating vigorous **detrusor muscle contraction** and internal urethral sphincter relaxation.",
          "4. Simultaneously, sensory signals ascend the spinal cord to the **Pontine Micturition Center (PMC / Barrington's Nucleus)** in the brainstem and higher cerebral cortical centers.",
          "5. If social conditions are appropriate for urination, the cerebral cortex permits the PMC to inhibit somatic motor neurons in the ventral horn via the **Pudendal Nerve**, relaxing the voluntary **External Urethral Sphincter**; urination proceeds.",
          "6. If urination is inconvenient, the cerebral cortex fires the pudendal nerve to keep the external sphincter tonically constricted; the micturition reflex temporarily subsides for 15 to 30 minutes before returning with greater intensity."
        ],
        "points": [
          "**Dual Autonomic Innervation of Bladder:**",
          "• **Parasympathetic (Pelvic Nerves S2-S4):** Promotes voiding; contracts detrusor muscle and relaxes internal sphincter.",
          "• **Sympathetic (Hypogastric Nerves T11-L2):** Promotes continence; relaxes detrusor muscle via beta-2/beta-3 receptors and constricts internal sphincter via alpha-1 receptors.",
          "• **Somatic (Pudendal Nerve S2-S4):** Conscious voluntary continence; innervates skeletal muscle external urethral sphincter.",
          "**Types of Urinary Incontinence:**",
          "• **Stress Incontinence:** Involuntary leakage upon elevated intra-abdominal pressure (coughing, laughing, lifting); caused by pelvic floor laxity (post-childbirth).",
          "• **Urge Incontinence (\"Overactive Bladder\"):** Sudden, uncontrollable urge with involuntary detrusor spasticity.",
          "• **Overflow Incontinence:** Incomplete emptying causing chronic distension and constant dribbling (prostatic obstruction in BPH or diabetic neuropathy).",
          "• **Functional Incontinence:** Physical or cognitive barriers preventing timely toilet access."
        ],
        "clinicalPearl": "**Neurogenic Bladder in Spinal Cord Injuries:** Complete spinal cord transection above S2 (e.g., cervical or thoracic trauma) interrupts cortical inhibitory and voluntary pathways to the pontine micturition center. Initially, **spinal shock** produces an atonic, flaccid bladder with acute urinary retention requiring catheterization. Later, an autonomous, uninhibited **spastic reflex bladder (automatic bladder)** develops: the bladder empties automatically whenever volume reaches 200-300 mL without conscious voluntary control.",
        "images": [
          {
            "src": "/images/physiology/8_th_excretory_system_physiology_for_print_image3.png",
            "caption": "Figure 8.3: Innervation of urinary bladder and micturition reflex.",
            "alt": "Micturition reflex"
          }
        ],
        "tables": []
      },
      {
        "id": "sec-phys-8-4",
        "title": "Cutaneous Excretion, Fluid-Electrolyte Balance & Thermoregulation",
        "content": [
          "The excretory and homeostatic work of the kidneys is integrated with the **integumentary system** and hypothalamic neural networks to maintain systemic fluid volume, electrolyte concentrations, acid-base equilibrium, and core body temperature.",
          "**Integumentary Excretion:** Sweat glands excrete 500 to 1,000 mL of fluid daily (insensible and sensible perspiration), clearing water, sodium, chloride, potassium, urea, uric acid, and ammonia. In end-stage chronic kidney disease, evaporating sweat leaves white urea crystalline deposits across the skin known as **uremic frost**.",
          "**Body Fluid Compartments:** Total body water constitutes approximately **60% of body weight in adult males (42 liters in a 70-kg individual)**, partitioned into: **Intracellular Fluid (ICF / two-thirds / 28 L)** and **Extracellular Fluid (ECF / one-third / 14 L)** (subdivided into Interstitial Fluid [80% / 11 L] and Plasma [20% / 3 L]).",
          "**Thermoregulation:** Core body temperature is maintained within a narrow physiological range (**36.5°C to 37.5°C / 97.7°F to 99.5°F**) coordinated by the **Hypothalamic Thermostat** (preoptic anterior hypothalamus senses core blood temperature and inputs from peripheral skin thermoreceptors).",
          "• **Heat Dissipation Mechanisms (Response to Hyperthermia):** (1) **Cutaneous Vasodilation:** Sympathetic cholinergic inhibition opens dermal capillary beds, radiating thermal energy to environment; (2) **Evaporative Sweating:** Eccrine sweat glands secrete watery sweat; evaporation of 1 mL of sweat dissipates 0.58 kcal of heat.",
          "• **Heat Conservation & Generation (Response to Hypothermia):** (1) **Cutaneous Vasoconstriction:** Dermal vessels clamp down, shunting warm blood to core; (2) **Piloerection:** Arrector pili muscles contract; (3) **Involuntary Shivering Thermogenesis:** Somatic motor centers drive rhythmic skeletal muscle tremors, multiplying metabolic heat production 4- to 5-fold; (4) **Chemical Thermogenesis:** Sympathetic surge and thyroid hormone T3/T4 secretion accelerate basal metabolic rate."
        ],
        "points": [
          "**Fluid Homeostasis & Osmoreceptors:** Hypothalamic osmoreceptors in the anterior hypothalamus detect a 1-2% increase in ECF osmolarity, firing impulses to stimulate thirst and drive posterior pituitary **Antidiuretic Hormone (ADH)** release.",
          "**Acid-Base Balance Triad:** (1) Chemical Buffer Systems (bicarbonate, phosphate, plasma proteins; reacts in seconds); (2) Respiratory Regulation (hypoventilation retains CO2 / hyperventilation eliminates CO2; reacts in minutes); (3) Renal Regulation (tubular secretion of H+ and reabsorption/generation of new HCO3-; powerful correction in hours to days).",
          "**Heat Exhaustion vs. Heat Stroke:** Heat exhaustion manifests with diaphoresis, hypotension, and normal-to-mildly elevated core temp (< 40°C) due to fluid/electrolyte depletion; **Heat Stroke** is a life-threatening medical emergency characterized by thermoregulatory failure, core temperature > 40.5°C (105°F), hot dry skin (sweating ceases), delirium, seizures, and multiorgan failure.",
          "**Hypothermia Stages:** Mild (32-35°C, vigorous shivering, confusion); Moderate (28-32°C, shivering ceases, bradycardia, hypoventilation); Severe (< 28°C, coma, ventricular fibrillation, asystole)."
        ],
        "clinicalPearl": "**Heat Stroke Cooling Protocol & Severe Burn Fluid Shift:** Heat stroke requires emergency aggressive immediate evaporative cooling (tepid water spray with circulating fans) or ice-water immersion and IV normal saline; antipyretic drugs (acetaminophen) are completely ineffective because heat stroke is caused by thermoregulatory failure rather than a hypothalamic pyrogen set-point change. In extensive full-thickness burns, massive cutaneous fluid evaporation and systemic capillary leak cause catastrophic hypovolemic burn shock, requiring **Parkland Formula** fluid resuscitation (4 mL × kg × % TBSA in the first 24 hours).",
        "images": [
          {
            "src": "/images/physiology/8_th_excretory_system_physiology_for_print_image4.png",
            "caption": "Figure 8.4: Histological structure of the skin and cutaneous glands.",
            "alt": "Structure of skin"
          },
          {
            "src": "/images/physiology/8_th_excretory_system_physiology_for_print_image5.png",
            "caption": "Figure 8.5: Hypothalamic thermoregulatory response to cold and heat.",
            "alt": "Regulation of body temperature"
          }
        ],
        "tables": []
      }
    ],
    "mcqs": [
      {
        "id": "phys-mcq-8-596",
        "question": "nan",
        "correctAnswer": "nan",
        "subtopic": "nan"
      },
      {
        "id": "phys-mcq-8-597",
        "question": "nan",
        "correctAnswer": "nan",
        "subtopic": "nan"
      },
      {
        "id": "phys-mcq-8-598",
        "question": "nan",
        "correctAnswer": "nan",
        "subtopic": "nan"
      },
      {
        "id": "phys-mcq-8-599",
        "question": "nan",
        "correctAnswer": "nan",
        "subtopic": "nan"
      },
      {
        "id": "phys-mcq-8-600",
        "question": "nan",
        "correctAnswer": "nan",
        "subtopic": "nan"
      },
      {
        "id": "phys-mcq-8-601",
        "question": "nan",
        "correctAnswer": "nan",
        "subtopic": "nan"
      },
      {
        "id": "phys-mcq-8-602",
        "question": "nan",
        "correctAnswer": "nan",
        "subtopic": "nan"
      },
      {
        "id": "phys-mcq-8-603",
        "question": "nan",
        "correctAnswer": "nan",
        "subtopic": "nan"
      },
      {
        "id": "phys-mcq-8-604",
        "question": "nan",
        "correctAnswer": "nan",
        "subtopic": "nan"
      },
      {
        "id": "phys-mcq-8-605",
        "question": "nan",
        "correctAnswer": "nan",
        "subtopic": "nan"
      },
      {
        "id": "phys-mcq-8-606",
        "question": "nan",
        "correctAnswer": "nan",
        "subtopic": "nan"
      },
      {
        "id": "phys-mcq-8-607",
        "question": "nan",
        "correctAnswer": "nan",
        "subtopic": "nan"
      },
      {
        "id": "phys-mcq-8-608",
        "question": "nan",
        "correctAnswer": "nan",
        "subtopic": "nan"
      },
      {
        "id": "phys-mcq-8-609",
        "question": "nan",
        "correctAnswer": "nan",
        "subtopic": "nan"
      },
      {
        "id": "phys-mcq-8-610",
        "question": "nan",
        "correctAnswer": "nan",
        "subtopic": "nan"
      },
      {
        "id": "phys-mcq-8-611",
        "question": "nan",
        "correctAnswer": "nan",
        "subtopic": "nan"
      },
      {
        "id": "phys-mcq-8-612",
        "question": "nan",
        "correctAnswer": "nan",
        "subtopic": "nan"
      },
      {
        "id": "phys-mcq-8-613",
        "question": "nan",
        "correctAnswer": "nan",
        "subtopic": "nan"
      },
      {
        "id": "phys-mcq-8-614",
        "question": "nan",
        "correctAnswer": "nan",
        "subtopic": "nan"
      },
      {
        "id": "phys-mcq-8-615",
        "question": "nan",
        "correctAnswer": "nan",
        "subtopic": "nan"
      },
      {
        "id": "phys-mcq-8-616",
        "question": "nan",
        "correctAnswer": "nan",
        "subtopic": "nan"
      },
      {
        "id": "phys-mcq-8-617",
        "question": "nan",
        "correctAnswer": "nan",
        "subtopic": "nan"
      },
      {
        "id": "phys-mcq-8-618",
        "question": "nan",
        "correctAnswer": "nan",
        "subtopic": "nan"
      },
      {
        "id": "phys-mcq-8-619",
        "question": "nan",
        "correctAnswer": "nan",
        "subtopic": "nan"
      },
      {
        "id": "phys-mcq-8-620",
        "question": "nan",
        "correctAnswer": "nan",
        "subtopic": "nan"
      },
      {
        "id": "phys-mcq-8-621",
        "question": "nan",
        "correctAnswer": "nan",
        "subtopic": "nan"
      },
      {
        "id": "phys-mcq-8-622",
        "question": "nan",
        "correctAnswer": "nan",
        "subtopic": "nan"
      },
      {
        "id": "phys-mcq-8-623",
        "question": "nan",
        "correctAnswer": "nan",
        "subtopic": "nan"
      },
      {
        "id": "phys-mcq-8-624",
        "question": "nan",
        "correctAnswer": "nan",
        "subtopic": "nan"
      },
      {
        "id": "phys-mcq-8-625",
        "question": "nan",
        "correctAnswer": "nan",
        "subtopic": "nan"
      },
      {
        "id": "phys-mcq-8-626",
        "question": "nan",
        "correctAnswer": "nan",
        "subtopic": "nan"
      },
      {
        "id": "phys-mcq-8-627",
        "question": "nan",
        "correctAnswer": "nan",
        "subtopic": "nan"
      },
      {
        "id": "phys-mcq-8-628",
        "question": "nan",
        "correctAnswer": "nan",
        "subtopic": "nan"
      },
      {
        "id": "phys-mcq-8-629",
        "question": "nan",
        "correctAnswer": "nan",
        "subtopic": "nan"
      },
      {
        "id": "phys-mcq-8-630",
        "question": "nan",
        "correctAnswer": "nan",
        "subtopic": "nan"
      },
      {
        "id": "phys-mcq-8-631",
        "question": "nan",
        "correctAnswer": "nan",
        "subtopic": "nan"
      },
      {
        "id": "phys-mcq-8-632",
        "question": "nan",
        "correctAnswer": "nan",
        "subtopic": "nan"
      },
      {
        "id": "phys-mcq-8-633",
        "question": "nan",
        "correctAnswer": "nan",
        "subtopic": "nan"
      },
      {
        "id": "phys-mcq-8-634",
        "question": "nan",
        "correctAnswer": "nan",
        "subtopic": "nan"
      },
      {
        "id": "phys-mcq-8-635",
        "question": "nan",
        "correctAnswer": "nan",
        "subtopic": "nan"
      },
      {
        "id": "phys-mcq-8-636",
        "question": "nan",
        "correctAnswer": "nan",
        "subtopic": "nan"
      },
      {
        "id": "phys-mcq-8-637",
        "question": "nan",
        "correctAnswer": "nan",
        "subtopic": "nan"
      },
      {
        "id": "phys-mcq-8-638",
        "question": "nan",
        "correctAnswer": "nan",
        "subtopic": "nan"
      },
      {
        "id": "phys-mcq-8-639",
        "question": "nan",
        "correctAnswer": "nan",
        "subtopic": "nan"
      },
      {
        "id": "phys-mcq-8-640",
        "question": "nan",
        "correctAnswer": "nan",
        "subtopic": "nan"
      },
      {
        "id": "phys-mcq-8-641",
        "question": "nan",
        "correctAnswer": "nan",
        "subtopic": "nan"
      },
      {
        "id": "phys-mcq-8-642",
        "question": "nan",
        "correctAnswer": "nan",
        "subtopic": "nan"
      },
      {
        "id": "phys-mcq-8-643",
        "question": "nan",
        "correctAnswer": "nan",
        "subtopic": "nan"
      },
      {
        "id": "phys-mcq-8-644",
        "question": "nan",
        "correctAnswer": "nan",
        "subtopic": "nan"
      },
      {
        "id": "phys-mcq-8-645",
        "question": "nan",
        "correctAnswer": "nan",
        "subtopic": "nan"
      },
      {
        "id": "phys-mcq-8-646",
        "question": "nan",
        "correctAnswer": "nan",
        "subtopic": "nan"
      },
      {
        "id": "phys-mcq-8-647",
        "question": "nan",
        "correctAnswer": "nan",
        "subtopic": "nan"
      },
      {
        "id": "phys-mcq-8-648",
        "question": "nan",
        "correctAnswer": "nan",
        "subtopic": "nan"
      },
      {
        "id": "phys-mcq-8-649",
        "question": "nan",
        "correctAnswer": "nan",
        "subtopic": "nan"
      },
      {
        "id": "phys-mcq-8-650",
        "question": "nan",
        "correctAnswer": "nan",
        "subtopic": "nan"
      },
      {
        "id": "phys-mcq-8-651",
        "question": "nan",
        "correctAnswer": "nan",
        "subtopic": "nan"
      },
      {
        "id": "phys-mcq-8-652",
        "question": "nan",
        "correctAnswer": "nan",
        "subtopic": "nan"
      },
      {
        "id": "phys-mcq-8-653",
        "question": "nan",
        "correctAnswer": "nan",
        "subtopic": "nan"
      },
      {
        "id": "phys-mcq-8-654",
        "question": "nan",
        "correctAnswer": "nan",
        "subtopic": "nan"
      },
      {
        "id": "phys-mcq-8-655",
        "question": "nan",
        "correctAnswer": "nan",
        "subtopic": "nan"
      },
      {
        "id": "phys-mcq-8-656",
        "question": "nan",
        "correctAnswer": "nan",
        "subtopic": "nan"
      },
      {
        "id": "phys-mcq-8-657",
        "question": "nan",
        "correctAnswer": "nan",
        "subtopic": "nan"
      },
      {
        "id": "phys-mcq-8-658",
        "question": "nan",
        "correctAnswer": "nan",
        "subtopic": "nan"
      },
      {
        "id": "phys-mcq-8-659",
        "question": "nan",
        "correctAnswer": "nan",
        "subtopic": "nan"
      },
      {
        "id": "phys-mcq-8-660",
        "question": "nan",
        "correctAnswer": "nan",
        "subtopic": "nan"
      },
      {
        "id": "phys-mcq-8-661",
        "question": "nan",
        "correctAnswer": "nan",
        "subtopic": "nan"
      },
      {
        "id": "phys-mcq-8-662",
        "question": "nan",
        "correctAnswer": "nan",
        "subtopic": "nan"
      },
      {
        "id": "phys-mcq-8-663",
        "question": "nan",
        "correctAnswer": "nan",
        "subtopic": "nan"
      },
      {
        "id": "phys-mcq-8-664",
        "question": "nan",
        "correctAnswer": "nan",
        "subtopic": "nan"
      },
      {
        "id": "phys-mcq-8-665",
        "question": "nan",
        "correctAnswer": "nan",
        "subtopic": "nan"
      },
      {
        "id": "phys-mcq-8-666",
        "question": "nan",
        "correctAnswer": "nan",
        "subtopic": "nan"
      },
      {
        "id": "phys-mcq-8-667",
        "question": "nan",
        "correctAnswer": "nan",
        "subtopic": "nan"
      },
      {
        "id": "phys-mcq-8-668",
        "question": "nan",
        "correctAnswer": "nan",
        "subtopic": "nan"
      },
      {
        "id": "phys-mcq-8-669",
        "question": "nan",
        "correctAnswer": "nan",
        "subtopic": "nan"
      },
      {
        "id": "phys-mcq-8-670",
        "question": "nan",
        "correctAnswer": "nan",
        "subtopic": "nan"
      },
      {
        "id": "phys-mcq-8-671",
        "question": "nan",
        "correctAnswer": "nan",
        "subtopic": "nan"
      },
      {
        "id": "phys-mcq-8-672",
        "question": "nan",
        "correctAnswer": "nan",
        "subtopic": "nan"
      },
      {
        "id": "phys-mcq-8-673",
        "question": "nan",
        "correctAnswer": "nan",
        "subtopic": "nan"
      },
      {
        "id": "phys-mcq-8-674",
        "question": "nan",
        "correctAnswer": "nan",
        "subtopic": "nan"
      },
      {
        "id": "phys-mcq-8-675",
        "question": "nan",
        "correctAnswer": "nan",
        "subtopic": "nan"
      },
      {
        "id": "phys-mcq-8-676",
        "question": "nan",
        "correctAnswer": "nan",
        "subtopic": "nan"
      },
      {
        "id": "phys-mcq-8-677",
        "question": "nan",
        "correctAnswer": "nan",
        "subtopic": "nan"
      },
      {
        "id": "phys-mcq-8-678",
        "question": "nan",
        "correctAnswer": "nan",
        "subtopic": "nan"
      },
      {
        "id": "phys-mcq-8-679",
        "question": "nan",
        "correctAnswer": "nan",
        "subtopic": "nan"
      },
      {
        "id": "phys-mcq-8-680",
        "question": "nan",
        "correctAnswer": "nan",
        "subtopic": "nan"
      }
    ],
    "subjectiveQuestions": [
      {
        "id": "phys-subj-8-1",
        "question": "Identify two parts of the nephron.",
        "type": "Very short",
        "marks": 2,
        "difficulty": 1
      },
      {
        "id": "phys-subj-8-2",
        "question": "Define Glomerular Filtration Rate (GFR).",
        "type": "Very short",
        "marks": 2,
        "difficulty": 1
      },
      {
        "id": "phys-subj-8-3",
        "question": "Identify two types of nephrons.",
        "type": "Very short",
        "marks": 2,
        "difficulty": 1
      },
      {
        "id": "phys-subj-8-4",
        "question": "Explain the structure and functions of the kidney.",
        "type": "Short",
        "marks": 5,
        "difficulty": 1
      },
      {
        "id": "phys-subj-8-5",
        "question": "Explain the process of urine formation by the kidneys.",
        "type": "Short",
        "marks": 5,
        "difficulty": 1
      },
      {
        "id": "phys-subj-8-6",
        "question": "Explain the composition and properties of urine.",
        "type": "Short",
        "marks": 5,
        "difficulty": 1
      },
      {
        "id": "phys-subj-8-7",
        "question": "Draw the diagram of the kidney and nephron and label it.",
        "type": "Short",
        "marks": 5,
        "difficulty": 1
      },
      {
        "id": "phys-subj-8-8",
        "question": "Explain the dialysis procedure.",
        "type": "Short",
        "marks": 5,
        "difficulty": 1
      },
      {
        "id": "phys-subj-8-9",
        "question": "Illustrate the structure and functions of the kidneys with a labelled diagram. (5+5)",
        "type": "Essay",
        "marks": 10,
        "difficulty": 1
      }
    ]
  },
  "phys-unit-9": {
    "id": "phys-unit-9",
    "unitNumber": 9,
    "title": "Reproductive Physiology",
    "category": "Gametogenesis & Endocrine Regulation",
    "icon": "👶",
    "color": "from-purple-500 to-pink-600",
    "teachingHours": "60 Hours INC Curriculum (Theory 18h + Practical 42h)",
    "summary": "Detailed functional mechanisms, regulation, homeostatic balance, clinical alterations and official INC competencies of Reproductive Physiology.",
    "objectives": [
      "Describe the physiology of male and female reproductive system and alteration in diseases of the reproductive system.",
      "Describe the Spermatogenesis and Oogenesis.",
      "Describe the functions of the Female Reproductive Organs.",
      "List the functions of the Breast, Placenta and Ovaries.",
      "Discuss about the Female Sexual Cycle.",
      "Discuss the overview of Embryology.",
      "Describe the functions of the Male Reproductive Organs.",
      "Discuss the Male Fertility System."
    ],
    "totalImages": 9,
    "sections": [
      {
        "id": "sec-phys-9-1",
        "title": "Male Reproductive Physiology, Spermatogenesis & Androgens",
        "content": [
          "The male reproductive system is orchestrated to synthesize male gametes (**spermatozoa**) and secrete androgenic steroid hormones, principally **Testosterone**, to sustain secondary sexual characteristics, libido, and somatic anabolic metabolism.",
          "The **testes** fulfill dual physiological roles: exocrine (spermatogenesis within the seminiferous tubules) and endocrine (testosterone synthesis by interstitial **Leydig cells** situated between tubules, stimulated by pituitary Luteinizing Hormone / LH).",
          "**Spermatogenesis:** Occurs continuously within the epithelial lining of seminiferous tubules over approximately 64 to 74 days, progressing through three defined stages:",
          "1. **Mitotic Proliferation:** Primitive diploid **Spermatogonia** (46,XY) located at the basement membrane divide mitotically to produce self-renewing stem cells and **Primary Spermatocytes**.",
          "2. **Meiotic Division:** Primary spermatocytes enter Meiosis I (crossing over and reduction division) to form haploid **Secondary Spermatocytes** (23,X or 23,Y), which swiftly complete Meiosis II to yield haploid **Spermatids**.",
          "3. **Spermiogenesis:** Structural metamorphosis where non-motile spherical spermatids transform into streamlined motile **Spermatozoa** by shedding excess cytoplasm, condensing the nucleus, forming an enzymatic **acrosome cap** (derived from Golgi apparatus, containing hyaluronidase and acrosin), concentrating mitochondria in the midpiece for ATP generation, and assembling a 9+2 microtubular flagellar tail.",
          "**Sertoli (Nurse) Cells:** Giant columnar cells spanning from basement membrane to lumen, joined by tight junctions forming the **Blood-Testis Barrier**. Sertoli cells nurse developing germ cells, phagocytose discarded cytoplasm, secrete **Androgen-Binding Protein (ABP)** under FSH influence (maintaining high intratesticular testosterone), and secrete **Inhibin B** (which selectively suppresses pituitary FSH secretion via negative feedback).",
          "**Semen Composition & Emission:** Semen volume is 2 to 5 mL per ejaculate with a normal sperm concentration of 20 to 150 million/mL. The fluid is produced by: **Seminal Vesicles (60%)** (thick, alkaline fluid rich in fructose [primary energy source], prostaglandins [stimulating uterine smooth muscle contraction], and coagulating proteins), **Prostate Gland (30%)** (milky, slightly acidic fluid containing citric acid, calcium, acid phosphatase, and **Prostate-Specific Antigen / PSA**, a serine protease that liquefies the semen coagulum within 15-30 minutes), and **Bulbourethral (Cowper's) Glands (5%)** (clear mucus neutralizing residual urethral acidity).",
          "**Erection & Ejaculation Reflexes:** Erection is a **parasympathetic reflex** mediated by pelvic splanchnic nerves (S2-S4) releasing Nitric Oxide (NO), which stimulates guanylyl cyclase to elevate intracellular cGMP, causing profound vasodilation of the helicine arteries and engorgement of the corpora cavernosa. Ejaculation is a two-phase spinal reflex: **Emission** (sympathetic T11-L2; peristaltic contraction of vas deferens, seminal vesicles, and prostate propelling semen into the prostatic urethra, with closure of the internal urethral sphincter to prevent retrograde ejaculation into the bladder) and **Expulsion** (somatic S2-S4; rhythmic contractions of bulbospongiosus and ischiocavernosus muscles expelling semen through the external urethral meatus at 500 cm/s)."
        ],
        "points": [
          "**Hormonal Control of Spermatogenesis:** Hypothalamic GnRH stimulates pituitary LH and FSH. LH binds to Leydig cell GPCRs stimulating cyclic AMP-mediated cholesterol conversion to **Testosterone**. FSH binds to Sertoli cells stimulating synthesis of ABP, aromatase (converting testosterone to estradiol), and growth factors essential for spermatid differentiation.",
          "**Scrotal Thermoregulation:** Testes reside in the scrotum at 32°C to 34°C (2°C to 3°C below core body temperature), optimal for spermatogenesis. Thermoregulation is maintained by: (1) **Dartos muscle** (contracts skin when cold), (2) **Cremaster muscle** (elevates testes toward body wall), and (3) **Pampiniform venous plexus** (acts as a countercurrent heat exchanger cooling warm testicular arterial blood).",
          "**Sperm Viability & Capacitation:** Mature spermatozoa stored in the epididymis acquire forward motility over 10 to 14 days. Once deposited in the female tract, sperm undergo **capacitation** (removal of glycoprotein coat and cholesterol from acrosomal membrane by female secretions, lasting 5-7 hours), hyperactivating motility and facilitating the acrosome reaction."
        ],
        "clinicalPearl": "**Cryptorchidism, Varicocele & Infertility Nursing Management:** In **Cryptorchidism** (undescended testes), exposure to core body temperature (37°C) arrests spermatogenesis, causing sterility, and increases testicular germ cell malignancy risk 30- to 50-fold if not surgically corrected (orchiopexy) before age 1-2. A **Varicocele** (dilation of the pampiniform venous plexus, most common on the left side due to perpendicular insertion into the left renal vein) impairs venous drainage and countercurrent heat exchange, warming the testis and causing subfertility. Post-prostatectomy or diabetic autonomic neuropathy may damage the internal urethral sphincter, causing **retrograde ejaculation** into the urinary bladder.",
        "images": [
          {
            "src": "/images/physiology/9_image8.png",
            "caption": "Figure 9.8: Male reproductive system and accessory glands.",
            "alt": "Male reproductive system"
          },
          {
            "src": "/images/physiology/9_image9.png",
            "caption": "Figure 9.9: Structural morphology of mature spermatozoon.",
            "alt": "Spermatozoa structure"
          },
          {
            "src": "/images/physiology/9_image1.png",
            "caption": "Figure 9.1: Spermatogenesis and hormonal feedback.",
            "alt": "Spermatogenesis"
          }
        ],
        "tables": []
      },
      {
        "id": "sec-phys-9-2",
        "title": "Female Reproductive Physiology, Oogenesis & Folliculogenesis",
        "content": [
          "The female reproductive system is cyclic in nature, designed to produce viable haploid ova, synthesize female sex steroids (**Estrogens and Progesterone**), provide a hospitable environment for fertilization and gestation, and facilitate parturition and neonatal lactation.",
          "**Oogenesis:** The biological development of the ovum begins during embryonic life, unlike male spermatogenesis which initiates at puberty:",
          "1. **Prenatal Period:** Primordial germ cells migrate to the fetal genital ridge and multiply by mitosis into 6 to 7 million **Oogonia** (46,XX) by the 5th month of gestation. Oogonia differentiate into **Primary Oocytes** and initiate Meiosis I, but arrest at **Prophase I (Dictyotene stage)** surrounded by a single layer of squamous follicular cells, forming **Primordial Follicles**.",
          "2. **At Birth to Puberty:** By birth, apoptosis (atresia) reduces follicle numbers to ~1 to 2 million; by puberty, approximately 300,000 to 400,000 remain. Only about 400 to 500 follicles will successfully ovulate during a woman's 35-40 year reproductive lifespan.",
          "3. **Pubertal Maturation & Ovulation:** Each menstrual cycle, a cohort of follicles is recruited by FSH. The primary oocyte completes Meiosis I just 24-36 hours prior to ovulation under the influence of the **LH surge**, dividing unequally into a large **Secondary Oocyte** (23,X) and a non-functional tiny **First Polar Body**. The secondary oocyte immediately enters Meiosis II and arrests at **Metaphase II**, being ovulated in this arrested state.",
          "4. **Completion of Meiosis II:** Meiosis II is completed **ONLY IF FERTILIZATION OCCURS** upon sperm penetration, casting off the **Second Polar Body** and forming the mature female pronucleus of the zygote. If fertilization fails, the secondary oocyte degenerates within 24 hours.",
          "**Folliculogenesis Stages:** Progresses through Primordial follicle -> Primary follicle (cuboidal granulosa cells, **Zona Pellucida** glycoprotein shell) -> Secondary follicle (stratified granulosa cells, theca interna and theca externa) -> Tertiary / Antral follicle (fluid-filled **antrum** containing follicular fluid rich in estrogen) -> Dominant **Graafian Follicle** (20-25 mm mature follicle ready for ovulation, with oocyte surrounded by the **corona radiata** and anchored on the **cumulus oophorus**)."
        ],
        "points": [
          "**Two-Cell, Two-Gonadotropin Model of Estrogen Biosynthesis:** (1) **Theca Interna Cells** possess LH receptors; LH stimulates cholesterol uptake and conversion into androgens (**Androstenedione and Testosterone**). (2) Androgens diffuse across the basement membrane into **Granulosa Cells**, which possess FSH receptors; FSH activates the enzyme **Aromatase (CYP19A1)**, which converts theca-derived androgens into **Estradiol (E2)**.",
          "**Granulosa Cell Secretions:** In addition to estrogen, granulosa cells synthesize **Inhibin A and B** (selectively suppressing pituitary FSH release), Activin, and follicular fluid.",
          "**Mechanism of Ovulation:** The pre-ovulatory LH surge stimulates granulosa and theca cells to produce progesterone, which induces synthesis of proteolytic enzymes (**Collagenase, Plasminogen Activator**) and prostaglandins (PGE2, PGF2alpha). These enzymes digest the follicular wall and tunica albuginea, creating a bulging stigma that ruptures, expelling the oocyte-cumulus complex into the peritoneal cavity to be captured by fallopian fimbriae."
        ],
        "clinicalPearl": "**Ovarian Hyperstimulation Syndrome (OHSS) & Premature Ovarian Failure:** In assisted reproductive technology (IVF), high-dose gonadotropin stimulation can trigger **OHSS**, characterized by massive ovarian enlargement, extreme vascular endothelial growth factor (VEGF) secretion, third-space fluid shifts, hemoconcentration, ascites, and thromboembolism. Premature cessation of ovarian function before age 40 (**Premature Ovarian Failure / Primary Ovarian Insufficiency**) presents with secondary amenorrhea, elevated FSH (> 40 mIU/mL), and hypoestrogenism, requiring hormone replacement therapy to prevent osteoporosis and cardiovascular disease.",
        "images": [
          {
            "src": "/images/physiology/9_image3.png",
            "caption": "Figure 9.3: Female internal reproductive organs (coronal view).",
            "alt": "Female internal reproductive system front view"
          },
          {
            "src": "/images/physiology/9_image4.png",
            "caption": "Figure 9.4: Female pelvic reproductive organs (sagittal view).",
            "alt": "Female internal reproductive system side view"
          },
          {
            "src": "/images/physiology/9_image2.png",
            "caption": "Figure 9.2: Oogenesis and meiotic arrest stages.",
            "alt": "Oogenesis"
          }
        ],
        "tables": []
      },
      {
        "id": "sec-phys-9-3",
        "title": "The Menstrual Cycle & Neuroendocrine Regulation",
        "content": [
          "The menstrual cycle is a rhythmic 28-day (range 21-35 days) physiological process orchestrated by the **Hypothalamic-Pituitary-Ovarian (HPO) Axis**, preparing the reproductive tract for potential pregnancy.",
          "**The Ovarian Cycle:** Divided into two phases by ovulation on Day 14:",
          "1. **Follicular (Pre-ovulatory) Phase (Days 1 to 14):** Pulsatile hypothalamic **GnRH** triggers anterior pituitary release of **FSH** and **LH**. FSH recruits a cohort of antral follicles; granulosa cells secrete increasing quantities of **Estradiol**. Rising estradiol levels exert negative feedback on pituitary FSH, causing non-dominant follicles to undergo atresia while the single follicle with the highest density of FSH receptors becomes the dominant **Graafian follicle**.",
          "2. **The LH Surge & Ovulation (Day 14):** When sustained plasma estradiol levels exceed 200 pg/mL for > 36-48 hours toward the end of the follicular phase, estrogen paradoxically switches from negative to **POWERFUL POSITIVE FEEDBACK** on the hypothalamus and anterior pituitary. This triggers a massive release of LH (**LH Surge**, peaking 10-12 hours prior to ovulation) along with a smaller FSH surge, precipitating follicular rupture and extrusion of the oocyte.",
          "3. **Luteal (Post-ovulatory) Phase (Days 15 to 28):** The collapsed follicle transforms into the **Corpus Luteum** under LH influence. Granulosa lutein cells synthesize abundant **Progesterone** and moderate estrogen. Progesterone exerts strong negative feedback on GnRH, suppressing new follicular development. If fertilization does not occur, the corpus luteum degenerates after 14 days into the fibrous **Corpus Albicans**, causing a precipitous drop in progesterone and estrogen that triggers endometrial sloughing.",
          "**The Uterine (Endometrial) Cycle:** Corresponds directly to ovarian hormonal fluctuations:",
          "1. **Menstrual Phase (Days 1 to 5):** Collapse of progesterone and estrogen levels produces intense, rhythmic vasospasm of endometrial **spiral arterioles**. Ischemia and lysosomal enzyme release cause necrosis and shedding of the superficial **stratum functionalis**, discharging 30 to 80 mL of blood, mucus, and desquamated tissue through the vagina. The deep **stratum basalis** remains intact to regenerate the endometrium.",
          "2. **Proliferative Phase (Days 6 to 14):** Driven by rising follicular **Estradiol**. Stratum basalis stem cells rapidly divide; endometrial thickness increases from 1 mm to 4-5 mm; uterine glands elongate; spiral arteries proliferate; and cervical mucus becomes thin, watery, alkaline, and profuse with characteristic **ferning** on microscopic drying (facilitating sperm penetration).",
          "3. **Secretory Phase (Days 15 to 28):** Driven by corpus luteum **Progesterone**. Endometrial thickness reaches 6-8 mm; endometrial glands become highly tortuous, coiled, and distended with glycogen-rich secretions ('uterine milk'); spiral arterioles undergo marked spiraling; stromal cells transform into predecidual cells preparing for blastocyst implantation; and cervical mucus becomes thick, viscous, and hostile to sperm, forming a protective barrier."
        ],
        "points": [
          "**Basal Body Temperature (BBT) Shift:** Progesterone secreted by the corpus luteum acts centrally on the hypothalamic thermoregulatory center to elevate basal body temperature by **0.3°C to 0.5°C (0.5°F to 1.0°F)** immediately following ovulation, remaining elevated throughout the luteal phase (a clinical marker of ovulation).",
          "**Spinnbarkeit & Ferning:** Under estrogen dominance at mid-cycle, cervical mucus exhibits high elasticity (**Spinnbarkeit**, stretching up to 8-10 cm without breaking) and crystal arborization (**Ferning**) due to high NaCl content. Progesterone abolishes both properties.",
          "**Dysmenorrhea Mechanisms:** Primary dysmenorrhea results from excessive endometrial synthesis and release of **Prostaglandin F2alpha (PGF2alpha)** during menstrual shedding, producing severe uterine myometrial hypercontractility, uterine ischemia, and intense crampy pelvic pain, effectively relieved by NSAID cyclooxygenase inhibitors."
        ],
        "clinicalPearl": "**Oral Contraceptive Pills (OCPs) & Polycystic Ovary Syndrome (PCOS):** Combined oral contraceptive pills contain synthetic estrogen and progestin that maintain steady plasma levels, exerting continuous negative feedback on the hypothalamus and pituitary to abolish the GnRH pulse and prevent the mid-cycle LH surge, thereby completely blocking ovulation. **PCOS** (Stein-Leventhal syndrome) is characterized by hyperandrogenism, chronic anovulation, and polycystic ovaries on ultrasound; nurses must evaluate these patients for underlying insulin resistance, metabolic syndrome, and endometrial hyperplasia secondary to unopposed estrogen stimulation.",
        "images": [
          {
            "src": "/images/physiology/9_image5.png",
            "caption": "Figure 9.5: Correlation of Ovarian and Uterine (Endometrial) cycles.",
            "alt": "Ovarian and uterine cycles"
          },
          {
            "src": "/images/physiology/9_image6.png",
            "caption": "Figure 9.6: Hypothalamic-Pituitary-Ovarian endocrine feedback loop.",
            "alt": "Hormonal control of female reproductive cycle"
          }
        ],
        "tables": []
      },
      {
        "id": "sec-phys-9-4",
        "title": "Fertilization, Implantation, Pregnancy & Fetal Circulation",
        "content": [
          "**Fertilization:** Normally transpires within the **ampulla of the fallopian (uterine) tube** within 12 to 24 hours post-ovulation. When capacitated spermatozoa encounter the ovulated secondary oocyte:",
          "1. **Acrosome Reaction:** Binding of sperm surface proteins to **ZP3 receptors** on the zona pellucida triggers exocytosis of acrosomal enzymes (hyaluronidase, acrosin), digesting a path through the corona radiata and zona pellucida.",
          "2. **Sperm-Egg Fusion & Polyspermy Block:** The sperm plasma membrane fuses with the oocyte oolemma. This initiates an immediate **Fast Block to Polyspermy** (transient electrical depolarization of the oocyte membrane from -70 mV to +20 mV via Na+ influx) followed by the permanent **Slow Block (Cortical Reaction)**: intracellular Ca2+ wave triggers exocytosis of cortical granules, releasing enzymes that cross-link the zona pellucida (**zona reaction**), hardening it and cleaving ZP3 receptors to render it impenetrable to other sperm.",
          "3. **Activation & Cleavage:** The oocyte completes Meiosis II; male and female pronuclei fuse (syngamy) to re-establish diploidy (46,XX or 46,XY), creating a single-celled **Zygote**. Cleavage divisions convert the zygote into a 16-cell solid ball called a **Morula** (day 3-4), which enters the uterine cavity and develops into a hollow **Blastocyst** (day 5-6) containing an inner cell mass (embryoblast) and an outer **Trophoblast** layer.",
          "**Implantation:** Occurs on Day 6 to 7 post-fertilization in the upper posterior uterine wall. Trophoblast cells differentiate into an inner **Cytotrophoblast** and an outer invasive multinucleated **Syncytiotrophoblast**, which burrows into the decidualized endometrium by secreting metalloproteinases.",
          "**Endocrine Functions of the Placenta:**",
          "1. **Human Chorionic Gonadotropin (hCG):** Secreted by the syncytiotrophoblast within 6-8 days post-conception. Binds LH receptors to **rescue and maintain the corpus luteum**, sustaining high progesterone and estrogen synthesis to prevent menstruation during the first 8-10 weeks of pregnancy until the placenta takes over steroidogenesis (**luteal-placental shift**). hCG is the basis of all clinical pregnancy tests.",
          "2. **Progesterone:** Maintains uterine quiescence by suppressing myometrial contractility and inhibiting prostaglandin synthesis.",
          "3. **Estrogens (Estriol / E3):** Synthesized via cooperation between maternal, fetal adrenal, and placental enzymes (**feto-placental unit**), promoting uterine growth, breast ductal proliferation, and pelvic ligamentous laxity.",
          "4. **Human Placental Lactogen (hPL / hCS):** Promotes maternal lipolysis and induces maternal **insulin resistance**, sparing glucose and amino acids for preferential transplacental shunting to the developing fetus.",
          "**Specialized Fetal Circulatory Shunts:** The fetal cardiovascular grid bypasses non-functional collapsed fetal lungs and inactive maternal liver via three primary vascular shunts:",
          "1. **Ductus Venosus:** Shunts ~50% of oxygen-rich blood from the **umbilical vein** (oxygen saturation ~80%) directly into the inferior vena cava (IVC), bypassing hepatic sinusoids.",
          "2. **Foramen Ovale:** An anatomical flap-valve opening in the interatrial septum that directs oxygenated IVC stream across the right atrium directly into the **left atrium**, preferentially perfusing the fetal brain and coronary vessels via the ascending aorta.",
          "3. **Ductus Arteriosus:** A muscular conduit connecting the pulmonary artery directly to the proximal descending aorta, shunting ~90% of high-resistance right ventricular output away from the collapsed fetal lungs.",
          "**Circulatory Adjustments at Birth:** Clamping the umbilical cord eliminates low-resistance placental circuit, causing a sharp rise in systemic vascular resistance (SVR). The infant's first breath expands the alveoli, plummeting pulmonary vascular resistance (PVR). The massive increase in pulmonary venous return elevates left atrial pressure above right atrial pressure, snapping the **foramen ovale** closed (eventually fusing into the *fossa ovalis*). Elevated arterial PaO2 and falling circulating PGE2 stimulate muscular constriction of the **ductus arteriosus** (closing functionally within 10-15 hours, forming the fibrous *ligamentum arteriosum*). The collapsed umbilical vein forms the *ligamentum teres hepatis*, and the ductus venosus becomes the *ligamentum venosum*."
        ],
        "points": [
          "**Blood-Placental Barrier:** Composed of syncytiotrophoblast, cytotrophoblast (in early gestation), villous connective tissue, and fetal capillary endothelium. Gases, water, and lipid-soluble substances cross via simple diffusion; glucose via facilitated diffusion (GLUT1); amino acids via active transport; maternal **IgG antibodies** via pinocytosis and Fc receptor transcytosis (conferring passive immunity to the newborn).",
          "**Persistent Fetal Shunts:** Failure of normal postnatal closure yields congenital anomalies: **Patent Ductus Arteriosus (PDA)** (produces continuous 'machinery' murmur, treated with NSAID indomethacin to inhibit PGE2, or surgical ligation) and **Patent Foramen Ovale (PFO)**."
        ],
        "clinicalPearl": "**Preeclampsia, Ectopic Pregnancy & Rh Sensitization:** **Ectopic pregnancy** occurs when the blastocyst implants outside the endometrial cavity (95% in the fallopian ampulla), risking catastrophic tubal rupture and fatal intraperitoneal exsanguination. **Preeclampsia** is a multisystem gestational disorder caused by defective trophoblastic invasion of uterine spiral arteries, resulting in placental ischemia, systemic endothelial dysfunction, new-onset hypertension (BP >= 140/90 mmHg after 20 weeks), and proteinuria. Magnesium sulfate is administered as neuroprophylaxis against eclamptic seizures.",
        "images": [
          {
            "src": "/images/physiology/9_image7.png",
            "caption": "Figure 9.7: Stages of human embryonic and fetal development.",
            "alt": "Fetal development"
          }
        ],
        "tables": []
      },
      {
        "id": "sec-phys-9-5",
        "title": "Parturition, Lactation & Reproductive Alterations",
        "content": [
          "**Parturition (Labor):** The physiological process whereby the pregnant uterus expels the fetus and placenta at term (~40 weeks gestation). Initiated by complex neuroendocrine crosstalk:",
          "1. **Progesterone Withdrawal & Estrogen Priming:** Rising feto-placental estrogen levels relative to progesterone increase myometrial responsiveness, induce gap junction (connexin 43) formation between smooth muscle cells, and upregulate **Oxytocin receptors** 100- to 200-fold in the uterine myometrium.",
          "2. **The Ferguson Reflex (Positive Feedback):** Fetal descent pushes the fetal head against the uterine cervix. Mechanoreceptors in the cervix fire neural signals via spinal sensory tracts to the paraventricular and supraoptic nuclei of the hypothalamus, stimulating the posterior pituitary to secrete **Oxytocin** into the bloodstream.",
          "3. **Uterine Contractions:** Oxytocin binds Gq-protein coupled receptors on myometrial smooth muscle, elevating intracellular Ca2+ and stimulating localized synthesis of **Prostaglandins (PGE2, PGF2alpha)**. This intensifies uterine contractions, driving the fetal head further into the cervix, which triggers even greater oxytocin release in a powerful **positive feedback cycle** that terminates only when delivery is complete.",
          "**Lactation Physiology:** Divided into mammogenesis, lactogenesis, galactopoiesis, and milk ejection:",
          "1. **Mammogenesis:** During pregnancy, high circulating estrogen stimulates breast adipose deposition and lactiferous ductal arborization; progesterone stimulates alveolar-lobular development; and human placental lactogen promotes breast maturation. High progesterone and estrogen levels **inhibit milk secretion** during pregnancy by blocking prolactin receptors in alveolar epithelial cells.",
          "2. **Lactogenesis & Galactopoiesis:** Delivery of the placenta causes an immediate drop in estrogen and progesterone, lifting the blockade. The anterior pituitary hormone **Prolactin** stimulates alveolar epithelial cells to synthesize milk proteins (casein, lactalbumin), lactose, and lipids. Each suckling episode triggers a neuroendocrine reflex that surges prolactin release, maintaining milk production (**galactopoiesis**).",
          "3. **The Milk Ejection (Let-Down) Reflex:** Tactile stimulation of the maternal nipple by infant suckling transmits sensory impulses via thoracic spinal nerves (T4-T6) to the hypothalamus. The posterior pituitary releases **Oxytocin**, which circulates to the breast and stimulates rhythmic contraction of **myoepithelial cells** surrounding the alveoli, forcing milk from the alveoli into the lactiferous ducts and sinuses to be ejected through the nipple pores.",
          "**Colostrum vs. Mature Milk:** For the first 2 to 3 days postpartum, the breasts produce **colostrum**, a yellowish, viscous fluid low in fat and carbohydrate but rich in proteins, minerals, and maternal **Secretory IgA antibodies**, which coat the infant's GI mucosa to provide immediate passive immunity against enteric pathogens. Mature milk transitions by day 10-14, containing 87% water, 7% lactose, 4% fat, and 1% protein."
        ],
        "points": [
          "**Lactational Amenorrhea:** High levels of prolactin associated with frequent, exclusive breastfeeding suppress hypothalamic GnRH pulsatility, dampening FSH and LH secretion and producing natural postpartum anovulation and amenorrhea (effective contraceptive for 6 months only if exclusively breastfeeding).",
          "**Oxytocin Uterine Involution:** Oxytocin released during suckling also stimulates postpartum myometrial contractions, promoting **uterine involution** and compressing severed uterine blood vessels to minimize postpartum bleeding.",
          "**Psychological Inhibition of Milk Ejection:** Because oxytocin release is regulated by the cerebral cortex and limbic system, maternal stress, extreme pain, fatigue, or anxiety can inhibit oxytocin release, preventing the let-down reflex despite adequate milk production."
        ],
        "clinicalPearl": "**Postpartum Hemorrhage (PPH) & Uterotonic Management:** **Postpartum Hemorrhage (PPH)** (blood loss > 500 mL after vaginal delivery or > 1,000 mL after cesarean section) is most frequently caused by **uterine atony** (failure of myometrial muscle fibers to contract and constrict open spiral vessels at the placental detachment site). Immediate nursing actions include vigorous fundal massage, initiating continuous IV infusion of **Oxytocin**, administering secondary uterotonics (Methylergonovine, Carboprost / PGF2alpha, Misoprostol), and monitoring vital signs for hypovolemic shock.",
        "images": [],
        "tables": []
      }
    ],
    "mcqs": [
      {
        "id": "phys-mcq-9-681",
        "question": "nan",
        "correctAnswer": "nan",
        "subtopic": "nan"
      },
      {
        "id": "phys-mcq-9-682",
        "question": "nan",
        "correctAnswer": "nan",
        "subtopic": "nan"
      },
      {
        "id": "phys-mcq-9-683",
        "question": "nan",
        "correctAnswer": "nan",
        "subtopic": "nan"
      },
      {
        "id": "phys-mcq-9-684",
        "question": "nan",
        "correctAnswer": "nan",
        "subtopic": "nan"
      },
      {
        "id": "phys-mcq-9-685",
        "question": "nan",
        "correctAnswer": "nan",
        "subtopic": "nan"
      },
      {
        "id": "phys-mcq-9-686",
        "question": "nan",
        "correctAnswer": "nan",
        "subtopic": "nan"
      },
      {
        "id": "phys-mcq-9-687",
        "question": "nan",
        "correctAnswer": "nan",
        "subtopic": "nan"
      },
      {
        "id": "phys-mcq-9-688",
        "question": "nan",
        "correctAnswer": "nan",
        "subtopic": "nan"
      },
      {
        "id": "phys-mcq-9-689",
        "question": "nan",
        "correctAnswer": "nan",
        "subtopic": "nan"
      },
      {
        "id": "phys-mcq-9-690",
        "question": "nan",
        "correctAnswer": "nan",
        "subtopic": "nan"
      },
      {
        "id": "phys-mcq-9-691",
        "question": "nan",
        "correctAnswer": "nan",
        "subtopic": "nan"
      },
      {
        "id": "phys-mcq-9-692",
        "question": "nan",
        "correctAnswer": "nan",
        "subtopic": "nan"
      },
      {
        "id": "phys-mcq-9-693",
        "question": "nan",
        "correctAnswer": "nan",
        "subtopic": "nan"
      },
      {
        "id": "phys-mcq-9-694",
        "question": "nan",
        "correctAnswer": "nan",
        "subtopic": "nan"
      },
      {
        "id": "phys-mcq-9-695",
        "question": "nan",
        "correctAnswer": "nan",
        "subtopic": "nan"
      },
      {
        "id": "phys-mcq-9-696",
        "question": "nan",
        "correctAnswer": "nan",
        "subtopic": "nan"
      },
      {
        "id": "phys-mcq-9-697",
        "question": "nan",
        "correctAnswer": "nan",
        "subtopic": "nan"
      },
      {
        "id": "phys-mcq-9-698",
        "question": "nan",
        "correctAnswer": "nan",
        "subtopic": "nan"
      },
      {
        "id": "phys-mcq-9-699",
        "question": "nan",
        "correctAnswer": "nan",
        "subtopic": "nan"
      },
      {
        "id": "phys-mcq-9-700",
        "question": "nan",
        "correctAnswer": "nan",
        "subtopic": "nan"
      },
      {
        "id": "phys-mcq-9-701",
        "question": "nan",
        "correctAnswer": "nan",
        "subtopic": "nan"
      },
      {
        "id": "phys-mcq-9-702",
        "question": "nan",
        "correctAnswer": "nan",
        "subtopic": "nan"
      },
      {
        "id": "phys-mcq-9-703",
        "question": "nan",
        "correctAnswer": "nan",
        "subtopic": "nan"
      },
      {
        "id": "phys-mcq-9-704",
        "question": "nan",
        "correctAnswer": "nan",
        "subtopic": "nan"
      },
      {
        "id": "phys-mcq-9-705",
        "question": "nan",
        "correctAnswer": "nan",
        "subtopic": "nan"
      },
      {
        "id": "phys-mcq-9-706",
        "question": "nan",
        "correctAnswer": "nan",
        "subtopic": "nan"
      },
      {
        "id": "phys-mcq-9-707",
        "question": "nan",
        "correctAnswer": "nan",
        "subtopic": "nan"
      },
      {
        "id": "phys-mcq-9-708",
        "question": "nan",
        "correctAnswer": "nan",
        "subtopic": "nan"
      },
      {
        "id": "phys-mcq-9-709",
        "question": "nan",
        "correctAnswer": "nan",
        "subtopic": "nan"
      },
      {
        "id": "phys-mcq-9-710",
        "question": "nan",
        "correctAnswer": "nan",
        "subtopic": "nan"
      },
      {
        "id": "phys-mcq-9-711",
        "question": "nan",
        "correctAnswer": "nan",
        "subtopic": "nan"
      },
      {
        "id": "phys-mcq-9-712",
        "question": "nan",
        "correctAnswer": "nan",
        "subtopic": "nan"
      },
      {
        "id": "phys-mcq-9-713",
        "question": "nan",
        "correctAnswer": "nan",
        "subtopic": "nan"
      },
      {
        "id": "phys-mcq-9-714",
        "question": "nan",
        "correctAnswer": "nan",
        "subtopic": "nan"
      },
      {
        "id": "phys-mcq-9-715",
        "question": "nan",
        "correctAnswer": "nan",
        "subtopic": "nan"
      },
      {
        "id": "phys-mcq-9-716",
        "question": "nan",
        "correctAnswer": "nan",
        "subtopic": "nan"
      },
      {
        "id": "phys-mcq-9-717",
        "question": "nan",
        "correctAnswer": "nan",
        "subtopic": "nan"
      },
      {
        "id": "phys-mcq-9-718",
        "question": "nan",
        "correctAnswer": "nan",
        "subtopic": "nan"
      },
      {
        "id": "phys-mcq-9-719",
        "question": "nan",
        "correctAnswer": "nan",
        "subtopic": "nan"
      },
      {
        "id": "phys-mcq-9-720",
        "question": "nan",
        "correctAnswer": "nan",
        "subtopic": "nan"
      },
      {
        "id": "phys-mcq-9-721",
        "question": "nan",
        "correctAnswer": "nan",
        "subtopic": "nan"
      },
      {
        "id": "phys-mcq-9-722",
        "question": "nan",
        "correctAnswer": "nan",
        "subtopic": "nan"
      },
      {
        "id": "phys-mcq-9-723",
        "question": "nan",
        "correctAnswer": "nan",
        "subtopic": "nan"
      },
      {
        "id": "phys-mcq-9-724",
        "question": "nan",
        "correctAnswer": "nan",
        "subtopic": "nan"
      },
      {
        "id": "phys-mcq-9-725",
        "question": "nan",
        "correctAnswer": "nan",
        "subtopic": "nan"
      },
      {
        "id": "phys-mcq-9-726",
        "question": "nan",
        "correctAnswer": "nan",
        "subtopic": "nan"
      },
      {
        "id": "phys-mcq-9-727",
        "question": "nan",
        "correctAnswer": "nan",
        "subtopic": "nan"
      },
      {
        "id": "phys-mcq-9-728",
        "question": "nan",
        "correctAnswer": "nan",
        "subtopic": "nan"
      },
      {
        "id": "phys-mcq-9-729",
        "question": "nan",
        "correctAnswer": "nan",
        "subtopic": "nan"
      },
      {
        "id": "phys-mcq-9-730",
        "question": "nan",
        "correctAnswer": "nan",
        "subtopic": "nan"
      },
      {
        "id": "phys-mcq-9-731",
        "question": "nan",
        "correctAnswer": "nan",
        "subtopic": "nan"
      },
      {
        "id": "phys-mcq-9-732",
        "question": "nan",
        "correctAnswer": "nan",
        "subtopic": "nan"
      },
      {
        "id": "phys-mcq-9-733",
        "question": "nan",
        "correctAnswer": "nan",
        "subtopic": "nan"
      },
      {
        "id": "phys-mcq-9-734",
        "question": "nan",
        "correctAnswer": "nan",
        "subtopic": "nan"
      },
      {
        "id": "phys-mcq-9-735",
        "question": "nan",
        "correctAnswer": "nan",
        "subtopic": "nan"
      },
      {
        "id": "phys-mcq-9-736",
        "question": "nan",
        "correctAnswer": "nan",
        "subtopic": "nan"
      },
      {
        "id": "phys-mcq-9-737",
        "question": "nan",
        "correctAnswer": "nan",
        "subtopic": "nan"
      },
      {
        "id": "phys-mcq-9-738",
        "question": "nan",
        "correctAnswer": "nan",
        "subtopic": "nan"
      },
      {
        "id": "phys-mcq-9-739",
        "question": "nan",
        "correctAnswer": "nan",
        "subtopic": "nan"
      },
      {
        "id": "phys-mcq-9-740",
        "question": "nan",
        "correctAnswer": "nan",
        "subtopic": "nan"
      },
      {
        "id": "phys-mcq-9-741",
        "question": "nan",
        "correctAnswer": "nan",
        "subtopic": "nan"
      },
      {
        "id": "phys-mcq-9-742",
        "question": "nan",
        "correctAnswer": "nan",
        "subtopic": "nan"
      },
      {
        "id": "phys-mcq-9-743",
        "question": "nan",
        "correctAnswer": "nan",
        "subtopic": "nan"
      },
      {
        "id": "phys-mcq-9-744",
        "question": "nan",
        "correctAnswer": "nan",
        "subtopic": "nan"
      },
      {
        "id": "phys-mcq-9-745",
        "question": "nan",
        "correctAnswer": "nan",
        "subtopic": "nan"
      },
      {
        "id": "phys-mcq-9-746",
        "question": "nan",
        "correctAnswer": "nan",
        "subtopic": "nan"
      },
      {
        "id": "phys-mcq-9-747",
        "question": "nan",
        "correctAnswer": "nan",
        "subtopic": "nan"
      },
      {
        "id": "phys-mcq-9-748",
        "question": "nan",
        "correctAnswer": "nan",
        "subtopic": "nan"
      },
      {
        "id": "phys-mcq-9-749",
        "question": "nan",
        "correctAnswer": "nan",
        "subtopic": "nan"
      },
      {
        "id": "phys-mcq-9-750",
        "question": "nan",
        "correctAnswer": "nan",
        "subtopic": "nan"
      },
      {
        "id": "phys-mcq-9-751",
        "question": "nan",
        "correctAnswer": "nan",
        "subtopic": "nan"
      },
      {
        "id": "phys-mcq-9-752",
        "question": "nan",
        "correctAnswer": "nan",
        "subtopic": "nan"
      },
      {
        "id": "phys-mcq-9-753",
        "question": "nan",
        "correctAnswer": "nan",
        "subtopic": "nan"
      },
      {
        "id": "phys-mcq-9-754",
        "question": "nan",
        "correctAnswer": "nan",
        "subtopic": "nan"
      },
      {
        "id": "phys-mcq-9-755",
        "question": "nan",
        "correctAnswer": "nan",
        "subtopic": "nan"
      },
      {
        "id": "phys-mcq-9-756",
        "question": "nan",
        "correctAnswer": "nan",
        "subtopic": "nan"
      },
      {
        "id": "phys-mcq-9-757",
        "question": "nan",
        "correctAnswer": "nan",
        "subtopic": "nan"
      },
      {
        "id": "phys-mcq-9-758",
        "question": "nan",
        "correctAnswer": "nan",
        "subtopic": "nan"
      },
      {
        "id": "phys-mcq-9-759",
        "question": "nan",
        "correctAnswer": "nan",
        "subtopic": "nan"
      },
      {
        "id": "phys-mcq-9-760",
        "question": "nan",
        "correctAnswer": "nan",
        "subtopic": "nan"
      },
      {
        "id": "phys-mcq-9-761",
        "question": "nan",
        "correctAnswer": "nan",
        "subtopic": "nan"
      },
      {
        "id": "phys-mcq-9-762",
        "question": "nan",
        "correctAnswer": "nan",
        "subtopic": "nan"
      },
      {
        "id": "phys-mcq-9-763",
        "question": "nan",
        "correctAnswer": "nan",
        "subtopic": "nan"
      },
      {
        "id": "phys-mcq-9-764",
        "question": "nan",
        "correctAnswer": "nan",
        "subtopic": "nan"
      },
      {
        "id": "phys-mcq-9-765",
        "question": "nan",
        "correctAnswer": "nan",
        "subtopic": "nan"
      }
    ],
    "subjectiveQuestions": [
      {
        "id": "phys-subj-9-1",
        "question": "List two phases of the menstrual cycle.",
        "type": "Very short",
        "marks": 2,
        "difficulty": 1
      },
      {
        "id": "phys-subj-9-2",
        "question": "List two phases of spermatogenesis.",
        "type": "Very short",
        "marks": 2,
        "difficulty": 1
      },
      {
        "id": "phys-subj-9-3",
        "question": "Define spermatogenesis.",
        "type": "Very short",
        "marks": 2,
        "difficulty": 1
      },
      {
        "id": "phys-subj-9-4",
        "question": "Explain the phases of the menstrual cycle.",
        "type": "Short",
        "marks": 5,
        "difficulty": 1
      },
      {
        "id": "phys-subj-9-5",
        "question": "Describe the stages of spermatogenesis.",
        "type": "Short",
        "marks": 5,
        "difficulty": 1
      },
      {
        "id": "phys-subj-9-6",
        "question": "Explain the functions of testosterone.",
        "type": "Short",
        "marks": 5,
        "difficulty": 1
      },
      {
        "id": "phys-subj-9-7",
        "question": "Explain the functions of progesterone.",
        "type": "Short",
        "marks": 5,
        "difficulty": 1
      },
      {
        "id": "phys-subj-9-8",
        "question": "Describe Premenstrual Syndrome.",
        "type": "Short",
        "marks": 5,
        "difficulty": 1
      },
      {
        "id": "phys-subj-9-9",
        "question": "Explain the regulation of the menstrual cycle.",
        "type": "Short",
        "marks": 5,
        "difficulty": 1
      },
      {
        "id": "phys-subj-9-10",
        "question": "Differentiate between oogenesis and spermatogenesis with a suitable diagram.",
        "type": "Short",
        "marks": 5,
        "difficulty": 1
      },
      {
        "id": "phys-subj-9-11",
        "question": "State the meaning of menstrual cycle. Describe the phases of the menstrual cycle with a labelled diagram. (3+7)",
        "type": "Essay",
        "marks": 10,
        "difficulty": 1
      },
      {
        "id": "phys-subj-9-12",
        "question": "Illustrate the internal and external organs of the female reproductive system and their functions. (5+5)",
        "type": "Essay",
        "marks": 10,
        "difficulty": 1
      },
      {
        "id": "phys-subj-9-13",
        "question": "Illustrate the functions of estrogen and progesterone hormones. (5+5)",
        "type": "Essay",
        "marks": 10,
        "difficulty": 1
      }
    ]
  },
  "phys-unit-10": {
    "id": "phys-unit-10",
    "unitNumber": 10,
    "title": "Endocrine Physiology",
    "category": "Hormonal Feedback & Regulation",
    "icon": "⚡",
    "color": "from-amber-500 to-yellow-600",
    "teachingHours": "60 Hours INC Curriculum (Theory 18h + Practical 42h)",
    "summary": "Detailed functional mechanisms, regulation, homeostatic balance, clinical alterations and official INC competencies of Endocrine Physiology.",
    "objectives": [
      "Enumerate the functions of the Endocrine System.",
      "Explain the functions of the Pituitary Gland.",
      "Discuss the functions of the Pineal Gland.",
      "Discuss the functions of the Thymus Gland.",
      "Describe the functions of the Thyroid Gland.",
      "Describe the functions of the Parathyroid Glands.",
      "Describe the functions of the Pancreas.",
      "Describe the Suprarenal Glands and enlist the functions of it."
    ],
    "totalImages": 6,
    "sections": [
      {
        "id": "sec-phys-10-1",
        "title": "Mechanisms of Hormone Action, Feedback Loops & The Hypothalamic-Pituitary Axis",
        "content": [
          "The **endocrine system** is an integrated network of ductless glands that synthesize and secrete chemical messengers called **hormones** directly into extracellular fluid and the vascular grid to coordinate homeostatic balance, somatic growth, metabolism, and reproduction.",
          "**Chemical Classification of Hormones & Signal Transduction:**",
          "1. **Peptide / Protein Hormones:** (e.g., Insulin, Glucagon, Pituitary hormones, PTH). Hydrophilic and water-soluble; circulate freely in plasma with short half-lives (minutes). Cannot cross the hydrophobic lipid bilayer, so they bind to **cell-surface membrane receptors** and initiate intracellular cascades via second messengers:",
          "   - **cAMP Pathway:** Receptor couples to Gs protein, activating Adenylyl Cyclase to convert ATP into cyclic AMP (cAMP), which activates **Protein Kinase A (PKA)** (e.g., ACTH, TSH, Glucagon, ADH V2).",
          "   - **IP3 / DAG Pathway:** Receptor couples to Gq protein, activating Phospholipase C (PLC) to cleave PIP2 into Inositol Trisphosphate (IP3, releasing Ca2+ from endoplasmic reticulum) and Diacylglycerol (DAG, activating Protein Kinase C) (e.g., Oxytocin, TRH, GnRH, Angiotensin II, ADH V1).",
          "   - **Receptor Tyrosine Kinase:** Ligand binding triggers autophosphorylation and activation of downstream kinase cascades (e.g., Insulin, IGF-1).",
          "2. **Steroid Hormones:** (e.g., Cortisol, Aldosterone, Estrogen, Progesterone, Testosterone). Derived from **cholesterol**; lipophilic and water-insoluble. Circulate bound to plasma carrier proteins (albumin, globulins) with prolonged half-lives (hours). Diffuse freely across plasma membranes and bind to **intracellular cytoplasmic or nuclear receptors**, functioning as ligand-activated transcription factors that regulate gene transcription and protein synthesis.",
          "3. **Amine Hormones:** Derived from the amino acid tyrosine: **Catecholamines** (Epinephrine, Norepinephrine) are hydrophilic and act via cell-surface GPCRs; **Thyroid Hormones** (T3, T4) are lipophilic and act via intracellular nuclear receptors.",
          "**The Hypothalamic-Pituitary Control Complex:** The hypothalamus functions as the supreme neuroendocrine coordinator, linked to the pituitary gland (**hypophysis**) via the infundibular stalk:",
          "1. **Anterior Pituitary (Adenohypophysis):** Composed of glandular epithelial tissue derived from oral Rathke's pouch. Regulated by hypothalamic releasing and inhibiting hypophysiotropic hormones (**TRH, CRH, GnRH, GHRH, Somatostatin, Dopamine**) delivered via the **Hypothalamic-Hypophyseal Portal System**. Produces 6 major peptide hormones: **Growth Hormone (GH)**, **Adrenocorticotropic Hormone (ACTH)**, **Thyroid-Stimulating Hormone (TSH)**, **Follicle-Stimulating Hormone (FSH)**, **Luteinizing Hormone (LH)**, and **Prolactin (PRL)**.",
          "2. **Posterior Pituitary (Neurohypophysis):** Composed of neural tissue. Synthesizes NO hormones itself; consists of unmyelinated axon terminals of neurosecretory magnocellular neurons whose cell bodies reside in the hypothalamic **Supraoptic** and **Paraventricular nuclei**. Transports and releases two peptide octapeptides: **Antidiuretic Hormone (ADH / Vasopressin)** (synthesized predominantly in supraoptic nucleus; acts on renal V2 receptors in collecting ducts to insert **Aquaporin-2** water channels, promoting pure water reabsorption) and **Oxytocin** (synthesized predominantly in paraventricular nucleus; stimulates uterine contractions and milk letdown)."
        ],
        "points": [
          "**Negative Feedback Loops:** The predominant regulatory mechanism in endocrinology. Elevated levels of circulating target organ hormones (e.g., free T3/T4 or Cortisol) act back on both the anterior pituitary and hypothalamus to inhibit further secretion of trophic hormones (TSH or ACTH) and releasing hormones (TRH or CRH), maintaining hormone levels within a narrow physiological window.",
          "**Upregulation & Downregulation:** Chronic elevated hormone concentration leads to target cell receptor internalization and decreased synthesis (**downregulation**, as in insulin resistance); prolonged hormone deficit leads to increased receptor density and enhanced target sensitivity (**upregulation**).",
          "**Synergism vs. Permissiveness:** **Synergism** occurs when multiple hormones produce a combined effect greater than the sum of their individual effects (e.g., glucagon, epinephrine, and cortisol elevating blood glucose). **Permissiveness** occurs when one hormone must be present for another hormone to exert its full physiological effect (e.g., thyroid hormone is permissive for epinephrine-stimulated lipolysis)."
        ],
        "clinicalPearl": "**Diabetes Insipidus (DI) vs. SIADH:** In **Central Diabetes Insipidus**, failure of hypothalamic or posterior pituitary ADH synthesis/secretion produces massive polyuria (5 to 15 L/day of dilute urine with specific gravity < 1.005), hypernatremia, and intense polydipsia, effectively managed with synthetic **Desmopressin (DDAVP)**. In **SIADH (Syndrome of Inappropriate ADH Secretion)**, autonomous ADH release causes excessive water retention, euvolemic hyponatremia, and concentrated urine, requiring strict fluid restriction and hypertonic 3% saline for severe neurological emergencies.",
        "images": [
          {
            "src": "/images/physiology/10_image1.png",
            "caption": "Figure 10.1: Neuroendocrine milk ejection and let-down reflex.",
            "alt": "Milk ejection reflex"
          },
          {
            "src": "/images/physiology/10_image2.png",
            "caption": "Figure 10.2: Anatomical location and endocrine role of the pineal gland.",
            "alt": "Pineal gland"
          }
        ],
        "tables": []
      },
      {
        "id": "sec-phys-10-2",
        "title": "Growth Hormone & The Pineal / Thymus Glands",
        "content": [
          "**Growth Hormone (GH / Somatotropin):** A 191-amino acid single-chain polypeptide synthesized by **somatotrophs** (the most abundant endocrine cells in the anterior pituitary, constituting 50% of glandular mass). Regulated antagonistically by hypothalamic **GHRH** (stimulatory) and **Somatostatin (GHIH)** (inhibitory). Secreted in pulsatile nocturnal bursts synchronized with deep Stage 3/4 slow-wave sleep.",
          "**Physiological Actions of Growth Hormone:**",
          "1. **Direct Anti-Insulin (Diabetogenic) Metabolic Actions:** GH stimulates lipolysis in adipocytes (elevating circulating free fatty acids), enhances hepatic gluconeogenesis, and inhibits peripheral glucose uptake in skeletal muscle and adipose tissue, shifting cellular fuel utilization from carbohydrates to fats and conserving glucose for the brain.",
          "2. **Indirect Growth-Promoting (Anabolic) Actions:** GH acts on hepatocytes and peripheral tissues to stimulate the synthesis of **Insulin-like Growth Factor 1 (IGF-1 / Somatomedin C)**. IGF-1 binds to cell-surface tyrosine kinase receptors to stimulate chondrocyte proliferation, osteoblast differentiation, epiphyseal plate elongation (linear bone growth), amino acid uptake, and cellular protein synthesis across all organ systems.",
          "**Clinical Disorders of Growth Hormone Secretion:**",
          "1. **Growth Hormone Deficiency (Pituitary Dwarfism):** Childhood GH deficiency yields proportional, symmetrical short stature with normal body proportions and preserved cognitive intelligence.",
          "2. **Gigantism:** GH-secreting pituitary adenoma occurring **prior to epiphyseal plate closure** in childhood, producing extreme, proportional overgrowth of long bones (height reaching > 7 to 8 feet).",
          "3. **Acromegaly:** GH-secreting pituitary adenoma occurring **after epiphyseal fusion** in adulthood. Longitudinal bone growth is impossible; instead, periosteal bone growth and soft tissue hyperplasia produce enlargement of the hands, feet, jaw (prognathism), coarse facial features, macroglossia, visceral organomegaly (cardiomegaly), and secondary diabetes mellitus.",
          "**The Pineal Gland & Melatonin:** A small pinecone-shaped neuroendocrine organ situated in the posterior epithalamus. Composed of **pinealocytes** that synthesize the indoleamine hormone **Melatonin** from tryptophan via serotonin.",
          "Melatonin secretion is tightly regulated by the circadian pacemaker in the hypothalamic **Suprachiasmatic Nucleus (SCN)**: ambient light entering retinal ganglion cells stimulates the retinohypothalamic tract, signaling sympathetic preganglionic fibers in the spinal cord to **inhibit** pineal melatonin synthesis during daylight. Darkness lifts this inhibition, triggering a nocturnal surge in melatonin that promotes sleep onset, regulates the sleep-wake cycle, and exerts potent antioxidant effects.",
          "**The Thymus Gland & Immune Maturation:** A bilobed lymphoid organ situated in the superior anterior mediastinum. Secretes a family of peptide hormones including **Thymosin, Thymopoietin, and Thymulin**. These endocrine mediators promote the differentiation, maturation, and immunological education of bone marrow-derived progenitor T-cells into functional CD4+ helper and CD8+ cytotoxic T-lymphocytes within the thymic cortex and medulla. The thymus reaches maximal relative size at puberty, followed by gradual age-associated fat replacement (**involution**)."
        ],
        "points": [
          "**Stimulators & Inhibitors of GH Secretion:** Stimulated by GHRH, deep sleep, hypoglycemia, exercise, fasting/starvation, high-protein meals (arginine), and acute physical stress. Inhibited by somatostatin, hyperglycemia, elevated free fatty acids, IGF-1 feedback, and obesity.",
          "**Diagnostic Testing for Acromegaly:** Elevated random GH is unreliable due to pulsatile secretion; definitive diagnosis requires an **Oral Glucose Tolerance Test (OGTT)**. In normal individuals, oral glucose (75g) suppresses plasma GH below 1 ng/mL; in acromegaly, GH paradoxically fails to suppress or rises. Plasma IGF-1 provides the most dependable screening biomarker.",
          "**Jet Lag & Melatonin Therapeutics:** Rapid travel across multiple time zones desynchronizes the circadian rhythm of the SCN from local ambient daylight, producing insomnia, fatigue, and cognitive disorientation (**jet lag**). Exogenous melatonin administered at local bedtime accelerates circadian phase resetting."
        ],
        "clinicalPearl": "**Acromegaly Cardiorespiratory Complications & Nursing Care:** Acromegaly is associated with high mortality from concentric left ventricular hypertrophy, congestive heart failure, severe hypertension, and obstructive sleep apnea (due to pharyngeal soft tissue hyperplasia and macroglossia). Postoperative nursing care following transsphenoidal hypophysectomy requires frequent neurological checks, monitoring for CSF rhinorrhea (halo sign on dressing, testing fluid for glucose), and rigorous intake/output tracking to detect early post-surgical Central Diabetes Insipidus.",
        "images": [
          {
            "src": "/images/physiology/10_image3.png",
            "caption": "Figure 10.3: Thymus gland and T-lymphocyte differentiation.",
            "alt": "Thymus gland"
          }
        ],
        "tables": []
      },
      {
        "id": "sec-phys-10-3",
        "title": "Thyroid & Parathyroid Glands: Metabolic & Calcium Homeostasis",
        "content": [
          "The **thyroid gland** is a highly vascular, butterfly-shaped organ straddling the anterior trachea. It comprises spherical **thyroid follicles** lined by follicular epithelial cells enclosing a lumen filled with **colloid**, a proteinaceous gel consisting predominantly of the glycoprotein **Thyroglobulin (Tg)**.",
          "**Biosynthesis & Secretion of Thyroid Hormones:** Follows a specialized 7-step sequence:",
          "1. **Iodide Trapping:** Basolateral **Sodium-Iodide Symporter (NIS)** actively transports dietary iodide (I-) from plasma into follicular cells against a 30- to 50-fold electrochemical gradient (driven by Na+/K+-ATPase).",
          "2. **Oxidation of Iodide:** Iodide is transported across the apical membrane into the follicle lumen via the pendrin transporter and oxidized to reactive iodine (I0) by apical **Thyroid Peroxidase (TPO)** in the presence of H2O2.",
          "3. **Organification of Thyroglobulin:** Reactive iodine is rapidly incorporated into tyrosine residues on thyroglobulin by TPO, forming **Monoiodotyrosine (MIT)** and **Diiodotyrosine (DIT)**.",
          "4. **Coupling Reaction:** TPO catalyzes the oxidative coupling of iodotyrosine molecules within the thyroglobulin scaffold: **MIT + DIT -> Triiodothyronine (T3)**; **DIT + DIT -> Thyroxine (Tetraiodothyronine / T4)**.",
          "5. **Colloid Storage & Endocytosis:** Colloid stores several months' reserve of thyroid hormone. Under TSH stimulation, follicular cells engulf colloid via pinocytosis, forming endocytic vesicles.",
          "6. **Proteolysis & Release:** Lysosomes fuse with pinocytic vesicles; lysosomal proteases cleave T3 and T4 from thyroglobulin, releasing free hormones into the bloodstream. Uncoupled MIT and DIT are deiodinated by intracellular halodehalogenase, recycling iodide.",
          "7. **Circulation & Peripheral Activation:** The thyroid gland secretes 90% T4 and 10% T3. More than 99.9% of circulating hormones are bound to plasma proteins, predominantly **Thyroxine-Binding Globulin (TBG)**. In peripheral target tissues (liver, kidneys), the prohormone T4 is deiodinated by **5'-deiodinase** into biologically active **T3** (which has 4- to 5-fold higher affinity for nuclear thyroid receptors).",
          "**Physiological Actions of Thyroid Hormones:** Increases Basal Metabolic Rate (BMR) and oxygen consumption across all tissues (calorigenic effect); upregulates Na+/K+-ATPase pumps; enhances intestinal carbohydrate absorption and lipolysis; upregulates **cardiac beta-1 adrenergic receptors** (increasing heart rate, contractility, and cardiac output); and is absolutely indispensable for fetal and neonatal neurodevelopment and linear skeletal growth.",
          "**Parathyroid Glands & Calcium Homeostasis:** Four pea-sized glands nestled on the posterior surface of thyroid lobes. Composed of **Chief Cells** that secrete **Parathyroid Hormone (PTH)** in direct response to falling ionized serum calcium (detected by cell-surface Calcium-Sensing Receptors / CaSR).",
          "**Physiological Actions of PTH (Restores Serum Calcium):**",
          "1. **Bone:** Stimulates osteoblasts to express **RANKL**, which binds to RANK on osteoclast precursors, activating mature osteoclasts to resorb bone matrix and mobilize calcium and phosphate into plasma.",
          "2. **Kidneys:** Increases distal convoluted tubule **reabsorption of Calcium** while inhibiting proximal tubule reabsorption of **Phosphate** (phosphaturic effect, preventing calcium phosphate precipitation).",
          "3. **Intestine (Indirect):** Upregulates renal **1-alpha-hydroxylase** in proximal tubules, converting 25-hydroxyvitamin D into active **1,25-dihydroxyvitamin D (Calcitriol)**, which potently enhances enterocyte absorption of dietary calcium and phosphate via apical TRPV6 channels and intracellular calbindin.",
          "**Calcitonin:** Synthesized by **Parafollicular (C-cells)** of the thyroid in response to hypercalcemia; acts as a physiological antagonist to PTH by inhibiting osteoclastic bone resorption (minor homeostatic role in humans)."
        ],
        "points": [
          "**Thyroid Alterations:**",
          "  - **Hyperthyroidism (Thyrotoxicosis):** Most commonly **Graves' Disease** (autoimmune production of thyroid-stimulating immunoglobulins / TSI that bind and activate TSH receptors). Manifests with heat intolerance, weight loss despite polyphagia, fine tremors, tachycardia, palpitations, diaphoresis, diffuse goiter, pretibial myxedema, and **exophthalmos**.",
          "  - **Hypothyroidism:** Most commonly **Hashimoto's Thyroiditis** (autoimmune destruction of thyroid follicles with anti-TPO and anti-Tg antibodies). Manifests with cold intolerance, weight gain, fatigue, constipation, dry coarse skin, bradycardia, periorbital puffiness, and **myxedema**. Neonatal deficiency causes irreversible mental retardation and dwarfism (**Cretinism**).",
          "**Calcium & Neuromuscular Excitability:** Ionized calcium stabilizes neuronal sodium channels. **Hypocalcemia** (< 8.5 mg/dL) increases neuronal membrane permeability to Na+, lowering threshold potential and causing extreme neuromuscular hyperexcitability (**tetany**, carpopedal spasm, laryngospasm). Hypercalcemia (> 10.5 mg/dL) depresses neuromuscular transmission, causing lethargy, muscle weakness, and cardiac arrhythmias."
        ],
        "clinicalPearl": "**Trousseau's / Chvostek's Signs & Post-Thyroidectomy Tetany:** Accidental surgical devascularization or excision of parathyroid glands during total thyroidectomy precipitates acute hypocalcemia within 24-48 hours. The nurse must assess for: (1) **Chvostek's Sign** (facial muscle twitching elicited by tapping over the facial nerve anterior to the earlobe) and (2) **Trousseau's Sign** (carpal spasm / 'obstetrician's hand' induced by inflating a blood pressure cuff > 20 mmHg above systolic BP for 3 minutes). Acute symptomatic tetany is an immediate airway emergency treated with slow IV infusion of **10% Calcium Gluconate** under continuous cardiac telemetry.",
        "images": [
          {
            "src": "/images/physiology/10_image4.png",
            "caption": "Figure 10.4: Biochemical pathway of thyroid hormone synthesis and coupling.",
            "alt": "Synthesis of thyroid hormones"
          },
          {
            "src": "/images/physiology/10_image5.png",
            "caption": "Figure 10.5: Calcium homeostasis, PTH, Calcitriol, and Calcitonin regulation.",
            "alt": "Calcium and PTH regulation"
          }
        ],
        "tables": []
      },
      {
        "id": "sec-phys-10-4",
        "title": "Adrenal Glands & Pancreatic Endocrine Islets",
        "content": [
          "The **adrenal (suprarenal) glands** sit atop each kidney, comprising two functionally distinct endocrine structures enclosed within a single fibrous capsule: the outer **Adrenal Cortex** (mesodermal origin, 80-90% of mass, synthesizing steroid hormones) and the inner **Adrenal Medulla** (ectodermal neural crest origin, functionally an expanded sympathetic ganglion).",
          "**Functional Zonation of the Adrenal Cortex (GFR - 'Salt, Sugar, Sex'):**",
          "1. **Zona Glomerulosa (Outer 15%):** Synthesizes **Mineralocorticoids**, principally **Aldosterone**. Regulated by the **Renin-Angiotensin-Aldosterone System (RAAS)** and hyperkalemia. Aldosterone binds to intracellular mineralocorticoid receptors in renal cortical collecting duct principal cells, upregulating basolateral Na+/K+-ATPase pumps and apical ENaC channels to stimulate **Na+ reabsorption** and **K+ / H+ excretion**, expanding extracellular fluid volume and regulating systemic blood pressure.",
          "2. **Zona Fasciculata (Middle 75%):** Synthesizes **Glucocorticoids**, principally **Cortisol (Hydrocortisone)**. Regulated by hypothalamic **CRH** and pituitary **ACTH** according to a prominent circadian diurnal rhythm (peaking at 06:00-08:00, nadir at midnight). Cortisol is the body's primary stress hormone: it promotes **gluconeogenesis** (mobilizing amino acids from muscle and glycerol from adipose tissue), stimulates lipolysis, inhibits peripheral glucose uptake (diabetogenic), stabilizes lysosomal membranes, and profoundly **suppresses inflammatory and immune responses** (inhibiting NF-kB, interleukins, and phospholipase A2).",
          "3. **Zona Reticularis (Inner 10%):** Synthesizes **Adrenal Androgens**, principally **Dehydroepiandrosterone (DHEA)** and **Androstenedione**. Converted into testosterone and estrogens in peripheral tissues, sustaining axillary and pubic hair growth, sebaceous gland activity, and female libido.",
          "**The Adrenal Medulla & Chromaffin Cells:** Innervated directly by preganglionic sympathetic fibers from the splanchnic nerves. In response to acute stress, acetylcholine stimulates **Chromaffin Cells** to secrete catecholamines directly into the circulation: **Epinephrine (Adrenaline, 80%)** and **Norepinephrine (Noradrenaline, 20%)**.",
          "Catecholamines mediate the classic **Fight-or-Flight Response** via adrenergic receptors: alpha-1 (vasoconstriction), beta-1 (increased cardiac rate and contractility), and beta-2 (bronchodilation, hepatic glycogenolysis, and splanchnic vasodilation).",
          "**Endocrine Pancreas: The Islets of Langerhans:** Approximately 1 to 2 million microscopic endocrine clusters dispersed throughout the exocrine pancreatic parenchyma, comprising four distinct hormone-secreting cell types:",
          "1. **Beta Cells (60-70%):** Synthesize and secrete **Insulin**, the body's preeminent anabolic hormone. Synthesized as preproinsulin -> proinsulin -> cleaved in Golgi into active **Insulin (51 amino acids)** and equimolar **C-Peptide**. Secretion is triggered by glucose uptake via GLUT2 transporters: glucose oxidation generates ATP, which closes **ATP-sensitive K+ channels**, depolarizing the beta cell membrane, opening voltage-gated Ca2+ channels, and triggering insulin exocytosis.",
          "   - **Physiological Actions of Insulin:** Promotes glucose uptake in skeletal muscle and adipose tissue by translocation of **GLUT4 transporters** to the plasma membrane; stimulates glycogen synthesis (glycogenesis); stimulates glycolysis; promotes protein synthesis and amino acid uptake; stimulates fatty acid synthesis and lipogenesis; and potently inhibits glycogenolysis, gluconeogenesis, lipolysis, and ketogenesis.",
          "2. **Alpha Cells (20-25%):** Synthesize and secrete **Glucagon**. Stimulated by hypoglycemia, fasting, and exercise. Glucagon binds to hepatic GPCRs, activating cAMP to stimulate **glycogenolysis** and **gluconeogenesis**, elevating blood glucose.",
          "3. **Delta Cells (5-10%):** Secrete **Somatostatin**, which acts locally in a paracrine fashion to suppress both insulin and glucagon secretion.",
          "4. **F (PP) Cells (1-2%):** Secrete Pancreatic Polypeptide, regulating pancreatic exocrine secretions."
        ],
        "points": [
          "**Cushing's Syndrome vs. Addison's Disease:**",
          "  - **Cushing's Syndrome:** Chronic glucocorticoid excess (pituitary ACTH adenoma / Cushing's disease, ectopic ACTH, adrenal adenoma, or iatrogenic steroids). Manifests with central obesity, 'moon face', 'buffalo hump', purple abdominal striae, muscle wasting, osteoporosis, hyperglycemia, hypertension, and impaired wound healing.",
          "  - **Addison's Disease (Primary Adrenal Insufficiency):** Autoimmune destruction of all three adrenocortical zones. Characterized by loss of aldosterone and cortisol: severe hypotension, hyponatremia, hyperkalemia, hypoglycemia, fatigue, weight loss, and diffuse skin **hyperpigmentation** (elevated POMC/ACTH stimulating melanocyte MSH receptors).",
          "**Diabetes Mellitus Pathophysiology:**",
          "  - **Type 1 DM:** Autoimmune T-cell mediated destruction of pancreatic beta cells, causing absolute insulin deficiency. Untreated patients rapidly develop life-threatening **Diabetic Ketoacidosis (DKA)** (hyperglycemia, metabolic acidosis with elevated anion gap, Kussmaul respirations, ketonemia, and acetone breath).",
          "  - **Type 2 DM:** Progressive peripheral insulin resistance coupled with relative secretory defect of beta cells. Associated with obesity, metabolic syndrome, and risk of **Hyperosmolar Hyperglycemic State (HHS)**."
        ],
        "clinicalPearl": "**Adrenal Crisis & Hypoglycemia 'Rule of 15':** Acute adrenocortical insufficiency (**Addisonian / Adrenal Crisis**) is a fatal medical emergency triggered by infection, trauma, or abrupt cessation of chronic corticosteroid therapy, causing refractory hypovolemic shock and severe hypoglycemia; immediate management mandates rapid IV normal saline and bolus **Hydrocortisone (100 mg IV)**. For conscious hypoglycemic patients (blood glucose < 70 mg/dL), nurses enforce the **'Rule of 15'**: administer 15 grams of rapid-acting simple carbohydrate (4 oz fruit juice or 3-4 glucose tablets), recheck capillary blood glucose in 15 minutes, and repeat until normoglycemic.",
        "images": [
          {
            "src": "/images/physiology/10_image6.png",
            "caption": "Figure 10.6: Adrenal gland functional zonation and hormonal synthesis.",
            "alt": "Adrenal gland structure"
          }
        ],
        "tables": []
      }
    ],
    "mcqs": [
      {
        "id": "phys-mcq-10-766",
        "question": "nan",
        "correctAnswer": "nan",
        "subtopic": "nan"
      },
      {
        "id": "phys-mcq-10-767",
        "question": "nan",
        "correctAnswer": "nan",
        "subtopic": "nan"
      },
      {
        "id": "phys-mcq-10-768",
        "question": "nan",
        "correctAnswer": "nan",
        "subtopic": "nan"
      },
      {
        "id": "phys-mcq-10-769",
        "question": "nan",
        "correctAnswer": "nan",
        "subtopic": "nan"
      },
      {
        "id": "phys-mcq-10-770",
        "question": "nan",
        "correctAnswer": "nan",
        "subtopic": "nan"
      },
      {
        "id": "phys-mcq-10-771",
        "question": "nan",
        "correctAnswer": "nan",
        "subtopic": "nan"
      },
      {
        "id": "phys-mcq-10-772",
        "question": "nan",
        "correctAnswer": "nan",
        "subtopic": "nan"
      },
      {
        "id": "phys-mcq-10-773",
        "question": "nan",
        "correctAnswer": "nan",
        "subtopic": "nan"
      },
      {
        "id": "phys-mcq-10-774",
        "question": "nan",
        "correctAnswer": "nan",
        "subtopic": "nan"
      },
      {
        "id": "phys-mcq-10-775",
        "question": "nan",
        "correctAnswer": "nan",
        "subtopic": "nan"
      },
      {
        "id": "phys-mcq-10-776",
        "question": "nan",
        "correctAnswer": "nan",
        "subtopic": "nan"
      },
      {
        "id": "phys-mcq-10-777",
        "question": "nan",
        "correctAnswer": "nan",
        "subtopic": "nan"
      },
      {
        "id": "phys-mcq-10-778",
        "question": "nan",
        "correctAnswer": "nan",
        "subtopic": "nan"
      },
      {
        "id": "phys-mcq-10-779",
        "question": "nan",
        "correctAnswer": "nan",
        "subtopic": "nan"
      },
      {
        "id": "phys-mcq-10-780",
        "question": "nan",
        "correctAnswer": "nan",
        "subtopic": "nan"
      },
      {
        "id": "phys-mcq-10-781",
        "question": "nan",
        "correctAnswer": "nan",
        "subtopic": "nan"
      },
      {
        "id": "phys-mcq-10-782",
        "question": "nan",
        "correctAnswer": "nan",
        "subtopic": "nan"
      },
      {
        "id": "phys-mcq-10-783",
        "question": "nan",
        "correctAnswer": "nan",
        "subtopic": "nan"
      },
      {
        "id": "phys-mcq-10-784",
        "question": "nan",
        "correctAnswer": "nan",
        "subtopic": "nan"
      },
      {
        "id": "phys-mcq-10-785",
        "question": "nan",
        "correctAnswer": "nan",
        "subtopic": "nan"
      },
      {
        "id": "phys-mcq-10-786",
        "question": "nan",
        "correctAnswer": "nan",
        "subtopic": "nan"
      },
      {
        "id": "phys-mcq-10-787",
        "question": "nan",
        "correctAnswer": "nan",
        "subtopic": "nan"
      },
      {
        "id": "phys-mcq-10-788",
        "question": "nan",
        "correctAnswer": "nan",
        "subtopic": "nan"
      },
      {
        "id": "phys-mcq-10-789",
        "question": "nan",
        "correctAnswer": "nan",
        "subtopic": "nan"
      },
      {
        "id": "phys-mcq-10-790",
        "question": "nan",
        "correctAnswer": "nan",
        "subtopic": "nan"
      },
      {
        "id": "phys-mcq-10-791",
        "question": "nan",
        "correctAnswer": "nan",
        "subtopic": "nan"
      },
      {
        "id": "phys-mcq-10-792",
        "question": "nan",
        "correctAnswer": "nan",
        "subtopic": "nan"
      },
      {
        "id": "phys-mcq-10-793",
        "question": "nan",
        "correctAnswer": "nan",
        "subtopic": "nan"
      },
      {
        "id": "phys-mcq-10-794",
        "question": "nan",
        "correctAnswer": "nan",
        "subtopic": "nan"
      },
      {
        "id": "phys-mcq-10-795",
        "question": "nan",
        "correctAnswer": "nan",
        "subtopic": "nan"
      },
      {
        "id": "phys-mcq-10-796",
        "question": "nan",
        "correctAnswer": "nan",
        "subtopic": "nan"
      },
      {
        "id": "phys-mcq-10-797",
        "question": "nan",
        "correctAnswer": "nan",
        "subtopic": "nan"
      },
      {
        "id": "phys-mcq-10-798",
        "question": "nan",
        "correctAnswer": "nan",
        "subtopic": "nan"
      },
      {
        "id": "phys-mcq-10-799",
        "question": "nan",
        "correctAnswer": "nan",
        "subtopic": "nan"
      },
      {
        "id": "phys-mcq-10-800",
        "question": "nan",
        "correctAnswer": "nan",
        "subtopic": "nan"
      },
      {
        "id": "phys-mcq-10-801",
        "question": "nan",
        "correctAnswer": "nan",
        "subtopic": "nan"
      },
      {
        "id": "phys-mcq-10-802",
        "question": "nan",
        "correctAnswer": "nan",
        "subtopic": "nan"
      },
      {
        "id": "phys-mcq-10-803",
        "question": "nan",
        "correctAnswer": "nan",
        "subtopic": "nan"
      },
      {
        "id": "phys-mcq-10-804",
        "question": "nan",
        "correctAnswer": "nan",
        "subtopic": "nan"
      },
      {
        "id": "phys-mcq-10-805",
        "question": "nan",
        "correctAnswer": "nan",
        "subtopic": "nan"
      },
      {
        "id": "phys-mcq-10-806",
        "question": "nan",
        "correctAnswer": "nan",
        "subtopic": "nan"
      },
      {
        "id": "phys-mcq-10-807",
        "question": "nan",
        "correctAnswer": "nan",
        "subtopic": "nan"
      },
      {
        "id": "phys-mcq-10-808",
        "question": "nan",
        "correctAnswer": "nan",
        "subtopic": "nan"
      },
      {
        "id": "phys-mcq-10-809",
        "question": "nan",
        "correctAnswer": "nan",
        "subtopic": "nan"
      },
      {
        "id": "phys-mcq-10-810",
        "question": "nan",
        "correctAnswer": "nan",
        "subtopic": "nan"
      },
      {
        "id": "phys-mcq-10-811",
        "question": "nan",
        "correctAnswer": "nan",
        "subtopic": "nan"
      },
      {
        "id": "phys-mcq-10-812",
        "question": "nan",
        "correctAnswer": "nan",
        "subtopic": "nan"
      },
      {
        "id": "phys-mcq-10-813",
        "question": "nan",
        "correctAnswer": "nan",
        "subtopic": "nan"
      },
      {
        "id": "phys-mcq-10-814",
        "question": "nan",
        "correctAnswer": "nan",
        "subtopic": "nan"
      },
      {
        "id": "phys-mcq-10-815",
        "question": "nan",
        "correctAnswer": "nan",
        "subtopic": "nan"
      },
      {
        "id": "phys-mcq-10-816",
        "question": "nan",
        "correctAnswer": "nan",
        "subtopic": "nan"
      },
      {
        "id": "phys-mcq-10-817",
        "question": "nan",
        "correctAnswer": "nan",
        "subtopic": "nan"
      },
      {
        "id": "phys-mcq-10-818",
        "question": "nan",
        "correctAnswer": "nan",
        "subtopic": "nan"
      },
      {
        "id": "phys-mcq-10-819",
        "question": "nan",
        "correctAnswer": "nan",
        "subtopic": "nan"
      },
      {
        "id": "phys-mcq-10-820",
        "question": "nan",
        "correctAnswer": "nan",
        "subtopic": "nan"
      },
      {
        "id": "phys-mcq-10-821",
        "question": "nan",
        "correctAnswer": "nan",
        "subtopic": "nan"
      },
      {
        "id": "phys-mcq-10-822",
        "question": "nan",
        "correctAnswer": "nan",
        "subtopic": "nan"
      },
      {
        "id": "phys-mcq-10-823",
        "question": "nan",
        "correctAnswer": "nan",
        "subtopic": "nan"
      },
      {
        "id": "phys-mcq-10-824",
        "question": "nan",
        "correctAnswer": "nan",
        "subtopic": "nan"
      },
      {
        "id": "phys-mcq-10-825",
        "question": "nan",
        "correctAnswer": "nan",
        "subtopic": "nan"
      },
      {
        "id": "phys-mcq-10-826",
        "question": "nan",
        "correctAnswer": "nan",
        "subtopic": "nan"
      },
      {
        "id": "phys-mcq-10-827",
        "question": "nan",
        "correctAnswer": "nan",
        "subtopic": "nan"
      },
      {
        "id": "phys-mcq-10-828",
        "question": "nan",
        "correctAnswer": "nan",
        "subtopic": "nan"
      },
      {
        "id": "phys-mcq-10-829",
        "question": "nan",
        "correctAnswer": "nan",
        "subtopic": "nan"
      },
      {
        "id": "phys-mcq-10-830",
        "question": "nan",
        "correctAnswer": "nan",
        "subtopic": "nan"
      },
      {
        "id": "phys-mcq-10-831",
        "question": "nan",
        "correctAnswer": "nan",
        "subtopic": "nan"
      },
      {
        "id": "phys-mcq-10-832",
        "question": "nan",
        "correctAnswer": "nan",
        "subtopic": "nan"
      },
      {
        "id": "phys-mcq-10-833",
        "question": "nan",
        "correctAnswer": "nan",
        "subtopic": "nan"
      },
      {
        "id": "phys-mcq-10-834",
        "question": "nan",
        "correctAnswer": "nan",
        "subtopic": "nan"
      },
      {
        "id": "phys-mcq-10-835",
        "question": "nan",
        "correctAnswer": "nan",
        "subtopic": "nan"
      },
      {
        "id": "phys-mcq-10-836",
        "question": "nan",
        "correctAnswer": "nan",
        "subtopic": "nan"
      },
      {
        "id": "phys-mcq-10-837",
        "question": "nan",
        "correctAnswer": "nan",
        "subtopic": "nan"
      },
      {
        "id": "phys-mcq-10-838",
        "question": "nan",
        "correctAnswer": "nan",
        "subtopic": "nan"
      },
      {
        "id": "phys-mcq-10-839",
        "question": "nan",
        "correctAnswer": "nan",
        "subtopic": "nan"
      },
      {
        "id": "phys-mcq-10-840",
        "question": "nan",
        "correctAnswer": "nan",
        "subtopic": "nan"
      },
      {
        "id": "phys-mcq-10-841",
        "question": "nan",
        "correctAnswer": "nan",
        "subtopic": "nan"
      },
      {
        "id": "phys-mcq-10-842",
        "question": "nan",
        "correctAnswer": "nan",
        "subtopic": "nan"
      },
      {
        "id": "phys-mcq-10-843",
        "question": "nan",
        "correctAnswer": "nan",
        "subtopic": "nan"
      },
      {
        "id": "phys-mcq-10-844",
        "question": "nan",
        "correctAnswer": "nan",
        "subtopic": "nan"
      },
      {
        "id": "phys-mcq-10-845",
        "question": "nan",
        "correctAnswer": "nan",
        "subtopic": "nan"
      },
      {
        "id": "phys-mcq-10-846",
        "question": "nan",
        "correctAnswer": "nan",
        "subtopic": "nan"
      },
      {
        "id": "phys-mcq-10-847",
        "question": "nan",
        "correctAnswer": "nan",
        "subtopic": "nan"
      },
      {
        "id": "phys-mcq-10-848",
        "question": "nan",
        "correctAnswer": "nan",
        "subtopic": "nan"
      },
      {
        "id": "phys-mcq-10-849",
        "question": "nan",
        "correctAnswer": "nan",
        "subtopic": "nan"
      },
      {
        "id": "phys-mcq-10-850",
        "question": "nan",
        "correctAnswer": "nan",
        "subtopic": "nan"
      }
    ],
    "subjectiveQuestions": [
      {
        "id": "phys-subj-10-1",
        "question": "Summarize the functions of the thyroid gland.",
        "type": "Very short",
        "marks": 2,
        "difficulty": 1
      },
      {
        "id": "phys-subj-10-2",
        "question": "Draw the diagram of the thyroid gland.",
        "type": "Very short",
        "marks": 2,
        "difficulty": 1
      },
      {
        "id": "phys-subj-10-3",
        "question": "State the meaning of the thyroid gland.",
        "type": "Very short",
        "marks": 2,
        "difficulty": 1
      },
      {
        "id": "phys-subj-10-4",
        "question": "Enumerate the functions of thyroid hormones.",
        "type": "Very short",
        "marks": 2,
        "difficulty": 1
      },
      {
        "id": "phys-subj-10-5",
        "question": "Enumerate the functions of parathyroid hormone.",
        "type": "Very short",
        "marks": 2,
        "difficulty": 1
      },
      {
        "id": "phys-subj-10-6",
        "question": "Draw the diagram of the thyroid gland and label it.",
        "type": "Very short",
        "marks": 2,
        "difficulty": 1
      },
      {
        "id": "phys-subj-10-7",
        "question": "Recognize the functions of the parathyroid gland.",
        "type": "Very short",
        "marks": 2,
        "difficulty": 1
      },
      {
        "id": "phys-subj-10-8",
        "question": "Define insulin.",
        "type": "Very short",
        "marks": 2,
        "difficulty": 1
      },
      {
        "id": "phys-subj-10-9",
        "question": "Draw the diagram of the adrenal gland.",
        "type": "Very short",
        "marks": 2,
        "difficulty": 1
      },
      {
        "id": "phys-subj-10-10",
        "question": "Enumerate the hormones of the adrenal cortex.",
        "type": "Very short",
        "marks": 2,
        "difficulty": 1
      },
      {
        "id": "phys-subj-10-11",
        "question": "Write the characteristics of a hormone.",
        "type": "Very short",
        "marks": 2,
        "difficulty": 1
      },
      {
        "id": "phys-subj-10-12",
        "question": "Describe the functions of the parathormone hormone.",
        "type": "Very short",
        "marks": 2,
        "difficulty": 1
      },
      {
        "id": "phys-subj-10-13",
        "question": "Write the action of glucagon.",
        "type": "Very short",
        "marks": 2,
        "difficulty": 1
      },
      {
        "id": "phys-subj-10-14",
        "question": "Write the action of insulin.",
        "type": "Very short",
        "marks": 2,
        "difficulty": 1
      },
      {
        "id": "phys-subj-10-15",
        "question": "Draw the diagram of the parathyroid gland and label it.",
        "type": "Very short",
        "marks": 2,
        "difficulty": 1
      },
      {
        "id": "phys-subj-10-16",
        "question": "Classify the name of thyroid hormones.",
        "type": "Very short",
        "marks": 2,
        "difficulty": 1
      },
      {
        "id": "phys-subj-10-17",
        "question": "Identify the hormone secreted by the female breast.",
        "type": "Very short",
        "marks": 2,
        "difficulty": 1
      },
      {
        "id": "phys-subj-10-18",
        "question": "List two gonadotropic hormones.",
        "type": "Very short",
        "marks": 2,
        "difficulty": 1
      },
      {
        "id": "phys-subj-10-19",
        "question": "Enumerate the functions of the parathyroid gland.",
        "type": "Short",
        "marks": 5,
        "difficulty": 1
      },
      {
        "id": "phys-subj-10-20",
        "question": "Explain gastrointestinal hormones.",
        "type": "Short",
        "marks": 5,
        "difficulty": 1
      },
      {
        "id": "phys-subj-10-21",
        "question": "Explain the difference between hypothyroidism and hyperthyroidism.",
        "type": "Short",
        "marks": 5,
        "difficulty": 1
      },
      {
        "id": "phys-subj-10-22",
        "question": "Determine the structure and functions of the parathyroid gland.",
        "type": "Short",
        "marks": 5,
        "difficulty": 1
      },
      {
        "id": "phys-subj-10-23",
        "question": "Determine the structure and functions of the thyroid gland.",
        "type": "Short",
        "marks": 5,
        "difficulty": 1
      },
      {
        "id": "phys-subj-10-24",
        "question": "Explain the functions and hormones of the ovary.",
        "type": "Short",
        "marks": 5,
        "difficulty": 1
      },
      {
        "id": "phys-subj-10-25",
        "question": "Draw the diagram of the pituitary gland, explain the lobes of the pituitary gland and its hormones. (2+3+5)",
        "type": "Essay",
        "marks": 10,
        "difficulty": 1
      }
    ]
  },
  "phys-unit-11": {
    "id": "phys-unit-11",
    "unitNumber": 11,
    "title": "Nervous System Physiology",
    "category": "Neurophysiology, Reflexes & Synapses",
    "icon": "🧠",
    "color": "from-indigo-500 to-purple-600",
    "teachingHours": "60 Hours INC Curriculum (Theory 18h + Practical 42h)",
    "summary": "Detailed functional mechanisms, regulation, homeostatic balance, clinical alterations and official INC competencies of Nervous System Physiology.",
    "objectives": [
      "Describe the physiology of nervous system and alteration in diseases of the nervous system.",
      "Explain the function of the Nerve Tissue.",
      "Explain the types of Nerve Cells and their functions.",
      "Discuss the Neurophysiology.",
      "Explain the structure of Synapses including Synapstic Transmission and Impules Processing.",
      "Explain the functions of the Cerebrum, Brain Stem, Cerebellum and Spinal Cord",
      "Explain the Peripheral Nervous System functions including Spinal Nerve and Cranial Nerve.",
      "Explain the Autonomic Nervous System functions including Sympathetic and Parasympathetic division."
    ],
    "totalImages": 6,
    "sections": [
      {
        "id": "sec-phys-11-1",
        "title": "Neuronal Physiology, Action Potentials & Synaptic Transmission",
        "content": [
          "The **nervous system** is the body's premier rapid-communication and control network, executing sensory input integration, cognitive processing, and precise motor coordination across trillions of interconnected cellular units.",
          "**Structure of the Neuron:** Composed of a **Soma (cell body)** containing the nucleus and Nissl bodies (rough ER); branched **Dendrites** specialized for receiving incoming synaptic inputs; and a single cylindrical **Axon** originating at the **Axon Hillock (Initial Segment / Trigger Zone)**, specialized for action potential initiation and impulse propagation toward distal terminal boutons.",
          "Axons are insulated by a lipid-rich **Myelin Sheath** formed by **Schwann cells** in the peripheral nervous system (PNS) and **Oligodendrocytes** in the central nervous system (CNS). Gaps between adjacent myelin segments, called **Nodes of Ranvier**, concentrate voltage-gated Na+ channels and enable **Saltatory Conduction**, where the action potential leaps electrotonically from node to node at speeds up to 120 m/s (compared to 0.5-2 m/s in unmyelinated fibers).",
          "**Electrophysiology of the Resting Membrane Potential (RMP):** In resting excitable neurons, the intracellular potential is **-70 mV** relative to extracellular fluid. The RMP is generated by:",
          "1. **Asymmetric Ion Distribution:** High intracellular K+ (140-150 mEq/L) vs. low extracellular K+ (3.5-5.0 mEq/L); low intracellular Na+ (10-14 mEq/L) vs. high extracellular Na+ (135-145 mEq/L).",
          "2. **Differential Membrane Permeability:** The resting membrane possesses abundant non-gated **K+ Leak Channels**, rendering it 50 to 100 times more permeable to K+ than to Na+. K+ diffuses down its steep chemical gradient out of the cell, leaving behind trapped impermeant intracellular organic anions (proteins, phosphates), driving the membrane potential toward the K+ equilibrium potential (-90 mV calculated by the Nernst Equation).",
          "3. **Electrogenic Na+/K+-ATPase Pump:** Continuously extrudes 3 Na+ ions in exchange for 2 K+ ions imported per ATP hydrolyzed, maintaining the transmembrane ionic gradients and directly contributing -3 to -5 mV of negativity.",
          "**Phases of the Action Potential (All-or-None Law):** When depolarizing graded potentials reach the threshold potential (~ -55 mV) at the axon hillock:",
          "1. **Depolarization:** Voltage-gated Na+ channels rapidly open (m-gates open); explosive influx of Na+ down both electrical and concentration gradients drives the membrane potential toward +30 to +35 mV (**overshoot**).",
          "2. **Repolarization:** Voltage-gated Na+ channel inactivation gates (h-gates) close, halting further Na+ entry. Simultaneously, delayed rectifier **voltage-gated K+ channels** open; rapid efflux of K+ down its electrochemical gradient drives the membrane potential back toward resting levels.",
          "3. **Hyperpolarization (Afterhyperpolarization):** Delayed closure of voltage-gated K+ channels allows continued K+ efflux, driving the membrane transiently more negative than -70 mV (toward -85 mV) before resting conductance is restored.",
          "**Refractory Periods:** The **Absolute Refractory Period** occurs during depolarization and initial repolarization when voltage-gated Na+ channels are either completely open or locked in an inactivated state; no stimulus, regardless of strength, can fire a second action potential (enforcing unidirectional impulse propagation). The **Relative Refractory Period** occurs during late repolarization/hyperpolarization when Na+ channels have transitioned back to their resting closed state but K+ channels remain open; an action potential can be triggered, but requires a suprathreshold stimulus.",
          "**Synaptic Transmission:** At chemical synapses, an action potential arriving at the presynaptic terminal triggers influx of extracellular Ca2+ through **voltage-gated Ca2+ channels**. Ca2+ binds to synaptotagmin, stimulating SNARE proteins to fuse synaptic vesicles with the presynaptic membrane, releasing neurotransmitter into the 20-nm synaptic cleft. Neurotransmitter diffuses across and binds to postsynaptic receptors:",
          "  - **Excitatory Postsynaptic Potential (EPSP):** Opens ligand-gated cation channels (Na+, Ca2+), producing local depolarization (e.g., Acetylcholine on nicotinic receptors, Glutamate on AMPA/NMDA receptors).",
          "  - **Inhibitory Postsynaptic Potential (IPSP):** Opens ligand-gated anion channels (Cl-) or K+ channels, producing hyperpolarization (e.g., **GABA** on GABA-A receptors, Glycine).",
          "  - Postsynaptic potentials undergo **Spatial Summation** (multiple simultaneous inputs from different synapses) and **Temporal Summation** (rapid successive inputs from a single synapse) at the axon hillock to determine whether threshold is attained."
        ],
        "points": [
          "**Neurotransmitters of the Central Nervous System:**",
          "  - **Acetylcholine (ACh):** Primary neuromuscular transmitter; central roles in arousal, memory, and cognition in basal forebrain cholinergic nuclei (degenerated in Alzheimer's disease).",
          "  - **Glutamate:** The principal **excitatory neurotransmitter** in the brain; excessive extracellular accumulation causes excitotoxicity via NMDA receptor hyperactivation and intracellular Ca2+ overload during stroke.",
          "  - **GABA (Gamma-Aminobutyric Acid):** The principal **inhibitory neurotransmitter** in the brain; synthesized from glutamate by glutamic acid decarboxylase (GAD); benzodiazepines and barbiturates enhance GABA-A receptor Cl- conductance to produce sedation and anticonvulsant effects.",
          "  - **Dopamine:** Synthesized from L-DOPA; operates in nigrostriatal (motor control), mesolimbic (reward and addiction), and tuberoinfundibular (prolactin inhibition) pathways.",
          "  - **Serotonin (5-HT):** Synthesized from tryptophan in brainstem raphe nuclei; modulates mood, sleep, appetite, and pain sensitivity; targets for SSRI antidepressants."
        ],
        "clinicalPearl": "**Multiple Sclerosis, Local Anesthetics & Hypokalemia:** **Multiple Sclerosis (MS)** is an autoimmune demyelinating disease of the CNS where cytotoxic T-cells destroy myelin sheaths and oligodendrocytes. Loss of saltatory conduction causes action potential propagation failure, presenting with relapsing-remitting visual deficits (optic neuritis), spastic weakness, ataxia, and paresthesias. **Local Anesthetics** (Lidocaine, Bupivacaine) act by selectively binding and blocking voltage-gated Na+ channels from within the neuronal membrane, preventing action potential generation and transmission of pain signals. Serum **hypokalemia** (< 3.5 mEq/L) hyperpolarizes resting membrane potential away from threshold, producing profound skeletal muscle weakness, hyporeflexia, and cardiac arrhythmias.",
        "images": [
          {
            "src": "/images/physiology/11_image1.png",
            "caption": "Figure 11.1: Structural anatomy of a multipolar neuron and myelin sheath.",
            "alt": "Neuron structure"
          },
          {
            "src": "/images/physiology/11_image2.png",
            "caption": "Figure 11.2: Chemical synapse architecture and neurotransmitter exocytosis.",
            "alt": "Synapse structure"
          }
        ],
        "tables": []
      },
      {
        "id": "sec-phys-11-2",
        "title": "Spinal Cord Physiology, Somatosensory Pathways & Motor Tracts",
        "content": [
          "The **spinal cord** serves as the principal bi-directional conduit for neural information linking the brain and peripheral body, while hosting intrinsic circuitry for autonomic and somatic spinal reflexes.",
          "**Internal Architecture of the Spinal Cord:** In transverse cross-section, the spinal cord exhibits an inner **H-shaped gray matter** core enveloped by outer **white matter funiculi** (columns):",
          "1. **Dorsal (Posterior) Horn:** Receives incoming sensory axons via dorsal nerve roots (afferent input).",
          "2. **Ventral (Anterior) Horn:** Houses large somatic **alpha and gamma motor neurons** whose axons exit via ventral nerve roots to innervate skeletal muscle fibers (efferent output).",
          "3. **Lateral Horn (T1-L2 and S2-S4):** Contains preganglionic autonomic cell bodies (sympathetic in thoracolumbar segments; parasympathetic in sacral segments).",
          "**Somatosensory Ascending Tracts (Transmit Sensory Input to Cerebral Cortex):**",
          "1. **Dorsal Column-Medial Lemniscal (DCML) Pathway:** Transmits **fine discriminative touch, conscious proprioception (joint position sense), two-point discrimination, and vibratory sense**.",
          "   - **First-Order Neuron:** Cell body in dorsal root ganglion; axon enters spinal cord and ascends ipsilaterally in the dorsal funiculus as the **Fasciculus Gracilis** (carrying fibers from lower limbs and trunk below T6) and **Fasciculus Cuneatus** (carrying fibers from upper limbs and thorax above T6).",
          "   - **Second-Order Neuron:** Synapses in the Nucleus Gracilis and Nucleus Cuneatus of the lower medulla oblongata. Axons **decussate completely in the medulla** as internal arcuate fibers and ascend through the brainstem as the **Medial Lemniscus**.",
          "   - **Third-Order Neuron:** Synapses in the **Ventral Posterolateral (VPL) Nucleus** of the thalamus; axons project via the posterior limb of the internal capsule to terminate somatotopically in the **Primary Somatosensory Cortex** (postcentral gyrus, Brodmann areas 3, 1, 2).",
          "2. **Anterolateral (Spinothalamic) System:** Transmits **pain, temperature, and crude touch**.",
          "   - **First-Order Neuron:** Pseudounipolar neuron in dorsal root ganglion; synapses in dorsal horn substantia gelatinosa.",
          "   - **Second-Order Neuron:** Cell bodies in dorsal horn. Axons **decussate obliquely within 1-2 spinal cord segments** through the anterior white commissure and ascend in the contralateral white matter: **Lateral Spinothalamic Tract** (pain and temperature) and **Anterior Spinothalamic Tract** (crude touch and pressure).",
          "   - **Third-Order Neuron:** Synapses in the VPL nucleus of the thalamus, projecting to the primary somatosensory cortex.",
          "**Descending Motor Tracts (Control Voluntary Movement):**",
          "1. **The Pyramidal (Corticospinal) System:** The premier pathway for skilled, voluntary, fine fractional movements (especially distal extremities and digits):",
          "   - Originates from pyramidal cells (including giant Betz cells) in the **Primary Motor Cortex** (precentral gyrus, Brodmann area 4, 30%), premotor cortex (30%), and somatosensory cortex (40%).",
          "   - Axons descend through the corona radiata, posterior limb of the internal capsule, cerebral peduncles of the midbrain, and basis pontis into the **medullary pyramids**.",
          "   - **Decussation:** At the lower medulla, approximately **85% to 90% of fibers decussate** at the pyramidal decussation to form the **Lateral Corticospinal Tract**, which descends in the lateral funiculus and synapses onto alpha motor neurons in the ventral horn. The remaining 10% to 15% descend uncrossed as the **Anterior Corticospinal Tract**, decussating at the level of termination.",
          "2. **Upper Motor Neuron (UMN) vs. Lower Motor Neuron (LMN) Lesions:** Understanding the physiological distinction between UMNs (originating in motor cortex and terminating in spinal ventral horn) and LMNs (originating in ventral horn and terminating at skeletal muscle) is foundational to clinical neurological nursing assessment."
        ],
        "points": [
          "**Clinical Comparison: UMN vs. LMN Lesions:**",
          "  - **Upper Motor Neuron Lesion:** Muscle tone is **spastic** (hypertonia, 'clasp-knife' rigidity); deep tendon reflexes are **hyperactive** (hyperreflexia, clonus); pathologic reflexes are present (**Positive Babinski sign**: extensor plantar response with dorsiflexion of great toe and fanning of lesser toes); no significant muscle atrophy (except disuse); no fasciculations.",
          "  - **Lower Motor Neuron Lesion:** Muscle tone is **flaccid** (hypotonia); deep tendon reflexes are **diminished or absent** (hyporeflexia/areflexia); plantars are normal flexor or absent; profound and rapid **muscle atrophy / wasting**; visible muscle **fasciculations and fibrillations** due to denervation hypersensitivity.",
          "**Brown-Séquard Syndrome (Spinal Cord Hemisection):** Caused by lateral spinal cord trauma or tumor. Results in: (1) **Ipsilateral** UMN paralysis below the lesion level (corticospinal tract), (2) **Ipsilateral** loss of fine touch, vibration, and proprioception below the lesion level (dorsal column tract), and (3) **Contralateral** loss of pain and temperature sensation starting 1 to 2 segments below the lesion level (spinothalamic tract, which decussates at the spinal level)."
        ],
        "clinicalPearl": "**Autonomic Dysreflexia in Spinal Cord Injury (SCI):** Patients with spinal cord injuries at or above the **T6 level** are at permanent risk for **Autonomic Dysreflexia**, a life-threatening hypertensive emergency. A noxious stimulus below the injury level (most commonly a **distended urinary bladder** or impacted rectum) triggers uninhibited sympathetic hyperactivation, producing severe peripheral vasoconstriction, malignant hypertension (systolic BP > 200-300 mmHg), pounding headache, and pallor below the lesion. Above the lesion level, compensatory vagal stimulation produces bradycardia, cutaneous flushing, and profuse diaphoresis. Immediate nursing action: **sit the patient upright (lowering BP orthostatically)**, loosen tight clothing, and immediately relieve the bladder distension (catheterize).",
        "images": [
          {
            "src": "/images/physiology/11_image3.png",
            "caption": "Figure 11.3: Transverse cross-section of spinal cord gray and white matter.",
            "alt": "Spinal cord structure"
          }
        ],
        "tables": []
      },
      {
        "id": "sec-phys-11-3",
        "title": "Brainstem, Cerebellum, Basal Ganglia & Cerebral Cortex",
        "content": [
          "The human brain represents an astonishing hierarchical assembly of specialized neural subsystems executing subconscious vegetative regulation, precise sensorimotor integration, and high-order consciousness.",
          "**The Brainstem (Medulla, Pons, Midbrain):** The anatomical bridge linking the spinal cord with higher cerebral centers, housing the cranial nerve nuclei (CN III to XII) and the vital autonomic centers:",
          "1. **Medulla Oblongata:** Houses essential vegetative homeostatic centers: the **Cardiovascular Center** (cardioaccelerator, cardioinhibitory via vagus nerve, and vasomotor centers regulating blood pressure), the **Medullary Respiratory Center** (dorsal respiratory group / DRG and ventral respiratory group / VRG establishing basal breathing rhythm), and autonomic reflex centers for swallowing, coughing, sneezing, and vomiting.",
          "2. **Pons:** Contains respiratory rhythm modulators: the **Pneumotaxic Center** (switches off inspiration, regulating tidal volume and respiratory rate) and the **Apneustic Center** (promotes sustained inspiration). Houses nuclei for cranial nerves V, VI, VII, and VIII.",
          "3. **Midbrain (Mesencephalon):** Houses the **Superior Colliculi** (visual reflexes and saccadic eye movements), **Inferior Colliculi** (auditory relay and auditory startle reflex), the red nucleus, and the **Substantia Nigra** (dopaminergic motor hub).",
          "**The Cerebellum ('Little Brain'):** Occupies the posterior cranial fossa, comprising two cerebellar hemispheres joined by the central vermis. Operates as an unconscious **motor error-comparator and coordination engine**; receives real-time sensory feedback on body position from spinocerebellar tracts and vestibulocochlear apparatus, compares intended movement (from motor cortex) with actual ongoing performance, and fires corrective outputs to the motor cortex and red nucleus to ensure smooth, fluid, precise movements, balance, and motor learning. Lesions DO NOT cause paralysis, but produce **ataxia, intention tremor, past-pointing (dysmetria), and dysdiadochokinesia**.",
          "**The Basal Ganglia (Subcortical Motor Nuclei):** Composed of the **Caudate Nucleus**, **Putamen** (together forming the Striatum), **Globus Pallidus** (internal and external segments), **Subthalamic Nucleus**, and **Substantia Nigra** (pars compacta and pars reticulata).",
          "The basal ganglia regulate the initiation, scaling, and smooth termination of voluntary motor programs via two opposing pathways:",
          "  - **Direct Pathway:** Facilitates movement; striatal GABAergic neurons inhibit the globus pallidus internus, disinhibiting the thalamus and exciting the motor cortex (D1 dopamine receptors are stimulatory).",
          "  - **Indirect Pathway:** Suppresses unwanted movements; excites globus pallidus internus via subthalamic nucleus, increasing thalamic inhibition (D2 dopamine receptors are inhibitory).",
          "  - **Parkinson's Disease:** Selective progressive degeneration of dopaminergic neurons in the **Substantia Nigra Pars Compacta** depletes striatal dopamine, tipping the balance in favor of the indirect pathway. Characterized by the classic motor tetrad: **Resting Tremor ('pill-rolling')**, **Cogwheel Rigidity**, **Bradykinesia / Akinesia**, and **Postural Instability**, accompanied by a characteristic shuffling, festinating gait.",
          "**Cerebral Cortex & Functional Localization:** The convoluted cerebral neocortex (composed of 6 horizontal cellular layers) is partitioned into functional anatomical regions:",
          "  - **Frontal Lobe:** Primary Motor Cortex (precentral gyrus, Brodmann area 4); Premotor / Supplementary Motor Area; Prefrontal Cortex (executive functioning, working memory, personality, social judgment); and **Broca's Motor Speech Area** (inferior frontal gyrus, Brodmann areas 44/45; coordinates muscular vocalization). Damage to Broca's area causes **Expressive (Motor / Non-fluent) Aphasia** (patient understands language but struggles painfully to articulate speech).",
          "  - **Parietal Lobe:** Primary Somatosensory Cortex (postcentral gyrus, Brodmann areas 3, 1, 2; homunculus representation) and somatosensory association areas (spatial orientation, stereognosis).",
          "  - **Temporal Lobe:** Primary Auditory Cortex (superior temporal gyrus, Brodmann area 41/42); Olfactory cortex; and **Wernicke's Receptive Language Area** (posterior superior temporal gyrus, Brodmann area 22; language comprehension). Damage to Wernicke's area causes **Receptive (Sensory / Fluent) Aphasia** (patient articulates fluent, effortless speech devoid of grammatical coherence / 'word salad', unable to comprehend spoken or written words).",
          "  - **Occipital Lobe:** Primary Visual Cortex (calcarine sulcus, Brodmann area 17)."
        ],
        "points": [
          "**The Reticular Activating System (RAS):** A diffuse network of interconnected polysynaptic neurons spanning the brainstem core that projects diffusely to the cerebral cortex. The RAS filters sensory input and maintains state of **cortical arousal, alertness, and conscious wakefulness**; acute damage produces deep, unarousable coma.",
          "**The Limbic System ('Emotional Brain'):** Comprises the Hippocampus (consolidation of short-term memory into long-term memory), Amygdala (processing fear, rage, and emotional memory), Cingulate Gyrus, and Hypothalamus; coordinates emotional behavior, instinctual drives, and visceral autonomic reactions.",
          "**Motor & Sensory Homunculi:** Topographical somatotopic mapping along the precentral and postcentral gyri reveals disproportionate cortical representation: body parts requiring ultra-fine motor control or maximal tactile sensitivity (the **hands, fingers, tongue, and lips**) occupy disproportionately massive cortical areas compared to the trunk or limbs."
        ],
        "clinicalPearl": "**Stroke Differentiation & Glasgow Coma Scale (GCS) Assessment:** Stroke (cerebrovascular accident) in the left **Middle Cerebral Artery (MCA)** territory typically damages both the motor cortex and language centers, resulting in right-sided hemiplegia (face and arm > leg) coupled with aphasia. The nurse assesses altered consciousness using the standardized **Glasgow Coma Scale (GCS)** across Eye Opening (1-4), Verbal Response (1-5), and Motor Response (1-6). A score <= 8 signifies severe brain injury requiring definitive airway management ('GCS eight, intubate').",
        "images": [],
        "tables": []
      },
      {
        "id": "sec-phys-11-4",
        "title": "The Autonomic Nervous System & Reflex Arc",
        "content": [
          "The **Autonomic Nervous System (ANS)** operates subconsciously to regulate visceral involuntary functions including arterial blood pressure, heart rate, gastrointestinal motility, glandular secretion, pupillary diameter, and thermoregulation. The ANS is structured as a two-neuron efferent chain: a **preganglionic neuron** in the CNS synapsing within an autonomic ganglion onto a **postganglionic neuron**, which innervates visceral effectors.",
          "**The Sympathetic Division (Thoracolumbar Outflow - T1 to L2):**",
          "1. **Anatomical Organization:** Preganglionic cell bodies reside in the lateral gray horns of spinal cord segments T1 through L2. Axons exit via ventral roots and enter sympathetic paravertebral chain ganglia via **white rami communicantes**. They either synapse immediately, ascend/descend the chain, or pass through to synapse in prevertebral collateral ganglia (Celiac, Superior Mesenteric, Inferior Mesenteric). Postganglionic fibers exit via gray rami to target organs. (Preganglionic fibers are short and myelinated; postganglionic fibers are long and unmyelinated).",
          "2. **Neurotransmitters & Receptors:** Preganglionic sympathetic terminals release **Acetylcholine (ACh)** onto **Nicotinic (N2)** receptors. Postganglionic sympathetic terminals release **Norepinephrine (Noradrenaline)** onto target **Adrenergic Receptors** (except sweat glands, which receive sympathetic cholinergic innervation via muscarinic receptors).",
          "   - **Alpha-1 Receptors:** Vascular smooth muscle vasoconstriction, pupillary dilator contraction (**mydriasis**), intestinal sphincter constriction.",
          "   - **Beta-1 Receptors:** Predominantly cardiac: increased SA node firing rate (**positive chronotropy**), increased AV node conduction velocity (**positive dromotropy**), and increased myocardial contractility (**positive inotropy**); stimulates renal juxtaglomerular renin release.",
          "   - **Beta-2 Receptors:** Bronchial smooth muscle relaxation (**bronchodilation**), skeletal muscle vascular vasodilation, uterine relaxation, hepatic glycogenolysis.",
          "3. **Physiological Mission:** Mediates the catabolic **Fight-or-Flight Response** during acute emergencies: tachycardia, hypertension, bronchodilation, pupillary dilation, hepatic glucose mobilization, diversion of blood from viscera to skeletal muscle, and inhibition of GI peristalsis and bladder emptying.",
          "**The Parasympathetic Division (Craniosacral Outflow - CN III, VII, IX, X and S2-S4):**",
          "1. **Anatomical Organization:** Preganglionic cell bodies reside in brainstem cranial nerve nuclei (CN III Edinger-Westphal; CN VII Superior Salivatory; CN IX Inferior Salivatory; **CN X Vagus nerve** providing 75-80% of all parasympathetic innervation to heart, lungs, and GI tract to splenic flexure) and sacral spinal segments S2 to S4 (pelvic splanchnic nerves). Preganglionic fibers are long and myelinated; they synapse in **terminal or intramural ganglia** situated directly within or adjacent to target visceral organs. Postganglionic fibers are short and unmyelinated.",
          "2. **Neurotransmitters & Receptors:** Both preganglionic and postganglionic parasympathetic neurons release **Acetylcholine (ACh)**. Preganglionic acts on Nicotinic receptors; postganglionic acts on **Muscarinic Receptors** (M1 in gastric parietal cells; M2 in heart [bradycardia]; M3 in bronchial smooth muscle, GI smooth muscle, secretory glands, and pupillary sphincter [miosis]).",
          "3. **Physiological Mission:** Mediates the anabolic **Rest-and-Digest** and energy-conservation response: bradycardia, bronchoconstriction and secretion, pupillary constriction (**miosis**), increased GI motility and glandular secretions, gallbladder contraction, and stimulation of urination and defecation (**SLUDD: Salivation, Lacrimation, Urination, Digestion, Defecation**).",
          "**Physiology of the Reflex Arc:** A reflex is an involuntary, rapid, stereotyped motor response to a specific sensory stimulus. Every reflex arc incorporates five fundamental anatomical components:",
          "1. **Sensory Receptor:** Detects internal or environmental stimulus.",
          "2. **Afferent (Sensory) Neuron:** Propagates action potentials toward the CNS.",
          "3. **Integrating Center:** Synaptic region within the gray matter of the spinal cord or brainstem.",
          "4. **Efferent (Motor) Neuron:** Propagates motor commands out to peripheral tissues.",
          "5. **Effector Organ:** Muscle fiber or gland that executes the physiological response.",
          "  - **Monosynaptic Stretch Reflex (e.g., Patellar / Knee-Jerk Reflex):** Muscle spindle stretch -> sensory Ia afferent fiber -> single direct synapse in ventral horn onto alpha motor neuron -> rapid contraction of stretched muscle with reciprocal inhibition of antagonist muscle.",
          "  - **Polysynaptic Withdrawal (Flexor) Reflex:** Painful nociceptive stimulus -> A-delta/C fibers -> excitatory interneurons across multiple spinal segments -> contraction of ipsilateral flexor muscles (withdrawing limb from danger) accompanied by the **Crossed Extensor Reflex** (exciting contralateral extensor muscles to maintain standing balance)."
        ],
        "points": [
          "**Autonomic Tone & Dual Innervation:** Most visceral organs receive reciprocal dual innervation from both sympathetic and parasympathetic divisions. At rest, the **parasympathetic tone** dominates the heart (maintaining resting heart rate at ~70 bpm vs. intrinsic SA pacemaker rate of 100 bpm) and the GI tract; the **sympathetic tone** exclusively governs vascular smooth muscle tone (maintaining resting arteriolar vasoconstriction / total peripheral resistance).",
          "**Adrenal Medulla as a Modified Sympathetic Ganglion:** Chromaffin cells are embryologically modified postganglionic sympathetic neurons lacking axons; upon preganglionic cholinergic stimulation, they discharge catecholamines (epinephrine and norepinephrine) directly into the bloodstream as circulating neurohormones, amplifying systemic sympathetic effects."
        ],
        "clinicalPearl": "**Atropine Pharmacology & Organophosphate Poisoning:** **Atropine** is a competitive muscarinic receptor antagonist that blocks parasympathetic activity, utilized in clinical nursing to treat severe symptomatic bradycardia (restoring heart rate) and dry respiratory secretions. In **Organophosphate Toxicity** (insecticide ingestion or nerve agent exposure), irreversible inhibition of acetylcholinesterase causes massive systemic accumulation of acetylcholine at all muscarinic and nicotinic synapses, precipitating catastrophic cholinergic crisis: profuse rhinorrhea, salivation, bronchorrhea, bronchospasm, severe bradycardia, diarrhea, miosis, and muscle fasciculations. Antidote management requires aggressive escalating doses of **Atropine IV** to reverse muscarinic hyperactivation, combined with **Pralidoxime (2-PAM)** to reactivate phosphorylated cholinesterase.",
        "images": [
          {
            "src": "/images/physiology/11_image4.png",
            "caption": "Figure 11.4: Sympathetic thoracolumbar autonomic nervous system pathways.",
            "alt": "Sympathetic nervous system"
          },
          {
            "src": "/images/physiology/11_image5.png",
            "caption": "Figure 11.5: Parasympathetic craniosacral autonomic nervous system pathways.",
            "alt": "Parasympathetic nervous system"
          },
          {
            "src": "/images/physiology/11_image6.png",
            "caption": "Figure 11.6: Five functional components of the neural reflex arc.",
            "alt": "Reflex arc"
          }
        ],
        "tables": []
      }
    ],
    "mcqs": [
      {
        "id": "phys-mcq-11-851",
        "question": "nan",
        "correctAnswer": "nan",
        "subtopic": "nan"
      },
      {
        "id": "phys-mcq-11-852",
        "question": "nan",
        "correctAnswer": "nan",
        "subtopic": "nan"
      },
      {
        "id": "phys-mcq-11-853",
        "question": "nan",
        "correctAnswer": "nan",
        "subtopic": "nan"
      },
      {
        "id": "phys-mcq-11-854",
        "question": "nan",
        "correctAnswer": "nan",
        "subtopic": "nan"
      },
      {
        "id": "phys-mcq-11-855",
        "question": "nan",
        "correctAnswer": "nan",
        "subtopic": "nan"
      },
      {
        "id": "phys-mcq-11-856",
        "question": "nan",
        "correctAnswer": "nan",
        "subtopic": "nan"
      },
      {
        "id": "phys-mcq-11-857",
        "question": "nan",
        "correctAnswer": "nan",
        "subtopic": "nan"
      },
      {
        "id": "phys-mcq-11-858",
        "question": "nan",
        "correctAnswer": "nan",
        "subtopic": "nan"
      },
      {
        "id": "phys-mcq-11-859",
        "question": "nan",
        "correctAnswer": "nan",
        "subtopic": "nan"
      },
      {
        "id": "phys-mcq-11-860",
        "question": "nan",
        "correctAnswer": "nan",
        "subtopic": "nan"
      },
      {
        "id": "phys-mcq-11-861",
        "question": "nan",
        "correctAnswer": "nan",
        "subtopic": "nan"
      },
      {
        "id": "phys-mcq-11-862",
        "question": "nan",
        "correctAnswer": "nan",
        "subtopic": "nan"
      },
      {
        "id": "phys-mcq-11-863",
        "question": "nan",
        "correctAnswer": "nan",
        "subtopic": "nan"
      },
      {
        "id": "phys-mcq-11-864",
        "question": "nan",
        "correctAnswer": "nan",
        "subtopic": "nan"
      },
      {
        "id": "phys-mcq-11-865",
        "question": "nan",
        "correctAnswer": "nan",
        "subtopic": "nan"
      },
      {
        "id": "phys-mcq-11-866",
        "question": "nan",
        "correctAnswer": "nan",
        "subtopic": "nan"
      },
      {
        "id": "phys-mcq-11-867",
        "question": "nan",
        "correctAnswer": "nan",
        "subtopic": "nan"
      },
      {
        "id": "phys-mcq-11-868",
        "question": "nan",
        "correctAnswer": "nan",
        "subtopic": "nan"
      },
      {
        "id": "phys-mcq-11-869",
        "question": "nan",
        "correctAnswer": "nan",
        "subtopic": "nan"
      },
      {
        "id": "phys-mcq-11-870",
        "question": "nan",
        "correctAnswer": "nan",
        "subtopic": "nan"
      },
      {
        "id": "phys-mcq-11-871",
        "question": "nan",
        "correctAnswer": "nan",
        "subtopic": "nan"
      },
      {
        "id": "phys-mcq-11-872",
        "question": "nan",
        "correctAnswer": "nan",
        "subtopic": "nan"
      },
      {
        "id": "phys-mcq-11-873",
        "question": "nan",
        "correctAnswer": "nan",
        "subtopic": "nan"
      },
      {
        "id": "phys-mcq-11-874",
        "question": "nan",
        "correctAnswer": "nan",
        "subtopic": "nan"
      },
      {
        "id": "phys-mcq-11-875",
        "question": "nan",
        "correctAnswer": "nan",
        "subtopic": "nan"
      },
      {
        "id": "phys-mcq-11-876",
        "question": "nan",
        "correctAnswer": "nan",
        "subtopic": "nan"
      },
      {
        "id": "phys-mcq-11-877",
        "question": "nan",
        "correctAnswer": "nan",
        "subtopic": "nan"
      },
      {
        "id": "phys-mcq-11-878",
        "question": "nan",
        "correctAnswer": "nan",
        "subtopic": "nan"
      },
      {
        "id": "phys-mcq-11-879",
        "question": "nan",
        "correctAnswer": "nan",
        "subtopic": "nan"
      },
      {
        "id": "phys-mcq-11-880",
        "question": "nan",
        "correctAnswer": "nan",
        "subtopic": "nan"
      },
      {
        "id": "phys-mcq-11-881",
        "question": "nan",
        "correctAnswer": "nan",
        "subtopic": "nan"
      },
      {
        "id": "phys-mcq-11-882",
        "question": "nan",
        "correctAnswer": "nan",
        "subtopic": "nan"
      },
      {
        "id": "phys-mcq-11-883",
        "question": "nan",
        "correctAnswer": "nan",
        "subtopic": "nan"
      },
      {
        "id": "phys-mcq-11-884",
        "question": "nan",
        "correctAnswer": "nan",
        "subtopic": "nan"
      },
      {
        "id": "phys-mcq-11-885",
        "question": "nan",
        "correctAnswer": "nan",
        "subtopic": "nan"
      },
      {
        "id": "phys-mcq-11-886",
        "question": "nan",
        "correctAnswer": "nan",
        "subtopic": "nan"
      },
      {
        "id": "phys-mcq-11-887",
        "question": "nan",
        "correctAnswer": "nan",
        "subtopic": "nan"
      },
      {
        "id": "phys-mcq-11-888",
        "question": "nan",
        "correctAnswer": "nan",
        "subtopic": "nan"
      },
      {
        "id": "phys-mcq-11-889",
        "question": "nan",
        "correctAnswer": "nan",
        "subtopic": "nan"
      },
      {
        "id": "phys-mcq-11-890",
        "question": "nan",
        "correctAnswer": "nan",
        "subtopic": "nan"
      },
      {
        "id": "phys-mcq-11-891",
        "question": "nan",
        "correctAnswer": "nan",
        "subtopic": "nan"
      },
      {
        "id": "phys-mcq-11-892",
        "question": "nan",
        "correctAnswer": "nan",
        "subtopic": "nan"
      },
      {
        "id": "phys-mcq-11-893",
        "question": "nan",
        "correctAnswer": "nan",
        "subtopic": "nan"
      },
      {
        "id": "phys-mcq-11-894",
        "question": "nan",
        "correctAnswer": "nan",
        "subtopic": "nan"
      },
      {
        "id": "phys-mcq-11-895",
        "question": "nan",
        "correctAnswer": "nan",
        "subtopic": "nan"
      },
      {
        "id": "phys-mcq-11-896",
        "question": "nan",
        "correctAnswer": "nan",
        "subtopic": "nan"
      },
      {
        "id": "phys-mcq-11-897",
        "question": "nan",
        "correctAnswer": "nan",
        "subtopic": "nan"
      },
      {
        "id": "phys-mcq-11-898",
        "question": "nan",
        "correctAnswer": "nan",
        "subtopic": "nan"
      },
      {
        "id": "phys-mcq-11-899",
        "question": "nan",
        "correctAnswer": "nan",
        "subtopic": "nan"
      },
      {
        "id": "phys-mcq-11-900",
        "question": "nan",
        "correctAnswer": "nan",
        "subtopic": "nan"
      },
      {
        "id": "phys-mcq-11-901",
        "question": "nan",
        "correctAnswer": "nan",
        "subtopic": "nan"
      },
      {
        "id": "phys-mcq-11-902",
        "question": "nan",
        "correctAnswer": "nan",
        "subtopic": "nan"
      },
      {
        "id": "phys-mcq-11-903",
        "question": "nan",
        "correctAnswer": "nan",
        "subtopic": "nan"
      },
      {
        "id": "phys-mcq-11-904",
        "question": "nan",
        "correctAnswer": "nan",
        "subtopic": "nan"
      },
      {
        "id": "phys-mcq-11-905",
        "question": "nan",
        "correctAnswer": "nan",
        "subtopic": "nan"
      },
      {
        "id": "phys-mcq-11-906",
        "question": "nan",
        "correctAnswer": "nan",
        "subtopic": "nan"
      },
      {
        "id": "phys-mcq-11-907",
        "question": "nan",
        "correctAnswer": "nan",
        "subtopic": "nan"
      },
      {
        "id": "phys-mcq-11-908",
        "question": "nan",
        "correctAnswer": "nan",
        "subtopic": "nan"
      },
      {
        "id": "phys-mcq-11-909",
        "question": "nan",
        "correctAnswer": "nan",
        "subtopic": "nan"
      },
      {
        "id": "phys-mcq-11-910",
        "question": "nan",
        "correctAnswer": "nan",
        "subtopic": "nan"
      },
      {
        "id": "phys-mcq-11-911",
        "question": "nan",
        "correctAnswer": "nan",
        "subtopic": "nan"
      },
      {
        "id": "phys-mcq-11-912",
        "question": "nan",
        "correctAnswer": "nan",
        "subtopic": "nan"
      },
      {
        "id": "phys-mcq-11-913",
        "question": "nan",
        "correctAnswer": "nan",
        "subtopic": "nan"
      },
      {
        "id": "phys-mcq-11-914",
        "question": "nan",
        "correctAnswer": "nan",
        "subtopic": "nan"
      },
      {
        "id": "phys-mcq-11-915",
        "question": "nan",
        "correctAnswer": "nan",
        "subtopic": "nan"
      },
      {
        "id": "phys-mcq-11-916",
        "question": "nan",
        "correctAnswer": "nan",
        "subtopic": "nan"
      },
      {
        "id": "phys-mcq-11-917",
        "question": "nan",
        "correctAnswer": "nan",
        "subtopic": "nan"
      },
      {
        "id": "phys-mcq-11-918",
        "question": "nan",
        "correctAnswer": "nan",
        "subtopic": "nan"
      },
      {
        "id": "phys-mcq-11-919",
        "question": "nan",
        "correctAnswer": "nan",
        "subtopic": "nan"
      },
      {
        "id": "phys-mcq-11-920",
        "question": "nan",
        "correctAnswer": "nan",
        "subtopic": "nan"
      },
      {
        "id": "phys-mcq-11-921",
        "question": "nan",
        "correctAnswer": "nan",
        "subtopic": "nan"
      },
      {
        "id": "phys-mcq-11-922",
        "question": "nan",
        "correctAnswer": "nan",
        "subtopic": "nan"
      },
      {
        "id": "phys-mcq-11-923",
        "question": "nan",
        "correctAnswer": "nan",
        "subtopic": "nan"
      },
      {
        "id": "phys-mcq-11-924",
        "question": "nan",
        "correctAnswer": "nan",
        "subtopic": "nan"
      },
      {
        "id": "phys-mcq-11-925",
        "question": "nan",
        "correctAnswer": "nan",
        "subtopic": "nan"
      },
      {
        "id": "phys-mcq-11-926",
        "question": "nan",
        "correctAnswer": "nan",
        "subtopic": "nan"
      },
      {
        "id": "phys-mcq-11-927",
        "question": "nan",
        "correctAnswer": "nan",
        "subtopic": "nan"
      },
      {
        "id": "phys-mcq-11-928",
        "question": "nan",
        "correctAnswer": "nan",
        "subtopic": "nan"
      },
      {
        "id": "phys-mcq-11-929",
        "question": "nan",
        "correctAnswer": "nan",
        "subtopic": "nan"
      },
      {
        "id": "phys-mcq-11-930",
        "question": "nan",
        "correctAnswer": "nan",
        "subtopic": "nan"
      },
      {
        "id": "phys-mcq-11-931",
        "question": "nan",
        "correctAnswer": "nan",
        "subtopic": "nan"
      },
      {
        "id": "phys-mcq-11-932",
        "question": "nan",
        "correctAnswer": "nan",
        "subtopic": "nan"
      },
      {
        "id": "phys-mcq-11-933",
        "question": "nan",
        "correctAnswer": "nan",
        "subtopic": "nan"
      },
      {
        "id": "phys-mcq-11-934",
        "question": "nan",
        "correctAnswer": "nan",
        "subtopic": "nan"
      },
      {
        "id": "phys-mcq-11-935",
        "question": "nan",
        "correctAnswer": "nan",
        "subtopic": "nan"
      }
    ],
    "subjectiveQuestions": [
      {
        "id": "phys-subj-11-1",
        "question": "Recognize the meaning of motor neuron.",
        "type": "Very short",
        "marks": 2,
        "difficulty": 1
      },
      {
        "id": "phys-subj-11-2",
        "question": "Recognize the significance of the blood-brain barrier.",
        "type": "Very short",
        "marks": 2,
        "difficulty": 1
      },
      {
        "id": "phys-subj-11-3",
        "question": "Summarize two functions of the synapse.",
        "type": "Very short",
        "marks": 2,
        "difficulty": 1
      },
      {
        "id": "phys-subj-11-4",
        "question": "Identify two phases during action potential.",
        "type": "Very short",
        "marks": 2,
        "difficulty": 1
      },
      {
        "id": "phys-subj-11-5",
        "question": "List two major divisions of the brain.",
        "type": "Very short",
        "marks": 2,
        "difficulty": 1
      },
      {
        "id": "phys-subj-11-6",
        "question": "Define neuron.",
        "type": "Very short",
        "marks": 2,
        "difficulty": 1
      },
      {
        "id": "phys-subj-11-7",
        "question": "List two types of neurons.",
        "type": "Very short",
        "marks": 2,
        "difficulty": 1
      },
      {
        "id": "phys-subj-11-8",
        "question": "List two types of neurons depending on their function.",
        "type": "Very short",
        "marks": 2,
        "difficulty": 1
      },
      {
        "id": "phys-subj-11-9",
        "question": "Define motor neurons.",
        "type": "Very short",
        "marks": 2,
        "difficulty": 1
      },
      {
        "id": "phys-subj-11-10",
        "question": "Define sensory neurons.",
        "type": "Very short",
        "marks": 2,
        "difficulty": 1
      },
      {
        "id": "phys-subj-11-11",
        "question": "List two parts of a neuron.",
        "type": "Very short",
        "marks": 2,
        "difficulty": 1
      },
      {
        "id": "phys-subj-11-12",
        "question": "Identify two classifications of reflexes.",
        "type": "Very short",
        "marks": 2,
        "difficulty": 1
      },
      {
        "id": "phys-subj-11-13",
        "question": "Explain the types of neurons.",
        "type": "Short",
        "marks": 5,
        "difficulty": 1
      },
      {
        "id": "phys-subj-11-14",
        "question": "Enumerate pathological reflexes.",
        "type": "Short",
        "marks": 5,
        "difficulty": 1
      },
      {
        "id": "phys-subj-11-15",
        "question": "Describe the properties of reflexes.",
        "type": "Short",
        "marks": 5,
        "difficulty": 1
      },
      {
        "id": "phys-subj-11-16",
        "question": "Describe action potential.",
        "type": "Short",
        "marks": 5,
        "difficulty": 1
      },
      {
        "id": "phys-subj-11-17",
        "question": "Describe the main functions of some key parts of the brainstem. (10)",
        "type": "Essay",
        "marks": 10,
        "difficulty": 1
      },
      {
        "id": "phys-subj-11-18",
        "question": "Illustrate the structure and functions of the medulla and pons with a labelled diagram of the brain. (5+5)",
        "type": "Essay",
        "marks": 10,
        "difficulty": 1
      },
      {
        "id": "phys-subj-11-19",
        "question": "Illustrate functions of sensory nervous system with a labelled diagram of the brain. (5+5)",
        "type": "Essay",
        "marks": 10,
        "difficulty": 1
      }
    ]
  },
  "phys-unit-12": {
    "id": "phys-unit-12",
    "unitNumber": 12,
    "title": "Sensory Organ Physiology",
    "category": "Sensory Pathways & Receptors",
    "icon": "👁️",
    "color": "from-teal-500 to-cyan-600",
    "teachingHours": "60 Hours INC Curriculum (Theory 18h + Practical 42h)",
    "summary": "Detailed functional mechanisms, regulation, homeostatic balance, clinical alterations and official INC competencies of Sensory Organ Physiology.",
    "objectives": [
      "Describe the physiology of sensory organs and alteration in diseases.",
      "Explain the Functions of the Skin.",
      "Explain the Functions of the Eye.",
      "Explain the Functions of the Ear.",
      "Explain the Functions of the Nose.",
      "Explain the Functions of the Tongue.",
      "List down the alteration in diseases of the sensory organs.",
      "A bodily structure that receives a stimulus and is affected in such a manner as to initiate excitation of associated sensory nerve fibres which convey specific impulses to the central nervous system where they are interpreted as corresponding sensations."
    ],
    "totalImages": 8,
    "sections": [
      {
        "id": "sec-phys-12-1",
        "title": "Integumentary Physiology, Cutaneous Receptors & Thermoregulation",
        "content": [
          "The **integumentary system** (skin, hair, nails, and cutaneous glands) constitutes the human body's largest organ, accounting for 7-8% of total body weight. It serves as an impermeable protective shield against environmental trauma, pathogen invasion, chemical toxins, and ultraviolet radiation, while serving crucial roles in sensory reception, Vitamin D synthesis, and systemic thermoregulation.",
          "**Functional Architecture of the Skin:** Divided into three integrated morphological layers:",
          "1. **Epidermis:** A stratified squamous, keratinized, avascular epithelium comprising five distinct horizontal strata (in thick skin of palms/soles):",
          "   - **Stratum Basale:** Single layer of mitotic cuboidal stem cells resting on the basement membrane. Houses **Melanocytes** (synthesizing melanin granules packaged into melanosomes and transferred to keratinocytes to shield nuclear DNA from UV-induced pyrimidine dimerization) and **Merkel Cells** (tactile mechanoreceptors).",
          "   - **Stratum Spinosum:** Polyhedral keratinocytes bound by robust desmosomes; houses dendritic **Langerhans Cells** (antigen-presenting immune sentinels initiating cutaneous adaptive immune responses).",
          "   - **Stratum Granulosum:** Cells accumulate keratohyalin granules and lamellar bodies containing water-repellent glycolipids.",
          "   - **Stratum Lucidum:** Clear, translucent layer of flattened, anucleated dead cells present only in thick skin.",
          "   - **Stratum Corneum:** Outermost protective barrier of 20 to 30 layers of dead, flattened, fully keratinized corneocytes continuously shed via desquamation.",
          "2. **Dermis:** Tough, vascularized connective tissue layer divided into a superficial **papillary layer** (loose areolar tissue with dermal papillae) and a deep **reticular layer** (dense irregular collagen and elastic meshwork providing tensile strength). Houses cutaneous neuroreceptors, hair follicles, sebaceous glands, and sweat glands.",
          "3. **Hypodermis (Subcutaneous Layer):** Composed of loose adipose and areolar tissue; anchors skin to underlying muscle fascia, serves as energy storage, and provides thermal insulation.",
          "**Cutaneous Somatosensory Mechanoreceptors:**",
          "  - **Meissner's Corpuscles:** Encapsulated receptors in dermal papillae; rapidly adapting; detect **light flutter, low-frequency vibration, and dynamic fine touch**.",
          "  - **Merkel Discs:** Unencapsulated expanded nerve endings in stratum basale; slowly adapting; detect **sustained static touch, pressure, and fine texture**.",
          "  - **Pacinian Corpuscles:** Concentric onion-like lamellated encapsulated receptors in deep dermis and hypodermis; rapidly adapting; detect **deep transient pressure and high-frequency vibration (200-300 Hz)**.",
          "  - **Ruffini Endings:** Elongated encapsulated spindle receptors; slowly adapting; detect **skin stretch and sustained joint torque**.",
          "  - **Free Nerve Endings:** Unencapsulated terminal dendrites distributed throughout epidermis and dermis; function as **Nociceptors** (detecting mechanical, thermal, and chemical tissue damage via A-delta and C fibers) and **Thermoreceptors** (cold receptors signaling via A-delta/C fibers at 10-35°C; warmth receptors signaling via C fibers at 30-45°C).",
          "**Hypothalamic Thermoregulation:** Normal human core body temperature is tightly defended at **36.5°C to 37.5°C (97.7°F to 99.5°F)** by the central thermoregulatory controller in the **Hypothalamus**:",
          "  - **Heat Dissipation (Anterior Preoptic Hypothalamus):** Activated by elevated core temperature. Stimulates sympathetic cholinergic nerves to activate **Eccrine Sweat Glands** (evaporative heat loss: evaporation of 1 mL of sweat removes 0.58 kcal of thermal energy) and inhibits sympathetic vasoconstrictor tone, producing **Cutaneous Vasodilation** (diverting warm core blood to skin surface for convective and radiative heat loss).",
          "  - **Heat Conservation & Generation (Posterior Hypothalamus):** Activated by hypothermia. Stimulates sympathetic adrenergic vasoconstriction (**Cutaneous Vasoconstriction**, minimizing surface radiative loss); activates pilomotor muscles (piloerection); stimulates skeletal muscle rhythm centers triggering involuntary rapid oscillatory contractions (**Shivering Thermogenesis**, increasing metabolic heat production up to 4- to 5-fold); and stimulates thyroid and adrenal medullary hormones (**Non-Shivering Chemical Thermogenesis**)."
        ],
        "points": [
          "**Eccrine vs. Apocrine Sweat Glands:**",
          "  - **Eccrine Sweat Glands:** Distributed across entire body surface (~3-4 million glands); secrete hypotonic watery fluid (water, NaCl, urea, lactic acid) for primary **thermoregulatory cooling**; innervated by sympathetic postganglionic cholinergic fibers.",
          "  - **Apocrine Sweat Glands:** Confined to axillary, areolar, and anogenital regions; functional only post-puberty; secrete thick, viscous, lipid- and protein-rich fluid into hair follicles; bacterial degradation produces characteristic body odor; stimulated by emotional stress and sexual excitement via adrenergic sympathetic fibers.",
          "**Fever (Pyrexia) Pathophysiology:** Exogenous pyrogens (bacterial endotoxins / LPS) stimulate macrophages to release endogenous pyrogenic cytokines (**Interleukin-1, Interleukin-6, TNF-alpha**). Cytokines cross the blood-brain barrier at the vascular organum vasculosum of the lamina terminalis (OVLT), stimulating endothelial **Cyclooxygenase-2 (COX-2)** to synthesize **Prostaglandin E2 (PGE2)**. PGE2 elevates the hypothalamic thermoregulatory set-point; the body perceives normal temperature as cold, triggering shivering chills and vasoconstriction until the new set-point is reached. Antipyretic drugs (Acetaminophen, Ibuprofen) work by inhibiting COX-2, halting PGE2 synthesis and resetting the thermostat."
        ],
        "clinicalPearl": "**Heat Stroke vs. Heat Exhaustion & Burn Fluid Resuscitation:** In **Heat Exhaustion**, heavy diaphoresis leads to hypovolemia, hypotension, headache, and weakness, but mental status is preserved and core temperature is < 40°C (104°F). In **Heat Stroke**, thermoregulatory homeostatic failure occurs: sweating ceases, skin is hot and dry, core temperature surges > 40.5°C (105°F), producing cerebral edema, seizures, delirium, DIC, and multi-organ failure (an extreme medical emergency requiring immediate evaporative ice-water immersion). In severe thermal burns, loss of epidermal barrier produces massive fluid extravasation, requiring Parkland Formula IV resuscitation (4 mL x kg body weight x % TBSA burned over 24 hours).",
        "images": [
          {
            "src": "/images/physiology/12_image1.png",
            "caption": "Figure 12.1: Microscopic architecture of the three skin layers.",
            "alt": "Three layers of skin"
          },
          {
            "src": "/images/physiology/12_image2.png",
            "caption": "Figure 12.2: Structure and growth anatomy of nails.",
            "alt": "Nail structure"
          }
        ],
        "tables": []
      },
      {
        "id": "sec-phys-12-2",
        "title": "Visual Physiology, Optics of the Eye & Phototransduction",
        "content": [
          "The **eye** is a photoreceptive optical instrument that focuses incoming electromagnetic radiation (visible spectrum: 400 to 700 nm) onto a neural transducer layer, the **retina**, which converts photon energy into electrical signals interpreted by the cerebral visual cortex.",
          "**Dioptric Apparatus & Optics of the Eye:** Light rays entering the eye undergo refraction at four optical interfaces: anterior and posterior surfaces of the cornea, and anterior and posterior surfaces of the crystalline lens. The human eye has a total refractive power of approximately **59 to 60 Diopters** in the unaccommodated resting state:",
          "  - **The Cornea:** Provides the overwhelming majority of refractive power (~**43 Diopters**, or > 70% of total) due to the dramatic difference in refractive index between air (1.00) and corneal tissue (1.376). The corneal curvature is static.",
          "  - **The Crystalline Lens:** Provides variable refractive power (~**15 to 20 Diopters**), suspended behind the iris by radial zonular fibers (ciliary zonules / ligaments) attached to the **ciliary body**.",
          "**The Accommodation Reflex (Near Triad):** When shifting visual focus from distant objects (> 6 meters) to near objects (< 6 meters), the eye executes three coordinated physiological adaptations orchestrated by parasympathetic fibers of the **Oculomotor Nerve (CN III)** via the ciliary ganglion:",
          "1. **Ciliary Muscle Contraction:** Parasympathetic activation causes sphincter-like contraction of the circular ciliary muscle. This moves the ciliary body forward and inward, **slacking tension on the suspensory zonules**. Relieved of outward radial tension, the elastic lens capsule rounds up passively, increasing anterior-posterior lens thickness and convexity. This boosts refractive power by up to 10-12 diopters, focusing diverging rays sharply onto the retina.",
          "2. **Pupillary Constriction (Miosis):** Contraction of the **Sphincter Pupillae** muscle narrows the pupil, eliminating peripheral divergent light rays and spherical aberrations, thereby increasing optical depth of field.",
          "3. **Convergence of Visual Axes:** Bilateral contraction of the **Medial Recti** muscles rotates both eyeballs medially, aligning both foveas simultaneously onto the near target.",
          "**Functional Anatomy of the Retina & Photoreceptors:** The retina is organized into 10 distinct layers, housing two specialized classes of photoreceptor cells located adjacent to the posterior **Retinal Pigment Epithelium (RPE)**:",
          "  - **Rods (~120 million):** Contain the visual photopigment **Rhodopsin** (scotopsin bound to 11-cis-retinal). Extremely sensitive to light (capable of signaling single photons); low visual acuity (hundreds of rods converge onto a single bipolar/ganglion cell); non-functional in daylight (bleached); specialized for **Scotopic (night/dim-light) monochromatic vision**; distributed widely across peripheral retina, absent in the fovea.",
          "  - **Cones (~6 million):** Contain three varieties of photopsins (**Iodopsin**), each tuned to distinct light wavelengths: **S-Cones (Blue, 420 nm)**, **M-Cones (Green, 530 nm)**, and **L-Cones (Red, 560 nm)**. Require bright light to activate; minimal convergence (1:1 ratio with bipolar and ganglion cells in fovea); specialized for **Photopic (daylight) high-acuity color vision**; concentrated densely in the **Fovea Centralis** (a 1.5-mm avascular pit in the macula lutea with all overlying layers pushed aside).",
          "**The Phototransduction Cascade (The 'Dark Current'):** In complete darkness, photoreceptor outer segment cyclic nucleotide-gated (CNG) channels are kept open by high intracellular **cGMP**. Influx of Na+ and Ca2+ produces a continuous inward depolarizing current (**Dark Current**), keeping the photoreceptor resting membrane potential depolarized at **-40 mV** and stimulating continuous tonic release of the inhibitory neurotransmitter **Glutamate** onto bipolar cells.",
          "When light strikes the photoreceptor:",
          "1. A photon is absorbed by **11-cis-retinal**, photoisomerizing it into **all-trans-retinal**.",
          "2. Conformational change in opsin yields **Metarhodopsin II (Activated Rhodopsin)**.",
          "3. Metarhodopsin II activates hundreds of molecules of the heterotrimeric G-protein **Transducin (Gt)**.",
          "4. The alpha-subunit of transducin activates **cGMP Phosphodiesterase (PDE)**, which rapidly hydrolyzes cGMP into 5'-GMP.",
          "5. Falling intracellular cGMP causes closure of apical CNG Na+ channels. With Na+ influx halted while basolateral K+ channels continue pumping K+ out, the photoreceptor **HYPERPOLARIZES** from -40 mV toward -70 mV.",
          "6. Hyperpolarization closes voltage-gated Ca2+ channels at the synaptic terminal, **SHUTTING OFF GLUTAMATE RELEASE**. Disinhibition of ON-bipolar cells depolarizes them, transmitting action potentials along ganglion cell axons forming the optic nerve.",
          "**The Visual Pathway & Visual Field Topography:** Ganglion cell axons assemble at the optic disc (physiological blind spot) to form the **Optic Nerve (CN II)**. At the **Optic Chiasm**, fibers from the **nasal retinas decussate** into the contralateral optic tract, while fibers from the **temporal retinas continue uncrossed** in the ipsilateral optic tract. The optic tract synapses in the **Lateral Geniculate Nucleus (LGN)** of the thalamus. LGN neurons project via optic radiations (including Meyer's loop in the temporal lobe) to the **Primary Visual Cortex** (striate cortex, Brodmann area 17, calcarine fissure) in the occipital lobe."
        ],
        "points": [
          "**Ametropias (Refractive Errors):**",
          "  - **Myopia (Nearsightedness):** Eyeball is too long (axial myopia) or refractive power is too strong; parallel rays focus in front of the retina; corrected with a **biconcave (diverging) lens**.",
          "  - **Hyperopia (Farsightedness):** Eyeball is too short or refractive power is too weak; rays focus behind the retina; corrected with a **biconvex (converging) lens**.",
          "  - **Astigmatism:** Asymmetrical curvature of cornea or lens produces unequal refraction along different meridians; corrected with **cylindrical lenses**.",
          "  - **Presbyopia:** Age-related loss of lens capsule elasticity and hardening of the lens nucleus reduces accommodative amplitude; near point of vision recedes; corrected with positive **reading glasses**.",
          "**Aqueous Humor Dynamics & Intraocular Pressure (IOP):** Secreted continuously by ciliary body processes into the posterior chamber at 2 to 3 μL/min; flows through pupil into anterior chamber; drains through the **trabecular meshwork** into the **Canal of Schlemm** (90%) and uveoscleral pathway (10%). Normal IOP is **10 to 21 mmHg** (measured by Goldmann applanation tonometer). Obstruction of outflow elevates IOP, causing **Glaucoma** and progressive optic nerve excavation and blindness."
        ],
        "clinicalPearl": "**Acute Angle-Closure Glaucoma & Pupillary Light Reflex:** **Acute Angle-Closure Glaucoma** is an ocular emergency caused by pupillary block pushing the peripheral iris over the trabecular meshwork, completely shutting off aqueous drainage. IOP spikes abruptly to > 50-70 mmHg, presenting with excruciating ocular pain, unilateral headache, nausea/vomiting, blurry vision with colored halos around lights, a hazy cornea, and a mid-dilated non-reactive pupil. Immediate treatment includes IV mannitol, topical beta-blockers (timolol), alpha-2 agonists, and pilocarpine to constrict pupil. Testing the **Pupillary Light Reflex** assesses CN II (afferent limb) and CN III (efferent parasympathetic limb); consensual pupil response tests crossover at the pretectal nucleus in the midbrain.",
        "images": [
          {
            "src": "/images/physiology/12_image3.png",
            "caption": "Figure 12.3: Visual photopigments and the rhodopsin cycle.",
            "alt": "Visual pigments"
          },
          {
            "src": "/images/physiology/12_image4.png",
            "caption": "Figure 12.4: Visual pathway from retina to visual cortex.",
            "alt": "Visual pathway"
          },
          {
            "src": "/images/physiology/12_image5.png",
            "caption": "Figure 12.5: Optical refraction of light rays through converging lenses.",
            "alt": "Refraction through lenses"
          },
          {
            "src": "/images/physiology/12_image6.png",
            "caption": "Figure 12.6: Image formation and visual accommodation by crystalline lens.",
            "alt": "Vision formation"
          }
        ],
        "tables": []
      },
      {
        "id": "sec-phys-12-3",
        "title": "Auditory & Vestibular Physiology",
        "content": [
          "The **ear** houses two exquisitely sensitive sensory systems: the **auditory apparatus** (cochlea), specialized for hearing sound waves (human range: 20 to 20,000 Hz), and the **vestibular apparatus** (semicircular canals, utricle, saccule), specialized for detecting equilibrium, head orientation, and acceleration.",
          "**Functional Divisions of the Ear & Sound Conduction:**",
          "1. **External Ear:** Pinna (auricle) gathers acoustic waves and funnels them through the external auditory meatus to strike the **Tympanic Membrane (eardrum)**.",
          "2. **Middle Ear (Impedance Matching):** An air-filled cavity in the temporal bone housing the three auditory ossicles: **Malleus (hammer)**, **Incus (anvil)**, and **Stapes (stirrup)**. Sound waves in air must transfer into the dense liquid perilymph of the inner ear, which presents high acoustic impedance. The middle ear executes critical **Impedance Matching** by two mechanical mechanisms:",
          "   - **Area Ratio:** The functional vibrating area of the tympanic membrane (~55 mm²) is 17 times larger than the stapes footplate area (~3.2 mm²). Force concentrated onto the smaller area amplifies sound pressure 17-fold.",
          "   - **Ossicular Lever System:** The ossicular chain acts as a mechanical lever with a 1.3:1 mechanical advantage.",
          "   - Total pressure amplification is **17 x 1.3 = 22-fold**, overcoming fluid impedance and transmitting > 60% of acoustic energy into the cochlea.",
          "   - The **Tympanic (Acoustic) Reflex:** Loud sounds (> 80 dB) trigger reflex contraction of the **Tensor Tympani** (CN V3) and **Stapedius** (CN VII) muscles within 40-80 ms, stiffening the ossicular chain and dampening sound transmission to protect delicate inner ear hair cells from acoustic trauma.",
          "   - The **Eustachian (Auditory) Tube** connects middle ear to nasopharynx, opening during swallowing and yawning to equalize middle ear pressure with atmospheric pressure.",
          "3. **Inner Ear (The Cochlea):** A snail-shell coiled bony labyrinth divided into three fluid-filled compartments:",
          "   - **Scala Vestibuli:** Upper compartment containing **Perilymph** (resembles ECF: high Na+ 140 mEq/L, low K+ 5 mEq/L); originates at oval window.",
          "   - **Scala Media (Cochlear Duct):** Middle compartment filled with **Endolymph** (secreted by the *stria vascularis*; unique composition resembling ICF: high K+ 150 mEq/L, low Na+ 2 mEq/L; maintains an **Endocochlear Potential of +80 mV**).",
          "   - **Scala Tympani:** Lower compartment containing Perilymph; terminates at membrane-covered round window.",
          "**The Organ of Corti & Mechanoelectrical Transduction:** The functional acoustic transducer sitting atop the **Basilar Membrane**:",
          "1. Fluid waves pushed by the stapes footplate at the oval window travel through the perilymph, displacing the basilar membrane.",
          "2. The basilar membrane supports **Outer Hair Cells (OHCs, ~12,000)** (which amplify local basilar vibrations via electromotility mediated by the motor protein **Prestin**) and **Inner Hair Cells (IHCs, ~3,500)** (which provide 90-95% of sensory acoustic input to the auditory nerve).",
          "3. Stereocilia of hair cells protrude into endolymph and are anchored or sheared against the overlying gelatinous **Tectorial Membrane**.",
          "4. Shearing toward the tallest stereocilium (kinocilium) tensions microscopic **Tip Links**, mechanically pulling open cation-permeable **MET (mechanoelectrical transduction) channels**.",
          "5. Driven by the massive combined electrochemical gradient (+80 mV endolymph to -70 mV intracellular = 150 mV gradient), **K+ rushes INTO the hair cell**, depolarizing the membrane. Depolarization opens voltage-gated Ca2+ channels; Ca2+ influx stimulates exocytosis of **Glutamate** onto spiral ganglion afferent terminals of the **Cochlear Nerve (CN VIII)**.",
          "**The Place Theory of Pitch Discrimination:** The basilar membrane varies systematically in physical dimensions: at the **base** (near oval window), it is narrow (100 μm), stiff, and taut; at the **apex** (helicotrema), it is wide (500 μm) and flexible. High-frequency sounds (e.g., 20,000 Hz) produce maximal resonance and displacement at the **stiff base**; low-frequency sounds (e.g., 200 Hz) travel the full length to displace the **flexible apex**. Loudness is coded by the amplitude of basilar displacement and firing frequency of auditory nerve fibers.",
          "**Auditory Pathway:** Spiral ganglion -> Cochlear nerve (CN VIII) -> Dorsal and Ventral Cochlear Nuclei in medulla -> Superior Olivary Complex (sound localization) -> Lateral Lemniscus -> Inferior Colliculus (midbrain) -> Medial Geniculate Nucleus (thalamus) -> **Primary Auditory Cortex** (superior temporal gyrus, Brodmann area 41/42).",
          "**Vestibular Physiology (Balance & Equilibrium):**",
          "  - **Semicircular Canals (Horizontal, Superior, Posterior):** Positioned orthogonally at 90° angles; each canal has an expanded **ampulla** housing a sensory **crista ampullaris** with hair cells embedded in a gelatinous **cupula**. Flow of endolymph during head rotation deflects the cupula, detecting **Angular (Rotational) Acceleration**.",
          "  - **Otolith Organs (Utricle & Saccule):** House a sensory **macula** covered by a gelatinous otolithic membrane embedded with dense calcium carbonate crystals (**otoconia / otoliths**). Detect **Linear Acceleration** (utricle detects horizontal movement; saccule detects vertical gravitational movement) and static head tilt."
        ],
        "points": [
          "**Conductive vs. Sensorineural Hearing Loss:**",
          "  - **Conductive Hearing Loss:** Physical obstruction or mechanical defect in external or middle ear (cerumen impaction, otitis media, tympanic membrane perforation, otosclerosis). **Weber test** lateralizes to the *affected* ear (room noise is blocked, bone conduction heard louder); **Rinne test** shows bone conduction > air conduction (BC > AC, negative Rinne).",
          "  - **Sensorineural Hearing Loss:** Pathological damage to cochlear inner hair cells, auditory nerve (CN VIII), or central auditory tracts (presbycusis, acoustic trauma, aminoglycoside toxicity, acoustic neuroma). **Weber test** lateralizes to the *normal / unaffected* ear; **Rinne test** shows AC > BC (positive Rinne, but both reduced).",
          "**Vestibulo-Ocular Reflex (VOR) & Nystagmus:** The VOR coordinates eye movements to compensate for head rotation, maintaining fixed gaze on a visual target during movement. **Nystagmus** is involuntary, rhythmic oscillatory eye movement characterized by a slow tracking phase followed by a rapid corrective saccade, triggered by vestibular imbalance or cerebellar dysfunction."
        ],
        "clinicalPearl": "**Ototoxicity & Benign Paroxysmal Positional Vertigo (BPPV):** **Ototoxic drugs** (Aminoglycoside antibiotics like Gentamicin, Loop diuretics like Furosemide, and Cisplatin) accumulate in inner ear endolymph, selectively destroying cochlear outer hair cells and vestibular neuroepithelium, causing irreversible sensorineural hearing loss and chronic ataxia; nurses must monitor peak/trough drug levels and watch for early tinnitus. **BPPV** is the most common peripheral vestibular disorder, caused by dislodged calcium carbonate otoconia from the utricle migrating into a semicircular canal (usually posterior canal), producing transient, violent rotational vertigo and nystagmus triggered by head position changes; successfully diagnosed with the **Dix-Hallpike maneuver** and treated non-pharmacologically via the **Epley canalith repositioning maneuver**.",
        "images": [
          {
            "src": "/images/physiology/12_image7.png",
            "caption": "Figure 12.7: Cochlear organ of Corti and auditory transduction mechanism.",
            "alt": "Hearing mechanism"
          }
        ],
        "tables": []
      },
      {
        "id": "sec-phys-12-4",
        "title": "Gustatory (Taste) & Olfactory (Smell) Physiology",
        "content": [
          "The **chemical senses (Chemoreception)** encompass **Gustation (Taste)** and **Olfaction (Smell)**, ancient sensory modalities specialized for sampling environmental chemical molecules to guide nutritional selection, promote digestive secretions, and detect ingested poisons or airborne hazards.",
          "**Olfactory Physiology (Sense of Smell):**",
          "1. **Olfactory Neuroepithelium:** A specialized 5-cm² yellow-tinted pseudostratified mucosal patch lining the superior nasal cavity, cribriform plate of ethmoid bone, and superior nasal concha. Contains 10 to 20 million **Olfactory Sensory Neurons (OSNs)** (bipolar neurons whose dendritic knobs project 10-20 non-motile cilia into overlying mucus), supported by sustentacular cells and **Basal Stem Cells** (capable of continuous neurogenesis, replacing damaged olfactory neurons every 30-60 days).",
          "2. **Olfactory Transduction (cAMP Signaling):** Volatile odorant molecules dissolve in nasal mucus and bind to specific 7-transmembrane **G-protein coupled odorant receptors (GPCRs)** on cilia. Receptor activation engages the olfactory-specific G-protein (**Golf**), which stimulates **Adenylyl Cyclase III** to convert ATP into cyclic AMP (cAMP). Rising cAMP opens cyclic nucleotide-gated (CNG) cation channels, allowing Na+ and Ca2+ influx. Intracellular Ca2+ subsequently opens Ca2+-activated Cl- channels (because olfactory neurons maintain high intracellular Cl-, Cl- flows OUT, augmenting depolarization). The resulting receptor potential fires action potentials along unmyelinated axons.",
          "3. **Olfactory Pathway (Direct Cortical Access Without Thalamic Relay):** Axons of olfactory neurons bundle into 20 olfactory filia that pass through cribriform plate foramina to enter the **Olfactory Bulb**. They synapse in spherical neuropil units called **Glomeruli** onto apical dendrites of **Mitral and Tufted cells**. Mitral cell axons form the **Olfactory Tract**, projecting directly to the **Primary Olfactory Cortex** (piriform cortex, periamygdaloid cortex, entorhinal cortex) and limbic system (amygdala, hippocampus). **Olfaction is the ONLY sensory modality that reaches the cerebral cortex directly without an obligatory synapsing relay in the thalamus**, explaining its profound evocative link to primal emotions, visceral reactions, and vivid memories.",
          "**Gustatory Physiology (Sense of Taste):**",
          "1. **Taste Buds & Papillae:** The oral cavity houses approximately 5,000 to 10,000 **Taste Buds** distributed across the tongue, soft palate, pharynx, and epiglottis. On the tongue, taste buds reside in specialized epithelial projections called **Papillae**:",
          "   - **Fungiform Papillae:** Mushroom-shaped, scattered over anterior two-thirds of tongue (contain 1-5 taste buds each).",
          "   - **Foliate Papillae:** Parallel leaf-like folds on posterolateral tongue margins.",
          "   - **Circumvallate (Vallate) Papillae:** 8 to 12 large dome-shaped papillae arranged in an inverted V-shape at the sulcus terminalis (house hundreds of taste buds; washed by lingual lipase/serous secretions of von Ebner's glands).",
          "   - *(Filiform Papillae: Most numerous, conical, keratinized; contain NO taste buds; provide mechanical friction for food manipulation).*",
          "2. **Taste Bud Architecture & Receptor Cells:** Spindle-shaped cluster of 50 to 100 neuroepithelial taste receptor cells communicating with the oral cavity through a microscopic **Taste Pore** via apical microvilli.",
          "3. **Transduction of the Five Primary Taste Modalities:**",
          "   - **Salty:** Sodium ions (Na+) in dietary salt enter taste cells directly through apical **Epithelial Sodium Channels (ENaC)**, depolarizing the membrane, opening voltage-gated Ca2+ channels, and releasing neurotransmitter.",
          "   - **Sour:** Acidic hydrogen ions (H+) block apical K+ conductance channels and penetrate through proton-permeable OTOP1 channels, depolarizing the cell.",
          "   - **Sweet:** Sugars, artificial sweeteners, and sweet proteins bind to a heterodimeric GPCR complex (**T1R2 + T1R3**).",
          "   - **Umami ('Savory / Delicious'):** Elicited by L-glutamate and amino acids; binds to a heterodimeric GPCR complex (**T1R1 + T1R3**).",
          "   - **Bitter:** Elicited by toxic alkaloids, plant poisons, and denatonium; binds to a family of ~30 distinct GPCRs (**T2R family**). Highly sensitive (detects poisons at micromolar concentrations).",
          "   - *Sweet, Umami, and Bitter GPCRs share a common intracellular transduction cascade: receptor activation engages **Gustducin (G-protein)** -> Phospholipase C beta-2 (PLC-beta-2) -> IP3 production -> Ca2+ release from endoplasmic reticulum -> opens TRPM5 channels -> membrane depolarization -> non-vesicular release of **ATP** via CALHM1/3 voltage-gated channels onto gustatory nerve fibers.*",
          "4. **The Gustatory Neural Pathway:** Taste signals travel along three cranial nerves:",
          "   - **Anterior 2/3 of Tongue:** **Facial Nerve (CN VII)** via the Chorda Tympani.",
          "   - **Posterior 1/3 of Tongue:** **Glossopharyngeal Nerve (CN IX)**.",
          "   - **Epiglottis & Pharynx:** **Vagus Nerve (CN X)** via superior laryngeal nerve.",
          "   - Afferent fibers terminate in the **Nucleus of the Solitary Tract (NST / Gustatory Nucleus)** in the medulla. Second-order neurons ascend ipsilaterally in the central tegmental tract to the **Ventral Posteromedial (VPM) Nucleus** of the thalamus. Third-order thalamic neurons project to the **Primary Gustatory Cortex** (anterior insula and frontal operculum, Brodmann area 43) for conscious taste perception."
        ],
        "points": [
          "**Flavor Perception:** Pure taste (gustation) provides only five basic modalities (salty, sweet, sour, bitter, umami). What is colloquially called 'flavor' is a complex multisensory perceptual synthesis combining gustation, **retronasal olfaction** (volatile aromas passing up from pharynx to olfactory mucosa during chewing and swallowing), and trigeminal **somatosensation** (temperature, texture, and chemesthesis like capsaicin heat or menthol cooling). Nasal congestion during upper respiratory infections eliminates retronasal olfaction, making food taste bland.",
          "**Chemosensory Alterations:** **Anosmia** (complete loss of smell; early sign of viral infections like COVID-19 or Kallmann syndrome); **Hyposmia** (diminished smell, early biomarker in Parkinson's disease); **Ageusia** (loss of taste); **Dysgeusia / Parosmia** (distorted sense of taste or smell)."
        ],
        "clinicalPearl": "**Cribriform Plate Fractures & Head Trauma Nursing Care:** Basilar skull fractures involving the **ethmoid cribriform plate** tear the delicate olfactory nerve filia and overlying dura mater, producing immediate permanent **anosmia** and **Cerebrospinal Fluid (CSF) Rhinorrhea** (clear watery nasal discharge). The bedside nurse must test the drainage for glucose (CSF is glucose-positive, unlike normal nasal mucus) and observe for the characteristic **'halo sign'** (clear CSF ring surrounding blood on gauze). Strict nursing management mandates elevating head of bed 30 degrees, placing no nasal packing, avoiding coughing/sneezing/nose blowing, and absolutely **NO nasogastric (NG) tube insertion** (which could inadvertently penetrate into the cranial vault).",
        "images": [
          {
            "src": "/images/physiology/12_image8.png",
            "caption": "Figure 12.8: Taste bud histology and gustatory papillae.",
            "alt": "Taste buds"
          }
        ],
        "tables": []
      }
    ],
    "mcqs": [
      {
        "id": "phys-mcq-12-936",
        "question": "nan",
        "correctAnswer": "nan",
        "subtopic": "nan"
      },
      {
        "id": "phys-mcq-12-937",
        "question": "nan",
        "correctAnswer": "nan",
        "subtopic": "nan"
      },
      {
        "id": "phys-mcq-12-938",
        "question": "nan",
        "correctAnswer": "nan",
        "subtopic": "nan"
      },
      {
        "id": "phys-mcq-12-939",
        "question": "nan",
        "correctAnswer": "nan",
        "subtopic": "nan"
      },
      {
        "id": "phys-mcq-12-940",
        "question": "nan",
        "correctAnswer": "nan",
        "subtopic": "nan"
      },
      {
        "id": "phys-mcq-12-941",
        "question": "nan",
        "correctAnswer": "nan",
        "subtopic": "nan"
      },
      {
        "id": "phys-mcq-12-942",
        "question": "nan",
        "correctAnswer": "nan",
        "subtopic": "nan"
      },
      {
        "id": "phys-mcq-12-943",
        "question": "nan",
        "correctAnswer": "nan",
        "subtopic": "nan"
      },
      {
        "id": "phys-mcq-12-944",
        "question": "nan",
        "correctAnswer": "nan",
        "subtopic": "nan"
      },
      {
        "id": "phys-mcq-12-945",
        "question": "nan",
        "correctAnswer": "nan",
        "subtopic": "nan"
      },
      {
        "id": "phys-mcq-12-946",
        "question": "nan",
        "correctAnswer": "nan",
        "subtopic": "nan"
      },
      {
        "id": "phys-mcq-12-947",
        "question": "nan",
        "correctAnswer": "nan",
        "subtopic": "nan"
      },
      {
        "id": "phys-mcq-12-948",
        "question": "nan",
        "correctAnswer": "nan",
        "subtopic": "nan"
      },
      {
        "id": "phys-mcq-12-949",
        "question": "nan",
        "correctAnswer": "nan",
        "subtopic": "nan"
      },
      {
        "id": "phys-mcq-12-950",
        "question": "nan",
        "correctAnswer": "nan",
        "subtopic": "nan"
      },
      {
        "id": "phys-mcq-12-951",
        "question": "nan",
        "correctAnswer": "nan",
        "subtopic": "nan"
      },
      {
        "id": "phys-mcq-12-952",
        "question": "nan",
        "correctAnswer": "nan",
        "subtopic": "nan"
      },
      {
        "id": "phys-mcq-12-953",
        "question": "nan",
        "correctAnswer": "nan",
        "subtopic": "nan"
      },
      {
        "id": "phys-mcq-12-954",
        "question": "nan",
        "correctAnswer": "nan",
        "subtopic": "nan"
      },
      {
        "id": "phys-mcq-12-955",
        "question": "nan",
        "correctAnswer": "nan",
        "subtopic": "nan"
      },
      {
        "id": "phys-mcq-12-956",
        "question": "nan",
        "correctAnswer": "nan",
        "subtopic": "nan"
      },
      {
        "id": "phys-mcq-12-957",
        "question": "nan",
        "correctAnswer": "nan",
        "subtopic": "nan"
      },
      {
        "id": "phys-mcq-12-958",
        "question": "nan",
        "correctAnswer": "nan",
        "subtopic": "nan"
      },
      {
        "id": "phys-mcq-12-959",
        "question": "nan",
        "correctAnswer": "nan",
        "subtopic": "nan"
      },
      {
        "id": "phys-mcq-12-960",
        "question": "nan",
        "correctAnswer": "nan",
        "subtopic": "nan"
      },
      {
        "id": "phys-mcq-12-961",
        "question": "nan",
        "correctAnswer": "nan",
        "subtopic": "nan"
      },
      {
        "id": "phys-mcq-12-962",
        "question": "nan",
        "correctAnswer": "nan",
        "subtopic": "nan"
      },
      {
        "id": "phys-mcq-12-963",
        "question": "nan",
        "correctAnswer": "nan",
        "subtopic": "nan"
      },
      {
        "id": "phys-mcq-12-964",
        "question": "nan",
        "correctAnswer": "nan",
        "subtopic": "nan"
      },
      {
        "id": "phys-mcq-12-965",
        "question": "nan",
        "correctAnswer": "nan",
        "subtopic": "nan"
      },
      {
        "id": "phys-mcq-12-966",
        "question": "nan",
        "correctAnswer": "nan",
        "subtopic": "nan"
      },
      {
        "id": "phys-mcq-12-967",
        "question": "nan",
        "correctAnswer": "nan",
        "subtopic": "nan"
      },
      {
        "id": "phys-mcq-12-968",
        "question": "nan",
        "correctAnswer": "nan",
        "subtopic": "nan"
      },
      {
        "id": "phys-mcq-12-969",
        "question": "nan",
        "correctAnswer": "nan",
        "subtopic": "nan"
      },
      {
        "id": "phys-mcq-12-970",
        "question": "nan",
        "correctAnswer": "nan",
        "subtopic": "nan"
      },
      {
        "id": "phys-mcq-12-971",
        "question": "nan",
        "correctAnswer": "nan",
        "subtopic": "nan"
      },
      {
        "id": "phys-mcq-12-972",
        "question": "nan",
        "correctAnswer": "nan",
        "subtopic": "nan"
      },
      {
        "id": "phys-mcq-12-973",
        "question": "nan",
        "correctAnswer": "nan",
        "subtopic": "nan"
      },
      {
        "id": "phys-mcq-12-974",
        "question": "nan",
        "correctAnswer": "nan",
        "subtopic": "nan"
      },
      {
        "id": "phys-mcq-12-975",
        "question": "nan",
        "correctAnswer": "nan",
        "subtopic": "nan"
      },
      {
        "id": "phys-mcq-12-976",
        "question": "nan",
        "correctAnswer": "nan",
        "subtopic": "nan"
      },
      {
        "id": "phys-mcq-12-977",
        "question": "nan",
        "correctAnswer": "nan",
        "subtopic": "nan"
      },
      {
        "id": "phys-mcq-12-978",
        "question": "nan",
        "correctAnswer": "nan",
        "subtopic": "nan"
      },
      {
        "id": "phys-mcq-12-979",
        "question": "nan",
        "correctAnswer": "nan",
        "subtopic": "nan"
      },
      {
        "id": "phys-mcq-12-980",
        "question": "nan",
        "correctAnswer": "nan",
        "subtopic": "nan"
      },
      {
        "id": "phys-mcq-12-981",
        "question": "nan",
        "correctAnswer": "nan",
        "subtopic": "nan"
      },
      {
        "id": "phys-mcq-12-982",
        "question": "nan",
        "correctAnswer": "nan",
        "subtopic": "nan"
      },
      {
        "id": "phys-mcq-12-983",
        "question": "nan",
        "correctAnswer": "nan",
        "subtopic": "nan"
      },
      {
        "id": "phys-mcq-12-984",
        "question": "nan",
        "correctAnswer": "nan",
        "subtopic": "nan"
      },
      {
        "id": "phys-mcq-12-985",
        "question": "nan",
        "correctAnswer": "nan",
        "subtopic": "nan"
      },
      {
        "id": "phys-mcq-12-986",
        "question": "nan",
        "correctAnswer": "nan",
        "subtopic": "nan"
      },
      {
        "id": "phys-mcq-12-987",
        "question": "nan",
        "correctAnswer": "nan",
        "subtopic": "nan"
      },
      {
        "id": "phys-mcq-12-988",
        "question": "nan",
        "correctAnswer": "nan",
        "subtopic": "nan"
      },
      {
        "id": "phys-mcq-12-989",
        "question": "nan",
        "correctAnswer": "nan",
        "subtopic": "nan"
      },
      {
        "id": "phys-mcq-12-990",
        "question": "nan",
        "correctAnswer": "nan",
        "subtopic": "nan"
      },
      {
        "id": "phys-mcq-12-991",
        "question": "nan",
        "correctAnswer": "nan",
        "subtopic": "nan"
      },
      {
        "id": "phys-mcq-12-992",
        "question": "nan",
        "correctAnswer": "nan",
        "subtopic": "nan"
      },
      {
        "id": "phys-mcq-12-993",
        "question": "nan",
        "correctAnswer": "nan",
        "subtopic": "nan"
      },
      {
        "id": "phys-mcq-12-994",
        "question": "nan",
        "correctAnswer": "nan",
        "subtopic": "nan"
      },
      {
        "id": "phys-mcq-12-995",
        "question": "nan",
        "correctAnswer": "nan",
        "subtopic": "nan"
      },
      {
        "id": "phys-mcq-12-996",
        "question": "nan",
        "correctAnswer": "nan",
        "subtopic": "nan"
      },
      {
        "id": "phys-mcq-12-997",
        "question": "nan",
        "correctAnswer": "nan",
        "subtopic": "nan"
      },
      {
        "id": "phys-mcq-12-998",
        "question": "nan",
        "correctAnswer": "nan",
        "subtopic": "nan"
      },
      {
        "id": "phys-mcq-12-999",
        "question": "nan",
        "correctAnswer": "nan",
        "subtopic": "nan"
      },
      {
        "id": "phys-mcq-12-1000",
        "question": "nan",
        "correctAnswer": "nan",
        "subtopic": "nan"
      },
      {
        "id": "phys-mcq-12-1001",
        "question": "nan",
        "correctAnswer": "nan",
        "subtopic": "nan"
      },
      {
        "id": "phys-mcq-12-1002",
        "question": "nan",
        "correctAnswer": "nan",
        "subtopic": "nan"
      },
      {
        "id": "phys-mcq-12-1003",
        "question": "nan",
        "correctAnswer": "nan",
        "subtopic": "nan"
      },
      {
        "id": "phys-mcq-12-1004",
        "question": "nan",
        "correctAnswer": "nan",
        "subtopic": "nan"
      },
      {
        "id": "phys-mcq-12-1005",
        "question": "nan",
        "correctAnswer": "nan",
        "subtopic": "nan"
      },
      {
        "id": "phys-mcq-12-1006",
        "question": "nan",
        "correctAnswer": "nan",
        "subtopic": "nan"
      },
      {
        "id": "phys-mcq-12-1007",
        "question": "nan",
        "correctAnswer": "nan",
        "subtopic": "nan"
      },
      {
        "id": "phys-mcq-12-1008",
        "question": "nan",
        "correctAnswer": "nan",
        "subtopic": "nan"
      },
      {
        "id": "phys-mcq-12-1009",
        "question": "nan",
        "correctAnswer": "nan",
        "subtopic": "nan"
      },
      {
        "id": "phys-mcq-12-1010",
        "question": "nan",
        "correctAnswer": "nan",
        "subtopic": "nan"
      },
      {
        "id": "phys-mcq-12-1011",
        "question": "nan",
        "correctAnswer": "nan",
        "subtopic": "nan"
      },
      {
        "id": "phys-mcq-12-1012",
        "question": "nan",
        "correctAnswer": "nan",
        "subtopic": "nan"
      },
      {
        "id": "phys-mcq-12-1013",
        "question": "nan",
        "correctAnswer": "nan",
        "subtopic": "nan"
      },
      {
        "id": "phys-mcq-12-1014",
        "question": "nan",
        "correctAnswer": "nan",
        "subtopic": "nan"
      },
      {
        "id": "phys-mcq-12-1015",
        "question": "nan",
        "correctAnswer": "nan",
        "subtopic": "nan"
      },
      {
        "id": "phys-mcq-12-1016",
        "question": "nan",
        "correctAnswer": "nan",
        "subtopic": "nan"
      },
      {
        "id": "phys-mcq-12-1017",
        "question": "nan",
        "correctAnswer": "nan",
        "subtopic": "nan"
      },
      {
        "id": "phys-mcq-12-1018",
        "question": "nan",
        "correctAnswer": "nan",
        "subtopic": "nan"
      },
      {
        "id": "phys-mcq-12-1019",
        "question": "nan",
        "correctAnswer": "nan",
        "subtopic": "nan"
      },
      {
        "id": "phys-mcq-12-1020",
        "question": "nan",
        "correctAnswer": "nan",
        "subtopic": "nan"
      },
      {
        "id": "phys-mcq-12-1021",
        "question": "nan",
        "correctAnswer": "nan",
        "subtopic": "nan"
      },
      {
        "id": "phys-mcq-12-1022",
        "question": "nan",
        "correctAnswer": "nan",
        "subtopic": "nan"
      },
      {
        "id": "phys-mcq-12-1023",
        "question": "nan",
        "correctAnswer": "nan",
        "subtopic": "nan"
      },
      {
        "id": "phys-mcq-12-1024",
        "question": "nan",
        "correctAnswer": "nan",
        "subtopic": "nan"
      }
    ],
    "subjectiveQuestions": [
      {
        "id": "phys-subj-12-1",
        "question": "Write the regulation of heart rate.",
        "type": "Very short",
        "marks": 2,
        "difficulty": 1
      },
      {
        "id": "phys-subj-12-2",
        "question": "Write the normal values of heart rate in different age groups.",
        "type": "Very short",
        "marks": 2,
        "difficulty": 1
      },
      {
        "id": "phys-subj-12-3",
        "question": "Identify the physiological factors that affect heart rate.",
        "type": "Very short",
        "marks": 2,
        "difficulty": 1
      },
      {
        "id": "phys-subj-12-4",
        "question": "Enlist two functions of the eye.",
        "type": "Very short",
        "marks": 2,
        "difficulty": 1
      },
      {
        "id": "phys-subj-12-5",
        "question": "Enlist the internal and external parts of an eye.",
        "type": "Very short",
        "marks": 2,
        "difficulty": 1
      },
      {
        "id": "phys-subj-12-6",
        "question": "Enlist the internal and external parts of an ear.",
        "type": "Very short",
        "marks": 2,
        "difficulty": 1
      },
      {
        "id": "phys-subj-12-7",
        "question": "List the functions of an ear.",
        "type": "Very short",
        "marks": 2,
        "difficulty": 1
      },
      {
        "id": "phys-subj-12-8",
        "question": "Draw a diagram of an eye and label it.",
        "type": "Very short",
        "marks": 2,
        "difficulty": 1
      },
      {
        "id": "phys-subj-12-9",
        "question": "List two major divisions of the brain.",
        "type": "Very short",
        "marks": 2,
        "difficulty": 1
      },
      {
        "id": "phys-subj-12-10",
        "question": "Enumerate two functions of the trochlear nerve.",
        "type": "Very short",
        "marks": 2,
        "difficulty": 1
      },
      {
        "id": "phys-subj-12-11",
        "question": "Enumerate two functions of the vestibulocochlear nerve.",
        "type": "Very short",
        "marks": 2,
        "difficulty": 1
      },
      {
        "id": "phys-subj-12-12",
        "question": "Explain chambers and valves in the heart.",
        "type": "Short",
        "marks": 5,
        "difficulty": 1
      },
      {
        "id": "phys-subj-12-13",
        "question": "Explain pacemaker tissue of the heart.",
        "type": "Short",
        "marks": 5,
        "difficulty": 1
      },
      {
        "id": "phys-subj-12-14",
        "question": "Determine the production of platelets.",
        "type": "Short",
        "marks": 5,
        "difficulty": 1
      },
      {
        "id": "phys-subj-12-15",
        "question": "Explain the structure and functions of various components of the eye.",
        "type": "Short",
        "marks": 5,
        "difficulty": 1
      },
      {
        "id": "phys-subj-12-16",
        "question": "Elaborate on structure and functions of the ear.",
        "type": "Short",
        "marks": 5,
        "difficulty": 1
      },
      {
        "id": "phys-subj-12-17",
        "question": "Explain features of the sense of smell.",
        "type": "Short",
        "marks": 5,
        "difficulty": 1
      },
      {
        "id": "phys-subj-12-18",
        "question": "Explain physiology of taste.",
        "type": "Short",
        "marks": 5,
        "difficulty": 1
      },
      {
        "id": "phys-subj-12-19",
        "question": "Elaborate on taste buds.",
        "type": "Short",
        "marks": 5,
        "difficulty": 1
      },
      {
        "id": "phys-subj-12-20",
        "question": "Draw the diagram of the structure of the eye.",
        "type": "Short",
        "marks": 5,
        "difficulty": 1
      },
      {
        "id": "phys-subj-12-21",
        "question": "Describe the functions of the heart, diagram, and label it. (6+4)",
        "type": "Essay",
        "marks": 10,
        "difficulty": 1
      },
      {
        "id": "phys-subj-12-22",
        "question": "Explain physiological and pathological conditions affecting heart rate. (5+5)",
        "type": "Essay",
        "marks": 10,
        "difficulty": 1
      },
      {
        "id": "phys-subj-12-23",
        "question": "Explain the structure and functions of the ear with a diagram. (4+4+2)",
        "type": "Essay",
        "marks": 10,
        "difficulty": 1
      },
      {
        "id": "phys-subj-12-24",
        "question": "Illustrate the internal and external organs of the female reproductive system and their functions. (5+5)",
        "type": "Essay",
        "marks": 10,
        "difficulty": 1
      }
    ]
  }
};
