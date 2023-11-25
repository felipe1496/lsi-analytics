import { IsDateString, IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { DtoMessages } from 'src/utils/dto-messages';

export class CreateUserDto {
  @IsString({ message: DtoMessages.isString('Nome') })
  @IsNotEmpty({ message: DtoMessages.IsNotEmpty('Nome') })
  name: string;

  @IsEmail({}, { message: DtoMessages.isEmail('E-mail') })
  @IsNotEmpty({ message: DtoMessages.IsNotEmpty('E-mail') })
  email: string;

  @IsString({ message: DtoMessages.isString('Senha') })
  @IsNotEmpty({ message: DtoMessages.IsNotEmpty('Senha') })
  password: string;

  @IsDateString({}, { message: DtoMessages.isDateString('Data de nascimento') })
  @IsNotEmpty({ message: DtoMessages.IsNotEmpty('Data de nascimento') })
  birthDay: Date;

  imageURL?: string;
}
