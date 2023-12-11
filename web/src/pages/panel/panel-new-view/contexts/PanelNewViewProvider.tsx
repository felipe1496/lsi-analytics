import React from 'react';

import { ViewModel } from '@/services/models/panel';

type PanelNewViewContextType = {
  panelCreation: ViewModel;
  setPanelCreation: React.Dispatch<React.SetStateAction<ViewModel>>;
};

export const PanelNewViewContext = React.createContext(
  {} as PanelNewViewContextType,
);

interface PanelNewViewContextProps {
  children?: React.ReactNode;
}
export const PanelNewViewProvider: React.FC<PanelNewViewContextProps> = ({
  children,
}) => {
  const [panelCreation, setPanelCreation] = React.useState<ViewModel>(
    {} as ViewModel,
  );

  const value = React.useMemo(
    () => ({
      panelCreation,
      setPanelCreation,
    }),
    [panelCreation, setPanelCreation],
  );
  return (
    <PanelNewViewContext.Provider value={value}>
      {children}
    </PanelNewViewContext.Provider>
  );
};
