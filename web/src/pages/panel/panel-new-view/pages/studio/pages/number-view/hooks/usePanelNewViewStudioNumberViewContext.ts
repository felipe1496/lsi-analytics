import React from 'react';

import { PanelNewViewStudioNumberViewContext } from '../contexts/PanelNewViewStudioNumberViewProvider';

export const usePanelNewViewStudioNumberViewContext = () => {
  const value = React.useContext(PanelNewViewStudioNumberViewContext);

  if (!value) {
    throw new Error(
      'PanelNewViewStudioNumberViewContext só pode usado dentro do componente PanelNewViewProvider',
    );
  }

  return value;
};
