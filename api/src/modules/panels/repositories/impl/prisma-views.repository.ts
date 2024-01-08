import { Injectable } from '@nestjs/common';
import {
  CreateWithCoreProps,
  ViewsRepository,
} from '../abstract/views.repository';
/* import { View } from '../../entities/view.entity'; */
import { PrismaService } from 'src/services/prisma/prisma.service';

@Injectable()
export class PrismaViewsRepository implements ViewsRepository {
  constructor(private prisma: PrismaService) {}

  public async createWithCore(props: CreateWithCoreProps): Promise<any> {
    const core = {};

    if (props.type === 'PIECHART') {
      Object.assign(core, {
        pieChart: {
          create: {
            title: props.core.title,
            subTitle: props.core.subTitle,
            labelColumn: props.core.labelColumn,
            valueColumn: props.core.valueColumn,
          },
        },
      });
    }

    const createdView = await this.prisma.view.create({
      data: {
        type: props.type,
        contentUpdate: props.contentUpdate,
        sql: props.sql,
        panelId: props.panelId,
        ...core,
      },
    });

    console.log('criado: ', createdView);
  }
}
