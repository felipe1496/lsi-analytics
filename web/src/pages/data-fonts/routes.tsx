import React from 'react';
import { Route, Routes } from 'react-router-dom';

import { DataFontsNewPage } from './data-fonts-new-page';
import { DataFontsPage } from './data-fonts-page';

export const DataFontRoutes: React.FC = () => (
  <Routes>
    <Route path="" element={<DataFontsPage />} />
    <Route path="novo" element={<DataFontsNewPage />} />
  </Routes>
);
