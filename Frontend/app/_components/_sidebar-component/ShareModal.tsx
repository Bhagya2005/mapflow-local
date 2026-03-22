"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Share2, Copy, Check, X, Code, Link as LinkIcon, AlertCircle } from "lucide-react";
import { showSuccess, showError } from "@/utils/toast";

interface ShareModalProps {
  userId?: string;
  onClose: () => void;
}

export default function ShareModal({ userId, onClose }: ShareModalProps) {
  const [copiedLink, setCopiedLink] = useState(false);
  const [copiedEmbed, setCopiedEmbed] = useState(false);
  const [origin, setOrigin] = useState("");

  useEffect(() => {
    if (typeof window !== "undefined") {
      setOrigin(window.location.origin);
    }
  }, []);

  const shareLink = userId && origin ? `${origin}/share/${userId}` : "";
  const iframeCode = shareLink
    ? `<iframe src="${shareLink}" width="100%" height="500px" frameborder="0" style="border-radius: 28px; border: 1px solid rgba(255,255,255,0.1);"></iframe>`
    : "";

  const copyToClipboard = async (text: string, type: "link" | "embed") => {
    if (!text || text.includes("undefined") || !userId) {
      showError("Encryption Error: Missing Metadata");
      return;
    }

    try {
      await navigator.clipboard.writeText(text);
      showSuccess("Data Copied to Clipboard");
      if (type === "link") {
        setCopiedLink(true);
        setTimeout(() => setCopiedLink(false), 2000);
      } else {
        setCopiedEmbed(true);
        setTimeout(() => setCopiedEmbed(false), 2000);
      }
    } catch (err) {
      showError("Terminal Access Denied");
    }
  };

  return (
    <div className="fixed inset-0 z-[50000] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        className="w-full max-w-[420px] bg-[#09090b]/85 backdrop-blur-2xl border border-white/10 rounded-[28px] p-7 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.5)] flex flex-col gap-6 overflow-hidden relative"
      >
        <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/20 rounded-full blur-[60px] pointer-events-none -translate-y-1/2 translate-x-1/3"></div>

        <div className="flex justify-between items-center relative z-10">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-blue-500 rounded-xl shadow-[0_0_15px_rgba(59,130,246,0.5)]">
              <Share2 className="text-white" size={18} />
            </div>
            <h2 className="text-lg font-bold text-white tracking-tight">Share Map</h2>
          </div>
          <button onClick={onClose} className="p-2 rounded-xl hover:bg-white/10 text-white/50 hover:text-white transition-all">
            <X size={18} />
          </button>
        </div>

        {!userId && (
          <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-2xl flex items-center gap-3 text-red-400 relative z-10">
            <AlertCircle size={20} className="shrink-0" />
            <p className="text-[10px] uppercase font-bold tracking-widest leading-tight">Link Generation Failed: Operator ID Not Found</p>
          </div>
        )}

        <div className="space-y-4 relative z-10 flex-col flex gap-2">
          <div className="space-y-2">
            <label className="text-[10px] font-bold text-white/40 uppercase tracking-widest flex items-center gap-2">
              <LinkIcon size={12} className="text-blue-500" /> Public Access Link
            </label>
            <div className="flex gap-2 p-1.5 bg-black/40 border border-white/10 rounded-2xl group focus-within:border-blue-500/50 transition-all shadow-inner">
              <input
                type="text"
                value={shareLink || "WAITING_FOR_UPLINK..."}
                readOnly
                className="flex-1 bg-transparent px-3 py-2 text-sm text-white/90 outline-none font-mono"
              />
              <button
                disabled={!shareLink}
                onClick={() => copyToClipboard(shareLink, "link")}
                className={`p-2.5 rounded-xl transition-all active:scale-95 ${shareLink ? 'bg-blue-500 hover:bg-blue-600 text-white shadow-lg shadow-blue-500/20' : 'bg-white/5 text-white/30'}`}
              >
                {copiedLink ? <Check size={16} /> : <Copy size={16} />}
              </button>
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-bold text-white/40 uppercase tracking-widest flex items-center gap-2">
              <Code size={12} className="text-blue-500" /> Embed Code (IFrame)
            </label>
            <div className="bg-black/40 border border-white/10 p-4 rounded-2xl relative group shadow-inner transition-all hover:border-blue-500/30">
              <code className="text-[11px] text-white/60 font-mono break-words block leading-relaxed pr-8">
                {iframeCode || "ERROR: NO_METADATA_STREAM"}
              </code>
              <button
                disabled={!iframeCode}
                onClick={() => copyToClipboard(iframeCode, "embed")}
                className="absolute top-3 right-3 p-2 rounded-xl bg-white/5 hover:bg-blue-500 hover:text-white text-white/40 transition-colors disabled:opacity-0"
              >
                {copiedEmbed ? <Check size={14} /> : <Copy size={14} />}
              </button>
            </div>
          </div>
        </div>

        <div className="border-t border-white/5 pt-5 mt-2 relative z-10 w-full">
          <button onClick={onClose} className="w-full py-4 rounded-xl bg-white/5 hover:bg-white/10 text-white/60 hover:text-white text-[10px] font-bold uppercase tracking-widest transition-all">
            Close Panel
          </button>
        </div>
      </motion.div>
    </div>
  );
}