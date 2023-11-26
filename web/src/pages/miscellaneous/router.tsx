import React from 'react';
import { Route, Routes } from 'react-router-dom';

import { APP_ROUTER } from '@/constants/app-routes';

import { LandingPage } from './landing-page';
import { NotFoundPage } from './not-found-page';

export const MiscellaneousRouter: React.FC = () => (
  <Routes>
    <Route index element={<LandingPage />} />
    <Route path={APP_ROUTER.misc.notFound.index} element={<NotFoundPage />} />
  </Routes>
);
