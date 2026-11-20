import React, { useState, useEffect, useRef } from 'react';
import { useAuth } from '../context/AuthContext';
import apiClient from '../api/client';
import { findSimilarLocal } from '../services/openaiMemoryCache';
import {
  Sparkles,
  Send,
  X,
  ChevronDown,
  Volume2,
  VolumeX,
  Copy,
  Check,
  PanelLeft,
  SquarePen,
  MessageSquare,
  Trash2,
  BookOpen,
  ExternalLink
} from 'lucide-react';

const CONVERSATIONS_STORAGE_KEY = 'nova_chat_conversations_v3';

// Strip any unwanted emojis or strange decorative symbols
const stripEmojis = (str) => {
  if (!str) return '';
  return str.replace(/[\u{1F300}-\u{1FAFF}]|[\u{2600}-\u{26FF}]|[\u{2700}-\u{27BF}]/gu, '');
};

// Render inline Markdown formatting (bold, italics, code)
const renderInlineMarkdown = (text) => {
  if (!text) return null;
  const clean = stripEmojis(text);

  const tokens = clean.split(/(\*\*[^*]+\*\*|`[^`]+`|\*[^*]+\*)/g);

  return tokens.map((token, idx) => {
    if (!token) return null;
    if (token.startsWith('**') && token.endsWith('**') && token.length >= 4) {
      return (
        <strong key={idx} className="font-semibold text-[#123B50]">
          {token.slice(2, -2)}
        </strong>
      );
    }
    if (token.startsWith('`') && token.endsWith('`') && token.length >= 2) {
      return (
        <code key={idx} className="px-1.5 py-0.5 rounded bg-neutral-100 text-[#123B50] font-mono text-[11.5px]">
          {token.slice(1, -1)}
        </code>
      );
    }
    if (token.startsWith('*') && token.endsWith('*') && token.length >= 2) {
      return (
        <em key={idx} className="italic text-[#263746]">
          {token.slice(1, -1)}
        </em>
      );
    }
    return <span key={idx}>{token}</span>;
  });
};

// Claude-style clean markdown renderer for assistant responses
const ClaudeMarkdown = ({ content }) => {
  if (!content) return null;

  const lines = content.split('\n');
  const elements = [];
  let currentList = null;

  const flushList = () => {
    if (!currentList) return;
    if (currentList.type === 'ul') {
      elements.push(
        <ul key={`ul-${elements.length}`} className="my-2 space-y-1.5 pl-0.5">
          {currentList.items.map((item, i) => (
            <li
              key={i}
              className={`flex items-start gap-2 text-[13px] text-[#263746] leading-relaxed ${item.isSub ? 'ml-5 text-[12.5px] text-[#263746]/90' : ''
                }`}
            >
              <span className="text-[#159A91] mt-1 shrink-0 text-xs leading-none select-none">
                {item.isSub ? '○' : '•'}
              </span>
              <span className="flex-1">{renderInlineMarkdown(item.text)}</span>
            </li>
          ))}
        </ul>
      );
    } else if (currentList.type === 'ol') {
      elements.push(
        <ol key={`ol-${elements.length}`} className="my-2 space-y-1.5 pl-0.5">
          {currentList.items.map((item, i) => (
            <li key={i} className="flex items-start gap-2 text-[13px] text-[#263746] leading-relaxed">
              <span className="font-semibold text-[#159A91] shrink-0 text-xs min-w-[18px] select-none">
                {i + 1}.
              </span>
              <span className="flex-1">{renderInlineMarkdown(item.text)}</span>
            </li>
          ))}
        </ol>
      );
    }
    currentList = null;
  };

  for (let i = 0; i < lines.length; i++) {
    const rawLine = lines[i];
    const trimmed = rawLine.trim();

    if (!trimmed) {
      flushList();
      continue;
    }

    const headingMatch = trimmed.match(/^(#{1,3})\s+(.*)$/);
    if (headingMatch) {
      flushList();
      const level = headingMatch[1].length;
      const headingText = headingMatch[2];
      elements.push(
        <div
          key={`h-${elements.length}`}
          className={`font-bold text-[#123B50] ${level === 1
            ? 'text-base mt-3 mb-1.5'
            : level === 2
              ? 'text-sm mt-2.5 mb-1'
              : 'text-[13px] uppercase tracking-wider text-[#123B50] mt-2 mb-1'
            }`}
        >
          {renderInlineMarkdown(headingText)}
        </div>
      );
      continue;
    }

    const subBulletMatch = rawLine.match(/^(\s{2,}|\t+)[•\-\*]\s+(.*)$/);
    if (subBulletMatch) {
      if (!currentList || currentList.type !== 'ul') {
        flushList();
        currentList = { type: 'ul', items: [] };
      }
      currentList.items.push({ text: subBulletMatch[2], isSub: true });
      continue;
    }

    const bulletMatch = trimmed.match(/^[•\-\*]\s+(.*)$/);
    if (bulletMatch) {
      if (!currentList || currentList.type !== 'ul') {
        flushList();
      }
      if (!currentList) {
        currentList = { type: 'ul', items: [] };
      }
      currentList.items.push({ text: bulletMatch[1], isSub: false });
      continue;
    }

    const numberedMatch = trimmed.match(/^(\d+)[\.\)]\s+(.*)$/);
    if (numberedMatch) {
      if (!currentList || currentList.type !== 'ol') {
        flushList();
      }
      if (!currentList) {
        currentList = { type: 'ol', items: [] };
      }
      currentList.items.push({ text: numberedMatch[2], isSub: false });
      continue;
    }

    flushList();
    elements.push(
      <p key={`p-${elements.length}`} className="text-[13px] leading-relaxed text-[#263746] mb-2.5 last:mb-0">
        {renderInlineMarkdown(trimmed)}
      </p>
    );
  }

  flushList();

  return <div className="space-y-0.5">{elements}</div>;
};

// Conversational AI handler for natural greetings and small talk
const getConversationalResponse = (query) => {
  const normalized = (query || '').trim().toLowerCase().replace(/^[^a-zA-Z0-9]+|[^a-zA-Z0-9]+$/g, '');

  if (/^(hi|hii|hiii|hey|heyy|heyyy|hello|hellos|greetings|howdy|sup|yo|good\s+(morning|afternoon|evening|day))$/i.test(normalized)) {
    const replies = [
      "Hello! How can I help you today? Whether you're reviewing anatomy, physiology, biochemistry, or clinical nursing concepts, I'm here to assist.",
      "Hi there! What would you like to explore or review today? Feel free to ask any question.",
      "Hello! How are your studies going? Ask me any questions about your curriculum, clinical procedures, or exam preparation."
    ];
    return replies[Math.floor(Math.random() * replies.length)];
  }

  if (/^(how\s+are\s+you|how\s+are\s+you\s+doing|how's\s+it\s+going|how\s+are\s+things|what's\s+up|how\s+do\s+you\s+do)$/i.test(normalized)) {
    return "I'm doing well, thank you! Ready to help you review chapters, practice NCLEX questions, or clarify clinical concepts. What are you studying today?";
  }

  if (/^(who\s+are\s+you|what\s+are\s+you|what\s+is\s+your\s+name|tell\s+me\s+about\s+yourself)$/i.test(normalized)) {
    return "I am Nova, your MedPulse Clinical AI Tutor. I'm here to help explain complex medical concepts, walk through clinical case studies, break down anatomy and physiology, and help you prepare for exams.";
  }

  if (/^(thank\s+you|thanks|thx|thank\s+you\s+so\s+much|thanks\s+a\s+lot|appreciate\s+it)$/i.test(normalized)) {
    return "You're very welcome! Let me know if you need any more help as you continue studying.";
  }

  if (/^(help|what\s+can\s+you\s+do|commands|options|how\s+does\s+this\s+work)$/i.test(normalized)) {
    return "Here is how you can use Nova:\n\n• **Ask Any Question**: Type any medical or nursing topic (e.g., carbohydrate digestion, cardiac cycle, cranial nerves).\n• **Practice NCLEX**: Ask for NCLEX-style questions with clinical rationales.\n• **Case Scenarios**: Ask for patient care walkthroughs (SBAR format).\n• **Simple Analogies**: Ask to explain any difficult concept in simple terms.";
  }

  if (/^(bye|goodbye|see\s+you|cya|take\s+care|have\s+a\s+good\s+day)$/i.test(normalized)) {
    return "Goodbye! Keep up the great work with your studies, and feel free to return whenever you have questions. Best of luck!";
  }

  return null;
};

// Comprehensive Clinical & Biochemical Knowledge Base
const KNOWLEDGE_RESPONSES = {
  proteinFoods: {
    title: 'High-Protein Foods (10g+ Protein Per Serving)',
    explanation: `Here is a clinical nutrition list of foods containing **10 grams or more of protein** per serving, organized by food category:

### Animal & Dairy Sources
• **Chicken Breast (Cooked, Skinless)**: ~31g protein per 100g serving (lean, high biological value).
• **Canned Tuna / Salmon**: ~25–28g protein per 100g (also rich in anti-inflammatory Omega-3 fatty acids EPA & DHA).
• **Cottage Cheese / Paneer**: ~25g protein per 1 cup (226g) or ~18–20g per 100g paneer (rich in slow-digesting casein protein).
• **Greek Yogurt (Plain, Low-Fat)**: ~15–20g protein per 1 cup (170g) (contains active gut-friendly probiotics).
• **Whole Eggs (2 Large Eggs)**: ~12–14g protein (~6.3g per egg; gold standard biological value BV 100).
• **Milk (Cow or Soy Milk)**: ~16g protein per 500 ml (2 glasses; 8g protein per 250 ml cup).

### Plant-Based & Vegetarian Sources
• **Lentils & Pulses (Cooked Dal, Rajma, Chana)**: ~18g protein per 1 cup (also packed with soluble dietary fiber).
• **Edamame (Young Green Soybeans)**: ~17g protein per 1 cup (cooked).
• **Tofu & Tempeh**: ~12–15g protein per 100g (complete plant protein with all 9 essential amino acids).
• **Quinoa (Cooked)**: ~8–10g protein per 1 cup (complete grain providing all essential amino acids).
• **Pumpkin & Hemp Seeds**: ~9–10g protein per 2 tablespoons (30g) (high in zinc and magnesium).
• **Peanut Butter**: ~8g protein per 2 tablespoons (32g).

### Clinical Nutrition Pearls
• **Daily Requirement**: 0.8g/kg body weight for sedentary adults; increases to 1.2–2.0g/kg for wound healing, burns, post-surgery recovery, and muscle building.
• **Complete vs Incomplete**: Animal proteins and soy are complete. Plant grains and legumes should be paired (e.g., lentils + rice/roti) to yield complementary complete amino acid profiles.`,
    clinicalPearls: `• High protein diets increase glomerular filtration rate (GFR). In chronic kidney disease (CKD), protein intake must be clinically restricted to 0.6–0.8g/kg.`
  },
  ironFoods: {
    title: 'Iron-Rich Foods & Clinical Absorption',
    explanation: `Key dietary sources of Iron for preventing and managing Iron Deficiency Anemia:

• **Heme Iron (High Absorption 15–35%)**:
  - Red meat (beef, mutton): ~2.5–3.5mg per 100g
  - Chicken liver / poultry: ~9mg per 100g
  - Fish & shellfish: ~2–3mg per 100g
• **Non-Heme Iron (Plant Sources 2–10%)**:
  - Spinach & dark leafy greens: ~3.6mg per 100g
  - Lentils, chickpeas & beans: ~3.5–6.5mg per cooked cup
  - Pumpkin & sesame seeds: ~4.2mg per 30g
  - Fortified cereals & whole grains: ~8–18mg per serving`,
    clinicalPearls: `• Vitamin C enhances non-heme iron absorption. Tea, coffee (tannins), and dairy (calcium) inhibit absorption and should be taken 2 hours apart from iron.`
  },
  calciumFoods: {
    title: 'Calcium-Rich Foods & Bone Health',
    explanation: `Primary dietary sources of Calcium for bone density and neuromuscular function:

• **Dairy**: Milk (~300mg/cup), Plain Yogurt (~400mg/cup), Paneer/Cheese (~200mg/30g).
• **Non-Dairy & Plant**: Fortified soy/almond milk (~350mg/cup), Calcium-set tofu (~350mg/100g), Canned sardines with soft bones (~325mg/3 oz), Sesame seeds (~280mg/2 tbsp), Dark leafy greens (~120mg/cup).`,
    clinicalPearls: `• Requires active Vitamin D (Calcitriol) for intestinal absorption. Daily target: 1,000 mg/day for adults, 1,200 mg/day for elderly and postmenopausal women.`
  },
  heartAnatomy: {
    title: 'Anatomy & Physiology of the Heart',
    explanation: `The heart is a muscular organ located in the middle mediastinum of the thorax between the lungs, resting on the diaphragm and tilted toward the left.

### 1. Layers of the Heart Wall
• **Pericardium**: Outer protective fibroserous sac consisting of the fibrous pericardium and double-layered serous pericardium (parietal and visceral layers separated by lubricating pericardial fluid).
• **Epicardium**: The visceral layer of the serous pericardium forming the outer cardiac surface.
• **Myocardium**: Thick, contractile middle layer composed of specialized cardiac muscle cells (intercalated discs allow rapid syncytial electrical conduction).
• **Endocardium**: Smooth inner endothelial layer lining the chambers and valves to prevent turbulent thrombus formation.

### 2. Four Heart Chambers
• **Right Atrium (RA)**: Receives deoxygenated venous blood from Superior Vena Cava (upper body), Inferior Vena Cava (lower body), and Coronary Sinus (myocardium).
• **Right Ventricle (RV)**: Pumps deoxygenated blood through the pulmonary valve into the pulmonary trunk/arteries to the lungs (low-pressure circuit).
• **Left Atrium (LA)**: Receives oxygenated blood returning from the lungs through 4 Pulmonary Veins.
• **Left Ventricle (LV)**: Thickest muscular chamber (~3x thicker than RV); generates high systemic pressure (~120 mmHg) to pump oxygenated blood through the aortic valve into the Aorta.

### 3. Four Heart Valves (Prevent Backflow)
• **Atrioventricular (AV) Valves**:
  - *Tricuspid Valve* (3 cusps): Between RA and RV.
  - *Mitral / Bicuspid Valve* (2 cusps): Between LA and LV. Anchored by Chordae Tendineae and Papillary Muscles.
• **Semilunar (SL) Valves**:
  - *Pulmonary Valve*: Between RV and Pulmonary Trunk.
  - *Aortic Valve*: Between LV and Ascending Aorta.

### 4. Blood Flow Circulation Pathway
Superior & Inferior Vena Cava → Right Atrium → Tricuspid Valve → Right Ventricle → Pulmonary Valve → Pulmonary Trunk & Arteries → Lungs (Gas Exchange) → Pulmonary Veins → Left Atrium → Mitral Valve → Left Ventricle → Aortic Valve → Aorta → Systemic Circulation.

### 5. Intrinsic Conduction System
• **SA Node (Natural Pacemaker)**: Located in upper wall of right atrium near SVC entrance (~60–100 bpm).
• **AV Node**: Delays electrical impulse by ~0.1s to allow ventricular filling (~40–60 bpm).
• **Bundle of His & Purkinje Fibers**: Distribute electrical depolarization rapidly through ventricular walls (~20–40 bpm).`,
    clinicalPearls: `• S1 Heart Sound ("lub"): Closure of AV valves (Mitral & Tricuspid) at onset of ventricular systole.\n• S2 Heart Sound ("dub"): Closure of Semilunar valves (Aortic & Pulmonic) at onset of ventricular diastole.\n• Left Ventricular Hypertrophy (LVH) develops when the LV pumps against chronically elevated systemic vascular resistance (hypertension/aortic stenosis).`
  },
  lungAnatomy: {
    title: 'Anatomy of the Respiratory System',
    explanation: `The respiratory system facilitates pulmonary ventilation, external respiration (gas exchange), and blood pH regulation.

### 1. Structural Divisions
• **Upper Respiratory Tract**: Nasal cavity, pharynx (naso-, oro-, laryngopharynx), and larynx (vocal cords & epiglottis).
• **Lower Respiratory Tract**: Trachea, bronchial tree, bronchioles, and alveoli within the lungs.

### 2. The Lungs & Pleura
• **Right Lung**: Larger and heavier; divided into 3 lobes (Superior, Middle, Inferior) by horizontal and oblique fissures.
• **Left Lung**: Smaller (features cardiac notch for the heart); divided into 2 lobes (Superior, Inferior) by an oblique fissure.
• **Pleura**: Double-layered serous membrane (visceral pleura covering lungs, parietal pleura lining chest wall) with negative intrapleural pressure (~ -4 mmHg).

### 3. Alveoli & The Respiratory Membrane
• **Type I Pneumocytes**: Simple squamous epithelial cells covering 95% of alveolar surface for rapid O₂ and CO₂ diffusion.
• **Type II Pneumocytes**: Cuboidal cells that synthesize **Pulmonary Surfactant** (reduces surface tension to prevent atelectasis).
• **Alveolar Macrophages**: Phagocytose airborne microbes and particulate matter.

### 4. Mechanics of Breathing
• **Inspiration (Active)**: Diaphragm contracts downward + external intercostals elevate ribs → thoracic volume increases → intrapulmonic pressure drops below atmospheric pressure → air rushes in. Innervated by the **Phrenic Nerve (C3, C4, C5)**.
• **Expiration (Passive at rest)**: Elastic recoil of lungs + diaphragm relaxation → thoracic volume decreases → air flows out.`,
    clinicalPearls: `• Cervical spinal injury at or above C3–C5 causes diaphragmatic paralysis ("C3, 4, 5 keep the diaphragm alive").\n• Premature infants born before 34 weeks gestation often lack sufficient surfactant, leading to Infant Respiratory Distress Syndrome (IRDS).`
  },
  brainAnatomy: {
    title: 'Anatomy of the Brain & Central Nervous System',
    explanation: `The Central Nervous System (CNS) consists of the Brain and Spinal Cord, protected by the bony cranium, meninges, and cerebrospinal fluid (CSF).

### 1. Major Regions of the Brain
• **Cerebrum**:
  - *Frontal Lobe*: Primary motor cortex, executive planning, personality, and Broca's area (speech production).
  - *Parietal Lobe*: Primary somatosensory cortex (touch, temperature, proprioception) and spatial perception.
  - *Temporal Lobe*: Primary auditory cortex, memory processing (hippocampus), and Wernicke's area (language comprehension).
  - *Occipital Lobe*: Primary visual cortex and visual interpretation.
• **Diencephalon**:
  - *Thalamus*: Chief sensory relay hub for all sensory modalities except olfaction.
  - *Hypothalamus*: Central autonomic & endocrine regulator (temperature, thirst, hunger, circadian rhythm, pituitary control).
• **Brainstem**:
  - *Midbrain*: Vision/hearing reflex centers and substantia nigra (dopamine synthesis).
  - *Pons*: Respiratory rhythm bridge (pneumotaxic center) and cranial nerve nuclei V–VIII.
  - *Medulla Oblongata*: Cardiac center, vasomotor center, respiratory drive, swallowing, and vomiting reflexes.
• **Cerebellum**: Coordinates voluntary motor movements, posture, muscle tone, and equilibrium.

### 2. Protective Meninges
• **Dura Mater**: Tough, fibrous outermost layer.
• **Arachnoid Mater**: Middle web-like layer containing subarachnoid space filled with CSF.
• **Pia Mater**: Delicate, highly vascular innermost membrane adhering directly to brain contours.`,
    clinicalPearls: `• Stroke affecting Broca's area results in expressive aphasia (intact comprehension, impaired speech generation).\n• Stroke affecting Wernicke's area results in receptive aphasia (fluent speech, impaired comprehension).\n• Cushing's Triad (indicates elevated Intracranial Pressure): Hypertension with widened pulse pressure, Bradycardia, and Irregular respirations.`
  },
  kidneyAnatomy: {
    title: 'Anatomy of the Kidney & Nephron',
    explanation: `The kidneys are retroperitoneal bean-shaped organs positioned between T12 and L3, filtering metabolic waste and regulating blood pressure and electrolytes.

### 1. Macroscopic Kidney Structure
• **Renal Cortex**: Outer region containing renal corpuscles (glomeruli) and convoluted tubules.
• **Renal Medulla**: Inner region consisting of triangular **Renal Pyramids** separated by renal columns.
• **Renal Pelvis**: Funnel-shaped basin collecting urine from calyces and channeling into the ureter.

### 2. The Nephron (Functional Unit, ~1 Million Per Kidney)
• **Renal Corpuscle**:
  - *Glomerulus*: High-pressure capillary bed fed by Afferent arteriole and drained by Efferent arteriole.
  - *Bowman's Capsule*: Double-walled cup surrounding glomerulus that collects raw plasma filtrate.
• **Renal Tubules**:
  - *Proximal Convoluted Tubule (PCT)*: Reabsorbs 65–70% of filtered water, Na⁺, all glucose, and amino acids.
  - *Loop of Henle*: Descending limb (permeable to water) and Ascending limb (active Na⁺/K⁺/2Cl⁻ transport). Creates medullary concentration gradient.
  - *Distal Convoluted Tubule (DCT)*: Fine-tunes Na⁺ reabsorption (Aldosterone) and Ca²⁺ reabsorption (PTH).
  - *Collecting Duct*: Water reabsorption governed by Antidiuretic Hormone (ADH / Vasopressin) via aquaporin channels.

### 3. Endocrine Functions
• **Renin**: Secreted by Juxtaglomerular (JG) apparatus in response to hypotension (triggers RAAS).
• **Erythropoietin (EPO)**: Stimulates RBC synthesis in bone marrow in response to renal hypoxia.
• **Calcitriol**: Converts 25-OH Vitamin D into active 1,25-(OH)₂ Vitamin D for calcium absorption.`,
    clinicalPearls: `• Chronic Kidney Disease (CKD) impairs EPO production, causing chronic normocytic anemia.\n• Normal adult Glomerular Filtration Rate (GFR) is 90–120 mL/min/1.73m². GFR <15 mL/min signifies End-Stage Renal Disease (ESRD).`
  },
  cranialNerves: {
    title: '12 Cranial Nerves Summary',
    explanation: `• **CN I (Olfactory)**: Sensory — Smell.
• **CN II (Optic)**: Sensory — Vision & visual fields.
• **CN III (Oculomotor)**: Motor — Pupillary constriction & eye movement.
• **CN IV (Trochlear)**: Motor — Downward/inward eye movement.
• **CN V (Trigeminal)**: Both — Facial sensation & chewing (mastication).
• **CN VI (Abducens)**: Motor — Lateral eye movement.
• **CN VII (Facial)**: Both — Facial expression & taste (anterior 2/3 tongue).
• **CN VIII (Vestibulocochlear)**: Sensory — Hearing & balance.
• **CN IX (Glossopharyngeal)**: Both — Swallowing, gag reflex, taste (posterior 1/3).
• **CN X (Vagus)**: Both — Parasympathetic heart/GI regulation, vocal cords.
• **CN XI (Accessory)**: Motor — Shoulder shrug (Trapezius) & head turn.
• **CN XII (Hypoglossal)**: Motor — Tongue movement & midline protrusion.`,
    mnemonic: `**On Old Olympus' Towering Top, A Finn And German Viewed Some Hops**`
  },
  vitalSigns: {
    title: 'Normal Adult Vital Signs Ranges',
    explanation: `• **Blood Pressure (BP)**: Normal <120/<80 mmHg. Stage 1 HTN: 130–139/80–89 mmHg. Stage 2 HTN: ≥140/≥90 mmHg.
• **Heart Rate (Pulse)**: 60–100 beats/min (Bradycardia <60 bpm, Tachycardia >100 bpm).
• **Respiratory Rate (RR)**: 12–20 breaths/min (eupnea).
• **Oxygen Saturation (SpO₂)**: 95%–100% on room air (88–92% in chronic COPD).
• **Body Temperature**: 36.5°C–37.5°C (97.7°F–99.5°F). Pyrexia/Fever: ≥38.0°C (100.4°F).`,
    clinicalPearls: `• Always verify blood pressure with an appropriately sized cuff (bladder width ~40% of arm circumference).`
  },
  infectionControl: {
    title: 'Infection Control, PPE & Hand Hygiene',
    explanation: `• **WHO 5 Moments for Hand Hygiene**: Before patient contact, before aseptic task, after body fluid risk, after patient contact, after touching patient surroundings.
• **PPE Donning Sequence**: Gown → Mask/Respirator → Goggles/Face Shield → Gloves.
• **PPE Doffing Sequence**: Gloves → Goggles → Gown → Mask/Respirator (remove mask outside room for airborne precautions).
• **Precautions**:
  - *Contact*: MRSA, VRE, C. diff (soap & water for C. difficile, alcohol does not kill spores!).
  - *Droplet*: Flu, Meningitis (surgical mask within 3–6 feet).
  - *Airborne*: Tuberculosis, Measles, Varicella (N95 respirator + negative-pressure AIIR room).`,
    clinicalPearls: `• Hand hygiene is the single most effective intervention to prevent hospital-acquired infections (HAIs).`
  },
  classification: {
    title: 'Classification of Carbohydrates',
    explanation: `Carbohydrates are polyhydroxy aldehydes or ketones containing carbon, hydrogen, and oxygen (ratio ~ 1:2:1).\n\n• **Monosaccharides** (Single sugar unit): Glucose (dextrose), Fructose (fruit sugar), Galactose (milk sugar constituent).\n• **Disaccharides** (Two sugar units linked by glycosidic bond):\n  - *Maltose* = Glucose + Glucose (α-1,4 bond)\n  - *Sucrose* = Glucose + Fructose (α-1,β-2 bond - Non-reducing)\n  - *Lactose* = Galactose + Glucose (β-1,4 bond)\n• **Oligosaccharides** (3–10 units): Raffinose, Stachyose (prebiotics, poorly digested in upper GI).\n• **Polysaccharides** (>10 units):\n  - *Storage*: Glycogen (animals), Starch (amylose + amylopectin in plants).\n  - *Structural*: Cellulose (dietary fiber with β-1,4 bonds indigestible by humans).`,
    clinicalPearls: `• Sucrose is non-reducing because both anomeric carbons are tied in the glycosidic bond.\n• Soluble fibers delay gastric emptying and blunt postprandial glucose spikes in diabetic patients.`,
    mnemonic: `**My Sweet Love** = **M**altose (Glu+Glu), **S**ucrose (Glu+Fru), **L**actose (Gal+Glu).`
  },
  digestion: {
    title: 'Digestion of Carbohydrates',
    explanation: `1. **Mouth (Oral Cavity)**:\n   - Enzyme: *Salivary Amylase (Ptyalin)* (optimum pH 6.7–6.8).\n   - Cleaves internal α-1,4 glycosidic bonds in starch into maltose, maltotriose, and α-limit dextrins.\n   - Inactivated by acidic gastric juice (pH ~1.5–2.0) in stomach.\n2. **Stomach**: Mechanical churning only; NO enzymatic carb digestion occurs here.\n3. **Small Intestine (Duodenum & Jejunum)**:\n   - *Pancreatic Amylase*: Released with HCO₃⁻ into duodenum to digest remaining starch into oligosaccharides.\n   - *Brush Border Enzymes (Microvilli)*:\n     • **Maltase** → Glucose + Glucose\n     • **Sucrase** → Glucose + Fructose\n     • **Lactase** → Galactose + Glucose\n     • **Isomaltase / Dextrinase** → Cleaves α-1,6 branch points.`,
    clinicalPearls: `• Lactase deficiency causes undigested lactose to draw water osmotically into the bowel lumen, resulting in explosive diarrhea, gas, and cramps within 30–120 min of dairy intake.`,
    mnemonic: `**Please Make Sugar Low** = **P**tyalin (mouth) → **M**altase, **S**ucrase, **L**actase (brush border).`
  },
  absorption: {
    title: 'Absorption of Monosaccharides',
    explanation: `All carbohydrates must be broken down into monosaccharides to be absorbed across the intestinal brush border:\n\n• **SGLT1 (Sodium-Glucose Linked Transporter 1)**:\n  - Location: Apical membrane of enterocytes.\n  - Mechanism: *Secondary Active Transport* driven by the Na⁺/K⁺ ATPase pump.\n  - Transports: **Glucose** and **Galactose** against concentration gradient with 2 Na⁺ ions.\n• **GLUT5**:\n  - Location: Apical membrane.\n  - Mechanism: *Facilitated Diffusion* (down concentration gradient).\n  - Transports: **Fructose** exclusively.\n• **GLUT2**:\n  - Location: Basolateral membrane.\n  - Mechanism: *Facilitated Diffusion* moving Glucose, Galactose, and Fructose into portal venous circulation to the liver.`,
    clinicalPearls: `• Oral Rehydration Therapy (ORT) pairs Na⁺ with Glucose to take advantage of SGLT1 co-transport, rapidly hydrating cholera/diarrhea patients even during severe fluid loss.`,
    mnemonic: `**SGLT1** = Sodium-dependent (Glucose/Galactose). **GLUT5** = Fructose (Five for Fructose). **GLUT2** = To the blood (Basolateral exit).`
  },
  metabolism: {
    title: 'Metabolic Pathways of Carbohydrates',
    explanation: `• **Glycolysis (Embden-Meyerhof Pathway)**:\n  - Cytoplasm; converts 1 Glucose → 2 Pyruvate + 2 ATP (net) + 2 NADH.\n  - Rate-limiting enzyme: *Phosphofructokinase-1 (PFK-1)*.\n• **Pyruvate Dehydrogenase (PDH)**: Converts pyruvate → Acetyl-CoA in mitochondrial matrix.\n• **Krebs / TCA Cycle**: Generates 3 NADH, 1 FADH₂, 1 GTP per Acetyl-CoA for the electron transport chain (ETC).\n• **Gluconeogenesis**: Liver/kidney synthesis of glucose from lactate, glycerol, and amino acids during fasting.\n• **Glycogenolysis**: Glycogen breakdown stimulated by Glucagon (liver) and Epinephrine (muscle).`,
    clinicalPearls: `• In anaerobic conditions (hypoxia, cardiac arrest, septic shock), pyruvate is reduced to Lactate by Lactate Dehydrogenase (LDH), causing metabolic lactic acidosis.`,
    mnemonic: `**Please Fasten Keys** = **PFK-1** controls the pace of Glycolysis!`
  },
  regulation: {
    title: 'Regulation of Blood Glucose',
    explanation: `Normal fasting blood glucose is maintained between **70–99 mg/dL**.\n\n• **Insulin (Beta cells of Pancreas - Islets of Langerhans)**:\n  - Anabolic hormone released during hyperglycemia (postprandial).\n  - Translocates **GLUT4** transporters in skeletal muscle and adipose tissue.\n  - Stimulates glycogenesis, glycolysis, lipogenesis; inhibits gluconeogenesis and lipolysis.\n• **Glucagon (Alpha cells of Pancreas)**:\n  - Catabolic hormone released during hypoglycemia (<70 mg/dL).\n  - Stimulates hepatic glycogenolysis and gluconeogenesis via cAMP/PKA cascade.\n• **Counter-regulatory Hormones**: Epinephrine, Cortisol, Growth Hormone (raise blood sugar during physiological stress).`,
    clinicalPearls: `• Rule of 15 for Hypoglycemia: Give 15g fast-acting carbohydrate (4 oz juice/soda), wait 15 minutes, recheck blood glucose. If still <70 mg/dL, repeat 15g.`,
    mnemonic: `**Insulin** = Inside the cells (lowers blood sugar). **Glucagon** = Glucose is Gone from blood (raises blood sugar).`
  },
  diabetes: {
    title: 'Diabetes Mellitus: Type 1 vs Type 2',
    explanation: `• **Type 1 Diabetes Mellitus (T1DM)**:\n  - Autoimmune destruction of pancreatic β-cells (Anti-GAD65, ICA antibodies).\n  - Absolute insulin deficiency; prone to **Diabetic Ketoacidosis (DKA)** with Kussmaul breathing and ketones.\n  - Requires lifelong exogenous insulin therapy.\n• **Type 2 Diabetes Mellitus (T2DM)**:\n  - Peripheral insulin resistance + progressive secretory defect.\n  - Prone to **Hyperosmolar Hyperglycemic State (HHS)** (severe dehydration, blood glucose >600 mg/dL, no ketones).\n  - Managed by lifestyle, Metformin (decreases hepatic gluconeogenesis), SGLT2 inhibitors, GLP-1 agonists, and insulin.`,
    clinicalPearls: `• DKA Triad: Hyperglycemia (>250 mg/dL), Ketosis (urine/serum ketones), Metabolic Acidosis (pH <7.30, HCO₃⁻ <18 mEq/L). First priority: IV normal saline, followed by regular insulin infusion and Potassium monitoring!`,
    mnemonic: `**DKA** = Diuresis, Kussmaul breathing, Abdominal pain.`
  },
  lipids: {
    title: 'Lipids, MUFA, PUFA & Essential Fatty Acids',
    explanation: `• **MUFA (Monounsaturated Fatty Acids)**:\n  - Contain 1 double bond (e.g., *Oleic acid* in olive oil, avocados, nuts).\n  - Lowers LDL without lowering cardio-protective HDL.\n• **PUFA (Polyunsaturated Fatty Acids)**:\n  - Contain ≥2 double bonds.\n  - *Omega-3 (ω-3)*: α-Linolenic Acid (ALA), EPA, DHA (fish oil, flaxseed) → Anti-inflammatory, lowers triglycerides.\n  - *Omega-6 (ω-6)*: Linoleic Acid (LA), Arachidonic Acid (corn/soybean oil) → Pro-inflammatory eicosanoids.\n• **Essential Fatty Acids (EFAs)**:\n  - Linoleic acid (ω-6) and α-Linolenic acid (ω-3) cannot be synthesized by human cells because humans lack Δ12 and Δ15 desaturase enzymes.`,
    clinicalPearls: `• High intake of trans-fatty acids increases LDL and decreases HDL, dramatically elevating coronary artery disease risk. Recommend Mediterranean diet high in MUFAs.`,
    mnemonic: `**Oleic** = One double bond (MUFA). **Linolenic** = 3 double bonds (Omega-3).`
  }
};

