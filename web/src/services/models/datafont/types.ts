import { BaseModel } from '../types';

export type Column =
  | 'STRING'
  | 'DATE'
  | 'NUMBER'
  | 'BOOLEAN'
  | 'OBJECT'
  | 'UNDEFINED';

export type SQLResult = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  rows: any[];
  metadata: {
    columns: {
      name: string;
      dataType: Column;
    }[];
  };
  sql: string;
};

export type TypeOfStorage = 'DATABASE' | 'FILE';

export type DataFontProvider = 'POSTGRESQL' | 'CSV';

export type DataFontModel = BaseModel & {
  name: string;
  typeOfStorage: TypeOfStorage;
  provider: DataFontProvider;
  accessKey?: string;
  userId: string;
};
