import { escapeHtml } from '@/modules/dom.js';

const STATEMENTS = {
  en: [
    'Own delivery end to end',
    'Make priorities explicit',
    'Translate between business and engineering',
    'Set the quality bar',
    'Ship, then steer',
  ],
  fr: [
    'Porter la delivery de bout en bout',
    'Rendre les priorités explicites',
    'Faire le pont entre métier et technique',
    'Fixer le niveau de qualité',
    'Livrer, puis piloter',
  ],
};

function renderRun(items) {
  return items
    .map(
      (item, i) =>
        `${i === 0 ? '' : '<span class="ticker-sep" aria-hidden="true">·</span>'}<span class="ticker-item">${escapeHtml(item)}</span>`,
    )
    .join('');
}

export function createTicker({ currentLang } = {}) {
  const items = STATEMENTS[currentLang] ?? STATEMENTS.en;
  const run = renderRun(items);
  return `
    <div class="ticker" role="region" aria-label="${currentLang === 'fr' ? 'Principes de travail' : 'Operating principles'}">
      <div class="ticker-track" aria-hidden="true">
        ${run}<span class="ticker-sep" aria-hidden="true">·</span>${run}<span class="ticker-sep" aria-hidden="true">·</span>
      </div>
      <ul class="ticker-static" aria-label="${currentLang === 'fr' ? 'Principes de travail' : 'Operating principles'}">
        ${items.map((item) => `<li>${escapeHtml(item)}</li>`).join('')}
      </ul>
    </div>
  `;
}
