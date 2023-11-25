import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/services/prisma/prisma.service';
import { UsersMapper } from './users.mapper';

interface SaveUserProps {
  name: string;
  email: string;
  password: string;
  birthDay: Date;
  imageURL?: string;
}

@Injectable()
export class UsersRepository {
  constructor(private prisma: PrismaService) {}

  public async save(props: SaveUserProps) {
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
}
