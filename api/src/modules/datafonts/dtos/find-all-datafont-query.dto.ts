import { IsOptional, IsString } from 'class-validator';

export class FindAllDatafontQueryDto {
  @IsOptional()
  @IsString()
  storageType?: string;
}
