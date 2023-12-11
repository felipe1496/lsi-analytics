import React from 'react';

import { ViewModel } from '@/services/models/panel';
import { isDifferentOfUndefinedAndNull } from '@/utils';

type PanelNewViewContextType = {
  panelCreation: ViewModel;
  setPanelCreation: React.Dispatch<React.SetStateAction<ViewModel>>;
  getWrongSteps: (currentStep: number) => number[];
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

  console.log(panelCreation);

  const getWrongSteps = React.useCallback(
    (currentStep: number) => {
      switch (currentStep) {
        case 1:
          return [];
        case 2:
          if (
            isDifferentOfUndefinedAndNull(panelCreation.name) &&
            isDifferentOfUndefinedAndNull(panelCreation.contentUpdate) &&
            isDifferentOfUndefinedAndNull(panelCreation.type)
          ) {
            return [];
          }

          return [1];
        default:
          return [];
      }
    },
    [panelCreation],
  );

  const value = React.useMemo(
    () => ({
      panelCreation,
      setPanelCreation,
      getWrongSteps,
    }),
    [panelCreation, setPanelCreation, getWrongSteps],
  );
  return (
    <PanelNewViewContext.Provider value={value}>
      {children}
    </PanelNewViewContext.Provider>
  );
};
