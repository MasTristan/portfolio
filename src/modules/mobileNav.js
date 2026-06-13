export function initMobileNav({ translate }) {
  const toggle = document.getElementById('nav-toggle');
  const nav = document.getElementById('mobile-nav');
  if (!toggle || !nav) return;

  function close() {
    toggle.setAttribute('aria-expanded', 'false');
    toggle.setAttribute('aria-label', translate('nav-menu-open'));
    nav.classList.remove('is-open');
    document.body.classList.remove('mobile-nav-open');
  }

  function open() {
    toggle.setAttribute('aria-expanded', 'true');
    toggle.setAttribute('aria-label', translate('nav-menu-close'));
    nav.classList.add('is-open');
    document.body.classList.add('mobile-nav-open');
  }

  toggle.addEventListener('click', () => {
    const isOpen = toggle.getAttribute('aria-expanded') === 'true';
    if (isOpen) {
      close();
    } else {
      open();
    }
  });

  nav.querySelectorAll('[data-scroll]').forEach((link) => {
    link.addEventListener('click', close);
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && toggle.getAttribute('aria-expanded') === 'true') {
      close();
      toggle.focus();
    }
  });
}
