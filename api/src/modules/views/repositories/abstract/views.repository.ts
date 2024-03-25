import { SelectFilter } from '../../entities/select-filter';
import { View } from '../../entities/view.entity';

export type FindByPanelIdProps = {
  filters?: {
    panelId?: string;
  };
};

export type FindManySelectFiltersProps = {
  ids: string[];
};

export abstract class ViewsRepository {
  public abstract findAll(props: FindByPanelIdProps): Promise<View[]>;
  public abstract findManySelectFilters(
    props: FindManySelectFiltersProps,
  ): Promise<SelectFilter[]>;
}
