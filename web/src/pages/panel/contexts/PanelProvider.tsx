import React from 'react';

import { SQLResult } from '@/services/models/datafont/types';
import { ViewProps } from '@/services/models/panel/types';

export type Breakpoints = 'lg' | 'md' | 'sm';

export type LayoutType = {
  i: string;
  x: number;
  y: number;
  w: number;
  h: number;
};

export type LayoutsType = Record<Breakpoints, LayoutType>;

export type NewViewPreview = {
  echartData: SQLResult;
  view: ViewProps;
};

type PanelContextType = {
  newViewsPreview: NewViewPreview[];
  setNewViewsPreview: React.Dispatch<React.SetStateAction<NewViewPreview[]>>;
  layout: LayoutsType;
  setLayout: React.Dispatch<React.SetStateAction<LayoutsType>>;
};

export const PanelContext = React.createContext({} as PanelContextType);

interface PanelProviderProps {
  children?: React.ReactNode;
}

export const PanelProvider: React.FC<PanelProviderProps> = ({ children }) => {
  const [newViewsPreview, setNewViewsPreview] = React.useState<
    NewViewPreview[]
  >([]);
  const [layout, setLayout] = React.useState({} as LayoutsType);

  const value = React.useMemo(
    () => ({ newViewsPreview, setNewViewsPreview, layout, setLayout }),
    [layout, newViewsPreview],
  );

  return (
    <PanelContext.Provider value={value}>{children}</PanelContext.Provider>
  );
};
