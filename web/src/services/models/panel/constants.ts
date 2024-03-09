import { ContentUpdate, ViewType } from './types';

export const PANEL = {
  VIEW: {
    PIECHART: 'PIECHART' as ViewType,
    BARCHART: 'BARCHART' as ViewType,
    LINECHART: 'LINECHART' as ViewType,
    NUMBERVIEW: 'NUMBERVIEW' as ViewType,
  },
  CONTENT_UPDATE: {
    DINAMIC: 'DINAMIC' as ContentUpdate,
    STATIC: 'STATIC' as ContentUpdate,
  },
  SIMPLE_VIEW_TYPE_LABEL_MAPPER: {
    PIECHART: 'Torta',
    BARCHART: 'Barra',
    LINECHART: 'Linha',
    NUMBERVIEW: 'Número',
  },
};
