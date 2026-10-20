import fs from 'fs';
import path from 'path';

const SRC_DIR = path.resolve('src');

const colorRegexes = [
  // Loose shadows
  [/\bshadow-(sky|indigo|amber|cyan|emerald|teal|blue|rose|purple|orange|red|yellow)-[^\s"'`]+/g, 'shadow-md'],
  [/\bhover:shadow-(sky|indigo|amber|cyan|emerald|teal|blue|rose|purple|orange|red|yellow)-[^\s"'`]+/g, 'hover:shadow-md'],

  // Loose backgrounds
  [/\b(dark:)?bg-(yellow|amber|orange|rose|red|pink|sky|blue|indigo|purple|violet|cyan|teal|emerald)-[^\s"'`]+/g, (m) => {
    if (m.includes('emerald') || m.includes('teal')) {
      return m.replace(/(emerald|teal)/, 'green');
    }
    return m.includes('dark:') ? 'dark:bg-neutral-900' : 'bg-neutral-100';
  }],

  // Loose texts
  [/\b(dark:)?text-(yellow|amber|orange|rose|red|pink|sky|blue|indigo|purple|violet|cyan|teal|emerald)-[^\s"'`]+/g, (m) => {
    if (m.includes('emerald') || m.includes('teal')) {
      return m.replace(/(emerald|teal)/, 'green');
    }
    if (m.includes('dark:')) return 'dark:text-neutral-200';
    return 'text-neutral-800';
  }],

  // Loose borders
  [/\b(dark:)?(hover:)?border-(yellow|amber|orange|rose|red|pink|sky|blue|indigo|purple|violet|cyan|teal|emerald)-[^\s"'`]+/g, (m) => {
    if (m.includes('emerald') || m.includes('teal')) {
      return m.replace(/(emerald|teal)/, 'green');
    }
    if (m.includes('dark:')) return 'dark:border-neutral-700';
    return 'border-neutral-300';
  }],

  // Loose rings
  [/\bring-(yellow|amber|orange|rose|red|pink|sky|blue|indigo|purple|violet|cyan|teal|emerald)-[^\s"'`]+/g, 'ring-neutral-400'],

  // Loose fills
  [/\bfill-(yellow|amber|orange|rose|red|pink|sky|blue|indigo|purple|violet|cyan|teal|emerald)-[^\s"'`]+/g, 'fill-green-500'],

  // Gradients
  [/\b(from|to|via)-(yellow|amber|orange|rose|red|pink|sky|blue|indigo|purple|violet|cyan)-[^\s"'`]+/g, 'from-neutral-900 to-neutral-800'],
  [/\b(from|to|via)-(emerald|teal)-[^\s"'`]+/g, (m) => m.replace(/(emerald|teal)/, 'green')],

  // Hex color codes in all files (converting any non-token hex code to appropriate black/white/green/gray)
  [/#[0-9a-fA-F]{3,8}/g, (match) => {
    const hex = match.toLowerCase();
    const allowed = new Set([
      '#000000', '#0a0a0a', '#111111', '#262626', '#404040', '#525252',
      '#6b6b6b', '#737373', '#a3a3a3', '#d4d4d4', '#e5e5e5', '#f5f5f5',
      '#fafafa', '#ffffff',
      '#22c55e', '#15803d', '#4ade80', '#052e16', '#f0fdf4', '#dcfce7'
    ]);
    if (allowed.has(hex)) return match;

    // Map 3-char hex
    if (hex === '#fff' || hex === '#ffffff') return '#FFFFFF';
    if (hex === '#000' || hex === '#000000') return '#000000';
    if (hex === '#eee' || hex === '#e5e5e5') return '#E5E5E5';
    if (hex === '#ddd' || hex === '#d4d4d4') return '#D4D4D4';
    if (hex === '#aaa' || hex === '#a3a3a3') return '#A3A3A3';
    if (hex === '#666' || hex === '#6b6b6b') return '#6B6B6B';
    if (hex === '#333' || hex === '#262626') return '#262626';

    // Green tones
    if (/^#(059669|10b981|0d9488|047857|065f46|064e3b|14b8a6|2dd4bf|a7f3d0|6ee7b7|34d399|16a34a|22c55e|15803d|4ade80|34a853)$/i.test(hex)) {
      return '#22C55E';
    }
    // Very light green tones
    if (/^#(d1fae5|ccfbf1|e6fffa|f0fdf4|dcfce7)$/i.test(hex)) {
      return '#F0FDF4';
    }
    // Very dark tones
    if (/^#(020617|0f172a|1e293b|334155|18181b|27272a|09090b|1c1917)$/i.test(hex)) {
      return '#111111';
    }
    // Mid dark tones
    if (/^#(475569|64748b|71717a|78716c)$/i.test(hex)) {
      return '#525252';
    }
    // Light gray tones
    if (/^#(94a3b8|cbd5e1|e2e8f0|f1f5f9|f8fafc|e4e4e7|f4f4f5|f5f5f4)$/i.test(hex)) {
      return '#E5E5E5';
    }
    // Red / Rose / Amber / Blue / Purple tones
    // If it's a bright accent in illustrations, map to green or black
    if (/^#(ea4335|4285f4|fbbc05|f87171|ef4444|f59e0b|3b82f6|6366f1|8b5cf6|ec4899|f43f5e|78350f|fde68a|b45309)$/i.test(hex)) {
      return '#22C55E';
    }

    // Default fallback to pure neutral gray
    return '#6B6B6B';
  }]
];

function processDir(dir) {
  const files = fs.readdirSync(dir);
  for (const f of files) {
    const full = path.join(dir, f);
    if (fs.statSync(full).isDirectory()) {
      processDir(full);
    } else if (/\.(jsx?|tsx?)$/.test(f)) {
      let content = fs.readFileSync(full, 'utf8');
      let orig = content;
      for (const [re, repl] of colorRegexes) {
        content = content.replace(re, repl);
      }
      if (content !== orig) {
        fs.writeFileSync(full, content, 'utf8');
        console.log('Cleaned:', full);
      }
    }
  }
}

processDir(SRC_DIR);
console.log('All files processed.');
