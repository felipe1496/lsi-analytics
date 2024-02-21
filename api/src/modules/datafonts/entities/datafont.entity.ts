import { Entity, PropsConstructor } from 'src/core/domain/Entity';
import { DataFontProvider, TypeOfStorage } from 'src/core/domain/types/common';

export interface DataFontProps {
  name: string;
  accessKey?: string | null;
  typeOfStorage: TypeOfStorage;
  provider: DataFontProvider;
  userId: string;
}

export class DataFont extends Entity<DataFontProps> {
  constructor(props: PropsConstructor<DataFontProps>) {
    super(props);
  }
}
