"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import Button from "@/components/ui/Button";
import { FaArrowRight } from "react-icons/fa";
import { VscCompassActive } from "react-icons/vsc";

// --- data navigasi ---
const navLinks = [
  { label: "Beranda", href: "/" },
  { label: "Tentang", href: "/tentang" },
  { label: "Ulasan", href: "#" },
];

// --- navbar ---
export default function Navbar() {
  const pathname = usePathname();

  // cek apakah link aktif berdasarkan pathname
  function isActive(href: string) {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  }

  return (
    <header className="sticky top-0 z-50 w-full bg-white shadow-nav">
      <div className="mx-auto flex h-[72px] max-w-7xl items-center justify-between px-6 md:px-12">
        {/* logo */}
        <Link href="/" className="flex items-center gap-2 group">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-secondary">
            <VscCompassActive className="text-white" size={20} />
          </div>
          <span className="text-xl font-extrabold tracking-tight text-[#0b1c30] transition-colors group-hover:text-[#006a61] font-headline">
            KompasKarir
          </span>
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
  );
}
