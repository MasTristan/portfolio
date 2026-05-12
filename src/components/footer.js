import { escapeHtml } from '@/modules/dom.js';

export function createFooter({ translate }) {
  return `
    <footer class="footer">
      <div class="container">
        <div class="footer-content">
          <h3>Tristan Mas</h3>
          <p>${escapeHtml(translate('footer-role'))}</p>
          <p>${escapeHtml(translate('footer-rights'))}</p>
        </div>
      </div>
    </footer>
  `;
}
