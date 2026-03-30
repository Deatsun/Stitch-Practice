"use client";

import { useEffect, useMemo, useState } from "react";
import { EpisodeGrid } from "@/app/components/episodes/episode-grid";
import { SearchBar } from "@/app/components/ui/search-bar";
import type {
  EpisodeItem,
  EpisodeResponse,
} from "@/app/lib/types/episodes/types";

export function EpisodeSection() {
  const [episodes, setEpisodes] = useState<EpisodeItem[]>([]);
  const [totalCount, setTotalCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");

  useEffect(() => {
    const fetchEpisodes = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await fetch("/api/episodes");

        if (!response.ok) {
          throw new Error("Failed to fetch episodes");
        }

        const data: EpisodeResponse = await response.json();

        setEpisodes(data.results ?? []);
        setTotalCount(data.info?.count ?? 0);
      } catch {
        setError("Failed to load episodes.");
      } finally {
        setLoading(false);
      }
    };

    fetchEpisodes();
  }, []);

  const filteredEpisodes = useMemo(() => {
    const normalizedSearch = search.trim().toLowerCase();

    if (!normalizedSearch) {
      return episodes;
    }

    return episodes.filter((episode) => {
      return (
        episode.name.toLowerCase().includes(normalizedSearch) ||
        episode.episode.toLowerCase().includes(normalizedSearch) ||
        episode.air_date.toLowerCase().includes(normalizedSearch)
      );
    });
  }, [episodes, search]);

  return (
    <section className="relative min-h-screen px-6 py-12 md:px-16 md:py-24">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute right-0 top-0 h-1/3 w-1/3 rounded-full bg-lime-300/5 blur-[120px]" />
        <div className="absolute bottom-0 left-0 h-1/2 w-1/2 rounded-full bg-[var(--color-primary)]/5 blur-[160px]" />
      </div>

      <header className="mx-auto mb-16 max-w-7xl">
        <h1 className="mb-4 text-5xl font-bold tracking-tighter text-[var(--color-primary)] md:text-7xl">
          Episodes Archive
        </h1>

        <p className="max-w-2xl text-lg leading-relaxed text-[var(--color-muted)] md:text-xl">
          Chronological database of all multiversal events and narrative
          timelines.
        </p>

        <div className="mt-8 h-px w-full bg-gradient-to-r from-white/10 to-transparent" />
      </header>

      <div className="mx-auto mb-10 max-w-7xl">
        <SearchBar
          value={search}
          onChange={setSearch}
          placeholder="Search episodes..."
        />
      </div>

      {loading ? (
        <div className="mx-auto max-w-7xl rounded-xl border border-white/10 bg-white/5 px-6 py-10 text-center text-[var(--color-muted)]">
          Loading episodes...
        </div>
      ) : error ? (
        <div className="mx-auto max-w-7xl rounded-xl border border-red-400/20 bg-red-400/10 px-6 py-10 text-center text-red-300">
          {error}
        </div>
      ) : (
        <>
          <EpisodeGrid episodes={filteredEpisodes} />

          <div className="mx-auto mt-10 max-w-7xl text-right">
            <p className="text-xs uppercase tracking-[0.25em] text-[var(--color-muted)]">
              Showing {filteredEpisodes.length} of {totalCount} episodes
            </p>
          </div>
        </>
      )}
    </section>
  );
}