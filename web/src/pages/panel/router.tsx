import React from 'react';
import { Route, Routes } from 'react-router-dom';

import { Guard } from '@/components/guard';
import { AuthGuard } from '@/components/guard/AuthGuard';
import { APP_ROUTER } from '@/constants/app-routes';

import { PanelPage } from './panel-page';

export const PanelRouter: React.FC = () => (
  <Routes>
    <Route
      path={APP_ROUTER.panel.index}
      element={<Guard guards={[new AuthGuard()]} protect={<PanelPage />} />}
    />
  </Routes>
);
