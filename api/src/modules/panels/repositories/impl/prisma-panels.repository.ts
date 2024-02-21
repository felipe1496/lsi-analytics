import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/services/prisma/prisma.service';
import { PanelsMapper } from '../../mappers/panels.mapper';
import {
  CreatePanelProps,
  DeleteProps,
  FindAllProps,
  FindChartViews,
  FindPanelProps,
  PanelsRepository,
  UpdateProps,
} from '../abstract/panels.repository';

@Injectable()
export class PrismaPanelsRepository implements PanelsRepository {
  constructor(private prisma: PrismaService) {}

  public async create(props: CreatePanelProps) {
    const panel = await this.prisma.panel.create({
      data: {
        ...props,
      },
    });

    return PanelsMapper.toDomain(panel);
  }

  public async find(props: FindPanelProps) {
    const panel = await this.prisma.panel.findFirst({
      where: {
        id: props.id,
        userId: props.userId,
      },
    });

    if (!panel) {
      return null;
    }

    return PanelsMapper.toDomain(panel);
  }

  public async findAll(props: FindAllProps) {
    const panels = await this.prisma.panel.findMany({
      where: {
        userId: props.userId,
      },
    });

    return panels.map(PanelsMapper.toDomain);
  }

  public async update(props: UpdateProps) {
    const panel = await this.prisma.panel.update({
      where: {
        id: props.panelId,
        userId: props.userId,
      },
      data: props.panel,
    });

    return PanelsMapper.toDomain(panel);
  }

  public async delete(props: DeleteProps) {
    await this.prisma.panel.delete({
      where: {
        id: props.id,
      },
    });
  }

  public async findChartViews(props: FindChartViews) {
    const panel = await this.prisma.panel.findFirst({
      where: {
        id: props.id,
        userId: props.userId,
      },
      include: {
        views: {
          include: {
            pieChart: true,
          },
        },
      },
    });

    if (!panel) {
      return null;
    }

    return PanelsMapper.toDomain(panel);
  }
}