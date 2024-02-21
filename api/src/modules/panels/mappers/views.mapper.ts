import { View as PrismaView, PieChart as PrismaPieChart } from '@prisma/client';
import { View } from '../entities/view.entity';
import { ItWasNotPossibleToCreateViewInstanceError } from '../errors/it-was-not-possible-to-create-view-instance.error';
import { PieChart } from '../entities/pie-chart.entity';

type FullRelationView = PrismaView & { pieChart?: PrismaPieChart | null };

export class ViewsMapper {
  private static getDomainCore(view: FullRelationView) {
    switch (view.type) {
      case 'PIECHART':
        if (!view.pieChart) {
          throw new ItWasNotPossibleToCreateViewInstanceError();
        }
        const core = view.pieChart;
        return new PieChart({
          id: core.id,
          title: core.title,
          subTitle: core.subTitle,
          labelColumn: core.labelColumn,
          valueColumn: core.valueColumn,
          viewId: core.viewId,
          createdAt: core.createdAt,
          updatedAt: core.updatedAt,
        });

      default:
        throw new ItWasNotPossibleToCreateViewInstanceError();
    }
  }

  public static toDomain(view: FullRelationView) {
    return new View({
      id: view.id,
      type: view.type,
      contentUpdate: view.contentUpdate,
      sql: view.sql,
      panelId: view.panelId,
      datafontId: view.datafontId,
      createdAt: view.createdAt,
      updatedAt: view.updatedAt,
      core: this.getDomainCore(view),
    });
  }

  private static getHttpCore(view: View) {
    switch (view.props.type) {
      case 'PIECHART':
        const _core = view.props.core as PieChart;
        return {
          id: _core.id,
          title: _core.props.title,
          subTitle: _core.props.subTitle,
          labelColumn: _core.props.labelColumn,
          valueColumn: _core.props.valueColumn,
          viewId: _core.props.viewId,
          createdAt: _core.createdAt,
          updatedAt: _core.updatedAt,
        };
      default:
        throw new ItWasNotPossibleToCreateViewInstanceError();
    }
  }

  public static toHttp(view: View) {
    return {
      id: view.id,
      type: view.props.type,
      contentUpdate: view.props.contentUpdate,
      sql: view.props.sql,
      panelId: view.props.panelId,
      datafontId: view.props.datafontId,
      createdAt: view.createdAt,
      updatedAt: view.updatedAt,
      core: this.getHttpCore(view),
    };
  }
}
