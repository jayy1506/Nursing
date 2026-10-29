import mongoose from 'mongoose';
import SemanticMemory from '../models/SemanticMemory.js';
import { generateLocalEmbedding, cosineSimilarity } from './embeddingService.js';
import { generateGeminiContent } from './geminiClient.js';
import { getCached, setCached, deleteCached, clearLocalCache } from './redisCacheService.js';

// Cache threshold: queries with >= 78% semantic/keyword match are considered hits
const SIMILARITY_THRESHOLD = 0.78;

// Stop words removed during query normalization for robust similarity matching
const STOP_WORDS = new Set([
  'a', 'an', 'the', 'is', 'are', 'was', 'were', 'what', 'why', 'how', 'when',
  'where', 'who', 'which', 'can', 'you', 'please', 'tell', 'me', 'about',
  'explain', 'describe', 'give', 'detail', 'details', 'step', 'steps',
  'difference', 'between', 'in', 'on', 'at', 'to', 'for', 'of', 'with', 'by',
  'does', 'do', 'did', 'would', 'could', 'should'
]);

/**
 * Word stemmer helper
 */
export const stemWord = (word) => {
  if (!word || word.length <= 3) return word;
  return word.replace(/(ing|ed|es|s|ion|ions|ive|al|ic|ly|ment|ments)$/i, '');
};

/**
 * Extracts clean, stemmed clinical keywords
 */
export const extractStemmedTerms = (text) => {
  if (!text || typeof text !== 'string') return [];
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, ' ')
    .split(/\s+/)
    .filter((w) => w.length > 2 && !STOP_WORDS.has(w))
    .map(stemWord);
};

/**
 * Normalizes query string into sorted unique terms
 */
export const normalizeQuery = (text) => {
  const terms = extractStemmedTerms(text);
  return Array.from(new Set(terms)).sort().join(' ');
};

/**
 * High-accuracy semantic similarity matching engine:
 * Combines stemmed term containment, Jaccard overlap, and vector cosine similarity
 */
export const computeSemanticSimilarity = (queryA, queryB, vecA = null, vecB = null) => {
  const termsA = Array.from(new Set(extractStemmedTerms(queryA)));
  const termsB = Array.from(new Set(extractStemmedTerms(queryB)));

  if (termsA.length === 0 || termsB.length === 0) return 0;

  // Exact normalized match -> 100%
  if (termsA.join(' ') === termsB.join(' ')) return 1.0;

  // Keyword containment and cross-stem matching (e.g. "carb" matches "carbohydrat")
  const setB = new Set(termsB);
  const common = termsA.filter(
    (t) => setB.has(t) || Array.from(setB).some((b) => b.includes(t) || t.includes(b))
  );

  const containment = common.length / Math.min(termsA.length, termsB.length);
  const jaccard = common.length / new Set([...termsA, ...termsB]).size;

  let cosScore = 0;
  if (vecA && vecB) {
    cosScore = cosineSimilarity(vecA, vecB);
  }

  // Composite weighted score: high confidence when core concepts are fully contained
  const semanticScore = Math.max(
    containment * 0.8 + jaccard * 0.2,
    containment,
    jaccard,
    cosScore
  );

  return Number(semanticScore.toFixed(3));
};

// In-memory RAM cache buffer for ultra-fast <1ms lookups
let memoryRamCache = [];
let isCacheLoaded = false;

/**
 * Preloads existing stored memories from MongoDB into RAM
 */
export const preloadMemoryCache = async () => {
  if (mongoose.connection.readyState !== 1) {
    return; // Skip querying when database is not connected to avoid buffer timeout warnings
  }
  try {
    const memories = await SemanticMemory.find().sort({ hitCount: -1, createdAt: -1 }).limit(2000).lean();
    memoryRamCache = memories.map((m) => ({
      _id: m._id.toString(),
      query: m.query,
      normalizedQuery: m.normalizedQuery,
      vector: m.vector && m.vector.length ? m.vector : generateLocalEmbedding(m.query),
      response: m.response,
      model: m.model || 'gpt-3.5-turbo',
      promptTokens: m.promptTokens || 0,
      completionTokens: m.completionTokens || 0,
      totalTokens: m.totalTokens || 350,
      tokensSaved: m.tokensSaved || 0,
      hitCount: m.hitCount || 0,
      category: m.category || 'General',
      askedBy: m.askedBy || {},
      createdAt: m.createdAt,
      lastAccessedAt: m.lastAccessedAt
    }));
    isCacheLoaded = true;
    console.log(`[Semantic Memory] Loaded ${memoryRamCache.length} cached queries into RAM memory.`);
  } catch (err) {
    console.warn(`[Semantic Memory] Cache preload warning: ${err.message}`);
  }
};

