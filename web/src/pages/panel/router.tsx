import React from 'react';
import { Route, Routes } from 'react-router-dom';

import { Guard } from '@/components/common/guard';
import { AuthGuard } from '@/components/common/guard/AuthGuard';
import { APP_ROUTER } from '@/constants/app-routes';

import { PanelAuditPage } from './panel-audit-page';
import { PanelEditPage } from './panel-edit-page';
import { PanelNewView } from './panel-new-view';
import { PanelPage } from './panel-page';

export const PanelRouter: React.FC = () => (
  <Routes>
    <Route
      path={APP_ROUTER.panel.index}
      element={<Guard guards={[new AuthGuard()]} protect={<PanelPage />} />}
    />
    <Route
      path={APP_ROUTER.panel.edit}
      element={<Guard guards={[new AuthGuard()]} protect={<PanelEditPage />} />}
    />
    <Route
      path={APP_ROUTER.panel.audit}
      element={
        <Guard guards={[new AuthGuard()]} protect={<PanelAuditPage />} />
      }
    />
    <Route
      path={APP_ROUTER.panel.new.view}
      element={<Guard guards={[new AuthGuard()]} protect={<PanelNewView />} />}
    />
  </Routes>
);
