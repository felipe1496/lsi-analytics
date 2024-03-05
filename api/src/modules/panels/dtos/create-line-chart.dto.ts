import { IsArray, IsString } from 'class-validator';

export class CreateLineChartDto {
  @IsString()
  labelColumn: string;

  @IsArray()
  @IsString({ each: true })
  valueColumn: string[];
}
