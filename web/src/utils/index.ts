import axios, { AxiosError } from 'axios';
import clsx, { ClassValue } from 'clsx';
import Cookies from 'js-cookie';
import { toast } from 'react-toastify';
import { twMerge } from 'tailwind-merge';

import { UNEXPECTED_ERROR } from '@/constants/messages';
import { UserWithoutPasswordModel } from '@/services/models/users';

export const cn = (...inputs: ClassValue[]) => twMerge(clsx(inputs));

export const handleErrorNotify = (error?: AxiosError | Error) => {
  const toastError = (message: string | string[]) => {
    if (Array.isArray(message)) {
      message.forEach((m) => toast(m, { type: 'error' }));
    } else {
      toast(message, { type: 'error' });
    }
  };

  if (axios.isAxiosError(error)) {
    const message = error?.response?.data.message ?? UNEXPECTED_ERROR;
    toastError(message);
  } else if (error?.message) {
    toastError(error?.message);
  } else {
    toastError(UNEXPECTED_ERROR);
  }
};

export const extractTokenFromCookies = () => {
  const token = Cookies.get('accessToken');

  if (!token) {
    return null;
  }

  return token;
};

export const getUserInfo = () => {
  const memoizedUser = localStorage.getItem('user');

  if (memoizedUser) {
    const user = JSON.parse(memoizedUser) as UserWithoutPasswordModel;

    return user;
  }

  return null;
};

export const capitalizarFirstLetter = (text: string) =>
  text.charAt(0).toUpperCase() + text.slice(1);

export const isDifferentOfUndefinedAndNull = (value: unknown) => {
  if (value !== undefined && value !== null) {
    return true;
  }

  return false;
};
