import { IsDateString, IsEmail, IsOptional, IsString } from 'class-validator';
import { DtoMessages } from 'src/utils/dtos/dto-messages';

export class UpdateUserDto {
  @IsString({ message: DtoMessages.isString('Nome') })
  @IsOptional()
  name?: string;

  @IsEmail({}, { message: DtoMessages.isEmail('E-mail') })
  @IsOptional()
  email?: string;

  @IsDateString({}, { message: DtoMessages.isDateString('Data de nascimento') })
  @IsOptional()
  birthDay?: Date;

  @IsDateString({}, { message: DtoMessages.isDateString('URL da imagem') })
  @IsOptional()
  imageURL?: string;
}
