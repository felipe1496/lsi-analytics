import { Panel as PrismaPanel } from '@prisma/client';
import { Panel } from '../entities/panel.entity';

export class PanelsMapper {
  public static toDomain(panel: PrismaPanel) {
    const { id, name, description, imageURL, userId, createdAt, updatedAt } =
      panel;

    return new Panel({
      id,
      name,
      description,
      imageURL,
      userId,
      createdAt,
      updatedAt,
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
