export default function Footer() {
  const footerLinks = [
    { label: "Dokumentasi", href: "https://github.com/SirGhazian/kompas-karir", external: true },
    { label: "About Us", href: "/about", external: false },
  ];

  return (
    <footer className="w-full bg-[#0b1c30] text-[#eaf1ff]">
      {/* garis pembatas atas */}
      <div className="h-1 w-full bg-footer-line" />

      <div className="mx-auto max-w-7xl px-6 py-10 md:px-12">
        <div className="flex flex-col items-center gap-8 md:flex-row md:justify-between md:gap-0">
          {/* brand */}
          <div className="flex items-center gap-2">
            <img
              src="/vector/app-logo.svg"
              alt="KompasKarir"
              className="h-8 w-auto brightness-0 invert"
            />
          </div>

          {/* credit */}
          <p className="text-center text-xs text-[#bec6e0] opacity-70 font-sans">
            © {new Date().getFullYear()} KompasKarir. Dibuat oleh Tim Capstone PSU305.
          </p>

          {/* link footer */}
          <nav className="flex items-center gap-6">
            {footerLinks.map((link, idx) => (
              <a
                key={link.label}
                href={link.href}
                {...(link.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                className="text-xs text-[#bec6e0] opacity-70 transition-opacity hover:opacity-100 hover:text-[#86f2e4] font-sans"
              >
                {link.label}
                {idx < footerLinks.length - 1 && <span className="sr-only"> · </span>}
              </a>
            ))}
          </nav>
        </div>
      </div>
    </footer>
  );
}
