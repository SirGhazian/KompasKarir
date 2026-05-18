import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Button from "@/components/ui/Button";
import Badge from "@/components/ui/Badge";
import { FaArrowRight, FaBookOpen } from "react-icons/fa";
import { BsCheckCircleFill } from "react-icons/bs";

// --- data panduan ---
const panduan = [
  { nomor: "01", teks: "Jawab setiap pertanyaan dengan jujur sesuai kondisi dirimu saat ini." },
  { nomor: "02", teks: "Tidak ada jawaban benar atau salah — semua pilihan adalah valid." },
  { nomor: "03", teks: "Gunakan skala 1–5 dari Sangat Tidak Setuju hingga Sangat Setuju." },
  { nomor: "04", teks: "Tes ini terdiri dari 99 pertanyaan yang mencakup 6 dimensi kepribadian." },
  { nomor: "05", teks: "Pastikan kamu dalam kondisi tenang dan tidak terburu-buru." },
];

// --- skala referensi ---
const skalaReferensi = [
  { nilai: 1, label: "Sangat Tidak Setuju" },
  { nilai: 2, label: "Tidak Setuju" },
  { nilai: 3, label: "Netral" },
  { nilai: 4, label: "Setuju" },
  { nilai: 5, label: "Sangat Setuju" },
];

// --- halaman instruksi ---
export default function InstruksiPage() {
  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-[#f8f9ff] py-16 md:py-24">
        <div className="mx-auto max-w-3xl px-6 md:px-12">
          {/* --- header --- */}
          <div className="mb-12 text-center">
            <Badge
              variant="category"
              size="md"
              colorClass="bg-[#e5f7f5] text-[#006a61]"
              className="mb-4"
            >
              <BsCheckCircleFill size={14} />
              Persiapan Tes RIASEC
            </Badge>
            <h1 className="mt-4 text-4xl font-extrabold tracking-tight text-[#0b1c30] md:text-5xl font-headline">
              Sebelum Memulai Tes
            </h1>
            <p className="mt-4 text-base text-[#45464d] font-sans">
              Baca panduan berikut agar hasil tes mencerminkan dirimu yang sebenarnya.
            </p>
          </div>

          {/* --- card panduan --- */}
          <div className="mb-10 rounded-3xl bg-white p-8 shadow-card md:p-10">
            <h2 className="mb-6 text-xl font-bold text-[#0b1c30] font-headline">
              Panduan Pengisian
            </h2>
            <ul className="space-y-4">
              {panduan.map((item) => (
                <li key={item.nomor} className="flex items-start gap-4">
                  {/* nomor */}
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-secondary text-sm font-extrabold text-white font-headline">
                    {item.nomor}
                  </span>
                  {/* teks */}
                  <p className="pt-1.5 text-base leading-relaxed text-[#45464d] font-sans">
                    {item.teks}
                  </p>
                </li>
              ))}
            </ul>
          </div>

          {/* --- kotak skala referensi --- */}
          <div className="mb-12 rounded-3xl border-2 border-[#c6c6cd] bg-white p-8 md:p-10">
            <p className="mb-5 text-xs font-bold uppercase tracking-widest text-[#006a61] font-sans">
              Skala Referensi
            </p>
            <div className="flex items-center gap-2 md:gap-3">
              {skalaReferensi.map((item, idx) => (
                <div key={item.nilai} className="flex flex-1 flex-col items-center gap-2">
                  {/* kotak nilai */}
                  <div
                    className={`flex h-12 w-full items-center justify-center rounded-xl border-2 text-base font-bold transition-all font-headline ${
                      idx === 3
                        ? "border-[#006a61] bg-[#e5f7f5] text-[#006a61]"
                        : "border-[#c6c6cd] bg-white text-[#0b1c30]"
                    }`}
                  >
                    {item.nilai}
                  </div>
                  {/* label */}
                  <span className="hidden text-center text-[10px] leading-tight text-[#45464d] font-sans md:block">
                    {item.label}
                  </span>
                </div>
              ))}
            </div>
            {/* label mobile */}
            <div className="mt-3 flex justify-between md:hidden">
              <span className="text-xs text-[#45464d] font-sans">Sangat Tidak Setuju</span>
              <span className="text-xs text-[#45464d] font-sans">Sangat Setuju</span>
            </div>
          </div>

          <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
            <Button href="/tentang" variant="secondary" size="md">
              <FaBookOpen size={16} />
              Pelajari Tentang RIASEC
            </Button>
            <Button href="/quiz" variant="primary" size="md">
              Mulai Tes
              <FaArrowRight size={16} />
            </Button>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
