"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { CharacterGrid } from "@/app/components/characters/character-grid";
import { Pagination } from "@/app/components/ui/pagination";
import { SearchBar } from "@/app/components/ui/search-bar";
import type { Character } from "@/app/lib/types/characters/types";

interface CharacterResponse {
  info: {
    count: number;
    pages: number;
    next: string | null;
    prev: string | null;
  };
  results: Character[];
}

export function CharactersSection() {
  const sectionRef = useRef<HTMLElement | null>(null);

  const [characters, setCharacters] = useState<Character[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalCount, setTotalCount] = useState(0);

  useEffect(() => {
    const fetchCharacters = async () => {
      try {
        setIsLoading(true);
        setError(null);

        const response = await fetch(`/api/characters?page=${currentPage}`);

        if (!response.ok) {
          throw new Error("Failed to fetch characters");
        }

        const data: CharacterResponse = await response.json();

        setCharacters(data.results ?? []);
        setTotalPages(data.info?.pages ?? 1);
        setTotalCount(data.info?.count ?? 0);
      } catch {
        setError("Nem sikerült betölteni a karaktereket.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchCharacters();
  }, [currentPage]);

  useEffect(() => {
    if (sectionRef.current) {
      sectionRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [currentPage]);

  const filteredCharacters = useMemo(() => {
    const normalizedSearch = search.trim().toLowerCase();

    if (!normalizedSearch) return characters;

    return characters.filter((character) => {
      return (
        character.name.toLowerCase().includes(normalizedSearch) ||
        character.status.toLowerCase().includes(normalizedSearch) ||
        character.species.toLowerCase().includes(normalizedSearch)
      );
    });
  }, [characters, search]);

  return (
    <section
      ref={sectionRef}
      className="mx-auto max-w-7xl px-6 pb-24 pt-32 md:px-12"
    >
      <header className="mb-16">
        <h1 className="mb-4 text-5xl font-bold tracking-tighter text-[var(--color-primary)] md:text-7xl">
          The Archive
        </h1>

        <p className="max-w-xl text-lg leading-relaxed text-[var(--color-muted)]">
          A definitive catalog of all known biological and cybernetic entities
          across the Central Finite Curve.
        </p>
      </header>

      <div className="mb-10">
        <SearchBar
          value={search}
          onChange={setSearch}
          placeholder="Search characters..."
        />
      </div>

      {isLoading ? (
        <div className="rounded-xl border border-white/10 bg-white/5 px-6 py-10 text-center text-[var(--color-muted)]">
          Karakterek betöltése...
        </div>
      ) : error ? (
        <div className="rounded-xl border border-red-400/20 bg-red-400/10 px-6 py-10 text-center text-red-300">
          {error}
        </div>
      ) : filteredCharacters.length === 0 ? (
        <div className="rounded-xl border border-white/10 bg-white/5 px-6 py-10 text-center text-[var(--color-muted)]">
          No matching characters found.
        </div>
      ) : (
        <>
          <CharacterGrid characters={filteredCharacters} />

          <div className="mt-10 flex items-center justify-between gap-4">
            <p className="text-xs uppercase tracking-[0.25em] text-[var(--color-muted)]">
              Showing {filteredCharacters.length} of {totalCount} characters
            </p>
          </div>

          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
            className="mt-14"
          />
        </>
      )}
    </section>
  );
}