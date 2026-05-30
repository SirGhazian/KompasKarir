"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import NilaiForm, { type NilaiAkademik } from "@/components/ui/NilaiForm";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { getQuestions, submitPrediction } from "@/utils/api";

// --- konstanta ---
const skalaOptions = [1, 2, 3, 4, 5];

// --- nilai awal form akademik ---
const nilaiAwal: NilaiAkademik = {
  bahasaIndonesia: "",
  bahasaInggris: "",
  matematika: "",
  informatika: "",
  ipa: "",
  ips: "",
  ppkn: "",
  penjas: "",
  seni: "",
};

// --- halaman quiz ---
export default function QuizPage() {
  const router = useRouter();
  const [questions, setQuestions] = useState<{ id: number; text: string }[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);
  // simpan jawaban: key = id soal, value = angka 1-5
  const [answers, setAnswers] = useState<Record<number, number>>({});
  // nilai akademik
  const [nilai, setNilai] = useState<NilaiAkademik>(nilaiAwal);
  // status submit (cegah spam click + tampilkan spinner)
  const [submitting, setSubmitting] = useState(false);

  // fetch soal dari backend saat mount
  useEffect(() => {
    getQuestions()
      .then((data) => {
        setQuestions(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Gagal mengambil soal:", err);
        setLoading(false);
      });
  }, []);

  const totalQuestions = questions.length;
  const STEP_NILAI = totalQuestions;
  const TOTAL_STEPS = totalQuestions + 1;

  // apakah sedang di step form nilai
  const isNilaiStep = currentIndex === STEP_NILAI;

  // soal yang sedang ditampilkan
  const currentQuestion = !isNilaiStep ? questions[currentIndex] : null;
  const selectedAnswer = currentQuestion ? (answers[currentQuestion.id] ?? null) : null;

  // progress bar mencakup seluruh alur (quiz + nilai)
  const progressPercent =
    totalQuestions > 0 ? Math.round(((currentIndex + 1) / TOTAL_STEPS) * 100) : 0;

  const isFirst = currentIndex === 0;
  const isLastQuiz = currentIndex === totalQuestions - 1;

  // --- navigasi soal ---
  function handlePrev() {
    if (!isFirst) {
      setCurrentIndex((i) => i - 1);
    }
  }

  function handleNext() {
    if (!isLastQuiz) {
      setCurrentIndex((i) => i + 1);
    } else {
      // soal terakhir → lanjut ke form nilai
      setCurrentIndex(STEP_NILAI);
    }
  }

  function handleSelectAnswer(val: number) {
    if (!currentQuestion) return;
    // simpan dengan key = id soal (bukan index urutan)
    setAnswers((prev) => ({ ...prev, [currentQuestion.id]: val }));
  }

  // --- update nilai akademik ---
  function handleNilaiChange(key: keyof NilaiAkademik, value: string) {
    setNilai((prev) => ({ ...prev, [key]: value }));
  }

  // --- submit akhir ---
  async function handleSubmit() {
    // cegah spam click
    if (submitting) return;
    setSubmitting(true);
    try {
      // konversi nilai string ke number
      const nilaiNum = Object.fromEntries(
        Object.entries(nilai).map(([k, v]) => [k, Number(v)]),
      ) as Record<string, number>;

      const result = await submitPrediction(answers, nilaiNum);
      // simpan id + hasil untuk halaman hasil
      localStorage.setItem("kk_prediction_id", result.id);
      localStorage.setItem("kk_hasil", JSON.stringify(result.hasil));
      router.push("/hasil");
    } catch (err) {
      console.error("Gagal submit:", err);
      alert("Terjadi kesalahan saat mengirim data. Coba lagi.");
      setSubmitting(false);
    }
  }

  // --- loading state ---
  if (loading) {
    return (
      <>
        <Navbar />
        <main className="min-h-screen bg-[#f8f9ff] py-12 md:py-20">
          <div className="mx-auto max-w-2xl px-6 md:px-12 text-center">
            <p className="text-lg font-semibold text-[#45464d] font-sans">Memuat soal...</p>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  // --- error state ---
  if (!loading && totalQuestions === 0) {
    return (
      <>
        <Navbar />
        <main className="min-h-screen bg-[#f8f9ff] py-12 md:py-20">
          <div className="mx-auto max-w-2xl px-6 md:px-12 text-center">
            <p className="text-lg font-semibold text-[#ba1a1a] font-sans">
              Gagal memuat soal. Pastikan server backend berjalan.
            </p>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-[#f8f9ff] py-12 md:py-20">
        <div className="mx-auto max-w-2xl px-6 md:px-12">
          {/* --- progress bar --- */}
          <div className="mb-10">
            <div className="mb-2 flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-widest text-[#006a61] font-sans">
                {isNilaiStep ? "Nilai Akademik" : "Progress"}
              </span>
              <span className="text-xs font-semibold text-[#45464d] font-sans">
                {isNilaiStep
                  ? `${totalQuestions} / ${totalQuestions} soal selesai`
                  : `${currentIndex + 1} / ${totalQuestions}`}
              </span>
            </div>
            {/* track */}
            <div className="h-2.5 w-full overflow-hidden rounded-full bg-[#e5eeff]">
              <div
                className="h-full rounded-full bg-secondary transition-all duration-500"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
            <p className="mt-1.5 text-right text-[11px] text-[#76777d] font-sans">
              {progressPercent}% selesai
            </p>
          </div>

          {/* ============================================================ */}
          {/* STEP A: soal quiz                                             */}
          {/* ============================================================ */}
          {!isNilaiStep && currentQuestion && (
            <>
              {/* --- card pertanyaan --- */}
              <div className="mb-8 rounded-3xl bg-white p-8 shadow-card md:p-10">
                {/* teks soal */}
                <p className="text-xl font-semibold leading-relaxed text-[#0b1c30] font-headline md:text-2xl">
                  {currentQuestion.text}
                </p>
              </div>

              {/* --- pilihan skala --- */}
              <div className="mb-10">
                <div className="mb-3 hidden md:grid grid-cols-5 px-1">
                  <span className="text-xs text-[#76777d] font-sans text-left col-span-1">
                    Sangat Tidak Suka
                  </span>
                  <span className="text-xs text-[#76777d] font-sans text-center col-span-3">
                    Ragu-Ragu
                  </span>
                  <span className="text-xs text-[#76777d] font-sans text-right col-span-1">
                    Sangat Suka
                  </span>
                </div>
                <div className="grid grid-cols-5 gap-3">
                  {skalaOptions.map((val) => {
                    const isSelected = val === selectedAnswer;
                    return (
                      <button
                        key={val}
                        onClick={() => handleSelectAnswer(val)}
                        className={`flex h-14 items-center justify-center rounded-2xl transition-all duration-100 font-headline cursor-pointer
                          ${
                            isSelected
                              ? "border-2 border-[#006a61] bg-[#e5f7f5] text-[#006a61]"
                              : "border border-[#c6c6cd] bg-white text-[#0b1c30] hover:border-2 hover:border-[#006a61] hover:text-[#006a61]"
                          }`}
                      >
                        <span className="text-lg font-bold">{val}</span>
                      </button>
                    );
                  })}
                </div>
                {/* keterangan mobile (di bawah tombol) */}
                <div className="mt-3 grid grid-cols-5 px-1 md:hidden">
                  <span className="text-xs text-[#76777d] font-sans text-left col-span-1">
                    Sangat Tidak Suka
                  </span>
                  <span className="text-xs text-[#76777d] font-sans text-center col-span-3">
                    Ragu-Ragu
                  </span>
                  <span className="text-xs text-[#76777d] font-sans text-right col-span-1">
                    Sangat Suka
                  </span>
                </div>
              </div>

              {/* --- navigasi soal --- */}
              <div className="flex items-center justify-between">
                {/* tombol sebelumnya */}
                <button
                  onClick={handlePrev}
                  disabled={isFirst || undefined}
                  aria-disabled={isFirst}
                  className={`inline-flex items-center gap-2 rounded-2xl border-2 px-6 py-3 text-sm font-semibold transition-all duration-200 font-sans
                    ${
                      isFirst
                        ? "cursor-not-allowed border-[#e5eeff] bg-[#f8f9ff] text-[#c6c6cd]"
                        : "cursor-pointer border-[#c6c6cd] bg-white text-[#0b1c30] hover:border-[#006a61] hover:text-[#006a61]"
                    }`}
                >
                  <FaArrowLeft size={14} />
                  Sebelumnya
                </button>

                <span className="hidden md:inline text-sm font-semibold text-[#45464d] font-sans">
                  {currentIndex + 1} / {totalQuestions}
                </span>

                {/* tombol selanjutnya / lanjut ke nilai */}
                <button
                  onClick={handleNext}
                  disabled={selectedAnswer === null || undefined}
                  aria-disabled={selectedAnswer === null}
                  className="inline-flex items-center gap-2 rounded-2xl bg-secondary px-6 py-3 text-sm font-semibold text-white transition-all duration-200 hover:bg-secondary-dim active:scale-95 font-sans disabled:cursor-not-allowed cursor-pointer"
                >
                  {isLastQuiz ? "Lanjut ke Nilai" : "Selanjutnya"}
                  <FaArrowRight size={14} />
                </button>
              </div>
            </>
          )}

          {/* ============================================================ */}
          {/* STEP B: form nilai akademik                                   */}
          {/* ============================================================ */}
          {isNilaiStep && (
            <>
              {/* tombol kembali ke soal terakhir */}
              <button
                onClick={() => setCurrentIndex(totalQuestions - 1)}
                className="mb-6 inline-flex cursor-pointer items-center gap-2 rounded-2xl border-2 border-[#c6c6cd] bg-white px-5 py-2.5 text-sm font-semibold text-[#0b1c30] transition-all duration-200 hover:border-[#006a61] hover:text-[#006a61] font-sans"
              >
                <FaArrowLeft size={13} />
                Kembali ke Soal
              </button>

              <NilaiForm
                nilai={nilai}
                onChange={handleNilaiChange}
                onSubmit={handleSubmit}
                submitting={submitting}
              />
            </>
          )}
        </div>
      </main>

      <Footer />
    </>
  );
}
