import { IsIn, IsObject, IsOptional, IsString } from 'class-validator';
import { CreatePieChartDto } from './create-pie-chart.dto';
import { ViewContentUpdate, ViewType } from 'src/core/domain/types/common';

export class CreateViewDto {
  @IsString()
  id: string;

  @IsIn(['PIECHART'])
  type: ViewType;

  @IsIn(['STATIC', 'DYNAMIC'])
  contentUpdate: ViewContentUpdate;

  @IsOptional()
  @IsString()
  sql: string;

  @IsObject()
  core: CreatePieChartDto;

  @IsString()
  panelId: string;

  @IsString()
  datafontId: string;
}
