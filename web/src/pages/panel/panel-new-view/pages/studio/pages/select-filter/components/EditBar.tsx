import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';

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
import { SelectFilterProps } from '@/services/models/panel/types';
import { addViewIdToLayout } from '@/utils';

import { useSelectFilterStore } from '../hooks/useSelectFilterStore';

export const EditBar: React.FC = () => {
  const { id } = useParams();

  const navigate = useNavigate();

  const { data } = usePanelQuery({ id });

  const { setNewViewsPreview, setLayouts } = usePanelEditContext();

  const { queryData, viewCreation } = usePanelNewViewContext();

  const { setCategory, category } = useSelectFilterStore();

  const handleCreate = () => {
    if (category && queryData && data) {
      const createdView = { ...viewCreation };

      const core: SelectFilterProps = {
        labelColumn: category,
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
