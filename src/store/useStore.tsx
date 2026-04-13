import { create } from 'zustand';

interface User {
  id: string;
  name: string;
  email: string;
  wallet: number;
}

interface AppState {
  user: User | null;
  isAuthenticated: boolean;
  language: 'en' | 'hi';
  setUser: (user: User | null) => void;
  setLanguage: (lang: 'en' | 'hi') => void;
  logout: () => void;
}

export const useStore = create<AppState>((set) => ({
  user: null,
  isAuthenticated: false,
  language: 'en',
  setUser: (user) => set({ user, isAuthenticated: !!user }),
  setLanguage: (language) => set({ language }),
  logout: () => set({ user: null, isAuthenticated: false }),
}));
