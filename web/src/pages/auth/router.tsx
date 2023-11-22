import React from 'react';
import { Route, Routes } from 'react-router-dom';

import { APP_ROUTER } from '@/constants/app-routes';

import { LoginPage } from './login-page';
import { RegisterPage } from './register-page';

export const AuthRouter: React.FC = () => (
  <Routes>
    <Route path={APP_ROUTER.auth.login.url} Component={LoginPage} />
    <Route path={APP_ROUTER.auth.register.url} Component={RegisterPage} />
  </Routes>
);
