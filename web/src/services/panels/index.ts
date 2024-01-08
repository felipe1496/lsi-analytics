import { api } from '../api';
import { PanelModel, ViewProps } from '../models/panel/types';
import { DeleteRequest, GetRequest, PostRequest } from '../types';

type CreatePanelProps = PostRequest<Pick<PanelModel, 'name' | 'description'>>;

type FindPanelProps = GetRequest<{ id: string }>;

export type DeletePanelProps = DeleteRequest<{ id: string }>;

type CreateViewProps = PostRequest<ViewProps>;

class PanelsService {
  public async create(props: CreatePanelProps) {
    const response = await api.post<PanelModel>(
      '/panels',
      {
        ...props.body,
      },
      props.config,
    );

    return response.data;
  }

  public async find(props: FindPanelProps) {
    const response = await api.get<PanelModel>(
      `/panels/${props.path.id}`,
      props.config,
    );

    return response.data;
  }

  public async findAll() {
    const response = await api.get<PanelModel[]>('/panels');

    return response.data;
  }

  public async delete(props: DeletePanelProps) {
    const response = await api.delete<void>(
      `/panels/${props.path.id}`,
      props.config,
    );

    return response;
  }
}

export const panelsService = new PanelsService();
