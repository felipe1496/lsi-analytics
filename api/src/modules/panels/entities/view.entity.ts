import { Entity, PropsConstructor } from 'src/core/domain/Entity';
import { ViewContentUpdate, ViewType } from 'src/core/domain/types/common';
import { PieChart } from './pie-chart.entity';
import { BarChart } from './bar-chart.entity';
import { LineChart } from './line-chart.entity';

export interface ViewProps {
  type: ViewType;
  contentUpdate: ViewContentUpdate;
  sql?: string | null;
  core: PieChart | BarChart | LineChart;
  datafontId: string;
  panelId: string;
}

export class View extends Entity<ViewProps> {
  constructor(props: PropsConstructor<ViewProps>) {
    super(props);
  }
}
