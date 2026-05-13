import { aboutData } from '@/data/about.js';
import { escapeHtml } from '@/modules/dom.js';

// Phrases that should render as <span class="hl"> highlights, per language.
const HIGHLIGHTS = {
  en: [
    'Hybrid technical and functional profile',
    'Basel III Standard Approach',
    'NDoD regulatory reporting',
    'Oracle SQL/PL-SQL',
    'FRM certification (GARP)',
    'Télécom Saint-Étienne',
    'full-remote mandates',
    'business teams and information systems',
    'requirements gathering and workshop facilitation',
  ],
  fr: [
    'Profil hybride technique / fonctionnel',
    'Bâle III (approche standard)',
    'reporting NDoD',
    'Oracle SQL/PL-SQL',
    'certification FRM (GARP)',
    'Télécom Saint-Étienne',
    'full remote',
    "équipes métier et les systèmes d'information",
    "recueil des besoins et de l'animation d'ateliers",
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
          <span class="section-overline">${escapeHtml(translate('about-overline'))}</span>
          <h2 class="section-title">${escapeHtml(translate('about-title'))}</h2>
          <span class="section-index">01</span>
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
