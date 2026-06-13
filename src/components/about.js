import { aboutData } from '@/data/about.js';
import { escapeHtml } from '@/modules/dom.js';

const HIGHLIGHTS = {
  en: [
    'Data & Business Analyst',
    'Basel III Standard Approach',
    'NDoD reporting',
    'FRM certification in progress (GARP)',
    'Télécom Saint-Étienne',
    'full-remote',
    'Bordeaux',
  ],
  fr: [
    'Data & Business Analyst',
    'Bâle III (approche standard)',
    'reporting NDoD',
    'certification FRM en cours (GARP)',
    'Télécom Saint-Étienne',
    'full remote',
    'Bordeaux',
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
  const { whoIAmKeys, specializationKeys, valueKeys } = aboutData;

  return `
    <section id="about" class="about">
      <div class="container">
        <header class="section-header">
          <span class="section-overline">${escapeHtml(translate('about-overline'))}</span>
          <h2 class="section-title">${escapeHtml(translate('about-title'))}</h2>
          <span class="section-index">01</span>
        </header>
        <div class="about-content">
          <div class="about-block reveal-stagger">
            <h3 class="about-block-title">${escapeHtml(translate('about-who-title'))}</h3>
            ${whoIAmKeys
              .map(
                (key) =>
                  `<p class="about-paragraph">${highlight(translate(key), currentLang)}</p>`,
              )
              .join('')}
          </div>

          <div class="about-block reveal-stagger">
            <h3 class="about-block-title">${escapeHtml(translate('about-specialize-title'))}</h3>
            <ul class="about-specializations">
              ${specializationKeys
                .map((key) => `<li class="about-spec-chip">${escapeHtml(translate(key))}</li>`)
                .join('')}
            </ul>
          </div>

          <div class="about-block reveal-stagger">
            <h3 class="about-block-title">${escapeHtml(translate('about-value-title'))}</h3>
            <ul class="about-values">
              ${valueKeys
                .map((key) => `<li class="about-value-item">${escapeHtml(translate(key))}</li>`)
                .join('')}
            </ul>
          </div>
        </div>
      </div>
    </section>
  `;
}
