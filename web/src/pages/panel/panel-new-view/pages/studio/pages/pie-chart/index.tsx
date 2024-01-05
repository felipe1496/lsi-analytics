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
import { ReactEChart } from '@/lib/echarts-for-react';
import { usePanelNewViewContext } from '@/pages/panel/panel-new-view/hooks/usePanelNewViewContext';
import { usePanelQuery } from '@/pages/panel/panel-new-view/hooks/usePanelQuery';

import { EditBar } from './components/EditBar';
import { usePanelNewViewStudioPieChartContext } from './hooks/usePanelNewViewStudioPieChartContext';

export const PanelViewStudioPieChartPage: React.FC = () => {
  const { id } = useParams();

  const { canAccessStep } = usePanelNewViewContext();

  const { echartsData } = usePanelNewViewStudioPieChartContext();

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
        <div className="h-screen">
          <ReactEChart
            option={{
              title: {
                text: 'Referer of a Website',
                subtext: 'Fake Data',
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
                  data: echartsData,
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
        </div>
      );
    }

    if (error || !id) {
      <NotFoundPage />;
    }

    return null;
  };
  /* if (data && canAccessStep(4, data.id)) {
      console.log('renderizei');
      return (
        <div className="flex h-screen items-center justify-center">
          <ReactEChart
            option={{
              title: {
                text: 'Referer of a Website',
                subtext: 'Fake Data',
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
                  data: [
                    { value: 1048, name: 'Search Engine' },
                    { value: 735, name: 'Direct' },
                    { value: 580, name: 'Email' },
                    { value: 484, name: 'Union Ads' },
                    { value: 300, name: 'Video Ads' },
                  ],
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
        </div>
      );
    }

    if (error || !id) {
      <NotFoundPage />;
    }

    return <>asdkljdlkasj</>; */
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
