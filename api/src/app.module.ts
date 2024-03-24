import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './modules/users/users.module';
import { ServicesModule } from './services/services.module';
import { ConfigModule } from '@nestjs/config';
import { config } from './config';
import { SessionsModule } from './modules/sessions/sessions.module';
import { PanelsModule } from './modules/panels/panels.module';
import { DataFontsModule } from './modules/datafonts/datafonts.module';
import { FeedbackModule } from './modules/feedbacks/feedbacks.module';
import { FavoriteQueriesModule } from './modules/favorite-queries/favorite-queries.module';
import { ViewsModule } from './modules/views/views.module';

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
    DataFontsModule,
    FeedbackModule,
    FavoriteQueriesModule,
    ViewsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
