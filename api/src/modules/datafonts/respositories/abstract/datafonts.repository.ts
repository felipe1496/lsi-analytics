import {
  DataFontProviderEnum,
  TypeOfStorageEnum,
} from 'src/core/domain/types/common';
import { DataFont } from 'src/modules/datafonts/entities/datafont.entity';

export type CreateDataFontProps = {
  data: {
    name: string;
    accessKey?: string;
    typeOfStorage: TypeOfStorageEnum;
    provider: DataFontProviderEnum;
  };
  userId: string;
};

export abstract class DataFontsRepository {
  public abstract create(props: CreateDataFontProps): Promise<DataFont>;

  public abstract findAll(userId: string): Promise<DataFont[]>;
}
