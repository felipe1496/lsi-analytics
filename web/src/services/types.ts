import { AxiosRequestConfig } from 'axios';

export type PostRequest<T = unknown> = {
  body: T;
  config?: AxiosRequestConfig;
};

export type GetRequest<T = unknown, D = unknown> = {
  path: T;
  config?: AxiosRequestConfig<D>;
};

export type DeleteRequest<T = unknown> = {
  path: T;
  config?: AxiosRequestConfig;
};

export type PatchRequest<U = unknown, T = unknown> = {
  body: U;
  path: T;
  config?: AxiosRequestConfig;
};

export type ApiError = {
  statusCode: number;
  message: string | string[];
  error: string;
};
