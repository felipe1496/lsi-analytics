export const APP_ROUTER = {
  panels: {
    index: '/paineis',
  },
  panel: {
    index: '/painel/:id',
    edit: '/painel/:id/editar',
    audit: '/painel/:id/auditoria',
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
      index: { url: '/' },
    },
    notFound: {
      index: '/404',
    },
  },
};
