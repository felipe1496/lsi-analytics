import {
  IsArray,
  IsObject,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';

import { Type } from 'class-transformer';
import { DtoMessages } from 'src/utils/dtos/dto-messages';
import { CreateViewDto } from './create-view.dto';

export class UpdatePanelDto {
  @IsString({ message: DtoMessages.isString('Nome') })
  @IsOptional()
  name?: string;

  @IsString({ message: DtoMessages.isString('Descrição') })
  @IsOptional()
  description?: string;

  @IsObject()
  @IsOptional()
  layout?: object;

  @IsString({ message: DtoMessages.isString('ID do usuário') })
  @IsOptional()
  userId?: string;

  @IsString({ message: DtoMessages.isString('URL da imagem') })
  @IsOptional()
  imageURL?: string;

  @IsOptional()
  @IsArray({ message: DtoMessages.isArray('Visualizações') })
  @Type(() => CreateViewDto)
  @ValidateNested({ each: true })
  createViews?: CreateViewDto[];

  @IsOptional()
  deleteViewIds?: string[];
}
