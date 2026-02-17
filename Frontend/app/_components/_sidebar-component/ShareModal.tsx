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
    ? `<iframe src="${shareLink}" width="100%" height="500px" frameborder="0" style="border-radius: 12px; border: 1px solid rgba(255,255,255,0.1);"></iframe>` 
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
    <div className="fixed inset-0 z-[50000] flex items-center justify-center bg-black/80 backdrop-blur-md p-4">
      <motion.div 
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        className="bg-[#0a0a0c] border border-white/10 rounded-[32px] p-8 w-full max-w-md shadow-[0_0_50px_-12px_rgba(124,92,252,0.3)] flex flex-col gap-6"
      >
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-[#7c5cfc]/10 rounded-lg">
              <Share2 className="text-[#7c5cfc]" size={20} />
            </div>
            <h2 className="text-xl font-black text-white italic">BROADCAST <span className="text-[#7c5cfc]">MAP</span></h2>
          </div>
          <button onClick={onClose} className="p-2 rounded-full hover:bg-white/5 text-gray-500 hover:text-white transition-colors">
            <X size={20} />
          </button>
        </div>

        {!userId && (
          <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-2xl flex items-center gap-3 text-red-400">
            <AlertCircle size={20} className="shrink-0" />
            <p className="text-[10px] uppercase font-black leading-tight">Link Generation Failed: Operator ID Not Found</p>
          </div>
        )}

        <div className="space-y-3">
          <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest flex items-center gap-2">
            <LinkIcon size={12} /> Public Access Link
          </label>
          <div className="flex gap-2 p-1.5 bg-white/[0.03] border border-white/5 rounded-2xl group focus-within:border-[#7c5cfc]/30">
            <input 
              type="text" 
              value={shareLink || "WAITING_FOR_UPLINK..."} 
              readOnly 
              className="flex-1 bg-transparent px-3 py-2 text-xs text-white/80 outline-none font-mono" 
            />
            <button 
              disabled={!shareLink}
              onClick={() => copyToClipboard(shareLink, "link")} 
              className={`p-2.5 rounded-xl transition-all active:scale-95 ${shareLink ? 'bg-[#7c5cfc] hover:bg-[#6b4ae0] text-white' : 'bg-white/5 text-gray-600'}`}
            >
              {copiedLink ? <Check size={16} /> : <Copy size={16} />}
            </button>
          </div>
        </div>

        <div className="space-y-3">
          <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest flex items-center gap-2">
            <Code size={12} /> Embed Code (IFrame)
          </label>
          <div className="bg-white/[0.02] border border-white/5 p-4 rounded-2xl relative group">
            <code className="text-[10px] text-[#7c5cfc]/80 font-mono break-words block leading-relaxed pr-8 italic">
              {iframeCode || "ERROR: NO_METADATA_STREAM"}
            </code>
            <button 
              disabled={!iframeCode}
              onClick={() => copyToClipboard(iframeCode, "embed")} 
              className="absolute top-3 right-3 text-gray-500 hover:text-white disabled:opacity-0"
            >
              {copiedEmbed ? <Check size={14} /> : <Copy size={14} />}
            </button>
          </div>
        </div>

        <button onClick={onClose} className="w-full bg-white/5 hover:bg-white/10 text-white py-4 rounded-2xl font-black uppercase tracking-[0.2em] text-[10px] transition-all border border-white/5">
          Close Transmission
        </button>
      </motion.div>
    </div>
  );
}