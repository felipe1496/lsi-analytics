import { PrismaClient } from '@prisma/client';

interface PostgresqlServiceProps {
  accessKey: string;
}

export class PostgresqlService {
  private readonly prisma: PrismaClient;

  public constructor({ accessKey }: PostgresqlServiceProps) {
    this.prisma = new PrismaClient({
      datasources: {
        db: {
          url: accessKey,
        },
      },
    });
  }

  public async query<T = unknown>(sql: string): Promise<T> {
    try {
      await this.prisma.$connect();
      const result = await this.prisma.$queryRaw<T>`${sql}`;
      return result;
    } catch (error) {
      throw new Error(
        `Erro ao executar consulta SQL: ${
          error?.message ?? 'Erro desconhecido'
        }`,
      );
    } finally {
      this.prisma.$disconnect();
    }
  }

  public async schemas(): Promise<any> {
    try {
      await this.prisma.$connect();
      const result = await this.prisma.$queryRaw`SELECT schema_name
      FROM information_schema.schemata;`;
      return result;
    } catch (error) {
      throw new Error(
        `Erro ao executar consulta SQL: ${
          error?.message ?? 'Erro desconhecido'
        }`,
      );
    } finally {
      this.prisma.$disconnect();
    }
  }
}
