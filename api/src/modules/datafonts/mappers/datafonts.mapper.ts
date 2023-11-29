import { DataFont as PrismaDataFont } from '@prisma/client';
import { DataFont } from '../entities/datafont.entity';

export class DataFontsMapper {
  public static toDomain(dataFont: PrismaDataFont) {
    const {
      id,
      name,
      typeOfStorage,
      provider,
      accessKey,
      userId,
      createdAt,
      updatedAt,
    } = dataFont;

    return new DataFont({
      id,
      name,
      typeOfStorage,
      provider,
      accessKey,
      userId,
      createdAt,
      updatedAt,
    });
  }

  public static toHTTP(dataFont: DataFont) {
    const {
      id,
      props: { name, typeOfStorage, provider, accessKey, userId },
      createdAt,
      updatedAt,
    } = dataFont;

    return Object.freeze({
      id,
      name,
      typeOfStorage,
      provider,
      accessKey,
      userId,
      createdAt,
      updatedAt,
    });
  }
}
