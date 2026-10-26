import { test, describe } from 'node:test';
import assert from 'node:assert/strict';
import healthRouter from '../src/routes/healthRoutes.js';

const createMockReqRes = () => {
  const req = {};
  const res = {
    statusCode: 200,
    status(code) {
      this.statusCode = code;
      return this;
    },
    json(payload) {
      this.body = payload;
      return this;
    }
  };
  return { req, res };
};

describe('Health Check Endpoint Tests', () => {
  test('returns 200 with system diagnostics and memory info in dev/test environment', async () => {
    const { req, res } = createMockReqRes();
    
    // Find route handler directly
    const route = healthRouter.stack.find(layer => layer.route && layer.route.path === '/health');
    assert.ok(route, 'GET /health route should be defined');
    
    const handler = route.route.stack[0].handle;
    await handler(req, res);

    assert.equal(res.statusCode, 200);
    assert.ok(res.body.timestamp);
    assert.ok(res.body.memory);
    assert.ok(typeof res.body.memory.heapUsedMB === 'number');
    assert.ok(res.body.database);
    assert.ok(typeof res.body.uptimeSeconds === 'number');
  });
});
