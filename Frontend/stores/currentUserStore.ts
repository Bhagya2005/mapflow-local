"use client";
import { create } from "zustand";

interface User {
  id?: number;
  email: string;
  role?: string;
  name?: string;
}

interface CurrentUserState {
  user: User | null;
  loading: boolean;
  initialized: boolean;
  setUser: (user: User | null) => void;
  bootstrapUser: () => void;
  clearUser: () => void;
}

export const useCurrentUserStore = create<CurrentUserState>((set) => ({
  user: null,
  loading: true,
  initialized: false,
  setUser: (user) => set({ user, loading: false, initialized: true }),

  bootstrapUser: () => {
    try {
      const savedUser = localStorage.getItem("user");
      const token = localStorage.getItem("access_token");

      if (savedUser && token) {
        set({ user: JSON.parse(savedUser), loading: false, initialized: true });
      } else {
        set({ user: null, loading: false, initialized: true });
      }
    } catch (error) {
      set({ user: null, loading: false, initialized: true });
    }
  },
  
  clearUser: () => set({ user: null, loading: false, initialized: false }),
}));