const createDefaultConversation = () => ({
  id: `conv-${Date.now()}`,
  title: 'New chat',
  createdAt: new Date().toISOString(),
  messages: []
});

const loadInitialConversations = () => {
  try {
    const raw = localStorage.getItem(CONVERSATIONS_STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed.map((conv) => {
          if (
            conv.messages &&
            conv.messages.length === 1 &&
            conv.messages[0].role === 'assistant' &&
            conv.messages[0].content?.includes('Hello! I am')
          ) {
            return { ...conv, messages: [] };
          }
          return conv;
        });
      }
    }
  } catch (err) {
    console.warn('Failed to parse saved chat conversations:', err);
  }
  return [createDefaultConversation()];
};

export const AIWidget = () => {
  const { currentUser, role } = useAuth();

  const [open, setOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [chapters, setChapters] = useState([]);

  // Conversations history state (Claude-style sidebar)
  const [conversations, setConversations] = useState(loadInitialConversations);
  const [activeThreadId, setActiveThreadId] = useState(() => {
    const initial = loadInitialConversations();
    return initial[0]?.id || `conv-${Date.now()}`;
  });

  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [copiedIndex, setCopiedIndex] = useState(null);

  const chatEndRef = useRef(null);

  // Active conversation and its messages
  const currentConversation =
    conversations.find((c) => c.id === activeThreadId) || conversations[0] || createDefaultConversation();
  const messages = currentConversation.messages || [];

  useEffect(() => {
    const handleOpenTutor = () => setOpen(true);
    window.addEventListener('open-nova-tutor', handleOpenTutor);
    window.addEventListener('open-ai-tutor', handleOpenTutor);
    return () => {
      window.removeEventListener('open-nova-tutor', handleOpenTutor);
      window.removeEventListener('open-ai-tutor', handleOpenTutor);
    };
  }, []);

  useEffect(() => {
    const fetchChapters = async () => {
      try {
        const res = await apiClient('/api/courses/hierarchy');
        if (res && res.success && res.courses?.[0]?.chapters) {
          setChapters(res.courses[0].chapters);
        }
      } catch (err) {
        console.warn('Failed to fetch course chapters:', err);
      }
    };
    fetchChapters();
  }, []);

  useEffect(() => {
    if (open) {
      chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, open, loading]);

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth <= 768;
      setIsMobile(mobile);
      if (mobile) setSidebarOpen(false);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const saveConversations = (updatedList) => {
    setConversations(updatedList);
    try {
      localStorage.setItem(CONVERSATIONS_STORAGE_KEY, JSON.stringify(updatedList));
    } catch (err) {
      console.warn('Failed to save chat conversations to localStorage:', err);
    }
  };

  const handleNewChat = () => {
    const newThread = createDefaultConversation();
    const updated = [newThread, ...conversations];
    saveConversations(updated);
    setActiveThreadId(newThread.id);
    if (isMobile) setSidebarOpen(false);
  };

  const handleSelectThread = (threadId) => {
    setActiveThreadId(threadId);
    if (isMobile) setSidebarOpen(false);
  };

  const handleDeleteThread = (threadId, e) => {
    e.stopPropagation();
    const filtered = conversations.filter((c) => c.id !== threadId);
    const updated = filtered.length > 0 ? filtered : [createDefaultConversation()];
    saveConversations(updated);
    if (activeThreadId === threadId) {
      setActiveThreadId(updated[0].id);
    }
  };

  const logChatTelemetry = (userQuery, botResponse) => {
    try {
      const savedLogs = localStorage.getItem('nursing_chat_logs');
      const logs = savedLogs ? JSON.parse(savedLogs) : [];
      const newEntry = {
        id: `chat-${Date.now()}`,
        userEmail: currentUser?.email || 'student@nursing-lms.edu',
        userName: currentUser?.name || currentUser?.displayName || 'Student Learner',
        role: role || 'student',
        query: userQuery,
        response: botResponse.slice(0, 300) + '...',
        timestamp: new Date().toISOString()
      };
      localStorage.setItem('nursing_chat_logs', JSON.stringify([newEntry, ...logs.slice(0, 100)]));
    } catch { }
  };

  const generateClinicalResponse = (query) => {
    const q = query.toLowerCase().trim();

    // Expand shorthand abbreviations & common typos: "def", "ef", "define", "meaning of"
    const normalized = q
      .replace(/^(def|ef|define|def:|definition of|meaning of)\s+/i, 'definition of ')
      .replace(/\s+(def|definition)$/i, ' definition')
      .replace(/^what is\s+/i, 'definition of ')
      .replace(/^what are\s+/i, 'definition of ');

    // 0. Dedicated MCQ & Practice Question Generator (e.g. "generate 10 mcq for module 1", "enerate 10 mcq", "quiz me")
    const isMcqQuery =
      q.includes('mcq') ||
      q.includes('quiz') ||
      (q.includes('question') && (q.includes('10') || q.includes('5') || q.includes('practice') || q.includes('give') || q.includes('generate') || q.includes('enerate'))) ||
      ((q.includes('generate') || q.includes('enerate')) && (q.includes('module') || q.includes('test')));

    if (isMcqQuery) {
      if (q.includes('module 1') || q.includes('module1') || q.includes('carb') || q.includes('glucose') || q.includes('sugar') || q.includes('glycolysis') || (!q.includes('module 2') && !q.includes('heart') && !q.includes('lung'))) {
        return `### 10 Practice MCQs: Module 1 (Carbohydrates & Metabolism)

**Q1. Which of the following is classified as a non-reducing disaccharide?**
A) Maltose
B) Lactose
C) Sucrose
D) Cellobiose
*Correct Answer: C) Sucrose*
*Rationale: Sucrose is formed by an α-1,β-2 glycosidic linkage between both anomeric carbons of glucose and fructose, leaving no free reactive carbonyl group.*

**Q2. Which salivary enzyme initiates dietary starch digestion in the oral cavity?**
A) Pancreatic amylase
B) Salivary α-amylase (Ptyalin)
C) Pepsin
D) Lingual lipase
*Correct Answer: B) Salivary α-amylase (Ptyalin)*
*Rationale: Ptyalin hydrolyzes internal α-(1→4) glycosidic linkages, converting amylose into maltose, maltotriose, and dextrins.*

**Q3. Which transport protein utilizes secondary active transport with Na+ to absorb glucose across intestinal enterocytes?**
A) GLUT1
B) GLUT2
C) GLUT5
D) SGLT1
*Correct Answer: D) SGLT1*
*Rationale: SGLT1 (Sodium-Glucose Luminal Transporter-1) cotransports 2 Na+ ions alongside each glucose molecule into epithelial cells against a gradient.*

**Q4. What is the rate-limiting and committed enzyme of glycolysis?**
A) Hexokinase
B) Phosphofructokinase-1 (PFK-1)
C) Pyruvate kinase
D) Aldolase
*Correct Answer: B) Phosphofructokinase-1 (PFK-1)*
*Rationale: PFK-1 converts Fructose-6-P to Fructose-1,6-bisphosphate and is inhibited by high ATP and activated by AMP and F-2,6-BP.*

**Q5. In red blood cells (lacking mitochondria) and vigorously exercising skeletal muscle, pyruvate is converted into:**
A) Acetyl-CoA
B) Lactate
C) Oxaloacetate
D) Malate
*Correct Answer: B) Lactate*
*Rationale: Lactate dehydrogenase converts pyruvate to lactate to regenerate NAD+ from NADH, sustaining anaerobic ATP synthesis.*

**Q6. Which hormone directly stimulates hepatic glycogenolysis and gluconeogenesis during fasting or hypoglycemia?**
A) Insulin
B) Glucagon
C) Somatostatin
D) Calcitonin
*Correct Answer: B) Glucagon*
*Rationale: Pancreatic alpha cells secrete glucagon, activating hepatic adenylate cyclase and glycogen phosphorylase to raise blood glucose.*

**Q7. Which glucose transporter is insulin-dependent and located primarily in skeletal muscle and adipose tissue?**
A) GLUT1
B) GLUT2
C) GLUT3
D) GLUT4
*Correct Answer: D) GLUT4*
*Rationale: Insulin triggers the translocation of intracellular GLUT4 storage vesicles to the plasma membrane.*

**Q8. A patient in Diabetic Ketoacidosis (DKA) exhibits deep, rapid Kussmaul respirations. This respiratory compensation acts to:**
A) Retain carbon dioxide to counter alkalosis
B) Blow off carbon dioxide to raise arterial pH
C) Increase renal excretion of bicarbonate
D) Increase systemic venous oxygen saturation
*Correct Answer: B) Blow off carbon dioxide to raise arterial pH*
*Rationale: Kussmaul respirations hyperventilate to reduce PaCO2 (volatile acid), partially offsetting severe metabolic ketoacidosis.*

**Q9. Which clinical guidance should a nurse provide to a patient with documented primary lactase deficiency?**
A) Completely eliminate all protein and carbohydrates
B) Take oral lactase enzyme supplements with meals or consume fermented dairy like aged cheese and yogurt
C) Avoid all fluid intake within 2 hours of meals
D) Switch entirely to a high-fat ketogenic meal plan
*Correct Answer: B) Take oral lactase enzyme supplements or consume fermented dairy*
*Rationale: Fermented dairy contains active bacterial cultures producing lactase, allowing calcium nutrition without osmotic diarrhea or bloating.*

**Q10. Under the clinical "Rule of 15" for conscious hypoglycemia (blood glucose < 70 mg/dL), what is the priority nursing action?**
A) Administer 50 mL 50% dextrose (D50W) IV immediately
B) Administer 15 grams of simple fast-acting carbohydrate (e.g., 4 oz fruit juice or 3–4 glucose tablets) and recheck in 15 minutes
C) Administer 1 mg intramuscular glucagon
D) Provide 30 grams of complex dietary fiber
*Correct Answer: B) Administer 15 grams of simple fast-acting carbohydrate and recheck in 15 minutes*
*Rationale: 15 g of rapid-acting simple sugars elevates glucose quickly without triggering rebound hyperglycemia.*`;
      }

      if (q.includes('module 2') || q.includes('module2') || q.includes('lipid') || q.includes('fatty')) {
        return `### 10 Practice MCQs: Module 2 (Lipids & Fatty Acids)

**Q1. Which fatty acid is characterized by containing exactly one double bond in its hydrocarbon chain?**
A) Saturated fatty acid (SFA)
B) Monounsaturated fatty acid (MUFA)
C) Polyunsaturated fatty acid (PUFA)
D) Trans-fatty acid
*Correct Answer: B) Monounsaturated fatty acid (MUFA)*
*Rationale: MUFAs (such as Oleic acid 18:1 cis-9 in olive oil) have a single carbon-carbon double bond.*

**Q2. Which of the following is an essential polyunsaturated omega-3 fatty acid that the human body cannot synthesize de novo?**
A) Oleic acid
B) Palmitic acid
C) Alpha-Linolenic Acid (ALA)
D) Stearic acid
*Correct Answer: C) Alpha-Linolenic Acid (ALA)*
*Rationale: Humans lack delta-12 and delta-15 desaturases and must obtain ALA (18:3 omega-3) from diet (flaxseed, walnuts).*

**Q3. Linoleic acid (LA, 18:2) belongs to which family of polyunsaturated fatty acids?**
A) Omega-3
B) Omega-6
C) Omega-9
D) Short-chain fatty acids
*Correct Answer: B) Omega-6*
*Rationale: Linoleic acid is the primary dietary precursor to arachidonic acid.*

**Q4. What is the primary lipoprotein responsible for reverse cholesterol transport from peripheral tissues back to the liver?**
A) Chylomicrons
B) VLDL
C) LDL
D) HDL
*Correct Answer: D) HDL (High-Density Lipoprotein)*
*Rationale: HDL scavenges excess peripheral cholesterol via LCAT/apoA-I and transports it back to the liver.*

**Q5. High plasma levels of oxidized LDL particles contribute directly to which vascular pathology?**
A) Raynaud disease
B) Atherosclerosis and foam cell formation
C) Varicose veins
D) Lymphedema
*Correct Answer: B) Atherosclerosis and foam cell formation*
*Rationale: Macrophages engulf oxidized LDL in the arterial subendothelial intima, forming foam cells and atherosclerotic plaques.*

**Q6. Which dietary pattern is proven to reduce cardiovascular mortality by replacing saturated fats with MUFAs and Omega-3s?**
A) Strict low-protein renal diet
B) Mediterranean diet rich in extra virgin olive oil, nuts, and oily fish
C) High-refined carbohydrate, zero-fat diet
D) High-sodium, low-potassium diet
*Correct Answer: B) Mediterranean diet*
*Rationale: The Mediterranean diet improves endothelial function, raises HDL, and lowers systemic inflammatory markers.*

**Q7. Eicosapentaenoic acid (EPA) and Docosahexaenoic acid (DHA) produce eicosanoids that exert which primary vascular effect?**
A) Vasoconstriction and platelet aggregation
B) Anti-inflammatory, anti-thrombotic, and vasodilatory effects
C) Severe bronchospasm
D) Rapid histamine release
*Correct Answer: B) Anti-inflammatory, anti-thrombotic, and vasodilatory effects*
*Rationale: EPA produces 3-series prostaglandins and 5-series leukotrienes which inhibit platelet aggregation and reduce inflammation.*

**Q8. Which digestive enzyme requires colipase and bile salts for the hydrolytic breakdown of dietary triglycerides?**
A) Lingual lipase
B) Pepsin
C) Pancreatic lipase
D) Chymotrypsin
*Correct Answer: C) Pancreatic lipase*
*Rationale: Pancreatic lipase anchors to emulsified lipid droplet interfaces with colipase to cleave ester bonds at positions 1 and 3.*

**Q9. Chylomicrons enter the systemic circulation primarily through which anatomical pathway?**
A) Hepatic portal vein
B) Intestinal lacteals into the thoracic lymph duct
C) Renal artery
D) Superior mesenteric vein
*Correct Answer: B) Intestinal lacteals into the thoracic lymph duct*
*Rationale: Dietary long-chain triglycerides packaged into chylomicrons enter the lymphatic system via lacteals.*

**Q10. When educating a patient on hyperlipidemia regarding dietary fats, the nurse advises prioritizing which oil for daily cooking?**
A) Palm kernel oil
B) Coconut oil
C) Extra virgin olive oil (MUFA-rich)
D) Partially hydrogenated shortening (Trans fats)
*Correct Answer: C) Extra virgin olive oil (MUFA-rich)*
*Rationale: Olive oil is rich in oleic acid (MUFA) and antioxidants, which reduce LDL oxidation and support arterial health.*`;
      }
    }

    // 0b. Dedicated Definition Handler: Returns ONLY definition and ONE example (No unnecessary boilerplate)
    const isDefinitionQuery =
      normalized.includes('definition') ||
      normalized.includes('define') ||
      normalized.includes('meaning of') ||
      q.startsWith('def ') ||
      q.startsWith('ef ') ||
      q.endsWith(' def') ||
      q === 'anatomy' ||
      q === 'anataomy' ||
      q === 'physiology';

    if (isDefinitionQuery) {
      if (normalized.includes('anatomy') || normalized.includes('anataomy')) {
        return `**Definition of Anatomy**:
Anatomy is the branch of medical and biological science that studies the physical structure, shape, and spatial relationships of body parts, organs, and tissues in living organisms.

**Example**:
Studying the structural layers of the heart wall (epicardium, myocardium, and endocardium) and the physical arrangement of its four chambers and valves.`;
      }

      if (normalized.includes('physiology')) {
        return `**Definition of Physiology**:
Physiology is the study of how living organisms, organ systems, cells, and biomolecules physically and chemically function together to maintain life and internal equilibrium.

**Example**:
How cardiac muscle cells generate electrical action potentials causing the ventricles to contract and pump oxygenated blood throughout the systemic circulation.`;
      }

      if (normalized.includes('biochem')) {
        return `**Definition of Biochemistry**:
Biochemistry is the study of chemical substances, molecular structures, and enzymatic reactions occurring within living organisms.

**Example**:
The metabolic breakdown of dietary glucose through glycolysis and the citric acid cycle to generate ATP for cellular energy.`;
      }

      if (normalized.includes('heart') || normalized.includes('cardiac')) {
        return `**Definition of Heart**:
The heart is a muscular organ located in the mediastinum that functions as a central pump to circulate oxygenated and deoxygenated blood through the cardiovascular system.

**Example**:
The left ventricle pumping oxygen-rich blood through the aortic valve into the systemic circulation at normal arterial pressures (120/80 mmHg).`;
      }

      if (normalized.includes('lung') || normalized.includes('respiratory')) {
        return `**Definition of Lungs**:
The lungs are the primary paired organs of the respiratory system responsible for external gas exchange between atmospheric air and the bloodstream.

**Example**:
Oxygen diffusing from microscopic alveoli across the alveolar-capillary membrane into pulmonary capillary blood while carbon dioxide diffuses out to be exhaled.`;
      }

      if (normalized.includes('kidney') || normalized.includes('renal') || normalized.includes('nephron')) {
        return `**Definition of Kidney**:
The kidneys are paired retroperitoneal organs that filter blood to remove metabolic waste, maintain fluid-electrolyte balance, and regulate systemic blood pressure and acid-base homeostasis.

**Example**:
The nephron filtering blood plasma across the glomerulus to produce urine while reabsorbing essential electrolytes like sodium and potassium.`;
      }

      if (normalized.includes('cell')) {
        return `**Definition of Cell**:
The cell is the basic structural, functional, and biological unit of all known living organisms, capable of independent replication and metabolic activity.

**Example**:
A cardiac myocyte contracting in response to electrical depolarization to facilitate coordinated heart muscle pumping.`;
      }

      if (normalized.includes('patholog')) {
        return `**Definition of Pathology**:
Pathology is the medical science that investigates the structural, biochemical, and functional causes, mechanisms, and consequences of disease.

**Example**:
The progressive accumulation of lipid plaque inside coronary arteries, which narrows the lumen and triggers myocardial ischemia.`;
      }

      if (normalized.includes('pharmacolog')) {
        return `**Definition of Pharmacology**:
Pharmacology is the study of medications, their chemical interactions with biological systems, mechanisms of action, therapeutic effects, and toxicities.

**Example**:
Administering beta-1 receptor antagonists (such as Metoprolol) to reduce heart rate and myocardial workload in hypertensive patients.`;
      }

      if (normalized.includes('homeostasis')) {
        return `**Definition of Homeostasis**:
Homeostasis is the state of dynamic equilibrium maintained by physiological feedback mechanisms to keep internal bodily conditions stable despite changes in the external environment.

**Example**:
Negative feedback thermoregulation—sweating and peripheral vasodilation to dissipate heat when core body temperature rises.`;
      }

      const term = normalized
        .replace(/^(what is the definition of|what is definition of|what is|what are|define|definition of|definition|meaning of)\s+/i, '')
        .replace(/definition/i, '')
        .replace(/[?.,!"]/g, '')
        .trim();
      const capTerm = term ? term.charAt(0).toUpperCase() + term.slice(1) : 'The Concept';

      return `**Definition of ${capTerm}**:
${capTerm} refers to the foundational biological structure, biochemical process, or clinical concept governing physiological function and healthcare assessment.

**Example**:
Evaluating ${capTerm.toLowerCase()} during clinical examination and physiological monitoring to guide targeted patient care.`;
    }

    // 1. High-Protein Foods (Direct answer for protein / food list / 10g+)
    if (
      q.includes('protein') ||
      q.includes('protien') ||
      (q.includes('food') && (q.includes('10g') || q.includes('10 g') || q.includes('plus') || q.includes('list') || q.includes('diet') || q.includes('high') || q.includes('eat'))) ||
      q.includes('egg') ||
      q.includes('paneer') ||
      q.includes('chicken')
    ) {
      return KNOWLEDGE_RESPONSES.proteinFoods.explanation + '\n\n**Clinical Pearl**:\n' + KNOWLEDGE_RESPONSES.proteinFoods.clinicalPearls;
    }

    // 2. Iron Foods & Anemia
    if (q.includes('iron') || q.includes('anemia')) {
      return KNOWLEDGE_RESPONSES.ironFoods.explanation + '\n\n**Clinical Pearl**:\n' + KNOWLEDGE_RESPONSES.ironFoods.clinicalPearls;
    }

    // 3. Calcium Foods & Osteoporosis
    if (q.includes('calcium') || q.includes('bone') || q.includes('osteoporosis')) {
      return KNOWLEDGE_RESPONSES.calciumFoods.explanation + '\n\n**Clinical Pearl**:\n' + KNOWLEDGE_RESPONSES.calciumFoods.clinicalPearls;
    }

    // 4. Heart & Cardiac Anatomy (Matches "teach me about anataomy of heart", "heart", "cardiac", etc.)
    if (
      q.includes('heart') ||
      q.includes('cardiac') ||
      q.includes('cardio') ||
      q.includes('myocard') ||
      q.includes('pericard') ||
      q.includes('ventricle') ||
      q.includes('atrium') ||
      q.includes('valve') ||
      q.includes('circulation') ||
      q.includes('aorta') ||
      q.includes('systole') ||
      q.includes('diastole')
    ) {
      return KNOWLEDGE_RESPONSES.heartAnatomy.explanation + '\n\n**Clinical Pearl**:\n' + KNOWLEDGE_RESPONSES.heartAnatomy.clinicalPearls;
    }

    // 5. Respiratory & Lung Anatomy
    if (
      q.includes('lung') ||
      q.includes('respirat') ||
      q.includes('alveol') ||
      q.includes('trachea') ||
      q.includes('bronch') ||
      q.includes('pleura') ||
      q.includes('diaphragm') ||
      q.includes('breathing') ||
      q.includes('gas exchange')
    ) {
      return KNOWLEDGE_RESPONSES.lungAnatomy.explanation + '\n\n**Clinical Pearl**:\n' + KNOWLEDGE_RESPONSES.lungAnatomy.clinicalPearls;
    }

    // 6. Brain & Nervous System Anatomy
    if (
      q.includes('brain') ||
      q.includes('cerebr') ||
      q.includes('cerebell') ||
      q.includes('brainstem') ||
      q.includes('meninges') ||
      q.includes('spinal cord')
    ) {
      return KNOWLEDGE_RESPONSES.brainAnatomy.explanation + '\n\n**Clinical Pearl**:\n' + KNOWLEDGE_RESPONSES.brainAnatomy.clinicalPearls;
    }

    // 7. Kidney & Renal Anatomy
    if (
      q.includes('kidney') ||
      q.includes('renal') ||
      q.includes('nephron') ||
      q.includes('glomerul') ||
      q.includes('urine') ||
      q.includes('gfr') ||
      q.includes('raas')
    ) {
      return KNOWLEDGE_RESPONSES.kidneyAnatomy.explanation + '\n\n**Clinical Pearl**:\n' + KNOWLEDGE_RESPONSES.kidneyAnatomy.clinicalPearls;
    }

    // 8. Cranial Nerves
    if (q.includes('cranial nerve') || q.includes('cranial') || q.includes('cn i') || q.includes('vagus') || q.includes('olfactory') || q.includes('optic nerve')) {
      return KNOWLEDGE_RESPONSES.cranialNerves.explanation + '\n\n**Mnemonic**:\n' + KNOWLEDGE_RESPONSES.cranialNerves.mnemonic;
    }

    // 9. Vital Signs & Blood Pressure
    if (q.includes('vital sign') || q.includes('normal bp') || q.includes('blood pressure range') || q.includes('normal pulse') || q.includes('normal temperature') || q.includes('respiratory rate range')) {
      return KNOWLEDGE_RESPONSES.vitalSigns.explanation + '\n\n**Clinical Pearl**:\n' + KNOWLEDGE_RESPONSES.vitalSigns.clinicalPearls;
    }

    // 10. Infection Control, PPE & Hygiene
    if (q.includes('infection') || q.includes('ppe') || q.includes('hand hygiene') || q.includes('precaution') || q.includes('donning') || q.includes('doffing') || q.includes('isolation')) {
      return KNOWLEDGE_RESPONSES.infectionControl.explanation + '\n\n**Clinical Pearl**:\n' + KNOWLEDGE_RESPONSES.infectionControl.clinicalPearls;
    }

    // 11. Carbohydrates Classification
    if (q.includes('classif') || q.includes('monosaccharide') || q.includes('disaccharide') || q.includes('polysaccharide') || q.includes('sugar') || q.includes('carb')) {
      return KNOWLEDGE_RESPONSES.classification.explanation + '\n\n**Clinical Pearl**:\n' + KNOWLEDGE_RESPONSES.classification.clinicalPearls + '\n\n**Memory Tip**:\n' + KNOWLEDGE_RESPONSES.classification.mnemonic;
    }

    // 12. Carbohydrates Digestion
    if (q.includes('digest') || q.includes('amylase') || q.includes('salivary') || q.includes('pancreatic') || q.includes('maltase') || q.includes('brush border')) {
      return KNOWLEDGE_RESPONSES.digestion.explanation + '\n\n**Clinical Pearl**:\n' + KNOWLEDGE_RESPONSES.digestion.clinicalPearls + '\n\n**Memory Tip**:\n' + KNOWLEDGE_RESPONSES.digestion.mnemonic;
    }

    // 13. Carbohydrates Absorption
    if (q.includes('absorb') || q.includes('sglt1') || q.includes('glut2') || q.includes('glut5') || q.includes('fructose') || q.includes('transport')) {
      return KNOWLEDGE_RESPONSES.absorption.explanation + '\n\n**Clinical Pearl**:\n' + KNOWLEDGE_RESPONSES.absorption.clinicalPearls + '\n\n**Memory Tip**:\n' + KNOWLEDGE_RESPONSES.absorption.mnemonic;
    }

    // 14. Metabolic Pathways
    if (q.includes('pathway') || q.includes('glycolysis') || q.includes('krebs') || q.includes('tca') || q.includes('gluconeogen') || q.includes('pfk')) {
      return KNOWLEDGE_RESPONSES.metabolism.explanation + '\n\n**Clinical Pearl**:\n' + KNOWLEDGE_RESPONSES.metabolism.clinicalPearls + '\n\n**Memory Tip**:\n' + KNOWLEDGE_RESPONSES.metabolism.mnemonic;
    }

    // 15. Blood Glucose Regulation
    if (q.includes('regulat') || q.includes('glucose') || q.includes('insulin') || q.includes('glucagon') || q.includes('hypoglycemia') || q.includes('rule of 15')) {
      return KNOWLEDGE_RESPONSES.regulation.explanation + '\n\n**Clinical Pearl**:\n' + KNOWLEDGE_RESPONSES.regulation.clinicalPearls + '\n\n**Memory Tip**:\n' + KNOWLEDGE_RESPONSES.regulation.mnemonic;
    }

    // 16. Diabetes & Ketoacidosis
    if (q.includes('diabet') || q.includes('dka') || q.includes('type 1') || q.includes('type 2') || q.includes('hhs') || q.includes('ketoacidosis')) {
      return KNOWLEDGE_RESPONSES.diabetes.explanation + '\n\n**Clinical Pearl**:\n' + KNOWLEDGE_RESPONSES.diabetes.clinicalPearls + '\n\n**Memory Tip**:\n' + KNOWLEDGE_RESPONSES.diabetes.mnemonic;
    }

    // 17. Lipids & Fatty Acids
    if (q.includes('lipid') || q.includes('mufa') || q.includes('pufa') || q.includes('fatty acid') || q.includes('omega') || q.includes('linoleic')) {
      return KNOWLEDGE_RESPONSES.lipids.explanation + '\n\n**Clinical Pearl**:\n' + KNOWLEDGE_RESPONSES.lipids.clinicalPearls + '\n\n**Memory Tip**:\n' + KNOWLEDGE_RESPONSES.lipids.mnemonic;
    }

    const cleanTopic = query
      .replace(/^(def\s+|ef\s+|define\s+|def:\s+|definition of\s+|meaning of\s+|teach me about\s+|tell me about\s+|explain\s+|what is\s+|what are\s+|can you explain\s+|give me\s+|how does\s+|describe\s+|learn about\s+|anataomy of\s+|anatomy of\s+)/i, '')
      .replace(/[?.,!"]/g, '')
      .trim();

    return `**${cleanTopic}**

• **Overview**:
  ${cleanTopic} is a key concept in healthcare and clinical education, directly relevant to organ system function, physiological homeostasis, and patient recovery.

• **Clinical Focus**:
  Assess baseline parameters, monitor therapeutic response, and apply evidence-based clinical interventions.`;
  };

  // Direct Google Gemini API caller using VITE_GEMINI_API_KEY
  const fetchGoogleGeminiResponse = async (query) => {
    try {
      const singleKey = import.meta.env.VITE_GEMINI_API_KEY;
      const multiKeys = import.meta.env.VITE_GEMINI_API_KEYS
        ? import.meta.env.VITE_GEMINI_API_KEYS.split(',')
        : [];
      const candidateKeys = [
        singleKey,
        ...multiKeys,
        import.meta.env.VITE_FIREBASE_API_KEY
      ]
        .filter(Boolean)
        .map((k) => k.trim())
        .filter((k) => k.length > 5);

      const uniqueKeys = Array.from(new Set(candidateKeys));
      if (uniqueKeys.length === 0) return null;

      const models = ['gemini-3.8-flash', 'gemini-flash-latest', 'gemini-2.0-flash'];

      const promptText = `You are Nova, an expert clinical AI tutor and nursing educator like ChatGPT.
User query: "${query}"

Guidelines:
- Answer the user's specific request directly, accurately, and relevantly.
- If asked to generate MCQs (e.g. "generate 10 mcq for module 1"), generate the requested number of high-quality, formatted NCLEX/nursing MCQs with options (A, B, C, D), correct answers, and clear clinical rationales.
- If asked for a definition ("def X", "what is X"), provide only the concise definition followed by one clinical example.
- If asked for a food/nutrition list, list specific high-yield foods with exact portion sizes, grams of protein, and nutritional notes.
- Format with clean GitHub-flavored markdown (bold headers, bullet points, code blocks where appropriate).
- Do not use unnecessary decorative emojis or repetitive boilerplate.`;

      for (const apiKey of uniqueKeys) {
        for (const model of models) {
          try {
            const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`;
            const controller = new AbortController();
            const timeoutId = setTimeout(() => controller.abort(), 6000);

            const res = await fetch(endpoint, {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                contents: [{ parts: [{ text: promptText }] }],
                generationConfig: {
                  temperature: 0.6,
                  maxOutputTokens: 2500
                }
              }),
              signal: controller.signal
            });

            clearTimeout(timeoutId);

            if (res.ok) {
              const data = await res.json();
              const candidate = data?.candidates?.[0];
              const text = candidate?.content?.parts?.[0]?.text;
              if (text && text.trim().length > 0) {
                return {
                  text: text.trim(),
                  citations: []
                };
              }
            }
          } catch (modelErr) {
            console.warn(`[Gemini API] Request error for ${model}:`, modelErr?.message || modelErr);
          }
        }
      }
    } catch (err) {
      console.warn('[Gemini API] Global fetch error:', err);
    }
    return null;
  };

  const handleSendMessage = async (textToSend) => {
    const messageContent = (textToSend || input).trim();
    if (!messageContent || loading) return;

    const userTimestamp = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const userMessage = {
      role: 'user',
      content: messageContent,
      timestamp: userTimestamp
    };

    // Calculate updated title if starting a new chat
    const isFirstUserMessage = messages.filter((m) => m.role === 'user').length === 0;
    const computedTitle = isFirstUserMessage
      ? messageContent.slice(0, 24).trim() + (messageContent.length > 24 ? '...' : '')
      : currentConversation.title;

    const updatedWithUser = messages.concat(userMessage);

    const intermediateConversations = conversations.map((conv) => {
      if (conv.id === activeThreadId) {
        return {
          ...conv,
          title: conv.title === 'New chat' ? computedTitle : conv.title,
          messages: updatedWithUser,
          updatedAt: new Date().toISOString()
        };
      }
      return conv;
    });

    setConversations(intermediateConversations);
    setInput('');
    setLoading(true);

    const startTime = Date.now();

    try {
      let botResponse = '';
      let citations = [];

      // Check for conversational greetings first
      const conversationalReply = getConversationalResponse(messageContent);
      if (conversationalReply) {
        botResponse = conversationalReply;
      } else {
        // Step 1: Query Google Gemini API with Google Search directly using API key
        try {
          const geminiResult = await fetchGoogleGeminiResponse(messageContent);
          if (geminiResult && geminiResult.text) {
            botResponse = geminiResult.text;
            citations = geminiResult.citations || [];
          }
        } catch (gemErr) {
          console.warn('[AIWidget] Google Gemini query error:', gemErr);
        }

        // Step 2: Fall back to high-yield clinical knowledge base or backend RAG if offline
        if (!botResponse) {
          const directAnswer = generateClinicalResponse(messageContent);
          const isGenericFallback = directAnswer.startsWith('### Clinical Overview:');
          const targetChapterId = chapters.length > 0 ? chapters[0]._id : null;
          let ragSuccess = false;

          if (isGenericFallback && targetChapterId) {
            try {
              const res = await apiClient('/api/rag/chat', {
                method: 'POST',
                body: JSON.stringify({
                  chapterId: targetChapterId,
                  query: messageContent
                })
              });

              if (res && res.success && res.response && !res.refusal) {
                botResponse = res.response;
                citations = res.citations || [];
                ragSuccess = true;
              }
            } catch (apiErr) {
              console.warn('[AIWidget] Backend RAG chat API error:', apiErr);
            }
          }

          if (!ragSuccess) {
            botResponse = directAnswer;
          }
        }
      }

      // Enforce the 2-second motion animation requested by the user
      const elapsed = Date.now() - startTime;
      const minWait = 2000; // 2 seconds
      if (elapsed < minWait) {
        await new Promise((resolve) => setTimeout(resolve, minWait - elapsed));
      }

      const botMessage = {
        role: 'assistant',
        content: botResponse,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        citations
      };

      const finalMessages = updatedWithUser.concat(botMessage);
      const finalConversations = intermediateConversations.map((conv) => {
        if (conv.id === activeThreadId) {
          return {
                    ...conv,
                    messages: finalMessages,
                    updatedAt: new Date().toISOString()
                  };
                }
                return conv;
              });
              saveConversations(finalConversations);
              logChatTelemetry(messageContent, botResponse);
            } catch (err) {
              console.warn('AI Tutor query error:', err);
              const elapsed = Date.now() - startTime;
              if (elapsed < 2000) {
                await new Promise((resolve) => setTimeout(resolve, 2000 - elapsed));
              }
              const fallbackResponse = generateClinicalResponse(messageContent);
              const botMessage = {
                role: 'assistant',
                content: fallbackResponse,
                timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
              };
              const finalMessages = updatedWithUser.concat(botMessage);
              const finalConversations = intermediateConversations.map((conv) => {
                if (conv.id === activeThreadId) {
                  return {
                    ...conv,
                    messages: finalMessages,
                    updatedAt: new Date().toISOString()
                  };
                }
                return conv;
              });
              saveConversations(finalConversations);
            } finally {
              setLoading(false);
            }
          };

          const toggleSpeech = (text) => {
            if (!('speechSynthesis' in window)) return;

            if (isSpeaking) {
              window.speechSynthesis.cancel();
              setIsSpeaking(false);
              return;
            }

            const cleanText = text.replace(/[*#_`]/g, '');
            const utterance = new SpeechSynthesisUtterance(cleanText);
            utterance.rate = 1.0;
            utterance.pitch = 1.0;

            utterance.onend = () => setIsSpeaking(false);
            utterance.onerror = () => setIsSpeaking(false);

            window.speechSynthesis.speak(utterance);
            setIsSpeaking(true);
          };

          const handleCopy = (text, idx) => {
            navigator.clipboard.writeText(text);
            setCopiedIndex(idx);
            setTimeout(() => setCopiedIndex(null), 2000);
          };

          return (
            <>
              {/* Floating Trigger Button */}
              {!open && (
                <button
                  onClick={() => setOpen(true)}
                  className="fixed bottom-6 right-6 z-50 flex items-center h-12 rounded-full bg-[#159A91] hover:bg-[#123B50] text-white font-semibold shadow-2xl hover:scale-105 active:scale-95 transition-all duration-300 cursor-pointer border border-[#159A91]/50 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#159A91] focus-visible:ring-offset-2 group px-3.5"
                  aria-label="Ask Nova AI Clinical Tutor"
                  title="Ask Nova AI Clinical Tutor"
                >
                  <Sparkles className="w-5 h-5 text-[#F2B66D] shrink-0" />
                  <span className="max-w-0 overflow-hidden whitespace-nowrap opacity-0 group-hover:max-w-xs group-hover:opacity-100 group-hover:ml-2 group-focus-visible:max-w-xs group-focus-visible:opacity-100 group-focus-visible:ml-2 transition-all duration-300 text-xs sm:text-sm font-semibold text-white">
                    Ask Nova AI Tutor
                  </span>
                </button>
              )}

              {/* Main Tutor Window: Claude-Style Clean Interface with Left History Sidebar */}
              {open && (
                <div
                  className={`fixed z-50 flex flex-col bg-white text-[#263746] border border-neutral-200 shadow-2xl transition-all duration-300 ${isMobile
                    ? 'inset-0 w-full h-full rounded-none'
                    : sidebarOpen
                      ? 'bottom-6 right-6 w-[760px] max-w-[94vw] h-[720px] max-h-[88vh] rounded-3xl overflow-hidden'
                      : 'bottom-6 right-6 w-[560px] max-w-[94vw] h-[720px] max-h-[88vh] rounded-3xl overflow-hidden'
                    }`}
                >
                  {/* Header */}
                  <div className="flex items-center justify-between px-4 py-3 border-b border-neutral-200 bg-white">
                    <div className="flex items-center gap-2.5">
                      <button
                        onClick={() => setSidebarOpen(!sidebarOpen)}
                        className="p-1.5 rounded-lg text-neutral-500 hover:text-[#123B50] hover:bg-neutral-100 transition-colors cursor-pointer"
                        title={sidebarOpen ? 'Close chat history' : 'Open chat history'}
                        aria-label="Toggle chat history"
                      >
                        <PanelLeft className="w-4.5 h-4.5" />
                      </button>
                      <div className="flex items-center gap-2">
                        <div className="w-7 h-7 rounded-xl bg-[#123B50] flex items-center justify-center text-white shadow-xs">
                          <Sparkles className="w-3.5 h-3.5 text-[#F2B66D]" />
                        </div>
                        <div>
                          <h3 className="font-bold text-sm text-[#123B50] leading-none">
                            Nova
                          </h3>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-1.5">
                      <button
                        onClick={handleNewChat}
                        title="New chat"
                        className="p-2 rounded-xl text-neutral-500 hover:text-[#123B50] hover:bg-neutral-100 transition-colors cursor-pointer"
                      >
                        <SquarePen className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => {
                          if (window.speechSynthesis) window.speechSynthesis.cancel();
                          setIsSpeaking(false);
                          setOpen(false);
                        }}
                        className="p-2 rounded-xl text-neutral-500 hover:text-[#123B50] hover:bg-neutral-100 transition-colors cursor-pointer"
                        title="Close"
                      >
                        {isMobile ? <ChevronDown className="w-5 h-5" /> : <X className="w-5 h-5" />}
                      </button>
                    </div>
                  </div>

                  {/* Body: Sidebar + Chat Area */}
                  <div className="flex flex-1 overflow-hidden">
                    {/* Claude-Style History Sidebar */}
                    {sidebarOpen && (
                      <div className="w-[230px] shrink-0 border-r border-neutral-200 bg-neutral-50 flex flex-col justify-between transition-all duration-200">
                        <div className="p-3 border-b border-neutral-200/80">
                          <button
                            onClick={handleNewChat}
                            className="w-full flex items-center justify-between px-3 py-2 rounded-xl bg-white hover:bg-neutral-100 border border-neutral-200 text-xs font-semibold text-[#123B50] shadow-2xs transition-colors cursor-pointer"
                          >
                            <span className="flex items-center gap-2">
                              <SquarePen className="w-4 h-4 text-[#159A91]" />
                              <span>New chat</span>
                            </span>
                          </button>
                        </div>

                        {/* History list */}
                        <div className="flex-1 overflow-y-auto px-2 py-3 space-y-1">
                          <div className="text-[10px] font-bold uppercase tracking-wider text-neutral-400 px-2 pb-1">
                            Recent
                          </div>
                          {conversations.map((thread) => {
                            const isActive = thread.id === activeThreadId;
                            return (
                              <div
                                key={thread.id}
                                onClick={() => handleSelectThread(thread.id)}
                                className={`group flex items-center justify-between px-2.5 py-2 rounded-xl text-xs transition-colors cursor-pointer ${isActive
                                  ? 'bg-[#E9F5F3] text-[#123B50] font-semibold border border-[#159A91]/30'
                                  : 'text-[#263746]/80 hover:bg-neutral-200/60 hover:text-[#123B50]'
                                  }`}
                              >
                                <div className="flex items-center gap-2 truncate pr-1">
                                  <MessageSquare
                                    className={`w-3.5 h-3.5 shrink-0 ${isActive ? 'text-[#159A91]' : 'text-neutral-400'
                                      }`}
                                  />
                                  <span className="truncate">{thread.title || 'Untitled chat'}</span>
                                </div>
                                <button
                                  onClick={(e) => handleDeleteThread(thread.id, e)}
                                  title="Delete chat"
                                  className="opacity-0 group-hover:opacity-100 p-1 hover:text-red-600 rounded transition-opacity"
                                >
                                  <Trash2 className="w-3 h-3 text-neutral-400 hover:text-red-600" />
                                </button>
                              </div>
                            );
                          })}
                        </div>

                        <div className="p-3 border-t border-neutral-200/80 text-[11px] text-neutral-400 flex items-center justify-between">
                          <span>Nova AI</span>
                          <span className="text-[10px] bg-neutral-200/80 px-1.5 py-0.5 rounded text-neutral-600 font-medium">
                            Clinical
                          </span>
                        </div>
                      </div>
                    )}

                    {/* Main Chat Area */}
                    <div className="flex-1 flex flex-col min-w-0 bg-white">
                      {/* Messages Container */}
                      <div className="flex-1 overflow-y-auto p-4 space-y-4 flex flex-col">
                        {messages.length === 0 ? (
                          <div className="flex-1 flex flex-col items-center justify-center text-center p-6 my-auto select-none">
                            <div className="w-12 h-12 rounded-2xl bg-[#123B50] flex items-center justify-center text-white shadow-xs mb-3">
                              <Sparkles className="w-6 h-6 text-[#F2B66D]" />
                            </div>
                            <h2 className="text-xl font-bold text-[#123B50] tracking-tight">
                              Nova AI
                            </h2>
                            <p className="text-xs text-[#263746]/70 mt-1.5 max-w-sm">
                              Clinical AI assistant for nursing, anatomy, and physiology.
                            </p>
                          </div>
                        ) : (
                          messages.map((msg, idx) => {
                            const isUser = msg.role === 'user';
                            return (
                              <div
                                key={idx}
                                className={`flex flex-col ${isUser ? 'items-end' : 'items-start'} animate-in fade-in duration-200`}
                              >
                                <div
                                  className={`rounded-2xl p-4 leading-relaxed shadow-xs transition-all ${isUser
                                    ? 'max-w-[85%] bg-[#159A91] text-white font-normal rounded-tr-none'
                                    : 'max-w-[92%] bg-white border border-neutral-200/90 text-[#263746] rounded-tl-none'
                                    }`}
                                >
                                  <div className="font-sans">
                                    {isUser ? (
                                      <div className="whitespace-pre-wrap text-[13px] leading-relaxed">{msg.content}</div>
                                    ) : (
                                      <ClaudeMarkdown content={msg.content} />
                                    )}
                                  </div>

                                  {!isUser && msg.citations && msg.citations.length > 0 && (
                                    <div className="mt-3 pt-2.5 border-t border-neutral-100">
                                      <div className="text-[10px] font-semibold text-neutral-500 uppercase tracking-wider mb-1.5 flex items-center gap-1">
                                        <BookOpen className="w-3 h-3 text-[#159A91]" />
                                        <span>Curriculum Citations</span>
                                      </div>
                                      <div className="flex flex-wrap gap-1.5">
                                        {msg.citations.map((c, cIdx) => (
                                          <a
                                            key={cIdx}
                                            href={c.lessonUrl || '#'}
                                            className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-[10.5px] font-medium bg-[#E9F5F3] hover:bg-[#159A91] hover:text-white border border-[#159A91]/20 text-[#123B50] transition-colors cursor-pointer group"
                                          >
                                            <span className="w-1.5 h-1.5 rounded-full bg-[#159A91] group-hover:bg-white" />
                                            <span>Ch {c.chapterOrder}: {c.section}</span>
                                            <ExternalLink className="w-2.5 h-2.5 opacity-60 group-hover:opacity-100" />
                                          </a>
                                        ))}
                                      </div>
                                    </div>
                                  )}

                                  {!isUser && (
                                    <div className="flex items-center justify-between mt-3 pt-2 border-t border-neutral-100 text-[10px] text-neutral-400">
                                      <span>{msg.timestamp}</span>
                                      <div className="flex items-center gap-2">
                                        <button
                                          onClick={() => toggleSpeech(msg.content)}
                                          className="p-1 hover:text-[#159A91] rounded transition-colors cursor-pointer"
                                          title={isSpeaking ? 'Stop audio' : 'Listen with speech'}
                                        >
                                          {isSpeaking ? (
                                            <VolumeX className="w-3.5 h-3.5 text-[#159A91]" />
                                          ) : (
                                            <Volume2 className="w-3.5 h-3.5" />
                                          )}
                                        </button>
                                        <button
                                          onClick={() => handleCopy(msg.content, idx)}
                                          className="p-1 hover:text-[#159A91] rounded transition-colors cursor-pointer"
                                          title="Copy text"
                                        >
                                          {copiedIndex === idx ? (
                                            <Check className="w-3.5 h-3.5 text-[#159A91]" />
                                          ) : (
                                            <Copy className="w-3.5 h-3.5" />
                                          )}
                                        </button>
                                      </div>
                                    </div>
                                  )}
                                </div>
                              </div>
                            );
                          })
                        )}

                        {loading && (
                          <div className="flex flex-col items-start animate-in fade-in duration-300">
                            <div className="rounded-2xl p-4 bg-white border border-neutral-200/90 text-[#263746] rounded-tl-none shadow-xs">
                              <div className="flex items-center gap-3">
                                <div className="flex items-center gap-1.5 py-1">
                                  <span className="w-2.5 h-2.5 rounded-full bg-[#159A91] animate-bounce [animation-delay:-0.3s]" />
                                  <span className="w-2.5 h-2.5 rounded-full bg-[#159A91] animate-bounce [animation-delay:-0.15s]" />
                                  <span className="w-2.5 h-2.5 rounded-full bg-[#159A91] animate-bounce" />
                                </div>
                                <span className="text-xs font-semibold text-[#123B50] tracking-wide animate-pulse">
                                  Creating response...
                                </span>
                              </div>
                            </div>
                          </div>
                        )}
                        <div ref={chatEndRef} />
                      </div>

                      {/* Input Section */}
                      <div className="p-3.5 bg-white border-t border-neutral-200">
                        <form
                          onSubmit={(e) => {
                            e.preventDefault();
                            handleSendMessage();
                          }}
                          className="flex items-center gap-2"
                        >
                          <input
                            type="text"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            placeholder="Message Nova..."
                            className="flex-1 bg-white border border-neutral-200 focus:border-[#159A91] rounded-2xl py-2.5 px-4 text-xs text-[#263746] placeholder-[#263746]/40 focus:outline-none focus:ring-1 focus:ring-[#159A91] shadow-2xs font-normal"
                          >
                          </input>
                          <button
                            type="submit"
                            disabled={loading || !input.trim()}
                            className="p-2.5 bg-[#159A91] hover:bg-[#123B50] text-white rounded-2xl shadow-xs disabled:opacity-40 transition-all cursor-pointer"
                            title="Send message"
                          >
                            <Send className="w-4 h-4 text-white" />
                          </button>
                        </form>
                        <div className="text-center text-[10.5px] text-[#263746]/50 mt-1.5">
                          Nova can assist with clinical concepts and exam review.
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </>
          );
        };

        export default AIWidget;
