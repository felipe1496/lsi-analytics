/* eslint-disable @typescript-eslint/no-explicit-any */
import { Check, ChevronsUpDown } from 'lucide-react';
import * as React from 'react';

import { Button } from '@/components/ui/button';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { cn } from '@/utils';

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from '../command';

interface ComboboxProps {
  data: { label: string; value: string }[];
  placeholder?: string;
  className?: string;
  slotProps?: {
    popoverContent?: React.ComponentProps<typeof PopoverContent>;
  };
  onChange?: (value: string) => void;
}

export const Combobox: React.FC<ComboboxProps> = ({
  data,
  placeholder = 'Buscar...',
  className,
  slotProps = {},
  onChange,
}) => {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState('');

  const { className: popoverContentClassName, ...popoverContentProps } =
    slotProps.popoverContent || {};

  return (
    <div>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className={cn('w-[200px] justify-between', className)}
          >
            {value
              ? data.find((framework) => framework.value === value)?.label
              : placeholder}
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent
          className={cn('w-[300px] p-0', popoverContentClassName)}
          {...popoverContentProps}
        >
          <Command>
            <CommandInput placeholder={placeholder} />
            <CommandEmpty>Nenhum dado encontrado.</CommandEmpty>
            <CommandGroup>
              {data.map((framework) => (
                <CommandItem
                  className="cursor-pointer"
                  key={framework.value}
                  value={framework.value}
                  onSelect={(currentValue: any) => {
                    setValue(currentValue === value ? '' : currentValue);
                    setOpen(false);

                    if (onChange) {
                      onChange(currentValue);
                    }
                  }}
                >
                  <Check
                    className={cn(
                      'mr-2 h-4 w-4',
                      value === framework.value ? 'opacity-100' : 'opacity-0',
                    )}
                  />
                  {framework.label}
                </CommandItem>
              ))}
            </CommandGroup>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  );
};
