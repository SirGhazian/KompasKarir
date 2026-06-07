"use client";

import { useState, useEffect, useMemo } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Button from "@/components/ui/Button";
import Select from "@/components/ui/Select";
import Pagination from "@/components/ui/Pagination";
import ReviewModal from "@/components/ui/ReviewModal";
import KampusDetailModal from "@/components/ui/KampusDetailModal";
import { FaMapMarkerAlt, FaMoneyBillWave } from "react-icons/fa";
import { submitReview, checkMyReview } from "@/utils/api";
import {
  matchProdiToKampus,
  getUktRange,
  formatRupiah,
  getProvinsiList,
} from "@/utils/matchKampus";
import type { KampusEntry } from "@/utils/dataKampus";

// tipe rekomendasi dari AI
interface ProdiAI {
  program_name: string;
  similarity_persen: number;
}
interface RekomendasiAI {
  rumpun: string;
  kecocokan_persen: number;
  prodi_tersedia: ProdiAI[];
}

const ITEMS_PER_PAGE = 6;

export default function RekomendasiPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const [filterProvinsi, setFilterProvinsi] = useState("");
  const [filterUkt, setFilterUkt] = useState("");
  const [showReview, setShowReview] = useState(false);
  const [hasReviewed, setHasReviewed] = useState(false);
  const [hasResult, setHasResult] = useState(true);
  const [rekomendasi, setRekomendasi] = useState<RekomendasiAI[]>([]);
  const [detailData, setDetailData] = useState<KampusEntry | null>(null);
  const [showDetail, setShowDetail] = useState(false);

  // baca hasil dari localStorage
  useEffect(() => {
    const cached = localStorage.getItem("kk_hasil");
    if (!cached) {
      const id = localStorage.getItem("kk_prediction_id");
      if (!id) setHasResult(false);
      return;
    }
    try {
      const hasil = JSON.parse(cached);
      if (hasil.rekomendasi) {
        setRekomendasi(hasil.rekomendasi);
      }
    } catch {
      setHasResult(false);
    }
  }, []);

  // cek review
  useEffect(() => {
    checkMyReview().then((exists) => setHasReviewed(exists));
  }, []);

  // match prodi AI ke dataKampus
  // Hanya gunakan 3 prodi teratas
  const matchedKampus = useMemo(() => {
    const results: KampusEntry[] = [];
    if (rekomendasi.length === 0) return results;

    const topProdi = rekomendasi[0].prodi_tersedia.slice(0, 3);
    for (const prodi of topProdi) {
      const matches = matchProdiToKampus(prodi.program_name);
      for (const m of matches) {
        if (
          !results.find(
            (r) => r.universitas === m.universitas && r.programStudi === m.programStudi,
          )
        ) {
          results.push(m);
        }
      }
    }
    return results;
  }, [rekomendasi]);

  // daftar provinsi untuk filter
  const provinsiOptions = useMemo(() => {
    const set = new Set<string>();
    matchedKampus.forEach((k) => {
      if (k.provinsi) set.add(k.provinsi);
    });
    return Array.from(set)
      .sort()
      .map((p) => ({ value: p, label: p }));
  }, [matchedKampus]);

  // filter data
  const filteredData = useMemo(() => {
    let data = matchedKampus;

    if (filterProvinsi) {
      data = data.filter((k) => k.provinsi === filterProvinsi);
    }

    if (filterUkt) {
      // filter ---> hanya tampilkan kampus yang punya data UKT di golongan tersebut
      const golIdx = parseInt(filterUkt) - 1;
      data = data.filter((k) => k.ukt[golIdx] !== null && k.ukt[golIdx] !== undefined);
    }

    return data;
  }, [matchedKampus, filterProvinsi, filterUkt]);

  // pagination
  const totalPages = Math.ceil(filteredData.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const currentData = filteredData.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  // reset page saat filter berubah
  useEffect(() => {
    setCurrentPage(1);
  }, [filterProvinsi, filterUkt]);

  // proteksi: belum tes
  if (!hasResult) {
    return (
      <>
        <Navbar />
        <main className="min-h-screen bg-[#f8f9ff] py-20">
          <div className="mx-auto max-w-2xl px-6 text-center">
            <h2 className="text-2xl font-extrabold text-[#0b1c30] font-headline md:text-3xl">
              Belum Ada Hasil Tes
            </h2>
            <p className="mt-3 text-base text-[#45464d] font-sans">
              Selesaikan tes RIASEC terlebih dahulu untuk melihat rekomendasi jurusan.
            </p>
            <div className="mt-8 flex justify-center">
              <Button href="/quiz" variant="primary" size="md">
                Mulai Tes Sekarang
              </Button>
            </div>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-[#f8f9ff]">
        {/* --- header + filter --- */}
        <section className="bg-[#006a61] py-10 md:py-14">
          <div className="mx-auto max-w-6xl px-4 md:px-8">
            <div className="mb-8">
              <h1 className="text-3xl font-extrabold tracking-tight text-white md:text-4xl font-headline">
                Rekomendasi Jurusan
              </h1>
              <p className="mt-2 text-base text-[#86f2e4] font-sans">
                Jurusan yang paling sesuai dengan profil kepribadian dan nilai akademikmu.
              </p>
            </div>

            {/* filter bar */}
            <div className="flex flex-col gap-3 rounded-2xl bg-white p-5 shadow-card sm:flex-row sm:items-center">
              <Select
                placeholder="Semua Provinsi"
                value={filterProvinsi}
                onChange={setFilterProvinsi}
                options={provinsiOptions}
                className="flex-1"
              />
              <Select
                placeholder="Semua Golongan"
                value={filterUkt}
                onChange={setFilterUkt}
                options={[
                  { value: "1", label: "Golongan I" },
                  { value: "2", label: "Golongan II" },
                  { value: "3", label: "Golongan III" },
                  { value: "4", label: "Golongan IV" },
                  { value: "5", label: "Golongan V" },
                  { value: "6", label: "Golongan VI" },
                  { value: "7", label: "Golongan VII" },
                  { value: "8", label: "Golongan VIII" },
                ]}
                className="flex-1"
              />
              <button
                onClick={() => {
                  setFilterProvinsi("");
                  setFilterUkt("");
                }}
                className="rounded-xl border-2 border-[#c6c6cd] bg-white px-5 py-2.5 text-sm font-semibold text-[#45464d] transition-colors hover:border-[#006a61] hover:text-[#006a61] font-sans cursor-pointer"
              >
                Reset
              </button>
            </div>
          </div>
        </section>

        {/* --- grid kampus --- */}
        <section className="py-10 md:py-14">
          <div className="mx-auto max-w-6xl px-4 md:px-8">
            <p className="mb-6 text-sm text-[#76777d] font-sans">
              Menampilkan {filteredData.length} program studi
            </p>

            {filteredData.length === 0 && (
              <p className="text-center text-base text-[#45464d] font-sans py-10">
                Tidak ada program studi yang cocok dengan filter saat ini.
              </p>
            )}

            <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
              {currentData.map((kampus, idx) => {
                return (
                  <div
                    key={`${kampus.universitas}-${kampus.programStudi}-${idx}`}
                    className="flex flex-col rounded-3xl bg-white p-6 shadow-card"
                  >
                    {/* universitas */}
                    <span className="mb-2 text-xs font-semibold text-[#76777d] font-sans">
                      {kampus.universitas}
                    </span>

                    {/* prodi */}
                    <h3 className="mb-1 text-lg font-bold text-[#0b1c30] font-headline">
                      {kampus.programStudi}
                    </h3>

                    {/* jenjang */}
                    <span className="mb-3 text-xs text-[#45464d] font-sans">{kampus.jenjang}</span>

                    {/* provinsi */}
                    <span className="mb-1.5 flex items-center gap-2 text-xs text-[#45464d] font-sans">
                      <FaMapMarkerAlt size={11} className="shrink-0 text-[#006a61]" />
                      {kampus.provinsi}
                    </span>

                    {/* ukt */}
                    {(() => {
                      if (filterUkt) {
                        const golIdx = parseInt(filterUkt) - 1;
                        const nilai = kampus.ukt[golIdx];
                        return nilai !== null && nilai !== undefined ? (
                          <span className="mb-4 flex items-center gap-2 text-xs text-[#45464d] font-sans">
                            <FaMoneyBillWave size={11} className="shrink-0 text-[#006a61]" />
                            Golongan {filterUkt}: {formatRupiah(nilai)}
                          </span>
                        ) : null;
                      }
                      const uktRange = getUktRange(kampus.ukt);
                      return uktRange ? (
                        <span className="mb-4 flex items-center gap-2 text-xs text-[#45464d] font-sans">
                          <FaMoneyBillWave size={11} className="shrink-0 text-[#006a61]" />
                          {formatRupiah(uktRange.min)} – {formatRupiah(uktRange.max)}
                        </span>
                      ) : null;
                    })()}

                    {/* tombol detail ukt */}
                    <button
                      onClick={() => {
                        setDetailData(kampus);
                        setShowDetail(true);
                      }}
                      className="mt-auto w-full rounded-xl border-2 border-[#c6c6cd] bg-white px-4 py-2.5 text-sm font-semibold text-[#0b1c30] transition-colors hover:border-[#006a61] hover:text-[#006a61] font-sans cursor-pointer"
                    >
                      Detail UKT
                    </button>
                  </div>
                );
              })}
            </div>

            {/* pagination */}
            {totalPages > 1 && (
              <div className="mt-10">
                <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={setCurrentPage}
                />
              </div>
            )}
          </div>
        </section>

        {/* --- section beri ulasan --- */}
        <section className="bg-[#e5f7f5] py-14 md:py-20">
          <div className="mx-auto max-w-6xl px-4 md:px-8">
            <div className="relative overflow-hidden rounded-3xl bg-[#006a61] p-10 text-center md:p-14">
              <div className="absolute -right-16 -top-16 h-64 w-64 rounded-full opacity-10 bg-white" />
              <div className="absolute -bottom-20 -left-20 h-72 w-72 rounded-full opacity-10 bg-white" />
              <div className="relative z-10">
                {hasReviewed ? (
                  <>
                    <h3 className="mb-3 text-2xl font-extrabold tracking-tight text-white md:text-3xl font-headline">
                      Terima Kasih Atas Ulasanmu!
                    </h3>
                    <p className="mb-6 mx-auto max-w-md text-base text-[#86f2e4] font-sans">
                      Ulasanmu membantu kami terus meningkatkan kualitas layanan KompasKarir.
                    </p>
                    <a
                      href="/ulasan"
                      target="_blank"
                      className="inline-flex cursor-pointer items-center justify-center gap-2.5 rounded-2xl border-2 border-white bg-white px-8 py-4 text-base font-semibold text-[#006a61] transition-all duration-200 hover:bg-transparent hover:text-white active:scale-95 font-sans"
                    >
                      Lihat Ulasan
                    </a>
                  </>
                ) : (
                  <>
                    <h3 className="mb-3 text-2xl font-extrabold tracking-tight text-white md:text-3xl font-headline">
                      Bagaimana Pengalamanmu?
                    </h3>
                    <p className="mb-6 mx-auto max-w-md text-base text-[#86f2e4] font-sans">
                      Bantu kami menjadi lebih baik dengan memberikan ulasan singkat tentang
                      pengalamanmu.
                    </p>
                    <button
                      onClick={() => setShowReview(true)}
                      className="inline-flex cursor-pointer items-center justify-center gap-2.5 rounded-2xl border-2 border-white bg-white px-8 py-4 text-base font-semibold text-[#006a61] transition-all duration-200 hover:bg-transparent hover:text-white active:scale-95 font-sans"
                    >
                      Beri Ulasan
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* modal review */}
      <ReviewModal
        isOpen={showReview}
        onClose={() => setShowReview(false)}
        onSubmit={async ({ nama, rating, ulasan }) => {
          try {
            await submitReview(nama, rating, ulasan);
            setHasReviewed(true);
            alert("Ulasan berhasil dikirim!");
          } catch (err: unknown) {
            const message = err instanceof Error ? err.message : "Gagal mengirim ulasan";
            alert(message);
          }
        }}
      />

      {/* modal detail kampus */}
      <KampusDetailModal
        isOpen={showDetail}
        onClose={() => setShowDetail(false)}
        data={detailData}
      />

      <Footer />
    </>
  );
}
