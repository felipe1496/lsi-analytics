import { Injectable } from '@nestjs/common';
import {
  UpdateViewsInPanelProps,
  ViewsRepository,
} from '../abstract/views.repository';
/* import { View } from '../../entities/view.entity'; */
import { PrismaService } from 'src/services/prisma/prisma.service';

@Injectable()
export class PrismaViewsRepository implements ViewsRepository {
  constructor(private prisma: PrismaService) {}

  public async updateViewsInPanel(
    props: UpdateViewsInPanelProps,
  ): Promise<any> {
    await this.prisma.$transaction(async () => {
      await this.prisma.view.deleteMany({
        where: {
          panelId: props.panelId,
        },
      });
    });
  }
}
