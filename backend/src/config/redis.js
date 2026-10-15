import { Redis } from '@upstash/redis';
import dotenv from 'dotenv';

dotenv.config();

const url = process.env.UPSTASH_REDIS_REST_URL || 'https://guiding-emu-176357.upstash.io';
const token = process.env.UPSTASH_REDIS_REST_TOKEN || 'gQAAAAAAArDlAAIgcDJiODZiZWI1ZmI4NGE0YmRiYTZkMmUzOWQyZjEwOTYzNw';

export const redis = new Redis({
  url,
  token
});

/**
 * Healthcheck ping for Upstash Redis
 */
export const checkRedisConnection = async () => {
  try {
    const pong = await redis.ping();
    console.log(`[Upstash Redis] Connected successfully (Ping: ${pong})`);
    return { status: 'connected', ping: pong };
  } catch (err) {
    console.warn(`[Upstash Redis] Connection check warning: ${err.message}`);
    return { status: 'fallback_in_memory', error: err.message };
  }
};

export default redis;
