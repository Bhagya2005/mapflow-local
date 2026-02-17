"use client";
import { useEffect } from "react";
import { useAuthStore } from "@/stores/authStore";

export default function LogoutPage() {
  const { logout, loading } = useAuthStore();
  useEffect(() => { logout(); }, []);

  return (
    <></>
  );
}