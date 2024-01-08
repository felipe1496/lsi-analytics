import { Module } from '@nestjs/common';
import { PanelsController } from './controllers/panels.controller';
import { PrismaPanelsRepository } from './repositories/impl/prisma-panels.repository';
import { PanelsRepository } from './repositories/abstract/panels.repository';
import { ViewsRepository } from './repositories/abstract/views.repository';
import { PrismaViewsRepository } from './repositories/impl/prisma-views.repository';
import { ViewsController } from './controllers/views.controller';

@Module({
  controllers: [PanelsController, ViewsController],
  providers: [
    {
      provide: PanelsRepository,
      useClass: PrismaPanelsRepository,
    },
    {
      provide: ViewsRepository,
      useClass: PrismaViewsRepository,
    },
  ],
})
export class PanelsModule {}
