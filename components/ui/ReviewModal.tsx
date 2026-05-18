"use client";

import { useState } from "react";
import { FaXmark, FaStar } from "react-icons/fa6";

interface ReviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit?: (data: { nama: string; rating: number; ulasan: string }) => void;
}

export default function ReviewModal({ isOpen, onClose, onSubmit }: ReviewModalProps) {
  const [nama, setNama] = useState("");
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [ulasan, setUlasan] = useState("");

  if (!isOpen) return null;

  function handleSubmit() {
    if (onSubmit) {
      onSubmit({ nama, rating, ulasan });
    }
    // reset form
    setNama("");
    setRating(0);
    setUlasan("");
    onClose();
  }

  const isValid = nama.trim() !== "" && rating > 0 && ulasan.trim() !== "";

  return (
    // backdrop
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-[#0b1c30]/50 px-4"
      onClick={onClose}
    >
      {/* modal */}
      <div
        className="relative w-full max-w-md rounded-3xl border border-[#c6c6cd] bg-white p-8"
        onClick={(e) => e.stopPropagation()}
      >
        {/* tombol close */}
        <button
          onClick={onClose}
          className="absolute right-5 top-5 flex h-8 w-8 cursor-pointer items-center justify-center rounded-xl text-[#45464d] transition-colors hover:text-[#0b1c30]"
        >
          <FaXmark size={18} />
        </button>

        {/* judul */}
        <h3 className="mb-4 text-xl font-extrabold text-[#0b1c30] font-headline">Beri Ulasan</h3>
        <div className="mb-6 h-px w-full bg-[#c6c6cd]" />

        {/* input nama */}
        <div className="mb-4">
          <label
            htmlFor="review-nama"
            className="mb-2 block text-sm font-semibold text-[#45464d] font-sans"
          >
            Nama
          </label>
          <input
            id="review-nama"
            type="text"
            value={nama}
            onChange={(e) => setNama(e.target.value)}
            placeholder="Masukkan nama kamu"
            className="w-full rounded-2xl border border-[#c6c6cd] bg-white px-4 py-3 text-sm font-sans text-[#0b1c30] outline-none transition-all duration-200 placeholder:text-[#c6c6cd] focus:border-[#0b1c30]"
          />
        </div>

        {/* rating bintang */}
        <div className="mb-4">
          <label className="mb-2 block text-sm font-semibold text-[#45464d] font-sans">
            Rating
          </label>
          <div className="flex items-center gap-1">
            {[1, 2, 3, 4, 5].map((star) => {
              const isFilled = star <= (hoverRating || rating);
              return (
                <button
                  key={star}
                  type="button"
                  onClick={() => setRating(star)}
                  onMouseEnter={() => setHoverRating(star)}
                  onMouseLeave={() => setHoverRating(0)}
                  className="cursor-pointer p-0.5 transition-transform duration-100 hover:scale-110"
                >
                  <FaStar size={24} className={isFilled ? "text-amber-400" : "text-[#c6c6cd]"} />
                </button>
              );
            })}
          </div>
        </div>

        {/* textarea ulasan */}
        <div className="mb-6">
          <label
            htmlFor="review-ulasan"
            className="mb-2 block text-sm font-semibold text-[#45464d] font-sans"
          >
            Ulasan
          </label>
          <textarea
            id="review-ulasan"
            value={ulasan}
            onChange={(e) => setUlasan(e.target.value)}
            placeholder="Tulis pengalaman kamu menggunakan KompasKarir..."
            rows={4}
            className="w-full resize-none rounded-2xl border border-[#c6c6cd] bg-white px-4 py-3 text-sm font-sans text-[#0b1c30] outline-none transition-all duration-200 placeholder:text-[#c6c6cd] focus:border-[#0b1c30]"
          />
        </div>

        {/* tombol submit */}
        <button
          onClick={handleSubmit}
          disabled={!isValid}
          className={`w-full rounded-2xl px-6 py-3.5 text-sm font-semibold transition-all duration-200 font-sans
            ${
              isValid
                ? "cursor-pointer bg-secondary text-white hover:bg-secondary-dim active:scale-95"
                : "cursor-not-allowed bg-[#c6c6cd] text-white"
            }`}
        >
          Kirim Ulasan
        </button>
      </div>
    </div>
  );
}
