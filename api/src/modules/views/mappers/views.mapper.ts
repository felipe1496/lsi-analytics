import { View as PrismView } from '@prisma/client';
import { View } from '../entities/view.entity';

export class ViewsMapper {
  public static toDomain(view: PrismView) {
    return new View({
      id: view.id,
      type: view.type,
      contentUpdate: view.contentUpdate,
      sql: view.sql,
      datafontId: view.datafontId,
      panelId: view.panelId,
      name: view.name,
    });
  }

  public static toHttp(view: View) {
    return {
      id: view.id,
      type: view.props.type,
      contentUpdate: view.props.contentUpdate,
      sql: view.props.sql,
      datafontId: view.props.datafontId,
      panelId: view.props.panelId,
      name: view.props.name,
    };
  }
}
