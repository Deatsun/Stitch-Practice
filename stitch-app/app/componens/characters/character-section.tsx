"use client";

import { useEffect, useState } from "react";
import { CharacterGrid } from "@/app/componens/characters/character-grid";
import type { Character } from "@/app/lib/types/characters/types";

export function CharactersSection() {
  const [characters, setCharacters] = useState<Character[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCharacters = async () => {
      try {
        setIsLoading(true);
        setError(null);

        const response = await fetch("/api/characters");

        if (!response.ok) {
          throw new Error("Failed to fetch characters");
        }

        const data = await response.json();
        setCharacters(data.results ?? []);
      } catch (err) {
        setError("Nem sikerült betölteni a karaktereket.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchCharacters();
  }, []);

  return (
    <section className="mx-auto max-w-7xl px-6 pb-24 pt-32 md:px-12">
      <header className="mb-16">
        <h1 className="mb-4 text-5xl font-bold tracking-tighter text-[var(--color-primary)] md:text-7xl">
          The Archive
        </h1>
        <p className="max-w-xl text-lg leading-relaxed text-[var(--color-muted)]">
          A definitive catalog of all known biological and cybernetic entities
          across the Central Finite Curve.
        </p>
      </header>

      {isLoading && (
        <p className="text-[var(--color-muted)]">Karakterek betöltése...</p>
      )}

      {error && <p className="text-[var(--color-error)]">{error}</p>}

      {!isLoading && !error && <CharacterGrid characters={characters} />}
    </section>
  );
}