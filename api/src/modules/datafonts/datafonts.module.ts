import { Module } from '@nestjs/common';
import { DataFontsController } from './controllers/datafonts.contoller';
import { DataFontsRepository } from './respositories/abstract/datafonts.repository';
import { PrismaDataFontsRepository } from './respositories/impl/prisma-datafonts.repository';

@Module({
  controllers: [DataFontsController],
  providers: [
    {
      provide: DataFontsRepository,
      useClass: PrismaDataFontsRepository,
    },
  ],
})
export class DataFontsModule {}
