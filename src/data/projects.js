export const projects = [
  {
    titleKey: 'project-1-title',
    statusKey: 'project-1-status',
    statusKind: 'live',
    descKey: 'project-1-desc',
    stack: ['Oracle XE', 'PL/SQL', 'Python', 'Streamlit'],
    links: [
      {
        kind: 'github',
        href: 'https://github.com/MasTristan/basel3-credit-scoring-engine',
        labelKey: 'project-link-github',
      },
      {
        kind: 'streamlit',
        href: 'https://scoring-cr-dit-b-le-iii.streamlit.app/',
        labelKey: 'project-link-streamlit',
      },
    ],
  },
  {
    titleKey: 'project-2-title',
    statusKey: 'project-2-status',
    descKey: 'project-2-desc',
    stack: ['Power BI', 'EBA Open Data'],
    links: [
      { kind: 'github', href: null, labelKey: 'project-link-github' },
      { kind: 'pbix', href: null, labelKey: 'project-link-pbix' },
    ],
  },
  {
    titleKey: 'project-3-title',
    statusKey: 'project-3-status',
    descKey: 'project-3-desc',
    stack: ['Python', 'XGBoost', 'SHAP', 'Streamlit'],
    links: [
      { kind: 'github', href: null, labelKey: 'project-link-github' },
      { kind: 'streamlit', href: null, labelKey: 'project-link-streamlit' },
    ],
  },
];
