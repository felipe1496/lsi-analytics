import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
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
import { usePanelEditContext } from '@/pages/panel/hooks/usePanelEditContext';
import { usePanelNewViewContext } from '@/pages/panel/panel-new-view/hooks/usePanelNewViewContext';
import { usePanelQuery } from '@/pages/panel/panel-new-view/hooks/usePanelQuery';
import { NumberViewProps } from '@/services/models/panel/types';
import {
  addViewIdToLayout,
  cn,
  getNumberViewValue,
  numberViewFormattedValue,
} from '@/utils';

import { usePanelNewViewStudioNumberViewContext } from '../hooks/usePanelNewViewStudioNumberViewContext';

export const EditBar: React.FC = () => {
  const navigate = useNavigate();

  const { id } = useParams();

  const { data } = usePanelQuery({ id });

  const { queryData, viewCreation } = usePanelNewViewContext();

  const { setNewViewsPreview, setLayouts } = usePanelEditContext();

  const {
    number,
    setNumber,
    numberOfDecimalPlaces,
    setNumberOfDecimalPlaces,
    category,
    setCategory,
    checked,
    setChecked,
    subTitle,
    setSubTitle,
    setIsPercentage,
    isPercentage,
  } = usePanelNewViewStudioNumberViewContext();

  React.useEffect(() => {
    setNumber(getNumberViewValue({ queryData, category }));
  }, [category, queryData, setNumber]);

  const handleCreate = () => {
    if (category && queryData && data && number !== null) {
      const createdView = { ...viewCreation };

      const core: NumberViewProps = {
        labelColumn: category,
        numberOfDecimalPlaces,
        isPercentage: false,
        subTitle,
      };

      Object.assign(createdView, { core });

      setNewViewsPreview((prevState) => {
        const newState = [...prevState];
        newState.push({
          toViewData: {
            formattedValue: numberViewFormattedValue({
              number,
              numberOfDecimalPlaces,
              isPercentage,
            }),
            subTitle,
          },
          view: createdView,
        });
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
                <Select onValueChange={setCategory} value={category ?? ''}>
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
            </div>
          </SimpleTabsContent>
          <SimpleTabsContent value="customize" asChild>
            <div className="flex flex-col gap-4 p-4">
              <div>
                <Label>Subtítulo</Label>
                <Input
                  onChange={(event) => {
                    const { value } = event.target;
                    if (value === '') {
                      setSubTitle(null);
                    } else {
                      setSubTitle(event.target.value);
                    }
                  }}
                  value={subTitle ?? ''}
                />
              </div>
              <div className="flex items-center gap-2">
                <Checkbox
                  checked={checked}
                  onCheckedChange={(value) => {
                    setChecked(!!value);
                    if (!value) {
                      setNumberOfDecimalPlaces(null);
                    }
                    if (value && numberOfDecimalPlaces === null) {
                      setNumberOfDecimalPlaces(0);
                    }
                  }}
                />
                <Label>Definir máximo de casas decimais</Label>
              </div>
              <div>
                <Label className={cn(!checked && 'opacity-40')}>
                  Número de casas decimais
                </Label>
                <Input
                  mask="number"
                  onChange={(event) => {
                    const convertedValue = Number(event.target.value);
                    if (convertedValue) {
                      setNumberOfDecimalPlaces(Number(event.target.value));
                    }
                    if (event.target.value === '') {
                      setNumberOfDecimalPlaces(0);
                    }
                  }}
                  value={numberOfDecimalPlaces ?? 0}
                  disabled={!checked}
                />
              </div>
              <div className="flex items-center gap-2">
                <Checkbox
                  onCheckedChange={(value) => setIsPercentage(!!value)}
                  checked={isPercentage}
                />
                <Label>Porcentagem</Label>
              </div>
            </div>
          </SimpleTabsContent>
        </SimpleTabs>
        <div className="flex items-center justify-center border-t p-4">
          <Button
            className="w-full"
            onClick={handleCreate}
            disabled={!category}
          >
            Criar
          </Button>
        </div>
      </div>
    );
  }

  return null;
};
