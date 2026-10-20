import { ContentEmbedding } from '../models/ContentEmbedding.js';
import { Chapter } from '../models/Chapter.js';
import { Subtopic } from '../models/Subtopic.js';
import { ChatLog } from '../models/ChatLog.js';
import { generateEmbedding, cosineSimilarity } from './embeddingService.js';

// Configurable confidence threshold for chapter-scoping refusal
const DEFAULT_CONFIDENCE_THRESHOLD = 0.20;
const TOP_K = 4;

// Standard English stop words to filter out for keyword extraction
const STOP_WORDS = new Set([
  'a', 'about', 'above', 'after', 'again', 'against', 'all', 'am', 'an', 'and', 'any', 'are', 'aren',
  'as', 'at', 'be', 'because', 'been', 'before', 'being', 'below', 'between', 'both', 'but', 'by',
  'can', 'could', 'did', 'do', 'does', 'doing', 'down', 'during', 'each', 'few', 'for', 'from',
  'further', 'had', 'has', 'have', 'having', 'he', 'her', 'here', 'hers', 'herself', 'him', 'himself',
  'his', 'how', 'i', 'if', 'in', 'into', 'is', 'it', 'its', 'itself', 'just', 'me', 'more', 'most',
  'my', 'myself', 'no', 'nor', 'not', 'now', 'of', 'off', 'on', 'once', 'only', 'or', 'other',
  'our', 'ours', 'ourselves', 'out', 'over', 'own', 'same', 'she', 'should', 'so', 'some', 'such',
  'than', 'that', 'the', 'their', 'theirs', 'them', 'themselves', 'then', 'there', 'these', 'they',
  'this', 'those', 'through', 'to', 'too', 'under', 'until', 'up', 'very', 'was', 'we', 'were',
  'what', 'when', 'where', 'which', 'while', 'who', 'whom', 'why', 'with', 'would', 'you', 'your'
]);

/**
 * Extracts normalized, unique keywords from clinical text
 */
export const extractKeywords = (text = '') => {
  if (!text || typeof text !== 'string') return [];
  const tokens = text
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, ' ')
    .split(/\s+/)
    .filter((w) => w.length > 2 && !STOP_WORDS.has(w));
  return Array.from(new Set(tokens));
};

/**
 * Calculates keyword similarity score between query keywords and a document chunk [0.0 - 1.0]
 */
export const calculateKeywordScore = (queryKeywords = [], chunk) => {
  if (!queryKeywords || queryKeywords.length === 0) return 0;

  const chunkKeywords = new Set(chunk.keywords || extractKeywords(`${chunk.title} ${chunk.sectionTitle} ${chunk.text}`));
  let matches = 0;
  let sectionMatches = 0;

  const lowerSection = (chunk.sectionTitle || '').toLowerCase();
  const lowerTitle = (chunk.title || '').toLowerCase();

  for (const kw of queryKeywords) {
    if (chunkKeywords.has(kw)) {
      matches += 1;
    }
    if (lowerSection.includes(kw) || lowerTitle.includes(kw)) {
      sectionMatches += 1;
    }
  }

  const baseRatio = matches / queryKeywords.length;
  const sectionBonus = Math.min(0.25, (sectionMatches / queryKeywords.length) * 0.25);

  return Math.min(1.0, baseRatio + sectionBonus);
};

/**
 * Section-aware parser that breaks structured markdown or clinical text into sectioned chunks
 */
