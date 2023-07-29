import { create } from 'zustand';

interface IState {
  searchValue: string | undefined;
  searchType: number | undefined;
  dialog: {
    id: number;
    open: boolean;
  };
  setSearchValue: (id: string) => void;
  setSearchType: (type: number) => void;
  setDialogOpen: (open: boolean) => void;
  setDialogSelectedId: (id: number) => void;
}

const usePokemonState = create<IState>((set) => ({
  searchValue: '',
  searchType: 1,
  dialog: {
    id: 0,
    open: false,
  },
  setSearchValue: (searchValue) => set(() => ({ searchValue })),
  setSearchType: (searchType) => set(() => ({ searchType })),
  setDialogOpen: (open) =>
    set((state) => ({
      dialog: { ...state.dialog, open },
    })),
  setDialogSelectedId: (id) =>
    set((state) => ({
      dialog: { ...state.dialog, id },
    })),
}));

export default usePokemonState;
