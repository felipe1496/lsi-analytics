import { IsOptional, IsString } from 'class-validator';

export class UpdatePanelDto {
  @IsString()
  @IsOptional()
  name?: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsString()
  @IsOptional()
  userId?: string;

  @IsString()
  @IsOptional()
  imageURL?: string;
}
