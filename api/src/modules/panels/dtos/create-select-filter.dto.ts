import { IsString } from 'class-validator';

export class CreateSelectFilterDto {
  @IsString()
  labelColumn: string;
}
