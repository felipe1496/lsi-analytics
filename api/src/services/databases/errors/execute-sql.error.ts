import { InternalServerErrorException } from '@nestjs/common';

export class ExecuteSqlError extends InternalServerErrorException {
  constructor(message?: string) {
    super(message ?? 'Erro ao executar query sql');
  }
}
