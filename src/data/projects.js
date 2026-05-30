export const projects = [
  {
    titleKey: 'project-1-title',
    statusKey: 'project-1-status',
    statusKind: 'live',
    descKey: 'project-1-desc',
    viz: 'loss',
    stack: ['Oracle XE', 'PL/SQL', 'Python', 'Streamlit'],
    links: [
      {
        kind: 'github',
        href: 'https://github.com/MasTristan/basel3-credit-scoring-engine',
        labelKey: 'project-link-github',
      },
      {
        kind: 'streamlit',
        href: 'https://basel3-credit-scoring-engine.streamlit.app/',
        labelKey: 'project-link-streamlit',
      },
    ],
  },
  {
    titleKey: 'project-2-title',
    statusKey: 'project-2-status',
    descKey: 'project-2-desc',
    viz: 'bars',
    stack: ['Power BI', 'EBA Open Data'],
    links: [
      { kind: 'github', href: null, labelKey: 'project-link-github' },
      { kind: 'pbix', href: null, labelKey: 'project-link-pbix' },
    ],
  },
  {
    titleKey: 'project-3-title',
    statusKey: 'project-3-status',
    statusKind: 'live',
    descKey: 'project-3-desc',
    viz: 'shap',
    stack: ['Python', 'XGBoost', 'SHAP', 'Streamlit'],
    links: [
      {
        kind: 'github',
        href: 'https://github.com/MasTristan/credit-scoring-engine',
        labelKey: 'project-link-github',
      },
      {
        kind: 'streamlit',
        href: 'https://tm-credit-scoring-engine.streamlit.app/',
        labelKey: 'project-link-streamlit',
      },
    ],
  },
];
