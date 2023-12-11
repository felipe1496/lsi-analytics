import { IsNotEmpty, IsString } from 'class-validator';
import { DtoMessages } from 'src/utils/dtos/dto-messages';
import { IdDto } from 'src/utils/dtos/id.dto';

export class TablesDto extends IdDto {
  @IsString({ message: DtoMessages.isString('Schema') })
  @IsNotEmpty({ message: DtoMessages.IsNotEmpty('Schema') })
  schema: string;
}
