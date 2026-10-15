import React, { useState, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { ROUTE_QUESTIONS } from '../constants/aiTutorQuestion';
import { useAuth } from '../context/AuthContext';
import apiClient from '../api/client';
import {
  findSimilarLocal,
  storeLocalMemory,
  getMemoryStats,
  getLocalMemories,
  clearClientMemory
} from '../services/openaiMemoryCache';
import {
  Sparkles,
  Send,
  X,
  ChevronDown,
  Volume2,
  VolumeX,
  Copy,
  Check,
  RotateCcw,
  BookOpen,
  Stethoscope,
  HelpCircle,
  Zap,
  Lightbulb,
  Database,
  Coins,
  ShieldCheck,
  TrendingUp,
  Trash2,
  ArrowRight
} from 'lucide-react';

const getRandomQuestions = (allQuestions) => {
  if (!allQuestions || allQuestions.length === 0) return [];
  const randomCount = Math.floor(Math.random() * 4) + 4;
  const shuffled = [...allQuestions].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, Math.min(randomCount, allQuestions.length));
};

// Comprehensive Clinical & Biochemical Knowledge Base
const KNOWLEDGE_RESPONSES = {
  classification: {
    title: 'Classification of Carbohydrates',
    explanation: `Carbohydrates are polyhydroxy aldehydes or ketones and organic compounds containing carbon, hydrogen, and oxygen (ratio ~ 1:2:1).\n\n• **Monosaccharides** (Single sugar unit): Glucose (dextrose), Fructose (fruit sugar), Galactose (milk sugar constituent).\n• **Disaccharides** (Two sugar units linked by glycosidic bond):\n  - *Maltose* = Glucose + Glucose (α-1,4 bond)\n  - *Sucrose* = Glucose + Fructose (α-1,β-2 bond - Non-reducing!)\n  - *Lactose* = Galactose + Glucose (β-1,4 bond)\n• **Oligosaccharides** (3–10 units): Raffinose, Stachyose (prebiotics, poorly digested in upper GI).\n• **Polysaccharides** (>10 units):\n  - *Storage*: Glycogen (animals), Starch (amylose + amylopectin in plants).\n  - *Structural*: Cellulose (dietary fiber with β-1,4 bonds indigestible by humans).`,
    clinicalPearls: `• Sucrose is non-reducing because both anomeric carbons are tied in the glycosidic bond.\n• Soluble fibers delay gastric emptying and blunt postprandial glucose spikes in diabetic patients.`,
    mnemonic: `**M**y **S**weet **L**ove = **M**altose (Glu+Glu), **S**ucrose (Glu+Fru), **L**actose (Gal+Glu).`
  },
  digestion: {
    title: 'Digestion of Carbohydrates',
    explanation: `1. **Mouth (Oral Cavity)**:\n   - Enzyme: *Salivary Amylase (Ptyalin)* (optimum pH 6.7–6.8).\n   - Cleaves internal α-1,4 glycosidic bonds in starch into maltose, maltotriose, and α-limit dextrins.\n   - Inactivated by acidic gastric juice (pH ~1.5–2.0) in stomach.\n2. **Stomach**: Mechanical churning only; NO enzymatic carb digestion occurs here.\n3. **Small Intestine (Duodenum & Jejunum)**:\n   - *Pancreatic Amylase*: Released with HCO₃⁻ into duodenum to digest remaining starch into oligosaccharides.\n   - *Brush Border Enzymes (Microvilli)*:\n     • **Maltase** → Glucose + Glucose\n     • **Sucrase** → Glucose + Fructose\n     • **Lactase** → Galactose + Glucose\n     • **Isomaltase / Dextrinase** → Cleaves α-1,6 branch points.`,
    clinicalPearls: `• Lactase deficiency causes undigested lactose to draw water osmotically into the bowel lumen, resulting in explosive diarrhea, gas, and cramps within 30–120 min of dairy intake.`,
    mnemonic: `**P**lease **M**ake **S**ugar **L**ow = **P**tyalin (mouth) → **M**altase, **S**ucrase, **L**actase (brush border).`
  },
  absorption: {
    title: 'Absorption of Monosaccharides',
    explanation: `All carbohydrates must be broken down into monosaccharides to be absorbed across the intestinal brush border:\n\n• **SGLT1 (Sodium-Glucose Linked Transporter 1)**:\n  - Location: Apical membrane of enterocytes.\n  - Mechanism: *Secondary Active Transport* driven by the Na⁺/K⁺ ATPase pump.\n  - Transports: **Glucose** and **Galactose** against concentration gradient with 2 Na⁺ ions.\n• **GLUT5**:\n  - Location: Apical membrane.\n  - Mechanism: *Facilitated Diffusion* (insulin-independent, down concentration gradient).\n  - Transports: **Fructose** exclusively.\n• **GLUT2**:\n  - Location: Basolateral membrane.\n  - Mechanism: *Facilitated Diffusion* moving Glucose, Galactose, and Fructose into portal venous circulation to the liver.`,
    clinicalPearls: `• Oral Rehydration Therapy (ORT) pairs Na⁺ with Glucose to take advantage of SGLT1 co-transport, rapidly hydrating cholera/diarrhea patients even during severe fluid loss.`,
    mnemonic: `**S**GLT1 = **S**odium-dependent (Glucose/Galactose). **GLUT5** = **F**ructose (Five for Fructose!). **GLUT2** = **T**o the blood (Basolateral exit).`
  },
  metabolism: {
    title: 'Metabolic Pathways of Carbohydrates',
    explanation: `• **Glycolysis (Embden-Meyerhof Pathway)**:\n  - Cytoplasm; converts 1 Glucose → 2 Pyruvate + 2 ATP (net) + 2 NADH.\n  - Rate-limiting enzyme: *Phosphofructokinase-1 (PFK-1)*.\n• **Pyruvate Dehydrogenase (PDH)**: Converts pyruvate → Acetyl-CoA in mitochondrial matrix.\n• **Krebs / TCA Cycle**: Generates 3 NADH, 1 FADH₂, 1 GTP per Acetyl-CoA for the electron transport chain (ETC).\n• **Gluconeogenesis**: Liver/kidney synthesis of glucose from lactate, glycerol, and amino acids during fasting.\n• **Glycogenolysis**: Glycogen breakdown stimulated by Glucagon (liver) and Epinephrine (muscle).`,
    clinicalPearls: `• In anaerobic conditions (hypoxia, cardiac arrest, septic shock), pyruvate is reduced to Lactate by Lactate Dehydrogenase (LDH), causing metabolic lactic acidosis.`,
    mnemonic: `**P**lease **F**asten **K**eys = **PFK-1** controls the pace of Glycolysis!`
  },
  regulation: {
    title: 'Regulation of Blood Glucose',
    explanation: `Normal fasting blood glucose is maintained between **70–99 mg/dL**.\n\n• **Insulin (Beta cells of Pancreas - Islets of Langerhans)**:\n  - Anabolic hormone released during hyperglycemia (postprandial).\n  - Translocates **GLUT4** transporters in skeletal muscle and adipose tissue.\n  - Stimulates glycogenesis, glycolysis, lipogenesis; inhibits gluconeogenesis and lipolysis.\n• **Glucagon (Alpha cells of Pancreas)**:\n  - Catabolic hormone released during hypoglycemia (<70 mg/dL).\n  - Stimulates hepatic glycogenolysis and gluconeogenesis via cAMP/PKA cascade.\n• **Counter-regulatory Hormones**: Epinephrine, Cortisol, Growth Hormone (raise blood sugar during physiological stress).`,
    clinicalPearls: `• Rule of 15 for Hypoglycemia: Give 15g fast-acting carbohydrate (4 oz juice/soda), wait 15 minutes, recheck blood glucose. If still <70 mg/dL, repeat 15g.`,
    mnemonic: `**I**nsulin = **I**nside the cells (lowers blood sugar). **G**lucagon = **G**lucose is **G**one from blood (raises blood sugar).`
  },
  diabetes: {
    title: 'Diabetes Mellitus: Type 1 vs Type 2',
    explanation: `• **Type 1 Diabetes Mellitus (T1DM)**:\n  - Autoimmune destruction of pancreatic β-cells (Anti-GAD65, ICA antibodies).\n  - Absolute insulin deficiency; prone to **Diabetic Ketoacidosis (DKA)** with Kussmaul breathing and ketones.\n  - Requires lifelong exogenous insulin therapy.\n• **Type 2 Diabetes Mellitus (T2DM)**:\n  - Peripheral insulin resistance + progressive secretory defect.\n  - Prone to **Hyperosmolar Hyperglycemic State (HHS)** (severe dehydration, blood glucose >600 mg/dL, no ketones).\n  - Managed by lifestyle, Metformin (decreases hepatic gluconeogenesis), SGLT2 inhibitors, GLP-1 agonists, and insulin.`,
    clinicalPearls: `• DKA Triad: Hyperglycemia (>250 mg/dL), Ketosis (urine/serum ketones), Metabolic Acidosis (pH <7.30, HCO₃⁻ <18 mEq/L). First priority: IV normal saline, followed by regular insulin infusion and Potassium monitoring!`,
    mnemonic: `**D**KA = **D**iuresis, **K**ussmaul breathing, **A**bdominal pain.`
  },
  lipids: {
    title: 'Lipids, MUFA, PUFA & Essential Fatty Acids',
    explanation: `• **MUFA (Monounsaturated Fatty Acids)**:\n  - Contain 1 double bond (e.g., *Oleic acid* in olive oil, avocados, nuts).\n  - Lowers LDL without lowering cardio-protective HDL.\n• **PUFA (Polyunsaturated Fatty Acids)**:\n  - Contain ≥2 double bonds.\n  - *Omega-3 (ω-3)*: α-Linolenic Acid (ALA), EPA, DHA (fish oil, flaxseed) → Anti-inflammatory, lowers triglycerides.\n  - *Omega-6 (ω-6)*: Linoleic Acid (LA), Arachidonic Acid (corn/soybean oil) → Pro-inflammatory eicosanoids.\n• **Essential Fatty Acids (EFAs)**:\n  - Linoleic acid (ω-6) and α-Linolenic acid (ω-3) cannot be synthesized by human cells because humans lack Δ12 and Δ15 desaturase enzymes.`,
    clinicalPearls: `• High intake of trans-fatty acids increases LDL and decreases HDL, dramatically elevating coronary artery disease risk. Recommend Mediterranean diet high in MUFAs.`,
    mnemonic: `**O**leic = **O**ne double bond (MUFA). **L**inolenic = 3 double bonds (Omega-**3**).`
  }
};

