import { ContentUpdate, ViewType } from './types';

export const PANEL = {
  VIEW: {
    PIE_CHART: 'PIECHART' as ViewType,
    BAR_CHART: 'BARCHART' as ViewType,
  },
  CONTENT_UPDATE: {
    DINAMIC: 'DINAMIC' as ContentUpdate,
    STATIC: 'STATIC' as ContentUpdate,
  },
};
