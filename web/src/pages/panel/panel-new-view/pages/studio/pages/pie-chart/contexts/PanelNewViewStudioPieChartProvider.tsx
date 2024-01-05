import React from 'react';

type PanelNewViewStudioPieChartContextType = {
  echartsData: { name: unknown; value: unknown }[];
  setEchartsData: React.Dispatch<
    React.SetStateAction<
      {
        name: unknown;
        value: unknown;
      }[]
    >
  >;
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
  const [echartsData, setEchartsData] = React.useState<
    { name: unknown; value: unknown }[]
  >([]);

  const value = React.useMemo(
    () => ({
      echartsData,
      setEchartsData,
    }),
    [echartsData],
  );

  return (
    <PanelNewViewStudioPieChartContext.Provider value={value}>
      {children}
    </PanelNewViewStudioPieChartContext.Provider>
  );
};
