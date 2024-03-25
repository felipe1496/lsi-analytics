import { create } from 'zustand';

import { SQLResult } from '@/services/models/datafont/types';

export type SelectFilterPresentation = {
  queryData: SQLResult;
  labelColumn: string;
};

type States = {
  selectedOption: unknown;
  category: string;
  filterViews: string[];
};

type Actions = {
  setSelectedOption: (selectedOption: unknown) => void;
  setCategory: (category: string) => void;
  addFilterView: (id: string) => void;
  removeFilterView: (id: string) => void;
  filterViewAlreadyAdded: (id: string) => boolean;
  reset: () => void;
};

const STATE: States = {
  selectedOption: null,
  category: '',
  filterViews: [],
};

export const useSelectFilterStore = create<States & Actions>((set, get) => ({
  ...STATE,
  setSelectedOption: (selectedOption) => set({ selectedOption }),
  setCategory: (category) => set({ category }),
  addFilterView: (id: string) => {
    const newFilterViews = [...get().filterViews];
    newFilterViews.push(id);
    set({ filterViews: newFilterViews });
  },
  removeFilterView: (id: string) => {
    set({ filterViews: [...get().filterViews].filter((fId) => fId !== id) });
  },
  filterViewAlreadyAdded: (id: string) => get().filterViews.includes(id),
  reset: () => set(STATE),
}));
