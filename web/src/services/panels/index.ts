import { api } from '../api';
import { SQLResult } from '../models/datafont/types';
import {
  PanelModel,
  PanelProps,
  ViewModel,
  ViewProps,
} from '../models/panel/types';
import { DeleteRequest, GetRequest, PatchRequest, PostRequest } from '../types';

type CreatePanelProps = PostRequest<Pick<PanelModel, 'name' | 'description'>>;

type FindPanelProps = GetRequest<{ id: string }>;

export type DeletePanelProps = DeleteRequest<{ id: string }>;

type UpdatePanelProps = PatchRequest<
  Partial<
    PanelProps & {
      createViews?: ViewProps[];
      deleteViewIds?: string[];
    }
  >,
  { id: string }
>;

type FindPanelChartViewsProps = GetRequest<{ id: string }>;

type FindPanelChartViewsResponse = {
  panel: PanelModel;
  views: {
    queryResult: SQLResult;
    view: ViewModel;
    filters: { labelColumn: string; value: string | number }[];
  }[];
};

class PanelsService {
  public async create(props: CreatePanelProps) {
    const response = await api.post<PanelModel>(
      '/panels',
      props.body,
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

  public async update(props: UpdatePanelProps) {
    const response = await api.patch(
      `/panels/${props.path.id}`,
      props.body,
      props.config,
    );

    return response.data;
  }

  public async findPanelChartViews(props: FindPanelChartViewsProps) {
    console.log('aaaa: ', props.config?.params);
    const response = await api.get<FindPanelChartViewsResponse>(
      `/panels/${props.path.id}/chart-views`,
      props.config,
    );

    return response.data;
  }
}

export const panelsService = new PanelsService();
