import React from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Button from "@/components/ui/Button";
import { FaStar, FaArrowRight } from "react-icons/fa";
// Data ulasan atau testimoni
const testimonials = [
  {
    id: 1,
    name: "Budi Santoso",
    role: "Siswa SMA",
    rating: 5,
    text: "Sangat membantu menemukan jurusan kuliah yang tepat! Dulu saya bingung mau ambil apa, sekarang jadi lebih yakin berkat analisis RIASEC-nya."
  },
  {
    id: 2,
    name: "Citra Lestari",
    role: "Mahasiswa Baru",
    rating: 5,
    text: "Tesnya akurat dan memberikan rekomendasi yang relevan. Interface-nya juga bagus dan mudah digunakan, pokoknya recommended banget!"
  },
  {
    id: 3,
    name: "Agus Wijaya",
    role: "Fresh Graduate",
    rating: 4,
    text: "Rekomendasi karirnya sesuai dengan kepribadian saya. Membantu saya untuk memetakan opsi karir ke depannya."
  },
  {
    id: 4,
    name: "Dina Fitriani",
    role: "Siswa SMK",
    rating: 5,
    text: "Platform ini sangat membantu untuk melihat potensi diri sendiri. Hasilnya cukup detail dan memberikan gambaran luas soal pekerjaan."
  },
  {
    id: 5,
    name: "Eko Pratama",
    role: "Mahasiswa Tingkat Akhir",
    rating: 5,
    text: "Saya merekomendasikan ini ke teman-teman saya. Prosesnya cepat dan hasil rekomendasinya sangat masuk akal."
  },
  {
    id: 6,
    name: "Fira Ananda",
    role: "Pekerja Freelance",
    rating: 4,
    text: "Mencoba tes ini iseng-iseng, tapi ternyata hasilnya cukup akurat dengan minat saya saat ini. Sangat berguna!"
  }
];

export default function UlasanPage() {
  return (
    <>
      <Navbar />
      <main>
        {/* Hero Section */}
        <section className="relative overflow-hidden pt-16 pb-12 bg-surface">
          <div className="max-w-container-max mx-auto px-margin-desktop text-center">
            <h1 className="mb-6 max-w-4xl text-4xl font-extrabold leading-tight tracking-tight text-on-surface md:text-6xl lg:text-7xl font-headline mx-auto">Kisah <span className="text-secondary">Sukses</span> Bersama KompasKarir</h1>
            <p className="font-body-lg text-body-lg text-on-surface-variant max-w-2xl mx-auto">Ribuan pelajar dan profesional telah menemukan jalur karir impian mereka melalui analisis RIASEC yang didukung oleh presisi AI.</p>
          </div>
          <div className="absolute -top-24 -right-24 w-96 h-96 bg-secondary-container/20 rounded-full blur-3xl -z-10"></div>
          <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-tertiary-fixed/20 rounded-full blur-3xl -z-10"></div>
        </section>
        {/* Statistik Section */}
        <section className="max-w-container-max mx-auto px-12 mb-16">
          <div className="bg-surface-container-low border border-outline-variant/30 rounded-xl p-8 flex flex-col md:flex-row justify-around items-center gap-8 shadow-sm">
            <div className="flex flex-col items-center text-center">
              <span className="font-display-lg text-headline-lg text-secondary">500+</span>
              <span className="font-label-md text-label-md text-on-surface-variant">Tes Selesai</span>
            </div>
            <div className="hidden md:block w-px h-12 bg-outline-variant/50"></div>
            <div className="flex flex-col items-center text-center">
              <div className="flex items-center gap-1">
                <span className="font-display-lg text-headline-lg text-secondary">4.9/5</span>
                <FaStar size={16} />
              </div>
              <span className="font-label-md text-label-md text-on-surface-variant">Rating Rata-rata</span>
            </div>
            <div className="hidden md:block w-px h-12 bg-outline-variant/50"></div>
            <div className="flex flex-col items-center text-center">
              <span className="font-display-lg text-headline-lg text-secondary">95%</span>
              <span className="font-label-md text-label-md text-on-surface-variant">Akurasi Prediksi</span>
            </div>
          </div>
        </section>
        {/* Testimoni Section */}
        <section className="max-w-container-max mx-auto px-4 md:px-12 mb-20">
          <h2 className="font-display-md text-headline-md text-on-surface text-center mb-10">Testimoni Pengguna</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {testimonials.map((testimoni) => (
              <div key={testimoni.id} className="bg-surface-container-low border border-outline-variant/30 rounded-xl p-6 flex flex-col h-full hover:shadow-md transition-shadow">
                <div className="flex items-center gap-1 mb-4">
                  <FaStar size={16} className="text-amber-400" />
                </div>
                <p className="font-body-md text-body-md text-on-surface-variant mb-6 flex-grow">"{testimoni.text}"</p>
                <div className="flex flex-col mt-auto pt-4 border-t border-outline-variant/20">
                  <span className="font-label-lg text-label-lg text-on-surface">{testimoni.name}</span>
                  <span className="font-body-sm text-body-sm text-on-surface-variant">{testimoni.role}</span>
                </div>
              </div>
            ))}
          </div>
        </section>
        {/* CTA Section */}
        <section className="text-on-surface py-20">
          <div className="max-w-container-max mx-auto px-4 md:px-12 text-center">
            <h2 className="font-display-md text-headline-md mb-4">Temukan Potensi Karir Anda Sekarang!</h2>
            <p className="font-body-md text-body-md text-on-surface-variant mb-10">Bergabunglah dengan puluhan ribu pengguna yang telah sukses menemukan jalur karir impian mereka.</p>
            <Button href="/instruksi" size="lg" variant="primary" className="font-headline">
              Mulai Tes Sekarang <FaArrowRight className="ml-2" /></Button>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
