import { IsIn, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import {
  DataFontProviderEnum,
  TypeOfStorageEnum,
} from 'src/core/domain/types/common';
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
  typeOfStorage: TypeOfStorageEnum;

  @IsIn(['POSTGRESQL', 'CSV'], {
    message: DtoMessages.invalid('Provedor'),
  })
  @IsNotEmpty({
    message: DtoMessages.IsNotEmpty('Provedor'),
  })
  provider: DataFontProviderEnum;

  @IsNotEmpty({
    message: DtoMessages.IsNotEmpty('Id do Usuário'),
  })
  @IsString({
    message: DtoMessages.isString('Id do Usuário'),
  })
  userId: string;
}
