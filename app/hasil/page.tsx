"use client";

import { useState, useEffect } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import RadarChart from "@/components/ui/RadarChart";
import { MixSquareCircleQuarter, CircleInCircle } from "@/components/ui/shape";
import { FaShareAlt, FaArrowRight } from "react-icons/fa";
import { FaBookOpen } from "react-icons/fa6";
import { getTipeInfo } from "@/utils/riasecInfo";
import { getPrediction, createShare } from "@/utils/api";
import { TextSkeleton } from "@/components/ui/Skeleton";
import Skeleton from "@/components/ui/Skeleton";
import ShareModal from "@/components/ui/ShareModal";

// --- tipe hasil dari backend ---
interface NarasiData {
  ringkasan: string;
  kekuatan: string[];
  alasan_kecocokan: string;
  saran_pengembangan: string;
}

interface HasilPrediksi {
  kode_riasec: string;
  prediksi_utama: string;
  narasi: NarasiData | null;
  skorRiasec: { r: number; i: number; a: number; s: number; e: number; c: number };
}

// --- halaman hasil tes ---
export default function HasilPage() {
  const [hasil, setHasil] = useState<HasilPrediksi | null>(null);
  const [loading, setLoading] = useState(true);
  const [shareUrl, setShareUrl] = useState("");
  const [showShare, setShowShare] = useState(false);
  const [sharing, setSharing] = useState(false);

  useEffect(() => {
    // baca hasil dari localStorage dulu
    const cached = localStorage.getItem("kk_hasil");
    if (cached) {
      try {
        setHasil(JSON.parse(cached));
        setLoading(false);
        return;
      } catch {
        // lanjut fetch jika parse gagal
      }
    }

    // fallback: fetch via prediction id
    const id = localStorage.getItem("kk_prediction_id");
    if (id) {
      getPrediction(id)
        .then((data) => {
          setHasil(data.hasil);
          setLoading(false);
        })
        .catch(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, []);

  // --- loading state (skeleton) ---
  if (loading) {
    return (
      <>
        <Navbar />
        <main className="min-h-screen bg-[#f8f9ff] py-8 md:py-20">
          <div className="mx-auto max-w-4xl px-6 md:px-12">
            <div className="rounded-3xl bg-white p-8 shadow-card md:p-12">
              <div className="grid grid-cols-1 gap-10 md:grid-cols-2 md:items-center">
                {/* kolom kiri: skeleton deskripsi */}
                <div className="flex flex-col">
                  <Skeleton className="mb-4 h-7 w-40 rounded-full" />
                  <Skeleton className="h-10 w-56" />
                  <div className="my-5 h-1 w-16 rounded-full bg-[#e5eeff]" />
                  {/* skeleton untuk narasi (antisipasi gemini lama/gagal) */}
                  <TextSkeleton lines={4} />
                </div>
                {/* kolom kanan: skeleton radar */}
                <div className="flex items-center justify-center">
                  <Skeleton className="h-64 w-64 rounded-full" />
                </div>
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  // --- empty state (belum tes atau data tidak valid) ---
  if (!hasil || !hasil.kode_riasec || !hasil.skorRiasec) {
    return (
      <>
        <Navbar />
        <main className="min-h-screen bg-[#f8f9ff] py-20">
          <div className="mx-auto max-w-2xl px-6 text-center">
            <h2 className="text-2xl font-extrabold text-[#0b1c30] font-headline md:text-3xl">
              Belum Ada Hasil Tes
            </h2>
            <p className="mt-3 text-base text-[#45464d] font-sans">
              Selesaikan tes RIASEC terlebih dahulu untuk melihat hasil analisismu.
            </p>
            <div className="mt-8 flex justify-center">
              <Button href="/quiz" variant="primary" size="md">
                Mulai Tes Sekarang
                <FaArrowRight size={16} />
              </Button>
            </div>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  // --- data hasil ---
  const tipe = getTipeInfo(hasil.kode_riasec[0]);
  const skor = hasil.skorRiasec;
  const dataChart = [skor.r, skor.i, skor.a, skor.s, skor.e, skor.c];

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
                  Tipe Dominanmu — {hasil.kode_riasec}
                </Badge>

                <h2 className="text-4xl font-extrabold tracking-tight text-[#0b1c30] md:text-5xl font-headline uppercase">
                  {tipe.nama}
                </h2>

                {/* divider */}
                <div className="my-5 h-1 w-16 rounded-full bg-secondary" />

                <p className="text-base leading-relaxed text-[#45464d] font-sans">
                  {hasil.narasi?.ringkasan || tipe.deskripsi}
                </p>
              </div>

              {/* kolom kanan radar chart */}
              <div className="flex items-center justify-center">
                <RadarChart data={dataChart} size={280} color="#006a61" className="max-w-full" />
              </div>
            </div>
          </div>

          {/* --- tombol --- */}
          <div className="mt-8 flex flex-col items-center justify-between gap-4 sm:flex-row">
            {/* kiri */}
            <div className="flex flex-col gap-3 sm:flex-row">
              <Button href="/tentang" variant="secondary" size="md">
                <FaBookOpen size={16} />
                Pelajari Lebih Lanjut
              </Button>
              <button
                onClick={async () => {
                  if (sharing || !hasil) return;
                  setSharing(true);
                  try {
                    const res = await createShare(hasil as unknown as Record<string, unknown>);
                    setShareUrl(`${window.location.origin}/share/${res.shareId}`);
                    setShowShare(true);
                  } catch (err) {
                    console.error("Gagal membuat share:", err);
                    alert("Gagal membuat link bagikan. Coba lagi.");
                  } finally {
                    setSharing(false);
                  }
                }}
                disabled={sharing}
                className="inline-flex items-center justify-center gap-2.5 rounded-2xl border-2 border-[#c6c6cd] bg-white px-8 py-4 text-base font-semibold text-[#0b1c30] transition-all duration-200 hover:border-[#006a61] hover:text-[#006a61] active:scale-95 font-sans disabled:cursor-not-allowed disabled:opacity-60 cursor-pointer"
              >
                <FaShareAlt size={16} />
                {sharing ? "Memproses..." : "Bagikan"}
              </button>
            </div>
            {/* kanan */}
            <div>
              <Button href="/hasil/rekomendasi" variant="primary" size="md">
                Rekomendasi Jurusan
                <FaArrowRight size={16} />
              </Button>
            </div>
          </div>

          {/* --- detail narasi AI --- */}
          {hasil.narasi && (
            <div className="mt-8 flex flex-col gap-6">
              {/* kekuatan */}
              {hasil.narasi.kekuatan.length > 0 && (
                <div className="rounded-3xl bg-white p-8">
                  <h3 className="mb-4 text-lg font-bold text-[#0b1c30] font-headline">
                    Kekuatanmu
                  </h3>
                  <ul className="flex flex-col gap-2">
                    {hasil.narasi.kekuatan.map((item, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <span className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#e5f7f5] text-xs font-bold text-[#006a61]">
                          ✓
                        </span>
                        <span className="text-sm leading-relaxed text-[#45464d] font-sans">
                          {item}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* alasan kecocokan */}
              {hasil.narasi.alasan_kecocokan && (
                <div className="rounded-3xl bg-white p-8">
                  <h3 className="mb-3 text-lg font-bold text-[#0b1c30] font-headline">
                    Mengapa Cocok Untukmu
                  </h3>
                  <p className="text-sm leading-relaxed text-[#45464d] font-sans">
                    {hasil.narasi.alasan_kecocokan}
                  </p>
                </div>
              )}

              {/* saran pengembangan */}
              {hasil.narasi.saran_pengembangan && (
                <div className="rounded-3xl bg-[#e5f7f5] p-8">
                  <h3 className="mb-3 text-lg font-bold text-[#006a61] font-headline">
                    Saran Pengembangan
                  </h3>
                  <p className="text-sm leading-relaxed text-[#45464d] font-sans">
                    {hasil.narasi.saran_pengembangan}
                  </p>
                </div>
              )}
            </div>
          )}
        </div>
      </main>

      <ShareModal isOpen={showShare} onClose={() => setShowShare(false)} shareUrl={shareUrl} />
      <Footer />
    </>
  );
}