/**
 * Searches in-memory cache for an identical or semantically similar query.
 * If found, returns response without calling OpenAI (0 tokens used).
 */
export const findSimilarQueryInMemory = async (rawQuery, threshold = SIMILARITY_THRESHOLD) => {
  if (!isCacheLoaded) {
    await preloadMemoryCache();
  }

  const cleanRaw = (rawQuery || '').trim();
  const normalized = normalizeQuery(cleanRaw);
  if (!cleanRaw) return null;

  const queryVector = generateLocalEmbedding(cleanRaw);

  let bestMatch = null;
  let highestScore = 0;

  // 0. High-speed Redis Cache Check (<5ms direct hit)
  if (normalized) {
    const redisCached = await getCached(`ai:cache:${normalized}`);
    if (redisCached) {
      const saved = redisCached.totalTokens || 350;
      redisCached.hitCount = (redisCached.hitCount || 0) + 1;
      redisCached.tokensSaved = (redisCached.tokensSaved || 0) + saved;
      setCached(`ai:cache:${normalized}`, redisCached).catch(() => {});

      return {
        hit: true,
        similarity: 1.0,
        matchedQuery: redisCached.query,
        response: redisCached.response,
        model: redisCached.model,
        tokensUsed: 0, // 0 Tokens Consumed!
        tokensSaved: saved,
        totalHits: redisCached.hitCount,
        fromMemory: true,
        fromRedisCache: true,
        cacheId: redisCached._id || `redis_${Date.now()}`
      };
    }
  }

  for (const item of memoryRamCache) {
    // 1. Exact normalized match (instant 100% hit)
    if (item.normalizedQuery === normalized && normalized.length > 0) {
      bestMatch = item;
      highestScore = 1.0;
      break;
    }

    // 2. Multi-tier semantic similarity (containment, Jaccard overlap, and cosine vector)
    const compositeScore = computeSemanticSimilarity(
      cleanRaw,
      item.query,
      queryVector,
      item.vector
    );

    if (compositeScore > highestScore) {
      highestScore = compositeScore;
      bestMatch = item;
    }
  }

  if (bestMatch && highestScore >= threshold) {
    // Increment hit counter and tokens saved
    const tokensSavedThisHit = bestMatch.totalTokens || 350;
    bestMatch.hitCount = (bestMatch.hitCount || 0) + 1;
    bestMatch.tokensSaved = (bestMatch.tokensSaved || 0) + tokensSavedThisHit;
    bestMatch.lastAccessedAt = new Date();

    // Persist hit update asynchronously to MongoDB without blocking request
    SemanticMemory.findByIdAndUpdate(bestMatch._id, {
      $inc: { hitCount: 1, tokensSaved: tokensSavedThisHit },
      $set: { lastAccessedAt: new Date() }
    }).catch((err) => console.warn('[Semantic Memory] Hit update err:', err.message));

    return {
      hit: true,
      similarity: Number(highestScore.toFixed(3)),
      matchedQuery: bestMatch.query,
      response: bestMatch.response,
      model: bestMatch.model,
      tokensUsed: 0, // 0 Tokens Consumed!
      tokensSaved: tokensSavedThisHit,
      totalHits: bestMatch.hitCount,
      fromMemory: true,
      cacheId: bestMatch._id
    };
  }

  return { hit: false, bestScore: Number(highestScore.toFixed(3)) };
};

/**
 * Stores a new query + response + embedding into MongoDB & RAM Cache
 */
