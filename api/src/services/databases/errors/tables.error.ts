import { InternalServerErrorException } from '@nestjs/common';

export class TableError extends InternalServerErrorException {
  constructor(message?: string) {
    super(message ?? 'Erro ao buscar tabelas na base de dados');
  }
}
