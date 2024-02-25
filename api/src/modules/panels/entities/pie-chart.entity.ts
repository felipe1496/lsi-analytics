import { Entity, PropsConstructor } from 'src/core/domain/Entity';

export interface PieChartProps {
  labelColumn: string;
  valueColumn: string;
  viewId?: string | null;
}

export class PieChart extends Entity<PieChartProps> {
  constructor(props: PropsConstructor<PieChartProps>) {
    super(props);
  }
}
