import { NUTRITION_99_QUESTIONS } from "./nutritionOfficialBank";
import { NUTRITION_OFFICIAL_MCQS } from "./nutritionOfficialMcqs";

const nutritionDescriptiveFrom99 = NUTRITION_99_QUESTIONS.filter(q => q.type !== "Very Short").map(q => ({
  id: `NUT-DQ-${q.srNo}`,
  srNo: q.srNo,
  unit: q.unit,
  topic: q.topic,
  type: q.type,
  question: q.question,
  answerKeyPoints: q.answerKeyPoints || [q.answer]
}));

const nutritionVeryShortFrom99 = NUTRITION_99_QUESTIONS.filter(q => q.type === "Very Short").map(q => ({
  id: `NUT-VSQ-${q.srNo}`,
  srNo: q.srNo,
  unit: q.unit,
  type: "Very Short",
  question: q.question,
  answer: q.answer || (q.answerKeyPoints ? q.answerKeyPoints.join(" ") : "")
}));

// Official Curriculum Question Bank for Nursing Biochemistry & Nutrition-Dietetics
// Contains Short Questions (5 Marks), Very Short Questions (2 Marks), and Multiple Choice Questions (MCQs) for all Curriculum Units.

export const QUESTION_BANK_UNITS = [
  // --- BIOCHEMISTRY CURRICULUM ---
  { id: "unit-1-carbs", curriculum: "biochemistry", number: 1, name: "I Carbohydrates", label: "Biochem Unit 1: Carbohydrates & Metabolism", icon: "🧬" },
  { id: "unit-2-lipids", curriculum: "biochemistry", number: 2, name: "II Lipids", label: "Biochem Unit 2: Lipids & Fatty Acids", icon: "🥑" },
  { id: "unit-3-proteins", curriculum: "biochemistry", number: 3, name: "III Proteins", label: "Biochem Unit 3: Proteins & Amino Acids", icon: "🥩" },
  { id: "unit-4-enzymes", curriculum: "biochemistry", number: 4, name: "IV Clinical Enzymology", label: "Biochem Unit 4: Clinical Enzymology & MI Biomarkers", icon: "⚡" },
  { id: "unit-5-acid-base", curriculum: "biochemistry", number: 5, name: "V Acid Base Maintenance", label: "Biochem Unit 5: Acid-Base Balance & ABGs", icon: "🧪" },
  { id: "unit-6-heme", curriculum: "biochemistry", number: 6, name: "VI Heme catabolism", label: "Biochem Unit 6: Heme Catabolism & Jaundice", icon: "🩸" },
  { id: "unit-7-organ", curriculum: "biochemistry", number: 7, name: "VII Organ Function Tests", label: "Biochem Unit 7: Organ Function Tests (Renal, Liver, Thyroid)", icon: "🔬" },
  { id: "unit-8-immuno", curriculum: "biochemistry", number: 8, name: "VIII Immunochemistry", label: "Biochem Unit 8: Immunochemistry & ELISA Assays", icon: "🛡️" },

  // --- NUTRITION & DIETETICS CURRICULUM ---
  { id: "unit-nut-1-intro", curriculum: "nutrition", number: 1, name: "Unit I Intro to Nutrition", label: "Nutri Unit 1: Introduction to Nutrition & Health", icon: "🥗" },
  { id: "unit-nut-2-carbs", curriculum: "nutrition", number: 2, name: "Unit II Carbohydrate & Fibres", label: "Nutri Unit 2: Carbohydrate & Dietary Fibres", icon: "🌾" },
  { id: "unit-nut-3-fats", curriculum: "nutrition", number: 3, name: "Unit III Fats & EFAs", label: "Nutri Unit 3: Fats & Essential Fatty Acids", icon: "🥑" },
  { id: "unit-nut-4-minerals", curriculum: "nutrition", number: 4, name: "Unit IV Minerals (Ca & I)", label: "Nutri Unit 4: Minerals (Calcium & Iodine)", icon: "🥛" },
  { id: "unit-nut-5-balanced-diet", curriculum: "nutrition", number: 5, name: "Unit V Balanced Diet & Planning", label: "Nutri Unit 5: Balanced Diet & Lifecycle Meal Planning", icon: "🍱" },
  { id: "unit-nut-6-deficiencies", curriculum: "nutrition", number: 6, name: "Unit VI Deficiency Disorders", label: "Nutri Unit 6: PEM, Kwashiorkor, Marasmus & Obesity", icon: "⚠️" },
  { id: "unit-nut-7-therapeutic", curriculum: "nutrition", number: 7, name: "Unit VII Therapeutic Diets", label: "Nutri Unit 7: Therapeutic Diets (DM, HTN, Renal, Jaundice)", icon: "🩺" },
  { id: "unit-nut-8-cookery", curriculum: "nutrition", number: 8, name: "Unit VIII Cookery Rules", label: "Nutri Unit 8: Cookery Rules & Nutrient Preservation", icon: "🍳" },
  { id: "unit-nut-9-assessment", curriculum: "nutrition", number: 9, name: "Unit IX Nutritional Assessment", label: "Nutri Unit 9: ABCD Assessment & FFQ Surveys", icon: "📏" },
  { id: "unit-nut-10-programs", curriculum: "nutrition", number: 10, name: "Unit X National Nutrition Programs", label: "Nutri Unit 10: Fluorosis, Lathyrism & Food Hygiene", icon: "🏛️" }
];

