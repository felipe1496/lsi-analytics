import { NotFoundException } from '@nestjs/common';

export class DataFontNotFoundError extends NotFoundException {
  constructor() {
    super('Não foi possível encontrar a fonte de dados');
  }
}
