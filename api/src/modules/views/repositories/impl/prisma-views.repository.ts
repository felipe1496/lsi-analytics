import { PrismaService } from 'src/services/prisma/prisma.service';
import { View } from '../../entities/view.entity';
import {
  FindByPanelIdProps,
  ViewsRepository,
} from '../abstract/views.repository';
import { Injectable } from '@nestjs/common';
import { ViewsMapper } from '../../mappers/views.mapper';

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
}
