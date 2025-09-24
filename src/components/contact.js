import { contactData } from '@/data/contact.js';

export function createContact({ translate }) {
  const { email, phone } = contactData;

  return `
    <section id="contact" class="contact" data-aos="fade-up">
      <div class="container">
        <h2 class="section-title">${translate('contact-title')}</h2>
        <div class="contact-content">
          <div class="contact-info">
            <div class="contact-item">
              <h4>${translate('contact-email-label')}</h4>
              <p>${email}</p>
            </div>
            <div class="contact-item">
              <h4>${translate('contact-phone-label')}</h4>
              <p>${phone}</p>
            </div>
          </div>
          <form class="contact-form" id="contactForm">
            <div class="form-group">
              <input
                type="text"
                id="name"
                name="name"
                placeholder="${translate('form-name')}"
                required
              />
            </div>
            <div class="form-group">
              <input
                type="email"
                id="email"
                name="email"
                placeholder="${translate('form-email')}"
                required
              />
            </div>
            <div class="form-group">
              <input
                type="text"
                id="subject"
                name="subject"
                placeholder="${translate('form-subject')}"
                required
              />
            </div>
            <div class="form-group">
              <textarea
                id="message"
                name="message"
                placeholder="${translate('form-message')}"
                rows="5"
                required
              ></textarea>
            </div>
            <button type="submit" class="submit-btn">${translate('form-send')}</button>
            <div id="form-status" class="form-status"></div>
          </form>
        </div>
      </div>
    </section>
  `;
}
