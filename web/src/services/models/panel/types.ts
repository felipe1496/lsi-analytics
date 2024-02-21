import { SQLResult } from '../datafont/types';

export type PanelModel = {
  id: string;
  name: string;
  description?: string | null;
  createdAt: Date;
  updatedAt: Date;
  imageURL?: string;
};

export type ViewType = 'PIECHART';

export type ContentUpdate = 'DYNAMIC' | 'STATIC';

export type PieChart = {
  id: string;
  title?: string;
  subTitle?: string;
  labelColumn: string;
  valueColumn: string;
  createdAt: Date;
  updatedAt: Date;
};

export type PieChartProps = Omit<PieChart, 'id' | 'createdAt' | 'updatedAt'>;

export type ViewModel = {
  id: string;
  name: string;
  type: ViewType;
  contentUpdate: ContentUpdate;
  datafontId: string;
  staticData?: SQLResult;
  sql: string;
  panelId: string;
  core: PieChart;
  createdAt: Date;
  updatedAt: Date;
};

export type ViewProps = Omit<ViewModel, 'createdAt' | 'updatedAt' | 'core'> & {
  core: PieChartProps;
};
