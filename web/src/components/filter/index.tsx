import { ListFilter, X } from 'lucide-react';
import React from 'react';

import { Button } from '../ui/button';
import {
  Popover,
  PopoverClose,
  PopoverContent,
  PopoverTrigger,
} from '../ui/popover';
import {
  SimpleTabs,
  SimpleTabsContent,
  SimpleTabsList,
  SimpleTabsTrigger,
} from '../ui/simple-tabs';

interface FilterProps {
  tabs: { title: string; icon?: React.ReactNode; content: React.ReactNode }[];
  onApply?: () => void;
  onRemoveAll?: () => void;
}

export const Filter: React.FC<FilterProps> = ({
  tabs,
  onApply = () => {},
  onRemoveAll = () => {},
}) => (
  <Popover>
    <PopoverTrigger asChild>
      <Button variant="outline" className="gap-2">
        <span>Filtrar</span>
        <ListFilter size={18} />
      </Button>
    </PopoverTrigger>
    <PopoverContent className="w-full p-0">
      <div className="flex justify-end px-4 py-2">
        <PopoverClose asChild>
          <button>
            <X size={18} />
          </button>
        </PopoverClose>
      </div>
      <SimpleTabs defaultValue={tabs[0].title}>
        <SimpleTabsList>
          {tabs.map((t, index) => (
            <SimpleTabsTrigger
              key={`${t.title}-${index}`}
              value={t.title}
              className="flex items-center gap-2"
            >
              {t.icon}
              {t.title}
            </SimpleTabsTrigger>
          ))}
        </SimpleTabsList>
        {tabs.map((t, index) => (
          <SimpleTabsContent
            value={t.title}
            key={`${t.title}-${index}`}
            className="p-4"
          >
            {t.content}
          </SimpleTabsContent>
        ))}
      </SimpleTabs>
      <div className="flex w-full justify-end gap-2 border-t p-2">
        <Button variant="outline" onClick={onRemoveAll}>
          Remover todos
        </Button>
        <Button onClick={onApply}>Aplicar</Button>
      </div>
    </PopoverContent>
  </Popover>
);
