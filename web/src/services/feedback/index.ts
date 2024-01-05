import { api } from '../api';
import { FeedbackCategory } from '../models/feedback/types';

export type CreateFeedbackProps = {
  file: Blob;
  text: string;
  type: FeedbackCategory;
};

export class FeedbackService {
  public async create(props: CreateFeedbackProps) {
    const formData = new FormData();
    const file = new File([props.file], 'my-arch.png');
    formData.append('file', file, 'my-file-name.png');
    formData.append(
      'json',
      JSON.stringify({ text: props.text, type: props.type }),
    );
    const response = await api.post('/feedbacks', props, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    return response.data;
  }
}

export const feedbackService = new FeedbackService();
