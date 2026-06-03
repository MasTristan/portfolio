// In-house mini risk-visualisations for each project, rendered as inline SVG
// so they are crisp, lightweight, theme-aware (coloured via CSS custom
// properties in projects.css) and can never render "broken" like an embed.

const VB_W = 320;
const VB_H = 200;
const PAD = 18;

// Asymmetric loss distribution for the Basel III / credit scoring engine.
function lossViz() {
  const w = VB_W - PAD * 2;
  const h = VB_H - PAD * 2;
  const baseY = PAD + h;
  const peak = 0.4;
  const wL = 0.13;
  const wR = 0.3;
  const n = 120;
  const pts = [];
  for (let i = 0; i <= n; i++) {
    const t = i / n;
    const sd = t < peak ? wL : wR;
    const y = Math.exp(-((t - peak) ** 2) / (2 * sd * sd));
    pts.push([PAD + t * w, baseY - y * (h * 0.96)]);
  }
  const line = pts.map(([x, y], i) => `${i ? 'L' : 'M'}${x.toFixed(1)} ${y.toFixed(1)}`).join(' ');
  const area = `M${PAD} ${baseY} ${pts.map(([x, y]) => `L${x.toFixed(1)} ${y.toFixed(1)}`).join(' ')} L${PAD + w} ${baseY} Z`;
  const thrT = 0.74;
  const thrX = PAD + thrT * w;
  // tail polygon (x >= threshold)
  const tail = [`M${thrX} ${baseY}`];
  pts.filter(([x]) => x >= thrX).forEach(([x, y]) => tail.push(`L${x.toFixed(1)} ${y.toFixed(1)}`));
  tail.push(`L${PAD + w} ${baseY} Z`);
  return `
    <svg class="project-viz-svg" viewBox="0 0 ${VB_W} ${VB_H}" role="img" aria-label="Credit loss distribution with regulatory capital threshold" preserveAspectRatio="xMidYMid meet">
      <path class="viz-area" d="${area}" />
      <path class="viz-tail" d="${tail.join(' ')}" />
      <path class="viz-curve" d="${line}" />
      <line class="viz-threshold" x1="${thrX.toFixed(1)}" y1="${baseY}" x2="${thrX.toFixed(1)}" y2="${PAD + h * 0.18}" />
      <line class="viz-axis" x1="${PAD}" y1="${baseY}" x2="${PAD + w}" y2="${baseY}" />
      <text class="viz-label" x="${(thrX + 5).toFixed(1)}" y="${(PAD + h * 0.18 + 11).toFixed(1)}">VaR · 99.9%</text>
      <text class="viz-label viz-label--muted" x="${PAD}" y="${baseY + 13}">expected loss → unexpected loss → capital</text>
    </svg>`;
}

// Grouped prudential ratios for the European banks regulatory dashboard.
function barsViz() {
  const w = VB_W - PAD * 2;
  const h = VB_H - PAD * 2;
  const baseY = PAD + h;
  const banks = [0.82, 0.64, 0.91, 0.7, 0.58, 0.78];
  const gap = 10;
  const bw = (w - gap * (banks.length - 1)) / banks.length;
  const minLine = baseY - h * 0.45; // regulatory minimum
  const bars = banks
    .map((v, i) => {
      const x = PAD + i * (bw + gap);
      const bh = v * h * 0.9;
      const cls = i === 2 ? 'viz-bar viz-bar--accent' : 'viz-bar';
      return `<rect class="${cls}" x="${x.toFixed(1)}" y="${(baseY - bh).toFixed(1)}" width="${bw.toFixed(1)}" height="${bh.toFixed(1)}" rx="1.5" />`;
    })
    .join('');
  return `
    <svg class="project-viz-svg" viewBox="0 0 ${VB_W} ${VB_H}" role="img" aria-label="Prudential ratios across European banks" preserveAspectRatio="xMidYMid meet">
      ${bars}
      <line class="viz-threshold" x1="${PAD}" y1="${minLine.toFixed(1)}" x2="${PAD + w}" y2="${minLine.toFixed(1)}" />
      <line class="viz-axis" x1="${PAD}" y1="${baseY}" x2="${PAD + w}" y2="${baseY}" />
      <text class="viz-label" x="${PAD + w}" y="${(minLine - 5).toFixed(1)}" text-anchor="end">min. requirement</text>
      <text class="viz-label viz-label--muted" x="${PAD}" y="${baseY + 13}">CET1 · Tier 1 · LCR · NSFR</text>
    </svg>`;
}

// Diverging SHAP contributions for the XGBoost + SHAP scoring model.
function shapViz() {
  const w = VB_W - PAD * 2;
  const h = VB_H - PAD * 2;
  const midX = PAD + w * 0.46;
  const rows = [0.9, -0.55, 0.62, -0.34, 0.45, -0.22];
  const rh = (h * 0.86) / rows.length;
  const barH = rh * 0.62;
  const maxLen = Math.min(midX - PAD, PAD + w - midX);
  const bars = rows
    .map((v, i) => {
      const y = PAD + i * rh + (rh - barH) / 2;
      const len = Math.abs(v) * maxLen;
      const x = v >= 0 ? midX : midX - len;
      const cls = v >= 0 ? 'viz-bar' : 'viz-bar--neg';
      return `<rect class="${cls}" x="${x.toFixed(1)}" y="${y.toFixed(1)}" width="${len.toFixed(1)}" height="${barH.toFixed(1)}" rx="1.5" />`;
    })
    .join('');
  return `
    <svg class="project-viz-svg" viewBox="0 0 ${VB_W} ${VB_H}" role="img" aria-label="SHAP feature contributions, positive and negative" preserveAspectRatio="xMidYMid meet">
      ${bars}
      <line class="viz-axis" x1="${midX.toFixed(1)}" y1="${PAD}" x2="${midX.toFixed(1)}" y2="${PAD + h * 0.88}" />
      <text class="viz-label viz-label--muted" x="${PAD}" y="${PAD + h - 1}">SHAP contributions → probability of default</text>
    </svg>`;
}

const BUILDERS = { loss: lossViz, bars: barsViz, shap: shapViz };

export function renderProjectVisual(viz) {
  const build = BUILDERS[viz];
  return build ? build() : '';
}
