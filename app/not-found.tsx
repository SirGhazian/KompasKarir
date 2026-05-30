import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Button from "@/components/ui/Button";
import { FaArrowLeft } from "react-icons/fa";

export default function NotFound() {
  return (
    <>
      <Navbar />

      <main className="min-h-[calc(100vh-72px)] bg-[#f8f9ff] flex items-center justify-center py-20">
        <div className="relative mx-auto max-w-md px-6 text-center">
          {/* dekorasi karakter (paling belakang) */}
          <img
            src="/images/404-decorative.png"
            alt=""
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] md:w-[600px] max-w-none h-auto opacity-5 pointer-events-none select-none z-0"
          />

          {/* konten (di depan gambar) */}
          <div className="relative z-10">
            <span className="text-8xl font-extrabold text-[#006a61] font-headline md:text-9xl">
              404
            </span>
            <h1 className="mt-4 text-2xl font-extrabold text-[#0b1c30] font-headline md:text-3xl">
              Halaman Tidak Ditemukan
            </h1>
            <p className="mt-3 text-base leading-relaxed text-[#45464d] font-sans">
              Halaman yang kamu cari tidak tersedia.
            </p>
            <div className="mt-8">
              <Button href="/" variant="primary" size="md">
                <FaArrowLeft size={14} />
                Kembali ke Beranda
              </Button>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
