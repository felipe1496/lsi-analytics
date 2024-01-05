import { Feedback as PrismaFeedback } from '@prisma/client';
import { Feedback } from '../entities/feedback.entity';

export class FeedbacksMapper {
  public static toDomain(feedback: PrismaFeedback) {
    const { text, imageURL, userId, type } = feedback;

    return new Feedback({
      text,
      imageURL,
      userId,
      type,
    });
  }
}
