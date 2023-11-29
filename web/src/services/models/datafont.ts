import { DataFontProviderEnum, TypeOfStorageEnum } from './types/common';

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
