import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');
const srcDir = path.join(rootDir, 'src');

const disallowedTailwindRegex = /\b(?:(?:dark:)?(?:hover:|focus:|active:|group-hover:)?(?:bg|text|border|ring|stroke|fill|from|via|to|accent|shadow|outline|selection:bg)-)(slate|gray|zinc|stone|red|orange|amber|yellow|lime|emerald|teal|cyan|sky|blue|indigo|violet|purple|fuchsia|pink|rose)-[0-9]+(?:\/[0-9]+)?\b/g;

// Allowed hex colors (normalized to lowercase 6-char or 3-char)
const allowedHexes = new Set([
  '#000000', '#000',
  '#0a0a0a',
  '#111111',
  '#171717',
  '#262626',
  '#404040',
  '#525252',
  '#6b6b6b',
  '#737373',
  '#a3a3a3',
  '#d4d4d4',
  '#e5e5e5',
  '#f5f5f5',
  '#fafafa',
  '#ffffff', '#fff',
  // Green family
  '#f0fdf4', // green-50
  '#dcfce7', // green-100
  '#4ade80', // green-400
  '#22c55e', // green-500
  '#16a34a', // green-600
  '#15803d', // green-700
  '#052e16'  // green-900
]);

const hexRegex = /#(?:[0-9a-fA-F]{3}|[0-9a-fA-F]{6}|[0-9a-fA-F]{8})\b/g;

function getFiles(dir, fileList = []) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    if (stat.isDirectory()) {
      if (file !== 'node_modules' && file !== 'dist') {
        getFiles(fullPath, fileList);
      }
    } else if (/\.(jsx?|tsx?|css|html)$/.test(file)) {
      fileList.push(fullPath);
    }
  }
  return fileList;
}

const allFiles = getFiles(srcDir);
allFiles.push(path.join(rootDir, 'index.html'));

let violationsCount = 0;
const violationsByFile = {};

for (const filePath of allFiles) {
  const content = fs.readFileSync(filePath, 'utf-8');
  const relPath = path.relative(rootDir, filePath).replace(/\\/g, '/');
  const lines = content.split('\n');

  lines.forEach((line, index) => {
    // Check tailwind classes
    let match;
    while ((match = disallowedTailwindRegex.exec(line)) !== null) {
      if (!violationsByFile[relPath]) violationsByFile[relPath] = [];
      violationsByFile[relPath].push({
        line: index + 1,
        type: 'Tailwind class',
        found: match[0],
        snippet: line.trim().slice(0, 100)
      });
      violationsCount++;
    }

    // Check hex values
    let hexMatch;
    while ((hexMatch = hexRegex.exec(line)) !== null) {
      const hex = hexMatch[0].toLowerCase();
      // If 8-char hex (e.g. #22c55e20), check base 6-char
      const baseHex = hex.length === 9 ? hex.slice(0, 7) : hex;
      if (!allowedHexes.has(hex) && !allowedHexes.has(baseHex)) {
        if (!violationsByFile[relPath]) violationsByFile[relPath] = [];
        violationsByFile[relPath].push({
          line: index + 1,
          type: 'Hex color',
          found: hexMatch[0],
          snippet: line.trim().slice(0, 100)
        });
        violationsCount++;
      }
    }
  });
}

console.log(`\n================ COLOR AUDIT REPORT ================`);
console.log(`Scanned ${allFiles.length} files.`);
console.log(`Total color violations: ${violationsCount}`);
console.log(`Files with violations: ${Object.keys(violationsByFile).length}`);

for (const [file, items] of Object.entries(violationsByFile)) {
  console.log(`\n📄 ${file} (${items.length} violations):`);
  items.slice(0, 5).forEach(v => {
    console.log(`   Line ${v.line}: [${v.type}] ${v.found}`);
  });
  if (items.length > 5) {
    console.log(`   ... and ${items.length - 5} more.`);
  }
}

if (violationsCount > 0) {
  console.log(`\n❌ Color check failed. Only Black, White, Neutral Grays, and Green family allowed.`);
  process.exit(1);
} else {
  console.log(`\n✅ All colors conform to Black, White, Neutral Grays, and Green design tokens!`);
  process.exit(0);
}
