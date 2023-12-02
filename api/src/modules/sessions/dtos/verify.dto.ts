import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class VerifyDto {
  @IsEmail({}, { message: 'E-mail deve ser válido' })
  @IsNotEmpty({ message: 'E-mail não pode ser vazio' })
  email: string;

  @IsString({ message: 'Senha deve ser um texto' })
  @IsNotEmpty({ message: 'Senha não pode ser vazia' })
  password: string;
}
