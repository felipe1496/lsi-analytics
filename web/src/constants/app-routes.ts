export const APP_ROUTER = {
  landing: {
    index: { url: '/' },
  },
  panels: {
    index: '/paineis',
  },
  panel: {
    index: '/painel/:id',
  },
  auth: {
    login: '/entrar',
    register: '/cadastrar',
  },
  config: {
    profile: { index: '/config/perfil' },
    preferences: { index: '/config/preferencias' },
  },
};
