let revealObserver;
let headerScrollBound = false;

const REVEAL_SELECTOR = '.reveal, .reveal-stagger';

export function initScrollAnimations() {
  initSectionReveal();
}

export function initSectionReveal() {
  document.querySelectorAll('section').forEach((section) => {
    if (
      !section.classList.contains('reveal') &&
      !section.classList.contains('reveal-stagger') &&
      !section.classList.contains('no-reveal')
    ) {
      section.classList.add('reveal');
    }
  });

  if (revealObserver) {
    revealObserver.disconnect();
  }

  // Failsafe: if IntersectionObserver is unavailable, reveal everything now
  // so content can never get stuck invisible.
  if (!('IntersectionObserver' in window)) {
    document
      .querySelectorAll(REVEAL_SELECTOR)
      .forEach((element) => element.classList.add('visible'));
    bindHeaderScrollState();
    return;
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
    { threshold: 0.08, rootMargin: '0px 0px -40px 0px' },
  );

  document
    .querySelectorAll(REVEAL_SELECTOR)
    .forEach((element) => revealObserver.observe(element));

  bindHeaderScrollState();
}

function bindHeaderScrollState() {
  if (headerScrollBound) {
    return;
  }
  headerScrollBound = true;

  const apply = () => {
    const header = document.querySelector('.header');
    if (!header) {
      return;
    }
    header.classList.toggle('is-scrolled', window.pageYOffset > 12);
  };

  apply();
  window.addEventListener('scroll', apply, { passive: true });
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
      placeholder.style.cssText = `
        width: ${img.width || 100}px;
        height: ${img.height || 100}px;
        display: flex;
        align-items: center;
        justify-content: center;
        background: var(--bg-dark);
        color: var(--text-muted);
        font-size: 12px;
        border-radius: 4px;
      `;

      if (img.parentNode) {
        img.parentNode.replaceChild(placeholder, img);
      }
    });
  });
}
