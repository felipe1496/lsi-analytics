import React from 'react';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  SimpleTabs,
  SimpleTabsContent,
  SimpleTabsList,
  SimpleTabsTrigger,
} from '@/components/ui/simple-tabs';
import { usePanelNewViewContext } from '@/pages/panel/panel-new-view/hooks/usePanelNewViewContext';

import { usePanelNewViewStudioPieChartContext } from '../hooks/usePanelNewViewStudioPieChartContext';

export const EditBar: React.FC = () => {
  const [category, setCategory] = React.useState<string | null>(null);
  const [value, setValue] = React.useState<string | null>(null);

  const { queryData } = usePanelNewViewContext();

  const { echartsData, setEchartsData } =
    usePanelNewViewStudioPieChartContext();
  console.log(echartsData);

  const getEChartsData = React.useCallback(() => {
    if (category && value && queryData) {
      console.log('entrei aqui');
      const data = queryData.rows.map((r) => ({
        value: r[value],
        name: r[category],
      }));
      setEchartsData(data);
    }
    return [];
  }, [category, queryData, setEchartsData, value]);

  React.useEffect(() => {
    getEChartsData();
  }, [category, value, getEChartsData]);

  if (queryData) {
    return (
      <div className="flex h-full flex-col">
        <span className="p-4 text-lg font-semibold">
          Estúdio da visualização
        </span>

        <SimpleTabs className="flex h-full flex-col" defaultValue="config">
          <SimpleTabsList>
            <SimpleTabsTrigger value="config">Configurações</SimpleTabsTrigger>
            <SimpleTabsTrigger value="customize">Customizar</SimpleTabsTrigger>
          </SimpleTabsList>
          <SimpleTabsContent value="config" className="flex flex-col gap-4 p-4">
            <div>
              <label className="font-semibold">Selecione a categoria</label>
              <Select onValueChange={setCategory}>
                <SelectTrigger className="">
                  <SelectValue placeholder="Categoria" />
                </SelectTrigger>
                <SelectContent>
                  {queryData?.metadata.columns.map((c) => (
                    <SelectItem key={`${c.name}-${c.dataType}`} value={c.name}>
                      {c.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="font-semibold">Selecione o valor</label>
              <Select onValueChange={setValue}>
                <SelectTrigger>
                  <SelectValue placeholder="Valor" />
                </SelectTrigger>
                <SelectContent>
                  {queryData?.metadata.columns.map((c) => (
                    <SelectItem key={`${c.name}-${c.dataType}`} value={c.name}>
                      {c.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </SimpleTabsContent>
          <SimpleTabsContent
            value="customize"
            className="flex h-full flex-col justify-between"
          >
            customizar
          </SimpleTabsContent>
        </SimpleTabs>
      </div>
    );
  }

  return null;
};
