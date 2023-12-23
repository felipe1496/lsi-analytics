import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { CreatePanelDto } from '../dtos/create-panel.dto';

import { PanelsMapper } from '../mappers/panels.mapper';
import { Request } from 'express';
import { AuthGuard } from 'src/guards/auth/auth.guard';
import { IdDto } from 'src/utils/dtos/id.dto';
import { UpdatePanelDto } from '../dtos/update-panel.dto';
import { PanelsRepository } from '../repositories/abstract/panels.repository';

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
    const userId = request.userId;
    const panel = await this.panelsRepository.create({
      ...createPanelDto,
      userId,
    });

    return PanelsMapper.toHTTP(panel);
  }

  @Get('/:id')
  @UseGuards(AuthGuard)
  @HttpCode(HttpStatus.OK)
  public async find(@Req() request: Request, @Param() param: IdDto) {
    const panel = await this.panelsRepository.find({
      id: param.id,
      userId: request.userId,
    });

    return PanelsMapper.toHTTP(panel);
  }

  @Get()
  @UseGuards(AuthGuard)
  @HttpCode(HttpStatus.OK)
  public async findAll(@Req() request: Request) {
    const panels = await this.panelsRepository.findAll({
      userId: request.userId,
    });

    return panels.map(PanelsMapper.toHTTP);
  }

  @Patch('/:id')
  @UseGuards(AuthGuard)
  @HttpCode(HttpStatus.OK)
  public async update(
    @Req() request: Request,
    @Param() param: IdDto,
    @Body() updatePanelDto: UpdatePanelDto,
  ) {
    const userId = request.userId;
    const panelId = param.id;
    const panel = await this.panelsRepository.update({
      userId,
      panelId,
      panel: updatePanelDto,
    });

    return { panel };
  }
}
