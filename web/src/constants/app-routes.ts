export const APP_ROUTES = {
  panels: {
    index: '/paineis',
  },
  panel: {
    index: '/painel/:id',
    edit: '/painel/:id/editar',
    audit: '/painel/:id/auditoria',
    new: {
      view: '/painel/:id/novo/visualizacao',
      font: '/painel/:id/novo/visualizacao/fonte',
      object: '/painel/:id/novo/visualizacao/objeto',
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
    profile: { index: '/config/perfil' },
    preferences: { index: '/config/preferencias' },
  },
  misc: {
    landing: {
      index: '/',
    },
    notFound: {
      index: '/404',
    },
  },
  docs: {
    index: '/docs',
  },
};
