import { IsIn, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { FeedbackType } from 'src/core/domain/types/common';
import { DtoMessages } from 'src/utils/dtos/dto-messages';

export class CreateFeedbackDto {
  @IsString({ message: DtoMessages.isString('Nome') })
  @IsNotEmpty({ message: DtoMessages.IsNotEmpty('Nome') })
  text: string;

  @IsString({ message: DtoMessages.isString('Tipo de feedback') })
  @IsIn(['BUG', 'IDEA', 'SUPPORT'], {
    message: DtoMessages.invalid('Tipo de feedback'),
  })
  @IsNotEmpty({
    message: DtoMessages.IsNotEmpty('Tipo de feedback'),
  })
  type: FeedbackType;

  @IsOptional()
  @IsString({ message: DtoMessages.isString('Image') })
  image?: string;
}
