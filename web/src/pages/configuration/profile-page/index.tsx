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

export const ProfilePage: React.FC = () => (
  <Layout
    title="Perfil | Configuração"
    leftBar={<ConfigBar active="profile" />}
    breadcrumb={
      <Breadcrumb>
        <BreadcrumbHome />
        <BreadcrumbLink to={APP_ROUTES.config.profile}>
          Configurações
        </BreadcrumbLink>
        <BreadcrumbNeutral>Perfil</BreadcrumbNeutral>
      </Breadcrumb>
    }
  >
    Configuração
  </Layout>
);
