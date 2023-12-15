import { IsNotEmpty, IsString } from 'class-validator';

import { DtoMessages } from 'src/utils/dtos/dto-messages';

export class SqlDto {
  @IsString({ message: DtoMessages.isString('Sql') })
  @IsNotEmpty({ message: DtoMessages.IsNotEmpty('Sql') })
  sql: string;

  @IsString({ message: DtoMessages.isString('Fonte de dados') })
  @IsNotEmpty({ message: DtoMessages.IsNotEmpty('Fonte de dados') })
  datafontId: string;
}
