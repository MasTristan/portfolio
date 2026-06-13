const TRIGGER_SELECTOR = '[data-lightbox-trigger]';
const CLOSE_SELECTOR = '[data-lightbox-close]';

export function initLightbox() {
  const lightbox = document.getElementById('project-lightbox');
  if (!lightbox) return;

  const image = lightbox.querySelector('.lightbox-img');
  let activeTrigger = null;

  function onKeydown(event) {
    if (event.key === 'Escape') {
      close();
    }
  }

  function open(trigger) {
    const src = trigger.dataset.lightboxSrc;
    if (!src) return;

    image.src = src;
    image.alt = trigger.dataset.lightboxAlt || '';
    activeTrigger = trigger;

    lightbox.classList.add('is-open');
    lightbox.setAttribute('aria-hidden', 'false');
    document.body.classList.add('lightbox-open');
    document.addEventListener('keydown', onKeydown);

    lightbox.querySelector('.lightbox-close')?.focus();
  }

  function close() {
    lightbox.classList.remove('is-open');
    lightbox.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('lightbox-open');
    document.removeEventListener('keydown', onKeydown);
    image.removeAttribute('src');

    activeTrigger?.focus();
    activeTrigger = null;
  }

  document.querySelectorAll(TRIGGER_SELECTOR).forEach((trigger) => {
    trigger.addEventListener('click', () => open(trigger));
  });

  lightbox.querySelectorAll(CLOSE_SELECTOR).forEach((element) => {
    element.addEventListener('click', close);
  });
}
