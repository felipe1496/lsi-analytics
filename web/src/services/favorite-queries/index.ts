import { api } from '../api';
import {
  FavoriteQueryModel,
  FavoriteQueryProps,
} from '../models/favorite-query/types';
import { DeleteRequest, GetRequest, PostRequest } from '../types';

export type CreateFavoriteQueryProps = PostRequest<FavoriteQueryProps>;

export type FindAllFavoriteQueriesProps = Omit<GetRequest<undefined>, 'path'>;

export type DeleteFavoriteQueryProps = DeleteRequest<{ id: string }>;

export class FavoriteQueriesService {
  public async create(props: CreateFavoriteQueryProps) {
    const response = await api.post<FavoriteQueryModel>(
      '/favorite-queries',
      props.body,
      props.config,
    );

    return response.data;
  }

  public async findAll(props: FindAllFavoriteQueriesProps = {}) {
    const response = await api.get<FavoriteQueryModel[]>(
      '/favorite-queries',
      props.config,
    );

    return response.data;
  }

  public async delete(props: DeleteFavoriteQueryProps) {
    const response = await api.delete(`/favorite-queries/${props.path.id}`);

    return response.data;
  }
}

export const favoriteQueriesService = new FavoriteQueriesService();
