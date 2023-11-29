import { api } from '../api';
import { DataFontModel } from '../models/datafont';
import { PostRequest } from '../types';

export type CreateDataFontProps = PostRequest<
  Pick<DataFontModel, 'name' | 'typeOfStorage' | 'accessKey' | 'userId'>
>;

class DataFontsService {
  public async create(props: CreateDataFontProps) {
    const response = await api.post<DataFontModel>(
      '/datafonts',
      props.body,
      props.config,
    );

    return response;
  }
}

export const dataFontsService = new DataFontsService();
