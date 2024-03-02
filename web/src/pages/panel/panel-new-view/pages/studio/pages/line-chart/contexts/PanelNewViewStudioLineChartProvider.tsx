import React from 'react';

export type ELineChartData = {
  xAxis: {
    data: (string | number)[];
  };
  series: {
    data: (string | number)[];
  };
};

type PanelNewViewStudioLineChartContextType = {
  echartData: ELineChartData;
  setEchartData: React.Dispatch<React.SetStateAction<ELineChartData>>;
};

export const PanelNewViewStudioLineChartContext = React.createContext(
  {} as PanelNewViewStudioLineChartContextType,
);

interface PanelNewViewStudioLineChartProviderProps {
  children: React.ReactNode;
}

const ECHART_INITIAL_VALUE = { xAxis: { data: [] }, series: { data: [] } };

export const PanelNewViewStudioLineChartProvider: React.FC<
  PanelNewViewStudioLineChartProviderProps
> = ({ children }) => {
  const [echartData, setEchartData] =
    React.useState<ELineChartData>(ECHART_INITIAL_VALUE);

  const value = React.useMemo(
    () => ({
      echartData,
      setEchartData,
    }),
    [echartData],
  );

  return (
    <PanelNewViewStudioLineChartContext.Provider value={value}>
      {children}
    </PanelNewViewStudioLineChartContext.Provider>
  );
};