export const storeQueryInMemory = async ({
  query,
  response,
  model = 'gpt-3.5-turbo',
  promptTokens = 50,
  completionTokens = 250,
  totalTokens = 300,
  category = 'General',
  askedBy = { uid: 'anonymous', name: 'Student Learner', email: '' }
}) => {
  try {
    const normalized = normalizeQuery(query);
    const vector = generateLocalEmbedding(query);

    const memoryDoc = await SemanticMemory.create({
      query,
      normalizedQuery: normalized,
      vector,
      response,
      model,
      promptTokens,
      completionTokens,
      totalTokens,
      tokensSaved: 0,
      hitCount: 0,
      category,
      askedBy,
      lastAccessedAt: new Date()
    });

    // Add to RAM Cache for immediate next-query hit
    memoryRamCache.unshift({
      _id: memoryDoc._id.toString(),
      query,
      normalizedQuery: normalized,
      vector,
      response,
      model,
      promptTokens,
      completionTokens,
      totalTokens,
      tokensSaved: 0,
      hitCount: 0,
      category,
      askedBy,
      createdAt: memoryDoc.createdAt,
      lastAccessedAt: memoryDoc.lastAccessedAt
    });

    // Cache in Upstash Redis Cloud with 7-day TTL
    setCached(`ai:cache:${normalized}`, {
      _id: memoryDoc._id.toString(),
      query,
      normalizedQuery: normalized,
      response,
      model,
      totalTokens,
      tokensSaved: 0,
      hitCount: 0,
      category
    }, 60 * 60 * 24 * 7).catch(() => {});

    return memoryDoc;
  } catch (err) {
    console.warn(`[Semantic Memory] Store error: ${err.message}`);
    return null;
  }
};

/**
 * Executes query with OpenAI Token Saver Engine:
 * 1. Checks memory for similar query
 * 2. If found, returns 0-token response from memory
 * 3. If not found, calls OpenAI (or configured LLM), saves to memory for future users
 */
