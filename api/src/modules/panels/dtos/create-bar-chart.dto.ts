import { IsString } from 'class-validator';

export class CreateBarChartDto {
  @IsString()
  labelColumn: string;

  @IsString()
  valueColumn: string;
}
