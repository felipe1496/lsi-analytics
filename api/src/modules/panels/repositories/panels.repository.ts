import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/services/prisma/prisma.service';
import { PanelsMapper } from '../mappers/panels.mapper';

type CreatePanelProps = {
  name: string;
  description: string;
  userId: string;
};

type FindPanelProps = {
  id: string;
  userId: string;
};

type FindAllProps = {
  userId: string;
};

@Injectable()
export class PanelsRepository {
  constructor(private prisma: PrismaService) {}

  public async create(props: CreatePanelProps) {
    const user = await this.prisma.panel.create({
      data: {
        ...props,
      },
    });

    return PanelsMapper.toDomain(user);
  }

  public async find(props: FindPanelProps) {
    const panel = await this.prisma.panel.findFirst({
      where: {
        id: props.id,
        userId: props.userId,
      },
    });

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
}
