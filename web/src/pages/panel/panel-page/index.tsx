import { useQuery } from '@tanstack/react-query';
import { Plus, Settings, Share2, Trash2 } from 'lucide-react';
import React from 'react';
import { Layout as GridLayout } from 'react-grid-layout';
import { Link, useParams } from 'react-router-dom';

import {
  Breadcrumb,
  BreadcrumbHome,
  BreadcrumbLink,
  BreadcrumbNeutral,
} from '@/components/breadcrumb';
import { Layout } from '@/components/layout';
import { Loader } from '@/components/loader';
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
import { PANEL } from '@/services/models/panel/constants';
import { SelectFilter } from '@/services/models/panel/types';
import { panelsService } from '@/services/panels';
import { getViewData } from '@/utils';

import { Breakpoints } from '../contexts/PanelEditProvider';
import { PanelPageLoading } from './loading';

export const PanelPage: React.FC = () => {
  const filters = React.useRef<{ id: string; value: string | number }[]>([]);

  const { id } = useParams();

  const filtersToURL = () => {
    console.log('executei: ');
    let filterURL = '';

    if (filters.current.length > 0) {
      filters.current.forEach((f, index) => {
        const value = typeof f.value === 'string' ? `'${f.value}'` : f.value;
        if (index === 0) {
          filterURL = `${f.id} ${value}`;
        } else {
          filterURL += ` and ${f.id} ${value}`;
        }
      });
    }

    if (!filterURL) {
      return undefined;
    }

    return filterURL;
  };

  const { data, error, isLoading, refetch, isFetching } = useQuery({
    queryKey: [reactQueryKeys.queries.findPanelChartViews, id],
    queryFn: () => {
      if (id) {
        return panelsService.findPanelChartViews({
          path: { id },
          config: {
            params: {
              filter: filtersToURL(),
            },
          },
        });
      }
      return null;
    },
    refetchOnWindowFocus: false,
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

  const render = () => {
    if (data) {
      const renderViews = () => (
        <>
          {isFetching && (
            <div className="absolute left-1/2 top-1/2 z-10">
              <Loader size="medium" />
            </div>
          )}
          <ResponsiveGridLayout
            className="layout"
            layouts={layoutToStatic(data.panel.layout)}
            breakpoints={{ LARGE: 1200, MEDIUM: 996, SMALL: 768 }}
            cols={{ LARGE: 12, MEDIUM: 10, SMALL: 6 }}
            rowHeight={30}
          >
            {data.views.map((v) => {
              const vData = getViewData(v);

              console.log('v: ', v);

              if (vData) {
                switch (v.view.type) {
                  case PANEL.VIEW.SELECTFILTER: {
                    const _core = v.view.core as SelectFilter;
                    return (
                      <div key={v.view.id}>
                        <View
                          name={v.view.name}
                          data={vData}
                          type={v.view.type}
                          onChange={(value) => {
                            if (value === null) {
                              filters.current = filters.current.filter(
                                (f) => f.id !== _core.id,
                              );
                            } else {
                              const isAlreadyFilteringIdx =
                                filters.current.findIndex(
                                  (f) => f.id === _core.id,
                                );
                              if (isAlreadyFilteringIdx === -1) {
                                filters.current = [
                                  ...filters.current,
                                  { id: _core.id, value },
                                ];
                              } else {
                                filters.current[isAlreadyFilteringIdx] = {
                                  id: _core.id,
                                  value,
                                };
                              }
                            }

                            refetch();
                          }}
                        />
                      </div>
                    );
                  }

                  default:
                    return (
                      <div key={v.view.id}>
                        <View
                          filters={v.filters}
                          name={v.view.name}
                          data={vData}
                          type={v.view.type}
                        />
                      </div>
                    );
                }
              }

              return null;
            })}
          </ResponsiveGridLayout>
        </>
      );

      return (
        <>
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
          {renderViews()}
        </>
      );
    }

    return null;
  };

  return (
    <Layout
      title={data && data.panel.name}
      breadcrumb={
        <Breadcrumb>
          <BreadcrumbHome />
          <BreadcrumbLink to={APP_ROUTES.panels.index}>Paineis</BreadcrumbLink>
          {data && <BreadcrumbNeutral>{data.panel.name}</BreadcrumbNeutral>}
        </Breadcrumb>
      }
      className="layout-page"
    >
      {render()}
    </Layout>
  );
};
