// Motion orchestration: hero entrance, typed role, reading progress,
// header section indicator. All effects honour prefers-reduced-motion.

const REDUCED_MOTION = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

const SECTION_ORDER = ['home', 'about', 'experience', 'skills', 'projects', 'contact'];

const SECTION_LABELS = {
  en: {
    about: 'About',
    experience: 'Experience',
    skills: 'Skills',
    projects: 'Projects',
    contact: 'Contact',
  },
  fr: {
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

let sectionObserver;
let progressBound = false;
let currentLang = 'en';
let currentId = 'home';
let typingTimer = null;

function updateIndicator(id) {
  const node = document.querySelector('[data-current-section]');
  if (!node) return;
  const labels = SECTION_LABELS[currentLang] ?? SECTION_LABELS.en;
  const label = labels[id];
  const idx = SECTION_INDEX[id];
  const html = label && idx
    ? `<span class="sym">§</span>${idx} · ${label.toLowerCase()}`
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

function initRoleTyping() {
  // Stop any previous run (re-render on language switch).
  if (typingTimer) {
    clearTimeout(typingTimer);
    typingTimer = null;
  }

  const wrapper = document.querySelector('.hero-role');
  const em = wrapper?.querySelector('em');
  if (!wrapper || !em) return;

  const full = em.textContent || '';
  if (!full) return;

  // Skip animation entirely for reduced motion — just leave the text as-is.
  if (REDUCED_MOTION) {
    wrapper.classList.add('is-typed');
    return;
  }

  em.textContent = '';
  wrapper.classList.remove('is-typed');
  wrapper.classList.add('is-typing');

  let i = 0;
  const tick = () => {
    if (i < full.length) {
      em.textContent += full[i];
      const char = full[i];
      i += 1;
      // Slight randomness; longer pauses on punctuation and the em-dash.
      let delay = 26 + Math.random() * 22;
      if (char === ' ') delay = 50;
      if (char === '—' || char === '-') delay = 240;
      if (char === ',' || char === '.') delay = 180;
      typingTimer = setTimeout(tick, delay);
    } else {
      typingTimer = setTimeout(() => {
        wrapper.classList.remove('is-typing');
        wrapper.classList.add('is-typed');
      }, 900);
    }
  };

  // Wait for the hero title's letter-by-letter reveal to mostly finish.
  typingTimer = setTimeout(tick, 600);
}

export function initMotion({ getLang } = {}) {
  currentLang = (getLang && getLang()) || 'en';
  initSectionIndicator();
  initReadingProgress();
  initRoleTyping();
}

export function setMotionLang(lang) {
  currentLang = lang || 'en';
  updateIndicator(currentId);
}
