import { Injectable } from '@nestjs/common';
import {
  CreateFavoriteQueryProps,
  DeleteFavoriteQueriesProps,
  FavoriteQueriesRepository,
  FindAllFavoriteQueriesProps,
} from '../abstract/favorite-queries.repository';
import { PrismaService } from 'src/services/prisma/prisma.service';
import { FavoriteQueriesMapper } from '../../mappers/favorite-queries.mapper';

@Injectable()
export class PrismaFavoriteQueriesRepository
  implements FavoriteQueriesRepository
{
  constructor(private prisma: PrismaService) {}

  public async create(props: CreateFavoriteQueryProps) {
    const favotireQuery = await this.prisma.favoriteQuery.create({
      data: {
        sql: props.sql,
        datafontId: props.datafontId,
        userId: props.userId,
        name: props.name,
      },
    });

    return FavoriteQueriesMapper.toDomain(favotireQuery);
  }

  public async findAll(props: FindAllFavoriteQueriesProps) {
    const favoriteQueries = await this.prisma.favoriteQuery.findMany({
      where: {
        userId: props.userId,
      },
    });

    return favoriteQueries.map(FavoriteQueriesMapper.toDomain);
  }

  public async delete(props: DeleteFavoriteQueriesProps) {
    await this.prisma.favoriteQuery.delete({
      where: {
        id: props.id,
      },
    });
  }
}
