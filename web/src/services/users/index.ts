import { api } from '../api';
import {
  UserModel,
  UserProps,
  UserWithoutPasswordModel,
} from '../models/users/types';
import { GetRequest, PatchRequest, PostRequest } from '../types';

interface CreateUserProps extends PostRequest<UserProps> {}

interface CreateUserResponse extends UserWithoutPasswordModel {}

type FindUserProps = GetRequest<undefined>;

type UpdateUserProps = Omit<
  PatchRequest<Partial<UserWithoutPasswordModel>>,
  'path'
>;

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

  public async update(props: UpdateUserProps) {
    const response = await api.patch('/users', props.body, props?.config);

    return response.data;
  }
}

export const usersService = new UsersService();
