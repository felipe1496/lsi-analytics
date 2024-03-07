import { Module } from '@nestjs/common';
import { DataFontsRepository } from '../datafonts/respositories/abstract/datafonts.repository';
import { PrismaDataFontsRepository } from '../datafonts/respositories/impl/prisma-datafonts.repository';
import { PanelsController } from './controllers/panels.controller';
import { PanelsRepository } from './repositories/abstract/panels.repository';
import { PrismaPanelsRepository } from './repositories/impl/prisma-panels.repository';

@Module({
  controllers: [PanelsController],
  providers: [
    {
      provide: PanelsRepository,
      useClass: PrismaPanelsRepository,
    },

    {
      provide: DataFontsRepository,
      useClass: PrismaDataFontsRepository,
    },
  ],
})
export class PanelsModule {}
