import { Entity, PropsConstructor } from 'src/core/domain/Entity';

interface FavoriteQueryProps {
  sql: string;
  datafontId: string;
  userId: string;
  name: string;
}

export class FavoriteQuery extends Entity<FavoriteQueryProps> {
  constructor(props: PropsConstructor<FavoriteQueryProps>) {
    super(props);
  }
}
