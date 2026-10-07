import { ContentEmbedding } from '../models/ContentEmbedding.js';
import { Chapter } from '../models/Chapter.js';
import { Subtopic } from '../models/Subtopic.js';
import { ChatLog } from '../models/ChatLog.js';
import { generateEmbedding, cosineSimilarity } from './embeddingService.js';

const SIMILARITY_THRESHOLD = 0.12; // Minimum semantic match threshold for chapter scope
const TOP_K = 4;

/**
 * Ingests and generates embeddings for a subtopic
 */
export const indexSubtopicContent = async (chapterId, subtopicId, title, contentBody) => {
  if (!contentBody) return;

  // Split into manageable paragraphs/chunks (approx 200-400 words)
  const paragraphs = contentBody
    .split(/\n\n+/)
    .map((p) => p.trim())
    .filter((p) => p.length > 50);

  // Remove previous embeddings for this subtopic to maintain freshness
  await ContentEmbedding.deleteMany({ subtopicId });

  for (let i = 0; i < paragraphs.length; i++) {
    const chunkText = `${title}: ${paragraphs[i]}`;
    const vector = await generateEmbedding(chunkText);
    const chunkId = `emb_${subtopicId}_${i}`;

    await ContentEmbedding.create({
      chunkId,
      chapterId,
      subtopicId,
      title: `${title} (Part ${i + 1})`,
      text: paragraphs[i],
      vector,
      tokens: chunkText.split(/\s+/).length
    });
  }
};

/**
 * Perform chapter-scoped vector search & generate clinical answer
 */
export const queryChapterRAG = async ({ studentId, chapterId, query }) => {
  if (!query || !chapterId) {
    throw new Error('Both query and chapterId are required.');
  }

  const chapter = await Chapter.findById(chapterId);
  if (!chapter) {
    throw new Error('Chapter not found.');
  }

  // 1. Generate query embedding vector
  const queryVector = await generateEmbedding(query);

  // 2. Query MongoDB strictly filtered by chapterId (Enforce scope at data layer)
  const chapterEmbeddings = await ContentEmbedding.find({ chapterId }).lean();

  if (chapterEmbeddings.length === 0) {
    const refusal = `I am strictly scoped to Chapter ${chapter.order}: "${chapter.title}". No reference content has been indexed for this chapter yet.`;
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
      retrievedChunks: []
    };
  }

  // 3. Compute cosine similarity across candidate vectors in this chapter
  const scoredChunks = chapterEmbeddings
    .map((chunk) => ({
      chunk,
      score: cosineSimilarity(queryVector, chunk.vector)
    }))
    .sort((a, b) => b.score - a.score);

  const topMatches = scoredChunks.slice(0, TOP_K);
  const bestScore = topMatches[0]?.score || 0;

  // Scope Enforcement Layer: If query is completely unrelated to the chapter's content
  if (bestScore < SIMILARITY_THRESHOLD) {
    const refusal = `I am your Clinical Nursing AI Tutor for Chapter ${chapter.order}: "${chapter.title}". I can only answer questions directly related to this chapter's nursing content and clinical procedures. Your question appears to be outside this chapter's scope. Please ask a question related to ${chapter.title}.`;

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
      retrievedChunks: []
    };
  }

  // 4. Construct context from top retrieved chunks
  const contextText = topMatches
    .map((m, idx) => `[Excerpt ${idx + 1} - ${m.chunk.title}]:\n${m.chunk.text}`)
    .join('\n\n');

  let generatedAnswer = '';

  // 5. Call LLM (Gemini if key present, or high-fidelity clinical synthesis)
  if (process.env.GEMINI_API_KEY) {
    try {
      const systemPrompt = `You are a professional Clinical Nursing AI Tutor for Nursing Students.
You are strictly scoped to Chapter ${chapter.order}: "${chapter.title}".
RULES:
1. ONLY answer the student's question using facts from the provided Clinical Content Excerpts below.
2. If the answer cannot be found or deduced directly from the excerpts, state clearly: "Based on Chapter ${chapter.order} (${chapter.title}) materials, this topic is not covered in this chapter's syllabus."
3. Do NOT answer general trivia, programming, unrelated medical specializations, or non-nursing questions.
4. Keep answers clear, evidence-based, clinically accurate, and formatted with bullet points where helpful.

CLINICAL CONTENT EXCERPTS:
${contextText}

STUDENT QUESTION:
${query}`;

      const res = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${process.env.GEMINI_API_KEY}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contents: [{ parts: [{ text: systemPrompt }] }],
            generationConfig: {
              temperature: 0.2,
              maxOutputTokens: 600
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

  // Fallback intelligent clinical answer synthesis based on top matching excerpts
  if (!generatedAnswer) {
    const relevantExcerpts = topMatches
      .filter((m) => m.score >= SIMILARITY_THRESHOLD)
      .map((m) => m.chunk.text);

    generatedAnswer = `**Clinical Summary (Chapter ${chapter.order}: ${chapter.title})**\n\n` +
      `According to your course materials on **${chapter.title}**:\n\n` +
      relevantExcerpts.map((text, i) => `• ${text}`).join('\n\n') +
      `\n\n*Key Nursing Note:* Always verify doctor's orders, validate patient identity using 2 identifiers, and document all clinical observations promptly.`;
  }

  const retrievedSummary = topMatches.map((m) => ({
    chunkId: m.chunk.chunkId,
    subtopicId: m.chunk.subtopicId,
    score: Number(m.score.toFixed(4)),
    previewText: m.chunk.text.substring(0, 120) + '...'
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
    chapterTitle: chapter.title,
    chapterOrder: chapter.order,
    retrievedChunks: retrievedSummary
  };
};
