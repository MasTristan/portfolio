import { navItems } from '@/data/navigation.js';
import { escapeHtml } from '@/modules/dom.js';

export function createSideNav({ translate }) {
  return `
    <nav class="side-nav" aria-label="${escapeHtml(translate('nav-aria-sections'))}">
      ${navItems
        .map(
          ({ id, icon, labelKey }) => `
            <a
              href="#${id}"
              class="nav-circle"
              data-scroll="${id}"
              aria-label="${escapeHtml(translate(labelKey))}"
            >
              <span class="nav-icon">${icon}</span>
              <span class="nav-text">${escapeHtml(translate(labelKey))}</span>
            </a>
          `,
        )
        .join('')}
    </nav>
  `;
}
