import { IsNotEmpty, IsString } from 'class-validator';
import { DtoMessages } from './dto-messages';

export class IdDto {
  @IsNotEmpty({ message: DtoMessages.IsNotEmpty('Id') })
  @IsString({ message: DtoMessages.isString('Id') })
  id: string;
}
