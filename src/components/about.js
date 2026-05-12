import { aboutData } from '@/data/about.js';
import { escapeHtml } from '@/modules/dom.js';

export function createAbout({ translate }) {
  return `
    <section id="about" class="about" data-aos="fade-up">
      <div class="container">
        <h2 class="section-title">${escapeHtml(translate('about-title'))}</h2>
        <div class="about-content">
          ${aboutData.paragraphKeys
            .map((key) => `<p class="about-paragraph">${escapeHtml(translate(key))}</p>`)
            .join('')}
        </div>
      </div>
    </section>
  `;
}
