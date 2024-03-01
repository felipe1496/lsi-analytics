import React from 'react';

import { PanelNewViewStudioBarChartContext } from '../contexts/PanelNewViewStudioBarChartProvider';

export const usePanelNewViewStudioBarChartContext = () => {
  const value = React.useContext(PanelNewViewStudioBarChartContext);

  if (!value) {
    throw new Error(
      'PanelNewViewStudioBarChartContext só pode usado dentro do componente PanelNewViewProvider',
    );
  }

  return value;
};
