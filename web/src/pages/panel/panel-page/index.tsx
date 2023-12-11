import { useQuery } from '@tanstack/react-query';
import { Settings, Trash2 } from 'lucide-react';
import React from 'react';
import { Link, useParams } from 'react-router-dom';

import {
  Breadcrumb,
  BreadcrumbHome,
  BreadcrumbLink,
  BreadcrumbNeutral,
} from '@/components/common/breadcrumb';
import { Layout } from '@/components/common/layout';
import { NotFoundPage } from '@/components/common/not-found-page';
import { Typography } from '@/components/common/typography';
import { Button } from '@/components/common/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/common/ui/dropdown-menu';
import { APP_ROUTES } from '@/constants/app-routes';
import { reactQueryKeys } from '@/constants/react-query-keys';
import { panelsService } from '@/services/panels';

import { PanelPageLoading } from './loading';

export const PanelPage: React.FC = () => {
  const { id } = useParams();

  const { data, error, isLoading } = useQuery({
    queryKey: [reactQueryKeys.queries.findPanelQuery, id],
    queryFn: () => {
      if (id) {
        return panelsService.find({ path: { id } });
      }
      return null;
    },
  });

  if (isLoading) {
    return <PanelPageLoading />;
  }

  if (error || !id) {
    return <NotFoundPage />;
  }

  if (data) {
    return (
      <Layout
        breadcrumb={
          <Breadcrumb>
            <BreadcrumbHome />
            <BreadcrumbLink to={APP_ROUTES.panels.index}>
              Paineis
            </BreadcrumbLink>
            <BreadcrumbNeutral>{data.data.name}</BreadcrumbNeutral>
          </Breadcrumb>
        }
        className="layout-page"
      >
        <div className="flex items-center justify-between">
          <div className="flex flex-col gap-1">
            <h1 className="text-2xl font-semibold">{data.data.name}</h1>
            {data.data.description && (
              <Typography level="muted">{data.data.description}</Typography>
            )}
          </div>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                color="danger"
                size="icon"
                className="rounded-full"
              >
                <Settings />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="mr-6">
              <DropdownMenuItem>Copiar link</DropdownMenuItem>
              <DropdownMenuItem>Compartilhar</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <Link
                  to={APP_ROUTES.panel.edit.replace(':id', id)}
                  state={{ tab: 'views' }}
                >
                  Nova visualização
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link to={APP_ROUTES.panel.edit.replace(':id', id)}>
                  Editar
                </Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <button className="group flex w-full items-center gap-2 text-red-500">
                  <Trash2 size={18} className="group-hover:text-red-500" />
                  <span className="group-hover:text-red-500">Remover</span>
                </button>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </Layout>
    );
  }

  return null;
};
