import { api } from '../api';
import { UserModel, UserWithoutPasswordModel } from '../models/users/types';
import { GetRequest, PostRequest } from '../types';

interface CreateUserProps extends PostRequest<Omit<UserModel, 'id'>> {}

interface CreateUserResponse extends UserWithoutPasswordModel {}

type FindUserProps = GetRequest<undefined>;

class UsersService {
  public async create(props: CreateUserProps) {
    const response = await api.post<CreateUserResponse>(
      '/users',
      {
        ...props.body,
      },
      props.config,
    );

    return response.data;
  }

  public async findByToken(props?: FindUserProps) {
    const response = await api.get<UserModel>('/users', props?.config);

    return response.data;
  }
}

export const usersService = new UsersService();
