"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { MessageSquare, Star, X } from "lucide-react";
import { showError } from "@/utils/toast";
import { useFeedbackStore } from "@/stores/feedbackStore";

export default function FeedbackModal({ onClose }: { onClose: () => void }) {
  const { addFeedback, loading } = useFeedbackStore();

  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");
  const [category, setCategory] = useState("other");

  const handleSubmit = async () => {
    if (!title.trim()) {
      showError("Transmission title required");
      return;
    }
    if (rating === 0) {
      showError("Please provide a rating");
      return;
    }

    const payload = {
      feedbackType: category,
      description: message,
      rating: rating,
      title: title,
    };

    const success = await addFeedback(payload);
    if (success) {
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-[40000] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        className="w-full max-w-[420px] bg-[#09090b]/85 backdrop-blur-2xl border border-white/10 rounded-[28px] p-7 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.5)] flex flex-col gap-5 overflow-hidden relative"
      >
        <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/20 rounded-full blur-[60px] pointer-events-none -translate-y-1/2 translate-x-1/3"></div>

        <div className="flex justify-between items-center relative z-10 mb-2">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-emerald-500 rounded-xl shadow-[0_0_15px_rgba(16,185,129,0.5)]">
              <MessageSquare className="text-white" size={18} />
            </div>
            <h2 className="text-lg font-bold text-white tracking-tight">
              Feedback Panel
            </h2>
          </div>
          <button onClick={onClose} className="p-2 rounded-xl hover:bg-white/10 text-white/50 hover:text-white transition-all">
            <X size={18} />
          </button>
        </div>

        <div className="space-y-4 relative z-10">
          <div className="space-y-1.5">
            <label className="text-[10px] font-bold text-white/40 uppercase tracking-widest ml-1">Subject</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="What's this concerning?"
              className="w-full rounded-xl px-4 py-3.5 bg-black/40 border border-white/10 focus:border-emerald-500/60 focus:ring-4 focus:ring-emerald-500/15 outline-none transition-all text-sm text-white/90 placeholder:text-white/30 shadow-inner"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-[10px] font-bold text-white/40 uppercase tracking-widest ml-1">Category</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full rounded-xl px-4 py-3.5 bg-black/40 border border-white/10 focus:border-emerald-500/60 focus:ring-4 focus:ring-emerald-500/15 outline-none transition-all text-sm text-white/90 shadow-inner cursor-pointer appearance-none"
            >
              <option value="Feature Request" className="bg-[#09090b]">Feature Request</option>
              <option value="service" className="bg-[#09090b]">Service Issue</option>
              <option value="improvement" className="bg-[#09090b]">Enhancement Idea</option>
              <option value="other" className="bg-[#09090b]">Other Feedback</option>
            </select>
          </div>

          <div className="flex flex-col items-center py-5 bg-white/5 rounded-2xl border border-white/10 shadow-inner my-2">
            <h4 className="text-[10px] font-bold text-white/40 uppercase tracking-widest mb-3">Overall Experience</h4>
            <div className="flex gap-2.5">
              {[1, 2, 3, 4, 5].map((star) => {
                const active = hoverRating > 0 ? hoverRating >= star : rating >= star;
                return (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setRating(star)}
                    onMouseEnter={() => setHoverRating(star)}
                    onMouseLeave={() => setHoverRating(0)}
                    className={`transition-all duration-300 transform ${active ? "scale-110 drop-shadow-[0_0_8px_rgba(16,185,129,0.6)]" : "scale-100 opacity-20 hover:opacity-50"}`}
                  >
                    <Star
                      size={28}
                      fill={active ? "#10b981" : "transparent"}
                      className={active ? "text-emerald-500" : "text-white"}
                    />
                  </button>
                );
              })}
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-[10px] font-bold text-white/40 uppercase tracking-widest ml-1">Details</label>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              rows={3}
              placeholder="Provide a detailed description..."
              className="w-full rounded-xl px-4 py-3.5 bg-black/40 border border-white/10 focus:border-emerald-500/60 focus:ring-4 focus:ring-emerald-500/15 outline-none transition-all text-sm text-white/90 placeholder:text-white/30 resize-none shadow-inner"
            />
          </div>
        </div>

        <div className="flex gap-3 pt-4 border-t border-white/5 relative z-10 w-full mt-2">
          <button
            onClick={onClose}
            className="flex-1 py-3.5 rounded-xl bg-white/5 hover:bg-white/10 text-white/60 hover:text-white text-[10px] font-bold uppercase tracking-widest transition-all"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            disabled={loading}
            className={`flex-[2] py-3.5 rounded-xl font-bold tracking-widest text-[10px] uppercase transition-all shadow-lg flex items-center justify-center
              ${loading ? "bg-white/5 text-white/30 border border-white/5" : "bg-emerald-500 hover:bg-emerald-600 text-white shadow-emerald-500/25"}`}
          >
            {loading ? "Transmitting..." : "Send Feedback"}
          </button>
        </div>
      </motion.div>
    </div>
  );
}
