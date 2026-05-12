import { aboutData } from '@/data/about.js';
import { escapeHtml } from '@/modules/dom.js';

// Phrases that should render as <span class="hl"> highlights, per language.
// All entries are escaped before being substituted into the paragraph HTML.
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
    // Word-boundary-ish replace; we use a literal substring match because the
    // terms are short and curated.
    escaped = escaped.split(safeTerm).join(`<span class="hl">${safeTerm}</span>`);
  }
  return escaped;
}

export function createAbout({ translate, currentLang }) {
  return `
    <section id="about" class="about">
      <div class="container">
        <div class="section-header">
          <span class="section-eyebrow">01 · ${escapeHtml(translate('about-title'))}</span>
          <h2 class="section-title">${escapeHtml(translate('about-title'))}</h2>
        </div>
        <div class="about-shell reveal">
          <div class="about-content">
            ${aboutData.paragraphKeys
              .map(
                (key) =>
                  `<p class="about-paragraph">${highlight(translate(key), currentLang)}</p>`,
              )
              .join('')}
          </div>
        </div>
      </div>
    </section>
  `;
}
