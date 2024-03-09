import { Layout } from 'react-grid-layout';

import { Breakpoints } from '@/pages/panel/contexts/PanelEditProvider';

import { BaseModel } from '../types';

export type PanelModel = BaseModel & {
  name: string;
  description?: string | null;
  layout?: Record<Breakpoints, Layout[]> | null;
  imageURL?: string;
};

export type PanelProps = {
  name: string;
  description?: string | null;
  layout?: Record<Breakpoints, Layout[]> | null;
  imageURL?: string;
};

export type ViewType = 'PIECHART' | 'BARCHART' | 'LINECHART' | 'NUMBERVIEW';

export type ContentUpdate = 'DYNAMIC' | 'STATIC';

export type BarChart = {
  id: string;
  labelColumn: string;
  valueColumns: string[];
  createdAt: Date;
  updatedAt: Date;
};

export type PieChart = {
  id: string;
  labelColumn: string;
  valueColumn: string;
  createdAt: Date;
  updatedAt: Date;
};

export type LineChart = {
  id: string;
  labelColumn: string;
  valueColumns: string[];
  createdAt: Date;
  updatedAt: Date;
};

export type NumberView = {
  id: string;
  labelColumn: string;
  subTitle?: string | null;
  isPercentage: boolean;
  numberOfDecimalPlaces?: number | null;
  createdAt: Date;
  updatedAt: Date;
};

export type NumberViewProps = {
  labelColumn: string;
  subTitle?: string | null;
  isPercentage: boolean;
  numberOfDecimalPlaces?: number | null;
};

export type LineChartProps = {
  labelColumn: string;
  valueColumns: string[];
};

export type PieChartProps = {
  labelColumn: string;
  valueColumn: string;
};

export type BarChartProps = {
  labelColumn: string;
  valueColumns: string[];
};

export type CoreType = PieChart | BarChart | LineChart | NumberView;

export type GraphTypeCore = PieChart | BarChart | LineChart;

export type ViewModel = {
  id: string;
  name: string;
  type: ViewType;
  contentUpdate: ContentUpdate;
  datafontId: string;
  sql: string;
  panelId: string;
  core: CoreType;
  createdAt: Date;
  updatedAt: Date;
};

export type ViewProps = Omit<ViewModel, 'createdAt' | 'updatedAt' | 'core'> & {
  core: PieChartProps | BarChartProps | LineChartProps | NumberViewProps;
};
