import { IsIn, IsObject, IsOptional, IsString } from 'class-validator';
import { CreatePieChartDto } from './create-pie-chart.dto';
import { ViewContentUpdate, ViewType } from 'src/core/domain/types/common';
import { CreateBarChartDto } from './create-bar-chart.dto';

export class CreateViewDto {
  @IsString()
  id: string;

  @IsString()
  name: string;

  @IsIn(['PIECHART', 'BARCHART', 'LINECHART'])
  type: ViewType;

  @IsIn(['STATIC', 'DYNAMIC'])
  contentUpdate: ViewContentUpdate;

  @IsOptional()
  @IsString()
  sql: string;

  @IsObject()
  core: CreatePieChartDto | CreateBarChartDto;

  /* @IsString()
  panelId: string; */

  @IsString()
  datafontId: string;

  @IsObject()
  @IsOptional()
  staticData?: object;
}
