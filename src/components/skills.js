import { skillCategories } from '@/data/skills.js';
import { escapeHtml } from '@/modules/dom.js';

export function createSkills({ translate }) {
  return `
    <section id="skills" class="skills">
      <div class="container">
        <div class="section-header">
          <span class="section-eyebrow">03 · ${escapeHtml(translate('skills-title'))}</span>
          <h2 class="section-title">${escapeHtml(translate('skills-title'))}</h2>
        </div>
        <div class="skills-grid reveal-stagger">
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
