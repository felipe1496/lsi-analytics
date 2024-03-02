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
import { EChart } from '@/lib/echarts-for-react';
import { usePanelNewViewContext } from '@/pages/panel/panel-new-view/hooks/usePanelNewViewContext';
import { usePanelQuery } from '@/pages/panel/panel-new-view/hooks/usePanelQuery';

import { EditBar } from './components/EditBar';
import { usePanelNewViewStudioLineChartContext } from './hooks/usePanelNewViewStudioLineChartContext';

export const PanelViewStudioLineChartPage: React.FC = () => {
  const { id } = useParams();

  const { canAccessStep } = usePanelNewViewContext();

  const { echartData } = usePanelNewViewStudioLineChartContext();

  const { data, error } = usePanelQuery({ id });

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
        <EChart
          style={{
            height: 'calc(100vh - 3.5rem)',
          }}
          option={{
            xAxis: {
              type: 'category',
              data: echartData.xAxis.data,
            },
            yAxis: {
              type: 'value',
            },
            series: [
              {
                data: echartData.series.data,
                type: 'line',
              },
            ],
          }}
        />
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
    >
      {render()}
    </Layout>
  );
};
