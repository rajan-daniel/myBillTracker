import Image from "next/image";

export default function Home() {
return (
  <>
    <section className="relative h-screen w-full overflow-hidden">

      {/* Background */}
      <img
        src="/background.png"
        alt="Background"
        className="absolute inset-0 h-full w-full object-cover grayscale scale-105"
      />

      {/* Overlay (slightly more cinematic) */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70" />

      {/* Content */}
      <div className="relative z-10 flex h-full items-center justify-center px-4">
        <div className="flex flex-col items-center text-center gap-4">

          <h1 className="text-4xl md:text-7xl font-bold leading-tight">
            <span className="bg-gradient-to-r from-emerald-300 via-green-400 to-lime-500 bg-clip-text text-transparent drop-shadow-sm">
              My Bill Tracker
            </span>
          </h1>

          <p className="text-white text-lg md:text-2xl font-medium max-w-xl opacity-90">
            everything you need, nothing you don't!
          </p>

        </div>
      </div>

    </section>
  </>
);
}
