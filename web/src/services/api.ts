import axios from 'axios';

import { Config } from '@/config';
import { extractTokenFromCookies } from '@/utils';

const token = extractTokenFromCookies();

const Authorization = token ? `Bearer ${token}` : undefined;

export const api = axios.create({
  baseURL: Config.getBaseURL,
  headers: {
    Authorization,
  },
});
