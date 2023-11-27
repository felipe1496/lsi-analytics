import React from 'react';
import { Route, Routes } from 'react-router-dom';

import { Guard } from '@/components/common/guard';
import { AuthGuard } from '@/components/common/guard/AuthGuard';
import { APP_ROUTER } from '@/constants/app-routes';

import { Overview } from './overview';

export const DocsRouter: React.FC = () => (
  <Routes>
    <Route
      path={APP_ROUTER.docs.index}
      element={<Guard guards={[new AuthGuard()]} protect={<Overview />} />}
    />
  </Routes>
);
