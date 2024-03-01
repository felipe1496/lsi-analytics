import { User } from '../../entities/user.entity';

export type CreateUserProps = {
  name: string;
  email: string;
  password: string;
  birthDay: Date;
  imageURL?: string;
};

export type FindUserProps = {
  userId: string;
};

export type UpdateUserProps = {
  user: {
    email?: string;
    name?: string;
    imageURL?: string;
    birthDay?: Date;
  };
  userId: string;
};

export abstract class UsersRepository {
  public abstract save(props: CreateUserProps): Promise<User>;
  public abstract findByEmail(props: string): Promise<User | null>;
  public abstract findByToken(props: FindUserProps): Promise<User | null>;
  public abstract update(props: UpdateUserProps): Promise<User>;
}
