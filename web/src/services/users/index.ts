import { api } from '../api';
import { UserModel } from '../models/users';
import { PostRequest } from '../types';

interface CreateUserProps extends PostRequest<Omit<UserModel, 'id'>> {}

interface CreateUserResponse extends Omit<UserModel, 'password'> {}

class UsersService {
  public async create(props: CreateUserProps) {
    const response = await api.post<CreateUserResponse>(
      '/users',
      {
        ...props.body,
      },
      props.config,
    );

    return response;
  }
}

export const usersService = new UsersService();
