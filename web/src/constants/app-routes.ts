export const APP_ROUTER = {
  panels: {
    index: '/paineis',
  },
  panel: {
    index: '/painel/:id',
    edit: '/painel/:id/editar',
    audit: '/painel/:id/auditoria',
    new: {
      view: {
        pieChart: '/panel/:id/novo/view/pie',
      },
    },
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
