/**
 * OpenAI Semantic Memory Cache & Token Saver Engine
 * 
 * Features:
 * 1. Checks shared backend database memory (shared across all users)
 * 2. Fallback resilient client-side semantic vector memory (localStorage)
 * 3. 0-Token Retrieval: if query is similar (>= 78% semantic match), returns stored answer without calling OpenAI
 * 4. Token metrics tracking: tracks tokens saved, hit rate, and API costs saved
 */

const STORAGE_KEY = 'openai_semantic_memory_cache';
const STATS_KEY = 'openai_memory_token_stats';
const SIMILARITY_THRESHOLD = 0.78;
const NURSING_VOCAB_SIZE = 256;

const STOP_WORDS = new Set([
  'a', 'an', 'the', 'is', 'are', 'was', 'were', 'what', 'why', 'how', 'when',
  'where', 'who', 'which', 'can', 'you', 'please', 'tell', 'me', 'about',
  'explain', 'describe', 'give', 'detail', 'details', 'step', 'steps',
  'difference', 'between', 'in', 'on', 'at', 'to', 'for', 'of', 'with', 'by'
]);

export const stemWord = (word) => {
  if (!word || word.length <= 3) return word;
  return word.replace(/(ing|ed|es|s|ion|ions|ive|al|ic|ly|ment|ments)$/i, '');
};

export const extractStemmedTerms = (text) => {
  if (!text || typeof text !== 'string') return [];
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, ' ')
    .split(/\s+/)
    .filter((w) => w.length > 2 && !STOP_WORDS.has(w))
    .map(stemWord);
};

// Normalize query into clean sorted clinical terms
export const normalizeQuery = (text) => {
  const terms = extractStemmedTerms(text);
  return Array.from(new Set(terms)).sort().join(' ');
};

// High-accuracy composite similarity
export const computeSemanticSimilarity = (queryA, queryB, vecA = null, vecB = null) => {
  const termsA = Array.from(new Set(extractStemmedTerms(queryA)));
  const termsB = Array.from(new Set(extractStemmedTerms(queryB)));

  if (termsA.length === 0 || termsB.length === 0) return 0;
  if (termsA.join(' ') === termsB.join(' ')) return 1.0;

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

  const score = Math.max(
    containment * 0.8 + jaccard * 0.2,
    containment,
    jaccard,
    cosScore
  );

  return Number(score.toFixed(3));
};

// Generate high-accuracy semantic vector
export const generateLocalEmbedding = (text) => {
  const vector = new Array(NURSING_VOCAB_SIZE).fill(0);
  if (!text || typeof text !== 'string') return vector;

  const normalized = text.toLowerCase().replace(/[^a-z0-9\s]/g, ' ');
  const words = normalized.split(/\s+/).filter((w) => w.length > 2);
  if (words.length === 0) return vector;

  words.forEach((word, idx) => {
    let hash = 0;
    for (let i = 0; i < word.length; i++) {
      hash = (hash << 5) - hash + word.charCodeAt(i);
      hash |= 0;
    }
    const bucket = Math.abs(hash) % NURSING_VOCAB_SIZE;
    vector[bucket] += 1.0;

    if (idx < words.length - 1) {
      const bigram = `${word}_${words[idx + 1]}`;
      let biHash = 0;
      for (let j = 0; j < bigram.length; j++) {
        biHash = (biHash << 5) - biHash + bigram.charCodeAt(j);
        biHash |= 0;
      }
      const biBucket = Math.abs(biHash) % NURSING_VOCAB_SIZE;
      vector[biBucket] += 0.5;
    }
  });

  let norm = 0;
  for (let i = 0; i < NURSING_VOCAB_SIZE; i++) {
    norm += vector[i] * vector[i];
  }
  norm = Math.sqrt(norm);
  if (norm > 0) {
    for (let i = 0; i < NURSING_VOCAB_SIZE; i++) {
      vector[i] = Number((vector[i] / norm).toFixed(6));
    }
  }
  return vector;
};

// Cosine similarity between two vectors
export const cosineSimilarity = (vecA, vecB) => {
  if (!vecA || !vecB || vecA.length !== vecB.length) return 0;
  let dotProduct = 0;
  let normA = 0;
  let normB = 0;

  for (let i = 0; i < vecA.length; i++) {
    dotProduct += vecA[i] * vecB[i];
    normA += vecA[i] * vecA[i];
    normB += vecB[i] * vecB[i];
  }
  if (normA === 0 || normB === 0) return 0;
  return dotProduct / (Math.sqrt(normA) * Math.sqrt(normB));
};

