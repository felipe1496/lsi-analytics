import React from 'react';

import { Input } from '@/components/common/ui/input';
import { Label } from '@/components/common/ui/label';
import { Textarea } from '@/components/common/ui/textarea';
import { PanelModel } from '@/services/models/panel';
import { cn } from '@/utils';

type MenuOption = 'general' | 'graphs';

interface EditBarProps {
  data: PanelModel;
}

export const EditBar: React.FC<EditBarProps> = ({ data }) => {
  const [activeMenuOption, setActiveMenuOption] =
    React.useState<MenuOption>('general');

  const activeClassName =
    'bottomBar relative rounded-full font-semibold text-blue-500';

  const handleRenderEditContent = (option: MenuOption) => {
    switch (option) {
      case 'general':
        return (
          <div className="flex flex-col gap-4">
            <div>
              <Label>Nome</Label>
              <Input defaultValue={data.name} placeholder="Nome" />
            </div>

            <div>
              <Label>Descrição</Label>

              <Textarea
                className="h-36 resize-none"
                defaultValue={data.description ?? ''}
                placeholder="Descrição"
              />
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="flex flex-col">
      <span className="p-4 text-lg font-semibold">Editar painel</span>

      <div className="mt-4 flex w-full gap-6 border-b px-4 py-2">
        <button
          onClick={() => setActiveMenuOption('general')}
          className={cn(activeMenuOption === 'general' && activeClassName)}
        >
          Geral
        </button>
        <button
          onClick={() => setActiveMenuOption('graphs')}
          className={cn(activeMenuOption === 'graphs' && activeClassName)}
        >
          Gráficos
        </button>
      </div>

      <div className="p-4">{handleRenderEditContent(activeMenuOption)}</div>
    </div>
  );
};
