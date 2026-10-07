import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { User } from '../models/User.js';
import { Course } from '../models/Course.js';
import { Chapter } from '../models/Chapter.js';
import { Subtopic } from '../models/Subtopic.js';
import { Question } from '../models/Question.js';
import { Progress } from '../models/Progress.js';
import { Attempt } from '../models/Attempt.js';
import { ContentEmbedding } from '../models/ContentEmbedding.js';
import { ChatLog } from '../models/ChatLog.js';
import { indexSubtopicContent } from '../services/ragService.js';

dotenv.config();

const mongoUri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/nursing_lms';

export const seedDatabase = async () => {
  try {
    console.log(`[Seed] Connecting to MongoDB: ${mongoUri}...`);
    await mongoose.connect(mongoUri);
    console.log('[Seed] Connected to MongoDB. Clearing existing collections...');

    // Clear collections
    await User.deleteMany({});
    await Course.deleteMany({});
    await Chapter.deleteMany({});
    await Subtopic.deleteMany({});
    await Question.deleteMany({});
    await Progress.deleteMany({});
    await Attempt.deleteMany({});
    await ContentEmbedding.deleteMany({});
    await ChatLog.deleteMany({});

    console.log('[Seed] Seeding Default Users...');
    // 1. Seed Core Users
    const adminUser = await User.create({
      firebaseUid: 'admin-firebase-uid-jay',
      name: 'Jay Thakre (System Administrator)',
      email: 'jthakre62@gmail.com',
      password: 'Jay@1523',
      role: 'admin',
      status: 'active',
      isActive: true,
      createdBy: 'system'
    });

    const facultyUser = await User.create({
      firebaseUid: 'faculty-firebase-uid-002',
      name: 'Prof. Marcus Vance, MSN, CCRN',
      email: 'faculty@nursing-lms.edu',
      password: 'FacultyPass@2026',
      role: 'faculty',
      status: 'active',
      isActive: true,
      createdBy: adminUser.firebaseUid
    });

    const studentUser = await User.create({
      firebaseUid: 'student-firebase-uid-003',
      name: 'Elena Rostova (Student RN)',
      email: 'student@nursing-lms.edu',
      password: 'StudentPass@2026',
      role: 'student',
      status: 'active',
      isActive: true,
      createdBy: adminUser.firebaseUid
    });

    console.log('[Seed] Seeding Nursing Course & 10 Chapters...');
    // 2. Create Master Course
    const course = await Course.create({
      title: 'Comprehensive Clinical Nursing & NCLEX-RN Mastery',
      code: 'NUR-401',
      description: 'A rigorous, evidence-based curriculum covering foundational nursing, pharmacology, med-surg, maternal-child, mental health, and emergency care.'
    });

    // 3. Define 10 Clinical Chapters
    const chaptersData = [
      {
        order: 1,
        title: 'Fundamentals of Nursing, Safety & Infection Control',
        description: 'Sterile technique, standard vs transmission precautions, patient safety, fall risk, vital signs, and clinical documentation.',
        estimatedHours: 6,
        subtopics: [
          {
            order: 1,
            title: 'Infection Control & Standard Precautions',
            contentBody: `Infection prevention is the cornerstone of clinical safety. The chain of infection consists of the infectious agent, reservoir, portal of exit, mode of transmission, portal of entry, and susceptible host.

Standard precautions must be applied to all patients regardless of diagnosis. This includes hand hygiene using alcohol-based hand rub or soap and water (mandatory when hands are visibly soiled or caring for patients with Clostridioides difficile).

Transmission-based precautions include Contact (gloves, gown; required for MRSA, VRE, C. diff), Droplet (surgical mask within 3-6 feet; required for Influenza, Pertussis, Bacterial Meningitis), and Airborne (N95 respirator, negative pressure room; required for Tuberculosis, Measles, Varicella). PPE donning sequence: Gown -> Mask/Respirator -> Goggles/Face Shield -> Gloves. Doffing sequence: Gloves -> Goggles -> Gown -> Mask.`,
            summary: 'Review of standard and transmission-based precautions, PPE donning/doffing order, and C. difficile handwashing requirements.',
            clinicalPearls: [
              'Alcohol rubs do NOT destroy C. difficile spores; warm soap and water friction for 20 seconds is mandatory.',
              'Airborne precautions always require a fitted N95 respirator and an airborne infection isolation room (AIIR).'
            ],
            questions: [
              {
                text: 'A nurse is preparing to enter the room of a patient diagnosed with active pulmonary tuberculosis. Which personal protective equipment (PPE) is mandatory?',
                options: [
                  'Standard surgical mask and clean gloves',
                  'Fitted N95 particulate respirator mask',
                  'Sterile gloves and fluid-resistant gown only',
                  'Face shield with cloth mask'
                ],
                answer: 1,
                explanation: 'Active pulmonary tuberculosis requires Airborne Precautions, which mandates a fit-tested N95 or higher respirator and care in a negative-pressure isolation room.'
              },
              {
                text: 'Which sequence correctly represents the proper protocol for donning Personal Protective Equipment (PPE)?',
                options: [
                  'Gloves -> Gown -> Mask -> Goggles',
                  'Gown -> Mask or Respirator -> Goggles/Face Shield -> Gloves',
                  'Mask -> Gloves -> Gown -> Goggles',
                  'Goggles -> Gown -> Gloves -> Mask'
                ],
                answer: 1,
                explanation: 'The CDC standard donning sequence is: 1) Gown, 2) Mask/Respirator, 3) Goggles/Face shield, 4) Gloves pulled over the wrists of the gown.'
              }
            ]
          },
          {
            order: 2,
            title: 'Vital Signs, Assessment & Clinical Deterioration',
            contentBody: `Accurate vital signs measurement and early identification of clinical deterioration prevent inpatient mortality. Core parameters include Heart Rate (60-100 bpm), Respiratory Rate (12-20 bpm), Blood Pressure (<120/80 mmHg), Temperature (36.5°C-37.5°C / 97.7°F-99.5°F), and SpO2 (95%-100%).

Early Warning Scores (MEWS/NEWS) aggregate changes in respiratory rate, oxygen saturation, systolic BP, pulse, consciousness (AVPU scale), and temperature. A rising respiratory rate is often the earliest and most sensitive predictor of physiological decline, impending respiratory failure, or sepsis.

Orthostatic hypotension is diagnosed when systolic blood pressure drops >= 20 mmHg or diastolic drops >= 10 mmHg within 3 minutes of standing from a supine position, often accompanied by tachycardia.`,
            summary: 'Core vital sign parameters, early warning recognition, and orthostatic blood pressure assessment.',
            clinicalPearls: [
              'An unexplained increase in respiratory rate is frequently the first indicator of systemic decompensation.',
              'Always palpate the radial pulse before auscultating the apical pulse if irregular rhythms are suspected.'
            ],
            questions: [
              {
                text: 'Which vital sign change is considered the earliest and most sensitive indicator of physiological deterioration in a hospitalized adult patient?',
                options: [
                  'A sudden drop in core body temperature',
                  'An elevation in respiratory rate (tachypnea)',
                  'A widening pulse pressure',
                  'A decrease in diastolic blood pressure'
                ],
                answer: 1,
                explanation: 'Tachypnea is the earliest and most sensitive clinical indicator of clinical deterioration, metabolic acidosis compensation, or impending respiratory failure.'
              }
            ]
          }
        ]
      },
      {
        order: 2,
        title: 'Pharmacology, Dosage Calculations & Medication Safety',
        description: 'Safe medication administration, 10 rights, high-alert medications, IV flow rate and reconstitution formulas, adverse drug events.',
        estimatedHours: 8,
        subtopics: [
          {
            order: 1,
            title: 'The Rights of Medication Administration & High-Alert Drugs',
            contentBody: `Medication administration safety revolves around the fundamental Rights: Right Patient (2 identifiers: Name & DOB), Right Drug, Right Dose, Right Route, Right Time, Right Reason, Right Documentation, Right Response, Right to Refuse, and Right Education.

High-alert medications bear a heightened risk of causing significant patient harm when used in error. The ISMP list includes PINCH medications: Potassium (IV concentrates must never be pushed), Insulin, Narcotics/Opioids, Chemotherapy, and Heparin/Anticoagulants. Independent double-check by two registered nurses is mandatory prior to administration of high-alert medications.

For IV Potassium Chloride (KCl), maximum peripheral infusion rate is 10 mEq/hr, and maximum central line rate is 20 mEq/hr under continuous cardiac monitoring. Direct IV push of Potassium is fatal and strictly contraindicated.`,
            summary: 'Medication administration safety rights, ISMP high-alert drug protocols, and intravenous potassium administration guidelines.',
            clinicalPearls: [
              'Never administer intravenous potassium chloride (KCl) as an IV bolus or push; it causes immediate cardiac arrest.',
              'Always perform an independent calculation and dual verification for continuous insulin and heparin infusions.'
            ],
            questions: [
              {
                text: 'A physician orders 40 mEq Potassium Chloride (KCl) in 500 mL normal saline for a patient with severe hypokalemia. What is the safest nursing action regarding administration?',
                options: [
                  'Administer the solution via rapid IV push over 5 minutes',
                  'Infuse via an electronic infusion pump at a rate not exceeding 10 mEq/hr peripherally',
                  'Add the potassium directly to a hanging bag of lactated ringers',
                  'Inject the potassium into the patient’s existing secondary piggyback tubing'
                ],
                answer: 1,
                explanation: 'Potassium chloride must always be diluted, delivered via an electronic infusion pump, and infused at <= 10 mEq/hr through peripheral lines (or <= 20 mEq/hr centrally with ECG monitoring). Direct IV push is lethal.'
              }
            ]
          },
          {
            order: 2,
            title: 'Dosage Calculations, IV Flow Rates & Titration',
            contentBody: `Safe dosage calculation requires solid mastery of dimensional analysis and formula methods:
Basic Formula: (Desired / On Hand) x Vehicle = Quantity to Administer.

IV Flow Rate (mL/hr) = Total Volume (mL) / Time (hours).
Drop Rate (gtt/min) = (Total Volume in mL x Drop Factor in gtt/mL) / Time in minutes.

Weight-based dosing: Always convert pounds (lbs) to kilograms (kg) first by dividing by 2.2 (1 kg = 2.2 lbs). Rounding rules: for values < 1 mL, round to the nearest hundredth; for values > 1 mL, round to the nearest tenth.

Example: Order is Dopamine 5 mcg/kg/min for a 176 lb patient. 176 / 2.2 = 80 kg. Dose = 5 mcg x 80 kg x 60 min = 24,000 mcg/hr (24 mg/hr).`,
            summary: 'Step-by-step dosage calculations, drop factor formulas, and weight-based metric conversions.',
            clinicalPearls: [
              'Always convert patient weight into kilograms prior to calculating critical care infusions.',
              'Never round intermediate calculations; round only the final calculated dosage.'
            ],
            questions: [
              {
                text: 'A provider orders 1,000 mL of 0.9% Normal Saline to infuse over 8 hours. The infusion tubing drop factor is 15 gtt/mL. What is the correct flow rate in drops per minute (gtt/min)?',
                options: [
                  '21 gtt/min',
                  '31 gtt/min',
                  '42 gtt/min',
                  '125 gtt/min'
                ],
                answer: 1,
                explanation: 'Formula: (1,000 mL * 15 gtt/mL) / (8 hours * 60 min) = 15,000 / 480 = 31.25 -> 31 gtt/min.'
              }
            ]
          }
        ]
      },
      {
        order: 3,
        title: 'Medical-Surgical: Cardiovascular System & Hematology',
        description: 'Coronary artery disease, acute coronary syndrome, heart failure management, dysrhythmias, hypertension, and anticoagulant therapy.',
        estimatedHours: 8,
        subtopics: [
          {
            order: 1,
            title: 'Acute Coronary Syndrome & Myocardial Infarction Management',
            contentBody: `Acute Coronary Syndrome (ACS) encompasses Unstable Angina, NSTEMI, and STEMI. Cardinal symptoms include retrosternal chest pain radiating to the left arm, jaw, or epigastrium, diaphoresis, dyspnea, and nausea (women and diabetics frequently present with atypical symptoms like fatigue, nausea, and shortness of breath).

Immediate interventions for suspected ACS:
1. 12-lead ECG within 10 minutes of arrival (ST-elevation indicates STEMI requiring emergent reperfusion within 90 minutes door-to-balloon time).
2. Oxygen therapy only if SpO2 < 90%.
3. Aspirin 162-325 mg chewed immediately.
4. Nitroglycerin sublingual every 5 minutes up to 3 doses (contraindicated if SBP < 90 mmHg, severe bradycardia, or recent phosphodiesterase-5 inhibitor use like sildenafil).
5. Morphine IV if pain is unresolved with nitrates.
6. Serial cardiac biomarkers: Troponin I and T are gold standards, rising within 2-4 hours, peaking at 24 hours.`,
            summary: 'ACS recognition, 12-lead ECG prioritization, MONA protocol nuances, and troponin monitoring.',
            clinicalPearls: [
              'Hold sublingual nitroglycerin if systolic blood pressure is below 90 mmHg or if patient took sildenafil within 24-48 hours.',
              'Female and diabetic patients frequently present with silent or atypical myocardial infarction signs.'
            ],
            questions: [
              {
                text: 'A 58-year-old male arrives at the Emergency Department reporting crushing chest pain. The triage nurse notes the patient took sildenafil (Viagra) 12 hours ago. Which medication is strictly contraindicated?',
                options: [
                  'Aspirin 325 mg chewed',
                  'Sublingual Nitroglycerin 0.4 mg',
                  'Intravenous Morphine 2 mg',
                  'Oxygen via nasal cannula at 2 L/min'
                ],
                answer: 1,
                explanation: 'Nitroglycerin and other nitrates are strictly contraindicated within 24-48 hours of phosphodiesterase inhibitors (sildenafil/tadalafil) due to the risk of life-threatening profound hypotension.'
              }
            ]
          }
        ]
      },
      {
        order: 4,
        title: 'Medical-Surgical: Respiratory System & Acid-Base Balance',
        description: 'Arterial blood gas (ABG) interpretation, COPD, pneumonia, acute respiratory distress syndrome (ARDS), and mechanical ventilation.',
        estimatedHours: 7,
        subtopics: [
          {
            order: 1,
            title: 'Arterial Blood Gas (ABG) Interpretation & Respiratory Failure',
            contentBody: `Normal ABG values:
- pH: 7.35 – 7.45 (Acidosis < 7.35; Alkalosis > 7.45)
- PaCO2: 35 – 45 mmHg (Respiratory component; inverse relationship with pH)
- HCO3-: 22 – 26 mEq/L (Metabolic component; direct relationship with pH)
- PaO2: 80 – 100 mmHg

ROME mnemonic:
- Respiratory Opposite (pH up, PaCO2 down = Respiratory Alkalosis; pH down, PaCO2 up = Respiratory Acidosis).
- Metabolic Equal (pH down, HCO3 down = Metabolic Acidosis; pH up, HCO3 up = Metabolic Alkalosis).

In COPD patients with chronic hypercapnia, their respiratory drive is primarily stimulated by hypoxemia (hypoxic drive). Excessive supplemental oxygen administration can blunt this drive; target SpO2 is typically 88-92%.`,
            summary: 'ABG normal values, the ROME method, and oxygenation targets for chronic COPD patients.',
            clinicalPearls: [
              'In patients with chronic hypercapnic respiratory failure (COPD), aim for target SpO2 of 88% to 92%.',
              'ROME method: Respiratory Opposite, Metabolic Equal for rapid, error-free ABG interpretation.'
            ],
            questions: [
              {
                text: 'An ABG report for a post-operative patient reveals: pH 7.28, PaCO2 54 mmHg, and HCO3- 24 mEq/L. How should the nurse interpret these findings?',
                options: [
                  'Uncompensated Metabolic Acidosis',
                  'Uncompensated Respiratory Acidosis',
                  'Fully Compensated Respiratory Alkalosis',
                  'Partially Compensated Metabolic Alkalosis'
                ],
                answer: 1,
                explanation: 'The pH is low (< 7.35 = acidosis), PaCO2 is high (> 45 = respiratory origin), and HCO3- is normal (22-26 = uncompensated). Thus, this is Uncompensated Respiratory Acidosis.'
              }
            ]
          }
        ]
      },
      {
        order: 5,
        title: 'Medical-Surgical: Neurological & Sensory Disorders',
        description: 'Glasgow Coma Scale, ischemic vs hemorrhagic stroke, increased intracranial pressure (ICP), seizure precautions, and spinal cord injuries.',
        estimatedHours: 7,
        subtopics: [
          {
            order: 1,
            title: 'Glasgow Coma Scale & Increased Intracranial Pressure (ICP)',
            contentBody: `The Glasgow Coma Scale (GCS) evaluates Eye Opening (1-4), Verbal Response (1-5), and Motor Response (1-6). Minimum score is 3 (deep coma or brain death), maximum score is 15 (fully alert). A GCS score <= 8 is a classic indication for endotracheal intubation ("GCS of 8, intubate").

Normal ICP is 5 – 15 mmHg. Sustained ICP > 20 mmHg requires prompt intervention.
Cushing's Triad (late sign of brain herniation):
1. Severe Systolic Hypertension with Widening Pulse Pressure.
2. Bradycardia (slow, bounding pulse).
3. Irregular, bradypneic respirations (Cheyne-Stokes breathing).

Nursing interventions for elevated ICP: Elevate head of bed (HOB) 30 degrees, maintain neutral head/neck alignment, avoid hip flexion, avoid clustering nursing activities, prevent hyperthermia, and maintain normocapnia (PaCO2 35-40 mmHg).`,
            summary: 'GCS scoring criteria, signs of elevated ICP, Cushing triad, and positioning nursing interventions.',
            clinicalPearls: [
              'Cushing’s triad (systolic hypertension with widening pulse pressure, bradycardia, irregular respirations) represents impending transtentorial herniation.',
              'Maintain head of bed at 30 degrees and head in neutral midline position to optimize jugular venous drainage.'
            ],
            questions: [
              {
                text: 'A patient with traumatic brain injury exhibits a blood pressure of 190/60 mmHg, heart rate of 44 bpm, and irregular respirations. What clinical condition is indicated?',
                options: [
                  'Spinal shock syndrome',
                  'Cushing’s triad indicating severe increased intracranial pressure',
                  'Hypovolemic shock',
                  'Autonomic dysreflexia'
                ],
                answer: 1,
                explanation: 'Widened pulse pressure (190/60), bradycardia (44 bpm), and irregular respirations constitute Cushing’s Triad, a critical late sign of elevated ICP and impending brainstem herniation.'
              }
            ]
          }
        ]
      },
      {
        order: 6,
        title: 'Maternal, Newborn & Women’s Health',
        description: 'Stages of labor, fetal heart rate monitoring, postpartum hemorrhage, preeclampsia, and neonatal APGAR assessment.',
        estimatedHours: 6,
        subtopics: [
          {
            order: 1,
            title: 'Fetal Heart Rate Monitoring & Obstetric Emergencies',
            contentBody: `Fetal Heart Rate (FHR) interpretation utilizes the VEAL CHOP mnemonic:
- Variable decelerations -> Cord compression (Intervention: Reposition mother, amnioinfusion).
- Early decelerations -> Head compression (Normal finding during labor descent).
- Accelerations -> OK / Oxygenated (Reassuring sign of fetal well-being).
- Late decelerations -> Placental insufficiency (Emergency: Stop oxytocin, Left lateral position, Oxygen 10L via non-rebreather, IV fluid bolus).

Postpartum Hemorrhage (PPH) is defined as blood loss > 500 mL for vaginal delivery or > 1000 mL for Cesarean section. The leading cause is Uterine Atony (boggy uterus). Initial nursing action is vigorous Fundal Massage until firm, followed by bladder catheterization and oxytocic medications (Oxytocin, Methylergonovine - contraindicated in hypertension, Carboprost tromethamine - contraindicated in asthma).`,
            summary: 'VEAL CHOP mnemonic, late decelerations protocol, and postpartum hemorrhage / uterine atony management.',
            clinicalPearls: [
              'Late decelerations indicate uteroplacental insufficiency: immediately stop oxytocin, turn mother to left lateral position, and administer 10 L O2 via non-rebreather.',
              'The first and most important nursing action for a boggy, bleeding postpartum uterus is fundal massage.'
            ],
            questions: [
              {
                text: 'During labor monitoring, the nurse notes persistent late decelerations on the fetal heart rate tracing. Which action should the nurse take FIRST?',
                options: [
                  'Increase the intravenous oxytocin infusion rate',
                  'Position the mother on her left side and discontinue oxytocin',
                  'Prepare for immediate vacuum-assisted vaginal delivery',
                  'Administer a sublingual dose of nitroglycerin'
                ],
                answer: 1,
                explanation: 'Late decelerations indicate uteroplacental insufficiency. First priority actions are stopping oxytocin, turning the mother to her left side (to relieve vena cava compression), applying oxygen, and increasing IV fluids.'
              }
            ]
          }
        ]
      },
      {
        order: 7,
        title: 'Pediatric Nursing & Growth Milestones',
        description: 'Developmental stages (Piaget/Erikson), pediatric vital signs, pediatric medication administration, respiratory syncytial virus (RSV), and croup.',
        estimatedHours: 6,
        subtopics: [
          {
            order: 1,
            title: 'Developmental Milestones & Pediatric Respiratory Distress',
            contentBody: `Pediatric assessment requires understanding age-appropriate anatomical and physiological differences.
Anatomy: Infants are obligate nose breathers until ~4 months; smaller airway diameter makes mild edema cause marked airway resistance.

Signs of Respiratory Distress in Pediatrics:
- Tachypnea (earliest sign)
- Intercostal, subcostal, and substernal retractions
- Nasal flaring
- Expiratory grunting (physiologic attempt to generate PEEP and prevent alveolar collapse)
- Stridor (indicative of upper airway obstruction such as in Croup/Laryngotracheobronchitis)

Developmental Milestones:
- 2 months: Smiles, holds head up briefly
- 6 months: Rolls over both ways, sits with support, transfers objects hand to hand
- 12 months: Stands alone, takes first steps, speaks 1-2 words ("mama", "dada")
- 18 months: Walks up stairs with help, builds 3-4 cube tower.`,
            summary: 'Pediatric developmental milestones, anatomical airway considerations, and cardinal signs of infant respiratory failure.',
            clinicalPearls: [
              'Expiratory grunting in an infant is a critical sign of impending respiratory failure; it represents an attempt to preserve functional residual capacity.',
              'Never inspect the throat with a tongue blade if epiglottitis is suspected, as this can trigger complete laryngospasm.'
            ],
            questions: [
              {
                text: 'A 9-month-old infant is admitted with bronchiolitis. Which clinical assessment finding represents an ominous sign of severe respiratory fatigue?',
                options: [
                  'Bilateral audible wheezes',
                  'Nasal flaring with crying',
                  'Expiratory grunting and brief episodes of apnea',
                  'Heart rate of 130 bpm'
                ],
                answer: 2,
                explanation: 'Expiratory grunting and apneic pauses in an infant with bronchiolitis indicate impending respiratory muscle exhaustion and require immediate airway support.'
              }
            ]
          }
        ]
      },
      {
        order: 8,
        title: 'Psychiatric & Mental Health Nursing',
        description: 'Therapeutic communication, schizophrenia, major depressive disorder, bipolar mania, suicide risk assessment, and psychopharmacology.',
        estimatedHours: 5,
        subtopics: [
          {
            order: 1,
            title: 'Therapeutic Communication & Psychopharmacology Safety',
            contentBody: `Therapeutic communication principles: Active listening, open-ended questioning, reflecting, clarifying, and silence. Avoid false reassurance ("everything will be fine"), asking "why" (causes defensiveness), or giving unsolicited advice.

Suicide Risk Assessment: Always ask direct, unambiguous questions: "Are you thinking about hurting or killing yourself?" If yes, ask: "Do you have a specific plan?" and "Do you have access to the means?" Patients with active plans require continuous 1:1 observation and safety precautions.

Psychopharmacology:
- Lithium (Bipolar disorder): Therapeutic range 0.6 – 1.2 mEq/L. Toxic at > 1.5 mEq/L (ataxia, tremors, tinnitus, confusion, polyuria). Maintain consistent dietary sodium and fluid intake (hyponatremia precipitates lithium toxicity).
- Serotonin Syndrome: Agitation, hyperreflexia, clonus, hyperthermia, diaphoresis. Risk when SSRIs/SNRIs are combined with MAOIs, St. John’s Wort, or Tramadol.`,
            summary: 'Therapeutic communication dos and don’ts, direct suicide inquiry protocol, and lithium therapeutic monitoring.',
            clinicalPearls: [
              'Always ask direct, explicit questions when assessing suicide ideation; direct questions do not plant suicidal ideas.',
              'Lithium toxicity is precipitated by sodium depletion and dehydration; patients must maintain steady sodium and fluid intake.'
            ],
            questions: [
              {
                text: 'A patient receiving Lithium therapy for bipolar disorder has a serum lithium level of 2.1 mEq/L and presents with coarse hand tremors, ataxia, and blurred vision. What is the priority nursing action?',
                options: [
                  'Administer the scheduled next dose with a full glass of water',
                  'Withhold the medication immediately and notify the healthcare provider',
                  'Instruct the patient to restrict dietary sodium intake',
                  'Encourage the patient to perform range of motion exercises'
                ],
                answer: 1,
                explanation: 'A lithium level of 2.1 mEq/L is well above the therapeutic range (0.6-1.2 mEq/L) and indicates moderate-to-severe toxicity. The dose must be held immediately and the provider notified for emergency clearance.'
              }
            ]
          }
        ]
      },
      {
        order: 9,
        title: 'Critical Care, Emergency Nursing & Disaster Triage',
        description: 'Primary and secondary trauma survey, septic shock bundle, arterial lines, vasopressors, and START disaster color triage.',
        estimatedHours: 6,
        subtopics: [
          {
            order: 1,
            title: 'Emergency Trauma Survey & Disaster Color Triage (START)',
            contentBody: `Trauma Primary Survey follows the ABCDE mnemonic:
- A: Airway with cervical spine stabilization (Jaw-thrust maneuver, not head-tilt chin-lift in trauma).
- B: Breathing and ventilation (Assess for tension pneumothorax, flail chest).
- C: Circulation and hemorrhage control (Direct pressure, pelvic binder, large-bore 16/18G IV access).
- D: Disability (GCS, pupil reactivity).
- E: Exposure and environmental control (Prevent hypothermia).

START Disaster Mass-Casualty Triage Categories:
- RED (Immediate): Life-threatening injuries with high survival probability if treated immediately (e.g., tension pneumothorax, open chest wound, uncontrolled arterial bleeding).
- YELLOW (Delayed): Serious injuries requiring care within hours (e.g., stable closed fractures, deep lacerations with controlled bleeding).
- GREEN (Minimal): "Walking wounded", minor abrasions and sprains.
- BLACK (Expectant/Deceased): Catastrophic non-survivable injuries or absent respirations despite positioning airway (e.g., massive open head trauma, pulselessness).`,
            summary: 'ABCDE primary trauma protocol, cervical spine management, and START mass casualty color tagging system.',
            clinicalPearls: [
              'Use the jaw-thrust maneuver without head extension for airway opening whenever cervical spine trauma cannot be excluded.',
              'In mass casualty triage, victims with no respirations after a single airway repositioning attempt are tagged Black (Expectant).'
            ],
            questions: [
              {
                text: 'At a multi-vehicle accident disaster scene, a triage nurse assesses a victim who has open leg fractures, is alert and oriented, with a respiratory rate of 22 bpm, capillary refill < 2 seconds, and palpable radial pulses. Which triage tag is appropriate?',
                options: [
                  'Red (Immediate)',
                  'Yellow (Delayed)',
                  'Green (Minimal)',
                  'Black (Expectant)'
                ],
                answer: 1,
                explanation: 'Under START triage, this patient can follow commands, has stable respiration (<30) and perfusion (cap refill <2s), but cannot walk due to major fractures, classifying them as Yellow (Delayed).'
              }
            ]
          }
        ]
      },
      {
        order: 10,
        title: 'Nursing Leadership, Ethics, Law & Quality Improvement',
        description: 'Principles of delegation, scope of practice (RN vs LPN/LVN vs UAP), informed consent, HIPAA, and Root Cause Analysis.',
        estimatedHours: 5,
        subtopics: [
          {
            order: 1,
            title: 'Delegation Rules & Scope of Practice (RN vs LPN vs UAP)',
            contentBody: `The Five Rights of Delegation: Right Task, Right Circumstance, Right Person, Right Direction/Communication, Right Supervision/Evaluation.

Core Rule for the Registered Nurse:
The RN CANNOT delegate any task requiring Clinical Judgment, Assessment, Planning, Initial Teaching, or Complex Evaluation ("EAT": Evaluate, Assess, Teach).

Delegation Scopes:
- Unlicensed Assistive Personnel (UAP): Routine vital signs on stable patients, ambulation, transfers, feeding (stable patients without dysphagia), hygiene, intake/output recording.
- Licensed Practical/Vocational Nurse (LPN/LVN): Administering oral and subcutaneous medications, routine dressing changes, inserting Foley catheters, reinforced teaching (after initial RN teaching), monitoring focused assessments of stable patients.
- Registered Nurse (RN): Comprehensive admission assessments, initial patient discharge education, formulating nursing care plans, blood transfusion administration, IV push medication administration, and care of unstable patients.`,
            summary: 'The 5 rights of delegation, the EAT rule (Evaluate, Assess, Teach), and clear boundaries between RN, LPN, and UAP.',
            clinicalPearls: [
              'Do not delegate what you can EAT: Evaluate, Assess, Teach.',
              'The registered nurse always retains ultimate accountability for delegated client outcomes.'
            ],
            questions: [
              {
                text: 'Which task is most appropriate for a registered nurse (RN) to delegate to an experienced Unlicensed Assistive Personnel (UAP)?',
                options: [
                  'Measuring and recording the intake and output of a stable postoperative patient',
                  'Administering the first dose of an oral antibiotic to an admitted patient',
                  'Teaching a diabetic patient how to perform capillary blood glucose testing',
                  'Performing the initial wound assessment on a newly placed surgical drain'
                ],
                answer: 0,
                explanation: 'Measuring routine intake and output on a stable client is a standardized task within the UAP scope of practice. Medication administration, initial education, and wound assessments require RN clinical judgment.'
              }
            ]
          }
        ]
      }
    ];

    let totalSubtopicsCreated = 0;
    let totalQuestionsCreated = 0;

    for (const chData of chaptersData) {
      const chapter = await Chapter.create({
        courseId: course._id,
        order: chData.order,
        title: chData.title,
        description: chData.description,
        estimatedHours: chData.estimatedHours
      });

      console.log(`[Seed] -> Created Chapter ${chapter.order}: ${chapter.title}`);

      for (const subData of chData.subtopics) {
        const subtopic = await Subtopic.create({
          chapterId: chapter._id,
          order: subData.order,
          title: subData.title,
          contentBody: subData.contentBody,
          summary: subData.summary,
          clinicalPearls: subData.clinicalPearls
        });
        totalSubtopicsCreated++;

        // Index subtopic into vector store for RAG chatbot
        await indexSubtopicContent(chapter._id, subtopic._id, subtopic.title, subtopic.contentBody);

        // Create subtopic quiz questions
        if (subData.questions && subData.questions.length > 0) {
          for (const q of subData.questions) {
            await Question.create({
              scopeType: 'subtopic',
              scopeId: subtopic._id,
              text: q.text,
              options: q.options,
              answer: q.answer,
              explanation: q.explanation,
              difficulty: 'medium'
            });
            totalQuestionsCreated++;
          }
        }
      }

      // Create Chapter-Level Final Exam Questions
      await Question.create({
        scopeType: 'chapter',
        scopeId: chapter._id,
        text: `[Chapter ${chapter.order} Comprehensive Final Question] Which clinical protocol represents the highest evidence-based standard of care in ${chapter.title}?`,
        options: [
          'Strict adherence to standardized assessment, double-check verifications, and timely interprofessional communication',
          'Relying solely on verbal orders during shift transitions without written verification',
          'Documenting patient assessments prior to performing physical examinations to save charting time',
          'Discontinuing patient monitoring once initial vital signs fall within normal limits'
        ],
        answer: 0,
        explanation: `Evidence-based nursing practice in ${chapter.title} necessitates rigorous protocol adherence, patient identification, dual verification for high-risk interventions, and closed-loop communication.`,
        difficulty: 'hard'
      });
      totalQuestionsCreated++;
    }

    // 4. Create Course-Level Final Exam Question
    await Question.create({
      scopeType: 'course',
      scopeId: course._id,
      text: '[NCLEX Grand Final] In accordance with professional standards of nursing practice and clinical prioritization, which patient should the nurse assess FIRST during morning shift rounds?',
      options: [
        'A 62-year-old post-op patient reporting mild incision pain of 3/10',
        'A 45-year-old asthmatic patient whose breath sounds have transitioned from loud wheezing to a silent chest',
        'A 70-year-old diabetic patient awaiting routine fasting blood glucose check with no distress',
        'A 50-year-old patient requesting discharge education paperwork'
      ],
      answer: 1,
      explanation: 'A transitioning of breath sounds from wheezing to a "silent chest" indicates severe bronchospasm, acute airway closure, and impending respiratory arrest, demanding immediate life-saving intervention (Airway priority).'
    });
    totalQuestionsCreated++;

    // 5. Initialize Student Progress: Chapter 1, Subtopic 1 unlocked (in-progress)
    const firstChapter = await Chapter.findOne({ order: 1 });
    const firstSubtopic = await Subtopic.findOne({ chapterId: firstChapter._id, order: 1 });

    await Progress.create({
      studentId: studentUser.firebaseUid,
      chapterId: firstChapter._id,
      subtopicId: firstSubtopic._id,
      status: 'in-progress',
      unlockedAt: new Date()
    });

    console.log(`\n======================================================`);
    console.log(`[Seed Complete] Successfully seeded Nursing LMS:`);
    console.log(`  - 3 Core Users (Admin, Faculty, Student)`);
    console.log(`  - 1 Master Course`);
    console.log(`  - 10 Clinical Chapters`);
    console.log(`  - ${totalSubtopicsCreated} Subtopics with Vector Embeddings (RAG ready)`);
    console.log(`  - ${totalQuestionsCreated} NCLEX-format Assessment Questions`);
    console.log(`======================================================\n`);
  } catch (error) {
    console.error('[Seed Error]:', error);
  } finally {
    await mongoose.disconnect();
  }
};

// If run directly via node
if (process.argv[1]?.endsWith('seedData.js')) {
  seedDatabase().then(() => process.exit(0));
}
