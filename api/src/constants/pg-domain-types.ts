import { ColumnType } from 'src/core/domain/types/common';

export const PG_DOMAIN_TYPES: { [key: string]: ColumnType } = {
  BOOL: 'BOOLEAN',
  CHAR: 'STRING',
  INT8: 'STRING',
  INT2: 'NUMBER',
  INT4: 'NUMBER',
  TEXT: 'STRING',
  JSON: 'OBJECT',
  FLOAT4: 'NUMBER',
  FLOAT8: 'NUMBER',
  VARCHAR: 'STRING',
  DATE: 'DATE',
  TIME: 'DATE',
  TIMESTAMP: 'DATE',
  TIMESTAMPTZ: 'DATE',
  NUMERIC: 'NUMBER',
  UUID: 'STRING',
};
