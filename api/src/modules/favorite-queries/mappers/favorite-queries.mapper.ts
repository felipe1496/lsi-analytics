import { FavoriteQuery as PrismaFavoriteQuery } from '@prisma/client';
import { FavoriteQuery } from '../entities/favorite-query.entity';

export class FavoriteQueriesMapper {
  public static toDomain(favoriteQuery: PrismaFavoriteQuery) {
    const { id, sql, datafontId, userId, name, createdAt, updatedAt } =
      favoriteQuery;

    return new FavoriteQuery({
      id,
      sql,
      name,
      datafontId,
      userId,
      createdAt,
      updatedAt,
    });
  }

  public static toHttp(favoriteQuery: FavoriteQuery) {
    const {
      id,
      props: { sql, datafontId, userId, name },
      createdAt,
      updatedAt,
    } = favoriteQuery;

    return {
      id,
      sql,
      name,
      datafontId,
      userId,
      createdAt,
      updatedAt,
    };
  }
}
