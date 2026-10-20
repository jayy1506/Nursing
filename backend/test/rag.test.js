import { test, describe } from 'node:test';
import assert from 'node:assert/strict';
import {
  extractKeywords,
  calculateKeywordScore,
  parseSections
} from '../src/services/ragService.js';

describe('RAG Quality & Tutor Service Tests', () => {
  describe('Keyword Extraction', () => {
    test('extracts unique lowercase clinical tokens and strips common stop words', () => {
      const text = 'A nurse is preparing to administer intravenous Potassium Chloride for severe hypokalemia.';
      const keywords = extractKeywords(text);

      assert.ok(keywords.includes('nurse'));
      assert.ok(keywords.includes('administer'));
      assert.ok(keywords.includes('intravenous'));
      assert.ok(keywords.includes('potassium'));
      assert.ok(keywords.includes('chloride'));
      assert.ok(keywords.includes('hypokalemia'));
      // Ensure stop words are filtered
      assert.ok(!keywords.includes('is'));
      assert.ok(!keywords.includes('for'));
      assert.ok(!keywords.includes('a'));
    });
  });

  describe('Section-Aware Parsing', () => {
    test('parses markdown headings into sectioned chunks with section titles', () => {
      const markdownContent = `
## Standard Precautions
Standard precautions apply to all patients. Always perform hand hygiene before and after patient contact.

### Airborne Precautions
Airborne precautions require an N95 respirator and negative-pressure room for tuberculosis and measles.

### Droplet Precautions
Droplet precautions require a surgical mask within 3-6 feet for influenza and pertussis.
`;

      const sections = parseSections('Infection Control', markdownContent);
      assert.equal(sections.length, 3);
      assert.match(sections[0].sectionTitle, /Standard Precautions/);
      assert.match(sections[1].sectionTitle, /Airborne Precautions/);
      assert.match(sections[2].sectionTitle, /Droplet Precautions/);
      assert.ok(sections[0].text.includes('hand hygiene'));
      assert.ok(sections[1].text.includes('N95 respirator'));
    });

    test('falls back gracefully to paragraph chunks if no headings are present', () => {
      const plainText = `
Infection prevention is the cornerstone of clinical safety across all hospital wards and clinics.

Hand hygiene using soap and water is mandatory when hands are visibly soiled or caring for C. difficile.
`;

      const sections = parseSections('Overview', plainText);
      assert.ok(sections.length >= 1);
      assert.ok(sections[0].text.length > 30);
    });
  });

  describe('Keyword Similarity Scoring', () => {
    test('scores higher when query keywords match document body and section title', () => {
      const chunkA = {
        title: 'Ch 1: Infection Control',
        sectionTitle: 'Airborne Precautions & N95 Respirator',
        text: 'Tuberculosis requires airborne precautions, an N95 respirator mask, and a negative pressure room.',
        keywords: ['tuberculosis', 'airborne', 'precautions', 'n95', 'respirator', 'mask']
      };

      const chunkB = {
        title: 'Ch 1: Infection Control',
        sectionTitle: 'Vital Signs',
        text: 'Heart rate and blood pressure must be assessed regularly.',
        keywords: ['heart', 'rate', 'blood', 'pressure']
      };

      const queryKws = ['tuberculosis', 'n95', 'respirator'];

      const scoreA = calculateKeywordScore(queryKws, chunkA);
      const scoreB = calculateKeywordScore(queryKws, chunkB);

      assert.ok(scoreA > 0.8, `Expected scoreA > 0.8, got ${scoreA}`);
      assert.equal(scoreB, 0, `Expected scoreB to be 0, got ${scoreB}`);
    });
  });
});
