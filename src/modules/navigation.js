const HIDE_AFTER_SCROLL_PX = 100;

let navObserver;
let headerScrollBound = false;
let headerSizeBound = false;
let lastScrollY = 0;

// Keep the CSS scroll-padding in sync with the real header height so anchor
// targets always clear the sticky header (desktop and mobile alike).
function syncHeaderHeight() {
  const header = document.querySelector('.header');
  if (!header) {
    return;
  }
  document.documentElement.style.setProperty('--header-h', `${header.offsetHeight}px`);
}

function handleHeaderScroll() {
  const header = document.querySelector('.header');
  if (!header) {
    return;
  }
  const currentScrollY = window.pageYOffset;
  if (currentScrollY > lastScrollY && currentScrollY > HIDE_AFTER_SCROLL_PX) {
    header.style.transform = 'translateY(-100%)';
  } else {
    header.style.transform = 'translateY(0)';
  }
  lastScrollY = currentScrollY;
}

export function initNavigation() {
  const links = document.querySelectorAll('[data-scroll]');
  const header = document.querySelector('.header');

  links.forEach((link) => {
    link.addEventListener('click', (event) => {
      event.preventDefault();
      const targetId = link.getAttribute('data-scroll');
      const target = targetId ? document.getElementById(targetId) : null;
      if (!target) {
        return;
      }

      const headerHeight = header ? header.offsetHeight : 0;
      const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - headerHeight;

      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth',
      });
    });
  });

  if (navObserver) {
    navObserver.disconnect();
  }

  const sections = Array.from(links)
    .map((link) => document.getElementById(link.getAttribute('data-scroll') ?? ''))
    .filter(Boolean);

  navObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const activeId = entry.target.id;
          links.forEach((link) => {
            link.classList.toggle('active', link.getAttribute('data-scroll') === activeId);
          });
        }
      });
    },
    { rootMargin: '-50% 0px -50% 0px' },
  );

  sections.forEach((section) => navObserver.observe(section));

  if (links.length > 0) {
    links[0].classList.add('active');
  }

  if (header) {
    header.style.transform = 'translateY(0)';
  }

  syncHeaderHeight();

  if (!headerSizeBound) {
    window.addEventListener('resize', syncHeaderHeight, { passive: true });
    headerSizeBound = true;
  }

  if (!headerScrollBound) {
    lastScrollY = window.pageYOffset;
    window.addEventListener('scroll', handleHeaderScroll, { passive: true });
    headerScrollBound = true;
  }
}
