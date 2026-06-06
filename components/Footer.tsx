import Link from "next/link";

export default function Footer() {
  return (
    <footer className="w-full border-t bg-[var(--text-color)] py-14 text-sm text-white">
      <div className="mx-auto flex flex-col md:flex-row w-full max-w-6xl px-8 items-start gap-16">
        {/* email section */}
        <div className="flex flex-col gap-4 w-full max-w-sm">
          <img
            className="h-20 w-20 object-contain brightness-0 invert"
            src="/logo.svg"
            alt="Logo"
          />
          {/* email box if needed
          <h1 className="text-2xl font-bold text-white">Temp</h1>

          <input
            type="email"
            placeholder="Email address"
            className="w-full rounded-2xl border border-white/10 bg-white/[0.04] px-5 py-4 text-white shadow-[0_0_30px_rgba(255,255,255,0.03)] backdrop-blur-xl placeholder:text-zinc-500 outline-none transition duration-300 hover:bg-white/[0.06] hover:border-violet-400/30 focus:border-violet-400/40 focus:bg-white/[0.07] focus:ring-4 focus:ring-violet-500/10"
          />*/}
        </div>

        {/* both navs and about repeat */}
        <div className="flex flex-col md:flex-row gap-12 md:gap-16 w-full justify-between">
          <nav className="flex flex-col gap-4 items-start text-[var(--footer-accent)] font-bold">
            <Link href="/privacy">Privacy Policy</Link>
            <Link href="/terms">Terms of Service</Link>
          </nav>

          <div className="flex flex-col gap-2 max-w-xs">
            <h1 className="font-bold">About</h1>
            <p className="leading-relaxed text-[var(--footer-accent)]">
              My Bill Tracker is a thoughtfully designed bill management tool
              built to keep the user experience clean and focused. While the
              interface stays minimal, the system is structured to be reliable
              and scalable.
            </p>
          </div>
        </div>
      </div>

      <div className="mx-auto w-full max-w-6xl px-8">
        <p className="mt-10 text-xs text-white/50">
          © {new Date().getFullYear()} Rajan Daniel
        </p>
      </div>
    </footer>
  );
}
