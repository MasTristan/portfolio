import { navItems } from '@/data/navigation.js';
import { escapeHtml } from '@/modules/dom.js';

export function createMobileNav({ translate }) {
  return `
    <nav class="mobile-nav" id="mobile-nav" aria-label="${escapeHtml(translate('nav-aria-sections'))}">
      <div class="container">
        <ul class="mobile-nav-list">
          ${navItems
            .map(
              ({ id, icon, labelKey }) => `
                <li>
                  <a href="#${id}" class="mobile-nav-link" data-scroll="${id}">
                    <span class="mobile-nav-icon" aria-hidden="true">${icon}</span>
                    <span>${escapeHtml(translate(labelKey))}</span>
                  </a>
                </li>
              `,
            )
            .join('')}
        </ul>
      </div>
    </nav>
  `;
}
