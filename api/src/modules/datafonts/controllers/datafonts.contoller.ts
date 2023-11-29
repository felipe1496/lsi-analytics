import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { Request } from 'express';
import { AuthGuard } from 'src/guards/auth/auth.guard';
import { CreateDataFontDto } from '../dtos/create-datafont.dto';
import { DataFontsRepository } from '../respositories/abstract/datafonts.repository';
import { DataFontsMapper } from '../mappers/datafonts.mapper';

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
    const userId = request['user'].id;
    const createdDataFont = await this.dataFontsRepository.create({
      data: createDataFontDto,
      userId,
    });

    return DataFontsMapper.toHTTP(createdDataFont);
  }

  @Get()
  @UseGuards(AuthGuard)
  @HttpCode(HttpStatus.OK)
  public async findAll(@Req() request: Request) {
    const userId = request['user'].id;
    const dataFonts = await this.dataFontsRepository.findAll(userId);

    return dataFonts.map(DataFontsMapper.toHTTP);
  }
}
