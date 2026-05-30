import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Button from "@/components/ui/Button";
import Accordion from "@/components/ui/Accordion";
import { FaArrowRight, FaRegClock } from "react-icons/fa";
import { LuChartNoAxesCombined } from "react-icons/lu";
import { VscCompassActive } from "react-icons/vsc";
import { IoDocumentTextOutline } from "react-icons/io5";
import { HiAcademicCap } from "react-icons/hi2";
import { MixSquareCircleQuarter, CircleInCircle } from "@/components/ui/shape";

const steps = [
  {
    number: "01",
    icon: <IoDocumentTextOutline size={40} />,
    title: "Ikuti Tes",
    description:
      "Jawab serangkaian pertanyaan singkat dan jujur mengenai preferensi aktivitas dan lingkungan belajarmu.",
  },
  {
    number: "02",
    icon: <LuChartNoAxesCombined size={40} />,
    title: "Lihat Hasil",
    description:
      "Dapatkan analisis instan mengenai profil RIASEC-mu (Realistic, Investigative, Artistic, Social, Enterprising, Conventional).",
  },
  {
    number: "03",
    icon: <VscCompassActive size={40} />,
    title: "Temukan Jurusan",
    description:
      "Eksplorasi rekomendasi jurusan kuliah dan jalur pendidikan yang selaras dengan tipe kepribadian dominanmu.",
  },
];

