import React from 'react';
import { Link } from 'react-router-dom';

import { APP_ROUTER } from '@/constants/app-routes';

export const Footer: React.FC = () => (
  <footer className="mt-24 flex flex-col items-center justify-center gap-2 text-sm text-zinc-500">
    <div className="flex flex-wrap justify-center gap-4">
      <Link to="#" className="hover:underline">
        Sobre
      </Link>
      <Link to="#" className="hover:underline">
        Github
      </Link>
      <Link to={APP_ROUTER.docs.index} className="hover:underline">
        Documentação
      </Link>
      <Link to="#" className="hover:underline">
        Localização
      </Link>
      <Link to="#" className="hover:underline">
        Termos de uso
      </Link>
      <Link to="#" className="hover:underline">
        Política de privacidade
      </Link>
    </div>
    <span>© 2023 LSI Analytics</span>
  </footer>
);