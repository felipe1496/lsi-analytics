import { FavoriteQuery } from '../../entities/favorite-query.entity';

export type CreateFavoriteQueryProps = {
  sql: string;
  datafontId: string;
  userId: string;
  name: string;
};

export type FindAllFavoriteQueriesProps = {
  userId?: string;
};

export type DeleteFavoriteQueriesProps = {
  id: string;
};

export abstract class FavoriteQueriesRepository {
  public abstract create(
    props: CreateFavoriteQueryProps,
  ): Promise<FavoriteQuery>;

  public abstract findAll(
    props: FindAllFavoriteQueriesProps,
  ): Promise<FavoriteQuery[]>;

  public abstract delete(props: DeleteFavoriteQueriesProps): Promise<void>;
}