// --- landing page ---
export default function LandingPage() {
  return (
    <>
      <Navbar />

      <main className="flex-1">
        {/* --- hero section --- */}
        <section className="relative flex h-svh flex-col items-center justify-center overflow-hidden bg-white mt-[-72px] pt-[72px]">
          {/* dekorasi latar belakang */}
          <div className="absolute inset-0 -z-10 bg-hero-radial" />
          <MixSquareCircleQuarter
            className="absolute -right-20 -top-20 h-80 w-80 opacity-10"
            color="var(--color-secondary)"
          />
          <CircleInCircle
            className="absolute -left-24 bottom-20 h-64 w-64 opacity-5"
            color="var(--color-secondary)"
          />

          <div className="mx-auto max-w-7xl px-6 md:px-12 relative z-10">
            <div className="flex flex-col items-center text-center">
              {/* judul utama */}
              <h1 className="mb-6 max-w-4xl text-4xl font-extrabold leading-tight tracking-tight text-[#0b1c30] md:text-6xl lg:text-7xl font-headline">
                Temukan{" "}
                <span className="relative inline-block text-secondary">
                  Jurusan &amp; Pendidikan
                </span>{" "}
                yang Tepat Untukmu
              </h1>

              {/* deskripsi */}
              <p className="mb-10 max-w-2xl text-lg leading-relaxed text-[#45464d] md:text-xl font-sans">
                Pahami minat dan potensimu melalui asesmen RIASEC yang komprehensif. Dapatkan
                rekomendasi jalur pendidikan dan peminatan jurusan yang sesuai dengan kepribadian
                unikmu.
              </p>

              {/* estimasi waktu */}
              <div className="mb-10 flex items-center gap-2 text-sm font-medium text-[#45464d] font-sans">
                <FaRegClock className="text-[#006a61]" size={18} />
                <span>Estimasi waktu: 10–15 menit</span>
              </div>

              {/* tombol cta */}
              <div className="flex flex-col items-center gap-4 sm:flex-row">
                <Button href="/instruksi" variant="primary" size="md" className="group">
                  Mulai Tes Sekarang
                  <FaArrowRight
                    className="transition-transform group-hover:translate-x-1"
                    size={16}
                  />
                </Button>

                <Button href="/tentang" variant="secondary" size="md">
                  Pelajari Lebih Lanjut
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* --- cara kerja section --- */}
        <section id="cara-kerja" className="relative overflow-hidden py-24 md:py-32 bg-[#e5f7f5]">
          {/* dekorasi shape */}
          <MixSquareCircleQuarter
            className="absolute -left-20 top-40 h-96 w-96 opacity-10"
            color="var(--color-secondary-dim)"
          />
          <CircleInCircle
            className="absolute -right-20 bottom-10 h-72 w-72 opacity-10"
            color="var(--color-secondary-dim)"
          />

          <div className="mx-auto max-w-7xl px-6 md:px-12 relative z-10">
            {/* header section */}
            <div className="mb-16 flex flex-col items-center text-center">
              <h2 className="max-w-lg text-3xl font-extrabold tracking-tight text-[#0b1c30] md:text-4xl font-headline">
                Cara Kerja
              </h2>
              <div className="mt-3 h-1 w-16 rounded-full bg-secondary" />
              <p className="mt-4 max-w-md text-base text-[#45464d] font-sans">
                Hanya tiga langkah mudah untuk menemukan jalur yang tepat bagimu.
              </p>
            </div>

            {/* grid langkah */}
            <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
              {steps.map((step, index) => (
                <div
                  key={step.number}
                  className="group relative flex flex-col items-center text-center rounded-2xl bg-white p-8 transition-all hover:-translate-y-1 shadow-card"
                >
                  {/* badge nomor */}
                  <div className="absolute -top-2 -left-2 flex h-14 w-14 items-center justify-center rounded-2xl text-lg font-extrabold text-white bg-secondary font-headline">
                    {step.number}
                  </div>

                  {/* ikon */}
                  <div className="mb-5 mt-4 flex h-16 w-16 items-center justify-center rounded-2xl text-[#006a61] transition-colors group-hover:text-[#009688] bg-[#e5f7f5]">
                    {step.icon}
                  </div>

                  {/* konten */}
                  <h3 className="mb-3 text-2xl font-bold text-[#0b1c30] font-headline">
                    {step.title}
                  </h3>
                  <p className="text-base leading-relaxed text-[#45464d] font-sans">
                    {step.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* --- kenapa riasec section --- */}
        <section id="kenapa-riasec" className="relative overflow-hidden py-24 md:py-32 bg-white">
          {/* dekorasi shape */}
          <CircleInCircle
            className="absolute -right-20 top-20 h-96 w-96 opacity-5"
            color="var(--color-secondary)"
          />
          <MixSquareCircleQuarter
            className="absolute -left-10 bottom-0 h-64 w-64 opacity-5"
            color="var(--color-secondary)"
          />

          <div className="mx-auto max-w-7xl px-6 md:px-12 relative z-10">
            <div className="grid grid-cols-1 gap-16 lg:grid-cols-2 lg:items-center">
              {/* kiri: judul & deskripsi */}
              <div>
                <h2 className="text-4xl font-extrabold tracking-tight text-[#0b1c30] md:text-4xl font-headline uppercase">
                  KENAPA HARUS MENGAMBIL <span className="text-secondary">RIASEC TEST?</span>
                </h2>
                <p className="mt-6 text-lg leading-relaxed text-[#45464d] font-sans">
                  Tes RIASEC bukan sekadar kuis kepribadian biasa. Ini adalah instrumen psikometrik
                  yang telah divalidasi secara luas untuk membantu individu menyelaraskan jurusan
                  impian dengan karakter asli mereka.
                </p>
              </div>

              {/* kanan: grid alasan */}
              <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
                {[
                  {
                    title: "Validitas Ilmiah",
                    desc: "Didasarkan pada Teori Holland yang telah teruji puluhan tahun secara global.",
                    icon: <HiAcademicCap className="text-secondary" size={32} />,
                  },
                  {
                    title: "Pemahaman Diri",
                    desc: "Membantu Anda mengenali potensi tersembunyi dan minat dominan secara mendalam.",
                    icon: <VscCompassActive className="text-secondary" size={32} />,
                  },
                  {
                    title: "Akurasi Jurusan",
                    desc: "Rekomendasi yang sangat spesifik untuk jurusan kuliah dan jalur akademik.",
                    icon: <LuChartNoAxesCombined className="text-secondary" size={32} />,
                  },
                  {
                    title: "Efisien & Mudah",
                    desc: "Dapatkan analisis komprehensif hanya dalam waktu 10-15 menit saja.",
                    icon: <FaRegClock className="text-secondary" size={32} />,
                  },
                ].map((item, idx) => (
                  <div key={idx} className="flex flex-col gap-3">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#e5f7f5]">
                      {item.icon}
                    </div>
                    <h3 className="text-xl font-bold text-[#0b1c30] font-headline">{item.title}</h3>
                    <p className="text-sm leading-relaxed text-[#45464d] font-sans">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* --- cta banner section --- */}
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
            <div className="relative overflow-hidden rounded-3xl p-10 text-center md:p-16 bg-white shadow-xl">
              <div className="absolute -right-16 -top-16 h-64 w-64 rounded-full opacity-10 bg-secondary" />
              <div className="absolute -bottom-20 -left-20 h-72 w-72 rounded-full opacity-10 bg-secondary" />

              <div className="relative z-10">
                <h2 className="mb-4 text-3xl font-extrabold tracking-tight text-[#0b1c30] md:text-4xl font-headline">
                  Siap Menemukan Jalurmu?
                </h2>
                <p className="mb-8 mx-auto max-w-lg text-base text-[#45464d] font-sans">
                  Ribuan pelajar telah menggunakan KompasKarir untuk menemukan jurusan dan masa
                  depan pendidikan mereka. Kini giliranmu.
                </p>
                <Button href="/instruksi" variant="primary" size="lg">
                  Mulai Tes Gratis
                  <FaArrowRight size={16} />
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* --- faq section --- */}
        <section id="faq" className="relative overflow-hidden py-24 md:py-32 bg-[#f8f9ff]">
          {/* dekorasi shape */}
          <MixSquareCircleQuarter
            className="absolute -left-20 top-0 h-80 w-80 opacity-5"
            color="var(--color-secondary)"
          />

          <div className="mx-auto max-w-3xl px-6 md:px-12 relative z-10">
            {/* header section */}
            <div className="mb-16 flex flex-col items-center text-center">
              <h2 className="text-3xl font-extrabold tracking-tight text-[#0b1c30] md:text-4xl font-headline">
                Pertanyaan yang Sering Diajukan
              </h2>
              <div className="mt-4 h-1 w-16 rounded-full bg-secondary" />
            </div>

            {/* accordion list */}
            <div className="space-y-4">
              {[
                {
                  q: "Apakah tes ini benar-benar gratis?",
                  a: "Ya, tes RIASEC di KompasKarir dapat diakses sepenuhnya secara gratis tanpa biaya tersembunyi apa pun.",
                },
                {
                  q: "Berapa lama waktu yang dibutuhkan untuk tes?",
                  a: "Rata-rata pengguna menyelesaikan seluruh rangkaian pertanyaan dalam waktu 10 hingga 15 menit.",
                },
                {
                  q: "Apakah saya perlu mendaftar untuk melihat hasil?",
                  a: "Saat ini Anda dapat melihat hasil analisis dasar secara langsung setelah menyelesaikan tes tanpa perlu login.",
                },
                {
                  q: "Apakah saya bisa mengulang tes di kemudian hari?",
                  a: "Tentu saja! Anda bebas mengulang tes kapan saja untuk melihat apakah ada perubahan minat atau preferensi seiring berjalannya waktu.",
                },
              ].map((faq, idx) => (
                <Accordion key={idx} question={faq.q} answer={faq.a} />
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
