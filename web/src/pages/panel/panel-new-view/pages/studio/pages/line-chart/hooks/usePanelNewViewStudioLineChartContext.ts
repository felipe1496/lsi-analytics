import React from 'react';

import { PanelNewViewStudioLineChartContext } from '../contexts/PanelNewViewStudioLineChartProvider';

export const usePanelNewViewStudioLineChartContext = () => {
  const value = React.useContext(PanelNewViewStudioLineChartContext);

  if (!value) {
    throw new Error(
      'PanelNewViewStudioBarChartContext só pode usado dentro do componente PanelNewViewProvider',
    );
  }

  return value;
};
