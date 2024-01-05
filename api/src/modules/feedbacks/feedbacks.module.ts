import { Module } from '@nestjs/common';

import { FeedbacksController } from './controllers/feedbacks.controller';
import { FeedbacksRepository } from './repositories/abstract/feedbacks.repository';
import { PrismaFeedbacksRepository } from './repositories/impl/prisma-feedbacks.respository';

@Module({
  controllers: [FeedbacksController],
  providers: [
    {
      provide: FeedbacksRepository,
      useClass: PrismaFeedbacksRepository,
    },
  ],
})
export class FeedbackModule {}
