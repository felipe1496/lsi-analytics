import { ConflictException } from '@nestjs/common';

export class EmailAlreadyExistError extends ConflictException {
  constructor() {
    super('Email já cadastrado');
  }
}
