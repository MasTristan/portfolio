import { resumeData } from '@/data/resume.js';

export function createResume({ translate }) {
  const { name, download, summary, education, experience } = resumeData;

  return `
    <section id="resume" class="resume" data-aos="fade-up">
      <div class="container">
        <h2 class="section-title">${translate('resume-title')}</h2>
        <div class="resume-download">
          <a href="${download.href}" class="download-btn" target="_blank">
            ${translate(download.labelKey)}
          </a>
        </div>
        <div class="resume-content">
          <div class="resume-summary">
            <h3>${translate(summary.titleKey)}</h3>
            <h4>${name}</h4>
            <p><em>${translate(summary.textKey)}</em></p>
            <ul class="contact-list">
              ${summary.contacts.map((item) => `<li>${item}</li>`).join('')}
            </ul>
          </div>
          <div class="resume-section">
            <h3>${translate('resume-education')}</h3>
            ${education
              .map(
                ({ titleKey, date, institution, description }) => `
                  <div class="resume-item">
                    <div class="resume-header">
                      <h4>${translate(titleKey)}</h4>
                      <span class="date">${date}</span>
                    </div>
                    <h5><em>${institution}</em></h5>
                    <p>${description}</p>
                  </div>
                `,
              )
              .join('')}
          </div>
          <div class="resume-section">
            <h3>${translate('resume-experience')}</h3>
            ${experience
              .map(
                ({ titleKey, date, company, bullets }) => `
                  <div class="resume-item">
                    <div class="resume-header">
                      <h4>${translate(titleKey)}</h4>
                      <span class="date">${date}</span>
                    </div>
                    <h5><em>${company}</em></h5>
                    <ul>
                      ${bullets.map((key) => `<li>${translate(key)}</li>`).join('')}
                    </ul>
                  </div>
                `,
              )
              .join('')}
          </div>
        </div>
      </div>
    </section>
  `;
}
