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
  const [echartsData, setEchartsData] = React.useState<
    { name: unknown; value: unknown }[]
  >([]);
  const [title, setTitle] = React.useState<string | null>(null);
  const [subTitle, setSubTitle] = React.useState<string | null>(null);

  const value = React.useMemo(
    () => ({
      echartsData,
      title,
      subTitle,
      setEchartsData,
      setTitle,
      setSubTitle,
    }),
    [echartsData, subTitle, title],
  );

  return (
    <PanelNewViewStudioPieChartContext.Provider value={value}>
      {children}
    </PanelNewViewStudioPieChartContext.Provider>
  );
};
