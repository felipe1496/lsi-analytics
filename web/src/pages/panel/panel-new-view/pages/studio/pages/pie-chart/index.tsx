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
import { usePanelNewViewStudioPieChartContext } from './hooks/usePanelNewViewStudioPieChartContext';

export const PanelViewStudioPieChartPage: React.FC = () => {
  const { id } = useParams();

  const { canAccessStep } = usePanelNewViewContext();

  const { echartData } = usePanelNewViewStudioPieChartContext();

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
            title: {
              left: 'center',
            },
            tooltip: {
              trigger: 'item',
            },
            legend: {
              orient: 'vertical',
              left: 'left',
            },
            series: [
              {
                name: 'Access From',
                type: 'pie',
                radius: '50%',
                data: echartData,
                emphasis: {
                  itemStyle: {
                    shadowBlur: 10,
                    shadowOffsetX: 0,
                    shadowColor: 'rgba(0, 0, 0, 0.5)',
                  },
                },
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
