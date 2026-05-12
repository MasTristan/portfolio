import { heroData } from '@/data/hero.js';
import { escapeHtml } from '@/modules/dom.js';

function renderStackLine(stack) {
  const tokens = stack.split('·').map((piece) => piece.trim()).filter(Boolean);
  return tokens
    .map(
      (token, index) =>
        `${index === 0 ? '' : '<span class="dot" aria-hidden="true"></span>'}<span>${escapeHtml(token)}</span>`,
    )
    .join('');
}

export function createHero({ translate }) {
  const { name, socials } = heroData;
  const stack = translate('hero-stack');
  const role = translate('hero-role');
  // Highlight "Finance & Risk" / "Finance & Risque" in the role line.
  const roleParts = role.split('—');
  const roleHtml =
    roleParts.length === 2
      ? `${escapeHtml(roleParts[0].trim())} <span class="role-accent">— ${escapeHtml(roleParts[1].trim())}</span>`
      : escapeHtml(role);

  // Highlight last name in display title.
  const nameParts = name.split(' ');
  const titleHtml =
    nameParts.length > 1
      ? `${escapeHtml(nameParts.slice(0, -1).join(' '))} <span class="accent">${escapeHtml(nameParts.at(-1))}</span>`
      : escapeHtml(name);

  return `
    <section id="home" class="hero">
      <div class="container">
        <div class="hero-content">
          <span class="hero-status">
            <span class="pulse" aria-hidden="true"></span>
            ${escapeHtml(translate('hero-status'))}
          </span>
          <h1 class="hero-title">${titleHtml}</h1>
          <p class="hero-role">${roleHtml}</p>
          <p class="hero-stack" aria-label="${escapeHtml(stack)}">
            ${renderStackLine(stack)}
          </p>
          <p class="hero-tagline">${escapeHtml(translate('hero-tagline'))}</p>
          <div class="hero-cta">
            <a href="#projects" class="btn btn-primary" data-scroll="projects">
              ${escapeHtml(translate('hero-cta-projects'))}
            </a>
            <a href="#contact" class="btn btn-secondary" data-scroll="contact">
              ${escapeHtml(translate('hero-cta-contact'))}
            </a>
          </div>
          <div class="social-links">
            ${socials
              .map(
                ({ name: socialName, href }) => `
                  <a href="${escapeHtml(href)}" target="_blank" rel="noopener noreferrer" class="social-link">
                    <span>${escapeHtml(socialName)}</span>
                  </a>
                `,
              )
              .join('')}
          </div>
        </div>
      </div>
      <div class="hero-scroll-indicator" aria-hidden="true">
        ${escapeHtml(translate('hero-scroll-hint'))}
      </div>
    </section>
  `;
}
