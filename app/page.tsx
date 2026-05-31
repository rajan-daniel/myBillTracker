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
          <h1 className="text-4xl md:text-7xl font-bold text-white flex flex-col md:flex-row items-center md:items-baseline gap-2 md:gap-4 text-center">
            <span>Welcome to</span>
            <span className="bg-gradient-to-r from-cyan-300 via-blue-400 to-purple-500 bg-clip-text text-transparent">
              My Bill Tracker
            </span>
          </h1>
        </div>
      </section>
    </>
  );
}