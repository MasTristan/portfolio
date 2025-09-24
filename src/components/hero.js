import { heroData } from '@/data/hero.js';

export function createHero({ translate }) {
  const { name, socials } = heroData;

  return `
    <section id="home" class="hero" data-aos="fade-up">
      <div class="container">
        <div class="hero-content">
          <h1 class="hero-title">${name}</h1>
          <div class="hero-subtitle">
            <span>${translate('hero-im')}</span>
            <span class="typing-text"></span>
            <span class="cursor">|</span>
          </div>
          <div class="social-links">
            ${socials
              .map(
                ({ name: socialName, href }) => `
                  <a href="${href}" target="_blank" rel="noopener" class="social-link">
                    <span>${socialName}</span>
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
