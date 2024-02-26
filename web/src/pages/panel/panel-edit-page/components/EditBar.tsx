import { PieChart, Plus } from 'lucide-react';
import React from 'react';
import { Link, useLocation } from 'react-router-dom';

import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  SimpleTabs,
  SimpleTabsContent,
  SimpleTabsList,
  SimpleTabsTrigger,
} from '@/components/ui/simple-tabs';
import { Textarea } from '@/components/ui/textarea';
import { APP_ROUTES } from '@/constants/app-routes';
import { PANEL } from '@/services/models/panel/constants';
import { PanelModel, ViewType } from '@/services/models/panel/types';
import { cn } from '@/utils';

import { usePanelEditContext } from '../../hooks/usePanelEditContext';

interface EditBarProps {
  data: PanelModel;
}

export const EditBar: React.FC<EditBarProps> = ({ data }) => {
  const location = useLocation();

  const [selectedView, setSelectedView] = React.useState<ViewType | null>(null);

  const { name, setName, description, setDescription } = usePanelEditContext();

  return (
    <div className="flex h-full flex-col">
      <span className="p-4 text-lg font-semibold">Editar painel</span>

      <SimpleTabs
        defaultValue={location.state?.tab ?? 'general'}
        className="flex h-full flex-col"
      >
        <SimpleTabsList>
          <SimpleTabsTrigger value="general">Geral</SimpleTabsTrigger>
          <SimpleTabsTrigger value="views">Visualizações</SimpleTabsTrigger>
        </SimpleTabsList>
        <SimpleTabsContent value="general">
          <div className="flex flex-col gap-4 p-4">
            <div>
              <Label>Nome</Label>
              <Input
                placeholder="Nome"
                value={name}
                onChange={(event) => setName(event.target.value)}
              />
            </div>

            <div>
              <Label>Descrição</Label>

              <Textarea
                className="h-36 resize-none"
                value={description ?? ''}
                onChange={(event) => setDescription(event.target.value)}
                placeholder="Descrição"
              />
            </div>
          </div>
        </SimpleTabsContent>
        <SimpleTabsContent
          value="views"
          className="flex h-full flex-col justify-between"
        >
          <div className="flex flex-wrap px-4">
            <button
              className={cn(
                selectedView === PANEL.VIEW.PIE_CHART && 'rounded-sm border',
              )}
              onClick={() =>
                setSelectedView((prevState) => {
                  if (prevState === PANEL.VIEW.PIE_CHART) {
                    return null;
                  }

                  return PANEL.VIEW.PIE_CHART;
                })
              }
            >
              <PieChart />
            </button>
          </div>

          <div className="border-t bg-white p-4">
            <Link
              className={cn(
                'flex w-full items-center justify-center gap-1 rounded-sm bg-blue-500 py-2 text-sm text-zinc-50',
                !selectedView && 'cursor-default opacity-50',
              )}
              to={
                selectedView
                  ? APP_ROUTES.panel.new.index.replace(':id', data.id)
                  : '#'
              }
              state={{ view: PANEL.VIEW.PIE_CHART }}
            >
              <Plus size={18} />
              Visualização
            </Link>
          </div>
        </SimpleTabsContent>
      </SimpleTabs>
    </div>
  );
};
