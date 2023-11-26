import { AxiosRequestConfig } from 'axios';

export type PostRequest<T> = {
  body: T;
  config?: AxiosRequestConfig;
};

export type GetRequest<T> = {
  path: T;
  config?: AxiosRequestConfig;
};
