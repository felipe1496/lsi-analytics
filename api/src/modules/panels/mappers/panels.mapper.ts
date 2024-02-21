import {
  Panel as PrismaPanel,
  View as PrismaView,
  PieChart as PrismaPieChart,
} from '@prisma/client';
import { Panel } from '../entities/panel.entity';
import { PieChart } from '../entities/pie-chart.entity';
import { ItWasNotPossibleToCreateViewInstanceError } from '../errors/it-was-not-possible-to-create-view-instance.error';
import { ViewsMapper } from './views.mapper';

export class PanelsMapper {
  public static toDomain(
    panel: PrismaPanel & {
      views?: (PrismaView & { pieChart?: PrismaPieChart | null })[];
    },
  ) {
    const { id, name, description, imageURL, userId, createdAt, updatedAt } =
      panel;

    console.dir(panel, { depth: null });

    const panelViews = panel.views
      ? panel.views.map((v) => {
          let core: PieChart | null = null;

          switch (v.type) {
            case 'PIECHART':
              if (!v.pieChart) {
                throw new ItWasNotPossibleToCreateViewInstanceError();
              }

              core = new PieChart({
                id: v.pieChart.id,
                title: v.pieChart.title,
                subTitle: v.pieChart.subTitle,
                labelColumn: v.pieChart.labelColumn,
                valueColumn: v.pieChart.valueColumn,
                viewId: v.pieChart.viewId,
                createdAt: v.pieChart.createdAt,
                updatedAt: v.pieChart.updatedAt,
              });
              break;

            default:
              break;
          }

          if (!core) {
            throw new ItWasNotPossibleToCreateViewInstanceError();
          }

          /* const view = new View({
            id: v.id,
            type: v.type,
            contentUpdate: v.contentUpdate,
            sql: v.sql,
            core,
            panelId: v.panelId,
            datafontId: v.datafontId,
            createdAt: v.createdAt,
            updatedAt: v.updatedAt,
          }); */

          const view = ViewsMapper.toDomain(v);

          return view;
        })
      : undefined;

    return new Panel({
      id,
      name,
      description,
      imageURL,
      userId,
      createdAt,
      updatedAt,
      views: panelViews,
    });
  }

  public static toHTTP(panel: Panel) {
    const {
      id,
      props: { name, description, imageURL, userId },
      createdAt,
      updatedAt,
    } = panel;

    return {
      id,
      name,
      description,
      imageURL,
      userId,
      createdAt,
      updatedAt,
    };
  }
}
