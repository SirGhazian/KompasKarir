import React, { Fragment } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Button from "@/components/ui/Button";
import { FaArrowRight } from "react-icons/fa";
import { HiAcademicCap } from "react-icons/hi2";
import { MixSquareCircleQuarter, CircleInCircle } from "@/components/ui/shape";

// --- data dimensi riasec ---
const dimensi = [
  {
    huruf: "R",
    label: "Realistic",
    deskripsi:
      "Berfokus pada tindakan praktis, benda, mesin, atau bekerja di luar ruangan. Menghargai keterampilan teknis.",
    jurusan: ["Teknik Sipil", "Arsitektur", "Teknik Mesin", "Geografi"],
    warnaBg: "bg-[#e8f5e9]",
    warnaTeks: "text-[#1b5e20]",
    warnaBadge: "bg-[#c8e6c9] text-[#1b5e20]",
  },
  {
    huruf: "I",
    label: "Investigative",
    deskripsi:
      "Suka memecahkan masalah kompleks, meneliti, dan menganalisis data. Cenderung logis dan analitis.",
    jurusan: ["Informatika", "Fisika", "Statistika", "Bioteknologi"],
    warnaBg: "bg-[#e3f2fd]",
    warnaTeks: "text-[#0d47a1]",
    warnaBadge: "bg-[#bbdefb] text-[#0d47a1]",
  },
  {
    huruf: "A",
    label: "Artistic",
    deskripsi:
      "Kreatif, imajinatif, dan inovatif. Lebih suka situasi yang tidak terstruktur dan ekspresi diri.",
    jurusan: ["Desain Komunikasi Visual", "Sastra", "Seni Rupa", "Film & TV"],
    warnaBg: "bg-[#fce4ec]",
    warnaTeks: "text-[#880e4f]",
    warnaBadge: "bg-[#f8bbd0] text-[#880e4f]",
  },
  {
    huruf: "S",
    label: "Social",
    deskripsi:
      "Suka membantu, mendidik, atau melatih orang lain. Memiliki empati tinggi dan keterampilan komunikasi.",
    jurusan: ["Psikologi", "Keguruan", "Ilmu Keperawatan", "Sosiologi"],
    warnaBg: "bg-[#fff3e0]",
    warnaTeks: "text-[#e65100]",
    warnaBadge: "bg-[#ffe0b2] text-[#e65100]",
  },
  {
    huruf: "E",
    label: "Enterprising",
    deskripsi:
      "Suka memimpin, mempengaruhi, atau membujuk orang lain. Berorientasi pada tujuan dan keuntungan.",
    jurusan: ["Manajemen Bisnis", "Ilmu Komunikasi", "Ilmu Politik", "Hukum"],
    warnaBg: "bg-[#f3e5f5]",
    warnaTeks: "text-[#4a148c]",
    warnaBadge: "bg-[#e1bee7] text-[#4a148c]",
  },
  {
    huruf: "C",
    label: "Conventional",
    deskripsi:
      "Menyukai data, angka, dan keteraturan. Berfokus pada detail, pengorganisasian, dan efisiensi.",
    jurusan: ["Akuntansi", "Administrasi Publik", "Ilmu Perpustakaan", "Aktuaria"],
    warnaBg: "bg-[#e0f2f1]",
    warnaTeks: "text-[#004d40]",
    warnaBadge: "bg-[#b2dfdb] text-[#004d40]",
  },
];

// --- data alur ---
const tahap = [
  {
    nomor: "01",
    label: "Tahap 1",
    heading: "Tes",
    deskripsi:
      "Pengguna menjawab serangkaian pernyataan preferensi yang dirancang untuk mengukur kecenderungan terhadap enam dimensi Holland.",
    solid: false,
  },
  {
    nomor: "02",
    label: "Tahap 2",
    heading: "Analisis",
    deskripsi:
      "Sistem menghitung skor untuk setiap dimensi dan menentukan kombinasi kode 3 huruf dominan (misalnya: IRE).",
    solid: false,
  },
  {
    nomor: "03",
    label: "Tahap 3",
    heading: "Rekomendasi",
    deskripsi:
      "Berdasarkan kode dominan, sistem mencocokkan profil dengan database jurusan studi yang paling relevan.",
    solid: false,
  },
];

