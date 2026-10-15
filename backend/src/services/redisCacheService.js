import { redis } from '../config/redis.js';

// Local fast in-memory L1 cache (microsecond lookup)
const l1Cache = new Map();
let isReadOnlyWarned = false;

/**
 * Get value from Upstash Redis cache (with L1 memory fallback)
 */
export const getCached = async (key) => {
  // 1. Check L1 local cache first
  const localItem = l1Cache.get(key);
  if (localItem) {
    if (Date.now() < localItem.expiresAt) {
      return localItem.value;
    }
    l1Cache.delete(key);
  }

  // 2. Check Upstash Redis
  try {
    const redisVal = await redis.get(key);
    if (redisVal) {
      // Parse if stringified JSON
      let parsed = redisVal;
      if (typeof redisVal === 'string' && (redisVal.startsWith('{') || redisVal.startsWith('['))) {
        try {
          parsed = JSON.parse(redisVal);
        } catch {}
      }
      // Populate L1 cache for 5 minutes
      l1Cache.set(key, { value: parsed, expiresAt: Date.now() + 5 * 60 * 1000 });
      return parsed;
    }
  } catch (err) {
    // console.warn(`[Redis Cache] Get warning for key "${key}":`, err.message);
  }

  return null;
};

/**
 * Set value in Upstash Redis cache (with L1 memory fallback)
 * @param {string} key - Cache key
 * @param {any} value - Cache payload
 * @param {number} ttlSeconds - Expiration time in seconds (default: 7 days)
 */
export const setCached = async (key, value, ttlSeconds = 60 * 60 * 24 * 7) => {
  // 1. Always store in fast L1 cache
  l1Cache.set(key, {
    value,
    expiresAt: Date.now() + ttlSeconds * 1000
  });

  // 2. Store in Upstash Redis Cloud
  try {
    const serialized = typeof value === 'object' ? JSON.stringify(value) : value;
    await redis.set(key, serialized, { ex: ttlSeconds });
  } catch (err) {
    if (err.message && err.message.includes('NOPERM') && !isReadOnlyWarned) {
      isReadOnlyWarned = true;
      console.log(
        '[Upstash Redis Cache] Note: The configured UPSTASH_REDIS_REST_TOKEN has read permissions. Cached items are served via high-speed memory cache. To enable cloud write persistence, supply your Primary (Read-Write) Upstash token.'
      );
    }
  }
};

/**
 * Delete a key from cache
 */
export const deleteCached = async (key) => {
  l1Cache.delete(key);
  try {
    await redis.del(key);
  } catch {}
};

/**
 * Clear all cached items in L1 memory
 */
export const clearLocalCache = () => {
  l1Cache.clear();
};

export default {
  getCached,
  setCached,
  deleteCached,
  clearLocalCache
};
