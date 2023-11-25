import { Module } from '@nestjs/common';

import { UsersRepository } from '../users/users.repository';
import { SessionsController } from './sessions.controller';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

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
  providers: [UsersRepository],
})
export class SessionsModule {}
