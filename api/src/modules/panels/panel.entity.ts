import { Entity, PropsConstructor } from 'src/core/domain/Entity';

export interface PanelProps {
  name: string;
  description?: string;
  imageURL?: string;
  userId: string;
}

export class Panel extends Entity<PanelProps> {
  constructor(props: PropsConstructor<PanelProps>) {
    super(props);
  }
}
