import { NotFoundException } from '@nestjs/common';

export class InvalidDataFontError extends NotFoundException {
  constructor() {
    super('Fonte de dados inválida');
  }
}
