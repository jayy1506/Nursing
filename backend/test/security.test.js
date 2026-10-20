import { test, describe, beforeEach, afterEach } from 'node:test';
import assert from 'node:assert/strict';
import { validateBody } from '../src/middleware/validate.js';
import { loginSchema, createUserSchema, ragQuerySchema } from '../src/schemas/index.js';
import { authorizeRoles, authenticateUser } from '../src/middleware/auth.js';
import { ragDailyQuotaLimiter } from '../src/middleware/rateLimiter.js';

// Helper mock functions
const createMockReqRes = (body = {}, headers = {}, user = null) => {
  const req = {
    body,
    headers,
    cookies: {},
    user,
    ip: '127.0.0.1'
  };

  const res = {
    statusCode: 200,
    headersSent: {},
    status(code) {
      this.statusCode = code;
      return this;
    },
    json(payload) {
      this.body = payload;
      return this;
    },
    setHeader(key, val) {
      this.headersSent[key] = val;
    }
  };

  let nextCalled = false;
  const next = () => {
    nextCalled = true;
  };

  return { req, res, next: () => next(), wasNextCalled: () => nextCalled };
};

describe('Security Hardening Tests', () => {
  const originalEnv = { ...process.env };

  beforeEach(() => {
    process.env = { ...originalEnv };
  });

  afterEach(() => {
    process.env = { ...originalEnv };
  });

  describe('Zod Request Validation Middleware', () => {
    test('rejects login with invalid email format', () => {
      const validator = validateBody(loginSchema);
      const { req, res, next, wasNextCalled } = createMockReqRes({
        email: 'not-an-email',
        password: 'password123'
      });

      validator(req, res, next);
      assert.equal(res.statusCode, 400);
      assert.equal(res.body.success, false);
      assert.equal(wasNextCalled(), false);
      assert.ok(res.body.details.some(d => d.field === 'email'));
    });

    test('accepts login with valid email and password', () => {
      const validator = validateBody(loginSchema);
      const { req, res, next, wasNextCalled } = createMockReqRes({
        email: 'student@medpulse.edu',
        password: 'validPassword123'
      });

      validator(req, res, next);
      assert.equal(res.statusCode, 200);
      assert.equal(wasNextCalled(), true);
    });

    test('rejects user creation with invalid role', () => {
      const validator = validateBody(createUserSchema);
      const { req, res, next, wasNextCalled } = createMockReqRes({
        name: 'Nurse Joy',
        email: 'joy@hospital.org',
        password: 'password123',
        role: 'superadmin_hacker'
      });

      validator(req, res, next);
      assert.equal(res.statusCode, 400);
      assert.equal(wasNextCalled(), false);
    });

    test('rejects RAG query with empty chapterId', () => {
      const validator = validateBody(ragQuerySchema);
      const { req, res, next, wasNextCalled } = createMockReqRes({
        chapterId: '',
        query: 'What is the dosage for heparin?'
      });

      validator(req, res, next);
      assert.equal(res.statusCode, 400);
      assert.equal(wasNextCalled(), false);
    });
  });

  describe('RBAC Authorization Middleware', () => {
    test('forbids student from accessing faculty/admin route', () => {
      const guard = authorizeRoles('admin', 'faculty');
      const { req, res, next, wasNextCalled } = createMockReqRes(
        {},
        {},
        { role: 'student', email: 'student@test.com' }
      );

      guard(req, res, next);
      assert.equal(res.statusCode, 403);
      assert.equal(wasNextCalled(), false);
      assert.match(res.body.error, /Forbidden/);
    });

    test('allows admin to access admin-only route', () => {
      const guard = authorizeRoles('admin');
      const { req, res, next, wasNextCalled } = createMockReqRes(
        {},
        {},
        { role: 'admin', email: 'admin@test.com' }
      );

      guard(req, res, next);
      assert.equal(res.statusCode, 200);
      assert.equal(wasNextCalled(), true);
    });
  });

  describe('Mock Auth Production Lockout', () => {
    test('rejects unverified base64 dev token when NODE_ENV=production', async () => {
      process.env.NODE_ENV = 'production';
      process.env.ALLOW_DEV_AUTH = 'true'; // Even if someone mistakenly tries to enable it

      const fakeToken = Buffer.from(JSON.stringify({ uid: 'mock_uid', role: 'admin' })).toString('base64');
      const { req, res, next, wasNextCalled } = createMockReqRes({}, { authorization: `Bearer ${fakeToken}` });

      await authenticateUser(req, res, next);
      assert.equal(res.statusCode, 401);
      assert.equal(wasNextCalled(), false);
      assert.match(res.body.error, /Invalid, unverified, or expired/);
    });

    test('rejects request with missing token', async () => {
      const { req, res, next, wasNextCalled } = createMockReqRes({}, {});

      await authenticateUser(req, res, next);
      assert.equal(res.statusCode, 401);
      assert.equal(wasNextCalled(), false);
      assert.match(res.body.error, /token missing/);
    });
  });

  describe('Per-User Daily RAG Quota', () => {
    test('enforces quota limit and returns 429 when quota exceeded', async () => {
      process.env.DAILY_RAG_USER_QUOTA = '2';
      const testUserId = `test_quota_user_${Date.now()}`;

      // Call 1
      const { req: r1, res: res1, next: n1, wasNextCalled: w1 } = createMockReqRes({}, {}, { uid: testUserId });
      await ragDailyQuotaLimiter(r1, res1, n1);
      assert.equal(res1.statusCode, 200);
      assert.equal(w1(), true);

      // Call 2
      const { req: r2, res: res2, next: n2, wasNextCalled: w2 } = createMockReqRes({}, {}, { uid: testUserId });
      await ragDailyQuotaLimiter(r2, res2, n2);
      assert.equal(res2.statusCode, 200);
      assert.equal(w2(), true);

      // Call 3 (Exceeds daily quota of 2)
      const { req: r3, res: res3, next: n3, wasNextCalled: w3 } = createMockReqRes({}, {}, { uid: testUserId });
      await ragDailyQuotaLimiter(r3, res3, n3);
      assert.equal(res3.statusCode, 429);
      assert.equal(w3(), false);
      assert.match(res3.body.error, /Daily AI tutor question quota exceeded/);
    });
  });
});
