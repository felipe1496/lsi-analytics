import React from 'react';
import { Outlet } from 'react-router-dom';

import { PanelNewViewProvider } from './contexts/PanelNewViewProvider';

export const PanelNewViewLayout: React.FC = () => (
  <PanelNewViewProvider>
    <Outlet />
  </PanelNewViewProvider>
);
