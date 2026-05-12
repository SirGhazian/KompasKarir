export default function Footer() {
  const footerLinks = [{ label: "Dokumentasi", href: "#" }];

  return (
    <footer className="w-full bg-[#0b1c30] text-[#eaf1ff]">
      {/* garis pembatas atas */}
      <div className="h-1 w-full bg-footer-line" />

      <div className="mx-auto max-w-7xl px-6 py-10 md:px-12">
        <div className="flex flex-col items-center gap-8 md:flex-row md:justify-between md:gap-0">
          {/* brand */}
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-teal-gradient">
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <circle cx="12" cy="12" r="10" stroke="white" strokeWidth="2" />
                <polygon points="12,4 15,12 12,20 9,12" fill="white" fillOpacity="0.3" />
                <polygon points="12,4 15,12 9,12" fill="white" />
                <circle cx="12" cy="12" r="1.5" fill="white" />
              </svg>
            </div>
            <span className="text-lg font-extrabold tracking-tight text-white font-headline">
              KompasKarir
            </span>
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
