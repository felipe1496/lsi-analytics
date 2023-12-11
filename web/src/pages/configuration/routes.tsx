import React from 'react';
import { Route, Routes } from 'react-router-dom';

import { ConfigPage } from './config-page';
import { ProfilePage } from './profile-page';

export const ConfigRoutes: React.FC = () => (
  <Routes>
    <Route path="/perfil" element={<ProfilePage />} />
    <Route path="" element={<ConfigPage />} />
  </Routes>
);
