import React from 'react';

import {
  Breadcrumb,
  BreadcrumbHome,
  BreadcrumbLink,
  BreadcrumbNeutral,
} from '@/components/breadcrumb';
import { Layout } from '@/components/layout';
import { APP_ROUTES } from '@/constants/app-routes';

import { ConfigBar } from '../components/config-bar';

export const PreferencesPage: React.FC = () => (
  <Layout
    title="Preferências"
    leftBar={<ConfigBar active="preferences" />}
    breadcrumb={
      <Breadcrumb>
        <BreadcrumbHome />
        <BreadcrumbLink to={APP_ROUTES.config.index}>
          Configurações
        </BreadcrumbLink>
        <BreadcrumbNeutral>Preferências</BreadcrumbNeutral>
      </Breadcrumb>
    }
  ></Layout>
);
