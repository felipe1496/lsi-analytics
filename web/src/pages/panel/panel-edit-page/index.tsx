import { useQuery } from '@tanstack/react-query';
import { History } from 'lucide-react';
import React from 'react';
import { Link, useParams } from 'react-router-dom';

import {
  Breadcrumb,
  BreadcrumbHome,
  BreadcrumbLink,
  BreadcrumbNeutral,
} from '@/components/common/breadcrumb';
import { Layout } from '@/components/common/layout';
import { Button } from '@/components/common/ui/button';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/common/ui/tooltip';
import { APP_ROUTER } from '@/constants/app-routes';
import { reactQueryKeys } from '@/constants/react-query-keys';
import { NotFoundPage } from '@/pages/miscellaneous/not-found-page';
import { panelsService } from '@/services/panels';

import { PanelPageLoading } from '../panel-page/loading';
import { EditBar } from './components/EditBar';

export const PanelEditPage: React.FC = () => {
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
            <BreadcrumbLink to={APP_ROUTER.panels.index}>
              Paineis
            </BreadcrumbLink>
            <BreadcrumbLink to={APP_ROUTER.panel.index.replace(':id', id)}>
              {data.data.name}
            </BreadcrumbLink>
            <BreadcrumbNeutral>Editar</BreadcrumbNeutral>
          </Breadcrumb>
        }
        rightBar={<EditBar data={data.data} />}
        className="layout-page"
        rightContent={
          <Tooltip delayDuration={0}>
            <TooltipTrigger>
              <Button
                variant="ghost"
                size="icon"
                className="rounded-full"
                asChild
              >
                <Link to={APP_ROUTER.panel.audit.replace(':id', data.data.id)}>
                  <History className="text-zinc-600" />
                </Link>
              </Button>
            </TooltipTrigger>
            <TooltipContent>Registro de auditoria</TooltipContent>
          </Tooltip>
        }
      ></Layout>
    );
  }

  return null;
};
