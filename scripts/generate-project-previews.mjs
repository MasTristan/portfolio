// Generates branded SVG "screenshot" previews (1600x900) for each project card.
// These are stylised mockups (not literal app screenshots) used as the desktop
// preview image + lightbox source until real product screenshots are available.
// Run with: node scripts/generate-project-previews.mjs

import { mkdir, writeFile } from 'fs/promises';
import { dirname, resolve } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, '..');

const W = 1600;
const H = 900;
const CHROME_H = 72;

const COLORS = {
  bg: '#0b0b0f',
  panel: '#15151d',
  border: '#2a2a35',
  text: '#ebe9e2',
  textMuted: '#8a8a92',
  accent: '#a8bff5',
  accentSoft: 'rgba(168, 191, 245, 0.16)',
  gold: '#d6b069',
  goldSoft: 'rgba(214, 176, 105, 0.16)',
  positive: '#6dbf95',
  negative: '#8a8a92',
};

function chrome(title, badge) {
  const badgeHtml = badge
    ? `<g>
        <rect x="${W - 220}" y="22" width="${badge.length * 11 + 28}" height="28" rx="14" fill="none" stroke="${COLORS.positive}" stroke-width="1.5" />
        <circle cx="${W - 220 + 16}" cy="36" r="4" fill="${COLORS.positive}" />
        <text x="${W - 220 + 28}" y="40" fill="${COLORS.positive}" font-family="ui-monospace, monospace" font-size="14" letter-spacing="1">${badge}</text>
      </g>`
    : '';
  return `
    <rect width="${W}" height="${CHROME_H}" fill="${COLORS.panel}" />
    <circle cx="34" cy="${CHROME_H / 2}" r="8" fill="#e0605a" />
    <circle cx="62" cy="${CHROME_H / 2}" r="8" fill="#e0b65a" />
    <circle cx="90" cy="${CHROME_H / 2}" r="8" fill="${COLORS.positive}" />
    <text x="130" y="${CHROME_H / 2 + 6}" fill="${COLORS.textMuted}" font-family="ui-monospace, monospace" font-size="20" letter-spacing="1">${title}</text>
    ${badgeHtml}
    <line x1="0" y1="${CHROME_H}" x2="${W}" y2="${CHROME_H}" stroke="${COLORS.border}" stroke-width="1" />
  `;
}

