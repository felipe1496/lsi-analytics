import { NotFoundException } from '@nestjs/common';

export class PanelNotFoundError extends NotFoundException {
  constructor() {
    super('Não foi possível encontrar o painel');
  }
}
