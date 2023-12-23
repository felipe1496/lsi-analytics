import Cookies from 'js-cookie';
import {
  ChevronDown,
  LogOut,
  MessageSquareMore,
  Settings,
  User,
} from 'lucide-react';
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { APP_ROUTES } from '@/constants/app-routes';
import { queryClient } from '@/lib/react-query';
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
  rightContent?: React.ReactNode;
}

export const Topbar: React.FC<TopbarProps> = ({
  breadcrumb = null,
  rightContent = null,
}) => {
  const user = getUserInfo();

  const navigate = useNavigate();

  const logout = () => {
    Cookies.remove('accessToken');
    localStorage.removeItem('user');
    queryClient.clear();
    navigate(APP_ROUTES.auth.login);
  };

  const UserBoxWrapper = rightContent ? 'div' : React.Fragment;
  const userBoxProps = rightContent
    ? { className: cn(rightContent && 'flex gap-6 border-red-500') }
    : undefined;

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
            <DropdownMenuItem asChild>
              <Link
                to={APP_ROUTES.config.profile}
                className="flex items-center gap-2"
              >
                <User size={18} className="text-zinc-500" />
                {capitalizarFirstLetter(user.name)}
              </Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <Link
                to={APP_ROUTES.config.index}
                className="flex items-center gap-2"
              >
                <Settings size={16} className="text-zinc-500" />
                Configurações
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <button className="flex items-center gap-2">
                <MessageSquareMore size={16} className="text-zinc-500" />
                Feedback
              </button>
            </DropdownMenuItem>
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
        'b fixed z-10 flex h-14 w-full items-center border-b bg-white px-4 md:w-[calc(100vw-3rem)] md:px-12',
        breadcrumb ? 'justify-between' : 'justify-end',
      )}
    >
      {breadcrumb}

      <UserBoxWrapper {...userBoxProps}>
        {rightContent}
        {renderUserBox()}
      </UserBoxWrapper>
    </header>
  );
};
