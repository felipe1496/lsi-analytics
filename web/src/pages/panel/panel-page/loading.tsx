import React from 'react';

import {
  Breadcrumb,
  BreadcrumbHome,
  BreadcrumbLink,
} from '@/components/common/breadcrumb';
import { Layout } from '@/components/common/layout';
import { Skeleton } from '@/components/common/ui/skeleton';
import { APP_ROUTES } from '@/constants/app-routes';

export const PanelPageLoading: React.FC = () => (
  <Layout
    breadcrumb={
      <Breadcrumb>
        <BreadcrumbHome />
        <BreadcrumbLink to={APP_ROUTES.panels.index}>Paineis</BreadcrumbLink>
      </Breadcrumb>
    }
    className="layout-page"
  >
    <div className="flex items-center justify-between">
      <div className="flex flex-col gap-1">
        <Skeleton className="h-6 w-72" />
        <Skeleton className="h-3 w-60" />
      </div>

      <Skeleton className="h-12 w-12 rounded-full" />
    </div>
  </Layout>
);
