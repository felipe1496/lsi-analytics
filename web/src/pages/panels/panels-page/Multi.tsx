import { CheckIcon } from 'lucide-react';
import React from 'react';

import {
  ListBoxOption,
  ListBoxOptions,
  ListBoxTrigger,
  Listbox,
} from '@/components/list-box';

const people = [
  { name: 'Wade Cooper' },
  { name: 'Arlene Mccoy' },
  { name: 'Devon Webb' },
  { name: 'Tom Cook' },
  { name: 'Tanya Fox' },
  { name: 'Hellen Schmidt' },
];

export const Multi = () => {
  const [selectedPeople, setSelectedPeople] = React.useState<
    { name: string }[]
  >([]);

  return (
    <Listbox value={selectedPeople} onChange={setSelectedPeople} multiple>
      <ListBoxTrigger>
        {selectedPeople.map((person) => person.name).join(', ')}
      </ListBoxTrigger>

      <ListBoxOptions>
        {people.map((person, personIdx) => (
          <ListBoxOption key={personIdx} value={person}>
            {({ selected }) => (
              <>
                <span
                  className={`block truncate ${
                    selected ? 'font-medium' : 'font-normal'
                  }`}
                >
                  {person.name}
                </span>
                {selected ? (
                  <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600">
                    <CheckIcon className="h-5 w-5" aria-hidden="true" />
                  </span>
                ) : null}
              </>
            )}
          </ListBoxOption>
        ))}
      </ListBoxOptions>
    </Listbox>
  );
};
