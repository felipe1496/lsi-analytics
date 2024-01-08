import { useQuery } from '@tanstack/react-query';
import {
  ChevronDown,
  History,
  Monitor,
  Smartphone,
  Tablet,
} from 'lucide-react';
import React from 'react';
import { Responsive, WidthProvider } from 'react-grid-layout';
import { Link, useParams } from 'react-router-dom';

import {
  Breadcrumb,
  BreadcrumbHome,
  BreadcrumbLink,
  BreadcrumbNeutral,
} from '@/components/breadcrumb';
import { Layout } from '@/components/layout';
import { NotFoundPage } from '@/components/not-found-page';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { APP_ROUTES } from '@/constants/app-routes';
import { reactQueryKeys } from '@/constants/react-query-keys';
import { GridLayout } from '@/lib/react-grid-layout';
import { panelsService } from '@/services/panels';

import { usePanelContext } from '../hooks/usePanelContext';
import { PanelPageLoading } from '../panel-page/loading';
import { EditBar } from './components/EditBar';

type ResponsiveType = 'mobile' | 'tablet' | 'desktop';

const ResponsiveGridLayout = WidthProvider(Responsive);

export const PanelEditPage: React.FC = () => {
  const [responsive, setResponsive] = React.useState<ResponsiveType>('desktop');

  const { newViewsPreview } = usePanelContext();

  console.log('newViewsPreview: ', newViewsPreview);

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

  const renderResponsiveContentIcon = (_responsive: ResponsiveType) => {
    switch (_responsive) {
      case 'desktop':
        return <Monitor size={18} />;
      case 'tablet':
        return <Tablet size={18} />;
      case 'mobile':
        return <Smartphone size={18} />;
      default:
        return null;
    }
  };

  const layout = {
    lg: [
      { i: 'a', x: 0, y: 0, w: 1, h: 2 },
      { i: 'b', x: 1, y: 0, w: 3, h: 2 },
      { i: 'c', x: 4, y: 0, w: 1, h: 2 },
    ],
  };

  const render = () => {
    if (data) {
      return (
        <ResponsiveGridLayout
          className="layout"
          layouts={layout}
          breakpoints={{ lg: 1200, md: 996, sm: 768 }}
          cols={{ lg: 12, md: 10, sm: 6 }}
          rowHeight={30}
        >
          {}
          <div key="a" className="bg-red-500">
            a
          </div>
          <div key="b" className="bg-amber-500">
            b
          </div>
          <div key="c" className="bg-green-500">
            c
          </div>
        </ResponsiveGridLayout>
      );
    }

    return null;
  };

  if (data) {
    return (
      <Layout
        title="Editar"
        footer={null}
        className="min-h-layout-page border-2 border-red-500"
        breadcrumb={
          <Breadcrumb>
            <BreadcrumbHome />
            <BreadcrumbLink to={APP_ROUTES.panels.index}>
              Paineis
            </BreadcrumbLink>
            <BreadcrumbLink to={APP_ROUTES.panel.index.replace(':id', id)}>
              {data.name}
            </BreadcrumbLink>
            <BreadcrumbNeutral>Editar</BreadcrumbNeutral>
          </Breadcrumb>
        }
        rightBar={<EditBar data={data} />}
        rightContent={
          <div className="flex items-center gap-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="gap-2">
                  {renderResponsiveContentIcon(responsive)}
                  <ChevronDown size={18} />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem asChild>
                  <button
                    className="flex w-full items-center gap-1"
                    onClick={() => setResponsive('desktop')}
                  >
                    <Monitor size={18} />
                    Desktop
                  </button>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <button
                    className="flex w-full items-center gap-1"
                    onClick={() => setResponsive('tablet')}
                  >
                    <Tablet size={18} />
                    Tablet
                  </button>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <button
                    className="flex w-full items-center gap-1"
                    onClick={() => setResponsive('mobile')}
                  >
                    <Smartphone size={18} />
                    Mobile
                  </button>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <Button variant="positive" disabled>
              Salvar
            </Button>
            <Tooltip delayDuration={0}>
              <TooltipTrigger>
                <Button
                  variant="ghost"
                  size="icon"
                  className="rounded-full"
                  asChild
                >
                  <Link to={APP_ROUTES.panel.audit.replace(':id', data.id)}>
                    <History className="text-zinc-600" />
                  </Link>
                </Button>
              </TooltipTrigger>
              <TooltipContent>Registro de auditoria</TooltipContent>
            </Tooltip>
          </div>
        }
      >
        {render()}
      </Layout>
    );
  }

  return null;
};
