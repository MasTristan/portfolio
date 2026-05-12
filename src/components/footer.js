import { escapeHtml } from '@/modules/dom.js';

export function createFooter({ translate }) {
  return `
    <footer class="footer">
      <div class="container container--wide">
        <div class="footer-content">
          <div class="footer-mark">
            <span class="footer-mark-glyph" aria-hidden="true">TM</span>
            <span class="footer-mark-text">Tristan Mas</span>
            <span class="footer-mark-role">${escapeHtml(translate('footer-role'))}</span>
          </div>

          <hr class="footer-rule" />

          <dl class="colophon" aria-label="Colophon">
            <dt>colophon</dt>
            <dd>${escapeHtml(translate('colophon-set-in'))}.</dd>
            <dt>build</dt>
            <dd>${escapeHtml(translate('colophon-built-from'))} · Vite · vanilla JS · no tracker.</dd>
            <dt>shortcuts</dt>
            <dd>
              <kbd>j</kbd>/<kbd>k</kbd> sections · <kbd>g</kbd>/<kbd>G</kbd> top/bottom · <kbd>t</kbd> theme · <kbd>l</kbd> language
            </dd>
          </dl>

          <p class="footer-rights">${escapeHtml(translate('footer-rights'))}</p>
        </div>
      </div>
    </footer>
  `;
}
