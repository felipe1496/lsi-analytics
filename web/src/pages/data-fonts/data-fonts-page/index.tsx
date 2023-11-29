import { ColumnDef } from '@tanstack/react-table';
import { Plus } from 'lucide-react';
import React from 'react';

import {
  Breadcrumb,
  BreadcrumbHome,
  BreadcrumbNeutral,
} from '@/components/common/breadcrumb';
import { Layout } from '@/components/common/layout';
import { Typography } from '@/components/common/typography';
import { Button } from '@/components/common/ui/button';
import { DataTable } from '@/components/common/ui/data-table';

export type Payment = {
  id: string;
  amount: number;
  status: 'pending' | 'processing' | 'success' | 'failed';
  email: string;
};

export const columns: ColumnDef<Payment>[] = [
  {
    accessorKey: 'typeOfStorage',
    header: 'Tipo do armazenamento',
  },
  {
    accessorKey: 'name',
    header: 'Nome',
  },
  {
    accessorKey: 'accessKey',
    header: 'Chave de acesso',
  },
  {
    accessorKey: 'actions',
    header: 'Ações',
  },
];

const data: Payment[] = [
  {
    id: '728ed52f',
    amount: 100,
    status: 'pending',
    email: 'm@example.com',
  },
  // ...
];

export const DataFontsPage: React.FC = () => (
  <Layout
    breadcrumb={
      <Breadcrumb>
        <BreadcrumbHome />
        <BreadcrumbNeutral>Fontes de dados</BreadcrumbNeutral>
      </Breadcrumb>
    }
    className="layout-page flex flex-col gap-4"
  >
    <div className="flex items-center justify-between">
      <div>
        <Typography level="h3">Fontes de dados</Typography>
        <Typography level="muted">Todas as fontes</Typography>
      </div>

      <Button
        type="submit"
        variant="outline"
        className="gap-1 rounded-full border-blue-500 text-blue-500 hover:bg-blue-100 hover:text-blue-500"
      >
        <Plus size={18} />
        Fonte de dados
      </Button>
    </div>

    <DataTable columns={columns} data={data} />
  </Layout>
);
