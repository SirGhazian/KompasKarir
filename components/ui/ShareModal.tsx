"use client";

import { useState } from "react";
import { FaXmark, FaLink, FaCheck } from "react-icons/fa6";

interface ShareModalProps {
  isOpen: boolean;
  onClose: () => void;
  shareUrl: string;
}

export default function ShareModal({ isOpen, onClose, shareUrl }: ShareModalProps) {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // fallback
      const input = document.createElement("input");
      input.value = shareUrl;
      document.body.appendChild(input);
      input.select();
      document.execCommand("copy");
      document.body.removeChild(input);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  }

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-[#0b1c30]/50 px-4"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-md rounded-3xl bg-white p-8"
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
        <h3 className="mb-2 text-xl font-extrabold text-[#0b1c30] font-headline">Bagikan Hasil</h3>
        <p className="mb-6 text-sm text-[#45464d] font-sans">
          Salin link di bawah untuk membagikan hasil tesmu kepada orang lain.
        </p>

        {/* input link + tombol copy */}
        <div className="flex items-center gap-2">
          <div className="flex-1 overflow-hidden rounded-2xl border border-[#c6c6cd] bg-[#f8f9ff] px-4 py-3">
            <p className="truncate text-sm text-[#45464d] font-mono">{shareUrl}</p>
          </div>
          <button
            onClick={handleCopy}
            className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl transition-all duration-200 ${
              copied
                ? "bg-[#e5f7f5] text-[#006a61]"
                : "bg-secondary text-white hover:bg-secondary-dim cursor-pointer"
            }`}
          >
            {copied ? <FaCheck size={16} /> : <FaLink size={16} />}
          </button>
        </div>

        {copied && (
          <p className="mt-3 text-center text-xs font-semibold text-[#006a61] font-sans">
            Link berhasil disalin!
          </p>
        )}
      </div>
    </div>
  );
}
