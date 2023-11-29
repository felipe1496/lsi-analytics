import {
  DataFontProviderEnum,
  TypeOfStorageEnum,
} from '@/services/models/types/common';

export const AVAILABLE_DATA_FONTS: {
  label: string;
  imageURL: string;
  provider: DataFontProviderEnum;
  typeOfStorage: TypeOfStorageEnum;
}[] = [
  {
    label: 'PostgreSQL',
    imageURL: '/icons/psql.png',
    provider: 'POSTGRESQL',
    typeOfStorage: 'DATABASE',
  },
];

export const TYPE_STORAGE_MAPPER_DB_LABEL = {
  DATABASE: 'Banco de dados',
  FILE: 'Arquivo',
};

export const PROVIDER_MAPPER_DB_IMAGEURL = {
  POSTGRESQL: '/icons/psql.png',
  CSV: '/icons/psql.png',
};

export const PROVIDER_MAPPER_DB_LABEL = {
  POSTGRESQL: 'PostgreSQL',
  CSV: 'CSV',
};
