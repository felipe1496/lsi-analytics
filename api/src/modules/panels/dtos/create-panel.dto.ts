import { IsNotEmpty, IsString } from 'class-validator';
import { DtoMessages } from 'src/utils/dto-messages';

export class CreatePanelDto {
  @IsString({ message: DtoMessages.isString('Nome') })
  @IsNotEmpty({ message: DtoMessages.IsNotEmpty('Nome') })
  name: string;

  description: string;
}
