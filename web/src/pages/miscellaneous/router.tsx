import React from 'react';
import { Route, Routes } from 'react-router-dom';

import { LandingPage } from './landing-page';

export const MiscellaneousRouter: React.FC = () => (
  <Routes>
    <Route index Component={LandingPage} />
  </Routes>
);
