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
  panel: Omit<Partial<PanelProps>, 'views'>;
};

export type DeleteProps = {
  id: string;
};

export type FindChartViews = {
  id: string;
  userId: string;
};

export type FindViewsProps = {
  panelId: string;
};

export abstract class PanelsRepository {
  public abstract create(props: CreatePanelProps): Promise<Panel>;
  public abstract find(props: FindPanelProps): Promise<Panel | null>;
  public abstract findAll(props: FindAllProps): Promise<Panel[]>;
  public abstract update(props: UpdateProps): Promise<Panel>;
  public abstract delete(props: DeleteProps): Promise<void>;
  public abstract findChartViews(props: FindChartViews): Promise<Panel | null>;
}
