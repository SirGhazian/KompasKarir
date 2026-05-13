import Button from "@/components/ui/Button";
import { FaArrowRight } from "react-icons/fa";
import { VscCompassActive } from "react-icons/vsc";

export default function Navbar() {
  const navLinks = [
    { label: "Beranda", href: "#", active: true },
    { label: "Tentang", href: "#", active: false },
    { label: "Ulasan", href: "#", active: false },
  ];

  return (
    <header className="sticky top-0 z-50 w-full bg-white/80 backdrop-blur-md shadow-nav">
      <div className="mx-auto flex h-[72px] max-w-7xl items-center justify-between px-6 md:px-12">
        {/* logo */}
        <a href="#" className="flex items-center gap-2 group">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-teal-gradient">
            <VscCompassActive className="text-white" size={20} />
          </div>
          <span className="text-xl font-extrabold tracking-tight text-[#0b1c30] group-hover:text-[#006a61] transition-colors font-headline">
            KompasKarir
          </span>
        </a>

        {/* navigasi desktop */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className={`relative text-sm font-semibold transition-colors font-sans ${
                link.active ? "text-[#006a61]" : "text-[#45464d] hover:text-[#006a61]"
              }`}
            >
              {link.label}
              {link.active && (
                <span className="absolute -bottom-1 left-0 h-0.5 w-full rounded-full bg-[#006a61]" />
              )}
            </a>
          ))}

          {/* tombol cta */}
          <Button href="#" variant="primary" size="sm" className="ml-2">
            <FaArrowRight size={12} />
            Mulai Tes
          </Button>
        </nav>

        {/* tombol menu mobile */}
        <button
          className="flex md:hidden h-10 w-10 items-center justify-center rounded-lg text-[#0b1c30] hover:bg-[#e5eeff] transition-colors"
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
