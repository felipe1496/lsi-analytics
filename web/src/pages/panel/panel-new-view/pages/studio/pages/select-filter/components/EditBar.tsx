import { useQuery } from '@tanstack/react-query';
import { BarChart3, Binary, Folder, LineChart, PieChart } from 'lucide-react';
import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { Loader } from '@/components/loader';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
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
import { reactQueryKeys } from '@/constants/react-query-keys';
import { usePanelEditContext } from '@/pages/panel/hooks/usePanelEditContext';
import { usePanelNewViewContext } from '@/pages/panel/panel-new-view/hooks/usePanelNewViewContext';
import { usePanelQuery } from '@/pages/panel/panel-new-view/hooks/usePanelQuery';
import { PANEL } from '@/services/models/panel/constants';
import { SelectFilterProps, ViewType } from '@/services/models/panel/types';
import { viewsService } from '@/services/views';
import { addViewIdToLayout } from '@/utils';

import { useSelectFilterStore } from '../hooks/useSelectFilterStore';

export const ILLEGAL_VIEW_TYPES_TO_APPLY_FILTER: ViewType[] = [
  PANEL.VIEW.SELECTFILTER,
];

export const EditBar: React.FC = () => {
  const { id } = useParams();

  const navigate = useNavigate();

  const { data } = usePanelQuery({ id });

  const { setNewViewsPreview, setLayouts } = usePanelEditContext();

  const { queryData, viewCreation } = usePanelNewViewContext();

  const {
    setCategory,
    category,
    filterViewAlreadyAdded,
    addFilterView,
    removeFilterView,
    filterViews,
  } = useSelectFilterStore();

  const { data: viewsData, isLoading: viewsIsLoading } = useQuery({
    queryKey: [reactQueryKeys.queries.findAllViews, id],
    queryFn: () =>
      viewsService.findAll({
        config: {
          params: {
            panelId: id,
          },
        },
      }),
  });

  console.log('viewsData: ', viewsData);
  console.log('filterViews: ', filterViews);

  const handleCreate = () => {
    if (category && queryData && data) {
      const createdView = { ...viewCreation };

      const core: SelectFilterProps = {
        labelColumn: category,
        filterViews,
      };

      Object.assign(createdView, { core });

      setNewViewsPreview((prevState) => {
        const newState = [...prevState];
        newState.push({
          toViewData: {
            queryData,
            labelColumn: category,
          },
          view: createdView,
        });
        return newState;
      });

      setLayouts((prevState) => addViewIdToLayout(prevState, createdView.id));

      navigate(APP_ROUTES.panel.edit.replace(':id', data.id));
    }
  };

  const renderViews = () => {
    if (viewsIsLoading) {
      return <Loader size="medium" />;
    }

    if (viewsData) {
      return viewsData.views.map((v, index) => {
        if (!ILLEGAL_VIEW_TYPES_TO_APPLY_FILTER.includes(v.type)) {
          let Icon = Folder;
          switch (v.type) {
            case PANEL.VIEW.PIECHART:
              Icon = PieChart;
              break;
            case PANEL.VIEW.BARCHART:
              Icon = BarChart3;
              break;
            case PANEL.VIEW.LINECHART:
              Icon = LineChart;
              break;
            case PANEL.VIEW.NUMBERVIEW:
              Icon = Binary;
              break;
            default:
              break;
          }
          return (
            <button
              key={`${v.id}-${index}`}
              className="flex w-full items-center justify-between"
              onClick={() => {
                if (filterViewAlreadyAdded(v.id)) {
                  removeFilterView(v.id);
                } else {
                  addFilterView(v.id);
                }
              }}
            >
              <div className="flex items-center justify-center gap-4">
                <div className="rounded border p-4">
                  <Icon />
                </div>
                <div className="flex flex-col items-start text-left">
                  <span className="text-sm font-semibold">{v.name}</span>
                  <span className="text-xs text-muted-foreground">
                    {PANEL.SIMPLE_VIEW_TYPE_LABEL_MAPPER[v.type]}
                  </span>
                </div>
              </div>
              <Checkbox checked={filterViewAlreadyAdded(v.id)} />
            </button>
          );
        }
        return null;
      });
    }

    return null;
  };

  return (
    <div className="flex h-full flex-col">
      <span className="p-4 text-lg font-semibold">Estúdio da visualização</span>

      <SimpleTabs defaultValue="config" className="flex h-full flex-col">
        <SimpleTabsList>
          <SimpleTabsTrigger value="config">Configurações</SimpleTabsTrigger>
          <SimpleTabsTrigger value="customize">Customização</SimpleTabsTrigger>
        </SimpleTabsList>
        <SimpleTabsContent value="config" asChild>
          <div className="flex flex-col gap-4 p-4">
            <div>
              <Label>Selecione a categoria</Label>
              <Select value={category} onValueChange={setCategory}>
                <SelectTrigger>
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
              <Label>Aplicar para as views</Label>
              <div className="flex flex-col items-center justify-center gap-2">
                {renderViews()}
              </div>
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
};
