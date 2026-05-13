import { experienceData } from '@/data/experience.js';
import { escapeHtml } from '@/modules/dom.js';

export function createExperience({ translate }) {
  return `
    <section id="experience" class="experience">
      <div class="container">
        <header class="section-header">
          <span class="section-overline">${escapeHtml(translate('experience-overline'))}</span>
          <h2 class="section-title">${escapeHtml(translate('experience-title'))}</h2>
          <span class="section-index">02</span>
        </header>
        <div class="experience-list reveal-stagger">
          ${experienceData
            .map(
              ({ titleKey, employerKey, periodKey, locationKey, bulletKeys }) => `
                <article class="experience-item">
                  <span class="experience-period">${escapeHtml(translate(periodKey))}</span>
                  <div class="experience-body">
                    <h3 class="experience-title">${escapeHtml(translate(titleKey))}</h3>
                    <p class="experience-meta">
                      <span class="experience-employer">${escapeHtml(translate(employerKey))}</span><span class="experience-location">${escapeHtml(translate(locationKey))}</span>
                    </p>
                    <ul class="experience-bullets">
                      ${bulletKeys
                        .map((key) => `<li>${escapeHtml(translate(key))}</li>`)
                        .join('')}
                    </ul>
                  </div>
                </article>
              `,
            )
            .join('')}
        </div>
      </div>
    </section>
  `;
}
