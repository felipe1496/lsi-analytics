/* eslint-disable @typescript-eslint/no-explicit-any */
import { ListFilter } from 'lucide-react';
import React from 'react';

import { EBarChartData } from '@/pages/panel/panel-new-view/pages/studio/pages/bar-chart/contexts/PanelNewViewStudioBarChartProvider';
import { ELineChartData } from '@/pages/panel/panel-new-view/pages/studio/pages/line-chart/contexts/PanelNewViewStudioLineChartProvider';
import { NumberViewPresentation } from '@/pages/panel/panel-new-view/pages/studio/pages/number-view/contexts/PanelNewViewStudioNumberViewProvider';
import { EPieChartData } from '@/pages/panel/panel-new-view/pages/studio/pages/pie-chart/contexts/PanelNewViewStudioPieChartProvider';
import { SelectFilterPresentation } from '@/pages/panel/panel-new-view/pages/studio/pages/select-filter/hooks/useSelectFilterStore';
import { PANEL } from '@/services/models/panel/constants';
import { ViewType } from '@/services/models/panel/types';

import { BarChartView } from './BarChartView';
import { LineChartView } from './LineChartView';
import { NumberView } from './NumberView';
import { PieChartView } from './PieChartView';
import { SelectFilterView } from './SelectFilterView';

interface ViewProps {
  data:
    | EPieChartData[]
    | EBarChartData
    | ELineChartData
    | NumberViewPresentation
    | SelectFilterPresentation;
  type: ViewType;
  name: string;
  onChange?: (value: any) => void;
  filters?: { labelColumn: string; value: string | number }[];
}

export const View: React.FC<ViewProps> = ({
  data,
  type,
  name,
  onChange,
  filters = [],
}) => {
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

    case PANEL.VIEW.NUMBERVIEW: {
      const _data = data as NumberViewPresentation;
      ViewComponent = <NumberView data={_data} />;
      break;
    }

    case PANEL.VIEW.SELECTFILTER: {
      const _data = data as SelectFilterPresentation;
      ViewComponent = <SelectFilterView data={_data} onChange={onChange} />;
      break;
    }

    default:
      return null;
  }

  console.log('filters: ', filters);

  return (
    <div className="flex h-full w-full flex-col rounded-md border shadow-sm">
      <div className="flex w-full justify-between border-b p-2">
        <strong className="ml-4 font-semibold">{name}</strong>
        {filters.length > 0 && (
          <div className="flex items-center justify-center rounded-full bg-zinc-600 px-2 dark:bg-zinc-950">
            <ListFilter className="text-purple-100" size={12} />
            <span className="text-zinc-50">{filters.length}</span>
          </div>
        )}
      </div>
      {ViewComponent}
    </div>
  );
};
