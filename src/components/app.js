import { createHeader } from '@/components/header.js';
import { createSideNav } from '@/components/sideNav.js';
import { createHero } from '@/components/hero.js';
import { createAbout } from '@/components/about.js';
import { createSkills } from '@/components/skills.js';
import { createResume } from '@/components/resume.js';
import { createPortfolio } from '@/components/portfolio.js';
import { createTestimonials } from '@/components/testimonials.js';
import { createContact } from '@/components/contact.js';
import { createFooter } from '@/components/footer.js';

export function renderApp(context) {
  return [
    createHeader(context),
    createSideNav(context),
    createHero(context),
    createAbout(context),
    createSkills(context),
    createResume(context),
    createPortfolio(context),
    createTestimonials(context),
    createContact(context),
    createFooter(context),
  ].join('\n');
}
