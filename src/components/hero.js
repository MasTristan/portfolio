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
    domain: 'domain',
    based: isFr ? 'basé à' : 'based in',
  };
  const disciplineVal = isFr ? 'Finance & Risque · Reporting réglementaire' : 'Finance & Risk · Regulatory reporting';
  const basedVal = isFr ? 'Bordeaux · Europe de l’Ouest' : 'Bordeaux · Western Europe';

  // Italic accent: last name
  const nameParts = name.split(' ');
  const titleHtml =
    nameParts.length > 1
      ? `${escapeHtml(nameParts.slice(0, -1).join(' '))} <span class="mark">${escapeHtml(nameParts.at(-1))}</span>`
      : escapeHtml(name);

  return `
    <section id="home" class="hero">
      <div class="container container--wide">
        <div class="hero-cartouche" aria-hidden="true">
          <span class="vol">Vol.&nbsp;I</span>
          <span class="rule"></span>
          <span>portfolio · 2026</span>
        </div>
        <div class="hero-meta">
          <span><span class="key">${escapeHtml(metaLabel.status)}:</span> <span class="signal">${escapeHtml(metaVal.status)}</span></span>
          <span><span class="key">${escapeHtml(metaLabel.scope)}:</span> <span class="val">${escapeHtml(metaVal.scope)}</span></span>
          <span><span class="key">${escapeHtml(metaLabel.mode)}:</span> <span class="val">${escapeHtml(metaVal.mode)}</span></span>
        </div>
        <h1 class="hero-title">${titleHtml}</h1>
        <p class="hero-role"><em>${escapeHtml(role)}</em></p>
        <hr class="hero-rule" />
        <p class="hero-tagline">${escapeHtml(translate('hero-tagline'))}</p>
        <div class="hero-cta">
          <a href="#projects" class="btn btn-primary" data-scroll="projects">
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
            <dd>${escapeHtml(disciplineVal)}</dd>

            <dt>${escapeHtml(abstractLabel.stack)}</dt>
            <dd>
              <span class="stack-line">${renderStackLine(translate('hero-stack'))}</span>
            </dd>

            <dt>${escapeHtml(abstractLabel.domain)}</dt>
            <dd class="formula" aria-label="Expected loss equals probability of default times loss given default times exposure at default">
              <span class="glyph">E</span>[<span class="glyph">L</span>]<span class="eq">=</span>PD<span class="op">·</span>LGD<span class="op">·</span>EAD
            </dd>

            <dt>${escapeHtml(abstractLabel.based)}</dt>
            <dd>${escapeHtml(basedVal)}</dd>
          </dl>
        </aside>
      </div>
    </section>
  `;
}
