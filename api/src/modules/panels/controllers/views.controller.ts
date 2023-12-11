import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from 'src/guards/auth/auth.guard';

@Controller('/panels/views')
export class ViewsController {
  /* @Post()
  @UseGuards(AuthGuard)
  @HttpCode(HttpStatus.CREATED)
  public async create(@Req() request: Request, @Body() createViewDto) {
    const userId = request.userId;
    const panel = await this.panelsRepository.create({
      ...createPanelDto,
      userId,
    });

    return PanelsMapper.toHTTP(panel);
  } */
}
