import { contactData } from '@/data/contact.js';
import { escapeHtml } from '@/modules/dom.js';

export function createContact({ translate }) {
  const { email, linkedin, github } = contactData;

  return `
    <section id="contact" class="contact" data-aos="fade-up">
      <div class="container">
        <h2 class="section-title">${escapeHtml(translate('contact-title'))}</h2>
        <div class="contact-content">
          <p class="contact-blurb">${escapeHtml(translate('contact-blurb-1'))}</p>
          <p class="contact-blurb">${escapeHtml(translate('contact-blurb-2'))}</p>
          <ul class="contact-links">
            <li>
              <span class="contact-label">${escapeHtml(translate('contact-email-label'))}:</span>
              <a href="mailto:${escapeHtml(email)}">${escapeHtml(email)}</a>
            </li>
            <li>
              <span class="contact-label">${escapeHtml(translate('contact-linkedin-label'))}:</span>
              <a href="${escapeHtml(linkedin)}" target="_blank" rel="noopener noreferrer">${escapeHtml(linkedin.replace(/^https?:\/\//, ''))}</a>
            </li>
            <li>
              <span class="contact-label">${escapeHtml(translate('contact-github-label'))}:</span>
              <a href="${escapeHtml(github)}" target="_blank" rel="noopener noreferrer">${escapeHtml(github.replace(/^https?:\/\//, ''))}</a>
            </li>
          </ul>
        </div>
      </div>
    </section>
  `;
}
