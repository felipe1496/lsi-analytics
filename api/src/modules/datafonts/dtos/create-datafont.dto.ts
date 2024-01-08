import { IsIn, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { DataFontProvider, TypeOfStorage } from 'src/core/domain/types/common';

import { DtoMessages } from 'src/utils/dtos/dto-messages';

export class CreateDataFontDto {
  @IsString({ message: DtoMessages.isString('Nome') })
  @IsNotEmpty({ message: DtoMessages.IsNotEmpty('Nome') })
  name: string;

  @IsString({ message: DtoMessages.isString('Chave de acesso') })
  @IsOptional()
  accessKey?: string;

  @IsIn(['DATABASE', 'FILE'], {
    message: DtoMessages.invalid('Tipo de armazenamento'),
  })
  @IsNotEmpty({
    message: DtoMessages.IsNotEmpty('Tipo de armazenamento'),
  })
  typeOfStorage: TypeOfStorage;

  @IsIn(['POSTGRESQL', 'CSV'], {
    message: DtoMessages.invalid('Provedor'),
  })
  @IsNotEmpty({
    message: DtoMessages.IsNotEmpty('Provedor'),
  })
  provider: DataFontProvider;
}
