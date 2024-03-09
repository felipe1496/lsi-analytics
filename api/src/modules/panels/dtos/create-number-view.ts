import { IsBoolean, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateNumberViewDto {
  @IsString()
  labelColumn: string;

  @IsString()
  subTitle: string;

  @IsBoolean()
  isPercentage: boolean;

  @IsNumber()
  @IsOptional()
  numberOfDecimaPlaces?: number;
}
