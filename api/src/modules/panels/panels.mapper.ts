import { Panel as PrismaPanel } from '@prisma/client';
import { Panel } from './panel.entity';

export class PanelsMapper {
  public static toDomain(panel: PrismaPanel) {
    const { id, name, description, createdAt, updatedAt } = panel;

    return new Panel({ id, name, description, createdAt, updatedAt });
  }

  public static toHTTP(panel: Panel) {
    const {
      id,
      props: { name, description },
      createdAt,
      updatedAt,
    } = panel;

    return {
      id,
      name,
      description,
      createdAt,
      updatedAt,
    };
  }
}
