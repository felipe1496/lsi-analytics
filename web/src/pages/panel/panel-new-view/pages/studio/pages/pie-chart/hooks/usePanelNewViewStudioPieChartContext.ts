import React from 'react';

import { PanelNewViewStudioPieChartContext } from '../contexts/PanelNewViewStudioPieChartProvider';

export const usePanelNewViewStudioPieChartContext = () => {
  const value = React.useContext(PanelNewViewStudioPieChartContext);

  if (!value) {
    throw new Error(
      'PanelNewViewStudioPieChartContext só pode usado dentro do componente PanelNewViewProvider',
    );
  }

  return value;
};
