import { testimonials } from '@/data/testimonials.js';

export function createTestimonials({ translate }) {
  return `
    <section id="testimonials" class="testimonials" data-aos="fade-up">
      <div class="container">
        <h2 class="section-title">${translate('testimonials-title')}</h2>
        <div class="testimonials-grid">
          ${testimonials
            .map(
              ({ image, nameKey, roleKey, textKey }) => `
                <div class="testimonial-item">
                  <div class="testimonial-image">
                    <img src="${image}" alt="${translate(nameKey)}" loading="lazy" decoding="async" />
                  </div>
                  <div class="testimonial-content">
                    <h3>${translate(nameKey)}</h3>
                    <h4>${translate(roleKey)}</h4>
                    <p>${translate(textKey)}</p>
                  </div>
                </div>
              `,
            )
            .join('')}
        </div>
      </div>
    </section>
  `;
}
