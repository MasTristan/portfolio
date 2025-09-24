const THEME_KEY = 'theme';
let currentTheme = 'light';

function determineInitialTheme() {
  const stored = localStorage.getItem(THEME_KEY);
  if (stored === 'light' || stored === 'dark') {
    return stored;
  }

  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  return prefersDark ? 'dark' : 'light';
}

function applyTheme(theme) {
  currentTheme = theme;
  document.documentElement.setAttribute('data-theme', currentTheme);
  localStorage.setItem(THEME_KEY, currentTheme);
}

export function applyInitialTheme() {
  const initial = determineInitialTheme();
  document.documentElement.setAttribute('data-theme', initial);
  currentTheme = initial;
  return currentTheme;
}

export function bindThemeToggle(translate) {
  const button = document.getElementById('theme-toggle');
  if (!button) {
    return;
  }

  const updateButtonState = () => {
    const isDark = currentTheme === 'dark';
    button.classList.toggle('is-dark', isDark);
    button.setAttribute('aria-pressed', String(isDark));
    const labelKey = isDark ? 'theme-toggle-light' : 'theme-toggle-dark';
    button.setAttribute('aria-label', translate(labelKey));
  };

  updateButtonState();

  button.addEventListener('click', () => {
    const nextTheme = currentTheme === 'dark' ? 'light' : 'dark';
    applyTheme(nextTheme);
    updateButtonState();
  });
}

export function updateThemeToggleLabel(translate) {
  const button = document.getElementById('theme-toggle');
  if (!button) {
    return;
  }

  const isDark = currentTheme === 'dark';
  button.classList.toggle('is-dark', isDark);
  button.setAttribute('aria-pressed', String(isDark));
  const labelKey = isDark ? 'theme-toggle-light' : 'theme-toggle-dark';
  button.setAttribute('aria-label', translate(labelKey));
}

export function getCurrentTheme() {
  return currentTheme;
}
