import React from 'react';
import ReactImage from '../../assets/react.svg';
import { Link } from 'react-router-dom';
import { BarChart3, Home } from 'lucide-react';
import { APP_ROUTER } from '../../constants/app-routes';
import { Separator } from '../ui/separator';

export const Navbar: React.FC = () => (
  <nav className="fixed hidden min-h-screen w-16 flex-col items-center gap-4 bg-zinc-800 py-4 md:flex">
    <img src={ReactImage} />

    <Link to={APP_ROUTER.panels.index.url}>
      <Home className="text-zinc-50" />
    </Link>

    <Separator className="w-8" />

    <Link to={APP_ROUTER.panels.index.url}>
      <BarChart3 className="text-zinc-50" />
    </Link>
  </nav>
);
