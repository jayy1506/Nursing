import { test, describe } from 'node:test';
import assert from 'node:assert/strict';
import { bulkImportUsers } from '../src/controllers/userController.js';
import { parseSections } from '../src/services/ragService.js';

const createMockReqRes = (body = {}) => {
  const req = {
    body,
    user: { uid: 'test_admin_uid', role: 'admin' }
  };

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

describe('Admin Tooling Tests', () => {
  describe('Bulk User CSV Import Validation', () => {
    test('returns 400 when CSV content is empty or missing', async () => {
      const { req, res } = createMockReqRes({});
      await bulkImportUsers(req, res);
      assert.equal(res.statusCode, 400);
      assert.equal(res.body.success, false);
      assert.match(res.body.error, /Either csvContent/);
    });

    test('validates rows and captures row-level errors for invalid email and role', async () => {
      const sampleCsv = `name,email,role,password
Elena Rostova,not-an-email,student,Password123
Dr. Marcus Vance,marcus@nursing.edu,invalid_role,Password123
Valid Student,student.valid@hospital.edu,student,Pass@2026`;

      const { req, res } = createMockReqRes({ csvContent: sampleCsv });
      await bulkImportUsers(req, res);

      assert.equal(res.statusCode, 200);
      assert.equal(res.body.success, true);
      assert.ok(res.body.failedCount >= 2);
      assert.ok(res.body.errors.some((e) => e.row === 2 && e.reason.includes('Invalid email')));
      assert.ok(res.body.errors.some((e) => e.row === 3 && e.reason.includes('Invalid role')));
    });

    test('reports row error when required fields are missing', async () => {
      const sampleCsv = `name,email,role
,missingname@nursing.edu,student
John Doe,,student`;

      const { req, res } = createMockReqRes({ csvContent: sampleCsv });
      await bulkImportUsers(req, res);

      assert.equal(res.statusCode, 200);
      assert.ok(res.body.errors.length >= 2);
      assert.ok(res.body.errors.some((e) => e.reason.includes('Missing required field')));
    });
  });

  describe('Content Ingestion Pipeline Chunking', () => {
    test('automatically decomposes uploaded clinical markdown into section-aware chunks', () => {
      const curriculumText = `
# Mechanical Ventilation
Mechanical ventilation is an advanced clinical life support intervention.

## Indications for Intubation
Acute hypoxemic respiratory failure, hypercapnic failure with acidosis, and loss of airway protective reflexes.

## Priority Nursing Monitoring
Assess endotracheal tube placement at the lip line, monitor peak airway pressures, and perform oral chlorhexidine care every 12 hours.
`;

      const chunks = parseSections('Mechanical Ventilation', curriculumText);
      assert.ok(chunks.length >= 2);
      assert.ok(chunks.some((c) => c.sectionTitle.includes('Indications for Intubation')));
      assert.ok(chunks.some((c) => c.sectionTitle.includes('Priority Nursing Monitoring')));
      assert.ok(chunks.some((c) => c.text.includes('peak airway pressures')));
    });
  });
});
