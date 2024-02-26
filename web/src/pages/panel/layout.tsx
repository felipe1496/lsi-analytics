import React from 'react';
import { Outlet } from 'react-router-dom';

import { PanelEditProvider } from './contexts/PanelEditProvider';

interface PanelLayoutProps {}

export const PanelEditLayout: React.FC<PanelLayoutProps> = () => (
  <PanelEditProvider>
    <Outlet />
  </PanelEditProvider>
);
