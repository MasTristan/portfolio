let scrollButton;
let scrollListener;

export function initScrollToTop() {
  if (!scrollButton) {
    scrollButton = document.createElement('button');
    scrollButton.type = 'button';
    scrollButton.className = 'scroll-to-top';
    scrollButton.textContent = '↑';

    scrollButton.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    document.body.appendChild(scrollButton);
  }

  scrollButton.style.opacity = '0';
  scrollButton.style.visibility = 'hidden';

  if (scrollListener) {
    window.removeEventListener('scroll', scrollListener);
  }

  scrollListener = () => {
    if (window.pageYOffset > 300) {
      scrollButton.style.opacity = '1';
      scrollButton.style.visibility = 'visible';
    } else {
      scrollButton.style.opacity = '0';
      scrollButton.style.visibility = 'hidden';
    }
  };

  window.addEventListener('scroll', scrollListener);
}
