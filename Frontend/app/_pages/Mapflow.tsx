"use client";

import React, { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import { useCurrentUserStore } from "@/stores/appStore";
import { useCategoryStore } from "@/stores/categoryStore";
import { usePinStore } from "@/stores/pinStore";
import { showError } from "@/utils/toast";

import Sidebar from "@/app/_components/_sidebar-component/Sidebar";
import PinForm from "@/app/_components/PinForm";
import MapLoader from "@/app/_components/MapLoader";

const MapView = dynamic(() => import("@/app/_components/_map-component/MapView"), {
  ssr: false,
});

export default function MapFlow() {
  const router = useRouter();
  const mapRef = useRef<any>(null);

  const { user, initialized, bootstrapUser } = useCurrentUserStore();
  const categories = useCategoryStore((s) => s.categories);
  const fetchCategories = useCategoryStore((s) => s.fetchCategories);
  const pins = usePinStore((s) => s.pins);
  const fetchPins = usePinStore((s) => s.fetchPins);

  const [formOpen, setFormOpen] = useState(false);
  const [formData, setFormData] = useState<any>(null);
  const [isMapFlying, setIsMapFlying] = useState(false);

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
    }
  }, [initialized, user, fetchCategories, fetchPins]);

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
      />

      <div className="relative flex-1 h-screen w-full overflow-hidden">
        <MapView
          pins={pins as any} 
          mapRef={mapRef}
          onMapClick={handleMapClick}
          onSelectPin={() => { }}
          openWalkthrough={() => { }}
        />

        <MapLoader isVisible={isMapFlying} />
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
    </div>
  );
}