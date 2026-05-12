import { skillCategories } from '@/data/skills.js';
import { escapeHtml } from '@/modules/dom.js';

export function createSkills({ translate }) {
  return `
    <section id="skills" class="skills">
      <div class="container">
        <header class="section-header">
          <h2 class="section-title">${escapeHtml(translate('skills-title'))}</h2>
          <span class="section-index">§ 03</span>
        </header>
        <div class="skills-grid reveal-stagger">
          ${skillCategories
            .map(
              ({ titleKey, skills }) => `
                <div class="skill-category">
                  <p class="skill-category-label">${escapeHtml(translate(titleKey))}</p>
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
