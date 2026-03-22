"use client";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import api from "@/api/index";
import { authApi } from "@/api/auth";
import { showSuccess, showError } from "@/utils/toast";

const setAuthCookie = (token: string) => {
  if (typeof document !== "undefined") {
    document.cookie = `token=${token}; path=/; max-age=86400; SameSite=Lax`;
  }
};

const removeAuthCookie = () => {
  if (typeof document !== "undefined") {
    document.cookie = "token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC;";
  }
};

export const useAuthStore = create(
  persist(
    (set, get: any) => ({
      user: null,
      loading: false,


      signup: async (userData: any, router: any) => {
        set({ loading: true });
        try {
          const { role, ...cleanData } = userData;
          if (cleanData.email) cleanData.email = cleanData.email.toLowerCase();

          const { data } = await authApi.register(cleanData);

          if (data.success) {
            const { access_token, refresh_token } = data.data;
            localStorage.setItem("access_token", access_token);
            localStorage.setItem("refresh_token", refresh_token);
            setAuthCookie(access_token);

            const userData = {
              name: data.data.name || cleanData.name,
              email: data.data.email || cleanData.email,
              role: data.data.role || "user",
              id: data.data.id
            };

            localStorage.setItem("user", JSON.stringify(userData));
            set({ user: userData });

            showSuccess("Account Created Successfully!");
            router.replace("/");
          }
        } catch (err: any) {
          showError(err.response?.data?.message || "Registration failed");
          throw err;
        } finally {
          set({ loading: false });
        }
      },

      login: async (email: string, password: string, router: any) => {
        set({ loading: true });
        try {
          const { data } = await authApi.login({ email: email.toLowerCase(), password });

          if (data.success) {
            const { access_token, refresh_token } = data.data;
            localStorage.setItem("access_token", access_token);
            localStorage.setItem("refresh_token", refresh_token);
            setAuthCookie(access_token);

            const userData = {
              email: data.data.email || email,
              name: data.data.name || "User",
              role: data.data.role,
              id: data.data.id
            };

            localStorage.setItem("user", JSON.stringify(userData));
            set({ user: userData });

            showSuccess("Welcome Back!");
            sessionStorage.setItem("just_logged_in", "true");
            router.replace("/");
          }
        } catch (err: any) {
          showError(err.response?.data?.message || "Invalid Credentials");
        } finally {
          set({ loading: false });
        }
      },

      sendOtp: async (email: string) => {
        set({ loading: true });
        try {
          await authApi.forgotPassword(email.toLowerCase());
          showSuccess("OTP sent successfully!");
          return true;
        } catch (err: any) {
          showError(err.response?.data?.message || "User not found");
          return false;
        } finally {
          set({ loading: false });
        }
      },

      verifyOtp: async (email: string, otp: string) => {
        set({ loading: true });
        try {
          await authApi.verifyOtp(email.toLowerCase(), otp);
          showSuccess("OTP Verified!");
          return true;
        } catch (err: any) {
          showError(err.response?.data?.message || "Invalid OTP");
          return false;
        } finally {
          set({ loading: false });
        }
      },

      resetPassword: async (resetData: any) => {
        set({ loading: true });
        try {
          await authApi.resetPassword({ ...resetData, email: resetData.email?.toLowerCase() });
          showSuccess("Password updated successfully!");
          return true;
        } catch (err: any) {
          showError(err.response?.data?.message || "Reset failed");
          return false;
        } finally {
          set({ loading: false });
        }
      },

      logout: () => {
        localStorage.removeItem("access_token");
        localStorage.removeItem("refresh_token");
        localStorage.removeItem("user");
        removeAuthCookie();
        set({ user: null });
        window.location.href = "/";
      },
    }),
    {
      name: "auth-storage",
      storage: createJSONStorage(() => localStorage),
      partialize: (state: any) => ({ user: state.user }),
    }
  )
);