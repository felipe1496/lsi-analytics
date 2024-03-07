import { BadRequestException } from '@nestjs/common';

export class InvalidHexColorError extends BadRequestException {
  constructor() {
    super('Cor inválida');
  }
}
