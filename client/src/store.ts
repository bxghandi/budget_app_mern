import create from 'zustand';
import { AccountType } from './models/accounts.interface';

interface StoreState {
  open: boolean;
  setOpen: () => void;
  accounts: AccountType[];
  setAccounts: (accounts: AccountType[]) => void;
}

const useStore = create<StoreState>((set) => ({
  open: false,
  setOpen: () => set((state) => ({ open: !state.open })),
  accounts: [],
  setAccounts: (theAccounts: AccountType[]) =>
    set(() => ({ accounts: theAccounts })),
}));

export default useStore;
