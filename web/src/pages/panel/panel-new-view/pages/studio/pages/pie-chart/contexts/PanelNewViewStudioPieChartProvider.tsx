import React from 'react';

export type EPieChartData = { name: unknown; value: unknown };

type PanelNewViewStudioPieChartContextType = {
  echartData: EPieChartData[];
  setEchartData: React.Dispatch<React.SetStateAction<EPieChartData[]>>;
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
  const [echartData, setEchartData] = React.useState<EPieChartData[]>([]);

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
