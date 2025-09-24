import { aboutData } from '@/data/about.js';

export function createAbout({ translate }) {
  const { profileImage, cards, info } = aboutData;

  return `
    <section id="about" class="about" data-aos="fade-up">
      <div class="container">
        <h2 class="section-title">${translate('about-title')}</h2>
        <div class="about-content">
          <div class="about-text">
            <p class="about-description">${translate('about-description')}</p>
            <div class="about-grid">
              ${cards
                .map((card, index) => {
                  const iconMarkup = card.icon
                    ? `
                        <div class="about-icon">
                          <img src="${card.icon.src}" alt="${card.icon.alt}" class="${card.icon.className ?? ''}" />
                        </div>
                      `
                    : '';

                  return `
                    <div class="about-item${index === 0 ? ' about-item--full' : ''}">
                      ${iconMarkup}
                      <h5>${translate(card.titleKey)}</h5>
                      <p>${translate(card.contentKey)}</p>
                    </div>
                  `;
                })
                .join('')}
            </div>
          </div>
          <div class="about-info">
            <div class="profile-image">
              <img src="${profileImage}" alt="Tristan Mas" />
            </div>
            <div class="personal-info">
              ${info
                .map(({ labelKey, value, valueKey }) => `
                  <div class="info-item">
                    <strong>${translate(labelKey)}</strong>
                    ${valueKey ? translate(valueKey) : value}
                  </div>
                `)
                .join('')}
            </div>
            <p class="about-summary">${translate('about-summary')}</p>
          </div>
        </div>
      </div>
    </section>
  `;
}
