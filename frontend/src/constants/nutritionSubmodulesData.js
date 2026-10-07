// Comprehensive Nutrition & Dietetics Submodules Data (All 10 Units)
// Structured for interactive lesson pages with visual diagrams, clinical cards, and sequential navigation.

export const NUTRITION_SUBMODULES = {
  "intro-to-nutrition": {
    "slug": "intro-to-nutrition",
    "unitNumber": 1,
    "unitTitle": "Unit 1: Introduction to Nutrition & Health",
    "lessonNumber": 1,
    "totalLessonsInUnit": 3,
    "title": "Concept of Nutrition & Relationship to Health",
    "category": "Introduction to Nutrition",
    "icon": "🥗",
    "summary": "Science of food, WHO definition of health, and how optimal nutrition underpins human growth, immunity, and disease prevention.",
    "prevSlug": null,
    "nextSlug": "nursing-in-nutrition",
    "overview": "Nutrition is defined as the science of food and its relationship to health, concerned with nutrients in body growth, development, energy production, tissue repair, and maintenance.",
    "keyDefinitions": [
      {
        "term": "Nutrition",
        "text": "The science of food and its relationship to health, focusing on the intake and utilization of food nutrients by living organisms."
      },
      {
        "term": "Health (WHO)",
        "text": "A state of complete physical, mental, and social well-being and not merely the absence of disease or infirmity."
      },
      {
        "term": "Dietetics",
        "text": "The practical application of scientific principles of nutrition in planning meals for healthy and diseased individuals."
      },
      {
        "term": "Nutritional Status",
        "text": "The physiological state of the body resulting from the balance between nutrient intake and nutritional requirement."
      }
    ],
    "relationshipPoints": [
      {
        "title": "Physical & Intellectual Growth",
        "desc": "Supports developmental milestones from fetal life to old age. Childhood malnutrition impairs school performance and cognition.",
        "icon": "👶"
      },
      {
        "title": "Energy Production",
        "desc": "Carbohydrates (4 kcal/g) and fats (9 kcal/g) provide ATP energy for basal metabolic functions and physical activities.",
        "icon": "⚡"
      },
      {
        "title": "Infection Resistance & Immunity",
        "desc": "Prevents immune depletion; malnutrition predisposes to infections like TB and measles, which in turn exacerbate nutrient loss.",
        "icon": "🛡️"
      },
      {
        "title": "Prevention of Chronic Diseases",
        "desc": "Protects against non-communicable diseases including Obesity, Type 2 DM, Hypertension, Atherosclerosis, and Cancer.",
        "icon": "🩺"
      },
      {
        "title": "Tissue Repair & Regeneration",
        "desc": "Dietary amino acids, vitamins C & A, and zinc support wound healing, surgical recovery, and cellular turnover.",
        "icon": "🩹"
      }
    ],
    "clinicalCase": {
      "title": "Pediatric Community Nutrition Assessment",
      "scenario": "A 4-year-old child presents to the community clinic with history of recurrent respiratory infections, delayed developmental milestones, and poor weight gain. Diet history reveals exclusive intake of diluted sweetened tea and refined biscuits.",
      "nurseAction": "Assess weight-for-age on WHO growth chart, counsel the mother on introducing high-protein foods (eggs, pulses, milk, mashed bananas), and administer Vitamin A prophylaxis."
    },
    "memoryHook": "G-E-R-M-S: Growth, Energy, Repair, Mental well-being, Specific disease prevention.",
    "diagramType": "fiveFoodPillars"
  },
  "nursing-in-nutrition": {
    "slug": "nursing-in-nutrition",
    "unitNumber": 1,
    "unitTitle": "Unit 1: Introduction to Nutrition & Health",
    "lessonNumber": 2,
    "totalLessonsInUnit": 3,
    "title": "Role of Nutrition & Dietetics in Nursing Practice",
    "category": "Nursing Practice",
    "icon": "🩺",
    "summary": "Essential areas where nurses apply nutritional knowledge: health promotion, specific protection, therapeutic diet planning, and patient education.",
    "prevSlug": "intro-to-nutrition",
    "nextSlug": "five-food-groups",
    "overview": "Nurses constitute the core healthcare workforce responsible for assessing nutritional status, monitoring intake, administering enteral/parenteral nutrition, and educating patients.",
    "nursingTiers": [
      {
        "tier": "1. Health Promotion & Wellness",
        "actions": "Educating families on balanced diets, seasonal foods, and maternal-child nutrition."
      },
      {
        "tier": "2. Specific Protection",
        "actions": "Administering Iron-Folic Acid tablets, Vitamin A megadoses, and promoting iodized salt."
      },
      {
        "tier": "3. Deficiency Prevention",
        "actions": "Screening vulnerable groups for early signs of PEM, Anemia, Rickets, Scurvy, and Goitre."
      },
      {
        "tier": "4. Therapeutic Modification",
        "actions": "Formulating consistency-modified (clear fluid, full fluid, soft) and nutrient-restricted diets."
      },
      {
        "tier": "5. Clinical Administration",
        "actions": "Managing Nasogastric (NG) tube feedings, confirming gastric position (pH < 5.5, whoosh test), and TPN monitoring."
      },
      {
        "tier": "6. Discharge Counseling",
        "actions": "Providing customized home diet charts for diabetic, hypertensive, and renal patients."
      }
    ],
    "clinicalCase": {
      "title": "Nasogastric Tube Feeding Protocol",
      "scenario": "A 65-year-old post-stroke patient with severe dysphagia requires enteral nutrition. The nurse prepares to administer 200 mL of blenderized diet.",
      "nurseAction": "Elevate head of bed to 45°, aspirate stomach contents to verify pH ≤ 5.5, auscultate epigastric whoosh sound, check gastric residual volume (<150 mL), flush with 30 mL sterile water before and after feed."
    },
    "memoryHook": "A-S-P-I-R-E: Assess position, Satiety check, Proper elevation, Infuse slowly, Rinse tube, Evaluate tolerance.",
    "diagramType": "nursingDomainsChart"
  },
  "five-food-groups": {
    "slug": "five-food-groups",
    "unitNumber": 1,
    "unitTitle": "Unit 1: Introduction to Nutrition & Health",
    "lessonNumber": 3,
    "totalLessonsInUnit": 3,
    "title": "Five Food Group System & Chemical Classification",
    "category": "Food Science",
    "icon": "🍞",
    "summary": "ICMR Five Food Group system, chemical classification (carbs, proteins, fats, minerals, vitamins), and energy-yielding nutrients.",
    "prevSlug": "nursing-in-nutrition",
    "nextSlug": null,
    "isUnitFinal": true,
    "quizSlug": "unit-nut-1-intro",
    "overview": "The ICMR classifies foods into five essential groups to facilitate balanced menu planning, nutrient adequacy, and dietary substitution.",
    "foodGroups": [
      {
        "group": "1. Cereals, Grains & Products",
        "foods": "Rice, wheat, ragi, bajra, maize, jowar, oats.",
        "nutrients": "Energy (350 kcal/100g), Carbohydrates (70-80%), B-vitamins, dietary fiber."
      },
      {
        "group": "2. Pulses & Legumes",
        "foods": "Bengal gram, black gram, green gram, lentils, rajma, soy.",
        "nutrients": "Protein (20-25%), Iron, Thiamine, Folic acid (limiting: Methionine)."
      },
      {
        "group": "3. Milk & Meat Products",
        "foods": "Milk, curd, paneer, eggs, poultry, fish, meat.",
        "nutrients": "High Biological Value (HBV) Protein, Calcium, Vitamin B12, Riboflavin."
      },
      {
        "group": "4. Fruits & Vegetables",
        "foods": "Leafy greens (spinach, methi), citrus fruits, amla, carrot, papaya.",
        "nutrients": "Vitamins A, C, Potassium, Iron, phytochemicals, soluble & insoluble fiber."
      },
      {
        "group": "5. Fats & Sugars",
        "foods": "Butter, ghee, vegetable oils, sugar, jaggery, honey.",
        "nutrients": "Concentrated energy (Fats: 9 kcal/g; Sugar: 4 kcal/g), Essential Fatty Acids."
      }
    ],
    "memoryHook": "C-P-M-F-S: Cereals (Fuel), Pulses (Growth), Milk/Meat (Strength), Fruits/Veg (Shield), Sugars/Fats (Power).",
    "diagramType": "foodPyramid"
  },
  "carbohydrate-classification": {
    "slug": "carbohydrate-classification",
    "unitNumber": 2,
    "unitTitle": "Unit 2: Carbohydrates & Dietary Fibres",
    "lessonNumber": 1,
    "totalLessonsInUnit": 3,
    "title": "Carbohydrate Classification & Dietary Sources",
    "category": "Macronutrients",
    "icon": "🌾",
    "summary": "Monosaccharides (Glucose, Fructose, Galactose), Disaccharides (Maltose, Sucrose, Lactose), and Polysaccharides.",
    "prevSlug": null,
    "nextSlug": "dietary-fibres",
    "overview": "Carbohydrates are polyhydroxy aldehydes or ketones with general formula (CH2O)n, serving as the primary, preferred energy source for the human brain and RBCs.",
    "keyDefinitions": [
      {
        "term": "Monosaccharides",
        "text": "Simple sugars that cannot be hydrolyzed into simpler forms (Glucose, Fructose, Galactose)."
      },
      {
        "term": "Disaccharides",
        "text": "Two monosaccharide units linked by glycosidic bond (Maltose, Sucrose, Lactose)."
      },
      {
        "term": "Polysaccharides",
        "text": "High molecular weight polymers of monosaccharides (Starch, Glycogen, Cellulose)."
      }
    ],
    "memoryHook": "G-F-G for Monosaccharides; M-S-L for Disaccharides (Maltose, Sucrose, Lactose).",
    "diagramType": "carbStructureTree"
  },
  "dietary-fibres": {
    "slug": "dietary-fibres",
    "unitNumber": 2,
    "unitTitle": "Unit 2: Carbohydrates & Dietary Fibres",
    "lessonNumber": 2,
    "totalLessonsInUnit": 3,
    "title": "Soluble vs Insoluble Dietary Fibres & Disease Prevention",
    "category": "Clinical Nutrition",
    "icon": "🥦",
    "summary": "Physiological mechanisms of soluble fiber in diabetes/hyperlipidemia and insoluble fiber in constipation/colon cancer prevention.",
    "prevSlug": "carbohydrate-classification",
    "nextSlug": "energy-bmr-bmi",
    "overview": "Dietary fibre (roughage) consists of non-starch plant polysaccharides resistant to human digestive enzymes (adult recommendation: 25–38 g/day).",
    "fiberTable": [
      {
        "type": "Soluble Fibre (Pectin, Gums, Mucilages, β-Glucan)",
        "sources": "Oat bran, barley, beans, lentils, peas, apples, citrus fruits, psyllium husk.",
        "mechanism": "Attracts water and forms a viscous gel; binds bile acids and delays gastric emptying.",
        "clinicalRole": "Lowers total and LDL cholesterol; flattens postprandial blood glucose spikes in Type 2 Diabetes."
      },
      {
        "type": "Insoluble Fibre (Cellulose, Hemicellulose, Lignin)",
        "sources": "Wheat bran, whole grains, vegetables, potato skins, flaxseeds.",
        "mechanism": "Adds bulk to stool and accelerates peristaltic transit time through the colon.",
        "clinicalRole": "Prevents and treats constipation; controls intestinal pH; reduces mucosal exposure to carcinogens (prevents colon cancer)."
      }
    ],
    "memoryHook": "Soluble = Sponge (Sucks cholesterol & sugar); Insoluble = Broom (Sweeps bowel clean).",
    "diagramType": "fiberComparison"
  },
  "energy-bmr-bmi": {
    "slug": "energy-bmr-bmi",
    "unitNumber": 2,
    "unitTitle": "Unit 2: Carbohydrates & Dietary Fibres",
    "lessonNumber": 3,
    "totalLessonsInUnit": 3,
    "title": "Energy Units, BMR Factors & BMI Calculations",
    "category": "Bioenergetics",
    "icon": "⚖️",
    "summary": "Kilocalorie vs Joule, Basal Metabolic Rate (BMR) determinants, Thyroxine role, and WHO BMI classifications.",
    "prevSlug": "dietary-fibres",
    "nextSlug": null,
    "isUnitFinal": true,
    "quizSlug": "unit-nut-2-carbs",
    "overview": "1 kcal is the amount of heat required to raise the temperature of 1 kg of water by 1°C. Energy yields: Fat 9 kcal/g, Alcohol 7 kcal/g, Carb 4 kcal/g, Protein 4 kcal/g.",
    "keyDefinitions": [
      {
        "term": "BMI Formula",
        "text": "Weight in kilograms divided by height in meters squared: BMI = kg / m²."
      },
      {
        "term": "Basal Metabolic Rate (BMR)",
        "text": "The minimum energy expended by the body at complete physical and emotional rest in a thermoneutral environment."
      }
    ],
    "memoryHook": "BMI: Under 18.5 is Light, 18.5–24.9 is Right, 25–29.9 is Tight, 30+ is Heavy Fight.",
    "diagramType": "bmiScale"
  },
  "fats-classification": {
    "slug": "fats-classification",
    "unitNumber": 3,
    "unitTitle": "Unit 3: Fats & Essential Fatty Acids",
    "lessonNumber": 1,
    "totalLessonsInUnit": 2,
    "title": "Fatty Acid Classification (SFA, MUFA, PUFA)",
    "category": "Lipids",
    "icon": "🥑",
    "summary": "Chemical structure and dietary sources of Saturated, Monounsaturated, and Polyunsaturated fatty acids.",
    "prevSlug": null,
    "nextSlug": "essential-fatty-acids-diet",
    "overview": "Fatty acids are straight-chain hydrocarbons ending in a carboxyl group (-COOH). Saturated fats lack double bonds; unsaturated fats contain cis double bonds.",
    "keyDefinitions": [
      {
        "term": "Saturated Fatty Acids (SFA)",
        "text": "Palmitic and Stearic acids. Found in ghee, butter, coconut oil, palm oil, red meat. Excess elevates LDL."
      },
      {
        "term": "MUFA (Monounsaturated)",
        "text": "Oleic acid (18:1). Found in olive oil, canola oil, peanuts, groundnut oil. Cardioprotective."
      },
      {
        "term": "PUFA (Polyunsaturated)",
        "text": "Linoleic (18:2) and Linolenic (18:3) acids. Found in sunflower, safflower, soybean oils, fish oil."
      }
    ],
    "memoryHook": "SFA = Solid & Stiff; MUFA = Mild & Heart-Friendly; PUFA = Plentiful Double Bonds.",
    "diagramType": "fatsTree"
  },
  "essential-fatty-acids-diet": {
    "slug": "essential-fatty-acids-diet",
    "unitNumber": 3,
    "unitTitle": "Unit 3: Fats & Essential Fatty Acids",
    "lessonNumber": 2,
    "totalLessonsInUnit": 2,
    "title": "Essential Fatty Acids (Omega-3/6) & Health",
    "category": "Lipids & Nutrition",
    "icon": "🐟",
    "summary": "Linoleic, Arachidonic, EPA & DHA roles in cell membrane fluidity, brain development, and eicosanoid synthesis.",
    "prevSlug": "fats-classification",
    "nextSlug": null,
    "isUnitFinal": true,
    "quizSlug": "unit-nut-3-fats",
    "overview": "Essential fatty acids cannot be synthesized de novo in humans due to lack of Δ12 and Δ15 desaturases and must be supplied in food.",
    "keyDefinitions": [
      {
        "term": "Linoleic Acid (Omega-6)",
        "text": "Abundant in safflower (75%), sunflower, corn, and sesame oils."
      },
      {
        "term": "Arachidonic Acid",
        "text": "Synthesized conditionally from linoleic acid; precursor of prostaglandins and leukotrienes."
      },
      {
        "term": "EPA & DHA (Omega-3)",
        "text": "Found in cold-water oily fish (sardines, salmon); crucial for fetal brain and retinal development."
      }
    ],
    "memoryHook": "Omega-3 = Anti-inflammatory & Brain; Omega-6 = Skin integrity & Cellular signaling.",
    "diagramType": "efaPathways"
  },
  "calcium-metabolism": {
    "slug": "calcium-metabolism",
    "unitNumber": 4,
    "unitTitle": "Unit 4: Minerals & Vitamins",
    "lessonNumber": 1,
    "totalLessonsInUnit": 3,
    "title": "Calcium Homeostasis & Physiological Functions",
    "category": "Minerals",
    "icon": "🥛",
    "summary": "99% skeletal storage, neuromuscular excitability, blood clotting factor IV, calcitriol/PTH regulation.",
    "prevSlug": null,
    "nextSlug": "iodine-nutrition",
    "overview": "Calcium is the most abundant cation in the human body (1000–1200g in adults). RDA is 1000 mg/day (1200 mg in pregnancy & lactation).",
    "keyDefinitions": [
      {
        "term": "Bone Mineralization",
        "text": "Forms hydroxyapatite crystals [Ca10(PO4)6(OH)2] alongside phosphorus."
      },
      {
        "term": "Coagulation Factor IV",
        "text": "Essential for prothrombinase complex activation and fibrin clot stabilization."
      },
      {
        "term": "Neuromuscular Excitability",
        "text": "Ionized Ca2+ prevents tetany; hypocalcemia causes Chvostek and Trousseau signs."
      }
    ],
    "memoryHook": "CALCIUM: Clotting, Action potential, Living bone, Contraction of heart, Ionized balance, Uptake via D.",
    "diagramType": "calciumRegulation"
  },
  "iodine-nutrition": {
    "slug": "iodine-nutrition",
    "unitNumber": 4,
    "unitTitle": "Unit 4: Minerals & Vitamins",
    "lessonNumber": 2,
    "totalLessonsInUnit": 3,
    "title": "Iodine Metabolism, Thyroid Hormones & Goitre",
    "category": "Minerals",
    "icon": "🧂",
    "summary": "T3/T4 synthesis, BMR regulation, Endemic Goitre, Cretinism, and universal salt iodization.",
    "prevSlug": "calcium-metabolism",
    "nextSlug": "vitamins-overview",
    "overview": "Iodine is an essential trace element concentrated in the thyroid gland. Adult RDA is 150 mcg/day (220 mcg in pregnancy, 290 mcg in lactation).",
    "keyDefinitions": [
      {
        "term": "Thyroid Hormone Synthesis",
        "text": "Required for Thyroxine (T4) and Triiodothyronine (T3) production."
      },
      {
        "term": "Deficiency Disorders",
        "text": "Simple Endemic Goitre, Congenital Hypothyroidism, Cretinism with mental retardation."
      },
      {
        "term": "Salt Iodization",
        "text": "Universal iodization of edible salt at 30 ppm production / 15 ppm consumer level."
      }
    ],
    "memoryHook": "IODINE: Influences Oxidation, Determines Infant Neurodevelopment, Eliminates Goitre.",
    "diagramType": "thyroidFeedback"
  },
  "vitamins-overview": {
    "slug": "vitamins-overview",
    "unitNumber": 4,
    "unitTitle": "Unit 4: Minerals & Vitamins",
    "lessonNumber": 3,
    "totalLessonsInUnit": 3,
    "title": "Vitamins: Fat-Soluble (ADEK) & Water-Soluble (B, C)",
    "category": "Vitamins",
    "icon": "💊",
    "summary": "Vitamins A (retinol/vision), D (bone), E (antioxidant), K (clotting), B-complex (metabolic coenzymes), and Vitamin C (collagen).",
    "prevSlug": "iodine-nutrition",
    "nextSlug": null,
    "isUnitFinal": true,
    "quizSlug": "unit-nut-4-minerals",
    "overview": "Vitamins are vital organic micronutrients. Fat-soluble (ADEK) are stored in liver/adipose; water-soluble (B & C) are excreted in urine.",
    "keyDefinitions": [
      {
        "term": "Vitamin A",
        "text": "Rhodopsin formation for dim-light vision; prevents night blindness & xerophthalmia."
      },
      {
        "term": "Vitamin D",
        "text": "Calcitriol stimulates intestinal Ca absorption; prevents rickets & osteomalacia."
      },
      {
        "term": "Vitamin C",
        "text": "Prolyl/lysyl hydroxylase cofactor in collagen; powerful antioxidant; prevents scurvy."
      },
      {
        "term": "Vitamin B12 & Folate",
        "text": "One-carbon transfers & DNA synthesis; prevents megaloblastic anemia & neural tube defects."
      }
    ],
    "memoryHook": "ADEK in Fat, B & C in Water; Sunshine brings D, Citrus brings C, Leaves bring K & Folate.",
    "diagramType": "vitaminsGrid"
  },
  "menu-planning-principles": {
    "slug": "menu-planning-principles",
    "unitNumber": 5,
    "unitTitle": "Unit 5: Balanced Diet & Lifecycle Planning",
    "lessonNumber": 1,
    "totalLessonsInUnit": 4,
    "title": "Menu Planning: 3 Steps & 11 Core Principles",
    "category": "Meal Planning",
    "icon": "🍱",
    "summary": "RDA assessment, ICMR food lists, food exchange system, disease adaptation, cultural acceptability, and satiety.",
    "prevSlug": null,
    "nextSlug": "infant-feeding-iycf",
    "overview": "Meal planning is the application of nutritional knowledge and food preferences to design wholesome, attractive, balanced meals.",
    "keyDefinitions": [
      {
        "term": "Step 1: Identify RDA",
        "text": "Determine energy, protein, and micronutrient allowances for the target individual."
      },
      {
        "term": "Step 2: Food Selection",
        "text": "Select proportional items from all 5 food groups using food exchange lists."
      },
      {
        "term": "Step 3: Meal Distribution",
        "text": "Convert food lists into appetizing recipes across breakfast, lunch, tea, and dinner."
      }
    ],
    "memoryHook": "P-L-A-N-S: Proportion, Lifecycle needs, Affordability, Nutrient retention, Satiety.",
    "diagramType": "menuPlanningSteps"
  },
  "infant-feeding-iycf": {
    "slug": "infant-feeding-iycf",
    "unitNumber": 5,
    "unitTitle": "Unit 5: Balanced Diet & Lifecycle Planning",
    "lessonNumber": 2,
    "totalLessonsInUnit": 4,
    "title": "Infant & Young Child Feeding (IYCF) & Breastfeeding",
    "category": "Infant Nutrition",
    "icon": "🍼",
    "summary": "Colostrum, exclusive breastfeeding for 6 months, complementary weaning foods, and maternal-child benefits.",
    "prevSlug": "menu-planning-principles",
    "nextSlug": "lifecycle-diet-plans",
    "overview": "IYCF guidelines promote optimal growth and reduce infant mortality. Colostrum provides rich secretory IgA antibodies and lactoferrin.",
    "keyDefinitions": [
      {
        "term": "Colostrum",
        "text": "First milk secreted for 2–3 days post-delivery; rich in antibodies, protein, and vitamin A."
      },
      {
        "term": "Exclusive Breastfeeding",
        "text": "Only breast milk for the first 6 months of life (no water or supplementary milk)."
      },
      {
        "term": "Complementary Feeding",
        "text": "Nutrient-dense mashed semi-solids introduced at 6 months alongside continued breastfeeding."
      }
    ],
    "memoryHook": "BREAST: Best immunity, Reduces allergies, Emotional bond, Always ready, SIDS halved, Targeted nutrition.",
    "diagramType": "iycfTimeline"
  },
  "lifecycle-diet-plans": {
    "slug": "lifecycle-diet-plans",
    "unitNumber": 5,
    "unitTitle": "Unit 5: Balanced Diet & Lifecycle Planning",
    "lessonNumber": 3,
    "totalLessonsInUnit": 4,
    "title": "Lifecycle Balanced Diet Plans (Preschool to Elderly)",
    "category": "Lifecycle Nutrition",
    "icon": "🍽️",
    "summary": "Formulating tailored diet plans with RDAs for Preschool (1-6y), School-age (7-12y), Adolescents, Elderly (60+), and Lactation.",
    "prevSlug": "infant-feeding-iycf",
    "nextSlug": "anemia-management",
    "overview": "Nutritional needs evolve across life stages: rapid growth spurts in children/teens, +500 kcal in lactation, and easily digestible soft foods in elderly.",
    "keyDefinitions": [
      {
        "term": "Preschool Child (1–6y)",
        "text": "1240–1690 kcal, 22–30g protein. Requires small, frequent, colorful, nutrient-dense meals."
      },
      {
        "term": "Adolescents (13–18y)",
        "text": "Peak growth spurt: Boys 2450–2640 kcal, Girls 2060 kcal; high calcium and iron needs."
      },
      {
        "term": "Lactating Mother",
        "text": "Requires +500 kcal extra (Total ~2575 kcal, 75g protein) with galactagogues (fennel, legumes, oats)."
      },
      {
        "term": "Elderly (60+y)",
        "text": "Decreased BMR; soft, high-fiber, low-sodium meals with adequate hydration and vitamin D."
      }
    ],
    "memoryHook": "Age-Stages: Preschool (Finger foods), Teens (High protein & iron), Lactation (Galactagogues), Elderly (Soft & fiber).",
    "diagramType": "lifecycleGrid"
  },
  "anemia-management": {
    "slug": "anemia-management",
    "unitNumber": 5,
    "unitTitle": "Unit 5: Balanced Diet & Lifecycle Planning",
    "lessonNumber": 4,
    "totalLessonsInUnit": 4,
    "title": "Nutritional Anemia: Etiology, WHO Prophylaxis & Care",
    "category": "Clinical Nutrition",
    "icon": "🩸",
    "summary": "Iron/folate/B12 deficiency, maternal-fetal complications (IUGR, PPH), WHO 60mg Fe + 400mcg Folate regimen, and nursing care.",
    "prevSlug": "lifecycle-diet-plans",
    "nextSlug": null,
    "isUnitFinal": true,
    "quizSlug": "unit-nut-5-balanced-diet",
    "overview": "Nutritional anemia is marked by hemoglobin <11 g/dL in pregnancy and <12 g/dL in non-pregnant women, resulting from inadequate iron/folate intake or hookworm infestation.",
    "keyDefinitions": [
      {
        "term": "WHO Prophylaxis",
        "text": "60 mg elemental iron + 400 mcg folic acid daily for 6 months in pregnancy (>40% prevalence: add 3 months)."
      },
      {
        "term": "Maternal Risks",
        "text": "Preterm labor, preeclampsia, postpartum hemorrhage (PPH), heart failure, puerperal sepsis."
      },
      {
        "term": "Fetal Risks",
        "text": "Intrauterine growth retardation (IUGR), low birth weight (<2.5kg), infant anemia, stillbirth."
      }
    ],
    "memoryHook": "IRON: Ingest heme sources, Remember vitamin C, Omit tea/coffee with meals, Never skip IFA tablets.",
    "diagramType": "anemiaCycle"
  },
  "pem-nursing-care": {
    "slug": "pem-nursing-care",
    "unitNumber": 6,
    "unitTitle": "Unit 6: Deficiency Disorders & PEM",
    "lessonNumber": 1,
    "totalLessonsInUnit": 3,
    "title": "Protein Energy Malnutrition (PEM) & 3-Tier Nursing Care",
    "category": "Nutritional Deficiency",
    "icon": "⚠️",
    "summary": "Etiology of PEM, vicious cycle of infection-malnutrition, and the 3 tiers of nursing intervention: Promotion, Protection, Rehabilitation.",
    "prevSlug": null,
    "nextSlug": "kwashiorkor-vs-marasmus",
    "overview": "PEM is an imbalance between nutrient supply and bodily demand for growth and repair, representing a leading cause of child morbidity and mortality in developing nations.",
    "nursingTiers": [
      {
        "tier": "Tier 1: Health Promotion",
        "actions": "Exclusive breastfeeding for 6 months, promoting NIN Nutritious Laddus (330 kcal, 11g protein), family spacing."
      },
      {
        "tier": "Tier 2: Specific Protection",
        "actions": "High quality protein (3–4 g/kg/day), full immunization, Vitamin A megadose prophylaxis, deworming, ORS."
      },
      {
        "tier": "Tier 3: Nutritional Rehabilitation",
        "actions": "Gradual feeding (liquid → semi-solid → soft familiar foods), monitoring catch-up growth, managing hypothermia."
      }
    ],
    "memoryHook": "3-P Strategy: Promote breastmilk, Protect with vaccines & protein, Provide gradual refeeding.",
    "diagramType": "pemCycle"
  },
  "kwashiorkor-vs-marasmus": {
    "slug": "kwashiorkor-vs-marasmus",
    "unitNumber": 6,
    "unitTitle": "Unit 6: Deficiency Disorders & PEM",
    "lessonNumber": 2,
    "totalLessonsInUnit": 3,
    "title": "Kwashiorkor vs. Marasmus: Differential Clinical Diagnosis",
    "category": "Clinical Assessment",
    "icon": "👶",
    "summary": "Comprehensive comparison across 10 hallmark signs: pitting edema, moon face, flag sign hair, monkey face, muscle wasting.",
    "prevSlug": "pem-nursing-care",
    "nextSlug": "childhood-obesity",
    "overview": "Kwashiorkor is severe protein deficiency with adequate calories; Marasmus is severe deficiency of both calories and protein.",
    "diffTable": [
      {
        "param": "Primary Deficiency",
        "kwash": "Severe Protein Deficiency",
        "maras": "Severe Calorie + Protein Deficiency"
      },
      {
        "param": "Age Group",
        "kwash": "1 to 4 years (post-weaning)",
        "maras": "Infants under 1 year"
      },
      {
        "param": "Edema",
        "kwash": "Present (pitting edema of feet, hands, face)",
        "maras": "Absent"
      },
      {
        "param": "Subcutaneous Fat",
        "kwash": "Preserved (hidden under edema)",
        "maras": "Severe loss ('skin and bone')"
      },
      {
        "param": "Facial Appearance",
        "kwash": "Moon Face (puffy, edematous)",
        "maras": "Monkey Face / Old Man (wrinkled)"
      },
      {
        "param": "Mental State",
        "kwash": "Apathetic, irritable, lethargic",
        "maras": "Alert, fretful, hungry"
      },
      {
        "param": "Appetite",
        "kwash": "Poor / Anorexic",
        "maras": "Good / Voracious"
      },
      {
        "param": "Hair & Skin",
        "kwash": "Crazy-pavement dermatosis, Flag sign hair",
        "maras": "Dry skin, no specific dermatosis"
      },
      {
        "param": "Hepatomegaly",
        "kwash": "Present (fatty liver infiltration)",
        "maras": "Absent"
      }
    ],
    "memoryHook": "Kwashiorkor = King with Puffy Crown (Edema + Moon Face); Marasmus = Muscle & Fat Wasted Away.",
    "diagramType": "kwashVsMarasmus"
  },
  "childhood-obesity": {
    "slug": "childhood-obesity",
    "unitNumber": 6,
    "unitTitle": "Unit 6: Deficiency Disorders & PEM",
    "lessonNumber": 3,
    "totalLessonsInUnit": 3,
    "title": "Childhood Obesity: Classification & Dietary Modification",
    "category": "Overnutrition",
    "icon": "⚖️",
    "summary": "CDC BMI percentile criteria, contributing lifestyle factors, and pediatric dietary/behavioral interventions.",
    "prevSlug": "kwashiorkor-vs-marasmus",
    "nextSlug": null,
    "isUnitFinal": true,
    "quizSlug": "unit-nut-6-deficiencies",
    "overview": "Childhood obesity is diagnosed when BMI ≥95th percentile for age and sex on CDC growth charts; 85th–95th percentile indicates overweight.",
    "keyDefinitions": [
      {
        "term": "Class 1 Obesity",
        "text": "BMI 30 to <35 kg/m² in adults or ≥95th percentile in children."
      },
      {
        "term": "Contributing Factors",
        "text": "Ultra-processed foods, missed breakfast, sugary beverages, sedentary screen time."
      },
      {
        "term": "Behavioral Management",
        "text": "Mindful family dining, 60 minutes daily active exercise, zero sugary drinks."
      }
    ],
    "memoryHook": "5-2-1-0 Rule: 5 servings fruits/veg, 2h max screen time, 1h active exercise, 0 sugary drinks.",
    "diagramType": "obesityPyramid"
  },
  "therapeutic-dm-athero": {
    "slug": "therapeutic-dm-athero",
    "unitNumber": 7,
    "unitTitle": "Unit 7: Therapeutic Diets & Clinical Nutrition",
    "lessonNumber": 1,
    "totalLessonsInUnit": 5,
    "title": "Dietary Management of Diabetes Mellitus & Atherosclerosis",
    "category": "Metabolic & Cardiac",
    "icon": "🩺",
    "summary": "Glycemic control, Step I/II cardiac diets, saturated fat restriction (<7%), and soluble fiber inclusion.",
    "prevSlug": null,
    "nextSlug": "hypertension-sodium-diet",
    "overview": "Medical Nutrition Therapy (MNT) stabilizes blood glucose, reduces LDL cholesterol, and minimizes vascular complications.",
    "keyDefinitions": [
      {
        "term": "Diabetes MNT",
        "text": "Complex carbohydrates (55-60%), high soluble fiber (25-35g), low glycemic index foods; avoid simple sugars."
      },
      {
        "term": "Atherosclerosis Step II Diet",
        "text": "Saturated fat <7% of calories, cholesterol <200mg/day, eliminate trans fats, increase PUFA/MUFA."
      }
    ],
    "memoryHook": "D-M-A-T-H: Decreased sugars, Moderate lean protein, Avoid trans fats, Total calories controlled, High soluble fiber.",
    "diagramType": "cardioDietPlate"
  },
  "hypertension-sodium-diet": {
    "slug": "hypertension-sodium-diet",
    "unitNumber": 7,
    "unitTitle": "Unit 7: Therapeutic Diets & Clinical Nutrition",
    "lessonNumber": 2,
    "totalLessonsInUnit": 5,
    "title": "Hypertension & 4-Tier Sodium Restricted Diets",
    "category": "Cardiovascular Diet",
    "icon": "💓",
    "summary": "DASH diet principles, potassium/magnesium vasodilators, and 4 clinical tiers of sodium restriction (Extreme to Mild).",
    "prevSlug": "therapeutic-dm-athero",
    "nextSlug": "renal-therapeutic-diets",
    "overview": "Sodium restriction reduces plasma volume and peripheral resistance. DASH diet emphasizes potassium and calcium-rich foods.",
    "keyDefinitions": [
      {
        "term": "Extreme Restriction (200–300 mg/d)",
        "text": "Used in Cirrhosis with Ascites and Severe Congestive Heart Failure; no salt in cooking."
      },
      {
        "term": "Severe Restriction (500–700 mg/d)",
        "text": "Used in Congestive Heart Failure; strict selection of low-sodium natural foods."
      },
      {
        "term": "Moderate Restriction (1000–1500 mg/d)",
        "text": "Used in Essential Hypertension; no added salt during food preparation."
      },
      {
        "term": "Mild Restriction (2000–3000 mg/d)",
        "text": "Used in Borderline HTN; some salt permitted in cooking, avoid salted snacks/pickles."
      }
    ],
    "memoryHook": "DASH = Diet Approaching Sodium Halved (High Potassium, Low Sodium).",
    "diagramType": "sodiumTiers"
  },
  "renal-therapeutic-diets": {
    "slug": "renal-therapeutic-diets",
    "unitNumber": 7,
    "unitTitle": "Unit 7: Therapeutic Diets & Clinical Nutrition",
    "lessonNumber": 3,
    "totalLessonsInUnit": 5,
    "title": "Dietary Management of Renal Disorders (Nephrotic, GN, ARF)",
    "category": "Renal Nutrition",
    "icon": "🧪",
    "summary": "Protein sparing, fluid replacement formula (urine volume + 500 mL), vegetable leaching for potassium, and phosphate restriction.",
    "prevSlug": "hypertension-sodium-diet",
    "nextSlug": "gi-therapeutic-diets",
    "overview": "Renal diets preserve remaining nephron function, prevent uremic toxicity, and maintain electrolyte-fluid balance.",
    "keyDefinitions": [
      {
        "term": "Nephrotic Syndrome",
        "text": "High biological value protein (1.25g/kg in adults, 2g/kg in children), restricted sodium and fluid."
      },
      {
        "term": "Glomerulonephritis",
        "text": "Low protein, sodium restricted (500-1000mg), potassium reduction via leaching of vegetables."
      },
      {
        "term": "Acute Renal Failure (ARF)",
        "text": "Protein 0.6–1.0 g/kg in non-dialyzed; fluid allowance = urine output + 500 mL/day."
      }
    ],
    "memoryHook": "RENAL: Restrict fluid (Output + 500ml), Eliminate excess potassium (Leaching), Non-protein calories, Adjust protein, Limit sodium.",
    "diagramType": "renalFluidFormula"
  },
  "gi-therapeutic-diets": {
    "slug": "gi-therapeutic-diets",
    "unitNumber": 7,
    "unitTitle": "Unit 7: Therapeutic Diets & Clinical Nutrition",
    "lessonNumber": 4,
    "totalLessonsInUnit": 5,
    "title": "GI Disorders: Jaundice, Diarrhea, ORS & Constipation",
    "category": "Gastrointestinal",
    "icon": "🫕",
    "summary": "Fat restriction in Jaundice, WHO/UNICEF ORS composition, soluble/insoluble fiber in constipation.",
    "prevSlug": "renal-therapeutic-diets",
    "nextSlug": "surgical-underweight-nutrition",
    "overview": "GI diets rest inflamed mucosa, replenish water-electrolyte losses in diarrhea, and restore normal colonic transit.",
    "keyDefinitions": [
      {
        "term": "Jaundice Diet",
        "text": "Low fat, high carbohydrate, moderate protein; avoid butter, clarified ghee, eggs, and rich gravies."
      },
      {
        "term": "WHO / UNICEF ORS",
        "text": "Glucose 20g/L, Sodium Chloride 3.5g/L, Potassium Chloride 1.5g/L, Sodium Bicarbonate/Citrate 2.5g/L."
      },
      {
        "term": "Constipation Diet",
        "text": "Liberal fluids (8–10 glasses), whole grain roughage, wheat bran, warm morning fluid."
      }
    ],
    "memoryHook": "ORS = Oral Rehydration Savior (Glucose + Salt + Potassium + Water).",
    "diagramType": "whoOrsFormula"
  },
  "surgical-underweight-nutrition": {
    "slug": "surgical-underweight-nutrition",
    "unitNumber": 7,
    "unitTitle": "Unit 7: Therapeutic Diets & Clinical Nutrition",
    "lessonNumber": 5,
    "totalLessonsInUnit": 5,
    "title": "Pre/Post-Operative Nutrition & Underweight Diet Plans",
    "category": "Surgical & Therapeutic",
    "icon": "🩹",
    "summary": "Pre-op protein loading (65–100g/d), post-op wound healing (Vitamin C, Zinc), and high-calorie 2200 kcal underweight diet chart.",
    "prevSlug": "gi-therapeutic-diets",
    "nextSlug": null,
    "isUnitFinal": true,
    "quizSlug": "unit-nut-7-therapeutic",
    "overview": "Optimizing perioperative nutrition prevents surgical site infections, promotes collagen cross-linking, and accelerates recovery.",
    "keyDefinitions": [
      {
        "term": "Pre-Op Protein Loading",
        "text": "65–100 g/day for 1–2 weeks prior to surgery to build lean tissue reserves."
      },
      {
        "term": "Post-Op Wound Healing",
        "text": "High protein, Vitamin C for prolyl hydroxylation, Zinc for re-epithelialization, early ambulation."
      },
      {
        "term": "Underweight Diet Plan (2200 kcal)",
        "text": "Energy-dense snacks (banana shakes, peanut butter, whole milk, boiled eggs, nuts)."
      }
    ],
    "memoryHook": "SURGERY: Stock protein early, Upgrade Vitamin C, Rehydrate, Gradual refeeding, Evaluate weight.",
    "diagramType": "surgicalTimeline"
  },
  "11-cooking-methods": {
    "slug": "11-cooking-methods",
    "unitNumber": 8,
    "unitTitle": "Unit 8: Cookery Rules & Preservation",
    "lessonNumber": 1,
    "totalLessonsInUnit": 2,
    "title": "11 Cooking Methods: Principles, Merits & Demerits",
    "category": "Cookery Science",
    "icon": "🍳",
    "summary": "Boiling (100°C), Steaming, Poaching (80-85°C), Stewing, Pressure cooking, Solar cooking, Frying, Roasting, Baking, Grilling, Microwave.",
    "prevSlug": null,
    "nextSlug": "nutrient-preservation",
    "overview": "Cooking improves digestibility, destroys pathogens, and enhances flavor through moist heat, dry heat, or radiant energy.",
    "keyDefinitions": [
      {
        "term": "Moist Heat Methods",
        "text": "Boiling, Steaming (least nutrient loss), Poaching (80–85°C), Stewing (retains broth), Pressure cooking (>100°C)."
      },
      {
        "term": "Dry Heat Methods",
        "text": "Roasting (dry pan), Baking (oven 120–260°C), Grilling (direct radiation)."
      },
      {
        "term": "Fat & Modern Methods",
        "text": "Shallow/Deep frying, Solar cooking (up to 140°C), Microwave (magnetron radiant waves)."
      }
    ],
    "memoryHook": "COOK: Controlled temperature, Optimal retention of vitamins, Organized hygiene, Keep broth.",
    "diagramType": "cookingMethodsGrid"
  },
  "nutrient-preservation": {
    "slug": "nutrient-preservation",
    "unitNumber": 8,
    "unitTitle": "Unit 8: Cookery Rules & Preservation",
    "lessonNumber": 2,
    "totalLessonsInUnit": 2,
    "title": "Cookery Rules, Nutrient Retention & Storage",
    "category": "Food Preservation",
    "icon": "🥦",
    "summary": "Washing before peeling, water-soluble vitamin protection, proper refrigeration (40°F), and preventing oxidation.",
    "prevSlug": "11-cooking-methods",
    "nextSlug": null,
    "isUnitFinal": true,
    "quizSlug": "unit-nut-8-cookery",
    "overview": "Improper food preparation can destroy up to 60% of B-complex vitamins and Vitamin C. Following cookery rules conserves bioavailable nutrients.",
    "keyDefinitions": [
      {
        "term": "Wash Before Peeling",
        "text": "Never wash cut vegetables in excess water to avoid leaching water-soluble vitamins."
      },
      {
        "term": "Cover Pan While Cooking",
        "text": "Prevents oxidative loss of ascorbic acid and accelerates cooking time."
      },
      {
        "term": "Optimal Storage Temperatures",
        "text": "Domestic refrigerator maintained at 40°F (4°C); Freezer at 0°F (-18°C)."
      }
    ],
    "memoryHook": "P-R-E-S-E-R-V-E: Peel thin, Retain water, Efficient steaming, Store cool, Evade overboiling.",
    "diagramType": "nutrientLossChart"
  },
  "abcd-nutritional-assessment": {
    "slug": "abcd-nutritional-assessment",
    "unitNumber": 9,
    "unitTitle": "Unit 9: Nutritional Assessment & Education",
    "lessonNumber": 1,
    "totalLessonsInUnit": 3,
    "title": "ABCD Assessment: Anthropometry, Biochemical, Clinical, Diet",
    "category": "Nutritional Assessment",
    "icon": "📏",
    "summary": "Comprehensive 4-pillar ABCD nutritional status assessment method, clinical examination signs of deficiencies.",
    "prevSlug": null,
    "nextSlug": "anthropometric-indices",
    "overview": "ABCD is the standardized global framework for diagnosing nutritional adequacy, subclinical deficiencies, and malnutrition.",
    "keyDefinitions": [
      {
        "term": "A - Anthropometry",
        "text": "Height, weight, BMI, MUAC, head circumference, skinfold thickness."
      },
      {
        "term": "B - Biochemical Tests",
        "text": "Serum albumin, hemoglobin, serum ferritin, urinary nitrogen, blood glucose."
      },
      {
        "term": "C - Clinical Signs",
        "text": "Bitot's spots (Vit A), cheilosis (B2), bleeding gums (Vit C), koilonychia (Iron), goitre (Iodine)."
      },
      {
        "term": "D - Dietary Surveys",
        "text": "24-hour dietary recall, Food Frequency Questionnaire (FFQ), weighed food records."
      }
    ],
    "memoryHook": "ABCD: Anthropometric, Biochemical, Clinical, Dietary.",
    "diagramType": "abcdFramework"
  },
  "anthropometric-indices": {
    "slug": "anthropometric-indices",
    "unitNumber": 9,
    "unitTitle": "Unit 9: Nutritional Assessment & Education",
    "lessonNumber": 2,
    "totalLessonsInUnit": 3,
    "title": "Anthropometric Indices & WHO Growth Charts",
    "category": "Assessment Methods",
    "icon": "📊",
    "summary": "Stadiometer, Infantometer, Shakir tape MUAC (<12.5 cm severe wasting), and WHO Z-score growth curves.",
    "prevSlug": "abcd-nutritional-assessment",
    "nextSlug": "ffq-biochemical-tests",
    "overview": "Anthropometry provides quantitative body measurements. In under-fives, MUAC <12.5 cm indicates severe acute malnutrition (SAM).",
    "keyDefinitions": [
      {
        "term": "Recumbent Length",
        "text": "Measured with Infantometer for children under 2 years of age."
      },
      {
        "term": "Standing Height",
        "text": "Measured with Stadiometer for children >24 months and adults."
      },
      {
        "term": "Mid-Upper Arm Circumference (MUAC)",
        "text": "Red zone (<11.5 cm) = SAM; Yellow (11.5–12.5 cm) = MAM; Green (>12.5 cm) = Normal."
      }
    ],
    "memoryHook": "MUAC Tape: Red = Danger/SAM (<11.5cm), Yellow = Moderate (<12.5cm), Green = Healthy.",
    "diagramType": "growthChart"
  },
  "ffq-biochemical-tests": {
    "slug": "ffq-biochemical-tests",
    "unitNumber": 9,
    "unitTitle": "Unit 9: Nutritional Assessment & Education",
    "lessonNumber": 3,
    "totalLessonsInUnit": 3,
    "title": "Food Frequency Questionnaire (FFQ) & Biochemical Tests",
    "category": "Dietary Tools",
    "icon": "📋",
    "summary": "FFQ 80–120 food items, Static vs Functional biochemical tests (Serum Ferritin, Albumin, GTT).",
    "prevSlug": "anthropometric-indices",
    "nextSlug": null,
    "isUnitFinal": true,
    "quizSlug": "unit-nut-9-assessment",
    "overview": "FFQs capture long-term habitual diet over months. Biochemical tests detect subclinical metabolic deficiencies before physical signs appear.",
    "keyDefinitions": [
      {
        "term": "Food Frequency Questionnaire (FFQ)",
        "text": "Pre-printed checklist of 80–120 foods assessing consumption frequency (daily, weekly, monthly)."
      },
      {
        "term": "Static Biochemical Tests",
        "text": "Direct measurement of nutrient levels (e.g. serum calcium, hemoglobin, serum ferritin)."
      },
      {
        "term": "Functional Biochemical Tests",
        "text": "Assessment of nutrient-dependent enzymatic activity (e.g. Oral Glucose Tolerance Test)."
      }
    ],
    "memoryHook": "FFQ = Frequency of Food Quantified; Biochem = Blood biomarkers before Body signs.",
    "diagramType": "ffqProcess"
  },
  "national-nutrition-programs": {
    "slug": "national-nutrition-programs",
    "unitNumber": 10,
    "unitTitle": "Unit 10: National Programs & Food Safety",
    "lessonNumber": 1,
    "totalLessonsInUnit": 3,
    "title": "Major Nutrition Problems in India & National Programs",
    "category": "Public Health",
    "icon": "🏛️",
    "summary": "PEM, Micronutrient Deficiencies, ICDS, Mid-Day Meal Programme (1962-63), National Goitre Control (1962), Anemia Mukt Bharat.",
    "prevSlug": null,
    "nextSlug": "fluorosis-lathyrism",
    "overview": "National programs address malnutrition across vulnerable demographics through supplementary nutrition, school feeding, and micronutrient fortification.",
    "keyDefinitions": [
      {
        "term": "Mid-Day Meal Scheme (1962-63)",
        "text": "Provides hot cooked meal supplying 450 kcal and 12g protein in primary schools."
      },
      {
        "term": "ICDS Scheme",
        "text": "Integrated Child Development Services providing supplementary nutrition, immunization, and preschool education."
      },
      {
        "term": "National Nutrition Mission (POSHAN Abhiyaan)",
        "text": "Holistic convergence initiative launched to reduce stunting, wasting, and anemia."
      }
    ],
    "memoryHook": "P-R-O-G-R-A-M: POSHAN, Replenish iron, Optimal iodization, Growth monitoring, Reach schools, Aid mothers.",
    "diagramType": "nationalProgramsTree"
  },
  "fluorosis-lathyrism": {
    "slug": "fluorosis-lathyrism",
    "unitNumber": 10,
    "unitTitle": "Unit 10: National Programs & Food Safety",
    "lessonNumber": 2,
    "totalLessonsInUnit": 3,
    "title": "Endemic Fluorosis & Neurolathyrism (Kesari Dal)",
    "category": "Toxicology & Deficiencies",
    "icon": "⚠️",
    "summary": "Dental & skeletal fluorosis (Genu valgum), Kesari Dal neurotoxin ODAP (BOAA) causing spastic paraplegia of legs.",
    "prevSlug": "national-nutrition-programs",
    "nextSlug": "food-hygiene-fssai",
    "overview": "Endemic fluorosis results from excess fluoride in drinking water (>1.5 ppm). Neurolathyrism is caused by consuming grass pea (Lathyrus sativus) containing ODAP.",
    "keyDefinitions": [
      {
        "term": "Dental & Skeletal Fluorosis",
        "text": "Mottled brown enamel, chalky white teeth, calcification of ligaments, Genu valgum (knock knees)."
      },
      {
        "term": "Neurolathyrism",
        "text": "Neurotoxin ODAP (β-N-oxalyl-amino-L-alanine) damages motor neurons leading to irreversible spastic paraplegia."
      },
      {
        "term": "Prevention Strategies",
        "text": "Nalgonda defluoridation technique for water; banning or parboiling/steeping Kesari dal before cooking."
      }
    ],
    "memoryHook": "Fluoride = Mottled Teeth & Stiff Bones; Kesari Dal = ODAP Toxin & Leg Paralysis.",
    "diagramType": "toxicPathways"
  },
  "food-hygiene-fssai": {
    "slug": "food-hygiene-fssai",
    "unitNumber": 10,
    "unitTitle": "Unit 10: National Programs & Food Safety",
    "lessonNumber": 3,
    "totalLessonsInUnit": 3,
    "title": "Food Hygiene, Contamination & FSSAI Standards",
    "category": "Food Safety",
    "icon": "🛡️",
    "summary": "Danger zone temperature (40°–140°F), 20-second handwash, pasteurization, AGMARK, FSSAI Act 2006 (operational 2011).",
    "prevSlug": "fluorosis-lathyrism",
    "nextSlug": null,
    "isUnitFinal": true,
    "quizSlug": "unit-nut-10-programs",
    "overview": "Food hygiene prevents biological (Salmonella, Campylobacter), chemical, and physical food contamination across the food chain.",
    "keyDefinitions": [
      {
        "term": "Danger Zone Temperature",
        "text": "40°F to 140°F (4°C to 60°C) where foodborne bacteria multiply most rapidly."
      },
      {
        "term": "20-Second Handwash Rule",
        "text": "Minimum duration to scrub hands under running water with soap before handling food."
      },
      {
        "term": "FSSAI Act 2006",
        "text": "Food Safety and Standards Authority of India (operationalized August 5, 2011)."
      },
      {
        "term": "AGMARK & ISI",
        "text": "National quality certification standards for agricultural produce and processed foods."
      }
    ],
    "memoryHook": "F-S-S-A-I: Food Safety Standards Authority of India; Keep Cold (<40°F), Keep Hot (>140°F).",
    "diagramType": "foodSafetyShield"
  }
};