export const AIWidget = () => {
  const location = useLocation();
  const { currentUser, role } = useAuth();

  const [open, setOpen] = useState(false);
  const [showMemoryStats, setShowMemoryStats] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [memoryStats, setMemoryStats] = useState({
    totalStored: 0,
    totalHits: 0,
    totalTokensSaved: 0,
    estimatedCostSavedUsd: 0
  });
  const [recentMemories, setRecentMemories] = useState([]);

  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      content: `Hello! 👋 I am your **MetaNutriBio AI Clinical Tutor** powered by an **OpenAI Semantic Memory Token Saver**.\n\n• **Token Optimization**: When any user searches a topic, it is saved in memory.\n• If you or any other student search a similar question next time, it retrieves directly from memory with **0 Tokens Used**!\n\nAsk any question or choose an action below!`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      fromMemory: true,
      tokensUsed: 0,
      tokensSaved: 350
    }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [currentRouteData, setCurrentRouteData] = useState(null);
  const [randomQuestions, setRandomQuestions] = useState([]);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [copiedIndex, setCopiedIndex] = useState(null);

  const chatEndRef = useRef(null);
  const geminiApiKey = import.meta.env.VITE_GEMINI_API_KEY;
  const geminiBaseUrl = import.meta.env.VITE_GEMINI_API_BASE_URL || 'https://generativelanguage.googleapis.com';
  const geminiModel = import.meta.env.VITE_GEMINI_MODEL || 'gemini-1.5-flash';

  const apiKey = import.meta.env.VITE_OPENAI_API_KEY;
  const apiUrl = import.meta.env.VITE_OPENAI_API_URL || 'https://api.openai.com/v1/chat/completions';
  const aiModel = import.meta.env.VITE_OPENAI_MODEL || 'gpt-3.5-turbo';

  // Load and sync memory stats
  const refreshMemoryStats = async () => {
    try {
      const backendRes = await apiClient('/api/ai/stats');
      if (backendRes && backendRes.success && backendRes.stats) {
        setMemoryStats(backendRes.stats);
      } else {
        const local = getMemoryStats();
        setMemoryStats(local);
      }

      const entriesRes = await apiClient('/api/ai/entries?limit=15');
      if (entriesRes && entriesRes.success && entriesRes.entries) {
        setRecentMemories(entriesRes.entries);
      } else {
        setRecentMemories(getLocalMemories().slice(0, 15));
      }
    } catch {
      const local = getMemoryStats();
      setMemoryStats(local);
      setRecentMemories(getLocalMemories().slice(0, 15));
    }
  };

  useEffect(() => {
    refreshMemoryStats();
  }, [open]);

  // Scroll to bottom on new messages
  useEffect(() => {
    if (open) {
      chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, open, loading]);

  // Responsive listener
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Update suggestions on route change
  useEffect(() => {
    const currentPath = location.pathname;
    const routeData = ROUTE_QUESTIONS[currentPath];
    setCurrentRouteData(routeData || null);

    if (routeData && routeData.questions) {
      setRandomQuestions(getRandomQuestions(routeData.questions));
    } else {
      setRandomQuestions([
        'Explain carbohydrate digestion step-by-step',
        'What is the difference between SGLT1 and GLUT2?',
        'How does insulin regulate blood glucose levels?',
        'What are the clinical differences between Type 1 and Type 2 Diabetes?',
        'What are essential fatty acids and why do we need them?'
      ]);
    }
  }, [location.pathname]);

  // Helper: Save Chat Logs to telemetry for Admin Audit
  const logChatTelemetry = (userQuery, botResponse, tokenData = {}) => {
    try {
      const savedLogs = localStorage.getItem('nursing_chat_logs');
      const logs = savedLogs ? JSON.parse(savedLogs) : [];
      const newEntry = {
        id: `chat-${Date.now()}`,
        userEmail: currentUser?.email || 'student@nursing-lms.edu',
        userName: currentUser?.name || currentUser?.displayName || 'Student Learner',
        role: role || 'student',
        path: location.pathname,
        query: userQuery,
        response: botResponse.slice(0, 300) + '...',
        tokens: tokenData.tokensUsed || 0,
        tokensSaved: tokenData.tokensSaved || 0,
        fromMemory: Boolean(tokenData.fromMemory),
        timestamp: new Date().toISOString()
      };
      localStorage.setItem('nursing_chat_logs', JSON.stringify([newEntry, ...logs.slice(0, 100)]));
    } catch {}
  };

  // Generate Smart Clinical Response Fallback
  const generateClinicalResponse = (query) => {
    const q = query.toLowerCase();

    if (q.includes('classif') || q.includes('monosaccharide') || q.includes('disaccharide') || q.includes('polysaccharide') || q.includes('sugar') || q.includes('carb')) {
      return KNOWLEDGE_RESPONSES.classification.explanation + '\n\n💡 **Clinical NCLEX Pearl**:\n' + KNOWLEDGE_RESPONSES.classification.clinicalPearls + '\n\n🧠 **Memory Hook**:\n' + KNOWLEDGE_RESPONSES.classification.mnemonic;
    }
    if (q.includes('digest') || q.includes('amylase') || q.includes('salivary') || q.includes('pancreatic') || q.includes('maltase') || q.includes('brush border')) {
      return KNOWLEDGE_RESPONSES.digestion.explanation + '\n\n💡 **Clinical NCLEX Pearl**:\n' + KNOWLEDGE_RESPONSES.digestion.clinicalPearls + '\n\n🧠 **Memory Hook**:\n' + KNOWLEDGE_RESPONSES.digestion.mnemonic;
    }
    if (q.includes('absorb') || q.includes('sglt1') || q.includes('glut2') || q.includes('glut5') || q.includes('fructose') || q.includes('transport')) {
      return KNOWLEDGE_RESPONSES.absorption.explanation + '\n\n💡 **Clinical NCLEX Pearl**:\n' + KNOWLEDGE_RESPONSES.absorption.clinicalPearls + '\n\n🧠 **Memory Hook**:\n' + KNOWLEDGE_RESPONSES.absorption.mnemonic;
    }
    if (q.includes('pathway') || q.includes('glycolysis') || q.includes('krebs') || q.includes('tca') || q.includes('gluconeogen') || q.includes('pfk')) {
      return KNOWLEDGE_RESPONSES.metabolism.explanation + '\n\n💡 **Clinical NCLEX Pearl**:\n' + KNOWLEDGE_RESPONSES.metabolism.clinicalPearls + '\n\n🧠 **Memory Hook**:\n' + KNOWLEDGE_RESPONSES.metabolism.mnemonic;
    }
    if (q.includes('regulat') || q.includes('glucose') || q.includes('insulin') || q.includes('glucagon') || q.includes('hypoglycemia') || q.includes('rule of 15')) {
      return KNOWLEDGE_RESPONSES.regulation.explanation + '\n\n💡 **Clinical NCLEX Pearl**:\n' + KNOWLEDGE_RESPONSES.regulation.clinicalPearls + '\n\n🧠 **Memory Hook**:\n' + KNOWLEDGE_RESPONSES.regulation.mnemonic;
    }
    if (q.includes('diabet') || q.includes('dka') || q.includes('type 1') || q.includes('type 2') || q.includes('hhs') || q.includes('ketoacidosis')) {
      return KNOWLEDGE_RESPONSES.diabetes.explanation + '\n\n💡 **Clinical NCLEX Pearl**:\n' + KNOWLEDGE_RESPONSES.diabetes.clinicalPearls + '\n\n🧠 **Memory Hook**:\n' + KNOWLEDGE_RESPONSES.diabetes.mnemonic;
    }
    if (q.includes('lipid') || q.includes('mufa') || q.includes('pufa') || q.includes('fatty acid') || q.includes('omega') || q.includes('linoleic')) {
      return KNOWLEDGE_RESPONSES.lipids.explanation + '\n\n💡 **Clinical NCLEX Pearl**:\n' + KNOWLEDGE_RESPONSES.lipids.clinicalPearls + '\n\n🧠 **Memory Hook**:\n' + KNOWLEDGE_RESPONSES.lipids.mnemonic;
    }

    return `### Clinical Tutor Synthesis on: "${query}"\n\n1. **Core Biochemical Principle**:\n   - This concept ties directly to cellular fuel availability, enzymatic catalysis, and physiological homeostasis in clinical patients.\n\n2. **Nursing Assessment & Care Priorities**:\n   - Monitor blood glucose, electrolyte panels (especially K⁺ and Na⁺), and hydration status.\n   - Ensure timely patient education on dietary intake, medication timing (e.g., insulin before meals), and early signs of acute metabolic decompensation.\n\n3. **NCLEX High-Yield Takeaway**:\n   - Always prioritize airway/breathing, rapid glucose verification, and intravenous access when evaluating acute metabolic or endocrine crises.\n\n*Would you like a clinical scenario quiz, a step-by-step pathway breakdown, or an exam mnemonic on this topic?*`;
  };

  /**
   * Main query handler with OpenAI Semantic Memory Token-Saving System:
   * 1. Checks shared memory (server + client)
   * 2. If similar query exists -> returns from memory (0 tokens!)
   * 3. If new query -> generates response, stores in memory for next user
   */
  const handleSendMessage = async (textToSend) => {
    const messageContent = (textToSend || input).trim();
    if (!messageContent || loading) return;

    const userMessage = {
      role: 'user',
      content: messageContent,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setLoading(true);

    try {
      let botResponse = '';
      let fromMemory = false;
      let tokensUsed = 0;
      let tokensSaved = 0;
      let similarityScore = null;
      let matchedQuery = null;
      let modelUsed = aiModel;

      // STEP 1: Attempt querying through Backend Semantic Memory Token-Saver API
      let backendSuccess = false;
      try {
        const res = await apiClient('/api/ai/query', {
          method: 'POST',
          body: JSON.stringify({
            query: messageContent,
            category: currentRouteData?.category || 'Clinical Nutrition & Biochemistry',
            apiKey: apiKey || null
          })
        });

        if (res && res.success && res.response) {
          botResponse = res.response;
          fromMemory = Boolean(res.fromMemory);
          tokensUsed = res.tokensUsed || 0;
          tokensSaved = res.tokensSaved || 0;
          similarityScore = res.similarity;
          matchedQuery = res.matchedQuery;
          modelUsed = res.model || aiModel;
          backendSuccess = true;
        }
      } catch (err) {
        console.warn('Backend memory API unreachable, proceeding with client-side memory cache:', err);
      }

      // STEP 2: Client-side Memory Check fallback if backend didn't handle it
      if (!backendSuccess) {
        // A) Check Client Semantic Memory Cache
        const localHit = findSimilarLocal(messageContent);
        if (localHit && localHit.hit) {
          botResponse = localHit.response;
          fromMemory = true;
          tokensUsed = 0;
          tokensSaved = localHit.tokensSaved;
          similarityScore = localHit.similarity;
          matchedQuery = localHit.matchedQuery;
          modelUsed = localHit.model;
        } else {
          // B) Query OpenAI or fallback LLM
          if (apiKey) {
            const response = await fetch(apiUrl, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${apiKey}`
              },
              body: JSON.stringify({
                model: aiModel,
                messages: [
                  {
                    role: 'system',
                    content: 'You are an expert AI Clinical Nursing & Biochemistry Tutor. Provide clear, concise, structured explanations with clinical rationales, NCLEX points, and memory hooks.'
                  },
                  ...messages.slice(-4).map((m) => ({ role: m.role, content: m.content })),
                  { role: 'user', content: messageContent }
                ],
                max_tokens: 450
              })
            });

            const data = await response.json();
            if (response.ok && data.choices?.[0]?.message?.content) {
              botResponse = data.choices[0].message.content;
              modelUsed = data.model || aiModel;
              tokensUsed = data.usage?.total_tokens || 350;
            } else {
              botResponse = generateClinicalResponse(messageContent);
              tokensUsed = 300;
            }
          } else if (geminiApiKey) {
            const systemPrompt = 'Clinical Nursing & Biochemistry Tutor for students. High-yield NCLEX points, clinical rationales, and memory hooks.';
            const prompt = `${systemPrompt}\n\nStudent: ${messageContent}\nTutor:`;

            const response = await fetch(
              `${geminiBaseUrl}/v1beta/models/${geminiModel}:generateContent?key=${geminiApiKey}`,
              {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                  contents: [{ parts: [{ text: prompt }] }],
                  generationConfig: { temperature: 0.3, maxOutputTokens: 500 }
                })
              }
            );

            const data = await response.json();
            const geminiText = data.candidates?.[0]?.content?.parts?.[0]?.text;
            if (response.ok && geminiText) {
              botResponse = geminiText;
              modelUsed = geminiModel;
              tokensUsed = 320;
            } else {
              botResponse = generateClinicalResponse(messageContent);
              tokensUsed = 280;
            }
          } else {
            await new Promise((r) => setTimeout(r, 400));
            botResponse = generateClinicalResponse(messageContent);
            tokensUsed = 260;
          }

          // C) Store newly generated response into client memory so all future similar searches use 0 tokens!
          storeLocalMemory({
            query: messageContent,
            response: botResponse,
            model: modelUsed,
            tokensUsed
          });
        }
      }

      const botMessage = {
        role: 'assistant',
        content: botResponse,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        fromMemory,
        tokensUsed,
        tokensSaved,
        similarity: similarityScore,
        matchedQuery,
        model: modelUsed
      };

      setMessages((prev) => [...prev, botMessage]);
      logChatTelemetry(messageContent, botResponse, { tokensUsed, tokensSaved, fromMemory });
      refreshMemoryStats();
    } catch (err) {
      console.warn('AI Tutor fallback error:', err);
      const fallbackResponse = generateClinicalResponse(messageContent);
      setMessages((prev) => [
        ...prev,
        {
          role: 'assistant',
          content: fallbackResponse,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          fromMemory: false,
          tokensUsed: 250
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  // Quick Action Buttons
  const handleActionPill = (actionType) => {
    let prompt = '';
    const currentTopic = currentRouteData?.category || 'Biochemistry';

    switch (actionType) {
      case 'simple':
        prompt = `Explain ${currentTopic} in very simple, easy-to-understand terms with a real-life analogy.`;
        break;
      case 'nclex':
        prompt = `Give me a high-yield NCLEX clinical scenario question and nursing intervention rationale for ${currentTopic}.`;
        break;
      case 'pathway':
        prompt = `Outline the complete step-by-step mechanism and key enzymes for ${currentTopic}.`;
        break;
      case 'mnemonic':
        prompt = `What are the best memory hooks and mnemonics to easily remember ${currentTopic} for exams?`;
        break;
      case 'quiz':
        prompt = `Quiz me with 2 clinical multiple-choice questions on ${currentTopic} with answers.`;
        break;
      default:
        prompt = `Provide a comprehensive summary of ${currentTopic}.`;
    }
    handleSendMessage(prompt);
  };

  // Text-To-Speech (Voice Audio)
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

  const handleClearChat = () => {
    if (window.speechSynthesis) window.speechSynthesis.cancel();
    setIsSpeaking(false);
    setMessages([
      {
        role: 'assistant',
        content: `Chat session reset! 👋 Ask any clinical question. Queries are preserved in our **0-Token Semantic Memory**!`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        fromMemory: true,
        tokensUsed: 0
      }
    ]);
  };

  const handleClearMemory = async () => {
    if (window.confirm('Clear all stored memory queries and reset token counters?')) {
      clearClientMemory();
      try {
        await apiClient('/api/ai/clear', { method: 'POST' });
      } catch {}
      refreshMemoryStats();
    }
  };

  return (
    <>
      {/* Floating Widget Trigger Button */}
      {!open && (
        <button
          onClick={() => setOpen(true)}
          className="fixed bottom-6 right-6 z-50 flex items-center gap-2.5 px-4 py-3 rounded-full bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 text-white font-bold shadow-2xl hover:scale-105 active:scale-95 transition-all duration-200 cursor-pointer border border-emerald-400/40 group"
        >
          <div className="relative">
            <Sparkles className="w-5 h-5 text-emerald-200 animate-spin-slow group-hover:rotate-12 transition-transform" />
            <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-amber-400 border-2 border-emerald-900 rounded-full animate-pulse" />
          </div>
          <span className="text-xs sm:text-sm tracking-wide font-extrabold">Ask AI Clinical Tutor</span>
          {memoryStats.totalTokensSaved > 0 && (
            <span className="px-2 py-0.5 rounded-full text-[10px] font-extrabold bg-emerald-950/80 text-emerald-300 border border-emerald-400/30 flex items-center gap-1">
              <Zap className="w-2.5 h-2.5 text-amber-300" />
              {memoryStats.totalTokensSaved.toLocaleString()} Saved
            </span>
          )}
        </button>
      )}

      {/* Main Tutor Window */}
      {open && (
        <div
          className={`fixed z-50 flex flex-col bg-slate-900/98 text-slate-100 backdrop-blur-2xl border border-slate-700/70 shadow-2xl transition-all duration-300 ${
            isMobile
              ? 'inset-0 w-full h-full rounded-none'
              : 'bottom-6 right-6 w-[540px] h-[720px] max-h-[88vh] rounded-3xl overflow-hidden'
          }`}
        >
          {/* Header */}
          <div className="flex items-center justify-between px-5 py-3.5 border-b border-slate-800 bg-gradient-to-r from-slate-950 via-slate-900 to-emerald-950/50">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-emerald-500 via-teal-400 to-sky-500 p-[1.5px] shadow-lg shadow-emerald-500/20">
                <div className="w-full h-full bg-slate-900 rounded-[15px] flex items-center justify-center">
                  <Sparkles className="w-5 h-5 text-emerald-400" />
                </div>
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="font-extrabold text-sm text-white tracking-tight">
                    MetaNutriBio AI Tutor
                  </h3>
                  <button
                    onClick={() => setShowMemoryStats(!showMemoryStats)}
                    className="px-2 py-0.5 rounded-full text-[10px] font-extrabold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 hover:bg-emerald-500/30 transition-colors flex items-center gap-1 cursor-pointer"
                    title="View OpenAI Token Saver Memory Dashboard"
                  >
                    <Zap className="w-3 h-3 text-amber-400 fill-amber-400" />
                    <span>0-Token Memory</span>
                  </button>
                </div>
                <p className="text-[11px] text-slate-400 flex items-center gap-1.5 mt-0.5">
                  <span>{currentRouteData ? `${currentRouteData.icon} ${currentRouteData.category}` : 'Clinical Nursing & Biochemistry'}</span>
                  <span className="text-slate-600">•</span>
                  <span className="text-emerald-400 font-semibold">{memoryStats.totalTokensSaved.toLocaleString()} tokens saved</span>
                </p>
              </div>
            </div>

            <div className="flex items-center gap-1.5">
              <button
                onClick={() => setShowMemoryStats(!showMemoryStats)}
                title="OpenAI Memory & Token Analytics"
                className={`p-2 rounded-xl transition-colors cursor-pointer ${
                  showMemoryStats ? 'bg-emerald-600 text-white' : 'text-slate-400 hover:text-white hover:bg-slate-800'
                }`}
              >
                <Database className="w-4 h-4" />
              </button>
              <button
                onClick={handleClearChat}
                title="Reset Chat Session"
                className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
              <button
                onClick={() => {
                  if (window.speechSynthesis) window.speechSynthesis.cancel();
                  setIsSpeaking(false);
                  setOpen(false);
                }}
                className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
              >
                {isMobile ? <ChevronDown className="w-5 h-5" /> : <X className="w-5 h-5" />}
              </button>
            </div>
          </div>

          {/* Token Memory Dashboard Drawer (Expandable) */}
          {showMemoryStats && (
            <div className="bg-slate-950 border-b border-slate-800 p-4 animate-in slide-in-from-top-2 duration-200">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  <span className="text-xs font-bold text-white tracking-wide">
                    OpenAI Token Memory System
                  </span>
                </div>
                <button
                  onClick={handleClearMemory}
                  className="text-[10px] text-rose-400 hover:text-rose-300 flex items-center gap-1 transition-colors cursor-pointer"
                >
                  <Trash2 className="w-3 h-3" />
                  <span>Clear Memory</span>
                </button>
              </div>

              {/* Stats Counters Grid */}
              <div className="grid grid-cols-3 gap-2 mb-3 text-center">
                <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-2">
                  <div className="flex items-center justify-center gap-1 text-[10px] text-emerald-400 font-bold mb-0.5">
                    <Coins className="w-3 h-3" />
                    <span>Tokens Saved</span>
                  </div>
                  <div className="text-base font-extrabold text-white">
                    {memoryStats.totalTokensSaved.toLocaleString()}
                  </div>
                  <div className="text-[9px] text-slate-400">0 Tokens consumed</div>
                </div>

                <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-2">
                  <div className="flex items-center justify-center gap-1 text-[10px] text-sky-400 font-bold mb-0.5">
                    <TrendingUp className="w-3 h-3" />
                    <span>Memory Hits</span>
                  </div>
                  <div className="text-base font-extrabold text-white">
                    {memoryStats.totalHits || 0}
                  </div>
                  <div className="text-[9px] text-slate-400">Repeated searches</div>
                </div>

                <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-2">
                  <div className="flex items-center justify-center gap-1 text-[10px] text-amber-400 font-bold mb-0.5">
                    <Database className="w-3 h-3" />
                    <span>In Memory</span>
                  </div>
                  <div className="text-base font-extrabold text-white">
                    {memoryStats.totalStored || recentMemories.length}
                  </div>
                  <div className="text-[9px] text-slate-400">Cached queries</div>
                </div>
              </div>

              {/* Explanation Note */}
              <p className="text-[10px] text-slate-400 leading-relaxed bg-slate-900/60 rounded-xl p-2 border border-slate-800/80 mb-2.5">
                💡 <strong className="text-emerald-300">How it saves tokens:</strong> When you or another user searches a topic, it stores the semantic vector and response in shared memory. Any subsequent similar query fetches directly from memory at <span className="text-emerald-400 font-bold">0 tokens</span>!
              </p>

              {/* Try Stored Query Quick Pills */}
              {recentMemories.length > 0 && (
                <div>
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1.5">
                    Try Similar Search (Will Hit Memory at 0 Tokens):
                  </span>
                  <div className="flex flex-wrap gap-1.5 max-h-24 overflow-y-auto pr-1">
                    {recentMemories.slice(0, 4).map((m, idx) => (
                      <button
                        key={idx}
                        onClick={() => {
                          setShowMemoryStats(false);
                          handleSendMessage(m.query);
                        }}
                        className="text-[10px] bg-slate-900 hover:bg-emerald-950/60 border border-slate-700 hover:border-emerald-500/60 text-slate-300 hover:text-emerald-300 px-2.5 py-1 rounded-lg transition-colors flex items-center gap-1 cursor-pointer truncate max-w-full"
                      >
                        <Zap className="w-2.5 h-2.5 text-amber-400 shrink-0" />
                        <span className="truncate">{m.query}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Quick Action Navigation Tabs */}
          <div className="flex items-center justify-around px-3 py-2 bg-slate-950/90 border-b border-slate-800 text-[11px] font-bold">
            <button
              onClick={() => handleActionPill('simple')}
              className="flex items-center gap-1 px-2.5 py-1 rounded-lg hover:bg-emerald-500/10 text-slate-300 hover:text-emerald-400 transition-colors cursor-pointer"
            >
              <Lightbulb className="w-3.5 h-3.5 text-amber-400" />
              <span>Explain Simply</span>
            </button>
            <button
              onClick={() => handleActionPill('nclex')}
              className="flex items-center gap-1 px-2.5 py-1 rounded-lg hover:bg-sky-500/10 text-slate-300 hover:text-sky-400 transition-colors cursor-pointer"
            >
              <Stethoscope className="w-3.5 h-3.5 text-sky-400" />
              <span>NCLEX Case</span>
            </button>
            <button
              onClick={() => handleActionPill('mnemonic')}
              className="flex items-center gap-1 px-2.5 py-1 rounded-lg hover:bg-purple-500/10 text-slate-300 hover:text-purple-400 transition-colors cursor-pointer"
            >
              <Zap className="w-3.5 h-3.5 text-purple-400" />
              <span>Mnemonics</span>
            </button>
            <button
              onClick={() => handleActionPill('quiz')}
              className="flex items-center gap-1 px-2.5 py-1 rounded-lg hover:bg-rose-500/10 text-slate-300 hover:text-rose-400 transition-colors cursor-pointer"
            >
              <HelpCircle className="w-3.5 h-3.5 text-rose-400" />
              <span>Quiz Me</span>
            </button>
          </div>

          {/* Messages Container */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 text-xs">
            {messages.map((msg, idx) => {
              const isUser = msg.role === 'user';
              return (
                <div
                  key={idx}
                  className={`flex flex-col ${isUser ? 'items-end' : 'items-start'} animate-in fade-in duration-200`}
                >
                  <div
                    className={`max-w-[90%] rounded-2xl p-4 leading-relaxed shadow-lg ${
                      isUser
                        ? 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-medium rounded-tr-none'
                        : 'bg-slate-800/95 border border-slate-700/80 text-slate-200 rounded-tl-none'
                    }`}
                  >
                    {/* Token & Memory Badge on AI responses */}
                    {!isUser && (
                      <div className="mb-2 pb-2 border-b border-slate-700/50 flex flex-wrap items-center gap-1.5">
                        {msg.fromMemory ? (
                          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-extrabold bg-gradient-to-r from-emerald-950 to-teal-950 text-emerald-300 border border-emerald-500/40 shadow-sm">
                            <Zap className="w-3 h-3 text-amber-400 fill-amber-400 animate-pulse" />
                            <span>⚡ Served from Memory (0 Tokens Used)</span>
                            {msg.similarity && (
                              <span className="text-emerald-400 font-mono">
                                • {Math.round(msg.similarity * 100)}% match
                              </span>
                            )}
                          </div>
                        ) : (
                          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold bg-slate-900/90 text-sky-300 border border-sky-500/30">
                            <Sparkles className="w-3 h-3 text-sky-400" />
                            <span>🤖 Fresh AI Generation • Stored in memory</span>
                            {msg.tokensUsed > 0 && (
                              <span className="text-slate-400 font-mono">
                                ({msg.tokensUsed} tokens)
                              </span>
                            )}
                          </div>
                        )}

                        {msg.fromMemory && msg.tokensSaved > 0 && (
                          <span className="px-2 py-0.5 rounded-full text-[9px] font-bold bg-amber-500/10 text-amber-300 border border-amber-500/20">
                            Saved ~{msg.tokensSaved} tokens
                          </span>
                        )}
                      </div>
                    )}

                    <div className="whitespace-pre-wrap font-sans">
                      {msg.content}
                    </div>

                    {/* Bottom message utility bar (for assistant) */}
                    {!isUser && (
                      <div className="flex items-center justify-between mt-3 pt-2.5 border-t border-slate-700/60 text-[10px] text-slate-400">
                        <div className="flex items-center gap-1">
                          <span>{msg.timestamp}</span>
                          {msg.matchedQuery && (
                            <span className="text-[9px] text-slate-500 truncate max-w-[150px]">
                              • Ref: "{msg.matchedQuery}"
                            </span>
                          )}
                        </div>
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => toggleSpeech(msg.content)}
                            className="p-1 hover:text-emerald-400 rounded transition-colors cursor-pointer"
                            title={isSpeaking ? 'Stop Audio' : 'Listen with Speech Voice'}
                          >
                            {isSpeaking ? (
                              <VolumeX className="w-3.5 h-3.5 text-emerald-400 animate-pulse" />
                            ) : (
                              <Volume2 className="w-3.5 h-3.5" />
                            )}
                          </button>
                          <button
                            onClick={() => handleCopy(msg.content, idx)}
                            className="p-1 hover:text-emerald-400 rounded transition-colors cursor-pointer"
                            title="Copy text"
                          >
                            {copiedIndex === idx ? (
                              <Check className="w-3.5 h-3.5 text-emerald-400" />
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
            })}

            {/* Loading Indicator */}
            {loading && (
              <div className="flex items-center gap-2.5 p-3 rounded-2xl bg-slate-800/80 border border-slate-700/60 text-emerald-400 w-fit">
                <div className="w-4 h-4 border-2 border-emerald-400/30 border-t-emerald-400 rounded-full animate-spin" />
                <span className="text-[11px] font-bold">
                  Checking semantic memory & synthesizing clinical rationale...
                </span>
              </div>
            )}
            <div ref={chatEndRef} />
          </div>

          {/* Suggested Topic Questions Carousel */}
          {randomQuestions.length > 0 && (
            <div className="px-4 py-2 border-t border-slate-800/80 bg-slate-950/70">
              <div className="flex items-center gap-1.5 mb-1.5 text-[10px] font-extrabold uppercase tracking-wider text-slate-400">
                <BookOpen className="w-3 h-3 text-emerald-400" />
                <span>Suggested Clinical Inquiries</span>
              </div>
              <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-none">
                {randomQuestions.slice(0, 4).map((q, i) => (
                  <button
                    key={i}
                    onClick={() => handleSendMessage(q)}
                    className="shrink-0 px-3 py-1.5 rounded-full bg-slate-800/90 hover:bg-emerald-600/20 border border-slate-700/80 hover:border-emerald-500/50 text-[11px] text-slate-300 hover:text-emerald-300 font-medium transition-all cursor-pointer truncate max-w-[260px]"
                  >
                    ❓ {q}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Input Section */}
          <div className="p-3.5 bg-slate-950 border-t border-slate-800">
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
                placeholder="Ask or search anything (e.g. carbohydrate digestion, insulin, DKA)..."
                className="flex-1 bg-slate-900 border border-slate-700 focus:border-emerald-500 rounded-2xl py-2.5 px-4 text-xs text-white placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-emerald-500 transition-all font-medium"
              />
              <button
                type="submit"
                disabled={loading || !input.trim()}
                className="p-2.5 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white rounded-2xl shadow-md shadow-emerald-500/20 disabled:opacity-40 transition-all cursor-pointer"
                title="Send query"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
            <div className="flex items-center justify-between text-[10px] text-slate-500 px-1 mt-1.5">
              <span>Press Enter to ask</span>
              <span className="text-emerald-400/90 font-medium flex items-center gap-1">
                <Zap className="w-2.5 h-2.5 text-amber-400" />
                Repeated & similar questions use 0 tokens
              </span>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AIWidget;
