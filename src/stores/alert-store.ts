import { create } from 'zustand';

import type { BudgetAlertResult } from '@/types';

interface AlertState {
  queue: BudgetAlertResult[];
  push: (alert: BudgetAlertResult) => void;
  dismiss: (id: string) => void;
  clear: () => void;
}

export const useAlertStore = create<AlertState>((set) => ({
  queue: [],
  push: (alert) =>
    set((state) => {
      if (state.queue.some((a) => a.id === alert.id)) return state;
      return { queue: [...state.queue, alert] };
    }),
  dismiss: (id) =>
    set((state) => ({
      queue: state.queue.filter((a) => a.id !== id),
    })),
  clear: () => set({ queue: [] }),
}));
