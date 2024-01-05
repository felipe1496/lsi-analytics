export const APP_ROUTES = {
  panels: {
    index: '/paineis',
  },
  panel: {
    index: '/painel/:id',
    edit: '/painel/:id/editar',
    audit: '/painel/:id/auditoria',
    new: {
      index: '/painel/:id/novo/visualizacao',
      font: '/painel/:id/novo/visualizacao/fonte',
      object: '/painel/:id/novo/visualizacao/objeto',
      studio: {
        pie: '/painel/:id/novo/visualizacao/studio/pie',
      },
    },
  },
  dataFont: {
    index: '/fontes',
    new: '/fontes/novo',
  },
  auth: {
    login: '/entrar',
    register: '/cadastrar',
  },
  config: {
    index: '/config/perfil',
    preferences: '/config/preferencias',
  },
  misc: {
    landing: '/',
  },
  docs: {
    index: '/docs',
  },
};

export const EXTERNAL_ROUTES = {
  domain: {
    github: 'https://github.com/felipe1496/lsi-analytics',
  },
};
