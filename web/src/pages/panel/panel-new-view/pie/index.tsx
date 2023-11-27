import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { useParams } from 'react-router-dom';

import {
  Breadcrumb,
  BreadcrumbHome,
  BreadcrumbLink,
  BreadcrumbNeutral,
} from '@/components/common/breadcrumb';
import { Layout } from '@/components/common/layout';
import { Step, Stepper } from '@/components/common/stepper';
import { Typography } from '@/components/common/typography';
import { APP_ROUTER } from '@/constants/app-routes';
import { reactQueryKeys } from '@/constants/react-query-keys';
import { NotFoundPage } from '@/pages/miscellaneous/not-found-page';
import { panelsService } from '@/services/panels';

export const PanelNewViewPie: React.FC = () => {
  const { id } = useParams();

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

  if (data && id) {
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
            <BreadcrumbLink to={APP_ROUTER.panel.edit.replace(':id', id)}>
              Editar
            </BreadcrumbLink>
            <BreadcrumbNeutral>Nova visualização</BreadcrumbNeutral>
          </Breadcrumb>
        }
        className="layout-page"
      >
        <div>
          <Typography level="h3">Nova visualização</Typography>
          {data.data.description && (
            <Typography level="muted">
              Siga os passos para criar um gráfico de torta
            </Typography>
          )}
        </div>

        <div className="border border-red-500">
          <Stepper>
            <Step>1</Step>
            <Step>2</Step>
            <Step>3</Step>
          </Stepper>
        </div>
      </Layout>
    );
  }

  return null;
};
