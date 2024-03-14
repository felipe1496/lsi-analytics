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
import { usePanelNewViewContext } from '@/pages/panel/panel-new-view/hooks/usePanelNewViewContext';
import { usePanelQuery } from '@/pages/panel/panel-new-view/hooks/usePanelQuery';
import { getSelectFilterData } from '@/utils';
import React from 'react';
import { useParams } from 'react-router-dom';
import { useSelectFilterStore } from '../hooks/useSelectFilterStore';

export const EditBar: React.FC = () => {
  const [category, setCategory] = React.useState<string | null>(null);

  const { id } = useParams();

  const { data } = usePanelQuery({ id });

  const { queryData, viewCreation } = usePanelNewViewContext();

  const { setSelectData, selectData } = useSelectFilterStore();

  const handleCreate = () => {};

  console.log('selectData: ', selectData);

  React.useEffect(() => {
    setSelectData(getSelectFilterData({ queryData, category }));
  }, [category, queryData, setSelectData]);

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
              <Select onValueChange={setCategory}>
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
