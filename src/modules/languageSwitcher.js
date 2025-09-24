import { setLanguage, getCurrentLang } from '@/modules/i18n.js';

export function bindLanguageSwitcher() {
  const currentLang = getCurrentLang();

  document.querySelectorAll('.lang-link').forEach((link) => {
    const lang = link.getAttribute('data-lang');
    link.classList.toggle('active', lang === currentLang);
    link.addEventListener('click', (event) => {
      event.preventDefault();
      if (lang) {
        setLanguage(lang);
      }
    });
  });
}