export const DESCRIPTIVE_QUESTIONS = [
  ...nutritionDescriptiveFrom99,
  // ==========================================
  // --- NUTRITION & DIETETICS CURRICULUM ---
  // ==========================================

  // UNIT I: INTRODUCTION TO NUTRITION
  {
    id: "NUT-DQ-1",
    srNo: 1,
    unit: "unit-nut-1-intro",
    topic: "Introduction to Nutrition",
    type: "Short",
    question: "Define Nutrition and explain its relationship to health.",
    answerKeyPoints: [
      "Definition: Nutrition is the science of food and its relationship to health. It is concerned with the part played by nutrients in body growth, development, energy production, tissue repair, and maintenance of optimal health.",
      "Growth and Development: Proper nutrition is essential for normal physical and intellectual development throughout the human lifecycle.",
      "Energy Production: Carbohydrates and fats furnish caloric ATP energy for daily metabolic activities and vital organ functions.",
      "Disease Prevention: Good nutrition strengthens immunity and prevents infectious diseases and chronic ailments (anemia, diabetes, cardiovascular diseases).",
      "Body Repair & Maintenance: Dietary proteins provide essential amino acids for tissue regeneration, cellular turnover, and wound healing.",
      "Mental Health & Well-being: Balanced diets optimize neurotransmitter synthesis, reduce stress, and improve cognitive performance.",
      "Longevity: Healthy eating habits increase disease-free life expectancy and overall quality of life."
    ]
  },
  {
    id: "NUT-DQ-2",
    srNo: 2,
    unit: "unit-nut-1-intro",
    topic: "Introduction to Nutrition",
    type: "Short",
    question: "Describe the importance of Nutrition and Dietetics in nursing and explain the important areas where nurses utilize their skills & knowledge.",
    answerKeyPoints: [
      "Importance in Nursing: Nurses constitute the core of the healthcare system providing holistic bedside and community care. Nutrition is a major determinant of recovery, immunity, and prevention of hospital-acquired complications.",
      "Key Clinical Areas for Nursing Application:",
      "1. Promotion of Health: Educating individuals and families on wholesome balanced diets and lifestyle choices.",
      "2. Specific Protection: Administering immunonutrition, vitamin A prophylaxis, iron-folic acid supplementation, and iodized salt awareness.",
      "3. Prevention of Nutritional Deficiencies: Preventing PEM, nutritional anemia, goitre, and vitamin deficiency states in vulnerable populations.",
      "4. Early Detection & Surveillance: Using anthropometry and clinical assessment to detect subclinical malnutrition.",
      "5. Modification of Diet: Adjusting macronutrient and micronutrient composition for acutely ill and postoperative patients.",
      "6. Preparation of Therapeutic Diets: Implementing tailored medical nutrition therapy for diabetes, hypertension, renal disorders, and hepatic failure.",
      "7. Health Education & Counseling: Guiding mothers on breastfeeding, weaning, and safe culinary practices."
    ]
  },
  {
    id: "NUT-DQ-3",
    srNo: 3,
    unit: "unit-nut-1-intro",
    topic: "Introduction to Nutrition",
    type: "Short",
    question: "Explain the relation of good nutrition with health and the role of nutrition in maintaining health.",
    answerKeyPoints: [
      "WHO Definition of Health: 'A state of complete physical, mental, and social well-being and not merely the absence of disease or infirmity.'",
      "Cornerstone of Prevention: Optimum nutrition providing all macro- and micronutrients in adequate proportions is vital for structural integrity and genetic potential.",
      "Role in Physical & Intellectual Growth: Malnutrition during pregnancy causes LBW and premature births; childhood malnutrition impairs milestones and cognitive learning capacity.",
      "Prevention of Specific Deficiencies: Prevents Kwashiorkor, Marasmus, nutritional blindness (Vitamin A), Beriberi, Goitre, and Scurvy.",
      "Resistance to Infections: Malnutrition weakens the immune barrier (e.g., predisposing to Tuberculosis), creating a vicious cycle of infection and wasting.",
      "Reduction in Morbidity & Mortality: Lowers infant mortality rate (IMR), maternal mortality rate (MMR), and general sickness rates.",
      "Prevention of Overnutrition: Prevents chronic non-communicable diseases such as obesity, Type 2 diabetes, atherosclerosis, hypertension, and gallstones."
    ]
  },

  // UNIT II: CARBOHYDRATE & FIBRES
  {
    id: "NUT-DQ-4",
    srNo: 4,
    unit: "unit-nut-2-carbs",
    topic: "Carbohydrate",
    type: "Short",
    question: "Classify carbohydrates with examples.",
    answerKeyPoints: [
      "General Empirical Formula: (CH2O)n.",
      "1. Monosaccharides (Simple Sugars): Cannot be hydrolyzed further. Trioses (Glyceraldehyde), Pentoses (Ribose), Hexoses (Glucose, Fructose, Galactose).",
      "• Glucose: Blood/body sugar, fruit juices, honey.",
      "• Fructose: Fruit sugar, sweetest carbohydrate, found in honey and apples.",
      "• Galactose: Component of milk lactose and neural glycolipids.",
      "2. Disaccharides: Two monosaccharide units joined by glycosidic bonds [Cn(H2O)n-1].",
      "• Maltose: Glucose + Glucose (α-1,4 bond, germinating seeds/amylase action).",
      "• Lactose: Galactose + Glucose (β-1,4 bond, mammalian milk).",
      "• Sucrose: Glucose + Fructose (cane/table sugar, non-reducing).",
      "3. Trisaccharides: 3 monomer units (e.g., Raffinose in sugar beets and legumes; Melezitose in tree sap).",
      "4. Polysaccharides (Glycans): High-molecular polymers (Starch in plants, Glycogen in animals, Cellulose in plant cell walls)."
    ]
  },
  {
    id: "NUT-DQ-5",
    srNo: 5,
    unit: "unit-nut-2-carbs",
    topic: "Carbohydrate",
    type: "Short",
    question: "Classify dietary fibres and illustrate the role of dietary fibres in prevention and treatment of disease.",
    answerKeyPoints: [
      "Classification of Dietary Fibres:",
      "1. Soluble Fibre: Dissolves in water to form a viscous gel. Found in oat bran, barley, nuts, seeds, beans, lentils, peas, apples, and psyllium husk.",
      "• Mechanisms: Binds bile acids and slows gastric emptying time.",
      "• Clinical Benefits: Lowers serum total and LDL cholesterol (reducing coronary artery disease risk); delays carbohydrate absorption to smooth postprandial blood glucose swings in diabetes.",
      "2. Insoluble Fibre: Does not dissolve in water; adds bulk to stool. Found in wheat bran, whole grains, and raw vegetables.",
      "• Mechanisms: Increases fecal bulk and accelerates colonic transit time; maintains optimal intestinal pH.",
      "• Clinical Benefits: Promotes regular bowel movements, treats and prevents constipation, prevents hemorrhoids and diverticular disease, and shortens carcinogen contact time to protect against colorectal cancer."
    ]
  },

  // UNIT III: FATS & ESSENTIAL FATTY ACIDS
  {
    id: "NUT-DQ-6",
    srNo: 6,
    unit: "unit-nut-3-fats",
    topic: "Fats",
    type: "Short",
    question: "Classify essential fatty acids and explain the various sources of essential fatty acids based on classification.",
    answerKeyPoints: [
      "Definition: Essential Fatty Acids (EFAs) are polyunsaturated fatty acids that cannot be synthesized de novo by humans due to lack of desaturases beyond carbon 9 and must be obtained from dietary sources.",
      "EFA Classification & Dietary Sources:",
      "1. Linoleic Acid (18:2, n-6, Omega-6): Safflower oil, sunflower oil, corn oil, soybean oil, sesame oil, groundnut oil, cotton seed oil.",
      "2. Arachidonic Acid (20:4, n-6, Omega-6): Meat, poultry, egg yolk, milk and dairy products (synthesized conditionally from linoleic acid).",
      "3. α-Linolenic Acid (18:3, n-3, Omega-3): Flaxseeds (linseed), chia seeds, walnuts, canola oil, green leafy vegetables.",
      "4. Eicosapentaenoic Acid (EPA, 20:5, n-3) & Docosahexaenoic Acid (DHA, 22:6, n-3): Cold-water marine oily fish (salmon, mackerel, tuna, sardines) and fish liver oil."
    ]
  },
  {
    id: "NUT-DQ-7",
    srNo: 7,
    unit: "unit-nut-3-fats",
    topic: "Fats",
    type: "Short",
    question: "Explain the types of fatty acids along with clinical examples.",
    answerKeyPoints: [
      "1. Saturated Fatty Acids (No double bonds): Solid at room temperature. Examples: Palmitic acid (16C), Stearic acid (18C), Butyric acid (4C in butter). Excess intake elevates LDL cholesterol.",
      "2. Unsaturated Fatty Acids (Contain double bonds, usually cis isomer):",
      "• Monounsaturated Fatty Acids (MUFA, 1 double bond): Oleic acid (18:1, n-9 in olive and canola oil). Cardioprotective.",
      "• Polyunsaturated Fatty Acids (PUFA, ≥2 double bonds): Linoleic acid (omega-6), α-Linolenic acid (omega-3).",
      "3. Essential vs Non-Essential Fatty Acids:",
      "• Essential: Linoleic acid, α-Linolenic acid, Arachidonic acid, EPA, DHA.",
      "• Non-Essential (Synthesized endogenously): Palmitic acid, Oleic acid, Stearic acid, Butyric acid."
    ]
  },

  // UNIT IV: MINERALS (CALCIUM & IODINE)
  {
    id: "NUT-DQ-8",
    srNo: 8,
    unit: "unit-nut-4-minerals",
    topic: "Minerals",
    type: "Short",
    question: "Describe the characteristics and functions of Calcium.",
    answerKeyPoints: [
      "Characteristics: Most abundant mineral cation in the human body (~2% of body weight, 1000–1200 g in adults, 27.5 g in infants). 99% is deposited in the skeleton and teeth as hydroxyapatite crystals; 1% is present in soft tissues and extracellular fluid undergoing continuous turnover.",
      "Key Physiological Functions:",
      "1. Bone & Teeth Mineralization: Essential for skeletal rigidity in conjunction with Phosphorus and Vitamin D.",
      "2. Neuromuscular Excitability: Ionized Ca²⁺ regulates threshold for nerve impulse transmission and muscle contraction.",
      "3. Blood Coagulation: Serves as Factor IV, vital for prothrombin conversion and fibrin clot stabilization.",
      "4. Cardiac Function: Regulates myocardial contractility, rhythmicity, and cardiac excitation-contraction coupling.",
      "5. Capillary Permeability: Maintains vascular endothelial integrity and cell membrane stability."
    ]
  },
  {
    id: "NUT-DQ-9",
    srNo: 9,
    unit: "unit-nut-4-minerals",
    topic: "Minerals",
    type: "Short",
    question: "Describe the characteristics, RDA, and functions of Iodine.",
    answerKeyPoints: [
      "Characteristics: Essential trace mineral concentrated in the thyroid gland. Not synthesized in the body; must be supplied via iodized salt, seafood, and fortified foods.",
      "RDA: Adult men and women (19+ yrs) = 150 mcg/day; Pregnant women = 220 mcg/day; Lactating mothers = 290 mcg/day.",
      "Physiological Functions:",
      "1. Hormone Synthesis: Obligatory substrate for the synthesis of thyroid hormones Thyroxine (T4) and Triiodothyronine (T3).",
      "2. Metabolic Regulation: Regulates basal cellular oxidation, energy expenditure, and basal metabolic rate (BMR).",
      "3. Growth and Development: Critical for fetal neurogenesis, myelin formation, cognitive development, and childhood skeletal maturation.",
      "Deficiency Manifestations: Endemic Goitre, Hypothyroidism, and Cretinism."
    ]
  },

  // UNIT V: BALANCED DIET & LIFECYCLE MEAL PLANNING
  {
    id: "NUT-DQ-10",
    srNo: 10,
    unit: "unit-nut-5-balanced-diet",
    topic: "Balanced Diet",
    type: "Short",
    question: "Define Menu planning and explain the steps of meal planning.",
    answerKeyPoints: [
      "Definition: Meal planning (menu planning) is the simple, systematic application of knowledge of food composition, nutrient values, and individual preferences/habits to design wholesome, nutritious, and appetizing meals.",
      "Steps in Meal Planning:",
      "Step 1: Identify RDA — Determine the specific nutritional and caloric requirements based on age, gender, physiological state (pregnancy/lactation), and physical activity level.",
      "Step 2: Prepare Food List — Calculate quantities from all 5 basic food groups (cereals, pulses, vegetables, milk, fats/sugars) using ICMR tables and Food Exchange Lists.",
      "Step 3: Planning the Menu — Convert food portion equivalents into appetizing recipes and distribute them logically across daily meals (Breakfast, Mid-morning snack, Lunch, Evening tea, Dinner, Bedtime)."
    ]
  },
  {
    id: "NUT-DQ-11",
    srNo: 11,
    unit: "unit-nut-5-balanced-diet",
    topic: "Balanced Diet",
    type: "Short",
    question: "Describe the 13 core principles of meal planning.",
    answerKeyPoints: [
      "1. Patient Disease Condition: Modify nutrients to treat illness (e.g., low sodium in HTN, high protein post-op).",
      "2. Food Habits & Customs: Respect religious beliefs, traditions, and dietary taboos.",
      "3. Family Composition: Account for age, gender, and individual physiological requirements of all members.",
      "4. Maximum Nutrient Retention: Prevent nutrient destruction by using sprouting, fermentation, and minimal cooking water.",
      "5. Meeting Nutritional RDAs: Provide adequate calories, high biological value proteins, vitamins, and minerals.",
      "6. Leftover Management: Ensure hygienic storage and safe reuse to prevent contamination.",
      "7. Family Needs Alignment: Satisfy total energy expenditure according to occupations.",
      "8. High Satiety Value: Include dietary fiber, proteins, and healthy fats to prevent premature hunger.",
      "9. Economy of Time & Fuel: Plan multi-pot and pressure-cooked dishes.",
      "10. Variety: Vary colors, textures, flavors, and cooking methods.",
      "11. Economic Budget: Plan nutritious meals using low-cost locally available seasonal foods.",
      "12. Psychological Satisfaction: Serve attractive, appetizing meals.",
      "13. Seasonal Availability: Utilize fresh, inexpensive seasonal produce."
    ]
  },
  {
    id: "NUT-DQ-12",
    srNo: 12,
    unit: "unit-nut-5-balanced-diet",
    topic: "Balanced Diet",
    type: "Short",
    question: "Illustrate the types of baby feeding, feeding guidelines, IYCF purpose, and benefits of breastfeeding.",
    answerKeyPoints: [
      "Types of Baby Feeding: Direct Breastfeeding (DBF), Pumping & Bottle Feeding (P&F), Formula Feeding (FF), and Solid Complementary Feeding (SFF).",
      "Feeding Guidelines: Newborns feed every 2–3 hours (8–12 times/day), taking 1–2 oz at birth, increasing to 2–3 oz at 2 weeks. 2 months: 4–5 oz every 3–4 hrs. 4 months: 4–6 oz. 6 months: up to 8 oz every 4–5 hrs with complementary foods.",
      "Purpose of IYCF (Infant and Young Child Feeding): Ensures optimal growth, cognitive development, and disease protection during the critical first 1000 days of life.",
      "Benefits of Breastfeeding to Child & Mother:",
      "• Supplies live immunities (sIgA, lactoferrin) offering immediate and lifelong protection.",
      "• Cuts Sudden Infant Death Syndrome (SIDS) risk by 50%.",
      "• DHA supports brain and retinal development; lowers risk of middle ear infections, allergies, and childhood diabetes.",
      "• Facilitates emotional bonding, rapid uterine involution, and reduces maternal risk of ovarian and breast cancers."
    ]
  },
  {
    id: "NUT-DQ-13",
    srNo: 13,
    unit: "unit-nut-5-balanced-diet",
    topic: "Balanced Diet",
    type: "Short",
    question: "Formulate a balanced diet plan for preschool children (1–6 years) with RDAs and sample menu.",
    answerKeyPoints: [
      "RDAs: 1–3 yrs: 1240 kcal, 22g protein, 400mg Ca, 12mg Fe | 4–6 yrs: 1690 kcal, 30g protein, 400mg Ca, 18mg Fe.",
      "Balanced Diet Quantities: Cereals (175–270g), Pulses (35g), Leafy vegetables (40–50g), Other vegetables (20–30g), Roots (10–20g), Milk (250–300ml), Fats (15–25g), Sugar/Jaggery (30–40g).",
      "Sample Meal Plan:",
      "• Early Morning: Milk with sugar (200 ml)",
      "• Breakfast: Paratha with curd (1/2 katori) OR Boiled egg with 2 bread slices",
      "• Mid-Morning: Fresh fruit / fruit juice (1 glass)",
      "• Lunch: Rice, mixed vegetables, curd (1/2 katori), 1–2 chapatis",
      "• Evening: Milk (150 ml) + 4 biscuits",
      "• Dinner: Dal or minced meat (1 katori), 2 chapatis, fresh salad",
      "• Bedtime: Fruit custard (1 katori)"
    ]
  },
  {
    id: "NUT-DQ-14",
    srNo: 14,
    unit: "unit-nut-5-balanced-diet",
    topic: "Balanced Diet",
    type: "Short",
    question: "Explain the causes of anemia, its effects on mother and fetus, WHO prophylaxis, and nursing management.",
    answerKeyPoints: [
      "Etiology: Inadequate intake/low bioavailability of iron, folate, and Vitamin B12; excess tea/coffee tannins; parasitic hookworm infestation, chronic malaria; heavy menstrual blood loss.",
      "Maternal Complications: Antepartum abortions, preeclampsia, preterm labor, cardiac failure; Intrapartum uterine inertia, postpartum hemorrhage, shock; Postpartum puerperal sepsis, subinvolution, failing lactation, delayed healing.",
      "Fetal Complications: Intrauterine Growth Restriction (IUGR), prematurity, low birth weight, infant iron deficiency, intrauterine fetal demise, perinatal mortality.",
      "WHO Prophylaxis: 60 mg elemental iron + 400 mcg folic acid daily for 6 months where prevalence <40%; extend by 3 additional months if prevalence >40%.",
      "Nursing Management: Assess dietary habits and symptoms; prioritize rest and balanced activity; instruct on iron-rich foods (heme iron, leafy greens, cast iron cookware, vitamin C enhancers); ensure strict compliance with oral iron supplements (taken between meals with citrus juice, avoiding milk/tea)."
    ]
  },
  {
    id: "NUT-DQ-15",
    srNo: 15,
    unit: "unit-nut-5-balanced-diet",
    topic: "Balanced Diet",
    type: "Short",
    question: "Formulate a balanced diet plan during lactation with RDAs and lactogenic galactagogues.",
    answerKeyPoints: [
      "Nutritional Needs: Breastfeeding expends 200–500 extra kcal/day. Total Energy: 2575 kcal, Protein: 75 g, Calcium: 1000 mg.",
      "Lactogenic Galactagogues:",
      "• Avocado: Healthy fats and vitamins B, K, C, E, folate.",
      "• Beans & Legumes: Plant protein and phytoestrogens supporting prolactin secretion.",
      "• Sweet Potatoes: Vitamin A and potassium.",
      "• Whole Grains (Oats, brown rice): Fiber, B-vitamins, and hormone support.",
      "• Greek Yogurt: Probiotics, calcium, and protein.",
      "• Dried Apricots: Phytoestrogens and iron.",
      "• Dark Green Leafy Veggies (Spinach, kale): Calcium, folate, iron.",
      "• Fennel Seeds: Herbal galactagogue infused into teas.",
      "Sample Meal Plan: Milk (200ml) + biscuits early morning; Boiled eggs/paratha with curd breakfast; Panjiri + tea mid-morning; Rice, chapati, green veg, curd lunch; Banana shake/sprouts evening; Dal/meat curry with rice dinner; Milk with Protinex at bedtime."
    ]
  },

  // UNIT VI: NUTRITIONAL DEFICIENCY DISORDERS
  {
    id: "NUT-DQ-16",
    srNo: 16,
    unit: "unit-nut-6-deficiencies",
    topic: "Nutritional deficiency disorders",
    type: "Short",
    question: "Enlist the causes and dietary management of Protein Energy Malnutrition (PEM).",
    answerKeyPoints: [
      "Etiology: Inadequate intake of protein and calories; vicious cycle of diarrheal, measles, and respiratory infections; early cessation of breastfeeding, poor weaning practices; poverty, large family size, poor hygiene.",
      "Principles of Dietary Management:",
      "1. Immediate nutritional resuscitation rich in proteins, calories, vitamins, and minerals.",
      "2. Gradual transition: start with liquid feeds → semi-solid feeds → soft nutrient-dense diet using local foods.",
      "3. Frequent small feeds: at least 6 times daily.",
      "4. Treat electrolyte imbalances, hypothermia, hypoglycemia, and underlying infections concurrently."
    ]
  },
  {
    id: "NUT-DQ-17",
    srNo: 17,
    unit: "unit-nut-6-deficiencies",
    topic: "Nutritional deficiency disorders",
    type: "Short",
    question: "Differentiate between Kwashiorkor and Marasmus across 10 clinical parameters.",
    answerKeyPoints: [
      "1. Primary Deficit: Kwashiorkor = Severe Protein deficiency; Marasmus = Severe Protein + Calorie deficit.",
      "2. Age: Kwashiorkor = 1–4 years (post-weaning); Marasmus = Infants <1 year.",
      "3. Edema: Kwashiorkor = Present (pitting edema on legs, face); Marasmus = Absent.",
      "4. Subcutaneous Fat: Kwashiorkor = Preserved/masked; Marasmus = Severe loss ('skin and bone').",
      "5. Muscle Wasting: Kwashiorkor = Mild/moderate; Marasmus = Severe ('broomstick limbs').",
      "6. Face: Kwashiorkor = Moon Face (puffy, swollen); Marasmus = Monkey / Old Man Face (wrinkled).",
      "7. Mental State: Kwashiorkor = Apathetic, lethargic, miserable; Marasmus = Alert, irritable, hungry.",
      "8. Appetite: Kwashiorkor = Poor / Anorexic; Marasmus = Voracious / Good.",
      "9. Skin Changes: Kwashiorkor = Flaky-paint dermatosis, hyperpigmentation; Marasmus = Dry, loose, no dermatosis.",
      "10. Liver: Kwashiorkor = Hepatomegaly due to fatty infiltration; Marasmus = Normal size."
    ]
  },
  {
    id: "NUT-DQ-18",
    srNo: 18,
    unit: "unit-nut-6-deficiencies",
    topic: "Nutritional deficiency disorders",
    type: "Short",
    question: "Define PEM (WHO) and describe the 3-tier role of the nurse in PEM management.",
    answerKeyPoints: [
      "WHO Definition: 'An imbalance between the supply of protein and energy and the body's demand for them to ensure optimal growth and function.'",
      "3-Tier Role of the Nurse:",
      "1. Health Promotion: Encourage maternal antenatal nutrition; promote exclusive breastfeeding for 6 months; demonstrate hygienic, low-cost weaning foods (e.g., NIN Nutritious Laddus providing 33 kcal & 11g protein); conduct nutrition education and birth spacing counseling.",
      "2. Specific Protection: Provide protein-rich diets (3–4 g/kg/day); ensure complete immunization; administer Vitamin A megadoses; provide ORS for diarrhea and deworming for intestinal parasites; conduct growth monitoring surveillance.",
      "3. Nutritional Rehabilitation: Hospitalization for severe complicated cases; slow refeeding; follow-up monitoring of weight catch-up."
    ]
  },
  {
    id: "NUT-DQ-19",
    srNo: 19,
    unit: "unit-nut-6-deficiencies",
    topic: "Nutritional deficiency disorders",
    type: "Short",
    question: "Define childhood obesity and describe dietary modifications and behavioral strategies.",
    answerKeyPoints: [
      "Definition: A child is considered overweight if BMI is between the 85th and 95th percentile, and obese if BMI is ≥ 95th percentile for age and sex.",
      "Dietary Modifications:",
      "• Balanced nutrient-dense diet: increase fresh vegetables, whole fruits, low-fat dairy, lean proteins, and whole grains.",
      "• Eliminate sugar-sweetened beverages (sodas, sports drinks, packaged juices) and ultra-processed fried snacks.",
      "• Encourage drinking liberal water to maintain satiety.",
      "Behavioral & Lifestyle Strategies:",
      "• Mindful eating habits: eliminate distractions (eating in front of TV/screens); eat family meals seated at a table.",
      "• Physical Activity: At least 60 minutes of moderate-to-vigorous active physical play/exercise 4–5 days a week."
    ]
  },

  // UNIT VII: THERAPEUTIC DIETS
  {
    id: "NUT-DQ-20",
    srNo: 20,
    unit: "unit-nut-7-therapeutic",
    topic: "Therapeutic diets",
    type: "Short",
    question: "Classify obesity and explain contributing factors.",
    answerKeyPoints: [
      "Classification by BMI: Class 1 Obesity = BMI 30.0 to <35.0; Class 2 Obesity = BMI 35.0 to <40.0; Class 3 (Severe/Morbid) Obesity = BMI ≥ 40.0 kg/m².",
      "Contributing Factors:",
      "1. Diet: Frequent intake of energy-dense fast foods, refined sugars, sugary beverages, and oversized portions.",
      "2. Genetic & Familial: Familial dietary patterns, shared sedentary behaviors, and metabolic predispositions.",
      "3. Psychological: Emotional eating to cope with stress, anxiety, or depression.",
      "4. Socioeconomic: Limited access to fresh produce in food deserts; reliance on cheap shelf-stable processed items.",
      "5. Medications: Weight-gain promoting drugs (prednisone, lithium, amitriptyline, gabapentin, beta-blockers)."
    ]
  },
  {
    id: "NUT-DQ-21",
    srNo: 21,
    unit: "unit-nut-7-therapeutic",
    topic: "Therapeutic diets",
    type: "Short",
    question: "Define Diabetes Mellitus and describe its medical nutrition therapy.",
    answerKeyPoints: [
      "Definition: A chronic metabolic disorder characterized by absolute or relative insulin deficiency/resistance leading to persistent hyperglycemia and altered carbohydrate, lipid, and protein metabolism.",
      "Dietary Management Principles:",
      "• Control calories: 20 kcal/kg (overweight/bedridden), 25 kcal/kg (sedentary), 30 kcal/kg (moderate activity), 40 kcal/kg (underweight).",
      "• High complex carbohydrates (55–60%) with low glycemic index; avoid simple refined sugars.",
      "• High dietary fiber (30–40 g/day, soluble psyllium, oats, legumes) to delay glucose absorption.",
      "• Moderate protein (15–20%) and healthy fats (MUFA/PUFA, saturated fat <7%).",
      "• Regular meal timings to prevent hypoglycemia and glycemic spikes ('avoid fasting and feasting')."
    ]
  },
  {
    id: "NUT-DQ-22",
    srNo: 22,
    unit: "unit-nut-7-therapeutic",
    topic: "Therapeutic diets",
    type: "Short",
    question: "Classify risk factors and explain the Step I and Step II dietary management of Atherosclerosis.",
    answerKeyPoints: [
      "Risk Factor Classification: Category I (Proven modifiable: smoking, high saturated fat, elevated LDL, hypertension); Category II (Likely: diabetes, physical inactivity, obesity, low HDL); Category III (Possible: psychological stress, elevated triglycerides); Category IV (Non-modifiable: age, male gender, family history).",
      "Dietary Principles: Low calorie, low saturated fat, low cholesterol, high MUFA/PUFA, high soluble fiber, adequate potassium and magnesium.",
      "Step I Diet: Saturated fat <10% of calories, total fat <30%, cholesterol <300 mg/day.",
      "Step II Diet: Saturated fat <7% of calories, total fat <30%, cholesterol <200 mg/day.",
      "Foods Avoided: Butter, palm oil, coconut oil, red meats, organ meats, full-fat dairy, trans-fats, bakery goods.",
      "Foods Included: Oats, whole wheat bran, green vegetables, olive/canola/soybean oil, egg whites, fatty fish."
    ]
  },
  {
    id: "NUT-DQ-23",
    srNo: 23,
    unit: "unit-nut-7-therapeutic",
    topic: "Therapeutic diets",
    type: "Short",
    question: "Classify hypertension and explain dietary management including sodium restriction levels.",
    answerKeyPoints: [
      "Classification: Primary (Essential/Idiopathic, ~90–95% of cases) and Secondary (~5%, caused by renal parenchymal disease, endocrine disorders, vascular stenosis).",
      "Dietary Principles: DASH diet (low calorie, low fat, low sodium, high potassium, calcium, and magnesium to promote vasodilation and natriuresis).",
      "Sodium Restriction Tiers:",
      "• Extreme Restriction (200–300 mg/day): Zero added salt, strictly low-sodium foods (used in severe cirrhosis with ascites, refractory CHF).",
      "• Severe Restriction (500–700 mg/day): No salt in cooking, careful food selection (severe CHF).",
      "• Moderate Restriction (1000–1500 mg/day): No salt in cooking, selected low-sodium foods (borderline HTN, strong family history).",
      "• Mild Restriction (2000–3000 mg/day): Small amount in cooking, avoid salted processed snacks (renal & cardiac maintenance)."
    ]
  },
  {
    id: "NUT-DQ-24",
    srNo: 24,
    unit: "unit-nut-7-therapeutic",
    topic: "Therapeutic diets",
    type: "Short",
    question: "Define Jaundice and explain recommended vs restricted foods.",
    answerKeyPoints: [
      "Definition: Yellowish discoloration of the skin, sclera, and mucous membranes caused by hyperbilirubinemia (>2.5 mg/dL).",
      "Dietary Principles: High carbohydrate for liver glycogen protection, low-to-moderate fat, high fluids.",
      "Recommended Foods: At least 8 glasses of clean water daily, fresh fruit juices, milk thistle, honey, pineapple, mango (natural digestive enzymes), high-fiber vegetables.",
      "Foods to Strictly Avoid/Limit: Added salt and pickles; all red meats and organ meats; heavy dairy products (butter, ghee, cheese, whole milk); fried/junk foods; eggs (difficult hepatic digestion); caffeine, alcohol, pulses, and beans causing intestinal putrefaction."
    ]
  },
  {
    id: "NUT-DQ-25",
    srNo: 25,
    unit: "unit-nut-7-therapeutic",
    topic: "Therapeutic diets",
    type: "Short",
    question: "Define Nephrotic Syndrome and explain its dietary management.",
    answerKeyPoints: [
      "Definition: Clinical triad of heavy proteinuria (>3.5 g/24h), severe hypoalbuminemia (<3.0 g/dL), diffuse generalized edema, and hyperlipidemia.",
      "Dietary Principles:",
      "• Energy: 35–60 kcal/kg/day (adults), 100 kcal/kg/day (children) to spare proteins.",
      "• Protein: Controlled at 1.25 g/kg/day (adults), 2.0 g/kg/day (children) using high biological value sources (egg white, lean fish) to replace urinary losses without overloading glomeruli.",
      "• Fluids: Restricted during edematous phase (Daily allowance = Previous 24h Urine Output + 500 mL insensible loss).",
      "• Sodium: Restricted to <2.0 g/day (or 500–1000 mg/day) with zero table salt.",
      "• Fats: Low saturated fat and cholesterol to control secondary hyperlipidemia."
    ]
  },
  {
    id: "NUT-DQ-26",
    srNo: 26,
    unit: "unit-nut-7-therapeutic",
    topic: "Therapeutic diets",
    type: "Short",
    question: "Define Acute Glomerulonephritis and explain dietary management including potassium leaching.",
    answerKeyPoints: [
      "Definition: Inflammatory condition of the renal glomeruli leading to hematuria, oliguria, hypertension, and azotemia.",
      "Dietary Management:",
      "• Calories: 30–40 kcal/kg/day (adults), 80 kcal/kg/day (children).",
      "• Protein: Restricted (0.5–0.8 g/kg/day) to minimize nitrogenous waste accumulation.",
      "• Sodium: Restricted to 500–1000 mg/day to control edema and blood pressure. Avoid baking powder, canned soups, MSG, and salted chips.",
      "• Potassium Restriction & Leaching: Leaching technique involves peeling vegetables, dicing into small pieces, soaking in large volumes of warm water for 2 hours, discarding water, and boiling in fresh water to leach out soluble potassium.",
      "• Fluid: Restricted to Urine Output + 500 mL insensible water loss.",
      "• Phosphorus: Restricted to 800–1200 mg/day."
    ]
  },
  {
    id: "NUT-DQ-27",
    srNo: 27,
    unit: "unit-nut-7-therapeutic",
    topic: "Therapeutic diets",
    type: "Short",
    question: "Define Acute Renal Failure (ARF) and describe its dietary management.",
    answerKeyPoints: [
      "Definition: Abrupt decline in renal filtration capacity causing azotemia (elevated BUN/creatinine), fluid retention, and electrolyte derangements.",
      "Dietary Principles:",
      "• Caloric intake: Adequate non-protein calories (minimum 100g carbs/day, 30–35 kcal/kg) to suppress endogenous protein catabolism.",
      "• Protein: 0.6–1.0 g/kg/day for non-dialyzed patients; increase to 20–40 g/day in diuretic recovery phase.",
      "• Fluid: Daily total = 24-hr urine output + 500 mL insensible loss.",
      "• Sodium & Potassium: Strictly restricted during oliguric phase (sodium 500–1000 mg, potassium restricted to manage hyperkalemia).",
      "• Use of Diuretics and Insulin/Glucose infusions to lower serum potassium."
    ]
  },
  {
    id: "NUT-DQ-28",
    srNo: 28,
    unit: "unit-nut-7-therapeutic",
    topic: "Therapeutic diets",
    type: "Short",
    question: "Define Diarrhea and explain dietary management and the WHO Oral Rehydration Salt (ORS) composition.",
    answerKeyPoints: [
      "Definition: Frequent passage of loose, watery, unformed stools (>3 times/day or stool weight >200–250 g/day). Passage of blood and mucus is dysentery.",
      "Dietary Management: Fluid and electrolyte repletion; acute phase 1500 kcal/day, chronic 2500 kcal/day; bland easily digestible carbs (rice water, arrowroot, porridge, cooked potatoes); avoid high-fat, high-roughage, raw dairy, and spicy foods.",
      "WHO/UNICEF Reduced Osmolarity ORS Formula (per Liter of water):",
      "• Anhydrous Glucose: 13.5 g (or 20 g standard)",
      "• Sodium Chloride (NaCl): 2.6 g (or 3.5 g standard)",
      "• Potassium Chloride (KCl): 1.5 g",
      "• Trisodium Citrate: 2.9 g (or Sodium Bicarbonate 2.5 g)",
      "Home-made Solution: 1 glass boiled cooled water + 1 pinch of salt + 1 teaspoon of sugar."
    ]
  },
  {
    id: "NUT-DQ-29",
    srNo: 29,
    unit: "unit-nut-7-therapeutic",
    topic: "Therapeutic diets",
    type: "Short",
    question: "Describe the importance of nutrition in pre- and post-operative surgical phases.",
    answerKeyPoints: [
      "Pre-operative Nutrition: High protein (65–100 g/day) for 1–2 weeks before elective surgery to build reserves; high Vitamin C and K for collagen synthesis and prothrombin; whole grains for B-vitamins; avoid alcohol and smoking.",
      "Post-operative Nutrition: Early enteral feeding when bowel sounds return; high protein (1.5–2.0 g/kg) for wound healing and immune defense; Vitamin C (collagen cross-linking); Calcium and Vitamin D for bone healing; adequate hydration (6–8 cups/day) and fiber to prevent post-op paralytic ileus/constipation."
    ]
  },
  {
    id: "NUT-DQ-30",
    srNo: 30,
    unit: "unit-nut-7-therapeutic",
    topic: "Therapeutic diets",
    type: "Short",
    question: "Illustrate the guidelines and a 2000–2200 kcal diet plan for underweight individuals.",
    answerKeyPoints: [
      "Guidelines: Nutrient-dense high-calorie meals (500 extra kcal/day); starchy complex carbohydrates; whole milk and dairy; 2 portions of fish/week (1 oily); healthy unsaturated oils/nuts; small frequent meals.",
      "Sample Diet Plan (2000–2200 kcal):",
      "• Breakfast: 2-egg brown bread sandwich + green chutney + 1 cup milk + cashews/almonds/walnuts",
      "• Mid-Morning: 1 cup banana smoothie / shake",
      "• Lunch: 1 cup arhar dal + potato curry + 3 chapatis + 1/2 cup rice + 1/2 cup curd + salad",
      "• Evening: 1 cup strawberry smoothie + 1 cup vegetable poha",
      "• Dinner: 1.5 cup chicken/paneer curry + 3 chapatis + fresh salad"
    ]
  },

  // UNIT VIII: COOKERY RULES & NUTRIENT PRESERVATION
  {
    id: "NUT-DQ-31",
    srNo: 31,
    unit: "unit-nut-8-cookery",
    topic: "Cookery rules and preservation of nutrients",
    type: "Short",
    question: "Explain the definitions, merits, and demerits of Boiling and Poaching methods.",
    answerKeyPoints: [
      "Boiling (100°C): Immersing food in vigorously boiling water until tender.",
      "• Merits: Simple, uniform cooking, denatures proteins making them digestible, gelatinizes starch.",
      "• Demerits: Leaching of water-soluble vitamins (B, C), betalain pigment loss, structural destruction if overboiled.",
      "Poaching (80–85°C): Cooking delicate foods (eggs, fish) in minimal liquid just below boiling point.",
      "• Merits: Zero special equipment, quick, retains delicate shapes, saves fuel.",
      "• Demerits: Bland flavor, risk of scorching if unmonitored, nutrient leaching."
    ]
  },
  {
    id: "NUT-DQ-32",
    srNo: 32,
    unit: "unit-nut-8-cookery",
    topic: "Cookery rules and preservation of nutrients",
    type: "Short",
    question: "Explain the definitions, merits, and demerits of Steaming, Stewing, and Pressure Cooking.",
    answerKeyPoints: [
      "Steaming: Cooking in steam generated from boiling water without direct contact with liquid.",
      "• Merits: Light, fluffy texture (idli), minimal nutrient leaching, zero scorching.",
      "• Demerits: Special steamer needed; unsuitable for green leafy vegetables.",
      "Stewing (82–90°C): Slow simmering in a covered pan with half-covering liquid.",
      "• Merits: Nutrients preserved as cooking liquid is served, tenderizes tough meat cuts.",
      "• Demerits: Time-consuming, uses more fuel.",
      "Pressure Cooking (>100°C): Cooking with steam under pressure inside a sealed cooker.",
      "• Merits: Reduces cooking time by 70%, maximum nutrient/flavor retention, multi-tier cooking saves fuel.",
      "• Demerits: Initial equipment cost, risk of overcooking, mixing of distinct flavors."
    ]
  },
  {
    id: "NUT-DQ-33",
    srNo: 33,
    unit: "unit-nut-8-cookery",
    topic: "Cookery rules and preservation of nutrients",
    type: "Short",
    question: "Explain the definitions, merits, and demerits of Solar, Baking, Grilling, and Microwave Cooking.",
    answerKeyPoints: [
      "Solar Cooking (Up to 140°C): Heat trapped by insulated black box with glass cover.",
      "• Merits: Zero fuel cost, zero scorching, nutrient preservation, keeps food warm.",
      "• Demerits: Dependent on sunlight; slow simmering only; unavailable at night/rain.",
      "Baking (120–260°C): Dry convection heat in an enclosed oven.",
      "• Merits: Light spongy texture (breads, cakes), unique baked aroma, bulk cooking.",
      "• Demerits: Oven required, precise skill needed.",
      "Grilling: Direct radiant heat from a red-hot surface above/below food.",
      "• Merits: Smoky flavor, minimal fat, rapid cooking.",
      "• Demerits: Constant monitoring to prevent charring.",
      "Microwave Cooking: High-frequency electromagnetic radiation (magnetron) vibrating food water molecules.",
      "• Merits: 10x faster, preserves heat-labile vitamins and natural vegetable color, easy reheating.",
      "• Demerits: No crust or browning, short time prevents flavor blending, cannot deep fry."
    ]
  },

  // UNIT IX: NUTRITIONAL ASSESSMENT & EDUCATION
  {
    id: "NUT-DQ-34",
    srNo: 34,
    unit: "unit-nut-9-assessment",
    topic: "Nutrition assessment and nutrition education",
    type: "Short",
    question: "Describe the clinical examination method for nutritional assessment with signs, advantages, and limitations.",
    answerKeyPoints: [
      "Method: Visual and physical examination of superficial tissues (skin, eyes, hair, oral mucosa, parotid/thyroid glands) for overt deficiency signs.",
      "Clinical Signs: PEM (edema, moon face, muscle wasting, hair flag sign); Vitamin A (Bitot's spots, xerophthalmia); Riboflavin B2 (angular stomatitis, cheilosis); Thiamine B1 (calf tenderness, edema); Niacin B3 (dermatitis, raw beefy tongue); Vitamin C (bleeding spongy gums); Vitamin D (rickets, bow legs, rachitic rosary); Iron (koilonychia, pale conjunctiva); Iodine (goitre).",
      "Advantages: Fast, inexpensive, non-invasive, no laboratory equipment needed.",
      "Limitations: Cannot detect early subclinical deficiencies; signs may lack specificity."
    ]
  },
  {
    id: "NUT-DQ-35",
    srNo: 35,
    unit: "unit-nut-9-assessment",
    topic: "Nutrition assessment and nutrition education",
    type: "Short",
    question: "Illustrate anthropometric measurements and indices with advantages and limitations.",
    answerKeyPoints: [
      "Core Measurements & Indices:",
      "• Head Circumference: Non-stretchable tape across forehead and occiput in children <2 yrs.",
      "• Recumbent Length: Infantometer for children <2 yrs who cannot stand.",
      "• Height: Stadiometer for children >2 yrs and adults.",
      "• Weight: Calibrated digital infant scale (<2 yrs unclothed) or balanced floor scale.",
      "• Mid-Upper Arm Circumference (MUAC): Measured at arm midpoint to detect acute childhood wasting.",
      "• Waist Circumference: Measures central visceral adiposity and cardiovascular risk.",
      "• Skinfold Callipers: Measures subcutaneous fat at triceps, subscapular, and biceps.",
      "Advantages: Objective, numerical, gradable against WHO growth charts, reproducible, inexpensive.",
      "Limitations: Inter-observer measurement error; reference standard discrepancies."
    ]
  },
  {
    id: "NUT-DQ-36",
    srNo: 36,
    unit: "unit-nut-9-assessment",
    topic: "Nutrition assessment and nutrition education",
    type: "Short",
    question: "Compare Biochemical tests (static vs functional) and explain Food Frequency Questionnaires (FFQ).",
    answerKeyPoints: [
      "Biochemical Assessment:",
      "• Static Tests (Direct): Quantifies nutrient or metabolite concentration in serum/urine (e.g., blood glucose, serum ferritin, serum calcium, RBC folate).",
      "• Functional Tests (Indirect): Evaluates a physiological or enzymatic function dependent on the nutrient (e.g., Oral Glucose Tolerance Test, dark adaptation test for Vitamin A).",
      "• Pros & Cons: Highly accurate, detects subclinical deficiency before symptoms; but expensive, invasive, and requires laboratory facilities.",
      "Food Frequency Questionnaire (FFQ):",
      "• Purpose: Assesses usual dietary intake and consumption frequency of 80–120 food items over a defined timeframe (past month or year).",
      "• Process: Self-administered or interviewer-guided; records frequency units and portion size photos to correlate diet with chronic disease patterns."
    ]
  },

  // UNIT X: NATIONAL NUTRITION PROGRAMS & ROLE OF NURSE
  {
    id: "NUT-DQ-37",
    srNo: 37,
    unit: "unit-nut-10-programs",
    topic: "National Nutritional Programs and role of Nurse",
    type: "Short",
    question: "Classify the major nutrition problems in India and explain forms of undernutrition.",
    answerKeyPoints: [
      "Major Nutrition Problems in India: (1) Protein Energy Malnutrition (stunting, wasting in under-5 children); (2) Micronutrient Deficiencies (Iron-deficiency anemia, Iodine deficiency goitre, Vitamin A blindness); (3) Chronic Non-Communicable Diseases (rising obesity, Type 2 diabetes, CVD).",
      "Forms of Undernutrition:",
      "• Marasmus: Severe calorie + protein deficiency in infants under 1 year, causing extreme muscle wasting and loss of subcutaneous fat ('skin and bone').",
      "• Kwashiorkor: Severe protein deficiency in post-weaning children, characterized by edema, moon face, hepatomegaly, and dermatosis.",
      "• Starvation: Complete or near-total prolonged deprivation of food, exhausting all adipose and muscle glycogen/protein reserves."
    ]
  },
  {
    id: "NUT-DQ-38",
    srNo: 38,
    unit: "unit-nut-10-programs",
    topic: "National Nutritional Programs and role of Nurse",
    type: "Short",
    question: "Explain Endemic Fluorosis, affected Indian states, and dental enamel toxic manifestations.",
    answerKeyPoints: [
      "Definition: Chronic toxic condition caused by ingestion of excessive fluoride in drinking water (>1.5 mg/L).",
      "Affected States: Worst affected = Rajasthan, Gujarat, Andhra Pradesh; Moderately affected = Punjab, Haryana, Madhya Pradesh, Maharashtra; Mildly affected = Tamil Nadu, Uttar Pradesh, West Bengal, Bihar.",
      "Dental Enamel Manifestations (Dean's Staging):",
      "• Questionable: Slight white flecks.",
      "• Very Mild: Small opaque paper-white areas on <25% of tooth surface.",
      "• Mild: White opacity on 25–50% of surface.",
      "• Moderate: Distinct brown staining affecting >50% of enamel.",
      "• Severe: Widespread brown/black staining with discrete or confluent enamel pitting and chipping."
    ]
  },
  {
    id: "NUT-DQ-39",
    srNo: 39,
    unit: "unit-nut-10-programs",
    topic: "National Nutritional Programs and role of Nurse",
    type: "Short",
    question: "Explain the etiology, clinical types, and manifestations of Lathyrism.",
    answerKeyPoints: [
      "Etiology: Ingestion of large quantities of grass pea / Kesari dal (Lathyrus sativus) during droughts/famines.",
      "Clinical Types & Toxins:",
      "1. Neurolathyrism: Caused by neurotoxin ODAP (β-N-oxalyl-amino-L-alanine / BOAA), an excitatory neurotoxin that destroys upper motor neurons.",
      "• Symptoms: Spastic paraplegia, tremors, scissoring gait, irreversible paralysis of lower limbs.",
      "2. Osteolathyrism: Caused by BAPN (beta-aminopropionitrile) inhibiting lysyl oxidase, disrupting collagen cross-linking.",
      "• Symptoms: Skeletal deformities, bone pain, kyphoscoliosis.",
      "3. Angiolathyrism: BAPN damages blood vessel collagen leading to vascular fragility and aortic aneurysms."
    ]
  },
  {
    id: "NUT-DQ-40",
    srNo: 40,
    unit: "unit-nut-10-programs",
    topic: "National Nutritional Programs and role of Nurse",
    type: "Short",
    question: "Describe the importance of food hygiene, food safety, FSSAI regulations, and the role of the nurse.",
    answerKeyPoints: [
      "Definition & Importance: Food hygiene encompasses all practices ensuring food is wholesome from farm to fork, preventing foodborne infections (typhoid, cholera, dysentery, hepatitis A, salmonellosis).",
      "Key Food Safety Practices: Hand washing before food preparation; avoiding cross-contamination; cooking at safe internal temperatures; hygienic refrigeration; using potable clean water.",
      "Regulatory Framework: Food Safety and Standards Authority of India (FSSAI) enforces food quality standards and penalizes adulteration.",
      "Role of the Community Nurse: Educate mothers on hygienic meal prep; monitor school midday meal hygiene; early notification of foodborne outbreaks; counsel on safe food storage."
    ]
  },

  // ==========================================
  // --- BIOCHEMISTRY CURRICULUM QUESTIONS ---
  // ==========================================
  {
    id: "DQ-1",
    srNo: 1,
    unit: "unit-1-carbs",
    topic: "I Carbohydrates",
    type: "Short",
    question: "Explain the biological importance of monosaccharides.",
    answerKeyPoints: [
      "Primary metabolic fuel: D-Glucose provides 4 kcal/g and is the obligatory energy source for the brain and RBCs.",
      "Structural building blocks: Ribose and Deoxyribose form the sugar-phosphate backbone of RNA, DNA, ATP, NADH, and FAD.",
      "Precursors for complex glycoconjugates: UDP-Glucose and UDP-Galactose synthesize glycogen, lactose, glycolipids, and glycoproteins.",
      "Detoxification role: UDP-Glucuronic acid conjugates bilirubin, steroid hormones, and xenobiotics in the liver for excretion."
    ]
  },
  {
    id: "DQ-12",
    srNo: 12,
    unit: "unit-1-carbs",
    topic: "I Carbohydrates",
    type: "Short",
    question: "Explain the salient features of glycolysis (Embden-Meyerhof Pathway).",
    answerKeyPoints: [
      "Location: Cytosol of all human cells.",
      "Reactions: 10 enzymatic reactions split into Energy Investment (consumes 2 ATP) and Energy Generation (produces 4 ATP + 2 NADH).",
      "Anaerobic fate: Pyruvate reduced to Lactate by Lactate Dehydrogenase (LDH), generating NET 2 ATP.",
      "Aerobic fate: Pyruvate enters mitochondria to form Acetyl-CoA, yielding NET 8 ATP (or 30–32 ATP in complete aerobic respiration).",
      "Key irreversible regulatory enzymes: Hexokinase/Glucokinase, Phosphofructokinase-1 (PFK-1), Pyruvate Kinase."
    ]
  },
  {
    id: "DQ-198",
    srNo: 198,
    unit: "unit-2-lipids",
    topic: "II Lipids",
    type: "Short",
    question: "Explain the reactions and energetics of Beta-oxidation of Fatty Acids (Palmitic acid).",
    answerKeyPoints: [
      "Site: Mitochondrial matrix (transported across inner membrane via Carnitine Shuttle).",
      "4 Recurring Reactions: (1) Oxidation by FAD (Acyl-CoA Dehydrogenase); (2) Hydration (Enoyl-CoA Hydratase); (3) Oxidation by NAD⁺ (β-Hydroxyacyl-CoA Dehydrogenase); (4) Thiolytic cleavage (Thiolase).",
      "Energetics for Palmitate (16C): Undergoes 7 cycles producing 8 Acetyl-CoA (80 ATP) + 7 FADH₂ (10.5 ATP) + 7 NADH (17.5 ATP) - 2 ATP = NET 106 ATP."
    ]
  },
  {
    id: "DQ-492",
    srNo: 492,
    unit: "unit-3-proteins",
    topic: "III Proteins",
    type: "Short",
    question: "Explain the Urea Cycle (Krebs-Henseleit Cycle) with reactions and clinical importance.",
    answerKeyPoints: [
      "Purpose: Converts toxic free ammonia (NH3) into non-toxic water-soluble Urea for renal excretion.",
      "Location: Liver only; initial 2 steps in mitochondria, remaining 3 steps in cytosol.",
      "5 Steps: (1) CPS-1 (rate-limiting); (2) Ornithine Transcarbamoylase; (3) Argininosuccinate Synthetase; (4) Argininosuccinate Lyase; (5) Arginase.",
      "Normal Blood Urea = 20–40 mg/dL (BUN 7–20 mg/dL). Hyperammonemia causes cerebral edema and hepatic encephalopathy."
    ]
  },
  {
    id: "DQ-770",
    srNo: 770,
    unit: "unit-4-enzymes",
    topic: "IV Clinical Enzymology",
    type: "Short",
    question: "Explain the diagnostic biomarkers used in Myocardial Infarction (Cardiac Troponins, CK-MB, AST, LDH).",
    answerKeyPoints: [
      "Cardiac Troponins (cTnI and cTnT): Gold standard biomarkers; rise in 3–4 hrs, peak at 12–24 hrs, remain elevated for 7–14 days.",
      "CK-MB: Rises in 4–6 hrs, peaks at 18–24 hrs, normal by 48–72 hrs; detects early re-infarction.",
      "AST/SGOT: Rises in 12–24 hrs, peaks at 48 hrs.",
      "LDH: Rises late (24–48 hrs), peaks at 3–5 days, shows flipped LDH-1 > LDH-2 ratio."
    ]
  },
  {
    id: "DQ-922",
    srNo: 922,
    unit: "unit-5-acid-base",
    topic: "V Acid Base Maintenance",
    type: "Short",
    question: "Describe the three lines of defense in the regulation of acid-base balance.",
    answerKeyPoints: [
      "First Line (Chemical Blood Buffers, seconds): Bicarbonate buffer (20:1 ratio), Phosphate buffer, and Protein/Hemoglobin buffers.",
      "Second Line (Respiratory Mechanism, minutes): Hyperventilation eliminates CO2 (treats acidosis); hypoventilation retains CO2 (treats alkalosis).",
      "Third Line (Renal Mechanism, hours to days): Ultimate regulator via HCO3⁻ reabsorption, titratable acid excretion, and NH4⁺ synthesis."
    ]
  },
  {
    id: "DQ-1068",
    srNo: 1068,
    unit: "unit-6-heme",
    topic: "VI Heme catabolism",
    type: "Short",
    question: "Describe the differential diagnosis of Pre-hepatic (Hemolytic), Hepatic, and Post-hepatic (Obstructive) Jaundice.",
    answerKeyPoints: [
      "Pre-hepatic: High Unconjugated Bilirubin, Indirect positive, dark stools, normal ALT/ALP.",
      "Hepatic: High Conjugated and Unconjugated Bilirubin, Biphasic, marked ALT/AST elevation.",
      "Post-hepatic: High Conjugated Bilirubin, Direct positive, clay-colored stools, marked ALP/GGT elevation."
    ]
  },
  {
    id: "DQ-1141",
    srNo: 1141,
    unit: "unit-7-organ",
    topic: "VII Organ Function Tests",
    type: "Short",
    question: "Explain the Creatinine Clearance Test with formula and clinical interpretation.",
    answerKeyPoints: [
      "Formula: CrCl (mL/min) = (U_cr [mg/dL] × V [mL/24h]) / (S_cr [mg/dL] × 1440 min).",
      "Normal: 90 – 120 mL/min/1.73m².",
      "Declines in CrCl indicate impaired GFR in AKI and CKD."
    ]
  },
  {
    id: "DQ-1282",
    srNo: 1282,
    unit: "unit-8-immuno",
    topic: "VIII Immunochemistry",
    type: "Short",
    question: "Explain the Enzyme-Linked Immunosorbent Assay (ELISA): Principle, Types, and Diagnostic Applications.",
    answerKeyPoints: [
      "Principle: Specific antigen-antibody binding detected via an enzyme-conjugated reporter producing a photometric signal.",
      "Types: Direct ELISA, Indirect ELISA, Sandwich ELISA (capture antibody), and Competitive ELISA.",
      "Applications: HIV screening, Hepatitis B/C, COVID-19 antibodies, tumor markers (PSA, CEA), hormone assays."
    ]
  }
];