// --- halaman tentang ---
export default function TentangPage() {
  return (
    <>
      <Navbar />

      <main className="min-h-screen">
        {/* --- hero section --- */}
        <section className="relative overflow-hidden py-20 md:py-0 bg-white">
          {/* split background */}
          <div className="absolute right-0 top-0 bottom-0 hidden w-1/2 bg-[#e5f7f5] md:block" />
          <div className="absolute inset-0 -z-10 bg-hero-radial" />

          <div className="mx-auto max-w-7xl px-6 md:px-12 relative z-10">
            <div className="grid grid-cols-1 gap-12 md:grid-cols-2 md:items-stretch">
              {/* teks utama */}
              <div className="py-20 md:py-32">
                <span className="mb-4 inline-flex items-center gap-2 rounded-full bg-[#e5f7f5] px-4 py-1.5 text-sm font-semibold text-[#006a61] font-sans">
                  <HiAcademicCap size={16} />
                  Teori Holland
                </span>
                <h1 className="mt-4 text-4xl font-extrabold tracking-tight text-[#0b1c30] md:text-5xl font-headline">
                  Tentang Metode <span className="text-secondary">RIASEC</span>
                </h1>
                <p className="mt-6 text-base leading-relaxed text-[#45464d] font-sans">
                  Metode RIASEC dikembangkan oleh <strong>Dr. John L. Holland</strong>. Teori ini
                  berpendapat bahwa pilihan jurusan merupakan ekspresi dari kepribadian, dan orang
                  yang belajar dalam lingkungan yang mirip dengan kepribadian mereka akan lebih
                  sukses dan puas.
                </p>
                <div className="mt-8">
                  <Button href="/instruksi" variant="primary" size="md">
                    Mulai Tes Sekarang
                    <FaArrowRight size={16} />
                  </Button>
                </div>
              </div>

              {/* bento grid */}
              <div className="flex bg-[#e5f7f5] py-12 md:bg-transparent md:py-0 md:pl-16">
                <div className="grid grid-cols-3 grid-rows-3 gap-4 w-full h-full min-h-[450px] py-16 md:py-24">
                  {/* realistic */}
                  <div
                    className={`flex flex-col items-center justify-center rounded-3xl p-4 ${dimensi[0].warnaBg} shadow-sm transition-all hover:scale-105 hover:shadow-md`}
                  >
                    <span
                      className={`text-4xl font-extrabold font-headline ${dimensi[0].warnaTeks}`}
                    >
                      {dimensi[0].huruf}
                    </span>
                    <span
                      className={`mt-2 text-xs font-bold uppercase tracking-wider font-sans ${dimensi[0].warnaTeks}`}
                    >
                      {dimensi[0].label}
                    </span>
                  </div>

                  {/* investigative */}
                  <div
                    className={`col-span-2 flex flex-col items-center justify-center rounded-3xl p-4 ${dimensi[1].warnaBg} shadow-sm transition-all hover:scale-105 hover:shadow-md`}
                  >
                    <span
                      className={`text-5xl font-extrabold font-headline ${dimensi[1].warnaTeks}`}
                    >
                      {dimensi[1].huruf}
                    </span>
                    <span
                      className={`mt-2 text-sm font-bold uppercase tracking-wider font-sans ${dimensi[1].warnaTeks}`}
                    >
                      {dimensi[1].label}
                    </span>
                  </div>

                  {/* artistic */}
                  <div
                    className={`row-span-2 flex flex-col items-center justify-center rounded-3xl p-4 ${dimensi[2].warnaBg} shadow-sm transition-all hover:scale-105 hover:shadow-md`}
                  >
                    <span
                      className={`text-5xl font-extrabold font-headline ${dimensi[2].warnaTeks}`}
                    >
                      {dimensi[2].huruf}
                    </span>
                    <span
                      className={`mt-2 text-sm font-bold uppercase tracking-wider font-sans ${dimensi[2].warnaTeks}`}
                    >
                      {dimensi[2].label}
                    </span>
                  </div>

                  {/* social */}
                  <div
                    className={`flex flex-col items-center justify-center rounded-3xl p-4 ${dimensi[3].warnaBg} shadow-sm transition-all hover:scale-105 hover:shadow-md`}
                  >
                    <span
                      className={`text-4xl font-extrabold font-headline ${dimensi[3].warnaTeks}`}
                    >
                      {dimensi[3].huruf}
                    </span>
                    <span
                      className={`mt-2 text-xs font-bold uppercase tracking-wider font-sans ${dimensi[3].warnaTeks}`}
                    >
                      {dimensi[3].label}
                    </span>
                  </div>

                  {/* enterprising */}
                  <div
                    className={`flex flex-col items-center justify-center rounded-3xl p-4 ${dimensi[4].warnaBg} shadow-sm transition-all hover:scale-105 hover:shadow-md`}
                  >
                    <span
                      className={`text-4xl font-extrabold font-headline ${dimensi[4].warnaTeks}`}
                    >
                      {dimensi[4].huruf}
                    </span>
                    <span
                      className={`mt-2 text-xs font-bold uppercase tracking-wider font-sans ${dimensi[4].warnaTeks}`}
                    >
                      {dimensi[4].label}
                    </span>
                  </div>

                  {/* conventional */}
                  <div
                    className={`col-span-2 flex flex-col items-center justify-center rounded-3xl p-4 ${dimensi[5].warnaBg} shadow-sm transition-all hover:scale-105 hover:shadow-md`}
                  >
                    <span
                      className={`text-5xl font-extrabold font-headline ${dimensi[5].warnaTeks}`}
                    >
                      {dimensi[5].huruf}
                    </span>
                    <span
                      className={`mt-2 text-sm font-bold uppercase tracking-wider font-sans ${dimensi[5].warnaTeks}`}
                    >
                      {dimensi[5].label}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* --- section 01: dimensi kepribadian --- */}
        <section className="relative overflow-hidden py-20 md:py-28 bg-[#006a61]">
          {/* dekorasi shape */}
          <CircleInCircle
            className="absolute -left-20 -top-20 h-80 w-80 opacity-20"
            color="#ffffff"
          />
          <MixSquareCircleQuarter
            className="absolute -right-10 bottom-0 h-64 w-64 opacity-10"
            color="#86f2e4"
          />

          <div className="mx-auto max-w-7xl px-6 md:px-12 relative z-10">
            {/* header */}
            <div className="mb-12 flex items-center gap-4">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#86f2e4] text-sm font-extrabold text-[#006a61] font-headline">
                01
              </span>
              <h2 className="text-2xl font-extrabold tracking-tight text-white md:text-3xl font-headline">
                Dimensi Kepribadian
              </h2>
            </div>

            {/* grid card */}
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {dimensi.map((d) => (
                <div
                  key={d.huruf}
                  className="flex flex-col rounded-3xl bg-white p-8 transition-all hover:-translate-y-1"
                >
                  <span className={`mb-3 text-5xl font-extrabold font-headline ${d.warnaTeks}`}>
                    {d.huruf}
                  </span>

                  {/* label kategori */}
                  <span
                    className={`mb-4 inline-block w-fit rounded-full px-3 py-1 text-xs font-bold uppercase tracking-wider font-sans ${d.warnaBadge}`}
                  >
                    {d.label}
                  </span>

                  {/* deskripsi */}
                  <p className="text-sm leading-relaxed text-[#45464d] font-sans">{d.deskripsi}</p>

                  {/* jurusan */}
                  <div className="mt-5 border-t border-[#e5eeff] pt-4">
                    <p className="mb-2 text-[10px] font-bold uppercase tracking-widest text-[#76777d] font-sans">
                      Contoh Jurusan
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {d.jurusan.map((k) => (
                        <span
                          key={k}
                          className="rounded-full bg-[#f8f9ff] px-3 py-1 text-xs font-medium text-[#45464d] font-sans"
                        >
                          {k}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* --- section 02: alur metodologi --- */}
        <section className="relative overflow-hidden py-20 md:py-28 bg-[#e5f7f5]">
          {/* dekorasi shape */}
          <MixSquareCircleQuarter
            className="absolute -left-20 top-20 h-96 w-96 opacity-10"
            color="var(--color-secondary-dim)"
          />

          <div className="mx-auto max-w-7xl px-6 md:px-12 relative z-10">
            {/* header */}
            <div className="mb-12 flex items-center gap-4">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-secondary text-sm font-extrabold text-white font-headline">
                02
              </span>
              <h2 className="text-2xl font-extrabold tracking-tight text-[#0b1c30] md:text-3xl font-headline">
                Alur Metodologi
              </h2>
            </div>

            {/* grid alur */}
            <div className="flex flex-col items-stretch gap-4 md:flex-row md:items-stretch">
              {tahap.map((t, idx) => (
                <Fragment key={t.nomor}>
                  <div
                    className={`flex-1 rounded-3xl p-8 transition-all ${
                      t.solid ? "bg-dark-gradient text-white" : "border-2 border-[#c6c6cd] bg-white"
                    }`}
                  >
                    {/* label */}
                    <p
                      className={`mb-3 text-[10px] font-bold uppercase tracking-widest font-sans ${t.solid ? "text-[#86f2e4]" : "text-[#006a61]"}`}
                    >
                      {t.label}
                    </p>
                    {/* judul */}
                    <h3
                      className={`mb-3 text-2xl font-extrabold font-headline ${t.solid ? "text-white" : "text-[#0b1c30]"}`}
                    >
                      {t.heading}
                    </h3>
                    {/* deskripsi */}
                    <p
                      className={`text-sm leading-relaxed font-sans ${t.solid ? "text-[#bec6e0]" : "text-[#45464d]"}`}
                    >
                      {t.deskripsi}
                    </p>
                  </div>

                  {/* panah */}
                  {idx < tahap.length - 1 && (
                    <div className="flex items-center justify-center md:flex-shrink-0">
                      <FaArrowRight size={20} className="rotate-90 text-[#c6c6cd] md:rotate-0" />
                    </div>
                  )}
                </Fragment>
              ))}
            </div>
          </div>
        </section>

        {/* --- section referensi akademik --- */}
        <section className="relative overflow-hidden py-16 md:py-20 bg-[#f8f9ff]">
          <CircleInCircle
            className="absolute -right-20 -bottom-20 h-64 w-64 opacity-5"
            color="var(--color-secondary)"
          />

          <div className="mx-auto max-w-2xl px-6 text-center md:px-12 relative z-10">
            <p className="mb-4 text-[10px] font-bold uppercase tracking-widest text-[#006a61] font-sans">
              Referensi Akademik
            </p>
            <p className="mb-4 text-sm italic leading-relaxed text-[#45464d] font-sans">
              Holland, J. L. (1997).{" "}
              <em>
                Making vocational choices: A theory of vocational personalities and work
                environments
              </em>{" "}
              (3rd ed.). Psychological Assessment Resources.
            </p>
            <p className="text-sm leading-relaxed text-[#76777d] font-sans">
              Pengembangan instrumen tes ini disesuaikan dengan standar adaptasi lintas budaya untuk
              memastikan validitas dan reliabilitas pada populasi pengguna di Indonesia.
            </p>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
