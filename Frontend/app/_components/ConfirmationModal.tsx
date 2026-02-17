"use client";
import { motion, AnimatePresence } from "framer-motion";
import { AlertTriangle, X } from "lucide-react";

interface ConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: string;
  confirmText?: string;
  type?: "danger" | "warning" | "info";
  loading?: boolean;
}

export default function ConfirmationModal({
  isOpen, onClose, onConfirm, title, message, confirmText = "Confirm", type = "danger", loading
}: ConfirmationModalProps) {
  if (!isOpen) return null;

  const colors = {
    danger: "border-red-500/30 text-red-500 bg-red-500/10 shadow-red-500/20",
    warning: "border-amber-500/30 text-amber-500 bg-amber-500/10 shadow-amber-500/20",
    info: "border-indigo-500/30 text-indigo-500 bg-indigo-500/10 shadow-indigo-500/20",
  };

  const btnColors = {
    danger: "bg-red-600 hover:bg-red-500",
    warning: "bg-amber-600 hover:bg-amber-500",
    info: "bg-indigo-600 hover:bg-indigo-500",
  };

  return (
    <div className="fixed inset-0 z-[50000] flex items-center justify-center bg-black/90 backdrop-blur-sm p-4">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className={`w-full max-w-sm bg-[#0a0a0c] border rounded-[2rem] p-8 shadow-2xl ${colors[type]}`}
      >
        <div className="flex flex-col items-center text-center">
          <div className={`p-4 rounded-full mb-4 ${colors[type]}`}>
            <AlertTriangle size={32} />
          </div>
          <h3 className="text-xl font-black text-white uppercase tracking-tight">{title}</h3>
          <p className="text-gray-400 text-xs mt-3 leading-relaxed uppercase tracking-wider">{message}</p>
        </div>

        <div className="flex gap-3 mt-8">
          <button 
            onClick={onClose} 
            className="flex-1 py-3 rounded-xl border border-white/10 text-white text-[10px] font-black uppercase hover:bg-white/5"
          >
            Cancel
          </button>
          <button 
            onClick={onConfirm}
            disabled={loading}
            className={`flex-1 py-3 rounded-xl text-white text-[10px] font-black uppercase transition-all ${btnColors[type]} disabled:opacity-50`}
          >
            {loading ? "Processing..." : confirmText}
          </button>
        </div>
      </motion.div>
    </div>
  );
}