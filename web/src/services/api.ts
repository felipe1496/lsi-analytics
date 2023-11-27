/* eslint-disable import/no-mutable-exports */
import axios from 'axios';

import { Config } from '@/config';
import { extractTokenFromCookies } from '@/utils';

const createAxiosInstance = () => {
  const token = extractTokenFromCookies();
  const Authorization = token ? `Bearer ${token}` : undefined;

  return axios.create({
    baseURL: Config.getBaseURL,
    headers: {
      Authorization,
    },
  });
};

export let api = createAxiosInstance();

export const updateAxiosInstance = () => {
  api = createAxiosInstance();
};
