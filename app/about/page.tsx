import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { MixSquareCircleQuarter, CircleInCircle } from "@/components/ui/shape";

// --- data tim ---
const tim = [
  {
    id: "CDCC282D6Y1250",
    nama: "Carli Tamba",
    peran: "Data Scientist",
    inisial: "CT",
  },
  {
    id: "CACC282D6Y0961",
    nama: "Ridho Hamdani Putra",
    peran: "AI Engineer",

    inisial: "RH",
  },
  {
    id: "CACC282D6X0960",
    nama: "Setya Carina Rianti",
    peran: "AI Engineer",
    inisial: "SC",
  },

  {
    id: "CDCC012D6Y1245",
    nama: "Muhammad Firman Ardiansyah",
    peran: "Data Scientist",
    inisial: "MF",
  },
  {
    id: "CFCC282D6Y0786",
    nama: "Muhammad Ghazian Tsaqif Zhafiri Andoz",
    peran: "Full-Stack Web Developer",
    inisial: "MG",
  },
  {
    id: "CFCC955D6Y1821",
    nama: "Dhimas Setyo Wahyu Santoso",
    peran: "Full-Stack Web Developer",
    inisial: "DS",
  },
];

// warna aksen per peran
const peranWarna: Record<string, { bg: string; text: string }> = {
  "Full-Stack Web Developer": { bg: "bg-[#e3f2fd]", text: "text-[#0d47a1]" },
  "AI Engineer": { bg: "bg-[#e8f5e9]", text: "text-[#1b5e20]" },
  "Data Scientist": { bg: "bg-[#f3e5f5]", text: "text-[#4a148c]" },
};

