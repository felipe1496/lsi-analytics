import { View } from '../../entities/view.entity';

export type FindByPanelIdProps = {
  filters?: {
    panelId?: string;
  };
};

export abstract class ViewsRepository {
  public abstract findAll(props: FindByPanelIdProps): Promise<View[]>;
}
