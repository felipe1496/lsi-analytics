import { IsString } from 'class-validator';

export class CreatePieChartDto {
  @IsString()
  labelColumn: string;

  @IsString()
  valueColumn: string;
}
