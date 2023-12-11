import { useMutation, useQuery } from '@tanstack/react-query';
import { ColumnDef } from '@tanstack/react-table';
import { Eye, EyeOff, Plus, Trash2 } from 'lucide-react';
import React from 'react';
import { Link } from 'react-router-dom';

import {
  Breadcrumb,
  BreadcrumbHome,
  BreadcrumbNeutral,
} from '@/components/breadcrumb';
import { Layout } from '@/components/layout';
import { LoadingTable } from '@/components/loading-table';
import { Typography } from '@/components/typography';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog/alert-dialog';
import { Button } from '@/components/ui/button';
import { DataTable } from '@/components/ui/data-table';
import { Skeleton } from '@/components/ui/skeleton';
import { APP_ROUTES } from '@/constants/app-routes';
import {
  PROVIDER_MAPPER_DB_IMAGEURL,
  PROVIDER_MAPPER_DB_LABEL,
  TYPE_STORAGE_MAPPER_DB_LABEL,
} from '@/constants/data-fonts';
import { reactQueryKeys } from '@/constants/react-query-keys';
import { dataFontsService } from '@/services/data-fonts';
import {
  DataFontModel,
  DataFontProviderEnum,
  TypeOfStorageEnum,
} from '@/services/models/datafont';

export const DataFontsPage: React.FC = () => {
  const [visibleFonts, setVisibleFonts] = React.useState<string[]>([]);

  const { data, isLoading, refetch } = useQuery({
    queryKey: [reactQueryKeys.queries.findAllDataFontsQuery],
    queryFn: dataFontsService.findAll,
  });

  const { mutate, isPending } = useMutation({
    mutationKey: [reactQueryKeys.mutations.deleteDataFontMutation],
    mutationFn: dataFontsService.delete,
    onSuccess: () => refetch(),
  });

  const columns: ColumnDef<DataFontModel>[] = [
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
      cell: ({ row }) => {
        const includes = visibleFonts.includes(row.id);

        return (
          <div className="flex items-center">
            {includes ? (
              row.getValue('accessKey')
            ) : (
              <input
                type="password"
                disabled
                value="xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
              />
            )}
            {includes ? (
              <button
                onClick={() =>
                  setVisibleFonts((prevState) =>
                    prevState.filter((e) => e !== row.id),
                  )
                }
              >
                <EyeOff />
              </button>
            ) : (
              <button
                onClick={() =>
                  setVisibleFonts((prevState) => {
                    const newState = [...prevState];
                    newState.push(row.id);
                    return newState;
                  })
                }
              >
                <Eye />
              </button>
            )}
          </div>
        );
      },
    },
    {
      accessorKey: 'actions',
      header: 'Ações',
      cell: ({ row }) => (
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="text-red-500 hover:bg-red-50 hover:text-red-500"
            >
              <Trash2 size={18} />
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>
                Você tem certeza que deseja remover?
              </AlertDialogTitle>
              <AlertDialogDescription>
                Essa ação não pode ser desfeita. Isso vai deletar
                permanentemente a sua Fonte de dados e seus conjuntos de dados
                relacionados a essa fonte.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancelar</AlertDialogCancel>
              <AlertDialogAction asChild>
                <Button
                  variant="destructive"
                  onClick={() => {
                    mutate({ path: { id: row.original.id } });
                  }}
                >
                  Remover
                </Button>
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      ),
    },
  ];

  const render = () => {
    if (isLoading || isPending) {
      return (
        <>
          <div className="flex items-center justify-between">
            <div className="flex flex-col gap-2">
              <Skeleton className="h-6 w-72" />
              <Skeleton className="h-3 w-96" />
            </div>

            <Skeleton className="h-8 w-44 rounded-full" />
          </div>
          <LoadingTable />
        </>
      );
    }

    if (data) {
      return (
        <>
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
              <Link to={APP_ROUTES.dataFont.new}>
                <Plus size={18} />
                Fonte de dados
              </Link>
            </Button>
          </div>

          <DataTable columns={columns} data={data.data} />
        </>
      );
    }

    return null;
  };

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
      {render()}
    </Layout>
  );

  return null;
};
