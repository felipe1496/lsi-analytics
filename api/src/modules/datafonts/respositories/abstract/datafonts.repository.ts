import { DataFontProvider, TypeOfStorage } from 'src/core/domain/types/common';
import {
  TextFilterMode,
  TextFilterOperator,
} from 'src/core/domain/types/filters';

import { DataFont } from 'src/modules/datafonts/entities/datafont.entity';

export type CreateDataFontProps = {
  name: string;
  accessKey?: string;
  typeOfStorage: TypeOfStorage;
  provider: DataFontProvider;
  userId: string;
};

export type DeleteDataFontProps = {
  userId: string;
  dataFontId: string;
};

export type FindDataFontProps = {
  userId?: string;
  dataFontId: string;
};

export type FindAllDataFontFilters = {
  name?: Partial<Record<TextFilterOperator, string>> & {
    mode?: TextFilterMode;
  };
};

export type FindAllDataFontProps = {
  userId: string;
  filters?: FindAllDataFontFilters;
};

export abstract class DataFontsRepository {
  public abstract create(props: CreateDataFontProps): Promise<DataFont>;

  public abstract findAll(props: FindAllDataFontProps): Promise<DataFont[]>;

  public abstract delete(props: DeleteDataFontProps): Promise<void>;

  public abstract find(props: FindDataFontProps): Promise<DataFont | null>;
}
