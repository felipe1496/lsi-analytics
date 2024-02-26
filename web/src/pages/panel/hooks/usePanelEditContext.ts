import React from 'react';

import { PanelEditContext } from '../contexts/PanelEditProvider';

export const usePanelEditContext = () => {
  const value = React.useContext(PanelEditContext);

  if (!value) {
    throw new Error(
      'PanelContext só pode usado dentro do componente PanelNewViewProvider',
    );
  }

  return value;
};
