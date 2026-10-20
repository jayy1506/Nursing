import { Ratelimit } from '@upstash/ratelimit';
import { redis } from '../config/redis.js';

// In-memory sliding window and daily quota store fallback
const memoryRateLimitStore = new Map();
const memoryDailyQuotaStore = new Map();

/**
 * In-memory sliding window rate limiter
 */
const memoryRateLimit = (identifier, limit = 15, windowMs = 60000) => {
  const now = Date.now();
  let record = memoryRateLimitStore.get(identifier);

  if (!record || now > record.resetTime) {
    record = { count: 1, resetTime: now + windowMs };
    memoryRateLimitStore.set(identifier, record);
    return {
      success: true,
      limit,
      remaining: limit - 1,
      reset: record.resetTime
    };
  }

  record.count += 1;
  const remaining = Math.max(0, limit - record.count);
  const success = record.count <= limit;

  return {
    success,
    limit,
    remaining,
    reset: record.resetTime
  };
};

/**
 * In-memory per-user daily quota limiter
 */
const memoryDailyQuota = (userId, dailyLimit = 50) => {
  const todayKey = new Date().toISOString().slice(0, 10);
  const recordKey = `daily:${userId}:${todayKey}`;

  const midnightTonight = new Date();
  midnightTonight.setUTCHours(23, 59, 59, 999);
  const resetMs = midnightTonight.getTime();

  let count = memoryDailyQuotaStore.get(recordKey) || 0;
  count += 1;
  memoryDailyQuotaStore.set(recordKey, count);

  const remaining = Math.max(0, dailyLimit - count);
  const success = count <= dailyLimit;

  return {
    success,
    limit: dailyLimit,
    remaining,
    reset: resetMs,
    currentUsage: count
  };
};

// Periodic garbage collection for memory stores (unref'd to prevent keeping event loop open)
const cleanupInterval = setInterval(() => {
  const now = Date.now();
  for (const [key, value] of memoryRateLimitStore.entries()) {
    if (now > value.resetTime) {
      memoryRateLimitStore.delete(key);
    }
  }
  const todayKey = new Date().toISOString().slice(0, 10);
  for (const key of memoryDailyQuotaStore.keys()) {
    if (!key.includes(todayKey)) {
      memoryDailyQuotaStore.delete(key);
    }
  }
}, 60000);

if (cleanupInterval && typeof cleanupInterval.unref === 'function') {
  cleanupInterval.unref();
}

// Initialize Upstash Redis Ratelimiters if redis client is available
let upstashAiLimiter = null;
let upstashGeneralLimiter = null;

try {
  if (redis) {
    upstashAiLimiter = new Ratelimit({
      redis,
      limiter: Ratelimit.slidingWindow(15, '60 s'),
      analytics: true,
      prefix: 'ratelimit:ai'
    });

    upstashGeneralLimiter = new Ratelimit({
      redis,
      limiter: Ratelimit.slidingWindow(100, '60 s'),
      analytics: true,
      prefix: 'ratelimit:general'
    });
  }
} catch (err) {
  // Upstash fallback
}

/**
 * Creates an Express rate limiting middleware with Upstash Redis + graceful in-memory fallback
 */
export const createRateLimiter = (options = {}) => {
  const {
    limit = 15,
    windowSec = 60,
    name = 'ai',
    message = 'Rate limit exceeded. Please wait a moment before sending more queries.'
  } = options;

  return async (req, res, next) => {
    const identifier =
      req.user?.uid ||
      req.user?._id ||
      req.user?.id ||
      req.ip ||
      req.headers['x-forwarded-for'] ||
      'anonymous_client';

    const rateKey = `${name}:${identifier}`;
    let result = null;

    const activeLimiter = name === 'ai' ? upstashAiLimiter : upstashGeneralLimiter;
    if (activeLimiter) {
      try {
        result = await activeLimiter.limit(rateKey);
      } catch (redisErr) {
        // Fall back gracefully
      }
    }

    if (!result) {
      result = memoryRateLimit(rateKey, limit, windowSec * 1000);
    }

    res.setHeader('X-RateLimit-Limit', result.limit || limit);
    res.setHeader('X-RateLimit-Remaining', result.remaining !== undefined ? result.remaining : 0);
    res.setHeader('X-RateLimit-Reset', result.reset || Date.now() + windowSec * 1000);

    if (!result.success) {
      const retryAfter = Math.max(1, Math.ceil(((result.reset || Date.now()) - Date.now()) / 1000));
      res.setHeader('Retry-After', retryAfter);

      return res.status(429).json({
        success: false,
        error: message,
        retryAfterSeconds: retryAfter,
        limit: result.limit || limit,
        remaining: 0
      });
    }

    next();
  };
};

/**
 * Per-user daily quota middleware for Gemini/RAG endpoint
 * Prevents API budget exhaustion by capping daily questions per user
 */
export const ragDailyQuotaLimiter = async (req, res, next) => {
  const dailyLimit = parseInt(process.env.DAILY_RAG_USER_QUOTA || '50', 10);
  const userId = req.user?.uid || req.user?._id || req.user?.id || req.ip || 'anonymous';
  const todayKey = new Date().toISOString().slice(0, 10);
  const quotaKey = `daily_rag_quota:${userId}:${todayKey}`;

  let quotaResult = null;

  if (redis) {
    try {
      const current = await redis.incr(quotaKey);
      if (current === 1) {
        // Set TTL to 48 hours for auto cleanup
        await redis.expire(quotaKey, 172800);
      }
      const remaining = Math.max(0, dailyLimit - current);
      const midnight = new Date();
      midnight.setUTCHours(23, 59, 59, 999);

      quotaResult = {
        success: current <= dailyLimit,
        limit: dailyLimit,
        remaining,
        reset: midnight.getTime(),
        currentUsage: current
      };
    } catch (err) {
      // Fall through to memory
    }
  }

  if (!quotaResult) {
    quotaResult = memoryDailyQuota(userId, dailyLimit);
  }

  res.setHeader('X-Daily-Quota-Limit', quotaResult.limit);
  res.setHeader('X-Daily-Quota-Remaining', quotaResult.remaining);
  res.setHeader('X-Daily-Quota-Reset', quotaResult.reset);

  if (!quotaResult.success) {
    return res.status(429).json({
      success: false,
      error: `Daily AI tutor question quota exceeded. You have reached your limit of ${dailyLimit} questions for today. Quota resets at 00:00 UTC.`,
      quotaLimit: quotaResult.limit,
      remaining: 0,
      resetAt: new Date(quotaResult.reset).toISOString()
    });
  }

  next();
};

// Strict rate limiter for AI queries: 15 queries / 60 seconds
export const aiRateLimiter = createRateLimiter({
  limit: 15,
  windowSec: 60,
  name: 'ai',
  message: 'AI query rate limit reached (15 queries/min). Please wait a moment before sending more queries.'
});

// General API rate limiter: 100 requests / 60 seconds
export const generalRateLimiter = createRateLimiter({
  limit: 100,
  windowSec: 60,
  name: 'general',
  message: 'Too many API requests. Please slow down.'
});
