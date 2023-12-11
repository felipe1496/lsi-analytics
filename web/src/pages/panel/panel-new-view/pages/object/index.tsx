import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { useParams } from 'react-router-dom';

import {
  Breadcrumb,
  BreadcrumbHome,
  BreadcrumbLink,
  BreadcrumbNeutral,
} from '@/components/breadcrumb';
import { Layout } from '@/components/layout';
import { NotFoundPage } from '@/components/not-found-page';
import { SimpleStepper } from '@/components/simple-stepper';
import { Combobox } from '@/components/ui/combobox';
import { APP_ROUTES } from '@/constants/app-routes';
import { reactQueryKeys } from '@/constants/react-query-keys';
import { panelsService } from '@/services/panels';

import { usePanelNewViewContext } from '../../hooks/usePanelNewViewContext';

export const PanelNewViewObject: React.FC = () => {
  const { id } = useParams();

  const { panelCreation } = usePanelNewViewContext();
  console.log(panelCreation);

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

  const combodata = [{ label: 'public', value: 'public' }];

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
          <div className="flex flex-col">
            <div className="border-b p-4">
              <SimpleStepper active={3} numberOfSteps={4} />
              <h1 className="text-lg font-semibold">
                Selecione o objeto de banco
              </h1>
            </div>

            <div className="p-4">
              <Combobox
                slotProps={{ popoverContent: { className: 'w-[287px]' } }}
                className="w-full"
                data={combodata}
                onChange={(value) => console.log(value)}
              />
            </div>
          </div>
        }
      >
        Objeto de banco
      </Layout>
    );
  }

  return null;
};
