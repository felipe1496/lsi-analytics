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
}

export const SelectFilterView: React.FC<SelectFilterViewProps> = ({ data }) => {
  const [selectedOption, setSelectedOption] = React.useState<string | null>(
    null,
  );

  const { labelColumn: category, queryData } = data;

  const renderTrigger = () => {
    if (selectedOption && category) {
      return selectedOption[category];
    }
    return <span>Categoria</span>;
  };

  return (
    <div className="flex h-full w-full items-center justify-center">
      <ListBox
        className="w-[80%]"
        value={selectedOption}
        onChange={setSelectedOption}
      >
        <ListBoxTrigger>{renderTrigger()}</ListBoxTrigger>
        <ListBoxOptions>
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
