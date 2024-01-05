import { Injectable } from '@nestjs/common';
import { FeedbackProps, Feedback } from '../../entities/feedback.entity';

import { PrismaService } from 'src/services/prisma/prisma.service';
import { FeedbacksMapper } from '../../mappers/feedbacks.mapper';
import { FeedbacksRepository } from '../abstract/feedbacks.repository';

@Injectable()
export class PrismaFeedbacksRepository implements FeedbacksRepository {
  constructor(private prisma: PrismaService) {}
  public async create(props: FeedbackProps): Promise<Feedback> {
    const feedback = await this.prisma.feedback.create({
      data: props,
    });

    return FeedbacksMapper.toDomain(feedback);
  }
}
