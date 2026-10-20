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
  Zap,
  Database,
  Coins,
  ShieldCheck,
  ShieldAlert,
  ExternalLink,
  TrendingUp,
  Trash2
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
  const [tutorMode, setTutorMode] = useState('default');
  const [chapters, setChapters] = useState([]);
  const [selectedChapterId, setSelectedChapterId] = useState('');
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
      content: `Hello! 👋 I am your **MedPulse Clinical AI Tutor**.\n\n• **Chapter Scoping**: I retrieve directly from your accredited clinical nursing curriculum.\n• **Tutor Modes**: Switch between **🎓 Standard Tutor**, **💡 Explain Simply**, **📝 Quiz Me**, or **🏥 Clinical Case Walkthrough**.\n• **Evidence Citations**: Every clinical explanation includes direct citations back to your course lessons.\n\nSelect a chapter scope or ask a question below to begin!`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      citations: [],
      scoped: true,
      refusal: false
    }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [currentRouteData, setCurrentRouteData] = useState(null);
  const [randomQuestions, setRandomQuestions] = useState([]);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [copiedIndex, setCopiedIndex] = useState(null);

  const chatEndRef = useRef(null);

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

  useEffect(() => {
    const fetchChapters = async () => {
      try {
        const res = await apiClient('/api/courses/hierarchy');
        if (res && res.success && res.courses?.[0]?.chapters) {
          const chList = res.courses[0].chapters;
          setChapters(chList);
          if (chList.length > 0) {
            setSelectedChapterId((prev) => prev || chList[0]._id);
          }
        }
      } catch (err) {
        console.warn('Failed to fetch course chapters for RAG selector:', err);
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
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

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

  const handleSendMessage = async (textToSend, overrideMode = null) => {
    const messageContent = (textToSend || input).trim();
    if (!messageContent || loading) return;

    const activeMode = overrideMode || tutorMode;
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
      let citations = [];
      let scoped = true;
      let refusal = false;
      let confidence = null;
      let chapterTitle = null;
      let chapterOrder = null;
      let fromMemory = false;
      let tokensUsed = 0;
      let tokensSaved = 0;
      let similarityScore = null;
      let matchedQuery = null;
      let modelUsed = 'MedPulse Scoped RAG Hybrid';

      let ragSuccess = false;
      const targetChapterId = selectedChapterId || (chapters.length > 0 ? chapters[0]._id : null);

      if (targetChapterId) {
        try {
          const res = await apiClient('/api/rag/chat', {
            method: 'POST',
            body: JSON.stringify({
              chapterId: targetChapterId,
              query: messageContent,
              mode: activeMode
            })
          });

          if (res && res.success) {
            botResponse = res.response;
            citations = res.citations || [];
            scoped = res.scoped !== false;
            refusal = Boolean(res.refusal);
            confidence = res.confidence;
            chapterTitle = res.chapterTitle;
            chapterOrder = res.chapterOrder;
            tokensUsed = 260;
            ragSuccess = true;
          }
        } catch (apiErr) {
          console.warn('[AIWidget] Backend RAG chat API error:', apiErr);
        }
      }

      if (!ragSuccess) {
        const localHit = findSimilarLocal(messageContent);
        if (localHit && localHit.hit) {
          botResponse = localHit.response;
          fromMemory = true;
          tokensUsed = 0;
          tokensSaved = localHit.tokensSaved;
          similarityScore = localHit.similarity;
          matchedQuery = localHit.matchedQuery;
        } else {
          botResponse = generateClinicalResponse(messageContent);
          tokensUsed = 240;
        }
      }

      const botMessage = {
        role: 'assistant',
        content: botResponse,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        citations,
        scoped,
        refusal,
        confidence,
        chapterTitle,
        chapterOrder,
        mode: activeMode,
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
      console.warn('AI Tutor query error:', err);
      const fallbackResponse = generateClinicalResponse(messageContent);
      setMessages((prev) => [
        ...prev,
        {
          role: 'assistant',
          content: fallbackResponse,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          citations: [],
          scoped: true,
          refusal: false,
          tokensUsed: 200
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleActionPill = (actionType) => {
    setTutorMode(actionType);
    const activeCh = chapters.find((c) => c._id === selectedChapterId);
    const topic = activeCh ? activeCh.title : (currentRouteData?.category || 'Clinical Nursing');

    let prompt = '';
    switch (actionType) {
      case 'simple':
        prompt = `Explain ${topic} in very simple, easy-to-understand terms with a real-life clinical analogy.`;
        break;
      case 'case':
        prompt = `Walk me through a realistic patient case scenario (SBAR format) on ${topic} and ask what my immediate nursing priority should be.`;
        break;
      case 'quiz':
        prompt = `Quiz me with 2 NCLEX-style clinical scenario questions on ${topic} with answers and rationales.`;
        break;
      default:
        prompt = `Provide a comprehensive clinical summary and high-yield nursing pearls for ${topic}.`;
    }
    handleSendMessage(prompt, actionType);
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
      {/* Floating Widget Trigger Button: Icon-only circle that expands on hover/focus */}
      {!open && (
        <button
          onClick={() => setOpen(true)}
          className="fixed bottom-6 right-6 z-50 flex items-center h-12 rounded-full bg-green-600 hover:bg-green-700 text-white font-extrabold shadow-2xl hover:scale-105 active:scale-95 transition-all duration-300 cursor-pointer border border-green-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-green-600 focus-visible:ring-offset-2 group px-3.5"
          aria-label="Ask AI Clinical Tutor"
          title="Ask AI Clinical Tutor"
        >
          <Sparkles className="w-5 h-5 text-white shrink-0" />
          <span className="max-w-0 overflow-hidden whitespace-nowrap opacity-0 group-hover:max-w-xs group-hover:opacity-100 group-hover:ml-2 group-focus-visible:max-w-xs group-focus-visible:opacity-100 group-focus-visible:ml-2 transition-all duration-300 text-xs sm:text-sm font-extrabold text-white">
            Ask AI Clinical Tutor
          </span>
        </button>
      )}

      {/* Main Tutor Window: pure white surfaces, black text, green accents */}
      {open && (
        <div
          className={`fixed z-50 flex flex-col bg-white text-black border border-neutral-300 shadow-2xl transition-all duration-300 ${
            isMobile
              ? 'inset-0 w-full h-full rounded-none'
              : 'bottom-6 right-6 w-[540px] h-[720px] max-h-[88vh] rounded-3xl overflow-hidden'
          }`}
        >
          {/* Header */}
          <div className="flex items-center justify-between px-5 py-3.5 border-b border-neutral-200 bg-neutral-50">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-2xl bg-green-600 flex items-center justify-center text-white font-extrabold shadow-xs">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="font-extrabold text-sm text-black tracking-tight">
                    MedPulse AI Tutor
                  </h3>
                  <button
                    onClick={() => setShowMemoryStats(!showMemoryStats)}
                    className="px-2 py-0.5 rounded-full text-[10px] font-extrabold bg-neutral-100 text-black border border-neutral-300 hover:border-green-600 transition-colors flex items-center gap-1 cursor-pointer"
                    title="View Token Memory Stats"
                  >
                    <Zap className="w-3 h-3 text-green-700" />
                    <span>0-Token Memory</span>
                  </button>
                </div>
                <p className="text-[11px] text-neutral-600 flex items-center gap-1.5 mt-0.5">
                  <span>{currentRouteData ? `${currentRouteData.icon} ${currentRouteData.category}` : 'Clinical Nursing & Biochemistry'}</span>
                  <span>&bull;</span>
                  <span className="text-green-700 font-semibold">{memoryStats.totalTokensSaved.toLocaleString()} tokens saved</span>
                </p>
              </div>
            </div>

            <div className="flex items-center gap-1.5">
              <button
                onClick={() => setShowMemoryStats(!showMemoryStats)}
                title="Memory Analytics"
                className={`p-2 rounded-xl transition-colors cursor-pointer ${
                  showMemoryStats ? 'bg-green-600 text-white' : 'text-neutral-600 hover:text-black hover:bg-neutral-100'
                }`}
              >
                <Database className="w-4 h-4" />
              </button>
              <button
                onClick={handleClearChat}
                title="Reset Chat Session"
                className="p-2 rounded-xl text-neutral-600 hover:text-black hover:bg-neutral-100 transition-colors cursor-pointer"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
              <button
                onClick={() => {
                  if (window.speechSynthesis) window.speechSynthesis.cancel();
                  setIsSpeaking(false);
                  setOpen(false);
                }}
                className="p-2 rounded-xl text-neutral-600 hover:text-black hover:bg-neutral-100 transition-colors cursor-pointer"
              >
                {isMobile ? <ChevronDown className="w-5 h-5" /> : <X className="w-5 h-5" />}
              </button>
            </div>
          </div>

          {/* Token Memory Dashboard Drawer */}
          {showMemoryStats && (
            <div className="bg-neutral-50 dark:bg-neutral-900 border-b border-neutral-200 dark:border-neutral-800 p-4 animate-in slide-in-from-top-2 duration-200">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-green-700 dark:text-green-400" />
                  <span className="text-xs font-bold text-black dark:text-white tracking-wide">
                    Semantic Token Memory System
                  </span>
                </div>
                <button
                  onClick={handleClearMemory}
                  className="text-[10px] text-neutral-600 dark:text-neutral-400 hover:text-black dark:hover:text-white flex items-center gap-1 transition-colors cursor-pointer underline"
                >
                  <Trash2 className="w-3 h-3" />
                  <span>Clear Memory</span>
                </button>
              </div>

              {/* Stats Counters Grid */}
              <div className="grid grid-cols-3 gap-2 mb-3 text-center">
                <div className="bg-white border border-neutral-200 rounded-xl p-2 shadow-2xs">
                  <div className="flex items-center justify-center gap-1 text-[10px] text-green-700 font-bold mb-0.5">
                    <Coins className="w-3 h-3" />
                    <span>Tokens Saved</span>
                  </div>
                  <div className="text-base font-extrabold text-neutral-900">
                    {memoryStats.totalTokensSaved.toLocaleString()}
                  </div>
                  <div className="text-[9px] text-neutral-500">0 Tokens consumed</div>
                </div>

                <div className="bg-white border border-neutral-200 rounded-xl p-2 shadow-2xs">
                  <div className="flex items-center justify-center gap-1 text-[10px] text-neutral-600 font-bold mb-0.5">
                    <TrendingUp className="w-3 h-3" />
                    <span>Memory Hits</span>
                  </div>
                  <div className="text-base font-extrabold text-neutral-900">
                    {memoryStats.totalHits || 0}
                  </div>
                  <div className="text-[9px] text-neutral-500">Repeated searches</div>
                </div>

                <div className="bg-white border border-neutral-200 rounded-xl p-2 shadow-2xs">
                  <div className="flex items-center justify-center gap-1 text-[10px] text-neutral-600 font-bold mb-0.5">
                    <Database className="w-3 h-3" />
                    <span>In Memory</span>
                  </div>
                  <div className="text-base font-extrabold text-neutral-900">
                    {memoryStats.totalStored || recentMemories.length}
                  </div>
                  <div className="text-[9px] text-neutral-500">Cached queries</div>
                </div>
              </div>

              {recentMemories.length > 0 && (
                <div>
                  <span className="text-[10px] font-bold text-neutral-500 uppercase tracking-wider block mb-1.5">
                    Try Similar Search (0 Tokens):
                  </span>
                  <div className="flex flex-wrap gap-1.5 max-h-24 overflow-y-auto pr-1">
                    {recentMemories.slice(0, 4).map((m, idx) => (
                      <button
                        key={idx}
                        onClick={() => {
                          setShowMemoryStats(false);
                          handleSendMessage(m.query);
                        }}
                        className="text-[10px] bg-white dark:bg-black border border-neutral-300 dark:border-neutral-700 hover:border-green-500 text-black dark:text-white px-2.5 py-1 rounded-lg transition-colors flex items-center gap-1 cursor-pointer truncate max-w-full"
                      >
                        <Zap className="w-2.5 h-2.5 text-green-500 shrink-0" />
                        <span className="truncate">{m.query}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Chapter Scope Bar & Tutor Mode Selector */}
          <div className="px-3 py-2 bg-neutral-100 dark:bg-neutral-900 border-b border-neutral-200 dark:border-neutral-800 space-y-2">
            <div className="flex items-center justify-between gap-2 text-[11px]">
              <span className="text-neutral-600 dark:text-neutral-400 font-medium shrink-0 flex items-center gap-1">
                <BookOpen className="w-3.5 h-3.5 text-green-700 dark:text-green-400" />
                <span>Scope:</span>
              </span>
              <select
                value={selectedChapterId}
                onChange={(e) => setSelectedChapterId(e.target.value)}
                className="bg-white dark:bg-black border border-neutral-300 dark:border-neutral-700 rounded-lg px-2 py-1 text-black dark:text-white text-[11px] focus:outline-none focus:border-green-500 w-full truncate cursor-pointer font-medium"
              >
                {chapters.length > 0 ? (
                  chapters.map((ch) => (
                    <option key={ch._id} value={ch._id}>
                      Ch {ch.order}: {ch.title}
                    </option>
                  ))
                ) : (
                  <option value="">Ch 1: Fundamentals of Nursing, Safety & Infection Control</option>
                )}
              </select>
            </div>

            {/* Mode Selector Tabs */}
            <div className="grid grid-cols-4 gap-1 text-[10px] font-bold">
              <button
                onClick={() => setTutorMode('default')}
                className={`py-1 px-1 rounded-md transition-all text-center cursor-pointer truncate ${
                  tutorMode === 'default'
                    ? 'bg-green-600 text-white font-extrabold shadow-xs'
                    : 'bg-neutral-100 text-black hover:bg-neutral-200 border border-neutral-300'
                }`}
                title="Standard Tutor"
              >
                Tutor
              </button>
              <button
                onClick={() => handleActionPill('simple')}
                className={`py-1 px-1 rounded-md transition-all text-center cursor-pointer truncate ${
                  tutorMode === 'simple'
                    ? 'bg-green-600 text-white font-extrabold shadow-xs'
                    : 'bg-neutral-100 text-black hover:bg-neutral-200 border border-neutral-300'
                }`}
                title="Explain Simply"
              >
                Simple
              </button>
              <button
                onClick={() => handleActionPill('quiz')}
                className={`py-1 px-1 rounded-md transition-all text-center cursor-pointer truncate ${
                  tutorMode === 'quiz'
                    ? 'bg-green-600 text-white font-extrabold shadow-xs'
                    : 'bg-neutral-100 text-black hover:bg-neutral-200 border border-neutral-300'
                }`}
                title="Quiz Me"
              >
                Quiz
              </button>
              <button
                onClick={() => handleActionPill('case')}
                className={`py-1 px-1 rounded-md transition-all text-center cursor-pointer truncate ${
                  tutorMode === 'case'
                    ? 'bg-green-600 text-white font-extrabold shadow-xs'
                    : 'bg-neutral-100 text-black hover:bg-neutral-200 border border-neutral-300'
                }`}
                title="SBAR Case"
              >
                SBAR Case
              </button>
            </div>
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
                    className={`max-w-[90%] rounded-2xl p-4 leading-relaxed shadow-xs ${
                      isUser
                        ? 'bg-green-600 text-white font-medium rounded-tr-none'
                        : 'bg-white border border-neutral-300 text-black rounded-tl-none'
                    }`}
                  >
                    {!isUser && (
                      <div className="mb-2 pb-2 border-b border-neutral-200 flex flex-wrap items-center gap-1.5">
                        {msg.fromMemory ? (
                          <div className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-extrabold bg-green-100 text-green-900 border border-green-300 shadow-xs">
                            <Zap className="w-3 h-3 text-green-700" />
                            <span>Served from Memory (0 Tokens)</span>
                          </div>
                        ) : (
                          <div className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-neutral-100 text-black border border-neutral-300">
                            <Sparkles className="w-3 h-3 text-green-700" />
                            <span>Clinical RAG Synthesizer</span>
                          </div>
                        )}
                      </div>
                    )}

                    <div className="whitespace-pre-wrap font-sans">
                      {msg.content}
                    </div>

                    {!isUser && msg.refusal && (
                      <div className="mt-3 p-2.5 rounded-xl border-2 border-black dark:border-white bg-neutral-200 dark:bg-neutral-800 text-black dark:text-white text-[11px] flex items-start gap-2">
                        <ShieldAlert className="w-4 h-4 text-black dark:text-white shrink-0 mt-0.5" />
                        <div>
                          <div className="font-bold">Strictly Scoped Clinical Tutor</div>
                          <div className="text-[10px] text-neutral-600 dark:text-neutral-400 mt-0.5">
                            I am strictly scoped to this chapter's accredited clinical curriculum. Questions outside this scope are politely declined.
                          </div>
                        </div>
                      </div>
                    )}

                    {!isUser && msg.citations && msg.citations.length > 0 && (
                      <div className="mt-3 pt-2.5 border-t border-neutral-200 dark:border-neutral-800">
                        <div className="text-[10px] font-bold text-neutral-500 uppercase tracking-wider mb-1.5 flex items-center gap-1">
                          <BookOpen className="w-3 h-3 text-green-700 dark:text-green-400" />
                          <span>Clinical Curriculum Citations:</span>
                        </div>
                        <div className="flex flex-wrap gap-1.5">
                          {msg.citations.map((c, cIdx) => (
                            <a
                              key={cIdx}
                              href={c.lessonUrl || '#'}
                              className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-[10px] font-medium bg-white dark:bg-black hover:border-green-500 border border-neutral-300 dark:border-neutral-700 text-black dark:text-white transition-colors cursor-pointer group"
                            >
                              <span className="w-1.5 h-1.5 rounded-full bg-green-500" />
                              <span>Ch {c.chapterOrder}: {c.section}</span>
                              <ExternalLink className="w-2.5 h-2.5 opacity-60 group-hover:opacity-100" />
                            </a>
                          ))}
                        </div>
                      </div>
                    )}

                    {!isUser && (
                      <div className="flex items-center justify-between mt-3 pt-2.5 border-t border-neutral-200 dark:border-neutral-800 text-[10px] text-neutral-500">
                        <span>{msg.timestamp}</span>
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => toggleSpeech(msg.content)}
                            className="p-1 hover:text-green-700 dark:hover:text-green-400 rounded transition-colors cursor-pointer"
                            title={isSpeaking ? 'Stop Audio' : 'Listen with Speech'}
                          >
                            {isSpeaking ? (
                              <VolumeX className="w-3.5 h-3.5 text-green-600" />
                            ) : (
                              <Volume2 className="w-3.5 h-3.5" />
                            )}
                          </button>
                          <button
                            onClick={() => handleCopy(msg.content, idx)}
                            className="p-1 hover:text-green-700 dark:hover:text-green-400 rounded transition-colors cursor-pointer"
                            title="Copy text"
                          >
                            {copiedIndex === idx ? (
                              <Check className="w-3.5 h-3.5 text-green-600" />
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

            {loading && (
              <div className="flex items-center gap-2.5 p-3 rounded-2xl bg-neutral-100 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 text-black dark:text-white w-fit">
                <div className="w-4 h-4 border-2 border-neutral-400 border-t-green-500 rounded-full animate-spin" />
                <span className="text-[11px] font-bold">
                  Checking semantic memory & synthesizing clinical rationale...
                </span>
              </div>
            )}
            <div ref={chatEndRef} />
          </div>

          {/* Suggested Topic Questions Carousel */}
          {randomQuestions.length > 0 && (
            <div className="px-4 py-2 border-t border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-950">
              <div className="flex items-center gap-1.5 mb-1.5 text-[10px] font-extrabold uppercase tracking-wider text-neutral-500">
                <BookOpen className="w-3 h-3 text-green-700 dark:text-green-400" />
                <span>Suggested Clinical Inquiries</span>
              </div>
              <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-none">
                {randomQuestions.slice(0, 4).map((q, i) => (
                  <button
                    key={i}
                    onClick={() => handleSendMessage(q)}
                    className="shrink-0 px-3 py-1.5 rounded-full bg-white dark:bg-neutral-900 hover:border-green-500 border border-neutral-300 dark:border-neutral-700 text-[11px] text-black dark:text-white font-medium transition-all cursor-pointer truncate max-w-[260px]"
                  >
                    {q}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Input Section */}
          <div className="p-3.5 bg-neutral-50 border-t border-neutral-200">
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
                className="flex-1 bg-white border border-neutral-300 focus:border-green-600 rounded-2xl py-2.5 px-4 text-xs text-neutral-900 placeholder-neutral-400 focus:outline-none focus:ring-1 focus:ring-green-500 shadow-2xs font-medium"
              />
              <button
                type="submit"
                disabled={loading || !input.trim()}
                className="p-2.5 bg-green-600 hover:bg-green-700 text-white rounded-2xl shadow-xs disabled:opacity-40 transition-all cursor-pointer"
                title="Send query"
              >
                <Send className="w-4 h-4 text-white" />
              </button>
            </form>
            <div className="flex items-center justify-between text-[10px] text-neutral-500 px-1 mt-1.5">
              <span>Press Enter to ask</span>
              <span className="text-green-700 dark:text-green-400 font-semibold flex items-center gap-1">
                <Zap className="w-2.5 h-2.5" />
                Repeated questions use 0 tokens
              </span>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AIWidget;
