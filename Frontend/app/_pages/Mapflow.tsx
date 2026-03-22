"use client";

import React, { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import { useCurrentUserStore } from "@/stores/appStore";
import { useCategoryStore } from "@/stores/categoryStore";
import { usePinStore } from "@/stores/pinStore";
import { useMapThemeStore } from "@/stores/mapThemeStore";
import { showError } from "@/utils/toast";

import Sidebar from "@/app/_components/_sidebar-component/Sidebar";
import PinForm from "@/app/_components/PinForm";
import MapLoader from "@/app/_components/MapLoader";
import MapTourModal from "@/app/_components/MapTourModal";
import { useWalkthroughStore } from "@/stores/walkthroughStore";

const MapView = dynamic(() => import("@/app/_components/_map-component/MapView"), {
  ssr: false,
});

export default function MapFlow() {
  const router = useRouter();
  const mapRef = useRef<any>(null);

  const { user, initialized, bootstrapUser } = useCurrentUserStore();
  const mapTheme = useMapThemeStore((s: any) => s.mapTheme);
  const isDark = mapTheme === "dark";

  const categories = useCategoryStore((s) => s.categories);
  const fetchCategories = useCategoryStore((s) => s.fetchCategories);
  const pins = usePinStore((s) => s.pins);
  const fetchPins = usePinStore((s) => s.fetchPins);

  const [formOpen, setFormOpen] = useState(false);
  const [formData, setFormData] = useState<any>(null);
  const [isMapFlying, setIsMapFlying] = useState(false);
  const [activePins, setActivePins] = useState<any[] | null>(null);

  const { showTour, setOpenTour } = useWalkthroughStore();

  useEffect(() => {
    if (!initialized) bootstrapUser();
  }, [initialized, bootstrapUser]);

  useEffect(() => {
    if (initialized && !user) router.replace("/login");
  }, [initialized, user, router]);

  useEffect(() => {
    if (initialized && user) {
      fetchCategories();
      fetchPins();
      setOpenTour(true);
    }
  }, [initialized, user, fetchCategories, fetchPins, setOpenTour]);

  const handleFlyTo = (pin: any) => {
    if (!mapRef.current) return;
    setIsMapFlying(true);
    mapRef.current.flyTo([pin.lat, pin.lng], 8, { duration: 0.9 });

    mapRef.current.once("moveend", () => {
      setTimeout(() => setIsMapFlying(false), 500);
    });
  };

  const handleMapClick = (lat: number, lng: number) => {
    if (categories.length === 0) {
      showError("Please create at least one category first!");
      return;
    }
    const defaultCategory = categories[0];
    usePinStore.setState({ editingPinId: null, pinForm: {} });
    setFormData({
      name: "", description: "", lat, lng,
      categoryId: defaultCategory.id,
      categories: [defaultCategory],
    });
    setFormOpen(true);
  };

  const handleEditPin = (pin: any) => {
    usePinStore.setState({ editingPinId: pin.id || pin._id });
    setFormData({ ...pin, categoryId: pin.categories?.[0]?.id || pin.categoryId });
    setFormOpen(true);
  };

  if (!initialized) return null;

  return (
    <div className="app relative min-h-screen bg-zinc-900 text-white overflow-hidden flex">

      <Sidebar
        mapRef={mapRef}
        onEditPin={handleEditPin}
        onFlyTo={handleFlyTo}
        onFilteredPinsChange={setActivePins}
      />

      <div className="relative flex-1 h-screen w-full overflow-hidden">
        <MapView
          pins={activePins !== null ? activePins : (pins as any)}
          mapRef={mapRef}
          onMapClick={handleMapClick}
          onSelectPin={() => { }}
          openWalkthrough={() => setOpenTour(true)}
        />

        <MapLoader isVisible={isMapFlying} />

        {/* Floating Map Statistics Footer */}
        {/* Floating Map Statistics Footer */}
        <div className={`absolute bottom-8 left-1/2 -translate-x-1/2 backdrop-blur-[40px] px-10 py-4 rounded-[28px] flex items-center gap-12 border transition-all duration-500 z-[1000] pointer-events-none
          ${isDark
            ? "bg-[#09090b]/40 border-white-[0.08] shadow-[0_30px_60px_-15px_rgba(0,0,0,0.8)]"
            : "bg-white/40 border-white/60 shadow-[0_30px_60px_-15px_rgba(0,0,0,0.1)]"}`}
        >
          <div className="flex flex-col items-center justify-center">
            <span className={`text-[9px] font-black tracking-[0.2em] uppercase mb-1.5 ${isDark ? "text-white/40" : "text-zinc-500"}`}>Total Pins</span>
            <div className="flex items-center gap-3">
              <div className="w-2.5 h-2.5 rounded-full bg-[#7c5cfc] shadow-[0_0_15px_rgba(124,92,252,0.8)] animate-pulse"></div>
              <span className={`text-2xl font-black tracking-tighter leading-none ${isDark ? "text-white" : "text-zinc-800"}`}>
                {pins.length.toString().padStart(2, '0')}
              </span>
            </div>
          </div>

          <div className={`w-[2px] h-10 rounded-full ${isDark ? "bg-white-[0.08]" : "bg-black-[0.08]"}`}></div>

          <div className="flex flex-col items-center justify-center">
            <span className={`text-[9px] font-black tracking-[0.2em] uppercase mb-1.5 ${isDark ? "text-white/40" : "text-zinc-500"}`}>Total Categories</span>
            <div className="flex items-center gap-3">
              <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 shadow-[0_0_15px_rgba(16,185,129,0.8)]"></div>
              <span className={`text-2xl font-black tracking-tighter leading-none ${isDark ? "text-white" : "text-zinc-800"}`}>
                {categories.length.toString().padStart(2, '0')}
              </span>
            </div>
          </div>
        </div>
      </div>

      {formOpen && formData && (
        <PinForm
          pin={formData}
          categories={categories}
          onSave={async (updatedPin: any) => {
            usePinStore.setState({ pinForm: updatedPin });
            await usePinStore.getState().savePin();
            setFormOpen(false);
            setFormData(null);
          }}
          onClose={() => {
            setFormOpen(false);
            setFormData(null);
            usePinStore.setState({ editingPinId: null });
          }}
        />
      )}

      {showTour && <MapTourModal />}
    </div>
  );
}