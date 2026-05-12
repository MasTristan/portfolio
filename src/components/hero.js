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
  const stack = translate('hero-stack');
  const role = translate('hero-role');
  const metaKey = currentLang === 'fr' ? 'statut' : 'status';
  const scopeKey = currentLang === 'fr' ? 'périmètre' : 'scope';
  const modeKey = currentLang === 'fr' ? 'mode' : 'mode';
  const scopeVal = currentLang === 'fr' ? 'Europe de l’Ouest' : 'Western Europe';
  const modeVal = currentLang === 'fr' ? 'full remote' : 'full remote';
  const statusVal = currentLang === 'fr' ? 'disponible' : 'available';

  return `
    <section id="home" class="hero">
      <div class="container">
        <div class="hero-meta" aria-label="${escapeHtml(translate('hero-status'))}">
          <span><span class="key">${escapeHtml(metaKey)}:</span> <span class="signal">${escapeHtml(statusVal)}</span></span>
          <span><span class="key">${escapeHtml(scopeKey)}:</span> <span class="val">${escapeHtml(scopeVal)}</span></span>
          <span><span class="key">${escapeHtml(modeKey)}:</span> <span class="val">${escapeHtml(modeVal)}</span></span>
        </div>
        <h1 class="hero-title">${escapeHtml(name)}</h1>
        <p class="hero-role"><em>${escapeHtml(role)}</em></p>
        <hr class="hero-rule" />
        <p class="hero-stack" aria-label="${escapeHtml(stack)}">${renderStackLine(stack)}</p>
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
      </div>
    </section>
  `;
}
