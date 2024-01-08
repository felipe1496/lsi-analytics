import { Entity, PropsConstructor } from 'src/core/domain/Entity';

export interface PieChartProps {
  title?: string;
  subTitle?: string;
  labelColumn: string;
  valueColumn: string;
  viewId: string;
}

export class PieChart extends Entity<PieChartProps> {
  constructor(props: PropsConstructor<PieChartProps>) {
    super(props);
  }
}
