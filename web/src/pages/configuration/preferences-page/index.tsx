import React from 'react';

import {
  Breadcrumb,
  BreadcrumbHome,
  BreadcrumbLink,
  BreadcrumbNeutral,
} from '@/components/common/breadcrumb';
import { ConfigBar } from '@/components/common/config-bar';
import { Layout } from '@/components/common/layout';
import { APP_ROUTER } from '@/constants/app-routes';

export const PreferencesPage: React.FC = () => (
  <Layout
    title="Preferências | Configurações"
    leftBar={<ConfigBar active="preferences" />}
    breadcrumb={
      <Breadcrumb>
        <BreadcrumbHome />
        <BreadcrumbLink to={APP_ROUTER.config.profile.index}>
          Configurações
        </BreadcrumbLink>
        <BreadcrumbNeutral>Preferências</BreadcrumbNeutral>
      </Breadcrumb>
    }
  >
    Preferências
  </Layout>
);
