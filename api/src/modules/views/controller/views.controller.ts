import {
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ViewsRepository } from '../repositories/abstract/views.repository';
import { AuthGuard } from 'src/guards/auth/auth.guard';
import { ViewsMapper } from '../mappers/views.mapper';

@Controller('/views')
export class ViewsController {
  constructor(private viewsRepository: ViewsRepository) {}

  @Get('/')
  @UseGuards(AuthGuard)
  @HttpCode(HttpStatus.OK)
  public async findAll(@Query('panelId') panelId?: string) {
    const views = await this.viewsRepository.findAll({ filters: { panelId } });

    return { views: views.map(ViewsMapper.toHttp) };
  }
}
