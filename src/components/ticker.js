import { escapeHtml } from '@/modules/dom.js';

// Plain-language statements describing the work — scroll as a Bloomberg-style band.
const STATEMENTS = {
  en: [
    'Translating Basel III rules into auditable SQL',
    'Detecting credit defaults from raw banking data',
    'Computing regulatory capital under the Standard Approach',
    'Building credit scoring models with explainability',
    'Segmenting credit portfolios for prudential reporting',
    'Comparing prudential ratios across European banks',
    'Designing data quality controls for risk reporting',
    'Automating ETL flows for regulatory data',
    'Bridging risk, finance and IT teams',
    'Specifying business rules, data dictionaries and test cases',
    'Coordinating UAT campaigns from spec to production',
    'Presenting model results to non-technical stakeholders',
  ],
  fr: [
    'Traduire les règles Bâle III en SQL auditable',
    'Détecter les événements de défaut à partir des données bancaires',
    'Calculer les exigences en fonds propres (approche standard)',
    'Construire des modèles de scoring crédit explicables',
    'Segmenter les portefeuilles de crédit pour le reporting prudentiel',
    'Comparer les ratios prudentiels des banques européennes',
    'Concevoir des contrôles de qualité de données pour le risque',
    'Automatiser les flux ETL pour la data réglementaire',
    'Faire le lien entre les équipes Risque, Finance et SI',
    'Rédiger règles de gestion, dictionnaires de données et cas de tests',
    'Coordonner les recettes, de la spec à la mise en production',
    'Restituer les résultats de modèles à des interlocuteurs non-techniques',
  ],
};

function renderRun(items) {
  return items
    .map(
      (item, i) =>
        `${i === 0 ? '' : '<span class="ticker-sep" aria-hidden="true">◇</span>'}<span class="ticker-item">${escapeHtml(item)}</span>`,
    )
    .join('');
}

export function createTicker({ currentLang } = {}) {
  const items = STATEMENTS[currentLang] ?? STATEMENTS.en;
  // Duplicate the run so the keyframe -50% lands exactly between copies.
  const run = renderRun(items);
  return `
    <div class="ticker" aria-hidden="true">
      <div class="ticker-track">
        ${run}<span class="ticker-sep" aria-hidden="true">◇</span>${run}<span class="ticker-sep" aria-hidden="true">◇</span>
      </div>
    </div>
  `;
}
