"use client";

import { useEffect, useState } from "react";

type AccessMode = "guest" | "authenticated" | null;

export function useAccessMode() {
  const [accessMode, setAccessMode] = useState<AccessMode>(null);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const storedMode = localStorage.getItem("access_mode");

    if (storedMode === "guest") {
      setAccessMode("guest");
    } else {
      setAccessMode("authenticated");
    }

    setIsReady(true);
  }, []);

  return {
    accessMode,
    isGuest: accessMode === "guest",
    isAuthenticated: accessMode === "authenticated",
    isReady,
  };
}