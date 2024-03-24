import { api } from '../api';
import { GetRequest } from '../types';

export type FindAllViews = Omit<GetRequest<undefined>, 'path'>;

class ViewsService {
  public async findAll(props: FindAllViews) {
    const response = await api.get('/views', props.config);

    return response.data;
  }
}

export const viewsService = new ViewsService();
