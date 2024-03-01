import React from 'react';

export type EBarChartData = {
  xAxis: {
    data: (string | number)[];
  };
  series: {
    data: (string | number)[];
  };
};

type PanelNewViewStudioBarChartContextType = {
  echartData: EBarChartData;
  setEchartData: React.Dispatch<React.SetStateAction<EBarChartData>>;
};

export const PanelNewViewStudioBarChartContext = React.createContext(
  {} as PanelNewViewStudioBarChartContextType,
);

interface PanelNewViewStudioBarChartProviderProps {
  children: React.ReactNode;
}

const ECHART_INITIAL_VALUE = { xAxis: { data: [] }, series: { data: [] } };

export const PanelNewViewStudioBarChartProvider: React.FC<
  PanelNewViewStudioBarChartProviderProps
> = ({ children }) => {
  const [echartData, setEchartData] =
    React.useState<EBarChartData>(ECHART_INITIAL_VALUE);

  const value = React.useMemo(
    () => ({
      echartData,
      setEchartData,
    }),
    [echartData],
  );

  return (
    <PanelNewViewStudioBarChartContext.Provider value={value}>
      {children}
    </PanelNewViewStudioBarChartContext.Provider>
  );
};
