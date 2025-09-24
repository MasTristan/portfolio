export function createFooter({ translate }) {
  return `
    <footer class="footer">
      <div class="container">
        <div class="footer-content">
          <h3>Tristan Mas</h3>
          <p>${translate('footer-role')}</p>
          <p>${translate('footer-rights')}</p>
        </div>
      </div>
    </footer>
  `;
}
