import { useQuery } from '@tanstack/react-query';
import { ColumnDef } from '@tanstack/react-table';
import { Plus, Trash2 } from 'lucide-react';
import React from 'react';
import { Link } from 'react-router-dom';

import {
  Breadcrumb,
  BreadcrumbHome,
  BreadcrumbNeutral,
} from '@/components/common/breadcrumb';
import { Layout } from '@/components/common/layout';
import { Typography } from '@/components/common/typography';
import { Button } from '@/components/common/ui/button';
import { DataTable } from '@/components/common/ui/data-table';
import { APP_ROUTER } from '@/constants/app-routes';
import {
  PROVIDER_MAPPER_DB_IMAGEURL,
  PROVIDER_MAPPER_DB_LABEL,
  TYPE_STORAGE_MAPPER_DB_LABEL,
} from '@/constants/data-fonts';
import { reactQueryKeys } from '@/constants/react-query-keys';
import { dataFontsService } from '@/services/datafonts';
import { DataFontModel } from '@/services/models/datafont';
import {
  DataFontProviderEnum,
  TypeOfStorageEnum,
} from '@/services/models/types/common';

export type Payment = {
  id: string;
  amount: number;
  status: 'pending' | 'processing' | 'success' | 'failed';
  email: string;
};

export const columns: ColumnDef<DataFontModel>[] = [
  {
    accessorKey: 'typeOfStorage',
    header: 'Tipo do armazenamento',
    cell: ({ row }) =>
      TYPE_STORAGE_MAPPER_DB_LABEL[
        row.getValue<TypeOfStorageEnum>('typeOfStorage')
      ],
  },
  {
    accessorKey: 'provider',
    header: 'Provedor',
    cell: ({ row }) => (
      <div className="flex items-center gap-2">
        <img
          className="h-8 w-8"
          src={
            PROVIDER_MAPPER_DB_IMAGEURL[
              row.getValue<DataFontProviderEnum>('provider')
            ]
          }
        />
        {
          PROVIDER_MAPPER_DB_LABEL[
            row.getValue<DataFontProviderEnum>('provider')
          ]
        }
      </div>
    ),
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
    cell: () => (
      <Button
        variant="outline"
        size="icon"
        className="rounded-full border-red-300 text-red-500 hover:bg-red-50 hover:text-red-500"
      >
        <Trash2 size={18} />
      </Button>
    ),
  },
];

export const DataFontsPage: React.FC = () => {
  const { data } = useQuery({
    queryKey: [reactQueryKeys.queries.findAllDataFontsQuery],
    queryFn: dataFontsService.findAll,
  });

  if (data) {
    return (
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
            asChild
          >
            <Link to={APP_ROUTER.dataFont.new}>
              <Plus size={18} />
              Fonte de dados
            </Link>
          </Button>
        </div>

        <DataTable columns={columns} data={data.data} />
      </Layout>
    );
  }

  return null;
};
