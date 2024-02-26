import axios, { AxiosError } from 'axios';
import clsx, { ClassValue } from 'clsx';
import Cookies from 'js-cookie';
import { toast } from 'react-toastify';
import { twMerge } from 'tailwind-merge';

import { UNEXPECTED_ERROR } from '@/constants/messages';
import { UserWithoutPasswordModel } from '@/services/models/users/types';

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

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const objectsAreEqual = (objA: any, objB: any): boolean => {
  if (
    typeof objA !== 'object' ||
    typeof objB !== 'object' ||
    objA === null ||
    objB === null
  ) {
    return false;
  }

  const keysA = Object.keys(objA);
  const keysB = Object.keys(objB);

  if (keysA.length !== keysB.length) {
    return false;
  }

  // eslint-disable-next-line no-restricted-syntax
  for (const key of keysA) {
    const valueA = objA[key];
    const valueB = objB[key];

    if (typeof valueA === 'object' && typeof valueB === 'object') {
      if (!objectsAreEqual(valueA, valueB)) {
        return false;
      }
    } else {
      // eslint-disable-next-line no-lonely-if
      if (valueA !== valueB) {
        return false;
      }
    }
  }

  return true;
};

export const inputSetState =
  (callback: (prop: string | null) => unknown) =>
  (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    callback(value);
  };

export const inputValue = (value: string | null) =>
  value === null ? '' : value;

export const removeAccents = (str: string) =>
  str.normalize('NFD').replace(/[\u0300-\u036f]/g, '');

export const copyToClipboard = async ({
  text,
  onSuccess = () => {},
  onError = () => {},
}: {
  text: string;
  onSuccess?: () => void;
  onError?: () => void;
}) => {
  try {
    await navigator.clipboard.writeText(text);
    onSuccess();
  } catch (err) {
    onError();
  }
};
