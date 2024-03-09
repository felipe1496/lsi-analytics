import { EBarChartData } from '@/pages/panel/panel-new-view/pages/studio/pages/bar-chart/contexts/PanelNewViewStudioBarChartProvider';
import { ELineChartData } from '@/pages/panel/panel-new-view/pages/studio/pages/line-chart/contexts/PanelNewViewStudioLineChartProvider';
import { EPieChartData } from '@/pages/panel/panel-new-view/pages/studio/pages/pie-chart/contexts/PanelNewViewStudioPieChartProvider';
import { SQLResult } from '@/services/models/datafont/types';
import { PANEL } from '@/services/models/panel/constants';
import {
  BarChartProps,
  GraphTypeCore,
  LineChartProps,
  PieChartProps,
  ViewType,
} from '@/services/models/panel/types';

export class EchartAdapter {
  public static queryToData({
    queryResult,
    type,
    core,
  }: {
    queryResult: SQLResult;
    type: ViewType;
    core: GraphTypeCore & {
      [key: string]: unknown;
    };
  }) {
    switch (type) {
      case PANEL.VIEW.PIECHART: {
        const _core = core as PieChartProps & { [key: string]: unknown };
        return this.pieChartQueryToData(queryResult, _core);
      }
      case PANEL.VIEW.BARCHART: {
        const _core = core as BarChartProps & { [key: string]: unknown };
        return this.barChartQueryToData(queryResult, _core);
      }
      case PANEL.VIEW.LINECHART: {
        const _core = core as LineChartProps & { [key: string]: unknown };
        return this.lineChartQueryToData(queryResult, _core);
      }
      default:
        return null;
    }
  }

  private static pieChartQueryToData(
    queryResult: SQLResult,
    core: PieChartProps & { [key: string]: unknown },
  ): EPieChartData[] {
    return queryResult.rows.map((r) => ({
      value: r[core.valueColumn],
      name: r[core.labelColumn],
    }));
  }

  private static barChartQueryToData(
    queryResult: SQLResult,
    core: BarChartProps & { [key: string]: unknown },
  ) {
    const finalData: EBarChartData = {
      xAxis: {
        data: [],
      },
      series: core.valueColumns.map(() => ({ data: [], type: 'bar' })),
    };

    queryResult.rows.forEach((r) => {
      finalData.xAxis.data.push(r[core.labelColumn]);
      core.valueColumns.forEach((v, index) => {
        finalData.series[index].data.push(r[v]);
      });
    });

    return finalData;
  }

  private static lineChartQueryToData(
    queryResult: SQLResult,
    core: LineChartProps & { [key: string]: unknown },
  ) {
    const finalData: ELineChartData = {
      xAxis: {
        data: [],
      },
      series: core.valueColumns.map(() => ({ data: [], type: 'line' })),
    };

    queryResult.rows.forEach((r) => {
      finalData.xAxis.data.push(r[core.labelColumn]);
      core.valueColumns.forEach((v, index) => {
        finalData.series[index].data.push(r[v]);
      });
    });

    return finalData;
  }
}
