let fadeObserver;
let revealObserver;

export function initScrollAnimations() {
  const elements = document.querySelectorAll(
    '.about-item, .skill-category, .portfolio-item, .testimonial-item, .resume-item',
  );

  if (fadeObserver) {
    fadeObserver.disconnect();
  }

  fadeObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('fade-in');
        }
      });
    },
    { threshold: 0.1, rootMargin: '0px 0px -50px 0px' },
  );

  elements.forEach((element) => fadeObserver.observe(element));
}

export function initSectionReveal() {
  document
    .querySelectorAll('section')
    .forEach((section) => section.classList.add('reveal'));

  if (revealObserver) {
    revealObserver.disconnect();
  }

  revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          revealObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1 },
  );

  document
    .querySelectorAll('.reveal')
    .forEach((element) => revealObserver.observe(element));
}

export function initImageFallbacks(translate) {
  const images = document.querySelectorAll('img');

  images.forEach((img) => {
    if (img.dataset.fallbackBound === 'true') {
      return;
    }

    img.dataset.fallbackBound = 'true';

    img.addEventListener('error', () => {
      const placeholder = document.createElement('div');
      placeholder.className = 'image-placeholder';
      placeholder.textContent = translate('image-not-found');
      placeholder.style.width = `${img.width || 100}px`;
      placeholder.style.height = `${img.height || 100}px`;
      placeholder.style.display = 'flex';
      placeholder.style.alignItems = 'center';
      placeholder.style.justifyContent = 'center';
      placeholder.style.background = '#f0f0f0';
      placeholder.style.color = '#666';
      placeholder.style.fontSize = '12px';
      placeholder.style.borderRadius = '4px';

      if (img.parentNode) {
        img.parentNode.replaceChild(placeholder, img);
      }
    });
  });
}
