import type { Character } from "@/app/lib/types";

type CharacterCardProps = {
  character: Character;
};

export function CharacterCard({ character }: CharacterCardProps) {
  const statusDotClass =
    character.status === "Alive"
      ? "bg-[var(--color-primary)]"
      : character.status === "Dead"
      ? "bg-[var(--color-error)]"
      : "bg-[var(--color-outline-strong)]";

  return (
    <div className="group relative overflow-hidden rounded-xl bg-[var(--color-surface-container)] transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_0_25px_-5px_rgba(241,255,210,0.25)]">
      <div className="aspect-square overflow-hidden">
        <img
          src={character.image}
          alt={character.name}
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
      </div>

      <div className="p-5">
        <div className="mb-2 flex items-center gap-2">
          <span className={`h-2 w-2 rounded-full ${statusDotClass}`} />
          <span className="text-[10px] font-bold uppercase tracking-widest text-[var(--color-muted)]">
            {character.status} • {character.species}
          </span>
        </div>

        <h3 className="mb-3 text-xl font-bold text-[var(--color-primary)]">
          {character.name}
        </h3>

        <div>
          <p className="text-[10px] font-medium uppercase text-[var(--color-muted)]">
            Last seen
          </p>
          <p className="text-sm text-[var(--foreground)]">
            {character.location.name}
          </p>
        </div>
      </div>

      <div className="pointer-events-none absolute inset-0 rounded-xl border border-[var(--color-primary)]/0 transition-colors group-hover:border-[var(--color-primary)]/20" />
    </div>
  );
}