export const VERY_SHORT_QUESTIONS = [
  ...nutritionVeryShortFrom99,
  // Nutrition & Dietetics Very Short Questions
  { id: "NUT-VSQ-1", srNo: 1, unit: "unit-nut-1-intro", type: "Very Short", question: "Define Nutrition.", answer: "Nutrition is the science of food and its relationship to health, concerned with the role of nutrients in body growth, development, repair, and maintenance." },
  { id: "NUT-VSQ-2", srNo: 2, unit: "unit-nut-1-intro", type: "Very Short", question: "State WHO definition of Health.", answer: "Health is a state of complete physical, mental, and social well-being and not merely the absence of disease or infirmity." },
  { id: "NUT-VSQ-3", srNo: 3, unit: "unit-nut-2-carbs", type: "Very Short", question: "What is Insoluble Dietary Fibre?", answer: "Insoluble dietary fibre (e.g., cellulose, wheat bran) adds bulk to stool, accelerates colonic transit, and prevents constipation and colon cancer." },
  { id: "NUT-VSQ-4", srNo: 4, unit: "unit-nut-3-fats", type: "Very Short", question: "Name two Essential Fatty Acids.", answer: "Linoleic acid (Omega-6) and α-Linolenic acid (Omega-3)." },
  { id: "NUT-VSQ-5", srNo: 5, unit: "unit-nut-4-minerals", type: "Very Short", question: "State the adult RDA for Iodine.", answer: "The Recommended Dietary Allowance (RDA) for Iodine is 150 micrograms (mcg) daily for adults (220 mcg in pregnancy, 290 mcg in lactation)." },
  { id: "NUT-VSQ-6", srNo: 6, unit: "unit-nut-5-balanced-diet", type: "Very Short", question: "State the WHO recommendation for iron-folic acid anemia prophylaxis in pregnancy.", answer: "60 mg elemental iron + 400 mcg folic acid daily for 6 months where anemia prevalence is <40% (extend by 3 months if >40%)." },
  { id: "NUT-VSQ-7", srNo: 7, unit: "unit-nut-6-deficiencies", type: "Very Short", question: "What is the hallmark clinical sign distinguishing Kwashiorkor from Marasmus?", answer: "Pitting edema (present in Kwashiorkor due to severe hypoalbuminemia, but absent in Marasmus)." },
  { id: "NUT-VSQ-8", srNo: 8, unit: "unit-nut-7-therapeutic", type: "Very Short", question: "What is the sodium allowance in a Severe Sodium Restricted diet?", answer: "500 to 700 mg of sodium per day with zero salt used in cooking." },
  { id: "NUT-VSQ-9", srNo: 9, unit: "unit-nut-8-cookery", type: "Very Short", question: "Define Poaching method of cooking.", answer: "Poaching is cooking food in the minimum amount of liquid at 80–85°C, just below the boiling point." },
  { id: "NUT-VSQ-10", srNo: 10, unit: "unit-nut-9-assessment", type: "Very Short", question: "What are the four components of ABCD Nutritional Assessment?", answer: "Anthropometric measurements, Biochemical tests, Clinical examination, and Dietary surveys." },
  { id: "NUT-VSQ-11", srNo: 11, unit: "unit-nut-10-programs", type: "Very Short", question: "Name the neurotoxin responsible for Neurolathyrism.", answer: "ODAP (β-N-oxalyl-amino-L-alanine, also known as BOAA) present in Kesari dal (Lathyrus sativus)." },

  // Biochemistry Very Short Questions
  { id: "VSQ-83", srNo: 83, unit: "unit-1-carbs", type: "Very Short", question: "Name four examples of Disaccharides.", answer: "Maltose, Lactose, Sucrose, and Trehalose." },
  { id: "VSQ-103", srNo: 103, unit: "unit-1-carbs", type: "Very Short", question: "Name four hormones regulating blood glucose levels.", answer: "Insulin (lowers glucose), Glucagon, Epinephrine, and Cortisol (raise glucose)." },
  { id: "VSQ-156", srNo: 156, unit: "unit-1-carbs", type: "Very Short", question: "Define HbA1c and state its diagnostic significance.", answer: "HbA1c reflects average glycemic control over the preceding 2 to 3 months (<5.7% normal, ≥6.5% diabetic)." },
  { id: "VSQ-348", srNo: 348, unit: "unit-2-lipids", type: "Very Short", question: "Define Essential Fatty Acids and name two examples.", answer: "Essential Fatty Acids cannot be synthesized by humans and must come from diet. Examples: Linoleic acid and α-Linolenic acid." },
  { id: "VSQ-373", srNo: 373, unit: "unit-2-lipids", type: "Very Short", question: "Name the three Ketone Bodies.", answer: "Acetoacetate, β-Hydroxybutyrate, and Acetone." },
  { id: "VSQ-624", srNo: 624, unit: "unit-3-proteins", type: "Very Short", question: "Recall the normal serum levels of Urea and Creatinine.", answer: "Serum Blood Urea: 20 – 40 mg/dL (BUN: 7 – 20 mg/dL); Serum Creatinine: 0.6 – 1.2 mg/dL." },
  { id: "VSQ-864", srNo: 864, unit: "unit-4-enzymes", type: "Very Short", question: "Define Cardiac Troponins.", answer: "Cardiac Troponins (cTnI and cTnT) are regulatory myocardial proteins serving as gold standard biomarkers for diagnosing Acute MI." },
  { id: "VSQ-982", srNo: 982, unit: "unit-5-acid-base", type: "Very Short", question: "Define pH and state the normal arterial blood pH.", answer: "pH is the negative log of H⁺ concentration. Normal arterial blood pH is tightly regulated between 7.35 and 7.45." },
  { id: "VSQ-1085", srNo: 1085, unit: "unit-6-heme", type: "Very Short", question: "Define Heme.", answer: "Heme is an iron-porphyrin prosthetic group consisting of Fe²⁺ coordinated within a protoporphyrin IX ring." },
  { id: "VSQ-1181", srNo: 1181, unit: "unit-7-organ", type: "Very Short", question: "Define Creatinine Clearance.", answer: "Creatinine clearance is the volume of plasma completely cleared of creatinine by the kidneys per minute (normal 90–120 mL/min)." },
  { id: "VSQ-1310", srNo: 1310, unit: "unit-8-immuno", type: "Very Short", question: "Which antibody crosses the human placenta?", answer: "Immunoglobulin G (IgG) is the only antibody class that crosses the placenta to confer passive immunity to the fetus." }
];

