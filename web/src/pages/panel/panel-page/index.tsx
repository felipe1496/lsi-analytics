import { useQuery } from '@tanstack/react-query';
import { Plus, Settings, Share2, Trash2 } from 'lucide-react';
import React from 'react';
import { Layout as GridLayout } from 'react-grid-layout';
import { Link, useParams } from 'react-router-dom';

import { EchartAdapter } from '@/adapters/echart';
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
import { View } from '@/components/view';
import { APP_ROUTES } from '@/constants/app-routes';
import { reactQueryKeys } from '@/constants/react-query-keys';
import { ResponsiveGridLayout } from '@/lib/echarts-for-react';
import { panelsService } from '@/services/panels';

import { Breakpoints } from '../contexts/PanelEditProvider';
import { PanelPageLoading } from './loading';

export const PanelPage: React.FC = () => {
  const { id } = useParams();

  const { data, error, isLoading } = useQuery({
    queryKey: [reactQueryKeys.queries.findPanelChartViews, id],
    queryFn: () => {
      if (id) {
        return panelsService.findPanelChartViews({ path: { id } });
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

  const layoutToStatic = (
    layout: Record<Breakpoints, GridLayout[]> | null | undefined,
  ) => {
    if (layout) {
      const _layout: Record<Breakpoints, GridLayout[]> = {
        LARGE: [],
        MEDIUM: [],
        SMALL: [],
      };
      Object.keys(layout).forEach((k) => {
        const _k = k as Breakpoints;
        _layout[_k] = layout[_k].map((l) => ({ ...l, static: true }));
      });
      return _layout;
    }

    return {};
  };

  if (data) {
    return (
      <Layout
        title={data.panel.name}
        breadcrumb={
          <Breadcrumb>
            <BreadcrumbHome />
            <BreadcrumbLink to={APP_ROUTES.panels.index}>
              Paineis
            </BreadcrumbLink>
            <BreadcrumbNeutral>{data.panel.name}</BreadcrumbNeutral>
          </Breadcrumb>
        }
        className="layout-page"
      >
        <div className="flex items-center justify-between">
          <div className="flex flex-col gap-1">
            <h1 className="text-2xl font-semibold">{data.panel.name}</h1>
            {data.panel.description && (
              <Typography level="muted">{data.panel.description}</Typography>
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
                    <Plus size={16} className="text-foreground" />
                    Nova visualização
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link
                    to={APP_ROUTES.panel.edit.replace(':id', id)}
                    className="flex items-center gap-2"
                  >
                    <Settings size={16} className="text-foreground" />
                    Editar painel
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <button className="group flex w-full items-center gap-2 text-red-500">
                    <Trash2 size={18} className="group-hover:text-red-500" />
                    <span className="group-hover:text-red-500">Excluir</span>
                  </button>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
        <ResponsiveGridLayout
          className="layout"
          layouts={layoutToStatic(data.panel.layout)}
          breakpoints={{ LARGE: 1200, MEDIUM: 996, SMALL: 768 }}
          cols={{ LARGE: 12, MEDIUM: 10, SMALL: 6 }}
          rowHeight={30}
        >
          {data.views.map((v) => {
            const graphData = EchartAdapter.queryToData({
              queryResult: v.queryResult,
              type: v.view.type,
              core: v.view.core,
            });

            if (graphData) {
              return (
                <div key={v.view.id}>
                  <View
                    name={v.view.name}
                    data={graphData}
                    type={v.view.type}
                  />
                </div>
              );
            }

            return null;
          })}
        </ResponsiveGridLayout>
      </Layout>
    );
  }

  return null;
};
