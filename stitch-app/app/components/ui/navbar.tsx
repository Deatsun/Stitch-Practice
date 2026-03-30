import Link from "next/link";

export function Navbar() {
  return (
    <nav className="fixed top-0 z-50 flex h-20 w-full items-center justify-between bg-[var(--background)]/80 px-8 backdrop-blur-xl">
      <div className="flex items-center gap-8">
        <span className="text-2xl font-bold tracking-tighter text-[var(--color-primary)]">
          Rick and Morty
        </span>

        <div className="hidden items-center gap-6 md:flex">

  <Link href="/page-characters" className="text-[var(--color-muted)] transition-colors duration-300 hover:text-[var(--color-primary)]">
  Characters
</Link>

          
<Link href="/page-location" className="text-[var(--color-muted)] transition-colors duration-300 hover:text-[var(--color-primary)]">
  Dimensions
</Link>


  <Link href="/page-episodes"className="text-[var(--color-muted)] transition-colors duration-300 hover:text-[var(--color-primary)]">
  Episodes
</Link>


        </div>
      </div>

      <div className="flex items-center gap-4">
        <div className="hidden items-center rounded-full border border-[var(--color-outline)]/30 bg-[var(--color-surface-low)] px-4 py-2 lg:flex">
          <input
            type="text"
            placeholder="Scan multiverse..."
            className="w-48 border-none bg-transparent text-sm text-white placeholder:text-[var(--color-muted)]/50 outline-none"
          />
        </div>

        <div className="h-10 w-10 overflow-hidden rounded-full border border-[var(--color-primary)]/20">
          <img
            src="https://rickandmortyapi.com/api/character/avatar/1.jpeg"
            alt="Rick Sanchez Avatar"
            className="h-full w-full object-cover"
          />
        </div>
      </div>
    </nav>
  );
}