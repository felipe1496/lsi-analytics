import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/services/prisma/prisma.service';
import { UsersMapper } from '../../mappers/users.mapper';
import { UpdateUserProps, UsersRepository } from '../abstract/users.repository';

type CreateUserProps = {
  name: string;
  email: string;
  password: string;
  birthDay: Date;
  imageURL?: string;
};

type FindUserProps = {
  userId: string;
};

@Injectable()
export class PrismaUsersRepository implements UsersRepository {
  constructor(private prisma: PrismaService) {}

  public async save(props: CreateUserProps) {
    const user = await this.prisma.user.upsert({
      where: {
        email: props.email,
      },
      update: {
        ...props,
      },
      create: {
        ...props,
      },
    });

    return UsersMapper.toDomain(user);
  }

  public async findByEmail(email: string) {
    const user = await this.prisma.user.findFirst({
      where: {
        email,
      },
    });

    if (user) {
      return UsersMapper.toDomain(user);
    }

    return null;
  }

  public async findByToken(props: FindUserProps) {
    const user = await this.prisma.user.findFirst({
      where: {
        id: props.userId,
      },
    });

    if (!user) {
      return null;
    }

    return UsersMapper.toDomain(user);
  }

  public async update(props: UpdateUserProps) {
    const user = await this.prisma.user.update({
      where: {
        id: props.userId,
      },
      data: {
        email: props.user.email,
        name: props.user.name,
        birthDay: props.user.birthDay,
        imageURL: props.user.imageURL,
      },
    });

    return UsersMapper.toDomain(user);
  }
}
