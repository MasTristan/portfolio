import { contactData } from '@/data/contact.js';
import { escapeHtml } from '@/modules/dom.js';

export function createContact({ translate }) {
  const { email, linkedin, github } = contactData;

  const link = (href, displayUrl) => `
    <a href="${escapeHtml(href)}" target="_blank" rel="noopener noreferrer">${escapeHtml(displayUrl)}</a>
  `;

  return `
    <section id="contact" class="contact">
      <div class="container">
        <header class="section-header">
          <h2 class="section-title">${escapeHtml(translate('contact-title'))}</h2>
          <span class="section-index">§ 05</span>
        </header>
        <div class="contact-content reveal">
          <p class="contact-blurb">${escapeHtml(translate('contact-blurb-1'))}</p>
          <p class="contact-blurb">${escapeHtml(translate('contact-blurb-2'))}</p>
          <ul class="contact-links">
            <li>
              <span class="contact-label">${escapeHtml(translate('contact-email-label'))}</span>
              <a href="mailto:${escapeHtml(email)}">${escapeHtml(email)}</a>
            </li>
            <li>
              <span class="contact-label">${escapeHtml(translate('contact-linkedin-label'))}</span>
              ${link(linkedin, linkedin.replace(/^https?:\/\//, ''))}
            </li>
            <li>
              <span class="contact-label">${escapeHtml(translate('contact-github-label'))}</span>
              ${link(github, github.replace(/^https?:\/\//, ''))}
            </li>
          </ul>
        </div>
      </div>
    </section>
  `;
}
