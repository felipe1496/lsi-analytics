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
import { NotFoundPage } from '@/components/common/not-found-page';
import { APP_ROUTES } from '@/constants/app-routes';
import { reactQueryKeys } from '@/constants/react-query-keys';
import { panelsService } from '@/services/panels';

import { usePanelNewViewContext } from '../../hooks/usePanelNewViewContext';

export const PanelNewViewObject: React.FC = () => {
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
        leftBar={
          <div className="p-4">
            <h1 className="text-lg font-semibold">
              Selecione o objeto de banco
            </h1>
          </div>
        }
      >
        olá objeto
      </Layout>
    );
  }

  return null;
};
