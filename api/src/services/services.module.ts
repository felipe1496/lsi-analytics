import { Global, Module } from '@nestjs/common';
import { PrismaService } from './prisma';

@Global()
@Module({
  providers: [PrismaService],
  exports: [PrismaService],
})
export class ServicesModule {}
