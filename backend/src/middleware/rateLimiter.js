import { Ratelimit } from '@upstash/ratelimit';
import { redis } from '../config/redis.js';

// Fallback in-memory sliding window store in case Upstash token is read-only or unreachable
const memoryRateLimitStore = new Map();

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

// Periodic garbage collection for in-memory store
setInterval(() => {
  const now = Date.now();
  for (const [key, value] of memoryRateLimitStore.entries()) {
    if (now > value.resetTime) {
      memoryRateLimitStore.delete(key);
    }
  }
}, 30000);

// Initialize Upstash Redis Ratelimiters
let upstashAiLimiter = null;
let upstashGeneralLimiter = null;

try {
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
} catch (err) {
  console.warn('[RateLimiter] Upstash ratelimit init warning:', err.message);
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
    // Determine unique user or client identifier
    const identifier =
      req.user?.uid ||
      req.user?._id ||
      req.user?.id ||
      req.ip ||
      req.headers['x-forwarded-for'] ||
      'anonymous_client';

    const rateKey = `${name}:${identifier}`;

    let result = null;

    // 1. Try Upstash Redis Ratelimit
    const activeLimiter = name === 'ai' ? upstashAiLimiter : upstashGeneralLimiter;

    if (activeLimiter) {
      try {
        result = await activeLimiter.limit(rateKey);
      } catch (redisErr) {
        // If Upstash token lacks write permissions (read-only token) or network timeout, fall back seamlessly
        // console.warn(`[RateLimiter] Upstash limit error (${redisErr.message}), using fallback store.`);
      }
    }

    // 2. Fallback to resilient in-memory sliding window
    if (!result) {
      result = memoryRateLimit(rateKey, limit, windowSec * 1000);
    }

    // Set standard rate limit headers
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

// Strict rate limiter for AI queries (protects OpenAI tokens & quotas): 15 queries / 60 seconds
export const aiRateLimiter = createRateLimiter({
  limit: 15,
  windowSec: 60,
  name: 'ai',
  message: 'AI query rate limit reached (15 queries/min). Please wait a moment to preserve token quotas.'
});

// General API rate limiter: 100 requests / 60 seconds
export const generalRateLimiter = createRateLimiter({
  limit: 100,
  windowSec: 60,
  name: 'general',
  message: 'Too many API requests. Please slow down.'
});
