interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
}

export function SearchBar({
  value,
  onChange,
  placeholder = "Search...",
  className = "",
}: SearchBarProps) {
  return (
    <div className={`relative w-full md:max-w-md ${className}`}>
      <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--color-muted)]">
        ⌕
      </span>

      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full rounded-lg border border-white/10 bg-black/20 py-4 pl-12 pr-4 text-white outline-none transition-all placeholder:text-[var(--color-muted)] focus:border-[var(--color-primary)]"
      />
    </div>
  );
}