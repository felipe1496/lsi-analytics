import { Module } from '@nestjs/common';
import { UsersController } from './controller/users.controller';
import { PrismaUsersRepository } from './repositories/impl/prisma-users.repository';
import { UsersRepository } from './repositories/abstract/users.repository';

@Module({
  controllers: [UsersController],
  providers: [{ provide: UsersRepository, useClass: PrismaUsersRepository }],
})
export class UsersModule {}
