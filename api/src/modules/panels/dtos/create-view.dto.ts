import {
  IsIn,
  IsObject,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { ViewContentUpdate, ViewType } from 'src/core/domain/types/common';
import { DtoMessages } from 'src/utils/dtos/dto-messages';
import { CreatePieChartWithViewDto } from './create-pie-chart-with-view.dto';
import { Type } from 'class-transformer';

export class CreateViewDto {
  @IsIn(['PIECHART'], { message: DtoMessages.invalid('Tipo de visualização') })
  @IsString({ message: DtoMessages.isString('Tipo de visualização') })
  type: ViewType;

  @IsIn(['STATIC', 'DYNAMIC'], {
    message: DtoMessages.invalid('Tipo de visualização'),
  })
  @IsString({ message: DtoMessages.isString('Atualização do conteúdo') })
  contentUpdate: ViewContentUpdate;

  @IsString({ message: DtoMessages.isString('SQL') })
  @IsOptional()
  sql?: string;

  @IsString({ message: DtoMessages.isString('ID do painel') })
  panelId: string;

  @ValidateNested({ each: true })
  @Type(() => CreatePieChartWithViewDto)
  @IsObject({ message: DtoMessages.isObject('Core') })
  core: CreatePieChartWithViewDto;
}
