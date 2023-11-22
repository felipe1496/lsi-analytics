import { User as PrismaUser } from '@prisma/client';
import { User } from './user.entity';

export class UsersMapper {
  public static toDomain(user: PrismaUser) {
    console.log('prisma user: ', user);
    const { id, name, email, birthDay, imageURL } = user;

    return new User({ id, name, email, birthDay, imageURL });
  }
  public static toHTTP(user: User) {
    const { id, name, email, birthDay, imageURL } = user.props;

    return {
      id,
      name,
      email,
      birthDay,
      imageURL,
    };
  }
}
