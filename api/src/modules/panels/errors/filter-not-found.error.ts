import { NotFoundException } from '@nestjs/common';

export class FilterNotFoundError extends NotFoundException {
  constructor() {
    super('Filtro não encontrado');
  }
}
