"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";

export default function Navigation(){
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [open]);

  return (
    <>
      <nav className="flex items-center justify-center gap-12 h-22 font-bold text-[1rem] bg-[var(--accent-silver)] text-[var(--text-color)] relative">

        {/*desktop*/}
        <div className="absolute left-8 hidden md:flex items-center gap-2">
          <img className="h-8 w-8 object-contain" src="/logo.svg" alt="Logo" />
          <span className="text-xl">CHANGE THIS</span>
        </div>

        {/*md: mobile*/}
        <div className="absolute left-1/2 -translate-x-1/2 flex md:hidden items-center gap-2">
          <img className="h-8 w-8 object-contain" src="/logo.svg" alt="Logo" />
        </div>

        {/*desktop nav*/}
        <div className="hidden md:flex gap-12">
          <Link href="/">Home</Link>
          <Link href="/products">Products</Link>
          <Link href="/about">About</Link>
        </div>

        {/*mobile btn*/}
        <button
          onClick={() => setOpen(!open)}
          className="absolute left-8 md:hidden text-3xl"
        >
          <img className="h-8 w-8 object-contain invert" src="/menu.svg" alt="Logo" />
        </button>
      </nav>

      {/*mobile menu, nav with column*/}
      {open && (
        <div className="md:hidden fixed top-22 left-0 w-full bg-[var(--accent-silver)] text-[var(--text-color)] flex flex-col items-center gap-6 py-6 font-bold text-lg z-50 shadow-lg">
          <Link href="/" onClick={() => setOpen(false)}>
            Home
          </Link>

          <Link href="/products" onClick={() => setOpen(false)}>
            Products
          </Link>

          <Link href="/about" onClick={() => setOpen(false)}>
            About
          </Link>
        </div>
      )}
    </>
  );
};