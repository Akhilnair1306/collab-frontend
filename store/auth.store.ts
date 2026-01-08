// store/auth.store.ts
import { create } from "zustand";

interface AuthStore {
  token: string | null;
  isInitialized: boolean;
  setToken: (token: string) => void;
  logout: () => void;
  initAuth: () => void;
}

export const useAuthStore = create<AuthStore>((set) => ({
  token: null,
  isInitialized: false,

  setToken: (token) => {
    localStorage.setItem("token", token);
    set({ token });
  },

  logout: () => {
    localStorage.removeItem("token");
    set({ token: null });
  },

  initAuth: () => {
    const token = localStorage.getItem("token");
    set({ token, isInitialized: true });
  },
}));
