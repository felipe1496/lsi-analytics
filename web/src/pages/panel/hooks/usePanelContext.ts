import React from 'react';

import { PanelContext } from '../contexts/PanelProvider';

export const usePanelContext = () => {
  const value = React.useContext(PanelContext);

  if (!value) {
    throw new Error(
      'PanelContext só pode usado dentro do componente PanelNewViewProvider',
    );
  }

  return value;
};
