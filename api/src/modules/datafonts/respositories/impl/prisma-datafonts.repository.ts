import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/services/prisma/prisma.service';
import {
  CreateDataFontProps,
  DataFontsRepository,
  DeleteDataFontProps,
  FindAllDataFontProps,
  FindDataFontProps,
} from '../abstract/datafonts.repository';
import { DataFont } from '../../entities/datafont.entity';
import { DataFontsMapper } from '../../mappers/datafonts.mapper';

@Injectable()
export class PrismaDataFontsRepository implements DataFontsRepository {
  constructor(private prisma: PrismaService) {}

  public async create(props: CreateDataFontProps): Promise<DataFont> {
    const dataFont = await this.prisma.dataFont.create({
      data: { ...props },
    });

    return DataFontsMapper.toDomain(dataFont);
  }

  public async findAll({
    userId,
    filters,
  }: FindAllDataFontProps): Promise<DataFont[]> {
    const dataFonts = await this.prisma.dataFont.findMany({
      where: {
        userId,
        ...filters,
      },
    });

    return dataFonts.map(DataFontsMapper.toDomain);
  }

  public async delete(props: DeleteDataFontProps): Promise<void> {
    await this.prisma.dataFont.delete({
      where: {
        id: props.dataFontId,
        userId: props.userId,
      },
    });
  }

  public async find(props: FindDataFontProps): Promise<DataFont | null> {
    const dataFont = await this.prisma.dataFont.findFirst({
      where: {
        userId: props.userId,
        id: props.dataFontId,
      },
    });

    if (!dataFont) {
      return null;
    }

    return DataFontsMapper.toDomain(dataFont);
  }
}
