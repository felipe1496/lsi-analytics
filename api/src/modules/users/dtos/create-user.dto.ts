import { IsDateString, IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class CreateUserDto {
  @IsString({ message: 'Nome deve ser um texto' })
  @IsNotEmpty({ message: 'Nome não pode ser vazio' })
  name: string;

  @IsEmail({}, { message: 'E-mail deve ser válido' })
  @IsNotEmpty({ message: 'E-mail não pode ser vazio' })
  email: string;

  @IsString({ message: 'Senha deve ser um texto' })
  @IsNotEmpty({ message: 'Senha não pode ser vazia' })
  password: string;

  @IsDateString({}, { message: 'A data deve ser válida' })
  @IsNotEmpty({ message: 'Data de nascimento não pode ser vazia' })
  birthDay: Date;

  imageURL?: string;
}
