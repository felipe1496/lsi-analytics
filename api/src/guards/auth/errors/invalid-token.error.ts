import { UnauthorizedException } from '@nestjs/common';

export class InvalidTokenError extends UnauthorizedException {
  constructor() {
    super('Token inválido');
  }
}
