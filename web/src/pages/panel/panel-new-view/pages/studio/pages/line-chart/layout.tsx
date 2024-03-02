import React from 'react';
import { Outlet } from 'react-router-dom';

import { PanelNewViewStudioLineChartProvider } from './contexts/PanelNewViewStudioLineChartProvider';

export const PanelViewStudioLineChartLayout: React.FC = () => (
  <PanelNewViewStudioLineChartProvider>
    <Outlet />
  </PanelNewViewStudioLineChartProvider>
);
