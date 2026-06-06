import Image from "next/image";

export default function Home() {
  return (
    <>
      <section className="relative h-screen w-full overflow-hidden">
        {/* background hero image */}
        <img
          src="/background.png"
          alt="Background"
          className="absolute inset-0 h-full w-full object-cover grayscale scale-105"
        />

        {/* overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/60 to-black/80 backdrop-brightness-75" />

        {/* content */}
        <div className="relative z-10 flex h-full flex-col items-center justify-center px-4">
          {/* title header */}
          <div className="flex flex-col items-center text-center gap-4">
            <h1 className="text-4xl md:text-7xl font-bold leading-tight">
              <span className="bg-gradient-to-r from-emerald-300 via-green-400 to-lime-500 bg-clip-text text-transparent drop-shadow-lg">
                My Bill Tracker
              </span>
            </h1>

            <p className="text-white/95 text-lg md:text-2xl font-medium max-w-xl">
              everything you need, nothing you don't!
            </p>
          </div>

          <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-5xl px-4">
            <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-xl p-6 text-center hover:scale-105 transition">
              <div className="text-3xl mb-3 text-emerald-300">●</div>
              <h3 className="text-white text-lg font-semibold mb-2">
                Get Started
              </h3>
              <p className="text-white/80 text-sm">
                Sign up and create your account in seconds to start tracking
                your bills.
              </p>
            </div>

            <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-xl p-6 text-center hover:scale-105 transition">
              <div className="text-3xl mb-3 text-green-400">●</div>
              <h3 className="text-white text-lg font-semibold mb-2">
                Add Bills
              </h3>
              <p className="text-white/80 text-sm">
                Add your first bill and keep everything organized in one place.
              </p>
            </div>

            <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-xl p-6 text-center hover:scale-105 transition">
              <div className="text-3xl mb-3 text-lime-400">●</div>
              <h3 className="text-white text-lg font-semibold mb-2">
                Track Monthly
              </h3>
              <p className="text-white/80 text-sm">
                Stay focused by tracking payments and due dates on a monthly
                basis.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
