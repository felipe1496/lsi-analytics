import React from 'react';
import { Outlet } from 'react-router-dom';

import { PanelNewViewStudioPieChartProvider } from './contexts/PanelNewViewStudioPieChartProvider';

export const PanelViewStudioPieChartLayout: React.FC = () => (
  <PanelNewViewStudioPieChartProvider>
    <Outlet />
  </PanelNewViewStudioPieChartProvider>
);
