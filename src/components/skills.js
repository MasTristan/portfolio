import { skillCategories } from '@/data/skills.js';
import { escapeHtml } from '@/modules/dom.js';

export function createSkills({ translate }) {
  return `
    <section id="skills" class="skills" data-aos="fade-up">
      <div class="container">
        <h2 class="section-title">${escapeHtml(translate('skills-title'))}</h2>
        <div class="skills-grid">
          ${skillCategories
            .map(
              ({ titleKey, skills }) => `
                <div class="skill-category">
                  <h3>${escapeHtml(translate(titleKey))}</h3>
                  <ul class="skill-chips">
                    ${skills
                      .map(({ label }) => `<li class="skill-chip">${escapeHtml(label)}</li>`)
                      .join('')}
                  </ul>
                </div>
              `,
            )
            .join('')}
        </div>
      </div>
    </section>
  `;
}
