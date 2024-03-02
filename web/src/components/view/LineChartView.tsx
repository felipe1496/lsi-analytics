import React from 'react';

import { EChart } from '@/lib/echarts-for-react';
import { ELineChartData } from '@/pages/panel/panel-new-view/pages/studio/pages/line-chart/contexts/PanelNewViewStudioLineChartProvider';

interface LineChartViewProps {
  data: ELineChartData;
}

export const LineChartView: React.FC<LineChartViewProps> = ({ data }) => (
  <EChart
    style={{
      width: '100%',
      height: '100%',
    }}
    option={{
      xAxis: {
        type: 'category',
        data: data.xAxis.data,
      },
      yAxis: {
        type: 'value',
      },
      series: [
        {
          data: data.series.data,
          type: 'line',
        },
      ],
    }}
  />
);
