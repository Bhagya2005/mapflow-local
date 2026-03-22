"use client";

import { useEffect, useState } from "react";
import { MapContainer, TileLayer } from "react-leaflet";
import { MapViewProps } from "@/app/types";
import { useMapThemeStore } from "@/stores/mapThemeStore";
import PinMarker from "@/app/_components/_map-component/PinMarker";
import MapClickHandler from "@/app/_components/_map-component/MapClickHandler";
import { Search, Loader2, Info, X, PlaySquare, LocateFixed, Play } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import toast from "react-hot-toast";
import PlaygroundModal from "@/app/_components/PlaygroundModal";
import tourData from "@/app/_data/tour-data.json";

export default function MapView({ pins, mapRef, onMapClick, onSelectPin, openWalkthrough, readonly }: MapViewProps) {
  const { mapTheme, setMapTheme, bootstrapTheme, defaultView, setDefaultView } = useMapThemeStore();
  const [searchQuery, setSearchQuery] = useState("");
  const [searching, setSearching] = useState(false);
  const [showGuide, setShowGuide] = useState(true);
  const [showPlayground, setShowPlayground] = useState(false);

  useEffect(() => {
    bootstrapTheme();
  }, [bootstrapTheme]);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;

    setSearching(true);
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(searchQuery)}&limit=1`
      );
      const data = await response.json();

      if (data && data.length > 0) {
        const location = data[0];
        const bbox = location.boundingbox;

        if (mapRef && mapRef.current) {
          const corner1: [number, number] = [parseFloat(bbox[0]), parseFloat(bbox[2])];
          const corner2: [number, number] = [parseFloat(bbox[1]), parseFloat(bbox[3])];

          mapRef.current.flyToBounds([corner1, corner2], {
            padding: [40, 40],
            duration: 2,
            animate: true
          });
        }
      } else {
        toast.error("No results found for the search query.");
      }
    } catch (error) {
      console.error("Search error:", error);
    } finally {
      setSearching(false);
    }
  };

  const handleReset = () => {
    if (mapRef && mapRef.current) {
      const center = defaultView?.center || [20.5937, 78.9629];
      const zoom = defaultView?.zoom || 5;
      mapRef.current.flyTo(center, zoom, { animate: true, duration: 1.5 });
    }
  };

  const handleSetDefault = () => {
    if (mapRef && mapRef.current && setDefaultView) {
      const center = mapRef.current.getCenter();
      const zoom = mapRef.current.getZoom();
      setDefaultView([center.lat, center.lng], zoom);
      toast.success("Default map position saved!");
    }
  };

  return (
    <>
      <PlaygroundModal isOpen={showPlayground} onClose={() => setShowPlayground(false)} />
      <div className="h-screen w-full relative font-sans overflow-hidden pointer-events-none">

        <div className="absolute inset-0 z-0 pointer-events-auto">
          <MapContainer
            ref={mapRef}
            center={[20.5937, 78.9629]}
            zoom={5}
            zoomControl={false}
            className="h-full w-full"
          >
            <TileLayer
              url={mapTheme === "dark"
                ? "https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
                : "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              }
            />
            <MapClickHandler onMapClick={onMapClick} />
            {pins.map((p) => (
              <PinMarker key={p._id || p.id} pin={p} onSelectPin={onSelectPin} />
            ))}
          </MapContainer>
        </div>

        {!readonly && <div
          style={{ zIndex: 1000 }}
          className="absolute top-6 left-1/2 -translate-x-1/2 w-full max-w-[550px] px-4 pointer-events-auto"
        >
          <form
            onSubmit={handleSearch}
            className={`relative flex items-center transition-all duration-300 rounded-[2rem] border shadow-2xl backdrop-blur-2xl p-1.5
            ${mapTheme === "dark" ? "bg-black/50 border-white/10 border-2 focus-within:border-indigo-500/50" : "bg-white/90 border-zinc-200 focus-within:border-indigo-400"}`}
          >
            <div className="pl-4 text-zinc-500">
              {searching ? <Loader2 className="animate-spin" size={20} /> : <Search size={20} />}
            </div>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search country, city, or place..."
              className={`w-full bg-transparent p-3 outline-none text-sm font-medium transition-colors
              ${mapTheme === "dark" ? "text-white placeholder:text-zinc-600" : "text-zinc-900 placeholder:text-zinc-400"}`}
            />
            <button
              type="submit"
              disabled={searching}
              className="bg-indigo-600 hover:bg-indigo-500 text-white px-7 py-2.5 rounded-[1.5rem] text-[10px] font-black uppercase tracking-[0.15em] transition-all active:scale-95 disabled:opacity-50"
            >
              Search
            </button>
          </form>
        </div>}

        <div
          style={{ zIndex: 1000 }}
          className="absolute top-6 right-6 flex flex-row items-center gap-3 pointer-events-auto"
        >
          {!readonly && (
            <button
              type="button"
              onClick={handleSetDefault}
              className={`w-10 h-10 flex items-center justify-center flex-shrink-0 rounded-2xl border cursor-pointer backdrop-blur-xl shadow-2xl transition-all active:scale-90
              ${mapTheme === "dark" ? "bg-zinc-900/90 text-emerald-400 border-zinc-700 hover:border-emerald-500 hover:text-emerald-300" : "bg-white/90 text-emerald-600 border-zinc-200 hover:border-emerald-400 hover:text-emerald-700"}
            `}
              title="Set Current View as Default Reset Position"
            >
              <LocateFixed size={18} />
            </button>
          )}

          <button
            type="button"
            onClick={handleReset}
            className={`px-5 py-2.5 flex-shrink-0 min-w-[80px] rounded-2xl border font-bold text-[10px] uppercase tracking-wider cursor-pointer backdrop-blur-xl shadow-2xl transition-all active:scale-90
            ${mapTheme === "dark" ? "bg-zinc-900/90 text-zinc-400 border-zinc-700 hover:border-zinc-500" : "bg-white/90 text-zinc-600 border-zinc-200 hover:border-zinc-400"}`}
          >
            Reset
          </button>

          <div
            onClick={() => setMapTheme(mapTheme === "dark" ? "light" : "dark")}
            className={`relative flex items-center cursor-pointer p-1 rounded-full border transition-all duration-500 w-[74px] h-[36px] backdrop-blur-md
            ${mapTheme === "dark" ? "bg-zinc-900 border-zinc-700" : "bg-zinc-100 border-zinc-300"}`}
          >
            <div className={`absolute w-7 h-7 rounded-full transition-all duration-500 flex items-center justify-center shadow-lg
            ${mapTheme === "dark" ? "translate-x-[36px] bg-indigo-500" : "translate-x-0 bg-white"}`}>
              {mapTheme === "dark" ? <span className="text-[14px]">🌙</span> : <span className="text-[14px]">☀️</span>}
            </div>
          </div>
        </div>

        {/* Bottom-Right: Tour & Playground */}
        {!readonly && (
          <div
            style={{ zIndex: 1000 }}
            className={`absolute bottom-8 right-6 pointer-events-auto flex flex-col gap-2 p-3 rounded-[24px] border backdrop-blur-[40px] shadow-2xl transition-all duration-500
              ${mapTheme === "dark"
                ? "bg-[#09090b]/80 border-white/10 shadow-[0_20px_40px_-10px_rgba(0,0,0,0.6)]"
                : "bg-[#f4f5f7]/95 border-zinc-200 shadow-[0_20px_40px_-10px_rgba(0,0,0,0.08)]"
              }`}
          >
            <button
              type="button"
              onClick={openWalkthrough}
              className={`px-5 py-2.5 rounded-2xl border font-bold text-[10px] uppercase tracking-wider cursor-pointer transition-all hover:scale-105 active:scale-90 flex items-center gap-2
                ${mapTheme === "dark"
                  ? "bg-indigo-500/10 text-indigo-400 border-indigo-500/20 hover:bg-indigo-500 hover:text-white hover:border-indigo-400"
                  : "bg-indigo-50 text-indigo-600 border-indigo-200/50 hover:bg-indigo-600 hover:text-white hover:border-indigo-400"
                }`}
            >
              <Play size={14} /> Tour
            </button>
            <button
              type="button"
              onClick={() => setShowPlayground(true)}
              className={`px-5 py-2.5 rounded-2xl border font-bold text-[10px] uppercase tracking-wider cursor-pointer transition-all hover:scale-105 active:scale-90 flex items-center gap-2
                ${mapTheme === "dark"
                  ? "bg-purple-500/10 text-purple-400 border-purple-500/20 hover:bg-purple-500 hover:text-white hover:border-purple-400"
                  : "bg-purple-50 text-purple-600 border-purple-200/50 hover:bg-purple-600 hover:text-white hover:border-purple-400"
                }`}
            >
              <PlaySquare size={14} /> Playground
            </button>
          </div>
        )}

        {!readonly && (
          <div style={{ zIndex: 1000 }} className="absolute top-[88px] right-6 pointer-events-auto flex flex-col items-end">
            <AnimatePresence mode="wait">
              {showGuide ? (
                <motion.div
                  key="guide-panel"
                  initial={{ opacity: 0, x: 20, scale: 0.95 }}
                  animate={{ opacity: 1, x: 0, scale: 1 }}
                  exit={{ opacity: 0, x: 20, scale: 0.95 }}
                  className={`w-72 rounded-[28px] border shadow-2xl backdrop-blur-3xl overflow-hidden transition-colors
                  ${mapTheme === "dark"
                      ? "bg-[#09090b]/85 border-white/10 shadow-[0_30px_60px_-15px_rgba(0,0,0,0.6)]"
                      : "bg-[#f4f5f7]/95 border-zinc-200 shadow-[0_30px_60px_-15px_rgba(0,0,0,0.1)]"}`}
                >
                  <div className={`px-5 py-4 flex justify-between items-center border-b ${mapTheme === 'dark' ? 'border-white/5' : 'border-zinc-100'}`}>
                    <h3 className={`text-sm font-black tracking-tight flex items-center gap-3 ${mapTheme === 'dark' ? 'text-white' : 'text-zinc-800'}`}>
                      <div className="w-7 h-7 rounded-xl bg-indigo-500 flex items-center justify-center shadow-lg shadow-indigo-500/30">
                        <Info size={14} className="text-white" strokeWidth={3} />
                      </div>
                      Quick Start
                    </h3>
                    <button onClick={() => setShowGuide(false)} className={`p-2 rounded-xl transition-all ${mapTheme === 'dark' ? 'hover:bg-white/10 text-white/50 hover:text-white' : 'hover:bg-zinc-100 text-zinc-400 hover:text-zinc-600'}`}>
                      <X size={16} />
                    </button>
                  </div>
                  <div className="p-5 space-y-5 max-h-[420px] overflow-y-auto glass-scroll pr-3">
                    {tourData.map((step, index) => (
                      <div key={step.id} className="flex gap-4 items-start group">
                        <div className={`w-7 h-7 rounded-full shrink-0 flex items-center justify-center text-[10px] font-black shadow-sm backdrop-blur-md transition-transform group-hover:scale-110 border
                          ${index === 0 ? "bg-indigo-500/10 text-indigo-500 border-indigo-500/20" :
                            index === 1 ? "bg-emerald-500/10 text-emerald-500 border-emerald-500/20" :
                              "bg-amber-500/10 text-amber-500 border-amber-500/20"}`}
                        >
                          {index + 1}
                        </div>
                        <div>
                          <h4 className={`text-xs font-bold leading-none ${mapTheme === 'dark' ? 'text-white/90' : 'text-zinc-700'}`}>{step.title}</h4>
                          <p className={`text-[10px] mt-1.5 leading-relaxed ${mapTheme === 'dark' ? 'text-white/40' : 'text-zinc-400'}`}>{step.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>
              ) : (
                <motion.button
                  key="guide-btn"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setShowGuide(true)}
                  className={`w-11 h-11 rounded-2xl flex items-center justify-center shadow-2xl border backdrop-blur-xl transition-all cursor-pointer
                  ${mapTheme === "dark"
                      ? "bg-indigo-600/20 border-indigo-500/30 text-indigo-400 hover:bg-indigo-600 hover:text-white hover:shadow-indigo-500/30"
                      : "bg-white border-zinc-200 text-indigo-600 shadow-zinc-200"}`}
                >
                  <Info size={20} strokeWidth={2.5} />
                </motion.button>
              )}
            </AnimatePresence>
          </div>
        )}
      </div>
    </>
  );
}