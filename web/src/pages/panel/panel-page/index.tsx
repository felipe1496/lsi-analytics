import React from 'react';
import { useParams } from 'react-router-dom';

import {
  Breadcrumb,
  BreadcrumbHome,
  BreadcrumbLink,
  BreadcrumbNeutral,
} from '@/components/breadcrumb';
import { Layout } from '@/components/layout';
import { APP_ROUTER } from '@/constants/app-routes';

export const PanelPage: React.FC = () => {
  const { id } = useParams();

  return (
    <Layout
      breadcrumb={
        <Breadcrumb>
          <BreadcrumbHome />
          <BreadcrumbLink to={APP_ROUTER.panels.index}>Paineis</BreadcrumbLink>
          <BreadcrumbNeutral>{id}</BreadcrumbNeutral>
        </Breadcrumb>
      }
      className="layout-page"
    >
      <h1 className="text-red-500">Painel do usuário</h1>
    </Layout>
  );
};
