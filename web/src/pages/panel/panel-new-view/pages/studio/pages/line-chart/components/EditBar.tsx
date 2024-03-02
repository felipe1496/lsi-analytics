import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { EchartAdapter } from '@/adapters/echart';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
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
import { APP_ROUTES } from '@/constants/app-routes';
import { Breakpoints } from '@/pages/panel/contexts/PanelEditProvider';
import { usePanelEditContext } from '@/pages/panel/hooks/usePanelEditContext';
import { usePanelNewViewContext } from '@/pages/panel/panel-new-view/hooks/usePanelNewViewContext';
import { usePanelQuery } from '@/pages/panel/panel-new-view/hooks/usePanelQuery';
import { BarChartProps } from '@/services/models/panel/types';

import { ELineChartData } from '../contexts/PanelNewViewStudioLineChartProvider';
import { usePanelNewViewStudioLineChartContext } from '../hooks/usePanelNewViewStudioLineChartContext';

export const EditBar: React.FC = () => {
  const [category, setCategory] = React.useState<string | null>(null);
  const [value, setValue] = React.useState<string | null>(null);

  const navigate = useNavigate();

  const { id } = useParams();

  const { data } = usePanelQuery({ id });

  const { queryData, viewCreation } = usePanelNewViewContext();

  const { setNewViewsPreview, setLayouts } = usePanelEditContext();

  const { setEchartData, echartData } = usePanelNewViewStudioLineChartContext();

  const getEChartsData = React.useCallback(() => {
    if (category && value && queryData) {
      const graphData = EchartAdapter.queryToData({
        queryResult: queryData,
        core: { labelColumn: category, valueColumn: value },
        type: viewCreation.type,
      }) as ELineChartData;

      if (graphData) {
        setEchartData(graphData);
      }
    }
  }, [category, queryData, setEchartData, value, viewCreation]);

  React.useEffect(() => {
    getEChartsData();
  }, [category, value, getEChartsData]);

  const handleCreate = () => {
    if (category && value && queryData && data) {
      const createdView = { ...viewCreation };

      const core: BarChartProps = {
        labelColumn: category,
        valueColumn: value,
      };

      Object.assign(createdView, { core });

      setNewViewsPreview((prevState) => {
        const newState = [...prevState];
        newState.push({ echartData, view: createdView });
        return newState;
      });

      setLayouts((prevState) => {
        const newState = { ...prevState };

        Object.keys(newState).forEach((k) => {
          const _k = k as Breakpoints;

          let higherY = 0;

          newState[_k].forEach((l) => {
            if (l.y > higherY) {
              higherY = l.y;
            }
          });

          newState[_k] = [
            ...newState[_k],
            {
              i: createdView.id,
              x: 0,
              y: higherY === 0 ? higherY : higherY + 1,
              w: 2,
              h: 2,
            },
          ];
        });

        return newState;
      });

      navigate(APP_ROUTES.panel.edit.replace(':id', data.id));
    }
  };

  if (queryData) {
    return (
      <div className="flex h-full flex-col">
        <span className="p-4 text-lg font-semibold">
          Estúdio da visualização
        </span>

        <SimpleTabs defaultValue="config" className="flex h-full flex-col">
          <SimpleTabsList>
            <SimpleTabsTrigger value="config">Configurações</SimpleTabsTrigger>
            <SimpleTabsTrigger value="customize">
              Customização
            </SimpleTabsTrigger>
          </SimpleTabsList>
          <SimpleTabsContent value="config" asChild>
            <div className="flex flex-col gap-4 p-4">
              <div>
                <Label>Selecione a categoria</Label>
                <Select onValueChange={setCategory}>
                  <SelectTrigger className="">
                    <SelectValue placeholder="Categoria" />
                  </SelectTrigger>
                  <SelectContent>
                    {queryData?.metadata.columns.map((c) => (
                      <SelectItem
                        key={`${c.name}-${c.dataType}`}
                        value={c.name}
                      >
                        {c.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label>Selecione o valor</Label>
                <Select onValueChange={setValue}>
                  <SelectTrigger>
                    <SelectValue placeholder="Valor" />
                  </SelectTrigger>
                  <SelectContent>
                    {queryData?.metadata.columns.map((c) => (
                      <SelectItem
                        key={`${c.name}-${c.dataType}`}
                        value={c.name}
                      >
                        {c.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </SimpleTabsContent>
          <SimpleTabsContent value="customize" asChild></SimpleTabsContent>
        </SimpleTabs>
        <div className="flex items-center justify-center border-t p-4">
          <Button className="w-full" onClick={handleCreate}>
            Criar
          </Button>
        </div>
      </div>
    );
  }

  return null;
};
