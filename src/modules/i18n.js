import en from '@/data/translations-en.json';
import fr from '@/data/translations-fr.json';

const translations = { en, fr };
const fallbackLang = 'en';
let currentLang = fallbackLang;
const listeners = new Set();

function applyLanguage(lang, notify = true) {
  const hasLang = Object.prototype.hasOwnProperty.call(translations, lang);
  const nextLang = hasLang ? lang : fallbackLang;
  const changed = nextLang !== currentLang;
  currentLang = nextLang;

  document.documentElement.setAttribute('lang', currentLang);
  localStorage.setItem('lang', currentLang);

  if (notify && changed) {
    listeners.forEach((listener) => listener(currentLang));
  }
}

export function initI18n() {
  const stored = localStorage.getItem('lang');
  const browser = navigator.language ? navigator.language.split('-')[0] : null;
  const initial = stored && translations[stored] ? stored : browser && translations[browser] ? browser : fallbackLang;

  applyLanguage(initial, false);
  return currentLang;
}

export function translate(key) {
  const langStrings = translations[currentLang] ?? translations[fallbackLang] ?? {};
  const value = langStrings[key];

  if (value !== undefined) {
    return Array.isArray(value) ? [...value] : value;
  }

  const fallback = translations[fallbackLang]?.[key];
  return Array.isArray(fallback) ? [...fallback] : fallback ?? key;
}

export function setLanguage(lang) {
  applyLanguage(lang);
}

export function getCurrentLang() {
  return currentLang;
}

export function onLanguageChange(callback) {
  listeners.add(callback);
  return () => listeners.delete(callback);
}
