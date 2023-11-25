import { Module } from '@nestjs/common';
import { PanelsController } from './panels.controller';
import { PanelsRepository } from './panels.repository';

@Module({
  controllers: [PanelsController],
  providers: [PanelsRepository],
})
export class PanelsModule {}
