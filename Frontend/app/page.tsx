"use client";
import { useEffect, useState } from "react";
import { useAuthStore } from "@/stores/authStore";
import LandingPage from "./_pages/LandingPage";
import MapFlow from "./_pages/Mapflow";

export default function Page() {
  const { user } = useAuthStore() as any;
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);
  if (!mounted) return null;
  return (
    <>
      {user ? <MapFlow /> : <LandingPage />}
    </>
  );
}
