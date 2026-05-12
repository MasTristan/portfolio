import { escapeHtml } from '@/modules/dom.js';

// Quant + risk formulas, set in mono — scroll as a Bloomberg-style band.
const FORMULAS = [
  'E[L] = PD · LGD · EAD',
  'K = EAD × RW × 8%',
  'RWA = K ÷ 8%',
  'CET1 = CET1 capital ÷ RWA',
  'LCR = HQLA ÷ Net outflows₃₀ ≥ 100%',
  'NSFR = ASF ÷ RSF ≥ 100%',
  'VaR = μ − z · σ',
  'σ²(R_p) = w′ Σ w',
  'Sharpe = (R − R_f) ÷ σ',
  'ROE = Net income ÷ Equity',
  'Leverage = Tier 1 ÷ Total exposure ≥ 3%',
];

function renderRun(formulas) {
  return formulas
    .map(
      (f, i) =>
        `${i === 0 ? '' : '<span class="ticker-sep" aria-hidden="true">◇</span>'}<span class="ticker-item">${escapeHtml(f)}</span>`,
    )
    .join('');
}

export function createTicker() {
  // Duplicate the run so the keyframe -50% lands exactly between copies.
  const run = renderRun(FORMULAS);
  return `
    <div class="ticker" aria-hidden="true">
      <div class="ticker-track">
        ${run}<span class="ticker-sep" aria-hidden="true">◇</span>${run}<span class="ticker-sep" aria-hidden="true">◇</span>
      </div>
    </div>
  `;
}
