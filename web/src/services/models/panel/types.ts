import { SQLResult } from '../datafont/types';

export type PanelModel = {
  id: string;
  name: string;
  description?: string | null;
  createdAt: Date;
  updatedAt: Date;
  imageURL?: string;
};

export type View = 'PIE_CHART';

export type ContentUpdate = 'DINAMIC' | 'STATIC';

export type ViewModel = {
  name: string;
  type: View;
  contentUpdate: ContentUpdate;
  datafontId: string;
  staticData?: SQLResult;
  sql: string;
};
