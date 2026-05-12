import { portfolioFilters, portfolioItems } from '@/data/portfolio.js';

export function createPortfolio({ translate }) {
  return `
    <section id="portfolio" class="portfolio" data-aos="fade-up">
      <div class="container">
        <h2 class="section-title">${translate('portfolio-title')}</h2>
        <p class="portfolio-description">${translate('portfolio-description')}</p>
        <div class="portfolio-filters">
          ${portfolioFilters
            .map(
              ({ id, labelKey }) => `
                <button class="filter-btn${id === 'all' ? ' active' : ''}" data-filter="${id}">
                  ${translate(labelKey)}
                </button>
              `,
            )
            .join('')}
        </div>
        <div class="portfolio-grid">
          ${portfolioItems
            .map(
              ({ category, image, titleKey, descriptionKey, tech }) => `
                <div class="portfolio-item" data-category="${category}">
                  <div class="portfolio-image">
                    <img src="${image}" alt="${translate(titleKey)}" loading="lazy" decoding="async" />
                  </div>
                  <div class="portfolio-content">
                    <h4>${translate(titleKey)}</h4>
                    <p class="portfolio-tech">${tech}</p>
                    <p>${translate(descriptionKey)}</p>
                  </div>
                </div>
              `,
            )
            .join('')}
        </div>
      </div>
    </section>
  `;
}
