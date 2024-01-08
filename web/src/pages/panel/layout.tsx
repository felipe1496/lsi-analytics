import React from 'react';
import { Outlet } from 'react-router-dom';

import { PanelProvider } from './contexts/PanelProvider';

interface PanelLayoutProps {}

export const PanelLayout: React.FC<PanelLayoutProps> = () => (
  <PanelProvider>
    <Outlet />
  </PanelProvider>
);
