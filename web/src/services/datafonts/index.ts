import { api } from '../api';
import { DataFontModel } from '../models/datafont';
import { GetRequest, PostRequest } from '../types';

export type CreateDataFontProps = PostRequest<
  Pick<DataFontModel, 'name' | 'typeOfStorage' | 'provider' | 'accessKey'>
>;

export type FindAllDataFontsProps = GetRequest<null>;

class DataFontsService {
  public async create(props: CreateDataFontProps) {
    const response = await api.post<DataFontModel>(
      '/datafonts',
      props.body,
      props.config,
    );

    return response;
  }

  public async findAll() {
    const response = await api.get<DataFontModel[]>('/datafonts');

    return response;
  }
}

export const dataFontsService = new DataFontsService();
