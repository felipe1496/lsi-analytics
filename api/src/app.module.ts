import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './modules/users/users.module';
import { ServicesModule } from './services/services.module';

@Module({
  imports: [UsersModule, ServicesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
