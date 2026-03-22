import React, { useState } from "react";
import { X, PlaySquare, Link as LinkIcon } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useMapThemeStore } from "@/stores/mapThemeStore";

interface PlaygroundModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function PlaygroundModal({ isOpen, onClose }: PlaygroundModalProps) {
    const isDark = useMapThemeStore((s) => s.mapTheme) === "dark";
    const [url, setUrl] = useState("");
    const [activeUrl, setActiveUrl] = useState("");

    if (!isOpen) return null;

    const handlePreview = (e: React.FormEvent) => {
        e.preventDefault();
        if (!url.trim()) return;
        let finalUrl = url.trim();
        if (!/^https?:\/\//i.test(finalUrl)) {
            finalUrl = 'https://' + finalUrl;
        }
        setActiveUrl(finalUrl);
    };

    return (
        <div className="fixed inset-0 z-[99999] flex items-center justify-center p-4 pointer-events-auto">
            <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={onClose} />

            <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 10 }}
                className={`relative w-full max-w-4xl h-[80vh] flex flex-col rounded-3xl overflow-hidden shadow-2xl border ${isDark
                    ? 'bg-[#09090b]/85 border-white/10 shadow-[0_0_50px_rgba(0,0,0,0.5)]'
                    : 'bg-white/40 border-white/60 shadow-[0_0_50px_rgba(0,0,0,0.1)] backdrop-blur-[40px]'
                    }`}
            >
                <div className={`p-4 border-b flex items-center justify-between ${isDark ? 'border-white/10' : 'border-zinc-200/50'}`}>
                    <div className="flex items-center gap-3">
                        <div className={`p-2 rounded-xl flex items-center justify-center ${isDark ? 'bg-indigo-500/20 text-indigo-400' : 'bg-indigo-100 text-indigo-600'
                            }`}>
                            <PlaySquare size={20} />
                        </div>
                        <h2 className={`text-lg font-black tracking-tight ${isDark ? 'text-white' : 'text-zinc-900'}`}>MapFlow Playground</h2>
                    </div>
                    <button
                        onClick={onClose}
                        className={`p-2 rounded-xl transition-all ${isDark ? 'hover:bg-white/10 text-white/50 hover:text-white' : 'hover:bg-zinc-200/50 text-zinc-500 hover:text-zinc-900'
                            }`}
                    >
                        <X size={20} />
                    </button>
                </div>

                <div className={`p-4 border-b ${isDark ? 'border-white/5 bg-black/20' : 'border-zinc-200/30 bg-white/30'}`}>
                    <form onSubmit={handlePreview} className="flex gap-2">
                        <div className={`flex-1 flex items-center gap-2 px-4 py-3 rounded-2xl border transition-all ${isDark ? 'bg-black/50 border-white/10 focus-within:border-indigo-500/50' : 'bg-white border-zinc-200 shadow-sm focus-within:border-indigo-400'
                            }`}>
                            <LinkIcon size={18} className={isDark ? 'text-zinc-500' : 'text-zinc-400'} />
                            <input
                                type="text"
                                value={url}
                                onChange={(e) => setUrl(e.target.value)}
                                placeholder="Paste your link here (e.g. https://example.com)"
                                className={`w-full bg-transparent outline-none text-sm font-medium ${isDark ? 'text-white placeholder:text-zinc-600' : 'text-zinc-900 placeholder:text-zinc-400'
                                    }`}
                            />
                        </div>
                        <button
                            type="submit"
                            className="px-6 py-3 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-2xl transition-all shadow-lg active:scale-95 text-sm"
                        >
                            Preview
                        </button>
                    </form>
                </div>

                <div className={`flex-1 relative ${isDark ? 'bg-zinc-950/50' : 'bg-zinc-50/50'}`}>
                    {activeUrl ? (
                        <iframe
                            src={activeUrl}
                            className="w-full h-full border-none"
                            title="Playground Preview"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                        />
                    ) : (
                        <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-8">
                            <div className={`w-20 h-20 rounded-full flex flex-col items-center justify-center mb-4 ${isDark ? 'bg-white/5 text-zinc-600' : 'bg-zinc-200/50 text-zinc-400'
                                }`}>
                                <PlaySquare size={32} />
                            </div>
                            <h3 className={`text-xl font-bold mb-2 ${isDark ? 'text-white/80' : 'text-zinc-700'}`}>Ready to Preview</h3>
                            <p className={`text-sm max-w-sm ${isDark ? 'text-zinc-500' : 'text-zinc-500'}`}>
                                Paste a link in the input box above to preview it dynamically in this modal.
                            </p>
                        </div>
                    )}
                </div>
            </motion.div>
        </div>
    );
}