function frame(inner) {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" width="${W}" height="${H}" role="presentation">
  <rect width="${W}" height="${H}" rx="14" fill="${COLORS.bg}" />
  ${inner}
  <rect x="0.5" y="0.5" width="${W - 1}" height="${H - 1}" rx="13.5" fill="none" stroke="${COLORS.border}" stroke-width="1" />
</svg>
`;
}

// ── Project 1: Basel III credit-loss distribution ──────────────────────────
function lossPreview() {
  const left = 120;
  const right = W - 120;
  const top = CHROME_H + 90;
  const bottom = H - 140;
  const w = right - left;
  const h = bottom - top;
  const peak = 0.4;
  const wL = 0.13;
  const wR = 0.3;
  const n = 160;
  const pts = [];
  for (let i = 0; i <= n; i++) {
    const t = i / n;
    const sd = t < peak ? wL : wR;
    const y = Math.exp(-((t - peak) ** 2) / (2 * sd * sd));
    pts.push([left + t * w, bottom - y * (h * 0.96)]);
  }
  const line = pts.map(([x, y], i) => `${i ? 'L' : 'M'}${x.toFixed(1)} ${y.toFixed(1)}`).join(' ');
  const area = `M${left} ${bottom} ${pts.map(([x, y]) => `L${x.toFixed(1)} ${y.toFixed(1)}`).join(' ')} L${right} ${bottom} Z`;
  const thrT = 0.74;
  const thrX = left + thrT * w;
  const tail = [`M${thrX.toFixed(1)} ${bottom}`];
  pts.filter(([x]) => x >= thrX).forEach(([x, y]) => tail.push(`L${x.toFixed(1)} ${y.toFixed(1)}`));
  tail.push(`L${right} ${bottom} Z`);

  return frame(`
    ${chrome('basel3-credit-scoring-engine — Streamlit', 'LIVE')}
    <text x="${left}" y="${top - 40}" fill="${COLORS.text}" font-family="ui-monospace, monospace" font-size="28" font-weight="600">Credit Loss Distribution</text>
    <text x="${left}" y="${top - 12}" fill="${COLORS.textMuted}" font-family="ui-monospace, monospace" font-size="16">Expected loss → unexpected loss → regulatory capital (VaR 99.9%)</text>
    <path d="${area}" fill="${COLORS.accentSoft}" />
    <path d="${tail.join(' ')}" fill="${COLORS.goldSoft}" />
    <path d="${line}" fill="none" stroke="${COLORS.accent}" stroke-width="3" opacity="0.9" />
    <line x1="${thrX.toFixed(1)}" y1="${bottom}" x2="${thrX.toFixed(1)}" y2="${top + h * 0.1}" stroke="${COLORS.gold}" stroke-width="2" stroke-dasharray="8 6" />
    <text x="${(thrX + 14).toFixed(1)}" y="${(top + h * 0.1 + 18).toFixed(1)}" fill="${COLORS.gold}" font-family="ui-monospace, monospace" font-size="16">VaR · 99.9%</text>
    <line x1="${left}" y1="${bottom}" x2="${right}" y2="${bottom}" stroke="${COLORS.border}" stroke-width="1.5" />
    <text x="${left}" y="${bottom + 36}" fill="${COLORS.textMuted}" font-family="ui-monospace, monospace" font-size="16">Risk-weight assignment</text>
    <text x="${left + w * 0.35}" y="${bottom + 36}" fill="${COLORS.textMuted}" font-family="ui-monospace, monospace" font-size="16">Exposure segmentation</text>
    <text x="${left + w * 0.68}" y="${bottom + 36}" fill="${COLORS.textMuted}" font-family="ui-monospace, monospace" font-size="16">RWA computation</text>
  `);
}

// ── Project 2: EU Banks regulatory dashboard ────────────────────────────────
function barsPreview() {
  const left = 120;
  const right = W - 120;
  const top = CHROME_H + 110;
  const bottom = H - 140;
  const w = right - left;
  const h = bottom - top;
  const banks = ['BNP', 'SAN', 'DBK', 'UCG', 'ISP', 'SOC'];
  const values = [0.82, 0.64, 0.91, 0.7, 0.58, 0.78];
  const gap = 48;
  const bw = (w - gap * (values.length - 1)) / values.length;
  const minLine = bottom - h * 0.45;
  const bars = values
    .map((v, i) => {
      const x = left + i * (bw + gap);
      const bh = v * h * 0.92;
      const fill = i === 2 ? COLORS.gold : COLORS.accent;
      return `
        <rect x="${x.toFixed(1)}" y="${(bottom - bh).toFixed(1)}" width="${bw.toFixed(1)}" height="${bh.toFixed(1)}" rx="4" fill="${fill}" opacity="0.85" />
        <text x="${(x + bw / 2).toFixed(1)}" y="${bottom + 34}" text-anchor="middle" fill="${COLORS.textMuted}" font-family="ui-monospace, monospace" font-size="16">${banks[i]}</text>
      `;
    })
    .join('');

  return frame(`
    ${chrome('eu-banks-regulatory-dashboard — Power BI', 'IN PROGRESS')}
    <text x="${left}" y="${top - 50}" fill="${COLORS.text}" font-family="ui-monospace, monospace" font-size="28" font-weight="600">Prudential Ratios — Major European Banks</text>
    <text x="${left}" y="${top - 22}" fill="${COLORS.textMuted}" font-family="ui-monospace, monospace" font-size="16">CET1 · Tier 1 · LCR · NSFR — public EBA data</text>
    ${bars}
    <line x1="${left}" y1="${minLine.toFixed(1)}" x2="${right}" y2="${minLine.toFixed(1)}" stroke="${COLORS.gold}" stroke-width="2" stroke-dasharray="8 6" />
    <text x="${right}" y="${(minLine - 12).toFixed(1)}" text-anchor="end" fill="${COLORS.gold}" font-family="ui-monospace, monospace" font-size="16">Regulatory minimum</text>
    <line x1="${left}" y1="${bottom}" x2="${right}" y2="${bottom}" stroke="${COLORS.border}" stroke-width="1.5" />
  `);
}

// ── Project 3: SHAP feature contributions ───────────────────────────────────
function shapPreview() {
  const left = 120;
  const right = W - 120;
  const top = CHROME_H + 100;
  const bottom = H - 120;
  const w = right - left;
  const h = bottom - top;
  const midX = left + w * 0.46;
  const rows = [
    { label: 'Debt-to-income ratio', v: 0.9 },
    { label: 'Months on file', v: -0.55 },
    { label: 'Credit utilisation', v: 0.62 },
    { label: 'Number of open lines', v: -0.34 },
    { label: 'Delinquency history', v: 0.45 },
    { label: 'Income stability', v: -0.22 },
  ];
  const rh = h / rows.length;
  const barH = rh * 0.5;
  const maxLen = Math.min(midX - left, right - midX);
  const bars = rows
    .map((row, i) => {
      const y = top + i * rh + (rh - barH) / 2;
      const len = Math.abs(row.v) * maxLen;
      const x = row.v >= 0 ? midX : midX - len;
      const fill = row.v >= 0 ? COLORS.accent : COLORS.negative;
      const labelX = row.v >= 0 ? midX - 16 : midX + 16;
      const anchor = row.v >= 0 ? 'end' : 'start';
      return `
        <rect x="${x.toFixed(1)}" y="${y.toFixed(1)}" width="${len.toFixed(1)}" height="${barH.toFixed(1)}" rx="4" fill="${fill}" opacity="0.85" />
        <text x="${labelX.toFixed(1)}" y="${(y + barH / 2 + 5).toFixed(1)}" text-anchor="${anchor}" fill="${COLORS.textMuted}" font-family="ui-monospace, monospace" font-size="15">${row.label}</text>
      `;
    })
    .join('');

  return frame(`
    ${chrome('credit-scoring-engine — Streamlit', 'LIVE')}
    <text x="${left}" y="${top - 40}" fill="${COLORS.text}" font-family="ui-monospace, monospace" font-size="28" font-weight="600">SHAP Feature Contributions</text>
    <text x="${left}" y="${top - 12}" fill="${COLORS.textMuted}" font-family="ui-monospace, monospace" font-size="16">Per-prediction breakdown → probability of default</text>
    <line x1="${midX.toFixed(1)}" y1="${top}" x2="${midX.toFixed(1)}" y2="${bottom}" stroke="${COLORS.border}" stroke-width="1.5" />
    ${bars}
    <text x="${left}" y="${bottom + 36}" fill="${COLORS.negative}" font-family="ui-monospace, monospace" font-size="16">← lowers risk score</text>
    <text x="${right}" y="${bottom + 36}" text-anchor="end" fill="${COLORS.accent}" font-family="ui-monospace, monospace" font-size="16">raises risk score →</text>
  `);
}

const TARGETS = [
  { slug: 'basel3-credit-scoring-engine', svg: lossPreview() },
  { slug: 'eu-banks-regulatory-dashboard', svg: barsPreview() },
  { slug: 'xgboost-shap-credit-scoring', svg: shapPreview() },
];

for (const { slug, svg } of TARGETS) {
  const dir = resolve(ROOT, 'public/img/portfolio', slug);
  await mkdir(dir, { recursive: true });
  await writeFile(resolve(dir, 'desktop.svg'), svg, 'utf8');
  console.log(`Wrote ${dir}/desktop.svg`);
}
