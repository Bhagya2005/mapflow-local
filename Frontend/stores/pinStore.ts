"use client";
import { create } from "zustand";
import { showSuccess, showError } from "@/utils/toast";
import { pinsApi } from "@/api/pins";

export interface Pin {
  id: number;
  _id?: string; 
  name: string;
  description: string;
  lat: number;
  lng: number;
  categoryId?: number;
  categories: { id: number; name: string; color: string }[];
}

interface PinStore {
  pins: Pin[];
  pinForm: any;
  loading: boolean;
  editingPinId: number | null;
  fetchPins: (userId?: string) => Promise<void>;
  savePin: () => Promise<boolean>; 
  deletePin: (id: number) => Promise<void>;
  setPinForm: (data: any) => void;
  setEditingPin: (pin: Pin | null) => void;
}

export const usePinStore = create<PinStore>((set, get) => ({
  pins: [],
  pinForm: {},
  editingPinId: null,
  loading: false,

  fetchPins: async (userId?: string) => {
    try {
      const res = await pinsApi.getAll(userId);
      const pinsData = userId 
        ? (res.data?.data?.data || res.data?.data || res.data)
        : (res.data?.data || res.data);

      if (Array.isArray(pinsData)) {
        set({ pins: pinsData });
      }
    } catch (error) {
      console.error("Fetch Error:", error);
    }
  },

  savePin: async () => {
    const { editingPinId, pinForm, pins } = get();
    set({ loading: true });
    try {
      const payload = {
        name: pinForm.name,
        description: pinForm.description,
        lat: Number(pinForm.lat),
        lng: Number(pinForm.lng),
        categoryId: Number(pinForm.categoryId),
      };

      if (editingPinId) {
        const res = await pinsApi.update(editingPinId, payload);
        const updatedPinFromServer = res.data.data || res.data;
        
        set({ 
          pins: pins.map((p) => (p.id === editingPinId ? updatedPinFromServer : p)),
          editingPinId: null, 
          pinForm: {},
          loading: false
        });
        return true;
      } else {
        const res = await pinsApi.create(payload);
        const newPinFromServer = res.data.data || res.data;
        
        set({ 
          pins: [newPinFromServer, ...pins], 
          pinForm: {},
          loading: false 
        });
        return true;
      }
    } catch (error: any) {
      set({ loading: false });
      showError(error.response?.data?.message || "Transmission failed");
      return false;
    }
  },

  deletePin: async (id: number) => {
    try {
      const res = await pinsApi.delete(id);
      set((state) => ({
        pins: state.pins.filter((p) => p.id !== id),
      }));
    } catch (error) {
      showError("delte pin failed");
    }
  },

  setPinForm: (data) => set((state) => ({ pinForm: { ...state.pinForm, ...data } })),
  
  setEditingPin: (pin) => {
    if (pin) {
      set({ 
        editingPinId: pin.id, 
        pinForm: { 
          ...pin, 
          categoryId: pin.categories && pin.categories[0]?.id ? pin.categories[0].id : pin.categoryId 
        } 
      });
    } else {
      set({ editingPinId: null, pinForm: {} });
    }
  },
}));