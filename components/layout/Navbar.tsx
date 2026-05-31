"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import Button from "@/components/ui/Button";
import { FaArrowRight } from "react-icons/fa";
import { FaXmark } from "react-icons/fa6";

// --- data navigasi ---
const navLinks = [
  { label: "Beranda", href: "/" },
  { label: "Tentang", href: "/tentang" },
  { label: "Ulasan", href: "/ulasan" },
];

// --- navbar ---
export default function Navbar() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  // cek apakah link aktif berdasarkan pathname
  function isActive(href: string) {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  }

  return (
    <>
      <header className="sticky top-0 z-50 w-full bg-white shadow-nav">
        <div className="mx-auto flex h-[72px] max-w-7xl items-center justify-between px-6 md:px-12">
          {/* logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <img src="/images/app-logo.png" alt="KompasKarir" className="h-9 w-auto" />
          </Link>

          {/* navigasi desktop */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => {
              const active = isActive(link.href);
              return (
                <Link
                  key={link.label}
                  href={link.href}
                  className={`group relative text-sm font-semibold transition-colors duration-200 font-sans ${
                    active ? "text-[#006a61]" : "text-[#45464d] hover:text-[#006a61]"
                  }`}
                >
                  {link.label}

                  {/* underline */}
                  <span
                    className={`absolute -bottom-1 left-0 h-0.5 w-full rounded-full bg-[#006a61] origin-center transition-all duration-300 ease-out ${
                      active
                        ? "scale-x-100 opacity-100"
                        : "scale-x-0 opacity-60 group-hover:scale-x-100 group-hover:opacity-100"
                    }`}
                  />
                </Link>
              );
            })}

            {/* tombol cta */}
            <Button href="/instruksi" variant="primary" size="sm" className="ml-2">
              <FaArrowRight size={12} />
              Mulai Tes
            </Button>
          </nav>

          {/* tombol menu mobile */}
          <button
            onClick={() => setMenuOpen(true)}
            className="flex md:hidden h-10 w-10 items-center justify-center rounded-lg text-[#0b1c30] transition-colors hover:bg-[#e5eeff]"
            aria-label="Buka menu"
          >
            <svg
              width="22"
              height="22"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M4 6h16M4 12h16M4 18h16"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          </button>
        </div>
      </header>

      {/* === sidebar mobile === */}
      {/* backdrop */}
      <div
        className={`fixed inset-0 z-[60] bg-[#0b1c30]/50 transition-opacity duration-300 md:hidden ${
          menuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setMenuOpen(false)}
      />

      {/* panel dari kanan */}
      <aside
        className={`fixed top-0 right-0 z-[70] h-full w-72 bg-white shadow-xl transition-transform duration-300 ease-out md:hidden ${
          menuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* header sidebar */}
        <div className="flex h-[72px] items-center justify-between px-6 border-b border-[#e5eeff]">
          <span className="text-lg font-bold text-[#0b1c30] font-headline">Menu</span>
          <button
            onClick={() => setMenuOpen(false)}
            className="flex h-9 w-9 items-center justify-center rounded-lg text-[#45464d] transition-colors hover:bg-[#e5eeff]"
            aria-label="Tutup menu"
          >
            <FaXmark size={20} />
          </button>
        </div>

        {/* link navigasi */}
        <nav className="flex flex-col px-6 py-6 gap-2">
          {navLinks.map((link) => {
            const active = isActive(link.href);
            return (
              <Link
                key={link.label}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className={`rounded-xl px-4 py-3 text-base font-semibold transition-colors font-sans ${
                  active
                    ? "bg-[#e5f7f5] text-[#006a61]"
                    : "text-[#45464d] hover:bg-[#f8f9ff] hover:text-[#006a61]"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        {/* tombol cta */}
        <div className="px-6 mt-4">
          <Button
            href="/instruksi"
            variant="primary"
            size="md"
            className="w-full"
            onClick={() => setMenuOpen(false)}
          >
            Mulai Tes
            <FaArrowRight size={14} />
          </Button>
        </div>
      </aside>
    </>
  );
}
