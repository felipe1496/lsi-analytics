import React from 'react';
import { Outlet } from 'react-router-dom';

import { PanelNewViewStudioBarChartProvider } from './contexts/PanelNewViewStudioBarChartProvider';

export const PanelViewStudioBarChartLayout: React.FC = () => (
  <PanelNewViewStudioBarChartProvider>
    <Outlet />
  </PanelNewViewStudioBarChartProvider>
);
