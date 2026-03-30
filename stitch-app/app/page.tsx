"use client";

import { useRouter } from "next/navigation";

export default function AccessPortalPage() {
  const router = useRouter();

  const handleGuestContinue = () => {
    localStorage.setItem("access_mode", "guest");
    router.push("/page-characters");
  };

  const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const email = String(formData.get("email") || "");
    const password = String(formData.get("password") || "");

    console.log("Demo login:", { email, password });

    localStorage.removeItem("access_mode");
    router.push("/page-characters");
  };

  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#0e0e14] px-6 py-10 text-[#f3eff8]">
      {/* Background */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 z-10 bg-[radial-gradient(circle_at_50%_50%,_rgba(25,25,32,0)_0%,_#0e0e14_100%)]" />
        <div
          className="h-full w-full bg-cover bg-center opacity-30 mix-blend-screen"
          style={{
            backgroundImage:
              "url('https://lh3.googleusercontent.com/aida-public/AB6AXuDugotxZJQYrHAO3q64G_05MXOzu2URnI5tbPPvRpPgQkGBtnpfr18AAOUu-Fww2jwrshfy2pb4sFDCssurtwumMpqxmZRb04sBAug11ksiT4X6D87K4AljkbKJPEXLLeGnXqAZVnpiBDjF-PWElPmIIGFUzBLgruDQsGaNTupJaWFwvKb2cwgT2QoIUeqFsZsIHvK_badwAhU05DpdAT4vT3DoESI7ME90iq0e8Ztz06fBX6dZ5L8zfJp5VoORBaB7QKfzhU3JIKQ')",
          }}
        />
      </div>

      {/* Content */}
      <div className="relative z-20 flex w-full max-w-md flex-col items-center gap-8">
        {/* Header */}
        <div className="space-y-2 text-center">
          <h2 className="text-4xl font-black uppercase tracking-tighter text-[#f0fccd]">
            CITADEL_NOIR
          </h2>
          <p className="text-[10px] font-medium uppercase tracking-[0.3em] text-[#acaab2]">
            Multiversal Intelligence Dossier
          </p>
        </div>

        {/* Card */}
        <div className="flex w-full flex-col gap-6 rounded-2xl border border-[#48474e]/10 bg-[rgba(25,25,32,0.7)] p-8 shadow-[0_0_60px_-15px_rgba(132,253,110,0.3)] backdrop-blur-2xl">
          <div className="space-y-1">
            <h1 className="text-3xl font-bold text-[#f0fccd]">Sign In</h1>
            <p className="text-sm text-[#acaab2]">
              Authorize your identity to access the archive.
            </p>
          </div>

          {/* FORM */}
          <form onSubmit={handleLogin} className="space-y-5">
            {/* Email */}
            <div className="space-y-1.5">
              <label className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-wider text-[#84fd6e]">
                <span className="material-symbols-outlined text-sm">
                  alternate_email
                </span>
                Curator Email
              </label>
              <input
                name="email"
                type="email"
                placeholder="C-137@citadel.net"
                className="h-14 w-full rounded-xl border border-[#48474e]/20 bg-black px-4 text-[#f3eff8] placeholder:text-[#48474e] outline-none focus:border-[#84fd6e]/50 focus:ring-1 focus:ring-[#84fd6e]/50"
              />
            </div>

            {/* Password */}
            <div className="space-y-1.5">
              <label className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-wider text-[#84fd6e]">
                <span className="material-symbols-outlined text-sm">
                  lock_open
                </span>
                Access Key
              </label>
              <input
                name="password"
                type="password"
                placeholder="••••••••••••"
                className="h-14 w-full rounded-xl border border-[#48474e]/20 bg-black px-4 text-[#f3eff8] placeholder:text-[#48474e] outline-none focus:border-[#84fd6e]/50 focus:ring-1 focus:ring-[#84fd6e]/50"
              />
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="group flex h-14 w-full items-center justify-center gap-2 rounded-xl bg-[#84fd6e] text-lg font-bold text-[#006000] transition-all hover:brightness-110 active:scale-[0.98]"
            >
              Initialize Connection
              <span className="material-symbols-outlined transition-transform group-hover:translate-x-1">
                arrow_forward
              </span>
            </button>
          </form>

          {/* Footer actions */}
          <div className="flex items-center justify-between px-1">
            <button className="text-xs text-[#acaab2] hover:text-[#f0fccd]">
              Forgot Portal Key?
            </button>
            <div className="h-1 w-1 rounded-full bg-[#48474e]" />
            <button className="text-xs text-[#acaab2] hover:text-[#f0fccd]">
              Request Access
            </button>
          </div>
        </div>

        {/* Guest */}
        <div className="flex w-full flex-col items-center gap-4">
          <div className="h-px w-24 bg-gradient-to-r from-transparent via-[#48474e]/30 to-transparent" />

          <button
            onClick={handleGuestContinue}
            className="group flex items-center gap-3 rounded-full border border-[#48474e]/15 bg-[#191920]/50 px-8 py-3 font-semibold text-[#9aa57c] hover:bg-[#191920] hover:text-[#f0fccd] active:scale-95"
          >
            <span className="material-symbols-outlined text-xl group-hover:rotate-12 transition-transform">
              visibility
            </span>
            Continue as Guest
          </button>

          <p className="text-center text-[9px] uppercase tracking-[0.2em] text-[#76747c]">
            Unauthorized access will be logged by
            <br />
            The Council of Ricks
          </p>
        </div>
      </div>

      {/* Corners */}
      <div className="fixed top-8 left-8 h-12 w-12 border-t-2 border-l-2 border-[#84fd6e]/20" />
      <div className="fixed bottom-8 right-8 h-12 w-12 border-b-2 border-r-2 border-[#84fd6e]/20" />

      {/* Scanlines */}
      <div
        className="pointer-events-none fixed inset-0 z-30 opacity-[0.03]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(18,16,16,0) 50%, rgba(0,0,0,0.25) 50%), linear-gradient(90deg, rgba(255,0,0,0.06), rgba(0,255,0,0.02), rgba(0,0,255,0.06))",
          backgroundSize: "100% 2px, 3px 100%",
        }}
      />
    </main>
  );
}