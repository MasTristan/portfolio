# Portfolio

Modern single-page portfolio built with [Vite](https://vitejs.dev/) in vanilla JavaScript and modular CSS (no front-end framework). The site showcases experience, skills and projects with bilingual support (English/French), dark mode and orchestrated scroll/entrance animations.

## Getting started

```bash
npm install
npm run dev
```

Open the local URL printed in the terminal (default: `http://localhost:5173`).

### Available scripts

- `npm run dev` – start the Vite dev server with hot module replacement.
- `npm run build` – generate the production-ready `dist/` bundle.
- `npm run preview` – serve the built bundle locally to validate the final output.

## Project structure

```
├── public/                # Static assets copied as-is
│   ├── cv/                # PDF resume
│   ├── img/               # Images used throughout the portfolio
│   └── og-card.png        # Social share card (Open Graph / Twitter)
├── src/
│   ├── components/        # Section renderers (header, hero, about, experience, skills, projects, contact, footer, …)
│   ├── data/              # Content sources (translations-en/fr.json, hero, about, experience, skills, projects, contact, navigation, languages)
│   ├── modules/           # Behavioural logic (theme, i18n, navigation, animations, motion, languageSwitcher, scrollToTop, dom)
│   └── styles/            # Modular CSS imported via src/styles/main.css
├── index.html             # Vite entry point mounting src/main.js
├── postcss.config.js      # PostCSS configuration enabling Autoprefixer
└── vite.config.js         # Vite configuration with @ alias
```

### Editing content

- **Translations** – update `src/data/translations-en.json` and `src/data/translations-fr.json`. Keys are shared across sections.
- **Projects & skills** – edit `src/data/projects.js` and `src/data/skills.js` to add or update entries.
- **Experience, contact & hero** – adjust `src/data/experience.js`, `src/data/contact.js` and `src/data/hero.js`.
- **Social share card** – regenerate `public/og-card.png` with `node scripts/make-og-card.mjs` (requires `sharp`).
- **Images/PDFs** – drop files into `public/` (they are served verbatim and referenced with absolute paths such as `/img/...`).

### Styling

Global styles are split into thematic files under `src/styles/` (variables, base rules, layout, utilities and per-section styling). All files are imported from `src/styles/main.css`, which is included by `src/main.js`.

### Deployment

1. Run `npm run build` to produce the `dist/` directory.
2. Deploy the contents of `dist/` to your hosting provider (static hosting such as Netlify, GitHub Pages, Vercel, etc. works out of the box).

