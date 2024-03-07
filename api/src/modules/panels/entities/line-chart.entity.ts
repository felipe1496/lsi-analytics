import { Entity, PropsConstructor } from 'src/core/domain/Entity';

export interface LineChartProps {
  labelColumn: string;
  valueColumns: string[];
  viewId?: string | null;
}

export class LineChart extends Entity<LineChartProps> {
  constructor(props: PropsConstructor<LineChartProps>) {
    super(props);
  }
}
