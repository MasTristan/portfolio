import { createHeader } from '@/components/header.js';
import { createMobileNav } from '@/components/mobileNav.js';
import { createSideNav } from '@/components/sideNav.js';
import { createHero } from '@/components/hero.js';
import { createTicker } from '@/components/ticker.js';
import { createAbout } from '@/components/about.js';
import { createSnapshot } from '@/components/snapshot.js';
import { createExperience } from '@/components/experience.js';
import { createSkills } from '@/components/skills.js';
import { createProjects } from '@/components/projects.js';
import { createContact } from '@/components/contact.js';
import { createFooter } from '@/components/footer.js';

export function renderApp(context) {
  return [
    `<div class="reading-progress" aria-hidden="true"></div>`,
    createHeader(context),
    createMobileNav(context),
    createSideNav(context),
    createHero(context),
    createTicker(context),
    createAbout(context),
    createSnapshot(context),
    createExperience(context),
    createSkills(context),
    createProjects(context),
    createContact(context),
    createFooter(context),
  ].join('\n');
}
