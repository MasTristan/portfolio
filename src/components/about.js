import { aboutData } from '@/data/about.js';
import { escapeHtml } from '@/modules/dom.js';

const HIGHLIGHTS = {
  en: [
    'owned delivery rather than just contributing to it',
    'delivery lead and a product owner',
    'Basel III Standard Approach',
    'NDoD reporting',
    'FRM certification in progress (GARP)',
    'Télécom Saint-Étienne',
    'full remote',
    'backlog ownership',
    'steering committee reporting',
  ],
  fr: [
    'porté la delivery plutôt que d\'y contribuer',
    'delivery lead et un product owner',
    'Bâle III (approche standard)',
    'reporting NDoD',
    'certification FRM en cours (GARP)',
    'Télécom Saint-Étienne',
    'full remote',
    'ownership du backlog',
    'comité de pilotage',
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
