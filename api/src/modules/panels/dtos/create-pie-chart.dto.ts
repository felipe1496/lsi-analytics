import { IsObject, IsOptional, IsString } from 'class-validator';

export class CreatePieChartDto {
  @IsOptional()
  @IsString()
  title?: string;

  @IsOptional()
  @IsString()
  subTitle?: string;

  @IsString()
  labelColumn: string;

  @IsString()
  valueColumn: string;

  @IsOptional()
  @IsObject()
  staticData?: object;
}
