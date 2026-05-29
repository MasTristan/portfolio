// One-off generator for the social share card (public/og-card.png, 1200x630).
// Run with: node scripts/make-og-card.mjs  (requires sharp available locally)
import sharp from 'sharp';
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const OUT = resolve(__dirname, '../public/og-card.png');

// Brand tokens mirrored from src/styles/variables.css (light theme).
const PAPER = '#f7f4ea';
const PAPER_ELEVATED = '#fcfaf2';
const NAVY = '#1c2c54';
const NAVY_STRONG = '#0e1b3a';
const INK = '#181820';
const INK_LIGHT = '#444452';
const GOLD = '#a87a2e';
const RULE = 'rgba(28,44,84,0.22)';

const SANS = 'Liberation Sans, Arial, sans-serif';
const MONO = 'DejaVu Sans Mono, monospace';

const svg = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <rect width="1200" height="630" fill="${PAPER}"/>
  <rect x="28" y="28" width="1144" height="574" rx="18" fill="${PAPER_ELEVATED}" stroke="${RULE}" stroke-width="1.5"/>

  <!-- Monogram + kicker -->
  <rect x="90" y="92" width="76" height="76" rx="16" fill="${NAVY}"/>
  <text x="128" y="145" text-anchor="middle" font-family="${SANS}" font-size="40" font-weight="700" fill="#ffffff">TM</text>
  <text x="186" y="123" font-family="${MONO}" font-size="22" letter-spacing="3" fill="${INK_LIGHT}">PORTFOLIO</text>
  <text x="186" y="153" font-family="${MONO}" font-size="20" letter-spacing="1" fill="${GOLD}">finance &amp; risk · regulatory reporting</text>

  <!-- Name -->
  <text x="88" y="320" font-family="${SANS}" font-size="118" font-weight="700" letter-spacing="-3" fill="${NAVY_STRONG}">Tristan Mas</text>

  <!-- Role -->
  <text x="92" y="392" font-family="${SANS}" font-size="40" font-weight="400" fill="${INK}">Data Engineer · Business Analyst</text>

  <!-- Rule -->
  <rect x="92" y="430" width="120" height="3" fill="${NAVY}"/>

  <!-- Stack -->
  <text x="92" y="492" font-family="${MONO}" font-size="28" fill="${INK_LIGHT}">Oracle PL/SQL · Power BI · Python</text>

  <!-- Footer line -->
  <text x="92" y="556" font-family="${MONO}" font-size="22" fill="${NAVY}">mastristan.github.io/portfolio</text>
  <text x="1110" y="556" text-anchor="end" font-family="${MONO}" font-size="22" fill="${INK_LIGHT}">Available · Full-remote · Western Europe</text>
</svg>`;

await sharp(Buffer.from(svg)).png().toFile(OUT);
console.log('Wrote', OUT);
