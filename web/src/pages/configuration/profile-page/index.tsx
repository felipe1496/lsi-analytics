import React from 'react';

import {
  Breadcrumb,
  BreadcrumbHome,
  BreadcrumbLink,
  BreadcrumbNeutral,
} from '@/components/breadcrumb';
import { Layout } from '@/components/layout';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { APP_ROUTES } from '@/constants/app-routes';
import { getUserInfo } from '@/utils';

import { ConfigBar } from '../components/config-bar';

export const ProfilePage: React.FC = () => {
  const user = getUserInfo();

  if (user) {
    return (
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
        className="layout-page"
      >
        <Card className="w-[768px]">
          <CardHeader>
            <div className="flex flex-col gap-2">
              <CardTitle>Perfil</CardTitle>
              <CardDescription>Editar informações do perfil</CardDescription>
            </div>
          </CardHeader>
          <CardContent>
            <form>
              <div className="flex h-24 w-24 items-center justify-center rounded-full bg-orange-600 text-2xl font-semibold text-zinc-50">
                {user.name[0].toUpperCase()}
              </div>
            </form>
          </CardContent>
        </Card>
      </Layout>
    );
  }

  return null;
};
