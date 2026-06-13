import '@/styles/main.css';

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
import { initMotion, setMotionLang } from '@/modules/motion.js';
import { initRiskCurve } from '@/modules/riskCurve.js';
import { initLightbox } from '@/modules/lightbox.js';
import { initMobileNav } from '@/modules/mobileNav.js';

const app = document.getElementById('app');

if (!app) {
  throw new Error('App container not found');
}

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
  initMotion({ getLang: getCurrentLang });
  initRiskCurve();
  initLightbox();
  initMobileNav({ translate });

  window.scrollTo(0, scrollY);
}

applyInitialTheme();
initI18n();
render();
updateThemeToggleLabel(translate);

onLanguageChange(() => {
  render();
  updateThemeToggleLabel(translate);
  setMotionLang(getCurrentLang());
  // Re-render replaces #app, so keyboard focus would fall to <body>.
  // Restore it to the active language control to preserve the user's place.
  const active = document.querySelector('.lang-link.active');
  if (active) active.focus();
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