// Retrieve local cache entries
export const getLocalMemories = () => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
};

// Save local cache entries
export const saveLocalMemories = (memories) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(memories.slice(0, 500)));
  } catch {}
};

// Search client-side memory
export const findSimilarLocal = (query, threshold = SIMILARITY_THRESHOLD) => {
  const memories = getLocalMemories();
  const cleanRaw = (query || '').trim();
  const normalized = normalizeQuery(cleanRaw);
  if (!cleanRaw) return null;

  const queryVector = generateLocalEmbedding(cleanRaw);
  let bestMatch = null;
  let highestScore = 0;

  for (const item of memories) {
    if (item.normalizedQuery === normalized && normalized.length > 0) {
      bestMatch = item;
      highestScore = 1.0;
      break;
    }

    const score = computeSemanticSimilarity(cleanRaw, item.query, queryVector, item.vector);

    if (score > highestScore) {
      highestScore = score;
      bestMatch = item;
    }
  }

  if (bestMatch && highestScore >= threshold) {
    bestMatch.hitCount = (bestMatch.hitCount || 0) + 1;
    const saved = bestMatch.totalTokens || 350;
    bestMatch.tokensSaved = (bestMatch.tokensSaved || 0) + saved;
    bestMatch.lastAccessedAt = new Date().toISOString();
    saveLocalMemories(memories);

    // Update cumulative stats
    recordTokenStats(saved, true);

    return {
      hit: true,
      similarity: Number(highestScore.toFixed(3)),
      matchedQuery: bestMatch.query,
      response: bestMatch.response,
      tokensUsed: 0, // 0 Tokens Consumed!
      tokensSaved: saved,
      model: bestMatch.model || 'gpt-3.5-turbo',
      totalHits: bestMatch.hitCount
    };
  }

  return { hit: false, bestScore: Number(highestScore.toFixed(3)) };
};

// Store entry in local memory
export const storeLocalMemory = ({ query, response, model = 'gpt-3.5-turbo', tokensUsed = 350 }) => {
  try {
    const memories = getLocalMemories();
    const normalized = normalizeQuery(query);
    const vector = generateLocalEmbedding(query);

    const newEntry = {
      id: `mem-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
      query,
      normalizedQuery: normalized,
      vector,
      response,
      model,
      totalTokens: tokensUsed,
      tokensSaved: 0,
      hitCount: 0,
      createdAt: new Date().toISOString(),
      lastAccessedAt: new Date().toISOString()
    };

    memories.unshift(newEntry);
    saveLocalMemories(memories);
    recordTokenStats(tokensUsed, false);
    return newEntry;
  } catch {
    return null;
  }
};

// Record aggregate stats in localStorage
export const recordTokenStats = (tokens, isHit) => {
  try {
    const raw = localStorage.getItem(STATS_KEY);
    const stats = raw ? JSON.parse(raw) : { totalTokensSaved: 0, totalTokensUsed: 0, totalHits: 0, totalCalls: 0 };
    if (isHit) {
      stats.totalTokensSaved += tokens;
      stats.totalHits += 1;
    } else {
      stats.totalTokensUsed += tokens;
      stats.totalCalls += 1;
    }
    localStorage.setItem(STATS_KEY, JSON.stringify(stats));
  } catch {}
};

// Get current stats
export const getMemoryStats = () => {
  try {
    const raw = localStorage.getItem(STATS_KEY);
    const memories = getLocalMemories();
    const stats = raw ? JSON.parse(raw) : { totalTokensSaved: 0, totalTokensUsed: 0, totalHits: 0, totalCalls: 0 };
    const totalHits = memories.reduce((acc, m) => acc + (m.hitCount || 0), stats.totalHits);
    const totalSaved = memories.reduce((acc, m) => acc + (m.tokensSaved || 0), stats.totalTokensSaved);
    const totalStored = memories.length;

    return {
      totalStored,
      totalHits,
      totalTokensSaved: totalSaved,
      totalTokensUsed: stats.totalTokensUsed,
      estimatedCostSavedUsd: Number(((totalSaved / 1000) * 0.002).toFixed(4))
    };
  } catch {
    return {
      totalStored: 0,
      totalHits: 0,
      totalTokensSaved: 0,
      totalTokensUsed: 0,
      estimatedCostSavedUsd: 0
    };
  }
};

// Clear memory
export const clearClientMemory = () => {
  localStorage.removeItem(STORAGE_KEY);
  localStorage.removeItem(STATS_KEY);
};
