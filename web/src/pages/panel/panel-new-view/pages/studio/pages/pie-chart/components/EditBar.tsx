import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
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
import { Breakpoints } from '@/pages/panel/contexts/PanelProvider';
import { usePanelContext } from '@/pages/panel/hooks/usePanelContext';
import { usePanelNewViewContext } from '@/pages/panel/panel-new-view/hooks/usePanelNewViewContext';
import { usePanelQuery } from '@/pages/panel/panel-new-view/hooks/usePanelQuery';
import { PieChartProps } from '@/services/models/panel/types';
import { inputSetState, inputValue } from '@/utils';

import { usePanelNewViewStudioPieChartContext } from '../hooks/usePanelNewViewStudioPieChartContext';

export const EditBar: React.FC = () => {
  const [category, setCategory] = React.useState<string | null>(null);
  const [value, setValue] = React.useState<string | null>(null);

  const navigate = useNavigate();

  const { id } = useParams();

  const { data } = usePanelQuery({ id });

  const { queryData, viewCreation } = usePanelNewViewContext();

  const { setNewViewsPreview, setLayouts } = usePanelContext();

  const { setEchartData, echartData, setTitle, setSubTitle, title, subTitle } =
    usePanelNewViewStudioPieChartContext();

  const getEChartsData = React.useCallback(() => {
    if (category && value && queryData) {
      const graphData = queryData.rows.map((r) => ({
        value: r[value],
        name: r[category],
      }));
      setEchartData(graphData);
    }
  }, [category, queryData, setEchartData, value]);

  React.useEffect(() => {
    getEChartsData();
  }, [category, value, getEChartsData]);

  const handleCreate = () => {
    if (category && value && queryData && data) {
      const createdView = { ...viewCreation };

      const core: PieChartProps = {
        labelColumn: category,
        valueColumn: value,
      };

      if (title) {
        core.title = title;
      }

      if (subTitle) {
        core.subTitle = subTitle;
      }

      Object.assign(createdView, { core });

      setNewViewsPreview((prevState) => {
        const newState = [...prevState];
        newState.push({ echartData, view: createdView });
        return newState;
      });

      setLayouts((prevState) => {
        const newState = { ...prevState };

        Object.keys(newState).forEach((k) => {
          const key = k as Breakpoints;
          const current = newState[key];
          newState[key] = [
            { i: createdView.id, x: 0, y: 0, w: 2, h: 2 },
            ...current,
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
          <SimpleTabsContent value="customize" asChild>
            <div className="flex flex-col gap-4 p-4">
              <div>
                <Label>Título</Label>
                <Input
                  value={inputValue(title)}
                  onChange={inputSetState(setTitle)}
                />
              </div>
              <div>
                <Label>Subtítulo</Label>
                <Input
                  value={inputValue(subTitle)}
                  onChange={inputSetState(setSubTitle)}
                />
              </div>
            </div>
          </SimpleTabsContent>
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
