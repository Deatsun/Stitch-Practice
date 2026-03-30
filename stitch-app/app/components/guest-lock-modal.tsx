"use client";

type GuestLockModalProps = {
  open: boolean;
  onClose: () => void;
};

export function GuestLockModal({
  open,
  onClose,
}: GuestLockModalProps) {
  if (!open) return null;

  const handleSignInRedirect = () => {
    localStorage.removeItem("access_mode");
    window.location.href = "/";
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 px-4">
      <div className="w-full max-w-md rounded-2xl border border-[#48474e]/30 bg-[#191920] p-6 text-[#f3eff8] shadow-2xl">
        <div className="mb-4 flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#84fd6e]/10 text-[#84fd6e]">
            <span className="material-symbols-outlined">lock</span>
          </div>

          <div>
            <h2 className="text-lg font-bold text-[#f0fccd]">
              Sign in required
            </h2>
            <p className="text-sm text-[#acaab2]">
              Guest mode is view-only.
            </p>
          </div>
        </div>

        <p className="mb-6 text-sm leading-6 text-[#d6d3dc]">
          You need to sign in to continue. As a guest, you can explore the
          interface, but interactive actions are locked.
        </p>

        <div className="flex justify-end gap-3">
          <button
            onClick={onClose}
            className="rounded-xl border border-[#48474e]/30 px-4 py-2 text-sm text-[#acaab2] transition hover:text-white"
          >
            Cancel
          </button>

          <button
            onClick={handleSignInRedirect}
            className="rounded-xl bg-[#84fd6e] px-4 py-2 text-sm font-semibold text-[#006000] transition hover:brightness-110"
          >
            Go to sign in
          </button>
        </div>
      </div>
    </div>
  );
}