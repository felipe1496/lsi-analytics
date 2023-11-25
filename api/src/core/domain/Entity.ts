interface IEntityProps {
  id?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export type PropsConstructor<T> = T & IEntityProps;

export abstract class Entity<T> {
  public readonly props: T;
  public readonly id?: string;
  public readonly createdAt?: Date;
  public readonly updatedAt?: Date;

  constructor(props: PropsConstructor<T>) {
    this.props = props;
    this.id = props.id;
    this.createdAt = props.createdAt;
    this.updatedAt = props.updatedAt;
  }
}