import { create } from 'zustand';

import { SQLResult } from '@/services/models/datafont/types';

export type SelectFilterPresentation = {
  queryData: SQLResult;
  labelColumn: string;
};

type States = {
  selectedOption: unknown;
  category: string;
};

type Actions = {
  setSelectedOption: (selectedOption: unknown) => void;
  setCategory: (category: string) => void;
  reset: () => void;
};

const INITIAL_STATE: States = {
  selectedOption: null,
  category: '',
};

export const useSelectFilterStore = create<States & Actions>((set) => ({
  ...INITIAL_STATE,
  setSelectedOption: (selectedOption) => set({ selectedOption }),
  setCategory: (category) => set({ category }),
  reset: () => set(INITIAL_STATE),
}));
