import axios from 'axios';
import Cookies from 'js-cookie';

import { Config } from '@/config';
import { APP_ROUTES } from '@/constants/app-routes';
import { extractTokenFromCookies } from '@/utils';

export const api = axios.create({
  baseURL: Config.getBaseURL,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use(
  (config) => {
    const token = extractTokenFromCookies();
    const newConfig = { ...config };
    if (token) {
      newConfig.headers.Authorization = `Bearer ${token}`;
    }
    return newConfig;
  },
  (error) => Promise.reject(error),
);

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (
      error.response?.status === 401 &&
      error.response?.data?.message === 'Token inválido'
    ) {
      Cookies.remove('accessToken');
      window.location.href = APP_ROUTES.auth.login;
      return Promise.reject();
    }
    return Promise.reject(error);
  },
);
