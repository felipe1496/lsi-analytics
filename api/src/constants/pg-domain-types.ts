import { ColumnType } from 'src/core/domain/types/common';

export const PG_DOMAIN_TYPES: { [key: string]: ColumnType } = {
  BOOL: 'boolean',
  CHAR: 'string',
  INT8: 'string',
  INT2: 'number',
  INT4: 'number',
  TEXT: 'string',
  JSON: 'object',
  FLOAT4: 'number',
  FLOAT8: 'number',
  VARCHAR: 'string',
  DATE: 'date',
  TIME: 'date',
  TIMESTAMP: 'date',
  TIMESTAMPTZ: 'date',
  NUMERIC: 'number',
  UUID: 'string',
};
