import { LocationCard } from "@/app/componens/location/location-card"
import type { LocationItem } from "@/app/lib/types/location/types";

interface LocationGridProps {
  locations: LocationItem[];
}

export function LocationGrid({ locations }: LocationGridProps) {
  if (locations.length === 0) {
    return (
      <div className="rounded-xl border border-white/10 bg-white/5 px-6 py-10 text-center text-[var(--color-muted)]">
        No matching dimensions found.
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
      {locations.map((location) => (
        <LocationCard key={location.id} location={location} />
      ))}
    </div>
  );
}