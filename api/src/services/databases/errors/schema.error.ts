import { InternalServerErrorException } from '@nestjs/common';

export class SchemaError extends InternalServerErrorException {
  constructor(message?: string) {
    super(message ?? 'Erro ao buscar schemas da base de dados');
  }
}
