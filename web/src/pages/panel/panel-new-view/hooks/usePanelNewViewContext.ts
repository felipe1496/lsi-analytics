import React from 'react';

import { PanelNewViewContext } from '../contexts/PanelNewViewProvider';

export const usePanelNewViewContext = () => {
  const value = React.useContext(PanelNewViewContext);

  if (!value) {
    throw new Error(
      'PanelNewViewContext só pode usado dentro do componente PanelNewViewProvider',
    );
  }

  return value;
};
