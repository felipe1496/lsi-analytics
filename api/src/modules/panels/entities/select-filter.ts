import { Entity, PropsConstructor } from 'src/core/domain/Entity';

export interface SelectFilterProps {
  labelColumn: string;
  viewId: string;
}

export class SelectFilter extends Entity<SelectFilterProps> {
  constructor(props: PropsConstructor<SelectFilterProps>) {
    super(props);
  }
}
