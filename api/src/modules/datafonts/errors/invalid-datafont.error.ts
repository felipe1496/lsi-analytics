import { BadRequestException } from '@nestjs/common';

export class InvalidDataFontError extends BadRequestException {
  constructor() {
    super('Fonte de dados inválida');
  }
}
