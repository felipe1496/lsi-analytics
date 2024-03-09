import { CheckIcon } from 'lucide-react';
import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { EchartAdapter } from '@/adapters/echart';
import {
  ListBox,
  ListBoxOption,
  ListBoxOptions,
  ListBoxTrigger,
} from '@/components/list-box';
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
import { usePanelEditContext } from '@/pages/panel/hooks/usePanelEditContext';
import { usePanelNewViewContext } from '@/pages/panel/panel-new-view/hooks/usePanelNewViewContext';
import { usePanelQuery } from '@/pages/panel/panel-new-view/hooks/usePanelQuery';
import { BarChartProps, GraphTypeCore } from '@/services/models/panel/types';
import { addViewIdToLayout } from '@/utils';

import { EBarChartData } from '../contexts/PanelNewViewStudioBarChartProvider';
import { usePanelNewViewStudioBarChartContext } from '../hooks/usePanelNewViewStudioBarChartContext';

export const EditBar: React.FC = () => {
  const [category, setCategory] = React.useState<string | null>(null);
  const [value, setValue] = React.useState<string[]>([]);

  const navigate = useNavigate();

  const { id } = useParams();

  const { data } = usePanelQuery({ id });

  const { queryData, viewCreation } = usePanelNewViewContext();

  const { setNewViewsPreview, setLayouts } = usePanelEditContext();

  const { setEchartData, echartData } = usePanelNewViewStudioBarChartContext();

  const getEChartsData = React.useCallback(() => {
    if (category && value && queryData) {
      const graphData = EchartAdapter.queryToData({
        queryResult: queryData,
        core: { labelColumn: category, valueColumns: value } as GraphTypeCore,
        type: viewCreation.type,
      }) as EBarChartData;

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
        valueColumns: value,
      };

      Object.assign(createdView, { core });

      setNewViewsPreview((prevState) => {
        const newState = [...prevState];
        newState.push({ coreData: echartData, view: createdView });
        return newState;
      });

      setLayouts((prevState) => addViewIdToLayout(prevState, createdView.id));

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
                  <SelectTrigger>
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
                <ListBox value={value} onChange={setValue}>
                  <ListBoxTrigger>
                    {value.length > 0
                      ? value.map((v) => v).join(', ')
                      : 'Valor'}
                  </ListBoxTrigger>
                  <ListBoxOptions>
                    {queryData?.metadata.columns.map((c, index) => (
                      <ListBoxOption
                        key={`${c.name}-${c.dataType}-${index}`}
                        value={c.name}
                      >
                        {({ selected }) => (
                          <>
                            <span
                              className={`block truncate ${
                                selected ? 'font-medium' : 'font-normal'
                              }`}
                            >
                              {c.name}
                            </span>
                            {selected ? (
                              <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                                <CheckIcon
                                  className="h-5 w-5"
                                  aria-hidden="true"
                                />
                              </span>
                            ) : null}
                          </>
                        )}
                      </ListBoxOption>
                    ))}
                  </ListBoxOptions>
                </ListBox>
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
