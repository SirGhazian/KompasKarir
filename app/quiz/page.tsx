"use client";

import { useState } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import NilaiForm, { type NilaiAkademik } from "@/components/ui/NilaiForm";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { quizQuestions, totalQuestions } from "@/utils/quizData";

// --- konstanta ---
const skalaOptions = [1, 2, 3, 4, 5];

// step 0 s/d (quizQuestions.length - 1) = soal quiz
// step quizQuestions.length = form nilai akademik
const STEP_NILAI = quizQuestions.length;
const TOTAL_STEPS = quizQuestions.length + 1; // soal + 1 step nilai

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
  const [currentIndex, setCurrentIndex] = useState(0);
  // simpan jawaban per soal: key = index soal, value = angka 1-5
  const [answers, setAnswers] = useState<Record<number, number>>({});
  // nilai akademik
  const [nilai, setNilai] = useState<NilaiAkademik>(nilaiAwal);

  // apakah sedang di step form nilai
  const isNilaiStep = currentIndex === STEP_NILAI;

  // soal yang sedang ditampilkan (hanya relevan saat bukan step nilai)
  const currentQuestion = !isNilaiStep ? quizQuestions[currentIndex] : null;
  const selectedAnswer = answers[currentIndex] ?? null;

  // progress bar mencakup seluruh alur (quiz + nilai)
  const progressPercent = Math.round(((currentIndex + 1) / TOTAL_STEPS) * 100);

  const isFirst = currentIndex === 0;
  const isLastQuiz = currentIndex === quizQuestions.length - 1;

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
    setAnswers((prev) => ({ ...prev, [currentIndex]: val }));
  }

  // --- update nilai akademik ---
  function handleNilaiChange(key: keyof NilaiAkademik, value: string) {
    setNilai((prev) => ({ ...prev, [key]: value }));
  }

  // --- submit akhir (belum ada logika, placeholder) ---
  function handleSubmit() {
    // TODO: kirim { answers, nilai } ke backend
    console.log("Jawaban quiz:", answers);
    console.log("Nilai akademik:", nilai);
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
                <div className="mb-3 flex justify-between px-1">
                  <span className="text-xs text-[#76777d] font-sans">Sangat Tidak Setuju</span>
                  <span className="text-xs text-[#76777d] font-sans">Sangat Setuju</span>
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

                <span className="text-sm font-semibold text-[#45464d] font-sans">
                  {currentIndex + 1} / {quizQuestions.length}
                </span>

                {/* tombol selanjutnya / lanjut ke nilai */}
                <button
                  onClick={handleNext}
                  className="inline-flex cursor-pointer items-center gap-2 rounded-2xl bg-secondary px-6 py-3 text-sm font-semibold text-white transition-all duration-200 hover:bg-secondary-dim active:scale-95 font-sans"
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
                onClick={() => setCurrentIndex(quizQuestions.length - 1)}
                className="mb-6 inline-flex cursor-pointer items-center gap-2 rounded-2xl border-2 border-[#c6c6cd] bg-white px-5 py-2.5 text-sm font-semibold text-[#0b1c30] transition-all duration-200 hover:border-[#006a61] hover:text-[#006a61] font-sans"
              >
                <FaArrowLeft size={13} />
                Kembali ke Soal
              </button>

              <NilaiForm nilai={nilai} onChange={handleNilaiChange} onSubmit={handleSubmit} />
            </>
          )}
        </div>
      </main>

      <Footer />
    </>
  );
}
