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
import { panelsService } from '@/services/panels';

import { BREAKPOINTS, Breakpoints } from '../contexts/PanelProvider';
import { useSavePanelMutation } from '../hooks/mutations/useSavePanelMutation';
import { usePanelContext } from '../hooks/usePanelContext';
import { PanelPageLoading } from '../panel-page/loading';
import { EditBar } from './components/EditBar';
import { View } from './components/View';

const ResponsiveGridLayout = WidthProvider(Responsive);

export const PanelEditPage: React.FC = () => {
  const [responsive, setResponsive] = React.useState<Breakpoints>(
    BREAKPOINTS.LARGE,
  );

  const { newViewsPreview, layouts, getCreateViews } = usePanelContext();
  console.log(newViewsPreview);
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

  const { mutate: savePanel } = useSavePanelMutation();

  if (isLoading) {
    return <PanelPageLoading />;
  }

  if (error || !id) {
    return <NotFoundPage />;
  }

  const renderResponsiveContentIcon = (_responsive: Breakpoints) => {
    switch (_responsive) {
      case BREAKPOINTS.LARGE:
        return <Monitor size={18} />;
      case BREAKPOINTS.MEDIUM:
        return <Tablet size={18} />;
      case BREAKPOINTS.SMALL:
        return <Smartphone size={18} />;
      default:
        return null;
    }
  };

  const handleSavePanel = () => {
    if (data) {
      savePanel({
        path: {
          id: data.id,
        },
        body: {
          layout: layouts,
          createViews: getCreateViews(),
        },
      });
    }
  };

  const saveIsDisabled = () => {
    if (newViewsPreview.length > 0) {
      return false;
    }

    return true;
  };

  const render = () => {
    if (data) {
      return (
        <ResponsiveGridLayout
          className="layout"
          layouts={layouts}
          onLayoutChange={(newLayout) => console.log(newLayout)}
          breakpoints={{ LARGE: 1200, MEDIUM: 996, SMALL: 768 }}
          cols={{ LARGE: 12, MEDIUM: 10, SMALL: 6 }}
          rowHeight={30}
        >
          {newViewsPreview.map((v) => (
            <div key={v.view.id}>
              <View data={v.echartData} />
            </div>
          ))}
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
        className="min-h-layout-page"
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
                    onClick={() => setResponsive(BREAKPOINTS.LARGE)}
                  >
                    <Monitor size={18} />
                    Desktop
                  </button>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <button
                    className="flex w-full items-center gap-1"
                    onClick={() => setResponsive(BREAKPOINTS.MEDIUM)}
                  >
                    <Tablet size={18} />
                    Tablet
                  </button>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <button
                    className="flex w-full items-center gap-1"
                    onClick={() => setResponsive(BREAKPOINTS.SMALL)}
                  >
                    <Smartphone size={18} />
                    Mobile
                  </button>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <Button
              variant="positive"
              disabled={saveIsDisabled()}
              onClick={handleSavePanel}
            >
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
