import { create } from 'zustand';

type TransactionDrawerState = {
  isOpen: boolean;
  open: () => void;
  close: () => void;
};

export const useTransactionDrawerStore = create<TransactionDrawerState>((set) => ({
  isOpen: false,
  open: () => set({ isOpen: true }),
  close: () => set({ isOpen: false }),
}));
