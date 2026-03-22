"use client";
import { motion } from "framer-motion";
import { AlertTriangle, X, Info, ShieldAlert } from "lucide-react";
import { useMapThemeStore } from "@/stores/mapThemeStore";

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
  const isDark = useMapThemeStore((s: any) => s.mapTheme) === "dark";
  if (!isOpen) return null;

  const typeConfig = {
    danger: {
      colorLight: "rgba(239,68,68,0.5)",
      bgIcon: "bg-red-500",
      bgGlow: "bg-red-500/20",
      btnPrimary: "bg-red-500 hover:bg-red-600 shadow-red-500/25",
      icon: <ShieldAlert className="text-white" size={24} />
    },
    warning: {
      colorLight: "rgba(245,158,11,0.5)",
      bgIcon: "bg-amber-500",
      bgGlow: "bg-amber-500/20",
      btnPrimary: "bg-amber-500 hover:bg-amber-600 shadow-amber-500/25",
      icon: <AlertTriangle className="text-white" size={24} />
    },
    info: {
      colorLight: "rgba(124,92,252,0.5)",
      bgIcon: "bg-[#7c5cfc]",
      bgGlow: "bg-[#7c5cfc]/20",
      btnPrimary: "bg-[#7c5cfc] hover:bg-[#6b4ae0] shadow-[#7c5cfc]/25",
      icon: <Info className="text-white" size={24} />
    },
  };

  const config = typeConfig[type];

  return (
    <div className="fixed inset-0 z-[50000] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        className={`w-full max-w-[400px] rounded-[28px] p-7 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.5)] flex flex-col gap-5 overflow-hidden relative transition-all ${isDark ? 'bg-[#09090b]/85 backdrop-blur-2xl border border-white/10' : 'bg-white/40 backdrop-blur-[40px] border border-white/60'}`}
      >
        <div className={`absolute top-0 right-0 w-64 h-64 ${config.bgGlow} rounded-full blur-[60px] pointer-events-none -translate-y-1/2 translate-x-1/3`}></div>

        <button onClick={onClose} className={`absolute top-6 right-6 p-2 rounded-xl transition-all z-10 ${isDark ? 'hover:bg-white/10 text-white/50 hover:text-white' : 'hover:bg-white/60 text-zinc-500 hover:text-zinc-800'}`}>
          <X size={18} />
        </button>

        <div className="flex flex-col items-center text-center mt-4 relative z-10">
          <div className={`p-4 rounded-[20px] mb-6 shadow-[0_0_20px_${config.colorLight}] ${config.bgIcon}`}>
            {config.icon}
          </div>
          <h3 className={`text-xl font-bold tracking-tight ${isDark ? 'text-white' : 'text-black'}`}>{title}</h3>
          <p className={`text-sm mt-3 leading-relaxed font-medium ${isDark ? 'text-white/60' : 'text-black/80'}`}>{message}</p>
        </div>

        <div className={`flex gap-3 mt-4 relative z-10 border-t pt-5 w-full ${isDark ? 'border-white/5' : 'border-zinc-200/50'}`}>
          <button
            onClick={onClose}
            className={`flex-[1] py-3.5 rounded-xl text-[10px] font-bold uppercase tracking-widest transition-all ${isDark ? 'bg-white/5 hover:bg-white/10 text-white/60 hover:text-white' : 'bg-white/70 hover:bg-white text-black/70 hover:text-black shadow-sm'}`}
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            disabled={loading}
            className={`flex-[2] py-3.5 rounded-xl text-white text-[10px] font-bold uppercase tracking-widest transition-all shadow-lg ${config.btnPrimary} disabled:opacity-50`}
          >
            {loading ? "Processing..." : confirmText}
          </button>
        </div>
      </motion.div>
    </div>
  );
}