import { IsIn, IsObject, IsOptional, IsString } from 'class-validator';
import { ViewContentUpdate, ViewType } from 'src/core/domain/types/common';
import { CreateBarChartDto } from './create-bar-chart.dto';
import { CreateLineChartDto } from './create-line-chart.dto';
import { CreateNumberViewDto } from './create-number-view';
import { CreatePieChartDto } from './create-pie-chart.dto';
import { CreateSelectFilterDto } from './create-select-filter.dto';

export class CreateViewDto {
  @IsString()
  id: string;

  @IsString()
  name: string;

  @IsIn(['PIECHART', 'BARCHART', 'LINECHART', 'NUMBERVIEW', 'SELECTFILTER'])
  type: ViewType;

  @IsIn(['STATIC', 'DYNAMIC'])
  contentUpdate: ViewContentUpdate;

  @IsOptional()
  @IsString()
  sql: string;

  @IsObject()
  core:
    | CreatePieChartDto
    | CreateBarChartDto
    | CreateLineChartDto
    | CreateNumberViewDto
    | CreateSelectFilterDto;

  @IsString()
  datafontId: string;
}
