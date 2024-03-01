import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';

import { AuthGuard } from 'src/guards/auth/auth.guard';
import { FavoriteQueriesRepository } from '../repositories/abstract/favorite-queries.repository';
import { CreateFavoriteQueryDto } from '../dtos/create-favorite-query.dto';
import { FavoriteQueriesMapper } from '../mappers/favorite-queries.mapper';
import { Request } from 'express';
import { IdDto } from 'src/utils/dtos/id.dto';

@Controller('/favorite-queries')
export class FavoriteQueriesController {
  constructor(
    private readonly favoriteQueriesRepository: FavoriteQueriesRepository,
  ) {}

  @Post()
  @UseGuards(AuthGuard)
  @HttpCode(HttpStatus.CREATED)
  public async create(
    @Req() req: Request,
    @Body() createFavoriteQueryDto: CreateFavoriteQueryDto,
  ) {
    const userId = req.userId;

    const { sql, datafontId, name } = createFavoriteQueryDto;

    const favoriteQuery = await this.favoriteQueriesRepository.create({
      sql,
      datafontId,
      userId,
      name,
    });

    return FavoriteQueriesMapper.toHttp(favoriteQuery);
  }

  @Get()
  @UseGuards(AuthGuard)
  @HttpCode(HttpStatus.OK)
  public async findAll(@Req() req: Request) {
    const userId = req.userId;

    const favoriteQueries = await this.favoriteQueriesRepository.findAll({
      userId,
    });

    return favoriteQueries.map(FavoriteQueriesMapper.toHttp);
  }

  @Delete('/:id')
  @UseGuards(AuthGuard)
  @HttpCode(HttpStatus.NO_CONTENT)
  public async delete(@Param() param: IdDto) {
    await this.favoriteQueriesRepository.delete({
      id: param.id,
    });
  }
}
