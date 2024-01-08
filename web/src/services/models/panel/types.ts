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

export type PieChartCore = {
  id: string;
  title?: string;
  subTitle?: string;
  labelColumn: string;
  valueColumn: string;
  createdAt: Date;
  updatedAt: Date;
};

export type ViewModel = {
  id: string;
  name: string;
  type: View;
  contentUpdate: ContentUpdate;
  datafontId: string;
  staticData?: SQLResult;
  sql: string;
  panelId: string;
  core: PieChartCore;
  createdAt: Date;
  updatedAt: Date;
};

export type ViewProps = Omit<ViewModel, 'createdAt' | 'updatedAt'>;
