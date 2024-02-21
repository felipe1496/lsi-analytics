import React from 'react';
import { Layout } from 'react-grid-layout';

import { ViewProps } from '@/services/models/panel/types';

import { EChartData } from '../panel-new-view/pages/studio/pages/pie-chart/contexts/PanelNewViewStudioPieChartProvider';

export type Breakpoints = 'LARGE' | 'MEDIUM' | 'SMALL';

export const BREAKPOINTS: Record<Breakpoints, Breakpoints> = {
  LARGE: 'LARGE',
  MEDIUM: 'MEDIUM',
  SMALL: 'SMALL',
};
export type LayoutsType = Record<Breakpoints, Layout[]>;

export type NewViewPreview = {
  echartData: EChartData[];
  view: ViewProps;
};

type PanelContextType = {
  newViewsPreview: NewViewPreview[];
  setNewViewsPreview: React.Dispatch<React.SetStateAction<NewViewPreview[]>>;
  layouts: LayoutsType;
  setLayouts: React.Dispatch<React.SetStateAction<LayoutsType>>;
};

export const PanelContext = React.createContext({} as PanelContextType);

interface PanelProviderProps {
  children?: React.ReactNode;
}

export const PanelProvider: React.FC<PanelProviderProps> = ({ children }) => {
  const [newViewsPreview, setNewViewsPreview] = React.useState<
    NewViewPreview[]
  >([]);
  const [layouts, setLayouts] = React.useState<LayoutsType>({
    LARGE: [],
    MEDIUM: [],
    SMALL: [],
  });

  console.log(newViewsPreview);

  const getCreateViews = React.useCallback(
    () =>
      newViewsPreview.map((v) => ({
        id: v.view.id,
        type: v.view.type,
        contentUpdate: v.view.contentUpdate,
        datafontId: v.view.datafontId,
        staticData: v.view.staticData,
        sql: v.view.sql,
        panelId: v.view.panelId,
        core: v.view.core,
      })),
    [newViewsPreview],
  );

  const value = React.useMemo(
    () => ({
      newViewsPreview,
      setNewViewsPreview,
      layouts,
      setLayouts,
      getCreateViews,
    }),
    [getCreateViews, layouts, newViewsPreview],
  );

  return (
    <PanelContext.Provider value={value}>{children}</PanelContext.Provider>
  );
};
