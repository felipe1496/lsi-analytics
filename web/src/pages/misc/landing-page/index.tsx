import React from 'react';
import { Link } from 'react-router-dom';

import { APP_ROUTES } from '@/constants/app-routes';

export const LandingPage: React.FC = () => (
  <main className="min-h-screen bg-zinc-900 text-zinc-50">
    <nav className="flex h-12 items-center justify-end px-12 py-8">
      <div className="flex items-center gap-4">
        <Link to={APP_ROUTES.auth.login} className="hover:underline">
          Entrar
        </Link>
        <Link
          to={APP_ROUTES.auth.register}
          className="rounded border px-2 py-1 transition-all hover:bg-zinc-50 hover:text-zinc-800"
        >
          Cadastrar
        </Link>
      </div>
    </nav>
  </main>
);