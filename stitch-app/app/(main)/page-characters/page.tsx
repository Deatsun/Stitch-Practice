import { CharactersSection } from "@/app/components/characters/character-section";

export default function Home() {
  return (
    <main className="min-h-screen bg-[var(--background)] text-[var(--foreground)]">
      <CharactersSection />
    </main>
  );
}