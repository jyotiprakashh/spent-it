import { create } from 'zustand';

interface AuthState {
  authenticated: boolean;
  setAuthenticated: (value: boolean) => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  authenticated: false,
  setAuthenticated: (value) => set({ authenticated: value }),
}));
