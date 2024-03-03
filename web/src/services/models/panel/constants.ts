import { ContentUpdate, ViewType } from './types';

export const PANEL = {
  VIEW: {
    PIE_CHART: 'PIECHART' as ViewType,
    BAR_CHART: 'BARCHART' as ViewType,
    LINE_CHART: 'LINECHART' as ViewType,
  },
  CONTENT_UPDATE: {
    DINAMIC: 'DINAMIC' as ContentUpdate,
    STATIC: 'STATIC' as ContentUpdate,
  },
  SIMPLE_VIEW_TYPE_LABEL_MAPPER: {
    PIECHART: 'Torta',
    BARCHART: 'Barra',
    LINECHART: 'Linha',
    KPI: 'KPI',
  },
};
