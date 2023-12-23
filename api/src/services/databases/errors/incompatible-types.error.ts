import { BadRequestException } from '@nestjs/common';

export class IncompatibleTypesError extends BadRequestException {
  constructor() {
    super('Tipos de dados entre as colunas resultado são incompatíveis');
  }
}
