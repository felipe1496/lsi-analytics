import { Entity, PropsConstructor } from 'src/core/domain/Entity';
import {
  DataFontProviderEnum,
  TypeOfStorageEnum,
} from 'src/core/domain/types/common';

export interface DataFontProps {
  name: string;
  accessKey: string;
  typeOfStorage: TypeOfStorageEnum;
  provider: DataFontProviderEnum;
  userId: string;
}

export class DataFont extends Entity<DataFontProps> {
  constructor(props: PropsConstructor<DataFontProps>) {
    super(props);
  }
}
