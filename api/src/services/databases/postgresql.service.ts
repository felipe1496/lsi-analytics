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

  public async schemas() {
    try {
      await this.prisma.$connect();
      const result = await this.prisma.$queryRaw<
        { schema_name: string }[]
      >`SELECT schema_name
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

  public async tables(schema: string) {
    try {
      await this.prisma.$connect();
      const result = await this.prisma.$queryRaw<
        { table_name: string }[]
      >`SELECT table_name FROM information_schema.tables WHERE table_schema = ${schema}`;
      return result;
    } catch (error) {
      throw new Error(
        `Erro ao executar consulta SQL: ${
          error?.message ?? 'Erro desconhecido'
        }`,
      );
    } finally {
      await this.prisma.$disconnect();
    }
  }
}
