import { BadRequestException } from '@nestjs/common';

export class ItWasNotPossibleToCreateViewInstanceError extends BadRequestException {
  constructor() {
    super('Não foi possível criar uma instância da visualização');
  }
}
