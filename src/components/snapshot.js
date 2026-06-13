import { escapeHtml } from '@/modules/dom.js';

const METRICS = [
  { valueKey: 'snapshot-years-value', labelKey: 'snapshot-years-label' },
  { valueKey: 'snapshot-projects-value', labelKey: 'snapshot-projects-label' },
  { valueKey: 'snapshot-tech-value', labelKey: 'snapshot-tech-label' },
  { valueKey: 'snapshot-domains-value', labelKey: 'snapshot-domains-label', variant: 'text' },
];

export function createSnapshot({ translate }) {
  return `
    <section id="snapshot" class="snapshot">
      <div class="container">
        <header class="section-header">
          <span class="section-overline">${escapeHtml(translate('snapshot-overline'))}</span>
          <h2 class="section-title">${escapeHtml(translate('snapshot-title'))}</h2>
          <span class="section-index">02</span>
        </header>
        <div class="snapshot-grid reveal-stagger">
          ${METRICS.map(
            ({ valueKey, labelKey, variant }) => `
              <div class="snapshot-card">
                <p class="snapshot-value${variant ? ` snapshot-value--${variant}` : ''}">${escapeHtml(translate(valueKey))}</p>
                <p class="snapshot-label">${escapeHtml(translate(labelKey))}</p>
              </div>
            `,
          ).join('')}
        </div>
      </div>
    </section>
  `;
}
