import { IsOptional, IsString } from 'class-validator';
import { DtoMessages } from 'src/utils/dtos/dto-messages';

export class CreatePieChartWithViewDto {
  @IsString({ message: DtoMessages.isString('Título') })
  @IsOptional()
  title?: string;

  @IsString({ message: DtoMessages.isString('Subtítulo') })
  @IsOptional()
  subTitle?: string;

  @IsString({ message: DtoMessages.isString('Coluna categoria') })
  labelColumn: string;

  @IsString({ message: DtoMessages.isString('Coluna valor') })
  valueColumn: string;
}
