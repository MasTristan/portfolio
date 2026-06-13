import { projects } from '@/data/projects.js';
import { escapeHtml } from '@/modules/dom.js';

function renderLink({ href, labelKey }, translate) {
  if (!href) return '';
  const label = escapeHtml(translate(labelKey));
  return `
    <a class="project-link" href="${escapeHtml(href)}" target="_blank" rel="noopener noreferrer">
      ${label} ↗
    </a>
  `;
}

const CASE_FIELDS = [
  { key: 'contextKey', labelKey: 'project-context-label' },
  { key: 'problemKey', labelKey: 'project-problem-label' },
  { key: 'solutionKey', labelKey: 'project-solution-label' },
  { key: 'outcomeKey', labelKey: 'project-outcome-label' },
];

function renderCase(project, translate) {
  return CASE_FIELDS.map(
    ({ key, labelKey }) => `
      <div class="project-case-row">
        <dt class="project-case-label">${escapeHtml(translate(labelKey))}</dt>
        <dd class="project-case-text">${escapeHtml(translate(project[key]))}</dd>
      </div>
    `,
  ).join('');
}

export function createProjects({ translate }) {
  return `
    <section id="projects" class="projects">
      <div class="container">
        <header class="section-header">
          <span class="section-overline">${escapeHtml(translate('projects-overline'))}</span>
          <h2 class="section-title">${escapeHtml(translate('projects-title'))}</h2>
          <span class="section-index">05</span>
        </header>
        <p class="projects-intro">${escapeHtml(translate('projects-intro'))}</p>
        <div class="projects-list reveal-stagger">
          ${projects
            .map((project, index) => {
              const { titleKey, statusKey, statusKind, stack, links, slug, screenshotAltKey } =
                project;
              const title = translate(titleKey);
              const screenshotAlt = translate(screenshotAltKey);
              const renderedLinks = links.map((link) => renderLink(link, translate)).join('');
              return `
                <article class="project-item" data-tilt>
                  <span class="project-number">${String(index + 1).padStart(2, '0')}</span>
                  <div class="project-body">
                    <div class="project-header">
                      <h3 class="project-title">${escapeHtml(title)}</h3>
                      <span class="project-status${statusKind === 'live' ? ' is-live' : ''}">${escapeHtml(translate(statusKey))}</span>
                    </div>
                    <dl class="project-case">
                      ${renderCase(project, translate)}
                    </dl>
                    <p class="project-stack">
                      <span class="project-stack-label">${escapeHtml(translate('project-stack-label'))}</span><span class="project-stack-tokens">${stack
                        .map((tech) => `<span class="project-tech">${escapeHtml(tech)}</span>`)
                        .join('')}</span>
                    </p>
                    ${renderedLinks ? `<div class="project-links">${renderedLinks}</div>` : ''}
                  </div>
                  <figure class="project-shot">
                    <button
                      type="button"
                      class="project-shot-trigger"
                      data-lightbox-trigger
                      data-lightbox-src="img/portfolio/${slug}/desktop.svg"
                      data-lightbox-alt="${escapeHtml(screenshotAlt)}"
                      aria-label="${escapeHtml(translate('project-view-screenshot'))}"
                    >
                      <img
                        class="project-shot-img"
                        src="img/portfolio/${slug}/desktop.svg"
                        alt=""
                        loading="lazy"
                        width="1600"
                        height="900"
                      />
                    </button>
                  </figure>
                </article>
              `;
            })
            .join('')}
        </div>
      </div>
      <div
        class="lightbox"
        id="project-lightbox"
        role="dialog"
        aria-modal="true"
        aria-hidden="true"
        aria-label="${escapeHtml(translate('project-view-screenshot'))}"
      >
        <div class="lightbox-backdrop" data-lightbox-close></div>
        <figure class="lightbox-content">
          <button
            type="button"
            class="lightbox-close"
            data-lightbox-close
            aria-label="${escapeHtml(translate('project-lightbox-close'))}"
          >
            <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true" focusable="false">
              <path d="M5 5l14 14M19 5L5 19" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" />
            </svg>
          </button>
          <img class="lightbox-img" src="" alt="" />
        </figure>
      </div>
    </section>
  `;
}
