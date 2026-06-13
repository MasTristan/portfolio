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

function renderTitleLine(text, { startIndex = 0, accent = false } = {}) {
  const words = text.split(' ').filter(Boolean);
  const html = words
    .map((word, index) => {
      const cls = accent ? ' mark' : '';
      return `<span class="hero-word${cls}" style="--wi:${startIndex + index}">${escapeHtml(word)}</span>`;
    })
    .join(' ');
  return { html, nextIndex: startIndex + words.length };
}

export function createHero({ translate, currentLang }) {
  const { socials } = heroData;

  const isFr = currentLang === 'fr';
  const metaLabel = {
    status: isFr ? 'statut' : 'status',
    openTo: isFr ? 'ouvert à' : 'open to',
    mode: isFr ? 'mode' : 'mode',
  };
  const metaVal = {
    status: isFr ? 'disponible' : 'available',
    openTo: isFr ? 'Postes Data & Business Analyst' : 'Data & Business Analyst roles',
    mode: 'full remote',
  };
  const abstractLabel = {
    discipline: 'discipline',
    stack: 'stack',
    focus: 'focus',
    based: isFr ? 'basé à' : 'based in',
  };
  const disciplineVal = isFr
    ? 'Risque, Finance & Data Réglementaire'
    : 'Risk, Finance & Regulatory Data';
  const basedVal = isFr ? "Bordeaux · Europe de l'Ouest" : 'Bordeaux · Western Europe';
  const focusVal = isFr
    ? 'Analyse de données · Reporting réglementaire · Aide à la décision'
    : 'Data analysis · Regulatory reporting · Decision support';

  const titleLine1 = renderTitleLine(translate('hero-title-line1'));
  const titleLine2 = renderTitleLine(translate('hero-title-line2'), {
    startIndex: titleLine1.nextIndex,
    accent: true,
  });
  const ariaLabel = `${translate('hero-title-line1')} — ${translate('hero-title-line2')}`;

  return `
    <section id="home" class="hero no-reveal">
      <div class="hero-grid-bg" aria-hidden="true"></div>
      <div class="container container--wide">
        <div class="hero-meta">
          <span><span class="key">${escapeHtml(metaLabel.status)}:</span> <span class="signal">${escapeHtml(metaVal.status)}</span></span>
          <span><span class="key">${escapeHtml(metaLabel.openTo)}:</span> <span class="val open-to">${escapeHtml(metaVal.openTo)}</span></span>
          <span><span class="key">${escapeHtml(metaLabel.mode)}:</span> <span class="val">${escapeHtml(metaVal.mode)}</span></span>
        </div>
        <h1 class="hero-title" aria-label="${escapeHtml(ariaLabel)}">
          <span class="hero-title-line">${titleLine1.html}</span>
          <span class="hero-title-line hero-title-line--accent">${titleLine2.html}</span>
        </h1>
        <p class="hero-tagline">${escapeHtml(translate('hero-tagline'))}</p>
        <div class="hero-cta">
          <a href="#projects" class="btn btn-primary" data-scroll="projects" data-magnetic>
            ${escapeHtml(translate('hero-cta-projects'))}
          </a>
          <a href="cv/CV_Tristan_Mas_EN.pdf" class="btn btn-secondary" download target="_blank" rel="noopener noreferrer">
            ${escapeHtml(translate('hero-cta-cv'))}
          </a>
          <a href="#contact" class="btn btn-tertiary" data-scroll="contact">
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
            <dd>${escapeHtml(disciplineVal)}</dd>

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
