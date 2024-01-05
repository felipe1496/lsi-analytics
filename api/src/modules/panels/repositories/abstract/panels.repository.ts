import { Panel, PanelProps } from '../../entities/panel.entity';

export type CreatePanelProps = {
  name: string;
  description: string;
  userId: string;
};

export type FindPanelProps = {
  id: string;
  userId: string;
};

export type FindAllProps = {
  userId: string;
};

export type UpdateProps = {
  userId: string;
  panelId: string;
  panel: Partial<PanelProps>;
};

export type DeleteProps = {
  id: string;
};
export abstract class PanelsRepository {
  public abstract create(props: CreatePanelProps): Promise<Panel>;
  public abstract find(props: FindPanelProps): Promise<Panel>;
  public abstract findAll(props: FindAllProps): Promise<Panel[]>;
  public abstract update(props: UpdateProps): Promise<Panel>;
  public abstract delete(props: DeleteProps): Promise<void>;
}
