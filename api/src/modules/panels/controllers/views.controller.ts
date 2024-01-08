import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { Request } from 'express';
import { AuthGuard } from 'src/guards/auth/auth.guard';
import { CreateViewDto } from '../dtos/create-view.dto';
import { ViewsRepository } from '../repositories/abstract/views.repository';

@Controller('/views')
export class ViewsController {
  constructor(private viewsRepository: ViewsRepository) {}

  @Post('/pie-charts')
  @UseGuards(AuthGuard)
  @HttpCode(HttpStatus.CREATED)
  public async createWithPieChart(
    @Req() request: Request,
    @Body() createViewDto: CreateViewDto,
  ) {
    const { type, sql, contentUpdate, panelId, core } = createViewDto;

    await this.viewsRepository.createWithCore({
      type,
      sql,
      contentUpdate,
      panelId,
      core,
    });

    return createViewDto;
  }
}
