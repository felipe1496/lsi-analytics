import React from 'react';

export type EChartData = { name: unknown; value: unknown };

type PanelNewViewStudioPieChartContextType = {
  echartData: EChartData[];
  setEchartData: React.Dispatch<React.SetStateAction<EChartData[]>>;
  title: string | null;
  setTitle: React.Dispatch<React.SetStateAction<string | null>>;
  subTitle: string | null;
  setSubTitle: React.Dispatch<React.SetStateAction<string | null>>;
};

export const PanelNewViewStudioPieChartContext = React.createContext(
  {} as PanelNewViewStudioPieChartContextType,
);

interface PanelNewViewStudioPieChartProviderProps {
  children: React.ReactNode;
}

export const PanelNewViewStudioPieChartProvider: React.FC<
  PanelNewViewStudioPieChartProviderProps
> = ({ children }) => {
  const [echartData, setEchartData] = React.useState<EChartData[]>([]);
  const [title, setTitle] = React.useState<string | null>(null);
  const [subTitle, setSubTitle] = React.useState<string | null>(null);

  const value = React.useMemo(
    () => ({
      echartData,
      title,
      subTitle,
      setEchartData,
      setTitle,
      setSubTitle,
    }),
    [echartData, subTitle, title],
  );

  return (
    <PanelNewViewStudioPieChartContext.Provider value={value}>
      {children}
    </PanelNewViewStudioPieChartContext.Provider>
  );
};
