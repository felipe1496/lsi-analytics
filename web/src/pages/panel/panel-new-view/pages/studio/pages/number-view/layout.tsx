import React from 'react';
import { Outlet } from 'react-router-dom';

import { PanelNewViewStudioNewViewProvider } from './contexts/PanelNewViewStudioNumberViewProvider';

export const PanelViewStudioNumberViewLayout: React.FC = () => (
  <PanelNewViewStudioNewViewProvider>
    <Outlet />
  </PanelNewViewStudioNewViewProvider>
);
