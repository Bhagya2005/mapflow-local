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
    <div className="fixed inset-0 z-[40000] flex items-center justify-center bg-black/80 backdrop-blur-md p-4">
      <motion.div 
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        className="relative w-full max-w-md bg-[#0a0a0c] border border-white/10 rounded-[32px] p-8 shadow-[0_0_50px_-12px_rgba(99,102,241,0.2)] flex flex-col gap-5"
      >
        <div className="flex justify-between items-center mb-2">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-indigo-500/10 rounded-lg">
              <MessageSquare className="text-indigo-400" size={20} />
            </div>
            <h2 className="text-xl font-black text-white ">
              FeedBack <span className="text-indigo-500">Terminal</span>
            </h2>
          </div>
          <button onClick={onClose} className="p-2 rounded-full hover:bg-white/5 text-gray-500 hover:text-white transition-colors">
            <X size={20} />
          </button>
        </div>

        <div className="space-y-4">
          <div className="space-y-2">
            <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest">Subject</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Brief summary..."
              className="w-full rounded-2xl px-4 py-3 bg-white/[0.03] text-white border border-white/5 focus:border-indigo-500/50 outline-none transition-all text-sm italic"
            />
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest">Category</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full rounded-2xl px-4 py-3 bg-zinc-900 text-gray-400 border border-white/5 focus:border-indigo-500/50 outline-none transition-all text-sm cursor-pointer"
            >
              <option value="Feature Request">Feature Request</option>
              <option value="service">Service</option>
              <option value="improvement">Improvement</option>
              <option value="other">Other</option>
            </select>
          </div>

          <div className="flex flex-col items-center py-4 bg-white/[0.02] rounded-2xl border border-white/5">
            <div className="flex gap-2">
              {[1, 2, 3, 4, 5].map((star) => {
                const active = hoverRating > 0 ? hoverRating >= star : rating >= star;
                return (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setRating(star)}
                    onMouseEnter={() => setHoverRating(star)}
                    onMouseLeave={() => setHoverRating(0)}
                    className={`transition-all duration-300 ${active ? "scale-110" : "scale-100 opacity-20"}`}
                  >
                    <Star 
                      size={28} 
                      fill={active ? "#818cf8" : "transparent"} 
                      className={active ? "text-indigo-500" : "text-gray-400"} 
                    />
                  </button>
                );
              })}
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest">Details</label>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              rows={3}
              placeholder="Describe your experience..."
              className="w-full rounded-2xl px-4 py-3 bg-white/[0.03] text-white border border-white/5 focus:border-indigo-500/50 outline-none transition-all text-sm italic resize-none"
            />
          </div>
        </div>

        <button
          onClick={handleSubmit}
          disabled={loading}
          className={`w-full py-4 rounded-2xl font-black tracking-[0.2em] text-[15px] transition-all flex items-center justify-center shadow-lg 
            ${loading ? "bg-zinc-800 text-zinc-500" : "bg-indigo-600/10 text-indigo-500 hover:bg-indigo-600 hover:text-white shadow-indigo-500/10"}`}
        >
          {loading ? "TRANSMITTING..." : "TRANSMIT FEEDBACK"}
        </button>
      </motion.div>
    </div>
  );
}

