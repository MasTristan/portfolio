import { experienceData } from '@/data/experience.js';
import { escapeHtml } from '@/modules/dom.js';

export function createExperience({ translate }) {
  return `
    <section id="experience" class="experience" data-aos="fade-up">
      <div class="container">
        <h2 class="section-title">${escapeHtml(translate('experience-title'))}</h2>
        <div class="experience-list">
          ${experienceData
            .map(
              ({ titleKey, employerKey, periodKey, locationKey, bulletKeys }) => `
                <article class="experience-item">
                  <header class="experience-header">
                    <h3 class="experience-title">${escapeHtml(translate(titleKey))}</h3>
                    <span class="experience-period">${escapeHtml(translate(periodKey))}</span>
                  </header>
                  <p class="experience-meta">
                    <span class="experience-employer">${escapeHtml(translate(employerKey))}</span>
                    <span class="experience-location">${escapeHtml(translate(locationKey))}</span>
                  </p>
                  <ul class="experience-bullets">
                    ${bulletKeys
                      .map((key) => `<li>${escapeHtml(translate(key))}</li>`)
                      .join('')}
                  </ul>
                </article>
              `,
            )
            .join('')}
        </div>
      </div>
    </section>
  `;
}
