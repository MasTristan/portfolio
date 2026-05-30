import { heroData } from '@/data/hero.js';
import { escapeHtml } from '@/modules/dom.js';

function renderStackLine(stack) {
  const tokens = stack.split('·').map((piece) => piece.trim()).filter(Boolean);
  return tokens
    .map((token, index) => {
      const safe = escapeHtml(token);
      const sep = index === 0 ? '' : '<span class="dot" aria-hidden="true">·</span>';
      return `${sep}${safe}`;
    })
    .join('');
}

// Split a title into word spans that rise into focus, staggered by word.
// The last word carries the navy accent (.mark). aria-label on the <h1>
// keeps the name readable to assistive tech regardless of the animation.
function splitWords(text) {
  const words = text.split(' ').filter(Boolean);
  return words
    .map((word, index) => {
      const isLast = index === words.length - 1 && words.length > 1;
      const cls = isLast ? ' mark' : '';
      return `<span class="hero-word${cls}" style="--wi:${index}">${escapeHtml(word)}</span>`;
    })
    .join(' ');
}

export function createHero({ translate, currentLang }) {
  const { name, socials } = heroData;
  const role = translate('hero-role');

  const isFr = currentLang === 'fr';
  const metaLabel = {
    status: isFr ? 'statut' : 'status',
    scope: isFr ? 'périmètre' : 'scope',
    mode: isFr ? 'mode' : 'mode',
  };
  const metaVal = {
    status: isFr ? 'disponible' : 'available',
    scope: isFr ? 'Europe de l’Ouest' : 'Western Europe',
    mode: 'full remote',
  };
  const abstractLabel = {
    discipline: isFr ? 'discipline' : 'discipline',
    stack: 'stack',
    based: isFr ? 'basé à' : 'based in',
  };
  const disciplineVal = isFr
    ? 'Finance & Risque · Reporting réglementaire'
    : 'Finance & Risk · Regulatory reporting';
  const basedVal = isFr ? 'Bordeaux · Europe de l’Ouest' : 'Bordeaux · Western Europe';
  const focusLabel = isFr ? 'focus' : 'focus';
  const focusVal = isFr
    ? 'Modélisation du risque de crédit · explicabilité des modèles'
    : 'Credit risk modelling · model explainability';

  // Hero title: word-level rise reveal, last word in navy accent.
  const titleHtml = splitWords(name);

  return `
    <section id="home" class="hero no-reveal">
      <canvas class="hero-curve" data-risk-curve aria-hidden="true"></canvas>
      <div class="container container--wide">
        <div class="hero-meta">
          <span><span class="key">${escapeHtml(metaLabel.status)}:</span> <span class="signal">${escapeHtml(metaVal.status)}</span></span>
          <span><span class="key">${escapeHtml(metaLabel.scope)}:</span> <span class="val">${escapeHtml(metaVal.scope)}</span></span>
          <span><span class="key">${escapeHtml(metaLabel.mode)}:</span> <span class="val">${escapeHtml(metaVal.mode)}</span></span>
        </div>
        <h1 class="hero-title" aria-label="${escapeHtml(name)}">${titleHtml}</h1>
        <p class="hero-role"><em>${escapeHtml(role)}</em></p>
        <hr class="hero-rule" />
        <p class="hero-tagline">${escapeHtml(translate('hero-tagline'))}</p>
        <div class="hero-cta">
          <a href="#projects" class="btn btn-primary" data-scroll="projects" data-magnetic>
            ${escapeHtml(translate('hero-cta-projects'))}
          </a>
          <a href="#contact" class="btn" data-scroll="contact">
            ${escapeHtml(translate('hero-cta-contact'))}
          </a>
        </div>
        <div class="social-links">
          ${socials
            .map(
              ({ name: socialName, href }) => `
                <a href="${escapeHtml(href)}" target="_blank" rel="noopener noreferrer" class="social-link">
                  ${escapeHtml(socialName)}
                </a>
              `,
            )
            .join('')}
        </div>
        <aside class="hero-abstract" aria-label="Profile abstract">
          <dl>
            <dt>${escapeHtml(abstractLabel.discipline)}</dt>
            <dd data-cycle="discipline">${escapeHtml(disciplineVal)}</dd>

            <dt>${escapeHtml(abstractLabel.stack)}</dt>
            <dd>
              <span class="stack-line">${renderStackLine(translate('hero-stack'))}</span>
            </dd>

            <dt>${escapeHtml(focusLabel)}</dt>
            <dd>${escapeHtml(focusVal)}</dd>

            <dt>${escapeHtml(abstractLabel.based)}</dt>
            <dd>${escapeHtml(basedVal)}</dd>
          </dl>
        </aside>
      </div>
    </section>
  `;
}
