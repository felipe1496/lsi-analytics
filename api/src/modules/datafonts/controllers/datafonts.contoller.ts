import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { Request } from 'express';
import { AuthGuard } from 'src/guards/auth/auth.guard';
import { CreateDataFontDto } from '../dtos/create-datafont.dto';
import { DataFontsRepository } from '../respositories/abstract/datafonts.repository';
import { DataFontsMapper } from '../mappers/datafonts.mapper';
import { IdDto } from 'src/utils/dtos/id.dto';

@Controller('/datafonts')
export class DataFontsController {
  constructor(private readonly dataFontsRepository: DataFontsRepository) {}

  @Post()
  @UseGuards(AuthGuard)
  @HttpCode(HttpStatus.CREATED)
  public async create(
    @Req() request: Request,
    @Body() createDataFontDto: CreateDataFontDto,
  ) {
    const userId = request.userId;
    const createdDataFont = await this.dataFontsRepository.create({
      ...createDataFontDto,
      userId,
    });

    return DataFontsMapper.toHTTP(createdDataFont);
  }

  @Get()
  @UseGuards(AuthGuard)
  @HttpCode(HttpStatus.OK)
  public async findAll(@Req() request: Request) {
    const userId = request.userId;
    const dataFonts = await this.dataFontsRepository.findAll(userId);

    return dataFonts.map(DataFontsMapper.toHTTP);
  }

  @Delete('/:id')
  @UseGuards(AuthGuard)
  @HttpCode(HttpStatus.NO_CONTENT)
  public async delete(@Req() request: Request, @Param() param: IdDto) {
    const userId = request.userId;

    return await this.dataFontsRepository.delete({
      dataFontId: param.id,
      userId,
    });
  }
}
