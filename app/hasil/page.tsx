"use client";

import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import RadarChart from "@/components/ui/RadarChart";
import { MixSquareCircleQuarter, CircleInCircle } from "@/components/ui/shape";
import { FaShareAlt, FaArrowRight } from "react-icons/fa";
import { FaBookOpen } from "react-icons/fa6";

// --- data dummy hasil tes ---
const hasilDummy = {
  tipeDominan: "Investigative",
  huruf: "I",
  deskripsi:
    "Kamu cenderung analitis, penasaran, dan logis. Kamu menikmati proses berpikir kritis, meneliti, dan memecahkan masalah yang kompleks. Lingkungan belajar yang ideal bagimu adalah yang memberikan kebebasan untuk mengeksplorasi ide secara mendalam.",
  skor: {
    R: 45,
    I: 88,
    A: 62,
    S: 35,
    E: 50,
    C: 40,
  },
};

// --- halaman hasil tes ---
export default function HasilPage() {
  const { tipeDominan, deskripsi, skor } = hasilDummy;
  const dataChart = [skor.R, skor.I, skor.A, skor.S, skor.E, skor.C];

  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-[#f8f9ff] py-8 md:py-20">
        <div className="mx-auto max-w-4xl px-6 md:px-12">
          {/* --- card utama --- */}
          <div className="relative overflow-hidden rounded-3xl bg-white p-8 shadow-card md:p-12">
            {/* dekorasi */}
            <MixSquareCircleQuarter
              className="absolute -right-16 -top-16 h-64 w-64 opacity-5"
              color="var(--color-secondary)"
            />
            <CircleInCircle
              className="absolute -left-12 -bottom-12 h-48 w-48 opacity-5"
              color="var(--color-secondary)"
            />

            <div className="relative z-10 grid grid-cols-1 gap-10 md:grid-cols-2 md:items-center">
              {/* kolom kiri tipe dominan */}
              <div className="flex flex-col">
                <Badge variant="category" colorClass="bg-[#e3f2fd] text-[#0d47a1]" className="mb-4">
                  Tipe Dominanmu
                </Badge>

                <h2 className="text-4xl font-extrabold tracking-tight text-[#0b1c30] md:text-5xl font-headline uppercase">
                  {tipeDominan}
                </h2>

                {/* divider */}
                <div className="my-5 h-1 w-16 rounded-full bg-secondary" />

                <p className="text-base leading-relaxed text-[#45464d] font-sans">{deskripsi}</p>
              </div>

              {/* kolom kanan radar chart */}
              <div className="flex items-center justify-center">
                <RadarChart data={dataChart} size={280} color="#006a61" className="max-w-full" />
              </div>
            </div>
          </div>

          {/* --- tombol --- */}
          <div className="mt-10 flex flex-col items-center justify-between gap-4 sm:flex-row">
            {/* kiri */}
            <div className="flex flex-col gap-3 sm:flex-row">
              <Button href="/hasil/detail" variant="secondary" size="md">
                <FaBookOpen size={16} />
                Pelajari Lebih Lanjut
              </Button>
              <Button href="#" variant="secondary" size="md">
                <FaShareAlt size={16} />
                Bagikan
              </Button>
            </div>
            {/* kanan */}
            <div>
              <Button href="/hasil/rekomendasi" variant="primary" size="md">
                Rekomendasi Jurusan
                <FaArrowRight size={16} />
              </Button>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
