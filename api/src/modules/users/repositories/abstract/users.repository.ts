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

export abstract class UsersRepository {
  public abstract save(props: CreateUserProps): Promise<User>;
  public abstract findByEmail(props: string): Promise<User | null>;
  public abstract findByToken(props: FindUserProps): Promise<User | null>;
}
