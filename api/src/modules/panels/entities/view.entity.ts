import { Entity, PropsConstructor } from 'src/core/domain/Entity';
import { ViewContentUpdate, ViewType } from 'src/core/domain/types/common';
import { PieChart } from './pie-chart.entity';

export interface ViewProps {
  type: ViewType;
  contentUpdate: ViewContentUpdate;
  sql?: string;
  core: PieChart;
  panelId: string;
}

export class View extends Entity<ViewProps> {
  constructor(props: PropsConstructor<ViewProps>) {
    super(props);
  }
}
