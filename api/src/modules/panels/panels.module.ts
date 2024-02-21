import { Module } from '@nestjs/common';
import { PanelsController } from './controllers/panels.controller';
import { PrismaPanelsRepository } from './repositories/impl/prisma-panels.repository';
import { PanelsRepository } from './repositories/abstract/panels.repository';
import { ViewsRepository } from './repositories/abstract/views.repository';
import { PrismaViewsRepository } from './repositories/impl/prisma-views.repository';
import { DataFontsRepository } from '../datafonts/respositories/abstract/datafonts.repository';
import { PrismaDataFontsRepository } from '../datafonts/respositories/impl/prisma-datafonts.repository';

@Module({
  controllers: [PanelsController],
  providers: [
    {
      provide: PanelsRepository,
      useClass: PrismaPanelsRepository,
    },
    {
      provide: ViewsRepository,
      useClass: PrismaViewsRepository,
    },
    {
      provide: DataFontsRepository,
      useClass: PrismaDataFontsRepository,
    },
  ],
})
export class PanelsModule {}
