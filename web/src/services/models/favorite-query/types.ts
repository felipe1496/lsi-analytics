import { BaseModel } from '../types';

export type FavoriteQueryModel = BaseModel & {
  sql: string;
  datafontId: string;
  name: string;
};

export type FavoriteQueryProps = {
  sql: string;
  datafontId: string;
  name: string;
};
