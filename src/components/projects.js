import { projects } from '@/data/projects.js';
import { escapeHtml } from '@/modules/dom.js';

function renderLink({ href, labelKey, disabled }, translate) {
  const label = escapeHtml(translate(labelKey));
  if (!href || disabled) {
    const suffix = disabled ? '' : ` — ${escapeHtml(translate('project-link-soon'))}`;
    return `<span class="project-link is-disabled" aria-disabled="true">${label}${suffix}</span>`;
  }
  return `
    <a class="project-link" href="${escapeHtml(href)}" target="_blank" rel="noopener noreferrer">
      ${label}
    </a>
  `;
}

export function createProjects({ translate }) {
  return `
    <section id="projects" class="projects">
      <div class="container">
        <div class="section-header">
          <span class="section-eyebrow">04 · ${escapeHtml(translate('projects-title'))}</span>
          <h2 class="section-title">${escapeHtml(translate('projects-title'))}</h2>
          <p class="section-kicker">${escapeHtml(translate('projects-intro'))}</p>
        </div>
        <div class="projects-grid reveal-stagger">
          ${projects
            .map(
              ({ titleKey, statusKey, descKey, stack, links }) => `
                <article class="project-card">
                  <header class="project-header">
                    <span class="project-status">${escapeHtml(translate(statusKey))}</span>
                    <h3 class="project-title">${escapeHtml(translate(titleKey))}</h3>
                  </header>
                  <p class="project-desc">${escapeHtml(translate(descKey))}</p>
                  <p class="project-stack">
                    <span class="project-stack-label">${escapeHtml(translate('project-stack-label'))}</span>
                    ${stack.map((tech) => `<span class="project-tech">${escapeHtml(tech)}</span>`).join('')}
                  </p>
                  <div class="project-links">
                    ${links.map((link) => renderLink(link, translate)).join('')}
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
