"use client";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  className?: string;
}

function getVisiblePages(currentPage: number, totalPages: number) {
  if (totalPages <= 5) {
    return Array.from({ length: totalPages }, (_, index) => index + 1);
  }

  if (currentPage <= 3) {
    return [1, 2, 3, 4, 5];
  }

  if (currentPage >= totalPages - 2) {
    return [
      totalPages - 4,
      totalPages - 3,
      totalPages - 2,
      totalPages - 1,
      totalPages,
    ];
  }

  return [
    currentPage - 2,
    currentPage - 1,
    currentPage,
    currentPage + 1,
    currentPage + 2,
  ];
}

function actionButtonClass(disabled: boolean) {
  return [
    "group flex h-12 w-12 items-center justify-center rounded-lg border bg-[var(--background)] transition-all duration-300 active:scale-95",
    disabled
      ? "cursor-not-allowed border-white/5 text-white/20 opacity-50"
      : "border-white/10 text-[var(--color-muted)] hover:border-lime-300/40 hover:bg-white/5 hover:text-lime-300",
  ].join(" ");
}

function pageButtonClass(isActive: boolean, isWide = false) {
  return [
    "flex h-12 items-center justify-center rounded-lg border font-bold transition-all duration-300 active:scale-95",
    isWide ? "w-14" : "w-12",
    isActive
      ? "border-lime-300 bg-lime-300 text-black shadow-[0_0_20px_rgba(132,253,110,0.3)] hover:brightness-110"
      : "border-white/10 bg-[var(--background)] text-white hover:border-lime-300/40 hover:bg-white/5 hover:text-lime-300",
  ].join(" ");
}

export function Pagination({
  currentPage,
  totalPages,
  onPageChange,
  className = "",
}: PaginationProps) {
  if (totalPages <= 1) return null;

  const visiblePages = getVisiblePages(currentPage, totalPages);
  const firstVisiblePage = visiblePages[0];
  const lastVisiblePage = visiblePages[visiblePages.length - 1];

  const showLeftEllipsis = firstVisiblePage > 2;
  const showRightEllipsis = lastVisiblePage < totalPages - 1;

  const isFirstPage = currentPage === 1;
  const isLastPage = currentPage === totalPages;

  const isLastButtonWide = totalPages >= 100;

  return (
    <div className={`relative z-10 ${className}`}>
      <div className="mb-8 text-center">
        <h2 className="mb-2 text-xs uppercase tracking-[0.3em] text-[var(--color-primary)]/60">
          Sequence Indexing
        </h2>
        <div className="mx-auto h-px w-12 bg-lime-300/30" />
      </div>

      <nav className="flex flex-wrap items-center justify-center gap-3 rounded-xl border border-white/10 bg-black/20 p-8 shadow-2xl shadow-black/60 backdrop-blur-xl">
        <button
          type="button"
          title="First Page"
          onClick={() => onPageChange(1)}
          disabled={isFirstPage}
          className={actionButtonClass(isFirstPage)}
        >
          <span className="material-symbols-outlined text-[20px]">
            first_page
          </span>
        </button>

        <button
          type="button"
          title="Previous Page"
          onClick={() => onPageChange(currentPage - 1)}
          disabled={isFirstPage}
          className={actionButtonClass(isFirstPage)}
        >
          <span className="material-symbols-outlined text-[20px]">
            chevron_left
          </span>
        </button>

        <div className="flex items-center gap-2 px-2">
          {firstVisiblePage > 1 && (
            <button
              type="button"
              onClick={() => onPageChange(1)}
              className={pageButtonClass(currentPage === 1)}
            >
              1
            </button>
          )}

          {showLeftEllipsis && (
            <div className="flex h-12 w-10 items-center justify-center tracking-widest text-[var(--color-muted)]">
              ...
            </div>
          )}

          {visiblePages.map((page) => (
            <button
              key={page}
              type="button"
              onClick={() => onPageChange(page)}
              className={pageButtonClass(currentPage === page, page >= 100)}
            >
              {page}
            </button>
          ))}

          {showRightEllipsis && (
            <div className="flex h-12 w-10 items-center justify-center tracking-widest text-[var(--color-muted)]">
              ...
            </div>
          )}

          {lastVisiblePage < totalPages && (
            <button
              type="button"
              onClick={() => onPageChange(totalPages)}
              className={pageButtonClass(currentPage === totalPages, isLastButtonWide)}
            >
              {totalPages}
            </button>
          )}
        </div>

        <button
          type="button"
          title="Next Page"
          onClick={() => onPageChange(currentPage + 1)}
          disabled={isLastPage}
          className={actionButtonClass(isLastPage)}
        >
          <span className="material-symbols-outlined text-[20px]">
            chevron_right
          </span>
        </button>

        <button
          type="button"
          title="Last Page"
          onClick={() => onPageChange(totalPages)}
          disabled={isLastPage}
          className={actionButtonClass(isLastPage)}
        >
          <span className="material-symbols-outlined text-[20px]">
            last_page
          </span>
        </button>
      </nav>

      <div className="mt-8 flex items-center justify-center gap-4">
        <span className="text-[10px] uppercase tracking-[0.2em] text-white/40">
          Dossier Position
        </span>

        <div className="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1">
          <span className="h-1.5 w-1.5 rounded-full bg-lime-300 shadow-[0_0_6px_#84fd6e]" />
          <span className="text-[10px] font-bold uppercase tracking-wider text-lime-300/80">
            Entry {String(currentPage).padStart(3, "0")} /{" "}
            {String(totalPages).padStart(3, "0")}
          </span>
        </div>
      </div>
    </div>
  );
}