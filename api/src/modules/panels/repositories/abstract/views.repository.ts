import { View } from '../../entities/view.entity';
import { ViewContentUpdate, ViewType } from 'src/core/domain/types/common';
import { PieChartProps } from '../../entities/pie-chart.entity';
import { Panel } from '../../entities/panel.entity';

export type CreateWithCoreProps = {
  type: ViewType;
  contentUpdate: ViewContentUpdate;
  sql?: string;
  core: Omit<PieChartProps, 'viewId'>;
  panelId: string;
};

export type UpdateViewsInPanelProps = {
  panelId: string;
  views: View[];
};

export abstract class ViewsRepository {
  public abstract updateViewsInPanel(
    props: UpdateViewsInPanelProps,
  ): Promise<Panel>;
}
