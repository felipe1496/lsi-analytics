import { Module } from '@nestjs/common';
import { FavoriteQueriesController } from './controllers/favorite-queries.controller';
import { FavoriteQueriesRepository } from './repositories/abstract/favorite-queries.repository';
import { PrismaFavoriteQueriesRepository } from './repositories/impl/prisma-favorite-queries.repository';

@Module({
  controllers: [FavoriteQueriesController],
  providers: [
    {
      provide: FavoriteQueriesRepository,
      useClass: PrismaFavoriteQueriesRepository,
    },
  ],
})
export class FavoriteQueriesModule {}
