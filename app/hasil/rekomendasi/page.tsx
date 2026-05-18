"use client";

import { useState } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Button from "@/components/ui/Button";
import Select from "@/components/ui/Select";
import Pagination from "@/components/ui/Pagination";
import { FaMapMarkerAlt, FaMoneyBillWave } from "react-icons/fa";

// --- data dummy jurusan ---
const jurusanData = [
  {
    id: 1,
    universitas: "Universitas Indonesia",
    nama: "Teknik Informatika",
    lokasi: "Depok, Jawa Barat",
    biaya: "Rp 8.000.000 / semester",
    deskripsi:
      "Program studi yang mempelajari pengembangan perangkat lunak, algoritma, dan sistem komputasi modern.",
  },
  {
    id: 2,
    universitas: "Institut Teknologi Bandung",
    nama: "Sistem Informasi",
    lokasi: "Bandung, Jawa Barat",
    biaya: "Rp 12.000.000 / semester",
    deskripsi:
      "Menggabungkan teknologi informasi dengan manajemen bisnis untuk solusi digital yang efektif.",
  },
  {
    id: 3,
    universitas: "Universitas Gadjah Mada",
    nama: "Ilmu Komputer",
    lokasi: "Yogyakarta",
    biaya: "Rp 7.500.000 / semester",
    deskripsi:
      "Fokus pada fondasi ilmiah komputasi, kecerdasan buatan, dan pemrosesan data skala besar.",
  },
  {
    id: 4,
    universitas: "Universitas Brawijaya",
    nama: "Teknologi Informasi",
    lokasi: "Malang, Jawa Timur",
    biaya: "Rp 6.000.000 / semester",
    deskripsi:
      "Program studi yang menekankan penerapan teknologi untuk memecahkan permasalahan nyata di masyarakat.",
  },
  {
    id: 5,
    universitas: "Universitas Diponegoro",
    nama: "Teknik Komputer",
    lokasi: "Semarang, Jawa Tengah",
    biaya: "Rp 6.500.000 / semester",
    deskripsi:
      "Mempelajari perancangan hardware dan software embedded system serta jaringan komputer.",
  },
  {
    id: 6,
    universitas: "Universitas Airlangga",
    nama: "Statistika",
    lokasi: "Surabaya, Jawa Timur",
    biaya: "Rp 7.000.000 / semester",
    deskripsi:
      "Mengembangkan kemampuan analisis data dan pemodelan statistik untuk berbagai bidang terapan.",
  },
];

// --- pagination ---
const ITEMS_PER_PAGE = 4;
const totalPages = Math.ceil(jurusanData.length / ITEMS_PER_PAGE);

// --- halaman rekomendasi jurusan ---
export default function RekomendasiPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const [lokasi, setLokasi] = useState("");
  const [biaya, setBiaya] = useState("");

  // data per halaman
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const currentData = jurusanData.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-[#f8f9ff]">
        {/* --- section header + filter (bg hijau) --- */}
        <section className="bg-[#006a61] py-10 md:py-14">
          <div className="mx-auto max-w-6xl px-4 md:px-8">
            {/* --- header --- */}
            <div className="mb-8">
              <h1 className="text-3xl font-extrabold tracking-tight text-white md:text-4xl font-headline">
                Rekomendasi Jurusan
              </h1>
              <p className="mt-2 text-base text-[#86f2e4] font-sans">
                Jurusan yang paling sesuai dengan profil kepribadian dan nilai akademikmu.
              </p>
            </div>

            {/* --- filter bar --- */}
            <div className="flex flex-col gap-3 rounded-2xl bg-white p-5 shadow-card sm:flex-row sm:items-center">
              {/* dropdown lokasi */}
              <Select
                placeholder="Lokasi"
                value={lokasi}
                onChange={setLokasi}
                options={[
                  { value: "jawa-barat", label: "Jawa Barat" },
                  { value: "jawa-tengah", label: "Jawa Tengah" },
                  { value: "jawa-timur", label: "Jawa Timur" },
                  { value: "yogyakarta", label: "Yogyakarta" },
                  { value: "lainnya", label: "Lainnya" },
                ]}
                className="flex-1"
              />

              {/* dropdown biaya */}
              <Select
                placeholder="Biaya"
                value={biaya}
                onChange={setBiaya}
                options={[
                  { value: "rendah", label: "< Rp 7.000.000" },
                  { value: "sedang", label: "Rp 7.000.000 – 10.000.000" },
                  { value: "tinggi", label: "> Rp 10.000.000" },
                ]}
                className="flex-1"
              />

              {/* tombol terapkan */}
              <Button variant="primary" size="sm">
                Terapkan
              </Button>
            </div>
          </div>
        </section>

        {/* --- grid jurusan --- */}
        <section className="py-10 md:py-14">
          <div className="mx-auto max-w-6xl px-4 md:px-8">
            <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
              {currentData.map((jurusan) => (
                <div
                  key={jurusan.id}
                  className="flex flex-col rounded-3xl bg-white p-6 shadow-card"
                >
                  {/* header card */}
                  <div className="mb-3">
                    <span className="text-xs font-semibold text-[#76777d] font-sans">
                      {jurusan.universitas}
                    </span>
                  </div>

                  {/* nama jurusan */}
                  <h3 className="mb-3 text-xl font-bold text-[#0b1c30] font-headline">
                    {jurusan.nama}
                  </h3>

                  {/* info lokasi & biaya */}
                  <div className="mb-3 flex flex-col gap-1.5">
                    <span className="flex items-center gap-2 text-xs text-[#45464d] font-sans">
                      <FaMapMarkerAlt size={12} className="text-[#006a61]" />
                      {jurusan.lokasi}
                    </span>
                    <span className="flex items-center gap-2 text-xs text-[#45464d] font-sans">
                      <FaMoneyBillWave size={12} className="text-[#006a61]" />
                      {jurusan.biaya}
                    </span>
                  </div>

                  {/* deskripsi */}
                  <p className="mb-5 flex-1 text-sm leading-relaxed text-[#45464d] font-sans">
                    {jurusan.deskripsi}
                  </p>

                  {/* tombol detail */}
                  <Button href="#" variant="secondary" size="sm" className="w-full">
                    Lihat Detail
                  </Button>
                </div>
              ))}
            </div>
          </div>

          {/* --- pagination --- */}
          <div className="mt-10">
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
            />
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
