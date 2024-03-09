import { Entity, PropsConstructor } from 'src/core/domain/Entity';
import { ViewContentUpdate, ViewType } from 'src/core/domain/types/common';
import { BarChart } from './bar-chart.entity';
import { LineChart } from './line-chart.entity';
import { NumberView } from './number-view.entity';
import { PieChart } from './pie-chart.entity';

export interface ViewProps {
  type: ViewType;
  contentUpdate: ViewContentUpdate;
  sql?: string | null;
  core: PieChart | BarChart | LineChart | NumberView;
  datafontId: string;
  panelId: string;
  name: string;
}

export class View extends Entity<ViewProps> {
  constructor(props: PropsConstructor<ViewProps>) {
    super(props);
  }
}
