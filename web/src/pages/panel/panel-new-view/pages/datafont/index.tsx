import { useQuery } from '@tanstack/react-query';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import React from 'react';
import { Link, useParams } from 'react-router-dom';

import {
  Breadcrumb,
  BreadcrumbHome,
  BreadcrumbLink,
  BreadcrumbNeutral,
} from '@/components/common/breadcrumb';
import { Layout } from '@/components/common/layout';
import { NoData } from '@/components/common/no-data';
import { NotFoundPage } from '@/components/common/not-found-page';
import { SimpleStepper } from '@/components/common/simple-stepper';
import { Typography } from '@/components/common/typography';
import { Button } from '@/components/common/ui/button';
import { Input } from '@/components/common/ui/input';
import { Label } from '@/components/common/ui/label';
import { APP_ROUTES } from '@/constants/app-routes';
import { reactQueryKeys } from '@/constants/react-query-keys';
import { panelsService } from '@/services/panels';

import { usePanelNewViewContext } from '../../hooks/usePanelNewViewContext';

export const PanelNewViewDataFont: React.FC = () => {
  const { id } = useParams();

  usePanelNewViewContext();

  const { data, error } = useQuery({
    queryKey: [reactQueryKeys.queries.findPanelQuery, id],
    queryFn: () => {
      if (id) {
        return panelsService.find({ path: { id } });
      }
      return null;
    },
  });

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
            <BreadcrumbLink to={APP_ROUTES.panel.index.replace(':id', id)}>
              {data.data.name}
            </BreadcrumbLink>
            <BreadcrumbLink to={APP_ROUTES.panel.edit.replace(':id', id)}>
              Editar
            </BreadcrumbLink>
            <BreadcrumbNeutral>Nova visualização</BreadcrumbNeutral>
          </Breadcrumb>
        }
        className="layout-page"
      >
        <div className="flex w-[768px] flex-col gap-6">
          <SimpleStepper numberOfSteps={4} active={2} />

          <div className="flex flex-col gap-1">
            <h1 className="text-2xl font-semibold">Fonte de dados</h1>

            <Typography level="muted">
              selecione uma fonte de dados para criar a visualização
            </Typography>
          </div>

          <div>
            <Label>Fonte de dados</Label>
            <Input placeholder="Busque uma fonte" />
          </div>

          <NoData />

          <div className="flex justify-between">
            <Link
              to={APP_ROUTES.panel.new.view.replace(':id', data.data.id)}
              state={{ tab: 'views' }}
            >
              <Button variant="outline" type="button">
                <ChevronLeft size={18} />
                Voltar
              </Button>
            </Link>
            <Button type="submit">
              Próximo
              <ChevronRight size={18} />
            </Button>
          </div>
        </div>
      </Layout>
    );
  }

  return null;
};
