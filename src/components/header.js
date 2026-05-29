import { languages } from '@/data/languages.js';

export function createHeader({ translate, currentLang, theme }) {
  const labelKey = theme === 'dark' ? 'theme-toggle-light' : 'theme-toggle-dark';

  return `
    <header class="header">
      <div class="container">
        <div class="header-content">
          <div class="logo">
            <span class="logo-text">Tristan Mas</span>
            <span class="logo-current" data-current-section aria-live="polite"></span>
          </div>
          <nav class="nav">
            <div class="language-switcher">
              ${languages
                .map(
                  ({ code, labelKey: langKey, label }) => `
                    <button
                      type="button"
                      class="lang-link${code === currentLang ? ' active' : ''}"
                      data-lang="${code}"
                      aria-label="${label}"
                      ${code === currentLang ? 'aria-current="true"' : ''}
                    >
                      <span>${translate(langKey)}</span>
                    </button>
                  `,
                )
                .join('')}
            </div>
            <button
              id="theme-toggle"
              class="theme-toggle${theme === 'dark' ? ' is-dark' : ''}"
              type="button"
              aria-label="${translate(labelKey)}"
              aria-pressed="${theme === 'dark'}"
            >
              <span class="switch-track">
                <span class="switch-icon moon" aria-hidden="true">🌙</span>
                <span class="switch-icon sun" aria-hidden="true">☀️</span>
                <span class="switch-thumb" aria-hidden="true"></span>
              </span>
            </button>
          </nav>
        </div>
      </div>
    </header>
  `;
}
