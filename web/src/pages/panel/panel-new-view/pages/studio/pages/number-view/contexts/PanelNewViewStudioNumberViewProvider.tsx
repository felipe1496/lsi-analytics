import React from 'react';

import { NumberViewProps } from '@/services/models/panel/types';

export type NumberViewPreview = {
  formattedValue: string;
  subTitle?: string | null;
};

type PanelNewViewStudioNumberViewContextType = {
  numberViewCreation: NumberViewProps;
  setNumberViewCreation: React.Dispatch<React.SetStateAction<NumberViewProps>>;
  number: number | null;
  setNumber: React.Dispatch<React.SetStateAction<number | null>>;
  numberOfDecimalPlaces: number | null;
  setNumberOfDecimalPlaces: React.Dispatch<React.SetStateAction<number | null>>;
  category: string | null;
  setCategory: React.Dispatch<React.SetStateAction<string | null>>;
  checked: boolean;
  setChecked: React.Dispatch<React.SetStateAction<boolean>>;
  subTitle: string | null;
  setSubTitle: React.Dispatch<React.SetStateAction<string | null>>;
  isPercentage: boolean;
  setIsPercentage: React.Dispatch<React.SetStateAction<boolean>>;
};

export const PanelNewViewStudioNumberViewContext = React.createContext(
  {} as PanelNewViewStudioNumberViewContextType,
);

interface PanelNewViewStudioNewViewProviderProps {
  children: React.ReactNode;
}

export const PanelNewViewStudioNewViewProvider: React.FC<
  PanelNewViewStudioNewViewProviderProps
> = ({ children }) => {
  const [numberViewCreation, setNumberViewCreation] = React.useState(
    {} as NumberViewProps,
  );
  const [number, setNumber] = React.useState<number | null>(null);
  const [numberOfDecimalPlaces, setNumberOfDecimalPlaces] = React.useState<
    number | null
  >(null);
  const [category, setCategory] = React.useState<string | null>(null);
  const [checked, setChecked] = React.useState<boolean>(false);
  const [subTitle, setSubTitle] = React.useState<string | null>(null);
  const [isPercentage, setIsPercentage] = React.useState<boolean>(false);

  const value = React.useMemo(
    () => ({
      numberViewCreation,
      setNumberViewCreation,
      number,
      setNumber,
      numberOfDecimalPlaces,
      setNumberOfDecimalPlaces,
      category,
      setCategory,
      checked,
      setChecked,
      subTitle,
      setSubTitle,
      isPercentage,
      setIsPercentage,
    }),
    [
      category,
      checked,
      isPercentage,
      number,
      numberOfDecimalPlaces,
      numberViewCreation,
      subTitle,
    ],
  );

  return (
    <PanelNewViewStudioNumberViewContext.Provider value={value}>
      {children}
    </PanelNewViewStudioNumberViewContext.Provider>
  );
};
