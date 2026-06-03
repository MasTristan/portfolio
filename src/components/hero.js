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
    openTo: isFr ? 'ouvert à' : 'open to',
    mode: isFr ? 'mode' : 'mode',
  };
  const metaVal = {
    status: isFr ? 'disponible' : 'available',
    openTo: 'Product Owner · Lead Data',
    mode: 'full remote',
  };
  const abstractLabel = {
    discipline: 'discipline',
    stack: 'stack',
    focus: 'focus',
    based: isFr ? 'basé à' : 'based in',
  };
  const disciplineVal = isFr
    ? 'Risque & Finance · Delivery data'
    : 'Risk & Finance · Data delivery';
  const basedVal = isFr ? "Bordeaux · Europe de l'Ouest" : 'Bordeaux · Western Europe';
  const focusVal = isFr
    ? 'Ownership de delivery de bout en bout · leadership produit et data'
    : 'End-to-end delivery ownership · product & data leadership';

  const titleHtml = splitWords(name);

  return `
    <section id="home" class="hero no-reveal">
      <div class="hero-grid-bg" aria-hidden="true"></div>
      <div class="container container--wide">
        <div class="hero-meta">
          <span><span class="key">${escapeHtml(metaLabel.status)}:</span> <span class="signal">${escapeHtml(metaVal.status)}</span></span>
          <span><span class="key">${escapeHtml(metaLabel.openTo)}:</span> <span class="val open-to">${escapeHtml(metaVal.openTo)}</span></span>
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
          <a href="cv/CV_Tristan_Mas_EN.pdf" class="btn btn-cv" download target="_blank" rel="noopener noreferrer">
            ${escapeHtml(translate('hero-cta-cv'))}
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

            <dt>${escapeHtml(abstractLabel.focus)}</dt>
            <dd>${escapeHtml(focusVal)}</dd>

            <dt>${escapeHtml(abstractLabel.based)}</dt>
            <dd>${escapeHtml(basedVal)}</dd>
          </dl>
        </aside>
      </div>
    </section>
  `;
}
