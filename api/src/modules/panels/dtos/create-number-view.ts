import { IsBoolean, IsHexColor, IsNumber, IsString } from 'class-validator';

export class CreateNumberViewDto {
  @IsString()
  labelColumn: string;

  @IsString()
  valueColumn: string;

  @IsString()
  subTitle: string;

  @IsBoolean()
  isPercentage: boolean;

  @IsNumber()
  numberOfDecimaPlaces: number;

  @IsString()
  @IsHexColor()
  stripeColor: string;
}
