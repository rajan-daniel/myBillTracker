import Image from "next/image";

export default function Home() {
  return (
    <>
      <section className="relative h-screen w-full overflow-hidden">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 h-full w-full object-cover grayscale"
        >
          <source src="/home.mp4" type="video/mp4" />
        </video>

        <div className="absolute inset-0 bg-black/40" />

        <div className="relative z-10 flex h-full items-center justify-center px-4">
          <div className="flex flex-col items-center text-center gap-2">
            <h1 className="text-4xl md:text-7xl font-bold">
              <span className="bg-gradient-to-r from-emerald-300 via-green-400 to-lime-500 bg-clip-text text-transparent">
                My Bill Tracker
              </span>
            </h1>

            <p className="text-white text-lg md:text-2xl font-medium">
              everything you need, nothing you don't!
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
