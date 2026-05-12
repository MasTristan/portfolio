import { createHeader } from '@/components/header.js';
import { createSideNav } from '@/components/sideNav.js';
import { createHero } from '@/components/hero.js';
import { createAbout } from '@/components/about.js';
import { createExperience } from '@/components/experience.js';
import { createSkills } from '@/components/skills.js';
import { createProjects } from '@/components/projects.js';
import { createContact } from '@/components/contact.js';
import { createFooter } from '@/components/footer.js';

export function renderApp(context) {
  return [
    createHeader(context),
    createSideNav(context),
    createHero(context),
    createAbout(context),
    createExperience(context),
    createSkills(context),
    createProjects(context),
    createContact(context),
    createFooter(context),
  ].join('\n');
}
