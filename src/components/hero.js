import { heroData } from '@/data/hero.js';
import { escapeHtml } from '@/modules/dom.js';

export function createHero({ translate }) {
  const { name, socials } = heroData;

  return `
    <section id="home" class="hero" data-aos="fade-up">
      <div class="container">
        <div class="hero-content">
          <h1 class="hero-title">${escapeHtml(name)}</h1>
          <p class="hero-role">${escapeHtml(translate('hero-role'))}</p>
          <p class="hero-stack">${escapeHtml(translate('hero-stack'))}</p>
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
    </section>
  `;
}
