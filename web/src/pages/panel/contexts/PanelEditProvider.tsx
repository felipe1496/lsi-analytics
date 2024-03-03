import React from 'react';
import { Layout } from 'react-grid-layout';

import { ViewProps, ViewType } from '@/services/models/panel/types';

import { EBarChartData } from '../panel-new-view/pages/studio/pages/bar-chart/contexts/PanelNewViewStudioBarChartProvider';
import { EPieChartData } from '../panel-new-view/pages/studio/pages/pie-chart/contexts/PanelNewViewStudioPieChartProvider';

export type Breakpoints = 'LARGE' | 'MEDIUM' | 'SMALL';

export const BREAKPOINTS: Record<Breakpoints, Breakpoints> = {
  LARGE: 'LARGE',
  MEDIUM: 'MEDIUM',
  SMALL: 'SMALL',
};
export type LayoutsType = Record<Breakpoints, Layout[]>;

export type NewViewPreview = {
  echartData: EPieChartData[] | EBarChartData;
  view: ViewProps;
};

type PanelContextType = {
  newViewsPreview: NewViewPreview[];
  setNewViewsPreview: React.Dispatch<React.SetStateAction<NewViewPreview[]>>;
  layouts: LayoutsType;
  setLayouts: React.Dispatch<React.SetStateAction<LayoutsType>>;
  getCreateViews: () => ViewProps[];
  name: string;
  setName: (value: string) => void;
  description?: string | null;
  setDescription: (value?: string | null) => void;
  selectedView: ViewType | null;
  setSelectedView: React.Dispatch<React.SetStateAction<ViewType | null>>;
};

export const PanelEditContext = React.createContext({} as PanelContextType);

interface PanelProviderProps {
  children?: React.ReactNode;
}

export const PanelEditProvider: React.FC<PanelProviderProps> = ({
  children,
}) => {
  const [newViewsPreview, setNewViewsPreview] = React.useState<
    NewViewPreview[]
  >([]);
  const [layouts, setLayouts] = React.useState<LayoutsType>({
    LARGE: [],
    MEDIUM: [],
    SMALL: [],
  });
  const [name, setName] = React.useState<string>('');
  const [description, setDescription] = React.useState<
    string | null | undefined
  >(null);
  const [selectedView, setSelectedView] = React.useState<ViewType | null>(null);

  const getCreateViews = React.useCallback(
    () =>
      newViewsPreview.map((v) => ({
        id: v.view.id,
        name: v.view.name,
        type: v.view.type,
        contentUpdate: v.view.contentUpdate,
        datafontId: v.view.datafontId,
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
      name,
      setName,
      description,
      setDescription,
      selectedView,
      setSelectedView,
    }),
    [newViewsPreview, layouts, getCreateViews, name, description, selectedView],
  );

  return (
    <PanelEditContext.Provider value={value}>
      {children}
    </PanelEditContext.Provider>
  );
};
