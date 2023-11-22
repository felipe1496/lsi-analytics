import { AxiosRequestConfig } from 'axios';

export type PostRequest<T> = {
  body: T;
  config?: AxiosRequestConfig;
};
