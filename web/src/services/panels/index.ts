import { api } from '../api';
import { PanelModel } from '../models/panel';
import { PostRequest } from '../types';

type CreatePanelProps = PostRequest<Pick<PanelModel, 'name' | 'description'>>;

class PanelsService {
  public async create(props: CreatePanelProps) {
    const response = await api.post<PanelModel>(
      '/panels',
      {
        ...props.body,
      },
      props.config,
    );

    return response;
  }
}

export const panelsService = new PanelsService();
