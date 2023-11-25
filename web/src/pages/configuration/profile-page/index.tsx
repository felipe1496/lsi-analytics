import React from 'react';

import {
  Breadcrumb,
  BreadcrumbHome,
  BreadcrumbLink,
  BreadcrumbNeutral,
} from '@/components/breadcrumb';
import { ConfigBar } from '@/components/config-bar';
import { Layout } from '@/components/layout';
import { APP_ROUTER } from '@/constants/app-routes';

export const ProfilePage: React.FC = () => (
  <Layout
    title="Perfil | Configuração"
    leftBar={<ConfigBar active="profile" />}
    breadcrumb={
      <Breadcrumb>
        <BreadcrumbHome />
        <BreadcrumbLink to={APP_ROUTER.config.profile.index}>
          Configurações
        </BreadcrumbLink>
        <BreadcrumbNeutral>Perfil</BreadcrumbNeutral>
      </Breadcrumb>
    }
  >
    Configuração
  </Layout>
);
