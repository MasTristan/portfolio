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
import { initPortfolioFilters } from '@/modules/portfolioFilters.js';
import { initContactForm } from '@/modules/contactForm.js';
import { initTypingEffect } from '@/modules/typing.js';
import { initHeroCarousel } from '@/modules/heroCarousel.js';
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

const CONTACT_FORM_FIELDS = ['name', 'email', 'subject', 'message'];

function snapshotContactForm() {
  const form = document.getElementById('contactForm');
  if (!form) {
    return null;
  }
  const data = {};
  for (const field of CONTACT_FORM_FIELDS) {
    const input = form.elements.namedItem(field);
    if (input && 'value' in input) {
      data[field] = input.value;
    }
  }
  return data;
}

function restoreContactForm(snapshot) {
  if (!snapshot) {
    return;
  }
  const form = document.getElementById('contactForm');
  if (!form) {
    return;
  }
  for (const field of CONTACT_FORM_FIELDS) {
    const input = form.elements.namedItem(field);
    if (input && 'value' in input && snapshot[field]) {
      input.value = snapshot[field];
    }
  }
}

function render() {
  const context = {
    translate,
    currentLang: getCurrentLang(),
    theme: getCurrentTheme(),
  };

  const formSnapshot = snapshotContactForm();
  const scrollY = window.pageYOffset;

  document
    .querySelectorAll('[data-hero-carousel]')
    .forEach((carousel) => carousel.dispatchEvent(new Event('carousel:destroy')));

  app.innerHTML = renderApp(context);

  bindLanguageSwitcher();
  bindThemeToggle(translate);
  initNavigation();
  initPortfolioFilters();
  initContactForm(translate);
  initHeroCarousel();
  initTypingEffect(translate('typing-texts'));
  initScrollAnimations();
  initSectionReveal();
  initImageFallbacks(translate);
  initScrollToTop();

  restoreContactForm(formSnapshot);
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
