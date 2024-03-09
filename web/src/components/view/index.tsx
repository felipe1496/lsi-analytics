import React from 'react';

import { EBarChartData } from '@/pages/panel/panel-new-view/pages/studio/pages/bar-chart/contexts/PanelNewViewStudioBarChartProvider';
import { ELineChartData } from '@/pages/panel/panel-new-view/pages/studio/pages/line-chart/contexts/PanelNewViewStudioLineChartProvider';
import { EPieChartData } from '@/pages/panel/panel-new-view/pages/studio/pages/pie-chart/contexts/PanelNewViewStudioPieChartProvider';
import { PANEL } from '@/services/models/panel/constants';
import { ViewType } from '@/services/models/panel/types';

import { BarChartView } from './BarChartView';
import { LineChartView } from './LineChartView';
import { PieChartView } from './PieChartView';

interface ViewProps {
  data: EPieChartData[] | EBarChartData | ELineChartData;
  type: ViewType;
  name: string;
}

export const View: React.FC<ViewProps> = ({ data, type, name }) => {
  let ViewComponent = null;

  switch (type) {
    case PANEL.VIEW.PIECHART: {
      const _data = data as EPieChartData[];
      ViewComponent = <PieChartView data={_data} />;
      break;
    }

    case PANEL.VIEW.BARCHART: {
      const _data = data as EBarChartData;
      ViewComponent = <BarChartView data={_data} />;
      break;
    }

    case PANEL.VIEW.LINECHART: {
      const _data = data as ELineChartData;
      ViewComponent = <LineChartView data={_data} />;
      break;
    }

    default:
      return null;
  }

  return (
    <div className="h-full w-full rounded-md border shadow-sm">
      <div className="flex w-full border-b">
        <strong className="ml-4 font-semibold">{name}</strong>
      </div>
      {ViewComponent}
    </div>
  );
};
