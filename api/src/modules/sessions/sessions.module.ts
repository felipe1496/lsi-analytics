import { Module } from '@nestjs/common';

import { SessionsController } from './sessions.controller';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { PrismaUsersRepository } from '../users/repositories/impl/prisma-users.repository';
import { UsersRepository } from '../users/repositories/abstract/users.repository';

@Module({
  imports: [
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get('secret.jwt'),
        signOptions: { expiresIn: configService.get('secret.expiresIn') },
      }),
      global: true,
    }),
  ],
  controllers: [SessionsController],
  providers: [{ provide: UsersRepository, useClass: PrismaUsersRepository }],
})
export class SessionsModule {}
