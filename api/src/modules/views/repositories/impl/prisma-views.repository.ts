import { PrismaService } from 'src/services/prisma/prisma.service';
import { View } from '../../entities/view.entity';
import {
  FindByPanelIdProps,
  FindManySelectFiltersProps,
  ViewsRepository,
} from '../abstract/views.repository';
import { Injectable } from '@nestjs/common';
import { ViewsMapper } from '../../mappers/views.mapper';
import { SelectFilter } from '../../entities/select-filter';
import { CoreViewsMapper } from '../../mappers/core-views.mapper';

@Injectable()
export class PrismaViewsRepository implements ViewsRepository {
  constructor(private prisma: PrismaService) {}

  public async findAll(props: FindByPanelIdProps): Promise<View[]> {
    const views = await this.prisma.view.findMany({
      where: {
        panelId: props.filters?.panelId,
      },
    });

    console.log('views: ', views);

    return views.map(ViewsMapper.toDomain);
  }

  public async findManySelectFilters(
    props: FindManySelectFiltersProps,
  ): Promise<SelectFilter[]> {
    const selectFilters = await this.prisma.selectFilter.findMany({
      where: {
        id: {
          in: props.ids,
        },
      },
    });

    return selectFilters.map(CoreViewsMapper.selectFilterToDomain);
  }
}
