// Complete Official Nutrition & Dietetics Curriculum Data (11 Units)
// Standardized for B.Sc. Nursing & Clinical Dietetics

export const NUTRITION_UNITS = [
  {
    id: "unit-1-intro-nutrition",
    unitNumber: 1,
    title: "Introduction to Nutrition & Role in Nursing",
    category: "General Nutrition",
    icon: "🥗",
    color: "from-emerald-500 to-teal-600",
    badgeColor: "bg-emerald-100 text-emerald-800 border-emerald-200",
    summary: "Science of nutrition, relationship of nutrition with health, role in disease prevention, and key nursing practice areas.",
    objectives: [
      "Define Nutrition and explain its relationship to health and bodily development.",
      "Describe the importance of Nutrition and Dietetics in nursing care.",
      "Explain the important areas in the field of nutrition where nurses utilize their skills & knowledge.",
      "Explain the relationship of good nutrition with health (WHO definition) and its role in maintaining health and preventing malnutrition."
    ],
    quizSlug: "unit-nut-1-intro",
    topics: [
      {
            "label": "1. Concept of Nutrition & Health",
            "route": "/nutrition/lesson/intro-to-nutrition"
      },
      {
            "label": "2. Role of Nutrition in Nursing",
            "route": "/nutrition/lesson/nursing-in-nutrition"
      },
      {
            "label": "3. Five Food Groups System",
            "route": "/nutrition/lesson/five-food-groups"
      }
],
    content: {
      definitions: [
        {
          term: "Nutrition",
          definition: "The science of food and its relationship to health. It is concerned with the part played by nutrients in body growth, development, energy production, tissue repair, and maintenance of optimal health."
        },
        {
          term: "Health (WHO Definition)",
          definition: "A state of complete physical, mental, and social well-being and not merely the absence of disease or infirmity."
        }
      ],
      relationshipWithHealth: [
        { title: "Growth and Development", desc: "Essential for normal physical and intellectual development throughout the human lifecycle." },
        { title: "Energy Production", desc: "Carbohydrates and fats furnish ATP energy for cellular metabolism, organ functions, and daily activities." },
        { title: "Disease Prevention & Immunity", desc: "Strengthens humoral and cellular immunity, preventing nutritional deficiencies and chronic non-communicable diseases." },
        { title: "Body Repair & Wound Healing", desc: "Proteins and micronutrients synthesize new tissues, collagen, and replace sloughed epithelial cells." },
        { title: "Mental Well-being", desc: "Nutrient-dense foods support neurotransmitter synthesis, cognitive function, and emotional resilience." },
        { title: "Longevity & Quality of Life", desc: "Healthy dietary patterns reduce morbidity and extend disease-free life expectancy." }
      ],
      nursingPracticeAreas: [
        "Health Promotion & Wellness Counseling across communities",
        "Specific Protection & Immunonutrition during vulnerability",
        "Prevention of Nutritional Deficiency Diseases (PEM, Anemia, Goiter, Xerophthalmia)",
        "Early Detection & Nutritional Surveillance (ABCD Assessment)",
        "Modification of Diets & Preparation of Therapeutic Hospital Menus",
        "Community Nutrition Education, Maternal-Child Guidance, and Home Care Discharge Planning"
      ]
    }
  },
  {
    id: "unit-2-carbs-fiber",
    unitNumber: 2,
    title: "Carbohydrates & Dietary Fibres",
    category: "Macronutrients",
    icon: "🌾",
    color: "from-amber-500 to-yellow-600",
    badgeColor: "bg-amber-100 text-amber-800 border-amber-200",
    summary: "Classification of carbohydrates (mono-, di-, tri-, polysaccharides) and therapeutic roles of soluble and insoluble dietary fibers.",
    objectives: [
      "Classify carbohydrates with chemical structure and dietary examples.",
      "Classify dietary fibres into soluble and insoluble forms.",
      "Illustrate the role of dietary fibres in the prevention and treatment of cardiovascular diseases, diabetes mellitus, constipation, and colon cancer."
    ],
    quizSlug: "unit-nut-2-carbs",
    topics: [
      {
            "label": "1. Carbohydrate Classification",
            "route": "/nutrition/lesson/carbohydrate-classification"
      },
      {
            "label": "2. Soluble vs Insoluble Fibres",
            "route": "/nutrition/lesson/dietary-fibres"
      },
      {
            "label": "3. Energy, BMR & BMI Formulas",
            "route": "/nutrition/lesson/energy-bmr-bmi"
      }
],
    content: {
      carbohydrateClassification: [
        {
          category: "Monosaccharides (Simple Sugars)",
          formula: "C_n(H₂O)_n",
          examples: "Glucose (body fuel/fruit juice), Fructose (sweetest, honey, apples), Galactose (milk lactose component)."
        },
        {
          category: "Disaccharides (2 Units)",
          formula: "C_n(H₂O)_{n-1}",
          examples: "Maltose (Glucose + Glucose, α-1,4 bond, germinating seeds), Lactose (Galactose + Glucose, β-1,4 bond, milk), Sucrose (Glucose + Fructose, table sugar, non-reducing)."
        },
        {
          category: "Trisaccharides (3 Units)",
          formula: "3 Monomer Oligomers",
          examples: "Raffinose (sugar beets, legumes), Melezitose (coniferous sap)."
        },
        {
          category: "Polysaccharides (Glycans)",
          formula: "High molecular weight polymers",
          examples: "Starch (Amylose + Amylopectin), Glycogen (animal starch), Cellulose (dietary roughage), Inulin."
        }
      ],
      dietaryFiberComparison: [
        {
          type: "Soluble Fibre",
          action: "Attracts water and forms a viscous gel in the GI tract; delays gastric emptying.",
          foodSources: "Oat bran, barley, beans, lentils, peas, apples, citrus fruits, psyllium husk.",
          clinicalBenefits: "Lowers total and LDL cholesterol by binding bile acids; slows glucose absorption to prevent postprandial glucose spikes in Diabetes."
        },
        {
          type: "Insoluble Fibre",
          action: "Adds bulk to stool and accelerates intestinal transit time through the colon.",
          foodSources: "Wheat bran, whole grain cereals, vegetables, seeds, root skins.",
          clinicalBenefits: "Prevents and treats constipation; maintains optimal luminal pH, shortens contact time with carcinogens, protecting against colon cancer."
        }
      ]
    }
  },
  {
    id: "unit-3-fats-efa",
    unitNumber: 3,
    title: "Fats, Lipids & Essential Fatty Acids (EFA)",
    category: "Macronutrients",
    icon: "🥑",
    color: "from-sky-500 to-blue-600",
    badgeColor: "bg-sky-100 text-sky-800 border-sky-200",
    summary: "Classification of fatty acids (saturated, MUFA, PUFA), essential fatty acids (Linoleic, Arachidonic, EPA/DHA), and their dietary sources.",
    objectives: [
      "Classify essential fatty acids and explain their dietary sources based on classification.",
      "Explain the types of fatty acids (Saturated, Unsaturated, Essential vs Non-essential) along with clinical examples."
    ],
    quizSlug: "unit-nut-3-fats",
    topics: [
      {
            "label": "1. Fatty Acids Classification",
            "route": "/nutrition/lesson/fats-classification"
      },
      {
            "label": "2. Essential Fatty Acids & Sources",
            "route": "/nutrition/lesson/essential-fatty-acids-diet"
      }
],
    content: {
      fattyAcidsTypes: [
        {
          type: "Saturated Fatty Acids (SFA)",
          structure: "No double bonds; solid at room temperature.",
          examples: "Palmitic acid (16C), Stearic acid (18C), Butyric acid (4C in butter). Excess intake raises LDL cholesterol."
        },
        {
          type: "Monounsaturated Fatty Acids (MUFA)",
          structure: "One double bond (cis configuration).",
          examples: "Oleic acid (18:1, n-9). Sources: Olive oil, canola oil, peanuts, avocados. Cardioprotective."
        },
        {
          type: "Polyunsaturated Fatty Acids (PUFA)",
          structure: "Two or more double bonds; includes Omega-3 and Omega-6 series.",
          examples: "Linoleic acid (18:2, n-6), α-Linolenic acid (18:3, n-3), EPA (20:5, n-3), DHA (22:6, n-3)."
        }
      ],
      efaSourcesTable: [
        { efa: "Linoleic Acid (Omega-6)", sources: "Safflower oil, sunflower oil, corn oil, soybean oil, sesame oil, groundnut oil." },
        { efa: "Arachidonic Acid (Omega-6)", sources: "Meat, poultry, egg yolk, dairy fats (synthesized conditionally from linoleic acid)." },
        { efa: "Eicosapentaenoic Acid (EPA) & DHA (Omega-3)", sources: "Cold-water oily fish (salmon, mackerel, sardine), fish oil supplements, marine algae." }
      ]
    }
  },
  {
    id: "unit-4-minerals",
    unitNumber: 4,
    title: "Minerals: Calcium & Iodine Metabolism",
    category: "Micronutrients",
    icon: "🥛",
    color: "from-purple-500 to-violet-600",
    badgeColor: "bg-purple-100 text-purple-800 border-purple-200",
    summary: "Biochemical characteristics, physiological functions, RDA, and deficiency manifestations of Calcium and Iodine.",
    objectives: [
      "Describe the physiological characteristics, distribution, and functions of Calcium.",
      "Describe the characteristics, RDA, hormonal synthesis, and metabolic functions of Iodine."
    ],
    quizSlug: "unit-nut-4-minerals",
    topics: [
      {
            "label": "1. Calcium Homeostasis & Functions",
            "route": "/nutrition/lesson/calcium-metabolism"
      },
      {
            "label": "2. Iodine & Goitre Prevention",
            "route": "/nutrition/lesson/iodine-nutrition"
      },
      {
            "label": "3. Vitamins (ADEK & B-Complex)",
            "route": "/nutrition/lesson/vitamins-overview"
      }
],
    content: {
      calciumProfile: {
        characteristics: "Most abundant mineral cation in human body (~2% of body weight, 1000–1200 g in adults, 27.5 g in infants). 99% is stored in bone and teeth as hydroxyapatite crystals; 1% resides in extracellular fluid and soft tissues.",
        functions: [
          "Bone and teeth mineralization in concert with Phosphorus and Vitamin D (Calcitriol).",
          "Neuromuscular excitability: Ionized Ca²⁺ regulates threshold for motor nerve firing and muscle contraction.",
          "Blood coagulation: Acts as Factor IV, vital for prothrombinase and clot formation.",
          "Myocardial contractility and rhythmic cardiac impulse conduction.",
          "Maintenance of capillary wall integrity and cellular membrane permeability."
        ]
      },
      iodineProfile: {
        characteristics: "Essential trace element concentrated primarily in the thyroid gland. Not synthesized in the body; must be ingested via diet (iodized salt, seafood).",
        rda: "150 mcg/day for adults; 220 mcg/day in pregnancy; 290 mcg/day in lactation.",
        functions: [
          "Obligatory component for the synthesis of thyroid hormones: Thyroxine (T4) and Triiodothyronine (T3).",
          "Regulates cellular basal metabolic rate (BMR), oxygen consumption, and tissue oxidation.",
          "Critical for normal fetal brain development, neurological myelination, and growth in children.",
          "Deficiency leads to Simple Goitre, Endemic Cretinism, and Hypothyroidism."
        ]
      }
    }
  },
  {
    id: "unit-5-balanced-diet-lifecycle",
    unitNumber: 5,
    title: "Balanced Diet, Meal Planning & Lifecycle Nutrition",
    category: "Meal Planning",
    icon: "🍱",
    color: "from-teal-500 to-emerald-600",
    badgeColor: "bg-teal-100 text-teal-800 border-teal-200",
    summary: "Principles of menu planning, infant feeding (IYCF), lifecycle diet plans (preschool, school-age, adolescents, elderly, lactation), and anemia prevention.",
    objectives: [
      "Define Menu Planning and describe the steps and 13 core principles of meal planning.",
      "Illustrate the types of baby feeding, infant feeding guidelines, IYCF purpose, and breastfeeding benefits.",
      "Formulate balanced diet plans with RDAs for Preschool, School-age (7–12 yrs), Adolescents (13–18 yrs), Elderly (60+ yrs), and Lactating mothers.",
      "Explain the etiology, maternal-fetal complications, WHO prophylaxis guidelines, and comprehensive nursing management of Anemia."
    ],
    quizSlug: "unit-nut-5-balanced-diet",
    topics: [
      {
            "label": "1. Menu Planning Principles",
            "route": "/nutrition/lesson/menu-planning-principles"
      },
      {
            "label": "2. Infant Feeding (IYCF)",
            "route": "/nutrition/lesson/infant-feeding-iycf"
      },
      {
            "label": "3. Lifecycle Diet Plans",
            "route": "/nutrition/lesson/lifecycle-diet-plans"
      },
      {
            "label": "4. Anemia Prevention & Care",
            "route": "/nutrition/lesson/anemia-management"
      }
],
    content: {
      mealPlanningSteps: [
        "Step 1: Identify Individual RDA (based on age, sex, physiological state, and physical activity).",
        "Step 2: Prepare Food List using ICMR 5-food group tables and Food Exchange Lists.",
        "Step 3: Distribute Food Portions and formulate recipes across meals (Breakfast, Mid-morning, Lunch, Evening Snack, Dinner, Bedtime)."
      ],
      principles: [
        "Patient disease condition & therapeutic modifications",
        "Cultural traditions, religious customs, and food habits",
        "Family composition, age distribution, and gender needs",
        "Nutrient retention & preservation during preparation",
        "Meeting total caloric, protein, and micronutrient RDAs",
        "Hygienic leftover storage & food safety",
        "Satiety value and psychological satisfaction",
        "Time, fuel, and energy economy",
        "Menu variety in color, texture, and taste",
        "Economic affordability & budgetary constraints",
        "Seasonal food availability and freshness"
      ],
      babyFeeding: {
        types: "Direct Breastfeeding (DBF), Pumping & Bottle Feeding (P&F), Formula Feeding (FF), Solid Food Complementary Feeding (SFF).",
        guidelines: "Newborn: feeds every 2–3 hours (8–12 times/day), taking 1–2 oz increasing to 2–3 oz at 2 weeks. 2 months: 4–5 oz every 3–4 hrs. 4 months: 4–6 oz. 6 months: up to 8 oz every 4–5 hrs with complementary foods.",
        benefits: "Supplies live antibodies (sIgA), reduces SIDS risk by 50%, optimal brain development via DHA, protects against otitis media, childhood diabetes, and allergies."
      },
      lifecyclePlans: [
        {
          group: "Preschool Children (1–6 Yrs)",
          rda: "1–3 yrs: 1240 kcal, 22g protein, 400mg Ca, 12mg Fe | 4–6 yrs: 1690 kcal, 30g protein, 400mg Ca, 18mg Fe.",
          samplePlan: "Early: Milk (200ml) | Breakfast: Paratha with curd OR Boiled egg with bread | Mid-morning: Fruit juice | Lunch: Rice, mixed veg, curd, chapati | Evening: Milk + biscuits | Dinner: Dal/meat, chapati, salad | Bedtime: Fruit custard."
        },
        {
          group: "School-Going Children (7–12 Yrs)",
          rda: "Cereals 270g, Pulses 35g, Green leafies 50g, Milk 250ml, Fats 25g, Sugar 40g.",
          samplePlan: "Nutrient-dense breakfast, balanced tiffin box, adequate calcium and protein for rapid skeletal growth."
        },
        {
          group: "Adolescents (13–18 Yrs)",
          rda: "13–15 yrs Boys: 2450 kcal | Girls: 2060 kcal. 16–18 yrs Boys: 2640 kcal | Girls: 2060 kcal. Milk 600ml, Cereals 400-420g.",
          samplePlan: "High protein, calcium-rich, iron-rich meals (egg/paneer, sprouts, chicken curry, green leafy salads) to support growth spurt."
        },
        {
          group: "Elderly (60+ Yrs)",
          rda: "Caloric requirement drops (1544–2280 kcal based on weight).",
          samplePlan: "Soft, easy-to-digest, high-fiber, nutrient-dense meals with adequate hydration, low sodium, and moderate calcium/vitamin D."
        },
        {
          group: "Lactating Mothers",
          rda: "Requires +500 extra kcal/day (Total 2575 kcal, 75g protein, 1000mg calcium).",
          samplePlan: "Galactagogues (fennel seeds, avocado, legumes, oats, yogurt, dried apricots, spinach, panjiri, milk with Protinex)."
        }
      ],
      anemiaCare: {
        whoProphylaxis: "60 mg elemental iron + 400 mcg folic acid daily for 6 months where prevalence <40%; extend for 3 additional months if prevalence >40%.",
        maternalRisks: "Abortions, preeclampsia, preterm labor, heart failure, uterine inertia, postpartum hemorrhage, puerperal sepsis.",
        fetalRisks: "IUGR, prematurity, low birth weight, infant iron deficiency, intrauterine death, perinatal mortality.",
        nursingCare: "Dietary education (heme iron, vitamin C enhancers, cooking in cast iron), supplement compliance, blood transfusion monitoring, activity balancing."
      }
    }
  },
  {
    id: "unit-6-nutritional-deficiencies",
    unitNumber: 6,
    title: "Nutritional Deficiency Disorders & Childhood Obesity",
    category: "Clinical Nutrition",
    icon: "⚠️",
    color: "from-rose-500 to-red-600",
    badgeColor: "bg-rose-100 text-rose-800 border-rose-200",
    summary: "Protein Energy Malnutrition (PEM), detailed differentiation between Kwashiorkor and Marasmus, 3-tier role of nurse, and pediatric obesity.",
    objectives: [
      "Enlist the etiology and dietary management of Protein Energy Malnutrition (PEM).",
      "Differentiate between Kwashiorkor and Marasmus across 10 clinical parameters.",
      "Define PEM (WHO) and explain the 3-tier Role of Nurse (Promotion, Protection, Rehabilitation).",
      "Define childhood obesity and describe dietary modifications and behavioral strategies."
    ],
    quizSlug: "unit-nut-6-deficiencies",
    topics: [
      {
            "label": "1. PEM & Role of Nurse",
            "route": "/nutrition/lesson/pem-nursing-care"
      },
      {
            "label": "2. Kwashiorkor vs Marasmus",
            "route": "/nutrition/lesson/kwashiorkor-vs-marasmus"
      },
      {
            "label": "3. Childhood Obesity Management",
            "route": "/nutrition/lesson/childhood-obesity"
      }
],
    content: {
      kwashiorkorVsMarasmus: [
        { feature: "Primary Deficiency", kwashiorkor: "Severe Protein deficiency (adequate calories)", marasmus: "Severe Calorie + Protein deficiency" },
        { feature: "Age of Onset", kwashiorkor: "1–4 years (post-weaning child)", marasmus: "Infants under 1 year" },
        { feature: "Edema", kwashiorkor: "Present (pitting edema on legs, hands, face)", marasmus: "Absent" },
        { feature: "Subcutaneous Fat", kwashiorkor: "Preserved / masked by edema", marasmus: "Severe loss ('skin and bone')" },
        { feature: "Muscle Wasting", kwashiorkor: "Mild to moderate", marasmus: "Severe ('broomstick limbs')" },
        { feature: "Facial Appearance", kwashiorkor: "Moon Face (puffy, rounded)", marasmus: "Monkey / Old Man Face (wrinkled)" },
        { feature: "Mental State", kwashiorkor: "Apathetic, lethargic, miserable", marasmus: "Alert, irritable, hungry" },
        { feature: "Appetite", kwashiorkor: "Poor / Anorexic", marasmus: "Voracious / Good appetite" },
        { feature: "Skin Changes", kwashiorkor: "Crazy-pavement dermatosis, hyperpigmentation", marasmus: "Dry, loose, wrinkled, usually no dermatosis" },
        { feature: "Hair Changes", kwashiorkor: "Flag sign, hypopigmented, sparse, brittle", marasmus: "Usually normal or mild dryness" },
        { feature: "Hepatomegaly", kwashiorkor: "Present (fatty liver infiltration)", marasmus: "Absent" }
      ],
      nurseRolePEM: [
        {
          tier: "1. Health Promotion",
          actions: "Promote exclusive breastfeeding for 6 months; educate on hygienic low-cost weaning foods (NIN Nutritious Laddus); family planning and birth spacing."
        },
        {
          tier: "2. Specific Protection",
          actions: "Provide high quality protein (3–4 g/kg/day); ensure full immunization schedule; administer Vitamin A megadoses; deworming and ORS for diarrhea."
        },
        {
          tier: "3. Nutritional Rehabilitation",
          actions: "Gradual refeeding (liquid → semi-solid → soft); monitor weight-for-height catch-up; inpatient treatment for complications; community follow-up."
        }
      ],
      childhoodObesity: {
        definition: "BMI between 85th and 95th percentile = Overweight; BMI ≥95th percentile for age and sex = Obese.",
        management: "Nutrient-dense whole foods; eliminate sugar-sweetened beverages; mindful eating (no screens during meals); 60 min daily active play."
      }
    }
  },
  {
    id: "unit-7-therapeutic-diets",
    unitNumber: 7,
    title: "Therapeutic Diets & Medical Nutrition Therapy",
    category: "Therapeutic Diets",
    icon: "🩺",
    color: "from-indigo-500 to-blue-600",
    badgeColor: "bg-indigo-100 text-indigo-800 border-indigo-200",
    summary: "Dietary management for Obesity, Diabetes, Atherosclerosis, Hypertension, Jaundice, Nephrotic Syndrome, Glomerulonephritis, Acute Renal Failure, Constipation, Diarrhea, Surgical Nutrition, and Underweight.",
    objectives: [
      "Classify obesity and describe dietary management and contributing factors.",
      "Explain the dietary management of Diabetes Mellitus and calorie calculation methods.",
      "Detail the Step I and Step II dietary management for Atherosclerosis.",
      "Classify hypertension and detail sodium restricted diets.",
      "Explain dietary principles for Jaundice, Nephrotic Syndrome, Glomerulonephritis, and ARF.",
      "Describe dietary management of Constipation, Diarrhea (WHO ORS formula), Perioperative nutrition, and Underweight."
    ],
    quizSlug: "unit-nut-7-therapeutic",
    topics: [
      {
            "label": "1. Diabetes & Atherosclerosis Diets",
            "route": "/nutrition/lesson/therapeutic-dm-athero"
      },
      {
            "label": "2. Hypertension & Sodium Diets",
            "route": "/nutrition/lesson/hypertension-sodium-diet"
      },
      {
            "label": "3. Renal Disorders Management",
            "route": "/nutrition/lesson/renal-therapeutic-diets"
      },
      {
            "label": "4. Jaundice & Diarrhea/ORS Diets",
            "route": "/nutrition/lesson/gi-therapeutic-diets"
      },
      {
            "label": "5. Surgical & Underweight Diets",
            "route": "/nutrition/lesson/surgical-underweight-nutrition"
      }
],
    content: {
      therapeuticConditions: [
        {
          condition: "Diabetes Mellitus",
          principles: "Low glycemic index, high complex carbs (55-60%), high soluble fiber (30-40g), moderate healthy fat, avoidance of simple sugars.",
          calorieFormula: "Overweight: 20 kcal/kg | Ideal: 30 kcal/kg | Underweight: 40 kcal/kg | Sedentary: 25 kcal/kg."
        },
        {
          condition: "Atherosclerosis & CVD",
          principles: "Step I Diet (SFA <10%, cholesterol <300mg) and Step II Diet (SFA <7%, cholesterol <200mg). Increase MUFA/PUFA, oats, green vegetables; restrict trans-fats."
        },
        {
          condition: "Hypertension (Sodium Restriction)",
          principles: "Extreme (200–300 mg/d), Severe (500–700 mg/d), Moderate (1000–1500 mg/d), Mild (2000–3000 mg/d). Emphasize Potassium, Magnesium, and Calcium."
        },
        {
          condition: "Jaundice & Hepatic Disorders",
          principles: "High carbohydrate for liver glycogen stores, low to zero fat initially, 8+ glasses water, honey, pineapple, milk thistle. Avoid heavy dairy, meats, eggs, and oily spices."
        },
        {
          condition: "Nephrotic Syndrome",
          principles: "Protein: 1.25 g/kg/d (adults), 2.0 g/kg/d (children) using high-biological value sources; fluid restriction (Urine output + 500 mL); sodium restricted <2 g/day."
        },
        {
          condition: "Glomerulonephritis",
          principles: "Low protein (0.5–0.8 g/kg), low potassium (leach vegetables in excess water), low sodium (500–1000 mg), phosphorus restriction (800–1200 mg/day)."
        },
        {
          condition: "Acute Renal Failure (ARF)",
          principles: "Non-dialyzed: 0.6–1.0 g protein/kg; diuretic phase: 20–40 g/d; 100g CHO minimum; fluid restricted to output + 500 mL; restrict sodium and potassium."
        },
        {
          condition: "Constipation & Diarrhea",
          principles: "Constipation: Liberal fluids (10 glasses), warm water morning, high insoluble roughage. Diarrhea: WHO ORS (Glucose 20g, NaCl 3.5g, KCl 1.5g, NaHCO₃ 2.5g/L), bland fluids, avoid raw/cold foods."
        },
        {
          condition: "Pre- & Post-Operative Nutrition",
          principles: "Pre-op: 65–100g protein/day 1–2 weeks prior to build reserves. Post-op: Early oral feeding, high protein for tissue repair, Vitamin C for collagen, Calcium & Vitamin D."
        },
        {
          condition: "Underweight Management",
          principles: "High-calorie (2000–2200+ kcal), high-protein, frequent calorie-dense snacks (smoothies, nuts, eggs, whole milk, sprouted lentils)."
        }
      ]
    }
  },
  {
    id: "unit-8-cookery-rules",
    unitNumber: 8,
    title: "Cookery Rules & Nutrient Preservation",
    category: "Food Science",
    icon: "🍳",
    color: "from-orange-500 to-amber-600",
    badgeColor: "bg-orange-100 text-orange-800 border-orange-200",
    summary: "11 Culinary cooking methods (Boiling, Poaching, Steaming, Stewing, Pressure Cooking, Solar, Frying, Roasting, Baking, Grilling, Microwave) with merits and demerits.",
    objectives: [
      "Define each cooking method and specify its temperature and operational mechanism.",
      "Explain the merits and demerits of Moist Heat, Dry Heat, Combination, and Radiation cooking methods.",
      "Describe cookery principles to minimize nutrient destruction and water-soluble vitamin leaching."
    ],
    quizSlug: "unit-nut-8-cookery",
    topics: [
      {
            "label": "1. 11 Cooking Methods",
            "route": "/nutrition/lesson/11-cooking-methods"
      },
      {
            "label": "2. Nutrient Retention & Preservation",
            "route": "/nutrition/lesson/nutrient-preservation"
      }
],
    content: {
      cookingMethods: [
        {
          method: "Boiling (100°C)",
          mechanism: "Immersing food in vigorously boiling water until tender.",
          merits: "Simple, no special equipment, uniform cooking, denatures proteins making them digestible, gelatinizes starch.",
          demerits: "Loss of water-soluble vitamins (B-complex, C), betalain pigment leaching, high fuel usage."
        },
        {
          method: "Poaching (80–85°C)",
          mechanism: "Cooking fragile foods (eggs, fish) in minimal liquid just below boiling point.",
          merits: "Zero special equipment, quick, retains delicate shapes, saves fuel.",
          demerits: "Bland flavor, risk of scorching if unmonitored, nutrient leaching."
        },
        {
          method: "Steaming (Steam >100°C)",
          mechanism: "Cooking food in steam generated from boiling water without direct liquid contact.",
          merits: "Minimal nutrient loss (no leaching), light and fluffy texture (idli, momos), zero scorching.",
          demerits: "Requires steamer equipment, not suitable for leafy green vegetables."
        },
        {
          method: "Stewing (82–90°C)",
          mechanism: "Slow simmering in a covered pot with small liquid volume.",
          merits: "Nutrients retained as cooking juices are served, tenderizes coarse fibrous meats.",
          demerits: "Time-consuming, high fuel consumption."
        },
        {
          method: "Pressure Cooking (>100°C)",
          mechanism: "Cooking under steam pressure inside a sealed pressure cooker.",
          merits: "Cuts cooking time by 70%, maximum nutrient/flavor retention, multi-tier cooking saves fuel.",
          demerits: "Cooker cost and maintenance, accidental overcooking, flavor mixing."
        },
        {
          method: "Solar Cooking (Up to 140°C)",
          mechanism: "Utilizes solar radiation trapped by black absorbing box and glass reflectors.",
          merits: "Zero fuel cost, zero burning risk, high nutrient retention, keeps food warm for hours.",
          demerits: "Dependent on clear sunlight; slow simmering only; unavailable at night/rainy days."
        },
        {
          method: "Frying (Deep vs Shallow)",
          mechanism: "Direct heat transfer via hot cooking fat/oil.",
          merits: "Extremely quick, increases caloric density, enhances crunch and flavor.",
          demerits: "Charring risk at high smoking points, high saturated fat absorption."
        },
        {
          method: "Roasting (Dry Heat)",
          mechanism: "Direct dry cooking on heated metal pan without covering.",
          merits: "Quick, enhances aroma and crunch, easy spice grinding, lowers moisture for longer shelf-life.",
          demerits: "Risk of surface scorching, denatures heat-sensitive amino acids."
        },
        {
          method: "Baking (120–260°C)",
          mechanism: "Dry convection heat within an enclosed oven.",
          merits: "Unique aroma, makes breads/cakes light and spongy, uniform bulk cooking.",
          demerits: "Oven required, precise temperature/timing skills needed."
        },
        {
          method: "Grilling (Radiant Heat)",
          mechanism: "Direct radiant heat from a red-hot surface or coals above/below food.",
          merits: "Appealing smoky flavor, minimal fat required, very fast.",
          demerits: "Requires continuous attention to prevent charring/burning."
        },
        {
          method: "Microwave Cooking",
          mechanism: "Electromagnetic radiation (magnetron) vibrating water molecules inside food.",
          merits: "10x faster, minimal nutrient loss, preserves natural vegetable color, easy reheating.",
          demerits: "No crust or browning, short time prevents deep flavor blending, unsuitable for deep frying."
        }
      ]
    }
  },
  {
    id: "unit-9-nutritional-assessment",
    unitNumber: 9,
    title: "Nutritional Assessment & Diet Surveys",
    category: "Assessment",
    icon: "📏",
    color: "from-cyan-500 to-blue-600",
    badgeColor: "bg-cyan-100 text-cyan-800 border-cyan-200",
    summary: "ABCD Assessment Framework: Clinical signs, Anthropometric indices, Biochemical static vs functional tests, and Food Frequency Questionnaires (FFQ).",
    objectives: [
      "State clinical signs of nutritional deficiencies with advantages and limitations.",
      "Illustrate anthropometric measurements: Head circumference, Recumbent length, Height, Weight, MUAC, Waist circumference, and Skinfolds.",
      "Compare biochemical static tests vs functional tests.",
      "Explain the purpose, structure (80–120 items), and administration of Food Frequency Questionnaires (FFQ)."
    ],
    quizSlug: "unit-nut-9-assessment",
    topics: [
      {
            "label": "1. ABCD Nutritional Assessment",
            "route": "/nutrition/lesson/abcd-nutritional-assessment"
      },
      {
            "label": "2. Anthropometric Indices",
            "route": "/nutrition/lesson/anthropometric-indices"
      },
      {
            "label": "3. FFQ & Biochemical Tests",
            "route": "/nutrition/lesson/ffq-biochemical-tests"
      }
],
    content: {
      clinicalSigns: [
        { deficiency: "Protein Energy Malnutrition", signs: "Edema, muscle wasting, moon face, flag sign hair, dermatosis." },
        { deficiency: "Vitamin A Deficiency", signs: "Night blindness, Bitot's spots, conjunctival xerosis, keratomalacia." },
        { deficiency: "Riboflavin (B2) Deficiency", signs: "Angular stomatitis, cheilosis, glossitis." },
        { deficiency: "Thiamine (B1) Deficiency", signs: "Beriberi, edema, calf muscle tenderness, peripheral neuropathy." },
        { deficiency: "Niacin (B3) Deficiency", signs: "Pellagra (3Ds: Dermatitis, Diarrhea, Dementia), raw beefy tongue." },
        { deficiency: "Vitamin C Deficiency", signs: "Scurvy, spongy bleeding gums, petechial hemorrhages." },
        { deficiency: "Vitamin D Deficiency", signs: "Rickets in children (rachitic rosary, bow legs), Osteomalacia in adults." },
        { deficiency: "Iron Deficiency", signs: "Pale conjunctiva, spoon-shaped nails (koilonychia), fatigue." },
        { deficiency: "Iodine Deficiency", signs: "Enlarged thyroid gland (goiter), sluggishness, cretinism." }
      ],
      anthropometryMethods: [
        { parameter: "Head Circumference", technique: "Non-stretchable tape across supraorbital ridges and occiput in children <2 yrs. Average 2 readings within 0.2 cm." },
        { parameter: "Recumbent Length", technique: "Infantometer for infants <2 yrs who cannot stand. Headboard aligned, feet pressed to footboard." },
        { parameter: "Height", technique: "Stadiometer for children >2 yrs. Heels, buttocks, and upper back touching vertical board." },
        { parameter: "Weight", technique: "Calibrated digital infant scale (<2 yrs unclothed) or balanced floor scale (>2 yrs)." },
        { parameter: "Mid-Upper Arm Circumference (MUAC)", technique: "Midpoint between acromion and olecranon. Snug tape without skin compression. Evaluates acute malnutrition." },
        { parameter: "Waist Circumference", technique: "Mid-axillary line at iliac crest. Measures central visceral adiposity and cardiovascular risk." },
        { parameter: "Skinfold Thickness", technique: "Harpenden callipers at triceps, subscapular, biceps to quantify subcutaneous body fat." }
      ],
      biochemicalTests: {
        staticTests: "Direct measurement of nutrient or metabolite concentration (e.g., serum glucose, serum ferritin, serum calcium, RBC folate).",
        functionalTests: "Assesses physiological function dependent on the nutrient (e.g., Oral Glucose Tolerance Test, Histidine load test for folate, dark adaptation for Vitamin A).",
        pros: "Detects subclinical deficiency before overt symptoms; highly objective and quantifiable.",
        cons: "Expensive, requires laboratory facilities and trained personnel, not feasible for mass community surveys."
      },
      ffqMethod: {
        purpose: "Assesses habitual frequency and portion size of 80–120 context-specific food items over the past month or year.",
        process: "Self-administered or interviewer-guided; captures dietary patterns and nutrient intake correlations with chronic diseases."
      }
    }
  },
  {
    id: "unit-10-national-programs",
    unitNumber: 10,
    title: "National Nutritional Programs & Nursing Roles",
    category: "Public Health",
    icon: "🏛️",
    color: "from-pink-500 to-rose-600",
    badgeColor: "bg-pink-100 text-pink-800 border-pink-200",
    summary: "Major nutritional problems in India, Endemic Fluorosis dental staging, Lathyrism neurotoxins (ODAP/BAPN), and Food Hygiene & FSSAI standards.",
    objectives: [
      "Classify major nutritional problems in India (PEM, Micronutrient deficiencies, Chronic diseases).",
      "Explain endemic fluorosis, endemic states in India, and dental enamel toxic manifestations.",
      "Explain the etiology of Lathyrism (grass pea / Kesari dal) and differentiate Neurolathyrism, Osteolathyrism, and Angiolathyrism.",
      "Describe the importance of food hygiene, food safety, FSSAI regulations, and the community nurse's role."
    ],
    quizSlug: "unit-nut-10-programs",
    topics: [
      {
            "label": "1. National Nutrition Problems & Programs",
            "route": "/nutrition/lesson/national-nutrition-programs"
      },
      {
            "label": "2. Endemic Fluorosis & Lathyrism",
            "route": "/nutrition/lesson/fluorosis-lathyrism"
      },
      {
            "label": "3. Food Hygiene & FSSAI Standards",
            "route": "/nutrition/lesson/food-hygiene-fssai"
      }
],
    content: {
      indianNutritionProblems: [
        "Protein Energy Malnutrition (PEM): Growth faltering, stunting, wasting, underweight in under-5 children.",
        "Micronutrient Deficiencies: Anemia (iron/folate/B12), Endemic Goiter (iodine), Xerophthalmia (Vitamin A).",
        "Chronic Non-Communicable Diseases: Rising obesity, type 2 diabetes, hypertension, and cardiovascular diseases due to dietary transition."
      ],
      fluorosisStaging: {
        states: "Worst affected: Rajasthan, Gujarat, Andhra Pradesh. Moderately affected: Punjab, Haryana, MP, Maharashtra. Mild: TN, UP, WB, Bihar, Assam.",
        dentalManifestations: [
          "Questionable: Occasional faint white spots.",
          "Very Mild: Small opaque paper-white areas on <25% tooth surface.",
          "Mild: White opacity covering 25–50% of tooth surface.",
          "Moderate: Distinct brown staining affecting >50% of surface.",
          "Severe: Widespread brown stains with discrete or confluent enamel pitting and chipping."
        ]
      },
      lathyrismTypes: [
        {
          type: "Neurolathyrism",
          cause: "Excessive consumption of Kesari dal (Lathyrus sativus) containing neurotoxin ODAP (BOAA).",
          symptoms: "Spastic paraplegia, muscle tremors, scissor gait, irreversible leg paralysis."
        },
        {
          type: "Osteolathyrism",
          cause: "BAPN toxin inhibiting lysyl oxidase, preventing collagen cross-linking.",
          symptoms: "Skeletal deformities, bone pain, kyphoscoliosis."
        },
        {
          type: "Angiolathyrism",
          cause: "BAPN toxin affecting capillary collagen.",
          symptoms: "Aortic aneurysms and vascular fragility."
        }
      ],
      foodHygiene: {
        principles: "Hand washing, preventing cross-contamination, cooking at safe internal temperatures, hygienic refrigeration, safe potable water.",
        nurseRole: "Educate mothers and food handlers; promote safe storage; detect and report foodborne outbreaks (typhoid, cholera, dysentery); enforce FSSAI food safety norms."
      }
    }
  }
];
