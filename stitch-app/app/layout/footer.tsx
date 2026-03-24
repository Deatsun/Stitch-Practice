export function Footer() {
  return (
    <footer className="mt-20 flex w-full flex-col items-center justify-center gap-4 border-t border-[var(--color-outline)]/15 bg-black py-12">
      <div className="mb-2 flex items-center gap-2">
        <span className="text-xl font-bold tracking-tighter text-[var(--color-primary)]">
          Portal Archive
        </span>
        <div className="h-1.5 w-1.5 rounded-full bg-[var(--color-primary)]" />
      </div>

      <div className="mb-4 flex gap-8">
        <a
          href="#"
          className="text-sm tracking-wide text-[var(--color-muted)] transition-colors hover:text-[var(--color-primary-strong)]"
        >
          Citadel Protocol
        </a>
        <a
          href="#"
          className="text-sm tracking-wide text-[var(--color-muted)] transition-colors hover:text-[var(--color-primary-strong)]"
        >
          Privacy
        </a>
        <a
          href="#"
          className="text-sm tracking-wide text-[var(--color-muted)] transition-colors hover:text-[var(--color-primary-strong)]"
        >
          API Docs
        </a>
      </div>

      <p className="text-sm tracking-wide text-[var(--color-muted)] opacity-50">
        © 2124 Interdimensional Council of Ricks
      </p>
    </footer>
  );
}