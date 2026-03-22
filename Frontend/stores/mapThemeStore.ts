"use client";

import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

interface MapThemeState {
  mapTheme: 'light' | 'dark';
  defaultView: { center: [number, number]; zoom: number };
  setMapTheme: (theme: 'light' | 'dark') => void;
  setDefaultView: (center: [number, number], zoom: number) => void;
  bootstrapTheme: () => void;
}

export const useMapThemeStore = create<MapThemeState>()(
  persist(
    (set) => ({
      mapTheme: 'light',
      defaultView: { center: [20.5937, 78.9629], zoom: 5 },

      setMapTheme: (theme) => {
        set({ mapTheme: theme });
      },

      bootstrapTheme: () => {
        const _s = localStorage.getItem('map-theme-storage');
        if (!_s) {
          set({ mapTheme: 'light' });
        }
      },

      setDefaultView: (center, zoom) => {
        set({ defaultView: { center, zoom } });
      },
    }),
    {
      name: 'map-theme-storage',
      storage: createJSONStorage(() => localStorage),
    }
  )
);
