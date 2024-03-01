import React from 'react';

import { EChart } from '@/lib/echarts-for-react';
import { EPieChartData } from '@/pages/panel/panel-new-view/pages/studio/pages/pie-chart/contexts/PanelNewViewStudioPieChartProvider';

interface PieChartViewProps {
  data: EPieChartData[];
}

export const PieChartView: React.FC<PieChartViewProps> = ({ data }) => (
  <div className="h-full w-full rounded-md border shadow-sm">
    <EChart
      style={{
        width: '100%',
        height: '100%',
      }}
      option={{
        tooltip: {
          trigger: 'item',
        },
        legend: {
          orient: 'vertical',
          left: 'left',
        },
        series: [
          {
            name: 'Access From',
            type: 'pie',
            radius: '50%',
            data,
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)',
              },
            },
          },
        ],
      }}
    />
  </div>
);
