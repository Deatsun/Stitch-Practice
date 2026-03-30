import { EpisodeCard } from "@/app/components/episodes/episode-card";
import type { EpisodeItem } from "@/app/lib/types/episodes/types";

interface EpisodeGridProps {
  episodes: EpisodeItem[];
}

export function EpisodeGrid({ episodes }: EpisodeGridProps) {
  if (episodes.length === 0) {
    return (
      <div className="rounded-xl border border-white/10 bg-white/5 px-6 py-10 text-center text-[var(--color-muted)]">
        No episodes found.
      </div>
    );
  }

  return (
    <div className="mx-auto grid max-w-7xl grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
      {episodes.map((episode) => (
        <EpisodeCard key={episode.id} episode={episode} />
      ))}
    </div>
  );
}