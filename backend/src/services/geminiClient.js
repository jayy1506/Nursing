/**
 * Multi-Key Gemini API Client with Load Balancing & Automatic Failover
 * 
 * Supports multiple API keys for high availability, rotating requests
 * and falling back gracefully if a key encounters rate limits (HTTP 429)
 * or temporary service unavailability (HTTP 503).
 */

let currentKeyIndex = 0;

/**
 * Retrieve all configured Gemini API keys from environment variables.
 * Supports comma, newline, or whitespace separated keys.
 */
export const getGeminiKeys = () => {
  const rawKeys = [
    process.env.GEMINI_API_KEYS,
    process.env.GEMINI_API_KEY
  ].filter(Boolean).join(',');

  const keys = rawKeys
    .split(/[\s,]+/)
    .map((k) => k.trim())
    .filter((k) => k.length > 5 && k !== 'your_gemini_api_key_here');

  // Return unique keys preserving order
  return Array.from(new Set(keys));
};

/**
 * Generate text content using Gemini with automatic key rotation and model fallback.
 * 
 * @param {Object} options
 * @param {string} options.prompt - Prompt or system instruction + user query
 * @param {number} [options.temperature=0.2] - Sampling temperature
 * @param {number} [options.maxOutputTokens=750] - Token limit
 * @returns {Promise<{ text: string, model: string, keyUsed: string } | null>}
 */
export const generateGeminiContent = async ({
  prompt,
  temperature = 0.2,
  maxOutputTokens = 750
}) => {
  const keys = getGeminiKeys();
  if (keys.length === 0) {
    return null;
  }

  const baseUrl = process.env.GEMINI_API_BASE_URL || 'https://generativelanguage.googleapis.com';
  const preferredModel = process.env.GEMINI_MODEL || 'gemini-3.5-flash';
  const fallbackModels = [preferredModel, 'gemini-3.8-flash', 'gemini-flash-latest'];
  const uniqueModels = Array.from(new Set(fallbackModels));

  // Try each key starting from the next round-robin index
  const keyCount = keys.length;
  for (let attempt = 0; attempt < keyCount; attempt++) {
    const key = keys[(currentKeyIndex++) % keyCount];

    for (const model of uniqueModels) {
      try {
        const url = `${baseUrl}/v1beta/models/${model}:generateContent?key=${key}`;
        const response = await fetch(url, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contents: [{ parts: [{ text: prompt }] }],
            generationConfig: {
              temperature,
              maxOutputTokens
            }
          }),
          signal: AbortSignal.timeout(12000)
        });

        if (response.ok) {
          const data = await response.json();
          const text = data.candidates?.[0]?.content?.parts?.[0]?.text;
          if (text) {
            return {
              text: text.trim(),
              model,
              keyUsed: `${key.slice(0, 14)}...`
            };
          }
        }

        const errText = await response.text();
        console.warn(`[GeminiClient] Key ${key.slice(0, 12)}... with model ${model} HTTP ${response.status}: ${errText.slice(0, 100)}`);

        // If not found or unavailable, try next model before switching keys
        if (response.status === 404) {
          continue;
        }

        // If rate limited or quota exceeded (429) or server error (503/500), try next key immediately
        if (response.status === 429 || response.status >= 500) {
          break;
        }
      } catch (err) {
        console.warn(`[GeminiClient] Fetch error on key ${key.slice(0, 12)}... (${err.message}). Trying fallback.`);
        break; // Try next key
      }
    }
  }

  return null;
};

/**
 * Generate embedding vector using Gemini with key rotation and fallback models.
 * 
 * @param {string} text - Input text to embed
 * @returns {Promise<number[] | null>}
 */
export const generateGeminiEmbedding = async (text) => {
  const keys = getGeminiKeys();
  if (keys.length === 0) {
    return null;
  }

  const baseUrl = process.env.GEMINI_API_BASE_URL || 'https://generativelanguage.googleapis.com';
  const preferredModel = process.env.GEMINI_EMBEDDING_MODEL || 'gemini-embedding-001';
  const models = Array.from(new Set([preferredModel, 'gemini-embedding-2', 'gemini-embedding-001']));

  const keyCount = keys.length;
  for (let attempt = 0; attempt < keyCount; attempt++) {
    const key = keys[(currentKeyIndex++) % keyCount];

    for (const model of models) {
      try {
        const url = `${baseUrl}/v1beta/models/${model}:embedContent?key=${key}`;
        const response = await fetch(url, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            content: { parts: [{ text: text.substring(0, 2048) }] }
          }),
          signal: AbortSignal.timeout(10000)
        });

        if (response.ok) {
          const data = await response.json();
          if (data.embedding?.values && Array.isArray(data.embedding.values)) {
            return data.embedding.values;
          }
        }

        if (response.status === 429 || response.status >= 500) {
          break; // Try next key
        }
      } catch (err) {
        console.warn(`[GeminiClient] Embedding error on key ${key.slice(0, 12)}... (${err.message})`);
        break; // Try next key
      }
    }
  }

  return null;
};
