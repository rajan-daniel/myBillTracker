"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { createClient } from "@/utils/supabase/client";
import LogoutButton from "./LogoutButton";

export default function Navigation() {
  const [open, setOpen] = useState(false);
  const [user, setUser] = useState<any>(null);

  const supabase = createClient();
  const pathname = usePathname();

  // Close mobile menu on route change
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

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

  useEffect(() => {
    const getUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      setUser(user);
    };

    getUser();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  return (
    <>
      <nav className="flex items-center justify-center gap-12 h-22 font-bold text-[1rem] bg-[var(--accent-silver)] text-[var(--text-color)] relative">
        {/* desktop */}
        <div className="absolute left-8 hidden md:flex items-center gap-2">
          <Link href="/" className="flex items-center gap-2">
            <img
              className="h-8 w-8 object-contain"
              src="/logo.svg"
              alt="Logo"
            />
            <span className="text-xl">myBillTracker</span>
          </Link>
        </div>

        {/* mobile logo */}
        <div className="absolute left-1/2 -translate-x-1/2 flex md:hidden items-center gap-2">
          <Link href="/" className="flex items-center gap-2">
            <img
              className="h-8 w-8 object-contain"
              src="/logo.svg"
              alt="Logo"
            />
          </Link>
        </div>

        {/* desktop nav */}
        <div className="absolute right-8 hidden md:flex items-center gap-8">
          {!user ? (
            <Link href="/login" className="hover:underline cursor-pointer">Sign In</Link>
          ) : (
            <>
              <Link href="/dashboard" className="hover:underline cursor-pointer">Dashboard</Link>
              <LogoutButton />
            </>
          )}
        </div>

        {/* mobile menu button */}
        <button
          onClick={() => setOpen(!open)}
          className="absolute left-8 md:hidden text-3xl"
        >
          <img
            className="h-8 w-8 object-convert invert"
            src="/menu.svg"
            alt="Menu"
          />
        </button>
      </nav>

      {/* mobile menu */}
      {open && (
        <div className="md:hidden fixed top-22 left-0 w-full bg-[var(--accent-silver)] text-[var(--text-color)] flex flex-col items-center gap-6 py-6 font-bold text-lg z-50 shadow-lg">
          {!user ? (
            <Link href="/login">Sign In</Link>
          ) : (
            <>
              <Link href="/dashboard">Dashboard</Link>
              <LogoutButton />
            </>
          )}
        </div>
      )}
    </>
  );
}