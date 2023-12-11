import React from 'react';
import { Route, Routes } from 'react-router-dom';

import { PanelsPage } from './panels-page';

export const PanelsRoutes: React.FC = () => (
  <Routes>
    <Route path="" element={<PanelsPage />} />
  </Routes>
);
