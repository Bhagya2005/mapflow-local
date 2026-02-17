"use client";
import { create } from "zustand";
import { showSuccess, showError } from "@/utils/toast";
import { userApi } from "@/api/user"; 

interface User {
  id?: string | number; 
  email: string;
  name?: string;    
  password?: string;
  role: string;
  createdAt?: string;
}

interface UserStore {
  users: User[];
  usersPage: number;
  usersTotalPages: number;
  usersSearch: string;
  usersRole: string;
  userForm: User;
  editingUserId: string | number | null;

  loadUsers: () => Promise<void>;
  saveUser: () => Promise<void>;
  deleteUser: (id: string | number) => Promise<void>;
  setUserForm: (d: User) => void;
}

export const useUserStore = create<UserStore>((set, get) => ({
  users: [],
  usersPage: 1,
  usersTotalPages: 1,
  usersSearch: "",
  usersRole: "",
  userForm: { email: "", name: "", password: "", role: "user" },
  editingUserId: null,

  loadUsers: async () => {
    try {
      const res = await userApi.getAll();
      set({ 
        users: res.data.data, 
        usersTotalPages: 1 
      });
    } catch (err) {
      showError("Failed to load users");
      console.error(err);
    }
  },

  saveUser: async () => {
    const { editingUserId, userForm } = get();
    try {
      showSuccess("Saved successfully");
      get().loadUsers();
    } catch (err) {
      showError("Failed to save user");
    }
  },

  deleteUser: async (id: string | number) => {
    if (!confirm("Delete user?")) return;
    try {
      await userApi.delete(id);
      showSuccess("Deleted successfully");
      get().loadUsers();
    } catch (err) {
      showError("Failed to delete user");
      console.error(err);
    }
  },

  setUserForm: (d) => set({ userForm: d }),
}));