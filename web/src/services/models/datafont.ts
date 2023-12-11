export type TypeOfStorageEnum = 'DATABASE' | 'FILE';

export type DataFontProviderEnum = 'POSTGRESQL' | 'CSV';

export type DataFontModel = {
  id: string;
  name: string;
  typeOfStorage: TypeOfStorageEnum;
  provider: DataFontProviderEnum;
  accessKey?: string;
  userId: string;
  createdAt: Date;
  updatedAt: Date;
};
