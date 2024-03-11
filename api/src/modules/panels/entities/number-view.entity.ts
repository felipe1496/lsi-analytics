import { Entity, PropsConstructor } from 'src/core/domain/Entity';

export interface NumberViewChartProps {
  labelColumn: string;
  subTitle?: string | null;
  isPercentage: boolean;
  numberOfDecimalPlaces?: number | null;
  viewId: string;
}

export class NumberView extends Entity<NumberViewChartProps> {
  constructor(props: PropsConstructor<NumberViewChartProps>) {
    super(props);
  }
}
