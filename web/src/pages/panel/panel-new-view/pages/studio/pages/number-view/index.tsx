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
import { APP_ROUTES } from '@/constants/app-routes';
import { usePanelNewViewContext } from '@/pages/panel/panel-new-view/hooks/usePanelNewViewContext';
import { usePanelQuery } from '@/pages/panel/panel-new-view/hooks/usePanelQuery';
import { formatDecimalPlaces } from '@/utils';

import { EditBar } from './components/EditBar';
import { usePanelNewViewStudioNumberViewContext } from './hooks/usePanelNewViewStudioNumberViewContext';

export const PanelViewStudioNewViewPage: React.FC = () => {
  const { id } = useParams();

  const { canAccessStep } = usePanelNewViewContext();

  const { number, numberOfDecimalPlaces, subTitle, isPercentage } =
    usePanelNewViewStudioNumberViewContext();

  const { data, error } = usePanelQuery({ id });

  const numberFormattedValue = () => {
    if (number) {
      if (numberOfDecimalPlaces !== null) {
        return formatDecimalPlaces(number, numberOfDecimalPlaces);
      }
      return number;
    }
    return 'NaN';
  };

  const renderBreadbrumb = () => {
    if (data && id) {
      return (
        <Breadcrumb>
          <BreadcrumbHome />
          <BreadcrumbLink to={APP_ROUTES.panels.index}>Paineis</BreadcrumbLink>
          <BreadcrumbLink to={APP_ROUTES.panel.index.replace(':id', id)}>
            {data.name}
          </BreadcrumbLink>
          <BreadcrumbLink to={APP_ROUTES.panel.edit.replace(':id', id)}>
            Editar
          </BreadcrumbLink>
          <BreadcrumbNeutral>Nova visualização</BreadcrumbNeutral>
          <BreadcrumbNeutral>Estúdio</BreadcrumbNeutral>
        </Breadcrumb>
      );
    }
    return null;
  };

  const render = () => {
    if (data && canAccessStep(4, data.id)) {
      return (
        <div className="flex h-full flex-col items-center justify-center">
          <div className="flex flex-col">
            <span className="text-6xl font-semibold">
              {numberFormattedValue() + (isPercentage ? '%' : '')}
            </span>
            <span className="text-2xl font-semibold">{subTitle}</span>
          </div>
        </div>
      );
    }

    if (error || !id) {
      <NotFoundPage />;
    }

    return null;
  };

  return (
    <Layout
      footer={null}
      title="Estúdio"
      breadcrumb={renderBreadbrumb()}
      rightBar={<EditBar />}
      className="h-layout-page"
    >
      {render()}
    </Layout>
  );
};
