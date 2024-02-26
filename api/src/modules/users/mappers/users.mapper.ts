import { User as PrismaUser } from '@prisma/client';
import { User } from '../entities/user.entity';

export class UsersMapper {
  public static toDomain(user: PrismaUser) {
    const {
      id,
      name,
      email,
      birthDay,
      imageURL,
      password,
      createdAt,
      updatedAt,
    } = user;

    return new User({
      id,
      name,
      email,
      birthDay,
      imageURL,
      password,
      createdAt,
      updatedAt,
    });
  }
  public static toHTTP(user: User) {
    const {
      id,
      props: { name, email, birthDay, imageURL },
      createdAt,
      updatedAt,
    } = user;

    return {
      id,
      name,
      email,
      birthDay,
      imageURL,
      createdAt,
      updatedAt,
    };
  }
}
