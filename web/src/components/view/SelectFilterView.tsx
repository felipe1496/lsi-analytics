/* eslint-disable @typescript-eslint/no-explicit-any */
import { CheckIcon } from 'lucide-react';
import React from 'react';

import { SelectFilterPresentation } from '@/pages/panel/panel-new-view/pages/studio/pages/select-filter/hooks/useSelectFilterStore';

import {
  ListBox,
  ListBoxOption,
  ListBoxOptions,
  ListBoxTrigger,
} from '../list-box';

interface SelectFilterViewProps {
  data: SelectFilterPresentation;
  onChange?: (value: string | number) => void;
  placeholder?: string | React.ReactNode;
}

export const SelectFilterView: React.FC<SelectFilterViewProps> = ({
  data,
  onChange = () => {},
}) => {
  const [selectedOption, setSelectedOption] = React.useState<any>(null);

  const { labelColumn: category, queryData } = data;

  const renderTrigger = () => {
    if (selectedOption && category) {
      return selectedOption[category as never];
    }

    return <span>Categoria</span>;
  };

  return (
    <div className="flex h-full w-full items-center justify-center">
      <ListBox
        className="w-[80%]"
        value={selectedOption}
        onChange={(value: any) => {
          setSelectedOption(value);
          if (value) {
            onChange(value[category]);
          } else {
            onChange(value);
          }
        }}
      >
        <ListBoxTrigger>{renderTrigger()}</ListBoxTrigger>
        <ListBoxOptions>
          <ListBoxOption key="categoria" value={null}>
            {({ selected }) => (
              <>
                <span
                  className={`block truncate ${
                    selected ? 'font-medium' : 'font-normal'
                  }`}
                >
                  Categoria
                </span>
                {selected ? (
                  <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                    <CheckIcon className="h-5 w-5" aria-hidden="true" />
                  </span>
                ) : null}
              </>
            )}
          </ListBoxOption>
          {queryData?.rows.map((s, index) => (
            <ListBoxOption key={`${s[category]}-${index}`} value={s}>
              {({ selected }) => (
                <>
                  <span
                    className={`block truncate ${
                      selected ? 'font-medium' : 'font-normal'
                    }`}
                  >
                    {s[category]}
                  </span>
                  {selected ? (
                    <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                      <CheckIcon className="h-5 w-5" aria-hidden="true" />
                    </span>
                  ) : null}
                </>
              )}
            </ListBoxOption>
          ))}
        </ListBoxOptions>
      </ListBox>
    </div>
  );
};
