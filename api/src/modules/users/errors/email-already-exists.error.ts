import { ConflictException } from '@nestjs/common';

export class EmailAlreadyExist extends ConflictException {
  constructor() {
    super('Email já cadastrado');
  }
}