export default function AboutPage() {
  return (
    <>
      <Navbar />

      <main className="min-h-screen">
        {/* === hero section === */}
        <section className="relative overflow-hidden bg-[#006a61] py-20 md:py-28">
          <MixSquareCircleQuarter
            className="absolute -right-20 -top-20 h-80 w-80 opacity-10"
            color="#86f2e4"
          />
          <CircleInCircle
            className="absolute -left-16 bottom-0 h-64 w-64 opacity-10"
            color="#ffffff"
          />

          <div className="relative z-10 mx-auto max-w-4xl px-6 md:px-12 text-center">
            <p className="mb-4 text-xs font-bold uppercase tracking-[0.2em] text-[#86f2e4] font-sans">
              Tim PSU305
            </p>
            <h1 className="text-4xl font-extrabold leading-tight tracking-tight text-white md:text-5xl lg:text-6xl font-headline">
              Di Balik KompasKarir
            </h1>
            <p className="mt-6 mx-auto max-w-2xl text-lg leading-relaxed text-[#86f2e4]/90 font-sans">
              Enam individu dengan keahlian berbeda, satu misi yang sama: membantu siswa Indonesia
              menemukan arah pendidikan yang tepat melalui teknologi.
            </p>
          </div>
        </section>

        {/* === tentang proyek === */}
        <section className="relative overflow-hidden bg-white py-20 md:py-28">
          <CircleInCircle
            className="absolute -right-20 top-20 h-72 w-72 opacity-5"
            color="var(--color-secondary)"
          />

          <div className="relative z-10 mx-auto max-w-5xl px-6 md:px-12">
            {/* narasi full width */}
            <div className="mb-12">
              <p className="mb-3 text-xs font-bold uppercase tracking-[0.15em] text-[#006a61] font-sans">
                Capstone Project 2026
              </p>
              <h2 className="text-3xl font-extrabold tracking-tight text-[#0b1c30] md:text-4xl font-headline">
                Coding Camp oleh Dicoding × DBS Foundation
              </h2>
              <div className="mt-6 space-y-4 text-base leading-relaxed text-[#45464d] font-sans">
                <p>
                  KompasKarir lahir dari program <strong>Coding Camp 2026</strong>, sebuah inisiatif
                  kolaboratif antara <strong>Dicoding</strong> dan <strong>DBS Foundation</strong>{" "}
                  yang bertujuan mencetak talenta digital Indonesia yang siap bersaing secara
                  global.
                </p>
                <p>
                  Sebagai proyek akhir (capstone), kami mengembangkan platform asesmen berbasis
                  kecerdasan buatan yang menggabungkan teori kepribadian RIASEC dengan model machine
                  learning untuk memberikan rekomendasi jurusan kuliah yang personal dan akurat.
                </p>
                <p>
                  Proyek ini bukan sekadar tugas akademis, ini adalah solusi nyata untuk
                  permasalahan yang dihadapi jutaan siswa SMA/SMK di Indonesia: kebingungan memilih
                  jalur pendidikan yang tepat.
                </p>
              </div>
            </div>

            {/* highlight angka (di bawah paragraf, 4 kolom di desktop ya cuyy) */}
            <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
              <div className="rounded-3xl bg-[#f8f9ff] p-6 text-center">
                <span className="text-3xl font-extrabold text-[#006a61] font-headline">6</span>
                <p className="mt-1 text-xs font-semibold text-[#45464d] font-sans">Anggota Tim</p>
              </div>
              <div className="rounded-3xl bg-[#f8f9ff] p-6 text-center">
                <span className="text-3xl font-extrabold text-[#006a61] font-headline">3</span>
                <p className="mt-1 text-xs font-semibold text-[#45464d] font-sans">
                  Bidang Keahlian
                </p>
              </div>
              <div className="rounded-3xl bg-[#f8f9ff] p-6 text-center">
                <span className="text-3xl font-extrabold text-[#006a61] font-headline">72</span>
                <p className="mt-1 text-xs font-semibold text-[#45464d] font-sans">Item Asesmen</p>
              </div>
              <div className="rounded-3xl bg-[#f8f9ff] p-6 text-center">
                <span className="text-3xl font-extrabold text-[#006a61] font-headline">AI</span>
                <p className="mt-1 text-xs font-semibold text-[#45464d] font-sans">Powered</p>
              </div>
            </div>
          </div>
        </section>

        {/* === anggota tim === */}
        <section className="relative overflow-hidden bg-[#f8f9ff] py-20 md:py-28">
          <MixSquareCircleQuarter
            className="absolute -left-20 top-40 h-96 w-96 opacity-5"
            color="var(--color-secondary)"
          />

          <div className="relative z-10 mx-auto max-w-5xl px-6 md:px-12">
            {/* header */}
            <div className="mb-14 text-center">
              <p className="mb-3 text-xs font-bold uppercase tracking-[0.15em] text-[#006a61] font-sans">
                Meet The Team
              </p>
              <h2 className="text-3xl font-extrabold tracking-tight text-[#0b1c30] md:text-4xl font-headline">
                Tim Pengembang
              </h2>
              <div className="mt-4 mx-auto h-1 w-16 rounded-full bg-secondary" />
            </div>

            {/* grid anggota */}
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {tim.map((anggota) => {
                const warna = peranWarna[anggota.peran] || {
                  bg: "bg-[#e5eeff]",
                  text: "text-[#0b1c30]",
                };
                return (
                  <div
                    key={anggota.id}
                    className="group relative rounded-3xl border-2 border-[#e5eeff] bg-white p-8 transition-all duration-300 hover:border-[#006a61] hover:shadow-[var(--shadow-hard)]"
                  >
                    {/* id peserta */}
                    <p className="mt-4 text-[11px] font-mono text-[#76777d] tracking-wide">
                      {anggota.id}
                    </p>

                    {/* nama */}
                    <h3 className="mt-1 text-base font-bold text-[#0b1c30] font-headline leading-snug">
                      {anggota.nama}
                    </h3>

                    {/* learning path */}
                    <span
                      className={`mt-2 inline-block rounded-full px-3 py-1 text-xs font-semibold font-sans ${warna.bg} ${warna.text}`}
                    >
                      {anggota.peran}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* === end sections === */}
      </main>

      <Footer />
    </>
  );
}
