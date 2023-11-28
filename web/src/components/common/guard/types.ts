import { toast } from 'react-toastify';

import { GuardContext } from '.';

type RedirectActionType = {
  action: 'redirect';
  url: string;
};

type ToastActionType = {
  action: 'toast';
  fn: () => ReturnType<typeof toast>;
};

export type ActionType = RedirectActionType | ToastActionType;

export abstract class CanActivate {
  public abstract canActivate(ctx?: GuardContext): boolean | Promise<boolean>;

  public abstract onDenied?(): ActionType | ActionType[];
}
