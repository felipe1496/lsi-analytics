import React from 'react';
import { Route, Routes } from 'react-router-dom';

import { Guard } from '@/components/guard';
import { AuthGuard } from '@/components/guard/AuthGuard';
import { APP_ROUTER } from '@/constants/app-routes';

import { PreferencesPage } from './preferences-page';
import { ProfilePage } from './profile-page';

export const AccountRouter: React.FC = () => (
  <Routes>
    <Route
      path={APP_ROUTER.config.profile.index}
      element={<Guard guards={[new AuthGuard()]} protect={<ProfilePage />} />}
    />
    <Route
      path={APP_ROUTER.config.preferences.index}
      element={
        <Guard guards={[new AuthGuard()]} protect={<PreferencesPage />} />
      }
    />
  </Routes>
);
