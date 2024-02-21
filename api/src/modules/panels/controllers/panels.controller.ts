import {
  Body,
  Controller,
  Delete,
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
import { PrismaService } from 'src/services/prisma/prisma.service';

import { PanelNotFoundError } from '../errors/panel-not-found.error';
import { DataFontsRepository } from 'src/modules/datafonts/respositories/abstract/datafonts.repository';
import { DataFontNotFoundError } from 'src/modules/datafonts/errors/datafont-not-found.error';
import { InvalidDataFontError } from 'src/modules/datafonts/errors/invalid-datafont.error';
import { PostgresqlService } from 'src/services/databases/postgresql.service';
import { ViewsMapper } from '../mappers/views.mapper';

@Controller('/panels')
export class PanelsController {
  constructor(
    private panelsRepository: PanelsRepository,
    private prisma: PrismaService,
    private datafontRepository: DataFontsRepository,
  ) {}

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

    console.log('paineeel:', panel);

    if (!panel) {
      throw new PanelNotFoundError();
    }

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
    const currentPanel = await this.prisma.panel.findFirst({
      where: {
        id: param.id,
        userId: request.userId,
      },
      include: {
        views: true,
      },
    });

    if (!currentPanel) {
      throw new PanelNotFoundError();
    }

    const toUpdatePanelProps = {
      name: updatePanelDto.name,
      description: updatePanelDto.description,
      imageURL: updatePanelDto.imageURL,
      userId: updatePanelDto.userId,
      layout: updatePanelDto.layout,
    };

    await this.prisma.panel.update({
      where: {
        id: param.id,
      },
      data: toUpdatePanelProps,
    });

    if (updatePanelDto.createViews && updatePanelDto.createViews.length > 0) {
      await Promise.all(
        updatePanelDto.createViews.map(async (c) => {
          const { core, ...view } = c;
          switch (c.type) {
            case 'PIECHART':
              await this.prisma.view.create({
                data: {
                  ...view,
                  pieChart: {
                    create: core,
                  },
                },
              });
              break;
            default:
              break;
          }
        }),
      );
    }

    if (
      updatePanelDto.deleteViewIds &&
      updatePanelDto.deleteViewIds.length > 0
    ) {
      await this.prisma.view.deleteMany({
        where: {
          id: {
            in: updatePanelDto.deleteViewIds,
          },
        },
      });
    }
  }

  @Delete('/:id')
  @UseGuards(AuthGuard)
  @HttpCode(HttpStatus.NO_CONTENT)
  public async delete(@Param() param: IdDto) {
    await this.panelsRepository.delete({
      id: param.id,
    });
  }

  @Get('/chart-views/:id')
  @UseGuards(AuthGuard)
  @HttpCode(HttpStatus.OK)
  public async findChartViews(@Req() request: Request, @Param() param: IdDto) {
    const panel = await this.panelsRepository.findChartViews({
      id: param.id,
      userId: request.userId,
    });

    if (!panel) {
      throw new PanelNotFoundError();
    }

    if (!panel.props.views) {
      return PanelsMapper.toHTTP(panel);
    }

    const views = await Promise.all(
      panel.props.views.map(async (v) => {
        const datafont = await this.datafontRepository.find({
          dataFontId: v.props.datafontId,
        });

        if (!datafont) {
          throw new DataFontNotFoundError();
        }

        if (!datafont.props.accessKey || !v.props.sql) {
          throw new InvalidDataFontError();
        }

        const postgresqlService = new PostgresqlService({
          accessKey: datafont.props.accessKey,
        });

        const queryResult = await postgresqlService.query(v.props.sql);
        const view = ViewsMapper.toHttp(v);

        return { queryResult, view };
      }),
    );

    return {
      panel: PanelsMapper.toHTTP(panel),
      views,
    };
  }
}
