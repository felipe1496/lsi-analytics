import { AxiosRequestConfig } from 'axios';

export type PostRequest<T = unknown> = {
  body: T;
  config?: AxiosRequestConfig;
};

export type GetRequest<T = unknown> = {
  path: T;
  config?: AxiosRequestConfig;
};

export type DeleteRequest<T = unknown> = {
  path: T;
  config?: AxiosRequestConfig;
};
