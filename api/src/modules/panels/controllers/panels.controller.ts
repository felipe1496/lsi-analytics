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
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { CreatePanelDto } from '../dtos/create-panel.dto';

import { Request } from 'express';
import { AuthGuard } from 'src/guards/auth/auth.guard';
import { PrismaService } from 'src/services/prisma/prisma.service';
import { IdDto } from 'src/utils/dtos/id.dto';
import { UpdatePanelDto } from '../dtos/update-panel.dto';
import { PanelsMapper } from '../mappers/panels.mapper';
import { PanelsRepository } from '../repositories/abstract/panels.repository';

import { DataFontNotFoundError } from 'src/modules/datafonts/errors/datafont-not-found.error';
import { InvalidDataFontError } from 'src/modules/datafonts/errors/invalid-datafont.error';
import { DataFontsRepository } from 'src/modules/datafonts/respositories/abstract/datafonts.repository';
import { PostgresqlService } from 'src/services/databases/postgresql.service';
import { CreateBarChartDto } from '../dtos/create-bar-chart.dto';
import { CreateLineChartDto } from '../dtos/create-line-chart.dto';
import { CreateNumberViewDto } from '../dtos/create-number-view';
import { CreatePieChartDto } from '../dtos/create-pie-chart.dto';
import { CreateSelectFilterDto } from '../dtos/create-select-filter.dto';
import { PanelNotFoundError } from '../errors/panel-not-found.error';
import { CoreViewsMapper } from '../../views/mappers/core-views.mapper';
import { ApplyFilterError } from '../errors/apply-filter.error';
import { ViewsRepository } from 'src/modules/views/repositories/abstract/views.repository';
import { FilterNotFoundError } from '../errors/filter-not-found.error';

@Controller('/panels')
export class PanelsController {
  constructor(
    private panelsRepository: PanelsRepository,
    private prisma: PrismaService,
    private datafontRepository: DataFontsRepository,
    private viewsRepository: ViewsRepository,
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
  @HttpCode(HttpStatus.NO_CONTENT)
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
          const { core, id, name, type, contentUpdate, sql, datafontId } = c;
          switch (c.type) {
            case 'PIECHART': {
              const _core = core as CreatePieChartDto;
              await this.prisma.view.create({
                data: {
                  id,
                  name,
                  type,
                  contentUpdate,
                  sql,
                  panelId: param.id,
                  datafontId,
                  pieChart: {
                    create: _core,
                  },
                },
              });
              break;
            }
            case 'BARCHART': {
              const _core = core as CreateBarChartDto;
              await this.prisma.view.create({
                data: {
                  id,
                  name,
                  type,
                  contentUpdate,
                  sql,
                  panelId: param.id,
                  datafontId,
                  barChart: {
                    create: _core,
                  },
                },
              });
              break;
            }
            case 'LINECHART': {
              const _core = core as CreateLineChartDto;
              await this.prisma.view.create({
                data: {
                  id,
                  name,
                  type,
                  contentUpdate,
                  sql,
                  panelId: param.id,
                  datafontId,
                  lineChart: {
                    create: _core,
                  },
                },
              });
              break;
            }
            case 'NUMBERVIEW': {
              const _core = core as CreateNumberViewDto;
              await this.prisma.view.create({
                data: {
                  id,
                  name,
                  type,
                  contentUpdate,
                  sql,
                  panelId: param.id,
                  datafontId,
                  numberView: {
                    create: _core,
                  },
                },
              });
            }
            case 'SELECTFILTER': {
              const _core = core as CreateSelectFilterDto;
              await this.prisma.view.create({
                data: {
                  id,
                  name,
                  type,
                  contentUpdate,
                  sql,
                  panelId: param.id,
                  datafontId,
                  selectFilter: {
                    create: _core,
                  },
                },
              });
            }
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

  @Get('/:id/chart-views')
  @UseGuards(AuthGuard)
  @HttpCode(HttpStatus.OK)
  public async findChartViews(
    @Req() request: Request,
    @Param() param: IdDto,
    @Query('filter') filter?: string,
  ) {
    const viewId_condition: Record<
      string,
      {
        sql: string;
        filters: { labelColumn: string; value: string | number }[];
      }
    > = {};

    if (filter) {
      const splittedFilter = filter?.split(' and ');
      const selectFilterObjects = splittedFilter.map((sf) => {
        const splittedSf = sf.split(' ');
        if (splittedSf.length !== 2) {
          throw new ApplyFilterError();
        }
        const id = splittedSf[0];
        const value = splittedSf[1];

        return {
          id,
          value,
        };
      });
      const selectFiltersDB = await this.viewsRepository.findManySelectFilters({
        ids: selectFilterObjects.map((sfo) => sfo.id),
      });

      selectFilterObjects.forEach((sfo) => {
        const selectFilterDB = selectFiltersDB.find(
          (sfDB) => sfDB.id === sfo.id,
        );
        if (!selectFilterDB) {
          throw new FilterNotFoundError();
        }

        selectFilterDB.props.filterViews.forEach((id) => {
          const filter = {
            labelColumn: selectFilterDB.props.labelColumn,
            value: sfo.value,
          };
          const condition = ` and "${selectFilterDB.props.labelColumn}" = ${sfo.value}`;
          if (viewId_condition[id]) {
            viewId_condition[id].sql += condition;
            if (viewId_condition[id].filters) {
              viewId_condition[id].filters = [
                ...viewId_condition[id].filters,
                filter,
              ];
            } else {
              viewId_condition[id].filters = [filter];
            }
          } else {
            viewId_condition[id] = {
              sql: condition,
              filters: [filter],
            };
          }
        });
      });
    }

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
        console.log(
          'viewId_condition[v.id as string]: ',
          viewId_condition[v.id as string],
        );

        const queryResult = await postgresqlService.query(
          v.props.sql,
          viewId_condition[v.id as string],
        );
        const view = CoreViewsMapper.toHttp(v);

        const filters = viewId_condition[v.id as string]
          ? viewId_condition[v.id as string].filters
          : [];

        return { queryResult, view, filters };
      }),
    );

    return {
      panel: PanelsMapper.toHTTP(panel),
      views,
    };
  }

  @Get('/:id/views')
  @UseGuards(AuthGuard)
  @HttpCode(HttpStatus.OK)
  public async findChartViewsInfo(
    @Req() request: Request,
    @Param() param: IdDto,
  ) {
    const panel = await this.panelsRepository.findChartViews({
      id: param.id,
      userId: request.userId,
    });

    return panel;
  }
}
