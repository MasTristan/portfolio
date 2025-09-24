let navObserver;
let headerScrollHandler;

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

  initMobileHeader(header);
}

function initMobileHeader(header) {
  if (!header) {
    return;
  }

  header.style.transform = 'translateY(0)';

  if (headerScrollHandler) {
    window.removeEventListener('scroll', headerScrollHandler);
  }

  let lastScrollY = window.pageYOffset;

  headerScrollHandler = () => {
    const currentScrollY = window.pageYOffset;

    if (currentScrollY > lastScrollY && currentScrollY > 100) {
      header.style.transform = 'translateY(-100%)';
    } else {
      header.style.transform = 'translateY(0)';
    }

    lastScrollY = currentScrollY;
  };

  window.addEventListener('scroll', headerScrollHandler);
}
