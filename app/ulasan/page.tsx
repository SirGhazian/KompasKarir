"use client";

import { useState, useEffect } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Badge from "@/components/ui/Badge";
import { MixSquareCircleQuarter, CircleInCircle } from "@/components/ui/shape";
import Skeleton, { TextSkeleton } from "@/components/ui/Skeleton";
import { FaStar } from "react-icons/fa";
import { getReviews } from "@/utils/api";

// tipe data review dari backend
interface Review {
  id: string;
  nama: string;
  rating: number;
  text: string;
  createdAt: string;
}

export default function UlasanPage() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // cek cache di sessionStorage
    const cached = sessionStorage.getItem("kk_reviews");
    if (cached) {
      try {
        setReviews(JSON.parse(cached));
        setLoading(false);
        return;
      } catch {
        // lanjut fetch jika parse gagal cuyyy
      }
    }

    getReviews()
      .then((data) => {
        const list = data.reviews || [];
        setReviews(list);
        sessionStorage.setItem("kk_reviews", JSON.stringify(list));
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  // hitung rata-rata rating
  const avgRating =
    reviews.length > 0
      ? (reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length).toFixed(1)
      : "0";

  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-white">
        {/* --- hero section --- */}
        <section className="relative overflow-hidden bg-white py-16 md:py-24">
          <div className="mx-auto max-w-4xl px-6 md:px-12 text-center">
            <h1 className="mb-6 mx-auto max-w-4xl text-3xl font-extrabold leading-tight tracking-tight text-[#0b1c30] md:text-5xl lg:text-6xl font-headline">
              Kisah <span className="text-secondary">Sukses</span> Bersama KompasKarir
            </h1>
            <p className="mx-auto max-w-2xl text-lg leading-relaxed text-[#45464d] font-sans">
              Siswa yang sebelumnya ragu dalam menentukan jurusan kuliah kini telah menemukan
              pilihan yang sesuai melalui asesmen KompasKarir.
            </p>
          </div>
        </section>

        {/* --- statistik section --- */}
        <section className="mx-auto max-w-4xl px-6 md:px-12 -mt-8 mb-16 relative z-10">
          <div className="rounded-3xl bg-white p-8 shadow-card md:p-10">
            {loading ? (
              <div className="flex flex-col items-center gap-8 md:flex-row md:justify-between">
                <Skeleton className="h-12 w-24 md:h-14 md:w-28" />
                <div className="hidden md:block h-16 w-px bg-[#e5eeff]" />
                <div className="flex flex-col items-center gap-2">
                  <Skeleton className="h-16 w-32 md:h-20 md:w-36" />
                  <Skeleton className="h-4 w-24" />
                </div>
                <div className="hidden md:block h-16 w-px bg-[#e5eeff]" />
                <Skeleton className="h-12 w-24 md:h-14 md:w-28" />
              </div>
            ) : (
              <div className="flex flex-col items-center gap-8 md:flex-row md:justify-between">
                {/* tes selesai */}
                <div className="flex items-center gap-4">
                  <span className="text-4xl font-extrabold text-[#006a61] font-headline md:text-5xl">
                    {reviews.length > 0 ? `${reviews.length}+` : "—"}
                  </span>
                  <span className="text-sm leading-tight text-[#45464d] font-sans">
                    Ulasan
                    <br />
                    Diterima
                  </span>
                </div>

                {/* divider */}
                <div className="hidden md:block h-16 w-px bg-[#e5eeff]" />
                <div className="block md:hidden w-full h-px bg-[#e5eeff]" />

                {/* rating */}
                <div className="flex flex-col items-center gap-2">
                  <div className="flex items-baseline gap-1">
                    <span className="text-6xl font-extrabold text-[#0b1c30] font-headline md:text-7xl">
                      {avgRating}
                    </span>
                    <span className="text-2xl font-bold text-[#76777d] font-headline">/5</span>
                  </div>
                  <div className="flex items-center gap-0.5">
                    {[1, 2, 3, 4, 5].map((s) => (
                      <FaStar
                        key={s}
                        size={14}
                        className={
                          s <= Math.round(Number(avgRating))
                            ? "text-amber-400"
                            : "text-amber-400/40"
                        }
                      />
                    ))}
                  </div>
                  <span className="text-xs font-semibold uppercase tracking-widest text-[#006a61] font-sans">
                    Rating Rata-rata
                  </span>
                </div>

                {/* divider */}
                <div className="hidden md:block h-16 w-px bg-[#e5eeff]" />
                <div className="block md:hidden w-full h-px bg-[#e5eeff]" />

                {/* akurasi */}
                <div className="flex items-center gap-4">
                  <span className="text-sm leading-tight text-right text-[#45464d] font-sans">
                    Akurasi
                    <br />
                    Prediksi
                  </span>
                  <span className="text-4xl font-extrabold text-[#006a61] font-headline md:text-5xl">
                    93%
                  </span>
                </div>
              </div>
            )}
          </div>
        </section>

        {/* --- testimoni section --- */}
        <section className="relative overflow-hidden py-16 md:py-20 bg-[#e5f7f5]">
          {/* dekorasi shape */}
          <MixSquareCircleQuarter
            className="absolute -left-20 top-20 h-96 w-96 opacity-10"
            color="var(--color-secondary-dim)"
          />
          <CircleInCircle
            className="absolute -right-20 bottom-10 h-72 w-72 opacity-10"
            color="var(--color-secondary-dim)"
          />

          <div className="mx-auto max-w-6xl px-6 md:px-12 relative z-10">
            {/* header */}
            <div className="mb-12 text-center">
              <h2 className="text-2xl font-extrabold tracking-tight text-[#0b1c30] md:text-3xl font-headline">
                Testimoni Pengguna
              </h2>
              <div className="mt-3 mx-auto h-1 w-16 rounded-full bg-secondary" />
            </div>

            {/* loading skeleton */}
            {loading && (
              <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
                {[1, 2, 3].map((i) => (
                  <div
                    key={i}
                    className="flex flex-col rounded-3xl border-2 border-[#c6c6cd] bg-white p-8"
                  >
                    <Skeleton className="mb-3 h-3 w-16" />
                    <div className="mb-4 flex items-center gap-1">
                      {[1, 2, 3, 4, 5].map((s) => (
                        <Skeleton key={s} className="h-4 w-4 rounded-full" />
                      ))}
                    </div>
                    <TextSkeleton lines={3} className="mb-6" />
                    <div className="mt-auto border-t border-[#e5eeff] pt-4">
                      <Skeleton className="h-4 w-24" />
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* empty */}
            {!loading && reviews.length === 0 && (
              <p className="text-center text-base text-[#76777d] font-sans">
                Belum ada ulasan. Jadilah yang pertama!
              </p>
            )}

            {/* grid card (gaya alur metodologi: border, rounded-3xl, p-8) */}
            {!loading && reviews.length > 0 && (
              <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
                {reviews.map((review) => (
                  <div
                    key={review.id}
                    className="flex flex-col rounded-3xl border-2 border-[#c6c6cd] bg-white p-8"
                  >
                    {/* label rating */}
                    <Badge variant="label" className="mb-3 text-[#006a61]">
                      {review.rating}.0 / 5.0
                    </Badge>

                    {/* bintang */}
                    <div className="mb-4 flex items-center gap-0.5">
                      {[1, 2, 3, 4, 5].map((s) => (
                        <FaStar
                          key={s}
                          size={14}
                          className={s <= review.rating ? "text-amber-400" : "text-[#c6c6cd]"}
                        />
                      ))}
                    </div>

                    {/* teks ulasan */}
                    <p className="mb-6 flex-1 text-sm leading-relaxed text-[#45464d] font-sans">
                      {review.text}
                    </p>

                    {/* nama */}
                    <div className="mt-auto border-t border-[#e5eeff] pt-4">
                      <span className="text-sm font-bold text-[#0b1c30] font-sans">
                        {review.nama}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
