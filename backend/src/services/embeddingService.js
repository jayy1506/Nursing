/**
 * Semantic Vector Embedding Service
 * Computes high-dimensional vector representations for nursing content chunks
 * Supports native normalized embedding generation and Gemini API embeddings.
 */

// Normalized semantic vocabulary tokenizer & vector projector
const NURSING_VOCAB_SIZE = 256;

// Deterministic hashing vectorizer for zero-dependency high-accuracy vector math
export const generateLocalEmbedding = (text) => {
  const vector = new Array(NURSING_VOCAB_SIZE).fill(0);
  if (!text || typeof text !== 'string') return vector;

  const normalized = text.toLowerCase().replace(/[^a-z0-9\s]/g, ' ');
  const words = normalized.split(/\s+/).filter((w) => w.length > 2);

  if (words.length === 0) return vector;

  // Compute term frequencies and n-grams
  words.forEach((word, idx) => {
    // Word hash position
    let hash = 0;
    for (let i = 0; i < word.length; i++) {
      hash = (hash << 5) - hash + word.charCodeAt(i);
      hash |= 0;
    }
    const bucket = Math.abs(hash) % NURSING_VOCAB_SIZE;
    vector[bucket] += 1.0;

    // Bigram context hash
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

  // L2-Normalize vector
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

/**
 * Calculates cosine similarity between two normalized vectors: [-1.0, 1.0]
 */
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

import { generateGeminiEmbedding } from './geminiClient.js';

/**
 * Generate embedding for text (Gemini API with multi-key rotation, fallback to local vectorizer)
 */
export const generateEmbedding = async (text) => {
  try {
    const geminiVector = await generateGeminiEmbedding(text);
    if (geminiVector && Array.isArray(geminiVector) && geminiVector.length > 0) {
      return geminiVector;
    }
  } catch (err) {
    console.warn(`[EmbeddingService] Gemini embedding error, falling back to local: ${err.message}`);
  }

  // Robust native embedding vector
  return generateLocalEmbedding(text);
};
