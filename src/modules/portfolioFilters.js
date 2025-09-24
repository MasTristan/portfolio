export function initPortfolioFilters() {
  const filterButtons = document.querySelectorAll('.filter-btn');
  const items = document.querySelectorAll('.portfolio-item');

  filterButtons.forEach((button) => {
    button.addEventListener('click', () => {
      const filter = button.getAttribute('data-filter');

      filterButtons.forEach((btn) => btn.classList.remove('active'));
      button.classList.add('active');

      items.forEach((item) => {
        const category = item.getAttribute('data-category');
        const shouldShow = filter === 'all' || category === filter;
        item.style.display = shouldShow ? 'block' : 'none';
        item.classList.toggle('fade-in', shouldShow);
      });
    });
  });
}
