import { Feedback, FeedbackProps } from '../../entities/feedback.entity';

export abstract class FeedbacksRepository {
  public abstract create(feedback: FeedbackProps): Promise<Feedback>;
}
