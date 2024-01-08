import { View } from '../../entities/view.entity';
import { ViewContentUpdate, ViewType } from 'src/core/domain/types/common';
import { PieChartProps } from '../../entities/pie-chart.entity';

export type CreateWithCoreProps = {
  type: ViewType;
  contentUpdate: ViewContentUpdate;
  sql?: string;
  core: Omit<PieChartProps, 'viewId'>;
  panelId: string;
};

export abstract class ViewsRepository {
  public abstract createWithCore(props: CreateWithCoreProps): Promise<View>;
}
