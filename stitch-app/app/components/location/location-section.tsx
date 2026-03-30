"use client";

import { useEffect, useMemo, useState } from "react";
import { LocationGrid } from "@/app/components/location/location-grid";
import { SearchBar } from "@/app/components/ui/search-bar";
import type { LocationItem } from "@/app/lib/types/location/types";

const filterOptions = [
  "All Realms",
  "Planets",
  "Space Stations",
  "Microverses",
];

function matchesCategory(location: LocationItem, activeFilter: string) {
  const type = location.type.toLowerCase();

  if (activeFilter === "All Realms") return true;
  if (activeFilter === "Planets") return type.includes("planet");
  if (activeFilter === "Space Stations") return type.includes("space station");
  if (activeFilter === "Microverses") return type.includes("microverse");

  return true;
}

export function LocationSection() {
  const [locations, setLocations] = useState<LocationItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [activeFilter, setActiveFilter] = useState("All Realms");

  useEffect(() => {
    const fetchLocations = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await fetch("/api/location");

        if (!response.ok) {
          throw new Error("Failed to fetch locations");
        }

        const data = await response.json();
        setLocations(data.results ?? []);
      } catch {
        setError("Failed to load dimensions.");
      } finally {
        setLoading(false);
      }
    };

    fetchLocations();
  }, []);

  const filteredLocations = useMemo(() => {
    const normalizedSearch = search.trim().toLowerCase();

    return locations.filter((location) => {
      const matchesSearch =
        normalizedSearch === "" ||
        location.name.toLowerCase().includes(normalizedSearch) ||
        location.dimension.toLowerCase().includes(normalizedSearch) ||
        location.type.toLowerCase().includes(normalizedSearch);

      return matchesSearch && matchesCategory(location, activeFilter);
    });
  }, [locations, search, activeFilter]);

  return (
    <section className="mx-auto max-w-[1440px] px-6 pb-24 pt-16">
      <header className="mb-16 space-y-4">
        <h1 className="text-7xl font-bold uppercase leading-none tracking-tighter text-[var(--color-primary)] md:text-8xl">
          Dimensions
        </h1>

        <p className="max-w-2xl text-xl leading-relaxed text-[var(--color-muted)] md:text-2xl">
          A comprehensive database of all known locations, planets, and
          sub-realms across the multiverse.
        </p>
      </header>

      <div className="mb-12 flex flex-col items-center justify-between gap-4 md:flex-row">
        <SearchBar
          value={search}
          onChange={setSearch}
          placeholder="Search coordinates..."
        />

        <div className="flex w-full gap-3 overflow-x-auto pb-2 md:w-auto">
          {filterOptions.map((option) => {
            const isActive = activeFilter === option;

            return (
              <button
                key={option}
                type="button"
                onClick={() => setActiveFilter(option)}
                className={`whitespace-nowrap rounded-full px-6 py-2 text-sm transition-colors ${
                  isActive
                    ? "border border-[var(--color-primary)]/30 bg-white/10 text-[var(--color-primary)]"
                    : "bg-white/5 text-[var(--color-muted)] hover:bg-white/10 hover:text-white"
                }`}
              >
                {option}
              </button>
            );
          })}
        </div>
      </div>

      {loading ? (
        <div className="rounded-xl border border-white/10 bg-white/5 px-6 py-10 text-center text-[var(--color-muted)]">
          Loading dimensions...
        </div>
      ) : error ? (
        <div className="rounded-xl border border-red-400/20 bg-red-400/10 px-6 py-10 text-center text-red-300">
          {error}
        </div>
      ) : (
        <LocationGrid locations={filteredLocations} />
      )}

      <div className="mt-20 flex flex-col items-center space-y-6">
        <button
          type="button"
          className="rounded-full border border-[var(--color-primary)]/30 bg-transparent px-12 py-4 text-sm uppercase tracking-widest text-[var(--color-primary)] transition-all hover:bg-white/5 active:scale-95"
        >
          Access Next Sector
        </button>

        <p className="text-[10px] uppercase tracking-[0.4em] text-[var(--color-muted)]">
          Showing {filteredLocations.length} of {locations.length} multiversal
          coordinates
        </p>
      </div>
    </section>
  );
}