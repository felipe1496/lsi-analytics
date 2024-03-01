import {
  Panel as PrismaPanel,
  View as PrismaView,
  PieChart as PrismaPieChart,
  BarChart as PrismaBarChart,
} from '@prisma/client';
import { Panel } from '../entities/panel.entity';

import { ViewsMapper } from './views.mapper';

export class PanelsMapper {
  public static toDomain(
    panel: PrismaPanel & {
      views?: (PrismaView & {
        pieChart?: PrismaPieChart | null;
        barChart?: PrismaBarChart | null;
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
          const view = ViewsMapper.toDomain(v);
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
