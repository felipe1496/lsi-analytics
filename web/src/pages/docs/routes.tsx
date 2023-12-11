import React from 'react';
import { Route, Routes } from 'react-router-dom';

import { Overview } from './overview';

export const DocsRoutes: React.FC = () => (
  <Routes>
    <Route path="" element={<Overview />} />
  </Routes>
);
