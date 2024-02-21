import { Entity, PropsConstructor } from 'src/core/domain/Entity';
import { View } from './view.entity';

export interface PanelProps {
  name: string;
  description?: string | null;
  imageURL?: string | null;
  userId: string;
  views?: View[];
}

export class Panel extends Entity<PanelProps> {
  constructor(props: PropsConstructor<PanelProps>) {
    super(props);
  }

  get description() {
    return this.props.description;
  }
}
