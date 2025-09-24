import { skillCategories } from '@/data/skills.js';

export function createSkills({ translate }) {
  return `
    <section id="skills" class="skills" data-aos="fade-up">
      <div class="container">
        <h2 class="section-title">${translate('skills-title')}</h2>
        <p class="skills-description">${translate('skills-description')}</p>
        <div class="skills-grid">
          ${skillCategories
            .map(
              ({ titleKey, icons }) => `
                <div class="skill-category">
                  <h4>${translate(titleKey)}</h4>
                  <div class="skill-icons">
                    ${icons
                      .map(
                        ({ href, label, src, title }) => `
                          <a href="${href}" target="_blank" rel="noopener" aria-label="${label}">
                            <img src="${src}" alt="${label}" title="${title}" />
                          </a>
                        `,
                      )
                      .join('')}
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
