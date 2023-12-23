import { Module } from '@nestjs/common';
import { PanelsController } from './controllers/panels.controller';
import { PrismaPanelsRepository } from './repositories/impl/prisma-panels.repository';
import { PanelsRepository } from './repositories/abstract/panels.repository';

@Module({
  controllers: [PanelsController],
  providers: [
    {
      provide: PanelsRepository,
      useClass: PrismaPanelsRepository,
    },
  ],
})
export class PanelsModule {}
