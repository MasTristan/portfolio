// Motion orchestration.
// All effects honour prefers-reduced-motion via the REDUCED_MOTION flag.

const REDUCED_MOTION = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const SUPPORTS_HOVER = window.matchMedia('(hover: hover) and (pointer: fine)').matches;

const SECTION_ORDER = ['home', 'about', 'snapshot', 'experience', 'skills', 'projects', 'contact'];

const SECTION_LABELS = {
  en: {
    about: 'About',
    snapshot: 'Snapshot',
    experience: 'Experience',
    skills: 'Skills',
    projects: 'Projects',
    contact: 'Contact',
  },
  fr: {
    about: 'À propos',
    snapshot: 'Aperçu',
    experience: 'Expérience',
    skills: 'Compétences',
    projects: 'Projets',
    contact: 'Contact',
  },
};

const SECTION_INDEX = {
  about: '01',
  snapshot: '02',
  experience: '03',
  skills: '04',
  projects: '05',
  contact: '06',
};

let sectionObserver;
let titleObserver;
let progressBound = false;
let clockTimer = null;
let currentLang = 'en';
let currentId = 'home';
const tiltTargets = new Set();
const magneticTargets = new Set();

/* ── Header section indicator ─────────────────────────────────── */

function updateIndicator(id) {
  const node = document.querySelector('[data-current-section]');
  if (!node) return;
  const labels = SECTION_LABELS[currentLang] ?? SECTION_LABELS.en;
  const label = labels[id];
  const idx = SECTION_INDEX[id];
  const html = label && idx
    ? `${idx} · ${label.toLowerCase()}`
    : '';
  node.classList.remove('is-visible');
  setTimeout(() => {
    node.innerHTML = html;
    if (html) node.classList.add('is-visible');
  }, 140);
}

function initSectionIndicator() {
  if (sectionObserver) sectionObserver.disconnect();

  const sections = SECTION_ORDER
    .map((id) => document.getElementById(id))
    .filter(Boolean);

  sectionObserver = new IntersectionObserver(
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

  sections.forEach((section) => sectionObserver.observe(section));
}

/* ── Section title mask-wipe reveal ───────────────────────────── */

function initSectionTitleReveal() {
  if (titleObserver) titleObserver.disconnect();

  titleObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-revealed');
          titleObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.5, rootMargin: '0px 0px -10% 0px' },
  );

  document
    .querySelectorAll('.section-title')
    .forEach((title) => titleObserver.observe(title));
}

/* ── Reading progress bar ─────────────────────────────────────── */

function initReadingProgress() {
  const bar = document.querySelector('.reading-progress');
  if (!bar) return;

  const update = () => {
    const scrollable = document.documentElement.scrollHeight - window.innerHeight;
    const pct = scrollable > 0
      ? Math.min(1, Math.max(0, window.pageYOffset / scrollable))
      : 0;
    bar.style.setProperty('--scroll-progress', pct);
  };

  update();

  if (progressBound) return;
  progressBound = true;

  window.addEventListener('scroll', update, { passive: true });
  window.addEventListener('resize', update, { passive: true });
}

/* ── Live clock (Europe/Paris) in the hero cartouche ──────────── */

const CLOCK_FORMATTER = new Intl.DateTimeFormat('en-GB', {
  timeZone: 'Europe/Paris',
  hour: '2-digit',
  minute: '2-digit',
  second: '2-digit',
  hour12: false,
});

function initLiveClock() {
  if (clockTimer) {
    clearInterval(clockTimer);
    clockTimer = null;
  }
  const node = document.querySelector('[data-clock]');
  if (!node) return;

  const tick = () => {
    node.textContent = `${CLOCK_FORMATTER.format(new Date())} · BORDEAUX`;
  };

  tick();
  if (REDUCED_MOTION) return;
  clockTimer = setInterval(tick, 1000);
}

/* ── Magnetic CTAs ────────────────────────────────────────────── */

function magneticEnter(event) {
  const el = event.currentTarget;
  el.dataset.magneticActive = 'true';
}

function magneticMove(event) {
  const el = event.currentTarget;
  if (el.dataset.magneticActive !== 'true') return;
  const rect = el.getBoundingClientRect();
  const cx = rect.left + rect.width / 2;
  const cy = rect.top + rect.height / 2;
  const strength = 0.18;
  const dx = (event.clientX - cx) * strength;
  const dy = (event.clientY - cy) * strength;
  el.style.transform = `translate3d(${dx.toFixed(2)}px, ${dy.toFixed(2)}px, 0)`;
}

function magneticLeave(event) {
  const el = event.currentTarget;
  el.dataset.magneticActive = 'false';
  el.style.transform = '';
}

function initMagneticCTAs() {
  // Unbind previous (re-render replaces DOM, but our Set persists across renders).
  magneticTargets.clear();
  if (!SUPPORTS_HOVER || REDUCED_MOTION) return;

  document.querySelectorAll('[data-magnetic]').forEach((el) => {
    el.addEventListener('mouseenter', magneticEnter);
    el.addEventListener('mousemove', magneticMove);
    el.addEventListener('mouseleave', magneticLeave);
    magneticTargets.add(el);
  });
}

/* ── 3D tilt on project cards ─────────────────────────────────── */

const TILT_MAX = 3; // degrees
const TILT_LIFT = 4; // px

function tiltMove(event) {
  const el = event.currentTarget;
  const rect = el.getBoundingClientRect();
  const cx = rect.left + rect.width / 2;
  const cy = rect.top + rect.height / 2;
  const x = (event.clientX - cx) / (rect.width / 2);
  const y = (event.clientY - cy) / (rect.height / 2);
  const rx = (-y * TILT_MAX).toFixed(2);
  const ry = (x * TILT_MAX).toFixed(2);
  el.style.transform =
    `perspective(900px) rotateX(${rx}deg) rotateY(${ry}deg) translate3d(0, -${TILT_LIFT}px, 0)`;
}

function tiltLeave(event) {
  event.currentTarget.style.transform = '';
}

function initCardTilt() {
  tiltTargets.clear();
  if (!SUPPORTS_HOVER || REDUCED_MOTION) return;

  document.querySelectorAll('[data-tilt]').forEach((el) => {
    el.addEventListener('mousemove', tiltMove);
    el.addEventListener('mouseleave', tiltLeave);
    tiltTargets.add(el);
  });
}

/* ── Public API ───────────────────────────────────────────────── */

export function initMotion({ getLang } = {}) {
  currentLang = (getLang && getLang()) || 'en';
  initSectionIndicator();
  initSectionTitleReveal();
  initReadingProgress();
  initLiveClock();
  initMagneticCTAs();
  initCardTilt();
}

export function setMotionLang(lang) {
  currentLang = lang || 'en';
  updateIndicator(currentId);
}
