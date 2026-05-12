import 'aos/dist/aos.css';
import '@/styles/main.css';

import AOS from 'aos';
import { renderApp } from '@/components/app.js';
import { initI18n, translate, onLanguageChange, getCurrentLang } from '@/modules/i18n.js';
import {
  applyInitialTheme,
  bindThemeToggle,
  getCurrentTheme,
  updateThemeToggleLabel,
} from '@/modules/theme.js';
import { bindLanguageSwitcher } from '@/modules/languageSwitcher.js';
import { initNavigation } from '@/modules/navigation.js';
import {
  initScrollAnimations,
  initSectionReveal,
  initImageFallbacks,
} from '@/modules/animations.js';
import { initScrollToTop } from '@/modules/scrollToTop.js';

const app = document.getElementById('app');

if (!app) {
  throw new Error('App container not found');
}

let aosInitialized = false;

function render() {
  const context = {
    translate,
    currentLang: getCurrentLang(),
    theme: getCurrentTheme(),
  };

  const scrollY = window.pageYOffset;

  app.innerHTML = renderApp(context);

  bindLanguageSwitcher();
  bindThemeToggle(translate);
  initNavigation();
  initScrollAnimations();
  initSectionReveal();
  initImageFallbacks(translate);
  initScrollToTop();

  window.scrollTo(0, scrollY);

  if (!aosInitialized) {
    AOS.init({ duration: 800, once: true });
    aosInitialized = true;
  } else {
    AOS.refreshHard();
  }
}

applyInitialTheme();
initI18n();
render();
updateThemeToggleLabel(translate);

onLanguageChange(() => {
  render();
  updateThemeToggleLabel(translate);
});

window.addEventListener('error', (event) => {
  console.error('JavaScript error:', event.error);
});

window.addEventListener('unhandledrejection', (event) => {
  console.error('Unhandled promise rejection:', event.reason);
});

if (import.meta.env.DEV) {
  console.log('Portfolio website initialized successfully!');
}
