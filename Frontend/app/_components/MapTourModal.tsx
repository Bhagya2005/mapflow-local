"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Play, Video, FileText } from "lucide-react";
import { useWalkthroughStore } from "@/stores/walkthroughStore";
import tourData from "@/app/_data/tour-data.json";

export default function MapTourModal() {
    const { setOpenTour } = useWalkthroughStore();
    const [activeStepId, setActiveStepId] = useState<string | null>(tourData.length > 0 ? tourData[0].id : null);

    const activeStep = tourData.find((w) => w.id === activeStepId);

    return (
        <div className="fixed inset-0 z-[50000] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 pointer-events-auto">
            <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 15 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="w-full max-w-[800px] h-[600px] max-h-[85vh] bg-[#09090b]/90 backdrop-blur-3xl border border-white/10 rounded-[32px] shadow-[0_30px_80px_-20px_rgba(0,0,0,0.8)] flex overflow-hidden relative"
            >
                <div className="absolute top-0 right-1/4 w-96 h-96 bg-indigo-500/10 rounded-full blur-[80px] pointer-events-none -translate-y-1/2"></div>

                {/* Left Sidebar - Steps List */}
                <div className="w-[300px] border-r border-white/10 flex flex-col bg-black/20 shrink-0 relative z-10">
                    <div className="p-6 border-b border-white/10 shrink-0">
                        <h2 className="text-xl font-bold text-white tracking-tight flex items-center gap-3">
                            <div className="p-2 bg-indigo-500 rounded-lg shadow-[0_0_15px_rgba(99,102,241,0.5)]">
                                <Play className="text-white fill-white" size={16} />
                            </div>
                            Map Tour
                        </h2>
                        <p className="text-xs text-white/40 mt-2 font-medium">{tourData.length} Seq. Stops Available</p>
                    </div>

                    <div className="flex-1 overflow-y-auto glass-scroll p-4 space-y-2">
                        {tourData.map((w, index) => {
                            const isActive = activeStepId === w.id;
                            return (
                                <button
                                    key={w.id}
                                    onClick={() => setActiveStepId(w.id)}
                                    className={`w-full text-left p-4 rounded-xl transition-all border flex items-start gap-4 group ${isActive
                                        ? "bg-indigo-500/10 border-indigo-500/30 shadow-inner"
                                        : "bg-white/[0.02] border-white/5 hover:bg-white/[0.06]"
                                        }`}
                                >
                                    <div className={`w-6 h-6 rounded-full shrink-0 flex items-center justify-center text-[10px] font-bold ${isActive
                                        ? "bg-indigo-500 text-white shadow-[0_0_10px_rgba(99,102,241,0.4)]"
                                        : "bg-black/40 border border-white/10 text-white/40"
                                        }`}>
                                        {index + 1}
                                    </div>
                                    <div className="flex-1 overflow-hidden">
                                        <h4 className={`text-sm font-bold truncate transition-colors ${isActive ? "text-indigo-300" : "text-white/80 group-hover:text-white"}`}>
                                            {w.title}
                                        </h4>
                                        {w.videoUrl && (
                                            <div className="flex items-center gap-1.5 mt-1.5 text-white/30">
                                                <Video size={10} />
                                                <span className="text-[9px] uppercase tracking-widest font-black">Video</span>
                                            </div>
                                        )}
                                    </div>
                                </button>
                            );
                        })}
                    </div>
                </div>

                {/* Right Content Area - Viewer */}
                <div className="flex-1 flex flex-col relative z-10 bg-black/10">
                    <button onClick={() => setOpenTour(false)} className="absolute top-6 right-6 p-2 rounded-xl bg-white/5 hover:bg-white/10 text-white/50 hover:text-white transition-colors z-20">
                        <X size={18} />
                    </button>

                    <div className="flex-1 overflow-y-auto glass-scroll p-8">
                        <AnimatePresence mode="wait">
                            {!activeStepId ? (
                                <motion.div
                                    key="empty"
                                    initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                                    className="h-full flex flex-col items-center justify-center text-center opacity-40"
                                >
                                    <Play size={48} className="text-white/20 mb-4" />
                                    <h3 className="text-white font-bold text-lg">Select a Stop</h3>
                                    <p className="text-white/50 text-sm mt-2">Choose a destination from the list to begin playback.</p>
                                </motion.div>
                            ) : (
                                <motion.div
                                    key={activeStepId}
                                    initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}
                                    className="space-y-6"
                                >
                                    <div>
                                        <span className="text-indigo-400 text-[10px] font-black uppercase tracking-[0.2em] mb-2 block">Tour Location</span>
                                        <h2 className="text-3xl font-black text-white tracking-tight">{activeStep?.title}</h2>
                                    </div>

                                    {activeStep?.videoUrl ? (
                                        <div className="w-full aspect-video rounded-2xl overflow-hidden border-2 border-white/10 shadow-[0_20px_40px_-10px_rgba(0,0,0,0.5)] bg-black/60 flex items-center justify-center group relative">
                                            <video
                                                src={activeStep.videoUrl}
                                                className="w-full h-full object-cover"
                                                controls
                                                autoPlay
                                                muted
                                            />
                                        </div>
                                    ) : (
                                        <div className="w-full aspect-video rounded-2xl border-2 border-dashed border-white/10 bg-white/[0.02] flex items-center justify-center">
                                            <div className="text-center opacity-30">
                                                <Video size={32} className="mx-auto mb-3" />
                                                <p className="text-xs uppercase font-bold tracking-widest">No Media Attached</p>
                                            </div>
                                        </div>
                                    )}

                                    <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
                                        <h3 className="text-white/40 text-[10px] font-black uppercase tracking-[0.15em] mb-4 flex items-center gap-2">
                                            <FileText size={12} /> Briefing
                                        </h3>
                                        <p className="text-white/80 text-sm leading-relaxed whitespace-pre-wrap font-medium">
                                            {activeStep?.description || "No description provided for this location."}
                                        </p>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </div>
            </motion.div>
        </div>
    );
}
