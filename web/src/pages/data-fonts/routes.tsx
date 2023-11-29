import React from 'react';
import { Route, Routes } from 'react-router-dom';

import { Guard } from '@/components/common/guard';
import { AuthGuard } from '@/components/common/guard/AuthGuard';
import { APP_ROUTER } from '@/constants/app-routes';

import { DataFontsNewPage } from './data-fonts-new-page';
import { DataFontsPage } from './data-fonts-page';

export const DataFontRoutes: React.FC = () => (
  <Routes>
    <Route
      path={APP_ROUTER.dataFont.index}
      element={<Guard guards={[new AuthGuard()]} protect={<DataFontsPage />} />}
    />
    <Route
      path={APP_ROUTER.dataFont.new}
      element={
        <Guard guards={[new AuthGuard()]} protect={<DataFontsNewPage />} />
      }
    />
  </Routes>
);
