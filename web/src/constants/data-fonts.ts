import {
  DataFontProvider,
  TypeOfStorage,
} from '@/services/models/datafont/types';

export const AVAILABLE_DATA_FONTS: {
  label: string;
  imageURL: string;
  provider: DataFontProvider;
  typeOfStorage: TypeOfStorage;
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
