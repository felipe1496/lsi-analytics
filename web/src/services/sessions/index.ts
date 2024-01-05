import { api } from '../api';
import { UserWithoutPasswordModel } from '../models/users/types';
import { PostRequest } from '../types';

type CreateSessionProps = PostRequest<{ email: string; password: string }>;

type CreateSessionResponse = {
  user: UserWithoutPasswordModel;
  accessToken: string;
};

type VerifySessionResponse = {
  user: UserWithoutPasswordModel;
};

class SessionsService {
  public async create(props: CreateSessionProps) {
    const response = await api.post<CreateSessionResponse>(
      '/sessions',
      props.body,
    );

    return response.data;
  }

  public async verify(token: string) {
    const response = await api.get<VerifySessionResponse>('/sessions', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  }
}

export const sessionsService = new SessionsService();
