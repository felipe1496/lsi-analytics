import { useQuery } from '@tanstack/react-query';
import { Plus, Settings, Share2, Trash2 } from 'lucide-react';
import React from 'react';
import { Link, useParams } from 'react-router-dom';

import {
  Breadcrumb,
  BreadcrumbHome,
  BreadcrumbLink,
  BreadcrumbNeutral,
} from '@/components/breadcrumb';
import { Layout } from '@/components/layout';
import { NotFoundPage } from '@/components/not-found-page';
import { Typography } from '@/components/typography';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
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
        title={data.name}
        breadcrumb={
          <Breadcrumb>
            <BreadcrumbHome />
            <BreadcrumbLink to={APP_ROUTES.panels.index}>
              Paineis
            </BreadcrumbLink>
            <BreadcrumbNeutral>{data.name}</BreadcrumbNeutral>
          </Breadcrumb>
        }
        className="layout-page"
      >
        <div className="flex items-center justify-between">
          <div className="flex flex-col gap-1">
            <h1 className="text-2xl font-semibold">{data.name}</h1>
            {data.description && (
              <Typography level="muted">{data.description}</Typography>
            )}
          </div>
          <div className="flex items-center gap-4">
            <Button variant="outline" className="gap-2 rounded-full">
              <Share2 size={18} />
              Compartilhar
            </Button>
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
                <DropdownMenuItem asChild>
                  <Link
                    to={APP_ROUTES.panel.edit.replace(':id', id)}
                    state={{ tab: 'views' }}
                    className="flex items-center gap-2"
                  >
                    <Plus size={16} className="text-zinc-500" />
                    Nova visualização
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link
                    to={APP_ROUTES.panel.edit.replace(':id', id)}
                    className="flex items-center gap-2"
                  >
                    <Settings size={16} className="text-zinc-500" />
                    Editar painel
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
        </div>
      </Layout>
    );
  }

  return null;
};
