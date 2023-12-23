/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/ban-types */

export type PanelModel = {
  id: string;
  name: string;
  description?: string | null;
  createdAt: Date;
  updatedAt: Date;
  imageURL?: string;
};

export type ViewsType = 'PIE_CHART';

export type ContentType = 'DINAMIC' | 'STATIC';

export type ColumnType = 'string' | 'date' | 'number' | 'boolean' | 'object';

export type SQLResult = {
  rows: any[];
  metadata: {
    columns: {
      name: string;
      dataType: ColumnType | 'undefined';
    }[];
  };
  sql: string;
};

export type ViewModel = {
  name: string;
  type: ViewsType;
  contentUpdate: ContentType;
  datafontId: string;
  staticData?: SQLResult;
  sql: string;
};
