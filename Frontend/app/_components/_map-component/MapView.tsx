"use client";

import { useEffect, useState } from "react";
import { MapContainer, TileLayer } from "react-leaflet";
import { MapViewProps } from "@/app/types";
import { useMapThemeStore } from "@/stores/mapThemeStore";
import PinMarker from "@/app/_components/_map-component/PinMarker";
import MapClickHandler from "@/app/_components/_map-component/MapClickHandler";
import { Search, Loader2 } from "lucide-react";
import toast from "react-hot-toast";

export default function MapView({pins, mapRef, onMapClick, onSelectPin, openWalkthrough, readonly}: MapViewProps) {
  const { mapTheme, setMapTheme, bootstrapTheme } = useMapThemeStore();
  const [searchQuery, setSearchQuery] = useState("");
  const [searching, setSearching] = useState(false);

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
      mapRef.current.flyTo([20.5937, 78.9629], 5, { animate: true, duration: 1.5 });
    }
  };

  return (
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
        <button
          type="button"
          onClick={handleReset}
          className={`px-5 py-2.5 rounded-2xl border font-bold text-[10px] uppercase tracking-wider cursor-pointer backdrop-blur-xl shadow-2xl transition-all active:scale-90
            ${mapTheme === "dark" ? "bg-zinc-900/90 text-zinc-400 border-zinc-700 hover:border-zinc-500" : "bg-white/90 text-zinc-600 border-zinc-200 hover:border-zinc-400"}`}
        >
          Reset
        </button>

        {!readonly && (
          <button
            type="button"
            onClick={openWalkthrough}
            className="px-5 py-2.5 rounded-2xl border font-bold text-[10px] uppercase tracking-wider bg-indigo-600 text-white border-indigo-400 cursor-pointer shadow-[0_0_20px_rgba(79,70,229,0.3)] transition-all hover:scale-105 active:scale-90"
          >
            Tour
          </button>
        )}

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
    </div>
  );
}