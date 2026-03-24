export function MobileBottomNav() {
  return (
    <nav className="fixed bottom-0 left-0 z-50 flex w-full items-center justify-around rounded-t-[2rem] bg-[var(--color-secondary-container)]/40 px-6 pb-6 pt-3 backdrop-blur-2xl md:hidden">
      <a
        href="#"
        className="rounded-full bg-[var(--color-primary)] p-3 text-[var(--background)]"
      >
        Characters
      </a>
      <a href="#" className="rounded-full p-3 text-[var(--color-muted)]">
        Worlds
      </a>
      <a href="#" className="rounded-full p-3 text-[var(--color-muted)]">
        Episodes
      </a>
    </nav>
  );
}