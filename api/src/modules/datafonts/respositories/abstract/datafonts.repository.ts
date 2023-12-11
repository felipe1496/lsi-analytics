import {
  DataFontProviderEnum,
  TypeOfStorageEnum,
} from 'src/core/domain/types/common';
import { DataFont } from 'src/modules/datafonts/entities/datafont.entity';

export type CreateDataFontProps = {
  name: string;
  accessKey?: string;
  typeOfStorage: TypeOfStorageEnum;
  provider: DataFontProviderEnum;
  userId: string;
};

export type DeleteDataFontProps = {
  userId: string;
  dataFontId: string;
};

export type FindDataFontProps = {
  userId: string;
  dataFontId: string;
};

export abstract class DataFontsRepository {
  public abstract create(props: CreateDataFontProps): Promise<DataFont>;

  public abstract findAll(userId: string): Promise<DataFont[]>;

  public abstract delete(props: DeleteDataFontProps): Promise<void>;

  public abstract find(props: FindDataFontProps): Promise<DataFont>;
}
