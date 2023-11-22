import axios from 'axios';

import { Config } from '@/config';

export const api = axios.create({
  baseURL: Config.getBaseURL,
});
