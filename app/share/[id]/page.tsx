"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Button from "@/components/ui/Button";
import RadarChart from "@/components/ui/RadarChart";
import Skeleton, { TextSkeleton } from "@/components/ui/Skeleton";
import { FaArrowRight } from "react-icons/fa";
import { getTipeInfo } from "@/utils/riasecInfo";
import { getShareData } from "@/utils/api";

// tipe data
interface NarasiData {
  ringkasan: string;
  kekuatan: string[];
  alasan_kecocokan: string;
  saran_pengembangan: string;
}

interface HasilShare {
  kode_riasec: string;
  prediksi_utama: string;
  narasi: NarasiData | null;
  skorRiasec: { r: number; i: number; a: number; s: number; e: number; c: number };
}

export default function SharePage() {
  const params = useParams();
  const id = params.id as string;

  const [hasil, setHasil] = useState<HasilShare | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (!id) return;
    getShareData(id)
      .then((data) => {
        setHasil(data.hasil);
        setLoading(false);
      })
      .catch(() => {
        setError(true);
        setLoading(false);
      });
  }, [id]);

  // loading
  if (loading) {
    return (
      <>
        <Navbar />
        <main className="min-h-screen bg-[#f8f9ff] py-12 md:py-20">
          <div className="mx-auto max-w-3xl px-6 md:px-12">
            <Skeleton className="mb-6 h-8 w-48 mx-auto" />
            <Skeleton className="mb-10 h-64 w-64 rounded-full mx-auto" />
            <TextSkeleton lines={4} />
          </div>
        </main>
        <Footer />
      </>
    );
  }

  // error / link tidak valid
  if (error || !hasil || !hasil.kode_riasec || !hasil.skorRiasec) {
    return (
      <>
        <Navbar />
        <main className="min-h-screen bg-[#f8f9ff] py-20">
          <div className="mx-auto max-w-2xl px-6 text-center">
            <h2 className="text-2xl font-extrabold text-[#0b1c30] font-headline md:text-3xl">
              Link Tidak Valid
            </h2>
            <p className="mt-3 text-base text-[#45464d] font-sans">
              Link yang kamu akses tidak ditemukan atau sudah tidak tersedia.
            </p>
            <div className="mt-8 flex justify-center">
              <Button href="/" variant="primary" size="md">
                Kembali ke Beranda
              </Button>
            </div>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  // render hasil
  const tipe = getTipeInfo(hasil.kode_riasec[0]);
  const skor = hasil.skorRiasec;
  const dataChart = [skor.r, skor.i, skor.a, skor.s, skor.e, skor.c];

  return (
    <>
      <Navbar />

      <main className="min-h-screen">
        {/* === hero section: tipe + radar === */}
        <section className="bg-white py-14 md:py-20">
          <div className="mx-auto max-w-4xl px-6 md:px-12">
            <div className="grid grid-cols-1 items-center gap-10 md:grid-cols-2">
              {/* kiri: radar chart */}
              <div className="flex items-center justify-center">
                <RadarChart data={dataChart} size={280} color="#006a61" className="max-w-full" />
              </div>

              {/* kanan: tipe info */}
              <div className="text-center md:text-left">
                <p className="mb-2 text-xs font-bold uppercase tracking-[0.15em] text-[#006a61] font-sans">
                  Kode RIASEC — {hasil.kode_riasec}
                </p>
                <h1 className="text-4xl font-extrabold tracking-tight text-[#0b1c30] md:text-5xl font-headline uppercase">
                  {tipe.nama}
                </h1>
                <p className="mt-4 text-base leading-relaxed text-[#45464d] font-sans">
                  {hasil.narasi?.ringkasan || tipe.deskripsi}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* === skor breakdown === */}
        <section className="bg-[#e5f7f5] py-12 md:py-16">
          <div className="mx-auto max-w-4xl px-6 md:px-12">
            <h2 className="mb-8 text-center text-xl font-extrabold text-[#0b1c30] font-headline md:text-2xl">
              Skor Per Dimensi
            </h2>
            <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-6">
              {(["r", "i", "a", "s", "e", "c"] as const).map((key) => {
                const info = getTipeInfo(key.toUpperCase());
                const value = skor[key];
                return (
                  <div
                    key={key}
                    className="flex flex-col items-center gap-2 rounded-2xl bg-white p-5"
                  >
                    <span className="text-3xl font-extrabold text-[#006a61] font-headline">
                      {Math.round(value)}
                    </span>
                    <span className="text-xs font-semibold text-[#45464d] font-sans text-center">
                      {info.nama}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* === narasi detail (sama dengan halaman hasil) === */}
        {hasil.narasi && (
          <section className="bg-[#f8f9ff] py-12 md:py-16">
            <div className="mx-auto max-w-4xl px-6 md:px-12 flex flex-col gap-6">
              {/* kekuatan */}
              {hasil.narasi.kekuatan.length > 0 && (
                <div className="rounded-3xl bg-white p-8">
                  <h3 className="mb-4 text-lg font-bold text-[#0b1c30] font-headline">Kekuatan</h3>
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
                    Mengapa Cocok
                  </h3>
                  <p className="text-sm leading-relaxed text-[#45464d] font-sans">
                    {hasil.narasi.alasan_kecocokan}
                  </p>
                </div>
              )}
            </div>
          </section>
        )}
      </main>

      <Footer />
    </>
  );
}
