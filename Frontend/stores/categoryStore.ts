"use client";
import { create } from "zustand";
import { Category } from "@/app/types";
import { showSuccess, showError } from "@/utils/toast";
import api from "@/api/index"; 
import { categoriesApi } from "@/api/categories"; 

interface CategoryStore {
  categories: Category[];
  loading: boolean;
  fetchCategories: () => Promise<void>;
  addCategory: (category: Partial<Category>) => Promise<void>;
  updateCategory: (id: string | number, payload: Partial<Category>) => Promise<void>;
  deleteCategories: (ids: (string | number)[]) => Promise<boolean>;
}

export const useCategoryStore = create<CategoryStore>((set, get) => ({
  categories: [],
  loading: false,

  fetchCategories: async () => {
    try {
      const { data } = await api.get("/categories");
      const finalData = Array.isArray(data) ? data : data.data || [];
      set({ categories: finalData });
    } catch (err) { console.error(err); }
  },

  addCategory: async (categoryData) => {
    try {
      const res = await categoriesApi.create(categoryData);
      if (res.data.success) {
        set((state) => ({ categories: [...state.categories, res.data.data] }));
        showSuccess("Category added");
      }
    } catch (error: any) { showError("Failed to add"); }
  },

  updateCategory: async (id, payload) => {
    try {
      const res = await categoriesApi.update(id, payload);
      if (res.data.success) {
        set((state) => ({
          categories: state.categories.map((c: any) => 
            (c.id === id || c._id === id) ? res.data.data : c
          ),
        }));
        showSuccess("Updated");
      }
    } catch (error: any) { showError("Update failed"); }
  },

  deleteCategories: async (ids: (string | number)[]) => {
    set({ loading: true });
    try {
      await Promise.all(ids.map(id => categoriesApi.delete(id)));
      set((state) => ({
        categories: state.categories.filter(
          (cat: any) => !ids.includes(cat.id) && !ids.includes(cat._id)
        ),
      }));

      return true;
    } catch (err: any) {
      showError("Some categories could not be deleted");
      return false;
    } finally {
      set({ loading: false });
    }
  },
}));