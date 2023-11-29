import { toast } from 'react-toastify';

import { APP_ROUTER } from '@/constants/app-routes';
import { sessionsService } from '@/services/sessions';
import { extractTokenFromCookies } from '@/utils';

import { ActionType, CanActivate } from './types';

export class AuthGuard implements CanActivate {
  public async canActivate() {
    try {
      const token = extractTokenFromCookies();
      if (token) {
        await sessionsService.verify(token);
      } else {
        throw new Error();
      }

      return true;
    } catch (error) {
      return false;
    }
  }

  public onDenied(): ActionType | ActionType[] {
    return [
      {
        action: 'redirect',
        url: APP_ROUTER.auth.login,
      },
      {
        action: 'toast',
        fn: () =>
          toast('Faça login para acessar essa página', { type: 'error' }),
      },
    ];
  }
}
