import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { CreatePanelDto } from './dtos/create-panel.dto';
import { PanelsRepository } from './panels.repository';
import { PanelsMapper } from './panels.mapper';
import { Request } from 'express';
import { AuthGuard } from 'src/guards/auth/auth.guard';

@Controller('/panels')
export class PanelsController {
  constructor(private panelsRepository: PanelsRepository) {}

  @Post()
  @UseGuards(AuthGuard)
  @HttpCode(HttpStatus.CREATED)
  public async create(
    @Req() request: Request,
    @Body() createPanelDto: CreatePanelDto,
  ) {
    const userId = request['user'].id;
    const panel = await this.panelsRepository.create({
      ...createPanelDto,
      userId,
    });

    return PanelsMapper.toHTTP(panel);
  }
}
