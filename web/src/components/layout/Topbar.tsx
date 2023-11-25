import Cookies from 'js-cookie';
import { ChevronDown, Home, LogOut } from 'lucide-react';
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { APP_ROUTER } from '@/constants/app-routes';
import { capitalizarFirstLetter, cn, getUserInfo } from '@/utils';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu';

interface TopbarProps {
  breadcrumb?: React.ReactNode;
}

export const Topbar: React.FC<TopbarProps> = ({ breadcrumb = null }) => {
  const user = getUserInfo();

  const navigate = useNavigate();

  const logout = () => {
    Cookies.remove('accessToken');
    navigate(APP_ROUTER.auth.login);
  };

  const renderUserBox = () => {
    if (user) {
      if (user.imageURL) {
        return <img src={user.imageURL} alt="user profile image" />;
      }

      return (
        <DropdownMenu>
          <DropdownMenuTrigger className="flex items-center gap-1">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-orange-600 text-zinc-50">
              {user.name[0].toUpperCase()}
            </div>

            <ChevronDown size={16} />
          </DropdownMenuTrigger>
          <DropdownMenuContent className="mr-6">
            <DropdownMenuItem className="flex items-center gap-2">
              <Home size={18} />
              {capitalizarFirstLetter(user.name)}
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <Link to={APP_ROUTER.config.profile.index}>
                Configurações e privacidade
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem>Ajuda e suporte</DropdownMenuItem>
            <DropdownMenuItem>Dar feedback</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <button
                onClick={logout}
                className="group flex w-full items-center gap-2 text-red-500"
              >
                <LogOut size={18} className="group-hover:text-red-500" />
                <span className="group-hover:text-red-500">Sair</span>
              </button>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    }

    return null;
  };

  return (
    <header
      className={cn(
        'b fixed flex h-14 w-full items-center border-b bg-white px-4 md:w-[calc(100vw-3rem)] md:px-12',
        breadcrumb ? 'justify-between' : 'justify-end',
      )}
    >
      {breadcrumb}

      {renderUserBox()}
    </header>
  );
};
