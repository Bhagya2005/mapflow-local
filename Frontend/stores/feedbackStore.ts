"use client";
import { create } from "zustand";
import { showSuccess, showError } from "@/utils/toast";
import { feedbackApi } from "@/api/feedback";

interface Feedback {
  id?: string | number;
  _id?: string;
  rating: number;
  description: string;
  feedbackType: string;
  status?: string;
  title?: string;
}

interface FeedbackStore {
  feedbacks: Feedback[];
  loading: boolean;
  fetchFeedbacks: () => Promise<void>;
  addFeedback: (data: any) => Promise<boolean>;
}

export const useFeedbackStore = create<FeedbackStore>((set, get) => ({
  feedbacks: [],
  loading: false,

  fetchFeedbacks: async () => {
    try {
      const res = await feedbackApi.getAll();
      const data = res.data?.data || (Array.isArray(res.data) ? res.data : []);
      set({ feedbacks: data });
    } catch (error) {
      console.error("Fetch suppressed:", error);
    }
  },

  addFeedback: async (feedbackData) => {
    set({ loading: true });
    try {
      const res = await feedbackApi.create(feedbackData);
      
      if (res.status === 200 || res.status === 201) {
        showSuccess("Feedback transmitted successfully!");
        const newFeedback = res.data?.data || feedbackData;
        
        set((state) => ({
          feedbacks: [newFeedback, ...state.feedbacks],
          loading: false,
        }));

        return true;
      }
      return false;
    } catch (error: any) {
      showError(error.response?.data?.message || "Transmission failed");
      return false;
    } finally {
      set({ loading: false });
    }
  },
}));