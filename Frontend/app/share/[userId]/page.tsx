"use client";

import { useEffect, useState, use, useRef } from "react";
import { usePinStore } from "@/stores/pinStore";
import { Loader2 } from "lucide-react";
import dynamic from "next/dynamic";

const MapView = dynamic(() => import("@/app/_components/_map-component/MapView"), {
  ssr: false,
  loading: () => (
    <div className="h-screen w-full flex items-center justify-center bg-[#0a0a0c]">
      <Loader2 className="animate-spin text-[#7c5cfc]" size={30} />
    </div>
  ),
});

export default function SharePage({ params }: { params: Promise<{ userId: string }> }) {
  const resolvedParams = use(params);
  const userId = resolvedParams.userId;
  const dummyMapRef = useRef(null);

  const fetchPins = usePinStore((state) => state.fetchPins);
  const pins = usePinStore((state) => state.pins);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const init = async () => {
      const decodedEmail = decodeURIComponent(userId);
      await fetchPins(decodedEmail);
      setLoading(false);
    };
    init();
  }, [userId, fetchPins]);

  if (loading) {
    return (
      <div className="h-screen bg-[#0a0a0c] flex flex-col items-center justify-center">
        <Loader2 className="animate-spin text-[#7c5cfc]" size={40} />
        <span className="mt-4 text-white/50 text-xs font-mono tracking-widest uppercase animate-pulse">
          Decrypting Map Data...
        </span>
      </div>
    );
  }

  return (
    <div className="h-screen w-full bg-[#0a0a0c] relative overflow-hidden">
      {/* Live Status Indicator */}
      <div className="absolute top-8 left-8 z-[100]">
        <div className="flex items-center gap-3 bg-black/50 backdrop-blur-2xl px-6 py-3 rounded-2xl border border-white/10 shadow-[0_0_30px_rgba(0,0,0,0.5)]">
          <div className="relative flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500 shadow-[0_0_10px_#22c55e]"></span>
          </div>
          <span className="text-sm font-black uppercase tracking-[0.3em] text-white drop-shadow-md">
            Live View
          </span>
        </div>
      </div>

      <div className="absolute inset-0 w-full h-full">
        <MapView
          pins={pins as any}
          readonly={true}
          onMapClick={() => { }}
          onSelectPin={() => { }}
          openWalkthrough={() => { }}
          mapRef={dummyMapRef}
        />
      </div>

      <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-transparent via-white/[0.02] to-transparent h-[2px] w-full animate-scanline z-[50]" />
    </div>
  );
}