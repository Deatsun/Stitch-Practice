import type { EpisodeItem } from "@/app/lib/types/episodes/types";

interface EpisodeCardProps {
  episode: EpisodeItem;
}

function getSeasonNumber(code: string) {
  const match = code.match(/S(\d+)E(\d+)/i);
  return match ? Number(match[1]) : 0;
}

function getSeasonStyles(season: number) {
  switch (season) {
    case 1:
      return {
        border: "border-l-lime-400",
        buttonBorder: "border-lime-400/40",
        buttonText: "text-lime-400",
        buttonHover: "hover:bg-lime-400/10 hover:border-lime-400",
      };
    case 2:
      return {
        border: "border-l-[var(--color-primary)]",
        buttonBorder: "border-[var(--color-primary)]/40",
        buttonText: "text-[var(--color-primary)]",
        buttonHover:
          "hover:bg-[var(--color-primary)]/10 hover:border-[var(--color-primary)]",
      };
    case 3:
      return {
        border: "border-l-yellow-400",
        buttonBorder: "border-yellow-400/40",
        buttonText: "text-yellow-400",
        buttonHover: "hover:bg-yellow-400/10 hover:border-yellow-400",
      };
    case 4:
      return {
        border: "border-l-amber-200",
        buttonBorder: "border-amber-200/40",
        buttonText: "text-amber-200",
        buttonHover: "hover:bg-amber-200/10 hover:border-amber-200",
      };
    case 5:
      return {
        border: "border-l-orange-500",
        buttonBorder: "border-orange-500/40",
        buttonText: "text-orange-500",
        buttonHover: "hover:bg-orange-500/10 hover:border-orange-500",
      };
    default:
      return {
        border: "border-l-white/20",
        buttonBorder: "border-white/20",
        buttonText: "text-white",
        buttonHover: "hover:bg-white/10 hover:border-white/30",
      };
  }
}

export function EpisodeCard({ episode }: EpisodeCardProps) {
  const season = getSeasonNumber(episode.episode);
  const styles = getSeasonStyles(season);

  return (
    <article
      className={`group relative flex h-full flex-col justify-between rounded-xl border-l-4 bg-white/5 p-6 transition-all duration-300 hover:-translate-y-1 hover:bg-white/10 ${styles.border}`}
    >
      <div>
        <span className="mb-2 block text-[10px] tracking-[0.2em] text-[var(--color-muted)]">
          {episode.episode}
        </span>

        <h3 className="text-xl font-bold leading-tight text-white transition-colors group-hover:text-[var(--color-primary)]">
          {episode.name}
        </h3>

        <div className="mt-6">
          <span className="block text-[10px] uppercase tracking-wider text-[var(--color-muted)]">
            Air Date
          </span>
          <p className="mt-1 text-sm font-medium text-white">{episode.air_date}</p>
        </div>
      </div>

      <button
        type="button"
        className={`mt-8 w-full rounded border px-4 py-2 text-[10px] font-bold uppercase tracking-[0.2em] transition-all duration-300 ${styles.buttonBorder} ${styles.buttonText} ${styles.buttonHover}`}
      >
        View Details
      </button>
    </article>
  );
}