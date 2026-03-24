import { CharacterCard } from "@/app/componens/characters/character-card";
import type { Character } from "@/app/lib/types";

type CharacterGridProps = {
  characters: Character[];
};

export function CharacterGrid({ characters }: CharacterGridProps) {
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5">
      {characters.map((character) => (
        <CharacterCard key={character.id} character={character} />
      ))}
    </div>
  );
}