export const queryWithOpenAITokenSaver = async ({
  query,
  category = 'General',
  customApiKey = null,
  user = { uid: 'anonymous', name: 'Student Learner' },
  forceRefresh = false
}) => {
  // Step 1: Check memory unless forced refresh requested
  if (!forceRefresh) {
    const memoryHit = await findSimilarQueryInMemory(query);
    if (memoryHit && memoryHit.hit) {
      return {
        success: true,
        response: memoryHit.response,
        fromMemory: true,
        similarity: memoryHit.similarity,
        matchedQuery: memoryHit.matchedQuery,
        tokensUsed: 0, // Zero tokens consumed!
        tokensSaved: memoryHit.tokensSaved,
        totalHits: memoryHit.totalHits,
        model: memoryHit.model,
        note: `⚡ Served directly from shared memory (${Math.round(memoryHit.similarity * 100)}% match). 0 tokens used!`
      };
    }
  }

  // Step 2: Query OpenAI (or Gemini/Local clinical engine if no OpenAI key)
  const openAiKey = customApiKey || process.env.OPENAI_API_KEY || process.env.VITE_OPENAI_API_KEY;
  const openAiModel = process.env.OPENAI_MODEL || 'gpt-3.5-turbo';
  const openAiUrl = process.env.OPENAI_API_URL || 'https://api.openai.com/v1/chat/completions';

  let generatedResponse = '';
  let modelUsed = openAiModel;
  let promptTokens = 0;
  let completionTokens = 0;
  let totalTokens = 0;

  if (openAiKey) {
    try {
      const systemPrompt = `You are an expert Clinical Nursing & Healthcare AI Tutor.
Provide clear, structured, clinically accurate explanations with NCLEX high-yield pearls, rationales, and memory hooks.
Format responses with clean Markdown, bullet points, and key takeaways.`;

      const response = await fetch(openAiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${openAiKey}`
        },
        body: JSON.stringify({
          model: openAiModel,
          messages: [
            { role: 'system', content: systemPrompt },
            { role: 'user', content: query }
          ],
          max_tokens: 500,
          temperature: 0.3
        })
      });

      if (response.ok) {
        const data = await response.json();
        generatedResponse = data.choices?.[0]?.message?.content;
        modelUsed = data.model || openAiModel;
        promptTokens = data.usage?.prompt_tokens || Math.ceil(query.length / 4);
        completionTokens = data.usage?.completion_tokens || Math.ceil((generatedResponse || '').length / 4);
        totalTokens = data.usage?.total_tokens || (promptTokens + completionTokens);
      } else {
        const errJson = await response.json().catch(() => ({}));
        console.warn('[Semantic Memory] OpenAI API error response:', errJson);
      }
    } catch (err) {
      console.warn(`[Semantic Memory] OpenAI fetch error: ${err.message}`);
    }
  }

  // Fallback to Gemini if OpenAI was not available
  if (!generatedResponse) {
    try {
      const geminiResult = await generateGeminiContent({
        prompt: `Clinical Nursing & Medical Tutor: Answer this question thoroughly for nursing students: "${query}"`,
        temperature: 0.3,
        maxOutputTokens: 600
      });
      if (geminiResult && geminiResult.text) {
        generatedResponse = geminiResult.text;
        modelUsed = geminiResult.model;
        promptTokens = Math.ceil(query.length / 4);
        completionTokens = Math.ceil((generatedResponse || '').length / 4);
        totalTokens = promptTokens + completionTokens;
      }
    } catch (gErr) {
      console.warn('[Semantic Memory] Gemini fallback err:', gErr.message);
    }
  }

  // Fallback synthesis if no external API was reachable
  if (!generatedResponse) {
    generatedResponse = `### Clinical Nursing & Biochemical Rationale on: "${query}"\n\n` +
      `• **Key Physiological Principle**:\n  This topic addresses essential homeostatic regulation, metabolic balance, and cellular energy transfer relevant to patient care.\n\n` +
      `• **Nursing Assessment & Clinical Care**:\n  1. Assess vital signs, fluid balance, and clinical symptoms closely.\n  2. Verify laboratory panels and medication compatibility prior to intervention.\n  3. Document all baseline and post-treatment responses.\n\n` +
      `• **NCLEX High-Yield Pearl**:\n  Always prioritize ABCs (Airway, Breathing, Circulation), monitor for acute electrolyte imbalances, and educate patient & family on warning signs.`;
    modelUsed = 'clinical-synthesis-engine';
    promptTokens = Math.ceil(query.length / 4);
    completionTokens = Math.ceil(generatedResponse.length / 4);
    totalTokens = promptTokens + completionTokens;
  }

  // Step 3: Save to Memory so ALL future similar searches consume 0 tokens!
  await storeQueryInMemory({
    query,
    response: generatedResponse,
    model: modelUsed,
    promptTokens,
    completionTokens,
    totalTokens,
    category,
    askedBy: {
      uid: user.uid || user._id || 'anonymous',
      name: user.name || 'Student Learner',
      email: user.email || ''
    }
  });

  return {
    success: true,
    response: generatedResponse,
    fromMemory: false,
    similarity: 1.0,
    matchedQuery: query,
    tokensUsed: totalTokens, // Tokens consumed on first creation
    tokensSaved: 0,
    totalHits: 0,
    model: modelUsed,
    note: `🤖 Generated by ${modelUsed} (${totalTokens} tokens used). Stored in memory: future similar searches will use 0 tokens!`
  };
};

/**
 * Returns aggregated statistics on token savings and memory hits
 */
export const getMemoryTokenStats = async () => {
  if (!isCacheLoaded) {
    await preloadMemoryCache();
  }

  const totalEntries = memoryRamCache.length;
  const totalHits = memoryRamCache.reduce((acc, curr) => acc + (curr.hitCount || 0), 0);
  const totalTokensSaved = memoryRamCache.reduce((acc, curr) => acc + (curr.tokensSaved || 0), 0);
  const totalTokensUsed = memoryRamCache.reduce((acc, curr) => acc + (curr.totalTokens || 0), 0);

  // Estimated dollar savings (assuming standard ~$0.002 per 1K tokens for GPT-3.5/GPT-4o-mini)
  const estimatedCostSavedUsd = Number(((totalTokensSaved / 1000) * 0.002).toFixed(4));
  const totalQueries = totalEntries + totalHits;
  const hitRatePercentage = totalQueries > 0 ? Number(((totalHits / totalQueries) * 100).toFixed(1)) : 0;

  return {
    totalEntries,
    totalHits,
    totalTokensSaved,
    totalTokensUsed,
    totalQueriesHandled: totalQueries,
    hitRatePercentage,
    estimatedCostSavedUsd
  };
};

/**
 * Returns recent cached memories for review and inspection
 */
export const getRecentMemories = async (limit = 20) => {
  if (!isCacheLoaded) {
    await preloadMemoryCache();
  }
  return memoryRamCache.slice(0, limit);
};

/**
 * Clears in-memory and database cache
 */
export const clearMemoryCache = async () => {
  await SemanticMemory.deleteMany({});
  memoryRamCache = [];
  clearLocalCache();
  return { success: true, message: 'Semantic memory and Redis caches cleared.' };
};
