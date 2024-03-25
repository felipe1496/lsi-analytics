import { BadRequestException } from '@nestjs/common';

export class ApplyFilterError extends BadRequestException {
  constructor() {
    super('Ocorreu um erro na aplicação dos filtros');
  }
}
