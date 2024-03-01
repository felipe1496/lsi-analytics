import React from 'react';

import { EBarChartData } from '@/pages/panel/panel-new-view/pages/studio/pages/bar-chart/contexts/PanelNewViewStudioBarChartProvider';
import { EPieChartData } from '@/pages/panel/panel-new-view/pages/studio/pages/pie-chart/contexts/PanelNewViewStudioPieChartProvider';
import { PANEL } from '@/services/models/panel/constants';
import { ViewType } from '@/services/models/panel/types';

import { BarChartView } from './BarChartView';
import { PieChartView } from './PieChartView';

interface ViewProps {
  data: EPieChartData[] | EBarChartData;
  type: ViewType;
}

export const View: React.FC<ViewProps> = ({ data, type }) => {
  switch (type) {
    case PANEL.VIEW.PIE_CHART: {
      const _data = data as EPieChartData[];
      return <PieChartView data={_data} />;
    }

    case PANEL.VIEW.BAR_CHART: {
      const _data = data as EBarChartData;
      return <BarChartView data={_data} />;
    }

    default:
      return null;
  }
};
