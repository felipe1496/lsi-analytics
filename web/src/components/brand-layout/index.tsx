import { ChevronDown, Github } from 'lucide-react';
import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';

import { APP_ROUTES, EXTERNAL_ROUTES } from '@/constants/app-routes';
import { APP_DESCRIPTION } from '@/constants/meta';

import { Button } from '../ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu';
import { Footer } from './Footer';

interface BrandLayoutProps {
  children: React.ReactNode;
  title?: string;
  description?: string;
}

export const BrandLayout: React.FC<BrandLayoutProps> = ({
  children,
  title: _title,
  description: _description,
}) => {
  const title = _title ? `${_title} | LSI Analytics` : 'LSI Analytics';
  const description = _description ?? APP_DESCRIPTION;

  return (
    <>
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={description} />
      </Helmet>
      <main className="relative text-zinc-800">
        <div className="flex h-12 w-full items-center justify-center bg-amber-50 px-12 text-sm">
          ⭐ — Marque LSI Analytics no Github e ajude outras pessoas a descobrir
          nosso produto!
        </div>
        <header className="sticky top-0 flex h-16 w-full items-center justify-between bg-white px-12">
          <div className="flex items-center gap-2">
            <img src="/logo.svg" className=" h-8 w-8" alt="" />
            <div className="flex flex-col gap-0 text-zinc-700">
              <span className="text-sm">LSI</span>
              <span className="text-xl font-bold">Analytics</span>
            </div>
          </div>

          <div className="flex items-center gap-6">
            <button className="hover:underline">Visão Geral</button>
            <DropdownMenu>
              <DropdownMenuTrigger>
                <button className="flex items-center hover:underline">
                  Recursos <ChevronDown size={18} />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem asChild>
                  <Link to="/docs">Tutoriais</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/docs">Feedback</Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <Link to={APP_ROUTES.docs.index} className="hover:underline">
              Documentação
            </Link>
            <Link to={APP_ROUTES.docs.index} className="hover:underline">
              Sobre
            </Link>
          </div>

          <nav className="flex items-center gap-4">
            <Link
              to={EXTERNAL_ROUTES.domain.github}
              target="blank"
              className="rounded-md border border-zinc-200 p-1 hover:bg-zinc-100"
            >
              <Github />
            </Link>
            <Link
              to={APP_ROUTES.auth.login}
              className="flex h-9 items-center justify-center rounded border border-zinc-200 px-4"
            >
              Entrar
            </Link>
            <Button asChild>
              <Link to={APP_ROUTES.auth.register}>Tentar agora</Link>
            </Button>
          </nav>
        </header>

        {children}

        <Footer />
      </main>
    </>
  );
};
