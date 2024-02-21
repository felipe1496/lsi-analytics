import { Entity, PropsConstructor } from 'src/core/domain/Entity';
import { FeedbackType } from 'src/core/domain/types/common';

export interface FeedbackProps {
  text: string;
  type: FeedbackType;
  userId: string;
  imageURL?: string | null;
}

export class Feedback extends Entity<FeedbackProps> {
  constructor(props: PropsConstructor<FeedbackProps>) {
    super(props);
  }
}
