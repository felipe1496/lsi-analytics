import { SQLResult } from '@/services/models/datafont/types';
import { PANEL } from '@/services/models/panel/constants';
import { PieChartProps, ViewType } from '@/services/models/panel/types';

export class EchartAdapter {
  private static pieChartQueryToData(
    querResult: SQLResult,
    core: PieChartProps & { [key: string]: unknown },
  ) {
    return querResult.rows.map((r) => ({
      value: r[core.valueColumn],
      name: r[core.labelColumn],
    }));
  }

  public static queryToData({
    queryResult,
    type,
    core,
  }: {
    queryResult: SQLResult;
    type: ViewType;
    core: PieChartProps & { [key: string]: unknown };
  }) {
    switch (type) {
      case PANEL.VIEW.PIE_CHART: {
        const _core = core as PieChartProps & { [key: string]: unknown };
        return this.pieChartQueryToData(queryResult, _core);
      }
      default:
        return null;
    }
  }
}
