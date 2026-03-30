import type { LocationItem } from "@/app/lib/types/location/types";

interface LocationCardProps {
  location: LocationItem;
}

function getCategoryDotClass(type: string) {
  const normalizedType = type.toLowerCase();

  if (normalizedType.includes("planet")) return "bg-lime-400";
  if (normalizedType.includes("space station")) return "bg-yellow-300";
  if (normalizedType.includes("microverse")) return "bg-emerald-300";
  if (normalizedType.includes("cluster")) return "bg-cyan-300";

  return "bg-white/60";
}

function getResidentsLabel(count: number) {
  if (count === 0) return "No known residents";
  if (count === 1) return "1 resident";
  return `${count} residents`;
}

export function LocationCard({ location }: LocationCardProps) {
  const residentCount = location.residents.length;
  const categoryLabel = location.type?.trim() || "Unknown Type";

  return (
    <article className="group relative overflow-hidden rounded-xl border border-white/5 bg-white/5 transition-all duration-500 hover:bg-white/10">
      <div className="relative aspect-[16/10] overflow-hidden">
        <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-lime-200/10 via-white/5 to-cyan-200/10 p-12">
          <div className="flex h-full w-full items-center justify-center rounded-full border border-dashed border-[var(--color-primary)]/20">
            <span className="text-6xl opacity-40">◎</span>
          </div>
        </div>

        <div className="absolute inset-0 bg-gradient-to-t from-[#11131a] via-transparent to-transparent" />

        <div className="absolute right-4 top-4 flex items-center gap-2 rounded-full border border-white/10 bg-black/40 px-3 py-1 backdrop-blur-md">
          <span
            className={`h-2 w-2 rounded-full ${getCategoryDotClass(location.type)}`}
          />
          <span className="text-[10px] uppercase tracking-widest text-[var(--color-muted)]">
            {categoryLabel}
          </span>
        </div>
      </div>

      <div className="space-y-6 p-8">
        <div>
          <h3 className="mb-1 text-3xl font-bold tracking-tight text-[var(--color-primary)]">
            {location.name}
          </h3>

          <p className="text-xs uppercase tracking-[0.2em] text-[var(--color-muted)]">
            {location.dimension || "Unknown dimension"}
          </p>
        </div>

        <div className="grid grid-cols-2 gap-4 border-t border-white/10 pt-6">
          <div>
            <span className="mb-1 block text-[10px] uppercase tracking-widest text-[var(--color-muted)]">
              Type
            </span>
            <span className="text-sm font-medium text-white">
              {categoryLabel}
            </span>
          </div>

          <div>
            <span className="mb-1 block text-[10px] uppercase tracking-widest text-[var(--color-muted)]">
              Residents
            </span>
            <span className="text-sm font-medium text-white">
              {getResidentsLabel(residentCount)}
            </span>
          </div>
        </div>
      </div>
    </article>
  );
}