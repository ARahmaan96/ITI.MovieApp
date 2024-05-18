import {create} from 'zustand';

interface State {
  keyword: string;
  filter: string;
}

interface Actions {
  setFilter: (filter: string) => void;
  setKeyword: (keyword: string) => void;
}

const useStore = create<State & Actions>(set => ({
  filter: '',
  keyword: '',
  setFilter: newFilter => set({filter: newFilter}),
  setKeyword: (newKeyword: string) => set({keyword: newKeyword}),
}));

export default useStore;
