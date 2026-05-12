// Keyboard navigation + scroll-aware section indicator.
// Hotkeys (active anywhere except inside an input/textarea/contenteditable):
//   j  next section          k  previous section
//   g  go to top              G  go to bottom
//   t  toggle theme           l  toggle language
//
// Also keeps the header's [data-current-section] in sync with the
// section currently in the viewport, and exposes a `setSections` so the
// main render can re-bind when the page is re-rendered.

const SECTION_ORDER = ['home', 'about', 'experience', 'skills', 'projects', 'contact'];

const SECTION_LABELS = {
  en: {
    home: 'Home',
    about: 'About',
    experience: 'Experience',
    skills: 'Skills',
    projects: 'Projects',
    contact: 'Contact',
  },
  fr: {
    home: 'Accueil',
    about: 'À propos',
    experience: 'Expérience',
    skills: 'Compétences',
    projects: 'Projets',
    contact: 'Contact',
  },
};

const SECTION_INDEX = {
  about: '01',
  experience: '02',
  skills: '03',
  projects: '04',
  contact: '05',
};

let observer;
let bound = false;
let currentLang = 'en';
let currentId = 'home';

function updateIndicator(id) {
  const node = document.querySelector('[data-current-section]');
  if (!node) {
    return;
  }
  const labels = SECTION_LABELS[currentLang] ?? SECTION_LABELS.en;
  const label = labels[id];
  if (!label) {
    return;
  }
  const idx = SECTION_INDEX[id];
  const html = idx
    ? `<span class="sym">§</span>${idx} · ${label.toLowerCase()}`
    : `${label.toLowerCase()}`;
  // soft fade-out, swap, fade-in
  node.classList.remove('is-visible');
  setTimeout(() => {
    node.innerHTML = html;
    if (id !== 'home') {
      node.classList.add('is-visible');
    }
  }, 120);
}

function scrollToSection(id) {
  const target = document.getElementById(id);
  if (!target) {
    return;
  }
  const header = document.querySelector('.header');
  const offset = header ? header.offsetHeight + 12 : 80;
  const top = target.getBoundingClientRect().top + window.pageYOffset - offset;
  window.scrollTo({ top, behavior: 'smooth' });
}

function step(delta) {
  const idx = SECTION_ORDER.indexOf(currentId);
  const safeIdx = idx === -1 ? 0 : idx;
  const next = Math.min(SECTION_ORDER.length - 1, Math.max(0, safeIdx + delta));
  if (next === safeIdx) {
    return;
  }
  scrollToSection(SECTION_ORDER[next]);
}

function isEditable(target) {
  if (!target) return false;
  return (
    target.matches('input, textarea, select, [contenteditable], [contenteditable="true"]') ||
    target.isContentEditable
  );
}

export function initShortcuts({ getLang } = {}) {
  currentLang = (getLang && getLang()) || 'en';

  // Re-attach the section observer (re-rendering replaces the DOM).
  if (observer) {
    observer.disconnect();
  }

  const sections = SECTION_ORDER
    .map((id) => document.getElementById(id))
    .filter(Boolean);

  observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          currentId = entry.target.id;
          updateIndicator(currentId);
        }
      });
    },
    { rootMargin: '-45% 0px -50% 0px', threshold: 0 },
  );

  sections.forEach((section) => observer.observe(section));

  if (bound) {
    return;
  }
  bound = true;

  document.addEventListener('keydown', (event) => {
    if (event.metaKey || event.ctrlKey || event.altKey) {
      return;
    }
    if (isEditable(event.target)) {
      return;
    }

    switch (event.key) {
      case 'j':
        event.preventDefault();
        step(1);
        break;
      case 'k':
        event.preventDefault();
        step(-1);
        break;
      case 'g':
        event.preventDefault();
        scrollToSection('home');
        break;
      case 'G':
        event.preventDefault();
        scrollToSection('contact');
        break;
      case 't':
        event.preventDefault();
        document.getElementById('theme-toggle')?.click();
        break;
      case 'l': {
        event.preventDefault();
        const links = Array.from(document.querySelectorAll('.lang-link'));
        const active = links.find((link) => link.classList.contains('active'));
        const next = active ? links[(links.indexOf(active) + 1) % links.length] : links[0];
        next?.click();
        break;
      }
      default:
        break;
    }
  });
}

export function setShortcutLang(lang) {
  currentLang = lang || 'en';
  updateIndicator(currentId);
}
