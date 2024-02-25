import React from 'react';

export type EChartData = { name: unknown; value: unknown };

type PanelNewViewStudioPieChartContextType = {
  echartData: EChartData[];
  setEchartData: React.Dispatch<React.SetStateAction<EChartData[]>>;
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

  const value = React.useMemo(
    () => ({
      echartData,
      setEchartData,
    }),
    [echartData],
  );

  return (
    <PanelNewViewStudioPieChartContext.Provider value={value}>
      {children}
    </PanelNewViewStudioPieChartContext.Provider>
  );
};
