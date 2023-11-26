import { api } from '../api';
import { PanelModel } from '../models/panel';
import { GetRequest, PostRequest } from '../types';

type CreatePanelProps = PostRequest<Pick<PanelModel, 'name' | 'description'>>;

type FindPanelProps = GetRequest<{ id: string }>;

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

  public async find(props: FindPanelProps) {
    const response = await api.get<PanelModel>(
      `/panels/${props.path.id}`,
      props.config,
    );

    return response;
  }

  public async findAll() {
    const response = await api.get<PanelModel[]>('/panels');

    return response;
  }
}

export const panelsService = new PanelsService();
