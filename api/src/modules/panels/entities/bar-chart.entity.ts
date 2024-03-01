import { Entity, PropsConstructor } from 'src/core/domain/Entity';

export interface BarChartProps {
  labelColumn: string;
  valueColumn: string;
  viewId?: string | null;
}

export class BarChart extends Entity<BarChartProps> {
  constructor(props: PropsConstructor<BarChartProps>) {
    super(props);
  }
}
