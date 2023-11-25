import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './modules/users/users.module';
import { ServicesModule } from './services/services.module';
import { ConfigModule } from '@nestjs/config';
import { config } from './config';
import { SessionsModule } from './modules/sessions/sessions.module';
import { PanelsModule } from './modules/panels/panels.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [config],
    }),
    PanelsModule,
    UsersModule,
    SessionsModule,
    ServicesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}