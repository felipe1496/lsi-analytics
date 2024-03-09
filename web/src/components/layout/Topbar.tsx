import { useQueryClient } from '@tanstack/react-query';
import Cookies from 'js-cookie';
import {
  ChevronDown,
  LogOut,
  MessageSquareMore,
  Moon,
  Settings,
  Sun,
  User,
} from 'lucide-react';
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { APP_ROUTES } from '@/constants/app-routes';
import { useTheme } from '@/hooks/useTheme';
import { capitalizarFirstLetter, cn, getUserInfo } from '@/utils';

import { THEME } from '../providers/constants';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu';
import { Feedback } from './Feedback';

interface TopbarProps {
  breadcrumb?: React.ReactNode;
  rightContent?: React.ReactNode;
}

export const Topbar: React.FC<TopbarProps> = ({
  breadcrumb = null,
  rightContent = null,
}) => {
  const [feedbackPopoverIsOpen, setFeedbackPopoverIsOpen] =
    React.useState<boolean>(false);

  const { theme, setTheme } = useTheme();

  const user = getUserInfo();

  const queryClient = useQueryClient();

  const navigate = useNavigate();

  const logout = () => {
    Cookies.remove('accessToken');
    localStorage.removeItem('user');
    queryClient.clear();
    navigate(APP_ROUTES.brand.landing);
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
        <>
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
                  to={APP_ROUTES.config.index}
                  className="flex items-center gap-2"
                >
                  <User size={18} className="text-foreground" />
                  {capitalizarFirstLetter(user.name)}
                </Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <Link
                  to={APP_ROUTES.config.index}
                  className="flex items-center gap-2"
                >
                  <Settings size={16} className="text-foreground" />
                  Configurações
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <button
                  className="flex w-full items-center gap-2"
                  onClick={() => setFeedbackPopoverIsOpen(true)}
                >
                  <MessageSquareMore size={16} className="text-foreground" />
                  Feedback
                </button>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <div className="flex w-full items-center justify-center px-4 py-2">
                <div className="flex items-center justify-between">
                  <button
                    onClick={() => setTheme(THEME.DARK)}
                    className={cn(
                      'rounded-md border px-4 py-2',
                      theme === THEME.DARK ? 'bg-muted' : 'hover:bg-muted',
                    )}
                  >
                    <Moon size={16} />
                  </button>

                  <button
                    onClick={() => setTheme(THEME.SYSTEM)}
                    className={cn(
                      'mx-2 rounded-md border px-4 py-2 text-sm hover:bg-muted',
                      theme === THEME.SYSTEM ? 'bg-muted' : 'hover:bg-muted',
                    )}
                  >
                    Auto
                  </button>

                  <button
                    onClick={() => setTheme(THEME.LIGHT)}
                    className={cn(
                      'rounded-md border px-4 py-2',
                      theme === THEME.LIGHT ? 'bg-muted' : 'hover:bg-muted',
                    )}
                  >
                    <Sun size={16} />
                  </button>
                </div>
              </div>
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
        </>
      );
    }

    return null;
  };

  return (
    <header
      className={cn(
        'b fixed z-10 flex h-14 w-full items-center border-b bg-background px-4 md:w-[calc(100vw-3rem)] md:px-12',
        breadcrumb ? 'justify-between' : 'justify-end',
      )}
    >
      {breadcrumb}

      <UserBoxWrapper {...userBoxProps}>
        {rightContent}
        {renderUserBox()}
      </UserBoxWrapper>

      <Feedback
        open={feedbackPopoverIsOpen}
        setOpen={setFeedbackPopoverIsOpen}
      />
    </header>
  );
};
