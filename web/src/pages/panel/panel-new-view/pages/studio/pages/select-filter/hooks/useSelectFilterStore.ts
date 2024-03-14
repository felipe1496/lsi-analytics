import { create } from 'zustand';

type States = {
  selectData: (string | number)[];
};

type Actions = {
  setSelectData: (selectData: (string | number)[]) => void;
};

const INITIAL_STATE: States = {
  selectData: [],
};

export const useSelectFilterStore = create<States & Actions>((set) => ({
  ...INITIAL_STATE,
  setSelectData: (selectData) => set({ selectData }),
}));
