"use client";

import { useState } from "react";
import { LocationSection } from "@/app/components/location/location-section";
import { useAccessMode } from "@/app/lib/use-access-mode"
import { GuestLockModal } from "@/app/components/guest-lock-modal"

export default function LocationPage() {
  const { isGuest, isReady } = useAccessMode();
  const [isGuestModalOpen, setIsGuestModalOpen] = useState(false);

  const handleProtectedAction = () => {
    if (isGuest) {
      setIsGuestModalOpen(true);
      return;
    }

    console.log("Protected action allowed");
  };

  if (!isReady) return null;

  return (
    <main className="min-h-screen bg-[var(--background)] text-[var(--foreground)]">
      <LocationSection onProtectedAction={handleProtectedAction} />

      <GuestLockModal
        open={isGuestModalOpen}
        onClose={() => setIsGuestModalOpen(false)}
      />
    </main>
  );
}