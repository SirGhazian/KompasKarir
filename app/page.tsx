import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Button from "@/components/ui/Button";
import { FaArrowRight, FaRegClock } from "react-icons/fa";
import { LuChartNoAxesCombined } from "react-icons/lu";
import { VscCompassActive } from "react-icons/vsc";
import { IoDocumentTextOutline } from "react-icons/io5";

const steps = [
  {
    number: "01",
    icon: <IoDocumentTextOutline size={40} />,
    title: "Ikuti Tes",
    description:
      "Jawab serangkaian pertanyaan singkat dan jujur mengenai preferensi aktivitas dan lingkungan kerjamu.",
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
      "Eksplorasi rekomendasi jurusan kuliah dan jalur karier yang selaras dengan tipe kepribadian dominanmu.",
  },
];

// --- landing page ---

export default function LandingPage() {
  return (
    <>
      <Navbar />

      <main className="flex-1">
        {/* --- hero section --- */}
        <section className="relative overflow-hidden">
          {/* dekorasi latar belakang */}
          <div className="absolute inset-0 -z-10 bg-hero-radial" />
          <div className="absolute right-0 top-0 -z-10 h-[500px] w-[500px] opacity-40 bg-hero-blob" />

          <div className="mx-auto max-w-7xl px-6 pb-24 pt-20 md:px-12 md:pb-32 md:pt-28">
            <div className="flex flex-col items-center text-center">
              {/* judul utama */}
              <h1 className="mb-6 max-w-4xl text-4xl font-extrabold leading-tight tracking-tight text-[#0b1c30] md:text-6xl lg:text-7xl font-headline">
                Temukan{" "}
                <span className="relative inline-block text-transparent bg-clip-text bg-teal-gradient">
                  Jurusan &amp; Karier
                </span>{" "}
                yang Tepat Untukmu
              </h1>

              {/* deskripsi */}
              <p className="mb-10 max-w-2xl text-lg leading-relaxed text-[#45464d] md:text-xl font-sans">
                Pahami minat dan potensimu melalui asesmen RIASEC yang komprehensif. Dapatkan
                rekomendasi jalur pendidikan dan profesional yang sesuai dengan kepribadian unikmu.
              </p>

              {/* estimasi waktu */}
              <div className="mb-10 flex items-center gap-2 text-sm font-medium text-[#45464d] font-sans">
                <FaRegClock className="text-[#006a61]" size={18} />
                <span>Estimasi waktu: 10–15 menit</span>
              </div>

              {/* tombol cta */}
              <div className="flex flex-col items-center gap-4 sm:flex-row">
                <Button href="#" variant="primary" size="md" className="group">
                  Mulai Tes Sekarang
                  <FaArrowRight
                    className="transition-transform group-hover:translate-x-1"
                    size={16}
                  />
                </Button>

                <Button href="#cara-kerja" variant="secondary" size="md">
                  Pelajari Lebih Lanjut
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* --- cara kerja section --- */}
        <section id="cara-kerja" className="py-24 md:py-32 bg-[#f8f9ff]">
          <div className="mx-auto max-w-7xl px-6 md:px-12">
            {/* header section */}
            <div className="mb-16 flex flex-col items-center text-center">
              <h2 className="max-w-lg text-3xl font-extrabold tracking-tight text-[#0b1c30] md:text-4xl font-headline">
                Cara Kerja
              </h2>
              <div className="mt-3 h-1 w-16 rounded-full bg-gradient-to-r from-[#006a61] to-[#009688]" />
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
                  <div className="absolute -top-2 -left-2 flex h-14 w-14 items-center justify-center rounded-2xl text-lg font-extrabold text-white bg-teal-gradient font-headline">
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

        {/* --- cta banner section --- */}
        <section className="py-20 md:py-28">
          <div className="mx-auto max-w-7xl px-6 md:px-12">
            <div className="relative overflow-hidden rounded-3xl p-10 text-center md:p-16 bg-dark-gradient">
              <div className="absolute -right-16 -top-16 h-64 w-64 rounded-full opacity-20 bg-[#009688]" />
              <div className="absolute -bottom-20 -left-20 h-72 w-72 rounded-full opacity-10 bg-[#86f2e4]" />

              <div className="relative z-10">
                <h2 className="mb-4 text-3xl font-extrabold tracking-tight text-white md:text-4xl font-headline">
                  Siap Menemukan Jalurmu?
                </h2>
                <p className="mb-8 mx-auto max-w-lg text-base text-[#bec6e0] font-sans">
                  Ribuan pelajar telah menggunakan KompasKarir untuk menemukan jurusan dan karier
                  impian mereka. Kini giliranmu.
                </p>
                <Button href="#" variant="primary" size="lg">
                  Mulai Tes Gratis
                  <FaArrowRight size={16} />
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
