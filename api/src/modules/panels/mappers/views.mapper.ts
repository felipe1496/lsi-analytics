import {
  View as PrismaView,
  PieChart as PrismaPieChart,
  BarChart as PrismaBarChart,
  LineChart as PrismaLineChart,
} from '@prisma/client';
import { View } from '../entities/view.entity';
import { ItWasNotPossibleToCreateViewInstanceError } from '../errors/it-was-not-possible-to-create-view-instance.error';
import { PieChart } from '../entities/pie-chart.entity';
import { BarChart } from '../entities/bar-chart.entity';
import { LineChart } from '../entities/line-chart.entity';

type FullRelationView = PrismaView & {
  pieChart?: PrismaPieChart | null;
  barChart?: PrismaBarChart | null;
  lineChart?: PrismaLineChart | null;
};

export class ViewsMapper {
  public static toDomain(view: FullRelationView) {
    return new View({
      id: view.id,
      name: view.name,
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

  public static toHttp(view: View) {
    return {
      id: view.id,
      name: view.props.name,
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

  private static getHttpCore(view: View) {
    switch (view.props.type) {
      case 'PIECHART':
        const pieCore = view.props.core as PieChart;
        return {
          id: pieCore.id,
          labelColumn: pieCore.props.labelColumn,
          valueColumn: pieCore.props.valueColumn,
          viewId: pieCore.props.viewId,
          createdAt: pieCore.createdAt,
          updatedAt: pieCore.updatedAt,
        };
      case 'BARCHART':
        const barCore = view.props.core as BarChart;
        return {
          id: barCore.id,
          labelColumn: barCore.props.labelColumn,
          valueColumn: barCore.props.valueColumn,
          viewId: barCore.props.viewId,
          createdAt: barCore.createdAt,
          updatedAt: barCore.updatedAt,
        };
      case 'LINECHART':
        const lineCore = view.props.core as LineChart;
        return {
          id: lineCore.id,
          labelColumn: lineCore.props.labelColumn,
          valueColumn: lineCore.props.valueColumn,
          viewId: lineCore.props.viewId,
          createdAt: lineCore.createdAt,
          updatedAt: lineCore.updatedAt,
        };
      default:
        throw new ItWasNotPossibleToCreateViewInstanceError();
    }
  }

  private static getDomainCore(view: FullRelationView) {
    switch (view.type) {
      case 'PIECHART':
        if (!view.pieChart) {
          throw new ItWasNotPossibleToCreateViewInstanceError();
        }
        const pieCore = view.pieChart;
        return new PieChart({
          id: pieCore.id,
          labelColumn: pieCore.labelColumn,
          valueColumn: pieCore.valueColumn,
          viewId: pieCore.viewId,
          createdAt: pieCore.createdAt,
          updatedAt: pieCore.updatedAt,
        });
      case 'BARCHART':
        if (!view.barChart) {
          throw new ItWasNotPossibleToCreateViewInstanceError();
        }
        const barCore = view.barChart;
        return new BarChart({
          id: barCore.id,
          labelColumn: barCore.labelColumn,
          valueColumn: barCore.valueColumn,
          viewId: barCore.viewId,
          createdAt: barCore.createdAt,
          updatedAt: barCore.updatedAt,
        });
      case 'LINECHART':
        if (!view.lineChart) {
          throw new ItWasNotPossibleToCreateViewInstanceError();
        }
        const lineCore = view.lineChart;
        return new LineChart({
          id: lineCore.id,
          labelColumn: lineCore.labelColumn,
          valueColumn: lineCore.valueColumn,
          viewId: lineCore.viewId,
          createdAt: lineCore.createdAt,
          updatedAt: lineCore.updatedAt,
        });
      default:
        throw new ItWasNotPossibleToCreateViewInstanceError();
    }
  }
}