export const OFFICIAL_MCQS = [
  ...NUTRITION_OFFICIAL_MCQS,
  // Nutrition & Dietetics MCQs
  { id: "NUT-MCQ-1", srNo: 1, unit: "unit-nut-1-intro", topic: "Introduction to Nutrition", question: "According to WHO, health is defined as a state of complete", options: ["Physical well-being only", "Absence of disease only", "Physical, mental, and social well-being", "Financial and social well-being"], correctOption: "Physical, mental, and social well-being" },
  { id: "NUT-MCQ-2", srNo: 2, unit: "unit-nut-2-carbs", topic: "Carbohydrate", question: "Soluble dietary fibre helps to reduce the risk of heart disease primarily by", options: ["Increasing bile absorption", "Lowering total and LDL cholesterol", "Raising blood glucose rapidly", "Promoting fat synthesis"], correctOption: "Lowering total and LDL cholesterol" },
  { id: "NUT-MCQ-3", srNo: 3, unit: "unit-nut-3-fats", topic: "Fats", question: "Which of the following is a major rich dietary source of Eicosapentaenoic acid (EPA)?", options: ["Coconut oil", "Fish oil", "Mustard oil", "Palm oil"], correctOption: "Fish oil" },
  { id: "NUT-MCQ-4", srNo: 4, unit: "unit-nut-4-minerals", topic: "Minerals", question: "What percentage of total body calcium is stored in the bones and teeth?", options: ["50%", "75%", "90%", "99%"], correctOption: "99%" },
  { id: "NUT-MCQ-5", srNo: 5, unit: "unit-nut-5-balanced-diet", topic: "Balanced Diet", question: "The WHO recommended daily prophylactic dose for anemia in pregnancy is", options: ["30 mg iron + 100 mcg folic acid", "60 mg elemental iron + 400 mcg folic acid", "100 mg iron + 1000 mcg folic acid", "200 mg iron + 500 mcg folic acid"], correctOption: "60 mg elemental iron + 400 mcg folic acid" },
  { id: "NUT-MCQ-6", srNo: 6, unit: "unit-nut-6-deficiencies", topic: "Nutritional deficiency disorders", question: "A characteristic facial appearance seen in children suffering from Kwashiorkor is", options: ["Monkey face", "Moon face", "Mask-like face", "Leonine face"], correctOption: "Moon face" },
  { id: "NUT-MCQ-7", srNo: 7, unit: "unit-nut-7-therapeutic", topic: "Therapeutic diets", question: "In the dietary management of Glomerulonephritis, potassium content in vegetables is reduced by", options: ["Deep frying", "Leaching in excess water", "Microwave heating", "Sun drying"], correctOption: "Leaching in excess water" },
  { id: "NUT-MCQ-8", srNo: 8, unit: "unit-nut-8-cookery", topic: "Cookery rules", question: "Cooking food in steam generated from vigorously boiling water without direct contact is called", options: ["Poaching", "Stewing", "Steaming", "Simmering"], correctOption: "Steaming" },
  { id: "NUT-MCQ-9", srNo: 9, unit: "unit-nut-9-assessment", topic: "Nutrition assessment", question: "Spoon-shaped nails (Koilonychia) observed during clinical nutritional examination indicate deficiency of", options: ["Calcium", "Vitamin C", "Iron", "Iodine"], correctOption: "Iron" },
  { id: "NUT-MCQ-10", srNo: 10, unit: "unit-nut-10-programs", topic: "National Nutritional Programs", question: "Neurolathyrism causing spastic paraplegia is caused by consuming which pulse?", options: ["Arhar dal (Pigeon pea)", "Kesari dal (Lathyrus sativus)", "Moong dal (Green gram)", "Chana dal (Bengal gram)"], correctOption: "Kesari dal (Lathyrus sativus)" },

  // Biochemistry MCQs
  { id: "MCQ-1", srNo: 1, unit: "unit-1-carbs", topic: "I Carbohydrates", question: "Components of carbohydrate are", options: ["C, H, N and O", "C, H, and O", "C, N and H", "N, H and O"], correctOption: "C, H, and O" },
  { id: "MCQ-2", srNo: 2, unit: "unit-1-carbs", topic: "I Carbohydrates", question: "Which of the following is a monosaccharide?", options: ["Glucose", "Lactose", "Sucrose", "Maltose"], correctOption: "Glucose" },
  { id: "MCQ-5", srNo: 5, unit: "unit-1-carbs", topic: "I Carbohydrates", question: "The end product of aerobic glycolysis is", options: ["Acetyl CoA", "Lactate", "Pyruvate", "CO2 and H2O"], correctOption: "Pyruvate" },
  { id: "MCQ-10", srNo: 10, unit: "unit-1-carbs", topic: "I Carbohydrates", question: "The end product of anaerobic glycolysis is", options: ["Pyruvate", "Acetyl CoA", "Lactate", "Lactose"], correctOption: "Lactate" },
  { id: "MCQ-13", srNo: 13, unit: "unit-1-carbs", topic: "I Carbohydrates", question: "Which hormone stimulates glycolysis?", options: ["Insulin", "Glucagon", "Growth hormone", "Estrogen"], correctOption: "Insulin" },
  { id: "MCQ-23", srNo: 23, unit: "unit-1-carbs", topic: "I Carbohydrates", question: "Lactose is a disaccharide of which sugar units?", options: ["Glucose and Fructose", "Glucose and Galactose", "Glucose and Sucrose", "Glucose and Ribose"], correctOption: "Glucose and Galactose" },
  { id: "MCQ-50", srNo: 50, unit: "unit-1-carbs", topic: "I Carbohydrates", question: "Glucose gets excreted into urine when plasma glucose exceeds the renal threshold of", options: ["100 mg/dl", "140 mg/dl", "180 mg/dl", "220 mg/dl"], correctOption: "180 mg/dl" },
  { id: "MCQ-122", srNo: 122, unit: "unit-1-carbs", topic: "I Carbohydrates", question: "Which laboratory test best indicates glycemic control over 2 to 3 months?", options: ["Blood glucose", "HbA1c", "Serum ketone bodies", "Serum Insulin"], correctOption: "HbA1c" },
  { id: "MCQ-165", srNo: 165, unit: "unit-2-lipids", topic: "II Lipids", question: "A fatty acid NOT synthesized in the human body that must be supplied in diet is", options: ["Palmitic acid", "Oleic acid", "Linoleic acid", "Stearic acid"], correctOption: "Linoleic acid" },
  { id: "MCQ-183", srNo: 183, unit: "unit-2-lipids", topic: "II Lipids", question: "Which of the following is an example of monounsaturated fatty acids (MUFA)?", options: ["Palmitic acid", "Oleic acid", "Acetic acid", "Myristic acid"], correctOption: "Oleic acid" },
  { id: "MCQ-190", srNo: 190, unit: "unit-2-lipids", topic: "II Lipids", question: "The deficiency of Essential Fatty Acids in diet results in", options: ["Dermatitis", "Psoriasis", "Phrynoderma (Toad skin)", "Leukoderma"], correctOption: "Phrynoderma (Toad skin)" },
  { id: "MCQ-198", srNo: 198, unit: "unit-2-lipids", topic: "II Lipids", question: "Beta-oxidation of fatty acids occurs in the", options: ["Peroxisome", "Nucleus", "Mitochondria", "Lysosomes"], correctOption: "Mitochondria" }
];