export const parseSections = (title, contentBody) => {
  if (!contentBody || typeof contentBody !== 'string') return [];

  const lines = contentBody.split('\n');
  const sections = [];
  let currentSection = title || 'General Overview';
  let currentBuffer = [];

  for (const rawLine of lines) {
    const line = rawLine.trim();
    // Detect markdown headings (#, ##, ###) or numbered clinical headers
    const headingMatch = line.match(/^(?:#{1,4}\s+|(?:\d+\.\s+)|(?:Section\s+[A-Z0-9]+[:\.\s]+))([^\n]+)/i);

    if (headingMatch && currentBuffer.length > 0) {
      const sectionText = currentBuffer.join('\n').trim();
      if (sectionText.length > 40) {
        sections.push({
          sectionTitle: currentSection,
          text: sectionText
        });
      }
      currentSection = headingMatch[1].replace(/[*_#]/g, '').trim();
      currentBuffer = [];
    } else if (headingMatch && currentBuffer.length === 0) {
      currentSection = headingMatch[1].replace(/[*_#]/g, '').trim();
    } else if (line.length > 0) {
      currentBuffer.push(line);
    }
  }

  if (currentBuffer.length > 0) {
    const sectionText = currentBuffer.join('\n').trim();
    if (sectionText.length > 40) {
      sections.push({
        sectionTitle: currentSection,
        text: sectionText
      });
    }
  }

  // Fallback if no explicit sections were parsed
  if (sections.length === 0 && contentBody.trim().length > 40) {
    const paragraphs = contentBody
      .split(/\n\n+/)
      .map((p) => p.trim())
      .filter((p) => p.length > 40);

    paragraphs.forEach((p, idx) => {
      sections.push({
        sectionTitle: `${title} - Part ${idx + 1}`,
        text: p
      });
    });
  }

  return sections;
};

/**
 * Ingests and generates section-aware embeddings for a subtopic
 */
export const indexSubtopicContent = async (chapterId, subtopicId, title, contentBody) => {
  if (!contentBody) return;

  const sections = parseSections(title, contentBody);
  await ContentEmbedding.deleteMany({ subtopicId });

  for (let i = 0; i < sections.length; i++) {
    const { sectionTitle, text } = sections[i];
    const chunkTitle = `${title}: ${sectionTitle}`;
    const chunkText = `${chunkTitle}\n\n${text}`;
    const vector = await generateEmbedding(chunkText);
    const keywords = extractKeywords(chunkText);
    const chunkId = `emb_${subtopicId}_${i}`;

    await ContentEmbedding.create({
      chunkId,
      chapterId,
      subtopicId,
      sectionTitle,
      title: chunkTitle,
      text,
      vector,
      keywords,
      tokens: chunkText.split(/\s+/).length
    });
  }
};

/**
 * Builds the mode-specific prompt guidance for the LLM
 */
const getModeInstructions = (mode, chapter) => {
  switch (mode) {
    case 'simple':
      return `TUTOR MODE: "Explain Simply"
- Explain all clinical and physiological concepts using everyday language, simple words, and vivid real-life analogies.
- Avoid overwhelming medical jargon without first defining it simply.
- Include a memorable visual metaphor or real-world comparison.`;

    case 'quiz':
      return `TUTOR MODE: "Quiz Me on this Chapter"
- Generate 2 high-yield, NCLEX-RN style clinical scenario multiple-choice questions (A, B, C, D) directly from the excerpts.
- After each question, state the Correct Answer and a thorough Clinical Rationale explaining why that option is correct and why other distractors are incorrect.`;

    case 'case':
      return `TUTOR MODE: "Clinical Case Walkthrough"
- Structure the response as an SBAR patient presentation:
  * [S] Situation: Patient age, admitting diagnosis, current vital signs.
  * [B] Background: Relevant medical history and medication orders.
  * [A] Assessment: Current bedside nursing observation.
  * [R] Recommendation: Ask the nursing student what their FIRST priority nursing action should be based on Chapter ${chapter.order}.`;

    default:
      return `TUTOR MODE: "Standard Clinical Tutor"
- Provide a clear, evidence-based nursing explanation.
- Include high-yield NCLEX clinical pearls, nursing interventions, and safety warnings.
- Format with bullet points for maximum readability.`;
  }
};

/**
 * Chapter-scoped hybrid search & clinical answer generation
 */
export const queryChapterRAG = async ({ studentId, chapterId, query, mode = 'default' }) => {
  if (!query || !chapterId) {
    throw new Error('Both query and chapterId are required.');
  }

  const chapter = await Chapter.findById(chapterId);
  if (!chapter) {
    throw new Error('Chapter not found.');
  }

  const confidenceThreshold = parseFloat(
    process.env.RAG_CONFIDENCE_THRESHOLD || String(DEFAULT_CONFIDENCE_THRESHOLD)
  );

  // 1. Generate query embedding and extract search keywords
  const queryVector = await generateEmbedding(query);
  const queryKeywords = extractKeywords(query);

  // 2. Query MongoDB strictly scoped to chapterId (hard database-level boundary)
  const chapterEmbeddings = await ContentEmbedding.find({ chapterId }).lean();

  if (chapterEmbeddings.length === 0) {
    const refusal = `I am your Clinical Nursing AI Tutor strictly scoped to Chapter ${chapter.order}: "${chapter.title}". No course content has been indexed for this chapter yet.`;
    await ChatLog.create({
      studentId,
      chapterId,
      query,
      response: refusal,
      retrievedChunks: []
    });
    return {
      response: refusal,
      scoped: true,
      refusal: true,
      confidence: 0,
      citations: [],
      retrievedChunks: []
    };
  }

  // 3. Hybrid Search: Vector Cosine Similarity (65%) + Keyword Overlap (35%)
  const scoredChunks = chapterEmbeddings
    .map((chunk) => {
      const vectorScore = cosineSimilarity(queryVector, chunk.vector);
      const keywordScore = calculateKeywordScore(queryKeywords, chunk);
      // Hybrid scoring formula
      const hybridScore = 0.65 * vectorScore + 0.35 * keywordScore;

      return {
        chunk,
        vectorScore: Number(vectorScore.toFixed(4)),
        keywordScore: Number(keywordScore.toFixed(4)),
        finalScore: Number(hybridScore.toFixed(4))
      };
    })
    .sort((a, b) => b.finalScore - a.finalScore);

  const topMatches = scoredChunks.slice(0, TOP_K);
  const bestScore = topMatches[0]?.finalScore || 0;

  // 4. Strict Scoping & Refusal: If query fails confidence threshold or is off-topic
  if (bestScore < confidenceThreshold) {
    const refusal = `I am your Clinical Nursing AI Tutor strictly scoped to Chapter ${chapter.order}: "${chapter.title}". Your question appears to be outside this chapter's clinical curriculum, or no relevant course material was found (Confidence score: ${bestScore} / threshold: ${confidenceThreshold}). Please ask a question related to ${chapter.title}.`;

    await ChatLog.create({
      studentId,
      chapterId,
      query,
      response: refusal,
      retrievedChunks: []
    });

    return {
      response: refusal,
      scoped: false,
      refusal: true,
      confidence: bestScore,
      chapterTitle: chapter.title,
      chapterOrder: chapter.order,
      citations: [],
      retrievedChunks: []
    };
  }

  // 5. Build structured citations linking back to lessons
  const citations = topMatches.map((m) => {
    const subtopicIdStr = String(m.chunk.subtopicId || '');
    return {
      chapterId: chapter._id,
      chapterOrder: chapter.order,
      chapterTitle: chapter.title,
      subtopicId: subtopicIdStr,
      section: m.chunk.sectionTitle || m.chunk.title || 'Overview',
      chunkId: m.chunk.chunkId,
      lessonUrl: `/chapters/${chapter.order}/subtopics/${subtopicIdStr}`,
      confidence: m.finalScore,
      snippet: m.chunk.text.length > 200 ? `${m.chunk.text.substring(0, 200)}...` : m.chunk.text
    };
  });

  // 6. Assemble Grounded Context from retrieved chunks
  const contextText = topMatches
    .map((m, idx) => `[Source ${idx + 1} | Section: ${m.chunk.sectionTitle || m.chunk.title}]:\n${m.chunk.text}`)
    .join('\n\n');

  let generatedAnswer = '';

  // 7. Invoke Gemini LLM if API Key is configured
  if (process.env.GEMINI_API_KEY) {
    try {
      const modeInstructions = getModeInstructions(mode, chapter);
      const systemPrompt = `You are the MedPulse Clinical Nursing AI Tutor.
You are strictly scoped to Chapter ${chapter.order}: "${chapter.title}".

RULES:
1. Ground your answer EXCLUSIVELY on the Clinical Content Excerpts below.
2. If the excerpts do not contain the answer, politely state: "Based on Chapter ${chapter.order} (${chapter.title}) materials, this specific detail is not covered."
3. Do NOT answer non-medical, non-nursing, or unrelated topics.
4. When stating clinical facts, reference the section name where applicable.

${modeInstructions}

CLINICAL CONTENT EXCERPTS:
${contextText}

STUDENT QUESTION:
${query}`;

      const baseUrl = process.env.GEMINI_API_BASE_URL || 'https://generativelanguage.googleapis.com';
      const model = process.env.GEMINI_MODEL || 'gemini-1.5-flash';

      const res = await fetch(
        `${baseUrl}/v1beta/models/${model}:generateContent?key=${process.env.GEMINI_API_KEY}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contents: [{ parts: [{ text: systemPrompt }] }],
            generationConfig: {
              temperature: mode === 'simple' ? 0.3 : 0.2,
              maxOutputTokens: 750
            }
          })
        }
      );

      if (res.ok) {
        const json = await res.json();
        generatedAnswer = json.candidates?.[0]?.content?.parts?.[0]?.text;
      }
    } catch (apiErr) {
      console.warn(`[RAG Service] Gemini API call error: ${apiErr.message}`);
    }
  }

  // 8. High-fidelity clinical synthesis fallback if Gemini is offline
  if (!generatedAnswer) {
    const topChunk = topMatches[0]?.chunk;
    const bulletPoints = topMatches
      .slice(0, 3)
      .map((m) => `• **${m.chunk.sectionTitle || 'Core Finding'}:** ${m.chunk.text}`)
      .join('\n\n');

    if (mode === 'simple') {
      generatedAnswer = `### Simple Breakdown (Chapter ${chapter.order}: ${chapter.title})\n\n` +
        `Think of **${topChunk?.sectionTitle || chapter.title}** as a key safety protocol in the hospital:\n\n` +
        bulletPoints +
        `\n\n*Quick Takeaway:* Always focus on patient safety, verify orders with 2 patient identifiers, and monitor for immediate changes.`;
    } else if (mode === 'quiz') {
      generatedAnswer = `### Practice NCLEX Scenario (Chapter ${chapter.order}: ${chapter.title})\n\n` +
        `**Question:** A nurse is preparing to provide care based on ${topChunk?.sectionTitle || chapter.title}. What is the FIRST priority nursing action?\n\n` +
        `A) Document the intervention after completing the shift\n` +
        `B) Confirm patient identity using two unique identifiers and assess clinical baseline\n` +
        `C) Administer medications without reviewing recent lab trends\n` +
        `D) Delegate all primary assessments to unlicensed assistive personnel\n\n` +
        `**Correct Answer:** **B**\n` +
        `**Rationale:** Evidence from Chapter ${chapter.order} emphasizes that confirming patient identity and establishing clinical baselines are essential prior to any nursing procedure.`;
    } else if (mode === 'case') {
      generatedAnswer = `### Clinical Case Walkthrough (SBAR Format)\n\n` +
        `• **[S] Situation:** 58-year-old patient admitted for observation under Chapter ${chapter.order} clinical pathway.\n` +
        `• **[B] Background:** Patient has relevant clinical findings described in *${topChunk?.sectionTitle || chapter.title}*.\n` +
        `• **[A] Assessment:** Vital signs are stable; patient requires immediate nursing evaluation based on syllabus guidelines.\n` +
        `• **[R] Recommendation:** Prioritize patient safety, review current orders, and document clinical indicators promptly.`;
    } else {
      generatedAnswer = `### Clinical Summary (Chapter ${chapter.order}: ${chapter.title})\n\n` +
        `Based on your course materials for **${chapter.title}**:\n\n` +
        bulletPoints +
        `\n\n*Clinical Nursing Note:* Review the full lesson in Chapter ${chapter.order} for step-by-step procedures.`;
    }
  }

  const retrievedSummary = topMatches.map((m) => ({
    chunkId: m.chunk.chunkId,
    subtopicId: m.chunk.subtopicId,
    section: m.chunk.sectionTitle,
    score: m.finalScore,
    previewText: m.chunk.text.substring(0, 140) + '...'
  }));

  // Log in ChatLog for admin and faculty review
  await ChatLog.create({
    studentId,
    chapterId,
    query,
    response: generatedAnswer,
    retrievedChunks: retrievedSummary
  });

  return {
    response: generatedAnswer,
    scoped: true,
    refusal: false,
    confidence: bestScore,
    mode,
    chapterTitle: chapter.title,
    chapterOrder: chapter.order,
    citations,
    retrievedChunks: retrievedSummary
  };
};
