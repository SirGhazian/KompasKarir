"use client";

import { useState } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { quizQuestions, categoryColors, totalQuestions } from "@/utils/quizData";

// --- data statis ---
const skalaOptions = [1, 2, 3, 4, 5];

// --- halaman quiz ---
export default function QuizPage() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);

  const currentQuestion = quizQuestions[currentIndex];
  const progressPercent = Math.round(((currentIndex + 1) / totalQuestions) * 100);

  const isFirst = currentIndex === 0;
  const isLast = currentIndex === quizQuestions.length - 1;

  function handlePrev() {
    if (!isFirst) {
      setCurrentIndex((i) => i - 1);
      setSelectedAnswer(null);
    }
  }

  function handleNext() {
    if (!isLast) {
      setCurrentIndex((i) => i + 1);
      setSelectedAnswer(null);
    }
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
                Progress
              </span>
              <span className="text-xs font-semibold text-[#45464d] font-sans">
                {currentIndex + 1} / {totalQuestions}
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

          {/* --- card pertanyaan --- */}
          <div className="mb-8 rounded-3xl bg-white p-8 shadow-card md:p-10">
            {/* badge kategori */}
            <span
              className={`mb-6 inline-block rounded-full px-3 py-1 text-xs font-bold uppercase tracking-wider font-sans ${categoryColors[currentQuestion.category]}`}
            >
              Kategori: {currentQuestion.category}
            </span>

            {/* teks soal */}
            <p className="text-xl font-semibold leading-relaxed text-[#0b1c30] font-headline md:text-2xl">
              {currentQuestion.text}
            </p>
          </div>

          {/* --- pilihan skala --- */}
          <div className="mb-10">
            {/* label skala */}
            <div className="mb-3 flex justify-between px-1">
              <span className="text-xs text-[#76777d] font-sans">Sangat Tidak Setuju</span>
              <span className="text-xs text-[#76777d] font-sans">Sangat Setuju</span>
            </div>
            {/* kotak pilihan */}
            <div className="grid grid-cols-5 gap-3">
              {skalaOptions.map((nilai) => {
                const isSelected = nilai === selectedAnswer;
                return (
                  <button
                    key={nilai}
                    onClick={() => setSelectedAnswer(nilai)}
                    className={`flex h-14 items-center justify-center rounded-2xl transition-all duration-100 font-headline cursor-pointer
                      ${
                        isSelected
                          ? "border-2 border-[#006a61] bg-[#e5f7f5] text-[#006a61]"
                          : "border border-[#c6c6cd] bg-white text-[#0b1c30] hover:border-2 hover:border-[#006a61] hover:text-[#006a61]"
                      }`}
                  >
                    <span className="text-lg font-bold">{nilai}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* --- navigasi --- */}
          <div className="flex items-center justify-between">
            {/* tombol sebelumnya */}
            <button
              onClick={handlePrev}
              disabled={isFirst}
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

            {/* tombol selanjutnya */}
            <button
              onClick={handleNext}
              disabled={isLast}
              className={`inline-flex items-center gap-2 rounded-2xl px-6 py-3 text-sm font-semibold transition-all duration-200 font-sans
                ${
                  isLast
                    ? "cursor-not-allowed bg-[#c6c6cd] text-white"
                    : "cursor-pointer bg-secondary hover:bg-secondary-dim text-white active:scale-95"
                }`}
            >
              Selanjutnya
              <FaArrowRight size={14} />
            </button>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
