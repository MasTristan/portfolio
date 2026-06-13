import { skillCategories } from '@/data/skills.js';
import { escapeHtml } from '@/modules/dom.js';

export function createSkills({ translate }) {
  return `
    <section id="skills" class="skills">
      <div class="container">
        <header class="section-header">
          <span class="section-overline">${escapeHtml(translate('skills-overline'))}</span>
          <h2 class="section-title">${escapeHtml(translate('skills-title'))}</h2>
          <span class="section-index">04</span>
        </header>
        <div class="skills-grid reveal-stagger">
          ${skillCategories
            .map(
              ({ titleKey, skills }) => `
                <div class="skill-category">
                  <h3 class="skill-category-label">${escapeHtml(translate(titleKey))}</h3>
                  <ul class="skill-list">
                    ${skills
                      .map(
                        ({ label, level }) => `
                          <li class="skill-item">
                            <span class="skill-name">${escapeHtml(label)}</span>
                            <span class="skill-level skill-level--${level}">${escapeHtml(translate(`skills-level-${level}`))}</span>
                          </li>
                        `,
                      )
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
