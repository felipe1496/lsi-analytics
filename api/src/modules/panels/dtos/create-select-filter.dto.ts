import { IsArray, IsString } from 'class-validator';

export class CreateSelectFilterDto {
  @IsString()
  labelColumn: string;

  @IsArray()
  @IsString({ each: true })
  filterViews: string[];
}
