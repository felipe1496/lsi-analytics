import { api } from '../api';
import { ViewModel } from '../models/panel/types';
import { GetRequest } from '../types';

export type FindAllViews = Omit<GetRequest<undefined>, 'path'>;

class ViewsService {
  public async findAll(props: FindAllViews) {
    const response = await api.get<Omit<{ views: ViewModel[] }, 'core'>>(
      '/views',
      props.config,
    );

    return response.data;
  }
}

export const viewsService = new ViewsService();
