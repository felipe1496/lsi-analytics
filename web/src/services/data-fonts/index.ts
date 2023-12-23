/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/ban-types */
import { api } from '../api';
import { DataFontModel } from '../models/datafont';
import { SQLResult } from '../models/panel';
import { DeleteRequest, GetRequest, PostRequest } from '../types';

export type CreateDataFontProps = PostRequest<
  Pick<DataFontModel, 'name' | 'typeOfStorage' | 'provider' | 'accessKey'>
>;

export type FindAllDataFontsProps = GetRequest<undefined>;

export type DeleteDataFontProps = DeleteRequest<{ id: string }>;

export type FindSchemasProps = GetRequest<{ datafontId: string }>;

export type FindSchemasResponse = { schemas: string[] };

export type FindTablesProps = GetRequest<{
  datafontId: string;
  schemaName: string;
}>;

export type FindTablesResponse = { tables: string[] };

export type ExecuteSqlProps = PostRequest<{ datafontId: string; sql: string }>;

class DataFontsService {
  public async create(props: CreateDataFontProps) {
    const response = await api.post<DataFontModel>(
      '/datafonts',
      props.body,
      props.config,
    );

    return response.data;
  }

  public async findAll() {
    const response = await api.get<DataFontModel[]>('/datafonts');

    return response.data;
  }

  public async delete(props: DeleteDataFontProps) {
    const response = await api.delete(`/datafonts/${props.path.id}`);

    return response.data;
  }

  public async findSchemas(props: FindSchemasProps) {
    const response = await api.get<FindSchemasResponse>(
      `/datafonts/${props.path.datafontId}/schemas`,
      props.config,
    );

    return response.data;
  }

  public async findTables(props: FindTablesProps) {
    const response = await api.get<FindTablesResponse>(
      `/datafonts/${props.path.datafontId}/${props.path.schemaName}/tables`,
    );

    return response.data;
  }

  public async executeSql(props: ExecuteSqlProps): Promise<SQLResult> {
    const response = await api.post<SQLResult>(
      '/datafonts/sql',
      props.body,
      props.config,
    );

    return response.data;
  }
}

export const dataFontsService = new DataFontsService();
