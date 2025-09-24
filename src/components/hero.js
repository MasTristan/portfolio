import { heroData } from '@/data/hero.js';
import { heroCarouselSlides } from '@/data/heroCarousel.js';

export function createHero({ translate, currentLang }) {
  const { name, socials } = heroData;
  const painLabel = translate('carousel-pain-label');
  const solutionLabel = translate('carousel-solution-label');
  const slides = heroCarouselSlides.map(({ id, en, fr }) => {
    const locale = currentLang === 'fr' ? fr : en;
    return {
      id,
      pain: locale.pain,
      solution: locale.solution,
    };
  });

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
          <div
            class="hero-carousel"
            data-hero-carousel
            role="region"
            aria-label="${translate('carousel-label')}"
          >
            <button
              type="button"
              class="carousel-arrow carousel-arrow--prev"
              data-carousel-prev
              aria-label="${translate('carousel-previous')}"
            >
              <span aria-hidden="true">&#8592;</span>
            </button>
            <div
              class="hero-carousel-track"
              data-carousel-track
              aria-live="polite"
              aria-atomic="true"
            >
              ${slides
                .map(({ id, pain, solution }, index) => {
                  const slideId = `hero-carousel-${id}`;
                  return `
                    <article
                      id="${slideId}"
                      class="carousel-slide${index === 0 ? ' is-active' : ''}"
                      data-slide
                      aria-hidden="${index === 0 ? 'false' : 'true'}"
                      tabindex="${index === 0 ? '0' : '-1'}"
                      aria-roledescription="slide"
                    >
                      <div class="slide-card">
                        <div class="slide-panel slide-pain">
                          <span class="slide-panel-label">${painLabel}</span>
                          <p class="slide-panel-text">${pain}</p>
                        </div>
                        <div class="slide-connector" aria-hidden="true">
                          <span class="slide-connector-line"></span>
                          <span class="slide-connector-icon">&#8594;</span>
                          <span class="slide-connector-line"></span>
                        </div>
                        <div class="slide-panel slide-solution">
                          <span class="slide-panel-label">${solutionLabel}</span>
                          <p class="slide-panel-text slide-panel-text--solution">
                            <span class="slide-solution-text">${solution}</span>
                            <span class="slide-solution-underline" aria-hidden="true"></span>
                          </p>
                        </div>
                      </div>
                    </article>
                  `;
                })
                .join('')}
            </div>
            <button
              type="button"
              class="carousel-arrow carousel-arrow--next"
              data-carousel-next
              aria-label="${translate('carousel-next')}"
            >
              <span aria-hidden="true">&#8594;</span>
            </button>
            <div class="carousel-dots" role="tablist" aria-label="${translate('carousel-dots-label')}">
              ${slides
                .map(({ id }, index) => {
                  const slideId = `hero-carousel-${id}`;
                  return `
                    <button
                      type="button"
                      class="carousel-dot${index === 0 ? ' is-active' : ''}"
                      data-carousel-dot
                      data-target="${slideId}"
                      aria-label="${translate('carousel-slide')} ${index + 1}"
                      aria-controls="${slideId}"
                      ${index === 0 ? 'aria-current="true"' : ''}
                    >
                      <svg class="dot-progress" viewBox="0 0 20 20" aria-hidden="true" focusable="false">
                        <circle class="dot-track" cx="10" cy="10" r="8"></circle>
                        <circle class="dot-indicator" cx="10" cy="10" r="8"></circle>
                      </svg>
                    </button>
                  `;
                })
                .join('')}
            </div>
          </div>
        </div>
      </div>
    </section>
  `;
}
