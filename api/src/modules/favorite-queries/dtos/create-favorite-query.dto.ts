import { IsNotEmpty, IsString } from 'class-validator';

import { DtoMessages } from 'src/utils/dtos/dto-messages';

export class CreateFavoriteQueryDto {
  @IsString({ message: DtoMessages.isString('sql') })
  @IsNotEmpty({ message: DtoMessages.IsNotEmpty('sql') })
  sql: string;

  @IsString({ message: DtoMessages.isString('datafontId') })
  @IsNotEmpty({ message: DtoMessages.IsNotEmpty('datafontId') })
  datafontId: string;

  @IsString({ message: DtoMessages.isString('Nome') })
  @IsNotEmpty({ message: DtoMessages.IsNotEmpty('Nome') })
  name: string;
}
