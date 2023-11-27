import { BarChart3, BookOpen, Home } from 'lucide-react';
import React from 'react';
import { Link } from 'react-router-dom';

import Logo from '@/assets/logo.svg';

import { APP_ROUTER } from '../../../constants/app-routes';
import { Separator } from '../ui/separator';
import { Tooltip, TooltipContent, TooltipTrigger } from '../ui/tooltip';

export const Navbar: React.FC = () => (
  <nav className="fixed z-10 hidden min-h-screen w-16 flex-col items-center gap-6 bg-zinc-800 py-4 md:flex">
    <Link to={APP_ROUTER.panels.index}>
      <img src={Logo} className="w-8" />
    </Link>

    <Tooltip delayDuration={0}>
      <TooltipTrigger>
        <Link to={APP_ROUTER.panels.index}>
          <Home className="text-zinc-50" />
        </Link>
      </TooltipTrigger>
      <TooltipContent side="right">Início</TooltipContent>
    </Tooltip>

    <Separator className="w-8" />

    <Tooltip delayDuration={0}>
      <TooltipTrigger>
        <Link to={APP_ROUTER.panels.index}>
          <BarChart3 className="text-zinc-50" />
        </Link>
      </TooltipTrigger>
      <TooltipContent side="right">Paineis</TooltipContent>
    </Tooltip>

    <Tooltip delayDuration={0}>
      <TooltipTrigger>
        <Link to={APP_ROUTER.docs.index}>
          <BookOpen className="text-zinc-50" />
        </Link>
      </TooltipTrigger>
      <TooltipContent side="right">Documentação</TooltipContent>
    </Tooltip>
  </nav>
);
