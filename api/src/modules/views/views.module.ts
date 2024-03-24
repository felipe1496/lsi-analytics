import { Module } from '@nestjs/common';
import { ViewsRepository } from './repositories/abstract/views.repository';
import { PrismaViewsRepository } from './repositories/impl/prisma-views.repository';
import { ViewsController } from './controller/views.controller';

@Module({
  controllers: [ViewsController],
  providers: [
    {
      provide: ViewsRepository,
      useClass: PrismaViewsRepository,
    },
  ],
})
export class ViewsModule {}
