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
import { SqlDto } from '../dtos/sql.dto';
import { DataFontsMapper } from '../mappers/datafonts.mapper';
import { IdDto } from 'src/utils/dtos/id.dto';
import { PostgresqlService } from 'src/services/databases/postgresql.service';
import { InvalidDataFontError } from '../errors/invalid-datafont.error';
import { TablesDto } from '../dtos/tables.dto';

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

  @Get('/:id/schemas')
  @UseGuards(AuthGuard)
  @HttpCode(HttpStatus.OK)
  public async schemas(@Req() request: Request, @Param() param: IdDto) {
    const userId = request.userId;

    const datafont = await this.dataFontsRepository.find({
      userId,
      dataFontId: param.id,
    });

    if (!datafont) {
      throw new InvalidDataFontError();
    }

    const postgresqlService = new PostgresqlService({
      accessKey: datafont.props.accessKey,
    });

    const schemas = await postgresqlService.schemas();

    return {
      schemas,
    };
  }

  @Get('/:id/:schema/tables')
  @UseGuards(AuthGuard)
  @HttpCode(HttpStatus.OK)
  public async tables(@Req() request: Request, @Param() param: TablesDto) {
    const userId = request.userId;

    const datafont = await this.dataFontsRepository.find({
      userId,
      dataFontId: param.id,
    });

    if (!datafont) {
      throw new InvalidDataFontError();
    }

    const postgresqlService = new PostgresqlService({
      accessKey: datafont.props.accessKey,
    });

    const tables = await postgresqlService.tables(param.schema);

    return { tables };
  }

  @Post('/sql')
  @UseGuards(AuthGuard)
  @HttpCode(HttpStatus.OK)
  public async sql(@Req() request: Request, @Body() sqlDto: SqlDto) {
    const userId = request.userId;

    const datafont = await this.dataFontsRepository.find({
      userId,
      dataFontId: sqlDto.datafontId,
    });

    if (!datafont) {
      throw new InvalidDataFontError();
    }

    const postgresqlService = new PostgresqlService({
      accessKey: datafont.props.accessKey,
    });

    const result = await postgresqlService.query(sqlDto.sql);

    return result;
  }
}
