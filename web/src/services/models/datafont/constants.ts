import { Column, TypeOfStorage } from './types';

export const DATAFONT = {
  COLUMN: {
    STRING: 'STRING' as Column,
    DATE: 'DATE' as Column,
    NUMBER: 'NUMBER' as Column,
    BOOLEAN: 'BOOLEAN' as Column,
    OBJECT: 'OBJECT' as Column,
    UNDEFINED: 'UNDEFINED' as Column,
  },
  TYPE_OF_STORAGE: {
    DATABASE: 'DATABASE' as TypeOfStorage,
    FILE: 'FILE' as TypeOfStorage,
  },
  DATAFONT_PROVIDER: {
    POSTGRESQL: 'POSTGRESQL',
  },
};
