import {
  BarChart as PrismaBarChart,
  LineChart as PrismaLineChart,
  NumberView as PrismaNumberView,
  Panel as PrismaPanel,
  PieChart as PrismaPieChart,
  SelectFilter as PrismaSelectFilter,
  View as PrismaView,
} from '@prisma/client';
import { Panel } from '../entities/panel.entity';

import { CoreViewsMapper } from '../../views/mappers/core-views.mapper';

export class PanelsMapper {
  public static toDomain(
    panel: PrismaPanel & {
      views?: (PrismaView & {
        pieChart?: PrismaPieChart | null;
        barChart?: PrismaBarChart | null;
        lineChart?: PrismaLineChart | null;
        numberView?: PrismaNumberView | null;
        selectFilter?: PrismaSelectFilter | null;
      })[];
    },
  ) {
    const {
      id,
      name,
      description,
      imageURL,
      userId,
      layout,
      createdAt,
      updatedAt,
    } = panel;

    const panelViews = panel.views
      ? panel.views.map((v) => {
          const view = CoreViewsMapper.toDomain(v);
          return view;
        })
      : undefined;

    let _layout: object | undefined | null = undefined;

    if (layout) {
      _layout = layout as object;
    }

    return new Panel({
      id,
      name,
      description,
      imageURL,
      userId,
      layout: _layout,
      createdAt,
      updatedAt,
      views: panelViews,
    });
  }

  public static toHTTP(panel: Panel) {
    const {
      id,
      props: { name, description, imageURL, userId, layout },
      createdAt,
      updatedAt,
    } = panel;

    return {
      id,
      name,
      description,
      imageURL,
      userId,
      layout,
      createdAt,
      updatedAt,
    };
  }
}
