import { navItems } from '@/data/navigation.js';

export function createSideNav({ translate }) {
  return `
    <nav class="side-nav">
      ${navItems
        .map(
          ({ id, icon, labelKey }) => `
            <a
              href="#${id}"
              class="nav-circle"
              data-scroll="${id}"
              aria-label="${translate(labelKey)}"
            >
              <span class="nav-icon">${icon}</span>
              <span class="nav-text">${translate(labelKey)}</span>
            </a>
          `,
        )
        .join('')}
    </nav>
  `;
}
