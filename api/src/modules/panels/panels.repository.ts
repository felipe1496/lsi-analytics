import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/services/prisma/prisma.service';
import { PanelsMapper } from './panels.mapper';

interface SaveUserProps {
  name: string;
  description: string;
  userId: string;
}

@Injectable()
export class PanelsRepository {
  constructor(private prisma: PrismaService) {}

  public async create(props: SaveUserProps) {
    const user = await this.prisma.panel.create({
      data: {
        ...props,
      },
    });

    return PanelsMapper.toDomain(user);
  }
}
