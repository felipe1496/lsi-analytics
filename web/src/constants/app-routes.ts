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
        bar: '/painel/:id/novo/visualizacao/studio/bar',
        line: '/painel/:id/novo/visualizacao/studio/line',
        number: '/painel/:id/novo/visualizacao/studio/number',
        select: '/painel/:id/novo/visualizacao/studio/select',
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
    index: '/config/conta',
    preferences: '/config/preferencias',
  },
  brand: {
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
