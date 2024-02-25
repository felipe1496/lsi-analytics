import React from 'react';

import { EChartData } from '@/pages/panel/panel-new-view/pages/studio/pages/pie-chart/contexts/PanelNewViewStudioPieChartProvider';
import { PANEL } from '@/services/models/panel/constants';
import { ViewType } from '@/services/models/panel/types';

import { PieChartView } from './PieChartView';

interface ViewProps {
  data: EChartData[];
  type: ViewType;
}

export const View: React.FC<ViewProps> = ({ data, type }) => {
  switch (type) {
    case PANEL.VIEW.PIE_CHART:
      return <PieChartView data={data} />;
    default:
      return null;
  }
};
