import React from 'react';
import { Link } from 'react-router-dom';

export const Footer: React.FC = () => (
  <footer className="mt-24 flex flex-col items-center justify-center gap-2 text-sm text-zinc-500">
    <div className="flex flex-wrap gap-4">
      <Link to="#" className="hover:underline">
        Sobre
      </Link>
      <Link to="#" className="hover:underline">
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
    <span>© 2023 LSI Analytics from LSI</span>
  </footer>
);
