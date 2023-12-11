import { Module } from '@nestjs/common';
import { PanelsController } from './controllers/panels.controller';
import { PanelsRepository } from './repositories/panels.repository';

@Module({
  controllers: [PanelsController],
  providers: [PanelsRepository],
})
export class PanelsModule {}
