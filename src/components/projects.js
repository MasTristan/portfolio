import { projects } from '@/data/projects.js';
import { escapeHtml } from '@/modules/dom.js';
import { renderProjectVisual } from '@/components/projectVisuals.js';

function renderLink({ href, labelKey }, translate) {
  if (!href) return '';
  const label = escapeHtml(translate(labelKey));
  return `
    <a class="project-link" href="${escapeHtml(href)}" target="_blank" rel="noopener noreferrer">
      ${label} ↗
    </a>
  `;
}

export function createProjects({ translate }) {
  return `
    <section id="projects" class="projects">
      <div class="container">
        <header class="section-header">
          <span class="section-overline">${escapeHtml(translate('projects-overline'))}</span>
          <h2 class="section-title">${escapeHtml(translate('projects-title'))}</h2>
          <span class="section-index">04</span>
        </header>
        <p class="projects-intro">${escapeHtml(translate('projects-intro'))}</p>
        <div class="projects-list reveal-stagger">
          ${projects
            .map(
              ({ titleKey, statusKey, statusKind, descKey, stack, links, viz }, index) => {
                const title = translate(titleKey);
                const visual = renderProjectVisual(viz);
                const renderedLinks = links.map((link) => renderLink(link, translate)).join('');
                return `
                <article class="project-item" data-tilt>
                  <span class="project-number">${String(index + 1).padStart(2, '0')}</span>
                  <div class="project-body">
                    <div class="project-header">
                      <h3 class="project-title">${escapeHtml(title)}</h3>
                      <span class="project-status${statusKind === 'live' ? ' is-live' : ''}">${escapeHtml(translate(statusKey))}</span>
                    </div>
                    <p class="project-desc">${escapeHtml(translate(descKey))}</p>
                    <p class="project-stack">
                      <span class="project-stack-label">${escapeHtml(translate('project-stack-label'))}</span><span class="project-stack-tokens">${stack
                        .map((tech) => `<span class="project-tech">${escapeHtml(tech)}</span>`)
                        .join('')}</span>
                    </p>
                    ${renderedLinks ? `<div class="project-links">${renderedLinks}</div>` : ''}
                  </div>
                  ${visual
                    ? `<figure class="project-viz" aria-hidden="false">${visual}</figure>`
                    : ''}
                </article>
              `;
              },
            )
            .join('')}
        </div>
      </div>
    </section>
  `;
}
