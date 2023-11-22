import { APP_ROUTER } from '@/constants/app-routes';
import { Link } from 'react-router-dom';

export const LandingPage: React.FC = () => {
  return (
    <main className="min-h-screen bg-zinc-900 text-zinc-50">
      <nav className="flex h-12 items-center justify-end px-12 py-8">
        <div className="flex items-center gap-4">
          <Link to={APP_ROUTER.auth.login.url} className="hover:underline">
            Entrar
          </Link>
          <Link
            to={APP_ROUTER.auth.register.url}
            className="rounded border px-2 py-1 transition-all hover:bg-zinc-50 hover:text-zinc-800"
          >
            Registrar
          </Link>
        </div>
      </nav>
    </main>
  );
};
