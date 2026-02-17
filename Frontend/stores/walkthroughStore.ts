"use client";
import { create } from "zustand";
import { arrayMove } from "@dnd-kit/sortable";
import { showSuccess } from "@/utils/toast";
import { walkthroughApi } from "@/api/walkthrough"; 

interface Walkthrough {
  id?: string | number; 
  title: string;
  description?: string;
  videoUrl?: string;
}

interface WalkthroughStore {
  walkthroughs: Walkthrough[];
  walkthroughPage: number;
  walkthroughTotalPages: number;
  walkthroughForm: Walkthrough;
  editingWalkthroughId: string | number | null;
  showTour: boolean;
  showModal: boolean;
  setShowModal: (v: boolean) => void;

  fetchWalkthroughs: (page?: number) => Promise<void>;
  saveWalkthrough: () => Promise<void>;
  deleteWalkthrough: (id: string | number) => Promise<void>;
  reorderWalkthroughs: (activeId: string, overId: string) => Promise<void>;
  setWalkthroughForm: (d: Walkthrough) => void;
  setOpenTour: (v: boolean) => void;
}

export const useWalkthroughStore = create<WalkthroughStore>((set, get) => ({
  walkthroughs: [],
  walkthroughPage: 1,
  walkthroughTotalPages: 1,
  walkthroughForm: { title: "", description: "", videoUrl: "" },
  editingWalkthroughId: null,
  showTour: false,
  showModal: false,
  setShowModal: (v) => set({ showModal: v }),

  fetchWalkthroughs: async (page) => {
    try {
      const res = await walkthroughApi.getAll();
      set({ 
        walkthroughs: res.data.data, 
        walkthroughTotalPages: 1 
      });
    } catch (err) {
      console.error("Failed to fetch walkthroughs", err);
    }
  },

  saveWalkthrough: async () => {
    const { walkthroughForm, editingWalkthroughId } = get();
    try {
      if (editingWalkthroughId) {
        await walkthroughApi.create(walkthroughForm); 
      } else {
        await walkthroughApi.create(walkthroughForm);
      }
      showSuccess("Saved successfully");
      set({ 
        walkthroughForm: { title: "", description: "", videoUrl: "" },
        showModal: false 
      });
      get().fetchWalkthroughs();
    } catch (err) {
      console.error("Failed to save walkthrough", err);
    }
  },

  deleteWalkthrough: async (id: string | number) => {
    if (!confirm("Delete walkthrough?")) return;
    try {
      await walkthroughApi.delete(id);
      showSuccess("Deleted successfully");
      get().fetchWalkthroughs();
    } catch (err) {
      console.error("Failed to delete", err);
    }
  },

  reorderWalkthroughs: async (activeId: string, overId: string) => {
    const items = get().walkthroughs;
    const oldIndex = items.findIndex((i) => i.id === activeId || (i as any)._id === activeId);
    const newIndex = items.findIndex((i) => i.id === overId || (i as any)._id === overId);
    const ordered = arrayMove(items, oldIndex, newIndex);
    set({ walkthroughs: ordered });
  },

  setWalkthroughForm: (d) => set({ walkthroughForm: d }),
  setOpenTour: (v) => set({ showTour: v }),
}));