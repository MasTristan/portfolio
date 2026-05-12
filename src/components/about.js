import { aboutData } from '@/data/about.js';
import { escapeHtml } from '@/modules/dom.js';

// Phrases that should render as <span class="hl"> highlights, per language.
const HIGHLIGHTS = {
  en: [
    'Basel III Standard Approach',
    'NDoD regulatory reporting',
    'Oracle SQL/PL-SQL',
    'FRM certification (GARP)',
    'Télécom Saint-Étienne',
    'full-remote mandates',
    'XGBoost',
  ],
  fr: [
    'Bâle III (approche standard)',
    'reporting NDoD',
    'Oracle SQL/PL-SQL',
    'certification FRM (GARP)',
    'Télécom Saint-Étienne',
    'full remote',
    'XGBoost',
  ],
};

function highlight(text, lang) {
  let escaped = escapeHtml(text);
  const terms = HIGHLIGHTS[lang] ?? HIGHLIGHTS.en;
  for (const term of terms) {
    const safeTerm = escapeHtml(term);
    escaped = escaped.split(safeTerm).join(`<span class="hl">${safeTerm}</span>`);
  }
  return escaped;
}

export function createAbout({ translate, currentLang }) {
  return `
    <section id="about" class="about">
      <div class="container">
        <header class="section-header">
          <h2 class="section-title">${escapeHtml(translate('about-title'))}</h2>
          <span class="section-leader" aria-hidden="true"></span>
          <span class="section-index"><span class="sym">§</span>01</span>
        </header>
        <div class="about-content reveal-stagger">
          ${aboutData.paragraphKeys
            .map(
              (key) =>
                `<p class="about-paragraph">${highlight(translate(key), currentLang)}</p>`,
            )
            .join('')}
        </div>
      </div>
    </section>
  `;
}
