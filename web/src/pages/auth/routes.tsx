import React from 'react';
import { Route, Routes } from 'react-router-dom';

import { APP_ROUTES } from '@/constants/app-routes';

import { LoginPage } from './login-page';
import { RegisterPage } from './register-page';

export const AuthRoutes: React.FC = () => (
  <Routes>
    <Route path={APP_ROUTES.auth.login} element={<LoginPage />} />
    <Route path={APP_ROUTES.auth.register} element={<RegisterPage />} />
  </Routes>
);
