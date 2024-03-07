import { Entity, PropsConstructor } from 'src/core/domain/Entity';
import { HexColorValidator } from 'src/core/domain/validators/hex-color.validator';
import { InvalidHexColorError } from 'src/errors/invalid-hex-color.error';

export interface NumberViewChartProps {
  labelColumn: string;
  valueColumn: string;
  subTitle?: string | null;
  isPercentage: boolean;
  numberOfDecimaPlaces: number;
  stripeColor: string;
  viewId: string;
}

export class NumberView extends Entity<NumberViewChartProps> {
  constructor(props: PropsConstructor<NumberViewChartProps>) {
    if (!HexColorValidator.execute(props.stripeColor)) {
      throw new InvalidHexColorError();
    }
    super(props);
  }
}
