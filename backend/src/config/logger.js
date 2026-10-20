import pino from 'pino';

const isProduction = process.env.NODE_ENV === 'production';
const logLevel = process.env.LOG_LEVEL || (isProduction ? 'info' : 'debug');

/**
 * Structured Pino Logger Instance
 */
export const logger = pino({
  level: logLevel,
  timestamp: pino.stdTimeFunctions.isoTime,
  formatters: {
    level: (label) => ({ level: label.toUpperCase() })
  },
  base: {
    env: process.env.NODE_ENV || 'development',
    service: 'medpulse-lms-backend'
  }
});

/**
 * Optional Sentry Integration Hook
 * Configures Sentry error capture if SENTRY_DSN is provided
 */
export const initSentryHook = (app) => {
  if (process.env.SENTRY_DSN) {
    try {
      logger.info({ dsn: process.env.SENTRY_DSN.substring(0, 15) + '...' }, '[Sentry] Initializing Sentry monitoring hook');
      // If user installs @sentry/node in production, it seamlessly hooks in
      import('@sentry/node')
        .then((Sentry) => {
          Sentry.init({
            dsn: process.env.SENTRY_DSN,
            environment: process.env.NODE_ENV || 'production',
            tracesSampleRate: 0.2
          });
          logger.info('[Sentry] Successfully initialized @sentry/node error tracking');
        })
        .catch(() => {
          logger.warn('[Sentry] SENTRY_DSN was provided but @sentry/node is not installed. Native structured error logging active.');
        });
    } catch (err) {
      logger.warn({ error: err.message }, '[Sentry] Failed to initialize Sentry hook');
    }
  }
};

/**
 * Express Request Logging Middleware using structured JSON output
 */
export const reqLogger = (req, res, next) => {
  const start = Date.now();
  const { method, originalUrl, ip } = req;

  res.on('finish', () => {
    const duration = Date.now() - start;
    const { statusCode } = res;

    const logData = {
      method,
      url: originalUrl,
      status: statusCode,
      durationMs: duration,
      ip: ip || req.headers['x-forwarded-for'] || 'unknown',
      userId: req.user?.uid || req.user?._id || 'unauthenticated'
    };

    if (statusCode >= 500) {
      logger.error(logData, `[API 5xx] ${method} ${originalUrl} -> ${statusCode} (${duration}ms)`);
    } else if (statusCode >= 400) {
      logger.warn(logData, `[API 4xx] ${method} ${originalUrl} -> ${statusCode} (${duration}ms)`);
    } else {
      logger.info(logData, `[API OK] ${method} ${originalUrl} -> ${statusCode} (${duration}ms)`);
    }
  });

  next();
};

export default logger;
