import { ColumnType } from 'src/core/domain/types/common';

export abstract class OnDemandDatabase {
  public abstract query(sql: string): Promise<{
    rows: unknown[];
    metadata: {
      columns: { name: string; dataType: ColumnType }[];
    };
  }>;
  public abstract schemas(): Promise<string[]>;
  public abstract tables(schema: string): Promise<string[]>;
}
