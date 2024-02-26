import { Entity, PropsConstructor } from 'src/core/domain/Entity';

export interface UserProps {
  id: string;
  name: string;
  email: string;
  birthDay: Date;
  imageURL?: string | null;
  password: string;
}

export class User extends Entity<UserProps> {
  constructor(props: PropsConstructor<UserProps>) {
    super(props);
  }
}
