const VISIBILITY_THRESHOLD_PX = 300;

let scrollButton;

function updateVisibility() {
  if (!scrollButton) {
    return;
  }
  const visible = window.pageYOffset > VISIBILITY_THRESHOLD_PX;
  scrollButton.style.opacity = visible ? '1' : '0';
  scrollButton.style.visibility = visible ? 'visible' : 'hidden';
}

export function initScrollToTop() {
  if (scrollButton) {
    updateVisibility();
    return;
  }

  scrollButton = document.createElement('button');
  scrollButton.type = 'button';
  scrollButton.className = 'scroll-to-top';
  scrollButton.textContent = '↑';
  scrollButton.setAttribute('aria-label', 'Scroll to top');

  scrollButton.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  document.body.appendChild(scrollButton);
  window.addEventListener('scroll', updateVisibility, { passive: true });
  updateVisibility();
}
